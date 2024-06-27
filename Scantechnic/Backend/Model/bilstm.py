import tensorflow as tf
from tensorflow.keras.models import Model
from tensorflow.keras.layers import Dense, Input, Dropout, LayerNormalization, LSTM, Add, MultiHeadAttention, TimeDistributed, Conv1D, Bidirectional, Flatten
from tensorflow.keras.callbacks import EarlyStopping
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report, confusion_matrix, roc_auc_score
import pandas as pd
import numpy as np

class ResidualBiLSTM(tf.keras.layers.Layer):
    def __init__(self, units, **kwargs):
        super(ResidualBiLSTM, self).__init__(**kwargs)
        self.units = units
        self.bilstm = Bidirectional(LSTM(units, return_sequences=True))
        self.layernorm = LayerNormalization()
        self.dense = Dense(units * 2) 
        self.add = Add()

    def build(self, input_shape):
        super(ResidualBiLSTM, self).build(input_shape)

    def call(self, inputs):
        x = self.bilstm(inputs)
        x = self.layernorm(x)
        inputs_transformed = self.dense(inputs)
        return self.add([inputs_transformed, x])

def create_advanced_model(input_shape, num_heads=4, key_dim=64, ff_dim=128):
    inputs = Input(shape=input_shape)
    
    x = Conv1D(filters=64, kernel_size=3, padding='same', activation='relu')(inputs)
    
    x = ResidualBiLSTM(units=128)(x)
    x = ResidualBiLSTM(units=64)(x)
    
    attn_output = MultiHeadAttention(num_heads=num_heads, key_dim=key_dim)(x, x)
    attn_output = Dropout(0.3)(attn_output)
    out1 = LayerNormalization(epsilon=1e-6)(attn_output + x)
    
    ffn_output = TimeDistributed(Dense(units=1))(out1)  
    
    outputs = Flatten()(ffn_output)  
    
    outputs = Dense(1, activation='sigmoid')(outputs)  
    
    model = Model(inputs=inputs, outputs=outputs)
    model.compile(optimizer='adam', loss='binary_crossentropy')  
    return model

train_data = pd.read_csv('train.csv')
test_data = pd.read_csv('test.csv')

X_train = train_data.iloc[:, :-1].values
y_train = train_data.iloc[:, -1].values
X_test = test_data.iloc[:, :-1].values
y_test = test_data.iloc[:, -1].values

timesteps = 2 
features = X_train.shape[1] // timesteps
assert X_train.shape[1] % timesteps == 0, "Features are not divisible by timesteps!"

X_train = X_train.reshape(-1, timesteps, features)
X_test = X_test.reshape(-1, timesteps, features)

X_train, X_val, y_train, y_val = train_test_split(X_train, y_train, test_size=0.2, random_state=42)

with tf.keras.utils.custom_object_scope({'ResidualBiLSTM': ResidualBiLSTM}):
    input_shape = (timesteps, features)
    model = create_advanced_model(input_shape)

    early_stopping = EarlyStopping(monitor='val_loss', patience=5, restore_best_weights=True)

    history = model.fit(X_train, y_train, epochs=30, batch_size=32, validation_data=(X_val, y_val), callbacks=[early_stopping])

    model.save('bilstm_anomaly_detection_model.keras', save_format='keras')

    loaded_model = tf.keras.models.load_model('bilstm_anomaly_detection_model.keras', custom_objects={'ResidualBiLSTM': ResidualBiLSTM})

    test_loss = loaded_model.evaluate(X_test, y_test)
    print("Test Loss:", test_loss)

    y_pred_probs = loaded_model.predict(X_test)
    y_pred_classes = (y_pred_probs > 0.5).astype(int)

    print("Classification Report:")
    print(classification_report(y_test, y_pred_classes))
    print("Confusion Matrix:")
    print(confusion_matrix(y_test, y_pred_classes))
    print("AUC:", roc_auc_score(y_test, y_pred_probs))



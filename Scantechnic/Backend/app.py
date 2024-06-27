from flask import Flask, request, jsonify
from flask_cors import CORS
import tensorflow as tf
import numpy as np
import pandas as pd
import os
import serial
import csv
import time
from threading import Thread
from sklearn.metrics import classification_report, confusion_matrix, roc_auc_score
from sklearn.preprocessing import StandardScaler
from sklearn.svm import SVC
from sklearn.ensemble import IsolationForest, RandomForestClassifier
from sklearn.model_selection import train_test_split
import logging
from sklearn.preprocessing import StandardScaler
from sklearn.impute import SimpleImputer
from sklearn.feature_selection import SelectKBest, f_classif
from sklearn.utils import resample
from sklearn.preprocessing import PolynomialFeatures
from sklearn.model_selection import GridSearchCV
from sklearn.ensemble import RandomForestClassifier, VotingClassifier
from sklearn.calibration import CalibratedClassifierCV
from sklearn.metrics import roc_curve
import logging

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

logging.basicConfig(level=logging.INFO)

svm_model = SVC(probability=True, random_state=42)
isolation_forest_model = IsolationForest(random_state=42)
random_forest_model = RandomForestClassifier(random_state=42)

serial_port = '/dev/cu.usbmodem1101'
baud_rate = 9600
data_path = 'Model/test.csv'

board_info = "Unknown Board"
sensor_info = "Unknown Sensor"


class ResidualBiLSTM(tf.keras.layers.Layer):
    def __init__(self, units, **kwargs):
        super(ResidualBiLSTM, self).__init__(**kwargs)
        self.units = units
        self.bilstm = tf.keras.layers.Bidirectional(tf.keras.layers.LSTM(units, return_sequences=True))
        self.layernorm = tf.keras.layers.LayerNormalization()
        self.dense = tf.keras.layers.Dense(units * 2)
        self.add = tf.keras.layers.Add()

    def call(self, inputs):
        x = self.bilstm(inputs)
        x = self.layernorm(x)
        inputs_transformed = self.dense(inputs)
        return self.add([inputs_transformed, x])

#optimisation methods
def preprocess_optimization(methods):
    data = pd.read_csv(data_path)
    X = data[['temperature', 'humidity']]
    y = data['label']
    logging.info(f"Initial data shape: X={X.shape}, y={y.shape}")

    for method in methods:
        logging.info(f"Applying method: {method}")
        if method == 'Imputation':
            imputer = SimpleImputer(strategy='mean')
            X = imputer.fit_transform(X)
        elif method == 'Noise Reduction':
            X = pd.DataFrame(X).rolling(window=5).mean().fillna(method='bfill').values
        elif method == 'Feature Selection':
            selector = SelectKBest(score_func=f_classif, k=2)
            X = selector.fit_transform(X, y)
        elif method == 'Normalization':
            scaler = StandardScaler()
            X = scaler.fit_transform(X)
        elif method == 'Outlier Removal':
            iso = IsolationForest(contamination=0.1)
            yhat = iso.fit_predict(X)
            mask = yhat != -1
            X, y = X[mask, :], y[mask]
        elif method == 'Synthetic Data Generation':
            synthetic_samples = resample(X, n_samples=500, random_state=42)
            X = np.vstack([X, synthetic_samples])
            y = np.hstack([y, np.full(synthetic_samples.shape[0], -1)])
        elif method == 'Data Augmentation':
            augmented_data = X + np.random.normal(0, 0.1, X.shape)
            X = np.vstack([X, augmented_data])
            y = np.hstack([y, y])
        elif method == 'Polynomial Features':
            poly = PolynomialFeatures(degree=2, include_bias=False)
            X = poly.fit_transform(X)
        elif method == 'Interaction Features':
            poly = PolynomialFeatures(degree=2, interaction_only=True, include_bias=False)
            X = poly.fit_transform(X)
        elif method == 'Hyperparameter Tuning':
            param_grid = {'n_estimators': [50, 100], 'max_features': ['auto', 'sqrt', 'log2']}
            grid_search = GridSearchCV(estimator=RandomForestClassifier(), param_grid=param_grid, cv=5)
            grid_search.fit(X, y)
            logging.info(f"Best parameters: {grid_search.best_params_}")
        elif method == 'Ensemble Methods':
            model1 = RandomForestClassifier(n_estimators=50)
            model2 = RandomForestClassifier(n_estimators=100)
            ensemble = VotingClassifier(estimators=[('rf1', model1), ('rf2', model2)], voting='soft')
            ensemble.fit(X, y)
        elif method == 'Threshold Optimization':
            model = RandomForestClassifier()
            model.fit(X, y)
            y_probs = model.predict_proba(X)[:, 1]
            fpr, tpr, thresholds = roc_curve(y, y_probs)
            optimal_idx = np.argmax(tpr - fpr)
            optimal_threshold = thresholds[optimal_idx]
            logging.info(f"Optimal threshold: {optimal_threshold}")
        elif method == 'Calibration':
            model = RandomForestClassifier()
            calibrated_model = CalibratedClassifierCV(model, method='sigmoid')
            calibrated_model.fit(X, y)
        logging.info(f"Data shape after {method}: X={X.shape}")

    return X, y

@app.route('/optimize', methods=['POST'])
def optimize():
    try:
        data = request.json
        methods = data.get('methods', [])
        logging.info(f"Received methods: {methods}")
        
        X, y = preprocess_optimization(methods)
        logging.info(f"Preprocessed data shape: X={X.shape}, y={y.shape}")

        results = load_model_with_optimisation_methods(X, y)
        logging.info(f"Model evaluation completed. AUC: {results['auc']}")

        response = jsonify(results)
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response
    except Exception as e:
        logging.error(f"Error in optimize: {e}", exc_info=True)
        response = jsonify({"error": str(e)})
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response, 500
#=======================
def preprocess_data():
    data = pd.read_csv(data_path)
    X = data.drop(columns=['label'])
    y = data['label']
    scaler = StandardScaler()
    X_scaled = scaler.fit_transform(X)
    return X_scaled, y

def evaluate_model(model, X, y):
    predictions = model.predict(X)
    report = classification_report(y, predictions, output_dict=True)
    matrix = confusion_matrix(y, predictions).tolist()
    if hasattr(model, 'predict_proba'):
        auc = roc_auc_score(y, model.predict_proba(X)[:, 1])
    else:
        auc = roc_auc_score(y, model.decision_function(X))
    return {
        "report": report,
        "matrix": matrix,
        "auc": auc
    }

def load_model_with_optimisation_methods(X, y):
    timesteps = 2
    features = X.shape[1] // timesteps
    assert X.shape[1] % timesteps == 0, "Features are not divisible by timesteps!"

    X_reshaped = X.reshape(-1, timesteps, features)

    loaded_model = tf.keras.models.load_model('Model/bilstm_anomaly_detection_model.keras', custom_objects={'ResidualBiLSTM': ResidualBiLSTM})

    y_pred_probs = loaded_model.predict(X_reshaped)
    y_pred_classes = (y_pred_probs > 0.5).astype(int)

    report = classification_report(y, y_pred_classes, output_dict=True)
    matrix = confusion_matrix(y, y_pred_classes).tolist()
    auc = roc_auc_score(y, y_pred_probs)

    return {
        "report": report,
        "matrix": matrix,
        "auc": auc
    }

def load_and_evaluate_model():
    test_data = pd.read_csv(data_path)
    X_test = test_data.iloc[:, :-1].values
    y_test = test_data.iloc[:, -1].values

    timesteps = 2
    features = X_test.shape[1] // timesteps
    assert X_test.shape[1] % timesteps == 0, "Features are not divisible by timesteps!"

    X_test = X_test.reshape(-1, timesteps, features)

    loaded_model = tf.keras.models.load_model('Model/bilstm_anomaly_detection_model.keras', custom_objects={'ResidualBiLSTM': ResidualBiLSTM})

    y_pred_probs = loaded_model.predict(X_test)
    y_pred_classes = (y_pred_probs > 0.5).astype(int)

    report = classification_report(y_test, y_pred_classes, output_dict=True)
    matrix = confusion_matrix(y_test, y_pred_classes).tolist()
    auc = roc_auc_score(y_test, y_pred_probs)

    return {
        "report": report,
        "matrix": matrix,
        "auc": auc
    }

@app.route('/predict_svm', methods=['GET'])
def predict_svm():
    try:
        X, y = preprocess_data()  
        svm_model.fit(X, y)  
        analysis = evaluate_model(svm_model, X, y)
        response = jsonify(analysis)
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response
    except Exception as e:
        logging.error(f"Error in /predict_svm: {e}", exc_info=True)
        response = jsonify({"error": str(e)})
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response, 500

@app.route('/predict_isolation_forest', methods=['GET'])
def predict_isolation_forest():
    try:
        X, y = preprocess_data()
        isolation_forest_model.fit(X,y)
        analysis = evaluate_model(isolation_forest_model, X, y)
        response = jsonify(analysis)
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response
    except Exception as e:
        logging.error(f"Error in /predict_isolation_forest: {e}", exc_info=True)
        response = jsonify({"error": str(e)})
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response, 500
    
@app.route('/predict', methods=['GET'])
def predict():
    try:
        analysis = load_and_evaluate_model()
        response = jsonify(analysis)
        response.headers.add('Access-Control-Allow-Origin', '*') 
        return response
    except Exception as e:
        logging.error(f"Error in /predict: {e}", exc_info=True)
        response = jsonify({"error": str(e)})
        response.headers.add('Access-Control-Allow-Origin', '*') 
        return response, 500
    
@app.route('/recognise_device', methods=['GET'])
def recognise_device():
    try:
        global board_info, sensor_info
        response_data = {
            "board": board_info.split(',')[0].strip(),
            "sensor": board_info.split(',')[1].strip()
        }
        print(response_data)
        response = jsonify(response_data)
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response
    except Exception as e:
        print(f"Error in /recognise_device: {e}")
        response = jsonify({"error": str(e)})
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response, 500

def read_from_serial(port, baud):
    global board_info, sensor_info
    try:
        ser = serial.Serial(port, baud)
        with open(data_path, 'a', newline='') as csvfile:
            csv_writer = csv.writer(csvfile)
            if csvfile.tell() == 0:
                csv_writer.writerow(['temperature', 'humidity', 'label', 'board', 'sensor'])
            try:
                while True:
                    line = ser.readline().decode('utf-8').strip()
                    print(line)
                    if line.startswith('Arduino'):
                        board_info = line
                    else:
                        if all(char.isdigit() or char == '.' for char in line):
                            data = line.split(', ')
                            if len(data) == 3:
                                csv_writer.writerow(data + [board_info, 'DHT11'])
                                csvfile.flush()
                        else:
                            logging.warning(f"Ignoring non-numeric line: {line}")
            except KeyboardInterrupt:
                print("Stopped by User")
            finally:
                ser.close()
    except serial.SerialException as e:
        print(f"Error: {e}")
        print("Retrying in 5 seconds...")
        time.sleep(5)
        read_from_serial(port, baud)
    except Exception as e:
        logging.error(f"Error in read_from_serial: {e}", exc_info=True)


def read_serial_loop(port, baud):
    while True:
        read_from_serial(port, baud)
        time.sleep(5)  

@app.route('/data', methods=['GET'])
def get_data():
    try:
        if os.path.exists(data_path):
            data = pd.read_csv(data_path)
            last_four_rows = data.tail(4)  
            column_names = list(data.columns) 
            response_data = {
                "columns": column_names,
                "data": last_four_rows.to_dict(orient='records')
            }
            response = jsonify(response_data)
            response.headers.add('Access-Control-Allow-Origin', '*')  
            return response
        else:
            response = jsonify({"error": "Data file not found"})
            response.headers.add('Access-Control-Allow-Origin', '*')  
            return response, 404
    except Exception as e:
        logging.error(f"Error in /data: {e}", exc_info=True)
        response = jsonify({"error": str(e)})
        response.headers.add('Access-Control-Allow-Origin', '*')  
        return response, 500

if __name__ == '__main__':
    serial_thread = Thread(target=read_serial_loop, args=(serial_port, baud_rate))
    serial_thread.start()
    app.run(port=5000, debug=False)
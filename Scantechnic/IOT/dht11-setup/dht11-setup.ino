#include "DHT.h"

#define RELAY_FAN_PIN A5
#define DHTPIN 7
#define DHTTYPE DHT11

DHT dht(DHTPIN, DHTTYPE);
float TEMP_THRESHOLD_UPPER;
float TEMP_THRESHOLD_LOWER;
bool anomalyRecorded = false;

float temperature;
float humidity;

const char* getBoardName() {
#if defined(ARDUINO_AVR_ADK)
  return "Arduino Mega Adk";
#elif defined(ARDUINO_AVR_BT)
  return "Arduino Bt";
#elif defined(ARDUINO_AVR_DUEMILANOVE)
  return "Arduino Duemilanove";
#elif defined(ARDUINO_AVR_ESPLORA)
  return "Arduino Esplora";
#elif defined(ARDUINO_AVR_ETHERNET)
  return "Arduino Ethernet";
#elif defined(ARDUINO_AVR_FIO)
  return "Arduino Fio";
#elif defined(ARDUINO_AVR_GEMMA)
  return "Arduino Gemma";
#elif defined(ARDUINO_AVR_LEONARDO)
  return "Arduino Leonardo";
#elif defined(ARDUINO_AVR_LILYPAD)
  return "Arduino Lilypad";
#elif defined(ARDUINO_AVR_LILYPAD_USB)
  return "Arduino Lilypad Usb";
#elif defined(ARDUINO_AVR_MEGA)
  return "Arduino Mega";
#elif defined(ARDUINO_AVR_MEGA2560)
  return "Arduino Mega 2560";
#elif defined(ARDUINO_AVR_MICRO)
  return "Arduino Micro";
#elif defined(ARDUINO_AVR_MINI)
  return "Arduino Mini";
#elif defined(ARDUINO_AVR_NANO)
  return "Arduino Nano";
#elif defined(ARDUINO_AVR_NG)
  return "Arduino NG";
#elif defined(ARDUINO_AVR_PRO)
  return "Arduino Pro";
#elif defined(ARDUINO_AVR_ROBOT_CONTROL)
  return "Arduino Robot Ctrl";
#elif defined(ARDUINO_AVR_ROBOT_MOTOR)
  return "Arduino Robot Motor";
#elif defined(ARDUINO_AVR_UNO)
  return "Arduino Uno";
#elif defined(ARDUINO_AVR_YUN)
  return "Arduino Yun";
#else
  return "Unknown Board";
#endif
}

void setup() {
  Serial.begin(9600);
  dht.begin();
  pinMode(RELAY_FAN_PIN, OUTPUT);
  TEMP_THRESHOLD_LOWER = dht.readTemperature();
  TEMP_THRESHOLD_UPPER = TEMP_THRESHOLD_LOWER + 1.0;  
}

const char* getSensorType() {
#if DHT_SENSOR_TYPE == DHT11
  return "DHT11";
#elif DHT_SENSOR_TYPE == DHT22
  return "DHT22";
#elif DHT_SENSOR_TYPE == DHT21
  return "DHT21";
#else
  return "Unknown Sensor";
#endif
}

void loop() {
  delay(20000);

  temperature = dht.readTemperature();
  humidity = dht.readHumidity();

  if (isnan(temperature) || isnan(humidity)) {
    Serial.println("Failed to read from DHT sensor!");
    return;
  }

  int fanStatus = 0;

  if (temperature > TEMP_THRESHOLD_UPPER) {
    fanStatus = 1;
    digitalWrite(RELAY_FAN_PIN, HIGH);
    if (!anomalyRecorded) {
      Serial.print(temperature);
      Serial.print(", ");
      Serial.print(humidity);
      Serial.print(", ");
      Serial.println(1);
      anomalyRecorded = true;
    }
  } else if (temperature < TEMP_THRESHOLD_LOWER) {
    fanStatus = 0;
    digitalWrite(RELAY_FAN_PIN, LOW);
    anomalyRecorded = false;  
  }
  if (fanStatus == 0) {
    Serial.print(temperature);
    Serial.print(", ");
    Serial.print(humidity);
    Serial.print(", ");
    Serial.println(0);
  }
  Serial.print(getBoardName());
  Serial.print(", ");
  Serial.println(getSensorType());
}

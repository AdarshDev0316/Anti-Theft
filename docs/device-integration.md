# FLOOR GUARD — Hardware & IoT Device Integration Guide

## 1. Prototype Circuit Wiring Overview

As documented in Slide 06 of the project presentation:
- **Microcontroller**: Arduino UNO R3 (ATmega328P)
- **Sensor**: 35mm Piezoelectric Disc
  - Red Lead (+) $\to$ Arduino Analog Pin `A0`
  - Black Lead (-) $\to$ Arduino `GND`
  - 1M$\Omega$ pull-down resistor in parallel across sensor leads to discharge transient voltage
- **Alarm Transducer**: 5V Active Buzzer
  - Positive lead $\to$ Arduino Digital Pin `8`
  - Negative lead $\to$ `GND`
- **Display**: 16×2 Character LCD
  - RS, E, D4, D5, D6, D7 $\to$ Arduino Pins `12, 11, 5, 4, 3, 2`
  - V0 (Contrast) $\to$ 10k$\Omega$ Potentiometer wiper
- **Actuator**: Micro Servo SG90 (Optional lock/indicator)
  - Control PWM $\to$ Arduino Digital Pin `9`
  - Power $\to$ 5V Rail, `GND`
- **Wireless Bridge**: ESP8266 NodeMCU
  - `RX` $\to$ Arduino `TX` (Pin 1) via voltage divider (5V $\to$ 3.3V)
  - `TX` $\to$ Arduino `RX` (Pin 0)
  - `3.3V` & `GND` $\to$ Regulated power rail
- **Power Supply**: 8V Battery $\to$ 1N4007 Diode $\to$ LM7805 Linear Regulator (with 1000µF input and 100µF output capacitors) $\to$ 5V System Bus.

---

## 2. ESP8266 Firmware Sample Code (C++ Arduino IDE)

```cpp
#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include <WiFiClient.h>

const char* ssid = "YOUR_WIFI_SSID";
const char* password = "YOUR_WIFI_PASSWORD";
const char* serverEndpoint = "http://192.168.1.100:3001/api/devices/MAT-NODE-01/events";
const char* deviceToken = "floorguard-device-shared-secret-demo";

void setup() {
  Serial.begin(9600);
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
  }
}

void loop() {
  if (Serial.available() > 0) {
    String msg = Serial.readStringUntil('\n');
    if (msg.startsWith("PRESSURE_BREACH:")) {
      int reading = msg.substring(16).toInt();
      sendEventToBackend(reading);
    }
  }
}

void sendEventToBackend(int reading) {
  if (WiFi.status() == WL_CONNECTED) {
    WiFiClient client;
    HTTPClient http;
    http.begin(client, serverEndpoint);
    http.addHeader("Content-Type", "application/json");
    http.addHeader("X-Device-Auth", deviceToken);

    String payload = "{\"eventType\":\"Footstep Event\",\"sensorReading\":" + String(reading) +
                     ",\"analogVoltage\":" + String((reading / 1023.0) * 5.0, 2) +
                     ",\"description\":\"Live hardware pressure trigger at Smart Mat.\"}";

    int httpCode = http.POST(payload);
    http.end();
  }
}
```

---

## 3. Hardware Distinction & Demonstration Mode
The web application provides a verified demarcation between:
- **DEMO MODE**: Operates client-side without physical hardware attached. Simulated pressure events can be injected using the interactive slider in the Security Center.
- **LIVE DEVICE CONNECTED**: Only displays when verified telemetry has been received from an active micro-controller gateway through the documented API.

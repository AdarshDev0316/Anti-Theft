# FLOOR GUARD — Technical Architecture Documentation

## 1. Executive Summary
**FLOOR GUARD** is an IoT-based smart anti-theft floor mat system designed to detect physical entry at the floor level through mechanical stress sensing, execute instant local audible and visual warnings, and provide automated computer vision visual verification at the entryway.

Presented by **Team 5G (Five Glitchbreakers)** at **PSIT Kanpur (Tech Expo 2026)**.

---

## 2. Multi-Tier Architecture Pipeline

```
[ Physical World ]
       │ Footstep contact / mechanical pressure
       ▼
[ Layer 0: Sensor Subsystem ]
  35mm Piezoelectric Ceramic Sensor Disc (Brass substrate)
  Generates 0–5V analog transient upon impact / vibration
       │ Analog Signal (A0)
       ▼
[ Layer 1: Edge Reflex Controller ]
  Arduino UNO R3 (ATmega328P @ 16 MHz)
  ├── 5V Active Buzzer (immediate ~85dB audio deterrence)
  ├── 16×2 Character LCD (status display: ARMED / INTRUSION ALERT)
  └── Optional SG90 Micro Servo (physical barrier / lock flag)
       │ UART Serial Telemetry (TX/RX)
       ▼
[ Layer 2: Wireless IoT Gateway ]
  ESP8266 NodeMCU (Wi-Fi 802.11 b/g/n)
  Dispatches JSON payload over authenticated REST/WebSocket
       │ HTTP POST / WebSocket (/ws)
       ▼
[ Layer 3: Application Server & Event Store ]
  Node.js / Express Server + WebSocket Broadcaster (Port 3001)
  ├── Device Telemetry Registry
  ├── Cryptographic Event Log & Deduplication
  └── Biometric Reference Profile Database
       │ Bidirectional Real-Time Synchronization
       ▼
[ Layer 4: Security Center & Edge Computer Vision ]
  Web Security Operations Console (Route /security)
  ├── Live Browser Optical Stream (getUserMedia) / ESP32-CAM (OV2640)
  ├── Google MediaPipe Tasks Vision Face Detector (BlazeFace Short Range)
  ├── Face-API ResNet-34 128-Dimensional Face Embedding Extractor
  ├── Euclidean Distance Biometric Identity Matching against Enrolled Profiles
  └── Real-Time Alert Acknowledgment & Audit Trail
```

---

## 3. Computer Vision & Biometric Pipeline

### A. Detection vs. Identity Recognition
- **Face Detection**: Localizes human facial features in video frames or static snapshots. Bounding boxes and 68 landmark points are calculated without revealing identity.
- **Biometric Descriptor Extraction**: Deep convolutional neural network (ResNet-34) generates a normalized 128-dimensional floating-point embedding vector $D \in \mathbb{R}^{128}$ characterizing invariant facial geometry.
- **Euclidean Distance Comparison**:
  $$d(D_{\text{probe}}, D_{\text{reference}}) = \sqrt{\sum_{i=1}^{128} (D_{\text{probe}}[i] - D_{\text{reference}}[i])^2}$$
- **Classification Criteria**:
  - **Known Face Match**: $\min_{k} d(D_{\text{probe}}, D_k) \le \theta$ (Default $\theta = 0.58$). Label: Name and Role of enrolled individual.
  - **Unknown Face**: $\min_{k} d(D_{\text{probe}}, D_k) > \theta$. Label: Unknown Individual (Verification Required).
  - **Low Confidence**: Detection confidence $< 50\%$.

---

## 4. Hardware Verification & Prototype Bill of Materials

The physical prototype uses standard components totaling ₹ 2,380/-:
1. Arduino UNO R3 (Main controller) — ₹ 550
2. Piezoelectric Sensor 35mm (Pressure/vibration) — ₹ 30
3. ESP8266 NodeMCU (Wi-Fi module) — ₹ 250
4. ESP32-CAM Module (Camera module) — ₹ 450
5. 16×2 LCD Display (Status display) — ₹ 180
6. Active Buzzer 5V (Audio alarm) — ₹ 30
7. Micro Servo Motor SG90 (Optional lock/indicator) — ₹ 160
8. Push Button Switch — ₹ 10
9. Perf Board + Jumper Wires — ₹ 100
10. 5V Power Supply — ₹ 150
11. Connecting Wires & Misc. — ₹ 70

*Note: The ₹2,380 total reflects the historical educational prototype BOM presented at Tech Expo 2026. Production tooling, custom PCB manufacturing, weatherproofing, and cloud infrastructure require dedicated commercial budgets.*

# FLOOR GUARD — REST & WebSocket API Specification

## Base URL
- Local Dev: `http://localhost:3001/api`
- WebSocket: `ws://localhost:3001/ws`

---

## 1. System Health
### `GET /api/health`
Returns server status and project information.
```json
{
  "status": "ONLINE",
  "project": "FLOOR GUARD — An IoT-Based Smart Anti-Theft Floor Mat System",
  "team": "DevQBX / Five Glitchbreakers",
  "version": "1.0.0",
  "timestamp": "2026-10-20T13:30:00.000Z"
}
```

---

## 2. IoT Device Telemetry & Ingestion

### `GET /api/devices`
List all registered smart mats and sensors.

### `GET /api/devices/:id/status`
Returns real-time hardware status, analog sensor readings, buzzer state, and heartbeat.

### `POST /api/devices/:id/events`
Ingestion endpoint for physical ESP8266 or simulated nodes to register pressure breaches.
- **Headers**:
  - `Content-Type: application/json`
  - `X-Device-Auth: <DEVICE_AUTH_SECRET>`
- **Request Body**:
```json
{
  "eventType": "Footstep Event",
  "sensorReading": 745,
  "analogVoltage": 3.64,
  "description": "Footstep impact detected on Entrance Mat Zone A.",
  "isTriggered": true
}
```
- **Response (201 Created)**:
```json
{
  "success": true,
  "message": "Hardware event processed successfully.",
  "data": {
    "id": "EVT-M1A-982",
    "timestamp": "2026-10-20T13:35:12.000Z",
    "eventType": "Footstep Event",
    "source": "Floor Mat Sensor",
    "severity": "critical",
    "mode": "LIVE_CONNECTED",
    "acknowledged": false
  }
}
```

### `POST /api/devices/:id/mode`
Switch device mode between `DEMO` and `LIVE_CONNECTED`.

---

## 3. Security Event Log

### `GET /api/events`
Query parameters:
- `page` (default 1)
- `limit` (default 50)
- `eventType` (e.g. `Footstep Event`, `Known Face Match`, `Unknown Face`)
- `severity` (`info`, `warning`, `critical`, `success`)
- `mode` (`DEMO` or `LIVE_CONNECTED`)
- `search` (keyword search against description, source, or recognized identity)
- `acknowledged` (`true` or `false`)

### `PATCH /api/events/:id/acknowledge`
Marks an event as acknowledged with operator timestamp.
```json
{
  "acknowledgedBy": "Security Operator"
}
```

### `DELETE /api/events/:id`
Deletes single event entry.

### `DELETE /api/events`
Clears entire event log with confirmation.

---

## 4. Biometric Reference Profiles

### `GET /api/profiles`
Returns all enrolled authorized face profiles.

### `POST /api/profiles`
Enrolls an authorized reference identity.
- **Body**:
```json
{
  "name": "Adarsh Srivastava",
  "role": "Administrator",
  "photoPreviewUrl": "data:image/jpeg;base64,...",
  "descriptor": [0.045, -0.123, ...], // exactly 128 float numbers
  "notes": "Project Leader",
  "consentGranted": true
}
```

### `DELETE /api/profiles/:id`
Removes an enrolled reference profile.

---

## 5. Real-Time WebSocket Streaming (`/ws`)
Subscribers receive instantaneous event broadcasts:
- `NEW_SECURITY_EVENT`: Emitted upon footstep or face recognition trigger.
- `DEVICE_TELEMETRY_UPDATE`: Emitted when device state, threshold, or buzzer changes.

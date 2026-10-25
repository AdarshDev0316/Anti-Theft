# FLOOR GUARD — Setup & Deployment Guide

## 1. Prerequisites
- **Node.js**: v18.0.0 or higher (v20+ recommended).
- **Package Manager**: `npm` (bundled with Node.js).
- **Modern Browser**: Chrome, Edge, Firefox, or Safari supporting WebRTC (`getUserMedia`), Web Audio API, and WebAssembly.

---

## 2. Quick Start (Development)

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Start Full Stack (Vite Dev Server + Express API + WebSocket)
```bash
npm start
```
This runs concurrently:
- Frontend on: `http://localhost:5173/`
- Backend API on: `http://localhost:3001/`
- Real-Time WebSocket on: `ws://localhost:3001/ws`

### Alternatively, run frontend and backend independently:
```bash
# Terminal 1: Backend
npm run server

# Terminal 2: Frontend
npm run dev
```

---

## 3. Running Unit and Integration Tests
```bash
npm test
```
Runs 17 automated tests covering:
- Backend data store integrity
- Event ordering and deduplication
- Event acknowledgment with operator signature
- Biometric Euclidean distance calculations
- Biometric decision threshold bounds
- REST API validation and error handling
- Device telemetry ingestion security

---

## 4. Production Build & Execution
```bash
# 1. Compile TypeScript and build optimized static assets
npm run build

# 2. Run the production Express server (serves both API and static frontend)
NODE_ENV=production npm run server
```

---

## 5. Offline Computer Vision Models
All neural network models are pre-bundled in `public/models/` and `public/wasm/`:
- `tiny_face_detector_model`
- `face_landmark_68_tiny_model`
- `face_recognition_model` (6.4 MB ResNet-34 128-d embedding weights)
- `blaze_face_short_range.tflite` (Google MediaPipe BlazeFace)
- WebAssembly SIMD/no-SIMD binaries for MediaPipe Tasks Vision

No external cloud API keys or online model downloads are required at runtime.

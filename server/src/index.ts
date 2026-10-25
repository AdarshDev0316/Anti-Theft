import express from 'express';
import http from 'http';
import cors from 'cors';
import dotenv from 'dotenv';
import { WebSocketServer } from 'ws';
import path from 'path';

import { initWebSocketServer } from './services/websocketService';
import {
  getDevices,
  getDeviceStatus,
  ingestDeviceEvent,
  updateDeviceHeartbeat,
  setDeviceMode
} from './controllers/deviceController';
import {
  getEvents,
  getEventById,
  createEvent,
  acknowledgeEvent,
  deleteEvent,
  clearAllEvents
} from './controllers/eventController';
import {
  getProfiles,
  enrollProfile,
  deleteProfile,
  clearAllProfiles
} from './controllers/profileController';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Health Check
app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ONLINE',
    project: 'FLOOR GUARD — IoT-Based Smart Anti-Theft Floor Mat System',
    team: 'DevQBX / Five Glitchbreakers',
    version: '1.0.0',
    timestamp: new Date().toISOString()
  });
});

// Device Endpoints
app.get('/api/devices', getDevices);
app.get('/api/devices/:id/status', getDeviceStatus);
app.post('/api/devices/:id/events', ingestDeviceEvent);
app.post('/api/devices/:id/heartbeat', updateDeviceHeartbeat);
app.post('/api/devices/:id/mode', setDeviceMode);

// Event Management Endpoints
app.get('/api/events', getEvents);
app.get('/api/events/:id', getEventById);
app.post('/api/events', createEvent);
app.patch('/api/events/:id/acknowledge', acknowledgeEvent);
app.delete('/api/events/:id', deleteEvent);
app.delete('/api/events', clearAllEvents);

// Profile Management Endpoints
app.get('/api/profiles', getProfiles);
app.post('/api/profiles', enrollProfile);
app.delete('/api/profiles/:id', deleteProfile);
app.delete('/api/profiles', clearAllProfiles);

// Serve static build if in production
if (process.env.NODE_ENV === 'production') {
  const distPath = path.resolve(process.cwd(), 'dist');
  app.use(express.static(distPath));
  app.get('*', (_req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
  });
}

// Create HTTP and WebSocket Server
const server = http.createServer(app);
const wss = new WebSocketServer({ server, path: '/ws' });

initWebSocketServer(wss);

server.listen(PORT, () => {
  console.log(`[FLOOR GUARD Backend] Server running on http://localhost:${PORT}`);
  console.log(`[FLOOR GUARD Backend] WebSocket streaming live on ws://localhost:${PORT}/ws`);
});

import { WebSocketServer, WebSocket } from 'ws';
import { SecurityEvent } from '../../src/types/events';
import { DeviceTelemetry } from '../../src/types/device';

let wss: WebSocketServer | null = null;

export function initWebSocketServer(server: WebSocketServer) {
  wss = server;

  wss.on('connection', (ws: WebSocket) => {
    // Send immediate initial handshake
    ws.send(JSON.stringify({
      type: 'CONNECTION_ESTABLISHED',
      timestamp: new Date().toISOString(),
      message: 'Connected to FLOOR GUARD Real-Time Security WebSocket'
    }));

    ws.on('message', (message: string) => {
      try {
        const parsed = JSON.parse(message.toString());
        if (parsed.type === 'PING') {
          ws.send(JSON.stringify({ type: 'PONG', timestamp: new Date().toISOString() }));
        }
      } catch (e) {
        // ignore malformed ping
      }
    });
  });
}

export function broadcastEvent(event: SecurityEvent) {
  if (!wss) return;
  const payload = JSON.stringify({
    type: 'NEW_SECURITY_EVENT',
    data: event
  });

  wss.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(payload);
    }
  });
}

export function broadcastDeviceUpdate(device: DeviceTelemetry) {
  if (!wss) return;
  const payload = JSON.stringify({
    type: 'DEVICE_TELEMETRY_UPDATE',
    data: device
  });

  wss.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(payload);
    }
  });
}

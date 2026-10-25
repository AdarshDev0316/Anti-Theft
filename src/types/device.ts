export type SystemMode = 'DEMO' | 'LIVE_CONNECTED';

export type DeviceConnectionStatus = 'Connected' | 'Disconnected' | 'Permission Required' | 'Initializing' | 'Monitoring' | 'Alert Active' | 'Demo Mode' | 'Error';

export interface DeviceTelemetry {
  deviceId: string;
  deviceName: string;
  firmwareVersion: string;
  ipAddress?: string;
  rssi?: number;
  piezoThreshold: number;
  lastReading: number;
  isTriggered: boolean;
  buzzerState: boolean;
  lcdMessage: string;
  servoLocked: boolean;
  lastHeartbeat: string;
  status: DeviceConnectionStatus;
  mode: SystemMode;
}

export interface SystemStatusState {
  sensor: DeviceConnectionStatus;
  controller: DeviceConnectionStatus;
  camera: DeviceConnectionStatus;
  network: DeviceConnectionStatus;
  monitoringState: DeviceConnectionStatus;
  mode: SystemMode;
  lastHeartbeat?: string;
}

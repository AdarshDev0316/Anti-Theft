import React from 'react';
import { Activity, Cpu, Camera, Wifi, ShieldAlert, Clock } from 'lucide-react';
import { Card } from '../ui/Card';
import { Badge, BadgeVariant } from '../ui/Badge';
import { SystemStatusState, DeviceTelemetry } from '../../types/device';

interface DeviceStatusCardsProps {
  device: DeviceTelemetry;
  systemStatus: SystemStatusState;
  lastEventTime?: string;
  isSimulatingFootstep: boolean;
  cameraActive: boolean;
}

export const DeviceStatusCards: React.FC<DeviceStatusCardsProps> = ({
  device,
  systemStatus,
  lastEventTime,
  isSimulatingFootstep,
  cameraActive,
}) => {
  const isDemo = device.mode === 'DEMO';
  const isTriggered = device.isTriggered || isSimulatingFootstep;

  const cards: Array<{
    title: string;
    subtitle: string;
    icon: React.ReactNode;
    value: string;
    meta: string;
    badge: string;
    badgeVariant: BadgeVariant;
    glow: 'none' | 'cyan' | 'blue' | 'critical';
  }> = [
    {
      title: 'Sensor Status',
      subtitle: '35mm Piezoelectric Disc',
      icon: <Activity className={`w-4 h-4 ${isTriggered ? 'text-state-critical animate-bounce' : 'text-cyan'}`} />,
      value: isTriggered ? 'PRESSURE BREACH' : isDemo ? 'Armed (Simulated)' : 'Armed & Calibrated',
      meta: `Analog: ${device.lastReading}/1023 (Thresh: ${device.piezoThreshold})`,
      badge: isTriggered ? 'Alert' : 'Nominal',
      badgeVariant: isTriggered ? 'critical' : 'success',
      glow: isTriggered ? 'critical' : 'none',
    },
    {
      title: 'Controller Status',
      subtitle: 'Arduino UNO & ESP8266',
      icon: <Cpu className="w-4 h-4 text-signal-blue" />,
      value: isDemo ? 'Demo Controller' : 'Hardware Connected',
      meta: `FW: ${device.firmwareVersion} • 16MHz ATmega328`,
      badge: isDemo ? 'Demo Mode' : 'Online',
      badgeVariant: isDemo ? 'warning' : 'success',
      glow: 'none',
    },
    {
      title: 'Camera Status',
      subtitle: 'Entrance Optical Sensor',
      icon: <Camera className={`w-4 h-4 ${cameraActive ? 'text-state-success' : 'text-text-muted'}`} />,
      value: cameraActive ? 'Live Video Streaming' : 'Standby / Stopped',
      meta: cameraActive ? 'HD Resolution • Edge CV Active' : 'User Activation Required',
      badge: cameraActive ? 'Active' : 'Standby',
      badgeVariant: cameraActive ? 'success' : 'neutral',
      glow: cameraActive ? 'cyan' : 'none',
    },
    {
      title: 'Network Telemetry',
      subtitle: 'WebSocket Ingestion Bus',
      icon: <Wifi className={`w-4 h-4 ${systemStatus.network === 'Connected' ? 'text-signal-blue' : 'text-state-warning'}`} />,
      value: systemStatus.network === 'Connected' ? 'Real-Time Stream Active' : 'Polling Fallback',
      meta: isDemo ? 'Local Emulation Gateway' : 'ESP8266 Wi-Fi Link (802.11 b/g/n)',
      badge: systemStatus.network === 'Connected' ? 'Streaming' : 'Offline',
      badgeVariant: systemStatus.network === 'Connected' ? 'blue' : 'warning',
      glow: 'none',
    },
    {
      title: 'Monitoring State',
      subtitle: 'Overall Security Posture',
      icon: <ShieldAlert className={`w-4 h-4 ${isTriggered ? 'text-state-critical' : 'text-state-success'}`} />,
      value: isTriggered ? 'INTRUSION TRIGGERED' : 'SYSTEM ARMED',
      meta: isTriggered ? 'Local Buzzer Energized (5V)' : 'Standing Guard at Entrance',
      badge: isTriggered ? 'ALARM ACTIVE' : 'SECURE',
      badgeVariant: isTriggered ? 'critical' : 'success',
      glow: isTriggered ? 'critical' : 'none',
    },
    {
      title: 'Last Activity Recorded',
      subtitle: 'Recent System Event',
      icon: <Clock className="w-4 h-4 text-purple-400" />,
      value: lastEventTime ? new Date(lastEventTime).toLocaleTimeString() : 'No recent events',
      meta: lastEventTime ? `${new Date(lastEventTime).toLocaleDateString()}` : 'Awaiting sensor event',
      badge: isDemo ? 'Simulated Log' : 'Verified Hardware',
      badgeVariant: isDemo ? 'warning' : 'cyan',
      glow: 'none',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
      {cards.map((card) => (
        <Card
          key={card.title}
          glow={card.glow}
          padding="sm"
          className="bg-bg-card/90 border-border hover:border-border-bright transition-all flex flex-col justify-between"
        >
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="p-1 rounded bg-bg-elevated border border-border">
                {card.icon}
              </span>
              <Badge variant={card.badgeVariant} size="sm">
                {card.badge}
              </Badge>
            </div>

            <div>
              <span className="text-[10px] font-mono uppercase text-text-muted block">
                {card.title}
              </span>
              <span className="text-xs font-bold text-text-primary block mt-0.5 leading-snug">
                {card.value}
              </span>
            </div>
          </div>

          <div className="mt-3 pt-2 border-t border-border/50 text-[10px] font-mono text-text-muted truncate">
            {card.meta}
          </div>
        </Card>
      ))}
    </div>
  );
};

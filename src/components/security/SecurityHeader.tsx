import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Clock, Volume2, VolumeX, ShieldCheck, AlertTriangle, Radio, Activity } from 'lucide-react';
import { FloorGuardLogo } from '../branding/FloorGuardLogo';
import { Badge } from '../ui/Badge';
import { SystemMode, DeviceConnectionStatus } from '../../types/device';
import { SoundAlertService } from '../../services/soundAlertService';

interface SecurityHeaderProps {
  mode: SystemMode;
  onModeToggle: (newMode: SystemMode) => void;
  deviceStatus: DeviceConnectionStatus;
  cameraStatus: 'Active' | 'Stopped' | 'Permission Required' | 'Error';
  wsConnected: boolean;
}

export const SecurityHeader: React.FC<SecurityHeaderProps> = ({
  mode,
  onModeToggle,
  deviceStatus,
  cameraStatus,
  wsConnected,
}) => {
  const [currentTime, setCurrentTime] = useState<string>('');
  const [currentDate, setCurrentDate] = useState<string>('');
  const [soundEnabled, setSoundEnabled] = useState<boolean>(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' })
      );
      setCurrentDate(
        now.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })
      );
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const toggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    SoundAlertService.setSoundEnabled(next);
  };

  return (
    <div className="bg-bg-card/95 border-b border-border shadow-lg px-4 sm:px-6 lg:px-8 py-3.5 sticky top-0 z-30 backdrop-blur-md">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Left: Back Link + Logo + Title */}
        <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-start">
          <Link
            to="/"
            className="p-2 rounded-lg bg-bg-elevated border border-border text-text-secondary hover:text-cyan hover:border-cyan/40 transition-colors"
            title="Return to Presentation Homepage"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>

          <div className="flex items-center gap-3">
            <FloorGuardLogo variant="icon" size="sm" />
            <div>
              <h1 className="text-base sm:text-lg font-bold text-text-primary tracking-wide flex items-center gap-2">
                <span>Security Center</span>
                <span className="text-[11px] font-mono text-cyan bg-cyan/15 px-2 py-0.5 rounded border border-cyan/30">
                  OPS CONSOLE
                </span>
              </h1>
              <p className="text-[11px] text-text-muted font-mono hidden sm:block">
                FLOOR GUARD Edge Computer Vision & Multi-Sensor Telemetry
              </p>
            </div>
          </div>

          {/* Sound Toggle (Mobile) */}
          <button
            onClick={toggleSound}
            className={`p-2 rounded-lg md:hidden border text-xs font-mono transition-colors ${
              soundEnabled
                ? 'bg-cyan/15 border-cyan text-cyan'
                : 'bg-bg-elevated border-border text-text-muted'
            }`}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>
        </div>

        {/* Right: Clock + Connection Status + Sound + Mode Switcher */}
        <div className="flex flex-wrap items-center justify-center md:justify-end gap-3 w-full md:w-auto text-xs">
          
          {/* Digital Clock */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-bg-secondary border border-border/80 font-mono text-text-primary">
            <Clock className="w-3.5 h-3.5 text-cyan" />
            <span className="font-bold">{currentTime}</span>
            <span className="text-text-muted hidden lg:inline">| {currentDate}</span>
          </div>

          {/* Sound Toggle Button (Desktop) */}
          <button
            onClick={toggleSound}
            className={`hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border font-mono text-xs transition-colors ${
              soundEnabled
                ? 'bg-cyan/15 border-cyan text-cyan'
                : 'bg-bg-elevated border-border text-text-muted hover:text-text-secondary'
            }`}
            title="Toggle synthetic audible alarm tone on verified intrusion"
          >
            {soundEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
            <span>{soundEnabled ? 'Alarm Audio: ON' : 'Alarm Audio: MUTED'}</span>
          </button>

          {/* WebSocket Link Badge */}
          <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-bg-secondary border border-border text-[11px] font-mono">
            <span className={`w-2 h-2 rounded-full ${wsConnected ? 'bg-state-success' : 'bg-state-critical'}`} />
            <span className="text-text-secondary">{wsConnected ? 'Telemetry: Live' : 'Telemetry: Off'}</span>
          </div>

          {/* MODE BADGE (DEMO MODE vs LIVE DEVICE CONNECTED) */}
          <div className="flex items-center gap-1 bg-bg-secondary p-1 rounded-xl border border-border">
            <button
              onClick={() => onModeToggle('DEMO')}
              className={`px-3 py-1 rounded-lg text-xs font-mono font-semibold transition-all ${
                mode === 'DEMO'
                  ? 'bg-state-warning/20 text-state-warning border border-state-warning/40 shadow-sm'
                  : 'text-text-muted hover:text-text-secondary'
              }`}
            >
              DEMO MODE
            </button>
            <button
              onClick={() => onModeToggle('LIVE_CONNECTED')}
              className={`px-3 py-1 rounded-lg text-xs font-mono font-semibold transition-all ${
                mode === 'LIVE_CONNECTED'
                  ? 'bg-state-success/20 text-state-success border border-state-success/40 shadow-sm'
                  : 'text-text-muted hover:text-text-secondary'
              }`}
            >
              LIVE DEVICE CONNECTED
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};

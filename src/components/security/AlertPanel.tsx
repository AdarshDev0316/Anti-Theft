import React, { useState } from 'react';
import { Footprints, Volume2, BellRing, Code, Zap, Copy, Check, Terminal, ExternalLink } from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { SoundAlertService } from '../../services/soundAlertService';

interface AlertPanelProps {
  onSimulateFootstep: (reading: number) => void;
  isSimulating: boolean;
  isDemoMode: boolean;
}

export const AlertPanel: React.FC<AlertPanelProps> = ({
  onSimulateFootstep,
  isSimulating,
  isDemoMode,
}) => {
  const [pressureLevel, setPressureLevel] = useState<number>(760);
  const [copied, setCopied] = useState(false);
  const [showCode, setShowCode] = useState(false);

  const handleTestAudio = () => {
    SoundAlertService.setSoundEnabled(true);
    SoundAlertService.playIntrusionAlarm();
  };

  const handleSimulate = () => {
    SoundAlertService.playFootstepChirp();
    onSimulateFootstep(pressureLevel);
  };

  const curlSnippet = `curl -X POST http://localhost:3001/api/devices/MAT-NODE-01/events \\
  -H "Content-Type: application/json" \\
  -H "X-Device-Auth: floorguard-device-shared-secret-demo" \\
  -d '{
    "eventType": "Footstep Event",
    "sensorReading": ${pressureLevel},
    "analogVoltage": ${((pressureLevel / 1023) * 5).toFixed(2)},
    "description": "Hardware threshold exceeded at Main Smart Mat entrance."
  }'`;

  const copySnippet = () => {
    navigator.clipboard.writeText(curlSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-bg-card border border-border rounded-2xl p-5 shadow-xl space-y-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Zap className="w-5 h-5 text-state-warning" />
          <h3 className="font-bold text-text-primary text-base">
            Hardware Trigger & Telemetry Gateway
          </h3>
        </div>
        <Badge variant={isDemoMode ? 'warning' : 'success'} size="sm">
          {isDemoMode ? 'Simulation Enabled' : 'Live Gateway Active'}
        </Badge>
      </div>

      <p className="text-xs text-text-secondary leading-relaxed">
        Test the floor mat pressure-detection workflow without physical hardware using the simulation controls below, or integrate an actual ESP8266 node via our authenticated REST endpoint.
      </p>

      {/* Simulation Controls */}
      <div className="p-4 rounded-xl bg-bg-secondary border border-border space-y-4">
        <div className="flex items-center justify-between text-xs font-mono">
          <span className="text-text-muted">Simulated Piezoelectric Force:</span>
          <span className="text-cyan font-bold">
            {pressureLevel} / 1023 (Analog Voltage: {((pressureLevel / 1023) * 5).toFixed(2)}V)
          </span>
        </div>

        <input
          type="range"
          min="150"
          max="1023"
          value={pressureLevel}
          onChange={(e) => setPressureLevel(parseInt(e.target.value, 10))}
          className="w-full accent-cyan cursor-pointer"
        />

        <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
          <div className="flex items-center gap-2">
            <Button
              variant="cyan"
              size="sm"
              onClick={handleSimulate}
              isLoading={isSimulating}
              icon={<Footprints className="w-4 h-4" />}
            >
              Trigger Footstep Strike
            </Button>
            <Button
              variant="secondary"
              size="sm"
              onClick={handleTestAudio}
              icon={<Volume2 className="w-3.5 h-3.5 text-state-warning" />}
              title="Test the synthetic buzzer sound"
            >
              Test Alarm Sound
            </Button>
          </div>

          <button
            onClick={() => setShowCode(!showCode)}
            className="text-xs font-mono text-cyan hover:underline flex items-center gap-1"
          >
            <Code className="w-3.5 h-3.5" />
            <span>{showCode ? 'Hide API Payload' : 'Show IoT cURL Endpoint'}</span>
          </button>
        </div>
      </div>

      {/* ESP8266 REST Ingestion Code Snippet */}
      {showCode && (
        <div className="space-y-2 pt-2 animate-in fade-in duration-200">
          <div className="flex items-center justify-between text-xs font-mono text-text-muted">
            <span className="flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5 text-signal-blue" />
              <span>ESP8266 / IoT Ingestion Command (cURL / HTTP POST)</span>
            </span>
            <button
              onClick={copySnippet}
              className="text-cyan hover:underline flex items-center gap-1"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-state-success" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied!' : 'Copy cURL'}</span>
            </button>
          </div>
          <pre className="p-3 rounded-xl bg-black/80 border border-border text-cyan text-[11px] font-mono overflow-x-auto leading-relaxed">
            {curlSnippet}
          </pre>
        </div>
      )}
    </div>
  );
};

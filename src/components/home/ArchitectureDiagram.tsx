import React, { useState } from 'react';
import { Network, ZoomIn, Cpu, Wifi, ShieldAlert, Zap, Radio, Layers, Eye } from 'lucide-react';
import { Modal } from '../ui/Modal';
import { Badge } from '../ui/Badge';

export const ArchitectureDiagram: React.FC = () => {
  const [showCircuitModal, setShowCircuitModal] = useState(false);

  return (
    <section id="architecture" className="py-20 bg-bg-primary relative border-t border-border/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-signal-blue/10 border border-signal-blue/30 text-signal-blue text-xs font-mono">
            <Network className="w-3.5 h-3.5" />
            <span>SLIDE 06 SCHEMATIC & TELEMETRY</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-text-primary tracking-tight">
            System Architecture & Data Flows
          </h2>
          <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
            A modular multi-tier architecture isolating high-speed local analog reflex response from asynchronous IoT wireless telemetry and edge computer vision verification.
          </p>
        </div>

        {/* Visual interactive representation of the system */}
        <div className="bg-bg-card border border-border rounded-2xl p-6 lg:p-8 space-y-8">
          
          {/* Top banner with Circuit Diagram Preview button */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-border/80">
            <div>
              <h3 className="font-bold text-text-primary text-lg flex items-center gap-2">
                <span>Hardware Circuit & Communication Pipeline</span>
                <Badge variant="cyan" size="sm">Dual Microcontroller</Badge>
              </h3>
              <p className="text-xs text-text-muted mt-0.5">
                Physical sensor bus (5V/3.3V) mapped to Web REST & WebSocket interfaces.
              </p>
            </div>
            <button
              onClick={() => setShowCircuitModal(true)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-bg-elevated border border-border hover:border-cyan text-text-primary hover:text-cyan text-xs font-mono transition-all"
            >
              <ZoomIn className="w-4 h-4 text-cyan" />
              <span>Inspect Full Schematic Diagram</span>
            </button>
          </div>

          {/* Interactive Block Diagram */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            
            {/* Block 1: Physical Entrance Layer */}
            <div className="p-4 rounded-xl bg-bg-secondary border border-border flex flex-col justify-between space-y-3">
              <div className="space-y-1">
                <span className="text-[10px] font-mono uppercase text-cyan tracking-wider">Level 0: Physical Mat</span>
                <h4 className="font-bold text-sm text-text-primary flex items-center gap-1.5">
                  <Zap className="w-4 h-4 text-state-warning" />
                  Piezo Sensor (35mm)
                </h4>
                <p className="text-xs text-text-secondary">
                  Placed inside rubber/fabric floor mat. Stress creates analog voltage spike (0-5V).
                </p>
              </div>
              <div className="pt-2 border-t border-border/60 text-[11px] font-mono text-cyan">
                Analog Pin A0 → Arduino
              </div>
            </div>

            {/* Block 2: Microcontroller reflex */}
            <div className="p-4 rounded-xl bg-bg-secondary border border-border flex flex-col justify-between space-y-3">
              <div className="space-y-1">
                <span className="text-[10px] font-mono uppercase text-cyan tracking-wider">Level 1: Local Reflex</span>
                <h4 className="font-bold text-sm text-text-primary flex items-center gap-1.5">
                  <Cpu className="w-4 h-4 text-cyan" />
                  Arduino UNO R3
                </h4>
                <p className="text-xs text-text-secondary">
                  Noise filtering & threshold detection. Fires local 5V buzzer & updates 16×2 LCD screen instantly.
                </p>
              </div>
              <div className="pt-2 border-t border-border/60 text-[11px] font-mono text-state-warning">
                Buzzer (D8) • LCD • SG90
              </div>
            </div>

            {/* Block 3: IoT Gateway */}
            <div className="p-4 rounded-xl bg-bg-secondary border border-border flex flex-col justify-between space-y-3">
              <div className="space-y-1">
                <span className="text-[10px] font-mono uppercase text-cyan tracking-wider">Level 2: Wireless Gateway</span>
                <h4 className="font-bold text-sm text-text-primary flex items-center gap-1.5">
                  <Radio className="w-4 h-4 text-signal-blue" />
                  ESP8266 NodeMCU
                </h4>
                <p className="text-xs text-text-secondary">
                  Serial communication from Arduino (TX/RX). Encapsulates event into authenticated HTTP/REST JSON.
                </p>
              </div>
              <div className="pt-2 border-t border-border/60 text-[11px] font-mono text-signal-blue">
                Wi-Fi 802.11 b/g/n
              </div>
            </div>

            {/* Block 4: Web Application & CV */}
            <div className="p-4 rounded-xl bg-bg-secondary border border-border flex flex-col justify-between space-y-3">
              <div className="space-y-1">
                <span className="text-[10px] font-mono uppercase text-cyan tracking-wider">Level 3: Web & Vision</span>
                <h4 className="font-bold text-sm text-text-primary flex items-center gap-1.5">
                  <Eye className="w-4 h-4 text-state-success" />
                  Security Center
                </h4>
                <p className="text-xs text-text-secondary">
                  ESP32-CAM stream or browser camera with MediaPipe & 128-d face recognition matching against profiles.
                </p>
              </div>
              <div className="pt-2 border-t border-border/60 text-[11px] font-mono text-state-success">
                WebSocket Live Stream
              </div>
            </div>

          </div>

          {/* Circuit schematic thumbnail card */}
          <div
            onClick={() => setShowCircuitModal(true)}
            className="cursor-pointer group relative rounded-xl overflow-hidden border border-border/80 bg-black/60 p-3 hover:border-cyan transition-all"
          >
            <div className="flex items-center justify-between pb-2 text-xs font-mono text-text-muted">
              <span>PROJECT SCHEMATIC PREVIEW • CLICK TO ENLARGE</span>
              <span className="text-cyan group-hover:underline flex items-center gap-1">
                Open High-Res Schematic <ZoomIn className="w-3.5 h-3.5" />
              </span>
            </div>
            <img
              src="/images/diagrams/circuit_diagram.png"
              alt="Hardware circuit diagram with LM7805 regulator, Arduino UNO, Piezo disc, Buzzer, LCD, and ESP8266"
              className="w-full max-h-80 object-contain mx-auto filter contrast-105 group-hover:brightness-110 transition-all"
            />
          </div>

          {/* Technical Distinction Accordion/Notes */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 text-xs font-mono">
            <div className="p-3.5 rounded-lg bg-bg-secondary border border-border">
              <span className="text-cyan font-bold block mb-1">
                Verified Physical Subsystems:
              </span>
              <p className="text-text-secondary leading-relaxed">
                Battery 8V → 1N4007 reverse polarity diode → LM7805 regulator (1000µF/100µF caps) → 5V Arduino power. Piezoelectric disc connected to Pin A0 with pull-down resistor. 16×2 LCD connected with contrast potentiometer.
              </p>
            </div>
            <div className="p-3.5 rounded-lg bg-bg-secondary border border-border">
              <span className="text-signal-blue font-bold block mb-1">
                IoT Telemetry Layer Requirements:
              </span>
              <p className="text-text-secondary leading-relaxed">
                ESP8266 firmware connects to local Wi-Fi SSID and dispatches HTTP POST payloads to <code>/api/devices/MAT-NODE-01/events</code>. The web server broadcasts updates in real time to connected Security Center operators over WebSocket.
              </p>
            </div>
          </div>

        </div>

      </div>

      {/* Schematic Modal */}
      <Modal
        isOpen={showCircuitModal}
        onClose={() => setShowCircuitModal(false)}
        title="Hardware Circuit Schematic Diagram"
        subtitle="Extracted directly from Slide 06 (PSIT Kanpur Tech Expo 2026)"
        maxWidth="4xl"
      >
        <div className="space-y-4">
          <div className="rounded-xl overflow-hidden border border-border bg-black/80 p-3">
            <img
              src="/images/diagrams/circuit_diagram.png"
              alt="Circuit Diagram"
              className="w-full h-auto object-contain mx-auto"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono text-text-secondary">
            <div className="p-2.5 rounded bg-bg-secondary border border-border">
              <strong className="text-text-primary block">Power Rail:</strong>
              8V Battery → 1N4007 Diode → LM7805 (Pin 1 IN, Pin 2 GND, Pin 3 OUT 5V) with LED indicator.
            </div>
            <div className="p-2.5 rounded bg-bg-secondary border border-border">
              <strong className="text-text-primary block">Sensor Interface:</strong>
              Piezoelectric disc (Red wire → Analog Pin A0, Black wire → GND).
            </div>
            <div className="p-2.5 rounded bg-bg-secondary border border-border">
              <strong className="text-text-primary block">Outputs:</strong>
              5V Active Buzzer, 16×2 LCD with Potentiometer, SG90 Servo, ESP8266 Wi-Fi Module.
            </div>
          </div>
        </div>
      </Modal>
    </section>
  );
};

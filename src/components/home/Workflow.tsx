import React, { useState } from 'react';
import { Footprints, Cpu, BellRing, Wifi, Camera, ShieldCheck, ChevronRight, Image as ImageIcon } from 'lucide-react';
import { Badge } from '../ui/Badge';
import { Modal } from '../ui/Modal';

export const Workflow: React.FC = () => {
  const [showDiagramModal, setShowDiagramModal] = useState(false);

  const steps = [
    {
      step: '01',
      title: 'Footstep Detection',
      icon: <Footprints className="w-5 h-5 text-cyan" />,
      desc: 'Mechanical pressure or vibration on the floor mat stresses the 35mm piezoelectric element, producing an analog voltage transient.',
      badge: 'Hardware Sensor',
      badgeVariant: 'cyan' as const,
    },
    {
      step: '02',
      title: 'Signal Processing',
      icon: <Cpu className="w-5 h-5 text-signal-blue" />,
      desc: 'Arduino UNO R3 samples the analog signal on pin A0, filters electrical noise, and checks against the calibrated intrusion threshold.',
      badge: 'Microcontroller',
      badgeVariant: 'blue' as const,
    },
    {
      step: '03',
      title: 'Local Alert Response',
      icon: <BellRing className="w-5 h-5 text-state-warning" />,
      desc: 'Instant audible deterrence: 5V active buzzer sounds immediately while the 16×2 LCD displays system alert status.',
      badge: 'Deterrence',
      badgeVariant: 'warning' as const,
    },
    {
      step: '04',
      title: 'Wireless Communication',
      icon: <Wifi className="w-5 h-5 text-cyan" />,
      desc: 'ESP8266 NodeMCU bridges serial telemetry from Arduino to Wi-Fi, dispatching JSON event payloads to the web security backend.',
      badge: 'IoT Gateway',
      badgeVariant: 'cyan' as const,
    },
    {
      step: '05',
      title: 'Visual Verification',
      icon: <Camera className="w-5 h-5 text-state-success" />,
      desc: 'ESP32-CAM module or edge browser camera captures image snapshots at the entrance for facial detection and verification.',
      badge: 'Computer Vision',
      badgeVariant: 'success' as const,
    },
    {
      step: '06',
      title: 'Authorized Operator Review',
      icon: <ShieldCheck className="w-5 h-5 text-purple-400" />,
      desc: 'Security Center evaluates identity matching against enrolled reference profiles, classifies event, and logs for review.',
      badge: 'Web Security Center',
      badgeVariant: 'blue' as const,
    },
  ];

  return (
    <section id="workflow" className="py-20 bg-bg-primary relative border-t border-border/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan/10 border border-cyan/30 text-cyan text-xs font-mono mb-3">
              <span>SYSTEM ARCHITECTURE PIPELINE</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-text-primary tracking-tight">
              How FLOOR GUARD Operates
            </h2>
            <p className="text-sm sm:text-base text-text-secondary max-w-2xl mt-2 leading-relaxed">
              From mechanical footstep stress on the floor mat to edge microcontroller filtering, local deterrence, and cloud/browser computer vision identity verification.
            </p>
          </div>

          <button
            onClick={() => setShowDiagramModal(true)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-bg-card border border-border hover:border-cyan/40 text-text-primary hover:text-cyan text-xs font-mono transition-all self-start md:self-auto"
          >
            <ImageIcon className="w-4 h-4 text-cyan" />
            <span>View Original Presentation Workflow Flowchart</span>
          </button>
        </div>

        {/* Desktop Step Flow / Mobile Timeline */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {steps.map((item, idx) => (
            <div
              key={item.step}
              className="group relative bg-bg-card border border-border hover:border-cyan/40 rounded-2xl p-6 transition-all duration-300 hover:shadow-xl hover:shadow-cyan/5 flex flex-col justify-between"
            >
              <div>
                {/* Step number and Badge */}
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-2xl font-black text-border-bright group-hover:text-cyan transition-colors">
                    {item.step}
                  </span>
                  <Badge variant={item.badgeVariant} size="sm">
                    {item.badge}
                  </Badge>
                </div>

                {/* Icon & Title */}
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-bg-elevated border border-border flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    {item.icon}
                  </div>
                  <h3 className="font-bold text-text-primary text-base">
                    {item.title}
                  </h3>
                </div>

                <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                  {item.desc}
                </p>
              </div>

              {/* Progress Connector Indicator */}
              <div className="mt-6 pt-3 border-t border-border/50 flex items-center justify-between text-[11px] font-mono text-text-muted">
                <span>Phase {idx + 1} of 6</span>
                {idx < steps.length - 1 ? (
                  <span className="text-cyan flex items-center">
                    Proceeds to {steps[idx + 1].step} <ChevronRight className="w-3 h-3 ml-0.5" />
                  </span>
                ) : (
                  <span className="text-state-success font-semibold">Ready for Review</span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Technical distinction note */}
        <div className="mt-10 p-4 rounded-xl bg-bg-secondary border border-border flex items-center justify-between flex-wrap gap-3 text-xs font-mono text-text-secondary">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan inline-block" />
            <span>Telemetry Pipeline: Analog Spike (A0) → Serial (TX/RX) → HTTP/WebSocket REST Telemetry</span>
          </div>
          <span className="text-text-muted">Actuator: SG90 Micro Servo (Optional Mechanical Door/Latch Lock)</span>
        </div>

      </div>

      {/* Presentation Diagram Modal */}
      <Modal
        isOpen={showDiagramModal}
        onClose={() => setShowDiagramModal(false)}
        title="High-Level Working Workflow Diagram"
        subtitle="Extracted directly from Project Slide 06"
        maxWidth="lg"
      >
        <div className="space-y-4">
          <div className="rounded-xl overflow-hidden border border-border bg-black/60 p-2">
            <img
              src="/images/diagrams/workflow_diagram.png"
              alt="High-Level Working Flow extracted from Presentation Slide 06"
              className="w-full h-auto object-contain mx-auto"
            />
          </div>
          <div className="text-xs text-text-secondary space-y-1.5 font-mono">
            <p>• System Initialized (Arduino, Sensors, Camera, LCD, Wi-Fi)</p>
            <p>• Piezoelectric sensor detects vibration/pressure (footstep)</p>
            <p>• ESP32-CAM captures live image of person at entrance</p>
            <p>• If unauthorized entry: Trigger buzzer alarm (5V), Display alert on 16×2 LCD, Start live monitoring via Wi-Fi, Activate servo motor lock.</p>
          </div>
        </div>
      </Modal>
    </section>
  );
};

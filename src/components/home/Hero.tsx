import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldAlert, ArrowRight, Activity, Bell, Wifi, Camera, Sparkles, Layers } from 'lucide-react';
import { Button } from '../ui/Button';

export const Hero: React.FC = () => {
  return (
    <section className="relative pt-12 pb-20 md:pt-20 md:pb-32 overflow-hidden bg-security-grid">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-cyan/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[400px] h-[300px] bg-signal-blue/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Headline & Information */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan/10 border border-cyan/30 text-cyan text-xs font-mono tracking-wider">
              <span className="w-2 h-2 rounded-full bg-cyan animate-pulse" />
              <span>TECH EXPO 2026 • PSIT KANPUR INNOVATION</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-text-primary tracking-tight leading-[1.1]">
              Security Starts at the <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan via-teal-300 to-signal-blue">Floor.</span>
            </h1>

            <p className="text-lg sm:text-xl font-medium text-text-secondary leading-snug">
              Detect footsteps. Trigger alerts. Verify activity. Protect the spaces that matter.
            </p>

            <p className="text-sm sm:text-base text-text-muted max-w-2xl leading-relaxed">
              <strong className="text-text-primary font-semibold">FLOOR GUARD</strong> is an IoT-based smart anti-theft floor mat system that uses piezoelectric sensing to detect pressure events and initiate a multi-stage security response — combining local audible alarms, wireless telemetry, and real-time computer vision identity verification.
            </p>

            {/* CTA Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Link to="/security" className="w-full sm:w-auto">
                <Button variant="cyan" size="lg" className="w-full sm:w-auto" icon={<ShieldAlert className="w-5 h-5" />}>
                  Open Security Center
                </Button>
              </Link>
              <a href="#workflow" className="w-full sm:w-auto">
                <Button variant="secondary" size="lg" className="w-full sm:w-auto" icon={<ArrowRight className="w-4 h-4" />}>
                  Explore How It Works
                </Button>
              </a>
            </div>

            {/* 4 Feature Indicators */}
            <div className="pt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 text-left">
              <div className="p-3 rounded-lg bg-bg-card/70 border border-border/80 flex flex-col gap-1.5">
                <div className="w-7 h-7 rounded bg-cyan/10 text-cyan flex items-center justify-center">
                  <Activity className="w-4 h-4" />
                </div>
                <span className="text-xs font-semibold text-text-primary">Pressure Detection</span>
                <span className="text-[11px] text-text-muted">35mm Piezo disc</span>
              </div>

              <div className="p-3 rounded-lg bg-bg-card/70 border border-border/80 flex flex-col gap-1.5">
                <div className="w-7 h-7 rounded bg-state-warning/10 text-state-warning flex items-center justify-center">
                  <Bell className="w-4 h-4" />
                </div>
                <span className="text-xs font-semibold text-text-primary">Local Alarm</span>
                <span className="text-[11px] text-text-muted">5V Buzzer + 16×2 LCD</span>
              </div>

              <div className="p-3 rounded-lg bg-bg-card/70 border border-border/80 flex flex-col gap-1.5">
                <div className="w-7 h-7 rounded bg-signal-blue/10 text-signal-blue flex items-center justify-center">
                  <Wifi className="w-4 h-4" />
                </div>
                <span className="text-xs font-semibold text-text-primary">Wireless Link</span>
                <span className="text-[11px] text-text-muted">ESP8266 NodeMCU</span>
              </div>

              <div className="p-3 rounded-lg bg-bg-card/70 border border-border/80 flex flex-col gap-1.5">
                <div className="w-7 h-7 rounded bg-state-success/10 text-state-success flex items-center justify-center">
                  <Camera className="w-4 h-4" />
                </div>
                <span className="text-xs font-semibold text-text-primary">Visual Verify</span>
                <span className="text-[11px] text-text-muted">ESP32-CAM & Edge CV</span>
              </div>
            </div>
          </div>

          {/* Right Column: Prototype Visual Representation */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none rounded-2xl p-1 bg-gradient-to-b from-cyan/40 via-border to-signal-blue/30 shadow-2xl shadow-cyan/10">
              <div className="bg-bg-secondary rounded-[14px] overflow-hidden border border-border relative">
                
                {/* Visual Header bar */}
                <div className="px-4 py-3 bg-bg-card border-b border-border flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80 inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-green-500/80 inline-block" />
                    <span className="text-xs font-mono text-text-secondary ml-2">FLOOR_GUARD_PROTOTYPE.RAW</span>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan/10 text-cyan border border-cyan/30">
                    EXHIBITION SPEC
                  </span>
                </div>

                {/* Actual Prototype Mat Image extracted from presentation */}
                <div className="relative aspect-[4/3] bg-bg-card flex items-center justify-center overflow-hidden">
                  <img
                    src="/images/hardware/prototype_mat.png"
                    alt="FLOOR GUARD Prototype Smart Anti-Theft Floor Mat at Entrance"
                    className="w-full h-full object-cover object-center filter brightness-95 contrast-105"
                  />

                  {/* Pressure Sensor Target Overlay Graphic */}
                  <div className="absolute bottom-6 right-6 p-3 rounded-xl bg-bg-primary/85 backdrop-blur-md border border-cyan/40 text-left shadow-lg">
                    <div className="flex items-center gap-2 text-cyan font-mono text-xs font-semibold">
                      <span className="w-2 h-2 rounded-full bg-cyan animate-ping" />
                      <span>ZONE 01 ACTIVE</span>
                    </div>
                    <p className="text-[11px] text-text-secondary mt-0.5 font-mono">
                      Piezo Disc: 35mm Brass
                    </p>
                    <p className="text-[10px] text-text-muted font-mono">
                      Vibration / Transient Stress
                    </p>
                  </div>

                  {/* Footstep motif pulse badge */}
                  <div className="absolute top-4 left-4 bg-bg-primary/80 backdrop-blur-md border border-border px-3 py-1.5 rounded-lg text-xs font-mono text-text-primary flex items-center gap-2">
                    <Layers className="w-3.5 h-3.5 text-cyan" />
                    <span>Point of Entry Protection</span>
                  </div>
                </div>

                {/* Sub-panel metadata */}
                <div className="p-4 bg-bg-card/90 border-t border-border space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-text-secondary">Controller Architecture:</span>
                    <span className="font-mono text-cyan">Arduino Uno R3 + ESP8266</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-text-secondary">Visual Ingestion Transport:</span>
                    <span className="font-mono text-signal-blue">ESP32-CAM (OV2640)</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-text-secondary">Estimated Prototype BOM:</span>
                    <span className="font-mono text-state-success font-semibold">₹ 2,380/- (Total)</span>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

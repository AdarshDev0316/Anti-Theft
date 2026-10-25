import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Cpu, Code2, AlertTriangle, ExternalLink } from 'lucide-react';
import { FloorGuardLogo } from '../branding/FloorGuardLogo';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-bg-secondary border-t border-border mt-20 text-text-secondary text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Col 1: Identity */}
          <div className="md:col-span-2 space-y-4">
            <FloorGuardLogo variant="full" size="md" />
            <p className="text-xs text-text-muted leading-relaxed max-w-md">
              FLOOR GUARD is an IoT-based smart anti-theft floor mat security system combining mechanical stress sensing,
              Arduino processing, ESP8266 Wi-Fi connectivity, and edge computer vision for multi-stage intrusion verification.
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-bg-elevated border border-border text-[11px] font-mono text-cyan">
                <Cpu className="w-3.5 h-3.5" />
                PSIT Kanpur • Tech Expo 2026
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-bg-elevated border border-border text-[11px] font-mono text-signal-blue">
                <Code2 className="w-3.5 h-3.5" />
                Team Five Glitchbreakers
              </span>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-text-primary font-bold mb-3">
              Application Routes
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/" className="hover:text-cyan transition-colors">
                  Project Homepage (Route /)
                </Link>
              </li>
              <li>
                <Link to="/security" className="hover:text-cyan transition-colors flex items-center gap-1">
                  <span>Security Center (Route /security)</span>
                  <span className="text-[10px] bg-cyan/20 px-1.5 py-0.2 rounded text-cyan font-mono">LIVE</span>
                </Link>
              </li>
              <li>
                <a href="/#hardware" className="hover:text-cyan transition-colors">
                  Hardware Bill of Materials
                </a>
              </li>
              <li>
                <a href="/#architecture" className="hover:text-cyan transition-colors">
                  System Architecture
                </a>
              </li>
              <li>
                <a href="/#cost" className="hover:text-cyan transition-colors">
                  Cost Breakdown (₹2,380)
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Research & Team */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-text-primary font-bold mb-3">
              Project Team 5G
            </h4>
            <ul className="space-y-1.5 text-xs text-text-muted">
              <li className="text-text-primary font-medium">1. Adarsh Srivastava (Leader)</li>
              <li>2. Ankit Yadav</li>
              <li>3. Kushagra Awasthi</li>
              <li>4. Abhishek Pandey</li>
              <li>5. Arpit Chaturvedi</li>
            </ul>
            <div className="mt-4 pt-3 border-t border-border/50 text-[11px] text-text-muted">
              Pranveer Singh Institute of Technology, Kanpur
            </div>
          </div>
        </div>

        {/* Hardware & Prototype Notice */}
        <div className="mt-10 pt-6 border-t border-border/60">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 bg-bg-elevated/40 border border-border/80 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-state-warning shrink-0 mt-0.5" />
              <div className="text-xs space-y-1">
                <span className="font-semibold text-text-primary">
                  Technical Architecture & Hardware Notice:
                </span>
                <p className="text-text-muted leading-relaxed">
                  The physical prototype consists of an Arduino Uno R3, 35mm piezoelectric element, 16×2 LCD, active buzzer, ESP8266, and ESP32-CAM.
                  Browser-based face detection and 128-dimensional embedding verification run client-side with pre-trained models.
                  Live IoT device communication requires the configured firmware and network endpoint.
                </p>
              </div>
            </div>
            <div className="shrink-0 text-xs font-mono text-text-muted">
              © {currentYear} FLOOR GUARD. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

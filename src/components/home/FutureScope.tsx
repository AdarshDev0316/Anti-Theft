import React from 'react';
import { Sparkles, Grid3X3, Sliders, ShieldAlert, Cpu, BatteryMedium, Leaf, CheckCircle2, Clock } from 'lucide-react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';

export const FutureScope: React.FC = () => {
  const roadmaps = [
    {
      title: 'Multi-Zone Sensing Array',
      status: 'Roadmap Target',
      badge: 'Hardware Scaling',
      badgeVariant: 'blue' as const,
      icon: <Grid3X3 className="w-5 h-5 text-signal-blue" />,
      desc: 'Expanding beyond a single 35mm disc to an 8×8 pressure matrix capable of tracking step direction, stride length, and velocity across rooms.',
    },
    {
      title: 'ML Gait & Footstep Classification',
      status: 'Research Phase',
      badge: 'Edge ML',
      badgeVariant: 'cyan' as const,
      icon: <Cpu className="w-5 h-5 text-cyan" />,
      desc: 'Deploying lightweight TinyML vibration classifiers to filter false alarms caused by domestic pets, dropped household objects, or ambient tremors.',
    },
    {
      title: 'Piezoelectric Energy Harvesting',
      status: 'Proposed Concept',
      badge: 'Green Tech',
      badgeVariant: 'warning' as const,
      icon: <Leaf className="w-5 h-5 text-state-warning" />,
      desc: 'Inspired by JR East Tokyo Station piezo floor research (2008), harvesting ambient footstep kinetic energy to trickle-charge backup battery cells.',
    },
    {
      title: 'Hardware Anti-Tamper & Mesh Link',
      status: 'Design Phase',
      badge: 'Security Hardening',
      badgeVariant: 'blue' as const,
      icon: <ShieldAlert className="w-5 h-5 text-purple-400" />,
      desc: 'Capacitive tear detection and ESP-NOW mesh networking so that lifting, cutting, or displacing the mat triggers immediate silent alarm beacons.',
    },
    {
      title: 'Ultra-Low Power Deep Sleep',
      status: 'Firmware Update',
      badge: 'Power Optimization',
      badgeVariant: 'cyan' as const,
      icon: <BatteryMedium className="w-5 h-5 text-state-success" />,
      desc: 'Hardware interrupt-driven wakeups allowing the ESP8266 and camera to sleep at sub-milliamp levels until a piezoelectric voltage spike wakes the bus.',
    },
    {
      title: 'Browser & Edge Identity Verification',
      status: 'Implemented in Web App',
      badge: 'Active in v1.0',
      badgeVariant: 'success' as const,
      icon: <CheckCircle2 className="w-5 h-5 text-state-success" />,
      desc: 'Fully functional face detection and 128-dimensional descriptor matching against enrolled authorized reference profiles in the Security Center.',
    },
  ];

  return (
    <section className="py-20 bg-bg-secondary relative border-t border-border/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan/10 border border-cyan/30 text-cyan text-xs font-mono">
            <Sparkles className="w-3.5 h-3.5" />
            <span>PROJECT EVOLUTION & ROADMAP</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-text-primary tracking-tight">
            Future Scope & Engineering Horizon
          </h2>
          <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
            From the initial exhibition prototype to a commercial-grade, multi-zone IoT security product. Implemented capabilities are clearly differentiated from planned extensions.
          </p>
        </div>

        {/* 6 Roadmap Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {roadmaps.map((item) => (
            <Card
              key={item.title}
              className="bg-bg-card border-border hover:border-cyan/40 transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-bg-elevated border border-border flex items-center justify-center">
                    {item.icon}
                  </div>
                  <Badge variant={item.badgeVariant} size="sm">
                    {item.badge}
                  </Badge>
                </div>

                <div>
                  <h3 className="font-bold text-text-primary text-base">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-text-secondary mt-2 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-border/50 flex items-center justify-between text-[11px] font-mono">
                <span className="text-text-muted">Development Phase:</span>
                <span className={item.status === 'Active in v1.0' ? 'text-state-success font-semibold flex items-center gap-1' : 'text-cyan flex items-center gap-1'}>
                  {item.status === 'Active in v1.0' ? <CheckCircle2 className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                  {item.status}
                </span>
              </div>
            </Card>
          ))}
        </div>

      </div>
    </section>
  );
};

import React from 'react';
import { Home, Store, Building2, Warehouse, FlaskConical, ShieldAlert } from 'lucide-react';
import { Card } from '../ui/Card';

export const Applications: React.FC = () => {
  const applications = [
    {
      title: 'Homes & Apartments',
      subtitle: 'Residential Security',
      icon: <Home className="w-6 h-6 text-cyan" />,
      desc: 'Protects houses, apartments, and private villas from intruders and theft, safeguarding residents while asleep or away from home.',
      tags: ['Main Door', 'Balcony Access', 'Bedrooms'],
    },
    {
      title: 'Shops & Retail Stores',
      subtitle: 'Commercial Loss Prevention',
      icon: <Store className="w-6 h-6 text-signal-blue" />,
      desc: 'Monitors point of entry at storefronts, boutique showrooms, and jewelry counters after operating hours with zero blind spots.',
      tags: ['Storefront', 'Cash Counter', 'Rear Exit'],
    },
    {
      title: 'Offices & Workspaces',
      subtitle: 'Access Governance',
      icon: <Building2 className="w-6 h-6 text-state-warning" />,
      desc: 'Secures corporate thresholds, executive chambers, and restricts unauthorized visitor access outside scheduled business hours.',
      tags: ['Reception', 'Executive Cabins', 'IT Dept'],
    },
    {
      title: 'Warehouses & Storage',
      subtitle: 'Inventory Protection',
      icon: <Warehouse className="w-6 h-6 text-purple-400" />,
      desc: 'Provides low-cost, rugged intrusion detection across large godowns, loading docks, and restricted inventory aisles.',
      tags: ['Stock Rooms', 'Loading Bays', 'High-Value Aisles'],
    },
    {
      title: 'Labs & Research Facilities',
      subtitle: 'Asset Safeguarding',
      icon: <FlaskConical className="w-6 h-6 text-state-success" />,
      desc: 'Protects specialized calibration instruments, proprietary biological or chemical samples, and confidential R&D experiments.',
      tags: ['Cleanrooms', 'Testing Labs', 'Chemical Stores'],
    },
    {
      title: 'Restricted / High-Security Zones',
      subtitle: 'Critical Infrastructure',
      icon: <ShieldAlert className="w-6 h-6 text-state-critical" />,
      desc: 'Deploys under concealed rugs or access floor tiles in server rooms, institutional archives, data centers, and bank safety vaults.',
      tags: ['Server Rooms', 'Vaults', 'Control Centers'],
    },
  ];

  return (
    <section id="applications" className="py-20 bg-bg-secondary relative border-t border-border/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan/10 border border-cyan/30 text-cyan text-xs font-mono">
            <span>SLIDE 08 PRACTICAL APPLICATIONS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-text-primary tracking-tight">
            Where FLOOR GUARD Excels
          </h2>
          <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
            Because footsteps are unavoidable for physical intruders, floor-level piezoelectric sensing delivers a reliable early detection vector across diverse environments.
          </p>
        </div>

        {/* 6 Application Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {applications.map((app) => (
            <Card
              key={app.title}
              className="group hover:border-cyan/50 hover:bg-bg-elevated/40 transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-bg-elevated border border-border flex items-center justify-center group-hover:scale-105 transition-transform">
                    {app.icon}
                  </div>
                  <span className="text-[11px] font-mono uppercase text-text-muted">
                    {app.subtitle}
                  </span>
                </div>

                <div>
                  <h3 className="font-bold text-text-primary text-lg group-hover:text-cyan transition-colors">
                    {app.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-text-secondary mt-2 leading-relaxed">
                    {app.desc}
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-border/50 flex flex-wrap gap-1.5">
                {app.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] font-mono px-2 py-0.5 rounded bg-bg-primary text-text-muted border border-border"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </Card>
          ))}
        </div>

      </div>
    </section>
  );
};

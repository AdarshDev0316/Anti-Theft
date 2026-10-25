import React from 'react';
import { Lock, Video, Radio, BellRing, AlertCircle, CheckCircle2, XCircle } from 'lucide-react';
import { Card } from '../ui/Card';

export const ProblemSection: React.FC = () => {
  const existingSolutions = [
    {
      title: 'Traditional Door Locks',
      icon: <Lock className="w-5 h-5 text-red-400" />,
      limitations: [
        'No alert or notification when compromised',
        'Can be picked, pried, or bypassed silently',
        'Cannot detect intrusions through windows or other thresholds',
        'No real-time visibility or event logging',
      ],
      verdict: 'Passive barrier only — zero real-time awareness.',
    },
    {
      title: 'CCTV Cameras',
      icon: <Video className="w-5 h-5 text-amber-400" />,
      limitations: [
        'Primarily records footage after the fact',
        'Requires continuous manual human monitoring',
        'No immediate deterrent at the exact footstep moment',
        'Subject to optical blind spots and lighting variations',
      ],
      verdict: 'Post-incident investigative tool, not instant deterrence.',
    },
    {
      title: 'Smart Home Sensors (PIR/Door)',
      icon: <Radio className="w-5 h-5 text-blue-400" />,
      limitations: [
        'Detects only at specific contact points or line-of-sight',
        'PIR sensors can be circumvented by crawling or obstacles',
        'No contextual info regarding who entered or what triggered it',
        'Separate installation required at every individual opening',
      ],
      verdict: 'Limited field coverage inside rooms and hallways.',
    },
    {
      title: 'Smart Video Doorbells',
      icon: <BellRing className="w-5 h-5 text-purple-400" />,
      limitations: [
        'Restricted exclusively to exterior main entryway',
        'Cannot detect movement entering through balconies or windows',
        'Heavily dependent on continuous internet and cloud subscriptions',
        'Higher cost for multi-entry property coverage',
      ],
      verdict: 'Outer perimeter only — blind to internal circulation paths.',
    },
  ];

  return (
    <section id="gap" className="py-20 bg-bg-secondary relative border-t border-border/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-state-warning/10 border border-state-warning/30 text-state-warning text-xs font-mono">
            <AlertCircle className="w-3.5 h-3.5" />
            <span>THE REAL-WORLD PROBLEM</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-text-primary tracking-tight">
            When Homes Are Unattended, Security Gaps Become Costly.
          </h2>
          <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
            Standard residential and commercial security systems either merely record footage, require human supervision, or leave blind spots. Intrusions are frequently discovered only after valuables are already gone.
          </p>
        </div>

        {/* Real-World Case Evidence from Presentation Slide 2 */}
        <div className="mt-12 bg-bg-card border border-border rounded-2xl overflow-hidden p-6 lg:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-5 space-y-4">
              <span className="text-xs font-mono text-cyan tracking-wider uppercase font-semibold">
                INCIDENT ANALYSIS • SLIDE 02
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-text-primary">
                Delayed Awareness is the Greatest Security Vulnerability
              </h3>
              <p className="text-sm text-text-secondary leading-relaxed">
                As documented in news reports referenced by the project team, thieves exploit unattended hours. Traditional locks cannot notify owners when an intruder gets inside. CCTV records the crime, but unless someone notices in real time, valuable minutes are lost.
              </p>
              <div className="p-4 rounded-xl bg-bg-elevated border border-border space-y-2">
                <span className="text-xs font-mono font-semibold text-text-primary flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan" />
                  The Critical Gap:
                </span>
                <p className="text-xs text-text-muted leading-relaxed">
                  Real-time detection and immediate alert right at the physical <strong>point of footstep contact</strong>, integrated with visual identity verification.
                </p>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="rounded-xl overflow-hidden border border-border shadow-xl bg-black/40">
                <img
                  src="/images/diagrams/crime_news_cases.png"
                  alt="Real-world examples of intrusion, theft, and delayed awareness documented in project research"
                  className="w-full h-auto object-cover filter contrast-105"
                />
                <div className="p-3 bg-bg-card border-t border-border flex items-center justify-between text-[11px] font-mono text-text-muted">
                  <span>Source: Project Case Research Slides (Goa Arpora Villa, NBT News)</span>
                  <span className="text-state-warning">Loss: ₹2.95 Lakh+</span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* The Security Gap: 4 Solution Cards */}
        <div className="mt-16">
          <h3 className="text-xl font-bold text-text-primary text-center mb-8">
            Evaluation of Conventional Security Approaches
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {existingSolutions.map((sol) => (
              <Card key={sol.title} className="flex flex-col h-full bg-bg-card border-border hover:border-border-bright transition-all">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-bg-elevated border border-border flex items-center justify-center shrink-0">
                    {sol.icon}
                  </div>
                  <h4 className="font-semibold text-text-primary text-sm leading-tight">
                    {sol.title}
                  </h4>
                </div>

                <div className="space-y-2.5 flex-1">
                  <span className="text-[11px] font-mono uppercase text-text-muted">Inherent Limitations:</span>
                  <ul className="space-y-2 text-xs text-text-secondary">
                    {sol.limitations.map((lim, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <XCircle className="w-3.5 h-3.5 text-state-critical shrink-0 mt-0.5" />
                        <span>{lim}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 pt-3 border-t border-border/60 text-xs font-mono text-cyan/90 bg-bg-primary/50 p-2.5 rounded-lg">
                  {sol.verdict}
                </div>
              </Card>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

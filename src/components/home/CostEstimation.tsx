import React, { useState } from 'react';
import { IndianRupee, AlertCircle, Check, Info, FileSpreadsheet } from 'lucide-react';
import { Card } from '../ui/Card';
import { Modal } from '../ui/Modal';

export const CostEstimation: React.FC = () => {
  const [showCostModal, setShowCostModal] = useState(false);

  const bomItems = [
    { sNo: 1, component: 'Arduino UNO R3', spec: 'Main controller', cost: 550 },
    { sNo: 2, component: 'Piezoelectric Sensor', spec: '35mm (vibration/pressure)', cost: 30 },
    { sNo: 3, component: 'ESP8266 NodeMCU', spec: 'Wi-Fi module', cost: 250 },
    { sNo: 4, component: 'ESP32-CAM Module', spec: 'Camera module', cost: 450 },
    { sNo: 5, component: '16×2 LCD Display', spec: 'Display for status & alerts', cost: 180 },
    { sNo: 6, component: 'Active Buzzer', spec: '5V buzzer', cost: 30 },
    { sNo: 7, component: 'Micro Servo Motor', spec: 'SG90 (for lock/indicator)', cost: 160 },
    { sNo: 8, component: 'Push Button Switch', spec: 'User input (optional)', cost: 10 },
    { sNo: 9, component: 'Perf Board + Jumper Wires', spec: 'For connections', cost: 100 },
    { sNo: 10, component: '5V Power Supply', spec: 'Adapter/USB regulator', cost: 150 },
    { sNo: 11, component: 'Connecting Wires, Misc.', spec: 'Wires, connectors, etc.', cost: 70 },
  ];

  const totalCalculated = bomItems.reduce((acc, curr) => acc + curr.cost, 0);

  return (
    <section id="cost" className="py-20 bg-bg-primary relative border-t border-border/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-state-success/10 border border-state-success/30 text-state-success text-xs font-mono">
            <IndianRupee className="w-3.5 h-3.5" />
            <span>SLIDE 07 ESTIMATED PROTOTYPE BOM</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-text-primary tracking-tight">
            Cost Estimation of the Solution
          </h2>
          <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
            FLOOR GUARD was engineered as an accessible, easily deployable alternative to expensive enterprise security systems, using affordable off-the-shelf components.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Table (8 cols): Itemized BOM */}
          <div className="lg:col-span-8 bg-bg-card border border-border rounded-2xl overflow-hidden shadow-xl">
            <div className="p-4 sm:p-5 border-b border-border bg-bg-secondary/40 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-text-primary text-base">
                  Prototype Component Bill of Materials
                </h3>
                <p className="text-xs text-text-muted mt-0.5">
                  Direct itemization extracted from presentation Slide 07.
                </p>
              </div>
              <button
                onClick={() => setShowCostModal(true)}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-bg-elevated border border-border text-xs font-mono text-cyan hover:text-white transition-colors"
              >
                <FileSpreadsheet className="w-3.5 h-3.5" />
                <span>Original Slide Table</span>
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-border bg-bg-primary/50 text-[11px] font-mono text-text-muted uppercase">
                    <th className="py-3 px-4">#</th>
                    <th className="py-3 px-4">Component</th>
                    <th className="py-3 px-4">Specification / Role</th>
                    <th className="py-3 px-4 text-right">Cost (₹)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/60 font-mono">
                  {bomItems.map((item) => (
                    <tr key={item.sNo} className="hover:bg-bg-elevated/30 transition-colors">
                      <td className="py-2.5 px-4 text-text-muted">{item.sNo}</td>
                      <td className="py-2.5 px-4 font-sans font-semibold text-text-primary">{item.component}</td>
                      <td className="py-2.5 px-4 text-text-secondary text-xs">{item.spec}</td>
                      <td className="py-2.5 px-4 text-right text-cyan font-bold">₹ {item.cost}</td>
                    </tr>
                  ))}
                  <tr className="bg-bg-secondary/80 font-bold border-t-2 border-border text-sm">
                    <td colSpan={3} className="py-4 px-4 text-text-primary font-sans">
                      Total Calculated Prototype BOM Cost:
                    </td>
                    <td className="py-4 px-4 text-right text-state-success text-base">
                      ₹ {totalCalculated}/-
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Right Highlight Card (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Total Cost Display Card */}
            <div className="p-6 rounded-2xl bg-gradient-to-b from-bg-card to-bg-secondary border border-border shadow-xl space-y-4">
              <span className="text-xs font-mono uppercase text-cyan tracking-wider font-semibold">
                ESTIMATED PROTOTYPE BOM
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl sm:text-5xl font-black text-text-primary tracking-tight">
                  ₹ 2,380
                </span>
                <span className="text-sm font-mono text-text-muted">/ prototype</span>
              </div>
              <p className="text-xs text-text-secondary leading-relaxed">
                Complete bill of materials covering sensor, Arduino Uno, Wi-Fi module, camera, alert transducers, power regulation, and prototype board.
              </p>

              <div className="pt-3 border-t border-border space-y-2.5 text-xs">
                <div className="flex items-center gap-2 text-text-secondary">
                  <Check className="w-4 h-4 text-state-success shrink-0" />
                  <span>Low-cost & affordable for residential adoption</span>
                </div>
                <div className="flex items-center gap-2 text-text-secondary">
                  <Check className="w-4 h-4 text-state-success shrink-0" />
                  <span>Standard, readily available educational components</span>
                </div>
                <div className="flex items-center gap-2 text-text-secondary">
                  <Check className="w-4 h-4 text-state-success shrink-0" />
                  <span>Simple hardware assembly with 5V power supply</span>
                </div>
              </div>
            </div>

            {/* Crucial Technical & Financial Disclaimer as Requested */}
            <div className="p-4 rounded-xl bg-bg-card border border-border/80 text-xs space-y-2">
              <div className="flex items-center gap-2 text-state-warning font-semibold font-mono">
                <Info className="w-4 h-4 shrink-0" />
                <span>Financial Scope & Disclaimer</span>
              </div>
              <p className="text-text-muted leading-relaxed">
                The ₹2,380 figure reflects historical project presentation estimates from the college Tech Expo prototype. Component market rates fluctuate.
              </p>
              <p className="text-text-muted leading-relaxed">
                This figure strictly encompasses <strong>prototype bench components</strong>. Commercial production tooling, weatherproofing enclosure, PCB fabrication, cloud hosting, and continuous maintenance would entail separate engineering budgets.
              </p>
            </div>

          </div>

        </div>

      </div>

      {/* Original Slide Cost Table Modal */}
      <Modal
        isOpen={showCostModal}
        onClose={() => setShowCostModal(false)}
        title="Cost Estimation of the Solution"
        subtitle="Slide 07 High-Resolution Capture from Presentation"
        maxWidth="2xl"
      >
        <div className="space-y-4">
          <div className="rounded-xl overflow-hidden border border-border bg-black/60 p-2">
            <img
              src="/images/diagrams/cost_table.png"
              alt="Cost table from slide 07"
              className="w-full h-auto object-contain mx-auto"
            />
          </div>
          <p className="text-xs font-mono text-text-secondary">
            Arithmetic Check: ₹ 550 + 30 + 250 + 450 + 180 + 30 + 160 + 10 + 100 + 150 + 70 = exactly ₹ 2,380.
          </p>
        </div>
      </Modal>
    </section>
  );
};

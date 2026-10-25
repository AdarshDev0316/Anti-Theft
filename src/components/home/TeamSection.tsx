import React from 'react';
import { Users, GraduationCap, BookOpen, ExternalLink, Award } from 'lucide-react';
import { Card } from '../ui/Card';

export const TeamSection: React.FC = () => {
  const teamMembers = [
    { name: 'Adarsh Srivastava', role: 'Team Leader', id: 'TL-01' },
    { name: 'Ankit Yadav', role: 'Hardware & IoT Co-Developer', id: 'DEV-02' },
    { name: 'Kushagra Awasthi', role: 'Firmware & Circuit Specialist', id: 'DEV-03' },
    { name: 'Abhishek Pandey', role: 'Testing & Integration Co-Developer', id: 'DEV-04' },
    { name: 'Arpit Chaturvedi', role: 'Documentation & Research Analyst', id: 'DEV-05' },
  ];

  const references = [
    {
      id: '01',
      authors: 'Samalla, K., Chandaka, L., Ushaswini, L., Likhitha, M., & Jahnavi, M. (2024)',
      title: 'Design and Implementation of an IoT-Based Anti-Theft Mat Using Arduino Nano, ESP32 Camera, and Piezo Sensors.',
      journal: 'International Journal for Research in Applied Science and Engineering Technology (IJRASET), 12(6), 61933.',
      doi: '10.22214/ijraset.2024.61933',
    },
    {
      id: '02',
      authors: 'Hidayah, Q. H., Laksana, R. P., Prabowo, A., & Simatupang, D. S. (2026)',
      title: 'IoT-Based Home Security System: ESP32-CAM Integration and Real-Time Notification.',
      journal: 'Indonesian Journal of Electrical Engineering and Electronics (ITEE), 4(2), 149–161.',
      doi: '10.33050/itee.v4i2.956',
    },
    {
      id: '03',
      authors: 'Selim, K. K., Yehia, H. M., & Saleeb, D. A. (2024)',
      title: 'Energy Harvesting Floor Tile Using Piezoelectric Patches for Low-Power Applications.',
      journal: 'Journal of Vibration Engineering & Technologies, 12, 8613–8622.',
      doi: '10.1007/s42417-024-01379-z',
    },
    {
      id: '04',
      authors: 'East Japan Railway Company (2008)',
      title: "Demonstration Experiment of the 'Power-Generating Floor' at Tokyo Station.",
      journal: 'JR East Corporate Technical Press Release, Tokyo, Japan.',
      url: 'https://www.jreast.co.jp/e/development/press/20080111.pdf',
    },
  ];

  return (
    <section id="team" className="py-20 bg-bg-primary relative border-t border-border/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan/10 border border-cyan/30 text-cyan text-xs font-mono">
            <Users className="w-3.5 h-3.5" />
            <span>CREDITS & ACADEMIC ATTRIBUTION</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-text-primary tracking-tight">
            Team 5G — Five Glitchbreakers
          </h2>
          <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
            Developed for Tech Expo 2026 at Pranveer Singh Institute of Technology (PSIT), Kanpur.
          </p>
        </div>

        {/* Institutional & Team Identity Card */}
        <div className="bg-bg-card border border-border rounded-2xl p-6 lg:p-8 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-white/5 border border-border max-w-[220px]">
                <img
                  src="/images/diagrams/psit_logo.png"
                  alt="PSIT Pranveer Singh Institute of Technology Kanpur"
                  className="w-full h-auto object-contain filter brightness-110"
                />
              </div>
              <div className="space-y-1">
                <span className="text-xs font-mono uppercase text-cyan font-semibold">Institutional Host</span>
                <h4 className="font-bold text-text-primary text-base">PSIT Kanpur</h4>
                <p className="text-xs text-text-muted">Tech Expo 2026 Student Project Exhibition</p>
              </div>
            </div>

            <div className="flex items-center gap-4 md:border-l md:border-border/60 md:pl-8">
              <div className="p-3 rounded-xl bg-white/5 border border-border max-w-[140px]">
                <img
                  src="/images/diagrams/team_5g_logo.png"
                  alt="Five Glitchbreakers Team 5G"
                  className="w-full h-auto object-contain"
                />
              </div>
              <div className="space-y-1">
                <span className="text-xs font-mono uppercase text-signal-blue font-semibold">Engineering Team</span>
                <h4 className="font-bold text-text-primary text-base">Five Glitchbreakers (DevQBX)</h4>
                <p className="text-xs text-text-muted">IoT System Architecture & Prototyping</p>
              </div>
            </div>

          </div>
        </div>

        {/* 5 Team Members */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-16">
          {teamMembers.map((member, idx) => (
            <div
              key={member.name}
              className={`p-4 rounded-xl border transition-all text-center flex flex-col justify-between ${
                idx === 0
                  ? 'bg-cyan/10 border-cyan/40 shadow-lg shadow-cyan/5'
                  : 'bg-bg-card border-border hover:border-border-bright'
              }`}
            >
              <div>
                <span className="text-[10px] font-mono text-text-muted block mb-2">{member.id}</span>
                <h3 className="font-bold text-text-primary text-sm leading-tight">{member.name}</h3>
                <span className={`text-xs block mt-1 ${idx === 0 ? 'text-cyan font-semibold' : 'text-text-secondary'}`}>
                  {member.role}
                </span>
              </div>
              <div className="mt-4 pt-2 border-t border-border/40 text-[10px] font-mono text-text-muted">
                Student Innovator
              </div>
            </div>
          ))}
        </div>

        {/* Research References from Slide 09 */}
        <div className="bg-bg-card border border-border rounded-2xl p-6 lg:p-8">
          <div className="flex items-center gap-2 mb-6">
            <BookOpen className="w-5 h-5 text-cyan" />
            <h3 className="font-bold text-text-primary text-lg">
              Academic & Technical References (Slide 09)
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {references.map((ref) => (
              <div
                key={ref.id}
                className="p-4 rounded-xl bg-bg-secondary border border-border/80 text-xs space-y-2 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between font-mono text-cyan text-[11px] mb-1">
                    <span>REFERENCE [{ref.id}]</span>
                    {ref.doi && <span>DOI: {ref.doi}</span>}
                  </div>
                  <strong className="text-text-primary font-semibold block text-sm leading-snug">
                    {ref.title}
                  </strong>
                  <p className="text-text-secondary mt-1">
                    {ref.authors}
                  </p>
                  <p className="text-text-muted italic mt-0.5">
                    {ref.journal}
                  </p>
                </div>

                {ref.url && (
                  <div className="pt-2 border-t border-border/40">
                    <a
                      href={ref.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-cyan hover:underline inline-flex items-center gap-1 font-mono text-[11px]"
                    >
                      <span>View Technical Release Document</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

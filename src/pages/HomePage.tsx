import React from 'react';
import { Hero } from '../components/home/Hero';
import { ProblemSection } from '../components/home/ProblemSection';
import { Workflow } from '../components/home/Workflow';
import { HardwareGrid } from '../components/home/HardwareGrid';
import { ArchitectureDiagram } from '../components/home/ArchitectureDiagram';
import { Applications } from '../components/home/Applications';
import { CostEstimation } from '../components/home/CostEstimation';
import { FutureScope } from '../components/home/FutureScope';
import { TeamSection } from '../components/home/TeamSection';

export const HomePage: React.FC = () => {
  return (
    <main className="min-h-screen">
      <Hero />
      <div id="overview" className="sr-only">Project Overview Anchor</div>
      <ProblemSection />
      <Workflow />
      <HardwareGrid />
      <ArchitectureDiagram />
      <Applications />
      <CostEstimation />
      <FutureScope />
      <TeamSection />
    </main>
  );
};

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import HeroSection from './components/HeroSection.tsx';
import MarqueeSection from './components/MarqueeSection.tsx';
import AboutSection from './components/AboutSection.tsx';
import ServicesSection from './components/ServicesSection.tsx';
import ProjectsSection from './components/ProjectsSection.tsx';
import FooterSection from './components/FooterSection.tsx';
import ProjectDetailModal from './components/ProjectDetailModal.tsx';
import EngineeringProjectsModal from './components/EngineeringProjectsModal.tsx';
import ExperienceModal from './components/ExperienceModal.tsx';
import ContactModal from './components/ContactModal.tsx';
import PriceModal from './components/PriceModal.tsx';
import type { ProjectCardData } from './data/portfolioData.ts';

export default function App() {
  const [selectedProject, setSelectedProject] = useState<ProjectCardData | null>(null);
  const [isEngineeringOpen, setIsEngineeringOpen] = useState(false);
  const [isExperienceOpen, setIsExperienceOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isPriceOpen, setIsPriceOpen] = useState(false);

  return (
    <div
      className="min-h-screen w-full bg-[#0C0C0C] text-[#D7E2EA] font-['Kanit',sans-serif] relative select-none"
      style={{ overflowX: 'clip' }}
    >
      {/* Main Sections in Required Order */}
      <main className="w-full relative" style={{ overflowX: 'clip' }}>
        {/* 1. HeroSection */}
        <HeroSection
          onOpenContact={() => setIsContactOpen(true)}
          onOpenPrice={() => setIsPriceOpen(true)}
          onOpenExperience={() => setIsExperienceOpen(true)}
        />

        {/* 2. MarqueeSection */}
        <MarqueeSection />

        {/* 3. AboutSection */}
        <AboutSection
          onOpenContact={() => setIsContactOpen(true)}
          onOpenExperience={() => setIsExperienceOpen(true)}
        />

        {/* 4. ServicesSection */}
        <ServicesSection />

        {/* 5. ProjectsSection */}
        <ProjectsSection
          onOpenProject={(project) => setSelectedProject(project)}
          onOpenEngineeringProjects={() => setIsEngineeringOpen(true)}
        />
      </main>

      {/* Footer Section */}
      <FooterSection
        onOpenContact={() => setIsContactOpen(true)}
        onOpenPrice={() => setIsPriceOpen(true)}
        onOpenExperience={() => setIsExperienceOpen(true)}
        onOpenEngineeringProjects={() => setIsEngineeringOpen(true)}
      />

      {/* Interactive Modals */}
      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onOpenContact={() => setIsContactOpen(true)}
      />

      <EngineeringProjectsModal
        isOpen={isEngineeringOpen}
        onClose={() => setIsEngineeringOpen(false)}
        onOpenContact={() => setIsContactOpen(true)}
      />

      <ExperienceModal
        isOpen={isExperienceOpen}
        onClose={() => setIsExperienceOpen(false)}
        onOpenContact={() => setIsContactOpen(true)}
      />

      <PriceModal
        isOpen={isPriceOpen}
        onClose={() => setIsPriceOpen(false)}
        onOpenContact={() => setIsContactOpen(true)}
      />

      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />
    </div>
  );
}

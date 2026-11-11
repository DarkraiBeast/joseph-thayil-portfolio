import React from 'react';
import { FadeIn } from './ui/FadeIn.tsx';
import LivingPortrait from './LivingPortrait.tsx';
import { ContactButton } from './ui/ContactButton.tsx';

export interface HeroSectionProps {
  onOpenContact: () => void;
  onOpenPrice?: () => void;
  onOpenExperience?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenContact, onOpenPrice, onOpenExperience }) => {
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    if (targetId === 'price' && onOpenPrice) {
      onOpenPrice();
      return;
    }
    if (targetId === 'contact') {
      onOpenContact();
      return;
    }
    if (targetId === 'experience' && onOpenExperience) {
      onOpenExperience();
      return;
    }
    const elem = document.getElementById(targetId);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative h-screen w-full flex flex-col justify-between overflow-x-clip bg-[#0C0C0C] select-none">
      {/* 1. Navbar */}
      <FadeIn delay={0} y={-20} duration={0.6}>
        <header className="w-full px-6 md:px-10 pt-6 md:pt-8">
          <nav
            aria-label="Primary Navigation"
            className="w-full flex items-center justify-between text-[#D7E2EA] font-medium uppercase tracking-wider text-sm md:text-lg lg:text-[1.4rem]"
          >
            <a
              href="#about"
              onClick={(e) => handleNavClick(e, 'about')}
              className="cursor-pointer transition-opacity duration-200 hover:opacity-70 whitespace-nowrap"
            >
              About
            </a>
            <a
              href="#price"
              onClick={(e) => handleNavClick(e, 'experience')}
              className="cursor-pointer transition-opacity duration-200 hover:opacity-70 whitespace-nowrap"
            >
              Exposure
            </a>
            <a
              href="#projects"
              onClick={(e) => handleNavClick(e, 'projects')}
              className="cursor-pointer transition-opacity duration-200 hover:opacity-70 whitespace-nowrap"
            >
              Projects
            </a>
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, 'contact')}
              className="cursor-pointer transition-opacity duration-200 hover:opacity-70 whitespace-nowrap"
            >
              Contact
            </a>
          </nav>
        </header>
      </FadeIn>

      {/* 2. Hero Heading */}
      <div className="w-full overflow-hidden text-center flex justify-center items-center pointer-events-none z-0">
        <FadeIn delay={0.15} y={40} duration={0.8} className="w-full">
          <h1 className="hero-heading font-black uppercase tracking-tight leading-none whitespace-nowrap w-full text-[14vw] sm:text-[15vw] md:text-[1vw] lg:text-[15vw] mt-6 sm:mt-4 md:-mt-5 select-none">
            Hi, i&apos;m Joseph
          </h1>
        </FadeIn>
      </div>

      {/* 3. Hero Portrait: The Living Portrait with WebGL eye tracking and drag morphing */}
      <FadeIn delay={0.6} y={30} duration={0.9} className="pointer-events-auto">
        <LivingPortrait />
      </FadeIn>

      {/* 4. Bottom Bar */}
      <footer className="w-full px-6 md:px-10 pb-7 sm:pb-8 md:pb-10 flex justify-between items-end relative z-0">
        <FadeIn delay={0.35} y={20} duration={0.7}>
          <p
            className="text-[#D7E2EA] font-light uppercase tracking-wide leading-snug max-w-[160px] sm:max-w-[220px] md:max-w-[260px]"
            style={{ fontSize: 'clamp(0.75rem, 1.4vw, 1.5rem)' }}
          >
            A SOFTWARE DEVELOPER
PASSIONATE ABOUT BUILDING
INNOVATIVE, SCALABLE
AND MEANINGFUL DIGITAL EXPERIENCES
          </p>
        </FadeIn>

        <FadeIn delay={0.5} y={20} duration={0.7}>
          <ContactButton onClick={onOpenContact} />
        </FadeIn>
      </footer>
    </section>
  );
};

export default HeroSection;

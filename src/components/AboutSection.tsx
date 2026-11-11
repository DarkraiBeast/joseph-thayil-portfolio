import React from 'react';
import { FadeIn } from './ui/FadeIn.tsx';
import { AnimatedText } from './ui/AnimatedText.tsx';
import { ContactButton } from './ui/ContactButton.tsx';

export interface AboutSectionProps {
  onOpenContact: () => void;
  onOpenExperience?: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({
  onOpenContact,
  onOpenExperience,
}) => {
  return (
    <section
      id="about"
      className="relative min-h-screen w-full flex flex-col items-center justify-center bg-[#0C0C0C] px-5 sm:px-8 md:px-10 py-20 overflow-hidden select-none"
    >
      {/* 4 Corner 3D Decorative Assets */}
      {/* 1. Top-Left: Moon icon */}
      <div className="absolute top-[4%] left-[1%] sm:left-[2%] md:left-[4%] pointer-events-none z-10">
        <FadeIn delay={0.1} x={-80} y={0} duration={0.9}>
          <img
            src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/moon_icon.11395d36.png"
            alt="3D Moon Element"
            referrerPolicy="no-referrer"
            className="w-[120px] sm:w-[160px] md:w-[210px] object-contain drop-shadow-[0_15px_35px_rgba(0,0,0,0.7)]"
          />
        </FadeIn>
      </div>

      {/* 2. Bottom-Left: 3D object */}
      <div className="absolute bottom-[8%] left-[3%] sm:left-[6%] md:left-[10%] pointer-events-none z-10">
        <FadeIn delay={0.25} x={-80} y={0} duration={0.9}>
          <img
            src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/p59_1.4659672e.png"
            alt="3D Shape Element"
            referrerPolicy="no-referrer"
            className="w-[100px] sm:w-[140px] md:w-[180px] object-contain drop-shadow-[0_15px_35px_rgba(0,0,0,0.7)]"
          />
        </FadeIn>
      </div>

      {/* 3. Top-Right: Lego icon */}
      <div className="absolute top-[4%] right-[1%] sm:right-[2%] md:right-[4%] pointer-events-none z-10">
        <FadeIn delay={0.15} x={80} y={0} duration={0.9}>
          <img
            src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/lego_icon-1.703bb594.png"
            alt="3D Lego Element"
            referrerPolicy="no-referrer"
            className="w-[120px] sm:w-[160px] md:w-[210px] object-contain drop-shadow-[0_15px_35px_rgba(0,0,0,0.7)]"
          />
        </FadeIn>
      </div>

      {/* 4. Bottom-Right: 3D group */}
      <div className="absolute bottom-[8%] right-[3%] sm:right-[6%] md:right-[10%] pointer-events-none z-10">
        <FadeIn delay={0.3} x={80} y={0} duration={0.9}>
          <img
            src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/Group_134-1.2e04f3ce.png"
            alt="3D Geometry Group"
            referrerPolicy="no-referrer"
            className="w-[130px] sm:w-[170px] md:w-[220px] object-contain drop-shadow-[0_15px_35px_rgba(0,0,0,0.7)]"
          />
        </FadeIn>
      </div>

      {/* Central Content Stack */}
      <div className="relative z-20 flex flex-col items-center max-w-4xl mx-auto w-full">
        {/* Heading */}
        <FadeIn delay={0} y={40} duration={0.8} className="w-full text-center">
          <h2
            className="hero-heading font-black uppercase leading-none tracking-tight text-center"
            style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
          >
            About me
          </h2>
        </FadeIn>

        {/* Gap between heading and text: gap-10 sm:gap-14 md:gap-16 */}
        <div className="h-10 sm:h-14 md:h-16 w-full" />

        {/* Animated Paragraph with scroll character opacity */}
        <div className="w-full flex justify-center px-4">
          <AnimatedText
            text="I'm a passionate Software Developer with 3 years of professional experience in building modern, scalable, and user-focused web applications. I specialize in .NET, C#, ASP.NET Core, Blazor, and database technologies, with experience in developing both front-end and back-end solutions. Let's build something incredible together!"
          />
        </div>

        {/* Gap between text block and button: gap-16 sm:gap-20 md:gap-24 */}
        <div className="h-16 sm:h-20 md:h-24 w-full" />

        {/* Actions Container */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <ContactButton onClick={onOpenContact} />

          {onOpenExperience && (
            <button
              type="button"
              onClick={onOpenExperience}
              className="text-xs uppercase tracking-widest text-[#D7E2EA]/70 hover:text-white transition-colors duration-200 cursor-pointer py-2 px-4 border-b border-transparent hover:border-white/40"
            >
              View My Engineering Experience &amp; Achievements &rarr;
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;

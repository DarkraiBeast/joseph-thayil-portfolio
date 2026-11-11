import React, { useRef } from 'react';
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion';
import { FadeIn } from './ui/FadeIn.tsx';
import { LiveProjectButton } from './ui/LiveProjectButton.tsx';
import { STACKED_PROJECTS, type ProjectCardData } from '../data/portfolioData.ts';
import { Download, FileText, ArrowUpRight } from 'lucide-react';

interface ProjectCardProps {
  project: ProjectCardData;
  index: number;
  totalCards: number;
  progress: MotionValue<number>;
  targetScale: number;
  onOpenProject: (project: ProjectCardData) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  index,
  totalCards: _totalCards,
  progress,
  targetScale,
  onOpenProject,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Scale down as user scrolls towards bottom
  const scale = useTransform(progress, [index * 0.25, 1], [1, targetScale]);

  return (
    <div
      ref={containerRef}
      className="h-[85vh] flex items-center justify-center sticky top-24 md:top-32 w-full"
      style={{
        top: `calc(5rem + ${index * 28}px)`,
      }}
    >
      <motion.div
        style={{
          scale,
        }}
        className="w-full max-w-6xl rounded-[40px] sm:rounded-[50px] md:rounded-[60px] border-2 border-[#D7E2EA] bg-[#0C0C0C] p-4 sm:p-6 md:p-8 flex flex-col justify-between gap-6 shadow-[0_25px_60px_rgba(0,0,0,0.9)] origin-top select-none"
      >
        {/* Top Row: Number, category label, project name, Live Project button */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4 sm:pb-6">
          <div className="flex items-center gap-4 sm:gap-6 flex-wrap">
            {/* Number */}
            <span
              className="font-black text-[#D7E2EA] leading-none select-none"
              style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}
            >
              {project.number}
            </span>

            <div className="flex flex-col">
              {/* Category */}
              <span className="text-xs uppercase tracking-widest text-[#D7E2EA]/60 font-medium">
                {project.category}
              </span>
              {/* Project Title */}
              <h3
                className="font-black uppercase tracking-tight text-[#D7E2EA] leading-none"
                style={{ fontSize: 'clamp(1.4rem, 3.2vw, 2.5rem)' }}
              >
                {project.title}
              </h3>
            </div>
          </div>

          {/* Live Project Button */}
          <div className="shrink-0">
            <LiveProjectButton onClick={() => onOpenProject(project)} />
          </div>
        </div>

        {/* Bottom Row: Two-Column Image Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4 w-full items-stretch">
          {/* Left Column (40% width): 2 stacked images */}
          <div className="md:col-span-5 flex flex-col gap-3 sm:gap-4 justify-between">
            {/* Col1 Image 1 */}
            <div
              className="w-full overflow-hidden rounded-[40px] sm:rounded-[50px] md:rounded-[60px] bg-[#141414] border border-white/10 group relative"
              style={{ height: 'clamp(130px, 16vw, 230px)' }}
            >
              <img
                src={project.col1Image1}
                alt={`${project.title} Detail 1`}
                referrerPolicy="no-referrer"
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            {/* Col1 Image 2 */}
            <div
              className="w-full overflow-hidden rounded-[40px] sm:rounded-[50px] md:rounded-[60px] bg-[#141414] border border-white/10 group relative"
              style={{ height: 'clamp(160px, 22vw, 340px)' }}
            >
              <img
                src={project.col1Image2}
                alt={`${project.title} Detail 2`}
                referrerPolicy="no-referrer"
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          </div>

          {/* Right Column (60% width): 1 tall image */}
          <div className="md:col-span-7">
            <div
              className="w-full h-full min-h-[280px] sm:min-h-[360px] md:min-h-full overflow-hidden rounded-[40px] sm:rounded-[50px] md:rounded-[60px] bg-[#141414] border border-white/10 group relative"
            >
              <img
                src={project.col2Image}
                alt={`${project.title} Hero Showcase`}
                referrerPolicy="no-referrer"
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6 sm:p-8">
                <span className="text-xs uppercase tracking-widest text-white/90 bg-black/60 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
                  {project.tagline}
                </span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export interface ProjectsSectionProps {
  onOpenProject: (project: ProjectCardData) => void;
  onOpenEngineeringProjects?: () => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  onOpenProject,
  onOpenEngineeringProjects,
}) => {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const totalCards = STACKED_PROJECTS.length;

  return (
    <section
      ref={containerRef}
      id="projects"
      className="bg-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 relative z-10 px-5 sm:px-8 md:px-10 pt-20 sm:pt-24 md:pt-28 pb-32 w-full select-none"
    >
      <div className="max-w-6xl mx-auto w-full">
        {/* Section Heading */}
        <FadeIn delay={0} y={30} duration={0.8} className="w-full text-center mb-16 sm:mb-20 md:mb-24">
          <h2
            className="hero-heading font-black uppercase text-center leading-none tracking-tight"
            style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
          >
            Project
          </h2>
          <p className="mt-4 text-xs sm:text-sm uppercase tracking-widest text-[#D7E2EA]/60 font-medium">
            Live  &amp; Personal Projects · Full Stack &amp; AI Engineering
          </p>
        </FadeIn>

        {/* Sticky Stacked Cards */}
        <div className="relative w-full flex flex-col gap-10 isolate">
          {STACKED_PROJECTS.map((project, index) => {
            const targetScale = 1 - (totalCards - 1 - index) * 0.03;
            
            return (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                totalCards={totalCards}
                progress={scrollYProgress}
                targetScale={targetScale}
                onOpenProject={onOpenProject}
              />
            );
          })}
        </div>

        {/* Switcher / Drawer link for Joseph's Engineering Projects */}
        {onOpenEngineeringProjects && (
          <FadeIn delay={0.2} y={20} className="mt-20 text-center">
            <div className="p-8 rounded-3xl bg-neutral-900/60 border border-white/10 max-w-2xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-left">
                <span className="text-xs uppercase tracking-widest text-[#BBCCD7] font-medium">
                  Full-Stack &amp; AI Engineering
                </span>
                <h4 className="text-lg font-bold text-white uppercase mt-1">
                  Joseph&apos;s Engineering Projects
                </h4>
                <p className="text-xs text-[#D7E2EA]/70 mt-1">
                  Wind Speed AI Forecast, Movie Streaming SPA, Pizza E-Commerce
                </p>
              </div>
              <button
                type="button"
                onClick={onOpenEngineeringProjects}
                className="shrink-0 px-6 py-3 rounded-full border border-[#D7E2EA] text-[#D7E2EA] text-xs font-semibold uppercase tracking-wider hover:bg-[#D7E2EA] hover:text-[#0C0C0C] transition-all duration-200 cursor-pointer"
              >
                Explore Code &amp; Apps &rarr;
              </button>
            </div>
          </FadeIn>
        )}

        {/* Creative Resume Download Section */}
        {/* <FadeIn delay={0.3} y={30} className="mt-24 mb-10">
          <div className="relative overflow-hidden rounded-[32px] border border-white/15 bg-[#121212] p-8 sm:p-12">

            {/* Background decoration 
            <div className="absolute -right-20 -top-20 w-72 h-72 rounded-full
              bg-purple-600/10 blur-[100px] pointer-events-none" />

            <div className="relative z-10">

              <div className="flex items-center gap-2 mb-6">
                <FileText className="w-4 h-4 text-purple-400" />
                <span className="text-xs uppercase tracking-[0.3em] text-[#BBCCD7]">
                  Career / Profile
                </span>
              </div>

              <div className="flex flex-col md:flex-row md:items-end
                justify-between gap-8">

                <div className="max-w-2xl">

                  <h3 className="text-3xl sm:text-5xl md:text-6xl
                    font-black uppercase tracking-tight text-white leading-none">
                    THE PERSON
                    <br />
                    BEHIND THE CODE<span className="text-purple-500">.</span>
                  </h3>

                  <p className="mt-5 text-sm sm:text-base
                    text-[#D7E2EA]/65 leading-relaxed max-w-xl">
                    A closer look at my professional journey, technical
                    expertise, experience, and the solutions I've built.
                  </p>

                  <div className="flex items-center gap-3 mt-6">
                    <span className="text-xs font-mono text-white/50">
                      JOSEPH THAYIL
                    </span>
                    <span className="w-1 h-1 rounded-full bg-purple-500" />
                    <span className="text-xs font-mono text-white/50">
                      SOFTWARE ENGINEER
                    </span>
                  </div>
                </div>

                {/* Download Button 
                <a
                  href="/resume.pdf"
                  download="Joseph_Thayil_Resume.pdf"
                  className="group shrink-0 inline-flex items-center
                    justify-center gap-3 px-7 py-4 rounded-full
                    bg-gradient-to-r from-[#B600A8] to-[#7621B0]
                    text-white text-xs font-bold uppercase tracking-wider
                    hover:scale-105 transition-all duration-300
                    shadow-[0_0_30px_rgba(182,0,168,0.2)]"
                >
                  <Download className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
                  Download Resume
                  <ArrowUpRight className="w-4 h-4" />
                </a>

              </div>

              <div className="mt-10 pt-5 border-t border-white/10
                flex justify-between items-center">
                <span className="text-[10px] uppercase tracking-widest text-white/40">
                  Professional Profile
                </span>
                <span className="text-[10px] font-mono text-white/40">
                  PDF DOCUMENT
                </span>
              </div>

            </div>
          </div>
        </FadeIn> */}


      </div>
    </section>
  );
};

export default ProjectsSection;

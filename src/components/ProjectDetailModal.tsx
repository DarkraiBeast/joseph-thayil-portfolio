import React, { useEffect } from 'react';
import { X, ExternalLink, Layers, CheckCircle2 } from 'lucide-react';
import type { ProjectCardData } from '../data/portfolioData.ts';

export interface ProjectDetailModalProps {
  project: ProjectCardData | null;
  onClose: () => void;
  onOpenContact: () => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
  project,
  onClose,
  onOpenContact,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl bg-[#121212] border border-white/15 rounded-3xl p-6 sm:p-8 text-[#D7E2EA] shadow-2xl my-auto max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-5 right-5 p-2 rounded-full bg-white/5 hover:bg-white/15 text-[#D7E2EA] transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-2">
          <span className="font-mono text-xs uppercase tracking-widest text-[#BBCCD7] font-semibold">
            {project.category} Showcase · #{project.number}
          </span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-white mb-2">
          {project.title}
        </h2>
        <p className="text-sm sm:text-base text-[#D7E2EA]/80 font-light max-w-2xl mb-6">
          {project.tagline}
        </p>

        {/* Imagery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
          <div className="h-44 md:h-56 rounded-2xl overflow-hidden bg-black/40 border border-white/10">
            <img
              src={project.col1Image1}
              alt={`${project.title} View 1`}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="h-44 md:h-56 rounded-2xl overflow-hidden bg-black/40 border border-white/10">
            <img
              src={project.col1Image2}
              alt={`${project.title} View 2`}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="h-44 md:h-56 rounded-2xl overflow-hidden bg-black/40 border border-white/10">
            <img
              src={project.col2Image}
              alt={`${project.title} View 3`}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Narrative & Specifications */}
        <div className="bg-neutral-900/60 rounded-2xl p-5 border border-white/10 mb-6">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-white mb-2 flex items-center gap-2">
            <Layers className="w-4 h-4 text-[#BBCCD7]" /> Architecture &amp; Creative Execution
          </h3>
          <p className="text-sm leading-relaxed text-[#D7E2EA]/80 mb-4">
            {project.description}
          </p>

          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs uppercase tracking-widest text-white/50 mr-2">Tech Stack:</span>
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="text-xs font-mono px-3 py-1 rounded-md bg-white/5 border border-white/10 text-white/90"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6 text-xs text-[#D7E2EA]/80">
          <div className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <span>High-performance 60fps WebGL rendering pass pipeline</span>
          </div>
          <div className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <span>Responsive camera rigging with dynamic field-of-view</span>
          </div>
          <div className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <span>Optimized geometry instancing with minimal draw calls</span>
          </div>
          <div className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <span>WCAG compliant typography hierarchy and fluid scaling</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-white/10 flex-wrap gap-3">
          <span className="text-xs text-white/50">
            Have a similar 3D spatial vision for your brand?
          </span>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => {
                onClose();
                onOpenContact();
              }}
              className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#B600A8] to-[#7621B0] text-white text-xs font-medium uppercase tracking-wider hover:opacity-90 transition-opacity cursor-pointer"
            >
              Inquire Project
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-full border border-white/20 text-xs font-medium uppercase tracking-wider text-white hover:bg-white/5 transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailModal;

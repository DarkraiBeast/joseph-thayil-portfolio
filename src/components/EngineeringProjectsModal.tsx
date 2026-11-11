import React, { useEffect } from 'react';
import { X, Code2, Wind, Film, Pizza, CheckCircle, ExternalLink } from 'lucide-react';
import { ENGINEERING_PROJECTS } from '../data/portfolioData.ts';

export interface EngineeringProjectsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenContact: () => void;
}

export const EngineeringProjectsModal: React.FC<EngineeringProjectsModalProps> = ({
  isOpen,
  onClose,
  onOpenContact,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const getIcon = (id: string) => {
    switch (id) {
      case 'wind-speed-ai':
        return <Wind className="w-6 h-6 text-cyan-400" />;
      case 'movie-streaming':
        return <Film className="w-6 h-6 text-purple-400" />;
      case 'pizza-ecommerce':
        return <Pizza className="w-6 h-6 text-amber-400" />;
      default:
        return <Code2 className="w-6 h-6 text-white" />;
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto"
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
          <Code2 className="w-5 h-5 text-[#BBCCD7]" />
          <span className="text-xs uppercase tracking-widest text-[#BBCCD7] font-semibold">
            Engineering &amp; Web Development Works
          </span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-white mb-2">
          Joseph&apos;s Key Projects
        </h2>
        <p className="text-sm text-[#D7E2EA]/75 font-light mb-8 max-w-2xl">
          Real production systems and academic engineering applications built across machine learning, dynamic single page apps, and responsive e-commerce web platforms.
        </p>

        {/* Project Cards List */}
        <div className="flex flex-col gap-6">
          {ENGINEERING_PROJECTS.map((project) => (
            <div
              key={project.id}
              className="p-6 rounded-2xl bg-neutral-900/80 border border-white/10 hover:border-white/20 transition-all duration-300"
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10 shrink-0">
                    {getIcon(project.id)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className="text-xs font-mono uppercase tracking-wider text-[#BBCCD7]">
                        {project.subtitle}
                      </span>
                      {project.period && (
                        <>
                          <span className="text-white/30">·</span>
                          <span className="text-xs text-white/50">{project.period}</span>
                        </>
                      )}
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-white uppercase tracking-tight">
                      {project.title}
                    </h3>
                  </div>
                </div>

                <span className="inline-block text-xs font-medium uppercase tracking-wider px-3 py-1 rounded-full bg-white/5 border border-white/15 text-white/90 self-start">
                  {project.badge}
                </span>
              </div>

              {/* Highlights */}
              <ul className="flex flex-col gap-2.5 text-xs sm:text-sm text-[#D7E2EA]/85 mb-5 pl-1">
                {project.highlights.map((highlight, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>

              {/* Tech Stack Tags */}
              <div className="flex items-center gap-2 flex-wrap pt-3 border-t border-white/5">
                <span className="text-xs font-mono text-white/40 uppercase">Technologies:</span>
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="text-xs font-mono px-2.5 py-0.5 rounded bg-white/5 text-white/80 border border-white/10"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between pt-6 mt-6 border-t border-white/10 flex-wrap gap-4">
          <p className="text-xs text-white/60">
            Seeking a software engineer with full-stack and ML capabilities?
          </p>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => {
                onClose();
                onOpenContact();
              }}
              className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#B600A8] to-[#7621B0] text-white text-xs font-medium uppercase tracking-wider hover:opacity-90 transition-opacity cursor-pointer"
            >
              Get in Touch
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

export default EngineeringProjectsModal;

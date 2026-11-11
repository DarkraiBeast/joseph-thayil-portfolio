import React, { useEffect, useState } from 'react';
import {
  X,
  Briefcase,
  GraduationCap,
  Award,
  Target,
  Building,
  Calendar,
  MapPin,
  CheckCircle2,
} from 'lucide-react';
import {
  PROFESSIONAL_EXPERIENCES,
  EDUCATION_ITEMS,
  CERTIFICATIONS,
  ATHLETICS,
} from '../data/portfolioData.ts';

export interface ExperienceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenContact: () => void;
}

export const ExperienceModal: React.FC<ExperienceModalProps> = ({
  isOpen,
  onClose,
  onOpenContact,
}) => {
  const [activeTab, setActiveTab] = useState<'experience' | 'education' | 'athletics'>(
    'experience'
  );

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

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl bg-[#121212] border border-white/15 rounded-3xl p-6 sm:p-8 text-[#D7E2EA] shadow-2xl my-auto max-h-[92vh] overflow-y-auto"
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
          <Briefcase className="w-5 h-5 text-[#BBCCD7]" />
          <span className="text-xs uppercase tracking-widest text-[#BBCCD7] font-semibold">
            Curriculum Vitae &amp; Background
          </span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-white mb-2">
          Joseph Thayil
        </h2>
        <p className="text-sm text-[#D7E2EA]/75 font-light mb-6">
          Software Engineer &amp; Full-Stack Specialist with production experience in ASP.NET Core, Blazor, React, and SQL Server.
        </p>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 p-1.5 bg-neutral-900 rounded-xl mb-6 border border-white/10 overflow-x-auto">
          <button
            type="button"
            onClick={() => setActiveTab('experience')}
            className={`px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer flex items-center gap-2 ${
              activeTab === 'experience'
                ? 'bg-white text-black shadow-sm'
                : 'text-[#D7E2EA]/70 hover:text-white'
            }`}
          >
            <Briefcase className="w-3.5 h-3.5" /> Experience
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('education')}
            className={`px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer flex items-center gap-2 ${
              activeTab === 'education'
                ? 'bg-white text-black shadow-sm'
                : 'text-[#D7E2EA]/70 hover:text-white'
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5" /> Education &amp; Certs
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('athletics')}
            className={`px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer flex items-center gap-2 ${
              activeTab === 'athletics'
                ? 'bg-white text-black shadow-sm'
                : 'text-[#D7E2EA]/70 hover:text-white'
            }`}
          >
            <Target className="w-3.5 h-3.5" /> Archery (3x Gold)
          </button>
        </div>

        {/* Tab 1: Experience */}
        {activeTab === 'experience' && (
          <div className="flex flex-col gap-6">
            {PROFESSIONAL_EXPERIENCES.map((exp, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-neutral-900/70 border border-white/10"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-4 mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-white uppercase tracking-tight">
                      {exp.role}
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-[#BBCCD7] mt-1 flex-wrap">
                      <span className="flex items-center gap-1 font-medium">
                        <Building className="w-3.5 h-3.5" /> {exp.company}
                      </span>
                      <span>·</span>
                      <span className="flex items-center gap-1 text-white/60">
                        <MapPin className="w-3.5 h-3.5" /> {exp.location}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-mono text-white/70">
                    <Calendar className="w-3.5 h-3.5 text-white/50" />
                    <span>{exp.period}</span>
                  </div>
                </div>

                <div className="flex flex-col gap-5">
                  {exp.projects.map((proj, pIdx) => (
                    <div key={pIdx} className="pl-3 border-l-2 border-white/20">
                      <div className="flex items-center justify-between gap-2 mb-2 flex-wrap">
                        <h4 className="text-sm font-semibold text-white uppercase">
                          Project: {proj.name}
                        </h4>
                        <div className="flex items-center gap-2 text-xs font-mono text-white/50">
                          <span>{proj.focus}</span>
                          <span>·</span>
                          <span className="text-[#BBCCD7]">{proj.duration}</span>
                        </div>
                      </div>
                      <ul className="flex flex-col gap-1.5 text-xs text-[#D7E2EA]/80 pl-1">
                        {proj.bullets.map((b, bIdx) => (
                          <li key={bIdx} className="flex items-start gap-2">
                            <span className="text-purple-400 mt-0.5">•</span>
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 2: Education & Certifications */}
        {activeTab === 'education' && (
          <div className="flex flex-col gap-6">
            {/* Degree List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {EDUCATION_ITEMS.map((edu, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-neutral-900/70 border border-white/10 flex flex-col justify-between"
                >
                  <div>
                    <span className="text-xs font-mono uppercase text-[#BBCCD7] tracking-wider">
                      {edu.period}
                    </span>
                    <h4 className="text-base font-bold text-white uppercase mt-1">
                      {edu.degree}
                    </h4>
                    <p className="text-xs text-[#D7E2EA]/80 mt-1">
                      {edu.institution} · {edu.location}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs">
                    <span className="text-white/50">Academic CGPA</span>
                    <span className="font-mono font-bold text-emerald-400">{edu.cgpa} / 10.0</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Certifications Grid */}
            <div className="p-5 rounded-2xl bg-neutral-900/70 border border-white/10">
              <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-4 flex items-center gap-2">
                <Award className="w-4 h-4 text-amber-400" /> Professional Certifications
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {CERTIFICATIONS.map((cert, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-white/5 border border-white/5 flex items-start gap-2.5"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-medium text-white">{cert.name}</p>
                      <span className="text-[10px] font-mono uppercase text-white/50">
                        {cert.issuer}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Athletics & Archery */}
        {activeTab === 'athletics' && (
          <div className="p-6 rounded-2xl bg-gradient-to-br from-amber-500/10 via-neutral-900 to-neutral-900 border border-amber-500/20">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
                <Target className="w-8 h-8" />
              </div>
              <div>
                <span className="text-xs uppercase font-mono tracking-widest text-amber-400 font-semibold">
                  Athletic Excellence
                </span>
                <h3 className="text-xl font-black text-white uppercase tracking-tight">
                  {ATHLETICS.title}
                </h3>
                <p className="text-xs text-[#D7E2EA]/75">{ATHLETICS.subtitle}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-6">
              <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-center">
                <div className="text-3xl font-black text-amber-400 font-mono">3</div>
                <div className="text-xs uppercase tracking-wider text-white font-semibold mt-1">
                  Gold Medals
                </div>
                <div className="text-[10px] text-white/50">State Level Championships</div>
              </div>
              <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-center">
                <div className="text-3xl font-black text-white font-mono">National</div>
                <div className="text-xs uppercase tracking-wider text-white font-semibold mt-1">
                  Games Player
                </div>
                <div className="text-[10px] text-white/50">Goa State Contingent</div>
              </div>
              <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-center">
                <div className="text-3xl font-black text-emerald-400 font-mono">100%</div>
                <div className="text-xs uppercase tracking-wider text-white font-semibold mt-1">
                  Discipline
                </div>
                <div className="text-[10px] text-white/50">High-Pressure Execution</div>
              </div>
            </div>

            <ul className="flex flex-col gap-2.5 text-xs sm:text-sm text-[#D7E2EA]/85 pl-1">
              {ATHLETICS.achievements.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Modal Footer */}
        <div className="flex items-center justify-between pt-6 mt-6 border-t border-white/10 flex-wrap gap-4">
          <p className="text-xs text-white/60">
            Open to exciting software engineering opportunities and collaborations.
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
              Contact Joseph
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

export default ExperienceModal;

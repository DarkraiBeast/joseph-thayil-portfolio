
import React from 'react';
import {
  ArrowUp,
  ArrowUpRight,
  Download,
  Mail,
  Sparkles,
} from 'lucide-react';

export interface FooterSectionProps {
  onOpenContact: () => void;
  onOpenPrice: () => void;
  onOpenExperience: () => void;
  onOpenEngineeringProjects: () => void;
}

export const FooterSection: React.FC<FooterSectionProps> = ({
  onOpenContact,
  onOpenPrice,
  onOpenExperience,
  onOpenEngineeringProjects,
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  return (
    <footer className="relative w-full bg-[#0C0C0C] text-[#D7E2EA] border-t border-white/10 px-6 sm:px-10 md:px-12 pt-20 pb-8 overflow-hidden">

      {/* Background Glow */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2
        w-[500px] h-[300px] bg-purple-700/10 blur-[120px]
        rounded-full pointer-events-none" />

      <div className="relative max-w-6xl mx-auto">

        {/* Main CTA */}
        <div className="pb-16 md:pb-20 border-b border-white/10">

          <div className="flex items-center gap-2 mb-6">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span className="text-[10px] sm:text-xs uppercase
              tracking-[0.3em] font-semibold text-[#BBCCD7]">
              The next project starts here
            </span>
          </div>

          <div className="flex flex-col lg:flex-row
            lg:items-end justify-between gap-8">

            <div className="max-w-3xl">

              <h2 className="text-4xl sm:text-6xl md:text-7xl
                font-black uppercase tracking-tight
                text-white leading-[0.95]">
                GOOD IDEAS
                <br />
                DESERVE TO BE
                <br />
                BUILT<span className="text-purple-500">.</span>
              </h2>

              <p className="mt-6 text-sm sm:text-base
                text-[#D7E2EA]/60 max-w-xl leading-relaxed">
                From full-stack engineering to creative digital
                experiences, I'm always open to interesting
                opportunities, collaborations, and new challenges.
              </p>

            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row
              lg:flex-col xl:flex-row gap-3 shrink-0">

              <button
                type="button"
                onClick={onOpenContact}
                className="group flex items-center justify-center
                  gap-3 px-7 py-4 rounded-full
                  bg-gradient-to-r from-[#B600A8] to-[#7621B0]
                  text-white text-xs font-bold uppercase
                  tracking-wider hover:scale-105
                  transition-all duration-300
                  shadow-[0_0_25px_rgba(182,0,168,0.15)]
                  cursor-pointer"
              >
                <Mail className="w-4 h-4" />
                Let's Connect
                <ArrowUpRight className="w-4 h-4
                  group-hover:translate-x-1
                  group-hover:-translate-y-1 transition-transform" />
              </button>

              <a
                href="/resume.pdf"
                download="Joseph_Thayil_Resume.pdf"
                className="group flex items-center justify-center
                  gap-3 px-7 py-4 rounded-full
                  border border-white/20 text-white
                  text-xs font-bold uppercase tracking-wider
                  hover:bg-white hover:text-black
                  hover:border-white transition-all duration-300"
              >
                <Download className="w-4 h-4
                  group-hover:-translate-y-1 transition-transform" />
                Download Resume
              </a>

            </div>
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="py-10 flex flex-col lg:flex-row
          items-center justify-between gap-8">

          {/* Brand */}
          <div className="flex flex-col items-center
            lg:items-start text-center lg:text-left">

            <span className="text-xl sm:text-2xl
              font-black uppercase tracking-tight text-white">
              JOSEPH — WEB &amp; Software Engineer 
            </span>

            <p className="text-[11px] text-[#D7E2EA]/50 mt-2">
              Full Stack .NET Developer | C# | ASP.NET Core | Blazor | React JS | Angular | SQL Server
            </p>

            <p className="text-[10px] text-purple-400/80
              uppercase tracking-widest mt-2">
              Ponda, Goa · India
            </p>
          </div>

          {/* Navigation */}
          <nav
            aria-label="Footer Navigation"
            className="flex items-center justify-center
              gap-x-6 gap-y-4 flex-wrap text-[11px]
              uppercase tracking-wider font-semibold
              text-[#D7E2EA]/60"
          >
            <button onClick={() => scrollTo('about')}
              className="hover:text-white transition-colors cursor-pointer">
              About
            </button>

            {/* <button onClick={onOpenPrice}
              className="hover:text-white transition-colors cursor-pointer">
              Price
            </button> */}

            <button onClick={() => scrollTo('projects')}
              className="hover:text-white transition-colors cursor-pointer">
              Projects
            </button>

            <button onClick={onOpenEngineeringProjects}
              className="hover:text-white transition-colors cursor-pointer">
              Engineering
            </button>

            <button onClick={onOpenExperience}
              className="hover:text-white transition-colors cursor-pointer">
              Experience
            </button>

            <button onClick={onOpenContact}
              className="text-purple-400 hover:text-purple-300
                transition-colors cursor-pointer">
              Contact
            </button>
          </nav>

          {/* Back to Top */}
          <button
            type="button"
            onClick={scrollToTop}
            aria-label="Back to top"
            className="group flex items-center gap-3
              px-4 py-3 rounded-full border border-white/15
              text-[10px] uppercase tracking-widest
              text-white/60 hover:text-white
              hover:border-purple-400/60 transition-all cursor-pointer"
          >
            Back to top
            <ArrowUp className="w-3.5 h-3.5
              group-hover:-translate-y-1 transition-transform" />
          </button>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-6
          flex flex-col sm:flex-row items-center
          justify-between gap-4">

          <p className="text-[10px] text-[#D7E2EA]/35
            tracking-wide text-center">
            © {new Date().getFullYear()} Joseph Thayil.
            All rights reserved.
          </p>

          <div className="flex items-center gap-2
            text-[10px] text-[#D7E2EA]/35 uppercase
            tracking-wider">
            <span>Designed &amp; Developed with</span>
            <span className="text-purple-400">♥</span>
            <span>By Joseph</span>
          </div>

        </div>

      </div>
    </footer>
  );
};

export default FooterSection;

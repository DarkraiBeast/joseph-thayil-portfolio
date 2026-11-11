import React, { useRef, useState, useEffect } from 'react';
import { MARQUEE_IMAGES_ROW_1, MARQUEE_IMAGES_ROW_2 } from '../data/portfolioData.ts';

export const MarqueeSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [offset, setOffset] = useState<number>(0);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (sectionRef.current) {
            const rect = sectionRef.current.getBoundingClientRect();
            const sectionTop = window.scrollY + rect.top;
            const currentOffset = (window.scrollY - sectionTop + window.innerHeight) * 0.3;
            setOffset(currentOffset);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    // Calculate initial position
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  // Row 1: 11 images tripled
  const row1Images = [...MARQUEE_IMAGES_ROW_1, ...MARQUEE_IMAGES_ROW_1, ...MARQUEE_IMAGES_ROW_1];
  // Row 2: 10 images tripled
  const row2Images = [...MARQUEE_IMAGES_ROW_2, ...MARQUEE_IMAGES_ROW_2, ...MARQUEE_IMAGES_ROW_2];

  const row1Transform = `translateX(${offset - 200}px)`;
  const row2Transform = `translateX(${-(offset - 200)}px)`;

  return (
    <section
      ref={sectionRef}
      className="bg-[#0C0C0C] pt-24 sm:pt-32 md:pt-40 pb-10 overflow-hidden w-full select-none"
    >
      <div className="flex flex-col gap-3 w-full">
        {/* Row 1 - Moves RIGHT on scroll */}
        <div
          className="flex gap-3 transition-transform ease-out duration-75"
          style={{
            transform: row1Transform,
            willChange: 'transform',
          }}
        >
          {row1Images.map((src, index) => (
            <div
              key={`row1-${index}`}
              className="w-[420px] h-[270px] min-w-[420px] shrink-0 rounded-2xl overflow-hidden bg-[#181818] relative group border border-white/5 shadow-lg"
            >
              <img
                src={src}
                alt={`Motion Site Showcase ${(index % MARQUEE_IMAGES_ROW_1.length) + 1}`}
                loading="lazy"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                onError={(e) => {
                  // Fallback container
                  const target = e.currentTarget;
                  target.style.display = 'none';
                  const parent = target.parentElement;
                  if (parent) {
                    parent.classList.add('flex', 'items-center', 'justify-center', 'bg-neutral-900');
                    parent.innerHTML = `<span class="text-xs uppercase tracking-widest text-slate-500 font-mono">3D Scene ${(index % MARQUEE_IMAGES_ROW_1.length) + 1}</span>`;
                  }
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </div>
          ))}
        </div>

        {/* Row 2 - Moves LEFT on scroll */}
        <div
          className="flex gap-3 transition-transform ease-out duration-75"
          style={{
            transform: row2Transform,
            willChange: 'transform',
          }}
        >
          {row2Images.map((src, index) => (
            <div
              key={`row2-${index}`}
              className="w-[420px] h-[270px] min-w-[420px] shrink-0 rounded-2xl overflow-hidden bg-[#181818] relative group border border-white/5 shadow-lg"
            >
              <img
                src={src}
                alt={`Motion Site Showcase ${(index % MARQUEE_IMAGES_ROW_2.length) + 1}`}
                loading="lazy"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                onError={(e) => {
                  const target = e.currentTarget;
                  target.style.display = 'none';
                  const parent = target.parentElement;
                  if (parent) {
                    parent.classList.add('flex', 'items-center', 'justify-center', 'bg-neutral-900');
                    parent.innerHTML = `<span class="text-xs uppercase tracking-widest text-slate-500 font-mono">Creative Work ${(index % MARQUEE_IMAGES_ROW_2.length) + 1}</span>`;
                  }
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MarqueeSection;

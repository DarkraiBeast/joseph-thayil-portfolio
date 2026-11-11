import React from 'react';
import { FadeIn } from './ui/FadeIn.tsx';
import { SERVICES_LIST } from '../data/portfolioData.ts';

export const ServicesSection: React.FC = () => {
  return (
    <section
      id="services"
      className="bg-[#FFFFFF] text-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32 w-full relative z-10 select-none"
    >
      <div className="max-w-5xl mx-auto w-full">
        {/* Section Heading */}
        <FadeIn delay={0} y={30} duration={0.8} className="w-full text-center mb-16 sm:mb-20 md:mb-28">
          <h2
            className="text-[#0C0C0C] font-black uppercase text-center leading-none tracking-tight"
            style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
          >
            Services
          </h2>
        </FadeIn>

        {/* 5 Service Items in Vertical List */}
        <div className="flex flex-col w-full border-t border-[rgba(12,12,12,0.15)]">
          {SERVICES_LIST.map((service, index) => (
            <FadeIn
              key={service.number}
              delay={index * 0.1}
              y={30}
              duration={0.7}
              className="border-b border-[rgba(12,12,12,0.15)] py-8 sm:py-10 md:py-12 group transition-colors duration-300 hover:bg-black/[0.02]"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-12 w-full">
                {/* Number */}
                <div
                  className="font-black text-[#0C0C0C] leading-none select-none shrink-0 transition-transform duration-300 group-hover:translate-x-2"
                  style={{ fontSize: 'clamp(3rem, 10vw, 140px)' }}
                >
                  {service.number}
                </div>

                {/* Name & Description Stacked Vertically */}
                <div className="flex flex-col gap-2 md:gap-3 flex-1">
                  <h3
                    className="font-medium uppercase text-[#0C0C0C] tracking-tight leading-tight"
                    style={{ fontSize: 'clamp(1rem, 2.2vw, 2.1rem)' }}
                  >
                    {service.title}
                  </h3>
                  <p
                    className="font-light text-[#0C0C0C] leading-relaxed max-w-2xl opacity-60"
                    style={{ fontSize: 'clamp(0.85rem, 1.6vw, 1.25rem)' }}
                  >
                    {service.description}
                  </p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;

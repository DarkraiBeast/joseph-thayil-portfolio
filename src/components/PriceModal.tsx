import React, { useEffect } from 'react';
import { X, Check, Sparkles } from 'lucide-react';

export interface PriceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenContact: () => void;
}

export const PriceModal: React.FC<PriceModalProps> = ({ isOpen, onClose, onOpenContact }) => {
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

  const tiers = [
    {
      name: 'Essential 3D',
      price: '$1,200',
      period: 'per asset / scene',
      description: 'Ideal for indie brands, physical product launches, and high-impact digital campaigns.',
      features: [
        'Detailed custom 3D model & topology',
        '3x 4K Photorealistic renders with custom lighting',
        'Source files (.obj, .blend, .gltf/glb)',
        'Commercial usage rights included',
        '2 rounds of visual revisions',
      ],
      popular: false,
    },
    {
      name: 'Interactive Web',
      price: '$3,800',
      period: 'per landing page',
      description: 'Full immersive 3D spatial web experience with kinetic typography, animations, and high conversion.',
      features: [
        'Complete React + Tailwind + Motion codebase',
        'Interactive mouse physics & magnetic controls',
        'Optimized WebGL / Three.js 60fps performance',
        'Full mobile responsiveness & fluid typography',
        'Fast turnaround & production deployment',
      ],
      popular: true,
    },
    {
      name: 'Full Studio Tier',
      price: '$7,500',
      period: 'full product & brand',
      description: 'End-to-end brand identity, custom 3D design system, and full-stack enterprise web development.',
      features: [
        'Complete visual identity & brand system',
        'Dynamic 3D model library & animated reels',
        'Full-stack ASP.NET Core / React web app',
        'High-security database integration (SQL Server)',
        'Dedicated sprint support & priority delivery',
      ],
      popular: false,
    },
  ];

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto select-none"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl bg-[#121212] border border-white/15 rounded-3xl p-6 sm:p-8 text-[#D7E2EA] shadow-2xl my-auto max-h-[92vh] overflow-y-auto"
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
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="w-4 h-4 text-purple-400" />
          <span className="text-xs uppercase tracking-widest text-[#BBCCD7] font-semibold">
            Investment &amp; Engagement Plans
          </span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-white mb-2">
          Transparent Pricing
        </h2>
        <p className="text-xs sm:text-sm text-[#D7E2EA]/75 font-light mb-8 max-w-2xl">
          Tailored commissions with predictable milestones, transparent scope, and zero hidden fees.
        </p>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 relative ${
                tier.popular
                  ? 'bg-neutral-900 border-2 border-[#B600A8] shadow-[0_0_30px_rgba(182,0,168,0.2)]'
                  : 'bg-neutral-900/60 border border-white/10 hover:border-white/20'
              }`}
            >
              {tier.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-gradient-to-r from-[#B600A8] to-[#7621B0] text-white text-[10px] font-bold uppercase tracking-wider">
                  Most Popular
                </span>
              )}

              <div>
                <h3 className="text-lg font-bold text-white uppercase tracking-tight mb-1">
                  {tier.name}
                </h3>
                <p className="text-xs text-[#D7E2EA]/70 mb-4">{tier.description}</p>

                <div className="flex items-baseline gap-1.5 mb-5 pb-5 border-b border-white/10">
                  <span className="text-3xl sm:text-4xl font-black text-white font-mono">
                    {tier.price}
                  </span>
                  <span className="text-xs text-white/50">{tier.period}</span>
                </div>

                <ul className="flex flex-col gap-2.5 text-xs text-[#D7E2EA]/85 mb-6">
                  {tier.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenContact();
                }}
                className={`w-full py-3 rounded-xl font-medium uppercase tracking-wider text-xs transition-all cursor-pointer ${
                  tier.popular
                    ? 'bg-gradient-to-r from-[#B600A8] to-[#7621B0] text-white hover:opacity-90'
                    : 'bg-white/10 hover:bg-white/20 text-white'
                }`}
              >
                Inquire This Plan
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PriceModal;

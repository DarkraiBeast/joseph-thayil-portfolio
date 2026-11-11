import React from 'react';

export interface LiveProjectButtonProps {
  onClick?: () => void;
  className?: string;
  label?: string;
}

export const LiveProjectButton: React.FC<LiveProjectButtonProps> = ({
  onClick,
  className = '',
  label = 'Project Info',
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full border-2 border-[#D7E2EA] text-[#D7E2EA] font-medium uppercase tracking-widest px-8 py-3 sm:px-10 sm:py-3.5 text-sm sm:text-base cursor-pointer transition-all duration-200 hover:bg-[#D7E2EA]/10 active:scale-95 select-none ${className}`}
    >
      <span>{label}</span>
    </button>
  );
};

export default LiveProjectButton;

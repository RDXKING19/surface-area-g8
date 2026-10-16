import React from 'react';

export function Mascot({ size = 'md', speech = '', expression = 'default' }) {
  const sizeMap = {
    sm: 'w-10 h-10 text-xl',
    md: 'w-13 h-13 text-2xl sm:text-3xl',
    lg: 'w-18 h-18 text-4xl'
  };

  return (
    <div className="flex items-center gap-3">
      <div
        className={`${sizeMap[size] || sizeMap.md} rounded-full bg-amber-400/20 border-2 border-amber-400 text-amber-300 flex items-center justify-center shadow-[0_0_18px_rgba(250,204,21,0.5)] shrink-0`}
        title="Foreman Tally"
      >
        <span>🦉</span>
      </div>
      {speech && (
        <div className="bg-[#14082c]/95 border-2 border-amber-400/40 rounded-2xl px-4 py-2.5 text-slate-100 font-display font-extrabold text-xs sm:text-sm shadow-xl flex-1 text-left leading-snug">
          {speech}
        </div>
      )}
    </div>
  );
}

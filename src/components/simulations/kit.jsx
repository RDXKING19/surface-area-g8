import React from 'react';

const TONES = {
  cyan:    'border-cyan-400 bg-cyan-950/80 text-cyan-100 shadow-[0_0_16px_rgba(56,189,248,0.45)]',
  amber:   'border-amber-400 bg-amber-950/80 text-amber-100 shadow-[0_0_16px_rgba(251,191,36,0.45)]',
  emerald: 'border-emerald-400 bg-emerald-950/80 text-emerald-100 shadow-[0_0_16px_rgba(52,211,153,0.45)]',
  rose:    'border-rose-400 bg-rose-950/80 text-rose-100 shadow-[0_0_16px_rgba(244,63,94,0.45)]',
  purple:  'border-purple-400 bg-purple-950/80 text-purple-100 shadow-[0_0_16px_rgba(168,85,247,0.45)]',
  ghost:   'border-white/20 border-dashed bg-white/5 text-white/40'
};

export function Panel({ children, className = '' }) {
  return (
    <div
      className={`flex flex-col items-center gap-2.5 bg-[#170c38]/95 border-2 border-cyan-400/40 rounded-2xl p-3 sm:p-4 shadow-xl flex-1 min-h-0 overflow-hidden ${className}`}
    >
      {children}
    </div>
  );
}

export function Node({ tone = 'cyan', children, w = 'w-24', className = '' }) {
  return (
    <div
      className={`${w} h-11 rounded-xl border-2 font-display font-900 text-sm sm:text-base flex items-center justify-center text-center transition-all duration-300 ${TONES[tone] || TONES.cyan} ${className}`}
    >
      {children}
    </div>
  );
}

export function Msg({ tone = 'emerald', children }) {
  const cls = {
    emerald: 'bg-emerald-950/90 text-emerald-300 border-emerald-400/60 shadow-[0_0_14px_rgba(52,211,153,0.3)]',
    rose: 'bg-rose-950/90 text-rose-300 border-rose-400/60 shadow-[0_0_14px_rgba(244,63,94,0.3)]',
    amber: 'bg-amber-950/90 text-amber-200 border-amber-400/50 shadow-[0_0_14px_rgba(251,191,36,0.3)]',
    cyan: 'bg-cyan-950/90 text-cyan-200 border-cyan-400/50 shadow-[0_0_14px_rgba(56,189,248,0.3)]'
  }[tone] || 'bg-cyan-950/90 text-cyan-200 border-cyan-400/50';

  return (
    <div className={`w-full px-3.5 py-2 rounded-xl border-2 text-xs sm:text-sm font-900 text-center fade-in-up shrink-0 ${cls}`}>
      {children}
    </div>
  );
}

export const GoldBtn = ({ children, onClick, disabled = false, className = '' }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`btn-gold text-xs sm:text-sm font-900 px-5 py-2 shadow-lg hover:scale-105 transition cursor-pointer shrink-0 disabled:opacity-40 disabled:cursor-not-allowed ${className}`}
  >
    {children}
  </button>
);

export const GhostBtn = ({ children, onClick, disabled = false, active = false, className = '' }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`font-display font-900 text-xs sm:text-sm px-3.5 py-1.5 rounded-xl border transition cursor-pointer shrink-0 disabled:opacity-40 disabled:cursor-not-allowed ${
      active
        ? 'bg-cyan-400 text-slate-950 border-cyan-200 shadow-[0_0_14px_rgba(56,189,248,0.6)]'
        : 'bg-purple-900/80 hover:bg-purple-800 border-purple-400/50 text-purple-100'
    } ${className}`}
  >
    {children}
  </button>
);

/**
 * Accessible Value Slider with - / + increment buttons matching reference screenshot
 */
export function ValueSlider({
  value,
  min = 2,
  max = 16,
  step = 1,
  unit = 'cm',
  onChange,
  label = 'Dimension'
}) {
  const dec = () => onChange(Math.max(min, value - step));
  const inc = () => onChange(Math.min(max, value + step));

  return (
    <div className="w-full flex items-center gap-2.5 px-1 py-1 shrink-0">
      <span className="font-display font-black text-xs sm:text-sm text-white shrink-0 min-w-[120px]">
        {label}: <span className="text-amber-400 font-bold">{value} {unit}</span>
      </span>

      <button
        type="button"
        onClick={dec}
        disabled={value <= min}
        className="w-6 h-6 rounded-md bg-[#231343] hover:bg-[#341b63] border border-purple-400/30 text-white font-black text-sm flex items-center justify-center transition disabled:opacity-30 cursor-pointer shrink-0"
        title="Decrease"
      >
        −
      </button>

      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={e => onChange(Number(e.target.value))}
        className="flex-1 accent-amber-400 cursor-pointer h-2 bg-slate-700 rounded-lg"
      />

      <button
        type="button"
        onClick={inc}
        disabled={value >= max}
        className="w-6 h-6 rounded-md bg-[#231343] hover:bg-[#341b63] border border-purple-400/30 text-white font-black text-sm flex items-center justify-center transition disabled:opacity-30 cursor-pointer shrink-0"
        title="Increase"
      >
        +
      </button>
    </div>
  );
}

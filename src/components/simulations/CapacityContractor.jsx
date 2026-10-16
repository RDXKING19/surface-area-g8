import React, { useState } from 'react';
import { ValueSlider } from './kit.jsx';

const COMMISSIONS = [
  {
    id: 1,
    client: 'Tropical Juice Bar',
    solid: 'cone',
    title: 'Conical Paper Drink Cup',
    prompt: 'The client wants a conical cup that holds exactly 96π cm³ with a fixed base radius of 6 cm. Size the vertical height h.',
    fixedLabel: 'Radius r = 6 cm',
    varLabel: 'Vertical Height h',
    min: 4,
    max: 14,
    targetVal: 96,
    targetUnit: 'π cm³',
    targetFormula: '⅓ × π × 6² × h = 12πh',
    calcFn: (h) => Math.round((36 * h) / 3),
    correctVal: 8
  },
  {
    id: 2,
    client: 'Civic Architecture Studio',
    solid: 'pyramid',
    title: 'Atrium Glass Skylight',
    prompt: 'The architect requires a square pyramid skylight holding exactly 120 cm³ of air space with a base edge of 6 cm. Size the vertical height h.',
    fixedLabel: 'Base Edge s = 6 cm',
    varLabel: 'Vertical Height h',
    min: 5,
    max: 15,
    targetVal: 120,
    targetUnit: 'cm³',
    targetFormula: '⅓ × 6² × h = 12h',
    calcFn: (h) => Math.round((36 * h) / 3),
    correctVal: 10
  },
  {
    id: 3,
    client: 'Observatory Science Center',
    solid: 'hemisphere',
    title: 'Hemisphere Dome Reservoir',
    prompt: 'The science center needs a dome reservoir with a total surface area (dome + base) of exactly 108π cm². Size the radius r.',
    fixedLabel: 'Solid Hemisphere (Total Area = 3πr²)',
    varLabel: 'Radius r',
    min: 3,
    max: 10,
    targetVal: 108,
    targetUnit: 'π cm²',
    targetFormula: '3 × π × r²',
    calcFn: (r) => 3 * r * r,
    correctVal: 6
  }
];

export function CapacityContractor({ onComplete }) {
  const [sliderVal, setSliderVal] = useState(8);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showHint, setShowHint] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [isDone, setIsDone] = useState(false);

  const comm = COMMISSIONS[0];
  const currentVal = comm.calcFn(sliderVal);
  const isExact = currentVal === comm.targetVal;

  const handleCheckAnswer = () => {
    if (selectedOption === null) {
      setFeedback({ type: 'warn', msg: 'Please select an option before checking answer!' });
      return;
    }

    if (selectedOption === 0) {
      setIsDone(true);
      if (onComplete) onComplete();
      setFeedback({
        type: 'correct',
        msg: `🎯 Approved! When ${comm.varLabel} = ${comm.correctVal} cm, the result is exactly ${comm.targetVal} ${comm.targetUnit}. Client commission verified!`
      });
    } else {
      setFeedback({
        type: 'error',
        msg: 'Architectural specifications must be exact. Use the formula substitution to solve for the target dimension!'
      });
    }
  };

  return (
    <div className="w-full flex flex-col justify-between bg-[#160b36]/90 border border-purple-500/40 rounded-2xl p-2.5 sm:p-3 gap-2 shadow-xl">
      {/* 1. Header Bar with Cyan Tag */}
      <div className="w-full flex items-center justify-between border-b border-white/10 pb-1 shrink-0">
        <div className="flex items-center gap-2">
          <span className="text-cyan-300 text-base font-bold">🎯</span>
          <span className="font-display font-black text-white text-xs sm:text-sm md:text-base">
            Section B: Capacity Contractor – Build-to-Target Sizing
          </span>
        </div>
        <div className="bg-cyan-950/70 border border-cyan-400/60 text-cyan-300 font-display font-black text-xs px-2.5 py-0.5 rounded-full shadow-sm font-mono">
          Target: {comm.targetVal} {comm.targetUnit}
        </div>
      </div>

      {/* 2. Interactive Simulation Graphic Canvas */}
      <div className="w-full bg-[#0a0318] border border-white/10 rounded-xl p-1.5 sm:p-2 flex flex-col items-center justify-between shrink-0 relative overflow-hidden h-32 sm:h-36">
        {/* Top Spec Bar (No sub-sections) */}
        <div className="w-full flex items-center justify-between gap-2 mb-0.5 z-10 shrink-0 px-1">
          <span className="text-xs sm:text-sm font-bold text-slate-200">
            🎯 Client Spec: {comm.title} – Target: {comm.targetVal} {comm.targetUnit}
          </span>
          {isExact && (
            <span className="text-xs font-bold text-emerald-300 bg-emerald-950/80 border border-emerald-400/50 px-2.5 py-0.5 rounded-full">
              Target Matched ✓
            </span>
          )}
        </div>

        {/* Interactive 3D Solid Diagram + Circular Gauge + Formula Card */}
        <div className="w-full flex-1 min-h-0 flex items-center justify-around gap-2 px-2 py-0.5 overflow-hidden">
          {/* Dynamic 3D Solid Diagram (Conical Cup) */}
          <div className="h-full flex items-center justify-center shrink-0">
            <svg
              viewBox="0 0 100 100"
              className="h-full w-auto max-h-full max-w-[110px] select-none"
              preserveAspectRatio="xMidYMid meet"
            >
              {/* Top opening ellipse of conical cup */}
              <ellipse cx="50" cy="18" rx="36" ry="8" fill="#38bdf825" stroke="#38bdf8" strokeWidth="2" />
              {/* Conical body tapering down to apex */}
              <path
                d={`M 14 18 L 50 ${18 + Math.min(78, sliderVal * 5.6)} L 86 18 Z`}
                fill={isExact ? '#4ade8030' : '#0284c730'}
                stroke={isExact ? '#4ade80' : '#38bdf8'}
                strokeWidth="2"
              />
              {/* Radius indicator */}
              <line x1="50" y1="18" x2="86" y2="18" stroke="#facc15" strokeWidth="1.5" strokeDasharray="2 2" />
              <text x="68" y="14" fill="#facc15" fontSize="8" fontWeight="bold" textAnchor="middle">r = 6 cm</text>
              {/* Vertical height axis */}
              <line x1="50" y1="18" x2="50" y2={18 + Math.min(78, sliderVal * 5.6)} stroke="#f43f5e" strokeWidth="1.5" strokeDasharray="3 2" />
              <text x="44" y={18 + Math.min(78, sliderVal * 5.6) / 2 + 3} fill="#fda4af" fontSize="8" fontWeight="bold" textAnchor="end">h = {sliderVal}</text>
            </svg>
          </div>

          {/* Gauge Ring */}
          <div className="relative w-16 h-16 sm:w-18 sm:h-18 flex items-center justify-center shrink-0">
            <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
              <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="8" />
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke={isExact ? '#4ade80' : '#38bdf8'}
                strokeWidth="8"
                strokeDasharray="251"
                strokeDashoffset={251 - 251 * Math.min(1.2, currentVal / comm.targetVal)}
                strokeLinecap="round"
                className="transition-all duration-300"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="font-display font-black text-xs sm:text-sm text-white font-mono leading-none">
                {currentVal}
              </span>
              <span className="text-[9px] text-slate-300 font-bold mt-0.5">
                {comm.targetUnit}
              </span>
            </div>
          </div>

          {/* Formula Substitution Card */}
          <div className="bg-[#140828] border border-cyan-400/30 rounded-lg py-1 px-2.5 max-w-[210px] text-left shrink-0">
            <span className="text-[9px] uppercase font-black text-amber-400 block tracking-wider">Formula Substitution</span>
            <span className="text-xs font-mono font-bold text-slate-100 block mt-0.5">
              {comm.targetFormula}
            </span>
            <span className="text-xs font-black text-emerald-400 block mt-0.5">
              Current = {currentVal} {comm.targetUnit}
            </span>
          </div>
        </div>
      </div>

      {/* 3. Stat / Metrics Row (3 Boxes matching screenshot) */}
      <div className="grid grid-cols-3 gap-1.5 sm:gap-2 shrink-0">
        <div className="bg-[#120726] border border-white/10 rounded-xl py-1 px-1.5 text-center">
          <span className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider block">Project Spec</span>
          <span className="font-display font-black text-amber-300 text-xs sm:text-sm block mt-0.5 line-clamp-1">
            {comm.title}
          </span>
        </div>

        <div className="bg-[#120726] border border-white/10 rounded-xl py-1 px-1.5 text-center">
          <span className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider block">Fixed Dimension</span>
          <span className="font-display font-black text-white text-xs sm:text-sm block mt-0.5 font-mono">
            {comm.fixedLabel}
          </span>
        </div>

        <div className="bg-[#120726] border border-white/10 rounded-xl py-1 px-1.5 text-center">
          <span className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider block">Target Status</span>
          <span className={`font-display font-black text-xs sm:text-sm block mt-0.5 ${isExact ? 'text-emerald-400' : 'text-amber-300'}`}>
            {isExact ? `${comm.targetVal} ${comm.targetUnit} (Match!)` : `${currentVal} / ${comm.targetVal}`}
          </span>
        </div>
      </div>

      {/* 4. Controls Slider Row */}
      <div className="shrink-0">
        <ValueSlider
          label={comm.varLabel}
          value={sliderVal}
          min={comm.min}
          max={comm.max}
          step={1}
          unit="cm"
          onChange={setSliderVal}
        />
      </div>

      {/* 5. Architect Tally's Challenge Box */}
      <div className="bg-[#12072a] border border-purple-500/40 rounded-xl p-2 sm:p-2.5 flex flex-col gap-1.5 shrink-0 shadow-lg">
        <span className="text-amber-400 font-display font-black text-xs sm:text-sm leading-tight">
          Architect Tally's Challenge: Which exact value of {comm.varLabel} meets the client's specification of {comm.targetVal} {comm.targetUnit}?
        </span>

        {/* Options */}
        <div className="flex flex-col gap-1">
          <button
            type="button"
            onClick={() => { setSelectedOption(0); setFeedback(null); }}
            className={`w-full py-1.5 px-2.5 rounded-lg text-left text-xs sm:text-sm font-bold transition cursor-pointer border leading-snug ${
              selectedOption === 0
                ? 'bg-cyan-950/80 border-cyan-400 text-white shadow-[0_0_10px_rgba(34,211,238,0.4)]'
                : 'bg-[#180a32] border-white/10 text-slate-200 hover:border-cyan-400/40'
            }`}
          >
            ✓ Set {comm.varLabel} = {comm.correctVal} cm, giving exactly {comm.targetVal} {comm.targetUnit} via the formula.
          </button>

          <button
            type="button"
            onClick={() => { setSelectedOption(1); setFeedback(null); }}
            className={`w-full py-1.5 px-2.5 rounded-lg text-left text-xs sm:text-sm font-bold transition cursor-pointer border leading-snug ${
              selectedOption === 1
                ? 'bg-cyan-950/80 border-cyan-400 text-white shadow-[0_0_10px_rgba(34,211,238,0.4)]'
                : 'bg-[#180a32] border-white/10 text-slate-200 hover:border-cyan-400/40'
            }`}
          >
            ✗ Any random dimension works because the volume can stretch freely.
          </button>
        </div>

        {/* Hint readout */}
        {showHint && (
          <div className="bg-purple-950/80 border border-purple-400/40 rounded-lg py-1 px-2.5 text-xs text-purple-200 font-bold fade-in-up">
            💡 Hint: Substitute the fixed radius into {comm.targetFormula}. Set it equal to {comm.targetVal} and divide to find {comm.varLabel}!
          </div>
        )}

        {/* Feedback readout */}
        {feedback && (
          <div
            className={`rounded-lg py-1 px-2.5 text-xs sm:text-sm font-black text-center fade-in-up ${
              feedback.type === 'correct'
                ? 'bg-emerald-950/90 text-emerald-300 border border-emerald-400/50'
                : feedback.type === 'warn'
                ? 'bg-amber-950/90 text-amber-300 border border-amber-400/50'
                : 'bg-rose-950/90 text-rose-300 border border-rose-400/50'
            }`}
          >
            {feedback.msg}
          </div>
        )}

        {/* Bottom Action Row */}
        <div className="flex items-center justify-between pt-0.5">
          <button
            type="button"
            onClick={() => setShowHint(prev => !prev)}
            className="px-3 py-1 rounded-lg bg-[#281350] hover:bg-[#381a70] border border-purple-400/40 text-purple-200 font-display font-black text-xs transition cursor-pointer flex items-center gap-1.5"
          >
            <span>💡</span>
            <span>{showHint ? 'Hide Hint' : 'Show Hint'}</span>
          </button>

          <button
            type="button"
            onClick={handleCheckAnswer}
            className={`px-4 py-1 rounded-lg font-display font-black text-xs sm:text-sm cursor-pointer shadow-md hover:scale-105 transition ${
              feedback?.type === 'correct'
                ? 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-[0_0_12px_rgba(16,185,129,0.5)]'
                : 'btn-gold'
            }`}
          >
            {feedback?.type === 'correct' ? 'Completed ✓' : 'Check Answer ✓'}
          </button>
        </div>
      </div>
    </div>
  );
}

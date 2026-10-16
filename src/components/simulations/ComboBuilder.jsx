import React, { useState } from 'react';
import { ValueSlider } from './kit.jsx';

export function ComboBuilder({ onComplete }) {
  const [selectedOption, setSelectedOption] = useState(null);
  const [isPainted, setIsPainted] = useState(true);
  const [showHint, setShowHint] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [isDone, setIsDone] = useState(false);
  const [towerH, setTowerH] = useState(10);

  // Planetarium architectural specs (r = 6 m, dynamic towerH)
  const domeArea = 72; // 2 * pi * 6^2 = 72 pi
  const wallArea = 12 * towerH; // 2 * pi * 6 * h = 12h pi
  const totalExposed = domeArea + wallArea; // paintable exterior

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
        msg: `🎯 Approved! Total paintable exterior = Dome Roof (72π) + Tower Wall (${wallArea}π) = ${totalExposed}π m². The interior join face is sealed inside and never counted!`
      });
    } else {
      setFeedback({
        type: 'error',
        msg: 'Remember: Exterior paint only covers outside surfaces you can touch. Internal join faces are sealed inside!'
      });
    }
  };

  return (
    <div className="w-full flex flex-col justify-between bg-[#160b36]/90 border border-purple-500/40 rounded-2xl p-2.5 sm:p-3 gap-2 shadow-xl">
      {/* 1. Header Bar with Cyan Tag */}
      <div className="w-full flex items-center justify-between border-b border-white/10 pb-1 shrink-0">
        <div className="flex items-center gap-2">
          <span className="text-cyan-300 text-base font-bold">🏛️</span>
          <span className="font-display font-black text-white text-xs sm:text-sm md:text-base">
            Section C: Civic Planetarium – Real-World Exterior Painting
          </span>
        </div>
        <div className="bg-cyan-950/70 border border-cyan-400/60 text-cyan-300 font-display font-black text-xs px-2.5 py-0.5 rounded-full shadow-sm font-mono">
          Exposed: {totalExposed}π m²
        </div>
      </div>

      {/* 2. Interactive Real-World Simulation Canvas */}
      <div className="w-full bg-[#0a0318] border border-white/10 rounded-xl p-1.5 sm:p-2 flex flex-col items-center justify-between shrink-0 relative overflow-hidden h-32 sm:h-36">
        {/* Top Action Bar */}
        <div className="w-full flex items-center justify-between gap-2 mb-0.5 z-10 shrink-0 px-1">
          <span className="text-xs sm:text-sm font-bold text-slate-200">
            🎨 Exterior Weatherproof Coating Simulation:
          </span>

          <button
            onClick={() => setIsPainted(prev => !prev)}
            className="btn-gold px-2.5 py-0.5 text-xs font-black cursor-pointer shadow-md transition hover:scale-105"
          >
            {isPainted ? '🎨 Exterior Painted ✓' : '🖌️ Apply Paint Coat'}
          </button>
        </div>

        {/* Architectural 3D SVG Simulation Visual - Fully Constrained & Never Cropped */}
        <div className="w-full flex-1 min-h-0 flex items-center justify-center overflow-hidden">
          <svg
            viewBox="0 0 340 138"
            className="w-full h-full max-h-full max-w-full select-none"
            preserveAspectRatio="xMidYMid meet"
          >
            {/* Ground Level Line synced to tower base */}
            <line
              x1="15"
              y1={8 + 38 + towerH * 5.5}
              x2="325"
              y2={8 + 38 + towerH * 5.5}
              stroke="#334155"
              strokeWidth="2"
              strokeDasharray="4 4"
            />
            <text
              x="20"
              y={8 + 38 + towerH * 5.5 + 9}
              fill="#64748b"
              fontSize="8"
              fontWeight="bold"
            >
              Ground Level
            </text>

            {/* Planetarium Composite Visual Group (Centered) */}
            <g transform="translate(170, 8)">
              {/* 1. Dome Roof (Hemisphere) */}
              <g>
                <path
                  d="M -45 38 A 45 45 0 0 1 45 38 Z"
                  fill={isPainted ? '#06b6d4' : '#1e1b4b'}
                  stroke="#38bdf8"
                  strokeWidth="2.5"
                  opacity={isPainted ? '0.9' : '0.6'}
                />
                {/* Dome structural ribs */}
                <path d="M 0 0 L 0 38" stroke="#facc15" strokeWidth="2" />
                <path d="M -22 8 Q -10 20 -22 38" stroke="#ffffff40" strokeWidth="1.2" fill="none" />
                <path d="M 22 8 Q 10 20 22 38" stroke="#ffffff40" strokeWidth="1.2" fill="none" />
                <text x="0" y="22" fill="#facc15" fontSize="11" fontWeight="900" textAnchor="middle">
                  Dome: 72π m²
                </text>
              </g>

              {/* 2. Internal Join Face */}
              <g>
                <ellipse
                  cx="0"
                  cy="38"
                  rx="45"
                  ry="7"
                  fill="#f43f5e33"
                  stroke="#f43f5e"
                  strokeWidth="2"
                  strokeDasharray="4 3"
                />
                <text x="0" y="41" fill="#fda4af" fontSize="9" fontWeight="900" textAnchor="middle">
                  🚫 Sealed Inside (0 m² Paint)
                </text>
              </g>

              {/* 3. Cylindrical Observatory Tower Wall */}
              <g>
                <rect
                  x="-45"
                  y="38"
                  width="90"
                  height={towerH * 5.5}
                  fill={isPainted ? '#0284c7' : '#1e293b'}
                  stroke="#60a5fa"
                  strokeWidth="2.5"
                  opacity={isPainted ? '0.85' : '0.6'}
                />
                {/* Windows */}
                <rect x="-30" y="44" width="14" height="15" rx="7" fill="#facc1530" stroke="#facc15" strokeWidth="1.2" />
                <rect x="16" y="44" width="14" height="15" rx="7" fill="#facc1530" stroke="#facc15" strokeWidth="1.2" />
                <text x="0" y={38 + (towerH * 5.5) / 2 + 4} fill="#ffffff" fontSize="11" fontWeight="900" textAnchor="middle">
                  Tower: {wallArea}π m²
                </text>
              </g>

              {/* 4. Tower Base Ellipse */}
              <ellipse
                cx="0"
                cy={38 + towerH * 5.5}
                rx="45"
                ry="7"
                fill="#0f172a"
                stroke="#64748b"
                strokeWidth="2"
              />
            </g>

            {/* Labels on Sides */}
            <g transform="translate(15, 20)">
              <rect x="0" y="0" width="85" height="28" rx="6" fill="#140828" stroke="#38bdf850" />
              <text x="42" y="12" fill="#38bdf8" fontSize="10" fontWeight="900" textAnchor="middle">Radius r = 6 m</text>
              <text x="42" y="23" fill="#cbd5e1" fontSize="8" fontWeight="bold" textAnchor="middle">Dome & Tower</text>
            </g>

            <g transform="translate(240, 36)">
              <rect x="0" y="0" width="90" height="28" rx="6" fill="#140828" stroke="#facc1550" />
              <text x="45" y="12" fill="#facc15" fontSize="10" fontWeight="900" textAnchor="middle">Tower h = {towerH} m</text>
              <text x="45" y="23" fill="#cbd5e1" fontSize="8" fontWeight="bold" textAnchor="middle">Vertical Wall</text>
            </g>
          </svg>
        </div>
      </div>

      {/* 3. Stat / Metrics Row (3 Boxes matching screenshot) */}
      <div className="grid grid-cols-3 gap-1.5 sm:gap-2 shrink-0">
        <div className="bg-[#120726] border border-white/10 rounded-xl py-1 px-1.5 text-center">
          <span className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider block">Dome Roof (2πr²)</span>
          <span className="font-display font-black text-amber-300 text-xs sm:text-sm block mt-0.5">
            72π m² (Exposed)
          </span>
        </div>

        <div className="bg-[#120726] border border-white/10 rounded-xl py-1 px-1.5 text-center">
          <span className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider block">Tower Wall (2πrh)</span>
          <span className="font-display font-black text-cyan-300 text-xs sm:text-sm block mt-0.5 font-mono">
            {wallArea}π m² (Exposed)
          </span>
        </div>

        <div className="bg-[#120726] border border-rose-500/30 rounded-xl py-1 px-1.5 text-center bg-rose-950/20">
          <span className="text-[10px] sm:text-xs font-bold text-rose-300 uppercase tracking-wider block">Internal Join Face</span>
          <span className="font-display font-black text-rose-400 text-xs sm:text-sm block mt-0.5">
            0 m² (Sealed!)
          </span>
        </div>
      </div>

      {/* 4. Interactive Slider Row */}
      <div className="shrink-0">
        <ValueSlider
          label="Tower Wall Height h"
          value={towerH}
          min={6}
          max={14}
          step={1}
          unit="m"
          onChange={setTowerH}
        />
      </div>

      {/* 5. Architect Tally's Challenge Box */}
      <div className="bg-[#12072a] border border-purple-500/40 rounded-xl p-2 sm:p-2.5 flex flex-col gap-1.5 shrink-0 shadow-lg">
        <span className="text-amber-400 font-display font-black text-xs sm:text-sm leading-tight">
          Architect Tally's Challenge: Why do we exclude the circular floor sealed between the dome and tower?
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
            ✓ Interior join face sealed inside—only exposed exterior surfaces count in total surface area.
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
            ✗ All component bases must always be painted, even when sealed completely inside.
          </button>
        </div>

        {/* Hint readout */}
        {showHint && (
          <div className="bg-purple-950/80 border border-purple-400/40 rounded-lg py-1 px-2.5 text-xs text-purple-200 font-bold fade-in-up">
            💡 Hint: Surface area measures the outside wrapper you can touch or paint. Touching faces sealed inside do NOT count!
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

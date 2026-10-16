import React, { useState } from 'react';
import { ValueSlider } from './kit.jsx';

export function PourOverWorkshop({ onComplete }) {
  const [mode, setMode] = useState('cone'); // 'cone' | 'pyramid' | 'sphere'
  const [r, setR] = useState(6);
  const [h, setH] = useState(9);
  const [pourCount, setPourCount] = useState(0);
  const [isPouring, setIsPouring] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showHint, setShowHint] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [isDone, setIsDone] = useState(false);

  // Calculations
  let solidVolText = '';
  let containerVolText = '';
  let fillFraction = 0;

  if (mode === 'cone') {
    const cVol = r * r * h; // × π
    const sVol = Math.round(cVol / 3);
    solidVolText = `${sVol}π cm³`;
    containerVolText = `${cVol}π cm³`;
    fillFraction = Math.min(1, pourCount / 3);
  } else if (mode === 'pyramid') {
    const cVol = r * r * h; // Box volume
    const sVol = Math.round(cVol / 3);
    solidVolText = `${sVol} cm³`;
    containerVolText = `${cVol} cm³`;
    fillFraction = Math.min(1, pourCount / 3);
  } else {
    // Ladle into cylinder
    const sVol = Math.round((2 * Math.pow(r, 3)) / 3);
    const cVol = r * r * (2 * r);
    solidVolText = `${sVol}π cm³`;
    containerVolText = `${cVol}π cm³`;
    fillFraction = Math.min(1, pourCount / 3);
  }

  const handlePour = () => {
    if (isPouring || pourCount >= 3) return;
    setIsPouring(true);

    setTimeout(() => {
      const nextCount = pourCount + 1;
      setPourCount(nextCount);
      setIsPouring(false);
    }, 450);
  };

  const handleReset = () => {
    setPourCount(0);
    setFeedback(null);
  };

  const handleCheckAnswer = () => {
    if (selectedOption === null) {
      setFeedback({ type: 'warn', msg: 'Please select an option before checking answer!' });
      return;
    }

    if (selectedOption === 0) {
      setIsDone(true);
      setFeedback({
        type: 'correct',
        msg: '🎯 Correct! Exactly 3 pours of the cone fill the matching cylinder: Volume = ⅓ × Base Area × h!'
      });
      if (onComplete) onComplete();
    } else {
      setFeedback({
        type: 'error',
        msg: 'Remember: Capacity depends strictly on vertical 90° height (h), not slant length (l). The volume remains exactly ⅓!'
      });
    }
  };

  return (
    <div className="w-full flex flex-col justify-between bg-[#160b36]/90 border border-purple-500/40 rounded-2xl p-2.5 sm:p-3 gap-2 shadow-xl">
      {/* 1. Header Bar with Cyan Tag */}
      <div className="w-full flex items-center justify-between border-b border-white/10 pb-1 shrink-0">
        <div className="flex items-center gap-2">
          <span className="text-cyan-300 text-base font-bold">📐</span>
          <span className="font-display font-black text-white text-xs sm:text-sm md:text-base">
            Section A: Pour-Over Workshop – The ⅓ Ratio Discovery
          </span>
        </div>
        <div className="bg-cyan-950/70 border border-cyan-400/60 text-cyan-300 font-display font-black text-xs px-2.5 py-0.5 rounded-full shadow-sm font-mono">
          Fixed Ratio: ⅓ (Fixed!)
        </div>
      </div>

      {/* 2. Interactive Simulation Graphic Canvas */}
      <div className="w-full bg-[#0a0318] border border-white/10 rounded-xl p-1.5 sm:p-2 flex flex-col items-center justify-between shrink-0 relative overflow-hidden h-32 sm:h-36">
        {/* Top Action Bar (No sub-sections) */}
        <div className="w-full flex items-center justify-between gap-2 mb-0.5 z-10 shrink-0 px-1">
          <span className="text-xs sm:text-sm font-bold text-slate-200">
            🫗 Fill the cone and pour into the matching cylinder:
          </span>

          <div className="flex items-center gap-1.5">
            <button
              onClick={handlePour}
              disabled={pourCount >= 3 || isPouring}
              className="btn-gold px-2.5 py-0.5 text-xs font-black cursor-pointer shadow-md disabled:opacity-40"
            >
              {isPouring ? 'Pouring...' : pourCount >= 3 ? 'Full (3/3) ✓' : `🫗 Pour (${pourCount}/3)`}
            </button>
            <button
              onClick={handleReset}
              className="px-2 py-0.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-black cursor-pointer transition"
              title="Reset pour liquid"
            >
              ↺ Reset
            </button>
          </div>
        </div>

        {/* SVG Liquid Pouring Visual - Fully Constrained & Never Cropped */}
        <div className="w-full flex-1 min-h-0 flex items-center justify-center overflow-hidden">
          <svg
            viewBox="0 0 340 148"
            className="w-full h-full max-h-full max-w-full select-none"
            preserveAspectRatio="xMidYMid meet"
          >
            {/* Liquid Pouring Stream Animation */}
            {isPouring && (
              <path
                d="M 120 55 Q 155 25 190 85"
                fill="none"
                stroke="#22d3ee"
                strokeWidth="4"
                strokeDasharray="6 4"
                className="animate-pulse"
              />
            )}

            {/* Left Solid (The Pourer) */}
            <g transform="translate(35, 6)">
              {mode === 'cone' && (
                <>
                  <path d="M 10 105 L 50 18 L 90 105 Z" fill="#fb923c30" stroke="#fb923c" strokeWidth="2.2" />
                  <ellipse cx="50" cy="105" rx="40" ry="12" fill="#fb923c40" stroke="#fb923c" strokeWidth="2" />
                  <text x="50" y="128" fill="#fb923c" fontSize="11" fontWeight="900" textAnchor="middle">
                    Waffle Cone
                  </text>
                  <text x="50" y="70" fill="#facc15" fontSize="12" fontWeight="900" textAnchor="middle">
                    {solidVolText}
                  </text>
                </>
              )}
              {mode === 'pyramid' && (
                <>
                  <polygon points="10,105 50,18 90,105" fill="#fb923c30" stroke="#fb923c" strokeWidth="2.2" />
                  <line x1="50" y1="18" x2="60" y2="115" stroke="#fb923c" strokeWidth="2" />
                  <polygon points="10,105 60,115 90,105 50,95" fill="#fb923c40" stroke="#fb923c" strokeWidth="1.5" />
                  <text x="50" y="128" fill="#fb923c" fontSize="11" fontWeight="900" textAnchor="middle">
                    Pyramid Hopper
                  </text>
                  <text x="50" y="70" fill="#facc15" fontSize="12" fontWeight="900" textAnchor="middle">
                    {solidVolText}
                  </text>
                </>
              )}
              {mode === 'sphere' && (
                <>
                  <path d="M 10 60 A 40 40 0 0 0 90 60 Z" fill="#c084fc30" stroke="#c084fc" strokeWidth="2.2" />
                  <ellipse cx="50" cy="60" rx="40" ry="10" fill="#c084fc40" stroke="#c084fc" strokeWidth="1.5" />
                  <text x="50" y="110" fill="#c084fc" fontSize="11" fontWeight="900" textAnchor="middle">
                    Hemisphere Ladle
                  </text>
                  <text x="50" y="50" fill="#facc15" fontSize="11" fontWeight="900" textAnchor="middle">
                    {solidVolText}
                  </text>
                </>
              )}
            </g>

            {/* Right Container (The Receiver Cylinder / Box) */}
            <g transform="translate(195, 6)">
              <rect x="10" y="18" width="80" height="87" fill="none" stroke="#e2e8f0" strokeWidth="2" rx="4" />
              <ellipse cx="50" cy="18" rx="40" ry="9" fill="none" stroke="#e2e8f0" strokeWidth="2" />
              <ellipse cx="50" cy="105" rx="40" ry="9" fill="none" stroke="#e2e8f0" strokeWidth="2" />

              {/* Liquid Level Filled Inside Container */}
              {fillFraction > 0 && (
                <g>
                  <rect
                    x="11"
                    y={105 - 87 * fillFraction}
                    width="78"
                    height={87 * fillFraction}
                    fill="#22d3ee55"
                    stroke="none"
                  />
                  <ellipse
                    cx="50"
                    cy={105 - 87 * fillFraction}
                    rx="39"
                    ry="8"
                    fill="#22d3ee"
                    stroke="#38bdf8"
                    strokeWidth="1.5"
                  />
                </g>
              )}

              {/* Marks on Container for ⅓, ⅔, 1.0 */}
              <line x1="8" y1="76" x2="16" y2="76" stroke="#facc15" strokeWidth="2" />
              <text x="5" y="79" fill="#facc15" fontSize="8" fontWeight="900" textAnchor="end">⅓</text>
              <line x1="8" y1="47" x2="16" y2="47" stroke="#facc15" strokeWidth="2" />
              <text x="5" y="50" fill="#facc15" fontSize="8" fontWeight="900" textAnchor="end">⅔</text>
              <line x1="8" y1="18" x2="16" y2="18" stroke="#4ade80" strokeWidth="2" />
              <text x="5" y="21" fill="#4ade80" fontSize="8" fontWeight="900" textAnchor="end">1.0</text>

              <text x="50" y="128" fill="#38bdf8" fontSize="11" fontWeight="900" textAnchor="middle">
                Matching Container
              </text>
            </g>
          </svg>
        </div>
      </div>

      {/* 3. Stat / Metrics Row (3 Boxes matching screenshot) */}
      <div className="grid grid-cols-3 gap-1.5 sm:gap-2 shrink-0">
        <div className="bg-[#120726] border border-white/10 rounded-xl py-1 px-1.5 text-center">
          <span className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider block">Solid Type</span>
          <span className="font-display font-black text-amber-300 text-xs sm:text-sm block mt-0.5">
            Waffle Cone (⅓)
          </span>
        </div>

        <div className="bg-[#120726] border border-white/10 rounded-xl py-1 px-1.5 text-center">
          <span className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider block">Base · 90° Height</span>
          <span className="font-display font-black text-white text-xs sm:text-sm block mt-0.5 font-mono">
            r = {r} m · h = {h} m
          </span>
        </div>

        <div className="bg-[#120726] border border-white/10 rounded-xl py-1 px-1.5 text-center">
          <span className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider block">Cylinder Capacity</span>
          <span className="font-display font-black text-emerald-400 text-xs sm:text-sm block mt-0.5">
            {containerVolText} (Fixed!)
          </span>
        </div>
      </div>

      {/* 4. Controls Slider Row */}
      <div className="shrink-0">
        <ValueSlider
          label="Base Radius r"
          value={r}
          min={3}
          max={9}
          step={1}
          unit="m"
          onChange={setR}
        />
      </div>

      {/* 5. Architect Tally's Challenge Box */}
      <div className="bg-[#12072a] border border-purple-500/40 rounded-xl p-2 sm:p-2.5 flex flex-col gap-1.5 shrink-0 shadow-lg">
        <span className="text-amber-400 font-display font-black text-xs sm:text-sm leading-tight">
          Architect Tally's Challenge: When you pour from a pointed solid into a container of equal base and height, does its volume equal ⅓?
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
            ✓ Base and 90° Height stay the same, so Volume remains exactly ⅓ × Base × h.
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
            ✗ Because the slanted side grew longer, the volume must become larger.
          </button>
        </div>

        {/* Hint readout */}
        {showHint && (
          <div className="bg-purple-950/80 border border-purple-400/40 rounded-lg py-1 px-2.5 text-xs text-purple-200 font-bold fade-in-up">
            💡 Hint: Notice the ⅓ lines on the container. Pointed solids (cones and pyramids) converge to an apex, holding exactly ⅓ the volume of an equal cylinder.
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

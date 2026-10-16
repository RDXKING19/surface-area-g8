import React, { useEffect } from 'react';
import { FloatingSymbols } from '../shared/FloatingSymbols.jsx';
import { SolidVisual } from '../shared/SolidVisual.jsx';
import { narrate, stopNarration } from '../../utils/audio.js';
import { wonderNarration } from '../../utils/narration.js';

export function WonderPhase({ muted, onNext }) {
  useEffect(() => {
    if (!muted) narrate(wonderNarration(), true);
    return () => stopNarration();
  }, [muted]);

  return (
    <div className="flex-1 min-h-0 flex flex-col items-center justify-center p-3 sm:p-5 relative overflow-hidden select-none z-10">
      <FloatingSymbols />

      <div className="w-full max-w-3xl glass-card flex flex-col items-center text-center fade-in-up z-20 my-auto py-5 px-6">
        {/* Glowing Phase Band */}
        <div className="phase-band phase-band--wonder" />

        <div className="flex items-center gap-2 mb-1.5">
          <span className="text-2xl sm:text-3xl">🔍</span>
          <span className="text-purple-300 font-display font-800 text-xs sm:text-sm tracking-wider uppercase">
            Phase 1: Wonder & Curiosity
          </span>
        </div>

        <h2 className="text-main-heading text-purple-200 mb-2 max-w-2xl text-center">
          The Dessert Stall Commission
        </h2>

        {/* Feature Visual Box */}
        <div className="w-full bg-[#180e38]/95 border border-purple-400/40 rounded-2xl p-3 sm:p-5 mb-3 flex flex-col items-center shadow-2xl">
          <div className="w-full max-w-xl h-48 sm:h-56 flex items-center justify-center mb-2">
            <SolidVisual type="cone-vs-cylinder" />
          </div>

          <div className="text-number text-amber-300 text-lg sm:text-2xl mb-1.5 font-display font-900 drop-shadow">
            Same Radius · Same Height · How Many Pours?
          </div>

          <p className="text-slate-100 text-xs sm:text-sm md:text-base max-w-xl leading-relaxed font-bold text-center">
            Priya and Jun Hao take an order for a waffle cone cup and a straight cylinder tumbler of the exact same width and height. If you fill the cone to the brim and tip it into the cup, how many cones does it take to fill the cup completely?
          </p>
        </div>

        {/* Mascot Thinking Bubble */}
        <div className="flex items-center gap-3 bg-[#14082c]/90 border border-purple-500/40 rounded-full px-5 py-2.5 mb-3.5 max-w-xl shadow-lg">
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-purple-500/30 text-purple-200 flex items-center justify-center font-bold text-base shrink-0">
            🦉
          </div>
          <p className="text-slate-100 text-xs sm:text-sm font-bold text-left leading-snug">
            "What if the secret to every pointed and round solid is hiding right inside a plain cylinder?"
          </p>
        </div>

        <button onClick={onNext} className="btn-gold text-sm sm:text-base px-8 py-2.5 flex items-center gap-2 cursor-pointer shadow-xl hover:scale-105 transition">
          <span>Explore The Commissions</span>
          <span>→</span>
        </button>
      </div>
    </div>
  );
}

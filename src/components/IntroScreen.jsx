import React from 'react';
import { FloatingSymbols } from './shared/FloatingSymbols.jsx';

export function IntroScreen({ onBegin }) {
  return (
    <div className="w-full h-full flex-1 min-h-0 flex flex-col items-center justify-center p-3 sm:p-5 relative overflow-hidden select-none z-10">
      <FloatingSymbols />

      {/* Main Intro Content Card */}
      <div className="relative w-full max-w-3xl flex flex-col items-center text-center fade-in-up z-20 my-auto justify-between overflow-hidden py-2">
        {/* Curriculum Pill Badge */}
        <div className="bg-[#1c0d38] border-2 border-amber-400/50 text-amber-300 text-sm sm:text-base font-900 px-6 py-1.5 rounded-full shadow-lg mb-3 tracking-wide shrink-0">
          ✨ Singapore MOE Sec 2 · Grade 8 Mathematics
        </div>

        {/* Title */}
        <h1 className="font-display font-900 text-4xl sm:text-6xl md:text-6xl text-white text-center leading-tight tracking-tight mb-3 shrink-0">
          SolidQuest
          <span className="text-[#facc15] font-900 block text-3xl sm:text-5xl drop-shadow-[0_0_24px_rgba(250,204,21,0.65)] mt-1">
            Surface Area & Volume
          </span>
        </h1>

        {/* Mascot Avatar & Speech Pill */}
        <div className="flex items-center gap-3 mb-3 shrink-0">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#facc15] p-0.5 shadow-[0_0_20px_rgba(250,204,21,0.7)] flex items-center justify-center text-xl sm:text-2xl shrink-0">
            🦉
          </div>
          <div className="bg-white rounded-full px-5 sm:px-6 py-1.5 text-[#0c031d] font-display font-900 text-sm sm:text-base shadow-lg">
            Welcome to The Solid Design Studio! 📏
          </div>
        </div>

        {/* Subtitle text */}
        <p className="text-slate-100 text-sm sm:text-base md:text-lg max-w-2xl text-center leading-relaxed mb-4 font-bold drop-shadow-sm shrink-0">
          Join Priya, Jun Hao, and Foreman Tally to master the ⅓ rule for pyramids and cones, discover sphere geometry, and solve client design commissions without counting hidden faces!
        </p>

        {/* YOUR LEARNING JOURNEY Flow Card */}
        <div className="w-full max-w-3xl bg-[#14082c]/95 border-2 border-purple-400/40 rounded-3xl p-3.5 sm:p-5 shadow-2xl backdrop-blur-md flex flex-col items-center mb-4 shrink-0">
          <p className="text-[#facc15] text-xs sm:text-sm font-display font-900 tracking-widest text-center mb-3 uppercase">
            YOUR 5-PHASE PEDAGOGICAL JOURNEY
          </p>

          {/* Row 1: Wonder -> Story -> Simulate */}
          <div className="flex items-center justify-center gap-4 sm:gap-8 w-full mb-3">
            {/* Wonder */}
            <div className="flex flex-col items-center text-center">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-purple-400 bg-purple-950/90 text-purple-200 flex items-center justify-center text-sm sm:text-base shadow-[0_0_14px_rgba(192,132,252,0.6)] mb-1">
                🔍
              </div>
              <p className="font-display font-900 text-white text-xs sm:text-sm leading-tight">Wonder</p>
              <p className="text-slate-300 text-[11px] sm:text-xs font-semibold">Dessert stall hook</p>
            </div>
            <span className="text-amber-400 font-black text-sm sm:text-base mb-3">→</span>

            {/* Story */}
            <div className="flex flex-col items-center text-center">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-amber-400 bg-amber-950/90 text-amber-200 flex items-center justify-center text-sm sm:text-base shadow-[0_0_14px_rgba(251,191,36,0.6)] mb-1">
                📖
              </div>
              <p className="font-display font-900 text-white text-xs sm:text-sm leading-tight">Story</p>
              <p className="text-slate-300 text-[11px] sm:text-xs font-semibold">4 core slides</p>
            </div>
            <span className="text-amber-400 font-black text-sm sm:text-base mb-3">→</span>

            {/* Simulate */}
            <div className="flex flex-col items-center text-center">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-teal-400 bg-teal-950/90 text-teal-200 flex items-center justify-center text-sm sm:text-base shadow-[0_0_14px_rgba(45,212,191,0.6)] mb-1">
                🧪
              </div>
              <p className="font-display font-900 text-white text-xs sm:text-sm leading-tight">Simulate</p>
              <p className="text-slate-300 text-[11px] sm:text-xs font-semibold">3 real-world labs</p>
            </div>
          </div>

          {/* Row 2: Practice -> Reflect */}
          <div className="flex items-center justify-center gap-6 sm:gap-12 w-full">
            {/* Practice */}
            <div className="flex flex-col items-center text-center">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-emerald-400 bg-emerald-950/90 text-emerald-200 flex items-center justify-center text-sm sm:text-base shadow-[0_0_14px_rgba(52,211,153,0.6)] mb-1">
                🎮
              </div>
              <p className="font-display font-900 text-white text-xs sm:text-sm leading-tight">Practice</p>
              <p className="text-slate-300 text-[11px] sm:text-xs font-semibold">10 studio worlds</p>
            </div>
            <span className="text-amber-400 font-black text-sm sm:text-base mb-3">→</span>

            {/* Reflect */}
            <div className="flex flex-col items-center text-center">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-indigo-400 bg-indigo-950/90 text-indigo-200 flex items-center justify-center text-sm sm:text-base shadow-[0_0_14px_rgba(129,140,248,0.6)] mb-1">
                📝
              </div>
              <p className="font-display font-900 text-white text-xs sm:text-sm leading-tight">Reflect</p>
              <p className="text-slate-300 text-[11px] sm:text-xs font-semibold">Certification quiz</p>
            </div>
          </div>
        </div>

        {/* Begin Button */}
        <button
          onClick={onBegin}
          className="btn-gold font-display font-900 text-base sm:text-lg px-10 py-3 rounded-full shadow-[0_0_25px_rgba(250,204,21,0.7)] hover:scale-105 transition cursor-pointer flex items-center gap-2"
        >
          <span>Put on Hard Hat & Begin</span>
          <span>→</span>
        </button>
      </div>
    </div>
  );
}

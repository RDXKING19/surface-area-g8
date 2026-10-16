import React, { useState, useEffect, useRef } from 'react';
import { FloatingSymbols } from '../shared/FloatingSymbols.jsx';
import { narrate, stopNarration } from '../../utils/audio.js';
import { storyNarration } from '../../utils/narration.js';
import { STORY_PANELS } from '../../data/storyContent.js';

export function StoryPhase({ muted, onDone, onSlideChange }) {
  const [slideIdx, setSlideIdx] = useState(0);
  const [imageError, setImageError] = useState(false);
  const slide = STORY_PANELS[slideIdx];

  const slideChangeRef = useRef(onSlideChange);
  slideChangeRef.current = onSlideChange;

  useEffect(() => {
    if (slideChangeRef.current) {
      slideChangeRef.current(slideIdx + 1, STORY_PANELS.length);
    }
    setImageError(false);
  }, [slideIdx]);

  useEffect(() => {
    if (!muted) narrate(storyNarration(slideIdx), true);
    return () => stopNarration();
  }, [slideIdx, muted]);

  const goNext = () => {
    if (slideIdx < STORY_PANELS.length - 1) {
      setSlideIdx(i => i + 1);
    } else {
      onDone();
    }
  };

  const goPrev = () => {
    if (slideIdx > 0) setSlideIdx(i => i - 1);
  };

  return (
    <div className="flex-1 min-h-0 flex flex-col items-center justify-center p-2 sm:p-4 relative overflow-hidden select-none z-10">
      <FloatingSymbols />

      {/* Progress Track Bar (Directly Above Card, matching Screenshot 2) */}
      <div className="flex items-center gap-3 mb-2 fade-in-up z-20">
        <div className="w-48 sm:w-64 bg-white/15 h-2 rounded-full overflow-hidden border border-white/10 shadow-inner">
          <div
            className="bg-amber-400 h-full rounded-full transition-all duration-300 shadow-[0_0_10px_rgba(250,204,21,0.8)]"
            style={{ width: `${((slideIdx + 1) / STORY_PANELS.length) * 100}%` }}
          />
        </div>
        <span className="font-display font-black text-xs text-amber-300 tracking-wide uppercase">
          Plan Sheet {slideIdx + 1} of {STORY_PANELS.length}
        </span>
      </div>

      {/* Main Story Glass Card (Matching Screenshot 2) */}
      <div className="w-full max-w-5xl app-card bg-[#160b36]/95 border-2 border-purple-500/40 rounded-3xl p-5 sm:p-6 shadow-2xl backdrop-blur-md grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-7 items-center fade-in-up z-20 overflow-hidden">
        {/* Left Column: Image Illustration with rounded-2xl */}
        <div className="md:col-span-5 relative rounded-2xl overflow-hidden shadow-2xl border-2 border-white/20 h-56 sm:h-72 md:h-[350px] w-full bg-black/40 flex items-center justify-center shrink-0">
          {!imageError ? (
            <img
              key={slide.image}
              src={slide.image}
              alt={slide.title}
              onError={() => setImageError(true)}
              className="w-full h-full object-cover rounded-2xl hover:scale-105 transition-transform duration-700 ease-out"
            />
          ) : (
            <div
              style={{ backgroundColor: slide.imageBg }}
              className="w-full h-full flex flex-col items-center justify-center p-4 text-center"
            >
              <span className="text-6xl sm:text-7xl mb-2 drop-shadow-lg">{slide.imageEmoji}</span>
              <span className="font-display font-900 text-lg sm:text-xl text-amber-300">
                {slide.title}
              </span>
              <span className="text-xs text-slate-300 mt-1">
                Studio Commission #{slide.panel}
              </span>
            </div>
          )}
        </div>

        {/* Right Column: Narrative Typography & Callouts */}
        <div className="md:col-span-7 flex flex-col items-start text-left justify-between gap-3 h-full py-1 overflow-hidden">
          {/* Small Yellow Tracker */}
          <div className="text-amber-400 font-display font-900 text-xs sm:text-sm tracking-wider uppercase">
            PLAN SHEET {slide.panel} OF {STORY_PANELS.length}
          </div>

          {/* Slide Title */}
          <h2 className="font-display font-900 text-2xl sm:text-3xl md:text-4xl text-amber-400 leading-tight drop-shadow-md">
            {slide.title}
          </h2>

          {/* Body Narrative */}
          <p className="text-slate-100 text-xs sm:text-sm md:text-base leading-relaxed font-bold drop-shadow-sm">
            {slide.text}
          </p>

          {/* Pull-Quote Sparkle Pill */}
          <div className="w-full bg-[#12072b] border-2 border-purple-500/40 rounded-2xl px-4 py-2.5 text-center text-amber-300 font-display font-900 text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg">
            <span className="shrink-0 text-base">✨</span>
            <span className="leading-snug">"{slide.highlight}"</span>
            <span className="shrink-0 text-base">✨</span>
          </div>

          {/* Character Note Card (White Background, matching Screenshot 2) */}
          <div className="w-full bg-white text-[#0c031d] rounded-2xl p-3 sm:p-3.5 flex items-center gap-3.5 shadow-xl">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-amber-400 border-2 border-amber-300 shadow-md flex items-center justify-center text-xl shrink-0">
              {slide.characterEmoji}
            </div>
            <div className="flex-1 text-left">
              <span className="text-[10px] sm:text-[11px] font-black tracking-wider text-purple-900 uppercase block mb-0.5">
                {slide.character === 'Foreman Tally' ? 'FOREMAN TALLY' : `${slide.character.toUpperCase()} · STUDIO DESIGNER`}
              </span>
              <p className="text-slate-900 font-bold text-xs sm:text-sm leading-snug">
                {slide.bubble}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation Controls (Outside & Below Card, matching Screenshot 2) */}
      <div className="w-full max-w-4xl flex items-center justify-between mt-3 px-2 z-20 fade-in-up">
        {/* Back Button */}
        <button
          onClick={goPrev}
          disabled={slideIdx === 0}
          className="px-6 py-2 rounded-full border border-white/20 bg-[#160a36]/80 hover:bg-white/20 text-white font-display font-black text-xs sm:text-sm transition disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer shadow-lg"
        >
          ← Back
        </button>

        {/* Slide Dot Indicators */}
        <div className="flex items-center gap-2">
          {STORY_PANELS.map((_, i) => (
            <span
              key={i}
              className={`rounded-full transition-all duration-300 ${
                slideIdx === i
                  ? 'w-6 h-2.5 bg-amber-400 shadow-[0_0_10px_rgba(250,204,21,0.8)]'
                  : 'w-2.5 h-2.5 bg-white/25'
              }`}
            />
          ))}
        </div>

        {/* Next Button */}
        <button
          onClick={goNext}
          className="btn-gold text-xs sm:text-sm py-2 px-7 font-black cursor-pointer shadow-[0_0_20px_rgba(250,204,21,0.6)] hover:scale-105 transition"
        >
          {slideIdx === STORY_PANELS.length - 1 ? 'Enter The Workshop →' : 'Next Plan Sheet →'}
        </button>
      </div>
    </div>
  );
}

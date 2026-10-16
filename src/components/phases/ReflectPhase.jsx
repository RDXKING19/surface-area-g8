import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { FloatingSymbols } from '../shared/FloatingSymbols.jsx';
import { narrate, stopNarration, playClickSound } from '../../utils/audio.js';
import { reflectNarration, reflectCompleteNarration } from '../../utils/narration.js';
import { WORLDS } from '../../config/worlds.config.js';

const RECAP_QUESTIONS = [
  {
    id: 1,
    q: "A cone has radius 6 cm, vertical height 8 cm and slant height 10 cm. Which length goes into the volume formula ⅓πr²h?",
    options: [
      "The vertical height, 8 cm",
      "The slant height, 10 cm",
      "The radius, 6 cm",
      "The diameter, 12 cm"
    ],
    correct: "The vertical height, 8 cm",
    explanation: "Volume measures 3D filling from base to apex perpendicularly, so it always uses the vertical perpendicular height (8 cm)."
  },
  {
    id: 2,
    q: "A cone and a cylinder have the same radius and the same height. The cylinder holds 90 cm³. How much does the cone hold?",
    options: ["30 cm³", "45 cm³", "60 cm³", "270 cm³"],
    correct: "30 cm³",
    explanation: "A pointed solid holds exactly one third of its matching container: ⅓ × 90 = 30 cm³."
  },
  {
    id: 3,
    q: "A cone sits on top of a cylinder with the same radius. Priya adds the circular face where they join into the total surface area. What is wrong?",
    options: [
      "That face is hidden inside the solid, so it should not be counted",
      "She should have used the volume formula",
      "She should have counted it twice",
      "Nothing is wrong"
    ],
    correct: "That face is hidden inside the solid, so it should not be counted",
    explanation: "Surface area counts only the exterior faces you can see and touch. Faces sealed on the inside where shapes join do NOT count!"
  }
];

export function ReflectPhase({
  xp = 0,
  stars = 0,
  bestStreak = 0,
  badges = [],
  worldResults = Array(10).fill(null),
  muted = false,
  onComplete
}) {
  const [recapIdx, setRecapIdx] = useState(0);
  const [recapAnswers, setRecapAnswers] = useState({});
  const [recapCompleted, setRecapCompleted] = useState(false);
  const [reflectionText, setReflectionText] = useState('');
  const [recapFeedback, setRecapFeedback] = useState(null);

  const minLength = 10;
  const currentRecapQ = RECAP_QUESTIONS[recapIdx];

  useEffect(() => {
    if (!muted) narrate(reflectNarration(), true);
    return () => stopNarration();
  }, [muted]);

  const handleRecapSelect = (opt) => {
    playClickSound();
    const isCorrect = opt === currentRecapQ.correct;
    setRecapAnswers(prev => ({ ...prev, [currentRecapQ.id]: opt }));

    if (isCorrect) {
      setRecapFeedback({ status: 'correct', text: currentRecapQ.explanation });
    } else {
      setRecapFeedback({ status: 'wrong', text: `Review the rule: ${currentRecapQ.explanation}` });
    }
  };

  const handleNextRecap = () => {
    setRecapFeedback(null);
    if (recapIdx < RECAP_QUESTIONS.length - 1) {
      setRecapIdx(i => i + 1);
    } else {
      setRecapCompleted(true);
    }
  };

  const handleSubmit = () => {
    if (!muted) narrate(reflectCompleteNarration(), true);
    try {
      confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });
    } catch (e) {
      // Ignore
    }
    onComplete();
  };

  const charCount = reflectionText.trim().length;

  return (
    <div className="flex-1 min-h-0 flex flex-col items-center justify-center p-2 sm:p-4 relative overflow-hidden select-none z-10">
      <FloatingSymbols />

      <div className="w-full max-w-4xl app-card reflect-card bg-[#160b36]/95 border-2 border-purple-400/40 rounded-3xl p-4 sm:p-6 shadow-2xl backdrop-blur-md flex flex-col items-center fade-in-up z-20 my-auto overflow-hidden">
        {/* Indigo Accent Bar */}
        <div className="w-20 h-1.5 bg-indigo-400 rounded-full mb-1.5 shadow-[0_0_16px_rgba(129,140,248,0.85)] shrink-0" />

        <div className="flex items-center gap-2 mb-1 shrink-0">
          <span className="text-2xl">📝</span>
          <span className="text-indigo-300 font-display font-800 text-xs sm:text-sm tracking-wider uppercase">
            Phase 5: Reflect & Consolidate
          </span>
        </div>

        <h2 className="font-display font-900 text-xl sm:text-2xl text-white mb-2 text-center shrink-0">
          Studio Certification Recap
        </h2>

        {/* STEP 1: Conceptual Recap Quiz (3 Questions) */}
        {!recapCompleted && (
          <div className="w-full max-w-2xl flex-1 min-h-0 flex flex-col justify-between overflow-hidden">
            <div className="bg-[#120728]/90 border border-purple-400/30 rounded-2xl p-4 flex flex-col gap-3">
              <div className="flex items-center justify-between text-xs font-bold text-slate-300">
                <span className="text-amber-400 font-mono">
                  Concept Check {recapIdx + 1} of {RECAP_QUESTIONS.length}
                </span>
                <span>Rule Verification</span>
              </div>

              <h3 className="font-display font-900 text-sm sm:text-base md:text-lg text-white leading-snug">
                {currentRecapQ.q}
              </h3>

              <div className="grid grid-cols-1 gap-2">
                {currentRecapQ.options.map((opt, i) => {
                  const isSelected = recapAnswers[currentRecapQ.id] === opt;
                  const isCorrectOpt = opt === currentRecapQ.correct;

                  let btnCls = 'border-white/15 bg-[#1a0e38] text-slate-100 hover:border-amber-400/50';
                  if (recapAnswers[currentRecapQ.id]) {
                    if (isCorrectOpt) {
                      btnCls = 'border-emerald-400 bg-emerald-950/80 text-emerald-200 shadow-md';
                    } else if (isSelected) {
                      btnCls = 'border-rose-400 bg-rose-950/80 text-rose-200';
                    }
                  }

                  return (
                    <button
                      key={i}
                      disabled={Boolean(recapAnswers[currentRecapQ.id])}
                      onClick={() => handleRecapSelect(opt)}
                      className={`p-2.5 sm:p-3 rounded-xl border-2 font-display font-extrabold text-xs sm:text-sm text-left transition cursor-pointer flex items-center justify-between ${btnCls}`}
                    >
                      <span>{opt}</span>
                      <span className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-xs ml-2 shrink-0">
                        {String.fromCharCode(65 + i)}
                      </span>
                    </button>
                  );
                })}
              </div>

              {recapFeedback && (
                <div
                  className={`p-2.5 rounded-xl border text-xs sm:text-sm font-bold text-left fade-in-up ${
                    recapFeedback.status === 'correct'
                      ? 'bg-emerald-950/80 border-emerald-400/60 text-emerald-200'
                      : 'bg-rose-950/80 border-rose-400/60 text-rose-200'
                  }`}
                >
                  {recapFeedback.text}
                </div>
              )}
            </div>

            {recapAnswers[currentRecapQ.id] && (
              <div className="mt-3 flex justify-end shrink-0">
                <button
                  onClick={handleNextRecap}
                  className="btn-gold text-xs sm:text-sm py-2 px-6 font-black cursor-pointer shadow-lg"
                >
                  {recapIdx < RECAP_QUESTIONS.length - 1 ? 'Next Question →' : 'Complete Recap Quiz →'}
                </button>
              </div>
            )}
          </div>
        )}

        {/* STEP 2: Reflection Prompt & Final Submit */}
        {recapCompleted && (
          <div className="w-full max-w-2xl flex-1 min-h-0 flex flex-col justify-between overflow-hidden">
            <div className="bg-[#120728]/90 border border-purple-400/30 rounded-2xl p-3 sm:p-4 flex flex-col gap-2.5">
              <div className="flex items-center gap-2">
                <span className="text-xl">🦉</span>
                <p className="font-display font-black text-xs sm:text-sm text-amber-300">
                  Foreman Tally's Studio Journal Prompt:
                </p>
              </div>

              <p className="text-xs sm:text-sm text-slate-200 font-bold leading-relaxed">
                "Dear Foreman Tally, the slant height and the vertical height of a solid are different because..."
              </p>

              <textarea
                value={reflectionText}
                onChange={e => setReflectionText(e.target.value)}
                placeholder="Explain in your own words when you use vertical height versus slant height, and how Pythagoras helps..."
                rows={3}
                className="w-full bg-[#180a36] border border-white/20 rounded-xl p-3 text-xs sm:text-sm text-white placeholder-slate-400 focus:outline-none focus:border-amber-400 resize-none font-bold"
              />

              <div className="flex items-center justify-between text-[11px] font-bold text-slate-400">
                <span>Min {minLength} characters</span>
                <span className={charCount >= minLength ? 'text-emerald-400' : 'text-amber-400'}>
                  {charCount} / {minLength}
                </span>
              </div>
            </div>

            <div className="mt-3 flex justify-center shrink-0">
              <button
                onClick={handleSubmit}
                disabled={charCount < minLength}
                className="btn-gold text-sm sm:text-base py-2.5 px-8 font-black cursor-pointer shadow-xl disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Submit Reflection & View Certificate 🎖️
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export function CelebrationScreen({ xp = 0, stars = 0, bestStreak = 0, muted = false, onRestart }) {
  useEffect(() => {
    try {
      confetti({ particleCount: 160, spread: 100, origin: { y: 0.5 } });
    } catch (e) {
      // Ignore
    }
  }, []);

  return (
    <div className="flex-1 min-h-0 flex flex-col items-center justify-center p-3 sm:p-5 relative overflow-hidden select-none z-10">
      <FloatingSymbols />

      <div className="w-full max-w-xl glass-card flex flex-col items-center text-center fade-in-up z-20 my-auto py-6 px-6">
        <span className="text-6xl mb-2 drop-shadow-lg animate-bounce">🏆</span>

        <h1 className="font-display font-900 text-3xl sm:text-4xl text-amber-300 mb-1">
          Chief Solid Designer!
        </h1>
        <p className="text-xs sm:text-sm text-slate-200 font-extrabold max-w-md mb-4 leading-relaxed">
          You have mastered the surface area and volume of pyramids, cones, spheres, and composite solids!
        </p>

        {/* Scorecard */}
        <div className="grid grid-cols-3 gap-3 w-full max-w-md bg-[#120728] border border-amber-400/40 rounded-2xl p-3.5 mb-5 shadow-xl">
          <div className="flex flex-col items-center">
            <span className="text-[11px] font-bold text-slate-400 uppercase">Total XP</span>
            <span className="font-display font-black text-xl text-amber-300 font-mono mt-0.5">
              {xp}
            </span>
          </div>
          <div className="flex flex-col items-center border-x border-white/10">
            <span className="text-[11px] font-bold text-slate-400 uppercase">Stars</span>
            <span className="font-display font-black text-xl text-yellow-300 font-mono mt-0.5">
              {stars} / 30
            </span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-[11px] font-bold text-slate-400 uppercase">Best Streak</span>
            <span className="font-display font-black text-xl text-orange-400 font-mono mt-0.5">
              🔥 {bestStreak}
            </span>
          </div>
        </div>

        <button
          onClick={onRestart}
          className="btn-gold text-sm sm:text-base py-2.5 px-8 font-black cursor-pointer shadow-xl hover:scale-105 transition"
        >
          Take on Another Commission 🔄
        </button>
      </div>
    </div>
  );
}

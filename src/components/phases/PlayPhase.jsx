import React, { useState, useEffect, useRef } from 'react';
import { FloatingSymbols } from '../shared/FloatingSymbols.jsx';
import { KingdomMap } from '../gamification/KingdomMap.jsx';
import { QuestionRenderer } from '../quiz/QuestionRenderer.jsx';
import { BossBattleModal } from '../quiz/BossBattleModal.jsx';
import { FeedbackOverlay } from '../shared/FeedbackOverlay.jsx';
import { BadgesModal } from '../gamification/BadgesModal.jsx';
import { generateQuestion, DISTRICTS } from '../../data/questionBank.js';
import { createRNG } from '../../utils/rng.js';
import { calcStars, calcXP } from '../../utils/scoring.js';
import { narrate, playClickSound } from '../../utils/audio.js';
import {
  playCorrectNarration,
  playWrongNarration,
  districtCompleteNarration,
  bossWinNarration
} from '../../utils/narration.js';

const MODES = [
  { id: 'guided', name: 'Guided Practice', icon: '🧭', questions: 5, hints: true, timed: false, lives: null },
  { id: 'independent', name: 'Independent Practice', icon: '📝', questions: 10, hints: false, timed: false, lives: null },
  { id: 'timed', name: 'Timed Challenge', icon: '⏱️', questions: 8, hints: false, timed: true, lives: null },
  { id: 'boss', name: 'Boss Battle', icon: '👑', questions: 5, hints: false, timed: false, lives: 3 }
];

const SLOT_PLAN = {
  guided: () => [0, 1, 2, 3, 4],
  independent: () => [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
  timed: (rng) => rng.shuffle([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]).slice(0, 8),
  boss: () => [5, 6, 7, 8, 9] // Hardest 5 slots!
};

export function PlayPhase({
  muted = false,
  xp = 0,
  streak = 0,
  bestStreak = 0,
  badges = [],
  worldResults = Array(10).fill(null),
  onUpdateScore,
  onGoReflect
}) {
  const [selectedMode, setSelectedMode] = useState('independent');
  const [activeWorld, setActiveWorld] = useState(null); // null = map view, number = quiz view
  const [questions, setQuestions] = useState([]);
  const [qIdx, setQIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [hintLevel, setHintLevel] = useState(0);
  const [lives, setLives] = useState(3);
  const [timeLeft, setTimeLeft] = useState(60);
  const [correctInSession, setCorrectInSession] = useState(0);
  const [showBossIntro, setShowBossIntro] = useState(false);
  const [showBadgesModal, setShowBadgesModal] = useState(false);

  const timerRef = useRef(null);
  const rngRef = useRef(createRNG(Date.now()));

  const totalStars = worldResults.reduce((a, b) => a + (b || 0), 0);
  const allWorldsCompleted = worldResults.every(r => r != null && r > 0);

  // Timer for Timed Challenge Mode
  useEffect(() => {
    if (activeWorld !== null && selectedMode === 'timed' && timeLeft > 0 && !feedback) {
      timerRef.current = setInterval(() => {
        setTimeLeft(t => {
          if (t <= 1) {
            clearInterval(timerRef.current);
            finishQuizSession(correctInSession);
            return 0;
          }
          return t - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timerRef.current);
  }, [activeWorld, selectedMode, timeLeft, feedback]);

  const startWorldSession = (worldIdx, modeId = selectedMode) => {
    const modeConfig = MODES.find(m => m.id === modeId) || MODES[1];
    const slots = (SLOT_PLAN[modeId] || SLOT_PLAN.independent)(rngRef.current);

    const list = slots.map(slot => generateQuestion(worldIdx, slot, rngRef.current));

    setQuestions(list);
    setQIdx(0);
    setSelectedOption(null);
    setFeedback(null);
    setHintLevel(0);
    setCorrectInSession(0);
    setTimeLeft(60);
    setLives(modeConfig.lives || 3);

    if (modeId === 'boss') {
      setShowBossIntro(true);
    } else {
      setActiveWorld(worldIdx);
    }
  };

  const handleOptionSelect = (option) => {
    playClickSound();
    if (selectedOption !== null || feedback !== null) return;
    setSelectedOption(option);

    const q = questions[qIdx];
    const isCorrect = option === q.correctAnswer;

    if (isCorrect) {
      const nextCorrect = correctInSession + 1;
      setCorrectInSession(nextCorrect);
      const earnedXP = calcXP({ attempts: 1, hintsUsed: hintLevel, streak: streak + 1 });

      if (!muted) narrate(playCorrectNarration(nextCorrect), true);

      onUpdateScore({
        xpDelta: earnedXP,
        isCorrect: true
      });

      setFeedback({
        status: 'correct',
        title: 'Spot On! 🎯',
        explanation: q.explanation,
        xpGained: earnedXP
      });
    } else {
      let remainingLives = lives;
      if (selectedMode === 'boss') {
        remainingLives = lives - 1;
        setLives(remainingLives);
      }

      if (!muted) narrate(playWrongNarration(), true);

      onUpdateScore({
        isCorrect: false
      });

      setFeedback({
        status: 'wrong',
        title: 'Not Quite — Re-measure! 📏',
        explanation: q.explanation,
        xpGained: 0,
        outOfLives: selectedMode === 'boss' && remainingLives <= 0
      });
    }
  };

  const handleNextQuestion = () => {
    if (feedback?.outOfLives) {
      setActiveWorld(null);
      setFeedback(null);
      return;
    }

    setFeedback(null);
    setSelectedOption(null);
    setHintLevel(0);

    if (qIdx + 1 < questions.length) {
      setQIdx(i => i + 1);
    } else {
      finishQuizSession(correctInSession);
    }
  };

  const finishQuizSession = (correctCount) => {
    const stars = calcStars(correctCount);
    const isBossWon = selectedMode === 'boss' && correctCount >= 4;

    onUpdateScore({
      worldIdx: activeWorld,
      stars,
      bossWon: isBossWon
    });

    if (isBossWon) {
      const boss = DISTRICTS[activeWorld]?.boss;
      if (!muted) narrate(bossWinNarration(boss?.reward || 'Legend'), true);
    } else if (!muted) {
      narrate(districtCompleteNarration(stars), true);
    }

    setActiveWorld(null);
  };

  const currentQ = questions[qIdx];
  const modeObj = MODES.find(m => m.id === selectedMode);

  return (
    <div className="flex-1 min-h-0 flex flex-col items-center justify-center p-2 sm:p-4 relative overflow-hidden select-none z-10">
      <FloatingSymbols />

      {/* Main Glass Card */}
      <div className="w-full max-w-6xl app-card bg-[#160b36]/95 border-2 border-purple-400/40 rounded-3xl p-3 sm:p-6 shadow-2xl backdrop-blur-md flex flex-col items-center fade-in-up z-20 my-auto overflow-hidden">
        {/* Practice Stats Bar */}
        <div className="w-full flex items-center justify-between border-b border-white/10 pb-2 mb-2 shrink-0">
          <div className="flex items-center gap-2 sm:gap-3">
            {/* XP Pill */}
            <div className="bg-[#241348] border border-amber-400/50 px-3 py-1 rounded-full text-amber-300 font-display font-black text-xs sm:text-sm flex items-center gap-1.5">
              <span>⚡</span>
              <span>{xp} XP</span>
            </div>

            {/* Streak Pill */}
            <div className="bg-[#241348] border border-orange-400/50 px-3 py-1 rounded-full text-orange-300 font-display font-black text-xs sm:text-sm flex items-center gap-1.5">
              <span>🔥</span>
              <span>Streak: {streak}</span>
            </div>

            {/* Total Stars */}
            <div className="bg-[#241348] border border-yellow-400/50 px-3 py-1 rounded-full text-yellow-300 font-display font-black text-xs sm:text-sm flex items-center gap-1.5">
              <span>⭐</span>
              <span>{totalStars} / 30</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowBadgesModal(true)}
              className="bg-purple-900/80 hover:bg-purple-800 border border-purple-400/50 text-white font-black text-xs px-3 py-1.5 rounded-full flex items-center gap-1.5 cursor-pointer transition"
            >
              <span>🎖️</span>
              <span>Badges ({badges.length})</span>
            </button>

            {/* If in Quiz View, Return to Map Button */}
            {activeWorld !== null && (
              <button
                onClick={() => setActiveWorld(null)}
                className="bg-white/10 hover:bg-white/20 text-white font-black text-xs px-3 py-1.5 rounded-full cursor-pointer transition"
              >
                🗺️ Map
              </button>
            )}
          </div>
        </div>

        {/* VIEW 1: MAP VIEW */}
        {activeWorld === null && (
          <div className="w-full flex flex-col items-center flex-1 min-h-0 justify-between overflow-hidden">
            {/* Mode Selector Row */}
            <div className="flex items-center justify-center gap-1.5 sm:gap-2 mb-2 w-full overflow-x-auto shrink-0 py-0.5">
              {MODES.map(m => {
                const isSelected = selectedMode === m.id;
                return (
                  <button
                    key={m.id}
                    onClick={() => {
                      playClickSound();
                      setSelectedMode(m.id);
                    }}
                    className={`px-3 py-1.5 rounded-xl border-2 font-display font-black text-xs sm:text-sm flex items-center gap-1.5 transition cursor-pointer shrink-0 ${
                      isSelected
                        ? 'border-amber-400 bg-[#351b68] text-white shadow-[0_0_14px_rgba(250,204,21,0.5)]'
                        : 'border-white/15 bg-white/5 text-slate-300 hover:bg-white/10'
                    }`}
                  >
                    <span>{m.icon}</span>
                    <span>{m.name}</span>
                  </button>
                );
              })}
            </div>

            {/* Instruction Banner */}
            <div className="text-center mb-1 shrink-0">
              <span className="text-[11px] sm:text-xs font-bold text-slate-300">
                10 Studio Worlds · Need 1★ in World n to unlock World n+1
              </span>
            </div>

            {/* Kingdom Map Grid */}
            <div className="w-full flex-1 min-h-0 overflow-y-auto">
              <KingdomMap
                worldResults={worldResults}
                onSelectWorld={(idx) => startWorldSession(idx, selectedMode)}
                totalStars={totalStars}
              />
            </div>

            {/* Move to Reflect button once progress is made */}
            <div className="mt-2 pt-1 border-t border-white/10 w-full flex items-center justify-between shrink-0">
              <span className="text-xs text-slate-400 font-bold">
                Ready to review what you learned?
              </span>
              <button
                onClick={onGoReflect}
                className="btn-gold text-xs sm:text-sm py-1.5 px-5 font-black cursor-pointer shadow-lg"
              >
                Proceed to Reflect Phase →
              </button>
            </div>
          </div>
        )}

        {/* VIEW 2: QUIZ / ACTIVE QUESTION VIEW */}
        {activeWorld !== null && currentQ && (
          <div className="w-full flex-1 min-h-0 flex flex-col items-center justify-between">
            {/* Quiz Top Status Bar */}
            <div className="w-full flex items-center justify-between text-xs font-black text-slate-300 bg-black/30 px-3 py-1 rounded-xl mb-1 shrink-0">
              <div className="flex items-center gap-2">
                <span className="text-amber-400 font-mono">
                  Question {qIdx + 1} of {questions.length}
                </span>
                <span className="text-slate-500">•</span>
                <span className="text-cyan-300">{DISTRICTS[activeWorld]?.name}</span>
              </div>

              {selectedMode === 'boss' && (
                <div className="flex items-center gap-1 text-rose-400">
                  <span>Hard Hats:</span>
                  {Array.from({ length: 3 }).map((_, i) => (
                    <span key={i} className={i < lives ? 'opacity-100' : 'opacity-25'}>
                      ⛑️
                    </span>
                  ))}
                </div>
              )}

              {selectedMode === 'timed' && (
                <div className="flex items-center gap-1 font-mono text-amber-300">
                  <span>⏱️</span>
                  <span>{timeLeft}s</span>
                </div>
              )}
            </div>

            {/* Question Renderer */}
            <div className="w-full flex-1 min-h-0 flex flex-col items-center justify-center">
              <QuestionRenderer
                question={currentQ}
                selectedOption={selectedOption}
                onSelectOption={handleOptionSelect}
                showHints={modeObj?.hints}
                hintLevel={hintLevel}
                onUseHint={() => setHintLevel(l => l + 1)}
                disabled={selectedOption !== null || feedback !== null}
              />
            </div>
          </div>
        )}
      </div>

      {/* Boss Intro Modal */}
      {showBossIntro && (
        <BossBattleModal
          boss={DISTRICTS[activeWorld]?.boss}
          lives={3}
          onStart={() => {
            setShowBossIntro(false);
            setActiveWorld(activeWorld);
          }}
          onClose={() => {
            setShowBossIntro(false);
            setActiveWorld(null);
          }}
        />
      )}

      {/* Badges Modal */}
      {showBadgesModal && (
        <BadgesModal
          unlockedBadges={badges}
          onClose={() => setShowBadgesModal(false)}
        />
      )}

      {/* Feedback Overlay */}
      {feedback && (
        <FeedbackOverlay
          status={feedback.status}
          title={feedback.title}
          explanation={feedback.explanation}
          xpGained={feedback.xpGained}
          onNext={handleNextQuestion}
          nextLabel={
            feedback.outOfLives
              ? 'Return to Studio Map ↩'
              : qIdx + 1 < questions.length
              ? 'Next Commission →'
              : 'Complete World Session 🏆'
          }
        />
      )}
    </div>
  );
}

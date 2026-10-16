import React from 'react';
import { BADGES } from '../../utils/badgeEngine.js';

export function BadgesModal({ unlockedBadges = [], onClose }) {
  const unlockedSet = new Set(unlockedBadges);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md fade-in-up">
      <div className="w-full max-w-2xl bg-[#160b38]/95 border-2 border-purple-400/50 rounded-3xl p-5 sm:p-6 shadow-2xl flex flex-col max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/15 pb-3 mb-3 shrink-0">
          <div className="flex items-center gap-3">
            <span className="text-3xl sm:text-4xl">🎖️</span>
            <div>
              <h2 className="font-display font-900 text-lg sm:text-2xl text-white">Studio Badges</h2>
              <p className="text-xs sm:text-sm text-slate-300 font-extrabold">
                {unlockedSet.size} of {Object.keys(BADGES).length} Badges Unlocked
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold flex items-center justify-center transition cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Badges Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 overflow-y-auto flex-1 p-1">
          {Object.values(BADGES).map(b => {
            const isUnlocked = unlockedSet.has(b.id);
            return (
              <div
                key={b.id}
                className={`p-3 sm:p-3.5 rounded-2xl border-2 flex items-center gap-3 transition-all duration-300 ${
                  isUnlocked
                    ? 'border-amber-400/60 bg-[#25154c]/90 text-white shadow-md'
                    : 'border-white/10 bg-[#100726]/50 text-slate-400 opacity-60'
                }`}
              >
                <div
                  className={`w-11 h-11 rounded-xl flex items-center justify-center text-2xl shrink-0 ${
                    isUnlocked ? 'bg-amber-400/20 border border-amber-400/40' : 'bg-white/5 border border-white/10'
                  }`}
                >
                  {isUnlocked ? b.icon : '🔒'}
                </div>
                <div className="text-left flex-1 min-w-0">
                  <h4 className="font-display font-900 text-xs sm:text-sm leading-tight truncate text-amber-300">
                    {b.name}
                  </h4>
                  <p className="text-[11px] sm:text-xs text-slate-200 line-clamp-2 mt-0.5">
                    {b.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-3 pt-2 border-t border-white/10 flex justify-end shrink-0">
          <button onClick={onClose} className="btn-secondary py-1.5 px-6 text-xs sm:text-sm font-black">
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

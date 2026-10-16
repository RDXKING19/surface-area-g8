import React, { useState, useEffect } from 'react';
import { FloatingSymbols } from '../shared/FloatingSymbols.jsx';
import { narrate, stopNarration } from '../../utils/audio.js';
import { simStationIntro } from '../../utils/narration.js';
import { PourOverWorkshop } from '../simulations/PourOverWorkshop.jsx';
import { CapacityContractor } from '../simulations/CapacityContractor.jsx';
import { ComboBuilder } from '../simulations/ComboBuilder.jsx';

const STATIONS = [
  {
    id: 0,
    letter: 'A',
    icon: '📐',
    name: 'Section A: Pour-Over Workshop',
    sub: 'Cone & pyramid ⅓ pouring ratio...',
    Comp: PourOverWorkshop
  },
  {
    id: 1,
    letter: 'B',
    icon: '🎯',
    name: 'Section B: Capacity Contractor',
    sub: 'Build-to-target sizing & maximums...',
    Comp: CapacityContractor
  },
  {
    id: 2,
    letter: 'C',
    icon: '🏰',
    name: 'Section C: Combo Builder',
    sub: 'Composite grounds & outer faces...',
    Comp: ComboBuilder
  }
];

export function SimulatePhase({
  muted,
  onNext,
  simCompleted = [false, false, false],
  onCompleteStation
}) {
  const [stationIdx, setStationIdx] = useState(0);

  const currentStation = STATIONS[stationIdx];
  const CurrentComp = currentStation.Comp;

  const allStationsComplete = simCompleted.slice(0, 3).every(Boolean);

  useEffect(() => {
    if (!muted) narrate(simStationIntro(stationIdx), true);
    return () => stopNarration();
  }, [stationIdx, muted]);

  const handleStationFinished = () => {
    if (onCompleteStation) {
      onCompleteStation(stationIdx);
    }
  };

  return (
    <div className="flex-1 min-h-0 flex flex-col items-center justify-center p-2 sm:p-3 relative overflow-hidden select-none z-10">
      <FloatingSymbols />

      {/* Main Simulation Stations Card */}
      <div className="w-full max-w-5xl app-card sim-card bg-[#14082e]/95 border-2 border-purple-500/35 rounded-2xl md:rounded-3xl p-2.5 sm:p-3 md:p-4 shadow-2xl backdrop-blur-md flex flex-col items-center fade-in-up z-20 my-auto">
        {/* Cyan Accent Bar */}
        <div className="w-14 h-1 bg-cyan-400 rounded-full mb-1.5 shadow-[0_0_12px_rgba(56,189,248,0.85)] shrink-0" />

        {/* Card Header Title Row */}
        <div className="w-full flex items-center justify-between mb-2 shrink-0 px-1">
          <h2 className="font-display font-900 text-base sm:text-lg md:text-xl text-white flex items-center gap-2">
            <span>🧪</span>
            <span>Site Lab Simulations – 3 Planning Sections</span>
          </h2>

          <div className="text-xs sm:text-sm font-bold text-cyan-300">
            <span className="font-display font-black text-cyan-300">
              {simCompleted.filter(Boolean).length} / 3 Completed
            </span>
          </div>
        </div>

        {/* 2-Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-2.5 sm:gap-3 w-full items-stretch flex-1 min-h-0">
          {/* Left Column: 3 Station Sidebar Tabs (Sections A, B, C) */}
          <div className="md:col-span-4 flex flex-col justify-between gap-2.5 shrink-0">
            <div className="flex flex-col gap-2">
              {STATIONS.map((st, i) => {
                const isSelected = stationIdx === i;
                const isDone = simCompleted[i];

                return (
                  <button
                    key={st.id}
                    onClick={() => setStationIdx(i)}
                    className={`p-2 sm:p-2.5 rounded-xl border flex items-center justify-between text-left transition-all duration-200 cursor-pointer ${
                      isSelected
                        ? 'border-2 border-cyan-400 bg-[#1e254e] text-white shadow-[0_0_16px_rgba(56,189,248,0.4)] scale-[1.01]'
                        : 'border border-purple-500/25 bg-[#13082b]/85 text-slate-300 hover:border-cyan-400/50'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div
                        className={`w-9 h-9 rounded-xl flex items-center justify-center text-base font-bold shrink-0 ${
                          isSelected ? 'bg-cyan-500/30 text-cyan-300 border border-cyan-400/40' : 'bg-white/10 text-white border border-white/10'
                        }`}
                      >
                        {st.icon}
                      </div>
                      <div className="min-w-0">
                        <span className="font-display font-black text-xs sm:text-sm text-white block leading-tight truncate">
                          {st.name}
                        </span>
                        <span className="text-[10px] sm:text-[11px] text-slate-300 truncate block mt-0.5">
                          {st.sub}
                        </span>
                      </div>
                    </div>

                    <span className="text-sm shrink-0 ml-1.5">
                      {isDone ? (
                        <span className="text-emerald-400 font-bold">✅</span>
                      ) : (
                        <span className="text-amber-400 font-bold">🔓</span>
                      )}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Bottom Call to Action for Practice Mode */}
            <div className="flex flex-col items-center text-center mt-auto pt-1">
              <button
                onClick={onNext}
                disabled={!allStationsComplete}
                className={`w-full py-2 sm:py-2.5 rounded-xl font-display font-black text-xs sm:text-sm md:text-base transition flex items-center justify-center gap-2 shadow-lg ${
                  allStationsComplete
                    ? 'btn-gold hover:scale-105 cursor-pointer shadow-[0_0_20px_rgba(250,204,21,0.6)]'
                    : 'bg-[#2a1d3c] text-slate-400/60 border border-white/10 cursor-not-allowed'
                }`}
              >
                <span>Go to Practice Phase! →</span>
              </button>
              <span className="text-[10px] sm:text-xs text-amber-300 font-bold mt-1">
                Complete all 3 sections to unlock Practice Phase ({simCompleted.filter(Boolean).length}/3)
              </span>
            </div>
          </div>

          {/* Right Column: Active Simulation Station Workspace */}
          <div className="md:col-span-8 flex flex-col justify-center min-h-0">
            <CurrentComp onComplete={handleStationFinished} />
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Reducer and state management for SolidQuest (Grade 8)
 * Fully unit-testable and exported per TRD §4
 */
import { STORY_PANELS } from '../data/storyContent.js';

export const INITIAL_STATE = {
  phase: 'intro', // 'intro' | 'wonder' | 'story' | 'simulate' | 'practice' | 'reflect'
  storyPanel: 0,
  simStation: 0,
  simCompleted: [false, false, false], // Exactly 3 sections: A, B, and C
  mode: 'independent',
  worldIdx: 0,
  questionIdx: 0,
  questions: [],
  worldResults: Array(10).fill(null),
  xp: 0,
  streak: 0,
  bestStreak: 0,
  lives: 3,
  hintsUsed: 0,
  attempts: 1,
  badges: [],
  totalCorrect: 0,
  totalAnswered: 0,
  bossesDefeated: 0,
  audioEnabled: true,
  journeyComplete: false
};

export function appReducer(state, action) {
  switch (action.type) {
    case 'SET_PHASE':
      return { ...state, phase: action.payload };

    case 'NEXT_STORY_PANEL': {
      if (state.storyPanel >= STORY_PANELS.length - 1) {
        return { ...state, phase: 'simulate', storyPanel: 0 };
      }
      return { ...state, storyPanel: state.storyPanel + 1 };
    }

    case 'PREV_STORY_PANEL':
      return { ...state, storyPanel: Math.max(0, state.storyPanel - 1) };

    case 'ADVANCE_SIM_STATION':
      return { ...state, simStation: Math.min(2, state.simStation + 1) };

    case 'PREV_SIM_STATION':
      return { ...state, simStation: Math.max(0, state.simStation - 1) };

    case 'COMPLETE_SIM_STATION': {
      const idx = action.payload !== undefined ? action.payload : state.simStation;
      const updated = [...state.simCompleted];
      updated[idx] = true;
      return { ...state, simCompleted: updated };
    }

    case 'LOAD_QUESTIONS':
      return {
        ...state,
        questions: action.payload.questions || [],
        worldIdx: action.payload.worldIdx || 0,
        questionIdx: 0,
        attempts: 1,
        hintsUsed: 0
      };

    case 'ANSWER_CORRECT': {
      const nextStreak = state.streak + 1;
      const nextBest = Math.max(state.bestStreak, nextStreak);
      const earnedXP = action.payload?.xpDelta || 10;
      const newBadges = action.payload?.newBadges || [];

      return {
        ...state,
        xp: state.xp + earnedXP,
        streak: nextStreak,
        bestStreak: nextBest,
        totalCorrect: state.totalCorrect + 1,
        totalAnswered: state.totalAnswered + 1,
        badges: Array.from(new Set([...state.badges, ...newBadges])),
        attempts: 1,
        hintsUsed: 0
      };
    }

    case 'ANSWER_INCORRECT':
      return {
        ...state,
        streak: 0,
        totalAnswered: state.totalAnswered + 1,
        attempts: state.attempts + 1
      };

    case 'USE_HINT':
      return { ...state, hintsUsed: state.hintsUsed + 1 };

    case 'CLEAR_FEEDBACK':
      return { ...state };

    case 'PREV_QUESTION':
      return { ...state, questionIdx: Math.max(0, state.questionIdx - 1) };

    case 'NEXT_QUESTION':
      return { ...state, questionIdx: state.questionIdx + 1, attempts: 1, hintsUsed: 0 };

    case 'UNLOCK_BADGE': {
      const badgeId = action.payload;
      if (state.badges.includes(badgeId)) return state;
      return { ...state, badges: [...state.badges, badgeId] };
    }

    case 'UPDATE_WORLD_RESULT': {
      const { worldIdx, stars, bossWon } = action.payload;
      const newResults = [...state.worldResults];
      if (stars !== undefined) {
        newResults[worldIdx] = Math.max(newResults[worldIdx] || 0, stars);
      }
      return {
        ...state,
        worldResults: newResults,
        bossesDefeated: bossWon ? state.bossesDefeated + 1 : state.bossesDefeated
      };
    }

    case 'COMPLETE_PHASE': {
      if (action.payload === 'practice') {
        return { ...state, phase: 'reflect' };
      }
      if (action.payload === 'reflect') {
        return {
          ...state,
          journeyComplete: true,
          badges: Array.from(new Set([...state.badges, 'journey_complete']))
        };
      }
      return state;
    }

    case 'TOGGLE_AUDIO':
      return { ...state, audioEnabled: !state.audioEnabled };

    case 'RESET_SESSION':
      return { ...INITIAL_STATE, audioEnabled: state.audioEnabled };

    default:
      return state;
  }
}

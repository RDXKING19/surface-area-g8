/**
 * Verification test suite for SolidQuest (Grade 8)
 * Tests:
 * 1. Question bank completeness, distinctness, and validity (100 questions across 10 worlds)
 * 2. 4 slides in Story phase
 * 3. 3 sections in Simulate phase (Sections A, B, and C)
 * 4. Badge engine: all 8 badges reachable
 * 5. Math accuracy of geometry formulas
 */
import { generateBank, generateQuestion } from '../src/data/questionBank.js';
import { STORY_PANELS } from '../src/data/storyContent.js';
import { WORLDS } from '../src/config/worlds.config.js';
import { checkBadges, BADGES } from '../src/utils/badgeEngine.js';
import { appReducer, INITIAL_STATE } from '../src/state/appReducer.js';
import * as solidMath from '../src/utils/solidMath.js';

console.log('--- RUNNING SOLIDQUEST VERIFICATION TESTS ---\n');

let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    passed++;
    console.log(`  ✓ ${message}`);
  } else {
    failed++;
    console.error(`  ✗ FAIL: ${message}`);
  }
}

// 1. Story Phase Check
console.log('1. Story Phase:');
assert(STORY_PANELS.length === 4, `Story phase must have exactly 4 slides without scrolling (found ${STORY_PANELS.length})`);
STORY_PANELS.forEach((panel, i) => {
  assert(panel.title && panel.text && panel.highlight && panel.bubble, `Slide ${i + 1} (${panel.title}) has all required content`);
});

// 2. Question Bank Check
console.log('\n2. Question Bank (100 Questions across 10 Worlds):');
const bank = generateBank(12345);
assert(bank.length === 100, `Question bank generates exactly 100 questions (found ${bank.length})`);

const questionTexts = new Set();
const questionIds = new Set();

bank.forEach((q, idx) => {
  assert(!questionIds.has(q.id), `Question id ${q.id} is unique`);
  questionIds.add(q.id);

  assert(!questionTexts.has(q.questionText), `Question text is unique for slot ${q.id}: "${q.questionText.slice(0, 45)}..."`);
  questionTexts.add(q.questionText);

  assert(q.options && q.options.length === 4, `Question ${q.id} has exactly 4 options`);
  assert(new Set(q.options).size === 4, `Question ${q.id} options are all distinct`);
  assert(q.options.includes(q.correctAnswer), `Question ${q.id} correct answer "${q.correctAnswer}" is in options`);
  assert(q.explanation && q.explanation.length > 5, `Question ${q.id} has an explanation`);
  assert(q.hint1 && q.hint2, `Question ${q.id} has both hint1 and hint2`);
  assert(q.visual && q.visualData, `Question ${q.id} has visual (${q.visual}) and visualData`);
});

assert(WORLDS.length === 10, `There are exactly 10 worlds (found ${WORLDS.length})`);

// 3. Badges Reachability Check
console.log('\n3. Gamification Badges Reachability:');
const allBadgeKeys = Object.keys(BADGES);
assert(allBadgeKeys.length === 8, `There are exactly 8 badges defined (found ${allBadgeKeys.length})`);

// Test state driving through all triggers
let state = { ...INITIAL_STATE };

// Trigger 1: first_correct
state.totalCorrect = 1;
let unlocked = checkBadges(state).map(b => b.id);
assert(unlocked.includes('first_correct'), 'first_correct is reachable');

// Trigger 2: streak_5 & streak_10
state.streak = 5;
unlocked = checkBadges(state).map(b => b.id);
assert(unlocked.includes('streak_5'), 'streak_5 is reachable');

state.streak = 10;
unlocked = checkBadges(state).map(b => b.id);
assert(unlocked.includes('streak_10'), 'streak_10 is reachable');

// Trigger 3: sim_all (Sections A, B, and C completed)
state.simCompleted = [true, true, true];
unlocked = checkBadges(state).map(b => b.id);
assert(unlocked.includes('sim_all'), 'sim_all is reachable when sections A, B, and C are completed');

// Trigger 4: world_3star
state.worldResults[0] = 3;
unlocked = checkBadges(state).map(b => b.id);
assert(unlocked.includes('world_3star'), 'world_3star is reachable');

// Trigger 5: boss_won
state.bossesDefeated = 1;
unlocked = checkBadges(state).map(b => b.id);
assert(unlocked.includes('boss_won'), 'boss_won is reachable');

// Trigger 6: answered_20
state.totalAnswered = 20;
unlocked = checkBadges(state).map(b => b.id);
assert(unlocked.includes('answered_20'), 'answered_20 is reachable');

// Trigger 7: journey_complete
state.journeyComplete = true;
unlocked = checkBadges(state).map(b => b.id);
assert(unlocked.includes('journey_complete'), 'journey_complete is reachable');

// 4. Mathematics Verification
console.log('\n4. Mathematics Accuracy:');
// Cone r=6, h=8 => V=96pi, l=10
assert(solidMath.coneVpi(6, 8) === 96, 'Cone (r=6, h=8) volume = 96π cm³');
assert(solidMath.slantFrom(6, 8) === 10, 'Cone (r=6, h=8) slant height = 10 cm');
assert(solidMath.coneCurvedPi(6, 10) === 60, 'Cone (r=6, l=10) curved surface = 60π cm²');
assert(solidMath.coneTotalPi(6, 10) === 96, 'Cone (r=6, l=10) total surface = 96π cm²');

// Pyramid s=6, h=10 => V=120
assert(solidMath.pyramidV(36, 10) === 120, 'Pyramid (s=6, h=10) volume = 120 cm³');

// Sphere r=6 => V=288pi, A=144pi
assert(solidMath.sphereVpi(6) === 288, 'Sphere (r=6) volume = 288π cm³');
assert(solidMath.sphereAPi(6) === 144, 'Sphere (r=6) surface area = 144π cm²');

// Hemisphere r=6 => V=144pi, curved=72pi, total=108pi
assert(solidMath.hemiVpi(6) === 144, 'Hemisphere (r=6) volume = 144π cm³');
assert(solidMath.hemiCurvedPi(6) === 72, 'Hemisphere (r=6) curved surface = 72π cm²');
assert(solidMath.hemiTotalPi(6) === 108, 'Hemisphere (r=6) total surface area = 108π cm²');

console.log(`\n--- TEST RESULTS: ${passed} PASSED, ${failed} FAILED ---`);
if (failed > 0) {
  process.exit(1);
} else {
  console.log('ALL VERIFICATION CHECKS PASSED PERFECTLY!\n');
}

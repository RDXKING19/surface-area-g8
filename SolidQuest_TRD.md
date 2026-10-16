# SolidQuest — Grade 8 · Surface Area and Volume (TRD)

**Companion to:** `SolidQuest_PRD.md` · **Repo name:** `G8-SolidQuest-main`
**Clone source:** `angle-on-line-g7-main` (the shipped AngleQuest module, user-supplied; overrides the default `G2-Money-Money-main` per the TRD blueprint's "newer sibling as clone source" clause).
**Section order (per blueprint):** 1 Reference Analysis Notes → 2 Tech Stack → 3 Folder Structure → 4 State Management → 5 Component Specs → 6 Data Layer → 7 Simulate Station Specs → 8 Audio Pipeline → 9 Gamification → 10 Design Tokens & Viewport → 11 Build/Deploy → 12 QA Plan → 13 Delivery Checklist → 14 Risks.

---

## 1. Reference Analysis Notes

The reference was read file by file **from the shipped repository, not from its own `docs/AngleQuest_TRD.md`** — the shipped code diverges from that TRD in several places (§1.3). Rule applied throughout: **take UI/UX, layout, viewport and component-chrome patterns from the shipped build; where the shipped build contradicts a fixed rule in the PRD/TRD blueprints, the blueprint wins and the shipped behaviour is not cloned.**

### 1.1 Blueprint §1 gotcha check — results against the actual repo

| # | Gotcha | Finding in the shipped reference | Action |
|---|---|---|---|
| 1 | Dead duplicate `src/features/*` | **Not present.** `src/` holds `App.jsx, components, config, data, hooks, styles, utils` only. | Nothing to avoid. |
| 2 | Hardcoded story-panel count | **Already fixed.** `App.jsx:42` uses `STORY_PANELS.length - 1`; `StoryPhase.jsx` uses `STORY_PANELS.length` throughout. | Keep dynamic; SolidQuest has **7 panels**. Re-verify in review. |
| 3 | Static vs procedural bank | **Procedural**, seeded (`utils/rng.js` mulberry32), `generateBank(seed)` + `generateQuestion(world, slot, rng)`, `scripts/stress_test_bank.js` present. | Keep the pattern. **But see §1.2 #3 — sessions only ever use slots `0…N−1`.** |
| 4 | Viewport clipping | **Mostly fixed:** `hooks/useHeaderHeight.js` (ResizeObserver → `--header-h`), `main.app-main { padding-top: var(--header-h) }`, `100dvh` in `globals.css`, `zoom` removed. **Still present:** Tailwind `max-h-[92vh]` (StoryPhase), `max-h-[94vh]` (Simulate, Play, Reflect) and `w-screen h-screen` on the root `<div className="app-container w-screen h-screen">` (`App.jsx:211`) — `vh` utilities can win over the `dvh` rules and clip behind mobile browser chrome. | Fix per §10: remove those utilities, use one `.app-card` rule with `dvh` and `--header-h`. |
| 5 | Leftover branding | `index.html` and README are clean. **Still stale:** `docs/audio_generation_pipeline.md` titled "Place Value Tens and Ones" (ages 6–8); PlayPhase copy "10 MOE Geometry Districts"; `QuestionRenderer` fallback pill "Angle Investigation" and 📐; "Case File / Case Panel / Detective" wording throughout. | Rewrite per the rename table in §5.1. `grep -ri "angle\|detective\|amirah\|wei jie\|place value"` must return nothing at delivery. |

### 1.2 Defects found in the shipped reference that are **not** in the blueprint list (do not clone)

| # | Defect | Evidence | Action |
|---|---|---|---|
| 1 | **Error-Detective station is not wired.** `SimulatePhase.jsx` imports `RadiantPointLab` as Station D; `CaseFileDetective.jsx` exists but is imported nowhere. The shipped build therefore lacks the blueprint's Error-Detective archetype (its own TRD §7 says otherwise). | `SimulatePhase.jsx:8,37`; grep shows no import of `CaseFileDetective`. | SolidQuest wires the Error-Detective (`QuoteCheck`) as Station D. Orphan station files are not cloned. |
| 2 | **Four of eight badges can never unlock.** `PlayPhase` calls `checkBadges({ totalCorrect: (onUpdateScore.totalCorrect \|\| 0) + 1, … })` — `onUpdateScore` is a *function*, so those properties are always `undefined`; it also never passes `simCompleted`, `worldResults` or `bossesDefeated`. `checkBadges` is called nowhere else. Reachable today: `first_correct`, `streak_5`, `streak_10` (from args that happen to be right) and `journey_complete` (set directly in the reducer). Unreachable: `sim_all`, `world_3star`, `boss_won`, `answered_20`. | `PlayPhase.jsx:117-123`; `App.jsx:139-141`. | Evaluate `checkBadges(state)` **once, in `App.jsx`, against the full reducer state** (§4, §9); delete the payload path. QA asserts all 8 reachable (§12). |
| 3 | **Practice sessions use only the first N template slots.** `startWorldSession` does `for (i = 0; i < count; i++) generateQuestion(worldIdx, i, rng)`, so Guided (5) and Boss (5) only ever see slots 0–4, Timed (8) slots 0–7. Slots 5–9 — the hardest — never appear in Boss Battles. | `PlayPhase.jsx` `startWorldSession`. | Implement the slot plan in PRD §7.4 (§5, §6.5). |
| 4 | **Real-looking ElevenLabs key committed.** `.env.local.example` contains a populated `VITE_ELEVENLABS_API_KEY=sk_…` value rather than a placeholder. | `.env.local.example`. | Ship `VITE_ELEVENLABS_API_KEY=` (empty) only. Recommend rotating the exposed key. |
| 5 | **`.png` files are JPEG data; duplicate `.jpg` set.** All six `story_N.png` are JPEG-encoded (`file` reports JFIF) and each also ships as `story_N.jpg`. | `file public/assets/story/*`. | Placeholders must be genuine PNGs, one file per panel, no duplicates (§13). |
| 6 | **Dependencies installed but unused.** `framer-motion` and `lucide-react` are in `package.json` but imported nowhere; only `canvas-confetti` is used (Reflect). `oxlint` is absent although `.oxlintrc.json` ships, and there is no `lint` script. | grep of `src/`; `package.json`. | SolidQuest *uses* framer-motion (pour/join animations, §7) and omits lucide-react unless an icon is actually needed. Add oxlint + `lint` script. |
| 7 | **Stack older than the blueprint.** Shipped: React 18.3.1, Vite 5.4, framer-motion 11, `@vitejs/plugin-react` 4. Blueprint §2.1: React 19.2.7, Vite 8.1, framer-motion 12.42, plugin-react 6. | `package.json`. | Adopt blueprint versions. **Verified against the npm registry on 2026-10-10:** `vite` 8.3.4, `react` 19.3.0, `@vitejs/plugin-react` 6.1.2, `lucide-react` 1.54.0, `oxlint` 1.87.0, `tailwindcss` 3.4.19, `canvas-confetti` 1.9.4, and `framer-motion@^12.42.0` resolves (12.43.0 available) — every blueprint caret range resolves. (The registry's newest `framer-motion` is 14.0.0, which `^12.42.0` deliberately does not select.) |
| 8 | **Hook location differs from the blueprint skeleton.** Shipped: `src/hooks/useViewport.js`, `src/hooks/useHeaderHeight.js`. Blueprint: `src/core/hooks/useViewport.js`. | file tree. | Follow the shipped paths (`src/hooks/`); the user asked to use the zip for architecture. |
| 9 | **Reducer not unit-testable.** `appReducer` is not exported from `App.jsx`. | `App.jsx`. | Move to `src/state/appReducer.js` and export `appReducer`, `INITIAL_STATE` (§4). |
| 10 | **`speak()` only understands angle notation**, and `numberToWords` stops at 999. | `utils/narration.js:14-55`. | Rewritten for solids and extended (§8.2). |
| 11 | **`/api/elevenlabs` fallback has no implementation.** `utils/audio.js` posts to `/api/elevenlabs` when no client key is set, but the repo ships no serverless function, so dynamic narration silently fails in production. | `utils/audio.js` `fetchDynamic`; no `api/` directory. | Ship `api/elevenlabs.js` (§8.4). |
| 12 | **Blueprint fixed-action list omits `UPDATE_WORLD_RESULT`**, which the reference reducer needs. | `App.jsx:119`. | Keep it; documented in §4 as an addition. |

### 1.3 Reference patterns explicitly **adopted**
Glass-card / phase-band visual system and phase colour tokens; fluid `clamp()` type and spacing scale; `TopNav` capsule with numbered phase pills, mute pill, Home/Close with the progress-wipe confirmation, and the Story progress track inside the (measured) header; `FloatingSymbols` background (re-skinned with solid-geometry symbols); Story 2-column carousel (image left, text/quote/speech-bubble right, back/dots/next row); Simulate 2-column shell (station tabs left, activity panel right, gated CTA); the `Panel / Node / Msg / GoldBtn / GhostBtn` tone-kit and the `AngleSlider` pattern (generalised to `ValueSlider`); practice stats bar, `KingdomMap` world grid with lock/OPEN/stars; `BossBattleModal`, `BadgesModal`, `FeedbackOverlay`, `StarRating`, `Mascot`; `canvas-confetti` on completion; `say/ask/cheer/emphasize/think/instruct/celebrate` segment helpers; static-map → live-fetch → next-segment preload playback queue; seeded `rng.js`; `generate_audio.js` deriving phrases from `getAllNarration()`; `stress_test_bank.js` harness shape.

---

## 2. Tech Stack

```json
{
  "name": "solid-quest",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "dependencies": {
    "canvas-confetti": "^1.9.4",
    "framer-motion": "^12.42.0",
    "react": "^19.2.7",
    "react-dom": "^19.2.7"
  },
  "devDependencies": {
    "@types/react": "^19.2.17",
    "@types/react-dom": "^19.2.3",
    "@vitejs/plugin-react": "^6.0.2",
    "autoprefixer": "^10.5.2",
    "dotenv": "^17.4.2",
    "node-fetch": "^3.3.2",
    "oxlint": "^1.69.0",
    "postcss": "^8.5.16",
    "tailwindcss": "^3.4.4",
    "vite": "^8.1.0"
  },
  "scripts": {
    "dev": "vite", "build": "vite build", "preview": "vite preview",
    "generate-audio": "node scripts/generate_audio.js",
    "clean-audio": "node scripts/clean_audio.js",
    "generate-story-art": "node scripts/generate_story_art.js",
    "test:bank": "node scripts/stress_test_bank.js",
    "test:badges": "node scripts/test_badges.js",
    "lint": "oxlint"
  }
}
```
`lucide-react` is dropped (unused in the reference; add back only if an icon is genuinely required). `vite.config.js`: `base: '/'`, keep `server.port 3000`. `tailwind.config.js`: keep reference `fontFamily`/`fontSize`/phase colours, keep the ten world colours. `vercel.json`: keep the reference rewrite `{"source":"/((?!assets/|api/).*)","destination":"/"}` (already excludes `/assets/*` and `/api/*`). `.oxlintrc.json`: reuse.

---

## 3. Folder Structure

### 3.1 Target tree
```
G8-SolidQuest-main/
├── api/elevenlabs.js                        # NEW — serverless proxy (§8.4)
├── docs/ SolidQuest_PRD.md  SolidQuest_TRD.md  audio_generation_pipeline.md (rewritten)
├── public/ favicon.svg
│   └── assets/{audio/, story/}              # story_1.png … story_7.png (1024×1024, real PNG)
├── scripts/
│   ├── generate_audio.js                    # reuse; phrases = getAllNarration()
│   ├── clean_audio.js                       # reuse
│   ├── generate_story_art.js                # MODIFY: 7 placeholder panels → genuine PNG
│   ├── stress_test_bank.js                  # MODIFY: solids validators (§12)
│   └── test_badges.js                       # NEW: reducer-level reachability test of all 8 badges
├── src/
│   ├── state/appReducer.js                  # NEW (moved out of App.jsx; exported)
│   ├── components/
│   │   ├── TopNav.jsx                       # reuse; strings only
│   │   ├── IntroScreen.jsx                  # MODIFY: copy only
│   │   ├── shared/
│   │   │   ├── Mascot.jsx  FeedbackOverlay.jsx  FloatingSymbols.jsx   # reskin symbols
│   │   │   └── SolidVisual.jsx              # NEW — replaces AngleVisual.jsx
│   │   ├── gamification/ KingdomMap.jsx  StarRating.jsx  BadgesModal.jsx   # reuse
│   │   ├── quiz/ QuestionRenderer.jsx (MODIFY: import + strings)  BossBattleModal.jsx (reuse)
│   │   ├── phases/ WonderPhase  StoryPhase  SimulatePhase  PlayPhase  ReflectPhase
│   │   └── simulations/
│   │       ├── PourOverWorkshop.jsx         # Station A · Concept Discovery
│   │       ├── CapacityContractor.jsx       # Station B · Build-to-Target
│   │       ├── ComboBuilder.jsx             # Station C · Composite
│   │       ├── QuoteCheck.jsx               # Station D · Error-Detective
│   │       ├── kit.jsx                      # Panel / Node / Msg / GoldBtn / GhostBtn / ValueSlider
│   │       └── Stations.css
│   ├── config/ worlds.config.js  characters.config.js  audio.config.js(reuse)
│   ├── hooks/ useViewport.js  useHeaderHeight.js  useAudio.js            # reuse
│   ├── data/ storyContent.js  questionBank.js
│   ├── utils/ audio.js(reuse)  audioMap.js(auto)  narration.js  badgeEngine.js
│   │          scoring.js(reuse)  shuffle.js(reuse)  rng.js(reuse)  solidMath.js (NEW)
│   ├── styles/ design-tokens.css  globals.css
│   ├── App.jsx  main.jsx  index.css
├── index.html  package.json  vite.config.js  tailwind.config.js  postcss.config.js
├── vercel.json  .oxlintrc.json  .gitignore  .env.local.example  README.md
```
Do **not** create a `src/features/` tree. Do **not** clone `ProtractorWorkshop`, `MatchTheMissingAngle`, `IntersectionPuzzle`, `RadiantPointLab`, `CaseFileDetective`, `AngleVisual`, `angleMath`, the angle story art, or the `.jpg` duplicates.

### 3.2 Reference → target mapping
| Reference | Target |
|---|---|
| `shared/AngleVisual.jsx` | `shared/SolidVisual.jsx` (rewritten) |
| `utils/angleMath.js` | `utils/solidMath.js` (rewritten; keep `sum`, `makeDistractors` shape) |
| `simulations/kit.jsx` `AngleSlider` | `kit.jsx` `ValueSlider` (value, unit, min, max, step, label) |
| `simulations/CaseFileDetective.jsx` (card UI pattern only) | informs `QuoteCheck.jsx` |
| `appReducer` inside `App.jsx` | `state/appReducer.js` |
| `data/questionBank.js` (angle templates) | rewritten templates (§6.5), same exports |

---

## 4. State Management (`state/appReducer.js`, consumed by `App.jsx`)

`useReducer` with the blueprint's fixed action set verbatim — `SET_PHASE, NEXT_STORY_PANEL, PREV_STORY_PANEL, ADVANCE_SIM_STATION, PREV_SIM_STATION, COMPLETE_SIM_STATION, LOAD_QUESTIONS, ANSWER_CORRECT, ANSWER_INCORRECT, USE_HINT, CLEAR_FEEDBACK, PREV_QUESTION, NEXT_QUESTION, UNLOCK_BADGE, COMPLETE_PHASE, TOGGLE_AUDIO, RESET_SESSION` — plus the reference's one addition **`UPDATE_WORLD_RESULT`** (needed for per-world stars and boss wins; absent from the blueprint list, §1.2 #12).

Key state (unchanged from the reference): `phase, storyPanel, simStation, simCompleted[4], mode, worldIdx, questionIdx, questions, worldResults[10], xp, streak, bestStreak, lives, hintsUsed, attempts, badges[], totalCorrect, totalAnswered, bossesDefeated, audioEnabled, journeyComplete`.

Rules:
- **Panel end check:** `state.storyPanel >= STORY_PANELS.length - 1` (never a literal).
- **World/question maths** stays 10×10 (`Math.floor(nextQ / 10)`).
- **Streak** increments on `ANSWER_CORRECT`, resets on `ANSWER_INCORRECT`; `bestStreak = max(bestStreak, streak)` — independent of stars (already correct in the reference).
- **Badge evaluation (replaces the broken per-answer payload, §1.2 #2):**
```js
// App.jsx
useEffect(() => {
  checkBadges(state).forEach(b => dispatch({ type: 'UNLOCK_BADGE', payload: b.id }));
}, [state.totalCorrect, state.totalAnswered, state.streak, state.bestStreak,
    state.simCompleted, state.worldResults, state.bossesDefeated, state.journeyComplete]);
```
`UNLOCK_BADGE` is idempotent (already in the reference). A badge toast/modal reads `state.badges`; PlayPhase no longer calls `checkBadges` and `ANSWER_CORRECT` no longer carries `newBadges`.
- **World unlock:** world *n* unlocks when world *n−1* has ≥ 1★ (world 0 always open) — centralised in one exported function `isWorldUnlocked(worldResults, idx)` used by `KingdomMap` (the reference inlines it) so it is a one-line change if stakeholders decide otherwise (PRD §14f).
- **Home/Close** shows the existing confirmation modal whenever `hasProgress` (reference behaviour, kept).
- **Root element:** remove `w-screen h-screen` from `<div className="app-container …">` (§1.1 #4).

---

## 5. Component Specs

- **TopNav** — reuse unchanged apart from strings (`Case Panel x of y` → `Commission x of y`). Already measures itself with `useHeaderHeight`.
- **WonderPhase** — hook per PRD §7.1: `SolidVisual type="cone-vs-cylinder"` (matching radius/height labels, "? cones" badge), callout "Same width. Same height. How many cones fill the cup?", Foreman Tally speech bubble with the driving question. Button "Explore the Commissions →".
- **StoryPhase** — reference carousel unchanged, 7 panels. Image = `/assets/story/story_N.png` with the `imageBg`/`imageEmoji` fallback if it 404s (reference behaviour). Progress "Commission n of 7"; final button "Enter the Workshop".
- **SimulatePhase** — reference 2-column shell; `STATIONS` array of the four stations (§7); sidebar tabs freely clickable; station "Go to Practice" CTA gated on `simCompleted.every(Boolean)`; ✅/🔓 per tab; card uses `.app-card` (§10).
- **PlayPhase** — mode picker (4 modes) → `KingdomMap` → quiz. **Session composition (PRD §7.4):**
```js
const SLOT_PLAN = {
  guided:      () => [0, 1, 2, 3, 4],
  independent: () => [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
  timed:       rng => rng.shuffle([0,1,2,3,4,5,6,7,8,9]).slice(0, 8),
  boss:        () => [5, 6, 7, 8, 9],
};
const list = SLOT_PLAN[modeId](rng).map(slot => generateQuestion(worldIdx, slot, rng));
```
  Guided shows hint1 then hint2; Timed uses the 60 s countdown; Boss uses 3 lives with `BossBattleModal`. `PlayPhase` imports `DISTRICTS` from `data/questionBank.js` (name kept for compatibility).
- **QuestionRenderer** — question text, `SolidVisual` (`compact` in Play), 4 options, concept pill (concept name only, never the answer's reason), feedback overlay with `explanation`. Diagram container keeps the reference's `h-44 sm:h-52 md:h-56 max-h-[32vh]` sizing but as `max-h-[32dvh]`.
- **ReflectPhase** — (1) 3-question recap (§5.2), (2) scorecard (XP / ⭐ n/30 / best streak / badges), (3) reflection textarea (min 10 chars, reference behaviour), (4) confetti + `CelebrationScreen`.

### 5.1 Rename table (theme strings)
| Reference | SolidQuest |
|---|---|
| Case File / Case Panel / Case Clue | Commission |
| Detective Lab / Detective Simulation Lab | The Workshop / Solid Design Workshop — 4 Stations |
| Next Case Clue | Next Step |
| Enter Detective Lab | Enter the Workshop |
| Inspector Tally's Clue #n | Foreman Tally's Tip #n |
| Clue Solved! 🎯 / Not Quite! 🔍 | Spot On! 🎯 / Not Quite — Re-measure! 📏 |
| Out of Detective Lives! | Out of Hard Hats! |
| "10 MOE Geometry Districts" | "10 Studio Worlds · Need 1★ in World n to unlock World n+1" |
| fallback concept pill "📐 Angle Investigation" | "📐 Solid Design" |

### 5.2 Reflect recap (targets the vertical-vs-slant / one-third / hidden-face triad — the same misconceptions as Station D)
1. *"A cone has radius 6 cm, vertical height 8 cm and slant height 10 cm. Which length goes into the volume formula one third pi r squared h?"* → **The vertical height, 8 cm** / The slant height, 10 cm / The radius, 6 cm / The diameter, 12 cm.
2. *"A cone and a cylinder have the same radius and the same height. The cylinder holds 90 cm³. How much does the cone hold?"* → **30 cm³** / 45 cm³ / 60 cm³ / 270 cm³.
3. *"A cone sits on top of a cylinder with the same radius. Priya adds the circular face where they join into the total surface area of the whole solid. What is wrong?"* → **That face is hidden inside the solid, so it should not be counted** / She should have used the volume formula / She should have counted it twice / Nothing is wrong.

---

## 6. Data Layer

### 6.1 `config/worlds.config.js`
Ten entries, shape `{ id, name, emoji, accent, description, conceptFocus, boss: { name, emoji, reward } }`, populated verbatim from PRD §8. Export `WORLDS`.

### 6.2 `config/characters.config.js`
```js
export const CHARACTERS = {
  priya:   { name: 'Priya',   role: 'Studio Designer', emoji: '👧', colour: '#f472b6', mascotEmoji: '🦉',
             bio: 'Sketches every solid before she calculates anything.' },
  junhao:  { name: 'Jun Hao', role: 'Studio Builder',  emoji: '👦', colour: '#38bdf8', mascotEmoji: '🦉',
             bio: 'Loves measuring, pouring and testing formulae on real objects.' },
  tally:   { name: 'Foreman Tally', role: 'Studio Foreman & Mentor', emoji: '🦉', colour: '#facc15', mascotEmoji: '🦉',
             bio: 'The wise mentor with the hard hat and tape measure.' },
};
export const MASCOT = { name: 'Tally', title: 'Foreman Tally', emoji: '🦉', badge: 'The Solid Design Studio' };
```

### 6.3 `data/storyContent.js`
`STORY_PANELS` — **length 7**. Shape `{ panel, id, title, text, highlight, character, characterEmoji, image, imageBg, imageEmoji, bubble }` (reference shape; `image` and `bubble` retained). Content (on-screen symbols allowed; every string has a spoken equivalent produced by `speak()`, §8.2):

| # | Title · character | `text` | `highlight` | `bubble` | `imageEmoji` |
|---|---|---|---|---|---|
| 1 | The First Commission · Priya | "At The Solid Design Studio, Priya and Jun Hao win their first order: a dessert stall wants a waffle cone and a straight-sided cup, both the same width and the same height. The client asks two questions: how much does each one hold, and how much wrapper does it take to cover each one? Filling is volume. Covering is surface area." | "Volume is how much a solid fills. Surface area is how much it covers." | "Last year we learned a cylinder holds base area × height. Let's see what pointed solids do!" | 🍦 |
| 2 | The Pointy Third · Jun Hao | "Foreman Tally pours a pyramid full of sand into a box with the same base and the same height. It takes exactly three pours to fill the box! So a pyramid holds one third of the matching box: volume = ⅓ × base area × vertical height. A square pyramid with base edge 6 cm and height 10 cm holds ⅓ × 36 × 10 = 120 cm³." | "A pyramid is one third of the box that fits around it." | "Three pours, one box — the ⅓ is not magic, it is measured!" | 🔺 |
| 3 | Two Heights, One Triangle · Priya | "Be careful — a pyramid has two heights! The vertical height goes straight up from the centre of the base to the apex. The slant height runs up the sloping face. With half the base edge they make a right-angled triangle, so l² = h² + (half the edge)². For base edge 10 cm and vertical height 12 cm: l² = 12² + 5² = 169, so l = 13 cm. The surface area is the base plus four triangles: 100 + 4 × (½ × 10 × 13) = 360 cm²." | "Volume uses the vertical height. Surface area uses the slant height." | "Draw the hidden triangle every time and you'll never mix them up!" | 📐 |
| 4 | The Cone Factory · Jun Hao | "A cone is a pyramid with a round base, so its volume is also one third: V = ⅓πr²h. Its curved surface is πrl and its total surface adds the circle: πrl + πr². For a party hat with r = 3 cm and h = 4 cm, the slant height is l = 5 cm, so V = 12π cm³, the curved surface is 15π cm² and the total surface is 24π cm²." | "A cone: volume ⅓πr²h, curved surface πrl." | "Same two heights as the pyramid — vertical for volume, slant for the surface!" | 🎉 |
| 5 | The Perfect Ball · Priya | "A sphere of radius r has volume 4⁄3πr³ and surface area 4πr². Tally's pouring test shows a sphere holds two thirds of the cylinder that just fits around it. A model dome with r = 6 cm has volume 288π cm³ and surface area 144π cm². Cut it in half and you get a hemisphere: volume ⅔πr³, curved surface 2πr², and with its flat lid the total surface is 3πr²." | "Sphere: 4⁄3πr³ and 4πr². Hemisphere total surface: 3πr²." | "Half a ball gets a lid — don't forget the flat circle!" | 🏀 |
| 6 | Mix and Match · Jun Hao | "Real orders combine solids. For volume, add the parts, or subtract a hollow. For surface area, count only the faces you can see — where two solids join, the touching faces are hidden. A cone on a cylinder (r = 3 cm, cylinder height 10 cm, cone height 4 cm): volume = 90π + 12π = 102π cm³; surface area = 15π + 60π + 9π = 84π cm²." | "Add the volumes. Count only the faces you can see." | "The two circles where they join are inside the solid — leave them out!" | 🏰 |
| 7 | Studio Open for Business · Foreman Tally | "You now have the full toolkit: pointed solids take one third, spheres are four thirds, the two heights are not the same, and hidden faces do not count. Remember too: 1 litre = 1000 cm³ and 1 m³ = 1 000 000 cm³. What happens if you double every length? That is a mystery for another day. Hard hats on — enter the Workshop!" | "One third, two heights, hidden faces — you've got the toolkit!" | "Put on your hard hat and step into the Workshop!" | 🏆 |

All worked numbers above are recomputed in the QA fixture (`test:bank` includes a `story_facts` check). Panel 6's numbers match PRD sample World 7.

### 6.4 `utils/solidMath.js` — single source of maths truth
Pure functions used by the generator, the visual component **and** Stations A–D (the maths exists in exactly one place).

```js
export const PI_CALC = Math.PI;
export const PI_ALT  = 3.142;                       // acceptable alternative (PRD §3.3)
export const sum = a => a.reduce((s, x) => s + x, 0);

/* ---- curated Pythagorean tables: slant heights are ALWAYS whole numbers ---- */
export const CONE_TRIPLES = [          // [r, h, l]  (l² = r² + h²)
  [3,4,5],[4,3,5],[6,8,10],[8,6,10],[5,12,13],[12,5,13],[9,12,15],[12,9,15],
  [8,15,17],[15,8,17],[12,16,20],[16,12,20],[7,24,25],[24,7,25],[10,24,26],[15,20,25],[20,15,25]
];
export const SQ_PYRAMIDS = [           // base edge s, vertical height h, face slant l ; l² = h² + (s/2)²
  {s:6,h:4,l:5},{s:8,h:3,l:5},{s:10,h:12,l:13},{s:12,h:8,l:10},{s:16,h:6,l:10},{s:24,h:5,l:13},
  {s:16,h:15,l:17},{s:18,h:12,l:15},{s:24,h:9,l:15},{s:30,h:8,l:17},{s:24,h:16,l:20},{s:14,h:24,l:25}
];
// Rectangular bases: only heights belonging to TWO triples. Face on edge a uses half of b: lA = √(h²+(b/2)²).
export function buildRectPyramids(triples = ALL_TRIPLES /* a≤b≤40 */) { /* enumerate h with ≥2 distinct half-edges,
  return {a,b,h,lA,lB}; e.g. {10,18,12,lA:15,lB:13}, {12,30,8,lA:17,lB:10}, {14,20,24,lA:26,lB:25} */ }
export const TRI_BASE_PYRAMIDS = [     // right-triangle base legs p,q; V = p·q·h/6 must be an integer
  {p:6,q:8,h:9},{p:6,q:10,h:12},{p:9,q:12,h:10},{p:5,q:12,h:6},{p:8,q:15,h:9}
];
export const SPHERE_R_VOLUME = [3, 6, 9, 12];        // 3 | r  ⇒ integer coefficient of π
export const SPHERE_R_AREA   = [2,3,4,5,6,7,8,9,10,12];
export const HEMI_R          = [3, 6, 9, 12];        // ⅔πr³ integer ⇔ 3 | r ; areas fine for any r

/* ---- exact formulae (coefficients of π where applicable; return numbers, never floats of π) ---- */
export const pyramidV   = (baseArea, h) => baseArea * h / 3;
export const coneVpi    = (r, h) => r * r * h / 3;           // × π
export const coneCurvedPi = (r, l) => r * l;                 // × π
export const coneTotalPi  = (r, l) => r * l + r * r;         // × π
export const sphereVpi  = r => 4 * r ** 3 / 3;               // × π
export const sphereAPi  = r => 4 * r * r;                    // × π
export const hemiVpi    = r => 2 * r ** 3 / 3;               // × π
export const hemiCurvedPi = r => 2 * r * r;                  // × π
export const hemiTotalPi  = r => 3 * r * r;                  // × π
export const cylVpi     = (r, h) => r * r * h;               // × π
export const cylCurvedPi= (r, h) => 2 * r * h;               // × π
export const slantFrom  = (leg, h) => Math.sqrt(leg * leg + h * h);
export const isWhole    = x => Number.isInteger(x);

/* ---- units ---- */
export const CM3_PER_LITRE = 1000;  export const CM3_PER_M3 = 1_000_000;
export const cm3ToLitres = v => v / CM3_PER_LITRE;

/* ---- convention-robust 3 s.f. ---- */
export const sf3 = x => Number(x.toPrecision(3));
export const fmtSf3 = x => String(sf3(x));
export function robust3sf(coeffOfPi, scale = 1) {   // value = coeff·π·scale
  const a = fmtSf3(coeffOfPi * PI_CALC * scale), b = fmtSf3(coeffOfPi * PI_ALT * scale);
  return a === b ? a : null;                         // null ⇒ generator re-rolls
}

/* ---- composites: each part lists its faces; joins mark hidden faces; exposed faces are SUMMED, never listed by hand ---- */
export function buildComposite(kind, params) { /* returns { parts, joins, faces:[{id,label,formula,coeffPi,exposed}],
   volumePi, surfacePi }  — surfacePi = Σ exposed coeffPi ; volumePi = Σ ± part volumes */ }
export function validateComposite(c) { /* recompute volume & surface independently from c.parts; assert equal */ }

export const REASONS = { vertical:'vertical height', slant:'slant height', curved:'curved surface area', total:'total surface area' };

export function makeDistractors(correct, misconceptions = [], rng, count = 3, { minGapPct = 0 } = {}) {
  // dedupe; drop values equal to correct, non-finite, ≤ 0; enforce |d − correct| / correct ≥ minGapPct;
  // top up with correct ± k·step until `count`
}
export function guardCoincidence(q) { /* reject if any option's numeric coefficient equals correct under a different quantity */ }
```
**Hard rules** (from PRD §8): (1) slant heights only from the tables — no `Math.sqrt` result is ever displayed unless `Number.isInteger`; (2) every in-terms-of-π coefficient is a whole number (`isWhole` asserted); (3) decimal answers pass `robust3sf`; (4) `guardCoincidence` (sphere r = 3 and cone (6,8) are the standing offenders); (5) diameters even; (6) composites validated by `validateComposite`; (7) transfer/recast items built backwards from the integer answer.

### 6.5 `data/questionBank.js`
Exports (unchanged names): `generateQuestion(worldId, slot, rng)`, `generateBank(seed)` → 100 questions, `questionBank` (fresh seed per session), `DISTRICTS` (derived from `WORLDS` as `{ id, name, icon, boss }`). Schema (fixed): `{ id, districtId, category, visual, questionText, options[4], correctAnswer, explanation, hint1, hint2, visualData }`.

Each world's 10 slots are ordered easy → hard (the slot plan in §5 depends on it). Misconception distractors are modelled, never random. Every `questionText` is parameterised so each world's 10 stems are distinct.

| World | Slot plan (templates) | Misconception distractors |
|---|---|---|
| 0 Parts Plaza | 0–2 name the part from a description (apex, vertical vs slant height, base); 3–4 radius from diameter / diameter from radius; 5–6 choose the unit (length, area, volume); 7–9 "which quantity does the question need?" (cover → surface area, fill → volume, which height) | swapped heights; diameter for radius; cm² for cm³; surface area for volume |
| 1 Pyramid Point | 0–2 square base; 3–5 rectangular base; 6–7 triangular base (V = pqh/6); 8–9 base area given or edge given with height | forgot ⅓; ½ instead of ⅓; used an edge instead of the base area; added instead of multiplied |
| 2 Slant Summit | 0–2 cone slant height from r, h; 3–5 square-pyramid face slant from s, h; 6–7 find h from l and r (or s/2); 8–9 "which length goes in the volume / the surface formula" | r + h; r × h; forgot the √; swapped h and l; used s instead of s/2 |
| 3 Pyramid Panels | 0–3 square pyramid total area (slant given); 4–6 slant not given (find it first); 7–9 rectangular pyramid (two slant heights) | forgot the base; one triangle only; vertical height used; 4 triangles for a rectangular base |
| 4 Cone Cove | 0–3 V from r, h; 4–6 V from diameter and h; 7–9 V with h found from l (Pythagoras) | forgot ⅓; diameter as r; slant height as h; ⅔ |
| 5 Cone Canopy | 0–2 curved area (r, l given); 3–5 total area (r, l given); 6–9 total area with h given (find l) | vertical height in πrl; forgot πr²; 2πrl; used two circles |
| 6 Sphere Shore | 0–2 sphere V; 3–4 sphere area; 5–6 diameter given; 7–9 hemisphere (curved/total/V) | forgot the ⁴⁄₃ (4πr³); ⅓πr³; 4πr² for a hemisphere; curved-for-total; V for area |
| 7 Combo Corner | 0–2 cone-on-cylinder V; 3–4 cone-hemisphere (ice-cream) V; 5–6 cone-on-cylinder total area; 7 hemisphere-on-cylinder total area; 8 pyramid-on-cuboid V or area; 9 cylinder with conical hollow V (subtract) | counted hidden faces; added instead of subtracted; vertical height for slant; forgot ⅓ |
| 8 Capacity Quay | 0–1 cm³→litres/mL; 2–3 V to 3 s.f. (robust); 4–5 liquid transfer (cone→cylinder depth); 6–7 recast (n small solids); 8–9 unknown dimension from V | no conversion; ×1000 instead of ÷1000; forgot ⅓; ratio of radii instead of cubes; diameter as r |
| 9 Grand Gala | Slots 0–7: one hard-end template from each of worlds 0–7 (in order); slot 8: a World 8 transfer or recast item; slot 9: a World 8 unknown-dimension item. Eight distinct source worlds guaranteed; Boss (slots 5–9) draws worlds 5, 6, 7, 8, 8. | as source template |

Each question fills `explanation` (states the value **and** the formula and the height used, in words), `hint1` (names the formula / the height to use), `hint2` (shows the arithmetic with the numbers), `visualData` (§6.6). The generator is seeded (`rng.js`) so QA is reproducible; runtime seeds with `Date.now()`.

### 6.6 `shared/SolidVisual.jsx`
`<SolidVisual type data compact />`, pure SVG, `viewBox="0 0 440 300"` (reference AngleVisual used 440×270 / compact 360×210), colours from CSS variables only, pseudo-3D by ellipse caps and straight edges (no WebGL). Dimension labels are **text** (`r = 6 cm`, `h = 8 cm`, `l = 10 cm`); vertical height is **dashed with a right-angle mark**, slant height **solid with arrowheads**, hidden joined faces **hatched** — never colour alone. `compact` reduces stroke/label size for the Play inline context and the Wonder callout.

| `type` | `data` | Renders |
|---|---|---|
| `cone` | `{ r, h, l?, showL, showH, unknown? }` | cone with dashed vertical height, optional slant line |
| `pyramid` | `{ base:'square'\|'rect'\|'tri', s?, a?, b?, p?, q?, h, l?, lA?, lB?, show }` | pyramid with base outline, vertical height, slant height |
| `sphere` / `hemisphere` | `{ r, d?, showFlat }` | sphere with radius line (or diameter), hemisphere with flat lid shaded/hatched |
| `composite` | `{ kind, parts, joins, labels }` for `cone-on-cyl`, `hemi-on-cyl`, `cone-hemi`, `pyr-on-cuboid`, `cyl-cone-hollow` | assembled solid; join faces hatched; optional exploded view for Station C |
| `cone-vs-cylinder` | `{ r, h, cones? }` | Wonder hook — two matching solids |
| `container-fill` | `{ shape, level }` | liquid level (cone, cylinder, hemisphere bowl) for transfer questions |
| `recast` | `{ big, small, n }` | one large solid → n small solids |
| `vocab` | `{ solid, highlight }` | labelled parts for World 0 |

`angleToPoint`-style helpers become `ellipsePoint(cx, cy, rx, ry, t)`; shared by the stations.

---

## 7. Simulate Station Specs

Contract (all four): `<Station onComplete={fn} audioEnabled={bool} />`; self-contained state; SVG visuals styled with CSS variables; a `station-success` panel with a **"Complete Station ✓"** button calling `onComplete`; every slider paired with keyboard-operable −/+ buttons (and `←/→` on the focused slider; `Shift` = ±5 units). Pointer maths for any SVG drag handle uses `getScreenCTM().inverse()`. Animations (pour level, join fade, shake) use `framer-motion` and respect `prefers-reduced-motion` (animation off, state changes instant). Station tabs and the footer CTA are the reference's.

**A · `PourOverWorkshop` (Concept Discovery).** Three experiment tabs — *Pyramid → box*, *Cone → cylinder*, *Sphere ← cones* — sharing one SVG stage. Sliders (`ValueSlider`): `r` or `s` ∈ [2, 10], `h` ∈ [2, 12] (sphere: `r` only; container cylinder height fixed at `2r`; the "cone-full" has radius `r` and height `2r`). **Pour** moves liquid with a `clipPath` rectangle animated by framer-motion: pyramid/cone → container level rises by ⅓ per pour (3 pours fill it); sphere ← cone-fulls: two pours fill the sphere. Live readout (`container = π × 6² × 8 = 288π` / `solid = ⅓ of that = 96π`) computed from `solidMath`. State: `done{pyr,cone,sphere}`, `sizeBuckets:Set` (sizes bucketed to a 3×3 grid of r,h), `confirmed`. **Gate:** all three experiments run to completion **and** the pyramid-or-cone ratio shown at ≥ 2 distinct size buckets **and** the confirmation MCQ answered correctly ("Why is a cone's volume ⅓πr²h?" → "Three cones fill the cylinder with the same radius and height"). Wrong → `Msg` + retry, no penalty.

**B · `CapacityContractor` (Build-to-Target).** `genBrief(rng, kind)` returns `{ kind, fixed:{r|s}, varName:'h'|'r', min, max, step:1, target:{ qty:'V'|'A', coeffPi, unit }, solution }`, built backwards from the chosen solution so the target is always an integer multiple of π (or an integer for pyramids). Kinds rotate: cone V (adjust h, r fixed), pyramid V (adjust h, s fixed), sphere V or A (adjust r from `SPHERE_R_VOLUME` / `SPHERE_R_AREA`). Live: the solid resizes (`SolidVisual`), a fill-level meter rises, a readout shows `⅓ × π × 6² × h = 12πh` with the current coefficient vs the target; ring **amber within ±10 %**, **green on exact**; **Check** accepts exact only (tolerance is visual guidance). **Gate:** 3 successful rounds, each a different kind, each after a "New brief" press. Coincidence guard applies to briefs too.

**C · `ComboBuilder` (Multi-Step / Composite).** Parts tray (tap or keyboard-select a part → it docks into the assembly SVG). Three fixed rounds, each generated from `buildComposite`:
 1. **Cone on cylinder — volume (add).** Ladder: pick each part's formula (3 options each) → the part values appear (`90π`, `12π`) → choose *add* or *subtract* → total (`102π`) is computed live. 
 2. **Hemisphere on cylinder — total surface area (exposed faces).** The student presses **Join**; the two touching faces fade, hatch and lock (disabled chips). The face list is a set of labelled chips (`Dome curved surface · 2πr²`, `Cylinder curved surface · 2πrh`, `Cylinder base · πr²`, `Dome flat face`, `Cylinder top face`); toggling a chip adds/removes its value from a live running total. Pressing a hidden chip shakes and shows "That face is inside the solid." **Check** requires exactly the exposed set.
 3. **Cylinder with a conical hollow — volume (subtract).** Same ladder as round 1 with *subtract* as the correct operator.
**Gate:** all three rounds correct. Face value tables come from `buildComposite` — hidden faces are derived from `joins`, never hand-listed.

**D · `QuoteCheck` (Error-Detective).** A four-line quotation card `{ given, formula, substitution, answer }` with exactly one seeded error chosen from a table keyed by type; each entry is a pure function over `solidMath` that returns `{ lines, faultyIdx, fixes:[3 options], correctFixIdx }`:

| `errorType` | Seeded slip | Faulty line |
|---|---|---|
| `height-for-slant` | `πrl` computed with the vertical height (e.g. π·6·8 = 48π, true l = 10) | substitution |
| `forgot-third` | cone/pyramid volume without ⅓ | formula |
| `diameter-as-radius` | diameter substituted for r | substitution |
| `hidden-face` | joined face counted in a composite's total surface area | formula/answer |
| `hemisphere-area` | hemisphere curved area given as 4πr² (or lid forgotten for the total) | formula |
| `unit-slip` | cm³ reported as litres without ÷ 1000 | answer |

The student taps the faulty line, then picks the correct replacement. **Gate:** 3 cases, each a different `errorType`; case order seeded per session. Tests (§12) assert the quoted line is provably wrong and the correct fix provably right.

`SimulatePhase` wires the four in `STATIONS` and gates the phase CTA on `simCompleted.every(Boolean)`; `COMPLETE_SIM_STATION` dispatches the reducer action.

---

## 8. Audio Pipeline

### 8.1 Mechanics (reused as shipped — already has no browser fallback)
`utils/audio.js` is reused unchanged: `VOICE_ID = 'Xb7hH8MSUJpSbSDYk0k2'`, `MODEL_ID = 'eleven_multilingual_v2'`, style presets from `config/audio.config.js` (`celebration, encouragement, question, emphasis, thinking, statement, instruction`), `getAudioUrl` (static map → dynamic fetch, cached), `narrate` queue with next-segment preload, `setMuted`, `stopNarration`, `playClickSound`. Verified: no `speechSynthesis` reference exists in `src/` or `scripts/`; a QA `grep` keeps it that way (including `dist/`).

### 8.2 `utils/narration.js`
Function bodies rewritten; exported names unchanged: `wonderNarration`, `storyNarration(panelIdx)`, `simStationIntro(stationIdx)`, `playQuestionNarration(q)`, `playCorrectNarration`, `playWrongNarration`, `playHint1Narration`, `playHint2Narration`, `districtCompleteNarration`, `bossStartNarration`, `bossWinNarration`, `reflectNarration`, `reflectCompleteNarration`, `getAllNarration()`, plus `numberToWords` and `speak`.

**`numberToWords` extended** (the reference stops at 999): to 999 999 999, and decimals digit-by-digit ("3.62" → "three point six two"); "1 000 000" → "one million"; 3620 → "three thousand, six hundred and twenty".

**`speak(text)` rewritten for solids** — the single transform used by narration *and* the `audioMap` key (so on-screen and spoken text cannot drift):

| On screen | Spoken |
|---|---|
| `96π cm³` | "ninety-six pi cubic centimetres" |
| `cm²`, `cm³`, `m³`, `mL`, `L` | "square centimetres", "cubic centimetres", "cubic metres", "millilitres", "litres" |
| `r²`, `r³`, `l²`, `h²` | "r squared", "r cubed", "l squared", "h squared" |
| `⅓`, `⅔`, `½`, `4⁄3` | "one third", "two thirds", "one half", "four thirds" |
| `⅓πr²h` | "one third pi r squared h" |
| `πrl`, `πr² + πrl` | "pi r l", "pi r squared plus pi r l" |
| `=`, `+`, `−`, `×`, `÷` | "equals", "plus", "minus", "times", "divided by" |
| `3 s.f.` | "three significant figures" |
| `C.S.A.`, `T.S.A.`, `slant ht.` | never appear on screen; if one ever does, rewritten to "curved surface area", "total surface area", "slant height" |
Titles and button labels are not narrated (reference rule). Pre-generated: Wonder, all 7 story panels, station intros, practice feedback lines, reflect lines. **Dynamic (live path):** procedurally generated question stems/explanations/hints.

### 8.3 Generation
`generate_audio.js` unchanged (`phrases = getAllNarration()`, rate-limited, skips existing unless `--force`, rewrites `audioMap.js`). After content lock run `npm run generate-audio` then `npm run clean-audio` (deletes orphaned angle-module clips). Rewrite `docs/audio_generation_pipeline.md` for SolidQuest/Grade 8 (remove "Place Value" and "6–8 year old" wording).

### 8.4 Key handling
`.env.local.example` ships `VITE_ELEVENLABS_API_KEY=` **empty** (§1.2 #4). For production, leave the client key unset: `utils/audio.js` already falls back to `POST /api/elevenlabs`; ship `api/elevenlabs.js`, a Vercel serverless function that reads `ELEVENLABS_API_KEY` from server env, forwards `{ text, voiceId, modelId, voice_settings }` to ElevenLabs, streams back `audio/mpeg`, rejects bodies > 1 000 characters, and restricts `voiceId` to the Alice id (§1.2 #11).

---

## 9. Gamification

- `utils/scoring.js` reused verbatim from the reference: `calcStars` (9–10 → 3, 7–8 → 2, 5–6 → 1, else 0) and `calcXP` (base 10, −3 per extra attempt, −2 per hint, floor 2, +2 per streak step above 2 capped at +10). The blueprint's G2 `scoring.js` is not available in the supplied inputs; the reference's formula matches the blueprint's description, so no placeholder is needed.
- `utils/badgeEngine.js`: `checkBadges(state)` logic **unchanged and correct**; only the `BADGES` strings change (PRD §9). Trigger keys: `first_correct, streak_5, streak_10, sim_all, world_3star, boss_won, answered_20, journey_complete`. It is now evaluated in `App.jsx` against full state (§4) — this is what makes all eight reachable.
- Boss Battle: 5 questions (slots 5–9), 3 lives, per world; on win award the world reward badge name from `WORLDS[i].boss.reward` (display) in addition to the `boss_won` trigger.
- Reflect scorecard uses `Stars n / 30`.

---

## 10. Design Tokens & Viewport

`styles/design-tokens.css` — keep the reference's `:root` tokens unchanged (cosmic background, glass tokens, phase colours, ten `--world-N` accents, fluid `--space-*` / `--fs-*` clamps, `--header-h`). Replace the angle tokens with solid tokens:
```css
:root {
  /* the ten --world-0 … --world-9 values are kept as shipped (PRD §8 accents match them) */
  --solid-fill:#38bdf8; --solid-edge:#e2e8f0; --solid-hidden:#94a3b8;
  --vheight-line:#facc15;   /* dashed + right-angle mark */
  --slant-line:#fb923c;     /* solid + arrowheads */
  --liquid:#22d3ee; --solid-ok:#4ade80; --solid-bad:#f43f5e;
}
```
**Viewport rules (apply all; the reference fixed only part of this — §1.1 #4):**
```css
html, body, #root { height: 100%; margin: 0; }
body, .app-container { height: 100vh; height: 100dvh; max-height: 100dvh; overflow: hidden; } /* 100vh = fallback only */
main.app-main { padding-top: var(--header-h); }
.app-card { max-height: calc(100dvh - var(--header-h) - 16px); }   /* replaces max-h-[92vh] / [94vh] utilities */
```
- Apply `.app-card` to the Story, Simulate, Play and Reflect cards; **delete** the Tailwind `max-h-[92vh]`/`max-h-[94vh]` classes and the root `w-screen h-screen` classes. Keep the existing `.sim-card, .reflect-card` rule only if it is not duplicated.
- `--header-h` stays measured by `useHeaderHeight` (ResizeObserver) — the Story progress row already lives inside the measured header. `IntroScreen` has no header and `app-main` padding applies only when `phase !== 'intro'` (already so), so no extra reset is needed.
- Short-viewport handling: keep the reference's `@media (max-height: 800px)` compaction (padding/font token reductions only; **no `zoom`**). Inner `overflow-y-auto` containers inside every card so nothing is ever unreachable.
- Keep `viewport-fit=cover` in the viewport meta tag.

**Layout by viewport** (reference layouts retained):

| Viewport | Story | Simulate | Play / Reflect |
|---|---|---|---|
| 1920×1080, 1440×900, 1366×768 | 2-col card (image left, text right) | 2-col: 4/12 tabs + 8/12 workspace | centred `max-w-6xl` card; options grid 2-col |
| 1024×768 (tablet landscape) | 2-col | 2-col | options 2-col; diagram `max-h-[32dvh]` |
| 768×1024 (tablet portrait) | md breakpoint = 2-col; image `h-[380px]` shrinks via `max-h` | 2-col at ≥768 | options 2-col |
| 390×844 (phone) | 1-col stacked; image `h-64`; text scrolls inside card | 1-col: station tabs become a horizontal scroll row above the workspace; workspace scrolls; −/+ buttons ≥ 44 px | options 1-col; diagram `h-44` |
Solid SVGs scale with `w-full h-full` and `preserveAspectRatio="xMidYMid meet"`; no fixed pixel widths.

---

## 11. Build / Deploy

`npm install && npm run build` from a clean extract; deploy on Vercel (SPA rewrite already excludes `/assets/` and `/api/`; add `api/elevenlabs.js`). `index.html`: title **"SolidQuest · Grade 8 Maths"**, description/OG text for The Solid Design Studio (surface area and volume of pyramids, cones and spheres; no angle/detective/"Zara" wording), favicon present (`public/favicon.svg` — new), fonts as in the reference (Fredoka One, Nunito, Inter). README: run/build/audio/test commands, module summary, 7-panel art brief (§13), no mention of browser speech.

---

## 12. QA Plan

1. **Bank stress test** — `scripts/stress_test_bank.js`: ≥ 300 seeds × 100 questions (30 000). Per question assert: schema complete; no `NaN`/`undefined`/empty strings; exactly 4 distinct options; `correctAnswer ∈ options`; **independent recomputation** of the answer from `visualData` using formulas written separately in the test file (not imported from `solidMath`); every slant height is whole and satisfies `l² = r² + h²` (or `h² + (edge/2)²`); every in-terms-of-π coefficient is whole; `robust3sf` holds for every decimal answer (π = calculator and π = 3.142 give the identical 3-s.f. string); decimal distractors distinct at 3 s.f. and ≥ 2 % apart; `guardCoincidence` clean; every composite passes `validateComposite` and its stated answer equals the independent recomputation (hidden faces excluded); per world ≥ 7 distinct `questionText`s (reference threshold) — target 10/10; world 9 draws from ≥ 5 source worlds. Additionally: **session-composition assertions** (Guided only slots 0–4, Boss only slots 5–9, Timed 8 distinct slots, Independent 10) and a `story_facts` check that every worked number in §6.3 is correct.
2. **Station tests** — unit-test Station D's error generator (each `errorType`: the quoted line is provably wrong, the correct fix provably right, exactly one option correct) and Station B's brief generator (target reachable, solution within slider range, coincidence guard) and Station C's `buildComposite` face lists (exposed set sums to the stated area).
3. **Badge reachability** — `scripts/test_badges.js` drives the exported `appReducer` + `checkBadges` through scripted play (a correct streak of 10; all four stations; a 3-star world; a won boss; 20 answers; journey completion) and asserts all **eight** badges unlock exactly once (§1.2 #2).
4. **Audio parity** — every string passed to a narration helper has an exact `audioMap` match or is flagged intentionally dynamic; `speak()` golden-file tests for the table in §8.2 (including `numberToWords(3620)`, `1 000 000`, `3.62`); `grep -rn speechSynthesis src dist` returns nothing.
5. **Journey walkthrough** — Wonder → Story (7 panels; nav progress 1/7 … 7/7; last button "Enter the Workshop") → Simulate (all 4 stations completable, CTA gated, tabs free) → Practice (map, all 4 modes, Boss winnable, all 8 badges unlock, streak independent of stars) → Reflect (recap, scorecard, confetti); zero console/page errors.
6. **Viewport/regression** — at 1366×768, 1440×900, 1920×1080, 1024×768, 768×1024 and 390×844 (also with browser-chrome collapse on iOS/Android): Story (with progress row) and every station fully visible below the header; no content under the nav; sliders' −/+ buttons reachable; pointer drag hits correctly (Station A/B sliders; Station C chips).
7. **Production build** — clean-clone `npm install && npm run build`; `npm run lint`.
8. **Accessibility** — enlarged fonts/targets in Simulate/Play; every dimension text-labelled; vertical vs slant distinguishable without colour; each slider has −/+ and arrow-key control; focus rings visible; `aria-label`s on SVG handles and face chips; `prefers-reduced-motion` honoured.

---

## 13. Delivery Checklist

- [ ] Zip excludes `node_modules/` and `dist/`.
- [ ] `public/assets/story/story_1.png … story_7.png` present as **genuine 1024×1024 PNG** placeholders (verify with `file`); no `.jpg` duplicates; README contains a per-panel art brief (scene, Priya / Jun Hao / Foreman Tally, mood — e.g. Panel 3: a pyramid-roofed pavilion, Priya sketching the hidden right-angled triangle, Jun Hao measuring the sloping face, Tally pointing at the dashed vertical line; bright daylight, instructional).
- [ ] `README.md`, `index.html`, OG tags rewritten; `grep -rni "angle\|detective\|amirah\|wei jie\|place value\|zara\|robo\|working backwards"` over `src/ docs/ README.md index.html` returns nothing (Pythagoras-related uses of "right angle" are allowed and whitelisted explicitly in the grep).
- [ ] `.env.local.example` has an **empty** `VITE_ELEVENLABS_API_KEY=`; `.env.local` in `.gitignore`; no real key anywhere (`grep -rn "sk_"`).
- [ ] `vercel.json`, `.oxlintrc.json`, `favicon.svg`, `api/elevenlabs.js` present; `lint` script works.
- [ ] `audioMap.js` regenerated after content lock; `clean-audio` run.
- [ ] Stress-test and badge-test pass logs attached.

---

## 14. Risks

| # | Risk | Mitigation |
|---|---|---|
| R1 | Moving from the shipped React 18 / Vite 5 / framer-motion 11 stack to the blueprint's React 19 / Vite 8 / framer-motion 12 could surface incompatibilities (the shipped repo was only tested on the older set). Registry check on 2026-10-10 confirms every blueprint range resolves. | Install and build on day one; if a conflict appears, pin the reference's tested versions and log it. |
| R2 | A key that appears real is committed in the reference's `.env.local.example`. | Do not clone; empty placeholder; **rotate the exposed key**. |
| R3 | ElevenLabs key exposed in the client bundle if `VITE_ELEVENLABS_API_KEY` is set in production. | Serverless proxy (`api/elevenlabs.js`); unset client key. |
| R4 | SVG drag maths breaks under CSS scaling/flex layouts. | `getScreenCTM` conversion tested at all six viewports; keyboard −/+ is the accessible fallback. |
| R5 | Geometrically inconsistent generated solids (non-integer slant heights, composites that double-count hidden faces). | Tables of Pythagorean triples; faces derived from `joins`; independent recomputation in the stress test. |
| R6 | Decimal answers differing between π = calculator and π = 3.142. | `robust3sf` re-roll rule + test (PRD §8 rule 3). |
| R7 | Spoken/on-screen drift because many symbols (π, ⅓, ², ³, units) are spelled out. | Single `speak()` transform shared by narration and the audio-map key; golden tests; parity check (QA 4). |
| R8 | Silent loss of four badges (shipped behaviour). | Centralised evaluation + `test_badges.js` (QA 3). |
| R9 | Boss Battle too easy / Guided too hard if the slot ordering is not truly easy → hard. | Per-world slot plan reviewed with a teacher; difficulty spot-check on 20 generated questions per world. |
| R10 | World-unlock rule (≥ 1★ on the previous world) inherited from the reference and not in the blueprint. | Isolated in `isWorldUnlocked`; confirm with stakeholders (PRD §14f). |
| R11 | Pupils who have not yet covered Pythagoras struggle in World 2. | Hint2 shows the hidden triangle; PRD §14b to confirm sequencing with the sibling module. |
| R12 | Station C's face-selection interaction is hard on a 390 px phone. | Chip list is the primary control (SVG regions are secondary); chips ≥ 44 px; usability pass at 390×844. |

# SolidQuest — Grade 8 · Surface Area and Volume of Pyramids, Cones and Spheres (PRD)

**Grade:** 8 (Singapore Sec 2) &nbsp;|&nbsp; **Topic:** Surface Area and Volume (pyramids, cones, spheres, composite solids) &nbsp;|&nbsp; **Module name:** SolidQuest
**Clone source used for this build:** `angle-on-line-g7-main` (the shipped AngleQuest module, user-supplied, superseding the default `G2-Money-Money-main` reference — see the paired TRD's Reference Analysis Notes for the full diff against the documented product standard and the defects found in the shipped repo).
**Special instructions given:** none — all defaults in the blueprint apply.

---

## 1. Overview

SolidQuest is a Grade 8 module teaching the "volume and surface area of solids" strand of the Singapore MOE Secondary 2 syllabus: pyramids, cones, spheres (and hemispheres), and composite solids built from them. Two members of a school design club, **Priya** and **Jun Hao**, run **The Solid Design Studio** — mentored by **Tally the Owl** (styled here as hard-hatted "Foreman Tally" with a tape measure) — and every "commission" is really a covering-or-filling problem hidden in an everyday object: a gelato cone, a glass skylight, a party hat, a water tank, a bowl, a silo. The five-phase Wonder → Story → Simulate → Practice → Reflect journey, XP/Stars/Streak/Badge gamification, the 100-question procedurally-generated bank across 10 worlds, and ElevenLabs-only narration are inherited unchanged from the Intellia Global product architecture (PRD blueprint §A).

The module's pedagogical spine is a single idea that pays off three times: **a pointed solid holds one third of its matching prism or cylinder** (pyramid, cone), **a sphere holds two thirds of the cylinder that just fits around it**, and **volume uses the perpendicular height while surface area uses the slant height.** The two most common mistakes at this level — mixing up the two heights, and counting faces that are hidden inside a composite solid — are designed into the Simulate phase, the question-bank distractors and the Reflect recap.

## 2. Background

This module follows the same "Grade + Topic in, build-ready PRD/TRD pair out" process used for prior modules (MoneyQuest … RatioCraft, and the Grade 7 AngleQuest). It sits beside two sibling Grade 8 modules: *Area and Perimeter* (2-D measurement, a natural prerequisite) and *Finding Unknown Sides* (Pythagoras, a hard prerequisite — slant heights are found with it). Solids are a strong fit for the Simulate archetypes: "pour it and watch the fraction appear", "size it to hit a target capacity", "assemble a composite and decide which faces count", and "spot the broken quotation" all map onto live SVG solids with sliders.

## 3. Standards Alignment

Singapore MOE Lower Secondary Mathematics, Measurement strand. In the 2020-onward syllabus the sequence is split across two years: **Secondary 1** covers volume and surface area of cubes, cuboids, **prisms and cylinders** and composite solids built from them; **Secondary 2** covers volume and surface area of **pyramids, cones and spheres** and then **composite solids** (e.g. a school Sec 2 content outline lists the chapter as 11.1 Pyramids, 11.2 Cones, 11.3 Spheres, 11.4 Composite solids, taught after Pythagoras' theorem). Pupils are expected to use the standard formulae, find slant heights with Pythagoras' theorem, handle unit conversion for solids, and give answers either in terms of π or to a stated/default degree of accuracy.

### 3.1 Precise skills in scope
- Name the parts of a pyramid, cone and sphere (base, apex, vertical height, slant height, radius, diameter) and state the correct unit for a length, an area and a volume.
- Volume of a right pyramid: ⅓ × base area × vertical height (square, rectangular and right-triangular bases).
- Find a slant height with Pythagoras' theorem (cone: l² = r² + h²; square/rectangular pyramid: l² = h² + (half of the relevant base edge)²).
- Total surface area of a right pyramid: base area + the areas of the triangular faces (each ½ × base edge × slant height).
- Volume of a cone: ⅓πr²h; curved surface area πrl; total surface area πr² + πrl.
- Volume and surface area of a sphere (4⁄3πr³, 4πr²) and a hemisphere (⅔πr³; curved 2πr²; total 3πr²).
- Choose the right quantity: volume vs surface area, vertical height vs slant height, curved vs total surface area.
- Volume and surface area of composite solids (adding, subtracting; counting only exposed surfaces).
- Apply the above to real-world problems, including unit conversion (cm³ ↔ mL ↔ litres, m³ ↔ cm³), liquid transferred between containers, recasting (melting) one solid into others, and finding an unknown dimension from a given volume.

### 3.2 Adjacent/prerequisite skills scoped out (bridge only, not tested)
- **Prisms, cylinders, cuboids (Grade 7):** appear only as the *comparison solid* in the story ("the matching cylinder") and in Simulate Station A. There is no standalone prism/cylinder question set; a cylinder's volume πr²h and curved surface 2πrh are given inside composite-solid questions as inputs, never as the tested skill.
- **Similar solids / scale-factor of volume (next-level topic):** a one-line teaser in the closing Story panel ("what if you doubled every length?") — never assessed.
- **Frustums, nets drawing, oblique pyramids/cones, surds in slant heights, and arc/sector-based cones** are out of scope.

### 3.3 Domain conventions students are expected to know
- Lengths in cm (occasionally m); areas in cm² / m²; volumes in cm³ / m³; capacity in mL / litres with **1 cm³ = 1 mL, 1 litre = 1000 cm³, 1 m³ = 1 000 000 cm³.**
- **Answer formats (explicit per world, see §8):** (i) *in terms of π* — used for most Worlds 4–7 so answers are exact and clean; (ii) *correct to 3 significant figures* — used for real-world Worlds 8–9 where the question says so, with π taken from the calculator (the module treats π = 3.142 as an acceptable alternative: every decimal answer is generated so both give the identical 3-s.f. result, see §8 hard rules).
- The textbook shorthand "C.S.A.", "T.S.A.", "slant ht." is never used on screen or in narration; the full phrases "curved surface area", "total surface area", "slant height" are used instead (see §10).
- **Assumption to confirm with stakeholders:** the π convention and the 3-s.f. default above (§14a), and that pupils have already met Pythagoras' theorem (§14b).

## 4. Learning Objectives

By the end of this module, a student should be able to:
1. Name the parts of pyramids, cones and spheres, tell the vertical height from the slant height, and match a length, an area and a volume to cm, cm² and cm³.
2. Calculate the volume of a right pyramid using ⅓ × base area × height.
3. Find a slant height with Pythagoras' theorem and use it to calculate the total surface area of a right pyramid.
4. Calculate the volume of a cone, and find its curved and total surface area (finding the slant height first when it is not given).
5. Calculate the volume and surface area of a sphere and a hemisphere, including when the diameter is given.
6. Decide which formula, which height and which surface (curved or total) a question needs, and justify the choice.
7. Calculate the volume and total surface area of composite solids — adding or subtracting volumes, and counting only the exposed surfaces.
8. Solve real-world problems involving capacity and unit conversion, liquid transfer, recasting and finding an unknown dimension from a given volume.

This ordering (recall → single-step → comparison/reasoning → composite/multi-step → real-world) drives both the Story panel sequence (§7.2) and the world sequencing (§8).

## 5. Inherited Standards (copied from PRD blueprint §A — not re-derived)

- **Five-phase architecture:** Wonder → Story → Simulate → Play ("Practice" in-UI) → Reflect.
- **Gamification:** XP per question (attempts/hints/streak-weighted); Stars 0–3 per world (9–10 correct = 3★, 7–8 = 2★, 5–6 = 1★, below = 0★); continuous streak tracking; 8 fixed badge triggers (relabelled, §9); Boss Battles (5 questions, 3 lives, one per world, 10 total).
- **Practice modes** (unchanged mechanics):

| Mode | Questions | Hints | Timed | Lives |
|---|---|---|---|---|
| Guided Practice | 5 | Yes | No | No |
| Independent Practice | 10 | No | No | No |
| Timed Challenge | 8 | No | Yes (60s) | No |
| Boss Battle | 5 | No | No | Yes (3) |

- **Audio:** ElevenLabs "Alice" (`Xb7hH8MSUJpSbSDYk0k2`), `eleven_multilingual_v2`, 6 style presets; pre-generated static `.mp3`s via `generate_audio.js` → `audioMap.js`; dynamic ElevenLabs fetch only for procedurally-varying text; **no browser Web Speech API fallback under any circumstance**; strict 1:1 spoken/on-screen parity; all symbols/notation spoken as full natural language (topic list in §10).
- **Question bank:** 10 worlds × 10 questions = 100, procedurally generated (≥300 randomized-run stress test), fixed schema (`id, districtId, category, visual, questionText, options[4], correctAnswer, explanation, hint1, hint2, visualData`), World 9 (the 10th, final world) always mixed review / grand finale.
- **Product standards:** React/Vite/Tailwind/Framer Motion, pixel-faithful dark glassmorphism per `design-tokens.css`, Fredoka/Nunito fonts, enlarged fonts/touch targets in Simulate/Practice, surgical reuse of every non-topic-specific reference file, zip delivery excluding `node_modules`/`dist` with placeholder story art + art-brief README.

## 6. Module Identity

- **Name:** SolidQuest (follows the `{Topic}Quest` convention; distinct from the Grade 8 *Area and Perimeter* module and the existing module names).
- **Story theme:** *The Solid Design Studio* — a school design club that takes "commissions" from neighbours and local shops. Sec 2's slightly older register supports a project-based setting: every world is a commission or a studio zone, and every question is a client brief ("the client wants a cone cup that holds…").
- **Characters:** **Priya** and **Jun Hao**, two Sec 2 students who run the studio (Singaporean-multicultural naming convention, first names only, per blueprint default — no override requested). Proposed defaults, not yet stakeholder-approved (§14c).
- **Mascot:** **Tally the Owl** 🦉 (default retained), styled as "Foreman Tally" — hard hat, tape measure, clipboard — a light reskin, not a mascot swap. No theme-specific mascot is proposed: an owl's "measure twice" foreman framing fits the topic naturally.

## 7. Five-Phase Journey Detail

### 7.1 Wonder
Single hook screen at a dessert stall: a waffle **cone** and a straight-sided **cup** stand side by side, the same width across and the same height. Priya asks the client's question: *"If I fill the cone and tip it into the cup, how many cones does it take to fill the cup — and which one needs more wrapper to cover it?"* Jun Hao guesses "two". Tally poses the module's driving question: *"What if the secret to every pointed and round solid is hiding inside a plain cylinder?"* The screen shows a live `cone-vs-cylinder` diagram with matching labelled dimensions (radius, vertical height) and a "?" over the number of cones.

### 7.2 Story — 7 panels
The default is 4 panels; SolidQuest uses **7** because the topic stages a build-up across four solids plus a shared slant-height tool, a composite step and unit conversion (the reference AngleQuest build used 6 for a smaller topic). *(Build note for the TRD: the shipped reference already reads `STORY_PANELS.length` in both `App.jsx` and `StoryPhase.jsx`, so no magic-number fix is needed — re-verify in review; the story art count, the progress bar "x of 7" and the final-button label all follow the constant.)*

| # | Title | Concept delivered | Narrative beat |
|---|---|---|---|
| 1 | "The First Commission" | Hook + vocabulary: surface area = covering, volume = filling; recap bridge to Grade 7 (cylinder volume = base area × height) | Priya and Jun Hao accept their first job — the dessert-stall cone and cup — and Tally shows the two questions every solid asks: "how much to cover it?" and "how much to fill it?" |
| 2 | "The Pointy Third" | Pyramid volume = ⅓ × base area × vertical height | Tally pours a pyramid into a matching box: three pours fill it. Worked example: square base 6 cm, height 10 cm → ⅓ × 36 × 10 = 120 cm³. |
| 3 | "Two Heights, One Triangle" | Vertical height vs slant height; l² = h² + r² (cone) and l² = h² + (half base edge)² (pyramid); pyramid total surface area | Jun Hao measures the tent roof wrongly with the vertical height; Priya draws the hidden right-angled triangle. Worked: square pyramid, base 10 cm, height 12 cm → slant height 13 cm → area = 100 + 4 × (½ × 10 × 13) = 360 cm². |
| 4 | "The Cone Factory" | Cone volume ⅓πr²h; curved surface area πrl; total surface area πrl + πr² | The party-hat order: radius 3 cm, height 4 cm, slant height 5 cm → volume 12π cm³, curved surface 15π cm², total surface 24π cm². |
| 5 | "The Perfect Ball" | Sphere 4⁄3πr³ and 4πr²; hemisphere ⅔πr³, curved 2πr², total 3πr² | The dome water-tank order: radius 6 cm model → volume 288π cm³, surface area 144π cm²; cut it in half and the flat circle appears — the "total surface" of a hemisphere gains a lid. |
| 6 | "Mix and Match" | Composite solids: add/subtract volumes; count only exposed faces | A silo order: a cone roof on a cylinder, radius 3 cm, cylinder height 10 cm, cone height 4 cm. Volume 90π + 12π = 102π cm³; surface area counts the cone's curved face, the cylinder's curved face and its base — 15π + 60π + 9π = 84π cm² — *not* the two circles hidden where they join. |
| 7 | "Studio Open for Business" | Recap of the toolkit + unit conversion (1 litre = 1000 cm³; 1 m³ = 1 000 000 cm³); one-line teaser (similar solids — scoped out, §3.2) | Tally hands out hard hats and sends the pair into the Workshop. "What would happen if you doubled every length? That's a mystery for another day." |

### 7.3 Simulate — 4 stations (archetype heuristic)
Follows the **documented 4-station standard** (PRD blueprint §B.5 / TRD §3.6) and adopts the reference's proven 2-column shell (left station-tab sidebar, right activity panel, a station-gated "Go to Practice" button) and its glassmorphic `Panel / Node / Msg / GoldBtn / GhostBtn` chrome kit. All four stations use a live SVG solid, text-labelled dimensions, and keyboard −/+ controls beside every slider.

1. **Concept Discovery Lab — "The Pour-Over Workshop."** A solid and its "matching container" share the same base and height. The student switches between three experiments — **square pyramid → prism, cone → cylinder, sphere → cylinder** — and presses **Pour** to transfer the contents: a pyramid or cone fills its container in exactly **3 pours**, and a sphere's contents are matched by **2 "cone-fulls"** (a cone of the sphere's radius and twice its radius in height) — the sphere is ⅔ of the cylinder that just fits it. Two sliders (radius/base edge, height) change the size; a live readout shows `volume of solid = ⅓ × volume of container` with the numbers, so the student sees the ratio stays 3 : 1 however big the solid is. **Gate:** all three experiments completed, the ratio demonstrated at ≥ 2 distinct sizes in the pyramid *or* cone experiment, then one confirmation question ("Why is a cone's volume ⅓πr²h?" → "Three cones fill the cylinder with the same radius and height"). Wrong answer → Msg + retry, no penalty.
2. **Build-to-Target Challenge — "The Capacity Contractor."** A client brief states a target — e.g. "a conical cup that holds exactly 96π cm³ with radius 6 cm" or "a dome tank with a surface area of 144π cm²". The student drags a slider (radius or height, with −/+ buttons) and watches the solid resize, a fill-level meter rise, and a running calculation readout (`⅓ × π × 6² × h = 12πh`). The ring turns amber within ±10 % and green on an exact match; **Check** accepts exact only (tolerance is visual guidance). Rounds rotate across solids (cone volume, pyramid volume, sphere surface area/volume). **Gate:** 3 successful rounds (a different solid each), each after "New brief".
3. **Multi-Step / Composite Construction Challenge — "The Combo Builder."** The student assembles a composite solid from a parts tray to match a blueprint, then works the calculation as a guided ladder: *Step 1* pick each part's formula, *Step 2* see each part's value, *Step 3* decide add or subtract. For surface-area rounds the student presses **Join** — the two touching faces fade and lock — and must toggle only the **exposed** surfaces into the total (each surface is a labelled chip with its formula; wrongly including a hidden face shakes and explains). This targets the most advanced objective (LO 7). **Gate:** three rounds — (i) cone on cylinder, volume (add); (ii) hemisphere on cylinder, total surface area (exposed faces only); (iii) cylinder with a conical hole, volume (subtract).
4. **Error-Detective — "Foreman Tally's Quote Check."** A neat quotation card (given / formula / substitution / answer) carries one seeded, realistic mistake. The student taps the faulty line, then picks the corrected line from three options. Seeded error types: **vertical height used for slant height; the ⅓ forgotten; diameter used as radius; hidden face counted in a composite; hemisphere curved surface given as 4πr² (or its lid forgotten); cm³ reported as litres without dividing by 1000.** This reinforces the module's core misconceptions (vertical vs slant height, the missing ⅓, hidden faces). **Gate:** 3 cases, each a different error type.

### 7.4 Play / Practice
Unchanged mechanics (§5): World Map of 10 worlds, 4 selectable modes, Boss Battle per world. **Clarification added to the blueprint mechanics:** each world holds 10 question "slots" ordered easy → hard; sessions draw as follows — Guided: slots 0–4; Independent: all 10 in order; Timed Challenge: a random 8 of the 10; Boss Battle: the hardest slots 5–9. (The shipped reference generated slots `0…N−1` for every mode, so Boss Battle never saw slots 5–9 — see TRD §1.)

### 7.5 Reflect
3-question conceptual recap quiz targeting the module's core misconceptions (vertical vs slant height, the ⅓ factor, and hidden faces in composites — the same triad Station D targets), scorecard summary (Total XP / Stars out of 30 / Best Streak / Badges), an open reflection prompt to Tally ("Dear Tally, the slant height and the vertical height are different because…"), and the confetti celebration.

Recap items (final wording in the TRD §5.1):
1. A cone has radius 6 cm, vertical height 8 cm and slant height 10 cm — which length goes into the volume formula? → **the vertical height, 8 cm.**
2. A cone and a cylinder have the same radius and height; the cylinder holds 90 cm³ — how much does the cone hold? → **30 cm³.**
3. Priya adds the circular face where a cone joins a cylinder into the composite's total surface area — what is wrong? → **that face is hidden inside the solid, so it should not be counted.**

## 8. World & Question Bank Table

10 worlds, foundational → applied; **World 9 (the 10th, final) is the mixed-review / grand-finale world**, per standard.

| id | Name | Emoji | Accent | conceptFocus | Description | Answer format | Boss (name · emoji · reward badge) |
|---|---|---|---|---|---|---|---|
| 0 | Parts Plaza | 🧩 | `#f472b6` | `solid-parts-units` | Name the parts of solids, tell vertical height from slant height, radius from diameter, and pick cm / cm² / cm³. | words / units | The Label Mixer 🏷️ · "Labels Locked In" |
| 1 | Pyramid Point | 🔺 | `#fb923c` | `pyramid-volume` | Volume of right pyramids with square, rectangular and triangular bases (⅓ × base area × height). | whole number + cm³ | The Missing Third 🧩 · "Third Finder" |
| 2 | Slant Summit | ⛰️ | `#fbbf24` | `slant-height` | Find slant heights of pyramids and cones with Pythagoras; choose between height and slant height. | whole number + cm | The Slippery Slant 🛝 · "Slant Solver" |
| 3 | Pyramid Panels | 🏛️ | `#4ade80` | `pyramid-surface-area` | Total surface area of square- and rectangular-based pyramids (base + triangular faces). | whole number + cm² | The Face Forgetter 🎭 · "Every Face Counted" |
| 4 | Cone Cove | 🍦 | `#38bdf8` | `cone-volume` | Volume of cones, including when the diameter or slant height is given instead. | in terms of π | The Cone Crusher 🚧 · "Cone Commander" |
| 5 | Cone Canopy | 🎪 | `#818cf8` | `cone-surface-area` | Curved and total surface area of cones (finding l first when needed). | in terms of π | The Curved Cutter ✂️ · "Canopy Champion" |
| 6 | Sphere Shore | 🏀 | `#c084fc` | `sphere-hemisphere` | Volume and surface area of spheres and hemispheres (curved vs total). | in terms of π | The Round Rascal ⚽ · "Sphere Specialist" |
| 7 | Combo Corner | 🏰 | `#22d3ee` | `composite-solids` | Composite solids: add or subtract volumes, count only exposed surfaces. | in terms of π (pyramid-on-cuboid: whole number) | The Hidden-Face Hider 🕵️ · "Combo Master" |
| 8 | Capacity Quay | 🚰 | `#facc15` | `real-world-capacity` | Word problems: capacity and unit conversion, liquid transfer, recasting, unknown dimension from a volume. | whole number, or 3 s.f. | Spill-Over Sam 🥤 · "Capacity Captain" |
| 9 | Grand Opening Gala | 🏆 | `#f43f5e` | `mixed-review` | Hardest boss; mixes every question type from worlds 0–8. | as source world | The Grand Contractor 🏗️ · "Studio Legend" |

**Sample questions** (illustrative only, not the full 100; every number below has been recomputed independently):

- **World 0:** "In a cone, which line runs from the apex straight down to the centre of the base, meeting it at a right angle?" → **Vertical height** / Slant height / Radius / Diameter. · "A sphere has diameter 14 cm. Which radius goes into the sphere formulae?" → **7 cm** / 14 cm / 28 cm / 3.5 cm.
- **World 1:** "A square-based pyramid has base edge 6 cm and vertical height 10 cm. Find its volume." → **120 cm³** / 360 cm³ / 180 cm³ / 20 cm³. *⅓ × 36 × 10 = 120 cm³ (distractors: forgot the ⅓; used ½; used the edge instead of the base area).* · "A pyramid has a rectangular base 8 cm by 6 cm and vertical height 9 cm." → **144 cm³**.
- **World 2:** "A cone has radius 6 cm and vertical height 8 cm. Find its slant height." → **10 cm** / 14 cm / 48 cm / 100 cm. *l² = 6² + 8² = 100, so l = 10 (distractors: r + h; r × h; forgot the square root).* · "A square pyramid has base edge 10 cm and vertical height 12 cm. Find the slant height of a triangular face." → **13 cm** / 12 cm / 17 cm / 169 cm.
- **World 3:** "A square pyramid has base edge 10 cm, vertical height 12 cm and slant height 13 cm. Find its total surface area." → **360 cm²** / 260 cm² / 340 cm² / 165 cm². *100 + 4 × ½ × 10 × 13 = 360 (distractors: forgot the base; used the vertical height; counted one triangle).* · Rectangular base 18 cm by 10 cm, height 12 cm (slant heights 13 cm and 15 cm) → **564 cm²**.
- **World 4:** "A cone has radius 6 cm and vertical height 8 cm. Find its volume in terms of π." → **96π cm³** / 288π cm³ / 192π cm³ / 16π cm³. *⅓ × π × 6² × 8 = 96π.* · "A cone has diameter 12 cm and height 10 cm." → **120π cm³** (distractor 480π: the diameter used as the radius).
- **World 5:** "A cone has radius 6 cm and slant height 10 cm. Find its curved surface area." → **60π cm²** / 48π cm² / 120π cm² / 36π cm². *πrl = π × 6 × 10 (distractor 48π: vertical height used).* · "A cone has radius 5 cm and vertical height 12 cm. Find its total surface area." → **90π cm²** / 85π cm² / 65π cm² / 115π cm². *l = 13; π × 5 × 13 + π × 5² = 90π.*
- **World 6:** "A sphere has radius 6 cm. Find its volume." → **288π cm³** / 864π cm³ / 144π cm³ / 72π cm³. *⁴⁄₃ × π × 216 = 288π.* · "A solid hemisphere has radius 9 cm. Find its total surface area." → **243π cm²** / 162π cm² / 324π cm² / 486π cm². *3πr² = 243π (distractors: curved only; 4πr²; its volume's number).*
- **World 7:** "A cone sits on a cylinder, both radius 3 cm. The cylinder is 10 cm high and the cone is 4 cm high. Find the total volume." → **102π cm³** / 126π cm³ / 90π cm³ / 78π cm³. · "Same solid, cone slant height 5 cm: find the total surface area." → **84π cm²** / 93π cm² / 102π cm² / 81π cm². *15π + 60π + 9π = 84π; 93π counted one hidden circle; 102π counted both; 81π used the vertical height.*
- **World 8:** "A conical paper cup has radius 6 cm and vertical height 8 cm. How much water can it hold, correct to 3 significant figures?" → **302 cm³** / 905 cm³ / 1210 cm³ / 377 cm³. · "Water from a full cone (radius 6 cm, height 12 cm) is poured into an empty cylinder of radius 4 cm. How deep is the water?" → **9 cm** / 27 cm / 12 cm / 3 cm. · "A solid metal sphere of radius 6 cm is melted and recast into small spheres of radius 3 cm. How many?" → **8** / 2 / 4 / 16. · "A hemispherical bowl has diameter 24 cm. How many litres can it hold, correct to 3 s.f.?" → **3.62 litres** / 7.24 litres / 0.362 litres / 29.0 litres.
- **World 9:** "A solid hemisphere of radius 6 cm sits on a cylinder of radius 6 cm and height 10 cm. Find the total surface area." → **228π cm²** / 264π cm² / 300π cm² / 192π cm². *72π + 120π + 36π; 264π counted the hidden circle; 300π used 4πr² for the dome; 192π forgot the base.* · "A cone has radius 5 cm and volume 100π cm³. Find its vertical height." → **12 cm** / 4 cm / 20 cm / 36 cm.

**Clean-number / geometric-validity constraints (hard rules, carried into the TRD's generation logic).** This module's constraint set is stronger than a typical "clean number" pool because several quantities are tied together by exact geometry:

1. **Integer slant heights by construction.** Slant heights are never computed from arbitrary dimensions; every cone, square pyramid and rectangular pyramid draws its (leg, height, slant) from a curated Pythagorean-triple table, so *l* is always a whole number and **no surds appear anywhere**. For a rectangular pyramid the two faces have different slant heights, so only heights that belong to two triples are used (e.g. h = 12 with half-edges 5 and 9 → base 10 × 18; h = 8 with 6 and 15 → 12 × 30; h = 24 with 7 and 10 → 14 × 20).
2. **Exact "in terms of π" coefficients.** Every in-terms-of-π answer has an integer coefficient: sphere/hemisphere volume requires radius divisible by 3; cone and pyramid volume require 3 | r²h (resp. 3 | base area × h) — automatically true for every Pythagorean-triple cone or pyramid, since one leg of any such triple is divisible by 3.
3. **Convention-robust 3-s.f. answers.** Every decimal answer is generated with both π = calculator value and π = 3.142 and is rejected unless both round to the *identical* 3-s.f. string; distractors must be distinct strings at 3 s.f. and ≥ 2 % from the correct value.
4. **Coincidence guard.** A question is rejected if the correct coefficient equals a distractor's coefficient under a different quantity (e.g. sphere radius 3 has volume 36π *and* surface area 36π; a cone with r = 6, h = 8 has volume 96π *and* total surface area 96π) — such pairs make a wrong-formula answer look right.
5. **Diameters are even** so the radius is a whole number; sphere radii for volume questions ∈ {3, 6, 9, 12}; real-world decimal answers use 3 s.f.
6. **Composite consistency.** Composite solids share one radius across parts; hidden faces are derived from the join geometry (never hand-listed), and the answer is recomputed independently from the part list by the validator.
7. **Backwards construction for transfer/recast.** Liquid-transfer and recasting questions are built from the chosen whole-number answer (depth or count) so forward numbers are always integers.
8. Units are consistent within a question except in the explicit unit-conversion template, which uses only exact factors (1000, 1 000 000, 100).

## 9. Gamification Naming (8 fixed triggers, relabelled)

| Trigger (fixed) | Badge name |
|---|---|
| First correct answer | First Brick Laid 🧱 |
| 5-answer streak | Building Momentum 🔥 |
| 10-answer streak | Master Builder Streak 🏗️ |
| All 4 Simulate stations complete | Workshop Certified 🛠️ |
| Any world scores 3 stars | Perfect Fit ⭐⭐⭐ |
| Any Boss Battle won | Boss Solid Smashed 🏆 |
| 20+ questions answered in Practice | Tireless Tape Measure 📏 |
| Full 5-phase journey complete | Chief Solid Designer 🎖️ |

## 10. Audio & Narration Content Rules

Topic-specific terms that must always be spoken in full, never as symbols/abbreviations/digits-only (per the universal rule in §5):
- "pi" — never "π"; an in-terms-of-π answer is spoken as "ninety-six pi" (never "96 π" or "ninety-six p i").
- "square centimetres", "cubic centimetres", "square metres", "cubic metres", "millilitres", "litres" — never "cm²", "cm³", "m³", "mL", "L". "centimetres" with the British spelling, consistently.
- "r squared", "r cubed" — never "r²", "r³"; "pi r squared h" spelled as "pi r squared h".
- Fractions of formulae: "one third" (⅓), "four thirds" (4⁄3), "two thirds" (⅔) — never "one slash three"; a formula such as ⅓πr²h is read "one third pi r squared h".
- "vertical height" or "perpendicular height" and "slant height" — always the full phrases; never "h" and "l" alone without the word (when the symbol itself is read it is "h" / "l" after the word, e.g. "slant height l").
- "curved surface area", "total surface area", "volume", "base area", "apex", "hemisphere", "radius", "diameter" — full words, never "C.S.A.", "T.S.A.".
- "l squared equals r squared plus h squared" for l² = r² + h² (never read the symbols); "equals", "plus", "minus", "times", "divided by" for = + − × ÷.
- Square-root results are read plainly ("the slant height is thirteen centimetres"); no surd is ever spoken because none is ever generated.
- "three significant figures" for "3 s.f."; "correct to" for "to".

## 11. Accessibility

- Enlarged fonts and touch targets in Simulate and Practice per the age-calibration standard (Sec 2 needs less enlargement than the lower-primary modules, but slider handles, −/+ buttons and tappable face-chips must comfortably exceed standard tap-target minimums, and remain usable at 390 × 844).
- Every solid diagram carries **text labels on every dimension** ("r = 6 cm", "h = 8 cm", "l = 10 cm") — colour is never the only way a dimension or a face is identified. The vertical height is drawn **dashed with a right-angle mark**, the slant height **solid with arrowheads**, hidden joined faces **hatched** — so the two heights are distinguishable without colour.
- Every slider/drag interaction exposes explicit keyboard −/+ increment controls (and arrow keys on the focused slider), not drag-only. Face-selection in Station C is a labelled chip list as well as tappable SVG regions, so it is fully operable without pointer precision.
- Contrast and focus rings follow the existing token system; `aria-label`s on SVG handles.

## 12. Assets Required

**7 story images at 1024 × 1024 px, real PNG files** (matching the supplied reference's actual shipped dimensions), one per Story panel (§7.2). Art-brief README must describe each panel's required scene, characters (Priya, Jun Hao, Foreman Tally) and mood — e.g. Panel 3 ("Two Heights, One Triangle"): a pyramid-roofed pavilion, Priya sketching the hidden right-angled triangle on a whiteboard, Jun Hao holding a tape measure along the sloping face, Tally pointing a pencil at the vertical dashed line; clear daylight, instructional mood. *(Note: the reference's `story_N.png` files are actually JPEG data under a `.png` extension, and duplicate `.jpg` files ship alongside — placeholders in this build must be genuine PNGs with no duplicates, see TRD §1.)*

## 13. Success Metrics / Acceptance Criteria

In addition to the fixed criteria (bank stress test, audio parity, clean build, full walkthrough):
- **Geometric validity**, not just arithmetic correctness, of every generated question: *l² = r² + h²* (or the pyramid equivalent) holds exactly for every stored solid; composite surface areas are recomputed independently from the face list; hidden faces are excluded — verified with explicit assertions in the ≥300-run stress test.
- **Convention robustness:** zero decimal answers whose 3-s.f. value changes between π = calculator and π = 3.142; zero coincidence-guard violations.
- All 4 Simulate stations are genuinely interactive SVG solids (not static images with a button), each satisfying its own completion gate; Station D's seeded errors are provably wrong and its corrections provably right.
- **All 8 badges are reachable** in a full-journey test (the shipped reference leaves four of them unreachable — TRD §1).
- Boss Battle draws only slots 5–9 and Guided only slots 0–4 (session-composition assertion).
- The Reflect recap's 3 questions target the vertical-vs-slant, one-third and hidden-face misconceptions.

## 14. Assumptions & Open Questions

(a) **To confirm with stakeholders:** the π convention (calculator π, with 3.142 as an acceptable equivalent) and the "3 significant figures unless told otherwise" default for Worlds 8–9, since local exam papers state the convention in the paper's instructions rather than in the syllabus text; and whether in-terms-of-π is the right default format for Worlds 4–7.
(b) **To confirm:** that Pythagoras' theorem (the sibling *Finding Unknown Sides* module) is taken before this one — slant heights depend on it. If not, World 2 needs a short worked-hint scaffold.
(c) Character names (Priya, Jun Hao) and the Foreman-Tally mascot treatment are proposed defaults per blueprint convention, not yet stakeholder-approved.
(d) Topic-adjacent skills deliberately scoped out (§3.2) that could become future modules: **Similar Solids (scale factors for area and volume)**, **Prisms & Cylinders** (Grade 7 consolidation), and **Frustums/Nets**.
(e) **New clarification to approve:** the per-mode question-slot composition in §7.4 (Boss = hardest slots) is a change from the shipped reference's behaviour and an addition to the blueprint's mode table.
(f) The world-unlock rule (world *n* opens when world *n − 1* has ≥ 1★) is inherited from the shipped reference, not specified by the blueprint — confirm.
(g) A multiple-choice bank can check final answers but not written working; working is exercised only in Stations C and D. Flagged for visibility, not in doubt.
(h) The shipped reference's `.env.local.example` contains what appears to be a real ElevenLabs API key. This build must not copy it, and the key should be treated as exposed and rotated (TRD §1, §8.4).

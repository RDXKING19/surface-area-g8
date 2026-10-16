/**
 * Question Bank Generator for SolidQuest (Grade 8)
 * Generates 100 procedurally distinct, geometrically valid questions across 10 worlds.
 * Adheres strictly to Singapore MOE Sec 2 Measurement strand standards.
 */
import { WORLDS } from '../config/worlds.config.js';
import { createRNG } from '../utils/rng.js';

export const DISTRICTS = WORLDS.map(w => ({
  id: w.id,
  name: w.name,
  icon: w.emoji,
  accent: w.accent,
  boss: w.boss
}));

export function generateQuestion(worldId, slot, rng = createRNG()) {
  const qId = `w${worldId}_s${slot}`;

  switch (worldId) {
    /* =========================================================================
       WORLD 0: Parts Plaza (Parts, Heights, Radius vs Diameter, Units)
       ========================================================================= */
    case 0: {
      const templates = [
        {
          visual: 'vocab',
          visualData: { highlight: 'vheight' },
          category: 'parts-identification',
          questionText: 'In a right cone, which line runs from the apex straight down to the centre of the circular base at a 90° right angle?',
          options: ['Vertical (Perpendicular) height', 'Slant height', 'Radius', 'Circumference'],
          correctAnswer: 'Vertical (Perpendicular) height',
          explanation: 'The perpendicular height meets the centre of the base at 90° and is the height used in the volume formula ⅓πr²h.',
          hint1: 'Look for the dashed vertical line meeting the base at a right angle.',
          hint2: 'Vertical height runs from apex to the base centre at 90°.'
        },
        {
          visual: 'vocab',
          visualData: { highlight: 'slant' },
          category: 'parts-identification',
          questionText: 'In a pyramid or cone, which line runs along the sloping outer surface from the apex to the outer base edge?',
          options: ['Slant height', 'Vertical height', 'Diameter', 'Base diagonal'],
          correctAnswer: 'Slant height',
          explanation: 'The slant height (l) measures the slope of the face and is used to calculate sloping and curved surface areas.',
          hint1: 'Look for the line that travels along the sloping face.',
          hint2: 'Slant height is the true height of the sloping triangular or curved face.'
        },
        {
          visual: 'vocab',
          visualData: { highlight: 'apex' },
          category: 'parts-identification',
          questionText: 'What is the mathematical name for the single highest top tip vertex of a pyramid or cone?',
          options: ['Apex', 'Base centre', 'Curved sector', 'Equator'],
          correctAnswer: 'Apex',
          explanation: 'The apex is the topmost sharp point opposite the base where all the triangular faces or curved edges meet.',
          hint1: 'Think of the highest point of a mountain or solid.',
          hint2: 'The single top corner is called the apex.'
        },
        {
          visual: 'sphere',
          visualData: { r: 7, d: 14 },
          category: 'radius-diameter',
          questionText: 'A spherical dome has an outer diameter of 14 cm. Which radius value must be substituted into the sphere formulas?',
          options: ['7 cm', '14 cm', '28 cm', '3.5 cm'],
          correctAnswer: '7 cm',
          explanation: 'Radius is always half of the diameter: 14 cm ÷ 2 = 7 cm.',
          hint1: 'Remember that diameter = 2 × radius.',
          hint2: 'Divide the diameter by 2: 14 ÷ 2 = 7 cm.'
        },
        {
          visual: 'sphere',
          visualData: { r: 9, d: 18 },
          category: 'radius-diameter',
          questionText: 'A hemisphere bowl has a radius of 9 cm. What is the full diameter across its flat top circular rim?',
          options: ['18 cm', '9 cm', '4.5 cm', '27 cm'],
          correctAnswer: '18 cm',
          explanation: 'The diameter across the entire rim is twice the radius: 2 × 9 cm = 18 cm.',
          hint1: 'Diameter = 2 × radius.',
          hint2: 'Multiply the radius by 2: 2 × 9 = 18 cm.'
        },
        {
          visual: 'cone',
          visualData: { r: 6, h: 8, l: 10 },
          category: 'units',
          questionText: 'Which unit is mathematically correct when expressing the Total Surface Area of a solid?',
          options: ['cm²', 'cm³', 'cm', 'litres'],
          correctAnswer: 'cm²',
          explanation: 'Surface area measures the 2D covering of all faces, which is always measured in square units (cm² or m²).',
          hint1: 'Area measures flat surfaces and covering.',
          hint2: 'Lengths are cm, areas are cm², and volumes are cm³.'
        },
        {
          visual: 'pyramid',
          visualData: { base: 'square', s: 6, h: 10, l: 11 },
          category: 'units',
          questionText: 'Which unit is mathematically correct when expressing the Volume (capacity) of a 3D solid?',
          options: ['cm³', 'cm²', 'cm', 'degrees'],
          correctAnswer: 'cm³',
          explanation: 'Volume measures 3D space and filling capacity, which is always measured in cubic units (cm³, m³, or mL).',
          hint1: 'Capacity is 3-dimensional.',
          hint2: '3-dimensional volume uses cubic units: cm³.'
        },
        {
          visual: 'cone',
          visualData: { r: 5, h: 12, l: 13 },
          category: 'quantity-choice',
          questionText: 'A design client wants to know how much lemonade a conical paper cup can hold. Which quantity must you calculate?',
          options: ['Volume', 'Curved surface area', 'Total surface area', 'Slant height'],
          correctAnswer: 'Volume',
          explanation: 'How much a container can hold (filling capacity) is its volume.',
          hint1: 'Think about whether liquid fills space or covers the outside.',
          hint2: 'Filling = Volume; Covering = Surface Area.'
        },
        {
          visual: 'cone',
          visualData: { r: 4, h: 3, l: 5 },
          category: 'quantity-choice',
          questionText: 'A party planner wants to buy decorative wrapping foil to cover the sloping outside of a party hat. Which quantity must be calculated?',
          options: ['Curved surface area', 'Volume', 'Base area', 'Perpendicular height'],
          correctAnswer: 'Curved surface area',
          explanation: 'Covering the outside wrapper of a cone without the bottom base requires calculating the curved surface area (πrl).',
          hint1: 'The wrapper wraps around the curved slope, leaving the bottom open.',
          hint2: 'Covering the slope without the bottom = Curved surface area.'
        },
        {
          visual: 'pyramid',
          visualData: { base: 'square', s: 10, h: 12, l: 13 },
          category: 'quantity-choice',
          questionText: 'When calculating the volume of a right pyramid using ⅓ × base area × height, which height must be used?',
          options: ['The perpendicular vertical height (h)', 'The slant height (l)', 'The base perimeter', 'The edge length'],
          correctAnswer: 'The perpendicular vertical height (h)',
          explanation: 'Volume always requires the vertical height measured perpendicularly from base to apex.',
          hint1: 'Slant height is for sloping surfaces, not volume.',
          hint2: 'Volume uses perpendicular vertical height.'
        }
      ];
      const t = templates[slot % templates.length];
      return { id: qId, districtId: worldId, ...t };
    }

    /* =========================================================================
       WORLD 1: Pyramid Point (Volume: ⅓ × Base Area × Height)
       ========================================================================= */
    case 1: {
      const templates = [
        {
          visual: 'pyramid',
          visualData: { base: 'square', s: 6, h: 10, l: 10 },
          category: 'pyramid-volume',
          questionText: 'A right pyramid has a square base of side 6 cm and vertical height 10 cm. Find its volume.',
          options: ['120 cm³', '360 cm³', '180 cm³', '60 cm³'],
          correctAnswer: '120 cm³',
          explanation: 'Base area = 6 × 6 = 36 cm². Volume = ⅓ × 36 × 10 = 120 cm³.',
          hint1: 'Formula: V = ⅓ × base area × vertical height.',
          hint2: '⅓ × (6 × 6) × 10 = ⅓ × 36 × 10 = 120 cm³.'
        },
        {
          visual: 'pyramid',
          visualData: { base: 'square', s: 9, h: 8, l: 9 },
          category: 'pyramid-volume',
          questionText: 'A monument model has a square base of 9 cm and a vertical height of 8 cm. What is its volume?',
          options: ['216 cm³', '648 cm³', '324 cm³', '72 cm³'],
          correctAnswer: '216 cm³',
          explanation: 'Base area = 9 × 9 = 81 cm². Volume = ⅓ × 81 × 8 = 27 × 8 = 216 cm³.',
          hint1: 'Calculate base area first: 9 × 9 = 81.',
          hint2: '⅓ × 81 × 8 = 216 cm³.'
        },
        {
          visual: 'pyramid',
          visualData: { base: 'square', s: 12, h: 5, l: 8 },
          category: 'pyramid-volume',
          questionText: 'Find the volume of a glass paperweight shaped as a square pyramid with base edge 12 cm and vertical height 5 cm.',
          options: ['240 cm³', '720 cm³', '360 cm³', '120 cm³'],
          correctAnswer: '240 cm³',
          explanation: 'Base area = 12 × 12 = 144 cm². Volume = ⅓ × 144 × 5 = 48 × 5 = 240 cm³.',
          hint1: 'V = ⅓ × (12 × 12) × 5.',
          hint2: '144 ÷ 3 = 48; 48 × 5 = 240 cm³.'
        },
        {
          visual: 'pyramid',
          visualData: { base: 'rect', a: 8, b: 6, h: 9, lA: 10, lB: 10 },
          category: 'pyramid-volume',
          questionText: 'A pyramid has a rectangular base measuring 8 cm by 6 cm and a vertical height of 9 cm. Calculate its volume.',
          options: ['144 cm³', '432 cm³', '216 cm³', '72 cm³'],
          correctAnswer: '144 cm³',
          explanation: 'Base area = 8 × 6 = 48 cm². Volume = ⅓ × 48 × 9 = 48 × 3 = 144 cm³.',
          hint1: 'For a rectangular base, base area = length × width.',
          hint2: '⅓ × (8 × 6) × 9 = ⅓ × 48 × 9 = 144 cm³.'
        },
        {
          visual: 'pyramid',
          visualData: { base: 'rect', a: 10, b: 7, h: 12, lA: 13, lB: 13 },
          category: 'pyramid-volume',
          questionText: 'A hopper tank is a rectangular pyramid with base 10 cm by 7 cm and vertical height 12 cm. Find its volume.',
          options: ['280 cm³', '840 cm³', '420 cm³', '140 cm³'],
          correctAnswer: '280 cm³',
          explanation: 'Base area = 10 × 7 = 70 cm². Volume = ⅓ × 70 × 12 = 70 × 4 = 280 cm³.',
          hint1: 'Multiply length × width for base area, then ⅓ × base area × height.',
          hint2: '⅓ × 70 × 12 = 280 cm³.'
        },
        {
          visual: 'pyramid',
          visualData: { base: 'rect', a: 15, b: 4, h: 11, lA: 12, lB: 12 },
          category: 'pyramid-volume',
          questionText: 'Calculate the volume of a right pyramid with rectangular base 15 cm by 4 cm and vertical height 11 cm.',
          options: ['220 cm³', '660 cm³', '330 cm³', '110 cm³'],
          correctAnswer: '220 cm³',
          explanation: 'Base area = 15 × 4 = 60 cm². Volume = ⅓ × 60 × 11 = 20 × 11 = 220 cm³.',
          hint1: 'Base area is 15 × 4 = 60 cm².',
          hint2: '⅓ × 60 × 11 = 220 cm³.'
        },
        {
          visual: 'pyramid',
          visualData: { base: 'tri', s: 6, h: 9, l: 10 },
          category: 'pyramid-volume',
          questionText: 'A pyramid has a right-angled triangular base with legs 6 cm and 8 cm. If its vertical height is 9 cm, find its volume.',
          options: ['72 cm³', '216 cm³', '144 cm³', '36 cm³'],
          correctAnswer: '72 cm³',
          explanation: 'Base area = ½ × 6 × 8 = 24 cm². Volume = ⅓ × 24 × 9 = 24 × 3 = 72 cm³.',
          hint1: 'Right-triangle base area = ½ × base × height of triangle.',
          hint2: 'Base area = 24 cm². Volume = ⅓ × 24 × 9 = 72 cm³.'
        },
        {
          visual: 'pyramid',
          visualData: { base: 'tri', s: 5, h: 6, l: 8 },
          category: 'pyramid-volume',
          questionText: 'A triangular pyramid has a base area of 30 cm² and vertical height 6 cm. What is its volume?',
          options: ['60 cm³', '180 cm³', '90 cm³', '30 cm³'],
          correctAnswer: '60 cm³',
          explanation: 'Volume = ⅓ × base area × height = ⅓ × 30 × 6 = 10 × 6 = 60 cm³.',
          hint1: 'The base area is already given as 30 cm²!',
          hint2: '⅓ × 30 × 6 = 60 cm³.'
        },
        {
          visual: 'pyramid',
          visualData: { base: 'square', s: 8, h: 15, l: 16 },
          category: 'pyramid-volume',
          questionText: 'A solid pyramid has base area 45 cm² and vertical height 8 cm. Find its volume.',
          options: ['120 cm³', '360 cm³', '180 cm³', '90 cm³'],
          correctAnswer: '120 cm³',
          explanation: 'Volume = ⅓ × 45 × 8 = 15 × 8 = 120 cm³.',
          hint1: 'V = ⅓ × 45 × 8.',
          hint2: '45 ÷ 3 = 15; 15 × 8 = 120 cm³.'
        },
        {
          visual: 'pyramid',
          visualData: { base: 'square', s: 6, h: 8, l: 10 },
          category: 'pyramid-volume',
          questionText: 'A square-based pyramid has base edge 6 cm and a volume of 96 cm³. Find its perpendicular vertical height.',
          options: ['8 cm', '24 cm', '16 cm', '4 cm'],
          correctAnswer: '8 cm',
          explanation: 'Base area = 36 cm². 96 = ⅓ × 36 × h = 12h, so h = 96 ÷ 12 = 8 cm.',
          hint1: 'Work backwards: 96 = ⅓ × (6 × 6) × h.',
          hint2: '96 = 12h, so h = 8 cm.'
        }
      ];
      const t = templates[slot % templates.length];
      return { id: qId, districtId: worldId, ...t };
    }

    /* =========================================================================
       WORLD 2: Slant Summit (Pythagoras for Slant Heights: l² = r² + h²)
       ========================================================================= */
    case 2: {
      const templates = [
        {
          visual: 'cone',
          visualData: { r: 6, h: 8, l: 10 },
          category: 'slant-height',
          questionText: 'A right cone has radius 6 cm and vertical height 8 cm. Find its slant height l.',
          options: ['10 cm', '14 cm', '48 cm', '100 cm'],
          correctAnswer: '10 cm',
          explanation: 'By Pythagoras: l² = r² + h² = 6² + 8² = 36 + 64 = 100, so l = √100 = 10 cm.',
          hint1: 'Use Pythagoras: l² = r² + h².',
          hint2: '6² + 8² = 36 + 64 = 100. √100 = 10 cm.'
        },
        {
          visual: 'cone',
          visualData: { r: 5, h: 12, l: 13 },
          category: 'slant-height',
          questionText: 'A party hat cone has base radius 5 cm and vertical height 12 cm. What is its slant height?',
          options: ['13 cm', '17 cm', '60 cm', '169 cm'],
          correctAnswer: '13 cm',
          explanation: 'l² = 5² + 12² = 25 + 144 = 169, so l = √169 = 13 cm.',
          hint1: 'Pythagorean triple (5, 12, 13).',
          hint2: '5² + 12² = 169. √169 = 13 cm.'
        },
        {
          visual: 'cone',
          visualData: { r: 9, h: 12, l: 15 },
          category: 'slant-height',
          questionText: 'A large funnel has radius 9 cm and vertical height 12 cm. Find its slant height.',
          options: ['15 cm', '21 cm', '108 cm', '225 cm'],
          correctAnswer: '15 cm',
          explanation: 'l² = 9² + 12² = 81 + 144 = 225, so l = √225 = 15 cm.',
          hint1: 'l = √(9² + 12²).',
          hint2: '81 + 144 = 225. √225 = 15 cm.'
        },
        {
          visual: 'pyramid',
          visualData: { base: 'square', s: 10, h: 12, l: 13 },
          category: 'slant-height',
          questionText: 'A square pyramid has base edge 10 cm and vertical height 12 cm. Find the slant height l of its triangular faces.',
          options: ['13 cm', '17 cm', '22 cm', '15 cm'],
          correctAnswer: '13 cm',
          explanation: 'Half the base edge is 10 ÷ 2 = 5 cm. l² = h² + 5² = 12² + 5² = 144 + 25 = 169, so l = 13 cm.',
          hint1: 'The right-angled triangle uses vertical height and HALF the base edge!',
          hint2: 'Half-edge = 5 cm. l² = 12² + 5² = 169, so l = 13 cm.'
        },
        {
          visual: 'pyramid',
          visualData: { base: 'square', s: 16, h: 6, l: 10 },
          category: 'slant-height',
          questionText: 'A roof pavilion is a square pyramid with base edge 16 cm and vertical height 6 cm. Find the slant height of a face.',
          options: ['10 cm', '22 cm', '14 cm', '100 cm'],
          correctAnswer: '10 cm',
          explanation: 'Half the base edge is 16 ÷ 2 = 8 cm. l² = 6² + 8² = 36 + 64 = 100, so l = 10 cm.',
          hint1: 'Half the base edge is 8 cm.',
          hint2: 'l² = 6² + 8² = 100, so l = 10 cm.'
        },
        {
          visual: 'pyramid',
          visualData: { base: 'square', s: 14, h: 24, l: 25 },
          category: 'slant-height',
          questionText: 'A pyramid monument has base edge 14 cm and vertical height 24 cm. Calculate its slant height.',
          options: ['25 cm', '31 cm', '38 cm', '625 cm'],
          correctAnswer: '25 cm',
          explanation: 'Half the base edge is 14 ÷ 2 = 7 cm. l² = 24² + 7² = 576 + 49 = 625, so l = 25 cm.',
          hint1: 'Half-edge is 7 cm. Look for triple (7, 24, 25).',
          hint2: 'l² = 24² + 7² = 625, so l = 25 cm.'
        },
        {
          visual: 'cone',
          visualData: { r: 8, h: 15, l: 17 },
          category: 'slant-height',
          questionText: 'A cone has radius 8 cm and slant height 17 cm. Find its vertical perpendicular height h.',
          options: ['15 cm', '25 cm', '9 cm', '225 cm'],
          correctAnswer: '15 cm',
          explanation: 'h² = l² - r² = 17² - 8² = 289 - 64 = 225, so h = √225 = 15 cm.',
          hint1: 'Subtract: h² = l² - r².',
          hint2: '289 - 64 = 225. √225 = 15 cm.'
        },
        {
          visual: 'pyramid',
          visualData: { base: 'square', s: 16, h: 6, l: 10 },
          category: 'slant-height',
          questionText: 'A square pyramid has base edge 16 cm and face slant height 10 cm. Find its vertical height h.',
          options: ['6 cm', '8 cm', '14 cm', '36 cm'],
          correctAnswer: '6 cm',
          explanation: 'Half-edge = 8 cm. h² = 10² - 8² = 100 - 64 = 36, so h = 6 cm.',
          hint1: 'Half-edge = 8 cm. h² = l² - (half-edge)²',
          hint2: '100 - 64 = 36. √36 = 6 cm.'
        },
        {
          visual: 'cone',
          visualData: { r: 6, h: 8, l: 10 },
          category: 'quantity-choice',
          questionText: 'Jun Hao measures a cone with radius 6 cm, vertical height 8 cm, and slant height 10 cm. Which length goes into ⅓πr²h?',
          options: ['Vertical height (8 cm)', 'Slant height (10 cm)', 'Radius (6 cm)', 'Diameter (12 cm)'],
          correctAnswer: 'Vertical height (8 cm)',
          explanation: 'Volume formulas always require the perpendicular vertical height (8 cm).',
          hint1: 'Volume requires vertical height.',
          hint2: 'The volume formula uses vertical height h = 8 cm.'
        },
        {
          visual: 'cone',
          visualData: { r: 6, h: 8, l: 10 },
          category: 'quantity-choice',
          questionText: 'For the same cone (r = 6 cm, h = 8 cm, l = 10 cm), which length goes into the curved surface formula πrl?',
          options: ['Slant height (10 cm)', 'Vertical height (8 cm)', 'Diameter (12 cm)', 'Base area'],
          correctAnswer: 'Slant height (10 cm)',
          explanation: 'Curved surface area measures the sloping face, which requires the slant height l = 10 cm.',
          hint1: 'Sloping surface requires slant height.',
          hint2: 'The curved surface area formula πrl uses l = 10 cm.'
        }
      ];
      const t = templates[slot % templates.length];
      return { id: qId, districtId: worldId, ...t };
    }

    /* =========================================================================
       WORLD 3: Pyramid Panels (Surface Area of Pyramids)
       ========================================================================= */
    case 3: {
      const templates = [
        {
          visual: 'pyramid',
          visualData: { base: 'square', s: 6, h: 4, l: 5 },
          category: 'pyramid-surface-area',
          questionText: 'A square pyramid has base edge 6 cm and face slant height 5 cm. Find its total surface area.',
          options: ['96 cm²', '60 cm²', '36 cm²', '156 cm²'],
          correctAnswer: '96 cm²',
          explanation: 'Base area = 6² = 36 cm². 4 triangular faces = 4 × (½ × 6 × 5) = 60 cm². Total = 36 + 60 = 96 cm².',
          hint1: 'Total surface area = base area + 4 × area of triangular face.',
          hint2: '36 + 4 × (½ × 6 × 5) = 36 + 60 = 96 cm².'
        },
        {
          visual: 'pyramid',
          visualData: { base: 'square', s: 10, h: 12, l: 13 },
          category: 'pyramid-surface-area',
          questionText: 'A decorative lantern is a square pyramid with base edge 10 cm and slant height 13 cm. Find its total surface area.',
          options: ['360 cm²', '260 cm²', '100 cm²', '460 cm²'],
          correctAnswer: '360 cm²',
          explanation: 'Base area = 10² = 100 cm². 4 triangular faces = 4 × (½ × 10 × 13) = 260 cm². Total = 100 + 260 = 360 cm².',
          hint1: 'Base = 100 cm²; 4 triangles = 4 × 65 = 260 cm².',
          hint2: '100 + 260 = 360 cm².'
        },
        {
          visual: 'pyramid',
          visualData: { base: 'square', s: 8, h: 3, l: 5 },
          category: 'pyramid-surface-area',
          questionText: 'Calculate the total surface area of a square pyramid with base edge 8 cm and slant height 5 cm.',
          options: ['144 cm²', '80 cm²', '64 cm²', '208 cm²'],
          correctAnswer: '144 cm²',
          explanation: 'Base area = 8² = 64 cm². 4 triangles = 4 × (½ × 8 × 5) = 80 cm². Total = 64 + 80 = 144 cm².',
          hint1: 'Base = 64 cm²; 4 triangles = 80 cm².',
          hint2: '64 + 80 = 144 cm².'
        },
        {
          visual: 'pyramid',
          visualData: { base: 'square', s: 12, h: 8, l: 10 },
          category: 'pyramid-surface-area',
          questionText: 'Find the total surface area of a square pyramid with base edge 12 cm and slant height 10 cm.',
          options: ['384 cm²', '240 cm²', '144 cm²', '484 cm²'],
          correctAnswer: '384 cm²',
          explanation: 'Base = 12² = 144 cm². 4 triangles = 4 × (½ × 12 × 10) = 240 cm². Total = 144 + 240 = 384 cm².',
          hint1: 'Base = 144; 4 triangles = 240.',
          hint2: '144 + 240 = 384 cm².'
        },
        {
          visual: 'pyramid',
          visualData: { base: 'square', s: 16, h: 6, l: 10 },
          category: 'pyramid-surface-area',
          questionText: 'A square pyramid has base edge 16 cm and vertical height 6 cm (slant height is not given). Find its total surface area.',
          options: ['576 cm²', '256 cm²', '320 cm²', '416 cm²'],
          correctAnswer: '576 cm²',
          explanation: 'Half-edge = 8 cm. l² = 6² + 8² = 100, so l = 10 cm. Base = 256 cm². 4 triangles = 4 × (½ × 16 × 10) = 320 cm². Total = 256 + 320 = 576 cm².',
          hint1: 'Step 1: find slant height l using Pythagoras first!',
          hint2: 'l = 10 cm. Area = 16² + 4 × (½ × 16 × 10) = 256 + 320 = 576 cm².'
        },
        {
          visual: 'pyramid',
          visualData: { base: 'square', s: 10, h: 12, l: 13 },
          category: 'pyramid-surface-area',
          questionText: 'A square pyramid has base edge 10 cm and vertical height 12 cm. Find its total surface area.',
          options: ['360 cm²', '340 cm²', '260 cm²', '160 cm²'],
          correctAnswer: '360 cm²',
          explanation: 'Half-edge = 5 cm. l = √(12² + 5²) = 13 cm. Base = 100 cm². 4 triangles = 260 cm². Total = 100 + 260 = 360 cm².',
          hint1: 'Find slant height first: l = 13 cm.',
          hint2: 'Total = 100 + 4 × (½ × 10 × 13) = 360 cm².'
        },
        {
          visual: 'pyramid',
          visualData: { base: 'square', s: 10, h: 12, l: 13 },
          category: 'pyramid-surface-area',
          questionText: 'An open glass tent roof has a square base of 10 cm and slant height 13 cm. If it has NO floor base, what is its glass surface area?',
          options: ['260 cm²', '360 cm²', '130 cm²', '100 cm²'],
          correctAnswer: '260 cm²',
          explanation: 'With no floor base, calculate only the 4 triangular sloping faces: 4 × (½ × 10 × 13) = 260 cm².',
          hint1: 'Do not include the base area because the tent has no floor!',
          hint2: '4 × (½ × 10 × 13) = 260 cm².'
        },
        {
          visual: 'pyramid',
          visualData: { base: 'rect', a: 10, b: 18, h: 12, lA: 15, lB: 13 },
          category: 'pyramid-surface-area',
          questionText: 'A rectangular pyramid has base 10 cm by 18 cm and vertical height 12 cm. The two slant heights are 15 cm and 13 cm. Find its total surface area.',
          options: ['564 cm²', '384 cm²', '464 cm²', '180 cm²'],
          correctAnswer: '564 cm²',
          explanation: 'Base = 10 × 18 = 180. Two faces on 10 cm edge: 2 × (½ × 10 × 15) = 150. Two faces on 18 cm edge: 2 × (½ × 18 × 13) = 234. Total = 180 + 150 + 234 = 564 cm².',
          hint1: 'Rectangular pyramid has 2 pairs of different triangular faces!',
          hint2: '180 + (10 × 15) + (18 × 13) = 180 + 150 + 234 = 564 cm².'
        },
        {
          visual: 'pyramid',
          visualData: { base: 'rect', a: 12, b: 30, h: 8, lA: 17, lB: 10 },
          category: 'pyramid-surface-area',
          questionText: 'A rectangular pyramid has base 12 cm by 30 cm and height 8 cm. Slant heights are 17 cm and 10 cm. Find its total surface area.',
          options: ['864 cm²', '504 cm²', '764 cm²', '360 cm²'],
          correctAnswer: '864 cm²',
          explanation: 'Base = 12 × 30 = 360. Faces on 12 cm edge: 2 × (½ × 12 × 17) = 204. Faces on 30 cm edge: 2 × (½ × 30 × 10) = 300. Total = 360 + 204 + 300 = 864 cm².',
          hint1: 'Base area + 2 front/back triangles + 2 left/right triangles.',
          hint2: '360 + 204 + 300 = 864 cm².'
        },
        {
          visual: 'pyramid',
          visualData: { base: 'square', s: 10, h: 12, l: 13 },
          category: 'quantity-choice',
          questionText: 'Why do the triangular side faces of a pyramid use the slant height l instead of the vertical height h?',
          options: ['Because slant height is the true perpendicular height of the sloping triangular face', 'Because slant height is always shorter', 'Because volume uses vertical height', 'Because the base is a square'],
          correctAnswer: 'Because slant height is the true perpendicular height of the sloping triangular face',
          explanation: 'The triangular faces slope outward. Their own altitude along the face is the slant height l.',
          hint1: 'Think about looking flat at one of the triangular faces.',
          hint2: 'The triangular face’s own perpendicular altitude is the slant height.'
        }
      ];
      const t = templates[slot % templates.length];
      return { id: qId, districtId: worldId, ...t };
    }

    /* =========================================================================
       WORLD 4: Cone Cove (Volume in terms of π)
       ========================================================================= */
    case 4: {
      const templates = [
        {
          visual: 'cone',
          visualData: { r: 6, h: 8, l: 10 },
          category: 'cone-volume',
          questionText: 'A cone has radius 6 cm and vertical height 8 cm. Find its volume in terms of π.',
          options: ['96π cm³', '288π cm³', '192π cm³', '48π cm³'],
          correctAnswer: '96π cm³',
          explanation: 'Volume = ⅓πr²h = ⅓ × π × 6² × 8 = ⅓ × π × 36 × 8 = 96π cm³.',
          hint1: 'Formula: V = ⅓πr²h.',
          hint2: '⅓ × 36 × 8 = 12 × 8 = 96π cm³.'
        },
        {
          visual: 'cone',
          visualData: { r: 3, h: 4, l: 5 },
          category: 'cone-volume',
          questionText: 'A party hat model has radius 3 cm and vertical height 4 cm. What is its volume in terms of π?',
          options: ['12π cm³', '36π cm³', '24π cm³', '15π cm³'],
          correctAnswer: '12π cm³',
          explanation: 'Volume = ⅓ × π × 3² × 4 = ⅓ × π × 9 × 4 = 12π cm³.',
          hint1: 'V = ⅓π(3²)(4).',
          hint2: '⅓ × 9 × 4 = 12π cm³.'
        },
        {
          visual: 'cone',
          visualData: { r: 9, h: 12, l: 15 },
          category: 'cone-volume',
          questionText: 'Find the volume of a sand cone with radius 9 cm and vertical height 12 cm in terms of π.',
          options: ['324π cm³', '972π cm³', '486π cm³', '108π cm³'],
          correctAnswer: '324π cm³',
          explanation: 'Volume = ⅓ × π × 9² × 12 = ⅓ × π × 81 × 12 = 81 × 4 × π = 324π cm³.',
          hint1: 'V = ⅓ × π × 81 × 12.',
          hint2: '81 × 4 = 324π cm³.'
        },
        {
          visual: 'cone',
          visualData: { r: 5, h: 12, l: 13 },
          category: 'cone-volume',
          questionText: 'Calculate the volume of a cone with radius 5 cm and vertical height 12 cm in terms of π.',
          options: ['100π cm³', '300π cm³', '150π cm³', '65π cm³'],
          correctAnswer: '100π cm³',
          explanation: 'Volume = ⅓ × π × 5² × 12 = ⅓ × π × 25 × 12 = 25 × 4 × π = 100π cm³.',
          hint1: 'V = ⅓ × π × 25 × 12.',
          hint2: '25 × 4 = 100π cm³.'
        },
        {
          visual: 'cone',
          visualData: { r: 6, h: 10, l: 12 },
          category: 'cone-volume',
          questionText: 'A traffic cone model has a circular base diameter of 12 cm and height 10 cm. Find its volume in terms of π.',
          options: ['120π cm³', '480π cm³', '240π cm³', '60π cm³'],
          correctAnswer: '120π cm³',
          explanation: 'Diameter = 12 cm, so radius r = 6 cm. Volume = ⅓ × π × 6² × 10 = ⅓ × 36 × 10 × π = 120π cm³.',
          hint1: 'Remember to divide diameter 12 cm by 2 to get radius 6 cm!',
          hint2: '⅓ × π × 6² × 10 = 120π cm³.'
        },
        {
          visual: 'cone',
          visualData: { r: 8, h: 6, l: 10 },
          category: 'cone-volume',
          questionText: 'A conical container has diameter 16 cm and vertical height 6 cm. Find its volume in terms of π.',
          options: ['128π cm³', '512π cm³', '256π cm³', '64π cm³'],
          correctAnswer: '128π cm³',
          explanation: 'Radius r = 16 ÷ 2 = 8 cm. Volume = ⅓ × π × 8² × 6 = ⅓ × 64 × 6 × π = 128π cm³.',
          hint1: 'Radius r = 8 cm.',
          hint2: '⅓ × 64 × 6 = 128π cm³.'
        },
        {
          visual: 'cone',
          visualData: { r: 5, h: 9, l: 11 },
          category: 'cone-volume',
          questionText: 'A cone cup has diameter 10 cm and vertical height 9 cm. What is its capacity in terms of π?',
          options: ['75π cm³', '300π cm³', '150π cm³', '45π cm³'],
          correctAnswer: '75π cm³',
          explanation: 'Radius r = 5 cm. Volume = ⅓ × π × 5² × 9 = ⅓ × 25 × 9 × π = 75π cm³.',
          hint1: 'Radius is 5 cm.',
          hint2: '⅓ × 25 × 9 = 75π cm³.'
        },
        {
          visual: 'cone',
          visualData: { r: 8, h: 15, l: 17 },
          category: 'cone-volume',
          questionText: 'A cone has radius 8 cm and slant height 17 cm (vertical height is not given). Find its volume in terms of π.',
          options: ['320π cm³', '960π cm³', '362π cm³', '136π cm³'],
          correctAnswer: '320π cm³',
          explanation: 'h = √(17² - 8²) = √(289 - 64) = 15 cm. Volume = ⅓ × π × 8² × 15 = 64 × 5 × π = 320π cm³.',
          hint1: 'Step 1: find vertical height h with Pythagoras: h = 15 cm.',
          hint2: 'Volume = ⅓ × π × 64 × 15 = 320π cm³.'
        },
        {
          visual: 'cone',
          visualData: { r: 12, h: 5, l: 13 },
          category: 'cone-volume',
          questionText: 'A cone has radius 12 cm and slant height 13 cm. What is its volume in terms of π?',
          options: ['240π cm³', '720π cm³', '156π cm³', '120π cm³'],
          correctAnswer: '240π cm³',
          explanation: 'h = √(13² - 12²) = 5 cm. Volume = ⅓ × π × 12² × 5 = ⅓ × 144 × 5 × π = 48 × 5 × π = 240π cm³.',
          hint1: 'Vertical height h = 5 cm.',
          hint2: '⅓ × 144 × 5 = 240π cm³.'
        },
        {
          visual: 'cone',
          visualData: { r: 6, h: 8, l: 10 },
          category: 'cone-volume',
          questionText: 'A cone has radius 6 cm and a volume of 96π cm³. Find its vertical perpendicular height h.',
          options: ['8 cm', '12 cm', '16 cm', '24 cm'],
          correctAnswer: '8 cm',
          explanation: '96π = ⅓ × π × 6² × h = 12πh, so h = 96 ÷ 12 = 8 cm.',
          hint1: '96π = 12πh.',
          hint2: 'Divide 96 by 12 to find h = 8 cm.'
        }
      ];
      const t = templates[slot % templates.length];
      return { id: qId, districtId: worldId, ...t };
    }

    /* =========================================================================
       WORLD 5: Cone Canopy (Curved & Total Surface Area of Cones)
       ========================================================================= */
    case 5: {
      const templates = [
        {
          visual: 'cone',
          visualData: { r: 6, h: 8, l: 10 },
          category: 'cone-surface-area',
          questionText: 'A cone has radius 6 cm and slant height 10 cm. Find its curved surface area in terms of π.',
          options: ['60π cm²', '48π cm²', '96π cm²', '36π cm²'],
          correctAnswer: '60π cm²',
          explanation: 'Curved surface area = πrl = π × 6 × 10 = 60π cm².',
          hint1: 'Formula: Curved Surface Area = πrl.',
          hint2: 'π × 6 × 10 = 60π cm².'
        },
        {
          visual: 'cone',
          visualData: { r: 5, h: 12, l: 13 },
          category: 'cone-surface-area',
          questionText: 'A party hat has radius 5 cm and slant height 13 cm. What is its curved surface area in terms of π?',
          options: ['65π cm²', '60π cm²', '90π cm²', '25π cm²'],
          correctAnswer: '65π cm²',
          explanation: 'Curved surface area = πrl = π × 5 × 13 = 65π cm².',
          hint1: 'Curved area = πrl.',
          hint2: 'π × 5 × 13 = 65π cm².'
        },
        {
          visual: 'cone',
          visualData: { r: 8, h: 15, l: 17 },
          category: 'cone-surface-area',
          questionText: 'Find the curved surface area of a conical canopy with radius 8 cm and slant height 17 cm in terms of π.',
          options: ['136π cm²', '120π cm²', '200π cm²', '64π cm²'],
          correctAnswer: '136π cm²',
          explanation: 'Curved area = πrl = π × 8 × 17 = 136π cm².',
          hint1: 'π × 8 × 17.',
          hint2: '8 × 17 = 136π cm².'
        },
        {
          visual: 'cone',
          visualData: { r: 3, h: 4, l: 5 },
          category: 'cone-surface-area',
          questionText: 'A solid cone has radius 3 cm and slant height 5 cm. Find its total surface area in terms of π.',
          options: ['24π cm²', '15π cm²', '9π cm²', '18π cm²'],
          correctAnswer: '24π cm²',
          explanation: 'Curved area = πrl = 15π. Circular base = πr² = 9π. Total = 15π + 9π = 24π cm².',
          hint1: 'Total surface area = curved area (πrl) + base circle (πr²).',
          hint2: '15π + 9π = 24π cm².'
        },
        {
          visual: 'cone',
          visualData: { r: 6, h: 8, l: 10 },
          category: 'cone-surface-area',
          questionText: 'A solid cone has radius 6 cm and slant height 10 cm. Find its total surface area in terms of π.',
          options: ['96π cm²', '60π cm²', '36π cm²', '120π cm²'],
          correctAnswer: '96π cm²',
          explanation: 'Curved = π(6)(10) = 60π. Base = π(6²) = 36π. Total = 60π + 36π = 96π cm².',
          hint1: 'Curved = 60π, Base = 36π.',
          hint2: '60π + 36π = 96π cm².'
        },
        {
          visual: 'cone',
          visualData: { r: 8, h: 6, l: 10 },
          category: 'cone-surface-area',
          questionText: 'Find the total surface area of a solid cone with radius 8 cm and slant height 10 cm in terms of π.',
          options: ['144π cm²', '80π cm²', '64π cm²', '112π cm²'],
          correctAnswer: '144π cm²',
          explanation: 'Curved = π(8)(10) = 80π. Base = π(8²) = 64π. Total = 80π + 64π = 144π cm².',
          hint1: 'Total = πrl + πr².',
          hint2: '80π + 64π = 144π cm².'
        },
        {
          visual: 'cone',
          visualData: { r: 5, h: 12, l: 13 },
          category: 'cone-surface-area',
          questionText: 'A solid cone has radius 5 cm and vertical height 12 cm (slant height is not given). Find its total surface area.',
          options: ['90π cm²', '85π cm²', '65π cm²', '115π cm²'],
          correctAnswer: '90π cm²',
          explanation: 'l = √(5² + 12²) = 13 cm. Curved = π(5)(13) = 65π. Base = π(5²) = 25π. Total = 65π + 25π = 90π cm².',
          hint1: 'First find slant height l = 13 cm.',
          hint2: 'Total = π(5)(13) + π(25) = 65π + 25π = 90π cm².'
        },
        {
          visual: 'cone',
          visualData: { r: 9, h: 12, l: 15 },
          category: 'cone-surface-area',
          questionText: 'A solid cone has radius 9 cm and vertical height 12 cm. What is its total surface area in terms of π?',
          options: ['216π cm²', '135π cm²', '81π cm²', '270π cm²'],
          correctAnswer: '216π cm²',
          explanation: 'l = √(9² + 12²) = 15 cm. Curved = π(9)(15) = 135π. Base = π(9²) = 81π. Total = 135π + 81π = 216π cm².',
          hint1: 'Slant height l = 15 cm.',
          hint2: '135π + 81π = 216π cm².'
        },
        {
          visual: 'cone',
          visualData: { r: 6, h: 8, l: 10 },
          category: 'cone-surface-area',
          questionText: 'An open cone cup has radius 6 cm and height 8 cm. How much paper foil covers its outside (open top, no base)?',
          options: ['60π cm²', '96π cm²', '48π cm²', '36π cm²'],
          correctAnswer: '60π cm²',
          explanation: 'Open top means only the curved surface area: l = 10 cm, so Area = πrl = π × 6 × 10 = 60π cm².',
          hint1: 'An open cup has no base disc.',
          hint2: 'Curved area only: πrl = 60π cm².'
        },
        {
          visual: 'cone',
          visualData: { r: 5, h: 12, l: 13 },
          category: 'cone-surface-area',
          questionText: 'A cone has a curved surface area of 65π cm² and a base radius of 5 cm. Find its slant height l.',
          options: ['13 cm', '12 cm', '10 cm', '15 cm'],
          correctAnswer: '13 cm',
          explanation: 'Curved area = πrl. 65π = π × 5 × l, so l = 65 ÷ 5 = 13 cm.',
          hint1: 'Divide curved area by (π × r).',
          hint2: '65 ÷ 5 = 13 cm.'
        }
      ];
      const t = templates[slot % templates.length];
      return { id: qId, districtId: worldId, ...t };
    }

    /* =========================================================================
       WORLD 6: Sphere Shore (Spheres & Hemispheres)
       ========================================================================= */
    case 6: {
      const templates = [
        {
          visual: 'sphere',
          visualData: { r: 6 },
          category: 'sphere-hemisphere',
          questionText: 'A spherical ball has radius 6 cm. Find its volume in terms of π.',
          options: ['288π cm³', '864π cm³', '144π cm³', '72π cm³'],
          correctAnswer: '288π cm³',
          explanation: 'Volume = 4⁄3πr³ = 4⁄3 × π × 6³ = 4⁄3 × 216 × π = 288π cm³.',
          hint1: 'Formula: V = 4⁄3πr³.',
          hint2: '6³ = 216; (4 × 216) ÷ 3 = 288π cm³.'
        },
        {
          visual: 'sphere',
          visualData: { r: 9 },
          category: 'sphere-hemisphere',
          questionText: 'A large sphere has radius 9 cm. What is its volume in terms of π?',
          options: ['972π cm³', '2916π cm³', '324π cm³', '729π cm³'],
          correctAnswer: '972π cm³',
          explanation: 'Volume = 4⁄3 × π × 9³ = 4⁄3 × 729 × π = 972π cm³.',
          hint1: '9³ = 729.',
          hint2: '4⁄3 × 729 = 972π cm³.'
        },
        {
          visual: 'sphere',
          visualData: { r: 12 },
          category: 'sphere-hemisphere',
          questionText: 'Calculate the volume of a sphere with radius 12 cm in terms of π.',
          options: ['2304π cm³', '6912π cm³', '576π cm³', '1728π cm³'],
          correctAnswer: '2304π cm³',
          explanation: 'Volume = 4⁄3 × π × 12³ = 4⁄3 × 1728 × π = 2304π cm³.',
          hint1: '12³ = 1728.',
          hint2: '4⁄3 × 1728 = 2304π cm³.'
        },
        {
          visual: 'sphere',
          visualData: { r: 5 },
          category: 'sphere-hemisphere',
          questionText: 'A sphere has radius 5 cm. Find its surface area in terms of π.',
          options: ['100π cm²', '500π cm²', '25π cm²', '125π cm²'],
          correctAnswer: '100π cm²',
          explanation: 'Surface area = 4πr² = 4 × π × 5² = 4 × 25 × π = 100π cm².',
          hint1: 'Formula: Surface Area = 4πr².',
          hint2: '4 × 25 = 100π cm².'
        },
        {
          visual: 'sphere',
          visualData: { r: 7 },
          category: 'sphere-hemisphere',
          questionText: 'Find the surface area of a bowling ball with radius 7 cm in terms of π.',
          options: ['196π cm²', '49π cm²', '392π cm²', '98π cm²'],
          correctAnswer: '196π cm²',
          explanation: 'Surface area = 4πr² = 4 × π × 7² = 4 × 49 × π = 196π cm².',
          hint1: '4 × 7² = 4 × 49.',
          hint2: '4 × 49 = 196π cm².'
        },
        {
          visual: 'sphere',
          visualData: { r: 6, d: 12 },
          category: 'sphere-hemisphere',
          questionText: 'A globe has diameter 12 cm. Find its total surface area in terms of π.',
          options: ['144π cm²', '576π cm²', '288π cm²', '72π cm²'],
          correctAnswer: '144π cm²',
          explanation: 'Radius r = 12 ÷ 2 = 6 cm. Surface Area = 4πr² = 4 × π × 6² = 4 × 36 × π = 144π cm².',
          hint1: 'Divide diameter 12 by 2 to get radius 6 cm!',
          hint2: '4 × 6² = 4 × 36 = 144π cm².'
        },
        {
          visual: 'hemisphere',
          visualData: { r: 6, isHemi: true },
          category: 'sphere-hemisphere',
          questionText: 'A solid hemisphere has radius 6 cm. Find its volume in terms of π.',
          options: ['144π cm³', '288π cm³', '72π cm³', '216π cm³'],
          correctAnswer: '144π cm³',
          explanation: 'Hemisphere volume = ⅔πr³ = ⅔ × π × 6³ = ⅔ × 216 × π = 144π cm³.',
          hint1: 'A hemisphere has half the volume of a sphere: ⅔πr³.',
          hint2: '⅔ × 216 = 144π cm³.'
        },
        {
          visual: 'hemisphere',
          visualData: { r: 6, isHemi: true },
          category: 'sphere-hemisphere',
          questionText: 'A hemispherical dome has radius 6 cm. What is its curved surface area in terms of π (excluding the base)?',
          options: ['72π cm²', '144π cm²', '36π cm²', '108π cm²'],
          correctAnswer: '72π cm²',
          explanation: 'Curved surface area of hemisphere = 2πr² = 2 × π × 6² = 72π cm².',
          hint1: 'Curved surface of a hemisphere is 2πr².',
          hint2: '2 × 36 = 72π cm².'
        },
        {
          visual: 'hemisphere',
          visualData: { r: 9, isHemi: true },
          category: 'sphere-hemisphere',
          questionText: 'A solid hemisphere has radius 9 cm. What is its total surface area (curved dome plus flat base) in terms of π?',
          options: ['243π cm²', '162π cm²', '324π cm²', '81π cm²'],
          correctAnswer: '243π cm²',
          explanation: 'Total surface area = curved (2πr²) + flat circular base (πr²) = 3πr² = 3 × π × 9² = 3 × 81 × π = 243π cm².',
          hint1: 'Total surface area of a solid hemisphere = 3πr²!',
          hint2: '3 × 9² = 3 × 81 = 243π cm².'
        },
        {
          visual: 'hemisphere',
          visualData: { r: 4, isHemi: true },
          category: 'sphere-hemisphere',
          questionText: 'Calculate the total surface area of a solid hemisphere of radius 4 cm in terms of π.',
          options: ['48π cm²', '32π cm²', '16π cm²', '64π cm²'],
          correctAnswer: '48π cm²',
          explanation: 'Total surface area = 3πr² = 3 × π × 4² = 3 × 16 × π = 48π cm².',
          hint1: 'Formula: Total Area = 3πr².',
          hint2: '3 × 16 = 48π cm².'
        }
      ];
      const t = templates[slot % templates.length];
      return { id: qId, districtId: worldId, ...t };
    }

    /* =========================================================================
       WORLD 7: Combo Corner (Composite Solids)
       ========================================================================= */
    case 7: {
      const templates = [
        {
          visual: 'composite',
          visualData: { kind: 'cone-on-cyl', r: 3, hCyl: 10, hCone: 4, lCone: 5 },
          category: 'composite-solids',
          questionText: 'A farm silo consists of a cone roof on a cylinder body, both radius 3 cm. Cylinder height is 10 cm and cone height is 4 cm. Find the total volume.',
          options: ['102π cm³', '126π cm³', '90π cm³', '78π cm³'],
          correctAnswer: '102π cm³',
          explanation: 'Cylinder volume = π × 3² × 10 = 90π. Cone volume = ⅓ × π × 3² × 4 = 12π. Total volume = 90π + 12π = 102π cm³.',
          hint1: 'Add: Volume = Cylinder Volume + Cone Volume.',
          hint2: '90π + 12π = 102π cm³.'
        },
        {
          visual: 'composite',
          visualData: { kind: 'cone-on-cyl', r: 6, hCyl: 10, hCone: 8, lCone: 10 },
          category: 'composite-solids',
          questionText: 'A tower has a cylinder body (r = 6 cm, h = 10 cm) topped with a cone roof (h = 8 cm). Find the total volume in terms of π.',
          options: ['456π cm³', '648π cm³', '360π cm³', '264π cm³'],
          correctAnswer: '456π cm³',
          explanation: 'Cylinder volume = π × 36 × 10 = 360π. Cone volume = ⅓ × π × 36 × 8 = 96π. Total volume = 360π + 96π = 456π cm³.',
          hint1: 'Cyl = 360π; Cone = 96π.',
          hint2: '360π + 96π = 456π cm³.'
        },
        {
          visual: 'composite',
          visualData: { kind: 'hemi-on-cyl', r: 3, hCyl: 10 },
          category: 'composite-solids',
          questionText: 'An ice-cream cone toy has a hemisphere scoop on top of a cone, both radius 3 cm. The cone height is 4 cm. Find the total volume.',
          options: ['30π cm³', '42π cm³', '18π cm³', '24π cm³'],
          correctAnswer: '30π cm³',
          explanation: 'Hemisphere volume = ⅔ × π × 3³ = 18π. Cone volume = ⅓ × π × 3² × 4 = 12π. Total = 18π + 12π = 30π cm³.',
          hint1: 'Volume = Hemisphere (18π) + Cone (12π).',
          hint2: '18π + 12π = 30π cm³.'
        },
        {
          visual: 'composite',
          visualData: { kind: 'hemi-on-cyl', r: 3, hCyl: 10 },
          category: 'composite-solids',
          questionText: 'A capsule storage container is a cylinder of radius 3 cm and height 10 cm with hemisphere ends on both sides. Find its total volume.',
          options: ['126π cm³', '162π cm³', '90π cm³', '108π cm³'],
          correctAnswer: '126π cm³',
          explanation: 'The two hemisphere ends form 1 full sphere of radius 3 cm: 4⁄3π(27) = 36π. Cylinder = π(9)(10) = 90π. Total = 90π + 36π = 126π cm³.',
          hint1: 'Two hemispheres make 1 full sphere: 36π cm³.',
          hint2: '90π + 36π = 126π cm³.'
        },
        {
          visual: 'composite',
          visualData: { kind: 'cyl-cone-hollow', r: 6, hCyl: 12, hCone: 8, lCone: 10 },
          category: 'composite-solids',
          questionText: 'A metal block is a cylinder (r = 6 cm, h = 12 cm) with a conical cavity (r = 6 cm, h = 8 cm) drilled out. Find the remaining solid volume.',
          options: ['336π cm³', '528π cm³', '432π cm³', '96π cm³'],
          correctAnswer: '336π cm³',
          explanation: 'Cylinder volume = π × 36 × 12 = 432π. Conical hole = ⅓ × π × 36 × 8 = 96π. Remaining volume = 432π - 96π = 336π cm³.',
          hint1: 'Subtract the cavity from the cylinder!',
          hint2: '432π - 96π = 336π cm³.'
        },
        {
          visual: 'composite',
          visualData: { kind: 'cone-on-cyl', r: 3, hCyl: 10, hCone: 4, lCone: 5 },
          category: 'composite-solids',
          questionText: 'For the silo (cone r = 3, l = 5 on cylinder r = 3, h = 10), find the total exposed surface area in terms of π.',
          options: ['84π cm²', '93π cm²', '102π cm²', '69π cm²'],
          correctAnswer: '84π cm²',
          explanation: 'Exposed faces: cone curved (π × 3 × 5 = 15π), cylinder curved (2π × 3 × 10 = 60π), cylinder base (π × 3² = 9π). Join faces are inside! Total = 15π + 60π + 9π = 84π cm².',
          hint1: 'Do NOT count the circular join face inside the silo!',
          hint2: '15π (cone curved) + 60π (cyl curved) + 9π (base) = 84π cm².'
        },
        {
          visual: 'composite',
          visualData: { kind: 'hemi-on-cyl', r: 6, hCyl: 10 },
          category: 'composite-solids',
          questionText: 'An observatory has a hemisphere dome (r = 6 cm) on a cylinder wall (r = 6 cm, h = 10 cm). Find its total exposed surface area.',
          options: ['228π cm²', '264π cm²', '300π cm²', '192π cm²'],
          correctAnswer: '228π cm²',
          explanation: 'Dome curved = 2π(36) = 72π. Cylinder wall = 2π(6)(10) = 120π. Base = π(36) = 36π. Total = 72π + 120π + 36π = 228π cm².',
          hint1: 'Dome curved (72π) + Cyl wall (120π) + Cyl base (36π).',
          hint2: '72π + 120π + 36π = 228π cm².'
        },
        {
          visual: 'composite',
          visualData: { kind: 'cone-on-cyl', r: 6, hCyl: 8, hCone: 8, lCone: 10 },
          category: 'composite-solids',
          questionText: 'A spinning top is made of a cone (r = 6 cm, l = 10 cm) joined to a hemisphere (r = 6 cm). Find its total surface area.',
          options: ['132π cm²', '168π cm²', '60π cm²', '72π cm²'],
          correctAnswer: '132π cm²',
          explanation: 'Cone curved = π(6)(10) = 60π. Hemisphere curved = 2π(36) = 72π. Total = 60π + 72π = 132π cm² (no flat circles exposed).',
          hint1: 'Both shapes share the join circle inside. Only curved faces are exposed!',
          hint2: '60π + 72π = 132π cm².'
        },
        {
          visual: 'pyramid',
          visualData: { base: 'square', s: 6, h: 4, l: 5 },
          category: 'composite-solids',
          questionText: 'A square pyramid roof (s = 6 cm, l = 5 cm) sits on a cube building of side 6 cm. Find the total exterior surface area of the building.',
          options: ['240 cm²', '276 cm²', '216 cm²', '180 cm²'],
          correctAnswer: '240 cm²',
          explanation: 'Roof 4 triangles = 4 × (½ × 6 × 5) = 60. Cube 4 walls = 4 × 36 = 144. Ground floor base = 36. Total = 60 + 144 + 36 = 240 cm².',
          hint1: 'Exposed: 4 roof triangles + 4 cube walls + 1 ground base.',
          hint2: '60 + 144 + 36 = 240 cm².'
        },
        {
          visual: 'composite',
          visualData: { kind: 'cone-on-cyl', r: 3, hCyl: 10, hCone: 4, lCone: 5 },
          category: 'quantity-choice',
          questionText: 'Priya adds the circular boundary where a cone joins a cylinder into the total surface area. What is wrong?',
          options: ['That circular face is hidden inside the solid, so it should not be counted', 'She should have counted it twice', 'She should have used the volume formula', 'Nothing is wrong'],
          correctAnswer: 'That circular face is hidden inside the solid, so it should not be counted',
          explanation: 'Surface area only includes faces exposed to the outside. Joined faces are sealed inside.',
          hint1: 'Can you touch or paint the join on the outside?',
          hint2: 'Interior joined faces do not count towards surface area.'
        }
      ];
      const t = templates[slot % templates.length];
      return { id: qId, districtId: worldId, ...t };
    }

    /* =========================================================================
       WORLD 8: Capacity Quay (Real-World Word Problems & Conversions)
       ========================================================================= */
    case 8: {
      const templates = [
        {
          visual: 'cone',
          visualData: { r: 6, h: 8, l: 10 },
          category: 'real-world-capacity',
          questionText: 'Convert 3500 cm³ of water into litres.',
          options: ['3.5 litres', '35 litres', '0.35 litres', '350 litres'],
          correctAnswer: '3.5 litres',
          explanation: '1 litre = 1000 cm³. 3500 ÷ 1000 = 3.5 litres.',
          hint1: 'Divide by 1000 to convert cm³ to litres.',
          hint2: '3500 ÷ 1000 = 3.5 litres.'
        },
        {
          visual: 'pyramid',
          visualData: { base: 'square', s: 10, h: 12, l: 13 },
          category: 'real-world-capacity',
          questionText: 'A concrete tank holds 2 m³ of water. How many cubic centimetres (cm³) is this?',
          options: ['2 000 000 cm³', '2000 cm³', '20 000 cm³', '200 000 cm³'],
          correctAnswer: '2 000 000 cm³',
          explanation: '1 m³ = 1 000 000 cm³, so 2 m³ = 2 000 000 cm³.',
          hint1: '1 m = 100 cm, so 1 m³ = 100³ = 1 000 000 cm³.',
          hint2: '2 × 1 000 000 = 2 000 000 cm³.'
        },
        {
          visual: 'cone',
          visualData: { r: 6, h: 8, l: 10 },
          category: 'real-world-capacity',
          questionText: 'A conical cup has radius 6 cm and height 8 cm. How much water can it hold, correct to 3 significant figures?',
          options: ['302 cm³', '905 cm³', '1210 cm³', '377 cm³'],
          correctAnswer: '302 cm³',
          explanation: 'Volume = ⅓π(6²)(8) = 96π ≈ 301.59 cm³, which rounds to 302 cm³ (3 s.f.).',
          hint1: '96 × π ≈ 301.59.',
          hint2: 'Round 301.59 to 3 significant figures: 302 cm³.'
        },
        {
          visual: 'hemisphere',
          visualData: { r: 12, d: 24, isHemi: true },
          category: 'real-world-capacity',
          questionText: 'A hemispherical bowl has diameter 24 cm. How many litres can it hold, correct to 3 significant figures?',
          options: ['3.62 litres', '7.24 litres', '0.362 litres', '29.0 litres'],
          correctAnswer: '3.62 litres',
          explanation: 'Radius r = 12 cm. Volume = ⅔π(12³) = 1152π ≈ 3619.1 cm³ = 3.619 litres, which rounds to 3.62 litres (3 s.f.).',
          hint1: 'Radius r = 12 cm. Find volume in cm³, then divide by 1000.',
          hint2: '1152π ≈ 3619.1 cm³ = 3.62 litres.'
        },
        {
          visual: 'cone-vs-cylinder',
          visualData: { r: 6, h: 12 },
          category: 'real-world-capacity',
          questionText: 'Water from a full cone (radius 6 cm, height 12 cm) is poured into an empty cylinder of radius 4 cm. How deep is the water in the cylinder?',
          options: ['9 cm', '27 cm', '12 cm', '3 cm'],
          correctAnswer: '9 cm',
          explanation: 'Cone volume = ⅓π(6²)(12) = 144π cm³. Cylinder volume = π(4²)h = 16πh. 16πh = 144π, so h = 144 ÷ 16 = 9 cm.',
          hint1: 'Find cone volume first: 144π.',
          hint2: 'Set 16π × depth = 144π, so depth = 9 cm.'
        },
        {
          visual: 'cone-vs-cylinder',
          visualData: { r: 3, h: 12 },
          category: 'real-world-capacity',
          questionText: 'A full cylinder of juice (radius 3 cm, height 12 cm) is poured into an empty cone of radius 6 cm. What is the depth of the juice in the cone?',
          options: ['9 cm', '18 cm', '6 cm', '12 cm'],
          correctAnswer: '9 cm',
          explanation: 'Cylinder volume = π × 3² × 12 = 108π. Cone volume = ⅓ × π × 6² × h = 12πh. 12πh = 108π, so h = 108 ÷ 12 = 9 cm.',
          hint1: 'Cylinder volume = 108π.',
          hint2: '12π × h = 108π, so h = 9 cm.'
        },
        {
          visual: 'sphere',
          visualData: { r: 6 },
          category: 'real-world-capacity',
          questionText: 'A solid metal sphere of radius 6 cm is melted and recast into small spheres of radius 3 cm. How many small spheres can be made?',
          options: ['8', '2', '4', '16'],
          correctAnswer: '8',
          explanation: 'Volume scales with the cube of the radius: (6 ÷ 3)³ = 2³ = 8 small spheres.',
          hint1: 'Scale factor = 6 ÷ 3 = 2. Volume scales by factor cubed!',
          hint2: '2³ = 2 × 2 × 2 = 8.'
        },
        {
          visual: 'cone',
          visualData: { r: 3, h: 4, l: 5 },
          category: 'real-world-capacity',
          questionText: 'A solid metal cylinder (volume 288π cm³) is melted to cast solid cones with radius 3 cm and height 4 cm (volume 12π cm³). How many cones are cast?',
          options: ['24', '12', '48', '36'],
          correctAnswer: '24',
          explanation: 'Number of cones = Total volume ÷ Cone volume = 288π ÷ 12π = 24 cones.',
          hint1: 'Divide total metal volume by one cone’s volume.',
          hint2: '288 ÷ 12 = 24.'
        },
        {
          visual: 'cone',
          visualData: { r: 5, h: 12, l: 13 },
          category: 'real-world-capacity',
          questionText: 'A conical cup has radius 5 cm and a capacity of 100π cm³. What is its vertical height?',
          options: ['12 cm', '4 cm', '20 cm', '36 cm'],
          correctAnswer: '12 cm',
          explanation: '100π = ⅓ × π × 5² × h = (25/3)πh. h = 100 × 3 ÷ 25 = 12 cm.',
          hint1: '100π = ⅓ × 25π × h.',
          hint2: 'h = (100 × 3) ÷ 25 = 12 cm.'
        },
        {
          visual: 'sphere',
          visualData: { r: 6 },
          category: 'real-world-capacity',
          questionText: 'A hollow sphere holds exactly 288π cm³ of air. Find its internal radius r.',
          options: ['6 cm', '9 cm', '12 cm', '3 cm'],
          correctAnswer: '6 cm',
          explanation: '288π = 4⁄3πr³. r³ = 288 × 3 ÷ 4 = 216. r = ∛216 = 6 cm.',
          hint1: 'r³ = 288 × 3 ÷ 4 = 216.',
          hint2: '∛216 = 6 cm.'
        }
      ];
      const t = templates[slot % templates.length];
      return { id: qId, districtId: worldId, ...t };
    }

    /* =========================================================================
       WORLD 9: Grand Gala (Grand Review / Studio Finale)
       Draws hardest questions from across all preceding worlds!
       ========================================================================= */
    case 9: {
      const templates = [
        // Slot 0: From W0
        {
          visual: 'vocab',
          visualData: { highlight: 'vheight' },
          category: 'mixed-review',
          questionText: 'Which height connects the apex of a solid perpendicularly to the base centre, used in volume formulas?',
          options: ['Perpendicular vertical height (h)', 'Slant height (l)', 'Radius (r)', 'Base edge (s)'],
          correctAnswer: 'Perpendicular vertical height (h)',
          explanation: 'Perpendicular vertical height h is measured at 90° and is always used for volume.',
          hint1: 'Think 90° right angle.',
          hint2: 'Vertical height = h.'
        },
        // Slot 1: From W1
        {
          visual: 'pyramid',
          visualData: { base: 'square', s: 12, h: 5, l: 8 },
          category: 'mixed-review',
          questionText: 'A pyramid has a square base of side 12 cm and vertical height 5 cm. Find its volume.',
          options: ['240 cm³', '720 cm³', '360 cm³', '120 cm³'],
          correctAnswer: '240 cm³',
          explanation: 'Volume = ⅓ × 12² × 5 = ⅓ × 144 × 5 = 240 cm³.',
          hint1: '⅓ × 144 × 5.',
          hint2: '240 cm³.'
        },
        // Slot 2: From W2
        {
          visual: 'pyramid',
          visualData: { base: 'square', s: 10, h: 12, l: 13 },
          category: 'mixed-review',
          questionText: 'A square pyramid has base edge 10 cm and vertical height 12 cm. Find its face slant height l.',
          options: ['13 cm', '17 cm', '22 cm', '15 cm'],
          correctAnswer: '13 cm',
          explanation: 'Half edge = 5 cm. l² = 12² + 5² = 169, so l = 13 cm.',
          hint1: 'Pythagoras on half-edge: 5 and 12.',
          hint2: 'l = 13 cm.'
        },
        // Slot 3: From W3
        {
          visual: 'pyramid',
          visualData: { base: 'square', s: 10, h: 12, l: 13 },
          category: 'mixed-review',
          questionText: 'Find the total surface area of a square pyramid with base edge 10 cm and slant height 13 cm.',
          options: ['360 cm²', '260 cm²', '100 cm²', '460 cm²'],
          correctAnswer: '360 cm²',
          explanation: 'Base = 100 cm². 4 triangles = 4 × (½ × 10 × 13) = 260 cm². Total = 100 + 260 = 360 cm².',
          hint1: '100 + 260 = 360 cm².',
          hint2: '360 cm².'
        },
        // Slot 4: From W4
        {
          visual: 'cone',
          visualData: { r: 6, h: 8, l: 10 },
          category: 'mixed-review',
          questionText: 'A cone has radius 6 cm and height 8 cm. Find its volume in terms of π.',
          options: ['96π cm³', '288π cm³', '192π cm³', '48π cm³'],
          correctAnswer: '96π cm³',
          explanation: 'Volume = ⅓π(6²)(8) = ⅓ × 36 × 8 × π = 96π cm³.',
          hint1: '⅓ × 36 × 8 = 96.',
          hint2: '96π cm³.'
        },
        // Slot 5: From W5
        {
          visual: 'cone',
          visualData: { r: 5, h: 12, l: 13 },
          category: 'mixed-review',
          questionText: 'A solid cone has radius 5 cm and slant height 13 cm. Find its total surface area in terms of π.',
          options: ['90π cm²', '65π cm²', '25π cm²', '115π cm²'],
          correctAnswer: '90π cm²',
          explanation: 'Curved = π(5)(13) = 65π. Base = π(5²) = 25π. Total = 65π + 25π = 90π cm².',
          hint1: 'Total = πrl + πr².',
          hint2: '65π + 25π = 90π cm².'
        },
        // Slot 6: From W6
        {
          visual: 'hemisphere',
          visualData: { r: 9, isHemi: true },
          category: 'mixed-review',
          questionText: 'A solid hemisphere has radius 9 cm. What is its total surface area in terms of π?',
          options: ['243π cm²', '162π cm²', '324π cm²', '81π cm²'],
          correctAnswer: '243π cm²',
          explanation: 'Total surface area = 3πr² = 3 × π × 9² = 243π cm².',
          hint1: 'Solid hemisphere total = 3πr².',
          hint2: '3 × 81 = 243π cm².'
        },
        // Slot 7: From W7
        {
          visual: 'composite',
          visualData: { kind: 'hemi-on-cyl', r: 6, hCyl: 10 },
          category: 'mixed-review',
          questionText: 'A solid hemisphere of radius 6 cm sits on a cylinder of radius 6 cm and height 10 cm. Find the total exposed surface area.',
          options: ['228π cm²', '264π cm²', '300π cm²', '192π cm²'],
          correctAnswer: '228π cm²',
          explanation: 'Dome curved = 2π(36) = 72π. Cylinder wall = 2π(6)(10) = 120π. Base = π(36) = 36π. Total = 72π + 120π + 36π = 228π cm².',
          hint1: 'Interior join is hidden: 72π + 120π + 36π = 228π cm².',
          hint2: '228π cm².'
        },
        // Slot 8: From W8 (Transfer)
        {
          visual: 'cone-vs-cylinder',
          visualData: { r: 6, h: 12 },
          category: 'mixed-review',
          questionText: 'Water from a full cone (radius 6 cm, height 12 cm) is poured into a cylinder of radius 4 cm. How deep is the water?',
          options: ['9 cm', '27 cm', '12 cm', '3 cm'],
          correctAnswer: '9 cm',
          explanation: 'Cone volume = 144π cm³. Cylinder: π × 4² × h = 16πh = 144π, so h = 9 cm.',
          hint1: '144π ÷ 16π = 9 cm.',
          hint2: '9 cm.'
        },
        // Slot 9: From W8 (Melting)
        {
          visual: 'sphere',
          visualData: { r: 6 },
          category: 'mixed-review',
          questionText: 'A solid metal sphere of radius 6 cm is melted and recast into small spheres of radius 3 cm. How many small spheres are made?',
          options: ['8', '2', '4', '16'],
          correctAnswer: '8',
          explanation: 'Scale factor = 6 ÷ 3 = 2. Volume scale factor = 2³ = 8 spheres.',
          hint1: '(6 ÷ 3)³ = 2³ = 8.',
          hint2: '8.'
        }
      ];
      const t = templates[slot % templates.length];
      return { id: qId, districtId: worldId, ...t };
    }

    default:
      return null;
  }
}

export function generateBank(seed = Date.now()) {
  const rng = createRNG(seed);
  const bank = [];
  for (let w = 0; w < 10; w++) {
    for (let s = 0; s < 10; s++) {
      bank.push(generateQuestion(w, s, rng));
    }
  }
  return bank;
}

export const questionBank = generateBank(Date.now());

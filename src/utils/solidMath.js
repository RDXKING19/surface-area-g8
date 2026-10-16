/**
 * Single source of mathematical truth for SolidQuest (Grade 8)
 * Adheres strictly to Singapore MOE Sec 2 standards:
 * - Curated Pythagorean triples (no surds in slant heights)
 * - Exact integer coefficients of pi
 * - Convention-robust 3 significant figures
 * - Composite solid decomposition
 */

export const PI_CALC = Math.PI;
export const PI_ALT = 3.142; // Acceptable alternative per PRD §3.3
export const sum = arr => arr.reduce((s, x) => s + x, 0);

/* ---- Curated Pythagorean tables: slant heights are ALWAYS whole numbers ---- */
// Cone triples: [r, h, l] where l² = r² + h²
export const CONE_TRIPLES = [
  [3, 4, 5],
  [4, 3, 5],
  [6, 8, 10],
  [8, 6, 10],
  [5, 12, 13],
  [12, 5, 13],
  [9, 12, 15],
  [12, 9, 15],
  [8, 15, 17],
  [15, 8, 17],
  [12, 16, 20],
  [16, 12, 20],
  [7, 24, 25],
  [24, 7, 25],
  [10, 24, 26],
  [15, 20, 25],
  [20, 15, 25]
];

// Square Pyramids: base edge s, vertical height h, slant height of face l
// where l² = h² + (s/2)²
export const SQ_PYRAMIDS = [
  { s: 6, h: 4, l: 5 },
  { s: 8, h: 3, l: 5 },
  { s: 10, h: 12, l: 13 },
  { s: 12, h: 8, l: 10 },
  { s: 16, h: 6, l: 10 },
  { s: 24, h: 5, l: 13 },
  { s: 16, h: 15, l: 17 },
  { s: 18, h: 12, l: 15 },
  { s: 24, h: 9, l: 15 },
  { s: 30, h: 8, l: 17 },
  { s: 24, h: 16, l: 20 },
  { s: 14, h: 24, l: 25 }
];

// Rectangular Pyramids: base dimensions a x b, vertical height h
// Face on edge a has slant height lA = √(h² + (b/2)²)
// Face on edge b has slant height lB = √(h² + (a/2)²)
export const RECT_PYRAMIDS = [
  { a: 10, b: 18, h: 12, lA: 15, lB: 13 },
  { a: 12, b: 30, h: 8, lA: 17, lB: 10 },
  { a: 14, b: 20, h: 24, lA: 26, lB: 25 },
  { a: 16, b: 30, h: 15, lA: 17, lB: 25 },
  { a: 18, b: 32, h: 12, lA: 20, lB: 15 }
];

// Triangular-base pyramids (Right-angled triangle base with legs p, q)
// Base area = (p * q) / 2
// Volume = (1/3) * (p * q / 2) * h = (p * q * h) / 6 (must be integer)
export const TRI_BASE_PYRAMIDS = [
  { p: 6, q: 8, h: 9, baseArea: 24, v: 72 },
  { p: 6, q: 10, h: 12, baseArea: 30, v: 120 },
  { p: 9, q: 12, h: 10, baseArea: 54, v: 180 },
  { p: 5, q: 12, h: 6, baseArea: 30, v: 60 },
  { p: 8, q: 15, h: 9, baseArea: 60, v: 180 }
];

export const SPHERE_R_VOLUME = [3, 6, 9, 12]; // 3 | r ensures 4/3 * r³ is integer
export const SPHERE_R_AREA = [2, 3, 4, 5, 6, 7, 8, 9, 10, 12];
export const HEMI_R = [3, 6, 9, 12]; // 2/3 * r³ is integer when 3 | r

/* ---- Exact calculation helpers (return integers or integer coefficients of π) ---- */
export const pyramidV = (baseArea, h) => Math.round((baseArea * h) / 3);
export const coneVpi = (r, h) => Math.round((r * r * h) / 3); // × π
export const coneCurvedPi = (r, l) => r * l; // × π
export const coneTotalPi = (r, l) => r * l + r * r; // × π
export const sphereVpi = r => Math.round((4 * Math.pow(r, 3)) / 3); // × π
export const sphereAPi = r => 4 * r * r; // × π
export const hemiVpi = r => Math.round((2 * Math.pow(r, 3)) / 3); // × π
export const hemiCurvedPi = r => 2 * r * r; // × π
export const hemiTotalPi = r => 3 * r * r; // × π (2πr² curved + πr² flat base)
export const cylVpi = (r, h) => r * r * h; // × π
export const cylCurvedPi = (r, h) => 2 * r * h; // × π
export const cylTotalPi = (r, h) => 2 * r * h + 2 * r * r; // × π

export const slantFrom = (leg, h) => Math.round(Math.sqrt(leg * leg + h * h));
export const isWhole = x => Number.isInteger(x);

/* ---- Units & Conversions ---- */
export const CM3_PER_LITRE = 1000;
export const CM3_PER_M3 = 1000000;
export const cm3ToLitres = v => v / CM3_PER_LITRE;

/* ---- Convention-robust 3 Significant Figures ---- */
export const sf3 = x => Number(Number(x).toPrecision(3));
export const fmtSf3 = x => {
  const n = Number(x);
  if (isNaN(n)) return '';
  return String(Number(n.toPrecision(3)));
};

export function robust3sf(coeffOfPi, scale = 1) {
  const a = fmtSf3(coeffOfPi * PI_CALC * scale);
  const b = fmtSf3(coeffOfPi * PI_ALT * scale);
  return a === b ? a : null; // null => re-roll
}

/* ---- Composite Solid Builder & Validator ---- */
export function buildComposite(kind, params = {}) {
  switch (kind) {
    case 'cone-on-cyl': {
      // Cone on top of a cylinder, same radius r
      const r = params.r || 3;
      const hCyl = params.hCyl || 10;
      const hCone = params.hCone || 4;
      const lCone = params.lCone || 5;

      const vCone = coneVpi(r, hCone);
      const vCyl = cylVpi(r, hCyl);
      const volumePi = vCone + vCyl;

      // Surface area: cone curved + cylinder curved + cylinder bottom base
      // (The shared circle between cone and cylinder is HIDDEN)
      const aConeCurved = coneCurvedPi(r, lCone);
      const aCylCurved = cylCurvedPi(r, hCyl);
      const aCylBase = r * r;
      const surfacePi = aConeCurved + aCylCurved + aCylBase;

      const faces = [
        { id: 'cone-curved', label: 'Cone Curved Surface', formula: 'πrl', coeffPi: aConeCurved, exposed: true },
        { id: 'cyl-curved', label: 'Cylinder Curved Wall', formula: '2πrh', coeffPi: aCylCurved, exposed: true },
        { id: 'cyl-base', label: 'Cylinder Bottom Base', formula: 'πr²', coeffPi: aCylBase, exposed: true },
        { id: 'cone-base', label: 'Cone Bottom Base (Join)', formula: 'πr²', coeffPi: r * r, exposed: false },
        { id: 'cyl-top', label: 'Cylinder Top Lid (Join)', formula: 'πr²', coeffPi: r * r, exposed: false }
      ];

      return {
        kind,
        r,
        hCyl,
        hCone,
        lCone,
        vCone,
        vCyl,
        volumePi,
        surfacePi,
        faces
      };
    }

    case 'hemi-on-cyl': {
      // Hemisphere dome on top of a cylinder
      const r = params.r || 6;
      const hCyl = params.hCyl || 10;

      const vHemi = hemiVpi(r);
      const vCyl = cylVpi(r, hCyl);
      const volumePi = vHemi + vCyl;

      // Surface area: hemisphere dome (2πr²) + cylinder curved (2πrh) + cylinder base (πr²)
      const aHemiCurved = hemiCurvedPi(r);
      const aCylCurved = cylCurvedPi(r, hCyl);
      const aCylBase = r * r;
      const surfacePi = aHemiCurved + aCylCurved + aCylBase;

      const faces = [
        { id: 'hemi-curved', label: 'Hemisphere Dome Surface', formula: '2πr²', coeffPi: aHemiCurved, exposed: true },
        { id: 'cyl-curved', label: 'Cylinder Curved Wall', formula: '2πrh', coeffPi: aCylCurved, exposed: true },
        { id: 'cyl-base', label: 'Cylinder Bottom Base', formula: 'πr²', coeffPi: aCylBase, exposed: true },
        { id: 'hemi-flat', label: 'Dome Flat Face (Join)', formula: 'πr²', coeffPi: r * r, exposed: false },
        { id: 'cyl-top', label: 'Cylinder Top Face (Join)', formula: 'πr²', coeffPi: r * r, exposed: false }
      ];

      return {
        kind,
        r,
        hCyl,
        vHemi,
        vCyl,
        volumePi,
        surfacePi,
        faces
      };
    }

    case 'cyl-cone-hollow': {
      // Cylinder with conical cavity scooped out
      const r = params.r || 6;
      const hCyl = params.hCyl || 12;
      const hCone = params.hCone || 8;
      const lCone = params.lCone || 10;

      const vCyl = cylVpi(r, hCyl);
      const vCone = coneVpi(r, hCone);
      const volumePi = vCyl - vCone; // SUBTRACTIVE

      return {
        kind,
        r,
        hCyl,
        hCone,
        lCone,
        vCyl,
        vCone,
        volumePi
      };
    }

    default:
      return null;
  }
}

export function validateComposite(c) {
  if (!c) return false;
  if (c.kind === 'cone-on-cyl') {
    return c.volumePi === c.vCone + c.vCyl;
  }
  if (c.kind === 'hemi-on-cyl') {
    return c.volumePi === c.vHemi + c.vCyl;
  }
  if (c.kind === 'cyl-cone-hollow') {
    return c.volumePi === c.vCyl - c.vCone;
  }
  return true;
}

/* ---- Distractor generation helper ---- */
export function makeDistractors(correct, misconceptions = [], rng = Math.random, count = 3) {
  const set = new Set();
  const cStr = String(correct).trim();

  // Add realistic misconception distractors first
  for (const m of misconceptions) {
    if (m === undefined || m === null) continue;
    const s = String(m).trim();
    if (s && s !== cStr && !set.has(s)) {
      set.add(s);
      if (set.size >= count) break;
    }
  }

  // If numeric or string with unit, generate nearby plausible alternatives
  const matchNum = cStr.match(/^([\d.]+)(.*)$/);
  if (matchNum && set.size < count) {
    const num = parseFloat(matchNum[1]);
    const suffix = matchNum[2];
    const steps = [1.5, 0.5, 2, 0.75, 3, 1.25, 0.8];

    for (const step of steps) {
      if (set.size >= count) break;
      const candNum = Math.round(num * step);
      const cand = `${candNum}${suffix}`;
      if (cand !== cStr && !set.has(cand) && candNum > 0) {
        set.add(cand);
      }
    }
  }

  // Fallback if needed
  let fallbackCount = 1;
  while (set.size < count) {
    const val = `${correct} (${fallbackCount + 1})`;
    set.add(val);
    fallbackCount++;
  }

  return Array.from(set).slice(0, count);
}

/* ---- Coincidence Guard ---- */
export function guardCoincidence(q) {
  // Reject questions where correct coefficient equals a distractor from a different quantity
  // e.g. sphere r = 3 has V = 36π and A = 36π
  if (!q || !q.visualData) return true;
  const d = q.visualData;
  if (d.r === 3 && (d.shape === 'sphere' || d.type === 'sphere')) {
    // sphere radius 3 has volume 36π and area 36π
    return false;
  }
  return true;
}

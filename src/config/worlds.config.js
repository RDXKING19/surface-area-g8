/**
 * 10 Studio Worlds for SolidQuest (Grade 8)
 * Populated from PRD §8
 */

export const WORLDS = [
  {
    id: 0,
    name: 'Parts Plaza',
    emoji: '🧩',
    accent: '#f472b6',
    conceptFocus: 'solid-parts-units',
    description: 'Name the parts of solids, tell vertical height from slant height, radius from diameter, and pick cm, cm², or cm³.',
    boss: {
      name: 'The Label Mixer',
      emoji: '🏷️',
      reward: 'Labels Locked In'
    }
  },
  {
    id: 1,
    name: 'Pyramid Point',
    emoji: '🔺',
    accent: '#fb923c',
    conceptFocus: 'pyramid-volume',
    description: 'Volume of right pyramids with square, rectangular, and triangular bases (⅓ × base area × vertical height).',
    boss: {
      name: 'The Missing Third',
      emoji: '🧩',
      reward: 'Third Finder'
    }
  },
  {
    id: 2,
    name: 'Slant Summit',
    emoji: '⛰️',
    accent: '#fbbf24',
    conceptFocus: 'slant-height',
    description: 'Find slant heights of pyramids and cones with Pythagoras; choose between height and slant height.',
    boss: {
      name: 'The Slippery Slant',
      emoji: '🛝',
      reward: 'Slant Solver'
    }
  },
  {
    id: 3,
    name: 'Pyramid Panels',
    emoji: '🏛️',
    accent: '#4ade80',
    conceptFocus: 'pyramid-surface-area',
    description: 'Total surface area of square and rectangular right pyramids (base area + triangular sloping faces).',
    boss: {
      name: 'The Face Forgetter',
      emoji: '🎭',
      reward: 'Every Face Counted'
    }
  },
  {
    id: 4,
    name: 'Cone Cove',
    emoji: '🍦',
    accent: '#38bdf8',
    conceptFocus: 'cone-volume',
    description: 'Volume of cones in terms of π (⅓πr²h), including when diameter or slant height is given.',
    boss: {
      name: 'The Cone Crusher',
      emoji: '🚧',
      reward: 'Cone Commander'
    }
  },
  {
    id: 5,
    name: 'Cone Canopy',
    emoji: '🎪',
    accent: '#818cf8',
    conceptFocus: 'cone-surface-area',
    description: 'Curved surface area (πrl) and total surface area (πr² + πrl) of cones in terms of π.',
    boss: {
      name: 'The Curved Cutter',
      emoji: '✂️',
      reward: 'Canopy Champion'
    }
  },
  {
    id: 6,
    name: 'Sphere Shore',
    emoji: '🏀',
    accent: '#c084fc',
    conceptFocus: 'sphere-hemisphere',
    description: 'Volume and surface area of spheres (4⁄3πr³, 4πr²) and hemispheres (curved 2πr², total 3πr²).',
    boss: {
      name: 'The Round Rascal',
      emoji: '⚽',
      reward: 'Sphere Specialist'
    }
  },
  {
    id: 7,
    name: 'Combo Corner',
    emoji: '🏰',
    accent: '#22d3ee',
    conceptFocus: 'composite-solids',
    description: 'Composite solids: add or subtract volumes, and count only the exposed surface areas.',
    boss: {
      name: 'The Hidden-Face Hider',
      emoji: '🕵️',
      reward: 'Combo Master'
    }
  },
  {
    id: 8,
    name: 'Capacity Quay',
    emoji: '🚰',
    accent: '#facc15',
    conceptFocus: 'real-world-capacity',
    description: 'Real-world word problems: capacity and unit conversion, liquid transfer, recasting, and unknown dimensions.',
    boss: {
      name: 'Spill-Over Sam',
      emoji: '🥤',
      reward: 'Capacity Captain'
    }
  },
  {
    id: 9,
    name: 'Grand Gala',
    emoji: '🏆',
    accent: '#f43f5e',
    conceptFocus: 'mixed-review',
    description: 'The ultimate studio grand opening commission challenge: mixes all concepts from across the studio!',
    boss: {
      name: 'The Grand Contractor',
      emoji: '🏗️',
      reward: 'Studio Legend'
    }
  }
];

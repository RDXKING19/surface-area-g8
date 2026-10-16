/**
 * 4-Slide Story Content for SolidQuest (Grade 8)
 * Designed for compact viewport card layout without scrolling.
 */

export const STORY_PANELS = [
  {
    panel: 1,
    id: 'first-commission',
    title: 'The First Commission',
    character: 'Priya',
    characterEmoji: '👧',
    text: 'At The Solid Design Studio, Priya and Jun Hao receive their first client order: a dessert stall ordering waffle cone cups and straight drink tumblers of the exact same width and height. The client asks two core questions: how much does each hold, and how much material wraps each one? Filling is volume. Covering is surface area.',
    highlight: 'Volume is filling capacity. Surface area is covering wrapper.',
    bubble: 'A straight cylinder holds base area × vertical height (V = πr²h). Now let’s investigate pointed solids!',
    image: '/assets/story/story_1.png',
    imageBg: '#311042',
    imageEmoji: '🍦'
  },
  {
    panel: 2,
    id: 'pointy-third-heights',
    title: 'The Pointy Third & Two Heights',
    character: 'Jun Hao',
    characterEmoji: '👦',
    text: 'Foreman Tally pours a sand-filled pyramid into a box with matching base and vertical height: exactly three pours fill it! Pointed solids (pyramids and cones) hold one third: V = ⅓ × base area × h. But watch out: volume uses vertical perpendicular height (h), while sloping faces use slant height (l) found with Pythagoras: l² = r² + h² or l² = h² + (s/2)²!',
    highlight: 'Volume uses vertical height (⅓ base × h). Sloping surface uses slant height (l).',
    bubble: 'Cone: V = ⅓πr²h, curved surface = πrl, total surface = πr² + πrl.',
    image: '/assets/story/story_2.png',
    imageBg: '#1f2937',
    imageEmoji: '🔺'
  },
  {
    panel: 3,
    id: 'perfect-sphere',
    title: 'The Perfect Sphere & Hemispheres',
    character: 'Priya',
    characterEmoji: '👧',
    text: 'Next, the dome reservoir commission! A solid sphere of radius r has volume 4⁄3πr³ and surface area 4πr². It holds two thirds of the cylinder that fits snugly around it. When cut in half, a hemisphere holds ⅔πr³ with curved surface 2πr². But don’t forget the flat circular base: total surface area of a solid hemisphere is 3πr²!',
    highlight: 'Sphere: V = 4⁄3πr³, A = 4πr². Solid Hemisphere total surface area = 3πr².',
    bubble: 'Half a ball gets a flat circular lid — always count the flat face in total surface area!',
    image: '/assets/story/story_3.png',
    imageBg: '#1e1b4b',
    imageEmoji: '🏀'
  },
  {
    panel: 4,
    id: 'composites-launch',
    title: 'Composites & Workshop Launch',
    character: 'Foreman Tally',
    characterEmoji: '🦉',
    text: 'Real architectural orders combine solids into composite shapes! For total volume, simply add the parts (or subtract hollows). For total surface area, count ONLY the exposed exterior faces you can touch — faces joined together inside are hidden and do not count! Also remember: 1 litre = 1000 cm³ and 1 m³ = 1 000 000 cm³. Hard hats on!',
    highlight: 'Add volumes. Count only exposed surfaces — hidden interior join faces do not count!',
    bubble: 'Your design toolkit is fully certified. Grab your tape measure and step into the Workshop!',
    image: '/assets/story/story_4.png',
    imageBg: '#142738',
    imageEmoji: '🏆'
  }
];

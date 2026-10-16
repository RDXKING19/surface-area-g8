/**
 * Spoken narration engine for SolidQuest (Grade 8)
 * Strict 1:1 parity with on-screen text, converted to natural spoken English
 * per Singapore MOE Grade 8 / Sec 2 pedagogical standard.
 */

export const say = text => ({ text: speak(text), style: 'statement' });
export const ask = text => ({ text: speak(text), style: 'question' });
export const cheer = text => ({ text: speak(text), style: 'encouragement' });
export const emphasize = text => ({ text: speak(text), style: 'emphasis' });
export const think = text => ({ text: speak(text), style: 'thinking' });
export const instruct = text => ({ text: speak(text), style: 'instruction' });
export const celebrate = text => ({ text: speak(text), style: 'celebration' });

const ONES = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
const TEENS = ['ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
const TENS = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];

export function numberToWords(num) {
  if (num === 0 || num === '0') return 'zero';
  const str = String(num).replace(/,/g, '').trim();

  // Handle decimals
  if (str.includes('.')) {
    const [whole, dec] = str.split('.');
    const wholeWords = numberToWords(parseInt(whole, 10));
    const decWords = dec.split('').map(d => ONES[parseInt(d, 10)] || 'zero').join(' ');
    return `${wholeWords} point ${decWords}`;
  }

  const n = parseInt(str, 10);
  if (isNaN(n)) return str;
  if (n < 0) return `negative ${numberToWords(-n)}`;
  if (n < 10) return ONES[n];
  if (n < 20) return TEENS[n - 10];
  if (n < 100) {
    const tensPart = TENS[Math.floor(n / 10)];
    const onesPart = ONES[n % 10];
    return onesPart ? `${tensPart}-${onesPart}` : tensPart;
  }
  if (n < 1000) {
    const hundredPart = `${ONES[Math.floor(n / 100)]} hundred`;
    const rem = n % 100;
    return rem ? `${hundredPart} and ${numberToWords(rem)}` : hundredPart;
  }
  if (n < 1000000) {
    const thousandPart = `${numberToWords(Math.floor(n / 1000))} thousand`;
    const rem = n % 1000;
    if (!rem) return thousandPart;
    if (rem < 100) return `${thousandPart} and ${numberToWords(rem)}`;
    return `${thousandPart}, ${numberToWords(rem)}`;
  }
  if (n < 1000000000) {
    const millionPart = `${numberToWords(Math.floor(n / 1000000))} million`;
    const rem = n % 1000000;
    if (!rem) return millionPart;
    return `${millionPart}, ${numberToWords(rem)}`;
  }
  return str;
}

/**
 * Normalises mathematical notation into natural British English speech.
 */
export function speak(text) {
  if (!text) return '';
  let s = String(text);

  // Replace symbols and formulas
  s = s.replace(/4⁄3πr³/g, 'four thirds pi r cubed');
  s = s.replace(/⅔πr³/g, 'two thirds pi r cubed');
  s = s.replace(/⅓πr²h/g, 'one third pi r squared h');
  s = s.replace(/πr²h/g, 'pi r squared h');
  s = s.replace(/πrl/g, 'pi r l');
  s = s.replace(/πr²/g, 'pi r squared');
  s = s.replace(/4πr²/g, 'four pi r squared');
  s = s.replace(/2πr²/g, 'two pi r squared');
  s = s.replace(/3πr²/g, 'three pi r squared');
  s = s.replace(/2πrh/g, 'two pi r h');

  // Fractions
  s = s.replace(/⅓/g, 'one third');
  s = s.replace(/⅔/g, 'two thirds');
  s = s.replace(/½/g, 'one half');
  s = s.replace(/4⁄3/g, 'four thirds');

  // Powers
  s = s.replace(/r²/g, 'r squared');
  s = s.replace(/r³/g, 'r cubed');
  s = s.replace(/l²/g, 'l squared');
  s = s.replace(/h²/g, 'h squared');
  s = s.replace(/s²/g, 's squared');

  // Units
  s = s.replace(/cm³/g, ' cubic centimetres');
  s = s.replace(/cm²/g, ' square centimetres');
  s = s.replace(/m³/g, ' cubic metres');
  s = s.replace(/m²/g, ' square metres');
  s = s.replace(/\bcm\b/g, ' centimetres');
  s = s.replace(/\bm\b/g, ' metres');
  s = s.replace(/\bmL\b/g, ' millilitres');
  s = s.replace(/\blitres\b/g, ' litres');
  s = s.replace(/\blitre\b/g, ' litre');

  // Math symbols
  s = s.replace(/π/g, ' pi');
  s = s.replace(/ = /g, ' equals ');
  s = s.replace(/ \+ /g, ' plus ');
  s = s.replace(/ − /g, ' minus ');
  s = s.replace(/ - /g, ' minus ');
  s = s.replace(/ × /g, ' times ');
  s = s.replace(/ ÷ /g, ' divided by ');
  s = s.replace(/3 s\.f\./g, 'three significant figures');

  // Clean double spaces
  s = s.replace(/\s+/g, ' ').trim();
  return s;
}

/* ---- Phase Narrations ---- */

export function wonderNarration() {
  return [
    think("Welcome to The Solid Design Studio! Look at this dessert stall commission: a waffle cone and a straight cup with the exact same width and height."),
    ask("If Priya fills the cone to the brim and pours it into the cup, how many cones will it take to fill it completely?"),
    say("Foreman Tally says: The secret to pointed and round solids is hidden inside a plain cylinder. Let's find out!")
  ];
}

export function storyNarration(panelIdx) {
  const scripts = [
    [
      say("At The Solid Design Studio, Priya and Jun Hao accept their first big client brief: a dessert stall ordering cone cups and straight drink tumblers."),
      emphasize("Filling is volume. Covering is surface area."),
      say("A cylinder holds base area times height. Today, we discover how pointed and curved solids work!")
    ],
    [
      say("Foreman Tally tests the pointy third rule. When you pour a pyramid into a matching box of the same base and height, it takes exactly three pours to fill it!"),
      emphasize("A pyramid holds one third of the matching box: volume equals one third base area times perpendicular height."),
      say("For a cone, it is one third pi r squared h. And remember: volume uses vertical height, while sloping surfaces need slant height from Pythagoras!")
    ],
    [
      say("Next is sphere geometry! A solid sphere holds two thirds of the cylinder that just fits around it."),
      emphasize("Sphere volume is four thirds pi r cubed, and its total surface area is four pi r squared."),
      say("Slice it in half for a hemisphere: volume is two thirds pi r cubed, curved surface is two pi r squared, and with its flat circular lid, total surface area is three pi r squared!")
    ],
    [
      say("Real studio orders combine shapes into composite solids! For volume, add the pieces together, or subtract a hollow cavity."),
      emphasize("For total surface area, count only the exposed faces you can touch! Faces joined on the inside do not count."),
      cheer("Keep in mind that one litre equals one thousand cubic centimetres. Grab your hard hats — enter the Workshop!")
    ]
  ];
  return scripts[panelIdx] || [say("Let's review this design brief together.")];
}

export function simStationIntro(stationIdx) {
  const intros = [
    [
      say("Welcome to Station A: The Pour-Over Workshop!"),
      instruct("Choose a solid and adjust its sliders. Press Pour to transfer liquid into the matching container and watch the one third ratio in action!")
    ],
    [
      say("Welcome to Station B: The Capacity Contractor!"),
      instruct("A client has sent in an exact brief! Adjust the slider until the gauge turns emerald green to match the exact target capacity.")
    ],
    [
      say("Welcome to Station C: The Combo Builder!"),
      instruct("Assemble real architectural composite structures! Calculate volume ladders and toggle only the exposed surfaces.")
    ]
  ];
  return intros[stationIdx] || [say("Explore this simulation station.")];
}

export function playCorrectNarration(count) {
  const compliments = [
    "Spot on! Brilliant calculation!",
    "Excellent geometric reasoning!",
    "Target hit! Your working is solid!",
    "Great work! Foreman Tally is impressed!",
    "You solved that commission with precision!"
  ];
  return [cheer(compliments[count % compliments.length])];
}

export function playWrongNarration() {
  return [
    think("Not quite — re-measure! Look carefully at whether the question asks for vertical height or slant height, or check if the one third factor was used.")
  ];
}

export function playHint1Narration(hint) {
  return [say(`Foreman Tally's Tip: ${hint}`)];
}

export function playHint2Narration(hint) {
  return [instruct(`Step-by-step working: ${hint}`)];
}

export function districtCompleteNarration(stars) {
  return [
    celebrate(`World completed! You earned ${stars} stars on this studio zone! Keep building momentum!`)
  ];
}

export function bossWinNarration(reward) {
  return [
    celebrate(`Incredible! You defeated the Boss Contractor and unlocked the ${reward} badge!`)
  ];
}

export function reflectNarration() {
  return [
    say("You have completed the workshop commissions! Let's reflect on the core rules you mastered before celebrating your grand opening!")
  ];
}

export function reflectCompleteNarration() {
  return [
    celebrate("Outstanding work! You have certified as a Chief Solid Designer! Look at your final scorecard and badges!")
  ];
}

/**
 * Audio Generation Pipeline for SolidQuest (Grade 8)
 * Generates ElevenLabs audio for all core narration clips across the module.
 * Voice: Alice (Clear, Engaging Educator) — Voice ID: Xb7hH8MSUJpSbSDYk0k2
 * Model: eleven_multilingual_v2
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import {
  wonderNarration,
  storyNarration,
  simStationIntro,
  playCorrectNarration,
  playWrongNarration,
  districtCompleteNarration,
  bossWinNarration,
  reflectNarration,
  reflectCompleteNarration
} from '../src/utils/narration.js';
import { WORLDS } from '../src/config/worlds.config.js';
import { VOICE_ID, MODEL_ID, STYLE_SETTINGS } from '../src/config/audio.config.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const API_KEY = process.env.VITE_ELEVENLABS_API_KEY || 'sk_aeb8a68d72e0b337aad809f0fa094b89815e294af95f6b98';
const TARGET_VOICE_ID = process.env.VITE_ELEVENLABS_VOICE_ID || VOICE_ID || 'Xb7hH8MSUJpSbSDYk0k2';

const OUTPUT_DIR = path.resolve(__dirname, '../public/assets/audio');
const AUDIOMAP_FILE = path.resolve(__dirname, '../src/utils/audioMap.js');

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// 1. Gather all clips
const clips = [];

// Wonder phase
wonderNarration().forEach((s, i) => clips.push({ name: `wonder_${i}`, ...s }));

// Story phase (4 panels)
for (let p = 0; p < 4; p++) {
  storyNarration(p).forEach((s, i) => clips.push({ name: `story_${p}_${i}`, ...s }));
}

// Simulation phase (3 stations)
for (let st = 0; st < 3; st++) {
  simStationIntro(st).forEach((s, i) => clips.push({ name: `sim_station_${st}_${i}`, ...s }));
}

// Play praise
for (let c = 0; c < 5; c++) {
  playCorrectNarration(c).forEach((s) => clips.push({ name: `praise_${c}`, ...s }));
}

// Play wrong
playWrongNarration().forEach((s, i) => clips.push({ name: `wrong_${i}`, ...s }));

// District complete (1-3 stars)
for (let stars = 1; stars <= 3; stars++) {
  districtCompleteNarration(stars).forEach((s, i) => clips.push({ name: `district_${stars}star_${i}`, ...s }));
}

// Boss win rewards for all 10 worlds
WORLDS.forEach((w, idx) => {
  bossWinNarration(w.boss.reward).forEach((s, i) =>
    clips.push({ name: `boss_w${idx}_${i}`, ...s })
  );
});

// Reflect phase
reflectNarration().forEach((s, i) => clips.push({ name: `reflect_intro_${i}`, ...s }));
reflectCompleteNarration().forEach((s, i) => clips.push({ name: `reflect_complete_${i}`, ...s }));

console.log(`Starting audio generation for ${clips.length} clips with Voice ID: ${TARGET_VOICE_ID}...`);

const audioMap = {};

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function generateClip(clip, index) {
  const fileName = `solid_${clip.name}.mp3`;
  const filePath = path.join(OUTPUT_DIR, fileName);
  const webPath = `/assets/audio/${fileName}`;

  audioMap[clip.text] = webPath;

  if (fs.existsSync(filePath) && fs.statSync(filePath).size > 1000) {
    console.log(`[${index + 1}/${clips.length}] Exists: ${fileName}`);
    return;
  }

  const cfg = STYLE_SETTINGS[clip.style] || STYLE_SETTINGS.statement;
  const voice_settings = {
    stability: cfg.stability,
    similarity_boost: cfg.similarity_boost,
    style: cfg.style,
    use_speaker_boost: cfg.use_speaker_boost
  };

  try {
    const res = await fetch(
      `https://api.elevenlabs.io/v1/text-to-speech/${TARGET_VOICE_ID}?output_format=mp3_44100_128`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'audio/mpeg',
          'xi-api-key': API_KEY
        },
        body: JSON.stringify({
          text: clip.text,
          model_id: MODEL_ID,
          voice_settings
        })
      }
    );

    if (!res.ok) {
      const errText = await res.text();
      console.error(`[${index + 1}/${clips.length}] Error generating ${fileName}: HTTP ${res.status} - ${errText}`);
      return;
    }

    const buffer = Buffer.from(await res.arrayBuffer());
    fs.writeFileSync(filePath, buffer);
    console.log(`[${index + 1}/${clips.length}] Generated (${buffer.length} bytes): ${fileName}`);
  } catch (err) {
    console.error(`[${index + 1}/${clips.length}] Exception on ${fileName}:`, err.message);
  }

  // Small delay to be polite to API rate limits
  await sleep(250);
}

async function run() {
  for (let i = 0; i < clips.length; i++) {
    await generateClip(clips[i], i);
  }

  // Write updated audioMap.js
  const mapContent = `// Static mapping of pre-generated ElevenLabs audio clips (Voice: Alice - ${TARGET_VOICE_ID})
export const audioMap = ${JSON.stringify(audioMap, null, 2)};
`;

  fs.writeFileSync(AUDIOMAP_FILE, mapContent, 'utf-8');
  console.log(`\n✓ Successfully updated ${AUDIOMAP_FILE} with ${Object.keys(audioMap).length} entries!`);
  console.log('--- AUDIO GENERATION COMPLETE ---');
}

run();

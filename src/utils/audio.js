/* =========================================================================
   AUDIO ENGINE  (ElevenLabs "Alice" pipeline)
   Voice: Alice (Clear, Engaging Educator) — Voice ID: Xb7hH8MSUJpSbSDYk0k2
   Model: eleven_multilingual_v2

   Strict Rule: No browser Web Speech API fallback under any circumstance.
   If audio is missing or muted, playback silently continues/skips.
   ========================================================================= */
import { audioMap } from './audioMap.js';
import { VOICE_ID, MODEL_ID, STYLE_SETTINGS } from '../config/audio.config.js';

export { VOICE_ID, MODEL_ID, STYLE_SETTINGS };

const API_KEY =
  (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_ELEVENLABS_API_KEY) || '';

/* ------------------------------------------------------------------ state */
export let audioMuted = false;
let currentAudioElement = null;
let currentQueue = 0;
const dynamicCache = new Map(); // "style::text" -> Promise<blobUrl | null>
const warmCache = new Map();    // url -> preloaded <audio>

/* ---------------------------------------------------------- URL resolution */
async function fetchDynamic(text, style) {
  const cfg = STYLE_SETTINGS[style] || STYLE_SETTINGS.statement;
  const voice_settings = {
    stability: cfg.stability,
    similarity_boost: cfg.similarity_boost,
    style: cfg.style,
    use_speaker_boost: cfg.use_speaker_boost
  };
  try {
    let res;
    if (API_KEY) {
      res = await fetch(
        `https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}?output_format=mp3_44100_128`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'audio/mpeg',
            'xi-api-key': API_KEY
          },
          body: JSON.stringify({ text, model_id: MODEL_ID, voice_settings })
        }
      );
    } else {
      res = await fetch('/api/elevenlabs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, voiceId: VOICE_ID, modelId: MODEL_ID, voice_settings })
      });
    }
    if (!res.ok) return null;
    const blob = await res.blob();
    return URL.createObjectURL(blob);
  } catch (e) {
    return null;
  }
}

/** Resolve the audio URL for a line: static map first, then live ElevenLabs. */
export function getAudioUrl(text, style = 'statement') {
  if (!text) return Promise.resolve(null);
  if (audioMap[text]) {
    warmStatic(audioMap[text]);
    return Promise.resolve(audioMap[text]);
  }
  const key = `${style}::${text}`;
  if (!dynamicCache.has(key)) dynamicCache.set(key, fetchDynamic(text, style));
  return dynamicCache.get(key);
}

function warmStatic(url) {
  if (typeof Audio === 'undefined' || warmCache.has(url)) return;
  try {
    const a = new Audio();
    a.preload = 'auto';
    a.src = url;
    warmCache.set(url, a);
  } catch (e) {
    // Ignore warm cache errors
  }
}

/* --------------------------------------------------------------- playback */
function playUrl(url) {
  return new Promise(resolve => {
    if (typeof Audio === 'undefined' || !url) return resolve(false);
    let audio;
    try {
      audio = warmCache.get(url) || new Audio(url);
      audio.currentTime = 0;
    } catch (e) {
      return resolve(false);
    }
    currentAudioElement = audio;
    audio.onended = () => resolve(true);
    audio.onerror = () => resolve(false);
    audio.play().catch(() => resolve(false));
  });
}

/**
 * Play a sequence of { text, style } segments sequentially.
 * Next segment's URL is pre-fetched while current segment plays.
 */
export async function narrate(segments, enabled = true) {
  stopNarration();
  if (!enabled || audioMuted || !segments || segments.length === 0) return;

  const queueId = ++currentQueue;

  // Pre-fetch first URL
  let nextUrlPromise = getAudioUrl(segments[0].text, segments[0].style);

  for (let i = 0; i < segments.length; i++) {
    if (currentQueue !== queueId) return; // Cancelled

    const url = await nextUrlPromise;
    if (currentQueue !== queueId) return;

    // Start pre-fetching next segment immediately
    if (i + 1 < segments.length) {
      nextUrlPromise = getAudioUrl(segments[i + 1].text, segments[i + 1].style);
    }

    if (url) {
      await playUrl(url);
    }
  }
}

export function stopNarration() {
  currentQueue++;
  if (currentAudioElement) {
    try {
      currentAudioElement.pause();
      currentAudioElement.currentTime = 0;
    } catch (e) {
      // Ignore
    }
    currentAudioElement = null;
  }
}

export function setMuted(val) {
  audioMuted = Boolean(val);
  if (audioMuted) stopNarration();
}

/** Synthesize an audio click / tactile tap */
export function playClickSound() {
  if (audioMuted || typeof window === 'undefined') return;
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(800, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.04);
    gain.gain.setValueAtTime(0.08, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.04);
  } catch (e) {
    // AudioContext blocked or unsupported
  }
}

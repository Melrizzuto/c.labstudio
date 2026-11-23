/*
 * Calì's voice. Sounds play only after a tap or click, never on load: each player is created on first use
 * (preload="none"), shared afterwards, and restarted from the beginning on every tap.
 * Credits in the README (all CC0, from Freesound).
 */

export type CatSound = 'meow' | 'trill' | 'purr';

const SOURCES: Record<CatSound, string> = {
  meow: '/assets/sfx/cat-meow.mp3',
  trill: '/assets/sfx/cat-trill.mp3',
  purr: '/assets/sfx/cat-purr.mp3',
};
const VOLUME = 0.6;
const players: Partial<Record<CatSound, HTMLAudioElement>> = {};

export function playCat(sound: CatSound): void {
  try {
    let a = players[sound];
    if (!a) {
      a = new Audio();
      a.preload = 'none';
      a.volume = VOLUME;
      a.src = SOURCES[sound];
      players[sound] = a;
    }
    a.currentTime = 0;
    a.play()?.catch(() => {});
  } catch {}
}

/*
 * The room's small sounds, drawn in the browser with Web Audio (no files): paper for the folders, a squeak for
 * the duck, a click for the mouse, a clack for every key. Like Calì's voice they only play after the first
 * tap or click (browsers keep audio locked until then).
 */
export type Sfx = 'paperOpen' | 'paperClose' | 'squeak' | 'click' | 'key';

let ctx: AudioContext | null = null;
let noise: AudioBuffer | null = null;
function audio(): AudioContext | null {
  try {
    if (!ctx) {
      const AC = window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (!AC) return null;
      ctx = new AC();
      noise = ctx.createBuffer(1, ctx.sampleRate, ctx.sampleRate);
      const d = noise.getChannelData(0);
      for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
    }
    if (ctx.state === 'suspended') ctx.resume().catch(() => {});
    return ctx.state === 'running' ? ctx : null;
  } catch {
    return null;
  }
}
/* a burst of filtered noise with a quick attack and an exponential tail */
function burst(c: AudioContext, at: number, dur: number, freq: number, q: number, gain: number) {
  const src = c.createBufferSource();
  src.buffer = noise;
  const f = c.createBiquadFilter();
  f.type = 'bandpass';
  f.frequency.value = freq;
  f.Q.value = q;
  const g = c.createGain();
  g.gain.setValueAtTime(0.0001, at);
  g.gain.exponentialRampToValueAtTime(gain, at + Math.min(0.02, dur / 4));
  g.gain.exponentialRampToValueAtTime(0.0001, at + dur);
  src.connect(f).connect(g).connect(c.destination);
  src.start(at, Math.random() * 0.5, dur + 0.05);
}
function tone(c: AudioContext, at: number, dur: number, from: number, to: number, gain: number, type: OscillatorType = 'sine') {
  const o = c.createOscillator();
  o.type = type;
  o.frequency.setValueAtTime(from, at);
  o.frequency.exponentialRampToValueAtTime(to, at + dur);
  const g = c.createGain();
  g.gain.setValueAtTime(0.0001, at);
  g.gain.exponentialRampToValueAtTime(gain, at + 0.012);
  g.gain.exponentialRampToValueAtTime(0.0001, at + dur);
  o.connect(g).connect(c.destination);
  o.start(at);
  o.stop(at + dur + 0.02);
}

export function playSfx(kind: Sfx): void {
  const c = audio();
  if (!c || !noise) return;
  const t = c.currentTime + 0.005;
  switch (kind) {
    case 'paperOpen':
    case 'paperClose': {
      /* paper: a soft airy slide under many tiny crinkles, quiet */
      const open = kind === 'paperOpen', len = open ? 0.34 : 0.2, n = open ? 16 : 9;
      burst(c, t, len, 5200, 0.6, open ? 0.035 : 0.025);
      for (let i = 0; i < n; i++) {
        const at = t + Math.random() * len * 0.9;
        burst(c, at, 0.006 + Math.random() * 0.018, 2500 + Math.random() * 4500, 2 + Math.random() * 3, 0.03 + Math.random() * 0.06);
      }
      break;
    }
    case 'click':
      burst(c, t, 0.025, 3800, 3, 0.5);
      burst(c, t + 0.075, 0.02, 3200, 3, 0.3);
      break;
    case 'key': {
      const k = 0.85 + Math.random() * 0.3;
      burst(c, t, 0.035, 2900 * k, 2.5, 0.28);
      tone(c, t, 0.05, 190 * k, 120 * k, 0.12);
      break;
    }
    case 'squeak': {
      /* a rubber duck: a nasal squeak when you squeeze it, a higher airy one when it lets go */
      const squeak = (at: number, from: number, peak: number, to: number, dur: number, gain: number) => {
        const o = c.createOscillator();
        o.type = 'sawtooth';
        o.frequency.setValueAtTime(from, at);
        o.frequency.exponentialRampToValueAtTime(peak, at + dur * 0.35);
        o.frequency.exponentialRampToValueAtTime(to, at + dur);
        const lfo = c.createOscillator();
        lfo.frequency.value = 38;
        const depth = c.createGain();
        depth.gain.value = 35;
        lfo.connect(depth).connect(o.frequency);
        const bp = c.createBiquadFilter();
        bp.type = 'bandpass';
        bp.frequency.value = 1700;
        bp.Q.value = 1.6;
        const g = c.createGain();
        g.gain.setValueAtTime(0.0001, at);
        g.gain.exponentialRampToValueAtTime(gain, at + 0.025);
        g.gain.setValueAtTime(gain, at + dur * 0.7);
        g.gain.exponentialRampToValueAtTime(0.0001, at + dur);
        o.connect(bp).connect(g).connect(c.destination);
        o.start(at);
        lfo.start(at);
        o.stop(at + dur + 0.02);
        lfo.stop(at + dur + 0.02);
        burst(c, at, dur * 0.8, 3500, 0.9, gain * 0.12);
      };
      squeak(t, 820, 1180, 1050, 0.2, 0.5);
      squeak(t + 0.24, 1050, 1480, 1350, 0.16, 0.36);
      break;
    }
  }
}

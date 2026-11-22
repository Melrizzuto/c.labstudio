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

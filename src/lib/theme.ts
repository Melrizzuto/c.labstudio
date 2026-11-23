/*
 * Day and night. The page colours follow `data-time` on <html> ("day" | "night").
 * It comes from the visitor's choice (the button, saved in localStorage as `clab-time`),
 * otherwise from `data-theme` on <html>, otherwise from the system's dark mode.
 * The whole site follows it, the room too: each scene has a night picture shown over its day one (see RoomStage).
 */

const KEY = 'clab-time';
let pref: string | null | undefined;
const listeners = new Set<() => void>();

function readPref(): string | null {
  if (pref === undefined) {
    try {
      pref = localStorage.getItem(KEY);
    } catch {
      pref = null;
    }
  }
  return pref;
}

const darkQuery = () => matchMedia('(prefers-color-scheme: dark)');

/** True when the visitor (or their system) wants the night. */
export function forcedNight(): boolean {
  const p = readPref();
  if (p) return p === 'night';
  const root = document.documentElement;
  return root.dataset.theme === 'dark' || (!root.dataset.theme && darkQuery().matches);
}

/** Puts the page on the visitor's time. */
export function baseTime(): void {
  const root = document.documentElement;
  root.dataset.time = forcedNight() ? 'night' : 'day';
  listeners.forEach((fn) => fn());
}

/** The theme button. */
export function toggleTime(): void {
  pref = forcedNight() ? 'day' : 'night';
  try {
    localStorage.setItem(KEY, pref);
  } catch {}
  baseTime();
}

/** Called whenever the wanted time may have changed (to redraw the button). */
export function subscribeTheme(fn: () => void): () => void {
  listeners.add(fn);
  return () => {
    listeners.delete(fn);
  };
}

/** Starts following the system theme and `data-theme`. Returns the cleanup. */
export function startTheme(): () => void {
  const mq = darkQuery();
  mq.addEventListener?.('change', baseTime);
  const mo = new MutationObserver(baseTime);
  mo.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
  window.__forcedNight = forcedNight;
  baseTime();
  return () => {
    mq.removeEventListener?.('change', baseTime);
    mo.disconnect();
  };
}

/**
 * Runs in <head> before the first paint, so a saved night never flashes as day.
 * Same rule as forcedNight(), written as plain script. Once the page has loaded it also sets data-print,
 * which switches on the print textures (see globals.css).
 */
export const THEME_BOOT_SCRIPT = `(function(){try{var r=document.documentElement,p=null;try{p=localStorage.getItem('${KEY}')}catch(e){}var n=p?p==='night':(r.dataset.theme==='dark'||(!r.dataset.theme&&matchMedia('(prefers-color-scheme: dark)').matches));r.dataset.time=n?'night':'day';addEventListener('load',function(){requestAnimationFrame(function(){r.dataset.print='1'})})}catch(e){}})();`;

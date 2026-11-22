'use client';

import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { TIMOR } from '@/content/room';
import type { Locale } from '@/i18n/types';

/** picture height / width: cap heights are % of the height, font sizes are % of the width (cqw) */
const H_OVER_W = 1520 / 2688;
/** Outfit's cap height, in em */
const CAP = 0.7;
const INTL: Record<Locale, string> = { it: 'it-IT', en: 'en-GB' };

function today(locale: Locale): [string, string, string] {
  const now = new Date();
  const fmt = (o: Intl.DateTimeFormatOptions) => new Intl.DateTimeFormat(INTL[locale], o).format(now).toLocaleUpperCase(INTL[locale]);
  return [fmt({ weekday: 'long' }), String(now.getDate()), fmt({ month: 'long' })];
}

/*
 * Today's date on the flaps of the Timor calendar, in the visitor's timezone and language.
 * Sizes are in container units of the scene, so the text stays glued to the flaps while the camera zooms.
 * Nothing is rendered until the page runs in the browser (the server does not know the visitor's date).
 */
export function TimorDate({ scene, locale }: { scene: 'day' | 'desk'; locale: Locale }) {
  const [words, setWords] = useState<[string, string, string] | null>(null);
  const box = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let timer: number | undefined;
    const tick = () => {
      setWords(today(locale));
      const now = new Date();
      const midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1).getTime();
      timer = window.setTimeout(tick, midnight - now.getTime() + 1000);
    };
    tick();
    return () => clearTimeout(timer);
  }, [locale]);

  /* long words (MERCOLEDÌ, WEDNESDAY, SEPTEMBER) shrink to fit their flap */
  useEffect(() => {
    const el = box.current;
    if (!el || !words) return;
    const fit = () => {
      const w = el.clientWidth;
      if (!w) return;
      el.querySelectorAll<HTMLElement>('span').forEach((s, i) => {
        s.style.removeProperty('--k');
        const max = (TIMOR[scene][i].maxWidth / 100) * w;
        const k = Math.min(1, max / s.offsetWidth);
        if (k < 1) s.style.setProperty('--k', k.toFixed(3));
      });
    };
    fit();
    document.fonts?.ready.then(fit);
  }, [words, scene]);

  return (
    <div className="fx timor" aria-hidden="true" ref={box}>
      {words &&
        TIMOR[scene].map((l, i) => (
          <span
            key={i}
            style={
              {
                left: `${l.x}%`,
                top: `${l.y}%`,
                '--fs': `${((l.cap * H_OVER_W) / CAP).toFixed(4)}cqw`,
                '--r': `${l.rotate}deg`,
              } as CSSProperties
            }
          >
            {words[i]}
          </span>
        ))}
    </div>
  );
}

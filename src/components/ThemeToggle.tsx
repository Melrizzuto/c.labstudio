'use client';

import { useEffect, useState } from 'react';
import { forcedNight, subscribeTheme, toggleTime } from '@/lib/theme';
import type { Dictionary } from '@/i18n/types';

const SUN =
  'M12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10zM11 1h2v3h-2zM11 20h2v3h-2zM1 11h3v2H1zM20 11h3v2h-3zM4.2 5.6l1.4-1.4 2.1 2.1-1.4 1.4zM16.3 17.7l1.4-1.4 2.1 2.1-1.4 1.4zM4.2 18.4l2.1-2.1 1.4 1.4-2.1 2.1zM16.3 6.3l2.1-2.1 1.4 1.4-2.1 2.1z';
const MOON = 'M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5z';

/** The day/night button in the header. It shows what you would switch to. */
export function ThemeToggle({ labels }: { labels: Dictionary['header']['theme'] }) {
  const [night, setNight] = useState(false);
  useEffect(() => {
    const draw = () => setNight(forcedNight());
    draw();
    return subscribeTheme(draw);
  }, []);
  return (
    <button
      className="theme"
      id="themeBtn"
      type="button"
      aria-pressed={night}
      aria-label={night ? labels.toDay : labels.toNight}
      onClick={toggleTime}
    >
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path id="themeIco" fill="currentColor" d={night ? SUN : MOON} />
      </svg>
      <span>{night ? labels.day : labels.night}</span>
    </button>
  );
}

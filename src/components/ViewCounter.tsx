'use client';

import { useEffect, useState } from 'react';
import type { Dictionary, Locale } from '@/i18n/types';

const SEEN_KEY = 'clab-viewed';
const INTL: Record<Locale, string> = { it: 'it-IT', en: 'en-GB' };

/** Today in the visitor's timezone, YYYY-MM-DD. */
function todayKey() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

/*
 * The little eye in the footer: how many visits the site has had.
 * A browser counts once a day (a date in localStorage); otherwise it only reads the total.
 * If the counter is not set up or does not answer, nothing is shown.
 */
export function ViewCounter({ locale, t }: { locale: Locale; t: Dictionary['views'] }) {
  const [views, setViews] = useState<number | null>(null);
  useEffect(() => {
    let alive = true;
    let counted = false;
    try {
      counted = localStorage.getItem(SEEN_KEY) === todayKey();
    } catch {}
    fetch('/api/views/', { method: counted ? 'GET' : 'POST', cache: 'no-store' })
      .then((r) => (r.ok ? (r.json() as Promise<{ views: number | null }>) : { views: null }))
      .then(({ views: n }) => {
        if (!alive || typeof n !== 'number') return;
        if (!counted) {
          try {
            localStorage.setItem(SEEN_KEY, todayKey());
          } catch {}
        }
        setViews(n);
      })
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, []);
  if (views === null) return null;
  let number: string;
  try {
    number = new Intl.NumberFormat(INTL[locale], { useGrouping: 'always' } as Intl.NumberFormatOptions).format(views);
  } catch {
    number = new Intl.NumberFormat(INTL[locale]).format(views);
  }
  return (
    <span className="views">
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path
          fill="currentColor"
          d="M12 5C6.5 5 2.3 8.6 1 12c1.3 3.4 5.5 7 11 7s9.7-3.6 11-7c-1.3-3.4-5.5-7-11-7zm0 11.5a4.5 4.5 0 1 1 0-9 4.5 4.5 0 0 1 0 9zm0-2.3a2.2 2.2 0 1 0 0-4.4 2.2 2.2 0 0 0 0 4.4z"
        />
      </svg>
      {number} {views === 1 ? t.one : t.many}
    </span>
  );
}

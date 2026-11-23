'use client';

import { useEffect, useRef, useState, type FormEvent } from 'react';
import type { Dictionary, Locale } from '@/i18n/types';
import { Sticker, STICKER_KEYS, type StickerKey } from '@/content/stickers';

type Mood = 'like' | 'dislike';
type Entry = { name: string | null; message: string; mood: Mood; created_at: string; sticker?: StickerKey | null };
type Status = 'idle' | 'sending' | 'sent' | 'error';

/*
 * The desk notebook, open. Left page: a dark wall where the approved notes hang as neon signs
 * (after Insulti Luminosi), each with the sticker its writer picked. Right page: the form.
 * Opened by any [data-guestbook] (the notebook and the pencil in the desk scene); closed by
 * the button, Esc or a click outside the book. Notes wait for Mel's approval (see /api/guestbook).
 */
export function Guestbook({ t, locale, closeLabel }: { t: Dictionary['guestbook']; locale: Locale; closeLabel: string }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const openedAt = useRef(0);
  const [entries, setEntries] = useState<Entry[] | null | undefined>(undefined);
  const [status, setStatus] = useState<Status>('idle');
  const [mood, setMood] = useState<Mood>('like');
  const [sticker, setSticker] = useState<StickerKey | null>(null);

  useEffect(() => {
    const d = dialog.current;
    if (!d) return;
    const load = () =>
      fetch('/api/guestbook')
        .then((r) => r.json() as Promise<{ entries: Entry[] | null }>)
        .then((j) => setEntries(j.entries))
        .catch(() => setEntries(null));
    const onClick = (e: MouseEvent) => {
      if (!(e.target as Element).closest('[data-guestbook]')) return;
      openedAt.current = Date.now();
      if (!d.open) d.showModal();
      load();
    };
    /* a click on the backdrop (the dialog box is exactly the book, so only the outside hits the dialog itself) */
    const onBackdrop = (e: MouseEvent) => {
      if (e.target === d) d.close();
    };
    document.addEventListener('click', onClick);
    d.addEventListener('click', onBackdrop);
    return () => {
      document.removeEventListener('click', onClick);
      d.removeEventListener('click', onBackdrop);
    };
  }, []);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    setStatus('sending');
    try {
      const res = await fetch('/api/guestbook', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.get('name'),
          message: data.get('message'),
          mood,
          sticker,
          locale,
          website: data.get('website'),
          elapsed: Date.now() - openedAt.current,
        }),
      });
      if (!res.ok) throw new Error(String(res.status));
      form.reset();
      setMood('like');
      setSticker(null);
      setStatus('sent');
    } catch {
      setStatus('error');
    }
  };

  const date = new Intl.DateTimeFormat(locale === 'it' ? 'it-IT' : 'en-GB', { day: 'numeric', month: 'short', year: 'numeric' });

  return (
    <dialog className="guest" ref={dialog} aria-labelledby="guest-title">
      <div className="gb-book">
        <button className="gb-close" type="button" data-close="" aria-label={closeLabel}>
          ×
        </button>
        <section className="gb-page gb-read" aria-labelledby="guest-read">
          <svg className="gb-daisy" viewBox="0 0 64 64" aria-hidden="true">
            {[0, 72, 144, 216, 288].map((a) => (
              <ellipse key={a} cx="32" cy="16" rx="10" ry="14" transform={`rotate(${a} 32 32)`} fill="#F7EFE1" stroke="#16130F" strokeWidth="2.5" />
            ))}
            <circle cx="32" cy="32" r="8" fill="#FFC21A" stroke="#16130F" strokeWidth="2.5" />
          </svg>
          <h2 id="guest-title" className="neon-title">{t.title}</h2>
          <p className="gb-intro">{t.intro}</p>
          <h3 id="guest-read">{t.readTitle}</h3>
          {entries === undefined ? null : entries === null ? (
            <p className="gb-empty neon n2">{t.offline}</p>
          ) : entries.length === 0 ? (
            <p className="gb-empty neon n2">{t.empty}</p>
          ) : (
            <ul className="gb-list">
              {entries.map((n, i) => (
                <li key={n.created_at + n.message.slice(0, 12)} className={`n${i % 4}`}>
                  {n.sticker && <Sticker k={n.sticker} className="gb-stuck" />}
                  <p className="gb-msg neon">{n.message}</p>
                  <p className="gb-meta">
                    <span className={`gb-mood ${n.mood}`}>{n.mood === 'like' ? t.like : t.dislike}</span>
                    {n.name || t.anon} · {date.format(new Date(n.created_at))}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </section>
        <div className="gb-rings" aria-hidden="true"></div>
        <section className="gb-page gb-write" aria-labelledby="guest-write">
          <h3 id="guest-write">{t.writeTitle}</h3>
          {status === 'sent' ? (
            <div className="gb-thanks" role="status">
              <p>{t.thanks}</p>
              <button className="chip" type="button" onClick={() => setStatus('idle')}>
                {t.another}
              </button>
            </div>
          ) : (
            <form onSubmit={onSubmit}>
              <label className="gb-field">
                <span>{t.message}</span>
                <textarea name="message" required minLength={2} maxLength={500} rows={6}></textarea>
              </label>
              <label className="gb-field">
                <span>{t.name}</span>
                <input name="name" type="text" maxLength={40} autoComplete="nickname" />
              </label>
              <fieldset className="gb-stickers">
                <legend>{t.stickerLabel}</legend>
                <label className={sticker === null ? 'on none' : 'none'}>
                  <input type="radio" name="sticker" value="" checked={sticker === null} onChange={() => setSticker(null)} />
                  {t.stickerNone}
                </label>
                {STICKER_KEYS.map((k) => (
                  <label key={k} className={sticker === k ? 'on' : ''} title={t.stickerNames[k]}>
                    <input type="radio" name="sticker" value={k} checked={sticker === k} onChange={() => setSticker(k)} aria-label={t.stickerNames[k]} />
                    <Sticker k={k} />
                  </label>
                ))}
              </fieldset>
              <fieldset className="gb-mood-pick">
                <legend>{t.moodLabel}</legend>
                {(['like', 'dislike'] as const).map((m) => (
                  <label key={m} className={mood === m ? 'on' : ''}>
                    <input type="radio" name="mood" value={m} checked={mood === m} onChange={() => setMood(m)} />
                    {m === 'like' ? t.like : t.dislike}
                  </label>
                ))}
              </fieldset>
              {/* left empty by people, filled in by bots */}
              <label className="gb-trap" aria-hidden="true">
                Website
                <input name="website" type="text" tabIndex={-1} autoComplete="off" />
              </label>
              <button className="btn" type="submit" disabled={status === 'sending'}>
                {status === 'sending' ? t.sending : t.send}
              </button>
              <p className="gb-status" role="status">
                {status === 'error' ? t.error : ''}
              </p>
            </form>
          )}
        </section>
      </div>
    </dialog>
  );
}

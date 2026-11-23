'use client';

import { useCallback, useEffect, useMemo, useRef, useState, type CSSProperties, type FormEvent, type PointerEvent as RPointerEvent } from 'react';
import type { Dictionary, Locale } from '@/i18n/types';
import { Sticker, STICKER_KEYS, type StickerKey } from '@/content/stickers';
import { BOARD, NOTE_COLORS, NOTE_FILL, type NoteColor } from '@/content/board';

type Mood = 'like' | 'dislike';
type Note = {
  key: string;
  name: string | null;
  message: string;
  mood: Mood;
  created_at: string;
  sticker: StickerKey | null;
  color: NoteColor | null;
  x: number | null;
  y: number | null;
  rot: number | null;
};
type Draft = { color: NoteColor; x: number; y: number; rot: number; message: string; name: string; mood: Mood; sticker: StickerKey | null };
type View = { x: number; y: number; s: number };

const PENDING_KEY = 'clab-guestbook-pending';
const readPending = (): Note[] => { try { return JSON.parse(localStorage.getItem(PENDING_KEY) ?? '[]') as Note[]; } catch { return []; } };
const savePending = (list: Note[]) => { try { localStorage.setItem(PENDING_KEY, JSON.stringify(list.slice(-12))); } catch { /* private mode */ } };
const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));
const N = BOARD.note;

/* notes written before the board existed have no place: put them on free spots around the middle */
function placeAll(notes: Note[]): (Note & { px: number; py: number; pr: number })[] {
  const taken: [number, number][] = notes.filter((n) => n.x !== null && n.y !== null).map((n) => [n.x!, n.y!]);
  const free = (x: number, y: number) => taken.every(([a, b]) => Math.abs(a - x) > N * 0.9 || Math.abs(b - y) > N * 0.9);
  const slots: [number, number][] = [];
  for (let ring = 0; ring < 8; ring++) for (let i = -ring; i <= ring; i++) for (let j = -ring; j <= ring; j++) {
    if (Math.max(Math.abs(i), Math.abs(j)) !== ring) continue;
    const x = BOARD.w / 2 - N / 2 + i * (N + 40), y = BOARD.h / 2 - N / 2 + j * (N + 40);
    if (x >= 20 && y >= 20 && x <= BOARD.w - N - 20 && y <= BOARD.h - N - 20) slots.push([x, y]);
  }
  return notes.map((n, i) => {
    if (n.x !== null && n.y !== null) return { ...n, px: n.x, py: n.y, pr: n.rot ?? 0 };
    const slot = slots.find(([x, y]) => free(x, y)) ?? [40 + (i % 8) * (N + 30), 40];
    taken.push(slot);
    return { ...n, px: slot[0], py: slot[1], pr: ((i * 37) % 9) - 4 };
  });
}

/*
 * The desk notebook opens full screen, its pages work like a FigJam board: dotted, pan by dragging the background, zoom with ctrl+wheel,
 * pinch or the buttons. Approved post-its sit where their writers stuck them. A colour in the toolbar starts a
 * new post-it in the middle of the view: write on it, drag it, add a sticker, stick it. It then stays on the
 * board, for its writer only, as "waiting for Mel" until it is approved (see /api/guestbook and /owner/).
 */
export function Guestbook({ t, locale, closeLabel }: { t: Dictionary['guestbook']; locale: Locale; closeLabel: string }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const viewport = useRef<HTMLDivElement>(null);
  const openedAt = useRef(0);
  const [entries, setEntries] = useState<Note[] | null | undefined>(undefined);
  const [pending, setPending] = useState<Note[]>([]);
  const [view, setView] = useState<View>({ x: 0, y: 0, s: 0.6 });
  const viewRef = useRef(view);
  viewRef.current = view;
  const [draft, setDraft] = useState<Draft | null>(null);
  const [status, setStatus] = useState<'idle' | 'sending' | 'error'>('idle');
  const [toast, setToast] = useState('');

  const fit = useCallback(() => {
    const vp = viewport.current;
    if (!vp) return;
    const w = vp.clientWidth, h = vp.clientHeight;
    const s = clamp(Math.min(w / BOARD.w, h / BOARD.h) * 0.96, 0.2, 1);
    setView({ s, x: (w - BOARD.w * s) / 2, y: (h - BOARD.h * s) / 2 });
  }, []);
  const lookAt = useCallback((bx: number, by: number, s: number) => {
    const vp = viewport.current;
    if (!vp) return;
    setView({ s, x: vp.clientWidth / 2 - bx * s, y: vp.clientHeight / 2 - by * s });
  }, []);
  const zoomBy = useCallback((f: number, cx?: number, cy?: number) => {
    const vp = viewport.current;
    if (!vp) return;
    setView((v) => {
      const s = clamp(v.s * f, 0.2, 2);
      const px = cx ?? vp.clientWidth / 2, py = cy ?? vp.clientHeight / 2;
      return { s, x: px - ((px - v.x) / v.s) * s, y: py - ((py - v.y) / v.s) * s };
    });
  }, []);

  /* open on any [data-guestbook]; load the approved notes and this browser's own waiting ones */
  useEffect(() => {
    const d = dialog.current;
    if (!d) return;
    const onClick = (e: MouseEvent) => {
      if (!(e.target as Element).closest('[data-guestbook]')) return;
      openedAt.current = Date.now();
      if (!d.open) d.showModal();
      setPending(readPending());
      requestAnimationFrame(() => {
        const vp = viewport.current;
        if (vp) { const s = clamp(Math.min(vp.clientWidth / 1500, vp.clientHeight / 950), 0.4, 1); lookAt(BOARD.w / 2, BOARD.h / 2, s); }
      });
      fetch('/api/guestbook/')
        .then((r) => r.json() as Promise<{ entries: (Omit<Note, 'key'> & { id?: number })[] | null }>)
        .then((j) => setEntries(j.entries ? j.entries.map((n, i) => ({ ...n, key: `a${n.id ?? i}` })) : null))
        .catch(() => setEntries(null));
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, [lookAt]);

  /* a waiting note disappears from "pending" once it shows up approved */
  useEffect(() => {
    if (!entries?.length) return;
    const live = new Set(entries.map((n) => n.message.trim()));
    setPending((p) => { const left = p.filter((n) => !live.has(n.message.trim())); if (left.length !== p.length) savePending(left); return left; });
  }, [entries]);

  /* wheel: pan, or zoom with ctrl (that is also what a trackpad pinch sends) */
  useEffect(() => {
    const vp = viewport.current;
    if (!vp) return;
    const onWheel = (e: WheelEvent) => {
      if ((e.target as Element).closest('textarea')) return;
      e.preventDefault();
      const r = vp.getBoundingClientRect();
      if (e.ctrlKey) zoomBy(Math.exp(-e.deltaY * 0.01), e.clientX - r.left, e.clientY - r.top);
      else setView((v) => ({ ...v, x: v.x - e.deltaX, y: v.y - e.deltaY }));
    };
    vp.addEventListener('wheel', onWheel, { passive: false });
    return () => vp.removeEventListener('wheel', onWheel);
  }, [zoomBy]);

  /* pointers on the background: one pans, two pinch; on the draft (not its text): drag the draft */
  const pointers = useRef(new Map<number, { x: number; y: number }>());
  const gesture = useRef<{ kind: 'pan' | 'draft' | 'pinch'; dist?: number } | null>(null);
  const onDown = (e: RPointerEvent<HTMLDivElement>) => {
    const target = e.target as Element;
    if (target.closest('textarea, button, input, label')) return;
    const onDraft = target.closest('.bd-note.draft');
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    if (pointers.current.size === 2) {
      const [a, b] = [...pointers.current.values()];
      gesture.current = { kind: 'pinch', dist: Math.hypot(a.x - b.x, a.y - b.y) };
    } else gesture.current = { kind: onDraft ? 'draft' : 'pan' };
  };
  const onMove = (e: RPointerEvent<HTMLDivElement>) => {
    const prev = pointers.current.get(e.pointerId);
    if (!prev || !gesture.current) return;
    const dx = e.clientX - prev.x, dy = e.clientY - prev.y;
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    const g = gesture.current;
    if (g.kind === 'pinch' && pointers.current.size === 2) {
      const [a, b] = [...pointers.current.values()];
      const dist = Math.hypot(a.x - b.x, a.y - b.y);
      const r = viewport.current!.getBoundingClientRect();
      zoomBy(dist / (g.dist || dist), (a.x + b.x) / 2 - r.left, (a.y + b.y) / 2 - r.top);
      g.dist = dist;
    } else if (g.kind === 'draft') {
      const s = viewRef.current.s;
      setDraft((d) => (d ? { ...d, x: clamp(d.x + dx / s, 0, BOARD.w - N), y: clamp(d.y + dy / s, 0, BOARD.h - N) } : d));
    } else if (g.kind === 'pan') setView((v) => ({ ...v, x: v.x + dx, y: v.y + dy }));
  };
  const onUp = (e: RPointerEvent<HTMLDivElement>) => {
    pointers.current.delete(e.pointerId);
    if (pointers.current.size === 0) gesture.current = null;
    else if (gesture.current?.kind === 'pinch') gesture.current = { kind: 'pan' };
  };

  const newNote = (color: NoteColor) => {
    const vp = viewport.current;
    if (!vp) return;
    const v = viewRef.current;
    const cx = (vp.clientWidth / 2 - v.x) / v.s, cy = (vp.clientHeight / 2 - v.y) / v.s;
    const x = clamp(cx - N / 2, 0, BOARD.w - N), y = clamp(cy - N / 2, 0, BOARD.h - N);
    setDraft((d) => ({ color, x: d?.x ?? x, y: d?.y ?? y, rot: d?.rot ?? Math.round((Math.random() * 6 - 3) * 10) / 10, message: d?.message ?? '', name: d?.name ?? '', mood: d?.mood ?? 'like', sticker: d?.sticker ?? null }));
    setStatus('idle');
    /* on small screens, come close enough to write on it */
    if (!draft && v.s < 0.8) lookAt(x + N / 2, y + N / 2 + 60, clamp(vp.clientWidth / 420, 0.8, 1));
  };

  const send = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!draft || draft.message.trim().length < 2) return;
    const form = e.currentTarget;
    setStatus('sending');
    try {
      const res = await fetch('/api/guestbook/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: draft.message, name: draft.name, mood: draft.mood, sticker: draft.sticker, color: draft.color,
          x: Math.round(draft.x), y: Math.round(draft.y), rot: draft.rot, locale,
          website: form.querySelector<HTMLInputElement>('input[name=website]')?.value ?? '',
          elapsed: Date.now() - openedAt.current,
        }),
      });
      if (!res.ok) throw new Error(String(res.status));
      const mine: Note = { key: `p${Date.now()}`, name: draft.name.trim() || null, message: draft.message.trim(), mood: draft.mood, created_at: new Date().toISOString(), sticker: draft.sticker, color: draft.color, x: draft.x, y: draft.y, rot: draft.rot };
      setPending((p) => { const next = [...p, mine]; savePending(next); return next; });
      setDraft(null);
      setStatus('idle');
      setToast(t.thanks);
      window.setTimeout(() => setToast(''), 3500);
    } catch {
      setStatus('error');
    }
  };

  const date = useMemo(() => new Intl.DateTimeFormat(locale === 'it' ? 'it-IT' : 'en-GB', { day: 'numeric', month: 'short' }), [locale]);
  const placed = useMemo(() => placeAll(entries ?? []), [entries]);

  const noteStyle = (x: number, y: number, rot: number, color: NoteColor | null): CSSProperties =>
    ({ left: x, top: y, width: N, minHeight: N, rotate: `${rot}deg`, '--pi': NOTE_FILL[color ?? 'yellow'] }) as CSSProperties;

  const card = (n: Note & { px: number; py: number; pr: number }, waiting = false) => (
    <article key={n.key} className={waiting ? 'bd-note waiting' : 'bd-note'} style={noteStyle(n.px, n.py, n.pr, n.color)}>
      {n.sticker && <Sticker k={n.sticker} className="bd-stuck" />}
      <p className="bd-msg">{n.message}</p>
      <p className="bd-meta">
        <span className={`gb-mood ${n.mood}`}>{n.mood === 'like' ? t.like : t.dislike}</span>
        <span>{n.name || t.anon}</span>
        {!waiting && <span>{date.format(new Date(n.created_at))}</span>}
      </p>
      {waiting && <p className="bd-wait">{t.pending}</p>}
    </article>
  );

  return (
    <dialog className="guest board" ref={dialog} aria-labelledby="guest-title">
      <header className="bd-top">
        <div className="bd-title">
          <h2 id="guest-title" className="neon-title">{t.title}</h2>
          <p>{t.intro}</p>
        </div>
        <button className="gb-close" type="button" data-close="" aria-label={closeLabel}>×</button>
      </header>

      <div className="bd-viewport" ref={viewport} onPointerDown={onDown} onPointerMove={onMove} onPointerUp={onUp} onPointerCancel={onUp} role="region" aria-label={t.hint}>
        <div className="bd-canvas" style={{ width: BOARD.w, height: BOARD.h, transform: `translate(${view.x}px, ${view.y}px) scale(${view.s})` }}>
          {placed.map((n) => card(n))}
          {pending.map((n) => card({ ...n, px: n.x ?? BOARD.w / 2, py: n.y ?? BOARD.h / 2, pr: n.rot ?? 0 }, true))}
          {entries !== undefined && placed.length === 0 && pending.length === 0 && !draft && (
            <p className={entries === null ? 'bd-empty bd-err' : 'bd-empty'} style={{ left: BOARD.w / 4 - 190, top: BOARD.h / 2 - 60 }}>{entries === null ? t.offline : t.empty}</p>
          )}
          {draft && (
            <div className="bd-note draft" style={noteStyle(draft.x, draft.y, draft.rot, draft.color)} title={t.drag}>
              <span className="bd-grip" aria-hidden="true">⠿</span>
              {draft.sticker && <Sticker k={draft.sticker} className="bd-stuck" />}
              <textarea aria-label={t.message} placeholder={t.message} maxLength={500} value={draft.message} onChange={(e) => setDraft({ ...draft, message: e.target.value })} autoFocus />
            </div>
          )}
        </div>
      </div>

      {draft && (
        <form className="bd-editor" onSubmit={send}>
          <input className="bd-name" type="text" maxLength={40} placeholder={t.name} aria-label={t.name} value={draft.name} onChange={(e) => setDraft({ ...draft, name: e.target.value })} />
          <fieldset className="gb-mood-pick">
            <legend className="sr-only">{t.moodLabel}</legend>
            {(['like', 'dislike'] as const).map((m) => (
              <label key={m} className={draft.mood === m ? 'on' : ''}>
                <input type="radio" name="mood" value={m} checked={draft.mood === m} onChange={() => setDraft({ ...draft, mood: m })} />
                {m === 'like' ? t.like : t.dislike}
              </label>
            ))}
          </fieldset>
          <fieldset className="gb-stickers">
            <legend className="sr-only">{t.stickerLabel}</legend>
            <label className={draft.sticker === null ? 'on none' : 'none'}>
              <input type="radio" name="sticker" value="" checked={draft.sticker === null} onChange={() => setDraft({ ...draft, sticker: null })} />
              {t.stickerNone}
            </label>
            {STICKER_KEYS.map((k) => (
              <label key={k} className={draft.sticker === k ? 'on' : ''} title={t.stickerNames[k]}>
                <input type="radio" name="sticker" value={k} checked={draft.sticker === k} onChange={() => setDraft({ ...draft, sticker: k })} aria-label={t.stickerNames[k]} />
                <Sticker k={k} />
              </label>
            ))}
          </fieldset>
          {/* left empty by people, filled in by bots */}
          <label className="gb-trap" aria-hidden="true">
            Website
            <input name="website" type="text" tabIndex={-1} autoComplete="off" />
          </label>
          <div className="bd-actions">
            <button className="chip" type="button" onClick={() => { setDraft(null); setStatus('idle'); }}>{t.cancel}</button>
            <button className="btn small" type="submit" disabled={status === 'sending' || draft.message.trim().length < 2}>{status === 'sending' ? t.sending : t.send}</button>
          </div>
          {status === 'error' && <p className="bd-err" role="status">{t.error}</p>}
        </form>
      )}

      <div className="bd-tools" role="toolbar" aria-label={t.newNote}>
        <span className="bd-tools-label">{t.newNote}</span>
        {NOTE_COLORS.map((c) => (
          <button key={c} type="button" className={draft?.color === c ? 'bd-swatch on' : 'bd-swatch'} style={{ background: NOTE_FILL[c] }} aria-label={`${t.newNote}: ${t.colorNames[c]}`} title={t.colorNames[c]} onClick={() => newNote(c)} />
        ))}
        <span className="bd-sep" aria-hidden="true"></span>
        <button type="button" className="bd-zoom" aria-label={t.zoomOut} onClick={() => zoomBy(1 / 1.25)}>−</button>
        <span className="bd-pct" aria-hidden="true">{Math.round(view.s * 100)}%</span>
        <button type="button" className="bd-zoom" aria-label={t.zoomIn} onClick={() => zoomBy(1.25)}>+</button>
        <button type="button" className="bd-zoom fit" aria-label={t.fit} title={t.fit} onClick={fit}>⤢</button>
      </div>
      <p className="bd-hint" aria-hidden="true">{t.hint}</p>
      {toast && <p className="bd-toast" role="status">{toast}</p>}
    </dialog>
  );
}

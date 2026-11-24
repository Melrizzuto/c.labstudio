'use client';

import { useCallback, useEffect, useMemo, useRef, useState, type CSSProperties, type FormEvent, type PointerEvent as RPointerEvent } from 'react';
import type { Dictionary, Locale } from '@/i18n/types';
import { Sticker, STICKER_KEYS, type StickerKey } from '@/content/stickers';
import { BOARD, NOTE_COLORS, NOTE_FILL, collides, freeSpot, noteBox, type Box, type NoteColor } from '@/content/board';

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

type Placed = Note & { px: number; py: number; pr: number };

/*
 * Where each post-it shows: the oldest keep their spot; a newer one that lands on an older one (or a note written
 * before the board existed, with no spot at all) moves to the nearest free spot, so none covers another.
 */
function placeAll(notes: Note[], taken: Box[] = []): Placed[] {
  const order = notes.map((n, i) => i).sort((a, b) => notes[a].created_at.localeCompare(notes[b].created_at));
  const out: Placed[] = new Array(notes.length);
  for (const i of order) {
    const n = notes[i];
    const has = n.x !== null && n.y !== null;
    const want = noteBox(has ? n.x! : BOARD.w / 2 - N / 2, has ? n.y! : BOARD.h / 2 - N / 2, n.message);
    const spot = freeSpot(want, taken);
    taken.push({ ...want, ...spot });
    out[i] = { ...n, px: spot.x, py: spot.y, pr: has ? (n.rot ?? 0) : ((i * 37) % 9) - 4 };
  }
  return out;
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
  const [dragging, setDragging] = useState(false);

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
    const open = () => {
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
      window.dispatchEvent(new Event('clab:notebook-opened'));
    };
    const onClick = (e: MouseEvent) => {
      if ((e.target as Element).closest('[data-guestbook]')) open();
    };
    document.addEventListener('click', onClick);
    /* a shared /agenda/ link, or the browser's back/forward buttons */
    window.addEventListener('clab:open-notebook', open);
    return () => {
      document.removeEventListener('click', onClick);
      window.removeEventListener('clab:open-notebook', open);
    };
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
    } else {
      gesture.current = { kind: onDraft ? 'draft' : 'pan' };
      if (onDraft) setDragging(true);
    }
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
    /* let go on another post-it: it slides to the nearest free spot */
    if (gesture.current?.kind === 'draft') { setDragging(false); setDraft((d) => (d ? { ...d, ...freeSpot(noteBox(d.x, d.y, d.message), takenRef.current) } : d)); }
    if (pointers.current.size === 0) gesture.current = null;
    else if (gesture.current?.kind === 'pinch') gesture.current = { kind: 'pan' };
  };

  const newNote = (color: NoteColor) => {
    const vp = viewport.current;
    if (!vp) return;
    const v = viewRef.current;
    const cx = (vp.clientWidth / 2 - v.x) / v.s, cy = (vp.clientHeight / 2 - v.y) / v.s;
    const { x, y } = freeSpot(noteBox(cx - N / 2, cy - N / 2, ''), takenRef.current);
    setDraft((d) => ({ color, x: d?.x ?? x, y: d?.y ?? y, rot: d?.rot ?? Math.round((Math.random() * 6 - 3) * 10) / 10, message: d?.message ?? '', name: d?.name ?? '', mood: d?.mood ?? 'like', sticker: d?.sticker ?? null }));
    setStatus('idle');
    /* on small screens, come close enough to write on it */
    if (!draft && v.s < 0.8) lookAt(x + N / 2, y + N / 2 + 60, clamp(vp.clientWidth / 420, 0.8, 1));
  };

  const send = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!draft || draft.message.trim().length < 2) return;
    const form = e.currentTarget;
    /* the text may have made it taller than the space it had */
    const spot = freeSpot(noteBox(draft.x, draft.y, draft.message.trim()), takenRef.current);
    setStatus('sending');
    try {
      const res = await fetch('/api/guestbook/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: draft.message, name: draft.name, mood: draft.mood, sticker: draft.sticker, color: draft.color,
          x: Math.round(spot.x), y: Math.round(spot.y), rot: draft.rot, locale,
          website: form.querySelector<HTMLInputElement>('input[name=website]')?.value ?? '',
          elapsed: Date.now() - openedAt.current,
        }),
      });
      if (!res.ok) throw new Error(String(res.status));
      /* the server may have moved it (someone else's post-it, still waiting, was there) */
      const saved = (await res.json().catch(() => ({}))) as { x?: unknown; y?: unknown };
      const at = typeof saved.x === 'number' && typeof saved.y === 'number' ? { x: saved.x, y: saved.y } : spot;
      const mine: Note = { key: `p${Date.now()}`, name: draft.name.trim() || null, message: draft.message.trim(), mood: draft.mood, created_at: new Date().toISOString(), sticker: draft.sticker, color: draft.color, x: at.x, y: at.y, rot: draft.rot };
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
  /* this browser's waiting post-its go around the published ones too */
  const waiting = useMemo(() => placeAll(pending, placed.map((n) => noteBox(n.px, n.py, n.message))), [pending, placed]);
  const taken = useMemo(() => [...placed, ...waiting].map((n) => noteBox(n.px, n.py, n.message)), [placed, waiting]);
  const takenRef = useRef(taken);
  takenRef.current = taken;
  const blocked = !!draft && taken.some((b) => collides(noteBox(draft.x, draft.y, draft.message), b));

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
    <dialog className="guest board" id="notebook" ref={dialog} aria-labelledby="guest-title">
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
          {waiting.map((n) => card(n, true))}
          {entries !== undefined && placed.length === 0 && pending.length === 0 && !draft && (
            <p className={entries === null ? 'bd-empty bd-err' : 'bd-empty'} style={{ left: BOARD.w / 4 - 190, top: BOARD.h / 2 - 60 }}>{entries === null ? t.offline : t.empty}</p>
          )}
          {draft && (
            <div className={`bd-note draft${blocked ? ' blocked' : ''}${dragging ? '' : ' snap'}`} style={noteStyle(draft.x, draft.y, draft.rot, draft.color)} title={t.drag}>
              {blocked && <p className="bd-taken" role="status">{t.taken}</p>}
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

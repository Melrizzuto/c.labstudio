'use client';

import { useEffect, useMemo, useRef, useState, type CSSProperties, type PointerEvent as RPointerEvent } from 'react';
import { Sticker, type StickerKey } from '@/content/stickers';
import { BOARD, NOTE_FILL, freeSpot, isNoteColor, noteBox, placeNotes } from '@/content/board';

export type BoardNote = {
  id: number; created_at: string; name: string | null; message: string; approved: boolean;
  sticker: StickerKey | null; color?: string | null; x?: number | null; y?: number | null; rot?: number | null;
};
type Drag = { id: number; pointer: number; startX: number; startY: number; fromX: number; fromY: number; x: number; y: number; moved: boolean };

const N = BOARD.note;
const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));

/*
 * The agenda as the owner sees it: every post-it, published or still waiting (dashed). Drag one to move it:
 * let go on another post-it and it slides to the nearest free spot. Each move is saved at once (PATCH { id, x, y }).
 */
export function OwnerBoard({ notes, onMove }: { notes: BoardNote[]; onMove: (id: number, x: number, y: number) => Promise<void> }) {
  const frame = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  const [drag, setDrag] = useState<Drag | null>(null);
  const [saving, setSaving] = useState<number | null>(null);
  const [onlyLive, setOnlyLive] = useState(false);

  useEffect(() => {
    const el = frame.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setWidth(el.clientWidth));
    ro.observe(el);
    setWidth(el.clientWidth);
    return () => ro.disconnect();
  }, []);
  /* the whole agenda fits the width; on a phone it stays readable and scrolls sideways */
  const s = width ? Math.max(width / BOARD.w, 0.45) : 0.45;

  const shown = useMemo(() => notes.filter((n) => !onlyLive || n.approved).map((n) => ({ ...n, x: n.x ?? null, y: n.y ?? null })), [notes, onlyLive]);
  const placed = useMemo(() => placeNotes(shown), [shown]);

  const down = (e: RPointerEvent<HTMLElement>, n: (typeof placed)[number]) => {
    if (saving !== null) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    setDrag({ id: n.id, pointer: e.pointerId, startX: e.clientX, startY: e.clientY, fromX: n.px, fromY: n.py, x: n.px, y: n.py, moved: false });
  };
  const move = (e: RPointerEvent<HTMLElement>) => {
    if (!drag || e.pointerId !== drag.pointer) return;
    const dx = (e.clientX - drag.startX) / s, dy = (e.clientY - drag.startY) / s;
    setDrag({ ...drag, x: clamp(drag.fromX + dx, 0, BOARD.w - N), y: clamp(drag.fromY + dy, 0, BOARD.h - N), moved: drag.moved || Math.hypot(dx, dy) * s > 4 });
  };
  const up = async (e: RPointerEvent<HTMLElement>) => {
    if (!drag || e.pointerId !== drag.pointer) return;
    const d = drag;
    const n = placed.find((p) => p.id === d.id);
    if (!d.moved || !n) { setDrag(null); return; }
    /* keep it off every other post-it, the waiting ones too (they may be published later) */
    const others = placeNotes(notes.filter((o) => o.id !== d.id).map((o) => ({ ...o, x: o.x ?? null, y: o.y ?? null }))).map((o) => noteBox(o.px, o.py, o.message));
    const spot = freeSpot(noteBox(d.x, d.y, n.message), others);
    const at = { x: Math.round(spot.x), y: Math.round(spot.y) };
    setDrag({ ...d, ...at });
    setSaving(d.id);
    try {
      await onMove(d.id, at.x, at.y);
    } finally {
      setDrag(null);
      setSaving(null);
    }
  };

  return (
    <section className="ob">
      <div className="ob-bar">
        <p>Trascina un post-it per spostarlo. Se lo lasci sopra un altro, si mette nel posto libero più vicino. Lo spostamento si salva subito.</p>
        <label className="ob-only">
          <input type="checkbox" checked={onlyLive} onChange={(e) => setOnlyLive(e.target.checked)} />
          Solo quelli pubblicati
        </label>
      </div>
      <div className="ob-frame" ref={frame}>
        <div className="ob-size" style={{ width: BOARD.w * s, height: BOARD.h * s }}>
          <div className="ob-canvas" style={{ width: BOARD.w, height: BOARD.h, transform: `scale(${s})` }}>
            {placed.map((n) => {
              const dragging = drag?.id === n.id;
              const x = dragging ? drag.x : n.px, y = dragging ? drag.y : n.py;
              const style = { left: x, top: y, width: N, minHeight: N, rotate: `${n.rot ?? 0}deg`, '--pi': NOTE_FILL[isNoteColor(n.color) ? n.color : 'yellow'] } as CSSProperties;
              const cls = ['bd-note', 'ob-note', n.approved ? '' : 'waiting', dragging ? 'dragging' : '', saving === n.id ? 'saving' : ''].filter(Boolean).join(' ');
              return (
                <article key={n.id} className={cls} style={style} onPointerDown={(e) => down(e, n)} onPointerMove={move} onPointerUp={(e) => void up(e)} onPointerCancel={() => setDrag(null)}>
                  {n.sticker && <Sticker k={n.sticker} className="bd-stuck" />}
                  <p className="bd-msg">{n.message}</p>
                  <p className="bd-meta"><span>{n.name || 'Senza nome'}</span></p>
                  {!n.approved && <p className="bd-wait">da approvare</p>}
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

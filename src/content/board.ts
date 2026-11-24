/* The guestbook board: its size (board units), the post-it colours and their keys (stored in guestbook.color). */
export const BOARD = { w: 2400, h: 1500, note: 210 } as const;

export const NOTE_COLORS = ['yellow', 'pink', 'blue', 'green', 'orange', 'purple'] as const;
export type NoteColor = (typeof NOTE_COLORS)[number];

export const NOTE_FILL: Record<NoteColor, string> = {
  yellow: '#FFE66D',
  pink: '#FFA9D2',
  blue: '#A6E4FF',
  green: '#C2F296',
  orange: '#FFC08A',
  purple: '#D5B8FF',
};

export const isNoteColor = (v: unknown): v is NoteColor => typeof v === 'string' && (NOTE_COLORS as readonly string[]).includes(v);
const num = (v: unknown, lo: number, hi: number) => (typeof v === 'number' && Number.isFinite(v) && v >= lo && v <= hi ? v : null);
export const boardX = (v: unknown) => num(v, 0, BOARD.w);
export const boardY = (v: unknown) => num(v, 0, BOARD.h);
export const tilt = (v: unknown) => num(v, -6, 6);

/*
 * No post-it on top of another: every note takes a box on the board (its width, a height guessed from its text),
 * plus a gap all round. A note that would land on a taken box goes to the nearest free spot instead.
 * The same rules run in the browser (while sticking it) and on the server (when it is saved).
 */
export const GAP = 24;
export type Box = { x: number; y: number; w: number; h: number };

/* a post-it grows with its text: about 11 handwritten characters a line, 29 units a line, plus padding and the signature */
export const noteHeight = (message: string) => {
  const lines = message.split('\n').reduce((sum, l) => sum + Math.max(1, Math.ceil(l.length / 11)), 0);
  return Math.max(BOARD.note, 36 + lines * 29 + 44);
};
export const noteBox = (x: number, y: number, message: string): Box => ({ x, y, w: BOARD.note, h: noteHeight(message) });

export const collides = (a: Box, b: Box) =>
  a.x < b.x + b.w + GAP && b.x < a.x + a.w + GAP && a.y < b.y + b.h + GAP && b.y < a.y + a.h + GAP;

/** The free spot nearest to `box` (the box itself when it is free). If the board is full, the box stays where it is. */
export function freeSpot(box: Box, taken: Box[]): { x: number; y: number } {
  const maxX = BOARD.w - box.w, maxY = Math.max(0, BOARD.h - box.h);
  const x0 = Math.min(maxX, Math.max(0, box.x)), y0 = Math.min(maxY, Math.max(0, box.y));
  const ok = (x: number, y: number) => taken.every((t) => !collides({ ...box, x, y }, t));
  if (ok(x0, y0)) return { x: x0, y: y0 };
  let best: { x: number; y: number } | null = null, bestD = Infinity;
  const STEP = 20;
  for (let x = 0; x <= maxX; x += STEP) for (let y = 0; y <= maxY; y += STEP) {
    const d = (x - x0) ** 2 + (y - y0) ** 2;
    if (d < bestD && ok(x, y)) { best = { x, y }; bestD = d; }
  }
  return best ?? { x: x0, y: y0 };
}

type Placeable = { x: number | null; y: number | null; message: string; created_at: string };
/**
 * Where each post-it shows: the oldest keep their spot; a newer one that lands on an older one (or a note written
 * before the board existed, with no spot at all) moves to the nearest free spot, so none covers another.
 * `taken` (boxes already on the board) is filled in as the notes are placed. Same order as `notes`.
 */
export function placeNotes<T extends Placeable>(notes: T[], taken: Box[] = []): (T & { px: number; py: number; moved: boolean })[] {
  const order = notes.map((_, i) => i).sort((a, b) => notes[a].created_at.localeCompare(notes[b].created_at));
  const out = new Array<T & { px: number; py: number; moved: boolean }>(notes.length);
  for (const i of order) {
    const n = notes[i];
    const has = n.x !== null && n.y !== null;
    const want = noteBox(has ? n.x! : BOARD.w / 2 - BOARD.note / 2, has ? n.y! : BOARD.h / 2 - BOARD.note / 2, n.message);
    const spot = freeSpot(want, taken);
    taken.push({ ...want, ...spot });
    out[i] = { ...n, px: spot.x, py: spot.y, moved: !has || spot.x !== n.x || spot.y !== n.y };
  }
  return out;
}

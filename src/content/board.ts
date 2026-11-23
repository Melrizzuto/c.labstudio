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

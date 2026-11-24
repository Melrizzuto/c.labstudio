/*
 * The guestbook on the desk notebook.
 * GET returns the approved notes (newest first) with their colour and place on the board; POST adds a note that waits for Mel's approval.
 *
 * The notes live in Supabase (table `guestbook`, see supabase/guestbook.sql); a note shows on the
 * site only after `approved` is ticked in the Supabase table editor.
 * Without Supabase, GET says `{ "entries": null }` and POST answers 503.
 */
import { supabase, supabaseFetch } from '@/lib/supabase';
import { isStickerKey } from '@/content/stickers';
import { boardX, boardY, isNoteColor, tilt } from '@/content/board';
import { SITE_URL } from '@/config';

export const dynamic = 'force-dynamic';

const NO_STORE = { 'Cache-Control': 'no-store' };
const MAX_MESSAGE = 500;
const MAX_NAME = 40;
/* a person needs a few seconds to write two words; bots post at once */
const MIN_ELAPSED_MS = 3000;

export async function GET() {
  /* on your own computer, without the database keys (.env.local), show the notes already published on the site */
  if (process.env.NODE_ENV === 'development' && !supabase()) {
    const live = await fetch(`${SITE_URL}/api/guestbook/`, { cache: 'no-store' }).catch(() => null);
    const body = live?.ok ? await live.json().catch(() => null) : null;
    return Response.json(body ?? { entries: null }, { headers: NO_STORE });
  }
  try {
    // select=* so it works before and after the sticker column exists (supabase/guestbook-2.sql)
    const res = await supabaseFetch('guestbook?approved=is.true&select=*&order=created_at.desc&limit=40', { method: 'GET' });
    if (!res?.ok) return Response.json({ entries: null }, { headers: NO_STORE });
    const rows = (await res.json()) as Record<string, unknown>[];
    const entries = rows.map((r) => ({
      id: r.id,
      name: r.name ?? null,
      message: r.message,
      mood: r.mood,
      created_at: r.created_at,
      sticker: isStickerKey(r.sticker) ? r.sticker : null,
      color: isNoteColor(r.color) ? r.color : null,
      x: boardX(r.x),
      y: boardY(r.y),
      rot: tilt(r.rot),
    }));
    return Response.json({ entries }, { headers: NO_STORE });
  } catch {
    return Response.json({ entries: null }, { headers: NO_STORE });
  }
}

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return Response.json({ ok: false }, { status: 400, headers: NO_STORE });
  }
  /* bots: the hidden field filled in, or the form sent too fast. Say yes and keep nothing. */
  const elapsed = typeof body.elapsed === 'number' ? body.elapsed : 0;
  if ((typeof body.website === 'string' && body.website !== '') || elapsed < MIN_ELAPSED_MS) {
    return Response.json({ ok: true }, { headers: NO_STORE });
  }
  const message = typeof body.message === 'string' ? body.message.trim() : '';
  const name = typeof body.name === 'string' ? body.name.trim().slice(0, MAX_NAME) : '';
  const mood = body.mood === 'like' || body.mood === 'dislike' ? body.mood : null;
  const locale = body.locale === 'en' ? 'en' : 'it';
  const sticker = isStickerKey(body.sticker) ? body.sticker : null;
  /* where the writer stuck the post-it on the board, and its colour (supabase/guestbook-3.sql) */
  const place = { color: isNoteColor(body.color) ? body.color : null, x: boardX(body.x), y: boardY(body.y), rot: tilt(body.rot) };
  if (message.length < 2 || message.length > MAX_MESSAGE || !mood) {
    return Response.json({ ok: false }, { status: 400, headers: NO_STORE });
  }
  if (!supabase()) return Response.json({ ok: false }, { status: 503, headers: NO_STORE });
  try {
    const row = { name: name || null, message, mood, locale };
    const insert = (data: object) => supabaseFetch('guestbook', { method: 'POST', headers: { Prefer: 'return=minimal' }, body: JSON.stringify(data) });
    /* newest columns first; if one does not exist yet, keep the note anyway with what the table has */
    let res = await insert({ ...row, sticker, ...place });
    if (res && !res.ok) res = await insert(sticker ? { ...row, sticker } : row);
    if (res && !res.ok && sticker) res = await insert(row);
    if (!res?.ok) return Response.json({ ok: false }, { status: 502, headers: NO_STORE });
    return Response.json({ ok: true }, { headers: NO_STORE });
  } catch {
    return Response.json({ ok: false }, { status: 502, headers: NO_STORE });
  }
}

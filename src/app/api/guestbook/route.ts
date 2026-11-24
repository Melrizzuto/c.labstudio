/*
 * The guestbook on the desk notebook.
 * GET returns the approved notes (newest first) with their colour and place on the board; POST adds a note that waits for Mel's approval.
 *
 * The notes live in Supabase (table `guestbook`, see supabase/guestbook.sql); a note shows on the
 * site only after `approved` is ticked in the Supabase table editor.
 * Without Supabase, GET says `{ "entries": null }` and POST answers 503.
 * Each new note sends Mel an email (to CV_NOTIFY_EMAIL, through Resend, like the CV requests) with a button to /owner/.
 */
import { supabase, supabaseFetch } from '@/lib/supabase';
import { isStickerKey } from '@/content/stickers';
import { boardX, boardY, freeSpot, isNoteColor, noteBox, tilt, type Box } from '@/content/board';
import { SITE_URL } from '@/config';
import { siteBase } from '@/lib/cv';
import { button, esc, frame, sendMail } from '@/lib/mail';

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
    /* never on top of another post-it, published or still waiting: move it to the nearest free spot */
    if (place.x !== null && place.y !== null) {
      const taken = await takenBoxes();
      const spot = freeSpot(noteBox(place.x, place.y, message), taken);
      place.x = Math.round(spot.x);
      place.y = Math.round(spot.y);
    }
    const insert = (data: object) => supabaseFetch('guestbook', { method: 'POST', headers: { Prefer: 'return=minimal' }, body: JSON.stringify(data) });
    /* newest columns first; if one does not exist yet, keep the note anyway with what the table has */
    let res = await insert({ ...row, sticker, ...place });
    if (res && !res.ok) res = await insert(sticker ? { ...row, sticker } : row);
    if (res && !res.ok && sticker) res = await insert(row);
    if (!res?.ok) return Response.json({ ok: false }, { status: 502, headers: NO_STORE });
    await notifyOwner({ message, name: name || null, mood, locale });
    return Response.json({ ok: true, x: place.x, y: place.y }, { headers: NO_STORE });
  } catch {
    return Response.json({ ok: false }, { status: 502, headers: NO_STORE });
  }
}

/* the boxes of every post-it already on the board (approved or not); none if the table has no x / y yet */
async function takenBoxes(): Promise<Box[]> {
  const res = await supabaseFetch('guestbook?select=x,y,message&x=not.is.null&y=not.is.null&order=created_at.desc&limit=500', { method: 'GET' }).catch(() => null);
  if (!res?.ok) return [];
  const rows = (await res.json().catch(() => [])) as Record<string, unknown>[];
  return rows.flatMap((r) => {
    const x = boardX(r.x), y = boardY(r.y);
    return x !== null && y !== null ? [noteBox(x, y, typeof r.message === 'string' ? r.message : '')] : [];
  });
}

/* "a new feedback is waiting": the note, who signed it, and the button to approve it on /owner/ */
async function notifyOwner(n: { message: string; name: string | null; mood: 'like' | 'dislike'; locale: 'it' | 'en' }) {
  const to = process.env.CV_NOTIFY_EMAIL;
  if (!to) return;
  const owner = `${siteBase()}/owner/`;
  const who = n.name || 'Qualcuno senza firma';
  const mood = n.mood === 'like' ? 'Il sito gli piace' : 'Il sito non lo convince';
  const html = frame(
    `<p style="margin:0 0 6px;font:700 12px/1 monospace;letter-spacing:.08em;text-transform:uppercase;color:#d4387f">Cosa ne pensi? · da approvare</p>` +
      `<h1 style="margin:0 0 16px;font:900 26px/1.1 Arial,sans-serif">Nuovo post-it da ${esc(who)}</h1>` +
      `<div style="margin:0 0 14px;padding:18px;background:#FFE66D;border-radius:4px 4px 14px 4px;font:700 20px/1.3 Arial,sans-serif;white-space:pre-wrap">${esc(n.message)}</div>` +
      `<p style="margin:0 0 22px;font-size:14px;color:#7a6f63">${mood} · ${n.locale === 'en' ? 'in inglese' : 'in italiano'}</p>` +
      button(owner, 'Approvalo o eliminalo') +
      `<p style="margin:18px 0 0;font-size:14px;color:#7a6f63">Finché non lo approvi, lo vede solo chi l'ha scritto.</p>`,
  );
  const text = `Nuovo post-it da ${who} (${mood.toLowerCase()}):\n\n${n.message}\n\nApprovalo o eliminalo: ${owner}\n`;
  await sendMail({ to, subject: `Nuovo feedback da ${who}`, html, text });
}

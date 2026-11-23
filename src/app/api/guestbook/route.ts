/*
 * The guestbook on the desk notebook.
 * GET returns the approved notes (newest first), POST adds a note that waits for Mel's approval.
 *
 * The notes live in Supabase (table `guestbook`, see supabase/guestbook.sql); a note shows on the
 * site only after `approved` is ticked in the Supabase table editor.
 * Without Supabase, GET says `{ "entries": null }` and POST answers 503.
 */
import { supabase, supabaseFetch } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

const NO_STORE = { 'Cache-Control': 'no-store' };
const MAX_MESSAGE = 500;
const MAX_NAME = 40;
/* a person needs a few seconds to write two words; bots post at once */
const MIN_ELAPSED_MS = 3000;

export async function GET() {
  try {
    const res = await supabaseFetch('guestbook?approved=is.true&select=name,message,mood,created_at&order=created_at.desc&limit=40', { method: 'GET' });
    if (!res?.ok) return Response.json({ entries: null }, { headers: NO_STORE });
    return Response.json({ entries: await res.json() }, { headers: NO_STORE });
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
  if (message.length < 2 || message.length > MAX_MESSAGE || !mood) {
    return Response.json({ ok: false }, { status: 400, headers: NO_STORE });
  }
  if (!supabase()) return Response.json({ ok: false }, { status: 503, headers: NO_STORE });
  try {
    const res = await supabaseFetch('guestbook', {
      method: 'POST',
      headers: { Prefer: 'return=minimal' },
      body: JSON.stringify({ name: name || null, message, mood, locale }),
    });
    if (!res?.ok) return Response.json({ ok: false }, { status: 502, headers: NO_STORE });
    return Response.json({ ok: true }, { headers: NO_STORE });
  } catch {
    return Response.json({ ok: false }, { status: 502, headers: NO_STORE });
  }
}

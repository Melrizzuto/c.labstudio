/*
 * The owner's side of the guestbook (the page /owner/): every note, approved or not, and the actions
 * on one note: publish / hide (PATCH { id, approved }), move it on the board (PATCH { id, x, y }) and delete (DELETE { id }).
 *
 * Only with the owner password, sent in the `x-owner-key` header. The password is the environment
 * variable OWNER_PASSWORD (set on Vercel); without it the route answers 503 and nobody gets in.
 */
import { supabaseFetch } from '@/lib/supabase';
import { isStickerKey } from '@/content/stickers';
import { BOARD, boardX, boardY, tilt } from '@/content/board';
import { ownerOnly as allowed, reply } from '@/lib/ownerAuth';

export const dynamic = 'force-dynamic';

const idOf = (v: unknown) => (typeof v === 'number' && Number.isInteger(v) && v > 0 ? v : null);

export async function GET(req: Request) {
  const no = await allowed(req);
  if (no) return no;
  try {
    const res = await supabaseFetch('guestbook?select=*&order=created_at.desc&limit=300', { method: 'GET' });
    if (!res?.ok) return reply({ error: 'store' }, 502);
    const rows = (await res.json()) as Record<string, unknown>[];
    const notes = rows.map((r) => ({
      id: r.id,
      created_at: r.created_at,
      name: r.name ?? null,
      message: r.message,
      mood: r.mood,
      locale: r.locale,
      approved: r.approved === true,
      sticker: isStickerKey(r.sticker) ? r.sticker : null,
      color: typeof r.color === 'string' ? r.color : null,
      x: boardX(r.x),
      y: boardY(r.y),
      rot: tilt(r.rot),
    }));
    return reply({ notes });
  } catch {
    return reply({ error: 'store' }, 502);
  }
}

export async function PATCH(req: Request) {
  const no = await allowed(req);
  if (no) return no;
  const body = (await req.json().catch(() => ({}))) as Record<string, unknown>;
  const id = idOf(body.id);
  /* a move: the new spot on the board (the /owner/ page already keeps it off the other post-its) */
  const x = boardX(body.x), y = boardY(body.y);
  const change = typeof body.approved === 'boolean' ? { approved: body.approved }
    : x !== null && y !== null ? { x: Math.round(Math.min(x, BOARD.w - BOARD.note)), y: Math.round(y) }
    : null;
  if (!id || !change) return reply({ error: 'bad-request' }, 400);
  const res = await supabaseFetch(`guestbook?id=eq.${id}`, { method: 'PATCH', headers: { Prefer: 'return=minimal' }, body: JSON.stringify(change) }).catch(() => null);
  return res?.ok ? reply({ ok: true }) : reply({ error: 'store' }, 502);
}

export async function DELETE(req: Request) {
  const no = await allowed(req);
  if (no) return no;
  const body = (await req.json().catch(() => ({}))) as Record<string, unknown>;
  const id = idOf(body.id);
  if (!id) return reply({ error: 'bad-request' }, 400);
  const res = await supabaseFetch(`guestbook?id=eq.${id}`, { method: 'DELETE', headers: { Prefer: 'return=minimal' } }).catch(() => null);
  return res?.ok ? reply({ ok: true }) : reply({ error: 'store' }, 502);
}

/*
 * The owner's side of the guestbook (the page /owner/): every note, approved or not, and the actions
 * on one note: publish / hide (PATCH { id, approved }) and delete (DELETE { id }).
 *
 * Only with the owner password, sent in the `x-owner-key` header. The password is the environment
 * variable OWNER_PASSWORD (set on Vercel); without it the route answers 503 and nobody gets in.
 */
import { createHash, timingSafeEqual } from 'node:crypto';
import { supabase, supabaseFetch } from '@/lib/supabase';
import { isStickerKey } from '@/content/stickers';

export const dynamic = 'force-dynamic';

const NO_STORE = { 'Cache-Control': 'no-store' };
const reply = (body: unknown, status = 200) => Response.json(body, { status, headers: NO_STORE });

/* constant-time comparison (hashes first, so the lengths match) */
const same = (a: string, b: string) => timingSafeEqual(createHash('sha256').update(a).digest(), createHash('sha256').update(b).digest());

async function allowed(req: Request): Promise<Response | null> {
  const password = process.env.OWNER_PASSWORD;
  if (!password || !supabase()) return reply({ error: 'not-configured' }, 503);
  const key = req.headers.get('x-owner-key') ?? '';
  if (!key || !same(key, password)) {
    await new Promise((r) => setTimeout(r, 700)); // slows down guessing
    return reply({ error: 'wrong-password' }, 401);
  }
  return null;
}

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
  if (!id || typeof body.approved !== 'boolean') return reply({ error: 'bad-request' }, 400);
  const res = await supabaseFetch(`guestbook?id=eq.${id}`, { method: 'PATCH', headers: { Prefer: 'return=minimal' }, body: JSON.stringify({ approved: body.approved }) }).catch(() => null);
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

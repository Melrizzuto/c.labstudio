/*
 * The owner's password check for the private API routes (/api/guestbook/owner/, /api/cv/owner/).
 * The password is the environment variable OWNER_PASSWORD (set on Vercel), sent by the /owner/ page
 * in the `x-owner-key` header; without it the routes answer 503 and nobody gets in. Server only.
 */
import { createHash, timingSafeEqual } from 'node:crypto';
import { supabase } from './supabase';

export const NO_STORE = { 'Cache-Control': 'no-store' };
export const reply = (body: unknown, status = 200) => Response.json(body, { status, headers: NO_STORE });

/* constant-time comparison (hashes first, so the lengths match) */
export const same = (a: string, b: string) => timingSafeEqual(createHash('sha256').update(a).digest(), createHash('sha256').update(b).digest());

/** null when the request carries the owner's password, otherwise the response to send back. */
export async function ownerOnly(req: Request): Promise<Response | null> {
  const password = process.env.OWNER_PASSWORD;
  if (!password || !supabase()) return reply({ error: 'not-configured' }, 503);
  const key = req.headers.get('x-owner-key') ?? '';
  if (!key || !same(key, password)) {
    await new Promise((r) => setTimeout(r, 700)); // slows down guessing
    return reply({ error: 'wrong-password' }, 401);
  }
  return null;
}

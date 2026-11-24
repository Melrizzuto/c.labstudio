/*
 * Asking for the CV (the form on /cv/). POST { name, email, company?, note?, locale, website, elapsed }
 * saves a pending request and emails Mel the button to approve it (src/lib/cv.ts). Nothing is sent to the
 * person who asked until Mel approves, so this form cannot be used to email strangers.
 */
import { supabase } from '@/lib/supabase';
import { addRequest, notifyOwner } from '@/lib/cv';
import { reply } from '@/lib/ownerAuth';

export const dynamic = 'force-dynamic';

/* a person needs a few seconds to fill in the form; bots post at once */
const MIN_ELAPSED_MS = 3000;
const EMAIL = /^[^\s@<>()[\]\\,;:"]+@[^\s@<>()[\]\\,;:"]+\.[a-z]{2,}$/i;

const text = (v: unknown, max: number) => (typeof v === 'string' ? v.replace(/\s+/g, ' ').trim().slice(0, max) : '');

export async function POST(req: Request) {
  const body = (await req.json().catch(() => null)) as Record<string, unknown> | null;
  if (!body) return reply({ ok: false }, 400);
  /* bots: the hidden field filled in, or the form sent too fast. Say yes and keep nothing. */
  const elapsed = typeof body.elapsed === 'number' ? body.elapsed : 0;
  if ((typeof body.website === 'string' && body.website !== '') || elapsed < MIN_ELAPSED_MS) return reply({ ok: true });

  const name = text(body.name, 80);
  const email = text(body.email, 200).toLowerCase();
  const company = text(body.company, 120) || null;
  const note = typeof body.note === 'string' ? body.note.trim().slice(0, 500) || null : null;
  const locale = body.locale === 'en' ? 'en' : 'it';
  if (name.length < 2 || !EMAIL.test(email)) return reply({ ok: false, error: 'invalid' }, 400);
  if (!supabase()) return reply({ ok: false }, 503);

  const r = await addRequest({ name, email, company, note, locale });
  if (!r) return reply({ ok: false }, 502);
  await notifyOwner(r);
  return reply({ ok: true });
}

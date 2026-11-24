/*
 * The button in Mel's email (/cv/decidi/?id=…&t=…). The token is an HMAC of the request id (src/lib/cv.ts),
 * so it works only for that request and only from that email.
 * GET shows the request; POST { id, t, action: 'approve' | 'reject' } decides. Opening the page changes
 * nothing (mail scanners open links): only the button on the page does.
 */
import { approve, checkDecision, getRequest, reject } from '@/lib/cv';
import { reply } from '@/lib/ownerAuth';

export const dynamic = 'force-dynamic';

const view = (r: NonNullable<Awaited<ReturnType<typeof getRequest>>>) => ({
  name: r.name, email: r.email, company: r.company, note: r.note, locale: r.locale, status: r.status, created_at: r.created_at, expires_at: r.expires_at,
});

export async function GET(req: Request) {
  const q = new URL(req.url).searchParams;
  const id = q.get('id'), t = q.get('t');
  if (!checkDecision(id, t)) return reply({ error: 'invalid' }, 404);
  const r = await getRequest(id);
  return r ? reply({ request: view(r) }) : reply({ error: 'invalid' }, 404);
}

export async function POST(req: Request) {
  const body = (await req.json().catch(() => ({}))) as Record<string, unknown>;
  const { id, t, action } = body;
  if (!checkDecision(id, t)) return reply({ error: 'invalid' }, 404);
  if (action === 'approve') {
    const done = await approve(id);
    return done ? reply({ ok: true, ...done }) : reply({ error: 'store' }, 502);
  }
  if (action === 'reject') return (await reject(id)) ? reply({ ok: true }) : reply({ error: 'store' }, 502);
  return reply({ error: 'bad-request' }, 400);
}

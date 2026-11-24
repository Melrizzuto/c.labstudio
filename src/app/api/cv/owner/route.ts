/*
 * The CV requests on the owner's page (/owner/, tab "CV"). Only with the owner password (src/lib/ownerAuth.ts).
 * GET lists every request; POST { id, action } with action:
 *   approve (also "new link" on an approved one), reject, revoke (ends the link now).
 */
import { approve, isUuid, listRequests, reject, revoke } from '@/lib/cv';
import { ownerOnly, reply } from '@/lib/ownerAuth';

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  const no = await ownerOnly(req);
  if (no) return no;
  const requests = await listRequests();
  return requests ? reply({ requests }) : reply({ error: 'store' }, 502);
}

export async function POST(req: Request) {
  const no = await ownerOnly(req);
  if (no) return no;
  const body = (await req.json().catch(() => ({}))) as Record<string, unknown>;
  const { id, action } = body;
  if (!isUuid(id)) return reply({ error: 'bad-request' }, 400);
  if (action === 'approve') {
    const done = await approve(id);
    return done ? reply({ ok: true, ...done }) : reply({ error: 'store' }, 502);
  }
  if (action === 'reject') return (await reject(id)) ? reply({ ok: true }) : reply({ error: 'store' }, 502);
  if (action === 'revoke') return (await revoke(id)) ? reply({ ok: true }) : reply({ error: 'store' }, 502);
  return reply({ error: 'bad-request' }, 400);
}

/*
 * The visit counter. GET returns the total, POST adds one visit and returns the new total.
 * The number lives in Upstash Redis, called through its REST API (no SDK). On Vercel, the
 * "Upstash for Redis" integration sets the two variables below. Without them, or if Upstash
 * does not answer, the route says `{ "views": null }` and the footer simply shows no eye.
 */

export const dynamic = 'force-dynamic';

const KEY = 'clab:views';

function credentials() {
  const url = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;
  return url && token ? { url, token } : null;
}

async function redis(command: string[]): Promise<number | null> {
  const c = credentials();
  if (!c) return null;
  try {
    const res = await fetch(c.url, {
      method: 'POST',
      headers: { Authorization: `Bearer ${c.token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(command),
      cache: 'no-store',
      signal: AbortSignal.timeout(3000),
    });
    if (!res.ok) return null;
    const data = (await res.json()) as { result?: string | number | null };
    const n = Number(data.result ?? 0);
    return Number.isFinite(n) ? n : null;
  } catch {
    return null;
  }
}

const reply = (views: number | null) => Response.json({ views }, { headers: { 'Cache-Control': 'no-store' } });

export async function GET() {
  return reply(await redis(['GET', KEY]));
}

export async function POST() {
  return reply(await redis(['INCR', KEY]));
}

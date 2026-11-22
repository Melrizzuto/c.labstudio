/*
 * The visit counter. GET returns the total, POST adds one visit and returns the new total.
 *
 * The number lives in Supabase (table `site_counters`, function `increment_views`, see
 * supabase/views.sql), called through its REST API with the service-role key, which only
 * exists on the server. Upstash Redis still works as an alternative store.
 * Without either set of variables, or if the store does not answer, the route says
 * `{ "views": null }` and the footer simply shows no eye.
 */

export const dynamic = 'force-dynamic';

const reply = (views: number | null) => Response.json({ views }, { headers: { 'Cache-Control': 'no-store' } });

const toCount = (v: unknown): number | null => {
  const n = Number(v);
  return Number.isFinite(n) ? n : null;
};

/* ---------- Supabase ---------- */

function supabase() {
  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  return url && key ? { url: url.replace(/\/$/, ''), key } : null;
}

async function supabaseCall(path: string, init: RequestInit): Promise<unknown> {
  const s = supabase();
  if (!s) return undefined;
  const res = await fetch(`${s.url}/rest/v1/${path}`, {
    ...init,
    headers: { apikey: s.key, Authorization: `Bearer ${s.key}`, 'Content-Type': 'application/json' },
    cache: 'no-store',
    signal: AbortSignal.timeout(3000),
  });
  if (!res.ok) throw new Error(`supabase ${res.status}`);
  return res.json();
}

/* ---------- Upstash (alternative) ---------- */

function upstash() {
  const url = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;
  return url && token ? { url, token } : null;
}

async function redis(command: string[]): Promise<number | null> {
  const c = upstash();
  if (!c) return null;
  const res = await fetch(c.url, {
    method: 'POST',
    headers: { Authorization: `Bearer ${c.token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(command),
    cache: 'no-store',
    signal: AbortSignal.timeout(3000),
  });
  if (!res.ok) return null;
  const data = (await res.json()) as { result?: string | number | null };
  return toCount(data.result ?? 0);
}

/* ---------- routes ---------- */

export async function GET() {
  try {
    if (supabase()) {
      const rows = (await supabaseCall('site_counters?id=eq.views&select=count', { method: 'GET' })) as { count: number }[];
      return reply(toCount(rows?.[0]?.count ?? 0));
    }
    return reply(await redis(['GET', 'clab:views']));
  } catch {
    return reply(null);
  }
}

export async function POST() {
  try {
    if (supabase()) return reply(toCount(await supabaseCall('rpc/increment_views', { method: 'POST', body: '{}' })));
    return reply(await redis(['INCR', 'clab:views']));
  } catch {
    return reply(null);
  }
}

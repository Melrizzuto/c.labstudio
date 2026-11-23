/*
 * Server-only access to Supabase through its REST API, with the service-role key
 * (SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY, set on Vercel). The tables have row level
 * security on and no policies, so the browser can never read or write them directly.
 */

export function supabase() {
  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  return url && key ? { url: url.replace(/\/$/, ''), key } : null;
}

/** A call to /rest/v1/<path>; null when Supabase is not configured. */
export async function supabaseFetch(path: string, init: RequestInit = {}): Promise<Response | null> {
  const s = supabase();
  if (!s) return null;
  // New secret keys (sb_secret_…) go only in `apikey`; legacy service_role JWTs also as Bearer.
  const auth: Record<string, string> = s.key.startsWith('sb_') ? { apikey: s.key } : { apikey: s.key, Authorization: `Bearer ${s.key}` };
  return fetch(`${s.url}/rest/v1/${path}`, {
    ...init,
    headers: { ...auth, 'Content-Type': 'application/json', ...(init.headers as Record<string, string> | undefined) },
    cache: 'no-store',
    signal: AbortSignal.timeout(4000),
  });
}

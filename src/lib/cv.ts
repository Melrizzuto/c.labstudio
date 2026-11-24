/*
 * The CV on request, server side. Someone asks for it on /cv/; Mel approves (from her email or /owner/);
 * the person gets a personal link /cv/k/<key>/ that lasts CV_DAYS days and opens the CV with their name on it.
 *
 * - Requests live in Supabase, table `cv_requests` (supabase/cv-requests.sql). Only the SHA-256 of a link's key is stored.
 * - The CV files live in Supabase Storage, private bucket "cv" (never in git): see cvFile.
 * - The approve/decline button in Mel's email carries an HMAC of the request id, so only that email can decide.
 * - Emails go out through Resend (RESEND_API_KEY). Without it nothing is sent: requests wait in /owner/,
 *   where approving shows the link to copy.
 * Links in emails always use the production address (never the request's Host), so nobody can redirect them.
 */
import { createHash, createHmac, randomBytes, timingSafeEqual } from 'node:crypto';
import { SITE_URL } from '@/config';
import { supabase, supabaseFetch } from './supabase';
import { button, esc, frame, sendMail, type Mail } from './mail';

export const CV_DAYS = 7;
const DAY_MS = 86_400_000;

export type CvLocale = 'it' | 'en';
export type CvStatus = 'pending' | 'approved' | 'rejected';
export type CvRequest = {
  id: string;
  created_at: string;
  name: string;
  email: string;
  company: string | null;
  note: string | null;
  locale: CvLocale;
  status: CvStatus;
  decided_at: string | null;
  expires_at: string | null;
  opened_count: number;
  last_opened_at: string | null;
};

const COLUMNS = 'id,created_at,name,email,company,note,locale,status,decided_at,expires_at,opened_count,last_opened_at';

export const isUuid = (v: unknown): v is string => typeof v === 'string' && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(v);
/** A link key: 32 random bytes in base64url. */
export const isKey = (v: unknown): v is string => typeof v === 'string' && /^[A-Za-z0-9_-]{43}$/.test(v);
export const hashKey = (key: string) => createHash('sha256').update(key).digest('hex');

/** The site's own address for links in emails: fixed in production, never taken from the request. */
export function siteBase(): string {
  if (process.env.VERCEL_ENV === 'production') return SITE_URL;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return `http://localhost:${process.env.PORT ?? 3100}`;
}

export const cvLink = (key: string, locale: CvLocale) => `${siteBase()}/cv/k/${key}/${locale === 'en' ? '?lang=en' : ''}`;

/* ---------- the decision link in Mel's email ---------- */

/* its secret is derived from the server-only Supabase key, so there is nothing else to configure */
function decisionSecret(): Buffer | null {
  const s = supabase();
  return s ? createHmac('sha256', s.key).update('clab-cv-decision-v1').digest() : null;
}

export function decisionToken(id: string): string | null {
  const secret = decisionSecret();
  return secret ? createHmac('sha256', secret).update(`decide:${id}`).digest('base64url') : null;
}

export function checkDecision(id: unknown, t: unknown): id is string {
  if (!isUuid(id) || typeof t !== 'string' || t.length > 100) return false;
  const want = decisionToken(id);
  if (!want) return false;
  const a = Buffer.from(want), b = Buffer.from(t);
  return a.length === b.length && timingSafeEqual(a, b);
}

/* ---------- the table ---------- */

export async function getRequest(id: string): Promise<CvRequest | null> {
  const res = await supabaseFetch(`cv_requests?id=eq.${id}&select=${COLUMNS}`, { method: 'GET' }).catch(() => null);
  if (!res?.ok) return null;
  const rows = (await res.json()) as CvRequest[];
  return rows[0] ?? null;
}

export async function listRequests(): Promise<CvRequest[] | null> {
  const res = await supabaseFetch(`cv_requests?select=${COLUMNS}&order=created_at.desc&limit=300`, { method: 'GET' }).catch(() => null);
  return res?.ok ? ((await res.json()) as CvRequest[]) : null;
}

async function patch(id: string, data: Record<string, unknown>): Promise<boolean> {
  const res = await supabaseFetch(`cv_requests?id=eq.${id}`, { method: 'PATCH', headers: { Prefer: 'return=minimal' }, body: JSON.stringify(data) }).catch(() => null);
  return !!res?.ok;
}

export async function addRequest(data: { name: string; email: string; company: string | null; note: string | null; locale: CvLocale }): Promise<CvRequest | null> {
  const res = await supabaseFetch(`cv_requests?select=${COLUMNS}`, { method: 'POST', headers: { Prefer: 'return=representation' }, body: JSON.stringify(data) }).catch(() => null);
  if (!res?.ok) return null;
  const rows = (await res.json()) as CvRequest[];
  return rows[0] ?? null;
}

/** Approves a request (or gives it a fresh link): a new key, CV_DAYS days from now, emailed to the person. */
export async function approve(id: string): Promise<{ link: string; emailed: boolean; expires_at: string } | null> {
  const r = await getRequest(id);
  if (!r) return null;
  const key = randomBytes(32).toString('base64url');
  const expires_at = new Date(Date.now() + CV_DAYS * DAY_MS).toISOString();
  const ok = await patch(id, { status: 'approved', decided_at: new Date().toISOString(), token_hash: hashKey(key), expires_at });
  if (!ok) return null;
  const link = cvLink(key, r.locale);
  const emailed = await sendMail(approvedMail(r, link, expires_at));
  return { link, emailed, expires_at };
}

/** Declines a request; an approved one loses its link too. Nothing is emailed. */
export const reject = (id: string) => patch(id, { status: 'rejected', decided_at: new Date().toISOString(), token_hash: null, expires_at: null });

/** Ends an approved link now, keeping the request approved in the list. */
export const revoke = (id: string) => patch(id, { token_hash: null, expires_at: new Date().toISOString() });

/** The request behind a link key, if the link is still valid. */
export async function findByKey(key: string): Promise<CvRequest | null> {
  if (!isKey(key)) return null;
  const res = await supabaseFetch(`cv_requests?token_hash=eq.${hashKey(key)}&select=${COLUMNS}`, { method: 'GET' }).catch(() => null);
  if (!res?.ok) return null;
  const r = ((await res.json()) as CvRequest[])[0];
  if (!r || r.status !== 'approved' || !r.expires_at || Date.parse(r.expires_at) <= Date.now()) return null;
  return r;
}

export const markOpened = (r: CvRequest) => patch(r.id, { opened_count: (r.opened_count ?? 0) + 1, last_opened_at: new Date().toISOString() });

/* ---------- the CV files (Supabase Storage, private bucket "cv") ---------- */

/* kept a few minutes per server instance, so a page and its photos don't download the bucket each time */
const FILES = new Map<string, { at: number; bytes: Buffer }>();
const FILE_TTL_MS = 5 * 60_000;

/** One file of the CV from the private bucket (a name from the route's fixed list), or null. */
export async function cvFile(name: string): Promise<Buffer | null> {
  const hit = FILES.get(name);
  if (hit && Date.now() - hit.at < FILE_TTL_MS) return hit.bytes;
  const s = supabase();
  if (!s) return null;
  const auth: Record<string, string> = s.key.startsWith('sb_') ? { apikey: s.key } : { apikey: s.key, Authorization: `Bearer ${s.key}` };
  const res = await fetch(`${s.url}/storage/v1/object/cv/${encodeURIComponent(name)}`, { headers: auth, cache: 'no-store', signal: AbortSignal.timeout(6000) }).catch(() => null);
  if (!res?.ok) return null;
  const bytes = Buffer.from(await res.arrayBuffer());
  FILES.set(name, { at: Date.now(), bytes });
  return bytes;
}

/* ---------- emails (Resend, see mail.ts) ---------- */

const dateOf = (iso: string, locale: CvLocale) =>
  new Intl.DateTimeFormat(locale === 'en' ? 'en-GB' : 'it-IT', { day: 'numeric', month: 'long', timeZone: 'Europe/Rome' }).format(new Date(iso));

/** Tells Mel a request arrived, with the button to decide. False if there is nobody to tell. */
export async function notifyOwner(r: CvRequest): Promise<boolean> {
  const to = process.env.CV_NOTIFY_EMAIL;
  const t = decisionToken(r.id);
  if (!to || !t) return false;
  const decide = `${siteBase()}/cv/decidi/?id=${r.id}&t=${t}`;
  const rows: [string, string | null][] = [['Nome', r.name], ['Email', r.email], ['Azienda', r.company], ['Messaggio', r.note], ['Lingua', r.locale === 'en' ? 'inglese' : 'italiano']];
  const html = frame(
    `<p style="margin:0 0 6px;font:700 12px/1 monospace;letter-spacing:.08em;text-transform:uppercase;color:#d4387f">Richiesta del CV</p>` +
      `<h1 style="margin:0 0 16px;font:900 26px/1.1 Arial,sans-serif">${esc(r.name)} vorrebbe il tuo CV</h1>` +
      `<table style="border-collapse:collapse;margin:0 0 22px">${rows
        .filter(([, v]) => v)
        .map(([k, v]) => `<tr><td style="padding:4px 14px 4px 0;color:#7a6f63;vertical-align:top">${k}</td><td style="padding:4px 0;white-space:pre-wrap">${esc(v!)}</td></tr>`)
        .join('')}</table>` +
      button(decide, 'Approva o rifiuta') +
      `<p style="margin:18px 0 0;font-size:14px;color:#7a6f63">Se approvi, riceve un link personale che dura ${CV_DAYS} giorni, con il suo nome stampato sul CV.</p>`,
  );
  const text = `${r.name} vorrebbe il tuo CV.\n\n${rows.filter(([, v]) => v).map(([k, v]) => `${k}: ${v}`).join('\n')}\n\nApprova o rifiuta: ${decide}\n`;
  return sendMail({ to, subject: `Richiesta del CV: ${r.name}`, html, text, replyTo: r.email });
}

function approvedMail(r: CvRequest, link: string, expiresAt: string): Mail {
  const until = dateOf(expiresAt, r.locale);
  const first = r.name.split(/\s+/)[0];
  if (r.locale === 'en') {
    return {
      to: r.email,
      subject: 'Your link to Melania Rizzuto’s CV',
      html: frame(
        `<h1 style="margin:0 0 14px;font:900 26px/1.1 Arial,sans-serif">Hi ${esc(first)}, here is my CV</h1>` +
          `<p style="margin:0 0 22px">Thanks for asking. This link is just for you and works until <b>${esc(until)}</b>.</p>` +
          button(link, 'Open the CV') +
          `<p style="margin:18px 0 0;font-size:14px;color:#7a6f63">Please don’t forward it: the CV carries your name. Mel</p>`,
      ),
      text: `Hi ${first}, here is my CV.\nThis link is just for you and works until ${until}:\n${link}\n\nPlease don’t forward it: the CV carries your name. Mel\n`,
    };
  }
  return {
    to: r.email,
    subject: 'Il link al CV di Melania Rizzuto',
    html: frame(
      `<h1 style="margin:0 0 14px;font:900 26px/1.1 Arial,sans-serif">Ciao ${esc(first)}, ecco il mio CV</h1>` +
        `<p style="margin:0 0 22px">Grazie di avermelo chiesto. Il link è solo per te e vale fino al <b>${esc(until)}</b>.</p>` +
        button(link, 'Apri il CV') +
        `<p style="margin:18px 0 0;font-size:14px;color:#7a6f63">Non inoltrarlo, per favore: sul CV c’è il tuo nome. Mel</p>`,
    ),
    text: `Ciao ${first}, ecco il mio CV.\nIl link è solo per te e vale fino al ${until}:\n${link}\n\nNon inoltrarlo, per favore: sul CV c’è il tuo nome. Mel\n`,
  };
}

/*
 * The CV behind a personal link: /cv/k/<key>/ and the files the page loads next to it (photo, fonts, PDFs).
 * The CV itself (page, photos, PDFs) lives in Supabase Storage, private bucket "cv", read with the server-only key
 * (src/lib/cv.ts, cvFile): it is not in public/ nor in git. Only its fonts are in the repo, in private/cv/fonts.
 * - Only names on the list below are served (no path from the address ever reaches the disk or the bucket).
 * - The key must belong to an approved request that has not expired (src/lib/cv.ts).
 * - The page shows "for <name>" and each PDF is stamped with the person's name and the date.
 * Never cached, never indexed, and no Referer leaves the page (the key is in the address).
 */
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import { cvFile, findByKey, markOpened, type CvRequest } from '@/lib/cv';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

const FONT_DIR = path.join(process.cwd(), 'private', 'cv', 'fonts');
const FONTS = ['caveat-latin.woff2', 'figtree-ext.woff2', 'figtree-latin.woff2', 'outfit-ext.woff2', 'outfit-latin.woff2', 'spacemono-400.woff2', 'spacemono-700.woff2'];
const PDFS: Record<string, 'it' | 'en'> = { 'CV_Melania_Rizzuto_UXUI.pdf': 'en', 'CV_Melania_Rizzuto_UXUI_IT.pdf': 'it' };
const TYPES: Record<string, string> = { '.html': 'text/html; charset=utf-8', '.jpg': 'image/jpeg', '.webp': 'image/webp', '.woff2': 'font/woff2', '.pdf': 'application/pdf' };

const PRIVATE = {
  'Cache-Control': 'private, no-store',
  'X-Robots-Tag': 'noindex, nofollow, noarchive',
  'Referrer-Policy': 'no-referrer',
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
};

/** The file asked for (a name in the bucket, or fonts/<name> in the repo), or null if it is not one of ours. */
function fileOf(parts: string[] | undefined): string | null {
  if (!parts || parts.length === 0) return 'index.html';
  if (parts.length === 1 && (parts[0] in PDFS || parts[0] === 'photo.jpg' || parts[0] === 'portrait.webp')) return parts[0];
  if (parts.length === 2 && parts[0] === 'fonts' && FONTS.includes(parts[1])) return `fonts/${parts[1]}`;
  return null;
}

const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);
const day = (iso: string, locale: 'it' | 'en') =>
  new Intl.DateTimeFormat(locale === 'en' ? 'en-GB' : 'it-IT', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Europe/Rome' }).format(new Date(iso));

function gone(): Response {
  const html = `<!doctype html><html lang="it"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex"><title>Link non valido · c.lab studio</title>
<style>body{margin:0;min-height:100dvh;display:grid;place-items:center;background:#f7efe1;color:#16130f;font:17px/1.5 system-ui,sans-serif;padding:24px}main{max-width:440px;background:#fff;border:3px solid #16130f;border-radius:20px;box-shadow:6px 6px 0 #16130f;padding:28px}h1{margin:0 0 10px;font-size:28px;line-height:1.1}a{color:#16130f;font-weight:700}</style></head>
<body><main><h1>Questo link non vale più</h1><p>È scaduto, o non è quello giusto. Puoi chiedere di nuovo il CV: ti arriva un link nuovo.</p><p><a href="/cv/">Chiedi il CV</a> · <a href="/en/cv/">Ask for the CV (EN)</a></p></main></body></html>`;
  return new Response(html, { status: 404, headers: { ...PRIVATE, 'Content-Type': 'text/html; charset=utf-8' } });
}

/* the page: a small "for <name>" note at the top, printed too */
function personalPage(html: string, r: CvRequest): string {
  const until = { it: day(r.expires_at!, 'it'), en: day(r.expires_at!, 'en') };
  const note =
    `<div class="for-you" role="note"><span data-l="it">Copia personale per <b>${esc(r.name)}</b> · link valido fino al ${esc(until.it)}</span>` +
    `<span data-l="en">Personal copy for <b>${esc(r.name)}</b> · link valid until ${esc(until.en)}</span></div>`;
  const style =
    `<style>.for-you{position:relative;z-index:5;max-width:900px;margin:0 auto 18px;padding:10px 16px;border:2px dashed currentColor;border-radius:12px;font:600 14px/1.4 system-ui,sans-serif;text-align:center;opacity:.8}` +
    `html[data-lang="it"] .for-you [data-l="en"],html[data-lang="en"] .for-you [data-l="it"]{display:none}</style>`;
  return html.replace('</head>', `${style}<meta name="robots" content="noindex, nofollow">\n</head>`).replace(/<body([^>]*)>/, `<body$1>${note}`);
}

/* the PDF: the person's name and the date along the bottom of every page */
async function stampedPdf(bytes: Buffer, r: CvRequest, locale: 'it' | 'en'): Promise<Uint8Array> {
  const doc = await PDFDocument.load(bytes);
  const font = await doc.embedFont(StandardFonts.Helvetica);
  /* the standard font only knows Latin letters: anything else becomes "?" */
  const safe = (s: string) => Array.from(s.normalize('NFC')).map((ch) => { try { font.encodeText(ch); return ch; } catch { return '?'; } }).join('');
  const when = day(new Date().toISOString(), locale);
  const line = safe(locale === 'en' ? `Personal copy for ${r.name} · ${when} · please do not forward` : `Copia personale per ${r.name} · ${when} · per favore non inoltrare`);
  for (const page of doc.getPages()) {
    const { width } = page.getSize();
    const size = 7;
    const w = font.widthOfTextAtSize(line, size);
    page.drawText(line, { x: Math.max(12, (width - w) / 2), y: 10, size, font, color: rgb(0.45, 0.42, 0.39) });
  }
  doc.setSubject(line);
  return doc.save();
}

export async function GET(_req: Request, ctx: { params: Promise<{ key: string; file?: string[] }> }) {
  const { key, file } = await ctx.params;
  const name = fileOf(file);
  if (!name) return gone();
  const r = await findByKey(key);
  if (!r) return gone();

  const type = TYPES[path.extname(name)] ?? 'application/octet-stream';
  const bytes = name.startsWith('fonts/') ? await readFile(path.join(FONT_DIR, name.slice(6))).catch(() => null) : await cvFile(name);
  if (!bytes) return new Response('The CV is not available right now.', { status: 503, headers: { ...PRIVATE, 'Content-Type': 'text/plain; charset=utf-8' } });

  if (name === 'index.html') {
    await markOpened(r);
    return new Response(personalPage(bytes.toString('utf8'), r), { headers: { ...PRIVATE, 'Content-Type': type } });
  }
  if (name in PDFS) {
    const pdf = await stampedPdf(bytes, r, PDFS[name]);
    return new Response(Buffer.from(pdf), {
      headers: { ...PRIVATE, 'Content-Type': type, 'Content-Disposition': `inline; filename="${name}"` },
    });
  }
  return new Response(new Uint8Array(bytes), { headers: { ...PRIVATE, 'Content-Type': type } });
}

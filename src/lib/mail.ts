/*
 * Emails, through Resend (RESEND_API_KEY on Vercel). Without the key nothing is sent and sendMail answers false.
 * The sender is CV_FROM_EMAIL (default: c.lab studio <cv@clabstudiomilano.com>). Server only.
 */
export type Mail = { to: string; subject: string; html: string; text: string; replyTo?: string };

export const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);
export const oneLine = (s: string) => s.replace(/[\r\n\t]+/g, ' ').trim();

export const button = (href: string, label: string) =>
  `<a href="${esc(href)}" style="display:inline-block;background:#16130f;color:#f7efe1;text-decoration:none;font:700 16px/1 Arial,sans-serif;padding:14px 22px;border-radius:999px">${esc(label)}</a>`;
export const frame = (body: string) =>
  `<div style="background:#f7efe1;padding:28px 16px"><div style="max-width:520px;margin:0 auto;background:#fff;border:3px solid #16130f;border-radius:18px;padding:26px;font:16px/1.5 Arial,sans-serif;color:#16130f">${body}<p style="margin:26px 0 0;font:12px/1.4 monospace;color:#7a6f63">c.lab studio · clabstudiomilano.com</p></div></div>`;

export async function sendMail(m: Mail): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return false;
  const from = process.env.CV_FROM_EMAIL || 'c.lab studio <cv@clabstudiomilano.com>';
  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ from, to: [m.to], subject: oneLine(m.subject), html: m.html, text: m.text, ...(m.replyTo ? { reply_to: m.replyTo } : {}) }),
      signal: AbortSignal.timeout(6000),
    });
    return res.ok;
  } catch {
    return false;
  }
}

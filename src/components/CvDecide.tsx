'use client';

import { useEffect, useState } from 'react';

type Req = { name: string; email: string; company: string | null; note: string | null; locale: 'it' | 'en'; status: 'pending' | 'approved' | 'rejected'; created_at: string; expires_at: string | null };
const date = new Intl.DateTimeFormat('it-IT', { day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit' });

/**
 * Where the button in Mel's email lands (/cv/decidi/?id=…&t=…). Opening it changes nothing:
 * only "Approva" or "Rifiuta" here decides (email scanners open links on their own).
 */
export function CvDecide() {
  const [q, setQ] = useState<{ id: string; t: string } | null>(null);
  const [req, setReq] = useState<Req | null>(null);
  const [state, setState] = useState<'loading' | 'ready' | 'busy' | 'invalid' | 'error'>('loading');
  const [result, setResult] = useState<{ link?: string; emailed?: boolean; rejected?: boolean } | null>(null);

  useEffect(() => {
    const p = new URLSearchParams(location.search);
    const id = p.get('id') ?? '', t = p.get('t') ?? '';
    setQ({ id, t });
    fetch(`/api/cv/decide/?id=${encodeURIComponent(id)}&t=${encodeURIComponent(t)}`)
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then((j: { request: Req }) => { setReq(j.request); setState('ready'); })
      .catch((s) => setState(s === 404 ? 'invalid' : 'error'));
  }, []);

  const decide = async (action: 'approve' | 'reject') => {
    if (!q) return;
    setState('busy');
    try {
      const r = await fetch('/api/cv/decide/', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...q, action }) });
      if (!r.ok) throw new Error();
      const j = (await r.json()) as { link?: string; emailed?: boolean };
      setResult(action === 'reject' ? { rejected: true } : j);
      setReq((x) => (x ? { ...x, status: action === 'approve' ? 'approved' : 'rejected' } : x));
      setState('ready');
    } catch {
      setState('error');
    }
  };

  return (
    <main className="owner owner-login cvr">
      <div className="owner-card cvr-card">
        <p className="owner-kicker">c.lab · richiesta del CV</p>
        {state === 'loading' && <p className="cvr-lead">Un attimo…</p>}
        {state === 'invalid' && <><h1>Link non valido</h1><p className="cvr-lead">Questo link non corrisponde a nessuna richiesta. Le trovi tutte in /owner/, scheda CV.</p></>}
        {req && (
          <>
            <h1>{req.name}</h1>
            <dl className="cvr-facts">
              <dt>Email</dt><dd>{req.email}</dd>
              {req.company && <><dt>Azienda</dt><dd>{req.company}</dd></>}
              {req.note && <><dt>Messaggio</dt><dd className="cvr-note">{req.note}</dd></>}
              <dt>Arrivata</dt><dd>{date.format(new Date(req.created_at))} · {req.locale === 'en' ? 'inglese' : 'italiano'}</dd>
              <dt>Stato</dt><dd><b>{req.status === 'pending' ? 'da decidere' : req.status === 'approved' ? 'approvata' : 'rifiutata'}</b></dd>
            </dl>
            {result?.link && (
              <div className="cvr-done" role="status">
                <p>{result.emailed ? `Fatto: il link è partito per email a ${req.email}.` : 'Approvata. L’email non è partita: manda tu questo link.'} Vale 7 giorni.</p>
                <CopyLink link={result.link} />
              </div>
            )}
            {result?.rejected && <p className="cvr-done" role="status">Rifiutata. Non le arriva niente.</p>}
            <div className="owner-buttons">
              <button className="btn" type="button" disabled={state === 'busy'} onClick={() => void decide('approve')}>
                {req.status === 'approved' ? 'Manda un link nuovo' : 'Approva e manda il link'}
              </button>
              {req.status !== 'rejected' && (
                <button className="chip owner-delete" type="button" disabled={state === 'busy'} onClick={() => void decide('reject')}>Rifiuta</button>
              )}
            </div>
          </>
        )}
        <p className="owner-error" role="alert">{state === 'error' ? 'Non riesco a parlare con il database, riprova tra poco.' : ''}</p>
      </div>
    </main>
  );
}

/** A link with a button that copies it. */
export function CopyLink({ link }: { link: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <div className="cvr-copy">
      <input readOnly value={link} onFocus={(e) => e.currentTarget.select()} aria-label="Link personale al CV" />
      <button className="chip" type="button" onClick={() => void navigator.clipboard?.writeText(link).then(() => setCopied(true))}>{copied ? 'Copiato' : 'Copia'}</button>
    </div>
  );
}

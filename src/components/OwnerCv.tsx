'use client';

import { useCallback, useEffect, useState } from 'react';
import { CopyLink } from './CvDecide';

type Req = {
  id: string; created_at: string; name: string; email: string; company: string | null; note: string | null; locale: 'it' | 'en';
  status: 'pending' | 'approved' | 'rejected'; decided_at: string | null; expires_at: string | null; opened_count: number; last_opened_at: string | null;
};

const API = '/api/cv/owner/';
const date = new Intl.DateTimeFormat('it-IT', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });
const live = (r: Req) => r.status === 'approved' && !!r.expires_at && Date.parse(r.expires_at) > Date.now();

/** The "CV" tab of /owner/: who asked for the CV, approve (a 7-day personal link), decline, end a link early. */
export function OwnerCv({ ownerKey }: { ownerKey: string }) {
  const [list, setList] = useState<Req[] | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [links, setLinks] = useState<Record<string, { link: string; emailed: boolean }>>({});

  const call = useCallback(async (init: RequestInit = {}) => {
    const res = await fetch(API, { ...init, headers: { 'Content-Type': 'application/json', 'x-owner-key': ownerKey } });
    if (!res.ok) throw new Error(res.status === 503 ? 'not-configured' : 'store');
    return res.json();
  }, [ownerKey]);

  const load = useCallback(async () => {
    try {
      const j = (await call()) as { requests: Req[] };
      setList(j.requests);
      setError('');
    } catch {
      setError('Non riesco a leggere le richieste. Hai creato la tabella cv_requests su Supabase (supabase/cv-requests.sql)?');
    }
  }, [call]);

  useEffect(() => { void load(); }, [load]);

  const act = async (r: Req, action: 'approve' | 'reject' | 'revoke') => {
    if (action === 'revoke' && !window.confirm(`Chiudere subito il link di ${r.name}?`)) return;
    setBusy(true);
    try {
      const j = (await call({ method: 'POST', body: JSON.stringify({ id: r.id, action }) })) as { link?: string; emailed?: boolean };
      if (j.link) setLinks((m) => ({ ...m, [r.id]: { link: j.link!, emailed: !!j.emailed } }));
      await load();
    } catch {
      setError('Non è andata, riprova tra poco.');
    } finally {
      setBusy(false);
    }
  };

  if (!list) return <p className="owner-error" role="alert">{error || 'Un attimo…'}</p>;
  if (list.length === 0) return <p className="owner-empty">Nessuna richiesta del CV, per ora.</p>;

  return (
    <>
      <p className="owner-error" role="alert">{error}</p>
      <ul className="owner-list">
        {list.map((r) => {
          const fresh = links[r.id];
          const state = r.status === 'pending' ? 'da decidere' : r.status === 'rejected' ? 'rifiutata' : live(r) ? `link attivo fino al ${date.format(new Date(r.expires_at!))}` : 'link scaduto o chiuso';
          return (
            <li key={r.id} className={live(r) ? 'live' : ''}>
              <p className="cvr-who">{r.name} <span>{r.email}</span></p>
              {(r.company || r.note) && <p className="cvr-note">{[r.company, r.note].filter(Boolean).join(' · ')}</p>}
              <p className="owner-meta">
                <span>{date.format(new Date(r.created_at))}</span>
                <span>{r.locale === 'en' ? 'inglese' : 'italiano'}</span>
                {r.status === 'approved' && <span>aperto {r.opened_count} {r.opened_count === 1 ? 'volta' : 'volte'}</span>}
                <span className="owner-state">{state}</span>
              </p>
              {fresh && (
                <div className="cvr-done" role="status">
                  <p>{fresh.emailed ? `Il link è partito per email a ${r.email}.` : 'L’email non è partita (manca Resend?): manda tu questo link.'}</p>
                  <CopyLink link={fresh.link} />
                </div>
              )}
              <div className="owner-buttons">
                {r.status === 'pending' && <button className="btn small" type="button" disabled={busy} onClick={() => void act(r, 'approve')}>Approva e manda il link</button>}
                {r.status !== 'pending' && <button className="chip" type="button" disabled={busy} onClick={() => void act(r, 'approve')}>{r.status === 'rejected' ? 'Approva' : 'Link nuovo'}</button>}
                {live(r) && <button className="chip" type="button" disabled={busy} onClick={() => void act(r, 'revoke')}>Chiudi il link</button>}
                {r.status === 'pending' && <button className="chip owner-delete" type="button" disabled={busy} onClick={() => void act(r, 'reject')}>Rifiuta</button>}
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
}

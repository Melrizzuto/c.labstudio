'use client';

import { useCallback, useEffect, useState, type FormEvent } from 'react';
import { Sticker, type StickerKey } from '@/content/stickers';

type Note = { id: number; created_at: string; name: string | null; message: string; mood: 'like' | 'dislike'; locale: 'it' | 'en'; approved: boolean; sticker: StickerKey | null };
type Tab = 'todo' | 'live' | 'all';

const API = '/api/guestbook/owner/';
const KEY = 'clab-owner-key';
const date = new Intl.DateTimeFormat('it-IT', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });

/* the password lives only in this tab (sessionStorage), never in the page or the code */
const readKey = () => { try { return sessionStorage.getItem(KEY) ?? ''; } catch { return ''; } };
const saveKey = (k: string) => { try { if (k) sessionStorage.setItem(KEY, k); else sessionStorage.removeItem(KEY); } catch { /* private mode */ } };

/** The owner's page: read every note, publish it, hide it again or delete it. */
export function OwnerNotes() {
  const [key, setKey] = useState('');
  const [notes, setNotes] = useState<Note[] | null>(null);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [tab, setTab] = useState<Tab>('todo');

  const call = useCallback(async (k: string, init: RequestInit = {}) => {
    const res = await fetch(API, { ...init, headers: { 'Content-Type': 'application/json', 'x-owner-key': k, ...(init.headers ?? {}) } });
    if (res.status === 401) throw new Error('wrong-password');
    if (res.status === 503) throw new Error('not-configured');
    if (!res.ok) throw new Error('store');
    return res.json();
  }, []);

  const load = useCallback(async (k: string) => {
    setBusy(true);
    try {
      const j = (await call(k)) as { notes: Note[] };
      setNotes(j.notes);
      setKey(k);
      saveKey(k);
      setError('');
    } catch (e) {
      setNotes(null);
      saveKey('');
      setError((e as Error).message);
    } finally {
      setBusy(false);
    }
  }, [call]);

  useEffect(() => {
    const k = readKey();
    if (k) void load(k);
  }, [load]);

  const onLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const k = String(new FormData(e.currentTarget).get('password') ?? '');
    if (k) void load(k);
  };

  const act = async (n: Note, what: 'publish' | 'hide' | 'delete') => {
    if (what === 'delete' && !window.confirm('Eliminare questa dedica? Non si può tornare indietro.')) return;
    setBusy(true);
    try {
      if (what === 'delete') await call(key, { method: 'DELETE', body: JSON.stringify({ id: n.id }) });
      else await call(key, { method: 'PATCH', body: JSON.stringify({ id: n.id, approved: what === 'publish' }) });
      setNotes((list) => (list ? (what === 'delete' ? list.filter((x) => x.id !== n.id) : list.map((x) => (x.id === n.id ? { ...x, approved: what === 'publish' } : x))) : list));
      setError('');
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy(false);
    }
  };

  const message = error === 'wrong-password' ? 'Password sbagliata.' : error === 'not-configured' ? 'Manca la password su Vercel (variabile OWNER_PASSWORD).' : error ? 'Non riesco a parlare con il database, riprova tra poco.' : '';

  if (!notes) {
    return (
      <main className="owner owner-login">
        <form className="owner-card" onSubmit={onLogin}>
          <p className="owner-kicker">c.lab · area riservata</p>
          <h1>Le dediche</h1>
          <label>
            <span>Password</span>
            <input name="password" type="password" autoComplete="current-password" required autoFocus />
          </label>
          <button className="btn" type="submit" disabled={busy}>{busy ? 'Un attimo…' : 'Entra'}</button>
          <p className="owner-error" role="alert">{message}</p>
        </form>
      </main>
    );
  }

  const todo = notes.filter((n) => !n.approved), live = notes.filter((n) => n.approved);
  const shown = tab === 'todo' ? todo : tab === 'live' ? live : notes;
  return (
    <main className="owner">
      <header className="owner-top">
        <div>
          <p className="owner-kicker">c.lab · area riservata</p>
          <h1>Le dediche</h1>
        </div>
        <div className="owner-actions">
          <button className="chip" type="button" onClick={() => void load(key)} disabled={busy}>Aggiorna</button>
          <button className="chip" type="button" onClick={() => { saveKey(''); setNotes(null); setKey(''); }}>Esci</button>
        </div>
      </header>
      <nav className="owner-tabs" aria-label="Filtra le dediche">
        {([['todo', `Da approvare · ${todo.length}`], ['live', `Pubblicate · ${live.length}`], ['all', `Tutte · ${notes.length}`]] as [Tab, string][]).map(([t, label]) => (
          <button key={t} type="button" className={tab === t ? 'on' : ''} aria-pressed={tab === t} onClick={() => setTab(t)}>{label}</button>
        ))}
      </nav>
      <p className="owner-error" role="alert">{message}</p>
      {shown.length === 0 ? (
        <p className="owner-empty">{tab === 'todo' ? 'Niente da approvare. Calì approva.' : 'Ancora niente qui.'}</p>
      ) : (
        <ul className="owner-list">
          {shown.map((n) => (
            <li key={n.id} className={n.approved ? 'live' : ''}>
              {n.sticker && <Sticker k={n.sticker} className="owner-sticker" />}
              <p className="owner-msg">{n.message}</p>
              <p className="owner-meta">
                <span className={`gb-mood ${n.mood}`}>{n.mood === 'like' ? 'Mi piace' : 'Non mi convince'}</span>
                <span>{n.name || 'Senza nome'}</span>
                <span>{date.format(new Date(n.created_at))}</span>
                <span>{n.locale === 'en' ? 'inglese' : 'italiano'}</span>
                <span className="owner-state">{n.approved ? 'pubblicata' : 'da approvare'}</span>
              </p>
              <div className="owner-buttons">
                {n.approved ? (
                  <button className="chip" type="button" disabled={busy} onClick={() => void act(n, 'hide')}>Nascondi</button>
                ) : (
                  <button className="btn small" type="button" disabled={busy} onClick={() => void act(n, 'publish')}>Pubblica</button>
                )}
                <button className="chip owner-delete" type="button" disabled={busy} onClick={() => void act(n, 'delete')}>Elimina</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}

'use client';

import { useRef, useState, type FormEvent } from 'react';
import type { Locale } from '@/i18n/types';

const T = {
  it: {
    kicker: 'c.lab studio · curriculum',
    title: 'Il mio CV',
    lead: 'Lo mando a chi me lo chiede. Lasciami due righe: quando approvo, ti arriva per email un link personale, valido 7 giorni.',
    name: 'Nome e cognome',
    email: 'Email',
    company: 'Azienda o progetto',
    note: 'Due righe su di te',
    optional: 'facoltativo',
    send: 'Chiedi il CV',
    sending: 'Un attimo…',
    doneTitle: 'Richiesta arrivata',
    done: (email: string) => `Grazie! Appena la approvo ti scrivo a ${email} con il link al CV.`,
    error: 'Qualcosa non è andato. Controlla nome ed email e riprova.',
    down: 'Il modulo non risponde adesso. Riprova tra poco, o scrivimi su LinkedIn.',
    back: '← Torna al sito',
    home: '/',
    other: { href: '/en/cv/', label: 'English' },
  },
  en: {
    kicker: 'c.lab studio · résumé',
    title: 'My CV',
    lead: 'I send it to whoever asks. Leave me a couple of lines: once I approve, you get a personal link by email, valid for 7 days.',
    name: 'Full name',
    email: 'Email',
    company: 'Company or project',
    note: 'A couple of lines about you',
    optional: 'optional',
    send: 'Ask for the CV',
    sending: 'One moment…',
    doneTitle: 'Request received',
    done: (email: string) => `Thanks! As soon as I approve it, I’ll write to ${email} with the link to the CV.`,
    error: 'Something went wrong. Check your name and email and try again.',
    down: 'The form is not answering right now. Try again in a bit, or write to me on LinkedIn.',
    back: '← Back to the site',
    home: '/en/',
    other: { href: '/cv/', label: 'Italiano' },
  },
} as const;

/** The form on /cv/ and /en/cv/: whoever wants the CV asks for it, Mel approves, a personal link arrives by email. */
export function CvRequest({ locale }: { locale: Locale }) {
  const t = T[locale];
  const opened = useRef(Date.now());
  const [state, setState] = useState<'idle' | 'busy' | 'done' | 'error' | 'down'>('idle');
  const [sentTo, setSentTo] = useState('');

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const get = (k: string) => String(f.get(k) ?? '');
    setState('busy');
    try {
      const res = await fetch('/api/cv/request/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: get('name'), email: get('email'), company: get('company'), note: get('note'), website: get('website'), locale, elapsed: Date.now() - opened.current }),
      });
      if (res.ok) {
        setSentTo(get('email').trim());
        setState('done');
      } else setState(res.status === 400 ? 'error' : 'down');
    } catch {
      setState('down');
    }
  };

  return (
    <main className="owner owner-login cvr">
      <div className="owner-card cvr-card">
        <nav className="cvr-nav">
          <a href={t.home}>{t.back}</a>
          <a href={t.other.href} hrefLang={locale === 'it' ? 'en' : 'it'}>{t.other.label}</a>
        </nav>
        <p className="owner-kicker">{t.kicker}</p>
        <h1>{state === 'done' ? t.doneTitle : t.title}</h1>
        {state === 'done' ? (
          <p className="cvr-lead" role="status">{t.done(sentTo)}</p>
        ) : (
          <>
            <p className="cvr-lead">{t.lead}</p>
            <form className="cvr-form" onSubmit={onSubmit}>
              <label>
                <span>{t.name}</span>
                <input name="name" autoComplete="name" required minLength={2} maxLength={80} />
              </label>
              <label>
                <span>{t.email}</span>
                <input name="email" type="email" autoComplete="email" required maxLength={200} />
              </label>
              <label>
                <span>{t.company} <small>({t.optional})</small></span>
                <input name="company" autoComplete="organization" maxLength={120} />
              </label>
              <label>
                <span>{t.note} <small>({t.optional})</small></span>
                <textarea name="note" rows={3} maxLength={500} />
              </label>
              {/* for bots only: people never see this field */}
              <input className="cvr-trap" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" />
              <button className="btn" type="submit" disabled={state === 'busy'}>{state === 'busy' ? t.sending : t.send}</button>
              <p className="owner-error" role="alert">{state === 'error' ? t.error : state === 'down' ? t.down : ''}</p>
            </form>
          </>
        )}
      </div>
    </main>
  );
}

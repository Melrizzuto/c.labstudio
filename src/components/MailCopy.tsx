'use client';

import { useEffect, useRef, useState } from 'react';
import type { Dictionary } from '@/i18n/types';

/** The e-mail address with its "copy" button (falls back to selecting the text). */
export function MailCopy({ email, t }: { email: string; t: Dictionary['contact'] }) {
  const mail = useRef<HTMLSpanElement>(null);
  const [label, setLabel] = useState(t.copy);
  const timer = useRef<number | undefined>(undefined);
  useEffect(() => () => clearTimeout(timer.current), []);
  const onClick = () => {
    const ok = () => {
      setLabel(t.copied);
      timer.current = window.setTimeout(() => setLabel(t.copy), 2000);
    };
    const fallback = () => {
      const el = mail.current;
      if (!el) return;
      const r = document.createRange();
      r.selectNodeContents(el);
      const s = getSelection();
      s?.removeAllRanges();
      s?.addRange(r);
      setLabel(/Mac|iPhone|iPad/.test(navigator.platform) ? t.selectedMac : t.selectedOther);
    };
    try {
      navigator.clipboard.writeText(mail.current?.textContent ?? '').then(ok, fallback);
    } catch {
      fallback();
    }
  };
  return (
    <p className="mail">
      <span id="mail" ref={mail}>
        {email}
      </span>{' '}
      <button className="btn small" id="copyMail" type="button" onClick={onClick}>
        {label}
      </button>
    </p>
  );
}

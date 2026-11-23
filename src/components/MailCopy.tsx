'use client';

import { useEffect, useRef, useState } from 'react';
import type { Dictionary } from '@/i18n/types';

/** The "copy my address" button: the address itself stays hidden, and only shows (selected) if the clipboard is blocked. */
export function MailCopy({ email, t }: { email: string; t: Dictionary['contact'] }) {
  const mail = useRef<HTMLSpanElement>(null);
  const [label, setLabel] = useState(t.copy);
  const [shown, setShown] = useState(false);
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
      setShown(true);
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
    <>
      <button className="btn small ghost" id="copyMail" type="button" onClick={onClick}>
        {label}
      </button>
      <span id="mail" ref={mail} className={shown ? 'mail-out shown' : 'mail-out'}>
        {email}
      </span>
    </>
  );
}

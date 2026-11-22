'use client';

import { useEffect, useRef, useState } from 'react';
import type { Dictionary } from '@/i18n/types';

/*
 * Phones only (the links in the bar are hidden below 820 px): a "Menu" button that opens the section links.
 * Esc or a click outside closes it and gives the focus back to the button; choosing a link closes it too.
 */
export function HeaderMenu({ t, links, cta }: { t: Dictionary['header']['menu']; links: { href: string; text: string }[]; cta: { href: string; text: string } }) {
  const [open, setOpen] = useState(false);
  const wrap = useRef<HTMLDivElement>(null);
  const button = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    wrap.current?.querySelector<HTMLElement>('.menu-panel a')?.focus();
    const close = (refocus: boolean) => {
      setOpen(false);
      if (refocus) button.current?.focus();
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        close(true);
      }
    };
    const onPointer = (e: PointerEvent) => {
      if (!wrap.current?.contains(e.target as Node)) close(false);
    };
    const onFocus = (e: FocusEvent) => {
      if (!wrap.current?.contains(e.target as Node)) close(false);
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onPointer);
    document.addEventListener('focusin', onFocus);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('pointerdown', onPointer);
      document.removeEventListener('focusin', onFocus);
    };
  }, [open]);

  return (
    <div className="menu" ref={wrap}>
      <button
        className="menu-btn"
        type="button"
        aria-expanded={open}
        aria-controls="section-menu"
        aria-label={open ? t.close : t.open}
        ref={button}
        onClick={() => setOpen((o) => !o)}
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          {open ? (
            <path fill="currentColor" d="M6.4 5 12 10.6 17.6 5 19 6.4 13.4 12l5.6 5.6-1.4 1.4-5.6-5.6L6.4 19 5 17.6l5.6-5.6L5 6.4z" />
          ) : (
            <path fill="currentColor" d="M3 6h18v2.4H3zM3 10.8h18v2.4H3zM3 15.6h18V18H3z" />
          )}
        </svg>
        <span>{t.text}</span>
      </button>
      <div className="menu-panel" id="section-menu" hidden={!open} onClick={(e) => (e.target as Element).closest('a') && setOpen(false)}>
        {links.map((l) => (
          <a key={l.href} href={l.href}>
            {l.text}
          </a>
        ))}
        <a className="btn small" href={cta.href}>
          {cta.text}
        </a>
      </div>
    </div>
  );
}

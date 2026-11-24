'use client';

import { useEffect } from 'react';
import { openCase } from '@/lib/cases';
import { startTheme } from '@/lib/theme';
import { startAddressBar } from '@/lib/addressBar';
import type { Locale } from '@/i18n/types';
import type { Target } from '@/lib/routes';

/*
 * The page-wide behaviour, rendered last like the original <script> at the end of <body>:
 * clicks on [data-case] / [data-close] / [data-go], the case dialogs, and the day/night theme.
 */
export function PageScripts({ locale, target }: { locale: Locale; target: Target }) {
  useEffect(() => {
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const go = (id: string) => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
    };
    window.__openCase = openCase;

    /* closing a case pauses its video */
    const dialogs = Array.from(document.querySelectorAll<HTMLDialogElement>('dialog.case'));
    const onClose = (e: Event) => (e.currentTarget as HTMLElement).querySelector<HTMLVideoElement>('.demo video')?.pause();
    dialogs.forEach((d) => d.addEventListener('close', onClose));

    const onClick = (e: MouseEvent) => {
      const target = e.target as Element;
      const c = target.closest<HTMLElement>('[data-case]');
      if (c) {
        openCase(c.dataset.case!);
        return;
      }
      const x = target.closest('[data-close]');
      if (x) {
        x.closest('dialog')?.close();
        return;
      }
      /* a click on the backdrop, left of the sheet */
      if (target instanceof HTMLDialogElement && target.classList.contains('case')) {
        const r = target.getBoundingClientRect();
        if (e.clientX < r.left) target.close();
      }
      const g = target.closest<HTMLElement>('[data-go]');
      if (g) go(g.dataset.go!);
    };
    document.addEventListener('click', onClick);

    const stopTheme = startTheme();
    const stopAddress = startAddressBar(locale, target);
    return () => {
      document.removeEventListener('click', onClick);
      dialogs.forEach((d) => d.removeEventListener('close', onClose));
      stopTheme();
      stopAddress();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- once per page: the target is the address it was served at
  }, []);
  return null;
}

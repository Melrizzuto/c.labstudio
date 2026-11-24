'use client';

import { useEffect } from 'react';

/* where people still select, copy and type: form fields, the e-mail address and the owner's page */
const FREE = 'input, textarea, select, [contenteditable], .mail-out, main.owner';
const free = (n: EventTarget | Node | null | undefined) => {
  const el = n instanceof Element ? n : n instanceof Node ? n.parentElement : null;
  return !!el?.closest(FREE);
};

/*
 * A deterrent against copying the site: no text selection, copy, right-click, drag, save, print or view-source shortcuts,
 * and the clipboard emptied after the Print Screen key. (The CSS half is in globals.css: user-select and @media print.)
 * It cannot stop screenshots taken by the phone or the operating system, nor someone reading the page's code.
 */
export function NoCopy() {
  useEffect(() => {
    const stop = (e: Event) => {
      if (e.type === 'copy' || e.type === 'cut') {
        if (free(getSelection()?.anchorNode) || free(e.target)) return;
      } else if (free(e.target)) return;
      e.preventDefault();
    };
    const keys = (e: KeyboardEvent) => {
      const k = (e.key || '').toLowerCase();
      if (!(e.metaKey || e.ctrlKey)) return;
      if (['s', 'p', 'u'].includes(k)) e.preventDefault();
      else if (['a', 'c', 'x'].includes(k) && !free(e.target) && !free(getSelection()?.anchorNode)) e.preventDefault();
    };
    /* Windows: Print Screen copies the screen to the clipboard; overwrite it and hide the page for a moment */
    const printScreen = (e: KeyboardEvent) => {
      if (e.key !== 'PrintScreen') return;
      navigator.clipboard?.writeText('').catch(() => {});
      document.documentElement.classList.add('no-shot');
      window.setTimeout(() => document.documentElement.classList.remove('no-shot'), 1500);
    };
    const types = ['contextmenu', 'copy', 'cut', 'dragstart', 'selectstart'] as const;
    types.forEach((t) => document.addEventListener(t, stop));
    document.addEventListener('keydown', keys);
    document.addEventListener('keyup', printScreen);
    return () => {
      types.forEach((t) => document.removeEventListener(t, stop));
      document.removeEventListener('keydown', keys);
      document.removeEventListener('keyup', printScreen);
    };
  }, []);
  return null;
}

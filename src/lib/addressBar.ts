/*
 * Keeps the address bar on what is on screen, so any moment of the site can be shared (client side only).
 * - A case or the notebook opens: its address is pushed, so Back closes it. Closing it goes back too.
 * - Scrolling through the room: the chapter in the middle of the screen replaces the address (no history spam).
 * - Arriving on a shared address: scroll to the chapter, or to the desk and open the case or the notebook.
 * - The EN/IT link always points to the same place in the other language.
 */
import type { Locale } from '@/i18n/types';
import { caseDialogId, type CaseKey } from '@/content/cases';
import { openCase } from './cases';
import { parsePath, pathFor, SECTION_TITLES, type SectionId, type Target } from './routes';

const OVERLAY = 'clabOverlay';
const CHAPTERS: SectionId[] = ['percorso', 'progetti', 'divano', 'weekend', 'contatti'];
const SITE = 'c.lab studio';

const isOverlay = (t: Target | undefined) => t?.kind === 'case' || t?.kind === 'notebook';
const openDialogs = () => document.querySelectorAll<HTMLDialogElement>('dialog.case[open], dialog#notebook[open]');

export function startAddressBar(locale: Locale, initial: Target): () => void {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  /* where the visitor is under any open sheet: home or a chapter */
  let under: Target = isOverlay(initial) ? { kind: 'section', id: 'progetti' } : initial;
  /* set while we open or close something because of Back/Forward, so that doesn't write history again */
  let fromHistory = false;

  const current = () => parsePath(location.pathname)?.target;
  const write = (t: Target, mode: 'push' | 'replace', state: Record<string, unknown> | null = history.state) => {
    const path = pathFor(locale, t);
    if (location.pathname !== path) history[mode === 'push' ? 'pushState' : 'replaceState'](state, '', path);
    syncLang(t);
    document.title = titleOf(t);
  };
  const syncLang = (t: Target) => {
    const other: Locale = locale === 'en' ? 'it' : 'en';
    document.querySelectorAll<HTMLAnchorElement>('a.lang').forEach((a) => (a.href = pathFor(other, t)));
  };
  /* the same titles as the prerendered pages (see pageMetadata) */
  const titleOf = (t: Target) => {
    if (t.kind === 'section') return `${SECTION_TITLES[locale][t.id]} · ${SITE}`;
    if (t.kind === 'case') return `${document.querySelector(`#${caseDialogId(t.key)} h2`)?.textContent ?? ''} · ${SITE}`;
    if (t.kind === 'notebook') return `${document.getElementById('guest-title')?.textContent ?? ''} · ${SITE}`;
    return SITE;
  };
  const scrollTo = (id: string, smooth: boolean) =>
    document.getElementById(id)?.scrollIntoView({ behavior: smooth && !reduce ? 'smooth' : 'auto', block: 'start' });

  /* a sheet opened (by a click, or by us) */
  const onOpened = (t: Target) => {
    if (fromHistory) return;
    const now = current();
    if (isOverlay(now)) write(t, 'replace'); // one sheet replaces another: still one Back to leave
    else write(t, 'push', { ...(history.state || {}), [OVERLAY]: true });
  };
  const onCaseOpened = (e: Event) => {
    const key = (e as CustomEvent<string>).detail.replace(/^case-/, '') as CaseKey;
    onOpened({ kind: 'case', key });
  };
  const onNotebookOpened = () => onOpened({ kind: 'notebook' });
  window.addEventListener('clab:case-opened', onCaseOpened);
  window.addEventListener('clab:notebook-opened', onNotebookOpened);

  /* a sheet closed: unless another one is opening, leave its address */
  const onClosed = () => {
    if (fromHistory) return;
    setTimeout(() => {
      if (openDialogs().length || !isOverlay(current())) return;
      if (history.state?.[OVERLAY]) history.back();
      else write(under, 'replace', null);
    }, 0);
  };
  const dialogs = Array.from(document.querySelectorAll<HTMLDialogElement>('dialog.case, dialog#notebook'));
  dialogs.forEach((d) => d.addEventListener('close', onClosed));

  /* Back / Forward */
  const onPop = () => {
    const t = current();
    if (!t) return;
    fromHistory = true;
    if (t.kind === 'case') openCase(caseDialogId(t.key));
    else if (t.kind === 'notebook') window.dispatchEvent(new Event('clab:open-notebook'));
    else openDialogs().forEach((d) => d.close());
    syncLang(t);
    document.title = titleOf(t);
    setTimeout(() => (fromHistory = false), 0);
  };
  addEventListener('popstate', onPop);

  /* the chapter in the middle of the screen names the address */
  const hero = document.querySelector('main > :first-child');
  const watched = [hero, document.getElementById('intro-stanza'), ...CHAPTERS.map((id) => document.getElementById(id))].filter(Boolean) as Element[];
  const spy = new IntersectionObserver(
    (entries) => {
      const hit = entries.find((e) => e.isIntersecting);
      if (!hit) return;
      const id = hit.target.id as SectionId;
      under = CHAPTERS.includes(id) ? { kind: 'section', id } : { kind: 'home' };
      if (!isOverlay(current())) write(under, 'replace');
    },
    { rootMargin: '-50% 0px -50% 0px' },
  );

  /* links to a chapter of this page (header, menu): scroll there instead of reloading */
  const onLink = (e: MouseEvent) => {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    const a = (e.target as Element).closest<HTMLAnchorElement>('a[href]');
    if (!a || a.target || a.classList.contains('lang')) return;
    const url = new URL(a.href, location.href);
    if (url.origin !== location.origin) return;
    const p = parsePath(url.pathname);
    if (!p || p.locale !== locale || isOverlay(p.target)) return;
    e.preventDefault();
    if (p.target.kind === 'section') scrollTo(p.target.id, true);
    else scrollTo('top', true);
  };
  document.addEventListener('click', onLink);

  /* arriving on a shared address */
  const arrive = () => {
    if (initial.kind === 'section') scrollTo(initial.id, false);
    if (isOverlay(initial)) scrollTo('progetti', false);
  };
  if (initial.kind !== 'home') {
    arrive();
    /* the room's pictures can still change the layout: land again once everything is in */
    if (document.readyState !== 'complete') addEventListener('load', arrive, { once: true });
    fromHistory = true; // the address is already the right one
    if (initial.kind === 'case') openCase(caseDialogId(initial.key));
    if (initial.kind === 'notebook') window.dispatchEvent(new Event('clab:open-notebook'));
    setTimeout(() => (fromHistory = false), 0);
  }
  syncLang(initial);
  /* start watching the scroll only after landing, so the landing doesn't rewrite the address */
  const spyStart = setTimeout(() => watched.forEach((el) => spy.observe(el)), 800);

  return () => {
    clearTimeout(spyStart);
    spy.disconnect();
    removeEventListener('popstate', onPop);
    removeEventListener('load', arrive);
    document.removeEventListener('click', onLink);
    dialogs.forEach((d) => d.removeEventListener('close', onClosed));
    window.removeEventListener('clab:case-opened', onCaseOpened);
    window.removeEventListener('clab:notebook-opened', onNotebookOpened);
  };
}

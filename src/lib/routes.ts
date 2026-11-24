/*
 * Shareable addresses for everything that opens on the one-page site: the room's chapters, each case study
 * and the notebook (guestbook). Every address is a real, prerendered page that shows the same home page and
 * opens or scrolls to its target; while you browse, the address bar follows what is on screen.
 * Used on the server (static params, metadata) and in the browser (URL sync), so no DOM here.
 */
import type { Locale } from '@/i18n/types';
import type { CaseKey } from '@/content/cases/types';

export type SectionId = 'percorso' | 'progetti' | 'divano' | 'weekend' | 'contatti';

/** The chapter ids in the page, and their slug in each language. */
export const SECTION_SLUGS: Record<Locale, Record<SectionId, string>> = {
  it: { percorso: 'percorso', progetti: 'progetti', divano: 'divano', weekend: 'weekend', contatti: 'contatti' },
  en: { percorso: 'journey', progetti: 'projects', divano: 'sofa', weekend: 'weekend', contatti: 'contact' },
};

/** Case keys to their slug (the same in both languages). */
export const CASE_SLUGS: Record<CaseKey, string> = {
  cali: 'cali',
  studio: 'studio-ai',
  stat: 'stat',
  philo: 'philo',
  spotify: 'spotify-mood',
  newsquest: 'newsquest',
};

/** Chapter names for page titles, e.g. "I progetti · c.lab studio". */
export const SECTION_TITLES: Record<Locale, Record<SectionId, string>> = {
  it: { percorso: 'Il percorso', progetti: 'I progetti', divano: 'Il divano', weekend: 'Il weekend', contatti: 'Contatti' },
  en: { percorso: 'The journey', progetti: 'Projects', divano: 'The sofa', weekend: 'Weekends', contatti: 'Contact' },
};

const NOTEBOOK_SLUG: Record<Locale, string> = { it: 'agenda', en: 'notes' };

export type Target =
  | { kind: 'home' }
  | { kind: 'section'; id: SectionId }
  | { kind: 'case'; key: CaseKey }
  | { kind: 'notebook' };

export const homePath = (locale: Locale) => (locale === 'en' ? '/en/' : '/');

export function pathFor(locale: Locale, t: Target): string {
  const base = homePath(locale);
  switch (t.kind) {
    case 'home':
      return base;
    case 'section':
      return `${base}${SECTION_SLUGS[locale][t.id]}/`;
    case 'case':
      return `${base}${SECTION_SLUGS[locale].progetti}/${CASE_SLUGS[t.key]}/`;
    case 'notebook':
      return `${base}${NOTEBOOK_SLUG[locale]}/`;
  }
}

/** Reads an address of this site back into a target (null if it is not one of ours). */
export function parsePath(pathname: string): { locale: Locale; target: Target } | null {
  const parts = pathname.split('/').filter(Boolean);
  let locale: Locale = 'it';
  if (parts[0] === 'en') {
    locale = 'en';
    parts.shift();
  }
  if (parts.length === 0) return { locale, target: { kind: 'home' } };
  const sections = SECTION_SLUGS[locale];
  if (parts.length === 1) {
    if (parts[0] === NOTEBOOK_SLUG[locale]) return { locale, target: { kind: 'notebook' } };
    const id = (Object.keys(sections) as SectionId[]).find((k) => sections[k] === parts[0]);
    return id ? { locale, target: { kind: 'section', id } } : null;
  }
  if (parts.length === 2 && parts[0] === sections.progetti) {
    const key = (Object.keys(CASE_SLUGS) as CaseKey[]).find((k) => CASE_SLUGS[k] === parts[1]);
    return key ? { locale, target: { kind: 'case', key } } : null;
  }
  return null;
}

/** The slugs each language prerenders under its root (chapters other than "projects", plus the notebook). */
export function topSlugs(locale: Locale): string[] {
  const s = SECTION_SLUGS[locale];
  return [s.percorso, s.divano, s.weekend, s.contatti, NOTEBOOK_SLUG[locale]];
}

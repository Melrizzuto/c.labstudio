import type { Locale } from '@/i18n/types';
import type { CaseCopy, CaseKey, CaseMeta } from './types';
import { cali } from './cali';
import { studio } from './studio';
import { stat } from './stat';
import { philo } from './philo';
import { spotify } from './spotify';
import { newsquest } from './newsquest';

export type { CaseKey, CaseCopy } from './types';

/** Order of the dialogs in the page. To add a project: write its module, add it here and place it on the desk. */
const CASES: (CaseMeta & { copy: Record<Locale, CaseCopy> })[] = [
  { key: 'cali', swatch: 'cali', copy: cali },
  { key: 'studio', swatch: 'studio', copy: studio },
  { key: 'stat', swatch: 'stat', copy: stat },
  { key: 'philo', swatch: 'philo', copy: philo },
  { key: 'spotify', swatch: 'spotify', copy: spotify },
  { key: 'newsquest', swatch: 'newsquest', copy: newsquest },
];

export interface CaseStudy extends CaseMeta, CaseCopy {}

export function getCases(locale: Locale): CaseStudy[] {
  return CASES.map(({ copy, ...meta }) => ({ ...meta, ...copy[locale] }));
}

export function getCase(locale: Locale, key: CaseKey): CaseStudy {
  const found = getCases(locale).find((c) => c.key === key);
  if (!found) throw new Error(`Unknown case ${key}`);
  return found;
}

export const caseDialogId = (key: CaseKey) => `case-${key}`;
export const caseTitleId = (key: CaseKey) => `cs-${key}-t`;

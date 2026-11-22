import type { Dictionary, Locale } from './types';
import { it } from './it';
import { en } from './en';

export type { Dictionary, Locale } from './types';

const dictionaries: Record<Locale, Dictionary> = { it, en };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

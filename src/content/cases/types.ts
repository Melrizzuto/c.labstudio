import type { Rich } from '@/i18n/types';

/** Every case study has a key; its dialog is `#case-<key>` and its heading `#cs-<key>-t`. */
export type CaseKey = 'cali' | 'studio' | 'stat' | 'philo' | 'spotify' | 'newsquest';

export interface CaseImage {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

export interface CaseFigure {
  img: CaseImage;
  caption?: Rich;
}

export interface CaseStep {
  when?: string;
  title: string;
  text: Rich;
}

/**
 * The body of a case study is a list of blocks, rendered in order by `CaseBlocks`.
 * Each kind maps to one piece of the original markup (see the class names in globals.css).
 */
export type CaseBlock =
  /** figure.demo: the muted looping video that starts when the dialog opens */
  | { kind: 'demo'; src: string; poster: string; label: string }
  /** a single figure with optional caption */
  | { kind: 'figure'; figure: CaseFigure }
  /** div.pair: two figures side by side */
  | { kind: 'pair'; figures: CaseFigure[] }
  /** div.facts: when / role / where */
  | { kind: 'facts'; items: { label: string; value: string }[] }
  /** h3 section title */
  | { kind: 'heading'; text: string; id?: string }
  /** a paragraph */
  | { kind: 'text'; text: Rich; marginTop?: number }
  /** ul */
  | { kind: 'list'; items: Rich[] }
  /** ol.steps: numbered steps, optionally dated */
  | { kind: 'steps'; items: CaseStep[] }
  /** div.decisions: the key decisions, two per row */
  | { kind: 'decisions'; items: { title: string; text: string }[] }
  /** div.numbers: four big figures */
  | { kind: 'numbers'; items: { value: string; label: string }[] }
  /** p.quote */
  | { kind: 'quote'; text: string }
  /** p.tools: "Tools." followed by the list */
  | { kind: 'tools'; label: string; text: string }
  /** section.new: the yellow "new this week" box, with its own blocks */
  | { kind: 'highlight'; id: string; title: string; blocks: CaseBlock[] }
  /** div.badge: Calì's ID card */
  | { kind: 'badge'; photo: CaseImage; facts: { term: string; detail: string }[]; stamp: string };

export type CaseAction = { label: string; close: true } | { label: string; open: CaseKey };

/** All the words of one case study, in one language. */
export interface CaseCopy {
  /** label in the dialog's sticky top bar, e.g. "Cartella a scacchi" */
  folder: string;
  /** tarot name, e.g. "I · L'Interprete" (also on the desk pin and in the project list) */
  tarot: string;
  title: string;
  /** aria-label of the clickable spot on the illustration */
  hitLabel: string;
  /** one line for the project list on the desk chapter (Calì has none) */
  blurb?: string;
  /** who the project was for */
  owner?: string;
  tagline: string;
  blocks: CaseBlock[];
  /** the buttons at the bottom: close, or open another case */
  next: CaseAction[];
}

/** Language-independent facts about a case study. */
export interface CaseMeta {
  key: CaseKey;
  /** swatch pattern: class `sw-<swatch>` */
  swatch: string;
}

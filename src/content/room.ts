import type { CSSProperties } from 'react';
import type { CaseKey } from './cases/types';

/*
 * Where things sit on the three illustrations (2688 × 1520 pictures).
 * Hit areas are % of the picture; pins are the % point they stick to.
 */

/** The five folders on the desk: the clickable area on the picture and the sticker that follows it. */
export const DESK_FOLDERS: { key: CaseKey; hit: CSSProperties; pin: { x: string; y: string } }[] = [
  { key: 'studio', hit: { left: '27.5%', top: '56%', width: '12.5%', height: '36%' }, pin: { x: '33.5', y: '61' } },
  { key: 'stat', hit: { left: '37%', top: '53%', width: '10%', height: '35%' }, pin: { x: '42', y: '57' } },
  { key: 'philo', hit: { left: '45%', top: '51%', width: '10.5%', height: '36%' }, pin: { x: '50.5', y: '55' } },
  { key: 'spotify', hit: { left: '55%', top: '52%', width: '7%', height: '36%' }, pin: { x: '60', y: '49' } },
  { key: 'newsquest', hit: { left: '62%', top: '54%', width: '12.5%', height: '36%' }, pin: { x: '65', y: '64' } },
];

/** The project list in the desk chapter: Witailer first, then the academy. */
export const PROJECT_GROUPS: { work: CaseKey[]; academy: CaseKey[] } = {
  work: ['studio', 'stat', 'philo'],
  academy: ['spotify', 'newsquest'],
};

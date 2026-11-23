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

/*
 * Hovering a folder lifts it and opens its cover. Each folder is a sprite cut exactly along its outline from the desk
 * picture (box = % of the picture); the groups are drawn in the picture's order, so a folder stays under the ones on top.
 * spine = where the cover hinges (% of the box width), tilt = the folder's slant, tint = the inside of the folder.
 */
export const FOLDER_FX: { key: CaseKey; box: CSSProperties; spine: number; tilt: number; tint: string }[] = [
  { key: 'studio', box: { left: '27.344%', top: '56.974%', width: '13.095%', height: '35.855%' }, spine: 18.2, tilt: -16, tint: '#C9D6FF' },
  { key: 'stat', box: { left: '35.751%', top: '53.224%', width: '13.281%', height: '36.184%' }, spine: 19, tilt: -12, tint: '#F7CFE6' },
  { key: 'philo', box: { left: '44.234%', top: '51.776%', width: '11.496%', height: '35.592%' }, spine: 8.7, tilt: 4, tint: '#FFE9A6' },
  { key: 'spotify', box: { left: '49.405%', top: '52.566%', width: '15.96%', height: '35.724%' }, spine: 24.9, tilt: 14, tint: '#BFE8CB' },
  { key: 'newsquest', box: { left: '54.539%', top: '55.197%', width: '21.726%', height: '39.474%' }, spine: 29.6, tilt: 24, tint: '#D7CCFF' },
];

/** The project list in the desk chapter: Witailer first, then the academy. */
export const PROJECT_GROUPS: { work: CaseKey[]; academy: CaseKey[] } = {
  work: ['studio', 'stat', 'philo'],
  academy: ['spotify', 'newsquest'],
};

/** One line painted on a flap of the Timor flip calendar. */
export interface TimorLine {
  /** centre of the line, % of the picture */
  x: number;
  y: number;
  /** cap height, % of the picture height */
  cap: number;
  /** slant, degrees */
  rotate: number;
  /** widest the text may get before it shrinks, % of the picture width */
  maxWidth: number;
}

/*
 * The Enzo Mari "Timor" calendar appears on the day scene (on the shelf) and on the desk.
 * Its three flaps (weekday, day, month) are blank in the pictures and get today's date on top.
 * Calibrated against the original painted "DOMENICA / 22 / NOVEMBRE".
 */
export const TIMOR: Record<'day' | 'desk', [TimorLine, TimorLine, TimorLine]> = {
  day: [
    { x: 5.05, y: 46.3, cap: 0.63, rotate: -1.5, maxWidth: 2.85 },
    { x: 5.45, y: 48.78, cap: 2.08, rotate: -1.5, maxWidth: 3 },
    { x: 5.63, y: 51.38, cap: 0.72, rotate: -1.5, maxWidth: 3.35 },
  ],
  desk: [
    { x: 11.7, y: 49.52, cap: 1.2, rotate: -10, maxWidth: 6.6 },
    { x: 11.95, y: 54.3, cap: 4.6, rotate: -10, maxWidth: 6 },
    { x: 12.38, y: 58.9, cap: 1.5, rotate: -11, maxWidth: 7.3 },
  ],
};

import type { CSSProperties } from 'react';
import type { CaseKey } from './cases/types';

/*
 * Where things sit on the three illustrations (2688 × 1520 pictures).
 * Hit areas are % of the picture; pins are the % point they stick to.
 */

/** The five folders on the desk: the clickable area on the picture (the labels are on the folders themselves, see FOLDER_FX). */
export const DESK_FOLDERS: { key: CaseKey; hit: CSSProperties }[] = [
  { key: 'studio', hit: { left: '26.814%', top: '56%', width: '13.871%', height: '36%' } },
  { key: 'stat', hit: { left: '36.303%', top: '53%', width: '11.393%', height: '35%' } },
  { key: 'philo', hit: { left: '43.845%', top: '51%', width: '12.810%', height: '36%' } },
  { key: 'spotify', hit: { left: '54.403%', top: '52%', width: '8.193%', height: '36%' } },
  { key: 'newsquest', hit: { left: '62.687%', top: '54%', width: '11.125%', height: '36%' } },
];

/*
 * The five folders are real objects on the empty desk mat (redrawn whole, front, back of the cover and inside),
 * all on Philo's shape and size so they read as one set; each keeps its pattern and its colour.
 * box = % of the picture before the tilt, tilt in degrees, pad = the room around each image for its outline (% of the box);
 * drawn in this order, so each one sits on the previous.
 * Hovering one lifts it to the front and its cover swings open on its left edge.
 */
export const FOLDER_FX: { key: CaseKey; box: CSSProperties; tilt: number; pad: [number, number] }[] = [
  { key: 'studio', box: { left: '29.071%', top: '57.026%', width: '9.337%', height: '34.896%' }, tilt: -18.33, pad: [2.692, 1.273] },
  { key: 'stat', box: { left: '37.532%', top: '53.524%', width: '9.337%', height: '34.896%' }, tilt: -13.42, pad: [2.692, 1.273] },
  { key: 'philo', box: { left: '44.608%', top: '52.270%', width: '9.337%', height: '34.896%' }, tilt: 7.17, pad: [2.692, 1.273] },
  { key: 'spotify', box: { left: '52.981%', top: '53.815%', width: '9.337%', height: '34.896%' }, tilt: 13.93, pad: [2.692, 1.273] },
  { key: 'newsquest', box: { left: '62.211%', top: '57.140%', width: '9.337%', height: '34.896%' }, tilt: 21.21, pad: [2.692, 1.273] },
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

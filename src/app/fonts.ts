import { Caveat, Figtree, Outfit } from 'next/font/google';

/* The three faces of the original site, self-hosted by next/font and exposed as CSS variables (see globals.css). */
export const outfit = Outfit({ weight: ['500', '800', '900'], subsets: ['latin', 'latin-ext'], variable: '--font-outfit', display: 'swap' });
export const figtree = Figtree({ weight: ['400', '500', '600', '700'], subsets: ['latin', 'latin-ext'], variable: '--font-figtree', display: 'swap' });
export const caveat = Caveat({ weight: ['600', '700'], subsets: ['latin', 'latin-ext'], variable: '--font-caveat', display: 'swap' });

export const fontVariables = [outfit.variable, figtree.variable, caveat.variable].join(' ');

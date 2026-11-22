import { Caveat, Figtree, Outfit, Space_Mono } from 'next/font/google';

/* The faces of the site, self-hosted by next/font and exposed as CSS variables (see globals.css). */
export const outfit = Outfit({ weight: ['500', '800', '900'], subsets: ['latin'], variable: '--font-outfit', display: 'swap' });
export const figtree = Figtree({ weight: ['400', '500', '600', '700'], subsets: ['latin'], variable: '--font-figtree', display: 'swap' });
export const caveat = Caveat({ weight: ['600', '700'], subsets: ['latin'], variable: '--font-caveat', display: 'swap' });

/* the typewriter face of the c.lab poster, for small labels ("studio", tarot names, the footer line) */
export const spaceMono = Space_Mono({ weight: ['400', '700'], subsets: ['latin'], variable: '--font-space-mono', display: 'swap' });

export const fontVariables = [outfit.variable, figtree.variable, caveat.variable, spaceMono.variable].join(' ');

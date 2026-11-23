import type { ReactElement } from 'react';

/*
 * The stickers a visitor can attach to a note (same family as the daisy on the desk notebook):
 * flat colours, thick ink outline. The keys are stored in the database (column guestbook.sticker),
 * so they never change; supabase/guestbook-2.sql lists the same keys.
 */
export const STICKER_KEYS = ['daisy', 'heart', 'star', 'bolt', 'cali', 'fire', 'wow', 'sun'] as const;
export type StickerKey = (typeof STICKER_KEYS)[number];

const INK = '#16130F';
const S = { stroke: INK, strokeWidth: 3, strokeLinejoin: 'round' as const, strokeLinecap: 'round' as const };

const ART: Record<StickerKey, ReactElement> = {
  daisy: (
    <>
      {[0, 72, 144, 216, 288].map((a) => (
        <ellipse key={a} cx="32" cy="17" rx="10" ry="13" transform={`rotate(${a} 32 32)`} fill="#F7EFE1" {...S} />
      ))}
      <circle cx="32" cy="32" r="8" fill="#FFC21A" {...S} />
    </>
  ),
  heart: <path d="M32 54C14 41 7 31 9 21c2-9 14-12 23-2 9-10 21-7 23 2 2 10-5 20-23 33z" fill="#F25AA6" {...S} />,
  star: <path d="M32 6l7.6 16.3 17.9 2.2-13.2 12.3 3.4 17.7L32 45.8l-15.7 8.7 3.4-17.7L6.5 24.5l17.9-2.2z" fill="#FFC21A" {...S} />,
  bolt: <path d="M36 4L12 36h16l-6 24 26-34H32l4-22z" fill="#3BE36B" {...S} />,
  cali: (
    <>
      <path d="M12 26L14 8l14 10h8l14-10 2 18c3 5 3 12-1 18-5 8-13 12-19 12s-14-4-19-12c-4-6-4-13-1-18z" fill="#F7EFE1" {...S} />
      <path d="M14 8l14 10c-6 1-11 4-15 9z" fill={INK} />
      <path d="M50 8L36 18c6 1 11 4 15 9z" fill="#F26B1D" stroke={INK} strokeWidth="3" strokeLinejoin="round" />
      <ellipse cx="24" cy="34" rx="4" ry="4.5" fill="#FFC21A" {...S} strokeWidth="2.2" />
      <ellipse cx="40" cy="34" rx="4" ry="4.5" fill="#FFC21A" {...S} strokeWidth="2.2" />
      <path d="M24 31.5v5M40 31.5v5" stroke={INK} strokeWidth="2.4" strokeLinecap="round" />
      <path d="M30 42h4l-2 2.5z" fill="#F25AA6" stroke={INK} strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M32 44.5c-1 3-5 3-6 1M32 44.5c1 3 5 3 6 1" fill="none" stroke={INK} strokeWidth="2" strokeLinecap="round" />
    </>
  ),
  fire: (
    <>
      <path d="M32 58c-12 0-20-8-20-19 0-10 7-15 9-24 5 4 7 9 7 13 3-6 3-14 0-22 13 6 24 18 24 33 0 11-8 19-20 19z" fill="#F26B1D" {...S} />
      <path d="M32 56c-6 0-10-4-10-9 0-6 5-8 6-13 4 3 6 6 6 9 2-2 3-5 2-8 5 3 6 8 6 12 0 5-4 9-10 9z" fill="#FFC21A" stroke={INK} strokeWidth="2.2" strokeLinejoin="round" />
    </>
  ),
  wow: (
    <>
      <path d="M8 14h48v28H30l-12 12v-12H8z" fill="#1D3FD1" {...S} />
      <text x="32" y="34.5" textAnchor="middle" fontFamily="var(--display)" fontWeight="900" fontSize="15" fill="#F7EFE1" letterSpacing="-0.5">
        WOW
      </text>
    </>
  ),
  sun: (
    <>
      {Array.from({ length: 8 }, (_, i) => (
        <path key={i} d="M32 4v9" transform={`rotate(${i * 45} 32 32)`} {...S} strokeWidth="3.4" />
      ))}
      <circle cx="32" cy="32" r="15" fill="#FFC21A" {...S} />
      <path d="M26 30v1M38 30v1" stroke={INK} strokeWidth="3.6" strokeLinecap="round" />
      <path d="M25 36c3 4 11 4 14 0" fill="none" stroke={INK} strokeWidth="2.6" strokeLinecap="round" />
    </>
  ),
};

/** One sticker, as inline SVG (decorative: the label is given by whoever uses it). */
export function Sticker({ k, className }: { k: StickerKey; className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 64" aria-hidden="true">
      {ART[k]}
    </svg>
  );
}

export const isStickerKey = (v: unknown): v is StickerKey => typeof v === 'string' && (STICKER_KEYS as readonly string[]).includes(v);

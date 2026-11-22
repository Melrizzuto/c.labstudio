import { SOCIALS, type SocialKey } from '@/config';
import type { Dictionary } from '@/i18n/types';

/* simple one-colour icons, drawn in currentColor */
const ICONS: Record<SocialKey, React.ReactNode> = {
  instagram: (
    <>
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" fill="none" stroke="currentColor" strokeWidth="2" />
      <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="2" />
      <circle cx="17.3" cy="6.7" r="1.2" fill="currentColor" />
    </>
  ),
  linkedin: (
    <path
      fill="currentColor"
      d="M4 3h16a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zm2.3 7.3V18h2.6v-7.7H6.3zm1.3-1.2a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zM10.6 10.3V18h2.6v-4c0-1.1.5-1.8 1.4-1.8s1.3.6 1.3 1.8v4h2.6v-4.6c0-2.2-1.2-3.3-2.9-3.3-1.1 0-1.9.5-2.4 1.2v-1h-2.6z"
    />
  ),
  youtube: (
    <path
      fill="currentColor"
      d="M21.6 7.2a2.6 2.6 0 0 0-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.4A2.6 2.6 0 0 0 2.4 7.2C2 8.8 2 12 2 12s0 3.2.4 4.8a2.6 2.6 0 0 0 1.8 1.8C5.8 19 12 19 12 19s6.2 0 7.8-.4a2.6 2.6 0 0 0 1.8-1.8c.4-1.6.4-4.8.4-4.8s0-3.2-.4-4.8zM10 15V9l5.2 3L10 15z"
    />
  ),
  github: (
    <path
      fill="currentColor"
      d="M12 2a10 10 0 0 0-3.2 19.5c.5.1.7-.2.7-.5v-1.7c-2.8.6-3.4-1.3-3.4-1.3-.5-1.2-1.1-1.5-1.1-1.5-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.5 2.4 1.1 2.9.8.1-.6.4-1.1.6-1.3-2.2-.3-4.6-1.1-4.6-5 0-1.1.4-2 1-2.7-.1-.3-.4-1.3.1-2.7 0 0 .8-.3 2.7 1a9.4 9.4 0 0 1 5 0c1.9-1.3 2.7-1 2.7-1 .5 1.4.2 2.4.1 2.7.6.7 1 1.6 1 2.7 0 3.9-2.4 4.7-4.6 5 .4.3.7.9.7 1.9V21c0 .3.2.6.7.5A10 10 0 0 0 12 2z"
    />
  ),
};

/** Melania's profiles, as small pills in the footer bar (labels from the dictionaries, links from config.ts). */
export function SocialLinks({ t }: { t: Dictionary['social'] }) {
  return (
    <nav className="socials" aria-label={t.label}>
      {(Object.keys(SOCIALS) as SocialKey[]).map((k) => (
        <a key={k} className="social" href={SOCIALS[k]} target="_blank" rel="noopener me" aria-label={t.links[k].aria}>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            {ICONS[k]}
          </svg>
          {t.links[k].text}
        </a>
      ))}
    </nav>
  );
}

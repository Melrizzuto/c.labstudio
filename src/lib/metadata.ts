import type { Metadata, Viewport } from 'next';
import { getDictionary, type Locale } from '@/i18n';
import { SITE_URL } from '@/config';
import { getCase } from '@/content/cases';
import { pathFor, SECTION_TITLES, type Target } from './routes';

/** Absolute base for og:image and canonical links: the real domain in production, the deployment's own URL in previews. */
function siteUrl(): URL {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (explicit) return new URL(explicit);
  if (process.env.VERCEL_ENV === 'production') return new URL(SITE_URL);
  return new URL(vercel ? `https://${vercel}` : 'http://localhost:3000');
}

export function buildMetadata(locale: Locale): Metadata {
  const { meta } = getDictionary(locale);
  return {
    metadataBase: siteUrl(),
    title: meta.title,
    description: meta.description,
    /* the c. of the wordmark in cream over its pink offset, on ink (public/favicon.ico, icon.png, apple-touch-icon.png) */
    icons: { icon: [{ url: '/favicon.ico', sizes: 'any' }, { url: '/icon.png', type: 'image/png', sizes: '512x512' }], apple: '/apple-touch-icon.png' },
    openGraph: {
      title: meta.title,
      description: meta.ogDescription,
      images: [{ url: locale === 'en' ? '/assets/og-en.jpg' : '/assets/og.jpg', width: 1200, height: 630 }],
    },
    twitter: { card: 'summary_large_image' },
    other: { 'claude:viewport-fit-sides': 'cover' },
  };
}

/**
 * Metadata for a shareable address: its own title and description (a case shows its title and tagline in the
 * link preview), the canonical address and the same place in the other language.
 */
export function pageMetadata(locale: Locale, target: Target): Metadata {
  const base = buildMetadata(locale);
  const dict = getDictionary(locale);
  const other: Locale = locale === 'en' ? 'it' : 'en';
  let title = dict.meta.title;
  let description = dict.meta.description;
  if (target.kind === 'section') title = `${SECTION_TITLES[locale][target.id]} · ${dict.meta.title}`;
  if (target.kind === 'notebook') {
    title = `${dict.guestbook.title} · ${dict.meta.title}`;
    description = dict.guestbook.intro;
  }
  if (target.kind === 'case') {
    const c = getCase(locale, target.key);
    title = `${c.title} · ${dict.meta.title}`;
    description = c.tagline;
  }
  const url = pathFor(locale, target);
  return {
    ...base,
    title,
    description,
    alternates: { canonical: url, languages: { [locale]: url, [other]: pathFor(other, target) } },
    openGraph: { ...base.openGraph, title, description, url },
  };
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#F7EFE1',
};

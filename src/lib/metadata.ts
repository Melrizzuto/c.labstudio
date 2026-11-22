import type { Metadata, Viewport } from 'next';
import { getDictionary, type Locale } from '@/i18n';

/* The favicon of the original site: a "c." in cream over a pink offset, on ink. */
const FAVICON =
  "data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 64 64%27%3E%3Crect width=%2764%27 height=%2764%27 rx=%2714%27 fill=%27%2316130F%27/%3E%3Ctext x=%2735%27 y=%2747%27 font-family=%27Arial Black,Arial%27 font-weight=%27900%27 font-size=%2742%27 text-anchor=%27middle%27 fill=%27%23F25AA6%27%3Ec.%3C/text%3E%3Ctext x=%2732%27 y=%2744%27 font-family=%27Arial Black,Arial%27 font-weight=%27900%27 font-size=%2742%27 text-anchor=%27middle%27 fill=%27%23F7EFE1%27%3Ec.%3C/text%3E%3C/svg%3E";

/** Absolute base for og:image. Set NEXT_PUBLIC_SITE_URL once the domain is known; Vercel's own URL is used otherwise. */
function siteUrl(): URL {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  return new URL(explicit || (vercel ? `https://${vercel}` : 'http://localhost:3000'));
}

export function buildMetadata(locale: Locale): Metadata {
  const { meta } = getDictionary(locale);
  return {
    metadataBase: siteUrl(),
    title: meta.title,
    description: meta.description,
    icons: { icon: FAVICON },
    openGraph: { title: meta.title, description: meta.ogDescription, images: ['/assets/og.jpg'] },
    twitter: { card: 'summary_large_image' },
    other: { 'claude:viewport-fit-sides': 'cover' },
  };
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#F7EFE1',
};

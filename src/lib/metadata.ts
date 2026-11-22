import type { Metadata, Viewport } from 'next';
import { getDictionary, type Locale } from '@/i18n';

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
    /* the c. of the wordmark in cream over its pink offset, on ink (public/favicon.ico, icon.png, apple-touch-icon.png) */
    icons: { icon: [{ url: '/favicon.ico', sizes: 'any' }, { url: '/icon.png', type: 'image/png', sizes: '512x512' }], apple: '/apple-touch-icon.png' },
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

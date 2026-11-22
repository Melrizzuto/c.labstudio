import type { ReactNode } from 'react';
import type { Locale } from '@/i18n';
import { fontVariables } from '@/app/fonts';
import { THEME_BOOT_SCRIPT } from '@/lib/theme';
import { PrintFilters } from './PrintFilters';
import '@/app/globals.css';

/** <html> and <body> for one language: fonts, the theme set before first paint, the print grain and textures. */
export function RootDocument({ locale, children }: { locale: Locale; children: ReactNode }) {
  return (
    <html lang={locale} className={fontVariables} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_BOOT_SCRIPT }} />
      </head>
      <body>
        <PrintFilters />
        {/* the print grain over everything: a pre-rendered noise tile (scripts/optimize-images.mjs) */}
        <div className="grain" aria-hidden="true"></div>
        {children}
      </body>
    </html>
  );
}

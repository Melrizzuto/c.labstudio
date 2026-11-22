import type { ReactNode } from 'react';
import type { Locale } from '@/i18n';
import { fontVariables } from '@/app/fonts';
import { THEME_BOOT_SCRIPT } from '@/lib/theme';
import '@/app/globals.css';

/** <html> and <body> for one language: fonts, the theme set before first paint, the print grain. */
export function RootDocument({ locale, children }: { locale: Locale; children: ReactNode }) {
  return (
    <html lang={locale} className={fontVariables} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_BOOT_SCRIPT }} />
      </head>
      <body>
        <svg className="grain" aria-hidden="true" width="100%" height="100%">
          <filter id="grainf">
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves={2} stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#grainf)" />
        </svg>
        {children}
      </body>
    </html>
  );
}

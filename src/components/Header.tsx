import type { Dictionary, Locale } from '@/i18n/types';
import { pathFor, type SectionId } from '@/lib/routes';
import { ThemeToggle } from './ThemeToggle';
import { HeaderMenu } from './HeaderMenu';

export function Header({ t, locale }: { t: Dictionary['header']; locale: Locale }) {
  const to = (id: SectionId) => pathFor(locale, { kind: 'section', id });
  return (
    <header className="bar">
      <div className="wrap">
        <a className="logo" href={pathFor(locale, { kind: 'home' })} aria-label={t.logoLabel}>
          c.lab <small>studio</small>
        </a>
        <nav className="nav" aria-label={t.navLabel}>
          <a className="hide-s" href={to('percorso')}>
            {t.journey}
          </a>
          <a className="hide-s" href={to('progetti')}>
            {t.projects}
          </a>
          <a className="hide-s" href={to('weekend')}>
            {t.weekend}
          </a>
          <a className="lang" href={t.lang.href} hrefLang={t.lang.hreflang} lang={t.lang.hreflang} aria-label={t.lang.label}>
            {t.lang.text}
          </a>
          <ThemeToggle labels={t.theme} />
          <a className="btn small" href={to('contatti')}>
            {t.cta}
          </a>
          <HeaderMenu
            t={t.menu}
            links={[
              { href: to('percorso'), text: t.journey },
              { href: to('progetti'), text: t.projects },
              { href: to('weekend'), text: t.weekend },
            ]}
            cta={{ href: to('contatti'), text: t.cta }}
          />
        </nav>
      </div>
    </header>
  );
}

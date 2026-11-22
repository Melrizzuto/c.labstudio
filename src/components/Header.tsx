import type { Dictionary } from '@/i18n/types';
import { ThemeToggle } from './ThemeToggle';

export function Header({ t }: { t: Dictionary['header'] }) {
  return (
    <header className="bar">
      <div className="wrap">
        <a className="logo" href="#top" aria-label={t.logoLabel}>
          c.lab <small>studio</small>
        </a>
        <nav className="nav" aria-label={t.navLabel}>
          <a className="hide-s" href="#percorso">
            {t.journey}
          </a>
          <a className="hide-s" href="#progetti">
            {t.projects}
          </a>
          <a className="hide-s" href="#weekend">
            {t.weekend}
          </a>
          <a className="lang" href={t.lang.href} hrefLang={t.lang.hreflang} lang={t.lang.hreflang} aria-label={t.lang.label}>
            {t.lang.text}
          </a>
          <ThemeToggle labels={t.theme} />
          <a className="btn small" href="#contatti">
            {t.cta}
          </a>
        </nav>
      </div>
    </header>
  );
}

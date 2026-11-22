import type { Dictionary } from '@/i18n/types';
import { ViewCounter } from './ViewCounter';

/*
 * Footer: the big wordmark with Calì's stamp on it, one readable line about the studio,
 * then a thin bar with the copyright on the left and the visit counter on the right.
 */
export function Footer({ t, views, locale }: { t: Dictionary['footer']; views: Dictionary['views']; locale: Dictionary['locale'] }) {
  return (
    <footer>
      <div className="wrap">
        <div className="bigwrap">
          <p className="bigmark" aria-hidden="true">
            c.lab <span>studio</span>
          </p>
          <span className="approved stamp">{t.approved}</span>
        </div>
        <p className="foot-line">{t.tagline}</p>
        <div className="foot">
          <span className="meta">{t.copyright}</span>
          <ViewCounter locale={locale} t={views} />
        </div>
        <p className="legal">{t.legal}</p>
      </div>
    </footer>
  );
}

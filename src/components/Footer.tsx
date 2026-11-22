import type { Dictionary } from '@/i18n/types';
import { ViewCounter } from './ViewCounter';

export function Footer({ t, views, locale }: { t: Dictionary['footer']; views: Dictionary['views']; locale: Dictionary['locale'] }) {
  return (
    <footer>
      <div className="wrap">
        <p className="bigmark" aria-hidden="true">
          c.lab <span>studio</span>
        </p>
        <div className="foot">
          <span>{t.tagline}</span>
          <span className="approved">{t.approved}</span>
          <span>
            {t.copyright}
            <ViewCounter locale={locale} t={views} />
          </span>
        </div>
        <p className="legal">{t.legal}</p>
      </div>
    </footer>
  );
}

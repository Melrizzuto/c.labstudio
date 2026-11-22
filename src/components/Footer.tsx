import type { Dictionary } from '@/i18n/types';
import { ViewCounter } from './ViewCounter';
import { SocialLinks } from './SocialLinks';

/*
 * Footer: the big wordmark with Calì's stamp on it, one readable line about the studio,
 * then a thin bar: the copyright on the left; on the right Melania's profiles and the visit counter.
 */
export function Footer({
  t,
  views,
  social,
  locale,
}: {
  t: Dictionary['footer'];
  views: Dictionary['views'];
  social: Dictionary['social'];
  locale: Dictionary['locale'];
}) {
  return (
    <footer>
      <div className="wrap">
        <div className="bigwrap">
          <p className="bigmark" aria-hidden="true">
            c.lab <span>studio</span>
          </p>
          {/* stuck on the b of the wordmark: positioned in em of the wordmark, so it follows it at every width */}
          <span className="stamp-at">
            <span className="approved stamp">{t.approved}</span>
          </span>
        </div>
        <p className="foot-line">{t.tagline}</p>
        <div className="foot">
          <span className="meta">{t.copyright}</span>
          <div className="foot-end">
            <SocialLinks t={social} />
            <ViewCounter locale={locale} t={views} />
          </div>
        </div>
        <p className="legal">{t.legal}</p>
      </div>
    </footer>
  );
}

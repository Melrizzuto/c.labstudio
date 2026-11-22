import type { Dictionary } from '@/i18n/types';

export function Footer({ t }: { t: Dictionary['footer'] }) {
  return (
    <footer>
      <div className="wrap">
        <p className="bigmark" aria-hidden="true">
          c.lab <span>studio</span>
        </p>
        <div className="foot">
          <span>{t.tagline}</span>
          <span className="approved">{t.approved}</span>
          <span>{t.copyright}</span>
        </div>
        <p className="legal">{t.legal}</p>
      </div>
    </footer>
  );
}

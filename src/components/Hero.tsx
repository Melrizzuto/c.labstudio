import { preload } from 'react-dom';
import type { Dictionary } from '@/i18n/types';
import { MelFigure } from './MelFigure';
import { RichText } from './RichText';

export function Hero({ t }: { t: Dictionary['hero'] }) {
  /* felt Mel is the LCP: start fetching her (AVIF; browsers without it skip the hint) before anything else */
  preload('/assets/mel-felt.avif', { as: 'image', type: 'image/avif', fetchPriority: 'high' });
  return (
    <section className="hero" aria-labelledby="title">
      <div className="wrap">
        <div className="hero-copy">
          {/* the sticker is positioned against the title, so it always leans on the "b" */}
          <div className="title">
            <span className="sticker avail">
              <i></i>
              {t.sticker}
            </span>
            <h1 id="title">
              <span className="mark" data-t="c.lab">
                <span className="ink">c.lab</span>
              </span>{' '}
              <span className="studio">studio</span>
            </h1>
          </div>
          <p className="lead">
            <RichText value={t.lead} />
          </p>
          <p className="sub">
            <RichText value={t.sub} />
          </p>
          <div className="actions">
            <a className="btn" href="#stanza">
              {t.enter}
            </a>
            <a className="link" href="#progetti">
              {t.toProjects}
            </a>
          </div>
        </div>
        <div className="stage" aria-label={t.stageLabel}>
          <div className="pinkblock" aria-hidden="true"></div>
          <div className="checker" aria-hidden="true"></div>
          <div className="sun" aria-hidden="true"></div>
          <MelFigure label={t.melLabel} alt={t.melAlt} say={t.caliSay} />
          <p className="note cat" aria-hidden="true">
            <svg viewBox="0 0 62 44" fill="none">
              <path d="M2 8C22 4 44 14 54 36" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
              <path d="M58 24l-4 12-11-5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {t.noteCat}
          </p>
          <p className="note spin" aria-hidden="true">
            {t.noteTap}
          </p>
        </div>
      </div>
    </section>
  );
}

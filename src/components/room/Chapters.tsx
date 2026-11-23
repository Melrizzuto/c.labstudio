import type { Dictionary } from '@/i18n/types';
import { getCase, caseDialogId, type CaseKey } from '@/content/cases';
import { PROJECT_GROUPS } from '@/content/room';
import { CALENDLY_URL, EMAIL, YOUTUBE_URL } from '@/config';
import { RichText } from '../RichText';
import { MailCopy } from '../MailCopy';

/*
 * The six chapter cards that scroll over the pinned stage. Each `data-cam` names the camera view
 * (see CAM in Room.tsx); `.right` puts the card on the right on wide screens.
 */
export function Chapters({ t }: { t: Dictionary }) {
  const project = (key: CaseKey) => {
    const c = getCase(t.locale, key);
    return (
      <button key={key} className="project" data-case={caseDialogId(key)} type="button">
        <span className={`sw sw-${c.swatch}`}></span>
        <span>
          <span className="tarot">{c.tarot}</span>
          <b>{c.title}</b>
          <span>{c.blurb}</span>
        </span>
        <i>{t.desk.read}</i>
      </button>
    );
  };
  const p = t.room.places;
  return (
    <div className="chapters">
      <article className="chapter" data-cam="overview" id="intro-stanza">
        <div className="wrap">
          <div className="card">
            <h2>{t.intro.title}</h2>
            <p>{t.intro.text}</p>
            <p className="hand">{t.intro.hand}</p>
            <div className="chips">
              <a className="chip" href="#percorso">
                {p.book}
              </a>
              <a className="chip" href="#progetti">
                {p.desk}
              </a>
              <a className="chip" href="#divano">
                {p.sofa}
              </a>
              <a className="chip" href="#weekend">
                {p.tv}
              </a>
            </div>
          </div>
        </div>
      </article>

      <article className="chapter right" data-cam="book" id="percorso">
        <div className="wrap">
          <div className="card">
            <h2>{t.journey.title}</h2>
            <p>{t.journey.text}</p>
            <ol className="timeline" reversed>
              {t.journey.timeline.map((e) => (
                <li key={e.when + e.title}>
                  <span className="when">{e.when}</span>
                  <div>
                    <b>{e.title}</b>
                    <span className="d">{e.text}</span>
                  </div>
                </li>
              ))}
            </ol>
            <a className="btn cv-btn" href={`/cv/?lang=${t.locale}`} target="_blank" rel="noopener">
              {t.journey.cv} ↗
            </a>
          </div>
        </div>
      </article>

      <article className="chapter right" data-cam="desk" id="progetti">
        <div className="wrap">
          <div className="card">
            <h2>{t.desk.title}</h2>
            <p>{t.desk.text}</p>
            <div className="projects">{PROJECT_GROUPS.work.map(project)}</div>
            <p className="projects-sub">{t.desk.academy}</p>
            <div className="projects">{PROJECT_GROUPS.academy.map(project)}</div>
          </div>
        </div>
      </article>

      <article className="chapter right" data-cam="sofa" id="divano">
        <div className="wrap">
          <div className="card">
            <h2>{t.sofa.title}</h2>
            <p>{t.sofa.text}</p>
            <div className="after">
              {t.sofa.hobbies.map((h) => (
                <div key={h.title}>
                  <h3>{h.title}</h3>
                  <p>{h.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </article>

      <article className="chapter right" data-cam="tv" id="weekend">
        <div className="wrap">
          <div className="card">
            <h2>{t.weekend.title}</h2>
            {t.weekend.paragraphs.map((para, i) => (
              <p key={i}>
                <RichText value={para} />
              </p>
            ))}
            <div className="covers">
              {t.weekend.covers.map((c) => (
                <img key={c.src} src={c.src} alt={c.alt} loading="lazy" width={1280} height={720} />
              ))}
            </div>
            <div className="chips">
              <a className="chip" id="ytLink" href={YOUTUBE_URL} target="_blank" rel="noopener">
                {t.weekend.channel}
              </a>
            </div>
          </div>
        </div>
      </article>

      <article className="chapter" data-cam="outro" id="contatti">
        <div className="wrap">
          <div className="card">
            <h2>{t.contact.title}</h2>
            <p>{t.contact.text}</p>
            <div className="contact-actions">
              <a className="btn small" href={CALENDLY_URL} target="_blank" rel="noopener">
                {t.contact.book}
              </a>
              <MailCopy email={EMAIL} t={t.contact} />
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}

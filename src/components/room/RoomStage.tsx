import type { CSSProperties } from 'react';
import type { Dictionary } from '@/i18n/types';
import { getCase, caseDialogId, type CaseStudy } from '@/content/cases';
import { DESK_FOLDERS, FOLDER_FX } from '@/content/room';
import { TimorDate } from './TimorDate';
import { Picture, SCENE_SIZES, sceneSet, sceneSrc } from '../Picture';

/*
 * The pinned stage: the three illustrations (day, desk, night), their clickable spots, the animated bits (.fx),
 * the stickers (pins) that follow the picture, and Calì's speech bubble. Room.tsx moves the camera.
 */
export function RoomStage({ t, locale }: { t: Dictionary['room']; locale: Dictionary['locale'] }) {
  const cali = getCase(locale, 'cali');
  const folders = DESK_FOLDERS.map((f) => ({ ...f, c: getCase(locale, f.key) as CaseStudy }));
  return (
    <div className="room-stage" id="roomStage">
      <div className="scene" data-scene="day">
        <Picture defer data-load="day" src={sceneSrc('day.jpg')} avif={sceneSet('day', 'avif')} webp={sceneSet('day', 'webp')} sizes={SCENE_SIZES} alt={t.dayAlt} width={2688} height={1520} decoding="async" />
        <Picture
          defer
          data-load="daynight"
          className="nightwin"
          src={sceneSrc('day-night.jpg')}
          avif={sceneSet('day-night', 'avif')}
          webp={sceneSet('day-night', 'webp')}
          sizes={SCENE_SIZES}
          alt=""
          aria-hidden="true"
          width={2688}
          height={1520}
          decoding="async"
        />
        <TimorDate scene="day" locale={locale} />
        <div className="fx glow" style={{ left: '53%', top: '2%', width: '11%', height: '19%' }}></div>
        <button className="hit" data-go="progetti" aria-label={t.hits.dayDesk} style={{ left: 0, top: '20%', width: '27%', height: '44%' }}></button>
        <button className="hit" data-go="percorso" aria-label={t.hits.dayBook} style={{ left: '40%', top: '14%', width: '16%', height: '56%' }}></button>
        <button className="hit" data-go="divano" aria-label={t.hits.daySofa} style={{ left: '40%', top: '69%', width: '53%', height: '30%' }}></button>
        <button className="hit" data-go="weekend" aria-label={t.hits.dayTv} style={{ left: '75%', top: '21%', width: '25%', height: '42%' }}></button>
        <button className="hit" data-case={caseDialogId('cali')} aria-label={cali.hitLabel} style={{ left: '44%', top: '4%', width: '9%', height: '11%' }}></button>
      </div>
      <div className="scene" data-scene="desk">
        <Picture defer data-load="desk" src={sceneSrc('desk.jpg')} avif={sceneSet('desk', 'avif')} webp={sceneSet('desk', 'webp')} sizes={SCENE_SIZES} alt={t.deskAlt} width={2688} height={1520} decoding="async" />
        <TimorDate scene="desk" locale={locale} />
        <img
          className="fx steam"
          src="/assets/scenes/coffee-steam.svg"
          alt=""
          aria-hidden="true"
          width={150}
          height={232}
          style={{ left: '83.110%', top: '52.039%', width: '5.580%', height: '15.263%' }}
        />
        <Picture
          defer
          data-load="desk"
          className="fx paw"
          src="/assets/scenes/desk-paw.png"
          avif="/assets/scenes/desk-paw.avif"
          webp="/assets/scenes/desk-paw.webp"
          alt=""
          aria-hidden="true"
          width={363}
          height={335}
          style={{ left: '85.640%', top: '77.961%', width: '13.504%', height: '22.039%' }}
        />
        {/* the folders: each one lifts and opens its cover on hover (the hit areas below drive it) */}
        <div className="folders-fx" aria-hidden="true">
          {FOLDER_FX.map((f) => (
            <div key={f.key} className="ffx" data-fx={caseDialogId(f.key)} style={{ ...f.box, '--r': `${f.tilt}deg`, '--px': `${f.pad[0]}%`, '--py': `${f.pad[1]}%` } as CSSProperties}>
              <img className="finside" src={sceneSrc(`folders/${f.key}-inside.webp`)} alt="" width={1} height={1} decoding="async" />
              <div className="fcover">
                <img className="ffront" src={sceneSrc(`folders/${f.key}.webp`)} alt="" width={1} height={1} decoding="async" />
                <span className="flabel">
                  <small>{folders.find((x) => x.key === f.key)?.c.tarot}</small>
                  {folders.find((x) => x.key === f.key)?.c.title}
                </span>
                <img className="fback" src={sceneSrc(`folders/${f.key}-back.webp`)} alt="" width={1} height={1} decoding="async" />
              </div>
            </div>
          ))}
        </div>
        {folders.map((f) => (
          <button key={f.key} className="hit folder" data-case={caseDialogId(f.key)} aria-label={f.c.hitLabel} style={f.hit}></button>
        ))}
        {/* things on the desk you can play with: the keyboard types in a little terminal, the mouse clicks, the duck squeaks */}
        <button className="hit keyboard" type="button" aria-label={t.hits.deskKeyboard} style={{ left: '32.2%', top: '27.5%', width: '27.2%', height: '16.9%' }}></button>
        <div className="term" aria-live="polite" style={{ left: '45.8%', top: '27%' }}>
          <b></b>
          <span></span>
        </div>
        <button className="toy mouse" type="button" aria-label={t.hits.deskMouse} style={{ left: '61.124%', top: '27.829%', width: '6.213%', height: '16.316%' }}>
          <img src={sceneSrc('mouse.webp')} alt="" width={167} height={248} decoding="async" />
        </button>
        <button className="toy duck" type="button" aria-label={t.hits.deskDuck} style={{ left: '17.894%', top: '40.197%', width: '9.524%', height: '14.539%' }}>
          <img src={sceneSrc('duck.webp')} alt="" width={256} height={221} decoding="async" />
        </button>
        {/* the notebook and its pencil open the guestbook (the pencil comes first so hovering it lifts the notebook too) */}
        <button className="hit pencil" type="button" data-guestbook="" aria-label={t.hits.deskPencil} style={{ left: '20.9%', top: '66.6%', width: '3%', height: '32%' }}></button>
        <button className="toy notebook" type="button" data-guestbook="" aria-label={t.hits.deskNotebook} style={{ left: '5.841%', top: '67.237%', width: '13.430%', height: '28.289%' }}>
          <img src={sceneSrc('notebook.webp')} alt="" width={361} height={430} decoding="async" />
          {/* a paper label on the cover, like the ones on the folders */}
          <span className="nb-label" aria-hidden="true">
            <small>{t.notebookLabel.kicker}</small>
            {t.notebookLabel.title}
          </span>
        </button>
        <button className="hit" data-cat="1" aria-label={t.hits.deskCat} style={{ left: '85%', top: '76%', width: '15%', height: '24%' }}></button>
      </div>
      <div className="scene" data-scene="night">
        <Picture defer data-load="night" src={sceneSrc('night.jpg')} avif={sceneSet('night', 'avif')} webp={sceneSet('night', 'webp')} sizes={SCENE_SIZES} alt={t.nightAlt} width={2688} height={1520} decoding="async" />
        {/* the TV screen, edge to edge: the weekend clip in a YouTube-style player (the bar follows the real video time) */}
        <div className="tvplayer" style={{ left: '50.372%', top: '19.934%', width: '25.260%', height: '24.671%' }}>
          <video className="tvclip" id="tvclip" src="/assets/tv/rifatto-tv.mp4" muted loop playsInline preload="none"></video>
          <div className="yt" aria-hidden="true">
            <div className="yt-top">
              <span className="yt-avatar">c.lab</span>
              <span className="yt-title">
                {t.tvTitle}
                <small>c.lab studio</small>
              </span>
            </div>
            <div className="yt-bottom">
              <div className="yt-bar">
                <i className="yt-fill"></i>
                <b className="yt-dot"></b>
              </div>
              <div className="yt-row">
                <svg viewBox="0 0 24 24">
                  <path d="M7 5h3.5v14H7zM13.5 5H17v14h-3.5z" />
                </svg>
                <svg viewBox="0 0 24 24">
                  <path d="M6 5l9 7-9 7zM16 5h2.5v14H16z" />
                </svg>
                <svg viewBox="0 0 24 24">
                  <path d="M4 9h4l5-4v14l-5-4H4zM16 8.5a5 5 0 0 1 0 7M18.5 6a8.5 8.5 0 0 1 0 12" className="yt-stroke" />
                </svg>
                <span className="yt-time">0:00 / 0:25</span>
                <span className="yt-gap"></span>
                <svg viewBox="0 0 24 24">
                  <path d="M3 6h18v12H3zM10.5 10.5a2 2 0 1 0 0 3M16.5 10.5a2 2 0 1 0 0 3" className="yt-stroke" />
                </svg>
                <svg viewBox="0 0 24 24">
                  <path d="M12 8.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7zM12 2.5l2 2.6 3.2-.6.6 3.2L20.4 9.6 19 12.5l1.4 2.9-2.6 1.9-.6 3.2-3.2-.6-2 2.6-2-2.6-3.2.6-.6-3.2-2.6-1.9 1.4-2.9-1.4-2.9 2.6-1.9.6-3.2 3.2.6z" className="yt-stroke" />
                </svg>
                <svg viewBox="0 0 24 24">
                  <path d="M4 9V4h5M15 4h5v5M20 15v5h-5M9 20H4v-5" className="yt-stroke" />
                </svg>
              </div>
            </div>
          </div>
        </div>
        <div className="fx twinkle" style={{ left: '2%', top: '3%', width: '31%', height: '36%' }}>
          <i style={{ left: '12%', top: '20%' }}></i>
          <i style={{ left: '58%', top: '12%', animationDelay: '.8s' }}></i>
          <i style={{ left: '30%', top: '55%', animationDelay: '1.6s' }}></i>
          <i style={{ left: '80%', top: '40%', animationDelay: '.4s' }}></i>
        </div>
        <div className="fx zzz" style={{ left: '86.6%', top: '53%', width: '3%', height: '3%' }}>
          <span>z</span>
          <span>z</span>
          <span>z</span>
        </div>
        <div className="fx glow" style={{ left: '84%', top: '4%', width: '16%', height: '30%', animationDuration: '6s' }}></div>
        <button className="hit" data-go="weekend" aria-label={t.hits.nightTv} style={{ left: '49%', top: '18%', width: '28%', height: '30%' }}></button>
        <button className="hit" data-go="divano" aria-label={t.hits.nightSofa} style={{ left: '20%', top: '66%', width: '55%', height: '34%' }}></button>
        <button className="hit" data-cat="1" aria-label={t.hits.nightCat} style={{ left: '75%', top: '58%', width: '17%', height: '24%' }}></button>
      </div>
      <div className="pins" id="pins">
        <button className="pin" data-s="day" data-x="47.6" data-y="31" data-go="percorso" tabIndex={-1}>
          {t.places.book}
        </button>
        <button className="pin" data-s="day" data-x="13" data-y="33" data-go="progetti" tabIndex={-1}>
          {t.places.desk}
        </button>
        <button className="pin" data-s="day" data-x="66" data-y="78" data-go="divano" tabIndex={-1}>
          {t.places.sofa}
        </button>
        <button className="pin" data-s="day" data-x="88" data-y="27" data-go="weekend" tabIndex={-1}>
          {t.places.tv}
        </button>
        <button className="pin" data-s="night" data-x="63" data-y="16" data-go="weekend" tabIndex={-1}>
          {t.places.tv}
        </button>
        <button className="pin" data-s="night" data-x="84" data-y="56" data-cat="1" tabIndex={-1}>
          {t.pinCatAsleep}
        </button>
      </div>
      <p className="miao" id="miao" aria-live="polite">
        {t.miao[0].word}
      </p>
    </div>
  );
}

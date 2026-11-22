import type { Dictionary } from '@/i18n/types';
import { getCase, caseDialogId, type CaseStudy } from '@/content/cases';
import { DESK_FOLDERS } from '@/content/room';

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
        <img src="/assets/scenes/day.jpg" alt={t.dayAlt} width={2688} height={1520} />
        <img className="nightwin" src="/assets/scenes/day-night.jpg" alt="" aria-hidden="true" width={2688} height={1520} decoding="async" />
        <div className="fx glow" style={{ left: '53%', top: '2%', width: '11%', height: '19%' }}></div>
        <button className="hit" data-go="progetti" aria-label={t.hits.dayDesk} style={{ left: 0, top: '20%', width: '27%', height: '44%' }}></button>
        <button className="hit" data-go="percorso" aria-label={t.hits.dayBook} style={{ left: '40%', top: '14%', width: '16%', height: '56%' }}></button>
        <button className="hit" data-go="divano" aria-label={t.hits.daySofa} style={{ left: '40%', top: '69%', width: '53%', height: '30%' }}></button>
        <button className="hit" data-go="weekend" aria-label={t.hits.dayTv} style={{ left: '75%', top: '21%', width: '25%', height: '42%' }}></button>
        <button className="hit" data-case={caseDialogId('cali')} aria-label={cali.hitLabel} style={{ left: '44%', top: '4%', width: '9%', height: '11%' }}></button>
      </div>
      <div className="scene" data-scene="desk">
        <img src="/assets/scenes/desk.jpg" alt={t.deskAlt} width={2688} height={1520} />
        <img
          className="fx steam"
          src="/assets/scenes/coffee-steam.svg"
          alt=""
          aria-hidden="true"
          width={150}
          height={232}
          style={{ left: '83.110%', top: '52.039%', width: '5.580%', height: '15.263%' }}
        />
        <img
          className="fx paw"
          src="/assets/scenes/desk-paw.png"
          alt=""
          aria-hidden="true"
          width={363}
          height={335}
          style={{ left: '85.640%', top: '77.961%', width: '13.504%', height: '22.039%' }}
        />
        {folders.map((f) => (
          <button key={f.key} className="hit" data-case={caseDialogId(f.key)} aria-label={f.c.hitLabel} style={f.hit}></button>
        ))}
        <button className="hit" data-cat="1" aria-label={t.hits.deskCat} style={{ left: '85%', top: '76%', width: '15%', height: '24%' }}></button>
      </div>
      <div className="scene" data-scene="night">
        <img src="/assets/scenes/night.jpg" alt={t.nightAlt} width={2688} height={1520} />
        <video
          className="tvclip"
          id="tvclip"
          src="/assets/tv/rifatto-tv.mp4"
          muted
          loop
          playsInline
          preload="none"
          style={{ left: '50.9%', top: '20.6%', width: '24.4%', height: '23.2%' }}
        ></video>
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
        {folders.map((f) => (
          <button key={f.key} className="pin case" data-s="desk" data-x={f.pin.x} data-y={f.pin.y} data-case={caseDialogId(f.key)} tabIndex={-1}>
            <b>{f.c.tarot}</b>
            {f.c.title}
          </button>
        ))}
        <button className="pin" data-s="night" data-x="63" data-y="16" data-go="weekend" tabIndex={-1}>
          {t.places.tv}
        </button>
        <button className="pin" data-s="night" data-x="84" data-y="56" data-cat="1" tabIndex={-1}>
          {t.pinCatAsleep}
        </button>
      </div>
      <p className="miao" id="miao" aria-live="polite">
        {t.miao[0]}
      </p>
    </div>
  );
}

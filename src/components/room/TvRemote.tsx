'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import type { Dictionary, Locale } from '@/i18n/types';
import { TV_CHANNELS } from '@/content/tv';

/*
 * The remote under the TV card: pick a channel and an episode, turn the sound on, or watch it big.
 * It drives the TV in the room (#tvclip and its YouTube-style title, in RoomStage); Room.tsx still decides
 * when the TV is on (when you get close to the weekend chapter).
 */
export function TvRemote({ t, locale }: { t: Dictionary['weekend']['remote']; locale: Locale }) {
  const [ch, setCh] = useState(0);
  const [ep, setEp] = useState(0);
  const [sound, setSound] = useState(false);
  const big = useRef<HTMLDialogElement>(null);
  const bigVideo = useRef<HTMLVideoElement>(null);
  const first = useRef(true);
  const channel = TV_CHANNELS[ch];
  const episode = channel.episodes[ep];
  const epLabel = (x: (typeof channel.episodes)[number]) => x.label?.[locale] ?? `ep. ${x.n}`;
  const label = (c: number, e: number) => `${TV_CHANNELS[c].name} · ${epLabel(TV_CHANNELS[c].episodes[e])}: ${TV_CHANNELS[c].episodes[e].title[locale]}`;

  const next = useCallback(() => setEp((e) => (e + 1) % TV_CHANNELS[ch].episodes.length), [ch]);
  const prev = () => setEp((e) => (e - 1 + channel.episodes.length) % channel.episodes.length);

  /* tune the TV in the room to the chosen episode (not on first render: the page ships with Rifatto already on) */
  useEffect(() => {
    const clip = document.querySelector<HTMLVideoElement>('#tvclip');
    const title = document.querySelector<HTMLElement>('#ytTitleText');
    if (title) title.textContent = label(ch, ep);
    if (!clip) return;
    clip.loop = channel.episodes.length === 1;
    if (first.current) { first.current = false; return; }
    clip.src = episode.tv;
    if (clip.classList.contains('on')) clip.play()?.catch(() => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ch, ep]);

  /* a channel with several episodes plays them in a row */
  useEffect(() => {
    const clip = document.querySelector<HTMLVideoElement>('#tvclip');
    if (!clip) return;
    clip.addEventListener('ended', next);
    return () => clip.removeEventListener('ended', next);
  }, [next]);

  useEffect(() => {
    const clip = document.querySelector<HTMLVideoElement>('#tvclip');
    if (clip) clip.muted = !sound;
  }, [sound]);

  const openBig = () => {
    const d = big.current, v = bigVideo.current;
    if (!d || !v) return;
    document.querySelector<HTMLVideoElement>('#tvclip')?.pause();
    v.src = episode.big;
    d.showModal();
    v.play()?.catch(() => {});
  };
  const closeBig = () => {
    bigVideo.current?.pause();
    big.current?.close();
    const clip = document.querySelector<HTMLVideoElement>('#tvclip');
    if (clip?.classList.contains('on')) clip.play()?.catch(() => {});
  };

  return (
    <div className="tvremote" role="group" aria-label={t.label}>
      <div className="tv-ch" role="radiogroup" aria-label={t.channels}>
        {TV_CHANNELS.map((c, i) => (
          <button key={c.id} type="button" role="radio" aria-checked={ch === i} className={ch === i ? 'on' : ''} onClick={() => { setCh(i); setEp(0); }}>
            <b>{i + 1}</b> {c.name}
          </button>
        ))}
      </div>
      <div className="tv-now">
        <button type="button" className="tv-step" onClick={prev} aria-label={t.prev} disabled={channel.episodes.length < 2}>◀</button>
        <p aria-live="polite">
          <small>{epLabel(episode)}</small>
          {episode.title[locale]}
        </p>
        <button type="button" className="tv-step" onClick={next} aria-label={t.next} disabled={channel.episodes.length < 2}>▶</button>
      </div>
      <div className="tv-actions">
        <button type="button" className="chip" aria-pressed={sound} onClick={() => setSound((s) => !s)}>{sound ? t.soundOn : t.soundOff}</button>
        <button type="button" className="chip" onClick={openBig}>{t.big}</button>
      </div>
      {locale === 'en' && channel.id === 'calimel' && <p className="tv-note">{t.note}</p>}

      <dialog className={episode.vertical ? 'tvbig vertical' : 'tvbig'} ref={big} aria-label={label(ch, ep)} onClose={closeBig} onClick={(e) => { if (e.target === big.current) closeBig(); }}>
        <video ref={bigVideo} poster={episode.poster} controls controlsList="nodownload noplaybackrate" disablePictureInPicture playsInline></video>
        <button type="button" className="gb-close" onClick={closeBig} aria-label={t.close}>×</button>
      </dialog>
    </div>
  );
}

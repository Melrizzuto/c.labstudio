'use client';

import { useEffect, useRef } from 'react';
import { playCat } from '@/lib/sounds';
import { activatePicture, pictureReady } from '@/lib/pictures';
import { Picture } from './Picture';

/*
 * Felt Mel. She breathes (CSS); every 15 s Calì yawns (CSS), and right away when you tap her,
 * press Enter/Space on her, or when the page turns to night. Only a tap or a key makes her meow.
 */
export function MelFigure({ label, alt, say }: { label: string; alt: string; say: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const fig = ref.current;
    if (!fig) return;
    let t: number | undefined;
    /* the yawning picture is not needed for the first paint: it loads once the page has settled
       (and right away if someone taps before that; the yawn then starts when it is ready) */
    const yawnImg = fig.querySelector<HTMLImageElement>('.mel-yawn');
    let idle: number = 0;
    const loadYawn = () => yawnImg && activatePicture(yawnImg);
    const onLoad = () => {
      idle = typeof requestIdleCallback === 'function' ? requestIdleCallback(loadYawn, { timeout: 4000 }) : window.setTimeout(loadYawn, 1500);
    };
    if (document.readyState === 'complete') onLoad();
    else addEventListener('load', onLoad, { once: true });
    const yawn = () => {
      const start = () => {
        fig.classList.add('yawning');
        clearTimeout(t);
        t = window.setTimeout(() => fig.classList.remove('yawning'), 1500);
      };
      if (yawnImg && yawnImg.dataset.src !== undefined) pictureReady(yawnImg).then(start);
      else start();
    };
    /* a tap makes her meow too (never the automatic yawns); from the keyboard, at most once a second */
    let lastKeyMeow = 0;
    const onTap = () => {
      yawn();
      playCat('meow');
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        yawn();
        const now = performance.now();
        if (now - lastKeyMeow >= 1000) {
          lastKeyMeow = now;
          playCat('meow');
        }
      }
    };
    fig.addEventListener('click', onTap);
    fig.addEventListener('keydown', onKey);
    /* when the day turns into night, Calì yawns too.
       `was` starts empty, as in the original page, so a visitor who arrives at night sees her yawn once. */
    let was: string | undefined;
    const mo = new MutationObserver(() => {
      const now = document.documentElement.dataset.time;
      if (now === 'night' && was !== 'night') yawn();
      was = now;
    });
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['data-time'] });
    return () => {
      fig.removeEventListener('click', onTap);
      fig.removeEventListener('keydown', onKey);
      mo.disconnect();
      clearTimeout(t);
      removeEventListener('load', onLoad);
      if (typeof cancelIdleCallback === 'function') cancelIdleCallback(idle);
      clearTimeout(idle);
    };
  }, []);
  return (
    <div className="mel-fig" id="melFig" role="button" tabIndex={0} aria-label={label} ref={ref}>
      <div className="mel-breath">
        {/* felt Mel is the largest thing on the first screen: fetched first (preloaded in Hero) */}
        <Picture className="mel-still" src="/assets/mel-felt.png" avif="/assets/mel-felt.avif" webp="/assets/mel-felt.webp" alt={alt} width={385} height={1004} fetchPriority="high" />
        <Picture
          defer
          className="mel-yawn"
          src="/assets/mel-felt-yawn.png"
          avif="/assets/mel-felt-yawn.avif"
          webp="/assets/mel-felt-yawn.webp"
          alt=""
          aria-hidden="true"
          width={385}
          height={1004}
          decoding="async"
        />
      </div>
      <span className="cali-say" aria-hidden="true">
        {say}
      </span>
    </div>
  );
}

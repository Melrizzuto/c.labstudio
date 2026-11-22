'use client';

import { useEffect, useRef } from 'react';
import { playCat } from '@/lib/sounds';

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
    const yawn = () => {
      fig.classList.add('yawning');
      clearTimeout(t);
      t = window.setTimeout(() => fig.classList.remove('yawning'), 1500);
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
    };
  }, []);
  return (
    <div className="mel-fig" id="melFig" role="button" tabIndex={0} aria-label={label} ref={ref}>
      <div className="mel-breath">
        <img className="mel-still" src="/assets/mel-felt.png" alt={alt} width={385} height={1004} />
        <img className="mel-yawn" src="/assets/mel-felt-yawn.png" alt="" aria-hidden="true" width={385} height={1004} />
      </div>
      <span className="cali-say" aria-hidden="true">
        {say}
      </span>
    </div>
  );
}

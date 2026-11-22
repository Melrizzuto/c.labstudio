'use client';

import { useEffect, useRef } from 'react';

/*
 * Felt Mel. She breathes (CSS); every 15 s Calì yawns (CSS), and right away when you tap her,
 * press Enter/Space on her, or when the page turns to night.
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
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        yawn();
      }
    };
    fig.addEventListener('click', yawn);
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
      fig.removeEventListener('click', yawn);
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

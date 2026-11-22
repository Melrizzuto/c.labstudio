/*
 * The print treatment of the c.lab poster and reel (wax crayon / risograph), as SVG filters used from CSS:
 *  - #riso: ink with a rough, grainy coverage (the paper shows through in specks). The edge wobble is tiny
 *    on purpose (feDisplacementMap scale .5 px): texture, not distortion. Slightly fewer specks and
 *    blotches than in the reel, so big flat shapes (the sun, the wordmark) stay solid.
 * Every noise is made opaque first: feTurbulence also writes noise into alpha, which would premultiply it.
 * Nothing here animates; the filters are applied only to small decorative elements (see globals.css).
 * The big pieces (wordmarks, tape, checkerboard, card borders) use the same ink as a pre-rendered mask tile
 * instead, and the paper fibres and grain are pre-rendered tiles too (scripts/optimize-images.mjs):
 * no noise is computed in the browser for anything large.
 */
export function PrintFilters() {
  return (
    <>
      <svg className="print-defs" width="0" height="0" aria-hidden="true" focusable="false">
        <defs>
          <filter id="riso" x="-10%" y="-10%" width="120%" height="120%" colorInterpolationFilters="sRGB">
            <feTurbulence type="fractalNoise" baseFrequency="0.09" numOctaves={2} seed={3} result="w0" />
            <feColorMatrix in="w0" type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0 1" result="warp" />
            <feDisplacementMap in="SourceGraphic" in2="warp" scale={0.5} xChannelSelector="R" yChannelSelector="G" result="rough" />
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves={2} seed={8} result="g0" />
            <feColorMatrix in="g0" type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0 1" result="grain" />
            <feTurbulence type="fractalNoise" baseFrequency="0.02" numOctaves={2} seed={5} result="b0" />
            <feColorMatrix in="b0" type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0 1" result="blotch" />
            <feComposite in="grain" in2="blotch" operator="arithmetic" k1={0} k2={1} k3={0.15} k4={-0.075} result="mix" />
            <feColorMatrix in="mix" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  3.4 0 0 0 -0.12" result="mask" />
            <feComposite in="rough" in2="mask" operator="in" />
          </filter>
        </defs>
      </svg>
      <div className="paper" aria-hidden="true"></div>
    </>
  );
}

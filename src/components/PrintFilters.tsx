/*
 * The print treatment of the c.lab poster and reel (wax crayon / risograph), as SVG filters used from CSS:
 *  - #riso: ink with a rough, grainy coverage (the paper shows through in specks). The edge wobble is tiny
 *    on purpose (feDisplacementMap scale .5 px): texture, not distortion. Slightly fewer specks and
 *    blotches than in the reel, so big flat shapes (the sun, the wordmark) stay solid.
 *  - #riso-soft: the misregistered second plate (the pink shadow of the wordmark), a little fuzzier.
 *  - #paper-fibre: soft fibres and mottling, laid under the page as a multiply layer (.paper).
 * Every noise is made opaque first: feTurbulence also writes noise into alpha, which would premultiply it.
 * Nothing here animates; the filters are applied only to small decorative elements (see globals.css).
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
          <filter id="riso-soft" x="-8%" y="-8%" width="116%" height="116%" colorInterpolationFilters="sRGB">
            <feTurbulence type="fractalNoise" baseFrequency="0.07" numOctaves={3} seed={13} result="w0" />
            <feColorMatrix in="w0" type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0 1" result="warp" />
            <feDisplacementMap in="SourceGraphic" in2="warp" scale={0.6} xChannelSelector="R" yChannelSelector="G" result="rough" />
            <feGaussianBlur in="rough" stdDeviation={0.9} result="soft" />
            <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves={2} seed={17} result="g0" />
            <feColorMatrix in="g0" type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0 1" result="grain" />
            <feColorMatrix in="grain" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  3.2 0 0 0 -0.6" result="mask" />
            <feComposite in="soft" in2="mask" operator="in" />
          </filter>
          <filter id="paper-fibre" x="0" y="0" width="100%" height="100%" colorInterpolationFilters="sRGB">
            <feTurbulence type="fractalNoise" baseFrequency="0.03 0.16" numOctaves={3} seed={21} result="f0" />
            <feColorMatrix in="f0" type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0 1" result="fib" />
            <feTurbulence type="fractalNoise" baseFrequency="0.6" numOctaves={1} seed={4} result="m0" />
            <feColorMatrix in="m0" type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0 1" result="fine" />
            <feComposite in="fib" in2="fine" operator="arithmetic" k1={0} k2={0.4} k3={0.6} k4={0} result="mix" />
            <feColorMatrix in="mix" type="matrix" values="0 0 0 0 0.55  0 0 0 0 0.45  0 0 0 0 0.33  -2.6 0 0 0 1.42" />
          </filter>
        </defs>
      </svg>
      <svg className="paper" aria-hidden="true" width="100%" height="100%">
        <rect width="100%" height="100%" filter="url(#paper-fibre)" />
      </svg>
    </>
  );
}

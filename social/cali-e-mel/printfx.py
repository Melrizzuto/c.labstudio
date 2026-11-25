"""Adds the site's print treatment (wax crayon / risograph) to a HyperFrames episode: paper fibres and grain over
the frame (the same tiles as the site), and the #riso ink filter on stickers, stamps and other decorative pieces.
Reading text, Mel and Calì stay crisp, as on the site.  python3 print.py <project dir>"""
import re, sys, shutil, os
SRC = os.environ.get('PRINT_TEXTURES', os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', '..', 'public', 'assets', 'print'))
def apply(s):
  if 'id="printPaper"' in s:
    return s
  dur = re.search(r'id="root"[^>]*data-duration="([0-9.]+)"', s).group(1)
  css = '''
        /* ===== print treatment, as on the site: paper fibres, grain, risograph ink on the decorative pieces ===== */
        #printPaper { z-index: 88; pointer-events: none; mix-blend-mode: multiply; opacity: .2; background: url("assets/paper.webp") 0 0 / 512px 512px; }
        #printGrain { z-index: 89; pointer-events: none; mix-blend-mode: multiply; opacity: .13; background: url("assets/grain-day.webp") 0 0 / 256px 256px; }
        #printGrainN { z-index: 90; pointer-events: none; mix-blend-mode: screen; opacity: .07; background: url("assets/grain-night.webp") 0 0 / 256px 256px; }
        .stamp, .tag, .tease, .who .av, .toast .av, #sun, .awn, .heart, .chk, #sent, .size, .sticker-ink, #wSaldi, #wNew, #wMarq, #clkLbl, .typing i, #series { filter: url(#riso); }
        /* the printed borders: as on the site's cards, the outline is a second plate of ink with the risograph mask */
        .bub, .typing, .toast, .win, #picker, #poster, .card { --bw: 7px; border-color: transparent !important; }
        .toast, #poster { --bw: 6px; }
        .bub::before, .typing::before, .toast::before, .win::before, #picker::before, #poster::before, .card::before {
          content: ""; position: absolute; inset: calc(-1 * var(--bw)); border: var(--bw) solid var(--ink); border-radius: inherit; pointer-events: none; z-index: 5;
          -webkit-mask: url("assets/riso-mask.webp") 0 0 / 512px 512px; mask: url("assets/riso-mask.webp") 0 0 / 512px 512px; }
  '''
  defs = '''      <svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs>
          <filter id="riso" x="-10%" y="-10%" width="120%" height="120%" color-interpolation-filters="sRGB">
            <feTurbulence type="fractalNoise" baseFrequency="0.09" numOctaves="2" seed="3" result="w0" />
            <feColorMatrix in="w0" type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0 1" result="warp" />
            <feDisplacementMap in="SourceGraphic" in2="warp" scale="0.8" xChannelSelector="R" yChannelSelector="G" result="rough" />
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="8" result="g0" />
            <feColorMatrix in="g0" type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0 1" result="grain" />
            <feTurbulence type="fractalNoise" baseFrequency="0.02" numOctaves="2" seed="5" result="b0" />
            <feColorMatrix in="b0" type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0 1" result="blotch" />
            <feComposite in="grain" in2="blotch" operator="arithmetic" k1="0" k2="1" k3="0.15" k4="-0.075" result="mix" />
            <feColorMatrix in="mix" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  3.4 0 0 0 -0.12" result="mask" />
            <feComposite in="rough" in2="mask" operator="in" />
          </filter></defs></svg>
  '''
  overlays = f'''      <div id="printPaper" class="clip" data-start="0" data-duration="{dur}" data-layout-ignore></div>
        <div id="printGrain" class="clip" data-start="0" data-duration="{dur}" data-layout-ignore></div>
        <div id="printGrainN" class="clip" data-start="0" data-duration="{dur}" data-layout-ignore></div>
  '''
  i = s.rindex('</style>'); s = s[:i] + css + '    ' + s[i:]
  m = re.search(r'(<div id="root"[^>]*>\n)', s); s = s[:m.end()] + defs + s[m.end():]
  # overlays go last inside #root: just before the root's closing tag, which precedes <script>
  k = s.index('<script>\n      window.__timelines')
  j = s.rindex('</div>', 0, k)
  s = s[:j] + overlays.lstrip() + '    ' + s[j:]
  return s

if __name__ == '__main__':
    d = sys.argv[1]
    for f in ('grain-day.webp', 'grain-night.webp', 'paper.webp', 'riso-mask.webp'):
        shutil.copy(os.path.join(SRC, f), os.path.join(d, 'assets', f))
    p = os.path.join(d, 'index.html')
    html = open(p).read()
    out = apply(html)
    open(p, 'w').write(out)
    print('ok', d)

import sys, os
sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), '..'))
from kit import *

CALI = dict(name='Calì', avatar='<img src="assets/cali-av.png" alt="" />', av_cls='cat')
snow = ''.join(f'<i style="left:{(i * 137) % 520 + 10}px; top:{(i * 89) % 700}px; animation-delay:0s"></i>' for i in range(26))
css = '''
      #sChat2, #sChat3, #sXmas, #sEnd { z-index: 2; }
      #endMel { top: 1100px; }
      .av.cat { padding: 0; overflow: hidden; background: #fff8ea; } .av.cat img { width: 100%; height: 100%; display: block; }
      #sCard { background: #e9e4da radial-gradient(rgba(22,19,15,.1) 1.6px, transparent 2px) 0 0 / 32px 32px; }
      #card { position: absolute; left: 260px; top: 380px; width: 560px; height: 790px; border-radius: 18px; background: #b3261e; overflow: hidden; }
      #card h3 { position: absolute; left: 44px; right: 40px; top: 60px; font: 700 104px/0.9 "Caveat", cursive; color: #fff3df; }
      #card p { position: absolute; left: 48px; top: 300px; font: 700 28px/1.3 "Space Mono", monospace; color: #ffc21a; }
      #card .me { position: absolute; left: 60px; bottom: 40px; width: 440px; transform-origin: 50% 100%; }
      #snow { position: absolute; inset: 0; }
      #snow i { position: absolute; width: 12px; height: 12px; border-radius: 50%; background: #fff3df; opacity: .9; }
      #cver { position: absolute; left: 130px; top: 300px; padding: 10px 18px; border-radius: 12px; background: var(--ink); color: var(--sun); font: 700 30px/1 "Space Mono", monospace; }
      #send { position: absolute; left: 330px; top: 1195px; padding: 22px 40px; border-radius: 999px; background: var(--ink); color: #fff8ea; font: 800 40px/1 "Outfit", sans-serif; opacity: 0; }
      /* the Christmas corner */
      #sXmas { background: #1f3b2c radial-gradient(rgba(255,255,255,.1) 2.4px, transparent 2.8px) 0 0 / 44px 44px; }
      #tree { position: absolute; left: 90px; top: 330px; width: 520px; height: 900px; }
      #ball { position: absolute; left: 380px; top: 640px; z-index: 5; width: 70px; height: 70px; border-radius: 50%; background: #ffc21a; border: 6px solid var(--ink); }
      #gift { position: absolute; left: 470px; top: 930px; width: 470px; height: 300px; background: #d6281c; border: 8px solid var(--ink); border-radius: 12px; }
      #gift::before { content: ""; position: absolute; left: 50%; top: -8px; bottom: -8px; width: 60px; margin-left: -30px; background: #ffc21a; border-left: 6px solid var(--ink); border-right: 6px solid var(--ink); }
      #bow { position: absolute; left: 640px; top: 700px; width: 220px; height: 147px; z-index: 5; transform-origin: 50% 80%; }
      #catBow { position: absolute; left: 520px; top: 800px; width: 400px; height: 163px; z-index: 4; }
      #catBow img { width: 100%; height: 100%; }
      #okX { position: absolute; left: 130px; top: 1010px; padding: 16px 30px 20px; border: 10px solid #3be36b; border-radius: 22px; color: #3be36b; background: rgba(15,30,20,.85);
        font: 900 76px/1 "Outfit", sans-serif; text-transform: uppercase; z-index: 6; opacity: 0; }
      #okX small { display: block; font: 700 40px/1 "Caveat", cursive; text-transform: none; color: #fff3df; margin-top: 6px; }
      #note { position: absolute; left: 130px; top: 1215px; font: 700 28px/1 "Space Mono", monospace; color: #fff3df; opacity: 0; z-index: 6; }
'''
tree = '''<svg id="tree" viewBox="0 0 520 900" data-layout-ignore><g stroke="#16130f" stroke-width="8" stroke-linejoin="round">
  <polygon points="260,40 400,300 120,300" fill="#2e9e3e"/><polygon points="260,200 450,520 70,520" fill="#2e9e3e"/><polygon points="260,400 500,780 20,780" fill="#2e9e3e"/>
  <rect x="220" y="780" width="80" height="100" fill="#8a5a2b"/></g>
  <text x="260" y="60" text-anchor="middle" font-size="90">⭐</text>
  <circle cx="200" cy="270" r="22" fill="#d6281c" stroke="#16130f" stroke-width="6"/><circle cx="330" cy="460" r="22" fill="#f25aa6" stroke="#16130f" stroke-width="6"/>
  <circle cx="160" cy="700" r="24" fill="#1d3fd1" stroke="#16130f" stroke-width="6"/><circle cx="380" cy="720" r="24" fill="#d6281c" stroke="#16130f" stroke-width="6"/></svg>'''
bow = '''<svg id="bow" viewBox="0 0 300 200" data-layout-ignore><g stroke="#16130f" stroke-width="8" stroke-linejoin="round" fill="#ffc21a">
  <path d="M150 120 C 60 20, 0 60, 30 130 C 60 180, 120 150, 150 120 Z"/><path d="M150 120 C 240 20, 300 60, 270 130 C 240 180, 180 150, 150 120 Z"/>
  <path d="M140 120 L 100 200 L 130 190 Z"/><path d="M160 120 L 200 200 L 170 190 Z"/><circle cx="150" cy="120" r="26"/></g></svg>'''
body = '\n'.join([
  chat('sChat1', 0, 3.4, bub('b1', 600, 'Mi serve il <em>biglietto di Natale</em> dello studio. 🎄', 'bub big', hidden=False), status='Boss · online', tease='guarda fino alla fine 👀', peek_id='pk1', **CALI),
  react('sR1', 3.4, 2.4, 'Tre giorni.<br /><em>E una Boss.</em>'),
  chat('sChat2', 5.8, 4.8, bub('b2', 480, 'Natalizio, <em>ma non troppo.</em>') + bub('b3', 720, 'Con la neve, <em>ma che non sembri freddo.</em> ❄️') + bub('b4', 990, 'E mettici me. <em>Più grande.</em>'), status='Boss · online', **CALI),
  f'''      <div id="sCard" class="clip" data-start="10.6" data-duration="5" data-layout-allow-overlap>
        <p id="cver" class="stamp">v1</p>
        <div id="card" class="box"><div id="snow">{snow}</div><h3>Buone Feste</h3><p>da c.lab studio 🎄</p><img class="me" src="assets/cali-peek.png" alt="" /></div>
        <div id="send">Invia alla Boss ✉️</div>
      </div>''',
  chat('sChat3', 15.6, 4.4, typing_dots('t3', 560) + '<p id="left" style="position:absolute;left:130px;top:560px;font:700 34px/1.3 \'Space Mono\',monospace;color:#8a8178;opacity:0">🐾 la Boss ha lasciato la chat</p>', status='sta scrivendo…', peek_id='pk3', **CALI),
  f'''      <div id="sXmas" class="clip" data-start="20" data-duration="6">
        {tree}<div id="ball"></div><div id="gift"></div>{bow}
        <div id="catBow" data-layout-ignore><img src="assets/cali-peek.png" alt="" /></div>
        <p id="okX">Approvato<small>il fiocco.</small></p>
        <p id="note">(il biglietto non l'ha aperto)</p>
      </div>''',
  end(26, 4, 'Buon Natale da c.lab studio 🎄<br />e dalla <em>Boss.</em>', 'speciale', 'anche il tuo gatto preferisce il fiocco? 👇'),
  music(30, '"Deck the Halls B"', 0.36),
  sfx('pop.wav', 0.06), sfx('whoosh1.wav', 3.3, 0.55), sfx('whoosh2.wav', 5.7, 0.55),
  sfx('pop.wav', 6.05, 0.85), sfx('pop.wav', 7.35, 0.9), sfx('pop.wav', 8.85, 0.95),
  sfx('whoosh1.wav', 10.5, 0.5), sfx('pop.wav', 11.3, 0.8), sfx('tick.wav', 12.4, 0.5), sfx('tick.wav', 13.6, 0.5), sfx('tick.wav', 14.6, 0.6), sfx('whoosh2.wav', 15.0, 0.55),
  sfx('tick.wav', 16.3, 0.45), sfx('tick.wav', 17.1, 0.5), sfx('tick.wav', 17.9, 0.45),
  sfx('whoosh1.wav', 19.9, 0.5), sfx('cat-trill.mp3', 20.6, 0.85), sfx('knock1.wav', 21.95, 0.9), sfx('knock2.wav', 22.25, 0.7),
  sfx('pop.wav', 23.05, 1), sfx('cat-purr.mp3', 23.3, 0.9), sfx('cat-meow.mp3', 26.4, 0.85),
])
snow_tl = '\n'.join(f'      tl.fromTo("#snow i:nth-child({i + 1})", {{ y: -60 }}, {{ y: 820, duration: {3.2 + (i % 5) * 0.4}, ease: "none" }}, {round(10.6 + (i % 7) * 0.2, 2)});' for i in range(26))
timeline = '''
      peek("#pk1", 0.3); tl.fromTo("#b1 em", { color: "#16130f" }, { color: "#c81d74", duration: 0.3 }, 1.0);
      tl.fromTo("#sR1F", { scale: 1 }, { scale: 1.12, duration: 2.4, ease: "power1.inOut" }, 3.4); blurIn("#sR1B", 3.8);
      pop("#b2", 6.0); pop("#b3", 7.3); pop("#b4", 8.8);
      tl.fromTo("#card", { scale: 1.06, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.5, ease: "expo.out" }, 10.6);
''' + snow_tl + '''
      tl.set("#cver", { textContent: "v4" }, 12.4); tl.to("#card .me", { scale: 1.25, duration: 0.4, ease: "back.out(2)" }, 12.4);
      tl.set("#cver", { textContent: "v9" }, 13.6); tl.to("#card .me", { scale: 1.5, duration: 0.4, ease: "back.out(2)" }, 13.6);
      tl.to("#send", { opacity: 1, duration: 0.2 }, 14.0);
      tl.fromTo("#send", { scale: 1 }, { scale: 0.92, duration: 0.1, yoyo: true, repeat: 1 }, 14.6);
      tl.to("#card", { y: -900, rotation: -8, duration: 0.5, ease: "power3.in" }, 15.0);
      peek("#pk3", 15.8); typing("#t3", 16.0, 2.4);
      tl.to("#left", { opacity: 1, duration: 0.3 }, 18.6);
      /* the Christmas corner: Calì in the bow, a bauble on the floor */
      tl.fromTo("#catBow", { y: 160, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: "back.out(1.6)" }, 20.4);
      tl.to("#bow", { rotation: -10, duration: 0.15, yoyo: true, repeat: 5, ease: "sine.inOut" }, 20.9);
      tl.to("#ball", { y: 560, x: -300, rotation: 220, duration: 0.55, ease: "power2.in" }, 21.4);
      tl.to("#ball", { y: 520, duration: 0.15, yoyo: true, repeat: 1, ease: "power1.out" }, 21.95);
      tl.fromTo("#okX", { opacity: 0, scale: 3, rotation: -12 }, { opacity: 1, scale: 1, rotation: -6, duration: 0.22, ease: "power4.in" }, 22.85);
      tl.to("#sXmas", { x: 12, duration: 0.05, yoyo: true, repeat: 3 }, 23.07);
      tl.to("#note", { opacity: 1, duration: 0.3 }, 23.8);
''' + end_tl(26)
open(os.path.join(os.path.dirname(os.path.abspath(__file__)), 'index.html'), 'w').write(page(30, body, timeline, css))

import sys, os
sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), '..'))
from kit import *

CALI = dict(name='Calì', avatar='<img src="assets/cali-av.png" alt="" />', av_cls='cat')
snow = ''.join(f'<i style="left:{(i * 137) % 520 + 10}px; top:{(i * 89) % 700}px; animation-delay:0s"></i>' for i in range(26))
GLOWS = [(778, 819), (860, 832), (734, 999), (932, 1030), (572, 972), (526, 1179), (634, 1210), (832, 1269), (986, 1179), (454, 1386), (648, 1454), (871, 1462), (1040, 1422)]
css = '''
      #sChat2, #sChat3, #sRoom, #sXmas, #sEnd { z-index: 2; }
      #room { position: absolute; inset: 0; width: 1080px; height: 1920px; }
      #walker { position: absolute; left: 0; top: 1240px; width: 560px; transform-origin: 50% 100%; }
      #swat { position: absolute; left: 90px; top: 960px; width: 470px; z-index: 4; }
      #swat img { width: 100%; transform-origin: 50% 100%; }
      .bub.cat { left: 110px; z-index: 5; }
      .bub.cat.big { font-size: 74px; }
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
      #sXmas { background: #14281c; } #scene { position: absolute; inset: 0; width: 1080px; height: 1920px; }
      #glows i { position: absolute; width: 74px; height: 74px; margin: -37px; border-radius: 50%; background: radial-gradient(#fff6c8, rgba(255,200,80,.6) 30%, transparent 70%); mix-blend-mode: screen; }

      #tree { position: absolute; left: 60px; top: 300px; width: 560px; height: 940px; }
      #ball { position: absolute; left: 560px; top: 1100px; z-index: 5; width: 60px; height: 60px; border-radius: 50%; background: radial-gradient(circle at 35% 30%, #ffb3a8, #d6281c 50%, #7a120c); box-shadow: 0 6px 10px rgba(0,0,0,.35); }
      #gift { position: absolute; left: 470px; top: 930px; width: 470px; height: 300px; border-radius: 18px; background: linear-gradient(160deg, #ff6a5a 0%, #e0352a 40%, #a51f17 100%); box-shadow: inset -24px -20px 40px rgba(0,0,0,.28), inset 18px 16px 30px rgba(255,255,255,.18), 0 26px 30px -14px rgba(0,0,0,.55); z-index: 1; }
      #gift::before { content: ""; position: absolute; left: 50%; top: 0; bottom: 0; width: 64px; margin-left: -32px; z-index: 1; background: linear-gradient(90deg, #c98d00, #ffd75a 45%, #ffc21a 60%, #b07a00); }
      #gift::after { content: ""; position: absolute; left: -10px; right: -10px; top: -6px; height: 74px; border-radius: 16px; background: linear-gradient(#ff7b6c, #e0352a); box-shadow: 0 10px 14px rgba(0,0,0,.28); }
      #bow { position: absolute; left: 150px; top: -20px; width: 130px; height: 87px; z-index: 5; transform-origin: 50% 80%; }
      #catBow { position: absolute; left: 60px; top: 1050px; width: 420px; height: 420px; z-index: 4; }
      #catBow img { position: absolute; inset: 0; width: 100%; height: 100%; }

      #lights .bulb { mix-blend-mode: screen; transform-box: fill-box; transform-origin: center; }
      #okX { position: absolute; left: 300px; top: 860px; padding: 16px 30px 20px; border: 10px solid #3be36b; border-radius: 22px; color: #3be36b; background: rgba(15,30,20,.88);
        font: 900 76px/1 "Outfit", sans-serif; text-transform: uppercase; z-index: 6; opacity: 0; }
      #okX small { display: block; font: 700 40px/1 "Caveat", cursive; text-transform: none; color: #fff3df; margin-top: 6px; }
      #note { position: absolute; left: 330px; top: 1095px; padding: 10px 16px; border-radius: 12px; background: rgba(15,30,20,.88); font: 700 28px/1 "Space Mono", monospace; color: #fff3df; opacity: 0; z-index: 6; }
'''
tree = open(os.path.join(os.path.dirname(os.path.abspath(__file__)), 'tree.svg.txt')).read()
bow = '''<svg id="bow" viewBox="0 0 300 200" data-layout-ignore><defs><radialGradient id="bowG" cx="40%" cy="30%" r="75%"><stop offset="0" stop-color="#fff1a8"/><stop offset=".55" stop-color="#ffc21a"/><stop offset="1" stop-color="#b37a00"/></radialGradient></defs><g filter="url(#felt)" fill="url(#bowG)" stroke="#9a6a00" stroke-width="3">
  <path d="M150 120 C 60 20, 0 60, 30 130 C 60 180, 120 150, 150 120 Z"/><path d="M150 120 C 240 20, 300 60, 270 130 C 240 180, 180 150, 150 120 Z"/>
  <path d="M140 120 L 100 200 L 130 190 Z"/><path d="M160 120 L 200 200 L 170 190 Z"/><circle cx="150" cy="120" r="26"/></g></svg>'''
body = '\n'.join([
  chat('sChat1', 0, 3.4, bub('b1', 600, 'Mi serve il <em>biglietto di Natale</em> dello studio. 🎄', 'bub big', hidden=False), status='Boss · online', tease='guarda fino alla fine 👀', peek_id='pk1', **CALI),
  react('sR1', 3.4, 2.4, 'Tre giorni.<br /><em>E una Boss.</em>', sweat=True),
  chat('sChat2', 5.8, 4.8, bub('b2', 480, 'Natalizio, <em>ma non troppo.</em>') + bub('b3', 720, 'Con la neve, <em>ma che non sembri freddo.</em> ❄️') + bub('b4', 990, 'E mettici me. <em>Più grande.</em>'), status='Boss · online', **CALI),
  f'''      <div id="sCard" class="clip" data-start="10.6" data-duration="5" data-layout-allow-overlap>
        <p id="cver" class="stamp">v1</p>
        <div id="card" class="box"><div id="snow">{snow}</div><h3>Buone Feste</h3><p>da c.lab studio 🎄</p><img class="me" src="assets/cali-peek.png" alt="" /></div>
        <div id="send">Invia alla Boss ✉️</div>
      </div>''',
  chat('sChat3', 15.6, 4.4, typing_dots('t3', 560) + '<p id="left" style="position:absolute;left:130px;top:560px;font:700 34px/1.3 \'Space Mono\',monospace;color:#8a8178;opacity:0">🐾 la Boss ha lasciato la chat</p>', status='sta scrivendo…', peek_id='pk3', **CALI),
  f'''      <div id="sRoom" class="clip" data-start="20" data-duration="4">
        <img id="room" src="assets/stanza-natale.jpg" alt="" data-layout-ignore />
        <img id="walker" src="assets/cali-cammina.png" alt="" data-layout-ignore />
      </div>''',
  f'''      <div id="sXmas" class="clip" data-start="24" data-duration="7" data-layout-allow-overlap>
        <img id="scene" src="assets/scena-natale.jpg" alt="" data-layout-ignore />
        <div id="glows" data-layout-ignore>{''.join(f'<i style="left:{x}px;top:{y}px"></i>' for x, y in GLOWS)}</div>
        <div id="swat" data-layout-ignore><img src="assets/cali-zampata.png" alt="" /></div>
        {bub('cb1', 300, 'Il biglietto? <em>Chi se ne frega…</em>', 'bub cat')}
        {bub('cb2', 580, 'qui ci sono le <em>PALLINE!</em> 🎄', 'bub cat big')}
        <p id="okX">Approvato<small>le palline.</small></p>
        <p id="note">(il biglietto non l'ha aperto)</p>
      </div>''',
  end(31, 4, 'Buon Natale da c.lab studio 🎄<br />e dalla <em>Boss.</em>', 'speciale', 'anche il tuo gatto gioca con le palline? 👇'),
  music(35, '"Deck the Halls B"', 0.36),
  sfx('pop.wav', 0.06), sfx('whoosh1.wav', 3.3, 0.55), sfx('whoosh2.wav', 5.7, 0.55),
  sfx('pop.wav', 6.05, 0.85), sfx('pop.wav', 7.35, 0.9), sfx('pop.wav', 8.85, 0.95),
  sfx('whoosh1.wav', 10.5, 0.5), sfx('pop.wav', 11.3, 0.8), sfx('tick.wav', 12.4, 0.5), sfx('tick.wav', 13.6, 0.5), sfx('tick.wav', 14.6, 0.6), sfx('whoosh2.wav', 15.0, 0.55),
  sfx('tick.wav', 16.3, 0.45), sfx('tick.wav', 17.1, 0.5), sfx('tick.wav', 17.9, 0.45),
  sfx('whoosh1.wav', 19.9, 0.5), sfx('cat-trill.mp3', 20.5, 0.8),
  sfx('whoosh2.wav', 23.9, 0.5), sfx('pop.wav', 24.75, 0.95), sfx('pop.wav', 26.05, 1),
  sfx('knock1.wav', 26.9, 0.6), sfx('knock2.wav', 27.4, 0.6), sfx('knock1.wav', 27.9, 0.6), sfx('cat-purr.mp3', 27.0, 0.8),
  sfx('pop.wav', 28.65, 1), sfx('cat-meow.mp3', 31.4, 0.85),
])
snow_tl = '\n'.join(f'      tl.fromTo("#snow i:nth-child({i + 1})", {{ y: -60 }}, {{ y: 820, duration: {3.2 + (i % 5) * 0.4}, ease: "none" }}, {round(10.6 + (i % 7) * 0.2, 2)});' for i in range(26))
timeline = '''
      peek("#pk1", 0.3); tl.fromTo("#b1 em", { color: "#16130f" }, { color: "#c81d74", duration: 0.3 }, 1.0);
      tl.fromTo("#sR1F", { scale: 1 }, { scale: 1.12, duration: 2.4, ease: "power1.inOut" }, 3.4); blurIn("#sR1B", 3.8); sweat("sR1", 4.1);
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
      /* the Boss leaves: she walks across Mel's room toward the tree */
      tl.fromTo("#room", { scale: 1.04 }, { scale: 1, duration: 4, ease: "power1.out" }, 20);
      tl.fromTo("#walker", { x: -560, y: 0, scale: 1 }, { x: 520, y: -260, scale: 0.62, duration: 3.6, ease: "none" }, 20.2);
      tl.fromTo("#walker", { rotation: -3 }, { rotation: 3, duration: 0.22, yoyo: true, repeat: 15, ease: "sine.inOut" }, 20.2);
      /* the tree: who cares about the card */
      document.querySelectorAll("#glows i").forEach((g, i) => { const d = 0.4 + (i % 4) * 0.13; tl.fromTo(g, { opacity: 0.25 }, { opacity: 1, duration: d, yoyo: true, repeat: Math.floor(7 / d) - 1, ease: "sine.inOut" }, 24 + (i % 5) * 0.1); });
      tl.fromTo("#scene", { scale: 1.06 }, { scale: 1, duration: 7, ease: "power1.out" }, 24);
      tl.fromTo("#swat", { y: 200, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: "back.out(1.6)" }, 24.1);
      pop("#cb1", 24.7); pop("#cb2", 26.0);
      [26.85, 27.35, 27.85].forEach((t) => tl.to("#swat img", { rotation: -7, duration: 0.12, yoyo: true, repeat: 1, ease: "power2.out" }, t));
      tl.fromTo("#okX", { opacity: 0, scale: 3, rotation: -12 }, { opacity: 1, scale: 1, rotation: -6, duration: 0.22, ease: "power4.in" }, 28.6);
      tl.to("#sXmas", { x: 12, duration: 0.05, yoyo: true, repeat: 3 }, 28.82);
      tl.to("#note", { opacity: 1, duration: 0.3 }, 29.4);
''' + end_tl(31)
open(os.path.join(os.path.dirname(os.path.abspath(__file__)), 'index.html'), 'w').write(page(35, body, timeline, css))

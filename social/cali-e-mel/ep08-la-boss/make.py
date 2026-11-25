import sys, os
sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), '..'))
from kit import *

CALI = dict(name='Calì', avatar='<img src="assets/cali-av.png" alt="" />', av_cls='cat')
css = '''
      #sChat2, #sChat3, #sChat4, #sBox, #sEnd { z-index: 2; }
      .av.cat { padding: 0; overflow: hidden; background: #fff8ea; }
      .av.cat img { width: 100%; height: 100%; display: block; }
      #sPack { background: #e9e4da radial-gradient(rgba(22,19,15,.1) 1.6px, transparent 2px) 0 0 / 32px 32px; }
      #pack { position: absolute; left: 270px; top: 400px; width: 540px; height: 740px; border-radius: 18px; background: #fff3df; overflow: hidden; }
      #packTint { position: absolute; inset: 0; background: #f4a38c; opacity: 0; }
      #band { position: absolute; left: 0; right: 0; top: 0; height: 170px; background: var(--cobalt); }
      #brand { position: absolute; left: 40px; top: 46px; font: 900 96px/1 "Outfit", sans-serif; letter-spacing: -0.05em; color: #fff8ea; }
      #tagline { position: absolute; left: 44px; top: 200px; right: 40px; font: 700 30px/1.2 "Space Mono", monospace; }
      #kib { position: absolute; left: 225px; top: 400px; width: 90px; height: 90px; border-radius: 50%; background: #9a5b2a; border: 6px solid var(--ink);
        box-shadow: inset -12px -12px 0 rgba(0,0,0,.18); transform-origin: 50% 50%; }
      #fish { position: absolute; right: 40px; bottom: 36px; font-size: 90px; }
      #ver { position: absolute; left: 130px; top: 300px; padding: 10px 18px; border-radius: 12px; background: var(--ink); color: var(--sun); font: 700 30px/1 "Space Mono", monospace; }
      .sws { position: absolute; left: 130px; top: 1190px; display: flex; gap: 18px; opacity: 0; }
      .sws div { text-align: center; font: 700 26px/1.15 "Space Mono", monospace; }
      .sws i { display: block; width: 230px; height: 46px; border-radius: 12px; border: 5px solid var(--ink); background: #f4a38c; margin-bottom: 8px; }
      .sws .on i { outline: 6px solid var(--cobalt); outline-offset: 4px; }
      #clock { position: absolute; right: 190px; top: 300px; padding: 10px 18px; border-radius: 12px; background: #1b2140; color: #fff8ea; font: 700 30px/1 "Space Mono", monospace; opacity: 0; }
      #sendBtn { position: absolute; left: 330px; top: 1180px; padding: 22px 40px; border-radius: 999px; background: var(--ink); color: #fff8ea; font: 800 40px/1 "Outfit", sans-serif; opacity: 0; }
      #cur5 { position: absolute; left: 0; top: 0; width: 76px; height: 76px; z-index: 6; opacity: 0; }
      /* the verdict: Calì in the laptop's box */
      #sBox { background: var(--pink) radial-gradient(rgba(255,255,255,.28) 2.6px, transparent 3px) 0 0 / 44px 44px; }
      #boxFront { position: absolute; left: 230px; top: 820px; width: 620px; height: 400px; background: #c98a4b; border: 8px solid var(--ink); border-radius: 10px; z-index: 2; }
      #boxFront p { position: absolute; left: 40px; top: 120px; font: 700 34px/1.3 "Space Mono", monospace; color: #5a3410; }
      #flapL, #flapR { position: absolute; top: 760px; width: 320px; height: 90px; background: #b07436; border: 8px solid var(--ink); z-index: 1; }
      #flapL { left: 150px; transform: skewX(-30deg); } #flapR { left: 610px; transform: skewX(30deg); }
      #inBox { position: absolute; left: 330px; top: 640px; width: 430px; height: 175px; z-index: 3; }
      #inBox img { width: 100%; height: 100%; }
      #ok { position: absolute; left: 300px; top: 1030px; padding: 16px 30px 20px; border: 10px solid #2e9e3e; border-radius: 22px; color: #2e9e3e; background: rgba(255,248,234,.92);
        font: 900 96px/1 "Outfit", sans-serif; text-transform: uppercase; z-index: 4; opacity: 0; }
      #what { position: absolute; left: 130px; top: 1240px; font: 700 30px/1 "Space Mono", monospace; color: var(--ink); opacity: 0; z-index: 4; }
'''
body = '\n'.join([
  chat('sChat1', 0, 3.4, bub('b1', 600, 'Mi serve il packaging delle crocchette. <em>Per ieri.</em> 🐟', 'bub big', hidden=False), status='Boss · online', tease='guarda fino alla fine 👀', peek_id='pk1', **CALI),
  react('sR1', 3.4, 2.4, 'Sì,<br /><em>Boss.</em>'),
  f'''      <div id="sPack" class="clip" data-start="5.8" data-duration="19.8" data-layout-allow-overlap style="z-index: 1">
        <p id="ver" class="stamp">v1</p><p id="clock">03:12</p>
        <div id="pack" class="box"><div id="packTint"></div><div id="band"></div><span id="brand">CROCC</span>
          <p id="tagline">crocchette gourmet<br />per Boss esigenti</p><div id="kib"></div><span id="fish">🐟</span></div>
        <div id="sw" class="sws"><div><i></i>trota</div><div><i></i>trota chiaro</div><div id="sw3"><i></i>trota, ma<br />più chiaro</div></div>
        <div id="sendBtn">Invia alla Boss ✉️</div>
        <svg id="cur5" viewBox="0 0 24 24"><path d="M3 2l17 9-7.5 1.6L9 20z" fill="#16130f" stroke="#fff" stroke-width="1.6" stroke-linejoin="round" /></svg>
      </div>''',
  chat('sChat2', 9.4, 3, bub('b2', 600, 'Puoi fare la crocchetta <em>un po\' più grande?</em>'), status='Boss · online', peek_id='pk2', **CALI),
  chat('sChat3', 14.6, 3, bub('b3', 560, 'La voglio <em>color trota.</em>') + bub('b4', 780, 'Ma più chiaro.'), status='Boss · online', peek_id='pk3', **CALI),
  chat('sChat4', 19.8, 3.6, typing_dots('t4', 600) + bub('b5', 600, 'Ultima cosa veloce. <em>Ci vuole un minuto.</em> ⏱️'), status='sta scrivendo…', peek_id='pk4', **CALI),
  f'''      <div id="sBox" class="clip" data-start="25.6" data-duration="4">
        <div id="flapL"></div><div id="flapR"></div>
        <div id="inBox" data-layout-ignore><img src="assets/cali-peek.png" alt="" /></div>
        <div id="boxFront"><p>PORTATILE 15"<br />↑ ALTO ↑<br />FRAGILE</p></div>
        <p id="ok">Approvato</p>
        <p id="what">(la scatola del portatile)</p>
      </div>''',
  end(29.6, 4, 'Anche il tuo capo è <em>così?</em> Taggalo 👇', 8, 'segui per l’ep. 9'),
  music(33.6, '"Pixel Peeker Polka - faster"', 0.34),
  sfx('pop.wav', 0.06), sfx('whoosh1.wav', 3.3, 0.55), sfx('whoosh2.wav', 5.7, 0.55),
  sfx('pop.wav', 6.6, 0.8), sfx('pop.wav', 7.1, 0.8), sfx('pop.wav', 7.6, 0.8),
  sfx('whoosh1.wav', 9.3, 0.5), sfx('pop.wav', 9.5, 0.9), sfx('whoosh2.wav', 12.3, 0.5), sfx('riser.wav', 12.6, 0.6),
  sfx('whoosh1.wav', 14.5, 0.5), sfx('pop.wav', 14.7, 0.9), sfx('pop.wav', 15.9, 0.95),
  sfx('whoosh2.wav', 17.5, 0.5), sfx('tick.wav', 18.6, 0.6), sfx('tick.wav', 19.1, 0.6),
  sfx('whoosh1.wav', 19.7, 0.5), sfx('tick.wav', 20.3, 0.45), sfx('tick.wav', 20.9, 0.5), sfx('pop.wav', 21.65, 0.95),
  sfx('whoosh2.wav', 23.3, 0.5), sfx('tick.wav', 24.6, 0.6), sfx('whoosh1.wav', 24.95, 0.55),
  sfx('cat-purr.mp3', 25.8, 0.95), sfx('knock2.wav', 26.85, 0.9), sfx('cat-trill.mp3', 27.3, 0.7), sfx('cat-meow.mp3', 30.0, 0.85),
])
timeline = '''
      /* 1 · the boss's brief, frame 0 */
      peek("#pk1", 0.3); tl.fromTo("#b1 em", { color: "#16130f" }, { color: "#c81d74", duration: 0.3 }, 1.0);
      /* 2 · "yes, boss" */
      tl.fromTo("#sR1F", { scale: 1 }, { scale: 1.12, duration: 2.4, ease: "power1.inOut" }, 3.4); blurIn("#sR1B", 3.8);
      /* 3 · v1, made fast and well */
      tl.fromTo("#pack", { scale: 1.06, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.5, ease: "expo.out" }, 5.8);
      tl.fromTo("#brand", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.25 }, 6.55);
      tl.fromTo("#kib", { scale: 0 }, { scale: 1, duration: 0.3, ease: "back.out(3)" }, 7.05);
      tl.fromTo("#fish", { scale: 0 }, { scale: 1, duration: 0.3, ease: "back.out(3)" }, 7.55);
      /* 4 · bigger kibble (ep. 1, again) */
      peek("#pk2", 9.5); pop("#b2", 9.5);
      tl.set("#ver", { textContent: "v2" }, 12.4);
      tl.to("#kib", { scale: 5.6, duration: 1.6, ease: "power2.inOut" }, 12.6);
      /* 5 · trout colour, but lighter (ep. 2, again) */
      peek("#pk3", 14.7); pop("#b3", 14.7); pop("#b4", 15.9);
      tl.set("#ver", { textContent: "v14" }, 17.6);
      tl.to("#sw", { opacity: 1, duration: 0.2 }, 17.7);
      tl.set("#cur5", { x: 760, y: 1300, opacity: 1 }, 17.6);
      tl.to("#cur5", { x: 690, y: 1230, duration: 0.6, ease: "power2.inOut" }, 17.8);
      tl.set("#sw3", { className: "on" }, 18.6);
      tl.to("#packTint", { opacity: 1, duration: 0.4 }, 18.65); tl.to("#band", { backgroundColor: "#d6281c", duration: 0.4 }, 18.65);
      /* 6 · "it takes a minute" (ep. 5, again) */
      peek("#pk4", 19.9); typing("#t4", 20.1, 1.6); pop("#b5", 21.6);
      /* 7 · 3:12 a.m., v47, sent */
      tl.set("#ver", { textContent: "v47" }, 23.4); tl.to("#sw", { opacity: 0, duration: 0.1 }, 23.4);
      tl.to("#clock", { opacity: 1, duration: 0.2 }, 23.5); tl.to("#sPack", { backgroundColor: "#bfb8c9", duration: 0.6 }, 23.4);
      tl.to("#sendBtn", { opacity: 1, duration: 0.2 }, 23.7);
      tl.to("#cur5", { x: 560, y: 1200, duration: 0.6, ease: "power2.inOut" }, 23.8);
      tl.fromTo("#sendBtn", { scale: 1 }, { scale: 0.92, duration: 0.1, yoyo: true, repeat: 1 }, 24.6);
      tl.to("#pack", { y: -900, rotation: -8, duration: 0.5, ease: "power3.in" }, 24.95);
      /* 8 · the verdict: Calì approves the laptop's box */
      tl.fromTo("#inBox", { y: 170 }, { y: 0, duration: 0.7, ease: "back.out(1.6)" }, 25.9);
      tl.fromTo("#ok", { opacity: 0, scale: 3, rotation: -12 }, { opacity: 1, scale: 1, rotation: -8, duration: 0.22, ease: "power4.in" }, 26.65);
      tl.to("#sBox", { x: 12, duration: 0.05, yoyo: true, repeat: 3 }, 26.88);
      tl.to("#what", { opacity: 1, duration: 0.3 }, 27.6);
''' + end_tl(29.6)
open(os.path.join(os.path.dirname(os.path.abspath(__file__)), 'index.html'), 'w').write(page(33.6, body, timeline, css))

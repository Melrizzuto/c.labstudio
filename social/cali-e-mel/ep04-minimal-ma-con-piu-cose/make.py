import sys, os
sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), '..'))
from kit import *

css = '''
      #sSite { z-index: 1; } #sChat2, #sChat3, #sR2, #sEnd { z-index: 2; }
      #site .body { position: relative; height: 780px; background: #fff; overflow: hidden; }
      .url { flex: 1; margin-left: 14px; height: 40px; border: 4px solid var(--ink); border-radius: 20px; font: 700 22px/32px "Space Mono", monospace; padding: 0 16px; background: #fff; }
      #mini .lg { position: absolute; left: 60px; top: 50px; font: 700 28px/1 "Space Mono", monospace; letter-spacing: .08em; }
      #mini .nav { position: absolute; right: 60px; top: 50px; font: 600 28px/1 "Figtree", sans-serif; color: #8a8178; }
      #mini h1 { position: absolute; left: 60px; top: 260px; font: 900 112px/0.92 "Outfit", sans-serif; letter-spacing: -0.05em; }
      #mini p { position: absolute; left: 64px; top: 500px; font: 500 32px/1.3 "Figtree", sans-serif; color: #6f675e; }
      #mini .cta { position: absolute; left: 60px; top: 600px; padding: 20px 34px; border: 5px solid var(--ink); border-radius: 999px; font: 800 32px/1 "Outfit", sans-serif; }
      .w { position: absolute; opacity: 0; border: 5px solid var(--ink); border-radius: 22px; box-shadow: 7px 7px 0 var(--ink); font: 800 32px/1.1 "Figtree", sans-serif; padding: 18px 22px; }
      #wMeteo { left: 450px; top: 30px; background: #a6e4ff; }
      #wOro { left: 30px; top: 150px; background: #d5b8ff; }
      #wCar { left: 120px; top: 330px; width: 600px; height: 200px; background: repeating-linear-gradient(90deg, #ffe66d 0 200px, #ffa9d2 200px 400px, #c2f296 400px 600px); font-size: 40px; display: flex; align-items: center; justify-content: space-between; }
      #wBot { left: 560px; top: 560px; background: var(--cobalt); color: #fff; border-radius: 40px 40px 8px 40px; }
      #wCookie { left: 0; top: 660px; width: 100%; border-radius: 0; background: var(--ink); color: #fff8ea; font-size: 26px; box-shadow: none; }
      #wSaldi { left: 40px; top: 20px; background: #d6281c; color: #fff; font: 900 40px/1 "Outfit", sans-serif; }
      #wMarq { left: -20px; top: 250px; width: 900px; background: var(--sun); font: 900 40px/1 "Outfit", sans-serif; white-space: nowrap; border-radius: 0; box-shadow: none; }
      #wCount { left: 470px; top: 470px; background: #c2f296; font: 700 26px/1.2 "Space Mono", monospace; }
      #wNew { left: 600px; top: 170px; width: 170px; height: 170px; border-radius: 50%; background: var(--pink); display: grid; place-items: center; text-align: center; font: 900 36px/1 "Outfit", sans-serif; color: #fff; }
      #wVideo { left: 40px; top: 470px; width: 380px; height: 200px; background: #16130f; color: #fff; display: grid; place-items: center; font-size: 80px; }
      #wPop1 { left: 110px; top: 200px; width: 600px; background: #fff; text-align: center; font: 900 50px/1.05 "Outfit", sans-serif; padding: 40px 30px; box-shadow: 14px 14px 0 var(--ink); }
      #wPop1 small { display: block; margin-top: 18px; font: 700 28px/1 "Figtree", sans-serif; color: #6f675e; }
      #wPop2 { left: 170px; top: 360px; width: 520px; background: #fff3df; text-align: center; font: 900 42px/1.05 "Outfit", sans-serif; padding: 34px 26px; box-shadow: 14px 14px 0 var(--ink); }
      .chk { position: absolute; right: 190px; top: 1260px; padding: 14px 22px; border-radius: 14px; background: var(--ink); color: var(--sun); font: 700 30px/1 "Space Mono", monospace; opacity: 0; }
'''
widgets = '''
            <div id="wMeteo" class="w">☀️ Milano 24°</div>
            <div id="wOro" class="w">♈ Ariete: oggi<br />fortuna in amore</div>
            <div id="wCar" class="w"><span>◀</span><span>1 / 12</span><span>▶</span></div>
            <div id="wBot" class="w">Ciao! 👋 Posso aiutarti?</div>
            <div id="wCookie" class="w">🍪 Usiamo i cookie. Tanti cookie. [Accetta]</div>
            <div id="wSaldi" class="w">SALDI −00:59</div>
            <div id="wMarq" class="w">★ NOVITÀ ★ OFFERTA ★ NOVITÀ ★ OFFERTA ★</div>
            <div id="wCount" class="w">visitatore<br />n. 000137</div>
            <div id="wNew" class="w">NUO<br />VO!</div>
            <div id="wVideo" class="w">▶</div>
            <div id="wPop1" class="w">Iscriviti alla newsletter! 🎉<small>(sono 4 email al giorno)</small></div>
            <div id="wPop2" class="w">Aspetta! Sei sicuro di voler uscire? 😢</div>'''
W = ['wMeteo', 'wOro', 'wCar', 'wBot', 'wCookie', 'wSaldi', 'wMarq', 'wCount', 'wNew', 'wVideo', 'wPop1', 'wPop2']
AT = [14.2, 15.0, 15.7, 16.3, 16.8, 17.25, 17.65, 18.0, 18.3, 18.6, 18.95, 19.4]
ROT = [3, -4, -2, 2, 0, -6, -3, 5, 8, -3, -2, 3]
body = '\n'.join([
  chat('sChat1', 0, 3.6, bub('b1', 600, 'Voglio un sito <em>minimal.</em> Pulito. Essenziale. ✨', 'bub big', hidden=False), tease='guarda fino alla fine 👀', peek_id='pk1'),
  f'''      <div id="sSite" class="clip" data-start="3.6" data-duration="19" data-layout-allow-overlap style="background: #e9e4da radial-gradient(rgba(22,19,15,.1) 1.6px, transparent 2px) 0 0 / 32px 32px">
        <div id="site" class="win"><div class="bar"><i></i><i></i><i></i><span class="url">bianchistudio.it</span></div>
          <div class="body">
            <div id="mini"><span class="lg">BIANCHI</span><span class="nav">Studio · Contatti</span><h1>Meno<br />è meglio.</h1><p>Design essenziale, dal 1998.</p><span class="cta">Contattaci</span></div>
            {widgets}
          </div></div>
        <div id="toast1" class="toast" style="opacity: 0; top: 1220px"><span class="av">👔</span>Bellissimo! Solo un paio di cosine… 🤏</div>
        <p id="chk" class="chk">widget: 12</p>
      </div>''',
  chat('sChat2', 8, 5.8, bub('b2', 560, 'Il <em>meteo</em> ☀️') + bub('b3', 740, "l'<em>oroscopo</em> ♈") + bub('b4', 920, 'un <em>carosello</em> 🎠') + bub('b5', 1100, 'e un bel <em>popup!</em> 🎉'), peek_id=None),
  chat('sChat3', 22.6, 6.2, typing_dots('t3', 560) + bub('b6', 560, 'Mmm… sembra un po' + "'" + ' <em>pieno</em> 🤔') + bub('b7', 790, 'Lo fai più <em>minimal?</em> 🙏'), status='sta scrivendo…', peek_id='pk3'),
  react('sR2', 28.8, 3.6, 'Minimal.<br /><em>Ma con tutto.</em>', yawn=True),
  end(32.4, 4, 'La richiesta più <em>contraddittoria</em> che hai ricevuto? 👇', 5),
  music(36.4, '"The Builder"', 0.4),
  sfx('pop.wav', 0.06), sfx('whoosh2.wav', 3.5, 0.55), sfx('pop.wav', 5.45, 0.9), sfx('whoosh1.wav', 7.9, 0.5),
  sfx('pop.wav', 8.35, 0.85), sfx('pop.wav', 9.65, 0.85), sfx('pop.wav', 10.95, 0.9), sfx('pop.wav', 12.25, 0.95),
  sfx('whoosh2.wav', 13.7, 0.5),
  *[sfx('pop.wav', round(t + 0.05, 2), round(0.6 + i * 0.03, 2)) for i, t in enumerate(AT)],
  sfx('cat-trill.mp3', 19.5, 0.7), sfx('whoosh1.wav', 22.5, 0.5),
  sfx('tick.wav', 23.4, 0.45), sfx('tick.wav', 24.2, 0.5), sfx('tick.wav', 25.0, 0.45), sfx('pop.wav', 25.75, 0.95), sfx('pop.wav', 26.95, 0.95),
  sfx('whoosh1.wav', 28.7, 0.5), sfx('cat-meow.mp3', 32.8, 0.85),
])
wtl = '\n'.join(f'      tl.fromTo("#{w}", {{ opacity: 0, scale: 0.4, rotation: {r * 2} }}, {{ opacity: 1, scale: 1, rotation: {r}, duration: 0.3, ease: "back.out(2.6)" }}, {t});' for w, t, r in zip(W, AT, ROT))
timeline = f'''
      /* 1 · the brief */
      peek("#pk1", 0.3); tl.fromTo("#b1 em", {{ color: "#16130f" }}, {{ color: "#c81d74", duration: 0.3 }}, 1.2);
      tl.fromTo("#sChat1T", {{ opacity: 1 }}, {{ opacity: 0.35, duration: 0.25, yoyo: true, repeat: 1 }}, 2.2);
      /* 2 · the minimal site, beautiful; "just a couple of things" */
      tl.fromTo("#site", {{ scale: 1.08, opacity: 0 }}, {{ scale: 1, opacity: 1, duration: 0.6, ease: "expo.out" }}, 3.6);
      pop("#toast1", 5.4);
      /* 3 · the list, one thing at a time */
      pop("#b2", 8.3); pop("#b3", 9.6); pop("#b4", 10.9); pop("#b5", 12.2);
      /* 4 · everything lands on the page, faster and faster */
      tl.set("#toast1", {{ opacity: 0 }}, 13.8);
{wtl}
      tl.to("#site", {{ x: 12, duration: 0.05, yoyo: true, repeat: 7 }}, 19.45);
      tl.fromTo("#chk", {{ opacity: 0, scale: 1.5 }}, {{ opacity: 1, scale: 1, duration: 0.3, ease: "back.out(3)" }}, 19.9);
      tl.fromTo("#site", {{ scale: 1 }}, {{ scale: 1.06, duration: 2.6, ease: "power1.inOut" }}, 19.9);
      /* 5 · the wait, the verdict */
      peek("#pk3", 22.8); typing("#t3", 23.0, 2.7); pop("#b6", 25.7); pop("#b7", 26.9);
      /* 6 · punchline */
      tl.fromTo("#sR2F", {{ scale: 1.05 }}, {{ scale: 1, duration: 0.6, ease: "expo.out" }}, 28.8); blurIn("#sR2B", 29.2); yawn("sR2", 30.3, 31.8);
{end_tl(32.4)}
'''
open(os.path.join(os.path.dirname(os.path.abspath(__file__)), 'index.html'), 'w').write(page(36.4, body, timeline, css))

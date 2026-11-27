import sys, os
sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), '..'))
from kit import *

# the Claude mark is drawn as a plain orange spark (not the official logo file); the name makes it recognisable
SPARK = '<svg viewBox="0 0 40 40" class="spark"><g fill="#d97757">' + ''.join(f'<rect x="18" y="3" width="4" height="15" rx="2" transform="rotate({a} 20 20)"/>' for a in range(0, 360, 36)) + '</g></svg>'
css = '''
      .pink { background: var(--pink) radial-gradient(rgba(255,255,255,.28) 2.6px, transparent 3px) 0 0 / 44px 44px; }
      .blurdesk { background: url("assets/scrivania.jpg") center / cover; }
      .blurdesk::before { content: ""; position: absolute; inset: 0; backdrop-filter: blur(14px); background: rgba(247,239,225,.35); }
      #desk { position: absolute; inset: 0; width: 1080px; height: 1920px; transform-origin: 30% 45%; }
      .label { position: absolute; left: 130px; top: 300px; padding: 12px 20px; border-radius: 14px; background: var(--ink); color: var(--sun); font: 700 34px/1 "Space Mono", monospace; z-index: 3; }
      /* the screen */
      #sScreen { background: #2a2420; }
      #monitor { position: absolute; left: 60px; top: 300px; width: 960px; height: 1060px; border-radius: 40px; background: #3a332d; padding: 34px; box-shadow: inset 0 0 0 10px #4a423b, 0 40px 60px rgba(0,0,0,.45); }
      #app { position: relative; width: 100%; height: 100%; border-radius: 18px; background: #f5f0e8; overflow: hidden; }
      #app .top { display: flex; align-items: center; gap: 16px; padding: 24px 30px; border-bottom: 3px solid #e6ddd0; font: 700 40px/1 "Figtree", sans-serif; color: #3d3929; }
      .spark { width: 52px; height: 52px; }
      .msg { position: absolute; max-width: 700px; padding: 22px 28px; border-radius: 26px; font: 600 40px/1.25 "Figtree", sans-serif; opacity: 0; }
      .msg.me { right: 30px; background: #e8dfd2; color: #3d3929; }
      .msg.ai { left: 30px; background: transparent; color: #3d3929; display: flex; gap: 16px; align-items: flex-start; padding-left: 0; }
      .msg.ai .spark { flex: none; width: 46px; height: 46px; margin-top: 2px; }
      #bar { position: absolute; left: 30px; right: 30px; top: 560px; height: 26px; border-radius: 13px; background: #e6ddd0; overflow: hidden; opacity: 0; }
      #bar i { position: absolute; left: 0; top: 0; bottom: 0; width: 2%; background: #d97757; }
      #barLbl { position: absolute; left: 30px; top: 600px; font: 700 30px/1 "Space Mono", monospace; color: #8a8178; opacity: 0; }
      #input { position: absolute; left: 30px; right: 30px; bottom: 30px; min-height: 110px; padding: 24px 28px; border-radius: 26px; background: #fff; box-shadow: 0 0 0 3px #e6ddd0; font: 600 36px/1.2 "Space Mono", monospace; color: #3d3929; overflow: hidden; word-break: break-all; }
      #spam { opacity: 0; }
      #onKeys { position: absolute; left: 160px; top: 1180px; width: 760px; z-index: 4; }
      .toc { position: absolute; font: 700 150px/1 "Caveat", cursive; color: var(--sun); opacity: 0; z-index: 6; }
      /* characters */
      .char { position: absolute; transform-origin: 50% 100%; }
      #melJump { left: 90px; top: 520px; width: 900px; }
      #caliMeow { left: 140px; top: 760px; width: 800px; }
      #melNo { left: 90px; top: 700px; width: 900px; }
      #caliSus { left: 300px; top: 820px; width: 560px; }
      #melMelt { left: 90px; top: 700px; width: 900px; transform-origin: 50% 100%; }
      #hug { left: 110px; top: 440px; width: 860px; }
      .heart { position: absolute; font-size: 110px; opacity: 0; z-index: 5; }
      .bub.cat { left: 110px; z-index: 5; }
      .bub.me2 { left: auto; right: 150px; z-index: 5; background: #ffd3e8; border-radius: 46px 46px 10px 46px; }
      .toastC { position: absolute; left: 110px; right: 160px; top: 300px; display: flex; gap: 18px; align-items: center; padding: 24px 28px; background: #f5f0e8; border-radius: 26px; box-shadow: 10px 10px 0 var(--ink); font: 700 44px/1.2 "Figtree", sans-serif; color: #3d3929; opacity: 0; z-index: 6; }
      #okC { position: absolute; left: 250px; top: 1300px; padding: 16px 30px 20px; border: 10px solid #2e9e3e; border-radius: 22px; color: #2e9e3e; background: rgba(255,248,234,.94);
        font: 900 92px/1 "Outfit", sans-serif; text-transform: uppercase; z-index: 6; opacity: 0; }
      #okC small { display: block; font: 700 44px/1 "Caveat", cursive; text-transform: none; color: var(--ink); margin-top: 6px; }
'''
CHAR = lambda id, src: f'<img id="{id}" class="char" src="assets/{src}.png" alt="" data-layout-ignore />'
body = '\n'.join([
  # 1 · overworked (frame 0 is the hook)
  f'''      <div id="sDesk" class="clip" data-start="0" data-duration="3.6" data-layout-allow-overlap>
        <img id="desk" src="assets/scrivania.jpg" alt="" data-layout-ignore />
        <p id="tease" class="tease" style="top: 240px">guarda fino alla fine 👀</p>
        <p id="lbl1" class="label">Giorno 3 di consegna · ☕ × 7</p>
      </div>''',
  # 2 · the screen: Claude
  f'''      <div id="sScreen" class="clip" data-start="3.6" data-duration="7.4" data-layout-allow-overlap>
        <div id="monitor"><div id="app">
          <div class="top">{SPARK}Claude</div>
          <div id="m1" class="msg me" style="top: 140px">Sistemami queste <b>47 schermate</b> entro stasera 🙏</div>
          <div id="m2" class="msg ai" style="top: 360px">{SPARK}<span>Certo! Partiamo dalla prima.</span></div>
          <div id="bar"><i></i></div><p id="barLbl">schermata 1 di 47</p>
          <div id="input"><span id="typed"></span><span id="spam">jjjjjjjjjjjjjjjjjjkkkkkkkkkkkkk;;;;;;;;;;;;;;;;;;;;</span></div>
        </div></div>
        <img id="onKeys" src="assets/cali-tastiera.png" alt="" data-layout-ignore style="opacity: 0" />
        <span id="toc1" class="toc" style="left: 170px; top: 1400px">toc</span>
        <span id="toc2" class="toc" style="left: 470px; top: 1510px">toc!</span>
      </div>''',
  # 3 · startled
  f'''      <div id="sJump" class="clip pink" data-start="11" data-duration="1.6">{CHAR("melJump", "mel-sobbalza")}</div>''',
  # 4 · the Boss demands
  f'''      <div id="sMeow" class="clip blurdesk" data-start="12.6" data-duration="3.4" data-layout-allow-overlap>
        {CHAR("caliMeow", "cali-miagola")}
        {bub('cb1', 330, 'MIAAAO. 🐾', 'bub cat big')}
        {bub('cb2', 540, 'Basta lavorare. <em>Ho bisogno di coccole.</em>', 'bub cat')}
      </div>''',
  # 5 · no
  f'''      <div id="sNo" class="clip pink" data-start="16" data-duration="2.6" data-layout-allow-overlap>
        {CHAR("melNo", "mel-no")}
        {bub('mb1', 330, 'No Boss, non posso. <em>Devo finire.</em>', 'bub me2')}
      </div>''',
  # 6 · the Boss's answer: suspicious stare, then she lies on the keyboard (seen on the screen)
  f'''      <div id="sSus" class="clip blurdesk" data-start="18.6" data-duration="1.6">{CHAR("caliSus", "cali-sospettosa")}</div>''',
  # 7 · defeated
  f'''      <div id="sMelt" class="clip pink" data-start="23" data-duration="2.6" data-layout-allow-overlap>
        {CHAR("melMelt", "mel-sconfitta")}
        {bub('mb2', 330, '…ok. <em>La priorità sono le coccole.</em>', 'bub me2')}
      </div>''',
  # 8 · cuddles, approved
  f'''      <div id="sHug" class="clip pink" data-start="25.6" data-duration="4.4" data-layout-allow-overlap>
        {CHAR("hug", "abbraccio")}
        <span id="h1" class="heart" style="left: 120px; top: 700px">💗</span><span id="h2" class="heart" style="left: 820px; top: 640px">💖</span><span id="h3" class="heart" style="left: 700px; top: 460px">💕</span>
        <div id="toastC" class="toastC">{SPARK}<span>Ottima scelta. Le schermate possono aspettare 🐾</span></div>
        <p id="okC">Approvato<small>le coccole.</small></p>
      </div>''',
  end(30, 4, 'Anche il tuo capo ti obbliga alle <em>pause?</em> 🐾👇', 2, 'segui per la prossima puntata'),
  music(34, '"Monkeys Spinning Monkeys"', 0.36, offset=30),
  # sound
  *[sfx('tick.wav', round(0.2 + i * 0.16, 2), 0.35 + (i % 3) * 0.1) for i in range(14)],
  sfx('whoosh1.wav', 3.5, 0.5), sfx('pop.wav', 4.05, 0.8),
  *[sfx('tick.wav', round(4.6 + i * 0.14, 2), 0.3 + (i % 2) * 0.1) for i in range(8)],
  sfx('pop.wav', 6.05, 0.85), sfx('tick.wav', 7.0, 0.4), sfx('tick.wav', 7.6, 0.4),
  sfx('knock1.wav', 9.1, 0.95), sfx('knock2.wav', 9.75, 1),
  sfx('whoosh2.wav', 10.95, 0.6), sfx('cat-meow.mp3', 12.7, 1), sfx('pop.wav', 13.75, 0.9),
  sfx('whoosh1.wav', 15.95, 0.5), sfx('pop.wav', 16.35, 0.9),
  sfx('whoosh2.wav', 18.55, 0.5), sfx('cat-trill.mp3', 18.9, 0.7),
  sfx('whoosh1.wav', 20.15, 0.5), *[sfx('tick.wav', round(20.9 + i * 0.09, 2), 0.35) for i in range(12)],
  sfx('whoosh2.wav', 22.95, 0.5), sfx('pop.wav', 23.6, 0.9),
  sfx('whoosh1.wav', 25.55, 0.55), sfx('cat-purr.mp3', 25.8, 1), sfx('pop.wav', 27.0, 0.9), sfx('knock1.wav', 28.05, 0.8), sfx('cat-meow.mp3', 30.4, 0.8),
])
TYPED = 'sistemare 47 schermate…'
type_tl = '\n'.join(f'      tl.set("#typed", {{ textContent: {TYPED[:i + 1]!r} }}, {round(4.6 + i * 0.05, 2)});' for i in range(len(TYPED)))
timeline = '''
      /* 1 · overworked: slow push-in, typing jitter */
      tl.fromTo("#desk", { scale: 1 }, { scale: 1.12, duration: 3.6, ease: "power1.inOut" }, 0);
      tl.fromTo("#lbl1", { scale: 0.6, opacity: 0, rotation: -6 }, { scale: 1, opacity: 1, rotation: -2, duration: 0.4, ease: "back.out(3)" }, 0.4);
      tl.to("#desk", { x: 4, duration: 0.06, yoyo: true, repeat: 25, ease: "none" }, 0.2);
      /* 2 · the screen */
      tl.fromTo("#monitor", { scale: 1.08, y: 40 }, { scale: 1, y: 0, duration: 0.6, ease: "expo.out" }, 3.6);
      tl.fromTo("#m1", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.3, ease: "back.out(2)" }, 4.0);
''' + type_tl + '''
      tl.set("#typed", { textContent: "" }, 5.9);
      tl.fromTo("#m2", { opacity: 0 }, { opacity: 1, duration: 0.25 }, 6.0);
      tl.to("#bar, #barLbl", { opacity: 1, duration: 0.2 }, 6.5);
      tl.to("#bar i", { width: "4%", duration: 2.4, ease: "none" }, 6.6);
      /* knock knock, the series' own knock */
      tl.to("#monitor", { x: 18, duration: 0.05, yoyo: true, repeat: 3 }, 9.1);
      tl.set("#toc1", { opacity: 1 }, 9.1); tl.fromTo("#toc1", { scale: 0.4 }, { scale: 1, duration: 0.25, ease: "back.out(3)", immediateRender: false }, 9.1);
      tl.to("#monitor", { x: -18, duration: 0.05, yoyo: true, repeat: 3 }, 9.75);
      tl.set("#toc2", { opacity: 1 }, 9.75); tl.fromTo("#toc2", { scale: 0.4 }, { scale: 1, duration: 0.25, ease: "back.out(3)", immediateRender: false }, 9.75); tl.set("#toc1, #toc2", { opacity: 0 }, 10.9);
      /* 3 · startled: jump, squash, shake */
      tl.fromTo("#melJump", { y: 120, scaleY: 0.8, scaleX: 1.1 }, { y: -90, scaleY: 1.12, scaleX: 0.94, duration: 0.22, ease: "power3.out" }, 11);
      tl.to("#melJump", { y: 0, scaleY: 1, scaleX: 1, duration: 0.5, ease: "bounce.out" }, 11.22);
      tl.to("#melJump", { rotation: 3, duration: 0.05, yoyo: true, repeat: 7 }, 11.7);
      /* 4 · the Boss */
      tl.fromTo("#caliMeow", { y: 400, scale: 0.7 }, { y: 0, scale: 1, duration: 0.5, ease: "back.out(1.8)" }, 12.6);
      tl.to("#caliMeow", { scaleY: 1.06, scaleX: 0.96, duration: 0.12, yoyo: true, repeat: 3, ease: "sine.inOut" }, 12.75);
      pop("#cb1", 12.8); pop("#cb2", 13.7);
      tl.to("#caliMeow", { rotation: -4, duration: 0.18, yoyo: true, repeat: 5, ease: "sine.inOut" }, 14.4);
      /* 5 · no */
      tl.fromTo("#melNo", { x: -200, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4, ease: "back.out(2)" }, 16);
      tl.to("#melNo", { rotation: 4, duration: 0.09, yoyo: true, repeat: 7, ease: "sine.inOut" }, 16.5);
      pop("#mb1", 16.3);
      /* 6 · the stare, then she lies on the keyboard */
      tl.fromTo("#caliSus", { scale: 1.4 }, { scale: 1, duration: 1.4, ease: "power2.out" }, 18.6);
      tl.set("#sScreen", { opacity: 1 }, 20.2);
      tl.set("#m1, #m2, #bar, #barLbl", { opacity: 0 }, 20.2);
      tl.set("#onKeys", { opacity: 1, y: 500 }, 20.3); tl.to("#onKeys", { y: 0, duration: 0.55, ease: "back.out(1.6)" }, 20.3);
      tl.set("#spam", { opacity: 1 }, 20.9);
      tl.fromTo("#spam", { clipPath: "inset(0 100% 0 0)" }, { clipPath: "inset(0 0% 0 0)", duration: 1.1, ease: "none" }, 20.9);
      /* 7 · defeated: she melts */
      tl.fromTo("#melMelt", { scaleY: 1, y: 0 }, { scaleY: 0.9, y: 40, duration: 1.2, ease: "power2.inOut" }, 23.1);
      pop("#mb2", 23.5);
      /* 8 · cuddles */
      tl.fromTo("#hug", { scale: 0.6, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.6, ease: "elastic.out(1, 0.6)" }, 25.6);
      tl.to("#hug", { scale: 1.04, duration: 0.32, yoyo: true, repeat: 5, ease: "sine.inOut" }, 26.3);
      [["#h1", 26.0], ["#h2", 26.3], ["#h3", 26.6]].forEach(([h, t]) => { tl.fromTo(h, { opacity: 1, scale: 0.3, y: 0 }, { scale: 1.1, y: -220, duration: 1.6, ease: "power1.out" }, t); tl.to(h, { opacity: 0, duration: 0.3 }, t + 1.3); });
      tl.fromTo("#toastC", { opacity: 0, y: -40 }, { opacity: 1, y: 0, duration: 0.35, ease: "back.out(2)" }, 26.9);
      tl.fromTo("#okC", { opacity: 0, scale: 3, rotation: -12 }, { opacity: 1, scale: 1, rotation: -6, duration: 0.22, ease: "power4.in" }, 27.85);
      tl.to("#sHug", { x: 12, duration: 0.05, yoyo: true, repeat: 3 }, 28.07);
''' + end_tl(30)
# the screen comes back for the keyboard beat
body = body.replace('id="sScreen" class="clip" data-start="3.6" data-duration="7.4"', 'id="sScreen" class="clip" data-start="3.6" data-duration="19.4"')
css += '      #sJump, #sMeow, #sNo, #sSus, #sMelt, #sHug, #sEnd { z-index: 2; }\n      #sScreen { z-index: 1; }\n'
# keep the screen hidden while the other scenes play over it (they are opaque), so nothing else is needed
open(os.path.join(os.path.dirname(os.path.abspath(__file__)), 'index.html'), 'w').write(page(34, body, timeline, css))

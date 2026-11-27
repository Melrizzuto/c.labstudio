import sys, os
sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), '..'))
from kit import *

BOSS = dict(name='Il Capo', avatar='💼')
PTS = [(0, 60), (70, 92), (140, 80), (210, 128), (280, 150), (350, 196), (395, 205), (445, 160), (490, 232), (560, 262), (630, 300), (700, 322)]
poly = ' '.join(f'{x},{y}' for x, y in PTS)
css = '''
      #dash { top: 370px; }
      #dash .body { position: relative; height: 720px; padding: 34px; }
      #dash h3 { font: 900 44px/1 "Outfit", sans-serif; letter-spacing: -0.02em; }
      #dash h3 small { display: block; margin-top: 8px; font: 700 26px/1 "Space Mono", monospace; color: #8a8178; letter-spacing: 0.02em; }
      .kpis { display: flex; gap: 18px; margin-top: 26px; }
      .kpi { flex: 1; border: 5px solid var(--ink); border-radius: 18px; padding: 16px 18px; background: var(--paper); }
      .kpi b { display: block; font: 900 46px/1 "Outfit", sans-serif; }
      .kpi span { font: 700 26px/1 "Figtree", sans-serif; color: #6f675e; }
      .kpi.dn b { color: #c0211a; } .kpi.up b { color: #1f7a2c; }
      #chartBox { position: absolute; left: 34px; top: 330px; width: 738px; height: 350px; border: 5px solid var(--ink); border-radius: 18px; overflow: hidden; background: #fff;
        background-image: linear-gradient(#efe9df 2px, transparent 2px); background-size: 100% 84px; }
      #chartIn { position: absolute; left: 14px; top: 0px; width: 700px; height: 340px; transform-origin: 60% 50.5%; }
      #chartIn svg { width: 700px; height: 360px; overflow: visible; }
      #zero { position: absolute; left: 10px; bottom: 6px; font: 700 26px/1 "Space Mono", monospace; color: #8a8178; }
      #menu { position: absolute; right: 34px; top: 34px; padding: 12px 18px; border: 5px solid var(--ink); border-radius: 14px; background: #fff; font: 700 26px/1 "Space Mono", monospace; }
      #menu.on { background: var(--cobalt); color: #fff; }
      #selBox { position: absolute; left: 385px; top: 150px; width: 70px; height: 70px; border: 4px dashed var(--cobalt); background: rgba(29, 63, 209, .12); opacity: 0; }
      #cur4 { position: absolute; left: 0; top: 0; width: 76px; height: 76px; z-index: 6; }
      .lbl { position: absolute; left: 130px; top: 296px; padding: 12px 20px; border-radius: 12px; background: var(--ink); color: var(--sun); font: 700 30px/1 "Space Mono", monospace; opacity: 0; }
      #boom { position: absolute; right: 200px; top: 700px; padding: 18px 26px; border-radius: 999px; background: #3be36b; border: 6px solid var(--ink); font: 900 56px/1 "Outfit", sans-serif; opacity: 0; z-index: 7; }
      .toast { top: 1170px; }
'''
body = '\n'.join([
  chat('sChat1', 0, 4.2, bub('b1', 600, 'Il grafico delle vendite… <em>lo fai andare in su?</em> 📈', 'bub big', hidden=False), tease='guarda fino alla fine 👀', peek_id='pk1', **BOSS),
  react('sR1', 4.2, 2.6, 'Il grafico.<br /><em>Non le vendite.</em>', sweat=True),
  f'''      <div id="sDash" class="clip" data-start="6.8" data-duration="12.8" data-layout-allow-overlap style="background: #e9e4da radial-gradient(rgba(22,19,15,.1) 1.6px, transparent 2px) 0 0 / 32px 32px">
        <div id="dash" class="win"><div class="bar"><i></i><i></i><i></i><b>dashboard vendite · Q3</b></div>
          <div class="body">
            <h3>Andamento vendite<small>luglio → settembre</small></h3>
            <span id="menu">asse Y ▾</span>
            <div class="kpis"><div class="kpi dn"><b>−12%</b><span>fatturato</span></div><div class="kpi dn"><b>−8%</b><span>ordini</span></div><div class="kpi up"><b>+2%</b><span>visite</span></div></div>
            <div id="chartBox"><div id="chartIn"><svg viewBox="0 0 700 360"><polyline points="{poly}" fill="none" stroke="#d6281c" stroke-width="9" stroke-linejoin="round" stroke-linecap="round" /></svg><div id="selBox"></div></div><span id="zero">0</span></div>
          </div></div>
        <svg id="cur4" viewBox="0 0 24 24"><path d="M3 2l17 9-7.5 1.6L9 20z" fill="#16130f" stroke="#fff" stroke-width="1.6" stroke-linejoin="round" /></svg>
        <p id="l1" class="lbl">asse Y: invertito</p>
        <p id="l2" class="lbl">zoom: martedì, 14:00 → 14:05</p>
        <div id="boom">+400% 🚀</div>
        <div id="q1" class="toast" style="opacity: 0"><span class="av">💼</span>SÌ!!! 😍 Lo mando al board.</div>
        <div id="q2" class="toast" style="opacity: 0"><span class="av">💼</span>…perché lo zero è in alto? 🤨</div>
        <div id="q3" class="toast" style="opacity: 0"><span class="av">💼</span>PERFETTO. Questo è il trend.</div>
      </div>''',
  chat('sChat2', 19.6, 6.8, typing_dots('t2', 600) + bub('b2', 600, 'Ah, e mettiamo 12 KPI sopra la piega. <em>Ma pulito.</em> ✨'), status='sta scrivendo…', peek_id='pk2', **BOSS),
  react('sR2', 26.4, 3.6, 'I dati non mentono.<br /><em>Gli assi sì.</em>', yawn=True),
  end(30, 4, 'Il grafico più <em>creativo</em> che ti hanno chiesto? 📈👇', 8, 'segui per l’ep. 9'),
  music(34, '"Investigations"', 0.4, offset=30),
  sfx('pop.wav', 0.06), sfx('whoosh1.wav', 4.1, 0.55), sfx('whoosh2.wav', 6.7, 0.55),
  sfx('tick.wav', 8.95, 0.6), sfx('whoosh2.wav', 9.3, 0.45), sfx('pop.wav', 9.85, 0.9), sfx('pop.wav', 11.45, 0.9),
  sfx('tick.wav', 13.45, 0.5), sfx('tick.wav', 14.05, 0.5), sfx('riser.wav', 14.0, 0.7), sfx('whoosh1.wav', 15.0, 0.5),
  sfx('pop.wav', 15.85, 0.95), sfx('pop.wav', 17.0, 1), sfx('cat-trill.mp3', 17.1, 0.75),
  sfx('whoosh2.wav', 19.5, 0.5), sfx('tick.wav', 20.4, 0.45), sfx('tick.wav', 21.2, 0.5), sfx('tick.wav', 22.0, 0.45), sfx('pop.wav', 22.75, 0.95),
  sfx('whoosh1.wav', 26.3, 0.5), sfx('cat-meow.mp3', 30.4, 0.85),
])
timeline = '''
      /* 1 · the ask */
      peek("#pk1", 0.3); tl.fromTo("#b1 em", { color: "#16130f" }, { color: "#c81d74", duration: 0.3 }, 1.2);
      tl.fromTo("#sChat1T", { opacity: 1 }, { opacity: 0.35, duration: 0.25, yoyo: true, repeat: 1 }, 2.6);
      /* 2 */
      tl.fromTo("#sR1F", { scale: 1 }, { scale: 1.13, duration: 2.6, ease: "power1.inOut" }, 4.2); blurIn("#sR1B", 4.7); sweat("sR1", 5.0);
      /* 3 · the dashboard, down; flip the axis */
      tl.fromTo("#dash", { scale: 1.06, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.5, ease: "expo.out" }, 6.8);
      tl.set("#cur4", { x: 600, y: 1180 }, 6.8);
      tl.to("#cur4", { x: 870, y: 440, duration: 0.8, ease: "power2.inOut" }, 8.1);
      tl.set("#menu", { className: "on" }, 8.95);
      tl.to("#chartIn", { scaleY: -1, duration: 0.5, ease: "power3.inOut" }, 9.3);
      tl.fromTo("#l1", { opacity: 0 }, { opacity: 1, duration: 0.2 }, 9.4);
      pop("#q1", 9.8); tl.to("#q1", { opacity: 0, duration: 0.12 }, 11.35); pop("#q2", 11.4);
      /* 4 · flip back; zoom into the one good five minutes */
      tl.to("#q2", { opacity: 0, duration: 0.12 }, 13.3); tl.to("#l1", { opacity: 0, duration: 0.12 }, 13.3);
      tl.set("#menu", { className: "" }, 13.4);
      tl.to("#chartIn", { scaleY: 1, duration: 0.4, ease: "power3.inOut" }, 13.4);
      tl.to("#cur4", { x: 560, y: 880, duration: 0.5, ease: "power2.inOut" }, 13.5);
      tl.to("#selBox", { opacity: 1, duration: 0.1 }, 14.05);
      tl.fromTo("#selBox", { scale: 0.2 }, { scale: 1, duration: 0.6, ease: "power2.out" }, 14.05);
      tl.to("#cur4", { x: 640, y: 960, duration: 0.6, ease: "power2.out" }, 14.05);
      tl.to("#selBox", { opacity: 0, duration: 0.1 }, 14.95);
      tl.to("#chartIn", { scale: 12, duration: 0.8, ease: "power3.inOut" }, 15.0);
      tl.to("#cur4", { opacity: 0, duration: 0.1 }, 15.0);
      tl.fromTo("#l2", { opacity: 0 }, { opacity: 1, duration: 0.2 }, 15.6);
      pop("#q3", 15.8);
      tl.fromTo("#boom", { opacity: 0, scale: 0.3, rotation: -20 }, { opacity: 1, scale: 1, rotation: -6, duration: 0.35, ease: "back.out(3)" }, 17.0);
      /* 5 · and one more thing */
      peek("#pk2", 19.8); typing("#t2", 20.0, 2.7); pop("#b2", 22.7);
      /* 6 · punchline */
      tl.fromTo("#sR2F", { scale: 1.05 }, { scale: 1, duration: 0.6, ease: "expo.out" }, 26.4); blurIn("#sR2B", 26.8); yawn("sR2", 27.9, 29.4);
''' + end_tl(30)
open(os.path.join(os.path.dirname(os.path.abspath(__file__)), 'index.html'), 'w').write(page(34, body, timeline, css))

import sys, os
sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), '..'))
from kit import *

FILES = [  # (name, at)
  ('brochure_v1.pdf', 7.6), ('brochure_v2.pdf', 9.6), ('brochure_v3_ok.pdf', 11.8), ('brochure_v4_finale.pdf', 13.8),
  ('brochure_v5_finale_vero.pdf', 15.6), ('v6_finale_DAVVERO.pdf', 16.5), ('v7_ok_cliente.pdf', 16.85), ('v8_ok_ok.pdf', 17.2),
  ('v9_ultima.pdf', 17.55), ('v10_ultimissima.pdf', 17.9), ('v11_basta.pdf', 18.25), ('FINALE_definitivo_v12_ORA_SI.pdf', 19.2)]
CLOCK = [('10:02', 6.4), ('10:41', 9.6), ('12:15', 11.8), ('15:30', 13.8), ('18:45', 15.6), ('20:10', 16.5), ('21:05', 17.2), ('22:20', 17.9), ('23:30', 18.25), ('23:58', 19.2)]
TOASTS = [('t1', 'Solo il colore del titolo 🎨', 8.8), ('t2', 'E il testo un po\' più su ⬆️', 11.0), ('t3', 'Torniamo al colore di prima 🙃', 13.0), ('t4', 'Ah, e il logo più grande 😇', 15.0)]
ROW = 66
css = '''
      #sDay { background: #f7efe1; }
      #sky { position: absolute; inset: 0; background: #f7efe1; }
      #sun { position: absolute; left: 760px; top: 330px; width: 150px; height: 150px; border-radius: 50%; background: var(--sun); border: 6px solid var(--ink); }
      .clk { position: absolute; left: 130px; top: 300px; font: 900 190px/1 "Outfit", sans-serif; letter-spacing: -0.04em; opacity: 0; color: #fff8ea; -webkit-text-stroke: 9px var(--ink); paint-order: stroke fill; }
      #clkLbl { position: absolute; left: 136px; top: 505px; padding: 8px 14px; border-radius: 10px; background: var(--ink); font: 700 30px/1 "Space Mono", monospace; color: var(--sun); }
      #moon { position: absolute; left: 790px; top: 320px; font-size: 140px; line-height: 1; opacity: 0; }
      #files { top: 570px; }
      #files .body { position: relative; height: 560px; overflow: hidden; }
      #list { position: absolute; left: 0; top: 0; width: 100%; }
      .row { height: 66px; display: flex; align-items: center; gap: 18px; padding: 0 28px; border-bottom: 3px solid #ece5d8; font: 700 30px/1 "Space Mono", monospace; opacity: 0; white-space: nowrap; }
      .row i { width: 30px; height: 38px; flex: none; border: 4px solid var(--ink); border-radius: 4px 12px 4px 4px; background: #fff; }
      .row.last { background: var(--pink); color: #fff; font-size: 28px; }
      .row.last i { background: var(--sun); }
      .tst { top: 1180px; }
'''
rows = '\n'.join(f'<div id="r{i}" class="row{" last" if i == len(FILES) - 1 else ""}"><i></i>{n}</div>' for i, (n, _) in enumerate(FILES))
clocks = '\n'.join(f'<div id="k{i}" class="clk">{t}</div>' for i, (t, _) in enumerate(CLOCK))
toasts = '\n'.join(f'<div id="{i}" class="toast tst" style="opacity: 0"><span class="av">👔</span>{txt}</div>' for i, txt, _ in TOASTS)
body = '\n'.join([
  chat('sChat1', 0, 3.6, bub('b1', 600, 'Una modifica veloce veloce. <em>Ci vuole un minuto</em> ⏱️', 'bub big', hidden=False), tease='guarda fino alla fine 👀', peek_id='pk1'),
  react('sR1', 3.6, 2.8, 'Un.<br /><em>Minuto.</em>', sweat=True),
  f'''      <div id="sDay" class="clip" data-start="6.4" data-duration="15.6" data-layout-allow-overlap>
        <div id="sky"></div><div id="sun" data-layout-ignore></div><span id="moon" data-layout-ignore>🌙</span>
        {clocks}
        <p id="clkLbl">"ci vuole un minuto"</p>
        <div id="files" class="win"><div class="bar"><i></i><i></i><i></i><b>brochure / versioni</b></div>
          <div class="body"><div id="list">{rows}</div></div></div>
        {toasts}
      </div>''',
  react('sR2', 22, 3.6, '23:58.<br /><em>Il minuto più lungo.</em>', night=True, yawn=True),
  chat('sChat2', 25.6, 7.8, typing_dots('t5', 560) + bub('b2', 560, 'Grazie mille!! ❤️') + bub('b3', 760, "Domattina un'altra cosina veloce? <em>Ci vuole un minuto</em> 🙏"), status='sta scrivendo…', peek_id='pk2'),
  end(33.4, 4, "Quanto dura il <em>TUO</em> «minuto»? ⏱️👇", 6),
  music(37.4, '"Hidden Agenda"', 0.38),
  sfx('pop.wav', 0.06), sfx('whoosh1.wav', 3.5, 0.55), sfx('whoosh2.wav', 6.3, 0.55),
  *[sfx('tick.wav', round(at + 0.02, 2), 0.55) for _, at in FILES[:-1]],
  *[sfx('pop.wav', round(at + 0.05, 2), 0.85) for _, _, at in TOASTS],
  sfx('riser.wav', 18.15, 0.75), sfx('pop.wav', 19.25, 1),
  sfx('whoosh1.wav', 21.9, 0.5), sfx('cat-purr.mp3', 22.6, 0.9),
  sfx('whoosh2.wav', 25.5, 0.5), sfx('tick.wav', 26.4, 0.45), sfx('tick.wav', 27.2, 0.5), sfx('tick.wav', 28.0, 0.45),
  sfx('pop.wav', 28.75, 0.9), sfx('pop.wav', 29.85, 1), sfx('cat-meow.mp3', 33.8, 0.85),
])
tl_rows = []
for i, (n, at) in enumerate(FILES):
    tl_rows.append(f'      tl.fromTo("#r{i}", {{ opacity: 0, x: -40 }}, {{ opacity: 1, x: 0, duration: 0.25, ease: "power3.out" }}, {at});')
    vis = 8
    if i >= vis:
        tl_rows.append(f'      tl.to("#list", {{ y: {-(i - vis + 1) * ROW}, duration: 0.25, ease: "power2.out" }}, {at});')
for i, (t, at) in enumerate(CLOCK):
    if i: tl_rows.append(f'      tl.set("#k{i-1}", {{ opacity: 0 }}, {at});')
    tl_rows.append(f'      tl.set("#k{i}", {{ opacity: 1 }}, {at});')
    if i: tl_rows.append(f'      tl.fromTo("#k{i}", {{ scale: 1.08 }}, {{ scale: 1, duration: 0.25, ease: "power3.out" }}, {at});')
for i, txt, at in TOASTS:
    tl_rows.append(f'      pop("#{i}", {at}); tl.to("#{i}", {{ opacity: 0, duration: 0.12 }}, {round(at + 1.95, 2)});')
timeline = '''
      /* 1 · the request */
      peek("#pk1", 0.3); tl.fromTo("#b1 em", { color: "#16130f" }, { color: "#c81d74", duration: 0.3 }, 1.2);
      tl.fromTo("#sChat1T", { opacity: 1 }, { opacity: 0.35, duration: 0.25, yoyo: true, repeat: 1 }, 2.2);
      /* 2 · "one. minute." */
      tl.fromTo("#sR1F", { scale: 1 }, { scale: 1.14, duration: 2.8, ease: "power1.inOut" }, 3.6); blurIn("#sR1B", 4.2); sweat("sR1", 4.6);
      /* 3 · the day goes by: the sky turns from morning to sunset to night, the sun goes down */
      tl.fromTo("#files", { scale: 1.06, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.5, ease: "expo.out" }, 6.4);
      tl.to("#sky", { backgroundColor: "#ffc08a", duration: 7, ease: "none" }, 8.0);
      tl.to("#sky", { backgroundColor: "#1b2140", duration: 4, ease: "power1.in" }, 15.0);
      tl.to("#sun", { y: 900, duration: 11, ease: "power1.in" }, 8.0);
      tl.to("#sun", { opacity: 0, duration: 0.8 }, 16.6);
      tl.fromTo("#moon", { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 1.2, ease: "power2.out" }, 17.6);
''' + '\n'.join(tl_rows) + '''
      tl.to("#files", { x: 10, duration: 0.05, yoyo: true, repeat: 5 }, 19.25);
      /* 4 · night: Calì yawns, the clock says it all */
      tl.fromTo("#sR2F", { scale: 1.05 }, { scale: 1, duration: 0.6, ease: "expo.out" }, 22); blurIn("#sR2B", 22.4); yawn("sR2", 23.2, 24.9);
      /* 5 · and tomorrow… */
      peek("#pk2", 25.8); typing("#t5", 26.0, 2.7); pop("#b2", 28.7); pop("#b3", 29.8);
      tl.to("#pk2", { y: -30, duration: 0.1, yoyo: true, repeat: 3 }, 30.3);
''' + end_tl(33.4)
open(os.path.join(os.path.dirname(os.path.abspath(__file__)), 'index.html'), 'w').write(page(37.4, body, timeline, css))

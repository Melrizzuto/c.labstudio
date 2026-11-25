import sys, os
sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), '..'))
from kit import *

NAME = "sfondo_PIU_BIANCO.png"
chars = ''.join(f'<span class="ch" id="c{i}">{c}</span>' for i, c in enumerate(NAME))
css = '''
      #hexWin .body { padding: 44px; }
      .white { width: 100%; height: 420px; border: 5px solid var(--ink); border-radius: 22px; background: #fff;
        background-image: linear-gradient(45deg, #f1ede6 25%, transparent 25%), linear-gradient(-45deg, #f1ede6 25%, transparent 25%); background-size: 0 0; }
      .hexrow { position: relative; margin-top: 40px; height: 110px; }
      .hx { position: absolute; inset: 0; padding: 22px 30px; border: 5px solid var(--ink); border-radius: 18px; font: 700 60px/1 "Space Mono", monospace; background: var(--paper); }
      .hx.err { border-color: #d6281c; color: #d6281c; background: #fff0ee; }
      .errmsg { margin-top: 18px; font: 700 34px/1 "Figtree", sans-serif; color: #d6281c; opacity: 0; }
      #fileWin .body { position: relative; height: 760px; }
      #file { position: absolute; left: 270px; top: 90px; width: 280px; text-align: center; }
      #file .page { position: relative; width: 210px; height: 270px; margin: 0 auto; background: #fff; border: 6px solid var(--ink); border-radius: 12px 54px 12px 12px; box-shadow: 8px 8px 0 rgba(22,19,15,.85); }
      #file .page::after { content: ""; position: absolute; right: -6px; top: -6px; width: 54px; height: 54px; border-left: 6px solid var(--ink); border-bottom: 6px solid var(--ink); border-radius: 0 0 0 12px; background: var(--paper); }
      #fname { position: relative; display: inline-block; margin-top: 26px; padding: 8px 12px; border-radius: 10px; font: 700 40px/1.1 "Space Mono", monospace; white-space: nowrap; transform: translateX(-50%); left: 50%; }
      #fname.edit { background: #dbe3ff; outline: 4px solid var(--cobalt); }
      .ch { opacity: 0; }
      #oldName { position: absolute; left: 0; top: 8px; width: 100%; text-align: center; }
      #send { position: absolute; left: 230px; top: 600px; padding: 26px 44px; border-radius: 999px; background: var(--ink); color: #fff8ea; font: 800 44px/1 "Outfit", sans-serif; }
      #cur3 { position: absolute; left: 0; top: 0; width: 76px; height: 76px; z-index: 6; }
      #sent { position: absolute; left: 130px; top: 1230px; padding: 16px 26px; border-radius: 14px; background: #2e9e3e; color: #fff; font: 700 36px/1 "Figtree", sans-serif; opacity: 0; }
'''
body = '\n'.join([
  chat('sChat1', 0, 3.6, bub('b1', 600, 'Lo sfondo bianco… <em>lo fai più bianco?</em> 🤍', 'bub big', hidden=False), tease='guarda fino alla fine 👀', peek_id='pk1'),
  react('sR1', 3.6, 2.8, 'Più bianco.<br /><em>Del bianco.</em>', sweat=True),
  f'''      <div id="sHex" class="clip" data-start="6.4" data-duration="5.8" style="background: #e9e4da radial-gradient(rgba(22,19,15,.1) 1.6px, transparent 2px) 0 0 / 32px 32px">
        <div id="hexWin" class="win"><div class="bar"><i></i><i></i><i></i><b>colore sfondo</b></div>
          <div class="body"><div class="white"></div>
            <div class="hexrow"><div id="h1" class="hx">#FFFFFF</div><div id="h2" class="hx" style="opacity: 0">#FFFFFF<em style="font-style:normal;color:var(--cobalt)">F</em></div><div id="h3" class="hx err" style="opacity: 0">#FFFFFFF</div></div>
            <p id="errM" class="errmsg">❌ colore non valido</p></div></div>
        <div id="toast1" class="toast" style="opacity: 0; top: 1190px"><span class="av">👔</span>Vedo ancora un po' grigino 🧐</div>
      </div>''',
  chat('sChat2', 12.2, 6.4, old(560, "Vedo ancora un po' grigino 🧐") + typing_dots('t2', 780) + bub('b2', 780, 'Lo voglio <em>PIÙ BIANCO.</em><br />Tipo bianco bianco. 🤍'), status='sta scrivendo…', peek_id='pk2'),
  f'''      <div id="sFile" class="clip" data-start="18.6" data-duration="6.8" style="background: #e9e4da radial-gradient(rgba(22,19,15,.1) 1.6px, transparent 2px) 0 0 / 32px 32px">
        <div id="fileWin" class="win"><div class="bar"><i></i><i></i><i></i><b>scrivania</b></div>
          <div class="body">
            <div id="file"><div class="page"></div><div id="fname"><span id="oldName">sfondo.png</span><span id="newName">{chars}</span></div></div>
            <div id="send">Invia al cliente ✉️</div>
          </div></div>
        <svg id="cur3" viewBox="0 0 24 24"><path d="M3 2l17 9-7.5 1.6L9 20z" fill="#16130f" stroke="#fff" stroke-width="1.6" stroke-linejoin="round" /></svg>
        <div id="sent">✓ inviato</div>
      </div>''',
  chat('sChat3', 25.4, 4, bub('b3', 560, 'ORA SÌ!!! 😍', 'bub big') + bub('b4', 790, 'Si vede proprio <em>la differenza</em> ✨'), peek_id='pk3'),
  react('sR2', 29.4, 3.6, 'Stesso file.<br /><em>Nome diverso.</em>', yawn=True),
  end(33, 4, 'Hai mai mandato lo stesso file <em>rinominato?</em> 🤫👇', 3),
  music(37, '"Investigations"', 0.42),
  sfx('pop.wav', 0.06), sfx('whoosh1.wav', 3.5, 0.55), sfx('whoosh2.wav', 6.3, 0.55),
  sfx('tick.wav', 7.9, 0.6), sfx('knock1.wav', 8.6, 0.7), sfx('pop.wav', 10.05, 0.9),
  sfx('whoosh1.wav', 12.1, 0.5), sfx('tick.wav', 12.9, 0.45), sfx('tick.wav', 13.7, 0.5), sfx('tick.wav', 14.6, 0.45), sfx('pop.wav', 15.45, 0.95),
  sfx('whoosh2.wav', 18.5, 0.5), sfx('tick.wav', 19.25, 0.6),
  *[sfx('tick.wav', round(19.8 + i * 0.14, 2), 0.35 + (i % 3) * 0.08) for i in range(0, len(NAME), 2)],
  sfx('whoosh1.wav', 23.35, 0.5), sfx('pop.wav', 24.0, 0.9),
  sfx('riser.wav', 24.35, 0.75), sfx('pop.wav', 25.5, 1), sfx('cat-trill.mp3', 25.6, 0.8), sfx('pop.wav', 26.7, 0.9),
  sfx('whoosh1.wav', 29.3, 0.5), sfx('cat-meow.mp3', 33.4, 0.85),
])
type_tl = '\n'.join(f'      tl.set("#c{i}", {{ opacity: 1 }}, {round(19.8 + i * 0.14, 2)});' for i in range(len(NAME)))
timeline = f'''
      /* 1 · the request */
      peek("#pk1", 0.3); tl.fromTo("#b1 em", {{ color: "#16130f" }}, {{ color: "#c81d74", duration: 0.3 }}, 1.2);
      tl.fromTo("#sChat1T", {{ opacity: 1 }}, {{ opacity: 0.35, duration: 0.25, yoyo: true, repeat: 1 }}, 2.2);
      /* 2 · slow push-in */
      tl.fromTo("#sR1F", {{ scale: 1 }}, {{ scale: 1.14, duration: 2.8, ease: "power1.inOut" }}, 3.6); blurIn("#sR1B", 4.2); sweat("sR1", 4.6);
      /* 3 · one more F: not a colour */
      tl.fromTo("#hexWin", {{ scale: 1.08, opacity: 0 }}, {{ scale: 1, opacity: 1, duration: 0.5, ease: "expo.out" }}, 6.4);
      tl.set("#h1", {{ opacity: 0 }}, 7.9); tl.set("#h2", {{ opacity: 1 }}, 7.9);
      tl.set("#h2", {{ opacity: 0 }}, 8.6); tl.set("#h3", {{ opacity: 1 }}, 8.6);
      tl.to("#h3", {{ x: 16, duration: 0.05, yoyo: true, repeat: 5 }}, 8.6); tl.to("#errM", {{ opacity: 1, duration: 0.15 }}, 8.65);
      pop("#toast1", 10.0);
      /* 4 · the wait */
      peek("#pk2", 12.4); typing("#t2", 12.6, 2.8); pop("#b2", 15.4);
      tl.to("#pk2", {{ y: -30, duration: 0.1, yoyo: true, repeat: 3 }}, 15.7);
      /* 5 · the rename, letter by letter */
      tl.fromTo("#fileWin", {{ scale: 1.08, opacity: 0 }}, {{ scale: 1, opacity: 1, duration: 0.5, ease: "expo.out" }}, 18.6);
      tl.set("#cur3", {{ x: 760, y: 1100 }}, 18.6);
      tl.to("#cur3", {{ x: 560, y: 900, duration: 0.6, ease: "power2.inOut" }}, 18.6);
      tl.set("#fname", {{ className: "edit" }}, 19.25);
      tl.set("#oldName", {{ opacity: 0 }}, 19.6);
{type_tl}
      tl.set("#fname", {{ className: "" }}, 22.9);
      tl.to("#cur3", {{ x: 520, y: 1060, duration: 0.45, ease: "power2.inOut" }}, 22.9);
      tl.to("#file", {{ y: 470, scale: 0.4, opacity: 0, duration: 0.45, ease: "power3.in" }}, 23.35);
      tl.fromTo("#send", {{ scale: 1 }}, {{ scale: 0.92, duration: 0.1, yoyo: true, repeat: 1 }}, 23.8);
      pop("#sent", 24.0);
      /* 6 · the client is thrilled */
      peek("#pk3", 25.45); pop("#b3", 25.5); pop("#b4", 26.6);
      tl.to("#b3", {{ x: 10, duration: 0.04, yoyo: true, repeat: 5 }}, 25.8);
      /* 7 · the punchline */
      tl.fromTo("#sR2F", {{ scale: 1.05 }}, {{ scale: 1, duration: 0.6, ease: "expo.out" }}, 29.4); blurIn("#sR2B", 29.8); yawn("sR2", 30.9, 32.4);
{end_tl(33)}
'''
open(os.path.join(os.path.dirname(os.path.abspath(__file__)), 'index.html'), 'w').write(page(37, body, timeline, css))

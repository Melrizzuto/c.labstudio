import sys, os
sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), '..'))
from kit import *

AI = dict(name='Claude', avatar='AI', av_cls='ai')
css = '''
      .av.ai { font-size: 40px; letter-spacing: -0.02em; }
      #lid { position: absolute; inset: 0; transform-origin: 50% 100%; }
      #sChat4 { background: #000; }
      #pawX { position: absolute; left: 640px; top: 760px; width: 520px; height: 479px; transform-origin: 92% 95%; z-index: 6; }
      #closed { position: absolute; left: 130px; right: 190px; top: 760px; color: #fff8ea; font: 900 84px/1 "Outfit", sans-serif; letter-spacing: -0.03em; opacity: 0; }
      #closed small { display: block; margin-top: 22px; font: 700 32px/1.2 "Space Mono", monospace; color: var(--sun); }
'''
body = '\n'.join([
  chat('sChat1', 0, 5, bub('m1', 560, 'Il bottone principale è <em>troppo piccolo?</em>', 'bub me', hidden=False) + typing_dots('t1', 900) + bub('a1', 900, '<em>Hai perfettamente ragione!</em> 🙌 È troppo piccolo.'), status='sta pensando…', tease='guarda fino alla fine 👀', **AI),
  react('sR1', 5, 2.6, 'Ok.<br /><em>Proviamo.</em>'),
  chat('sChat2', 7.6, 5.4, bub('m2', 560, 'Aspetta… in realtà è <em>troppo grande.</em>', 'bub me') + typing_dots('t2', 900) + bub('a2', 900, '<em>Hai perfettamente ragione!</em> 🙌 È decisamente troppo grande.'), status='sta pensando…', **AI),
  chat('sChat3', 13, 6.4, bub('m3', 560, 'E se ti dicessi che <em>è giusto così?</em> 🤨', 'bub me') + typing_dots('t3', 900) + bub('a3', 900, '<em>Hai perfettamente ragione!</em> ✨ È perfetto così.'), status='sta pensando…', **AI),
  react('sR2', 19.4, 3.2, 'Ha ragione. Sempre.<br /><em>Su tutto.</em>', sweat=True),
  f'''      <div id="sChat4" class="clip" data-start="22.6" data-duration="4.8">
        <div id="lid" class="dots">
          {who('online', **AI)}
          <div class="bub old" style="top: 520px"><em>Hai perfettamente ragione!</em> ✨</div>
          {bub('m5', 830, 'Calì, tu <em>che ne pensi?</em> 🐾', 'bub me')}
        </div>
        <img id="pawX" src="assets/desk-paw.png" alt="" data-layout-ignore />
        <p id="closed">Calì ha chiuso<br />il portatile. 🐾<small>conversazione terminata</small></p>
      </div>''',
  react('sR3', 27.4, 3.2, "L'unica che mi dice<br /><em>di no.</em>"),
  end(30.6, 4, 'Anche la tua AI ti dà <em>sempre ragione?</em> 👇', 7, 'segui per l’ep. 8'),
  music(34.6, '"Sneaky Snitch"', 0.4, offset=38),
  sfx('pop.wav', 0.06), sfx('tick.wav', 1.3, 0.45), sfx('tick.wav', 1.9, 0.5), sfx('pop.wav', 2.45, 0.95),
  sfx('whoosh1.wav', 4.9, 0.55), sfx('whoosh2.wav', 7.5, 0.55),
  sfx('pop.wav', 7.75, 0.85), sfx('tick.wav', 8.9, 0.45), sfx('tick.wav', 9.6, 0.5), sfx('pop.wav', 10.25, 0.95),
  sfx('pop.wav', 13.15, 0.85), sfx('tick.wav', 14.5, 0.45), sfx('tick.wav', 15.2, 0.5), sfx('tick.wav', 15.9, 0.45), sfx('pop.wav', 16.45, 1),
  sfx('whoosh1.wav', 19.3, 0.5), sfx('whoosh2.wav', 22.5, 0.5), sfx('pop.wav', 22.75, 0.85),
  sfx('whoosh1.wav', 23.95, 0.6), sfx('knock1.wav', 24.4, 0.8), sfx('cat-trill.mp3', 25.1, 0.85),
  sfx('cat-purr.mp3', 27.6, 0.95), sfx('cat-meow.mp3', 31.0, 0.85),
])
timeline = '''
      /* 1 · a simple question; the AI agrees */
      tl.fromTo("#m1", { scale: 0.94 }, { scale: 1, duration: 0.4, ease: "back.out(3)" }, 0.05);
      typing("#t1", 1.0, 1.4); pop("#a1", 2.4);
      tl.fromTo("#sChat1T", { opacity: 1 }, { opacity: 0.35, duration: 0.25, yoyo: true, repeat: 1 }, 3.2);
      /* 2 */
      tl.fromTo("#sR1F", { scale: 1 }, { scale: 1.12, duration: 2.6, ease: "power1.inOut" }, 5); blurIn("#sR1B", 5.5);
      /* 3 · the opposite; it agrees again */
      pop("#m2", 7.7); typing("#t2", 8.6, 1.6); pop("#a2", 10.2);
      /* 4 · the trap; it agrees again */
      pop("#m3", 13.1); typing("#t3", 14.2, 2.2); pop("#a3", 16.4);
      tl.to("#a3", { x: 8, duration: 0.05, yoyo: true, repeat: 3 }, 16.75);
      /* 5 · slow push-in, the realisation */
      tl.fromTo("#sR2F", { scale: 1 }, { scale: 1.14, duration: 3.2, ease: "power1.inOut" }, 19.4); blurIn("#sR2B", 19.9); sweat("sR2", 20.3);
      /* 6 · ask the real boss: the paw shuts the laptop */
      pop("#m5", 22.7);
      tl.fromTo("#pawX", { x: 560, y: 260, rotation: 0 }, { x: 0, y: 0, duration: 0.4, ease: "power2.out" }, 23.95);
      tl.to("#pawX", { rotation: -24, duration: 0.15, ease: "power3.in" }, 24.3);
      tl.to("#lid", { scaleY: 0, duration: 0.35, ease: "power3.in" }, 24.4);
      tl.to("#pawX", { x: 560, y: 260, rotation: 0, duration: 0.4, ease: "power2.in" }, 24.7);
      blurIn("#closed", 25.0);
      /* 7 · Calì purrs */
      tl.fromTo("#sR3F", { scale: 1.06 }, { scale: 1, duration: 0.6, ease: "expo.out" }, 27.4); blurIn("#sR3B", 27.8);
''' + end_tl(30.6)
open(os.path.join(os.path.dirname(os.path.abspath(__file__)), 'index.html'), 'w').write(page(34.6, body, timeline, css))

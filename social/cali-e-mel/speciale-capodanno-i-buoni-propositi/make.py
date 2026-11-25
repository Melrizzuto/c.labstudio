import sys, os
sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), '..'))
from kit import *

CALI = dict(name='Calì', avatar='<img src="assets/cali-av.png" alt="" />', av_cls='cat')
MEL = ['Meno revisioni', 'Dire di no', 'Dormire']
BOSS = ['Più crocchette 🐟', 'Il logo più grande', 'Mel dorme meno']
li = lambda pre, items: ''.join(f'<li id="{pre}{i}"><i></i><span>{t}</span></li>' for i, t in enumerate(items))
bursts = ''.join(f'<div class="burst" id="fw{i}" style="left:{x}px;top:{y}px;--c:{c}">' + ''.join(f'<b style="--a:{a}deg"></b>' for a in range(0, 360, 30)) + '</div>'
                 for i, (x, y, c) in enumerate([(250, 520, '#ffc21a'), (760, 440, '#f25aa6'), (520, 820, '#3be36b'), (850, 900, '#a6e4ff'), (200, 980, '#f25aa6')]))
css = '''
      #sNight, #sCount, #sChat2, #sR2, #sEnd { z-index: 2; }
      #endMel { top: 1100px; }
      .av.cat { padding: 0; overflow: hidden; background: #fff8ea; } .av.cat img { width: 100%; height: 100%; display: block; }
      #sLists { background: #e9e4da radial-gradient(rgba(22,19,15,.1) 1.6px, transparent 2px) 0 0 / 32px 32px; }
      #yr { position: absolute; left: 130px; top: 300px; font: 900 96px/1 "Outfit", sans-serif; letter-spacing: -0.04em; }
      #yr em { font-style: normal; color: var(--note); }
      .list { position: absolute; top: 450px; width: 400px; min-height: 560px; padding: 30px 28px; background: #fff; border-radius: 26px; }
      #lMel { left: 110px; rotate: -2deg; } #lBoss { left: 560px; rotate: 2deg; background: #fff3df; }
      .list h4 { display: flex; align-items: center; gap: 14px; font: 900 44px/1 "Outfit", sans-serif; margin-bottom: 26px; }
      .list h4 img { width: 64px; height: 64px; border-radius: 50%; border: 4px solid var(--ink); object-fit: cover; background: #fff8ea; }
      .list ul { list-style: none; }
      .list li { position: relative; display: flex; align-items: flex-start; gap: 14px; margin-bottom: 30px; font: 700 60px/1 "Caveat", cursive; opacity: 0; }
      #m2 span { background: linear-gradient(#d6281c, #d6281c) 0 58% / 0% 8px no-repeat; }
      .list li i { flex: none; width: 34px; height: 34px; margin-top: 12px; border: 4px solid var(--ink); border-radius: 6px; }
      #strike { position: absolute; left: 150px; top: 0; height: 8px; width: 0; background: #d6281c; border-radius: 4px; }
      #pawS { position: absolute; left: 560px; top: 760px; width: 380px; height: 350px; z-index: 5; opacity: 0; transform-origin: 90% 95%; }
      /* midnight */
      #sCount { background: #10152e radial-gradient(rgba(255,255,255,.14) 2.4px, transparent 2.8px) 0 0 / 44px 44px; }
      .num { position: absolute; left: 0; right: 0; top: 560px; text-align: center; font: 900 380px/1 "Outfit", sans-serif; color: #fff8ea; opacity: 0; }
      #y2027 { font-size: 240px; color: #ffe27a; top: 620px; text-shadow: 0 0 30px rgba(255, 194, 26, .9), 0 0 80px rgba(255, 140, 0, .6); }
      .burst { position: absolute; width: 0; height: 0; opacity: 0; }
      .burst { mix-blend-mode: screen; }
      .burst b { position: absolute; left: -5px; top: -5px; width: 10px; height: 60px; border-radius: 6px; background: linear-gradient(#fff, var(--c) 40%, transparent); box-shadow: 0 0 18px 4px var(--c); transform: rotate(var(--a)) translateY(-80px); transform-origin: 5px 5px; }
      .burst::before { content: ""; position: absolute; left: -120px; top: -120px; width: 240px; height: 240px; border-radius: 50%; background: radial-gradient(var(--c), transparent 65%); opacity: .45; }
      #clockN { position: absolute; left: 130px; top: 300px; padding: 10px 18px; border-radius: 12px; background: #fff8ea; color: #10152e; font: 700 30px/1 "Space Mono", monospace; opacity: 0; }
'''
body = '\n'.join([
  chat('sChat1', 0, 3.4, bub('b1', 600, 'Facciamo i <em>buoni propositi</em> per il 2027. 🥂', 'bub big', hidden=False), status='Boss · online', tease='guarda fino alla fine 👀', peek_id='pk1', **CALI),
  f'''      <div id="sLists" class="clip" data-start="3.4" data-duration="6.4" data-layout-allow-overlap>
        <p id="yr">Propositi <em>2027</em></p>
        <div id="lMel" class="list box"><h4><img src="assets/mel-felt.png" style="object-position: 50% 18%" alt="" />Mel</h4><ul>{li('m', MEL)}</ul></div>
        <div id="lBoss" class="list box"><h4><img src="assets/cali-av.png" alt="" />Boss</h4><ul>{li('k', BOSS)}</ul></div>
        <img id="pawS" src="assets/desk-paw.png" alt="" data-layout-ignore />
      </div>''',
  f'''      <div id="sCount" class="clip" data-start="9.8" data-duration="4.4" data-layout-allow-overlap>
        <p id="n3" class="num">3</p><p id="n2" class="num">2</p><p id="n1" class="num">1</p><p id="y2027" class="num">2027 🥂</p>
        {bursts}
      </div>''',
  chat('sChat2', 14.2, 5.6, '<p id="clockN">00:00:01</p>' + bub('b2', 560, 'Buon anno!! 🥂🎉') + typing_dots('t2', 760) + bub('b3', 760, 'Piccola modifica veloce per il 2 gennaio? <em>Ci vuole un minuto</em> 🙏'), status='sta scrivendo…', name='Il Cliente', avatar='👔'),
  react('sR2', 19.8, 3.6, 'Buon anno.<br /><em>Uguale a prima.</em>', night=True, yawn=True),
  end(23.4, 4, 'Il tuo buon proposito per il <em>2027?</em> 👇', 'speciale', 'buon anno da c.lab studio 🥂'),
  music(27.4, '"Fluffing a Duck"', 0.36, offset=18),
  sfx('pop.wav', 0.06), sfx('whoosh1.wav', 3.3, 0.55),
  *[sfx('tick.wav', round(3.9 + i * 0.75, 2), 0.55) for i in range(3)], *[sfx('tick.wav', round(6.25 + i * 0.75, 2), 0.6) for i in range(3)],
  sfx('whoosh2.wav', 8.45, 0.6), sfx('knock1.wav', 8.85, 0.8),
  sfx('whoosh1.wav', 9.7, 0.5), sfx('knock1.wav', 10.1, 0.9), sfx('knock2.wav', 10.9, 0.9), sfx('knock1.wav', 11.7, 0.95), sfx('riser.wav', 11.5, 0.8),
  sfx('pop.wav', 12.5, 1), sfx('pop.wav', 12.75, 0.9), sfx('pop.wav', 13.0, 0.9), sfx('pop.wav', 13.3, 0.85),
  sfx('whoosh2.wav', 14.1, 0.5), sfx('pop.wav', 14.5, 0.9), sfx('tick.wav', 15.6, 0.45), sfx('tick.wav', 16.3, 0.5), sfx('pop.wav', 16.95, 1),
  sfx('whoosh1.wav', 19.7, 0.5), sfx('cat-purr.mp3', 20.6, 0.8), sfx('cat-meow.mp3', 23.8, 0.85),
])
items_tl = '\n'.join([f'      tl.fromTo("#m{i}", {{ opacity: 0, x: -20 }}, {{ opacity: 1, x: 0, duration: 0.25, ease: "power3.out" }}, {round(3.9 + i * 0.75, 2)});' for i in range(3)]
                     + [f'      tl.fromTo("#k{i}", {{ opacity: 0, x: 20 }}, {{ opacity: 1, x: 0, duration: 0.25, ease: "power3.out" }}, {round(6.25 + i * 0.75, 2)});' for i in range(3)])
fw = '\n'.join(f'      tl.fromTo("#fw{i}", {{ opacity: 1, scale: 0.2 }}, {{ scale: 1.6, duration: 0.9, ease: "expo.out" }}, {round(12.5 + i * 0.25, 2)}); tl.to("#fw{i}", {{ opacity: 0, duration: 0.4 }}, {round(13.3 + i * 0.25, 2)});' for i in range(5))
timeline = '''
      peek("#pk1", 0.3); tl.fromTo("#b1 em", { color: "#16130f" }, { color: "#c81d74", duration: 0.3 }, 1.0);
      tl.fromTo(".list", { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: "expo.out", stagger: 0.12 }, 3.4);
''' + items_tl + '''
      /* the Boss's paw crosses out "Dormire" */
      tl.fromTo("#pawS", { opacity: 1, x: 420, y: 200 }, { opacity: 1, x: -260, y: -60, duration: 0.45, ease: "power2.out", immediateRender: false }, 8.4);
      tl.to("#m2 span", { backgroundSize: "100% 8px", duration: 0.3, ease: "power2.in" }, 8.6);
      tl.to("#pawS", { x: 420, y: 200, duration: 0.4, ease: "power2.in" }, 9.0); tl.set("#pawS", { opacity: 0 }, 9.4);
      /* 3, 2, 1, fireworks */
      [["#n3", 10.1], ["#n2", 10.9], ["#n1", 11.7]].forEach(([n, t]) => { tl.fromTo(n, { opacity: 1, scale: 1.6 }, { scale: 1, duration: 0.3, ease: "expo.out" }, t); tl.to(n, { opacity: 0, duration: 0.1 }, t + 0.7); });
      tl.fromTo("#y2027", { opacity: 0, scale: 0.4 }, { opacity: 1, scale: 1, duration: 0.4, ease: "back.out(2.5)" }, 12.5);
''' + fw + '''
      /* one second into the new year */
      tl.fromTo("#clockN", { opacity: 0 }, { opacity: 1, duration: 0.2 }, 14.3);
      pop("#b2", 14.5); typing("#t2", 15.4, 1.5); pop("#b3", 16.9);
      tl.fromTo("#sR2F", { scale: 1.05 }, { scale: 1, duration: 0.6, ease: "expo.out" }, 19.8); blurIn("#sR2B", 20.2); yawn("sR2", 20.6, 22.6);
''' + end_tl(23.4)
open(os.path.join(os.path.dirname(os.path.abspath(__file__)), 'index.html'), 'w').write(page(27.4, body, timeline, css))

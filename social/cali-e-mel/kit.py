"""Calì & Mel episode kit: shared look, scenes and timeline helpers. Each episode script builds its index.html with it."""
import os
HERE = os.path.dirname(os.path.abspath(__file__))
CSS = open(os.path.join(HERE, 'kit.css')).read()

def page(duration, body, timeline, extra_css=''):
    return f'''<!doctype html>
<html lang="it" data-resolution="portrait">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=1080, height=1920" />
    <script src="https://cdn.jsdelivr.net/npm/gsap@3.15.0/dist/gsap.min.js"></script>
    <style>{CSS}
{extra_css}
    </style>
  </head>
  <body>
    <div id="root" data-composition-id="main" data-start="0" data-duration="{duration}" data-width="1080" data-height="1920">
{body}
    </div>
    <script>
      window.__timelines = window.__timelines || {{}};
      const tl = gsap.timeline({{ paused: true }});
      const pop = (sel, at) => tl.fromTo(sel, {{ scale: 0.75, opacity: 0 }}, {{ scale: 1, opacity: 1, duration: 0.32, ease: "back.out(2.4)" }}, at);
      const peek = (sel, at) => tl.fromTo(sel, {{ y: 160 }}, {{ y: 0, duration: 0.6, ease: "back.out(1.6)" }}, at);
      const blurIn = (sel, at) => tl.fromTo(sel, {{ opacity: 0, filter: "blur(8px)" }}, {{ opacity: 1, filter: "blur(0px)", duration: 0.2 }}, at);
      const typing = (sel, at, len) => {{
        tl.fromTo(sel, {{ scale: 0.6, opacity: 0 }}, {{ scale: 1, opacity: 1, duration: 0.25, ease: "back.out(2)" }}, at);
        const n = Math.max(1, Math.round((len - 0.5) / 0.44));
        [0, 1, 2].forEach((i) => tl.fromTo(`${{sel}} i:nth-child(${{i + 1}})`, {{ y: 0 }}, {{ y: -14, duration: 0.22, yoyo: true, repeat: n * 2 - 1, ease: "sine.inOut" }}, at + 0.2 + i * 0.14));
        tl.to(sel, {{ opacity: 0, duration: 0.1 }}, at + len - 0.05);
      }};
      const yawn = (scene, from, to) => {{
        tl.set(`#${{scene}}Y`, {{ opacity: 1 }}, from); tl.set(`#${{scene}}A`, {{ opacity: 0 }}, from);
        tl.set(`#${{scene}}Y`, {{ opacity: 0 }}, to); tl.set(`#${{scene}}A`, {{ opacity: 1 }}, to);
      }};
{timeline}
      window.__timelines["main"] = tl;
      tl.seek(0);
    </script>
  </body>
</html>
'''

def who(status='online'):
    return f'<div class="who"><div class="av">👔</div><div><b>Il Cliente</b><small>{status}</small></div></div>'

def chat(id, start, dur, inner, status='online', tease=None, peek_id=None):
    t = f'<p id="{id}T" class="tease">{tease}</p>' if tease else ''
    p = f'<div id="{peek_id}" class="peek" data-layout-ignore><img src="assets/mel-felt.png" alt="" /></div>' if peek_id else ''
    return f'''      <div id="{id}" class="clip dots" data-start="{start}" data-duration="{dur}">
        {t}{who(status)}
        {inner}
        {p}
      </div>'''

def bub(id, top, html, cls='bub', hidden=True):
    st = f'top: {top}px' + ('; opacity: 0' if hidden else '')
    return f'<div id="{id}" class="{cls}" style="{st}">{html}</div>'

def old(top, html):
    return f'<div class="bub old" style="top: {top}px">{html}</div>'

def typing_dots(id, top):
    return f'<div id="{id}" class="typing" style="top: {top}px; opacity: 0"><i></i><i></i><i></i></div>'

def react(id, start, dur, band_html, night=False, yawn=False, band_cls='band2'):
    bg = 'night' if night else 'react'
    imgs = f'<img id="{id}A" src="assets/mel-felt.png" alt="" />' + (f'<img id="{id}Y" src="assets/mel-felt-yawn.png" alt="" style="opacity: 0" />' if yawn else '')
    return f'''      <div id="{id}" class="clip {bg}" data-start="{start}" data-duration="{dur}">
        <div id="{id}F" class="face">{imgs}</div>
        <div id="{id}B" class="{band_cls}" style="opacity: 0">{band_html}</div>
      </div>'''

def end(start, dur, question_html, ep):
    return f'''      <div id="sEnd" class="clip" data-start="{start}" data-duration="{dur}">
        <h2 id="endH">{question_html}</h2>
        <p id="endEp" class="ep">Calì &amp; Mel · ep. {ep}<br />@c.labstudio.milano</p>
        <div id="endMel"><img src="assets/mel-felt.png" alt="" /></div>
      </div>'''

END_TL = '''      blurIn("#endH", {s0}); tl.fromTo("#endMel", {{ y: 700 }}, {{ y: 0, duration: 0.6, ease: "back.out(1.5)" }}, {s1}); tl.fromTo("#endEp", {{ opacity: 0 }}, {{ opacity: 1, duration: 0.25 }}, {s2});'''
def end_tl(start):
    return END_TL.format(s0=round(start + 0.05, 2), s1=round(start + 0.2, 2), s2=round(start + 0.6, 2))

_n = [0]
def sfx(src, at, vol=0.8, dur=None):
    durs = {'pop.wav': 0.06, 'tick.wav': 0.03, 'whoosh1.wav': 0.45, 'whoosh2.wav': 0.38, 'riser.wav': 1.1, 'cat-trill.mp3': 1.25, 'cat-meow.mp3': 1.59, 'cat-purr.mp3': 2.54, 'knock1.wav': 0.11, 'knock2.wav': 0.11}
    _n[0] += 1
    return f'      <audio id="a{_n[0]}" class="clip" data-start="{at}" data-duration="{dur or durs[src]}" src="assets/{src}" data-volume="{vol}"></audio>'

def music(dur, credit, vol=0.4):
    return f'''      <!-- music: {credit}, Kevin MacLeod (incompetech.com), CC BY 4.0 -->
      <audio id="aMusic" class="clip" data-start="0" data-duration="{dur}" src="assets/music.mp3" data-volume="{vol}" data-fade-out="2"></audio>'''

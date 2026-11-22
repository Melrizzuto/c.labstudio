'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import { forcedNight } from '@/lib/theme';
import { playCat } from '@/lib/sounds';
import type { CatLine } from '@/i18n/types';

/*
 * The room: the illustrations, full screen, with a camera that moves inside them as you scroll.
 * The markup comes in as children (RoomStage + Chapters); this component only drives it.
 */

type SceneName = 'day' | 'desk' | 'night';
interface View {
  x: number;
  y: number;
  z: number;
}
interface Cam extends View {
  s: SceneName;
  /** [x0, x1, yc]: frame this strip of the picture (the folders) */
  fit?: [number, number, number];
}
interface Anchor {
  ax: number;
  ay: number;
}
interface Placed {
  left: number;
  top: number;
  fw: number;
  fh: number;
  o: number;
}

/** picture ratio, 2688 × 1520 */
const R = 2688 / 1520;
/* where the camera looks in each chapter: scene, target point (% of the picture), zoom */
const CAM: Record<string, Cam> = {
  overview: { s: 'day', x: 50, y: 50, z: 1 },
  book: { s: 'day', x: 48, y: 36, z: 2.1 },
  desk: { s: 'desk', x: 44, y: 62, z: 1.3, fit: [25, 76, 71] },
  sofa: { s: 'night', x: 50, y: 56, z: 1.12 },
  tv: { s: 'night', x: 63, y: 31, z: 2.4 },
  outro: { s: 'night', x: 50, y: 46, z: 1 },
};
/* when we leave one picture for another, the camera dives into this point first */
const EXIT: Record<string, View> = {
  'day>desk': { x: 13, y: 40, z: 4 },
  'desk>night': { x: 50, y: 14, z: 3.2 },
  'night>desk': { x: 63, y: 31, z: 3.2 },
  'desk>day': { x: 13, y: 40, z: 4 },
};
const ENTRY: Record<string, View> = {
  'day>desk': { x: 51, y: 63, z: 2.2 },
  'desk>night': { x: 63, y: 31, z: 3 },
  'night>desk': { x: 50, y: 14, z: 2.6 },
  'desk>day': { x: 13, y: 40, z: 3 },
};

const smooth = (x: number) => x * x * (3 - 2 * x);
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const mix = (a: View, b: View, t: number): View => ({ x: lerp(a.x, b.x, t), y: lerp(a.y, b.y, t), z: lerp(a.z, b.z, t) });

export function Room({ label, cat, children }: { label: string; cat: { awake: CatLine[]; asleep: CatLine[] }; children: ReactNode }) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const roomSec = ref.current;
    const stage = roomSec?.querySelector<HTMLElement>('#roomStage');
    const miao = roomSec?.querySelector<HTMLElement>('#miao');
    if (!roomSec || !stage || !miao) return;
    const root = document.documentElement;
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

    const scenes = {} as Record<SceneName, HTMLElement>;
    stage.querySelectorAll<HTMLElement>('.scene').forEach((el) => {
      scenes[el.dataset.scene as SceneName] = el;
    });
    const placed: Partial<Record<SceneName, Placed | null>> = {};
    const pins = Array.from(stage.querySelectorAll<HTMLElement>('.pin'));
    const clip = stage.querySelector<HTMLVideoElement>('#tvclip');
    const chapters = Array.from(roomSec.querySelectorAll<HTMLElement>('.chapter'));

    /* how far we are through a chapter, 0..1, with its view held at .5.
       The desk on medium screens has its card below the picture, so the view arrives when the chapter reaches the top
       and holds while the card scrolls past */
    function progress(ch: HTMLElement, rc: DOMRect, vh: number) {
      if (ch.dataset.cam === 'desk' && innerWidth >= 820 && innerWidth < 1380) {
        if (rc.top > 0) return (0.5 * (vh * 0.5 - rc.top)) / (vh * 0.5);
        if (rc.bottom > vh) return 0.5;
        return 0.5 + (0.5 * (vh - rc.bottom)) / (vh * 0.5);
      }
      return (vh * 0.5 - rc.top) / rc.height;
    }
    function storyIndex() {
      const vh = innerHeight;
      let idx = 0;
      for (let i = 0; i < chapters.length; i++) {
        const rc = chapters[i].getBoundingClientRect();
        if (rc.top <= vh * 0.5) idx = i + Math.min(1, Math.max(0, progress(chapters[i], rc, vh)));
      }
      return Math.max(0, Math.min(chapters.length - 1, idx - 0.5));
    }
    function anchorOf(ch: HTMLElement): Anchor {
      const mob = innerWidth < 820;
      return mob ? { ax: 0.5, ay: 0.3 } : { ax: ch.classList.contains('right') ? 0.34 : 0.66, ay: 0.5 };
    }
    /* a chapter with fit:[x0,x1,yc] frames that strip of the picture (the folders).
       wide screens: picture pushed right and zoomed until x0 meets the left edge, card beside it.
       medium screens: no room beside the card, so the strip is centred full width and the card scrolls in below it (see CSS) */
    function fitCam(ch: HTMLElement, cam: Cam): Cam {
      if (!cam.fit || innerWidth < 820) return cam;
      const vw = stage!.clientWidth,
        vh = stage!.clientHeight,
        fw = Math.max(vw, vh * R),
        f = cam.fit;
      if (innerWidth < 1380) {
        const z = Math.max(1, Math.min(1.8, (vw * 0.92) / (((f[1] - f[0]) / 100) * fw)));
        return { s: cam.s, x: (f[0] + f[1]) / 2 + ((anchorOf(ch).ax * vw - vw / 2) / (fw * z)) * 100, y: f[2], z };
      }
      return { s: cam.s, x: 100, y: cam.y, z: Math.max(1, Math.min(1.5, vw / (fw * (1 - f[0] / 100)))) };
    }
    /* the wanted view of every scene for a given story position */
    function views(idx: number) {
      const i = Math.floor(idx),
        f = smooth(idx - i),
        A = chapters[i],
        Bc = chapters[i + 1] || A;
      const a = fitCam(A, CAM[A.dataset.cam!]),
        b = fitCam(Bc, CAM[Bc.dataset.cam!]),
        aa = anchorOf(A),
        ab = anchorOf(Bc);
      const anc: Anchor = { ax: lerp(aa.ax, ab.ax, f), ay: lerp(aa.ay, ab.ay, f) };
      const out: Partial<Record<SceneName, { c: View; o: number }>> = {};
      if (a.s === b.s) {
        out[a.s] = { c: mix(a, b, f), o: 1 };
      } else {
        const k = a.s + '>' + b.s,
          ex = EXIT[k] || a,
          en = ENTRY[k] || b;
        out[a.s] = { c: mix(a, ex, smooth(Math.min(1, f * 1.6))), o: 1 - smooth(Math.min(1, Math.max(0, (f - 0.35) / 0.4))) };
        out[b.s] = { c: mix(en, b, smooth(Math.max(0, (f - 0.35) / 0.65))), o: smooth(Math.min(1, Math.max(0, (f - 0.35) / 0.4))) };
      }
      return { v: out, anc, scene: f < 0.55 ? a.s : b.s };
    }

    const cur: Partial<Record<SceneName, View & { o: number }>> = {};
    const mouse = { x: 0, y: 0 };
    let first = true;
    function place(name: SceneName, c: View, o: number, anc: Anchor) {
      const el = scenes[name],
        vw = stage!.clientWidth,
        vh = stage!.clientHeight,
        fw = Math.max(vw, vh * R),
        fh = fw / R,
        z = c.z;
      const px = reduce ? 0 : mouse.x * 0.012 * vw,
        py = reduce ? 0 : mouse.y * 0.012 * vh;
      let left = anc.ax * vw - (c.x / 100) * fw * z + px,
        top = anc.ay * vh - (c.y / 100) * fh * z + py;
      left = Math.min(0, Math.max(vw - fw * z, left));
      top = Math.min(0, Math.max(vh - fh * z, top));
      el.style.width = fw + 'px';
      el.style.height = fh + 'px';
      el.style.transform = 'translate(' + left + 'px,' + top + 'px) scale(' + z + ')';
      el.style.opacity = String(o);
      el.style.zIndex = o > 0.5 ? '2' : '1';
      el.style.pointerEvents = o > 0.5 ? 'auto' : 'none';
      placed[name] = { left, top, fw: fw * z, fh: fh * z, o };
    }
    function pinFor(p: HTMLElement, idx: number) {
      const s = p.dataset.s;
      if (s === 'day') return idx < 0.7;
      if (s === 'desk') return Math.abs(idx - 2) < 0.45;
      if (s === 'night') return idx > 2.6 && idx < 4.6;
      return true;
    }
    let raf = 0;
    function frame() {
      raf = requestAnimationFrame(frame);
      const sec = roomSec!.getBoundingClientRect();
      if (sec.bottom < 0 || sec.top > innerHeight) return;
      const idx = storyIndex(),
        w = views(idx),
        k = reduce || first ? 1 : 0.12;
      first = false;
      (Object.keys(scenes) as SceneName[]).forEach((n) => {
        const want = w.v[n];
        const c = (cur[n] ??= { x: 50, y: 50, z: 1, o: 0 });
        if (want) {
          c.x = lerp(c.x, want.c.x, k);
          c.y = lerp(c.y, want.c.y, k);
          c.z = lerp(c.z, want.c.z, k);
          c.o = lerp(c.o, want.o, k);
        } else c.o = lerp(c.o, 0, k);
        if (c.o < 0.005) {
          scenes[n].style.opacity = '0';
          scenes[n].style.pointerEvents = 'none';
          placed[n] = null;
          return;
        }
        place(n, c, c.o, w.anc);
      });
      /* pins follow their scene, at a constant size */
      pins.forEach((p) => {
        const g = placed[p.dataset.s as SceneName],
          on = !!g && g.o > 0.6 && pinFor(p, idx);
        p.classList.toggle('off', !on);
        if (!on || !g) return;
        p.style.left = g.left + (g.fw * Number(p.dataset.x)) / 100 + 'px';
        p.style.top = g.top + (g.fh * Number(p.dataset.y)) / 100 + 'px';
      });
      /* the TV plays the weekend clip when we get close */
      const near = Math.abs(idx - 4) < 0.6;
      if (clip) {
        if (near && !clip.classList.contains('on')) {
          clip.classList.add('on');
          clip.preload = 'auto';
          clip.play()?.catch(() => {});
        }
        if (!near && clip.classList.contains('on')) {
          clip.classList.remove('on');
          clip.pause();
        }
      }
      /* page colours follow the picture: evening scenes turn the page to night */
      const night = forcedNight() || w.scene === 'night';
      root.dataset.timeLock = '1';
      const t = night ? 'night' : 'day';
      if (root.dataset.time !== t) root.dataset.time = t;
    }

    const onPointer = (e: PointerEvent) => {
      mouse.x = (e.clientX / innerWidth) * 2 - 1;
      mouse.y = (e.clientY / innerHeight) * 2 - 1;
    };
    addEventListener('pointermove', onPointer, { passive: true });

    /* Calì says something */
    let miaoTimer: number | undefined;
    const onStageClick = (e: MouseEvent) => {
      const c = (e.target as Element).closest('[data-cat]');
      if (!c) return;
      const r = c.getBoundingClientRect(),
        sr = stage.getBoundingClientRect();
      /* above the cat if there is room under the header, otherwise beside her (right, or left near the edge) */
      /* asleep on the sofa she only purrs or trills; each word comes with its own sound */
      const asleep = !!c.closest('[data-scene="night"]') || (c as HTMLElement).dataset.s === 'night';
      const lines = asleep ? cat.asleep : cat.awake;
      const line = lines[Math.floor(Math.random() * lines.length)];
      miao.textContent = line.word;
      playCat(line.sound);
      const w = miao.offsetWidth,
        side = r.top < 170,
        left = side && r.right + w + 20 > sr.right && r.left - sr.left > sr.right - r.right;
      miao.classList.toggle('side', side);
      miao.classList.toggle('left', left);
      miao.style.left =
        (side
          ? left
            ? Math.max(r.left - sr.left - 10, w + 8)
            : Math.min(r.right - sr.left + 10, sr.width - w - 8)
          : Math.max(110, Math.min(sr.width - 110, r.left + r.width / 2 - sr.left))) + 'px';
      miao.style.top = (side ? Math.max(r.top + r.height * 0.5, 118) - sr.top : r.top + r.height * 0.3 - sr.top) + 'px';
      miao.classList.add('on');
      clearTimeout(miaoTimer);
      miaoTimer = window.setTimeout(() => miao.classList.remove('on'), 1500);
    };
    stage.addEventListener('click', onStageClick);

    /* Calì's paw on the desk pokes the cup now and then, and right away when you greet her */
    const paw = stage.querySelector<HTMLElement>('.paw');
    const onPawGreet = (e: MouseEvent) => {
      if (!paw || !(e.target as Element).closest('[data-scene="desk"] [data-cat]')) return;
      paw.classList.remove('tap');
      void paw.offsetWidth;
      paw.classList.add('tap');
    };
    const onPawEnd = () => paw?.classList.remove('tap');
    document.addEventListener('click', onPawGreet);
    paw?.addEventListener('animationend', onPawEnd);

    /* leaving the room: the page goes back to the theme */
    const onScroll = () => {
      const sec = roomSec.getBoundingClientRect();
      if (sec.top > innerHeight * 0.5) {
        delete root.dataset.timeLock;
        const b = forcedNight() ? 'night' : 'day';
        if (root.dataset.time !== b) root.dataset.time = b;
      } else if (sec.bottom < innerHeight * 0.5) {
        root.dataset.time = 'night';
      }
    };
    addEventListener('scroll', onScroll, { passive: true });

    frame();
    return () => {
      cancelAnimationFrame(raf);
      removeEventListener('pointermove', onPointer);
      removeEventListener('scroll', onScroll);
      stage.removeEventListener('click', onStageClick);
      document.removeEventListener('click', onPawGreet);
      paw?.removeEventListener('animationend', onPawEnd);
      clearTimeout(miaoTimer);
    };
  }, [cat]);

  return (
    <section className="room" id="stanza" aria-label={label} ref={ref}>
      {children}
    </section>
  );
}

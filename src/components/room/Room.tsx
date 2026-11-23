'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import { forcedNight } from '@/lib/theme';
import { activatePicture } from '@/lib/pictures';
import { playCat, playSfx } from '@/lib/sounds';
import { openCase } from '@/lib/cases';
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
  desk: { s: 'desk', x: 44, y: 62, z: 1.3, fit: [4, 78, 57] },
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

/*
 * Phones (< 820 px): the picture is much wider than the screen, so every chapter shows its scene first,
 * full screen, and the card comes up after it (see the mobile CSS). Some views pan sideways while you scroll
 * through the scene: `pan` is the start and end x (% of the picture). In those views a sideways swipe moves
 * the picture too, so you can look around without scrolling the page.
 */
const MOBILE = 820;
const MOBILE_CAM: Record<string, Cam & { pan?: [number, number] }> = {
  /* the whole room, from the desk on the left, past the book, to the TV on the right */
  overview: { s: 'day', x: 13, y: 50, z: 1, pan: [13, 87] },
  book: { s: 'day', x: 48, y: 38, z: 1.9 },
  /* from the notebook along the five folders */
  desk: { s: 'desk', x: 14, y: 70, z: 1.15, pan: [14, 69] },
  /* from Mel on the sofa to Calì asleep on the armrest */
  sofa: { s: 'night', x: 44, y: 60, z: 1.1, pan: [44, 82] },
  /* the whole TV */
  tv: { s: 'night', x: 63, y: 31, z: 1.05 },
  outro: { s: 'night', x: 50, y: 46, z: 1 },
};
/** the room's chapters that have a button in the mobile dock */
const DOCK = ['book', 'desk', 'sofa', 'tv'] as const;
type DockKey = (typeof DOCK)[number];

const smooth = (x: number) => x * x * (3 - 2 * x);
const clamp01 = (x: number) => Math.min(1, Math.max(0, x));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const mix = (a: View, b: View, t: number): View => ({ x: lerp(a.x, b.x, t), y: lerp(a.y, b.y, t), z: lerp(a.z, b.z, t) });

export function Room({
  label,
  cat,
  terminal,
  dock,
  children,
}: {
  label: string;
  cat: { awake: CatLine[]; asleep: CatLine[] };
  /** what the desk keyboard types: a command and its answer */
  terminal: [string, string][];
  /** the mobile dock: its label and one button per corner of the room */
  dock: { label: string; targets: Record<DockKey, { id: string; text: string }> };
  children: ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);
  const dockRef = useRef<HTMLElement>(null);

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
    /* the YouTube-style bar under the clip: progress and time from the real video */
    const player = clip?.closest<HTMLElement>('.tvplayer');
    const ytTime = player?.querySelector<HTMLElement>('.yt-time');
    const mmss = (s: number) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`;
    const onClipTime = () => {
      if (!clip || !player) return;
      const d = Number.isFinite(clip.duration) ? clip.duration : 0;
      player.style.setProperty('--p', d ? (clip.currentTime / d).toFixed(4) : '0');
      if (ytTime) ytTime.textContent = `${mmss(clip.currentTime)} / ${mmss(d)}`;
    };
    clip?.addEventListener('timeupdate', onClipTime);
    clip?.addEventListener('loadedmetadata', onClipTime);
    const chapters = Array.from(roomSec.querySelectorAll<HTMLElement>('.chapter'));

    /* sizes that only change on resize (or when the fonts arrive): measured then, never inside the frame loop */
    let vw = 0,
      vh = 0,
      fw = 0,
      fh = 0,
      cardTop: number[] = [];
    const measure = () => {
      vw = stage.clientWidth;
      vh = stage.clientHeight;
      fw = Math.max(vw, vh * R);
      fh = fw / R;
      cardTop = chapters.map((ch) => {
        const card = ch.querySelector<HTMLElement>('.card');
        return card ? card.getBoundingClientRect().top - ch.getBoundingClientRect().top : 0;
      });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(stage);
    chapters.forEach((c) => ro.observe(c));
    /* the chapters' positions, read once per frame */
    let rects: DOMRect[] = [];

    /* the pictures load only when needed: the day scene when the room is half a screen away, the desk and the night
       when you get close to their chapters, the night window when the night is on (see lib/pictures.ts) */
    const loaded = new Set<string>();
    /* never before the page itself (fonts, felt Mel) has finished loading */
    let pageLoaded = document.readyState === 'complete';
    const waiting = new Set<string>();
    const load = (key: 'day' | 'daynight' | 'desk' | 'night') => {
      if (loaded.has(key)) return;
      if (!pageLoaded) {
        waiting.add(key);
        return;
      }
      loaded.add(key);
      stage.querySelectorAll<HTMLImageElement>(`img[data-load="${key}"]`).forEach(activatePicture);
    };
    const onPageLoad = () => {
      pageLoaded = true;
      waiting.forEach((k) => load(k as 'day'));
      waiting.clear();
    };
    if (!pageLoaded) addEventListener('load', onPageLoad, { once: true });

    /* how far we are through a chapter, 0..1, with its view held at .5.
       The desk on medium screens has its card below the picture, so the view arrives when the chapter reaches the top
       and holds while the card scrolls past */
    function progress(ch: HTMLElement, rc: DOMRect, vh: number) {
      /* phones: every chapter holds its view while its scene is on screen, before and while its card comes up */
      if (innerWidth < MOBILE || (ch.dataset.cam === 'desk' && innerWidth < 1380)) {
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
        const rc = rects[i];
        if (rc.top <= vh * 0.5) idx = i + Math.min(1, Math.max(0, progress(chapters[i], rc, vh)));
      }
      return Math.max(0, Math.min(chapters.length - 1, idx - 0.5));
    }
    function anchorOf(ch: HTMLElement): Anchor {
      const mob = innerWidth < 820;
      return mob ? { ax: 0.5, ay: 0.47 } : { ax: ch.classList.contains('right') ? 0.34 : 0.66, ay: 0.5 };
    }
    /* a chapter with fit:[x0,x1,yc] frames that strip of the picture (the folders).
       wide screens: picture pushed right and zoomed until x0 meets the left edge, card beside it.
       medium screens: no room beside the card, so the strip is centred full width and the card scrolls in below it (see CSS) */
    /* phones: how far the scene of a chapter has been scrolled through, 0..1, until its card comes up */
    function panOf(i: number) {
      const range = cardTop[i] - innerHeight * 0.95;
      return range > 1 ? clamp01(-rects[i].top / range) : 0;
    }
    /* phones: how far each panning view has been swiped sideways, in % of the picture, on top of the scroll pan */
    const swiped: number[] = chapters.map(() => 0);
    /* the pan's x from the scroll alone */
    function panBase(i: number) {
      const m = MOBILE_CAM[chapters[i].dataset.cam!];
      return m.pan ? lerp(m.pan[0], m.pan[1], smooth(panOf(i))) : m.x;
    }
    /* scroll pan + swipe, kept inside the picture (anchor at mid-screen on phones) */
    function panX(i: number) {
      const m = MOBILE_CAM[chapters[i].dataset.cam!];
      const edge = ((0.5 * vw) / (fw * m.z)) * 100;
      return Math.min(100 - edge, Math.max(edge, panBase(i) + swiped[i]));
    }
    /* screens taller than the picture (tablets, narrow windows) already see it enlarged to cover their height:
       ease the zooms there, or a cushion ends up filling the screen. Wide screens are untouched (fw ≈ vw) */
    const tame = (z: number) => (innerWidth < MOBILE ? z : Math.max(1, z / Math.sqrt(Math.max(1, fw / vw))));
    function fitCam(i: number): Cam {
      const ch = chapters[i];
      const cam = CAM[ch.dataset.cam!];
      if (innerWidth < MOBILE) {
        const m = MOBILE_CAM[ch.dataset.cam!];
        return m.pan ? { ...m, x: panX(i) } : m;
      }
      if (!cam.fit) return { ...cam, z: tame(cam.z) };
      const f = cam.fit;
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
        j = chapters[i + 1] ? i + 1 : i,
        A = chapters[i],
        Bc = chapters[j];
      const a = fitCam(i),
        b = fitCam(j),
        aa = anchorOf(A),
        ab = anchorOf(Bc);
      const anc: Anchor = { ax: lerp(aa.ax, ab.ax, f), ay: lerp(aa.ay, ab.ay, f) };
      const out: Partial<Record<SceneName, { c: View; o: number }>> = {};
      if (a.s === b.s) {
        out[a.s] = { c: mix(a, b, f), o: 1 };
      } else {
        const k = a.s + '>' + b.s,
          ex = EXIT[k] ? { ...EXIT[k], z: tame(EXIT[k].z) } : a,
          en = ENTRY[k] ? { ...ENTRY[k], z: tame(ENTRY[k].z) } : b;
        out[a.s] = { c: mix(a, ex, smooth(Math.min(1, f * 1.6))), o: 1 - smooth(Math.min(1, Math.max(0, (f - 0.35) / 0.4))) };
        out[b.s] = { c: mix(en, b, smooth(Math.max(0, (f - 0.35) / 0.65))), o: smooth(Math.min(1, Math.max(0, (f - 0.35) / 0.4))) };
      }
      return { v: out, anc, scene: f < 0.55 ? a.s : b.s };
    }

    const cur: Partial<Record<SceneName, View & { o: number }>> = {};
    let first = true;
    const sized: Partial<Record<SceneName, number>> = {};
    function place(name: SceneName, c: View, o: number, anc: Anchor) {
      const el = scenes[name],
        z = c.z;
      /* no drift with the mouse: the stickers and the folders stay put under the cursor */
      const px = 0,
        py = 0;
      let left = anc.ax * vw - (c.x / 100) * fw * z + px,
        top = anc.ay * vh - (c.y / 100) * fh * z + py;
      left = Math.min(0, Math.max(vw - fw * z, left));
      top = Math.min(0, Math.max(vh - fh * z, top));
      if (sized[name] !== fw) {
        sized[name] = fw;
        el.style.width = fw + 'px';
        el.style.height = fh + 'px';
      }
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
    /* the mobile dock: shown while the room is on screen, with the current corner highlighted */
    const dockEl = dockRef.current;
    let dockOn = false,
      dockCur = '';
    function showDock(on: boolean) {
      if (!dockEl || on === dockOn) return;
      dockOn = on;
      dockEl.classList.toggle('on', on);
    }
    function markDock(cam: string | undefined) {
      const c = cam && (DOCK as readonly string[]).includes(cam) ? cam : '';
      if (!dockEl || c === dockCur) return;
      dockCur = c;
      dockEl.querySelectorAll<HTMLElement>('button').forEach((b) => {
        if (b.dataset.dock === c) b.setAttribute('aria-current', 'true');
        else b.removeAttribute('aria-current');
      });
    }

    /* the frame loop runs only while the room is near the screen (see the IntersectionObserver below) */
    let raf = 0,
      running = false;
    function frame() {
      raf = running ? requestAnimationFrame(frame) : 0;
      const sec = roomSec!.getBoundingClientRect();
      showDock(sec.top < innerHeight * 0.6 && sec.bottom > innerHeight * 0.8);
      if (sec.bottom < 0 || sec.top > innerHeight) return;
      rects = chapters.map((c) => c.getBoundingClientRect());
      const idx = storyIndex(),
        w = views(idx),
        k = reduce || first ? 1 : swipe.moving ? 0.3 : 0.12;
      storyAt = idx;
      /* a swiped view goes back to its scroll pan once you are well away from it */
      swiped.forEach((v, i) => {
        if (v && Math.abs(idx - i) > 1.2) swiped[i] = 0;
      });
      first = false;
      markDock(chapters[Math.round(idx)]?.dataset.cam);
      if (idx > 0.5) load('desk');
      if (idx > 1.5) load('night');
      if (idx > 2.5 || forcedNight()) load('daynight');
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
        /* moved with a transform, not left/top: no layout on every frame, no layout shift */
        const px = g.left + (g.fw * Number(p.dataset.x)) / 100,
          py = g.top + (g.fh * Number(p.dataset.y)) / 100;
        p.style.transform = `translate3d(${px.toFixed(1)}px,${py.toFixed(1)}px,0) translate(-50%,-50%)`;
      });
      /* the TV plays the weekend clip when we get close */
      const near = Math.abs(idx - 4) < 0.6;
      if (clip) {
        if (near && !clip.classList.contains('on')) {
          clip.classList.add('on');
          clip.preload = 'auto';
          /* every visit starts the episode from the top */
          if (clip.readyState > 0) clip.currentTime = 0;
          onClipTime();
          clip.play()?.catch(() => {});
        }
        if (!near && clip.classList.contains('on')) {
          clip.classList.remove('on');
          clip.pause();
        }
      }
      /* page colours follow the picture: evening scenes turn the page to night */
      const night = forcedNight() || w.scene === 'night';
      if (root.dataset.timeLock !== '1') root.dataset.timeLock = '1';
      const t = night ? 'night' : 'day';
      if (root.dataset.time !== t) root.dataset.time = t;
    }

    /* phones: a sideways swipe on a panning view moves the picture; vertical swipes stay the page's scroll
       (touch-action: pan-y in the CSS). Not on the cards, and a swipe never counts as a tap on what it started on */
    let storyAt = 0;
    const swipe = { id: -1, i: -1, x0: 0, last: 0, moving: false };
    const onSwipeStart = (e: PointerEvent) => {
      if (innerWidth >= MOBILE || e.pointerType === 'mouse' || swipe.id !== -1) return;
      if ((e.target as Element).closest('.card, .room-dock')) return;
      const i = Math.round(storyAt);
      if (!chapters[i] || !MOBILE_CAM[chapters[i].dataset.cam!]?.pan || Math.abs(storyAt - i) > 0.2) return;
      Object.assign(swipe, { id: e.pointerId, i, x0: e.clientX, last: e.clientX, moving: false });
    };
    const onSwipeMove = (e: PointerEvent) => {
      if (e.pointerId !== swipe.id) return;
      if (!swipe.moving && Math.abs(e.clientX - swipe.x0) > 8) swipe.moving = true;
      if (swipe.moving) {
        const i = swipe.i,
          z = MOBILE_CAM[chapters[i].dataset.cam!].z;
        swiped[i] -= ((e.clientX - swipe.last) / (fw * z)) * 100;
        /* no dead zone past the edges: keep the offset where the picture actually stops */
        swiped[i] = panX(i) - panBase(i);
      }
      swipe.last = e.clientX;
    };
    const onSwipeEnd = (e: PointerEvent) => {
      if (e.pointerId !== swipe.id) return;
      if (swipe.moving) {
        /* swallow the click that follows the swipe */
        const stop = (ev: Event) => {
          ev.stopPropagation();
          ev.preventDefault();
        };
        addEventListener('click', stop, { capture: true, once: true });
        setTimeout(() => removeEventListener('click', stop, { capture: true }), 400);
      }
      swipe.id = -1;
      swipe.moving = false;
    };
    roomSec.addEventListener('pointerdown', onSwipeStart, { passive: true });
    addEventListener('pointermove', onSwipeMove, { passive: true });
    addEventListener('pointerup', onSwipeEnd);
    addEventListener('pointercancel', onSwipeEnd);


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

    /* hovering a folder (or its sticker) opens it: the matching sheet slides up */
    const fx = Array.from(stage.querySelectorAll<HTMLElement>('.ffx'));
    const fxLayer = stage.querySelector<HTMLElement>('.folders-fx');
    let openFx = '';
    let fxIdle: number | undefined;
    const setOpen = (id: string) => {
      if (id === openFx) return;
      openFx = id;
      clearTimeout(fxIdle);
      /* the copies show while a folder is open, and until it has closed again */
      if (id) fxLayer?.classList.add('active');
      else fxIdle = window.setTimeout(() => fxLayer?.classList.remove('active'), 650);
      fx.forEach((f) => f.classList.toggle('open', f.dataset.fx === id));
      playSfx(id ? 'paperOpen' : 'paperClose');
    };
    const onFolderOver = (e: PointerEvent | FocusEvent) => {
      /* a finger has no hover: on touch the folders open on a tap (below), never while scrolling past them */
      if ('pointerType' in e && e.pointerType !== 'mouse') return;
      const c = (e.target as Element).closest?.<HTMLElement>('[data-case]');
      setOpen(c && fx.some((f) => f.dataset.fx === c.dataset.case) ? c.dataset.case! : '');
    };
    const onFolderLeave = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      setOpen('');
    };
    stage.addEventListener('pointerover', onFolderOver);
    stage.addEventListener('focusin', onFolderOver);
    stage.addEventListener('pointerleave', onFolderLeave);
    /* touch: a tap lifts the folder and swings its cover open, then the case opens; closing the case closes the folder */
    let lastPointer = 'mouse';
    let caseTimer: number | undefined;
    const onPointerKind = (e: PointerEvent) => {
      lastPointer = e.pointerType;
    };
    const onFolderTap = (e: MouseEvent) => {
      if (lastPointer === 'mouse') return;
      const c = (e.target as Element).closest?.<HTMLElement>('.hit.folder[data-case]');
      if (!c) return;
      e.stopPropagation(); // the page-wide handler would open the case right away
      const id = c.dataset.case!;
      setOpen(id);
      clearTimeout(caseTimer);
      caseTimer = window.setTimeout(() => openCase(id), reduce ? 0 : 520);
    };
    const caseDialogs = Array.from(document.querySelectorAll<HTMLDialogElement>('dialog.case'));
    const onCaseClose = () => setOpen('');
    stage.addEventListener('pointerdown', onPointerKind, { capture: true });
    stage.addEventListener('click', onFolderTap, { capture: true });
    caseDialogs.forEach((d) => d.addEventListener('close', onCaseClose));

    /* the desk toys: the duck squeaks, the mouse clicks, the keyboard types a line in a little terminal */
    const term = stage.querySelector<HTMLElement>('.term');
    let typing = 0;
    const replay = (el: Element, cls: string) => {
      el.classList.remove(cls);
      void (el as HTMLElement).offsetWidth;
      el.classList.add(cls);
    };
    const typeLine = () => {
      if (!term || typing) return;
      const [cmd, out] = terminal[Math.floor(Math.random() * terminal.length)];
      const b = term.querySelector('b')!,
        sp = term.querySelector('span')!;
      b.textContent = '';
      sp.textContent = '';
      term.classList.add('on');
      let i = 0;
      const step = () => {
        if (i < cmd.length) {
          b.textContent = cmd.slice(0, ++i);
          if (cmd[i - 1] !== ' ') playSfx('key');
          typing = window.setTimeout(step, 55 + Math.random() * 45);
          return;
        }
        typing = window.setTimeout(() => {
          sp.textContent = out;
          typing = window.setTimeout(() => {
            term.classList.remove('on');
            typing = 0;
          }, 2600);
        }, 350);
      };
      step();
    };
    const onToy = (e: MouseEvent) => {
      const el = e.target as Element;
      const duck = el.closest('.toy.duck');
      if (duck) {
        replay(duck, 'boing');
        playSfx('squeak');
        return;
      }
      const mouseToy = el.closest('.toy.mouse');
      if (mouseToy) {
        replay(mouseToy, 'press');
        playSfx('click');
        return;
      }
      if (el.closest('.hit.keyboard')) typeLine();
    };
    stage.addEventListener('click', onToy);

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

    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          load('day');
          if (forcedNight()) load('daynight');
          if (!running) {
            running = true;
            frame();
          }
        } else if (running) {
          running = false;
          cancelAnimationFrame(raf);
          showDock(false);
        }
      },
      { rootMargin: '50% 0px' },
    );
    io.observe(roomSec);
    return () => {
      running = false;
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      removeEventListener('load', onPageLoad);
      roomSec.removeEventListener('pointerdown', onSwipeStart);
      removeEventListener('pointermove', onSwipeMove);
      removeEventListener('pointerup', onSwipeEnd);
      removeEventListener('pointercancel', onSwipeEnd);
      removeEventListener('scroll', onScroll);
      stage.removeEventListener('click', onStageClick);
      stage.removeEventListener('click', onToy);
      clearTimeout(typing);
      stage.removeEventListener('pointerover', onFolderOver);
      stage.removeEventListener('focusin', onFolderOver);
      stage.removeEventListener('pointerleave', onFolderLeave);
      stage.removeEventListener('pointerdown', onPointerKind, { capture: true });
      stage.removeEventListener('click', onFolderTap, { capture: true });
      caseDialogs.forEach((d) => d.removeEventListener('close', onCaseClose));
      clearTimeout(caseTimer);
      clearTimeout(fxIdle);
      document.removeEventListener('click', onPawGreet);
      clip?.removeEventListener('timeupdate', onClipTime);
      clip?.removeEventListener('loadedmetadata', onClipTime);
      paw?.removeEventListener('animationend', onPawEnd);
      clearTimeout(miaoTimer);
    };
  }, [cat, terminal]);

  const goTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
  };

  return (
    <section className="room" id="stanza" aria-label={label} ref={ref}>
      {children}
      <nav className="room-dock" aria-label={dock.label} ref={dockRef}>
        {DOCK.map((k) => (
          <button key={k} type="button" data-dock={k} onClick={() => goTo(dock.targets[k].id)}>
            {dock.targets[k].text}
          </button>
        ))}
      </nav>
    </section>
  );
}

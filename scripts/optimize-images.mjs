/*
 * Makes the light versions of the heavy pictures, next to the originals (which stay as the fallback).
 *   npm run images            (everything)
 *   npm run images -- --textures   (only the print textures)
 * - room scenes (2688 × 1520): AVIF + WebP at 1344, 2016 and 2688 px wide  →  scenes/<name>-<w>.avif|webp
 * - felt Mel (still and yawn) and Calì's paw: AVIF + WebP at their own size  →  <name>.avif|webp
 * - print textures: the paper grain, the paper fibres and the riso ink masks, pre-rendered as small tiles
 *   (the same noise the SVG filters computed in the browser, computed once here)  →  print/*.webp
 * Re-run it after replacing any of these pictures. Uses sharp (dev dependency).
 */
import sharp from 'sharp';
import { existsSync } from 'node:fs';
import { mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { turbulence } from './turbulence.mjs';

const ASSETS = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'public', 'assets');
const SCENES = ['day', 'day-night', 'desk', 'night'];
const SCENE_WIDTHS = [1344, 2016, 2688];

async function variants(src, outBase, width, { avif, webp }) {
  const img = () => (width ? sharp(src).resize({ width, withoutEnlargement: true }) : sharp(src));
  await img().avif({ quality: avif, effort: 6, chromaSubsampling: '4:4:4' }).toFile(`${outBase}.avif`);
  await img().webp({ quality: webp, effort: 6, alphaQuality: 90 }).toFile(`${outBase}.webp`);
  console.log('  ', path.relative(ASSETS, outBase) + '.{avif,webp}');
}

async function main() {
  if (process.argv.includes('--textures')) return textures(path.join(ASSETS, 'print'));
  console.log('scenes');
  for (const name of SCENES) {
    for (const w of SCENE_WIDTHS) {
      await variants(path.join(ASSETS, 'scenes', `${name}.jpg`), path.join(ASSETS, 'scenes', `${name}-${w}`), w, { avif: 68, webp: 80 });
    }
  }
  console.log('felt Mel and the paw');
  for (const f of ['mel-felt', 'mel-felt-yawn']) await variants(path.join(ASSETS, `${f}.png`), path.join(ASSETS, f), 0, { avif: 72, webp: 86 });
  await variants(path.join(ASSETS, 'scenes', 'desk-paw.png'), path.join(ASSETS, 'scenes', 'desk-paw'), 0, { avif: 72, webp: 86 });

  console.log('print textures');
  await textures(path.join(ASSETS, 'print'));
}

const toSRGB = (c) => (c <= 0.0031308 ? 12.92 * c : 1.055 * Math.pow(c, 1 / 2.4) - 0.055);
const clamp = (x) => Math.min(1, Math.max(0, x));

/*
 * The tiles are drawn at 1 px per CSS px (the noise is about one CSS pixel fine, as the SVG filters drew it)
 * and saved as WebP. Each follows its SVG filter, with stitched edges so it tiles seamlessly.
 */
const save = (buf, px, file, opts) =>
  sharp(buf, { raw: { width: px, height: px, channels: 4 } }).webp(opts).toFile(file).then(() => console.log('   print/' + path.basename(file)));

async function textures(dir) {
  if (!existsSync(dir)) await mkdir(dir);
  const S = 1;
  /* grain: fractal noise .9, 2 octaves, desaturated, in linearRGB (the old full-screen <svg class="grain">).
     The noise had colour c and alpha a; it is flattened into an opaque grey that gives the same result
     with the same blend: multiply by day (1 - a(1 - c)), screen at night (a·c). */
  {
    const size = 256, px = size * S;
    const day = Buffer.alloc(px * px * 4), night = Buffer.alloc(px * px * 4);
    for (let y = 0; y < px; y++)
      for (let x = 0; x < px; x++) {
        const [r, g, b, a0] = turbulence({ x: x / S, y: y / S, baseFrequency: [0.9, 0.9], numOctaves: 2, seed: 0, fractal: true, stitch: [size, size] });
        const c = clamp(toSRGB(clamp(0.2126 * r + 0.7152 * g + 0.0722 * b))), a = clamp(a0);
        const i = (y * px + x) * 4;
        day[i] = day[i + 1] = day[i + 2] = Math.round((1 - a * (1 - c)) * 255);
        night[i] = night[i + 1] = night[i + 2] = Math.round(a * c * 255);
        day[i + 3] = night[i + 3] = 255;
      }
    await save(day, px, path.join(dir, 'grain-day.webp'), { quality: 80 });
    await save(night, px, path.join(dir, 'grain-night.webp'), { quality: 80 });
  }
  /* paper fibres: long soft fibres + fine mottling, as a brownish multiply layer (#paper-fibre) */
  {
    const size = 512, px = size * S;
    const out = Buffer.alloc(px * px * 4);
    for (let y = 0; y < px; y++)
      for (let x = 0; x < px; x++) {
        const p = { x: x / S, y: y / S, fractal: true, stitch: [size, size] };
        const fib = turbulence({ ...p, baseFrequency: [0.03, 0.16], numOctaves: 3, seed: 21 });
        const fine = turbulence({ ...p, baseFrequency: [0.6, 0.6], numOctaves: 1, seed: 4 });
        const mixR = clamp(0.4 * fib[0] + 0.6 * fine[0]);
        /* brown (.55, .45, .33) with alpha a, flattened to an opaque tile for the same multiply: 1 - a(1 - colour) */
        const a = clamp(-2.6 * mixR + 1.42), i = (y * px + x) * 4;
        out[i] = Math.round((1 - a * (1 - 0.55)) * 255);
        out[i + 1] = Math.round((1 - a * (1 - 0.45)) * 255);
        out[i + 2] = Math.round((1 - a * (1 - 0.33)) * 255);
        out[i + 3] = 255;
      }
    await save(out, px, path.join(dir, 'paper.webp'), { quality: 70 });
  }
  /* riso ink mask: grainy coverage with soft blotches (#riso), as alpha. White where the ink prints. */
  {
    const size = 512, px = size * S;
    const out = Buffer.alloc(px * px * 4);
    for (let y = 0; y < px; y++)
      for (let x = 0; x < px; x++) {
        const p = { x: x / S, y: y / S, fractal: true, stitch: [size, size] };
        const grain = turbulence({ ...p, baseFrequency: [0.9, 0.9], numOctaves: 2, seed: 8 })[0];
        const blotch = turbulence({ ...p, baseFrequency: [0.02, 0.02], numOctaves: 2, seed: 5 })[0];
        const mix = clamp(grain + 0.15 * blotch - 0.075);
        const i = (y * px + x) * 4;
        out[i] = out[i + 1] = out[i + 2] = 255;
        out[i + 3] = Math.round(clamp(3.4 * mix - 0.12) * 255);
      }
    await save(out, px, path.join(dir, 'riso-mask.webp'), { quality: 80, alphaQuality: 70 });
  }
  /* riso-soft mask: the second (pink) plate, sparser specks (#riso-soft) */
  {
    const size = 256, px = size * S;
    const out = Buffer.alloc(px * px * 4);
    for (let y = 0; y < px; y++)
      for (let x = 0; x < px; x++) {
        const g = turbulence({ x: x / S, y: y / S, baseFrequency: [0.8, 0.8], numOctaves: 2, seed: 17, fractal: true, stitch: [size, size] })[0];
        const i = (y * px + x) * 4;
        out[i] = out[i + 1] = out[i + 2] = 255;
        out[i + 3] = Math.round(clamp(3.2 * g - 0.6) * 255);
      }
    await save(out, px, path.join(dir, 'riso-soft-mask.webp'), { quality: 80, alphaQuality: 70 });
  }
}

await main();

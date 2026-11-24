/*
 * Puts the small "© c.lab studio" mark inside the case pictures and the case videos (bottom right corner),
 * so it travels with the file: saved, screenshotted or screen-recorded, the picture keeps the studio's name.
 *   node scripts/watermark.mjs
 *   WATERMARK_KEY=... python3 scripts/invisible-mark.py mark     (then the invisible mark on the pictures)
 * It always starts from the clean originals kept in git at ORIGINALS (the commit before the marks), so running it
 * again never stacks two marks. After adding a NEW picture or video: commit it clean first, set ORIGINALS to that
 * commit, then run this. Needs sharp (dev dependency), ffmpeg, and the Space Mono Bold font installed for the system
 * (private/cv/fonts/spacemono-700.woff2 converted to .ttf).
 */
import sharp from 'sharp';
import { execFileSync } from 'node:child_process';
import { mkdtempSync, readFileSync, readdirSync, rmSync, writeFileSync, statSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const ORIGINALS = '414654fc3de51101022ba145c8a59006462d8cc7';
const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const CASES = 'public/assets/cases';
const VIDEOS = 'public/assets/videos';

const original = (rel) => execFileSync('git', ['show', `${ORIGINALS}:${rel}`], { cwd: ROOT, maxBuffer: 1 << 28 });

/* the mark, drawn for a picture `w` × `h`: dark on a light corner, white on a dark one, with a soft opposite edge */
function markSvg(w, h, light) {
  const [ink, edge] = light ? ['#16130f', '#fff'] : ['#fff', '#16130f'];
  const size = Math.max(13, Math.round(w * 0.0145));
  const pad = Math.round(size * 1.1);
  return Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}">
  <defs><filter id="s" x="-20%" y="-50%" width="140%" height="200%"><feDropShadow dx="0" dy="${size * 0.06}" stdDeviation="${size * 0.14}" flood-color="${edge}" flood-opacity=".6"/></filter></defs>
  <text x="${w - pad}" y="${h - pad}" text-anchor="end" font-family="Space Mono" font-weight="700" font-size="${size}" letter-spacing="${size * 0.04}"
    fill="${ink}" fill-opacity="${light ? '.62' : '.86'}" filter="url(#s)"><tspan font-family="DejaVu Sans" font-weight="400">©</tspan> c.lab studio</text>
</svg>`);
}

/* is the bottom right corner (where the mark goes) light? */
async function lightCorner(input, w, h) {
  const box = { left: Math.round(w * 0.7), top: Math.round(h * 0.88), width: Math.round(w * 0.3), height: Math.round(h * 0.12) };
  const { channels } = await sharp(input).extract(box).stats();
  const [r, g, b] = channels.map((c) => c.mean);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b > 150;
}

async function picture(rel) {
  const src = original(rel);
  const { width, height } = await sharp(src).metadata();
  await sharp(src).composite([{ input: markSvg(width, height, await lightCorner(src, width, height)) }]).jpeg({ quality: 86, mozjpeg: true }).toFile(path.join(ROOT, rel));
  console.log('  ', rel);
}

async function video(rel, tmp) {
  const src = path.join(tmp, 'in.mp4');
  writeFileSync(src, original(rel));
  const [w, h] = execFileSync('ffprobe', ['-v', 'error', '-select_streams', 'v:0', '-show_entries', 'stream=width,height', '-of', 'csv=p=0', src]).toString().trim().split(',').map(Number);
  /* the corner's colour, from a frame a few seconds in */
  const frame = path.join(tmp, 'frame.png');
  execFileSync('ffmpeg', ['-v', 'error', '-y', '-ss', '3', '-i', src, '-frames:v', '1', frame]);
  const mark = path.join(tmp, 'mark.png');
  await sharp(markSvg(w, h, await lightCorner(readFileSync(frame), w, h))).png().toFile(mark); // a buffer: sharp caches files by path
  execFileSync('ffmpeg', ['-v', 'error', '-y', '-i', src, '-i', mark, '-filter_complex', '[0:v][1:v]overlay=0:0:format=auto,format=yuv420p',
    '-c:v', 'libx264', '-crf', '23', '-preset', 'slow', '-c:a', 'copy', '-movflags', '+faststart', path.join(ROOT, rel)]);
  console.log('  ', rel, Math.round(statSync(path.join(ROOT, rel)).size / 1024) + ' KB');
}

async function main() {
  const walk = (dir) => readdirSync(path.join(ROOT, dir), { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? walk(`${dir}/${e.name}`) : [`${dir}/${e.name}`]));
  console.log('case pictures');
  for (const rel of walk(CASES).filter((f) => f.endsWith('.jpg'))) await picture(rel);
  /* the product films shown in the cases, and their posters */
  const films = readdirSync(path.join(ROOT, VIDEOS)).filter((f) => /-product(-en)?\.(mp4|jpg)$/.test(f)).map((f) => `${VIDEOS}/${f}`);
  console.log('posters');
  for (const rel of films.filter((f) => f.endsWith('.jpg'))) await picture(rel);
  console.log('videos');
  const tmp = mkdtempSync(path.join(tmpdir(), 'mark-'));
  try {
    for (const rel of films.filter((f) => f.endsWith('.mp4'))) await video(rel, tmp);
  } finally {
    rmSync(tmp, { recursive: true, force: true });
  }
}

main().catch((e) => { console.error(e); process.exit(1); });

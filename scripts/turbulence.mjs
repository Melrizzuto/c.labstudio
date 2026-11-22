/*
 * feTurbulence, as specified in SVG 1.1 (the reference implementation, ported to JavaScript),
 * so the print textures are the same kind of noise the browser drew with the SVG filters.
 * turbulence({ x, y, baseFrequency: [fx, fy], numOctaves, seed, fractal, stitch: [w, h] }) → [r, g, b, a] in 0..1
 */
const BSize = 0x100, BM = 0xff, PerlinN = 0x1000;
const RAND_m = 2147483647, RAND_a = 16807, RAND_q = 127773, RAND_r = 2836;
const tables = new Map();

function setupSeed(s) {
  if (s <= 0) s = -(s % (RAND_m - 1)) + 1;
  if (s > RAND_m - 1) s = RAND_m - 1;
  return s;
}
function random(s) {
  let r = RAND_a * (s % RAND_q) - RAND_r * Math.floor(s / RAND_q);
  if (r <= 0) r += RAND_m;
  return r;
}
function init(seed) {
  const lattice = new Int32Array(BSize + BSize + 2);
  const grad = [0, 1, 2, 3].map(() => Array.from({ length: BSize + BSize + 2 }, () => [0, 0]));
  let s = setupSeed(seed), i, j, k;
  for (k = 0; k < 4; k++) {
    for (i = 0; i < BSize; i++) {
      lattice[i] = i;
      for (j = 0; j < 2; j++) grad[k][i][j] = (((s = random(s)) % (BSize + BSize)) - BSize) / BSize;
      const n = Math.sqrt(grad[k][i][0] ** 2 + grad[k][i][1] ** 2);
      grad[k][i][0] /= n;
      grad[k][i][1] /= n;
    }
  }
  while (--i) {
    k = lattice[i];
    lattice[i] = lattice[(j = (s = random(s)) % BSize)];
    lattice[j] = k;
  }
  for (i = 0; i < BSize + 2; i++) {
    lattice[BSize + i] = lattice[i];
    for (k = 0; k < 4; k++) for (j = 0; j < 2; j++) grad[k][BSize + i][j] = grad[k][i][j];
  }
  return { lattice, grad };
}
const sCurve = (t) => t * t * (3 - 2 * t);
const lerp = (t, a, b) => a + t * (b - a);

function noise2(T, ch, vx, vy, st) {
  let t = vx + PerlinN;
  let bx0 = Math.trunc(t) & BM, bx1 = (bx0 + 1) & BM;
  const rx0 = t - Math.trunc(t), rx1 = rx0 - 1;
  t = vy + PerlinN;
  let by0 = Math.trunc(t) & BM, by1 = (by0 + 1) & BM;
  const ry0 = t - Math.trunc(t), ry1 = ry0 - 1;
  if (st) {
    if (bx0 >= st.wrapX) bx0 -= st.width;
    if (bx1 >= st.wrapX) bx1 -= st.width;
    if (by0 >= st.wrapY) by0 -= st.height;
    if (by1 >= st.wrapY) by1 -= st.height;
  }
  bx0 &= BM; bx1 &= BM; by0 &= BM; by1 &= BM;
  const L = T.lattice, G = T.grad[ch];
  const i = L[bx0], j = L[bx1];
  const b00 = L[i + by0], b10 = L[j + by0], b01 = L[i + by1], b11 = L[j + by1];
  const sx = sCurve(rx0), sy = sCurve(ry0);
  let q = G[b00], u = rx0 * q[0] + ry0 * q[1];
  q = G[b10];
  let v = rx1 * q[0] + ry0 * q[1];
  const a = lerp(sx, u, v);
  q = G[b01]; u = rx0 * q[0] + ry1 * q[1];
  q = G[b11]; v = rx1 * q[0] + ry1 * q[1];
  const b = lerp(sx, u, v);
  return lerp(sy, a, b);
}

export function turbulence({ x, y, baseFrequency: [fx0, fy0], numOctaves, seed, fractal, stitch }) {
  let T = tables.get(seed);
  if (!T) tables.set(seed, (T = init(seed)));
  let fx = fx0, fy = fy0;
  const out = [0, 0, 0, 0];
  for (let ch = 0; ch < 4; ch++) {
    let st = null;
    fx = fx0; fy = fy0;
    if (stitch) {
      const [w, h] = stitch;
      if (fx !== 0) { const lo = Math.floor(w * fx) / w, hi = Math.ceil(w * fx) / w; fx = fx / lo < hi / fx ? lo : hi; }
      if (fy !== 0) { const lo = Math.floor(h * fy) / h, hi = Math.ceil(h * fy) / h; fy = fy / lo < hi / fy ? lo : hi; }
      const width = Math.trunc(w * fx + 0.5), height = Math.trunc(h * fy + 0.5);
      st = { width, height, wrapX: Math.trunc(PerlinN + width), wrapY: Math.trunc(PerlinN + height) };
    }
    let sum = 0, vx = x * fx, vy = y * fy, ratio = 1;
    for (let o = 0; o < numOctaves; o++) {
      const n = noise2(T, ch, vx, vy, st);
      sum += (fractal ? n : Math.abs(n)) / ratio;
      vx *= 2; vy *= 2; ratio *= 2;
      if (st) { st.width *= 2; st.wrapX = 2 * st.wrapX - PerlinN; st.height *= 2; st.wrapY = 2 * st.wrapY - PerlinN; }
    }
    out[ch] = fractal ? (sum + 1) / 2 : sum;
  }
  return out;
}

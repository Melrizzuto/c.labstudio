#!/usr/bin/env python3
"""
The invisible mark ("come per l'AI"): a faint pattern hidden in the brightness of the case pictures, too weak to see,
repeated in tiles over the whole picture. It survives cropping (any piece of a few tiles still carries it),
screenshots at another size and JPEG recompression, and only the secret key can find it.

  WATERMARK_KEY=... python3 scripts/invisible-mark.py mark            # after `node scripts/watermark.mjs`
  WATERMARK_KEY=... python3 scripts/invisible-mark.py check foto.jpg  # is this one of ours?

Run `mark` once, right after scripts/watermark.mjs (which rewrites the pictures from the clean originals):
running it twice adds the pattern twice. The key is NOT in the repository: without it nobody can find
(or aim at removing) the pattern. Needs numpy and Pillow.
"""
import hashlib
import os
import sys
from pathlib import Path

import numpy as np
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
TARGETS = [ROOT / 'public/assets/cases', ROOT / 'public/assets/videos']
CELL, CELLS = 8, 16          # the pattern: 16 × 16 cells of 8 px, so a tile of 128 px
T = CELL * CELLS
STRENGTH = 2.2               # brightness levels (out of 255) on flat areas; more where the picture is busy
THRESHOLD = 7.0              # a score above this: ours (pictures without the mark score about 4 to 5)
LIKELY = 6.0                 # between the two: very probably ours (a small or heavily cut piece)


def key() -> bytes:
    k = os.environ.get('WATERMARK_KEY', '')
    if len(k) < 16:
        sys.exit('WATERMARK_KEY is missing (the secret key, at least 16 characters).')
    return k.encode()


def pattern() -> np.ndarray:
    seed = int.from_bytes(hashlib.sha256(key()).digest()[:8], 'big')
    cells = np.random.default_rng(seed).choice([-1.0, 1.0], size=(CELLS, CELLS))
    p = np.kron(cells, np.ones((CELL, CELL)))
    # soften the cell edges a little (cyclic, so the tiles join seamlessly)
    p = sum(np.roll(np.roll(p, dy, 0), dx, 1) for dy in (-1, 0, 1) for dx in (-1, 0, 1)) / 9
    return (p - p.mean()) / p.std()


def blur(a: np.ndarray, r: int) -> np.ndarray:
    """box blur of radius r (summed-area table), edges clamped"""
    pad = np.pad(a, r + 1, mode='edge')
    s = pad.cumsum(0).cumsum(1)
    n = 2 * r + 1
    out = s[n:, n:] - s[:-n, n:] - s[n:, :-n] + s[:-n, :-n]
    return out[: a.shape[0], : a.shape[1]] / (n * n)


def luma(img: Image.Image) -> np.ndarray:
    return np.asarray(img.convert('YCbCr'), dtype=np.float64)[..., 0]


def mark(path: Path, p: np.ndarray) -> None:
    img = Image.open(path).convert('RGB')
    ycc = np.asarray(img.convert('YCbCr'), dtype=np.float64).copy()
    y = ycc[..., 0]
    h, w = y.shape
    tiled = np.tile(p, (h // T + 1, w // T + 1))[:h, :w]
    # stronger where the picture is busy (it hides there), weaker on flat colour
    local = np.sqrt(np.maximum(blur(y * y, 4) - blur(y, 4) ** 2, 0))
    amount = STRENGTH * np.clip(local / 8, 0.95, 2.0)
    ycc[..., 0] = np.clip(y + amount * tiled, 0, 255)
    out = Image.fromarray(ycc.round().astype(np.uint8), 'YCbCr').convert('RGB')
    out.save(path, 'JPEG', quality=86, optimize=True, progressive=True, subsampling=2)


def score_at(y: np.ndarray, scale: float, P: np.ndarray) -> float:
    """fold the picture, brought back to the pattern's size, into one tile and look for the pattern in it"""
    h, w = y.shape
    nh, nw = round(h / scale), round(w / scale)
    if nh < 2 * T or nw < 2 * T:
        return 0.0
    r = np.asarray(Image.fromarray(y.astype(np.float32), 'F').resize((nw, nh), Image.BILINEAR), dtype=np.float64)
    r = r - blur(r, 6)                                     # keep the fine texture, drop the picture itself
    r = np.clip(r, -12, 12)                                # sharp edges of the content would drown the pattern
    r = r[: nh // T * T, : nw // T * T]
    folded = r.reshape(nh // T, T, nw // T, T).mean(axis=(0, 2))
    c = np.real(np.fft.ifft2(np.fft.fft2(folded) * np.conj(P)))
    return float((c.max() - c.mean()) / (c.std() + 1e-9))


def check(path: Path, p: np.ndarray) -> float:
    y = luma(Image.open(path))
    P = np.fft.fft2(p)
    # the picture may have been shrunk or enlarged (a phone screenshot, a resize): try the sizes, then refine
    coarse = np.exp(np.arange(np.log(0.35), np.log(3.0), 0.004))
    scores = [score_at(y, s, P) for s in coarse]
    best = coarse[int(np.argmax(scores))]
    fine = best * np.exp(np.arange(-0.005, 0.0051, 0.0005))
    return max(max(scores), *(score_at(y, s, P) for s in fine))


def main() -> None:
    if len(sys.argv) < 2 or sys.argv[1] not in ('mark', 'check'):
        sys.exit(__doc__)
    p = pattern()
    if sys.argv[1] == 'mark':
        files = [f for d in TARGETS for f in sorted(d.rglob('*.jpg')) if d.name != 'videos' or '-product' in f.name]
        for f in files:
            mark(f, p)
            print('  ', f.relative_to(ROOT))
        return
    for name in sys.argv[2:]:
        s = check(Path(name), p)
        verdict = '→ c.lab studio' if s >= THRESHOLD else '→ molto probabilmente c.lab studio (pezzo piccolo)' if s >= LIKELY else '→ nessun marchio trovato'
        print(f'{name}: {s:.1f}  {verdict}')


if __name__ == '__main__':
    main()

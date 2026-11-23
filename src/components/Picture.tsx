import type { ImgHTMLAttributes } from 'react';

type Props = Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'srcSet'> & {
  /** fallback (JPG or PNG), for browsers without AVIF and WebP */
  src: string;
  /** AVIF and WebP candidates, in srcset syntax */
  avif: string;
  webp: string;
  /** don't download until activatePicture() (lib/pictures.ts) */
  defer?: boolean;
};

/*
 * A picture in AVIF, then WebP, then the original file. The <picture> box has display:contents
 * (globals.css), so the <img> lays out exactly as it did on its own.
 */
export function Picture({ src, avif, webp, sizes, defer, ...img }: Props) {
  const set = (v: string) => (defer ? { 'data-srcset': v } : { srcSet: v });
  return (
    <picture>
      <source type="image/avif" sizes={sizes} {...set(avif)} />
      <source type="image/webp" sizes={sizes} {...set(webp)} />
      <img {...img} sizes={sizes} {...(defer ? { 'data-src': src } : { src })} />
    </picture>
  );
}

/*
 * The scene pictures are cached for a week under their names: bump this when a scene picture changes,
 * so browsers fetch the new one.
 */
export const SCENE_VERSION = '21';
/** a scene file, with the version that busts the browser cache */
export const sceneSrc = (file: string) => `/assets/scenes/${file}?v=${SCENE_VERSION}`;

/** srcset for the room scenes, made by scripts/optimize-images.mjs */
export const sceneSet = (name: string, ext: 'avif' | 'webp') =>
  [1344, 2016, 2688].map((w) => `${sceneSrc(`${name}-${w}.${ext}`)} ${w}w`).join(', ');

/*
 * The scenes are as wide as the screen or as tall as it (whichever covers it) and the camera zooms in about 2×,
 * so ask for twice that width. Phones stop at the 2016 px picture (the crayon grain hides the difference):
 * 672 px × 3 and 1008 px × 2 both land on it, plain screens get the 1344.
 */
export const SCENE_SIZES =
  '(max-width: 819.98px) and (min-resolution: 2.5dppx) 672px, (max-width: 819.98px) 1008px, (max-aspect-ratio: 2688/1520) 354vh, 200vw';

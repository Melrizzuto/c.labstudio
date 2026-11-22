/*
 * Deferred pictures: <Picture defer> renders its sources with data-srcset and its <img> with data-src,
 * so nothing is downloaded until activatePicture() copies them into place.
 */
export function activatePicture(img: HTMLImageElement): void {
  const src = img.dataset.src;
  if (!src) return;
  img.parentElement?.querySelectorAll<HTMLSourceElement>('source[data-srcset]').forEach((s) => {
    s.srcset = s.dataset.srcset!;
    delete s.dataset.srcset;
  });
  img.src = src;
  delete img.dataset.src;
}

/** Resolves once the picture can be shown (at once if it already is). */
export function pictureReady(img: HTMLImageElement): Promise<void> {
  activatePicture(img);
  if (img.complete && img.naturalWidth) return Promise.resolve();
  return img.decode().catch(() => {});
}

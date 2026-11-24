/* Opening and closing the case-study dialogs (client side only). */

const reduceMotion = () => matchMedia('(prefers-reduced-motion: reduce)').matches;

export function openCase(id: string): void {
  document.querySelectorAll<HTMLDialogElement>('dialog.case[open]').forEach((d) => d.close());
  const d = document.getElementById(id) as HTMLDialogElement | null;
  if (!d) return;
  if (d.showModal) d.showModal();
  else d.setAttribute('open', '');
  d.scrollTop = 0;
  window.dispatchEvent(new CustomEvent('clab:case-opened', { detail: id }));
  const v = d.querySelector<HTMLVideoElement>('.demo video');
  /* the poster is fetched only now, not with the page */
  if (v?.dataset.poster && !v.getAttribute('poster')) v.poster = v.dataset.poster;
  if (v && !reduceMotion()) {
    v.preload = 'auto';
    v.play()?.catch(() => {});
  }
}

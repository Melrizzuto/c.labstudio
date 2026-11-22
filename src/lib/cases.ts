/* Opening and closing the case-study dialogs (client side only). */

const reduceMotion = () => matchMedia('(prefers-reduced-motion: reduce)').matches;

export function openCase(id: string): void {
  document.querySelectorAll<HTMLDialogElement>('dialog.case[open]').forEach((d) => d.close());
  const d = document.getElementById(id) as HTMLDialogElement | null;
  if (!d) return;
  if (d.showModal) d.showModal();
  else d.setAttribute('open', '');
  d.scrollTop = 0;
  const v = d.querySelector<HTMLVideoElement>('.demo video');
  if (v && !reduceMotion()) {
    v.preload = 'auto';
    v.play()?.catch(() => {});
  }
}

import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { HomePage } from '@/components/HomePage';
import { pageMetadata } from '@/lib/metadata';
import { parsePath, topSlugs, homePath } from '@/lib/routes';

/* A shareable address for a chapter of the room, or for the notebook: the same page, scrolled or opened there. */
const LOCALE = 'en' as const;
const target = (slug: string) => parsePath(`${homePath(LOCALE)}${slug}/`)?.target;

export const dynamicParams = false;
export function generateStaticParams() {
  return topSlugs(LOCALE).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const t = target((await params).slug);
  return t ? pageMetadata(LOCALE, t) : {};
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const t = target((await params).slug);
  if (!t) notFound();
  return <HomePage locale={LOCALE} target={t} />;
}

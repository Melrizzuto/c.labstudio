import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { HomePage } from '@/components/HomePage';
import { pageMetadata } from '@/lib/metadata';
import { CASE_SLUGS, parsePath, pathFor } from '@/lib/routes';
import type { CaseKey } from '@/content/cases';

/* A shareable address for one case study: the page with the desk in view and the case open. */
const LOCALE = 'it' as const;
const target = (slug: string) => parsePath(pathFor(LOCALE, { kind: 'section', id: 'progetti' }) + `${slug}/`)?.target;

export const dynamicParams = false;
export function generateStaticParams() {
  return (Object.keys(CASE_SLUGS) as CaseKey[]).map((k) => ({ slug: CASE_SLUGS[k] }));
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

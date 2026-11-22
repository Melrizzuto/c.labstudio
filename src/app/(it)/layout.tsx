import type { ReactNode } from 'react';
import { RootDocument } from '@/components/RootDocument';
import { buildMetadata } from '@/lib/metadata';

export { viewport } from '@/lib/metadata';
export const metadata = buildMetadata('it');

/* Root layout of the Italian site: <html lang="it">. */
export default function ItalianLayout({ children }: { children: ReactNode }) {
  return <RootDocument locale="it">{children}</RootDocument>;
}

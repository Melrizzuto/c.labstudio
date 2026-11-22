import type { ReactNode } from 'react';
import { RootDocument } from '@/components/RootDocument';
import { buildMetadata } from '@/lib/metadata';

export { viewport } from '@/lib/metadata';
export const metadata = buildMetadata('en');

/* Root layout of the English site: <html lang="en">. */
export default function EnglishLayout({ children }: { children: ReactNode }) {
  return <RootDocument locale="en">{children}</RootDocument>;
}

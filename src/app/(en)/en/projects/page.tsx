import { HomePage } from '@/components/HomePage';
import { pageMetadata } from '@/lib/metadata';

/* The projects chapter (the desk), as its own address. */
export const metadata = pageMetadata('en', { kind: 'section', id: 'progetti' });

export default function Page() {
  return <HomePage locale="en" target={{ kind: 'section', id: 'progetti' }} />;
}

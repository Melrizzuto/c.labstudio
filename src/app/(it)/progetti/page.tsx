import { HomePage } from '@/components/HomePage';
import { pageMetadata } from '@/lib/metadata';

/* The projects chapter (the desk), as its own address. */
export const metadata = pageMetadata('it', { kind: 'section', id: 'progetti' });

export default function Page() {
  return <HomePage locale="it" target={{ kind: 'section', id: 'progetti' }} />;
}

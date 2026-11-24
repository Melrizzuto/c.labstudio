import type { Metadata } from 'next';
import { OwnerNotes } from '@/components/OwnerNotes';

/* Mel's private page for the guestbook: not linked anywhere, not indexed, password on the server side. */
export const metadata: Metadata = {
  title: 'I feedback · area riservata',
  robots: { index: false, follow: false, nocache: true },
};

export default function OwnerPage() {
  return <OwnerNotes />;
}

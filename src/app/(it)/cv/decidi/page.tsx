import type { Metadata } from 'next';
import { CvDecide } from '@/components/CvDecide';

/* Mel's button in the request email lands here: approve or decline one CV request. */
export const metadata: Metadata = {
  title: 'Richiesta del CV · area riservata',
  robots: { index: false, follow: false, nocache: true },
  referrer: 'no-referrer',
};

export default function CvDecidePage() {
  return <CvDecide />;
}

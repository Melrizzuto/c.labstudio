import type { Metadata } from 'next';
import { CvRequest } from '@/components/CvRequest';

/* The CV is given on request: this page asks for it (the CV itself is behind a personal link, /cv/k/<key>/). */
export const metadata: Metadata = {
  title: 'Il mio CV · c.lab studio',
  description: 'Chiedi il CV di Melania Rizzuto: ti arriva per email un link personale, valido 7 giorni.',
  alternates: { canonical: '/cv/', languages: { it: '/cv/', en: '/en/cv/' } },
};

export default function CvPage() {
  return <CvRequest locale="it" />;
}

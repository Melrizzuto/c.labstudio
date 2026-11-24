import type { Metadata } from 'next';
import { CvRequest } from '@/components/CvRequest';

/* The CV is given on request: this page asks for it (the CV itself is behind a personal link, /cv/k/<key>/). */
export const metadata: Metadata = {
  title: 'My CV · c.lab studio',
  description: 'Ask for Melania Rizzuto’s CV: a personal link arrives by email, valid for 7 days.',
  alternates: { canonical: '/en/cv/', languages: { it: '/cv/', en: '/en/cv/' } },
};

export default function CvPage() {
  return <CvRequest locale="en" />;
}

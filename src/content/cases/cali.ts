import type { Locale } from '@/i18n/types';
import type { CaseCopy } from './types';

/* Case study "Calì": Italian and English side by side, so the two stay in sync. */
export const cali: Record<Locale, CaseCopy> = {
  it: {
    folder: "Badge di Calì",
    tarot: "0 · La Direttrice",
    title: "Calì",
    hitLabel: "Leggi la storia di Calì",
    tagline: "La vera direttrice di c.lab studio. È con me da quando ho deciso di andare via di casa per crearmi una storia tutta mia.",
    blocks: [
      {
        kind: "badge",
        photo: {
          src: "/assets/cali.jpg",
          alt: "Calì che dorme sul divano verde: gatta bianca con macchie nere e arancioni",
          width: 1200,
          height: 900,
        },
        facts: [
          { term: "Ruolo", detail: "Direttrice, e collega quando lavoro da casa" },
          { term: "Esperienza", detail: "10 anni: è una senior" },
          { term: "In studio da", detail: "Quando sono andata via di casa" },
          { term: "Compito", detail: "Stare sempre con me, per controllare come lavoro" },
        ],
        stamp: "Calì approved ✓",
      },
      {
        kind: "text",
        text: "Ha 10 anni ormai, è una senior. Vuole sempre stare con me: sulla testa mentre leggo, accanto alla tazza mentre lavoro, sul bracciolo la sera. Controlla come lavoro, e tutto quello che vedi qui è passato da lei.",
        marginTop: 44,
      },
    ],
    next: [{ label: "Torna alla stanza", close: true }],
  },
  en: {
    folder: "Calì's badge",
    tarot: "0 · The Boss",
    title: "Calì",
    hitLabel: "Read Calì's story",
    tagline: "The real boss of c.lab studio. She's been with me since I decided to leave home and start a story of my own.",
    blocks: [
      {
        kind: "badge",
        photo: {
          src: "/assets/cali.jpg",
          alt: "Calì asleep on the green sofa: a white cat with black and orange patches",
          width: 1200,
          height: 900,
        },
        facts: [
          { term: "Role", detail: "Boss, and coworker when I work from home" },
          { term: "Experience", detail: "10 years: a senior" },
          { term: "With me since", detail: "I left home" },
          { term: "Job", detail: "Staying with me at all times, to check how I work" },
        ],
        stamp: "Calì approved ✓",
      },
      {
        kind: "text",
        text: "She's 10 now, a proper senior. She always wants to be with me: on my head while I read, next to the cup while I work, on the armrest in the evening. She checks how I work, and everything you see here has been past her.",
        marginTop: 44,
      },
    ],
    next: [{ label: "Back to the room", close: true }],
  },
};

import type { Locale } from '@/i18n/types';
import type { CaseCopy } from './types';

/* Case study "NewsQuest": Italian and English side by side, so the two stay in sync. */
export const newsquest: Record<Locale, CaseCopy> = {
  it: {
    folder: "Cartella a stelle",
    tarot: "V · La Cronista",
    title: "NewsQuest",
    hitLabel: "Cartella viola a stelle: NewsQuest",
    blurb: "Le notizie, di swipe in swipe: verificate e chiare, per chi ha poco tempo.",
    owner: "Concept di un project work accademico",
    tagline: "Le notizie, di swipe in swipe. Un'app che raccoglie, verifica e rende chiare le notizie per chi ha vent'anni e pochissimo tempo.",
    blocks: [
      { kind: "demo", src: "/assets/videos/newsquest.mp4", poster: "/assets/videos/newsquest.jpg", label: "Video demo di NewsQuest" },
      {
        kind: "figure",
        figure: {
          img: { src: "/assets/cases/newsquest/key-screen.jpg", alt: "Le schermate principali dell'app NewsQuest", width: 1600, height: 900 },
          caption: "Le schermate chiave: la notizia breve, gli insight, la sfida lampo, gli obiettivi del giorno.",
        },
      },
      {
        kind: "facts",
        items: [
          { label: "Cos'è", value: "Un project work di gruppo: dal brief al prototipo cliccabile" },
          { label: "Il mio ruolo", value: "Junior Product Engineer, in un gruppo di cinque tra graphic, UX/UI, set e web design" },
          { label: "Per chi", value: "La Gen Z, tra i 19 e i 29 anni" },
        ],
      },
      { kind: "heading", text: "Il brief" },
      {
        kind: "text",
        text: "NewsQuest mette insieme fonti affidabili e indipendenti in un'unica app: notizie brevi e verificabili, long read interattive, percorsi per argomento, un'AI controllata e un sistema di progressi e badge. L'idea è trasformare l'informazione in qualcosa di modulare, visivo e coinvolgente, fatto per come leggiamo oggi.",
      },
      {
        kind: "figure",
        figure: {
          img: {
            src: "/assets/cases/newsquest/brief.jpg",
            alt: "Il brief di NewsQuest e i punti chiave: AI, smartphone, Gen Z, long read, fact checking, gamification, notizie aggiornate",
            width: 1600,
            height: 900,
          },
          caption: "«Wow, sembra figo, cosa fa?» Il brief e i punti chiave.",
        },
      },
      { kind: "heading", text: "Discovery" },
      {
        kind: "text",
        text: "Il nostro pubblico è curioso, attento e vuole farsi un'opinione solida, niente fake news. Il problema è che va sempre di corsa: ha bisogno di capire le notizie in fretta e bene. Lo abbiamo raccontato con tre personas e poi siamo andati a guardare chi fa già bene qualcosa: Spotify, Duolingo, Arc Search, Volv e TikTok, con punti di forza e di debolezza di ognuno.",
      },
      {
        kind: "pair",
        figures: [
          {
            img: { src: "/assets/cases/newsquest/personas.jpg", alt: "Le tre personas di NewsQuest", width: 1600, height: 900 },
            caption: "Le personas: tre ragazze tra i 22 e i 28 anni, curiose e sempre di corsa.",
          },
          {
            img: {
              src: "/assets/cases/newsquest/benchmark.jpg",
              alt: "Il benchmark su TikTok: punti di forza e di debolezza",
              width: 1600,
              height: 900,
            },
            caption: "Il benchmark, qui TikTok: linguaggio nativo per la Gen Z, ma poco spazio per approfondire.",
          },
        ],
      },
      { kind: "heading", text: "Prima su carta, poi su Figma" },
      {
        kind: "text",
        text: "Per prima cosa lo scheletro: i wireframe, senza colori né caratteri, solo la logica, la struttura e il ritmo della navigazione. Prima a mano, per far uscire le idee senza filtri, poi su Figma, dove sono diventati una struttura precisa e pronta per l'interfaccia.",
      },
      {
        kind: "pair",
        figures: [
          {
            img: { src: "/assets/cases/newsquest/wireframe-carta.jpg", alt: "I primi wireframe disegnati a mano", width: 1600, height: 900 },
            caption: "Si parte da un foglio e un pennarello.",
          },
          {
            img: { src: "/assets/cases/newsquest/wireframe.jpg", alt: "I wireframe in Figma", width: 1600, height: 900 },
            caption: "Poi i wireframe in Figma.",
          },
        ],
      },
      { kind: "heading", text: "Il design" },
      {
        kind: "text",
        text: "Moodboard, style tile e poi un piccolo sistema tutto nostro: viola e lime, Clash Display per i titoli e Poppins per il testo, e i componenti con tutti i loro stati.",
      },
      {
        kind: "figure",
        figure: {
          img: { src: "/assets/cases/newsquest/moodboard.jpg", alt: "La moodboard di NewsQuest", width: 1600, height: 900 },
          caption: "La moodboard.",
        },
      },
      {
        kind: "pair",
        figures: [
          {
            img: { src: "/assets/cases/newsquest/style-tile.jpg", alt: "Lo style tile: le notizie, di swipe in swipe", width: 1600, height: 900 },
            caption: "Lo style tile.",
          },
          {
            img: {
              src: "/assets/cases/newsquest/colori.jpg",
              alt: "La palette e i caratteri: Clash Display e Poppins",
              width: 1600,
              height: 900,
            },
            caption: "Colori e tipografia.",
          },
        ],
      },
      {
        kind: "figure",
        figure: {
          img: {
            src: "/assets/cases/newsquest/componenti.jpg",
            alt: "I bottoni primari, secondari e terziari con i loro stati",
            width: 1600,
            height: 900,
          },
          caption: "I componenti, stato per stato.",
        },
      },
      { kind: "heading", text: "L'app" },
      {
        kind: "text",
        text: "Il tono è incoraggiante ed empatico: accompagna senza far sentire nessuno perso, amichevole e un po' giocoso. Le microanimazioni fanno il resto: le sfide lampo, gli obiettivi del giorno, le mascotte che reagiscono.",
      },
      {
        kind: "pair",
        figures: [
          {
            img: {
              src: "/assets/cases/newsquest/tov.jpg",
              alt: "Il tone of voice: incoraggiante, empatico, amichevole, giocoso",
              width: 1600,
              height: 900,
            },
            caption: "Il tone of voice.",
          },
          {
            img: {
              src: "/assets/cases/newsquest/microanimazioni.jpg",
              alt: "Le microanimazioni: la sfida lampo e gli obiettivi",
              width: 1600,
              height: 900,
            },
            caption: "Le microanimazioni.",
          },
        ],
      },
      {
        kind: "tools",
        label: "Strumenti.",
        text: "Personas e benchmark per la discovery, carta e Figma per i wireframe, Figma per design system, schermate e prototipo.",
      },
    ],
    next: [{ label: "Apri Spotify Mood", open: "spotify" }, { label: "Torna alla scrivania", close: true }],
  },
  en: {
    folder: "Stars folder",
    tarot: "V · The Reporter",
    title: "NewsQuest",
    hitLabel: "Purple folder with stars: NewsQuest",
    blurb: "The news, one swipe at a time: checked and clear, for people short on time.",
    owner: "Concept from an academy project work",
    tagline: "The news, one swipe at a time. An app that gathers, checks and makes sense of the news for people in their twenties with very little time.",
    blocks: [
      { kind: "demo", src: "/assets/videos/newsquest-en.mp4", poster: "/assets/videos/newsquest-en.jpg", label: "NewsQuest demo video" },
      {
        kind: "figure",
        figure: {
          img: { src: "/assets/cases/newsquest/key-screen.jpg", alt: "The main screens of the NewsQuest app", width: 1600, height: 900 },
          caption: "The key screens: the short news story, the insights, the quick challenge, the daily goals.",
        },
      },
      {
        kind: "facts",
        items: [
          { label: "What it is", value: "A group project: from brief to clickable prototype" },
          { label: "My role", value: "Junior Product Engineer, in a group of five across graphic, UX/UI, set and web design" },
          { label: "Who it's for", value: "Gen Z, aged 19 to 29" },
        ],
      },
      { kind: "heading", text: "The brief" },
      {
        kind: "text",
        text: "NewsQuest brings reliable, independent sources together in one app: short, verifiable news, interactive long reads, topic paths, a supervised AI and a system of progress and badges. The idea is to turn news into something modular, visual and engaging, made for the way we read today.",
      },
      {
        kind: "figure",
        figure: {
          img: {
            src: "/assets/cases/newsquest/brief.jpg",
            alt: "The NewsQuest brief and key points: AI, smartphone, Gen Z, long read, fact checking, gamification, up-to-date news",
            width: 1600,
            height: 900,
          },
          caption: "“Wow, looks cool, what does it do?” The brief and the key points.",
        },
      },
      { kind: "heading", text: "Discovery" },
      {
        kind: "text",
        text: "Our audience is curious, sharp and wants to form a solid opinion, no fake news. The catch is they're always in a rush: they need to understand the news quickly and well. We captured them in three personas, then looked at who already does something well: Spotify, Duolingo, Arc Search, Volv and TikTok, with each one's strengths and weaknesses.",
      },
      {
        kind: "pair",
        figures: [
          {
            img: { src: "/assets/cases/newsquest/personas.jpg", alt: "The three NewsQuest personas", width: 1600, height: 900 },
            caption: "The personas: three young women aged 22 to 28, curious and always in a rush.",
          },
          {
            img: {
              src: "/assets/cases/newsquest/benchmark.jpg",
              alt: "The TikTok benchmark: strengths and weaknesses",
              width: 1600,
              height: 900,
            },
            caption: "The benchmark, here TikTok: Gen Z's native language, but little room to go deeper.",
          },
        ],
      },
      { kind: "heading", text: "Paper first, then Figma" },
      {
        kind: "text",
        text: "First, the skeleton: wireframes, no colors or fonts, just the logic, the structure and the rhythm of the navigation. By hand first, to get ideas out without filters, then in Figma, where they became a precise structure ready for the interface.",
      },
      {
        kind: "pair",
        figures: [
          {
            img: { src: "/assets/cases/newsquest/wireframe-carta.jpg", alt: "The first hand-drawn wireframes", width: 1600, height: 900 },
            caption: "It all starts with a sheet of paper and a marker.",
          },
          {
            img: { src: "/assets/cases/newsquest/wireframe.jpg", alt: "The wireframes in Figma", width: 1600, height: 900 },
            caption: "Then the wireframes in Figma.",
          },
        ],
      },
      { kind: "heading", text: "The design" },
      {
        kind: "text",
        text: "Moodboard, style tile and then a small system all our own: purple and lime, Clash Display for headings and Poppins for body text, and components with all their states.",
      },
      {
        kind: "figure",
        figure: {
          img: { src: "/assets/cases/newsquest/moodboard.jpg", alt: "The NewsQuest moodboard", width: 1600, height: 900 },
          caption: "The moodboard.",
        },
      },
      {
        kind: "pair",
        figures: [
          {
            img: {
              src: "/assets/cases/newsquest/style-tile.jpg",
              alt: "The style tile: the news, one swipe at a time",
              width: 1600,
              height: 900,
            },
            caption: "The style tile.",
          },
          {
            img: {
              src: "/assets/cases/newsquest/colori.jpg",
              alt: "The palette and typefaces: Clash Display and Poppins",
              width: 1600,
              height: 900,
            },
            caption: "Colors and type.",
          },
        ],
      },
      {
        kind: "figure",
        figure: {
          img: {
            src: "/assets/cases/newsquest/componenti.jpg",
            alt: "Primary, secondary and tertiary buttons with their states",
            width: 1600,
            height: 900,
          },
          caption: "The components, state by state.",
        },
      },
      { kind: "heading", text: "The app" },
      {
        kind: "text",
        text: "The tone is encouraging and empathetic: it guides you without making anyone feel lost, friendly and a little playful. Microanimations do the rest: quick challenges, daily goals, mascots that react.",
      },
      {
        kind: "pair",
        figures: [
          {
            img: {
              src: "/assets/cases/newsquest/tov.jpg",
              alt: "The tone of voice: encouraging, empathetic, friendly, playful",
              width: 1600,
              height: 900,
            },
            caption: "The tone of voice.",
          },
          {
            img: {
              src: "/assets/cases/newsquest/microanimazioni.jpg",
              alt: "The microanimations: the quick challenge and the goals",
              width: 1600,
              height: 900,
            },
            caption: "The microanimations.",
          },
        ],
      },
      {
        kind: "tools",
        label: "Tools.",
        text: "Personas and benchmark for discovery, paper and Figma for the wireframes, Figma for the design system, screens and prototype.",
      },
    ],
    next: [{ label: "Open Spotify Mood", open: "spotify" }, { label: "Back to the desk", close: true }],
  },
};

import type { Locale } from '@/i18n/types';
import type { CaseCopy } from './types';

/* Case study "Studio AI": Italian and English side by side, so the two stay in sync. */
export const studio: Record<Locale, CaseCopy> = {
  it: {
    folder: "Cartella a scacchi",
    tarot: "I · L'Interprete",
    title: "Studio AI",
    hitLabel: "Cartella a scacchi blu: Studio AI",
    blurb: "Cambia il modo di leggere i dati: parti dall'insight, non dal numero, e con l'AI lo approfondisci.",
    owner: "Progetto per Witailer (gruppo Alkemy)",
    tagline: "Cambia il modo di leggere i dati: non parti più dai numeri, parti dagli insight. Studio AI li trova nei dati reali delle vendite su Amazon e con l'AI puoi esplorarli e approfondirli, uno per uno.",
    blocks: [
      { kind: "demo", src: "/assets/videos/studio-ai.mp4", poster: "/assets/videos/studio-ai.jpg", label: "Video demo di Studio AI" },
      {
        kind: "facts",
        items: [
          { label: "Quando", value: "Da dicembre 2025 a oggi" },
          {
            label: "Il mio ruolo",
            value: "Tutto il giro: esperienza, interfaccia e sviluppo del modulo, fino al collegamento con i dati e ai test sulle risposte",
          },
          { label: "Dove", value: "Witailer Studio, la piattaforma con cui i brand seguono le vendite su Amazon" },
        ],
      },
      {
        kind: "figure",
        figure: {
          img: {
            src: "/assets/cases/studio-ai/design-answer-sheet.jpg",
            alt: "La risposta di Studio AI: a sinistra il testo con i numeri principali, a destra il ragionamento una riga per passo",
            width: 1600,
            height: 1000,
          },
          caption: "La risposta si legge in un minuto; a destra il ragionamento, una riga per passo. Numeri e nomi dei clienti sono coperti.",
        },
      },
      { kind: "heading", text: "Il problema" },
      {
        kind: "text",
        text: "Per capire perché le vendite di un brand si muovono, chi lavora su Amazon apre una sezione dopo l'altra (vendite, pubblicità, disponibilità, prezzi, categoria) e fa il puzzle a mano. Ci vuole tempo, e ci riesce solo chi la piattaforma la conosce a memoria. La prima versione di Studio AI c'era già, ma inciampava in tre punti:",
      },
      {
        kind: "list",
        items: [
          [
            { b: "Risposte poco affidabili nei casi difficili." },
            " In una prova vera si era persa un grande evento promozionale di Amazon e aveva scambiato un miglioramento per un calo. Ahia.",
          ],
          [
            { b: "Un'interfaccia cresciuta a strati." },
            " Ogni riga aveva bottoni, etichette e colori, e nessuno si era mai chiesto cosa servisse davvero.",
          ],
          [{ b: "Poco uso." }, " Tante persone aprivano il modulo, guardavano e richiudevano. I modelli di analisi pronti restavano lì."],
        ],
      },
      { kind: "heading", text: "Come ci ho lavorato" },
      {
        kind: "steps",
        items: [
          {
            when: "Dicembre 2025 – marzo 2026",
            title: "Dalla domanda a un'analisi in passi",
            text: "Niente chat infinita: Studio AI risponde con un'analisi a passi. Ogni passo ha un titolo, i numeri veri del cliente, un grafico e la domanda giusta da fare dopo. La beta è uscita il 20 marzo 2026.",
          },
          {
            when: "Settembre – ottobre 2026",
            title: "Risposte controllate da test automatici",
            text: "Regola d'oro: i conti li fa il codice, l'AI li racconta. Un banco di prova confronta le risposte, e se l'AI scrive un numero che nei dati non c'è, il rilascio si ferma. Ogni errore che troviamo diventa un nuovo test.",
          },
          {
            when: "Ottobre 2026",
            title: "Puntare a essere la migliore analista sul mercato",
            text: "Da quell'evento promozionale perso è nato un piano in cinque tappe: il calendario degli eventi Amazon dentro l'analisi, una verifica dopo ogni risposta, il perché diviso in traffico, conversione e prezzo, cause che si escludono con i dati alla mano e il contesto del cliente.",
          },
          {
            when: "Ottobre 2026",
            title: "Un'interfaccia calma",
            text: "Ho riletto tutto il modulo con i principi di Sentient Design di Josh Clark e Veronika Kindred: stare zitta quando non serve, suggerire invece di imporre, dire «non lo so» invece di tirare a indovinare. Una riga, una cosa. La pagina «Today» ogni mattina ti mostra solo quello che si è mosso.",
          },
          {
            when: "Settembre – novembre 2026",
            title: "Amazon Ads, con un confronto tra le fonti",
            text: "La pubblicità vive con periodi e filtri tutti suoi, quindi le ho dato una stanza a parte. Le modifiche le propone Studio AI ma le conferma sempre una persona, e un «cross check» mette le due fonti sullo stesso periodo con un verdetto riga per riga.",
          },
          {
            when: "Novembre 2026",
            title: "La riprogettazione da zero: Studio AI v2",
            text: "Il 10 novembre ho detto basta ai ritocchi e ho ricominciato da un foglio bianco: mappa di tutte le funzioni, 18 schermate di flussi, sette schermate ad alta fedeltà che raccontano una settimana di lavoro. Approvata l'11, costruita subito dopo. Il 17 abbiamo spento il vecchio motore.",
          },
        ],
      },
      {
        kind: "figure",
        figure: {
          img: {
            src: "/assets/cases/studio-ai/design-reasoning-map.jpg",
            alt: "La mappa del ragionamento come una lavagna: domanda, quanto, dove, ipotesi confermate ed escluse, con una nota dell'account manager",
            width: 1600,
            height: 1000,
          },
          caption: "La mappa come lavagna: la domanda, quanto, dove, le ipotesi confermate ed escluse, e accanto una nota scritta dall'account manager. Disegno approvato di Studio AI v2.",
        },
      },
      {
        kind: "pair",
        figures: [
          {
            img: {
              src: "/assets/cases/studio-ai/app-scope-sentence.jpg",
              alt: "La domanda riscritta come una frase con le parti cliccabili: tutto il catalogo, in tutti i mercati, dal 1 al 31 ottobre",
              width: 672,
              height: 510,
            },
            caption: "Prima di partire, la domanda diventa una frase: si clicca la parte sbagliata e si cambia.",
          },
          {
            img: {
              src: "/assets/cases/studio-ai/app-settings-follow.jpg",
              alt: "Le impostazioni: cosa seguire, ogni quanto, quanto farsi dire",
              width: 896,
              height: 586,
            },
            caption: "Ognuno decide cosa seguire, ogni quanto e quanto farsi dire.",
          },
        ],
      },
      {
        kind: "figure",
        figure: {
          img: {
            src: "/assets/cases/studio-ai/design-ads-cross-check.jpg",
            alt: "Il cross check con Amazon Ads: due colonne sullo stesso periodo e un verdetto per riga",
            width: 1600,
            height: 1000,
          },
          caption: "Cross check con Amazon Ads: due fonti sullo stesso periodo e un verdetto per riga. La mappa si aggiorna e la pubblicità esce dalle cause.",
        },
      },
      { kind: "heading", text: "Le decisioni" },
      {
        kind: "decisions",
        items: [
          {
            title: "Una mappa del ragionamento, non una chat",
            text: "Chi deve spiegare un calo a un cliente deve poter mostrare come ci è arrivato, non solo dire la conclusione.",
          },
          {
            title: "I numeri li calcola il codice, l'AI li racconta",
            text: "Gli errori nascevano da contesto mancante e da conti lasciati all'AI. Se un numero nei dati non c'è, non esce.",
          },
          {
            title: "Frasi da completare, non un catalogo di modelli",
            text: "Confermare in una riga cosa stai per guardare ti salva da un'analisi fatta sui dati sbagliati.",
          },
          {
            title: "Amazon Ads in uno spazio a parte",
            text: "Se pubblicità e vendite non si possono mettere sullo stesso piano, Studio AI non le confronta. E te lo dice.",
          },
        ],
      },
      {
        kind: "figure",
        figure: {
          img: {
            src: "/assets/cases/studio-ai/app-reasoning-map.jpg",
            alt: "La mappa costruita nel prodotto: dalla domanda alla risposta, con le cause confermate ed escluse come rami",
            width: 1420,
            height: 706,
          },
          caption: "Il prodotto costruito: la mappa dalla domanda alla risposta, con le cause confermate ed escluse come rami.",
        },
      },
      { kind: "heading", text: "Il risultato" },
      {
        kind: "numbers",
        items: [
          { value: "Beta", label: "in produzione da marzo 2026" },
          { value: "94", label: "pull request di Studio AI entrate nel prodotto" },
          { value: "1.042", label: "commit miei nel progetto, 633 sul modulo" },
          { value: "1.837", label: "test automatici verdi sulla v2, al 17 novembre" },
        ],
      },
      {
        kind: "tools",
        label: "Strumenti.",
        text: "React e Next.js, TypeScript, Tailwind, React Flow per la mappa, Vercel AI SDK, Vitest per i test e i controlli di qualità, Playwright per le prove nel browser, Claude Code e Claude Design per i prototipi ad alta fedeltà.",
      },
    ],
    next: [{ label: "Torna alla scrivania", close: true }, { label: "Apri STAT", open: "stat" }],
  },
  en: {
    folder: "Checkered folder",
    tarot: "I · The Interpreter",
    title: "Studio AI",
    hitLabel: "Blue checkered folder: Studio AI",
    blurb: "It flips how you read data: you start from the insight, not the number, and dig into it with AI.",
    owner: "A project for Witailer (Alkemy group)",
    tagline: "It flips how you read data: you no longer start from the numbers, you start from the insights. Studio AI finds them in real Amazon sales data, and with AI you can explore them and dig into each one.",
    blocks: [
      { kind: "demo", src: "/assets/videos/studio-ai-en.mp4", poster: "/assets/videos/studio-ai-en.jpg", label: "Studio AI demo video" },
      {
        kind: "facts",
        items: [
          { label: "When", value: "December 2025 to now" },
          {
            label: "My role",
            value: "The whole loop: experience, interface and development of the module, all the way to the data connection and testing the answers",
          },
          { label: "Where", value: "Witailer Studio, the platform brands use to follow their Amazon sales" },
        ],
      },
      {
        kind: "figure",
        figure: {
          img: {
            src: "/assets/cases/studio-ai/design-answer-sheet.jpg",
            alt: "Studio AI's answer: on the left the text with the key numbers, on the right the reasoning, one line per step",
            width: 1600,
            height: 1000,
          },
          caption: "You read the answer in a minute; on the right, the reasoning, one line per step. Numbers and client names are covered.",
        },
      },
      { kind: "heading", text: "The problem" },
      {
        kind: "text",
        text: "To understand why a brand's sales are moving, people who work on Amazon open one section after another (sales, advertising, availability, prices, category) and put the puzzle together by hand. It takes time, and only people who know the platform by heart can pull it off. The first version of Studio AI already existed, but it tripped up in three places:",
      },
      {
        kind: "list",
        items: [
          [
            { b: "Shaky answers in the hard cases." },
            " In a real test it missed a big Amazon promotional event and mistook an improvement for a drop. Ouch.",
          ],
          [
            { b: "An interface grown in layers." },
            " Every row had buttons, labels and colors, and nobody had ever asked what was really needed.",
          ],
          [
            { b: "Low use." },
            " Lots of people opened the module, had a look and closed it. The ready-made analysis templates just sat there.",
          ],
        ],
      },
      { kind: "heading", text: "How I worked on it" },
      {
        kind: "steps",
        items: [
          {
            when: "December 2025 – March 2026",
            title: "From a question to a step-by-step analysis",
            text: "No endless chat: Studio AI answers with an analysis in steps. Each step has a title, the client's real numbers, a chart and the right question to ask next. The beta came out on 20 March 2026.",
          },
          {
            when: "September – October 2026",
            title: "Answers checked by automated tests",
            text: "Golden rule: the code does the math, the AI tells the story. A test bench compares the answers, and if the AI writes a number that isn't in the data, the release stops. Every mistake we find becomes a new test.",
          },
          {
            when: "October 2026",
            title: "Aiming to be the best analyst on the market",
            text: "That missed promotional event led to a five-step plan: the Amazon events calendar inside the analysis, a check after every answer, the why split into traffic, conversion and price, causes ruled out with the data in hand, and the client's context.",
          },
          {
            when: "October 2026",
            title: "A calm interface",
            text: "I went back over the whole module with Josh Clark and Veronika Kindred's Sentient Design principles: stay quiet when you're not needed, suggest instead of impose, say “I don't know” instead of guessing. One row, one thing. Every morning the “Today” page shows you only what moved.",
          },
          {
            when: "September – November 2026",
            title: "Amazon Ads, with a check across sources",
            text: "Advertising runs on its own periods and filters, so I gave it a room of its own. Studio AI suggests the changes but a person always confirms them, and a “cross check” lines the two sources up on the same period with a verdict row by row.",
          },
          {
            when: "November 2026",
            title: "Redesigned from scratch: Studio AI v2",
            text: "On 10 November I said enough with the tweaks and started over from a blank page: a map of every feature, 18 flow screens, seven high-fidelity screens that tell the story of a work week. Approved on the 11th, built right after. On the 17th we switched off the old engine.",
          },
        ],
      },
      {
        kind: "figure",
        figure: {
          img: {
            src: "/assets/cases/studio-ai/design-reasoning-map.jpg",
            alt: "The reasoning map as a whiteboard: question, how much, where, confirmed and ruled-out hypotheses, with a note from the account manager",
            width: 1600,
            height: 1000,
          },
          caption: "The map as a whiteboard: the question, how much, where, the confirmed and ruled-out hypotheses, and next to them a note written by the account manager. Approved design for Studio AI v2.",
        },
      },
      {
        kind: "pair",
        figures: [
          {
            img: {
              src: "/assets/cases/studio-ai/app-scope-sentence.jpg",
              alt: "The question rewritten as a sentence with clickable parts: the whole catalog, in all markets, from 1 to 31 October",
              width: 672,
              height: 510,
            },
            caption: "Before it starts, the question becomes a sentence: click the wrong part and change it.",
          },
          {
            img: {
              src: "/assets/cases/studio-ai/app-settings-follow.jpg",
              alt: "Settings: what to follow, how often, how much to be told",
              width: 896,
              height: 586,
            },
            caption: "Everyone decides what to follow, how often and how much they want to be told.",
          },
        ],
      },
      {
        kind: "figure",
        figure: {
          img: {
            src: "/assets/cases/studio-ai/design-ads-cross-check.jpg",
            alt: "The cross check with Amazon Ads: two columns on the same period and a verdict per row",
            width: 1600,
            height: 1000,
          },
          caption: "Cross check with Amazon Ads: two sources on the same period and a verdict per row. The map updates and advertising drops out of the causes.",
        },
      },
      { kind: "heading", text: "Decisions" },
      {
        kind: "decisions",
        items: [
          {
            title: "A reasoning map, not a chat",
            text: "If you have to explain a drop to a client, you need to show how you got there, not just the conclusion.",
          },
          {
            title: "The code does the numbers, the AI tells the story",
            text: "The mistakes came from missing context and from math left to the AI. If a number isn't in the data, it doesn't come out.",
          },
          {
            title: "Sentences to complete, not a catalog of templates",
            text: "Confirming in one line what you're about to look at saves you from an analysis run on the wrong data.",
          },
          {
            title: "Amazon Ads in a space of its own",
            text: "If advertising and sales can't be compared like for like, Studio AI doesn't compare them. And it tells you so.",
          },
        ],
      },
      {
        kind: "figure",
        figure: {
          img: {
            src: "/assets/cases/studio-ai/app-reasoning-map.jpg",
            alt: "The map built into the product: from question to answer, with confirmed and ruled-out causes as branches",
            width: 1420,
            height: 706,
          },
          caption: "The product as built: the map from question to answer, with confirmed and ruled-out causes as branches.",
        },
      },
      { kind: "heading", text: "The result" },
      {
        kind: "numbers",
        items: [
          { value: "Beta", label: "in production since March 2026" },
          { value: "94", label: "Studio AI pull requests merged into the product" },
          { value: "1,042", label: "of my commits in the project, 633 on the module" },
          { value: "1,837", label: "green automated tests on v2, as of 17 November" },
        ],
      },
      {
        kind: "tools",
        label: "Tools.",
        text: "React and Next.js, TypeScript, Tailwind, React Flow for the map, Vercel AI SDK, Vitest for tests and quality checks, Playwright for browser testing, Claude Code and Claude Design for the high-fidelity prototypes.",
      },
    ],
    next: [{ label: "Back to the desk", close: true }, { label: "Open STAT", open: "stat" }],
  },
};

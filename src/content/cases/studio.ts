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
      { kind: "demo", src: "/assets/videos/studio-ai-product.mp4?v=2", poster: "/assets/videos/studio-ai-product.jpg?v=2", label: "Video demo di Studio AI" },
      {
        kind: "facts",
        items: [
          { label: "Quando", value: "Da gennaio 2026 a oggi" },
          { label: "Il mio ruolo", value: "Tutto il modulo, dalla PoC al prodotto: esperienza dell'AI e interfaccia, frontend e backend" },
          { label: "Per chi", value: "I clienti che vendono su Amazon e il team interno di Witailer" },
          { label: "Con", value: "L'head of product, da cui è partita l'idea. I clienti pilota sulla beta. L'head of tech ha costruito l'MCP di Amazon Ads" },
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
      { kind: "heading", text: "Design thinking" },
      {
        kind: "steps",
        items: [
          {
            title: "Il bisogno",
            text: "Chi segue un brand su Amazon passava ore a leggere i dati e a incrociarli tra un modulo e l'altro di Witailer Studio (vendite, pubblicità, disponibilità, prezzi, categoria) per capire perché le vendite si muovevano. Ci riusciva solo chi conosceva la piattaforma a memoria.",
          },
          {
            title: "L'idea e l'obiettivo",
            text: "L'idea è dell'head of product: ribaltare il punto di partenza, non i numeri ma gli insight, trovati nei dati reali e da approfondire con l'AI. L'obiettivo era uno: ridurre il time to insight.",
          },
          {
            title: "Il punto di partenza",
            text: "Niente PRD formale: sono partita dalle indicazioni dell'head of product e le ho trasformate in una prova da fare subito sui dati veri.",
          },
          {
            title: "La complessità",
            text: "Ero in azienda da circa tre mesi. Per costruire un'AI che legge i dati come un analista dovevo prima capire io il dominio, cioè come si vende su Amazon e cosa muove le vendite, e tutti i moduli di Studio: cosa misura ognuno, da dove vengono i dati, come si incrociano.",
          },
        ],
      },
      { kind: "heading", text: "Ricerca UX" },
      {
        kind: "steps",
        items: [
          {
            when: "Gennaio 2026",
            title: "Una PoC sui dati veri",
            text: "Prima di disegnare qualsiasi cosa, una domanda: un LLM legge davvero bene questi dati? Ho costruito una prova di concetto sui dati reali dei clienti per verificarlo.",
          },
          {
            when: "Da marzo 2026",
            title: "Feedback ogni settimana con i clienti pilota",
            text: "Sulla beta ho tenuto sessioni di feedback settimanali con i clienti e gli utenti pilota: cosa chiedevano, dove si perdevano, cosa non usavano. I modelli di analisi già pronti, per esempio, restavano lì.",
          },
          {
            when: "Settembre 2026",
            title: "Un audit misurato, prima di ridisegnare",
            text: "Ho misurato l'interfaccia invece di andare a sensazione: la chat galleggiava sopra il canvas, le impostazioni erano sparse in una ventina di finestre, i testi troppo piccoli, l'accessibilità quasi assente.",
          },
          {
            when: "Settembre – novembre 2026",
            title: "I dati d'uso",
            text: "Dai dati d'uso e dalla pagina interna Impact è venuta fuori la cosa più importante: quasi nessuno usava davvero il modulo fino in fondo. È da lì che è partita la riprogettazione.",
          },
        ],
      },
      { kind: "heading", text: "Processo di design" },
      {
        kind: "steps",
        items: [
          {
            title: "L'esperienza dell'AI",
            text: "Sopra il design statico del senior product designer ho progettato come si comporta l'AI: i flussi di ragionamento, la disambiguazione quando la domanda è vaga, i log che mostrano cosa ha fatto.",
          },
          {
            title: "Progettare per l'ambiguità",
            text: "Quando l'unità di base è la domanda e non il dato, buona parte di quello che sai di interaction design va rimesso in discussione. Ho progettato cosa fa l'AI quando la domanda è ambigua, quando i dati di Amazon non rispondono, quando il contesto è incompleto: un LLM in quei casi non si ferma con un errore, improvvisa, e il lavoro è decidere prima come improvvisa.",
          },
          {
            when: "Settembre 2026",
            title: "Un obiettivo e un filtro",
            text: "Mi sono data un obiettivo concreto: una demo di un minuto che faccia dire «è potentissimo», usata per decidere le priorità. Poi ho esplorato un redesign in sei schermate e ne ho tenuto solo i pezzi che risolvevano problemi già misurati: il perimetro dell'analisi a portata di tastiera, la card che dà prima il verdetto e poi le prove, l'errore spiegato come un passo.",
          },
          {
            when: "Settembre 2026",
            title: "Regole di scrittura e un passaggio chiaro",
            text: "Un progetto di dodici tavole con un documento di passaggio che separa il lavoro di solo frontend, da giorni, da quello di backend, da settimane. E regole per i testi dell'AI: il verdetto in quattordici parole al massimo con il numero dentro, i passi raccontati come risultati e non come chiamate a funzioni.",
          },
          {
            when: "Ottobre 2026",
            title: "Una revisione con Sentient Design",
            text: "Ho riletto tutto il modulo con i principi di Josh Clark e Veronika Kindred: fatti sempre con la loro fonte, un'AI che sa dire «non lo so», proposte da confermare invece di azioni fatte da sola, un'interfaccia calma.",
          },
          {
            when: "10 – 11 novembre 2026",
            title: "Studio AI v2, da un foglio bianco",
            text: "Il modulo era cresciuto a strati e l'uso vero era quasi nullo, quindi ho smesso di ritoccare. Ho fatto la mappa di tutte le funzioni, decidendo cosa tenere, unire o togliere, e i wireframe di 18 schermate in cinque aree. Le domande sono diventate frasi da completare, al posto del catalogo di modelli. Il giorno dopo erano approvate sette schermate ad alta fedeltà che raccontano una settimana di lavoro: Today con le azioni, la mappa del ragionamento, il cross check con Amazon Ads, le azioni con un responsabile, slide ed Excel generati dalla mappa.",
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
      { kind: "heading", text: "UI" },
      {
        kind: "steps",
        items: [
          {
            when: "Novembre 2026",
            title: "Il canvas con la job bar",
            text: "La novità della v2 è il canvas con la job bar: cinque azioni sempre a portata di mano. Le note, il cross check tra il modulo e Amazon Ads senza conflitti, il fork per provare ipotesi e strategie diverse, il ragionamento passo per passo con il suo perché, i passi consigliati.",
          },
          {
            title: "Una mappa del ragionamento, non una chat",
            text: "Chi deve spiegare un calo a un cliente deve poter mostrare come ci è arrivato: la domanda, quanto, dove, le cause confermate ed escluse come rami.",
          },
          {
            title: "La domanda diventa una frase",
            text: "Prima di partire si conferma in una riga cosa si sta per guardare, e si clicca la parte sbagliata per cambiarla. Al posto del catalogo di modelli.",
          },
          {
            title: "Today e le impostazioni",
            text: "Ogni mattina la pagina Today mostra solo quello che si è mosso, e ognuno decide cosa seguire e quanto farsi dire.",
          },
          {
            title: "Amazon Ads in uno spazio a parte",
            text: "La pubblicità ha periodi e filtri suoi. Le modifiche le propone Studio AI ma le conferma una persona, e il cross check mette le due fonti sullo stesso periodo con un verdetto riga per riga.",
          },
        ],
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
      { kind: "heading", text: "Sviluppo" },
      {
        kind: "steps",
        items: [
          {
            when: "Gennaio – marzo 2026",
            title: "Il modulo, da sola",
            text: "Il loop agentico, l'harness che lo guida e l'interfaccia, canvas e chat, collegati tra loro. La beta è andata in produzione a marzo 2026.",
          },
          {
            when: "Settembre 2026",
            title: "Il perimetro nella conversazione, le impostazioni in un posto",
            text: "Uno stesso pannello faceva due lavori, e chiudendo le impostazioni si perdeva l'analisi in preparazione. Li ho separati: il perimetro dell'analisi vive nella conversazione, le impostazioni globali in un posto solo. La home è diventata il brief del giorno, e tutti i componenti sono passati al design system di Studio.",
          },
          {
            when: "Settembre – ottobre 2026",
            title: "Amazon Ads, uno spazio a parte",
            text: "La pubblicità è diventata una conversazione separata. Le modifiche proposte dall'AI partono solo dopo un'anteprima e la conferma di chi le usa, e si possono annullare.",
          },
          {
            title: "L'MCP di Amazon Ads",
            text: "L'head of tech ha costruito l'MCP di Amazon Ads; io l'ho integrato in Studio AI, adattandolo ai filtri e alla logica del modulo, dopo un confronto tra i suoi numeri e quelli degli strumenti di oggi.",
          },
          {
            when: "11 – 13 novembre 2026",
            title: "La v2, costruita dietro un interruttore",
            text: "Today, la mappa del ragionamento, il perimetro da confermare, il report e le slide dalla mappa. Poi una mia revisione con otto problemi, sistemati in tre giri. Una funzione, «Ask why», l'ho costruita e poi tolta perché confondeva.",
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
      { kind: "heading", text: "Ingegnerizzazione" },
      {
        kind: "steps",
        items: [
          {
            when: "Settembre 2026",
            title: "Un audit tecnico e un riordino",
            text: "Un audit su sei aspetti del codice: i file più grandi divisi per tema, la richiesta principale scomposta in una pipeline a fasi, controlli d'accesso per ogni cliente, limiti di uso, telemetria e un primo banco di prova per le risposte.",
          },
          {
            when: "Settembre – ottobre 2026",
            title: "Modelli scelti con le eval",
            text: "Il modello lo scelgo con le valutazioni, con due giudici di famiglie diverse, non a sensazione. Poi un controllo di rilascio: sotto una soglia, non si rilascia, e ogni errore trovato sui dati veri diventa un caso di prova.",
          },
          {
            when: "Ottobre – novembre 2026",
            title: "Dal prompt al codice",
            text: "Un test A/B ha mostrato che aggiungere istruzioni al prompt non migliorava le risposte, e correggere il prompt a ogni giro costava ed era imprevedibile. Ho spostato la logica nel codice: tabelle e perimetro li costruisce il codice, ogni numero del testo viene confrontato con la sua riga, e il giudice AI vota solo quello che va interpretato. Al prompt restano il tono e il contesto.",
          },
          {
            when: "9 – 10 novembre 2026",
            title: "Un motore nuovo",
            text: "Il vecchio motore aveva una ricetta scritta a mano per ogni tipo di domanda. L'ho sostituito con un pianificatore che non dipende dalla domanda e con un catalogo di letture dei dati riusabili. Nelle valutazioni interne supera il controllo di rilascio, con meno contraddizioni e più numeri ritrovati.",
          },
          {
            when: "16 – 18 novembre 2026",
            title: "Il vecchio motore, spento",
            text: "La v2 è diventata predefinita e ogni richiesta passa dal motore nuovo: il vecchio, con i suoi strumenti e le sue guardie, è stato tolto, e le analisi salvate prima si aprono in sola lettura. Il rilascio in produzione aspetta la migrazione generale dei prodotti di Witailer.",
          },
        ],
      },
      { kind: "heading", text: "Le sfide e come le ho affrontate" },
      {
        kind: "decisions",
        items: [
          {
            title: "Un dominio nuovo, dopo tre mesi in azienda",
            text: "L'ho imparato strada facendo, nelle sessioni con i clienti pilota e con l'head of product: ogni domanda che portavano mi faceva capire un pezzo dei moduli di Studio e di come si incrociano i dati.",
          },
          {
            title: "Potersi fidare dei numeri",
            text: "Prima di disegnare ho verificato con una PoC che un LLM leggesse bene i dati. Poi la regola: i conti li fa il codice, l'AI li racconta, e un test ferma il rilascio se compare un numero che nei dati non c'è.",
          },
          {
            title: "Un prompt che diventava fragile",
            text: "Correggere il prompt a ogni giro costava ed era imprevedibile, e un test A/B ha mostrato che più istruzioni non miglioravano le risposte. Ho portato la logica nel codice e trasformato il controllo di rilascio in verifiche precise: ogni numero confrontato con i dati.",
          },
          {
            title: "Strumenti che nessuno usava",
            text: "I modelli di analisi pronti restavano lì. Li ho sostituiti con una domanda da confermare in una frase e con la pagina Today, che mostra solo quello che si è mosso.",
          },
          {
            title: "Un'interfaccia cresciuta a strati",
            text: "Un audit misurato e i dati d\'uso dicevano la stessa cosa: tante funzioni, poco uso. Dopo una revisione con Sentient Design ho smesso di ritoccare e ho ricominciato da un foglio bianco: la v2, approvata in un giorno e costruita subito dopo.",
          },
          {
            title: "Pubblicità e vendite non si confrontano alla pari",
            text: "Hanno periodi e filtri diversi. Ho dato ad Amazon Ads uno spazio suo, con un cross check che le mette sullo stesso periodo, e ogni modifica proposta la conferma una persona.",
          },
        ],
      },
      { kind: "heading", text: "Il risultato" },
      {
        kind: "numbers",
        items: [
          { value: "80 → 100", label: "punteggio nelle valutazioni, motore nuovo contro quello di prima di ottobre" },
          { value: "4 → 0", label: "contraddizioni nella stessa analisi" },
          { value: "90 s → 20–40 s", label: "tempo di risposta, secondo la profondità dell'analisi" },
          { value: "~3.000", label: "test automatici e prove sulle risposte" },
          { value: "Beta", label: "in produzione da marzo 2026; la v2 aspetta la migrazione dei prodotti" },
          { value: "Semifinale", label: "Amazon Partner Awards" },
        ],
      },
      {
        kind: "figure",
        figure: {
          img: {
            src: "/assets/cases/studio-ai/engine-agents-squad.jpg",
            alt: "Cinque agenti disegnati come omini di mattoncini, Pianifica, Legge, Legge, Verifica e Scrive, sotto tre schede: affidabilità da 80 a 100, risposta da 90 a 20–40 secondi, costo uguale",
            width: 1600,
            height: 656,
          },
          caption: "Il motore nuovo è una squadra: uno pianifica, due leggono i dati, uno verifica, uno scrive. Più affidabile e più veloce, allo stesso costo per analisi.",
        },
      },
      {
        kind: "tools",
        label: "Strumenti.",
        text: "React e Next.js, TypeScript, Tailwind, React Flow per la mappa, Vercel AI SDK, Vitest per i test, Playwright per le prove nel browser, Claude Code e Claude Design per i prototipi ad alta fedeltà.",
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
      { kind: "demo", src: "/assets/videos/studio-ai-product-en.mp4?v=2", poster: "/assets/videos/studio-ai-product-en.jpg?v=2", label: "Studio AI demo video" },
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

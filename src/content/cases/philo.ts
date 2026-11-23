import type { Locale } from '@/i18n/types';
import type { CaseCopy } from './types';

/* Case study "Philo": Italian and English side by side, so the two stay in sync. */
export const philo: Record<Locale, CaseCopy> = {
  it: {
    folder: "Cartella a pois",
    tarot: "III · Il Costruttore",
    title: "Philo",
    hitLabel: "Cartella a pois gialla: Philo",
    blurb: "Legge i programmi del team e ti fa vedere tutto come un ufficio: zoom in sul tuo team, zoom out sugli altri.",
    owner: "Progetto per Witailer (gruppo Alkemy)",
    tagline: "Philo fa due cose: legge i programmi che usa il team e ne mette il succo nel knowledge graph, poi te lo fa vedere come un ufficio. Zoom in: tutto quello che succede nel tuo team. Zoom out: cosa succede negli altri.",
    blocks: [
      { kind: "demo", src: "/assets/videos/philo-product.mp4?v=5", poster: "/assets/videos/philo-product.jpg?v=4", label: "Video demo di Philo" },
      {
        kind: "facts",
        items: [
          { label: "Quando", value: "Da ottobre 2026 a oggi" },
          {
            label: "Il mio ruolo",
            value: "Idea e concept, nome e mascotte, UX e UI, l'ufficio in 3D in Blender e il frontend. Il motore sul knowledge graph lo costruisce il senior frontend engineer",
          },
          {
            label: "Per chi",
            value: "Il team di prodotto di Witailer, per primo. Poi gli altri team, qualunque programmi usino",
          },
          { label: "Con", value: "Il senior frontend engineer, che costruisce il motore di Philo sul knowledge graph" },
        ],
      },
      { kind: "heading", text: "Design thinking" },
      {
        kind: "steps",
        items: [
          {
            title: "Il bisogno",
            text: "In un team il lavoro è sparso tra commit, documenti, ticket, chat e call. Ognuno vede il suo pezzo. Non sai chi sta facendo cosa, cosa è fermo e chi può sbloccarlo. Le decisioni si perdono tra una call e una chat. Quello che tocca a te lo scopri tardi, e degli altri team non sai quasi niente.",
          },
          {
            title: "L'idea",
            text: "Il bisogno l'ho intercettato io, nel nostro team, e Philo è partito da lì. Concept, nome e mascotte sono miei. Philo legge i programmi del team, mette il succo nel knowledge graph e lo fa vedere come un ufficio.",
          },
          {
            title: "La complessità",
            text: "Philo legge fonti diverse e deve dire solo cose vere. Ogni fatto ha bisogno di una fonte e di una data, i fatti confermati vanno tenuti separati dalle ipotesi, e ognuno deve vedere solo quello che può vedere.",
          },
        ],
      },
      { kind: "heading", text: "Processo di design" },
      {
        kind: "steps",
        items: [
          {
            title: "La prima interfaccia non funzionava",
            text: "La prima versione l'ho disegnata su Forest UI, la UI dell'azienda: era statica, non si navigava, ed è pensata per i dati, mentre Philo non parla di dati. Dopo una fase di ricerca e sviluppo ho progettato un ufficio in 3D.",
          },
          {
            when: "Fine ottobre 2026",
            title: "Una coda che nessuno leggeva",
            text: "La coda «da confermare» aveva 1.409 voci e nessuno la leggeva.",
          },
          {
            when: "5 – 8 ottobre 2026",
            title: "Concept, nome e mascotte",
            text: "Il primo concept era un grafo fatto di file: un nodo per ogni file, con fonte e data. La mascotte è una P fatta di filo, con due occhi. Il filo rosso è morbido quando una cosa è una proposta, teso quando è confermata, tratteggiato quando è bloccata su un dato.",
          },
          {
            when: "30 ottobre – 11 novembre 2026",
            title: "L'ufficio",
            text: "Dopo due tentativi sono arrivata a un unico ufficio in isometria, che è diventato la home di Philo.",
          },
          {
            when: "20 novembre 2026",
            title: "Più team insieme",
            text: "In Blender ho provato sette modi di mettere insieme più team e ho scelto il più semplice: un riquadro per ogni team intorno a un relax comune.",
          },
        ],
      },
      {
        kind: "pair",
        figures: [
          {
            img: { src: "/assets/cases/philo/office-mind.jpg", alt: "La mente di Philo: cosa sa e da quali strumenti" },
            caption: "La mente di Philo: cosa sa e da dove lo sa, uno strumento per riga.",
          },
          {
            img: { src: "/assets/cases/philo/identity.jpg", alt: "La prima identità di Philo: palette rossa, marchio e mascotte" },
            caption: "La prima identità, poi sostituita dallo stile dell'ufficio.",
          },
        ],
      },
      {
        kind: "figure",
        figure: {
          img: { src: "/assets/cases/philo/shared-relax.jpg", alt: "Pianta isometrica del relax comune con divani, giochi e bancone" },
          caption: "La pianta del relax comune, da approvare prima di costruirla.",
        },
      },
      { kind: "heading", text: "UI" },
      {
        kind: "steps",
        items: [
          {
            title: "La home è un ufficio",
            text: "Le persone alle scrivanie, chi fa cosa, cosa è fermo, cosa si è deciso, cosa tocca a te. Con lo zoom out l'ufficio diventa una piattaforma: un riquadro per ogni team intorno al relax comune. Sopra ogni riquadro ci sono solo due segnali, giallo per le novità e rosso per quello che è fermo e ti riguarda.",
          },
          {
            title: "Un'interfaccia calma",
            text: "Philo saluta una volta e poi sta in silenzio. Se non succede niente, si addormenta. Si usa tra una call e l'altra, quindi deve dare informazioni senza chiedere attenzione.",
          },
          {
            when: "30 ottobre – 11 novembre 2026",
            title: "Un solo stile: BRUTALE DS",
            text: "In Blender ho modellato l'ufficio, i personaggi e la mascotte, e ho creato un nuovo design system, BRUTALE DS: colori piatti e linea nera per tutta l'app. Il caricamento iniziale è sceso da 3,6 a 1,1 MB.",
          },
          {
            when: "19 – 20 novembre 2026",
            title: "La mascotte in 3D",
            text: "Ho rifatto la mascotte in Blender: un filo intrecciato che cambia forma con l'umore. Ha undici umori, ognuno con una breve animazione. Quando pensa diventa un gomitolo, quando festeggia un fiocco.",
          },
          {
            when: "20 novembre 2026",
            title: "Il personaggio di ognuno",
            text: "Ognuno disegna il personaggio che lo rappresenta alla scrivania e nel relax: pelle, posa, capelli, vestiti, accessori.",
          },
        ],
      },
      {
        kind: "figure",
        figure: {
          img: {
            src: "/assets/cases/philo/office.jpg",
            alt: "L'ufficio di Philo nell'app: lavagna dei progetti, stanza isometrica con scrivanie e relax, la mascotte che parla",
          },
          caption: "L'ufficio, la home di Philo, come è oggi. Dati di prova e nomi inventati.",
        },
      },
      {
        kind: "figure",
        figure: {
          img: { src: "/assets/cases/philo/mascot-3d-moods.jpg", alt: "Gli undici stati d'animo della mascotte Philo in 3D" },
          caption: "Gli undici umori di Philo, resi in Blender.",
        },
      },
      {
        kind: "pair",
        figures: [
          {
            img: {
              src: "/assets/cases/philo/character-editor.jpg",
              alt: "L'editor del personaggio: la figura in piedi e le scelte a pillola",
            },
            caption: "«Come ti vedono nell'ufficio»: l'editor del personaggio.",
          },
          {
            img: {
              src: "/assets/cases/philo/platform-zoom-out.jpg",
              alt: "Vista dall'alto della piattaforma: gli uffici dei team attaccati attorno al relax comune",
            },
            caption: "Zoom out: gli uffici dei team, il tuo in giallo, il relax comune al centro. Proposta del 20 novembre.",
          },
        ],
      },
      { kind: "heading", text: "Sviluppo" },
      {
        kind: "steps",
        items: [
          {
            when: "16 – 17 ottobre 2026",
            title: "Il grafo diventa un prodotto",
            text: "Il database, la coda «da confermare» voce per voce, le contraddizioni tra le fonti, sprint e stand-up preparati da Philo, la versione per telefono, l'app per Mac e il server MCP.",
          },
          {
            title: "Risponde dove lavori",
            text: "Philo risponde nell'app, in una barra che galleggia sul Mac e dentro Claude, attraverso il server MCP. Fai una domanda e ti risponde con quello che il team sa.",
          },
          {
            when: "22 – 27 ottobre 2026",
            title: "La mente di Philo",
            text: "Philo impara a leggere codice, documenti e pull request, con regole chiare: quale fonte vale quando non sono d'accordo, due date per ogni fatto, una verifica prima di rispondere. I test sono costruiti sugli errori che faceva.",
          },
          {
            title: "L'ufficio in 3D",
            text: "Ho costruito l'ufficio in 3D nell'app, con i modelli fatti in Blender.",
          },
        ],
      },
      { kind: "heading", text: "Ingegnerizzazione" },
      {
        kind: "steps",
        items: [
          {
            when: "20 novembre 2026",
            title: "Philo legge, il knowledge graph ricorda",
            text: "Philo non tiene più una memoria sua. Legge i programmi del team e nel knowledge graph scrive solo il succo. Non decide cosa è vero: quello che è vero sta nel knowledge graph, con la sua fonte e la sua data. Così può servire più team e più dati senza diventare un altro posto dove cercare le cose.",
          },
          {
            title: "Philo propone, la persona decide",
            text: "Quello che Philo scrive passa da chi ha detto sì, con il suo login. È il knowledge graph a decidere chi vede cosa, e Philo lo rispetta.",
          },
          {
            title: "Adesso",
            text: "Philo è in sviluppo. Il knowledge graph che gli farà da motore è in test in produzione e lo sta costruendo il senior frontend engineer; io sto ingegnerizzando Philo.",
          },
        ],
      },
      { kind: "heading", text: "Le sfide e come le ho affrontate" },
      {
        kind: "decisions",
        items: [
          {
            title: "La prima interfaccia non funzionava",
            text: "La prima versione l'ho disegnata su Forest UI, la UI dell'azienda: era statica, non si navigava, ed è pensata per i dati, mentre Philo non parla di dati. Dopo una fase di ricerca e sviluppo ho progettato un ufficio in 3D.",
          },
          {
            title: "Una coda di 1.409 voci che nessuno leggeva",
            text: "Ho diviso la coda «da confermare» in tre livelli, in base a quanto conta ogni conferma.",
          },
          {
            title: "Risposte di cui fidarsi",
            text: "Ogni nodo ha fonte e data, e fatti confermati e ipotesi restano separati anche nel testo. Quale codice appartiene a quale progetto lo decidono regole che si possono spiegare, non l'AI.",
          },
          {
            title: "Fonti che non sono d'accordo",
            text: "Una regola dice quale fonte vale, ogni fatto ha due date e Philo fa una verifica prima di rispondere. I test sono costruiti sugli errori che faceva.",
          },
          {
            title: "Mettere insieme più team",
            text: "In Blender ho provato sette modi e ho scelto il più semplice: un riquadro per team intorno a un relax comune, con sopra solo due segnali.",
          },
          {
            title: "Non diventare un altro posto dove cercare",
            text: "Philo non tiene più una memoria sua. Legge e fa vedere, e a ricordare ci pensa il knowledge graph.",
          },
        ],
      },
      {
        kind: "tools",
        label: "Strumenti.",
        text: "Claude Design per le tavole, Blender per mascotte, mobili e scene; React 19, TypeScript, Vite e three.js; Electron per la barra del Mac; Python con FastAPI e Postgres; un server MCP in TypeScript; Vitest, Playwright e controlli automatici su ogni pull request.",
      },
    ],
    next: [{ label: "Apri STAT", open: "stat" }, { label: "Torna alla scrivania", close: true }],
  },
  en: {
    folder: "Polka-dot folder",
    tarot: "III · The Builder",
    title: "Philo",
    hitLabel: "Yellow polka-dot folder: Philo",
    blurb: "It reads the team's tools and shows everything as an office: zoom in on your team, zoom out to the other teams.",
    owner: "A project for Witailer (Alkemy group)",
    tagline: "Philo does two things: it reads the tools the team uses and puts the gist into the knowledge graph, then shows it to you as an office. Zoom in: everything happening in your team. Zoom out: what's going on in the others.",
    blocks: [
      { kind: "demo", src: "/assets/videos/philo-product-en.mp4?v=5", poster: "/assets/videos/philo-product-en.jpg?v=4", label: "Philo demo video" },
      {
        kind: "facts",
        items: [
          { label: "When", value: "October – November 2026, latest updates on 20 November" },
          {
            label: "My role",
            value: "Almost all mine: idea, UX and UI, identity and mascot, 3D scenes in Blender, frontend and a good part of the backend. 342 commits out of 367, just saying",
          },
          { label: "Who it's for", value: "Witailer's product team comes first, but it has to work for any team, whatever tools it uses" },
        ],
      },
      {
        kind: "figure",
        figure: {
          img: {
            src: "/assets/cases/philo/video-thread.jpg?v=2",
            alt: "A dotted route, like on a map, runs from the Philo mascot through a ticket, a document, a decision, data and a chat, among the people on the team",
            width: 1600,
            height: 900,
          },
          caption: "“Philo is the thread that holds all the work together.”",
        },
      },
      { kind: "heading", text: "The problem" },
      {
        kind: "text",
        text: "In a team, work is scattered everywhere: commits, docs, tickets, chats, calls. Everyone sees their own piece, and hardly anyone sees the rest. So:",
      },
      {
        kind: "list",
        items: [
          "you don't know who's doing what, what's stuck or who can unblock it;",
          "decisions get lost between a call and a chat, and a week later nobody remembers why;",
          "you find out what's on you when it's already too late;",
          "and you know next to nothing about what the other teams are doing, or what it changes for you.",
        ],
      },
      { kind: "heading", text: "How it works" },
      {
        kind: "steps",
        items: [
          {
            title: "Philo reads, the knowledge graph remembers",
            text: "Philo reads the team's tools and writes only the gist into the knowledge graph, no noise, without making a mess of it. It doesn't decide what's true and keeps no memory of its own: what's true lives in the knowledge graph, with its source and its date.",
          },
          {
            title: "Philo suggests, people decide",
            text: "Whatever Philo writes goes through the person who said yes, with their own login. Everyone sees only what they're allowed to see: the knowledge graph decides who sees what, and Philo sticks to it.",
          },
          {
            title: "Zoom in, zoom out",
            text: "The home is an isometric office: people at their desks, who's doing what, what's stuck, what's been decided, what's on you. Zoom out and the office becomes a platform: one tile per team around a shared lounge.",
          },
          {
            title: "It answers where you work",
            text: "In the app, in a bar that floats on your Mac, and inside Claude, through an MCP server. Ask a question and Philo answers with what the team knows.",
          },
        ],
      },
      {
        kind: "figure",
        figure: {
          img: {
            src: "/assets/cases/philo/office.jpg",
            alt: "Philo's office in the app: project board, isometric room with desks and lounge, the mascot talking",
          },
          caption: "The office, Philo's home, as it is today. Test data and made-up names.",
        },
      },
      { kind: "heading", text: "How I built it" },
      {
        kind: "steps",
        items: [
          {
            when: "5 – 8 October",
            title: "Concept, identity and mascot",
            text: "A graph made of files, one node per file with source and date. And a P-shaped mascot made of thread, with two eyes: the red thread is slack when it's a proposal, taut when it's confirmed, dashed when it's waiting on some data.",
          },
          {
            when: "16 – 17 October",
            title: "The graph becomes a product",
            text: "Two days, over a hundred commits, not much sleep: a real database, the “to confirm” queue item by item, contradictions, sprints and stand-ups prepared by Philo, the phone version, the Mac app and the MCP server.",
          },
          {
            when: "22 – 27 October",
            title: "Philo's mind",
            text: "Philo learns to read code, docs and pull requests, with clear rules: who wins when sources disagree, two dates on every fact, check before speaking. And an exam built on its real mistakes.",
          },
          {
            when: "30 October – 11 November",
            title: "The office",
            text: "Two attempts thrown out, then the right shape: a single isometric office. The whole app moves to one style, flat colors and black outlines, and the initial load drops from 3.6 to 1.1 MB.",
          },
          {
            when: "20 November",
            title: "Philo sheds its skin",
            text: "The turning point: Philo stops being the “thread of the product process” with a brain of its own. From now on it reads and shows, and the company's knowledge graph does the remembering. That way it can grow with more teams and more data, without becoming yet another place to look for things.",
          },
        ],
      },
      {
        kind: "pair",
        figures: [
          {
            img: { src: "/assets/cases/philo/office-mind.jpg", alt: "Philo's mind: what it knows and from which tools" },
            caption: "Philo's mind: what it knows and where it knows it from, one tool per row.",
          },
          {
            img: { src: "/assets/cases/philo/identity.jpg", alt: "Philo's first identity: red palette, logo and mascot" },
            caption: "The first identity, later replaced by the office style.",
          },
        ],
      },
      {
        kind: "highlight",
        id: "philo-new",
        title: "New this week",
        blocks: [
          {
            kind: "steps",
            items: [
              {
                when: "19 – 20 November",
                title: "Philo in 3D",
                text: "I rebuilt the mascot in Blender: a real braided thread that changes shape with its mood. Eleven moods, each with its own little loop: when it's thinking it winds into a ball of yarn, when it's celebrating it ties itself into a bow.",
              },
              {
                when: "20 November",
                title: "A character for everyone",
                text: "Everyone designs their own character, who stands in for them at the desk and in the lounge: skin, pose, hair, clothes, accessories. Yes, the kitten on the head is in there too.",
              },
              {
                when: "20 November",
                title: "The office becomes a platform",
                text: "In Blender I tried seven ways to bring several teams together and picked the simplest: one tile per team around a shared lounge. Above each tile just two signals, yellow for what's new and red for what's stuck and concerns you.",
              },
            ],
          },
          {
            kind: "figure",
            figure: {
              img: { src: "/assets/cases/philo/mascot-3d-moods.jpg", alt: "The eleven moods of the Philo mascot in 3D" },
              caption: "Philo's eleven moods, rendered in Blender.",
            },
          },
          {
            kind: "pair",
            figures: [
              {
                img: {
                  src: "/assets/cases/philo/character-editor.jpg",
                  alt: "The character editor: the standing figure and the pill-shaped options",
                },
                caption: "“How people see you in the office”: the character editor.",
              },
              {
                img: {
                  src: "/assets/cases/philo/platform-zoom-out.jpg",
                  alt: "Top view of the platform: the team offices side by side around the shared lounge",
                },
                caption: "Zoom out: the team offices, yours in yellow, the shared lounge in the middle. Proposal from 20 November.",
              },
            ],
          },
        ],
      },
      { kind: "heading", text: "Decisions" },
      {
        kind: "decisions",
        items: [
          {
            title: "A calm interface",
            text: "Philo says hi once and then keeps quiet, and if nothing happens it falls asleep. A tool you use between calls should give you something, not ask for your attention.",
          },
          {
            title: "Source and date on every node",
            text: "Confirmed facts and hypotheses stay separate, even in the text. If you can't trust the answers, the product is worth nothing.",
          },
          {
            title: "Three levels of confirmation",
            text: "By late October the “to confirm” queue had 1,409 items nobody read. I split it into three levels: the yes is there to build trust, an endless queue kills it.",
          },
          {
            title: "Fixed rules where reliability matters",
            text: "Which code belongs to which project is decided by rules you can explain, not by the AI: every answer rests on those links.",
          },
        ],
      },
      {
        kind: "figure",
        figure: {
          img: { src: "/assets/cases/philo/shared-relax.jpg", alt: "Isometric plan of the shared lounge with sofas, games and a counter" },
          caption: "The plan of the shared lounge, to be approved before it gets built.",
        },
      },
      {
        kind: "tools",
        label: "Tools.",
        text: "Claude Design for the boards, Blender for the mascot, furniture and scenes; React 19, TypeScript, Vite and three.js; Electron for the Mac bar; Python with FastAPI and Postgres; an MCP server in TypeScript; Vitest, Playwright and automated checks on every pull request.",
      },
    ],
    next: [{ label: "Open STAT", open: "stat" }, { label: "Back to the desk", close: true }],
  },
};

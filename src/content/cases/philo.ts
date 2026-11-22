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
    tagline: "Il mio progetto più mio. Philo fa due cose: legge i programmi che usa il team e ne mette il succo nel knowledge graph, poi te lo fa vedere come un ufficio. Zoom in: tutto quello che succede nel tuo team. Zoom out: cosa succede negli altri.",
    blocks: [
      { kind: "demo", src: "/assets/videos/philo.mp4", poster: "/assets/videos/philo.jpg", label: "Video demo di Philo" },
      {
        kind: "facts",
        items: [
          { label: "Quando", value: "Ottobre – novembre 2026, ultime novità il 20 novembre" },
          {
            label: "Il mio ruolo",
            value: "Quasi tutto mio: idea, UX e UI, identità e mascotte, scene 3D in Blender, frontend e buona parte del backend. 342 commit su 367, per dire",
          },
          {
            label: "Per chi",
            value: "Il primo è il team di prodotto di Witailer, ma deve funzionare per qualunque team, qualunque programmi usi",
          },
        ],
      },
      {
        kind: "figure",
        figure: {
          img: {
            src: "/assets/cases/philo/video-thread.jpg",
            alt: "La mascotte di filo tira un filo rosso che lega ticket, documenti, dati, decisioni e chat tra le persone del team",
          },
          caption: "«Philo è il filo che tiene insieme tutto il lavoro.» Un fotogramma del video di presentazione.",
        },
      },
      { kind: "heading", text: "Il problema" },
      {
        kind: "text",
        text: "In un team il lavoro è sparso ovunque: commit, documenti, ticket, chat, call. Ognuno vede il suo pezzo, e quasi nessuno vede il resto. Così:",
      },
      {
        kind: "list",
        items: [
          "non sai chi sta facendo cosa, né cosa è fermo e chi può sbloccarlo;",
          "le decisioni si perdono tra una call e una chat, e dopo una settimana nessuno ricorda perché;",
          "quello che tocca a te lo scopri quando è già tardi;",
          "e di cosa fanno gli altri team, e di cosa cambia anche per te, non sai quasi niente.",
        ],
      },
      { kind: "heading", text: "Come funziona" },
      {
        kind: "steps",
        items: [
          {
            title: "Philo legge, il knowledge graph ricorda",
            text: "Philo legge i programmi del team e nel knowledge graph scrive solo il succo, senza rumore e senza sporcarlo. Non decide cosa è vero e non tiene una memoria sua: quello che è vero sta nel knowledge graph, con la sua fonte e la sua data.",
          },
          {
            title: "Philo propone, la persona decide",
            text: "Quello che Philo scrive passa da chi ha detto sì, con il suo login. Ognuno vede solo quello che può vedere: è il knowledge graph a decidere chi vede cosa, Philo lo rispetta.",
          },
          {
            title: "Zoom in, zoom out",
            text: "La home è un ufficio in isometria: le persone alle scrivanie, chi fa cosa, cosa è fermo, cosa si è deciso, cosa tocca a te. Con lo zoom out l'ufficio diventa una piattaforma: un riquadro per ogni team intorno a un relax comune.",
          },
          {
            title: "Risponde dove lavori",
            text: "Nell'app, in una barra che galleggia sul Mac e dentro Claude, con un server MCP. Fai una domanda e Philo ti risponde con quello che il team sa.",
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
      { kind: "heading", text: "Come l'ho costruito" },
      {
        kind: "steps",
        items: [
          {
            when: "5 – 8 ottobre",
            title: "Concept, identità e mascotte",
            text: "Un grafo fatto di file, un nodo per file con fonte e data. E una mascotte a forma di P fatta di filo, con due occhi: il filo rosso è morbido quando è una proposta, teso quando è confermato, tratteggiato quando è bloccato su un dato.",
          },
          {
            when: "16 – 17 ottobre",
            title: "Il grafo diventa un prodotto",
            text: "Due giorni, oltre cento commit, poco sonno: database vero, la coda «da confermare» voce per voce, le contraddizioni, sprint e stand-up preparati da Philo, la versione per telefono, l'app per Mac e il server MCP.",
          },
          {
            when: "22 – 27 ottobre",
            title: "La mente di Philo",
            text: "Philo impara a leggere codice, documenti e pull request, con regole chiare: chi vince quando le fonti non sono d'accordo, ogni fatto con due date, controllare prima di parlare. E un esame costruito sui suoi errori veri.",
          },
          {
            when: "30 ottobre – 11 novembre",
            title: "L'ufficio",
            text: "Due tentativi buttati, poi la forma giusta: un unico ufficio in isometria. Tutta l'app passa a un solo stile, colori piatti e linea nera, e il caricamento iniziale scende da 3,6 a 1,1 MB.",
          },
          {
            when: "20 novembre",
            title: "Philo cambia pelle",
            text: "Il punto di svolta: Philo smette di essere il «filo del processo di prodotto» con un cervello tutto suo. D'ora in poi legge e fa vedere, e a ricordare ci pensa il knowledge graph dell'azienda. Così può crescere con più team e più dati, senza diventare un altro posto dove cercare le cose.",
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
        kind: "highlight",
        id: "philo-new",
        title: "Le novità di questa settimana",
        blocks: [
          {
            kind: "steps",
            items: [
              {
                when: "19 – 20 novembre",
                title: "Philo in 3D",
                text: "Ho rifatto la mascotte in Blender: un vero filo intrecciato che cambia forma con l'umore. Undici umori, ognuno con il suo piccolo loop: quando pensa diventa un gomitolo, quando festeggia si fa fiocco.",
              },
              {
                when: "20 novembre",
                title: "Il personaggio di ognuno",
                text: "Ognuno si disegna il suo personaggio, che lo rappresenta alla scrivania e nel relax: pelle, posa, capelli, vestiti, accessori. Sì, c'è anche il gattino sulla testa.",
              },
              {
                when: "20 novembre",
                title: "L'ufficio diventa una piattaforma",
                text: "In Blender ho provato sette modi di mettere insieme più team e ho scelto il più semplice: un riquadro per team intorno a un relax comune. Sopra ogni riquadro solo due segnali, giallo per le novità e rosso per quello che è fermo e ti riguarda.",
              },
            ],
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
        ],
      },
      { kind: "heading", text: "Le decisioni" },
      {
        kind: "decisions",
        items: [
          {
            title: "Un'interfaccia calma",
            text: "Philo saluta una volta e poi sta buono, e se non succede niente si addormenta. Uno strumento che usi tra una call e l'altra deve darti qualcosa, non chiederti attenzione.",
          },
          {
            title: "Fonte e data su ogni nodo",
            text: "Fatti confermati e ipotesi restano separati, anche nel testo. Se non ti fidi delle risposte, il prodotto non vale niente.",
          },
          {
            title: "Tre livelli di conferma",
            text: "A fine ottobre la coda «da confermare» aveva 1.409 voci che nessuno leggeva. L'ho divisa in tre livelli: il sì serve alla fiducia, una coda infinita la uccide.",
          },
          {
            title: "Regole fisse dove serve affidabilità",
            text: "Quale codice appartiene a quale progetto lo decidono regole che si possono spiegare, non l'AI: tutte le risposte si appoggiano su quei collegamenti.",
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
    tagline: "The most mine of all my projects. Philo does two things: it reads the tools the team uses and puts the gist into the knowledge graph, then shows it to you as an office. Zoom in: everything happening in your team. Zoom out: what's going on in the others.",
    blocks: [
      { kind: "demo", src: "/assets/videos/philo-en.mp4", poster: "/assets/videos/philo-en.jpg", label: "Philo demo video" },
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
            src: "/assets/cases/philo/video-thread.jpg",
            alt: "The thread mascot pulls a red thread that ties together tickets, docs, data, decisions and chats between the people on the team",
          },
          caption: "“Philo is the thread that holds all the work together.” A frame from the intro video.",
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

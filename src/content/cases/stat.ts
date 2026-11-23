import type { Locale } from '@/i18n/types';
import type { CaseCopy } from './types';

/* Case study "STAT": Italian and English side by side, so the two stay in sync. */
export const stat: Record<Locale, CaseCopy> = {
  it: {
    folder: "Cartella a righe",
    tarot: "II · Lo Stratega",
    title: "STAT",
    hitLabel: "Cartella a righe rosa: STAT",
    blurb: "Rifare uno strumento che tutti sapevano già usare, senza farglielo odiare.",
    owner: "Progetto per Witailer (gruppo Alkemy)",
    tagline: "Il rifacimento di STAT, lo strumento interno che racconta come le persone cercano su Amazon. Il vecchio lo sapevano usare tutti: il nuovo doveva fare di più restando semplice come prima.",
    blocks: [
      { kind: "demo", src: "/assets/videos/stat-product.mp4?v=2", poster: "/assets/videos/stat-product.jpg?v=2", label: "Video demo di STAT" },
      {
        kind: "facts",
        items: [
          { label: "Quando", value: "Luglio – novembre 2026" },
          { label: "Il mio ruolo", value: "Ricerca, UX e UI, tutto il frontend e il flusso con l'AI" },
          { label: "Per chi", value: "I team che seguono i clienti su Amazon: account, strategia, contenuti e pubblicità" },
          {
            label: "Con",
            value: "Il senior product designer e il customer success manager, con cui ho intervistato gli utenti interni; il tech lead, che ha costruito il backend",
          },
        ],
      },
      {
        kind: "pair",
        figures: [
          {
            img: {
              src: "/assets/cases/stat/before-legacy-keyword-page.jpg",
              alt: "Il vecchio STAT: una ricerca, tre numeri grandi con le loro curve",
            },
            caption: "Prima. Il vecchio STAT: una ricerca, tre numeri grandi, una curva. Lo sapevano usare tutti.",
          },
          {
            img: { src: "/assets/cases/stat/stat2-home-search.jpg", alt: "STAT 2.0: la domanda Da dove partiamo oggi e una ricerca sola" },
            caption: "Dopo. STAT 2.0: una domanda e una ricerca, come nel vecchio STAT, ma con tutto il mercato dietro.",
          },
        ],
      },
      { kind: "heading", text: "Design thinking" },
      {
        kind: "steps",
        items: [
          {
            title: "Il bisogno",
            text: "STAT racconta come le persone cercano su Amazon: parole chiave, marchi, categorie, mese per mese. Col tempo era diventato poco più di una barra di ricerca. Per un'analisi di categoria bisognava saltare tra cinque o più strumenti. Con la fine del vecchio sistema di report si erano persi l'export dello storico e la ricerca da prodotto a parole chiave. La crescita rispetto alla categoria si calcolava a mano e le categorie su misura si costruivano fuori dallo strumento.",
          },
          {
            when: "Maggio 2026",
            title: "La decisione",
            text: "È stata una decisione del team: il prodotto era molto legacy e andava aggiornato. L'obiettivo era rifarlo da zero, smart e moderno, con il vecchio come punto di riferimento e non come base.",
          },
          {
            title: "La complessità",
            text: "Dietro, il sistema era fermo al 2024: dati aggiornati a mano, solo mensili, confrontati solo con l'anno prima. Davanti, uno strumento che le persone sapevano già usare. Il nuovo doveva fare molto di più senza togliere quella semplicità.",
          },
        ],
      },
      { kind: "heading", text: "Ricerca UX" },
      {
        kind: "steps",
        items: [
          {
            title: "Il vecchio STAT e le interviste",
            text: "Sono partita dal vecchio STAT e, insieme al senior product designer e al customer success manager, ho intervistato gli utenti interni che lo usavano.",
          },
          {
            title: "Il PRD",
            text: "Ho scritto il PRD, il documento di prodotto, con i profili delle persone che avrebbero usato STAT.",
          },
          {
            when: "Ottobre 2026",
            title: "I primi feedback sul prototipo",
            text: "Ho messo il prototipo davanti a chi l'avrebbe usato davvero. Una richiesta del team contenuti è diventata una schermata utile a tutti. Un responsabile l'ha trovato «molto tecnico»: andava bene per i team interni, meno per clienti e management.",
          },
          {
            when: "28 ottobre – 11 novembre 2026",
            title: "Il feedback dei colleghi",
            text: "Nelle prove dei colleghi tornava sempre la stessa frase: «il vecchio STAT lo poteva usare anche mia mamma». Il nuovo sembrava complicato: tre campi di ricerca, troppi numeri, etichette in inglese.",
          },
          {
            when: "28 ottobre – 7 novembre 2026",
            title: "I flussi del vecchio STAT, rimappati",
            text: "Con gli utenti pilota interni ho rimappato il vecchio STAT schermata per schermata: 19 schermate e 10 percorsi, con tutti i clic. Poi l'ho confrontato pezzo per pezzo con il nuovo, per capire cosa si aspettavano di trovare.",
          },
        ],
      },
      { kind: "heading", text: "Processo di design" },
      {
        kind: "steps",
        items: [
          {
            title: "Un flusso per profilo, poi uno solo",
            text: "Per ogni profilo del PRD ho disegnato i percorsi di navigazione. Poi li ho uniti in un unico flusso su Forest UI, la UI di Witailer fatta dal senior product designer.",
          },
          {
            when: "Luglio – ottobre 2026",
            title: "Un prototipo cliccabile su dati finti",
            text: "Niente backend, niente login, tutto cliccabile. Un'unica struttura: menu per fasi (scopri, analizza, agisci, rivedi), periodo e mercato sempre in alto, Forest UI per ogni componente. Dentro, le idee nuove: perimetri di lavoro per cliente, liste, avvisi, stagionalità, ricerca a parole.",
          },
          {
            when: "7 novembre 2026",
            title: "La nuova direzione",
            text: "Dopo i feedback e la rimappatura la direzione era chiara: «STAT torna a sembrare il vecchio STAT, a prova di errore». Ho adattato la UX a quello che gli utenti pilota si aspettavano.",
          },
          {
            when: "11 – 20 novembre 2026",
            title: "Il modello finale",
            text: "Una sola porta: la barra di ricerca. Ogni ricerca porta a una panoramica con le risposte che tutti si aspettano: cresce? quanto? chi vince? Le novità stanno un passo dietro, mai davanti.",
          },
        ],
      },
      {
        kind: "figure",
        figure: {
          img: {
            src: "/assets/cases/stat/prototype-keyword-page.jpg",
            alt: "Il prototipo: la pagina di una parola chiave con i numeri, il confronto con la categoria e una lettura scritta accanto al grafico",
          },
          caption: "Il prototipo: la pagina di una parola chiave con volume, crescita, confronto con la categoria e una lettura scritta accanto al grafico. Dati finti.",
        },
      },
      {
        kind: "pair",
        figures: [
          {
            img: {
              src: "/assets/cases/stat/prototype-pool-proposal.jpg",
              alt: "Un perimetro che propone le parole da aggiungere e aspetta un sì",
            },
            caption: "Un perimetro che si aggiorna da solo, ma propone e non decide.",
          },
          {
            img: { src: "/assets/cases/stat/prototype-ask-plain-language.jpg", alt: "Una frase che diventa filtri visibili" },
            caption: "La ricerca a parole: la frase diventa filtri che vedi e puoi togliere.",
          },
        ],
      },
      { kind: "heading", text: "UI" },
      {
        kind: "steps",
        items: [
          {
            title: "Familiare, ma più potente",
            text: "Chi apre il nuovo STAT deve riconoscere il vecchio e trovare di più. Le persone il vecchio lo sapevano già usare, quindi le novità non sono la prima cosa che si trovano davanti.",
          },
          {
            title: "Invio fa sempre la stessa cosa",
            text: "Apre l'elenco delle parole che contengono quel testo. Provare a indovinare se si cercava un marchio o una parola sbagliava una volta su due.",
          },
          {
            title: "«Salva» chiede a cosa serve",
            text: "Per un lavoro, da seguire ogni settimana, o «non lo so ancora». Si sceglie cosa si vuole fare invece di imparare un termine nuovo.",
          },
          {
            title: "Ogni crescita ha un nome",
            text: "Nessuna percentuale da sola: ogni crescita dice di cosa parla e rispetto a quando.",
          },
        ],
      },
      {
        kind: "figure",
        figure: {
          img: {
            src: "/assets/cases/stat/stat2-keyword-page.jpg",
            alt: "STAT 2.0: la pagina di una parola con tre riquadri grandi, valori coperti",
          },
          caption: "La pagina di una parola in STAT 2.0: di nuovo tre numeri grandi, con Panoramica e Dettagli. I valori sono coperti.",
        },
      },
      { kind: "heading", text: "Sviluppo" },
      {
        kind: "steps",
        items: [
          {
            when: "Da fine settembre 2026",
            title: "Il frontend di STAT 2.0",
            text: "Mentre il prototipo girava ho cominciato il frontend vero, in Next.js, collegato ai dati reali. Il frontend l'ho fatto tutto io, il backend il tech lead. Il 12 ottobre è uscita la prima versione.",
          },
          {
            title: "Un flusso con l'AI",
            text: "Il flusso con l'AI guida chi lo usa nella lettura dei dati e dei grafici, e fa una ricerca incrociata tra parole chiave, categorie, marchi e prodotti, che senza AI andrebbero letti come silos separati. L'interfaccia della risposta cambia a seconda della domanda, seguendo i principi di Sentient Design.",
          },
        ],
      },
      { kind: "heading", text: "Ingegnerizzazione" },
      {
        kind: "steps",
        items: [
          {
            title: "Ogni schermata controllata",
            text: "Con Playwright controllo ogni schermata su computer e su telefono.",
          },
          {
            title: "Un rilascio in due tempi",
            text: "Il primo rilascio va a tester e colleghi interni. Le funzioni a pagamento arrivano con il secondo.",
          },
        ],
      },
      { kind: "heading", text: "Le sfide e come le ho affrontate" },
      {
        kind: "decisions",
        items: [
          {
            title: "Il nuovo sembrava più complicato del vecchio",
            text: "Nelle prove i colleghi lo trovavano più complicato del vecchio. Ho rimappato il vecchio STAT con gli utenti pilota e da lì ho cambiato direzione: una sola barra di ricerca e le novità un passo dietro.",
          },
          {
            title: "Profili diversi, un solo prodotto",
            text: "Ho disegnato i percorsi di navigazione per ogni profilo del PRD e poi li ho uniti in un unico flusso su Forest UI.",
          },
          {
            title: "Progettare prima di avere il backend",
            text: "Ho fatto un prototipo cliccabile su dati finti, senza backend. Da fine settembre, in parallelo, ho costruito il frontend vero sui dati reali: la prima versione è uscita il 12 ottobre.",
          },
          {
            title: "Una ricerca che sbagliava una volta su due",
            text: "Provare a indovinare se si cercava un marchio o una parola non funzionava. Ho deciso che Invio fa sempre la stessa cosa: apre l'elenco delle parole che contengono quel testo.",
          },
        ],
      },
      { kind: "heading", text: "Il risultato" },
      {
        kind: "numbers",
        items: [
          { value: "12 ottobre", label: "la prima versione di STAT 2.0 sui dati reali" },
          { value: "In sviluppo", label: "STAT 2.0 non è ancora rilasciato a tutti" },
        ],
      },
      {
        kind: "tools",
        label: "Strumenti.",
        text: "React 19 e Vite per il prototipo; Next.js 16, React 19 e Forest UI per il prodotto; Playwright per controllare ogni schermata su computer e telefono; Claude Code come compagno di sviluppo.",
      },
    ],
    next: [{ label: "Apri Studio AI", open: "studio" }, { label: "Apri Philo", open: "philo" }],
  },
  en: {
    folder: "Striped folder",
    tarot: "II · The Strategist",
    title: "STAT",
    hitLabel: "Pink striped folder: STAT",
    blurb: "Rebuilding a tool everyone already knew how to use, without making them hate it.",
    owner: "A project for Witailer (Alkemy group)",
    tagline: "Rebuilding from scratch a tool everyone already knew how to use, without making them hate it. From a prototype on fake data, through feedback, all the way to STAT 2.0.",
    blocks: [
      { kind: "demo", src: "/assets/videos/stat-product-en.mp4?v=2", poster: "/assets/videos/stat-product-en.jpg?v=2", label: "STAT demo video" },
      {
        kind: "facts",
        items: [
          { label: "When", value: "July – November 2026" },
          { label: "My role", value: "UX, UI and all of the frontend. A colleague did the backend" },
          { label: "Who it's for", value: "The teams that look after clients on Amazon: account, strategy, content, advertising" },
        ],
      },
      {
        kind: "pair",
        figures: [
          {
            img: { src: "/assets/cases/stat/before-legacy-keyword-page.jpg", alt: "The old STAT: a search, three big numbers with their curves" },
            caption: "Before. The old STAT: one search, three big numbers, one curve. Everyone knew how to use it.",
          },
          {
            img: { src: "/assets/cases/stat/stat2-home-search.jpg", alt: "STAT 2.0: the question Where do we start today and a single search" },
            caption: "After. STAT 2.0: one question and one search, like the old STAT, but with the whole market behind it.",
          },
        ],
      },
      { kind: "heading", text: "Where we started" },
      {
        kind: "text",
        text: "STAT shows how people search on Amazon: keywords, brands, categories, month by month. Over time, though, it had become little more than a search bar:",
      },
      {
        kind: "list",
        items: [
          "for a category analysis you had to jump between five or more different tools;",
          "when the old reporting system was retired, we lost the history export and the product-to-keyword search;",
          "growth against the category was worked out by hand, and custom categories were built outside the tool;",
          "behind it, the system was stuck in 2024: data updated by hand, monthly only, compared only with the year before.",
        ],
      },
      { kind: "text", text: "In May 2026 we decided to rebuild it from scratch, with the old one as a reference, not as a base." },
      { kind: "heading", text: "How it went" },
      {
        kind: "steps",
        items: [
          {
            when: "July – October",
            title: "A clickable prototype on fake data",
            text: "No backend, no login, everything clickable. One structure: a menu by phase (discover, analyze, act, review), period and market always at the top, Witailer's design system for every component. 144 commits full of new ideas: work scopes per client, lists, alerts, seasonality, plain-language search.",
          },
          {
            when: "October",
            title: "First feedback",
            text: "I put the prototype in front of the people who would actually use it. A request from the content team became a screen everyone found useful. One manager, though, found it “very technical”: fine for internal teams, unclear for clients and management. Noted.",
          },
          {
            when: "From late September",
            title: "The real product, in parallel",
            text: "While the prototype was making the rounds, I started the real STAT 2.0 frontend in Next.js, hooked up to real data. The first version came out on 12 October.",
          },
          {
            when: "25 October",
            title: "A navigation test",
            text: "Six profiles taken from the product document, each with a real task, all recorded on video. Result: two tasks out of six completed. It hurt, but it helped. I lined up the problems by severity: pages that don't say what they're for, the same word with three meanings, empty columns with no explanation.",
          },
          {
            when: "28 October – 11 November",
            title: "The feedback that changed direction",
            text: "In my colleagues' tests the same line kept coming back: “even my mum could use the old STAT”. The new one felt complicated: three search fields, too many numbers, labels in English. They were right.",
          },
          {
            when: "28 October – 7 November",
            title: "Back to what worked",
            text: "I took the old STAT apart screen by screen, 19 screens and 10 journeys with every click, and compared it piece by piece with the new one. By 7 November the direction was clear: “STAT goes back to looking like the old STAT, foolproof”.",
          },
          {
            when: "11 – 20 November",
            title: "The final model",
            text: "One single door: the search bar. Every search leads to an overview with the answers everyone expects: is it growing? by how much? who's winning? All the new stuff sits one step behind, never in front.",
          },
        ],
      },
      {
        kind: "figure",
        figure: {
          img: {
            src: "/assets/cases/stat/prototype-keyword-page.jpg",
            alt: "The prototype: a keyword page with the numbers, the comparison with the category and a written reading next to the chart",
          },
          caption: "The prototype: a keyword page with volume, growth, comparison with the category and a written reading next to the chart. Fake data.",
        },
      },
      {
        kind: "pair",
        figures: [
          {
            img: { src: "/assets/cases/stat/prototype-pool-proposal.jpg", alt: "A scope that suggests keywords to add and waits for a yes" },
            caption: "A scope that updates itself, but suggests rather than decides.",
          },
          {
            img: { src: "/assets/cases/stat/prototype-ask-plain-language.jpg", alt: "A sentence that turns into visible filters" },
            caption: "Plain-language search: the sentence becomes filters you can see and remove.",
          },
        ],
      },
      { kind: "heading", text: "Decisions" },
      {
        kind: "decisions",
        items: [
          {
            title: "Familiar, but more powerful",
            text: "Opening the new STAT, you should think “it's the same one, but it does more”. People already knew how to use the old one: the new features shouldn't be the first thing they run into.",
          },
          {
            title: "Enter always does the same thing",
            text: "It opens the list of keywords that contain that text. Trying to guess whether you meant a brand or a keyword got it wrong half the time.",
          },
          {
            title: "“Save” asks what it's for",
            text: "For a job, to follow every week, or “I don't know yet”. Better to pick what you want to do than to learn a new term.",
          },
          {
            title: "Every growth figure has a name",
            text: "Never a “+12%” tossed in: every percentage says what it's about and compared to when.",
          },
        ],
      },
      {
        kind: "figure",
        figure: {
          img: { src: "/assets/cases/stat/stat2-keyword-page.jpg", alt: "STAT 2.0: a keyword page with three big panels, values covered" },
          caption: "A keyword page in STAT 2.0: three big numbers again, with Overview and Details. The values are covered.",
        },
      },
      { kind: "heading", text: "The result" },
      {
        kind: "numbers",
        items: [
          { value: "144", label: "commits on the prototype, July to October" },
          { value: "365", label: "commits on STAT 2.0, almost all frontend" },
          { value: "142", label: "pull requests merged into the product" },
          { value: "16", label: "releases shipped, from 2.1 to 2.13" },
        ],
      },
      { kind: "text", text: "The first release goes to testers and colleagues in-house; paid features come with the second." },
      {
        kind: "tools",
        label: "Tools.",
        text: "React 19 and Vite for the prototype; Next.js 16, React 19 and Witailer's design system for the product; Playwright to check every screen on desktop and phone; navigation tests recorded on video; Claude Code as a coding partner.",
      },
    ],
    next: [{ label: "Open Studio AI", open: "studio" }, { label: "Open Philo", open: "philo" }],
  },
};

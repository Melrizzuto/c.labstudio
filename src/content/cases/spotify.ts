import type { Locale } from '@/i18n/types';
import type { CaseCopy } from './types';

/* Case study "Spotify Mood": Italian and English side by side, so the two stay in sync. */
export const spotify: Record<Locale, CaseCopy> = {
  it: {
    folder: "Cartella a onde",
    tarot: "IV · L'Ascoltatrice",
    title: "Spotify Mood",
    hitLabel: "Cartella nera a onde verdi: Spotify Mood",
    blurb: "E se Spotify ti facesse scoprire musica nuova partendo da come ti senti?",
    owner: "Concept di un project work accademico, non affiliato a Spotify",
    tagline: "Un concept per scoprire musica nuova su Spotify partendo da come ti senti. È il project work di gruppo del mio master in UX design.",
    blocks: [
      {
        kind: "demo",
        src: "/assets/videos/spotify-mood-product.mp4?v=3",
        poster: "/assets/videos/spotify-mood-product.jpg?v=3",
        label: "Video demo di Spotify Mood",
      },
      {
        kind: "facts",
        items: [
          { label: "Quando", value: "2025, project work dello UX Design Essential Master di Talent Garden" },
          { label: "Il mio ruolo", value: "UX designer: le interviste e la UI a bassa fedeltà, con alcune parti dei flussi di navigazione" },
          { label: "Per chi", value: "Chi ascolta musica su Spotify. È un concept fatto in aula, non un progetto per Spotify" },
          { label: "Con", value: "Un gruppo di quattro persone del master" },
        ],
      },
      {
        kind: "figure",
        figure: {
          img: {
            src: "/assets/cases/spotify-mood/cover.jpg",
            alt: "Spotify Mood: il logo e tante faccine che cambiano umore",
            width: 1600,
            height: 900,
          },
          caption: "«Hear what do you feel»: l'idea in una slide.",
        },
      },
      { kind: "heading", text: "Design thinking" },
      {
        kind: "steps",
        items: [
          {
            title: "Il brief",
            text: "La domanda di partenza era questa: come può il design restituire potere decisionale, autonomia e controllo a chi ascolta, senza rinunciare alla qualità delle raccomandazioni dell'algoritmo?",
          },
          {
            title: "Il problema",
            text: "Chi ascolta può sentire di aver perso il controllo su quello che ascolta. Il brief chiedeva di ridurre questa frustrazione.",
          },
          {
            title: "Gli obiettivi",
            text: "Trovare un equilibrio tra la musica proposta dall'algoritmo e la propria libreria. Rendere di nuovo la scoperta musicale attiva e consapevole. Tenere le persone soddisfatte nel tempo, non solo per una sera.",
          },
        ],
      },
      {
        kind: "figure",
        figure: {
          img: { src: "/assets/cases/spotify-mood/brief.jpg", alt: "Il brief di partenza e gli obiettivi di Spotify", width: 1600, height: 900 },
          caption: "Il brief di partenza, così come ce l'hanno dato.",
        },
      },
      { kind: "heading", text: "Ricerca UX" },
      {
        kind: "steps",
        items: [
          {
            title: "Le interviste",
            text: "Prima di disegnare abbiamo intervistato persone reali, fuori dall'aula: cosa ascoltano, quando, e come scoprono musica nuova.",
          },
          {
            title: "Cosa è emerso",
            text: "Si ascolta musica tutto il giorno, durante le pulizie, in palestra e nel tempo libero, quasi sempre con le playlist suggerite. Le canzoni nuove però si scoprono fuori da Spotify, e quasi nessuno nota che le playlist sono personalizzate. Abbiamo riassunto tutto in tre insight.",
          },
          {
            title: "Dai bisogni ai mindset",
            text: "Abbiamo mappato tutti i bisogni emersi, li abbiamo raggruppati per affinità e tradotti in mindset. Per ognuno abbiamo individuato gain e pain point.",
          },
          {
            title: "Il mindset",
            text: "Dagli insight abbiamo disegnato un mindset, «lo stagnato multitasking»: ascolta mentre fa altro, vuole subito la playlist giusta e riascolta sempre le stesse cose. Un po' si annoia, ma sceglie la comodità.",
          },
          {
            title: "La mappa dell'esperienza",
            text: "Abbiamo diviso il suo ascolto in cinque fasi: avvio, scelta rapida, ascolto passivo, routine, fine sessione. Il momento critico è la routine, quando la comodità diventa noia.",
          },
        ],
      },
      {
        kind: "pair",
        figures: [
          {
            img: { src: "/assets/cases/spotify-mood/interviews.jpg", alt: "Le domande e le risposte delle interviste", width: 1600, height: 900 },
            caption: "Le interviste: cosa si ascolta, quando e come si scopre musica nuova.",
          },
          {
            img: { src: "/assets/cases/spotify-mood/insights.jpg", alt: "I tre insight della ricerca", width: 1600, height: 900 },
            caption: "Tre insight, tre post-it.",
          },
        ],
      },
      {
        kind: "figure",
        figure: {
          img: {
            src: "/assets/cases/spotify-mood/persona.jpg",
            alt: "Il mindset dello stagnato multitasking: obiettivi, bisogni, criticità, cosa pensa, prova e fa",
            width: 1600,
            height: 900,
          },
          caption: "«Lo stagnato multitasking»: il mindset che abbiamo seguito.",
        },
      },
      {
        kind: "figure",
        figure: {
          img: {
            src: "/assets/cases/spotify-mood/experience-map.jpg",
            alt: "La mappa dell'esperienza: avvio, scelta rapida, ascolto passivo, routine, fine sessione",
            width: 1600,
            height: 900,
          },
          caption: "La mappa dell'esperienza: il momento critico è la routine, quando la comodità diventa noia.",
        },
      },
      { kind: "heading", text: "Processo di design" },
      {
        kind: "steps",
        items: [
          {
            title: "How might we",
            text: "Con le domande «How might we» abbiamo cercato le funzioni che potessero rispondere a quei bisogni. Quella su cui abbiamo lavorato: come far scoprire musica nuova in modo stimolante e proattivo, per rompere le abitudini di ascolto, in modo semplice e coinvolgente.",
          },
          {
            title: "Mood Discovery",
            text: "Spotify capisce come ti senti e ti propone la musica adatta a quel momento: playlist su misura, legami emotivi e la possibilità di provare altri mood.",
          },
          {
            title: "Mood Match",
            text: "Ti collega a chi ha il tuo stesso stato d'animo: vedi in tempo reale cosa ascoltano gli altri con il tuo mood.",
          },
          {
            title: "Shock Mood",
            text: "Ti propone playlist di un altro umore, per uscire dalla tua zona emotiva e cambiare ascolto.",
          },
          {
            title: "Mood Match in due versioni",
            text: "Per Mood Match abbiamo disegnato due wireframe. Nel primo si parte dal brano in ascolto e si arriva alle playlist di chi ha lo stesso mood. Nel secondo si dice sì o no alle playlist degli altri, come in un gioco.",
          },
        ],
      },
      {
        kind: "figure",
        figure: {
          img: {
            src: "/assets/cases/spotify-mood/wire-a.jpg",
            alt: "Wireframe di Mood Match, opzione A: home, brano in ascolto, playlist di un altro utente, playlist abbinata",
            width: 1600,
            height: 759,
          },
          caption: "Mood Match, prima opzione: dal brano che stai ascoltando alle playlist di chi ha il tuo stesso mood.",
        },
      },
      {
        kind: "figure",
        figure: {
          img: {
            src: "/assets/cases/spotify-mood/wire-b.jpg",
            alt: "Wireframe di Mood Match, opzione B: home, pagina mood match con sì e no, playlist abbinata",
            width: 1600,
            height: 1031,
          },
          caption: "Seconda opzione: dici sì o no alle playlist degli altri, come in un gioco.",
        },
      },
      { kind: "heading", text: "UI" },
      {
        kind: "steps",
        items: [
          {
            title: "Dal wireframe al mockup",
            text: "Abbiamo portato i wireframe di Mood Match nello stile di Spotify.",
          },
          {
            title: "Mood Discovery in home",
            text: "Una card in home invita a uscire dalla propria bolla musicale.",
          },
          {
            title: "Mood Match sotto il player",
            text: "Sotto il brano in ascolto compaiono le playlist di chi ha lo stesso mood.",
          },
        ],
      },
      {
        kind: "figure",
        figure: {
          img: { src: "/assets/cases/spotify-mood/mockups.jpg", alt: "I mockup finali di Mood Match in stile Spotify", width: 1600, height: 861 },
          caption: "Dal wireframe al mockup: Mood Match nello stile di Spotify.",
        },
      },
      {
        kind: "pair",
        figures: [
          {
            img: {
              src: "/assets/cases/spotify-mood/mood-discovery.jpg",
              alt: "La home con la card Mood Discovery: esci dalla tua bolla musicale",
              width: 1600,
              height: 900,
            },
            caption: "Mood Discovery in home: «Esci dalla tua bolla musicale».",
          },
          {
            img: { src: "/assets/cases/spotify-mood/mood-match.jpg", alt: "Il player con Mood Match sotto il brano", width: 1600, height: 900 },
            caption: "Mood Match sotto il player: le playlist di chi ha il tuo stesso mood.",
          },
        ],
      },
      { kind: "heading", text: "Le sfide e come le abbiamo affrontate" },
      {
        kind: "decisions",
        items: [
          {
            title: "Capire il problema prima di disegnare",
            text: "Prima di qualsiasi wireframe abbiamo fatto le interviste, raccolto tre insight, disegnato un mindset e una mappa dell'esperienza.",
          },
          {
            title: "La musica nuova si scopre fuori da Spotify",
            text: "Con Mood Match la scoperta passa dentro l'app: vedi in tempo reale cosa ascolta chi ha il tuo stesso mood.",
          },
          {
            title: "La routine, dove la comodità diventa noia",
            text: "Le nuove funzioni stanno dove si ascolta già: Mood Discovery in home, Mood Match sotto il player. Shock Mood propone playlist di un altro umore per uscire dall'abitudine.",
          },
          {
            title: "Più di un modo di fare Mood Match",
            text: "Abbiamo disegnato due versioni in wireframe, una che parte dal brano in ascolto e una con sì e no alle playlist degli altri, prima di passare al mockup.",
          },
        ],
      },
      { kind: "heading", text: "Il risultato" },
      {
        kind: "steps",
        items: [
          {
            title: "Il concept",
            text: "Il progetto si chiude con tre funzioni, i wireframe e i mockup di Mood Match e una presentazione finale.",
          },
          {
            title: "Il metodo",
            text: "Qui ho imparato a non partire dalle schermate: prima le persone, poi gli insight, il mindset e la mappa dell'esperienza, e solo alla fine l'interfaccia. È il metodo che uso ancora oggi in Witailer.",
          },
        ],
      },
      {
        kind: "figure",
        figure: {
          img: {
            src: "/assets/cases/spotify-mood/claim.jpg",
            alt: "Scopri come ti senti, ascolta cosa ti serve, lasciati sorprendere",
            width: 1600,
            height: 900,
          },
          caption: "La chiusura della presentazione.",
        },
      },
      {
        kind: "tools",
        label: "Strumenti.",
        text: "Interviste, mindset ed experience map per la ricerca; Figma per wireframe, mockup e presentazione.",
      },
    ],
    next: [{ label: "Torna alla scrivania", close: true }, { label: "Apri NewsQuest", open: "newsquest" }],
  },
  en: {
    folder: "Waves folder",
    tarot: "IV · The Listener",
    title: "Spotify Mood",
    hitLabel: "Black folder with green waves: Spotify Mood",
    blurb: "What if Spotify helped you find new music based on how you feel?",
    owner: "Concept from an academy project work, not affiliated with Spotify",
    tagline: "What if Spotify helped you find new music based on how you feel? The project work from my master's in UX design.",
    blocks: [
      {
        kind: "demo",
        src: "/assets/videos/spotify-mood-product-en.mp4?v=3",
        poster: "/assets/videos/spotify-mood-product-en.jpg?v=3",
        label: "Spotify Mood demo video",
      },
      {
        kind: "figure",
        figure: {
          img: {
            src: "/assets/cases/spotify-mood/cover.jpg",
            alt: "Spotify Mood: the logo and lots of little faces changing mood",
            width: 1600,
            height: 900,
          },
          caption: "“Hear what do you feel”: the idea in one slide.",
        },
      },
      {
        kind: "facts",
        items: [
          { label: "When", value: "2025, project work for Talent Garden's UX Design Essential Master" },
          { label: "My role", value: "UX/UI designer in a group of four: research, wireframes and mockups" },
          { label: "What it is", value: "A redesign concept made in class, not a project for Spotify" },
        ],
      },
      { kind: "heading", text: "The brief" },
      {
        kind: "text",
        text: "The starting question: how can design give listeners back their say, autonomy and control, without giving up how good the algorithm's recommendations are?",
      },
      {
        kind: "list",
        items: [
          "find a balance between the music the algorithm suggests and your own library;",
          "ease the frustration of people who feel they've lost control;",
          "make discovering music something active and intentional again;",
          "keep people happy over time, not just for one evening.",
        ],
      },
      {
        kind: "figure",
        figure: {
          img: { src: "/assets/cases/spotify-mood/brief.jpg", alt: "The starting brief and Spotify's goals", width: 1600, height: 900 },
          caption: "The starting brief, exactly as it was given to us.",
        },
      },
      { kind: "heading", text: "We started with people" },
      {
        kind: "text",
        text: "Before designing anything, we went and asked. The interviews painted a very clear picture: people listen to music all day, while cleaning, at the gym and in their free time, almost always with suggested playlists. But they find new songs outside Spotify, and hardly anyone notices that playlists are personalized.",
      },
      {
        kind: "pair",
        figures: [
          {
            img: { src: "/assets/cases/spotify-mood/interviews.jpg", alt: "The interview questions and answers", width: 1600, height: 900 },
            caption: "The interviews: what people listen to, when, and how they find new music.",
          },
          {
            img: { src: "/assets/cases/spotify-mood/insights.jpg", alt: "The three insights from the research", width: 1600, height: 900 },
            caption: "Three insights, three post-its.",
          },
        ],
      },
      {
        kind: "text",
        text: "From there we drew our mindset, “the stuck multitasker”: listens while doing other things, wants the right playlist right away and keeps replaying the same stuff. A bit bored, but convenience wins.",
      },
      {
        kind: "figure",
        figure: {
          img: {
            src: "/assets/cases/spotify-mood/persona.jpg",
            alt: "The stuck multitasker mindset: goals, needs, pain points, what they think, feel and do",
            width: 1600,
            height: 900,
          },
          caption: "“The stuck multitasker”: the mindset we followed.",
        },
      },
      {
        kind: "figure",
        figure: {
          img: {
            src: "/assets/cases/spotify-mood/experience-map.jpg",
            alt: "The experience map: start, quick pick, passive listening, routine, end of session",
            width: 1600,
            height: 900,
          },
          caption: "The experience map: the critical moment is the routine, when convenience turns into boredom.",
        },
      },
      { kind: "heading", text: "The right question" },
      {
        kind: "quote",
        text: "How might we help people discover new music in a stimulating, proactive way, breaking their listening habits and widening what they know, simply but engagingly?",
      },
      { kind: "heading", text: "Three features, one idea" },
      {
        kind: "steps",
        items: [
          {
            title: "Mood Discovery",
            text: "Spotify picks up on how you feel and takes you to the right music for that moment: tailored playlists, emotional connections and the freedom to try other moods.",
          },
          {
            title: "Mood Match",
            text: "Connects you with people who are in the same mood as you: see in real time what others with your mood are listening to.",
          },
          {
            title: "Shock Mood",
            text: "Pushes you out of your emotional comfort zone with playlists in a different mood, to surprise you, inspire you or just shake things up.",
          },
        ],
      },
      {
        kind: "figure",
        figure: {
          img: {
            src: "/assets/cases/spotify-mood/wire-a.jpg",
            alt: "Mood Match wireframe, option A: home, track playing, another user's playlist, matched playlist",
            width: 1600,
            height: 759,
          },
          caption: "Mood Match, first option: from the track you're listening to, to playlists from people in your same mood.",
        },
      },
      {
        kind: "figure",
        figure: {
          img: {
            src: "/assets/cases/spotify-mood/wire-b.jpg",
            alt: "Mood Match wireframe, option B: home, mood match page with yes and no, matched playlist",
            width: 1600,
            height: 1031,
          },
          caption: "Second option: you say yes or no to other people's playlists, like a game.",
        },
      },
      {
        kind: "figure",
        figure: {
          img: {
            src: "/assets/cases/spotify-mood/mockups.jpg",
            alt: "The final Mood Match mockups in Spotify's style",
            width: 1600,
            height: 861,
          },
          caption: "From wireframe to mockup: Mood Match in Spotify's style.",
        },
      },
      {
        kind: "pair",
        figures: [
          {
            img: {
              src: "/assets/cases/spotify-mood/mood-discovery.jpg",
              alt: "The home screen with the Mood Discovery card: step out of your music bubble",
              width: 1600,
              height: 900,
            },
            caption: "Mood Discovery on the home screen: “Step out of your music bubble”.",
          },
          {
            img: {
              src: "/assets/cases/spotify-mood/mood-match.jpg",
              alt: "The player with Mood Match under the track",
              width: 1600,
              height: 900,
            },
            caption: "Mood Match under the player: playlists from people in your same mood.",
          },
        ],
      },
      { kind: "heading", text: "What I took away" },
      {
        kind: "text",
        text: "This is the project where I learned not to start from screens: people first, then insights, the mindset and the experience map, and only at the very end the buttons. It's the method I still use at Witailer today.",
      },
      {
        kind: "figure",
        figure: {
          img: {
            src: "/assets/cases/spotify-mood/claim.jpg",
            alt: "Discover how you feel, listen to what you need, let yourself be surprised",
            width: 1600,
            height: 900,
          },
          caption: "The closing slide of the presentation.",
        },
      },
      {
        kind: "tools",
        label: "Tools.",
        text: "Interviews, mindset and experience map for the research; Figma for wireframes, mockups and the presentation.",
      },
    ],
    next: [{ label: "Back to the desk", close: true }, { label: "Open NewsQuest", open: "newsquest" }],
  },
};

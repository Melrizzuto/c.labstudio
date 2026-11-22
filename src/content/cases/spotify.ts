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
    tagline: "E se Spotify ti facesse scoprire musica nuova partendo da come ti senti? Il project work del mio master in UX design.",
    blocks: [
      {
        kind: "demo",
        src: "/assets/videos/spotify-mood.mp4",
        poster: "/assets/videos/spotify-mood.jpg",
        label: "Video demo di Spotify Mood",
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
      {
        kind: "facts",
        items: [
          { label: "Quando", value: "2025, project work dello UX Design Essential Master di Talent Garden" },
          { label: "Il mio ruolo", value: "UX/UI designer in un gruppo di quattro: ricerca, wireframe e mockup" },
          { label: "Cos'è", value: "Un concept di redesign fatto in aula, non un progetto per Spotify" },
        ],
      },
      { kind: "heading", text: "Il brief" },
      {
        kind: "text",
        text: "La domanda di partenza: come può il design restituire potere decisionale, autonomia e controllo a chi ascolta, senza rinunciare a quanto sono brave le raccomandazioni dell'algoritmo?",
      },
      {
        kind: "list",
        items: [
          "trovare un equilibrio tra la musica che ti propone l'algoritmo e la tua libreria;",
          "ridurre la frustrazione di chi sente di aver perso il controllo;",
          "far tornare la scoperta musicale una cosa attiva e consapevole;",
          "tenere le persone contente nel tempo, non solo per una sera.",
        ],
      },
      {
        kind: "figure",
        figure: {
          img: { src: "/assets/cases/spotify-mood/brief.jpg", alt: "Il brief di partenza e gli obiettivi di Spotify", width: 1600, height: 900 },
          caption: "Il brief di partenza, così come ce l'hanno dato.",
        },
      },
      { kind: "heading", text: "Siamo partiti dalle persone" },
      {
        kind: "text",
        text: "Prima di disegnare qualunque cosa siamo andati a chiedere. Dalle interviste è venuto fuori un quadro molto chiaro: si ascolta musica tutto il giorno, durante le pulizie, in palestra e nel tempo libero, quasi sempre con le playlist suggerite. Le canzoni nuove però si scoprono fuori da Spotify, e la personalizzazione delle playlist non la nota quasi nessuno.",
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
        kind: "text",
        text: "Da lì abbiamo disegnato il nostro mindset, «lo stagnato multitasking»: ascolta mentre fa altro, vuole subito la playlist giusta e riascolta sempre le stesse cose. Un po' si annoia, ma la comodità vince.",
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
      { kind: "heading", text: "La domanda giusta" },
      {
        kind: "quote",
        text: "Come far scoprire nuova musica in modo stimolante e proattivo, per rompere le abitudini di ascolto e arricchire la conoscenza musicale, in modo semplice ma coinvolgente?",
      },
      { kind: "heading", text: "Tre funzioni, un'idea" },
      {
        kind: "steps",
        items: [
          {
            title: "Mood Discovery",
            text: "Spotify capisce come ti senti e ti porta nella musica giusta per quel momento: playlist su misura, legami emotivi e la libertà di provare altri mood.",
          },
          {
            title: "Mood Match",
            text: "Ti collega a chi sta vivendo il tuo stesso stato d'animo: scopri in tempo reale cosa ascoltano gli altri con il tuo mood.",
          },
          {
            title: "Shock Mood",
            text: "Ti butta fuori dalla tua zona emotiva con playlist di un altro umore, per sorprenderti, ispirarti o cambiare aria.",
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
      { kind: "heading", text: "Cosa mi porto a casa" },
      {
        kind: "text",
        text: "È il progetto in cui ho imparato a non partire dalle schermate: prima le persone, poi gli insight, il mindset e la mappa dell'esperienza, e solo alla fine i bottoni. Il metodo che uso ancora oggi in Witailer.",
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
        src: "/assets/videos/spotify-mood-en.mp4",
        poster: "/assets/videos/spotify-mood-en.jpg",
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

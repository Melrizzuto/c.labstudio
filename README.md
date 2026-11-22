# c.lab studio

Il portfolio di Melania Rizzuto, in Next.js. È la stessa pagina del sito statico in `../site/`, rifatta a componenti: stesso aspetto, stessi movimenti, stessi testi.

- `/` è la versione italiana, `/en/` quella inglese.
- Next.js (App Router) + React + TypeScript, nessun'altra libreria.

## Provarlo sul Mac

Serve Node 22 (con nvm: `export PATH=$HOME/.nvm/versions/node/v22.22.3/bin:$PATH`).

    cd ~/Desktop/clab-sito/web
    npm install
    npm run dev

poi apri http://localhost:3000 (e http://localhost:3000/en/).

Per provare la versione di produzione:

    npm run build
    npx serve out

## Metterlo online su Vercel

1. Metti la cartella `web` su GitHub (o lancia `npx vercel` qui dentro).
2. Su vercel.com → Add New → Project → importa il repository. Vercel riconosce Next.js da solo: nessuna impostazione da cambiare.
3. Facoltativo: in Settings → Environment Variables aggiungi `NEXT_PUBLIC_SITE_URL` con l'indirizzo definitivo (es. `https://clab.studio`), così l'immagine di anteprima dei link (og:image) punta al dominio giusto. Senza, Vercel usa il suo indirizzo `.vercel.app`.
4. Il dominio tuo si collega da Settings → Domains.

## Dove stanno le cose

    src/
      app/
        (it)/layout.tsx, page.tsx      la pagina italiana, <html lang="it">
        (en)/layout.tsx, en/page.tsx   la pagina inglese, <html lang="en">
        globals.css                    tutti gli stili (gli stessi del sito statico)
        fonts.ts                       Outfit, Figtree, Caveat via next/font
      i18n/
        it.ts, en.ts                   tutti i testi della pagina, uno per lingua
        types.ts                       la forma dei testi (TypeScript avvisa se manca qualcosa)
      content/
        cases/<progetto>.ts            un file per caso studio, italiano e inglese uno accanto all'altro
        cases/index.ts                 l'elenco e l'ordine dei casi studio
        room.ts                        dove stanno le cartelle sulla scrivania
      components/                      Header, Hero, Tape, room/ (stanza e capitoli), cases/ (i casi studio), Footer
      lib/                             giorno e notte (theme.ts), apertura dei casi (cases.ts), meta tag
      config.ts                        link YouTube, GitHub, e-mail
    public/assets/                     immagini, video e scene, identici al sito statico

- **Testi della pagina:** `src/i18n/it.ts` e `src/i18n/en.ts`. Stessa struttura nelle due lingue: se ne cambi uno, cambia anche l'altro.
- **Testi dei casi studio:** `src/content/cases/<progetto>.ts`. Ogni caso è una lista di blocchi (`facts`, `steps`, `figure`, `pair`, `decisions`, `numbers`, `quote`, `tools`…), descritti in `src/content/cases/types.ts`.
- **Parole evidenziate a mano:** nei testi, `{ hl: '...' }` diventa la scritta rosa in corsivo, `{ b: '...' }` il grassetto.
- **Link del canale YouTube, GitHub, e-mail:** `src/config.ts`.
- **Le scene della stanza:** `public/assets/scenes/day.jpg`, `desk.jpg`, `night.jpg`. La camera che si muove dentro le scene è in `src/components/room/Room.tsx` (`CAM`, `EXIT`, `ENTRY`).

## Aggiungere un progetto

1. Crea `src/content/cases/<nome>.ts` copiando uno esistente (per esempio `stat.ts`): `it` e `en`, con titolo, carta dei tarocchi, frase per la lista (`blurb`), etichetta per la cartella sulla scrivania (`hitLabel`) e i blocchi.
2. Aggiungi la chiave in `CaseKey` (`src/content/cases/types.ts`) e il progetto in `src/content/cases/index.ts` con il suo motivo (`swatch`). Se il motivo è nuovo, aggiungi la classe `.sw-<motivo>` in `globals.css`.
3. In `src/content/room.ts` mettilo in `PROJECT_GROUPS` (Witailer o accademia) e, se ha una cartella disegnata sulla scrivania, in `DESK_FOLDERS` con l'area cliccabile e il punto dell'adesivo (in % della scena).
4. Immagini in `public/assets/cases/<nome>/`, video in `public/assets/videos/`.
5. `npm run build` controlla che non manchi niente.

# c.lab studio

The portfolio of Melania Rizzuto, designer and Junior Product Engineer in Milan. One long page: a poster-like hero with felt Mel and Calì the cat, then a hand-drawn room where the camera moves through three illustrations as you scroll, and the case studies opened from the folders on the desk.

- `/` is the Italian site, `/en/` the English one.
- It started as a static HTML page and was ported to Next.js component by component, keeping the same look and behaviour.

## Stack

- Next.js 16 (App Router), React 19, TypeScript. No other runtime dependency: no UI or animation libraries.
- Both pages are prerendered as static HTML at build time. The only server code is the visit counter (`/api/views/`), backed by Supabase (or Upstash Redis) through its REST API.
- Fonts via `next/font/google`: Outfit, Figtree, Caveat and Space Mono.
- Plain CSS in `src/app/globals.css`; the wax-crayon / risograph print look comes from SVG filters (`src/components/PrintFilters.tsx`).

## Run it locally

Node 22 or newer.

    npm install
    npm run dev          # http://localhost:3100 and http://localhost:3100/en/

Production build:

    npm run build        # type-checks and prerenders both pages
    npm start            # http://localhost:3100

The port is fixed at 3100 so it does not clash with other projects on 3000. Without the counter variables (see below) the site works normally and the eye in the footer is simply not shown.

## Deploy (Vercel + Supabase)

1. Import the repository on vercel.com (Add New → Project). Vercel detects Next.js; no settings to change.
2. Visit counter: in Supabase create a project, open the SQL editor and run `supabase/views.sql` (a `site_counters` table and an `increment_views()` function, closed to the browser by row level security). In Vercel → Settings → Environment Variables add `SUPABASE_URL` (Project URL) and `SUPABASE_SERVICE_ROLE_KEY` (Project Settings → API Keys → a secret key `sb_secret_…`, or the legacy `service_role` key; server-only, never `NEXT_PUBLIC_`). Redeploy. Upstash Redis also works: set `UPSTASH_REDIS_REST_URL` / `UPSTASH_REDIS_REST_TOKEN` instead.
3. Optional: set `NEXT_PUBLIC_SITE_URL` (e.g. `https://your-domain`) so the link preview image (`og:image`) uses the final domain; otherwise Vercel's production URL is used.
4. Custom domain: Settings → Domains.

For the counter in local development: `npx vercel link` once, then `npx vercel env pull .env.local`. `.env*` files are git-ignored; `.env.example` lists the variable names.

How the counter works: `POST /api/views/` adds a visit and returns the total, `GET /api/views/` only reads it. A browser counts at most once a day (a date kept in `localStorage`). If the variables are missing or the store does not answer, the route returns `{ "views": null }` and nothing is shown.

## Where things live

    src/
      app/
        (it)/layout.tsx, page.tsx      Italian page, <html lang="it">
        (en)/layout.tsx, en/page.tsx   English page, <html lang="en">
        api/views/route.ts             visit counter (Supabase REST, or Upstash)
        globals.css                    all the styles
        fonts.ts                       next/font faces, exposed as CSS variables
      i18n/
        it.ts, en.ts                   every word of the page, one file per language
        types.ts                       the shape of the copy (TypeScript flags anything missing)
      content/
        cases/<case>.ts                one module per case study, Italian and English side by side
        cases/types.ts                 the blocks a case study is made of
        cases/index.ts                 the list and order of the case studies
        room.ts                        where things sit on the illustrations (desk folders, Timor calendar)
      components/
        Header, Hero, MelFigure, Tape, Footer, ViewCounter, PrintFilters
        room/                          Room (scroll camera), RoomStage (scenes, pins), Chapters, TimorDate
        cases/                         CaseDialog and CaseBlocks
      lib/
        theme.ts                       day / night
        cases.ts                       opening the case dialogs
        sounds.ts                      Calì's meow, trill and purr
        metadata.ts                    title, description, Open Graph, favicon
      config.ts                        YouTube, GitHub and e-mail links
    public/assets/                     illustrations, photos, videos, sounds (see Licence)

- **Page copy**: `src/i18n/it.ts` and `src/i18n/en.ts`, same structure in both. In the texts, `{ hl: '…' }` becomes the pink handwritten highlight and `{ b: '…' }` bold.
- **Case studies**: `src/content/cases/<case>.ts`. Each one is a list of blocks (`demo`, `facts`, `figure`, `pair`, `steps`, `decisions`, `numbers`, `quote`, `tools`, `highlight`, `badge`), described in `src/content/cases/types.ts` and rendered by `src/components/cases/CaseBlocks.tsx`.
- **The room camera**: `src/components/room/Room.tsx` (`CAM`, `EXIT`, `ENTRY`, `fitCam`, `progress`).
- **The Timor calendar**: the flaps are blank in the pictures; `TimorDate.tsx` writes today's date on them in the visitor's timezone and language. Position, size and slant per line are in `TIMOR` in `src/content/room.ts`; long words shrink to fit their flap.
- **The print look**: the scene pictures are already crayon-processed (no filters on them). The decorative graphics use `filter:url(#riso)` and friends, listed at the end of `globals.css` under "print treatment". Reading text, felt Mel and Calì, photos and videos are never filtered.
- **Calì's voice**: sounds play only on a tap or click, never on load. The word in her speech bubble picks the sound (`room.miao` and `room.miaoAsleep` in the dictionaries).

## Add a project

1. Copy an existing module, e.g. `src/content/cases/stat.ts`, to `src/content/cases/<name>.ts` and fill in `it` and `en`: folder label, tarot name, title, `hitLabel` (the clickable folder on the desk), `blurb` (the line in the project list), owner, tagline, blocks and the buttons at the bottom.
2. Add the key to `CaseKey` in `src/content/cases/types.ts` and the project to `src/content/cases/index.ts` with its swatch. A new swatch needs a `.sw-<swatch>` class in `globals.css`.
3. In `src/content/room.ts` add it to `PROJECT_GROUPS` (Witailer or academy) and, if it has a folder drawn on the desk, to `DESK_FOLDERS` with its hit area and sticker point (% of the picture).
4. Images go in `public/assets/cases/<name>/`, the demo video in `public/assets/videos/`.
5. `npm run build` checks that nothing is missing.

## Credits

- Design, illustration direction, felt characters, copy and case studies: Melania Rizzuto.
- Sounds, all CC0 from Freesound: "Cat meow" by philsapphire (https://freesound.org/s/256452/), "Cat trill 1" by MBPL (https://freesound.org/s/668822/), "Cat Purr / gato ronroneando" by yetcop (https://freesound.org/s/252645/).
- Fonts (SIL Open Font License): Outfit, Figtree, Caveat, Space Mono, served through Google Fonts at build time.

## Licence

- **Code**: MIT, see [`LICENSE`](LICENSE).
- **Everything else is all rights reserved**: the files under `public/assets/` (illustrations, felt Mel and Calì, photos, videos, case-study images) and the site copy and case-study texts in `src/i18n/` and `src/content/` are © 2026 Melania Rizzuto and are not covered by the MIT licence. Case-study images of Witailer products are shown with permission and are not reusable. The third-party sounds keep their CC0 status. Details in [`public/assets/LICENSE.md`](public/assets/LICENSE.md).

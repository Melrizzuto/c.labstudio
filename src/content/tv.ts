import type { Locale } from '@/i18n/types';

/*
 * The TV by the sofa: two channels. "Rifatto" (redesigns) and "Calì & Mel" (the studio sitcom).
 * `tv` is the landscape file the TV in the room plays; `big` is the one "Watch it big" opens (vertical for the
 * sitcom); `poster` is its still. `out` is when the episode comes out on social media (Tuesdays 18:30, Rome):
 * the TV shows an episode only from then on, so the site never shows an episode before Instagram does. The sitcom files are made from social/cali-e-mel (see SERIE.md there).
 */
export type TvEpisode = { n: number; out?: string; label?: Record<Locale, string>; title: Record<Locale, string>; tv: string; big: string; poster?: string; vertical?: boolean };
export type TvChannel = { id: 'rifatto' | 'calimel'; name: string; episodes: TvEpisode[] };

const sitcom = (n: number, out: string | undefined, it: string, en: string, file = `ep${String(n).padStart(2, '0')}`, label?: Record<Locale, string>): TvEpisode => ({
  n, out, label, title: { it, en }, tv: `/assets/tv/cali-mel-${file}.mp4`, big: `/assets/tv/cali-mel-${file}-v.mp4`, poster: `/assets/tv/cali-mel-${file}.jpg`, vertical: true,
});

export const TV_CHANNELS: TvChannel[] = [
  {
    id: 'rifatto',
    name: 'Rifatto',
    episodes: [
      { n: 1, title: { it: "Ho rifatto l'AI di TikTok", en: "I redid TikTok's AI" }, tv: '/assets/tv/rifatto-tv.mp4', big: '/assets/tv/rifatto-tv.mp4', poster: '/assets/tv/rifatto-cover-a.jpg' },
    ],
  },
  {
    id: 'calimel',
    name: 'Calì & Mel',
    episodes: [
      sitcom(1, undefined, 'Il logo più grande', 'The bigger logo'),
      sitcom(2, '2026-12-01T18:30:00+01:00', 'Il nero più chiaro', 'A lighter black'),
      sitcom(3, '2026-12-08T18:30:00+01:00', 'Il bianco più bianco', 'A whiter white'),
      sitcom(4, '2026-12-15T18:30:00+01:00', 'Minimal, ma con più cose', 'Minimal, but with more stuff'),
      sitcom(9, '2026-12-22T18:30:00+01:00', 'Il biglietto di Natale', 'The Christmas card', 'natale', { it: 'speciale Natale', en: 'Christmas special' }),
      sitcom(10, '2026-12-29T18:30:00+01:00', 'I buoni propositi', 'New Year resolutions', 'capodanno', { it: 'speciale Capodanno', en: 'New Year special' }),
      sitcom(5, '2027-01-05T18:30:00+01:00', 'Ci vuole un minuto', 'It takes a minute'),
      sitcom(6, '2027-01-12T18:30:00+01:00', 'Hai perfettamente ragione', "You're absolutely right"),
      sitcom(7, '2027-01-19T18:30:00+01:00', 'La linea deve salire', 'Make the line go up'),
      sitcom(8, '2027-01-26T18:30:00+01:00', 'La Boss', 'The Boss'),
    ],
  },
];

/** The episodes already out at `now` (ms); before the page knows the time, only the ones with no date. */
export const released = (c: TvChannel, now: number | null): TvChannel => ({ ...c, episodes: c.episodes.filter((e) => !e.out || (now !== null && now >= Date.parse(e.out))) });

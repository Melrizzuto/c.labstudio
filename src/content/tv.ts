import type { Locale } from '@/i18n/types';

/*
 * The TV by the sofa: two channels. "Rifatto" (redesigns) and "Calì & Mel" (the studio sitcom).
 * `tv` is the landscape file the TV in the room plays; `big` is the one "Watch it big" opens (vertical for the
 * sitcom); `poster` is its still. The sitcom files are made from social/cali-e-mel (see SERIE.md there).
 */
export type TvEpisode = { n: number; label?: Record<Locale, string>; title: Record<Locale, string>; tv: string; big: string; poster?: string; vertical?: boolean };
export type TvChannel = { id: 'rifatto' | 'calimel'; name: string; episodes: TvEpisode[] };

const sitcom = (n: number, it: string, en: string, file = `ep${String(n).padStart(2, '0')}`, label?: Record<Locale, string>): TvEpisode => ({
  n, label, title: { it, en }, tv: `/assets/tv/cali-mel-${file}.mp4`, big: `/assets/tv/cali-mel-${file}-v.mp4`, poster: `/assets/tv/cali-mel-${file}.jpg`, vertical: true,
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
      sitcom(0, 'Il mio capo è un gatto', 'My boss is a cat'),
      sitcom(1, 'Il logo più grande', 'The bigger logo'),
      sitcom(2, 'Il nero più chiaro', 'A lighter black'),
      sitcom(3, 'Il bianco più bianco', 'A whiter white'),
      sitcom(4, 'Minimal, ma con più cose', 'Minimal, but with more stuff'),
      sitcom(5, 'Ci vuole un minuto', 'It takes a minute'),
      sitcom(6, 'Hai perfettamente ragione', "You're absolutely right"),
      sitcom(7, 'La linea deve salire', 'Make the line go up'),
      sitcom(8, 'La Boss', 'The Boss'),
      sitcom(9, 'Il biglietto di Natale', 'The Christmas card', 'natale', { it: 'speciale Natale', en: 'Christmas special' }),
      sitcom(10, 'I buoni propositi', 'New Year resolutions', 'capodanno', { it: 'speciale Capodanno', en: 'New Year special' }),
    ],
  },
];

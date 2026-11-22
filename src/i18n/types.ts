export type Locale = 'it' | 'en';

/** A piece of inline text: plain, highlighted in handwriting (`span.hl`) or bold. */
export type Inline = string | { hl: string } | { b: string };
/** Text that may carry inline highlights. A plain string when there are none. */
export type Rich = string | Inline[];

export interface TimelineEntry {
  when: string;
  title: string;
  text: string;
}

export interface Dictionary {
  locale: Locale;
  meta: {
    title: string;
    description: string;
    ogDescription: string;
  };
  header: {
    logoLabel: string;
    navLabel: string;
    journey: string;
    projects: string;
    weekend: string;
    /** the link to the other language */
    lang: { href: string; hreflang: Locale; label: string; text: string };
    theme: { night: string; day: string; toNight: string; toDay: string };
    cta: string;
  };
  hero: {
    sticker: string;
    lead: Rich;
    sub: Rich;
    enter: string;
    toProjects: string;
    stageLabel: string;
    melLabel: string;
    melAlt: string;
    noteCat: string;
    caliSay: string;
    noteTap: string;
  };
  /** the phrases of the scrolling tape, in order */
  tape: string[];
  room: {
    label: string;
    dayAlt: string;
    deskAlt: string;
    nightAlt: string;
    /** the four corners of the room: pins, chips and labels */
    places: { book: string; desk: string; sofa: string; tv: string };
    hits: {
      dayDesk: string;
      dayBook: string;
      daySofa: string;
      dayTv: string;
      deskCat: string;
      nightTv: string;
      nightSofa: string;
      nightCat: string;
    };
    pinCatAsleep: string;
    /** what Calì says when you tap her (one at random) */
    miao: string[];
  };
  intro: { title: string; text: string; hand: string };
  journey: { title: string; text: string; timeline: TimelineEntry[] };
  desk: { title: string; text: string; read: string; academy: string };
  sofa: { title: string; text: string; hobbies: { title: string; text: string }[] };
  weekend: {
    title: string;
    paragraphs: Rich[];
    covers: { src: string; alt: string }[];
    channel: string;
  };
  contact: {
    title: string;
    text: string;
    copy: string;
    copied: string;
    selectedMac: string;
    selectedOther: string;
  };
  footer: { tagline: string; approved: string; copyright: string; legal: string };
  caseClose: string;
  views: { one: string; many: string };
}

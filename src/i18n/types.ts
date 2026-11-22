import type { CatSound } from '@/lib/sounds';

export type Locale = 'it' | 'en';

/** A word in Calì's speech bubble and the sound it makes. */
export interface CatLine {
  word: string;
  sound: CatSound;
}

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
    /** the section menu on phones */
    menu: { text: string; open: string; close: string };
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
    /** the bar of buttons at the bottom of the screen on phones */
    dock: { label: string; book: string; desk: string; sofa: string; tv: string };
    /** what Calì says when you tap her (one at random), each with its sound */
    miao: CatLine[];
    /** what she says when she's asleep on the sofa */
    miaoAsleep: CatLine[];
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
    /** the link to book a call on Calendly */
    book: string;
  };
  footer: { tagline: string; approved: string; copyright: string; legal: string };
  /** the profile pills in the footer: the visible label and the label read aloud */
  social: { label: string; links: Record<'instagram' | 'linkedin' | 'youtube' | 'github', { text: string; aria: string }> };
  caseClose: string;
  views: { one: string; many: string };
}

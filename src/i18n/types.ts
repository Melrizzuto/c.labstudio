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
    places: { book: string; desk: string; sofa: string; tv: string; cv: string };
    hits: {
      dayDesk: string;
      dayBook: string;
      daySofa: string;
      dayTv: string;
      deskCat: string;
      nightTv: string;
      deskDuck: string;
      deskMouse: string;
      deskKeyboard: string;
      deskNotebook: string;
      deskPencil: string;
      nightSofa: string;
      nightCat: string;
    };
    pinCatAsleep: string;
    /** the paper label on the desk notebook (it opens the guestbook) */
    notebookLabel: { kicker: string; title: string };
    /** the episode title in the YouTube-style player on the TV */
    tvTitle: string;
    /** what the keyboard types in its little terminal: a command and its answer, one pair picked at random */
    terminal: [string, string][];
    /** the bar of buttons at the bottom of the screen on phones */
    dock: { label: string; book: string; desk: string; sofa: string; tv: string };
    /** what Calì says when you tap her (one at random), each with its sound */
    miao: CatLine[];
    /** what she says when she's asleep on the sofa */
    miaoAsleep: CatLine[];
  };
  intro: { title: string; text: string; hand: string };
  journey: { title: string; text: string; timeline: TimelineEntry[]; cv: string };
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
  /** the notebook on the desk: notes and feedback, shown after Mel approves them */
  guestbook: {
    title: string;
    intro: string;
    /** how to move around the board */
    hint: string;
    empty: string;
    offline: string;
    anon: string;
    /** the toolbar: a new post-it in one of the colours, zoom */
    newNote: string;
    colorNames: Record<'yellow' | 'pink' | 'blue' | 'green' | 'orange' | 'purple', string>;
    zoomIn: string;
    zoomOut: string;
    fit: string;
    /** the post-it being written */
    message: string;
    name: string;
    moodLabel: string;
    like: string;
    dislike: string;
    stickerLabel: string;
    stickerNone: string;
    stickerNames: Record<'daisy' | 'heart' | 'star' | 'bolt' | 'cali' | 'fire' | 'wow' | 'sun', string>;
    drag: string;
    send: string;
    sending: string;
    cancel: string;
    /** after sending: the writer's own post-it stays on the board until Mel approves it */
    pending: string;
    thanks: string;
    error: string;
  };
}

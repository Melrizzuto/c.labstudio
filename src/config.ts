/** Links and addresses that are the same in every language. */
export const YOUTUBE_URL = 'https://www.youtube.com/@c.labstudio.milano';
export const GITHUB_URL = 'https://github.com/Melrizzuto';
export const EMAIL = 'melrizzuto4@gmail.com';
/** a free 30-minute call, booked on Calendly (the free plan: no payments, no prices) */
export const CALENDLY_URL = 'https://calendly.com/melrizzuto4/30min';
/** Melania's profiles, in the order of the footer pills (Instagram handle: @c.labstudi0, with a dot, the last character is a zero) */
export const SOCIALS = {
  instagram: 'https://www.instagram.com/c.labstudi0/',
  linkedin: 'https://www.linkedin.com/in/melania-rizzuto-57a42790/',
  youtube: YOUTUBE_URL,
  github: GITHUB_URL,
} as const;
export type SocialKey = keyof typeof SOCIALS;

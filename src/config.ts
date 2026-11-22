/** Links and addresses that are the same in every language. */
export const YOUTUBE_URL = 'https://www.youtube.com/@Melerre';
export const GITHUB_URL = 'https://github.com/Melrizzuto';
export const EMAIL = 'melrizzuto4@gmail.com';
/** Melania's profiles, in the order of the footer pills (Instagram handle: @clabstudi0, the last character is a zero) */
export const SOCIALS = {
  instagram: 'https://www.instagram.com/clabstudi0/',
  linkedin: 'https://www.linkedin.com/in/melania-rizzuto-57a42790/',
  youtube: YOUTUBE_URL,
  github: GITHUB_URL,
} as const;
export type SocialKey = keyof typeof SOCIALS;

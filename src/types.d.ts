export {};

declare global {
  interface Window {
    /** opens a case-study dialog by id (used by the screenshot scripts too) */
    __openCase?: (id: string) => void;
    /** true when the visitor wants the night */
    __forcedNight?: () => boolean;
  }
}

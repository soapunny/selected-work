export type ContentLocale = "en" | "ko";

export function normalizeLocale(locale: string): ContentLocale {
  return locale === "ko" ? "ko" : "en";
}

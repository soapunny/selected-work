// src/content/nav/types.ts

export type ContentLocale = "en" | "ko";

export type NavKey = "projects" | "about" | "contact";

export type NavCopy = {
  brand: string;
  items: Record<NavKey, string>;
  locale: { en: string; ko: string };
};

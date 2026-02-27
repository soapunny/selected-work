// src/content/nav/index.ts

import type { NavCopy } from "./types";
import { navEn } from "./nav.en";
import { navKo } from "./nav.ko";

type ContentLocale = "en" | "ko";

function normalizeLocale(locale: string): ContentLocale {
  return locale === "ko" ? "ko" : "en";
}

export function getNav(locale: string): NavCopy {
  const l = normalizeLocale(locale);
  return l === "ko" ? navKo : navEn;
}

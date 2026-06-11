// src/content/nav/index.ts

import type { NavCopy } from "./types";
import { navEn } from "./nav.en";
import { navKo } from "./nav.ko";
import { normalizeLocale } from "@/lib/locale";

export function getNav(locale: string): NavCopy {
  const l = normalizeLocale(locale);
  return l === "ko" ? navKo : navEn;
}

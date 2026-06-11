// src/content/case-studies/index.ts

import type { CaseStudy } from "./types";
import { caseStudiesEn } from "./caseStudies.en";
import { caseStudiesKo } from "./caseStudies.ko";
import { normalizeLocale } from "@/lib/locale";

export function getCaseStudy(locale: string, slug: string): CaseStudy | null {
  const l = normalizeLocale(locale);
  const table = l === "ko" ? caseStudiesKo : caseStudiesEn;
  return table[slug] ?? null;
}

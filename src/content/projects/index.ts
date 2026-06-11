// src/content/projects/index.ts

import type { Project } from "./types";
import { projectsEn } from "./projects.en";
import { projectsKo } from "./projects.ko";
import { normalizeLocale } from "@/lib/locale";

export function getAllProjects(locale: string): Project[] {
  const l = normalizeLocale(locale);
  return l === "ko" ? projectsKo : projectsEn;
}

export function getFeaturedProjects(locale: string): Project[] {
  return getAllProjects(locale).filter((p) => p.featured);
}

export function getProjectBySlug(
  locale: string,
  slug: string
): Project | undefined {
  return getAllProjects(locale).find((p) => p.slug === slug);
}

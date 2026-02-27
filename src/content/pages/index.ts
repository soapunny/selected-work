// src/content/pages/index.ts

import type { AboutCopy } from "./types";
import type { ContactCopy } from "./types";
import type { HomeCopy } from "./types";
import type { ProjectsPageCopy } from "./types";
import { aboutEn } from "./about.en";
import { aboutKo } from "./about.ko";
import { contactEn } from "./contact.en";
import { contactKo } from "./contact.ko";
import { homeEn } from "./home.en";
import { homeKo } from "./home.ko";
import { projectsPageEn } from "./projects-page.en";
import { projectsPageKo } from "./projects-page.ko";

type ContentLocale = "en" | "ko";

function normalizeLocale(locale: string): ContentLocale {
  return locale === "ko" ? "ko" : "en";
}

export function getHomeCopy(locale: string): HomeCopy {
  const l = normalizeLocale(locale);
  return l === "ko" ? homeKo : homeEn;
}

export function getAboutCopy(locale: string): AboutCopy {
  const l = normalizeLocale(locale);
  return l === "ko" ? aboutKo : aboutEn;
}

export function getContactCopy(locale: string): ContactCopy {
  const l = normalizeLocale(locale);
  return l === "ko" ? contactKo : contactEn;
}

export function getProjectsPageCopy(locale: string): ProjectsPageCopy {
  const l = normalizeLocale(locale);
  return l === "ko" ? projectsPageKo : projectsPageEn;
}

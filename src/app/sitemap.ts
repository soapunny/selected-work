import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";
import { getAllProjects } from "@/content/projects/projects";

const LOCALES = ["en", "ko"] as const;
const STATIC_ROUTES = ["", "/projects", "/about", "/contact"] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries = STATIC_ROUTES.flatMap((route) =>
    LOCALES.map((locale) => ({
      url: `${SITE.url}/${locale}${route}`,
      changeFrequency: "monthly" as const,
      priority: route === "" ? 1.0 : 0.8,
    })),
  );

  const projectEntries = LOCALES.flatMap((locale) =>
    getAllProjects(locale).map((project) => ({
      url: `${SITE.url}/${locale}/projects/${project.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  );

  return [...staticEntries, ...projectEntries];
}

// src/components/projects/FeaturedProjectCard.tsx

import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/content/projects/projects";

type FeaturedProjectCardProps = {
  locale: string;
  project: Project;
  /** Optional preview image (place in /public, e.g. /projects/pocketquest/preview.png) */
  imageSrc?: string;
  imageAlt?: string;
};

/**
 * Home-style featured card, but with a dedicated visual area on the right.
 * Keeps the same premium system styling (card-premium + card-cta).
 */
export function FeaturedProjectCard({
  locale,
  project,
  imageSrc,
  imageAlt,
}: FeaturedProjectCardProps) {
  imageSrc = imageSrc ?? `/project_preview2.svg`;
  imageAlt = imageAlt ?? `${project.title} preview`;

  return (
    <Link
      href={`/${locale}/projects/${project.slug}`}
      className="group card-premium"
    >
      <div className="grid gap-8 md:grid-cols-[1.2fr_0.8fr] md:items-center">
        {/* Left: Copy */}
        <div className="min-w-0">
          <p className="text-xs font-medium tracking-wide text-muted">
            {project.year}
            {project.tags.length > 0
              ? ` • ${project.tags.slice(0, 2).join(" • ")}`
              : ""}
          </p>

          <h3 className="mt-2 text-3xl font-semibold tracking-tight text-foreground transition group-hover:text-white">
            {project.title}
          </h3>

          <p className="mt-3 max-w-2xl text-body-sm text-muted">
            {project.description}
          </p>

          {project.tags.length > 0 && (
            <div className="mt-5 flex flex-wrap gap-2">
              {project.tags.slice(0, 5).map((tag) => (
                <span
                  key={tag}
                  className="rounded-lg border px-2.5 py-1 text-xs text-muted"
                  style={{ borderColor: "rgb(var(--border))" }}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          <div className="mt-7 inline-flex">
            <div className="card-cta">
              View case study
              <span aria-hidden className="card-cta-arrow">
                →
              </span>
            </div>
          </div>
        </div>

        {/* Right: Visual (Option 3: clip image corners, but don’t clip glow/shadow) */}
        <div className="relative overflow-visible rounded-2xl">
          {/* Glow / shadow layer (allowed to spill) */}
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-3 rounded-[1.25rem] opacity-70 blur-2xl"
            style={{
              background:
                "radial-gradient(600px 280px at 60% 40%, rgba(var(--accent), 0.20), transparent 60%)",
            }}
          />

          {/* Clip layer (keeps rounded corners) */}
          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5">
            <div className="relative h-[220px] sm:h-[260px] lg:h-auto lg:aspect-16/10">
              {imageSrc ? (
                <Image
                  src={imageSrc}
                  alt={imageAlt ?? `${project.title} preview`}
                  fill
                  sizes="(min-width: 1024px) 360px, 100vw"
                  className="object-cover object-center"
                  priority={project.featured}
                />
              ) : (
                <div className="absolute inset-0 bg-linear-to-br from-white/10 to-transparent" />
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

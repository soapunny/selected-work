import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/content/projects/projects";
import { TagBadge } from "@/components/ui/TagBadge";

type FeaturedProjectCardProps = {
  locale: string;
  project: Project;
  ctaText: string;
  imageSrc?: string;
  imageAlt?: string;
};

export function FeaturedProjectCard({
  locale,
  project,
  ctaText,
  imageSrc,
  imageAlt,
}: FeaturedProjectCardProps) {
  const resolvedImageSrc = imageSrc ?? `/project_preview2.svg`;
  const resolvedImageAlt = imageAlt ?? `${project.title} preview`;

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
                <TagBadge key={tag} label={tag} />
              ))}
            </div>
          )}

          <div className="mt-7 inline-flex">
            <div className="card-cta">
              {ctaText}
              <span aria-hidden className="card-cta-arrow">
                →
              </span>
            </div>
          </div>
        </div>

        {/* Right: Visual */}
        <div className="relative overflow-visible rounded-2xl">
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-3 rounded-[1.25rem] opacity-70 blur-2xl"
            style={{
              background:
                "radial-gradient(600px 280px at 60% 40%, rgba(var(--accent), 0.20), transparent 60%)",
            }}
          />
          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5">
            <div className="relative h-[220px] sm:h-[260px] lg:aspect-16/10 lg:h-auto">
              <Image
                src={resolvedImageSrc}
                alt={resolvedImageAlt}
                fill
                sizes="(min-width: 1024px) 360px, 100vw"
                className="object-cover object-center"
                priority={project.featured}
              />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

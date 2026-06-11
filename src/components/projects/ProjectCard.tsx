// src/components/projects/ProjectCard.tsx

import Link from "next/link";
import type { Project } from "@/content/projects/projects";
import { TagBadge } from "@/components/ui/TagBadge";

type ProjectCardProps = {
  locale: string;
  project: Project;
  variant?: "default" | "large";
};

export function ProjectCard({ locale, project, variant = "default" }: ProjectCardProps) {
  const isLarge = variant === "large";

  return (
    <Link
      href={`/${locale}/projects/${project.slug}`}
      className="card-premium block h-full"
    >
      {isLarge && (
        <p className="text-xs font-medium tracking-wide text-muted">
          {project.year}
          {project.tags.length > 0 ? ` • ${project.tags.slice(0, 2).join(" • ")}` : ""}
        </p>
      )}

      <h3 className={isLarge ? "mt-2 text-2xl font-semibold tracking-tight" : "heading-section"}>
        {project.title}
      </h3>

      <p className="mt-2 text-body-sm text-muted">{project.description}</p>

      {isLarge && project.tags.length > 0 && (
        <div className="mt-5 flex flex-wrap gap-2">
          {project.tags.slice(0, 4).map((tag) => (
            <TagBadge key={tag} label={tag} />
          ))}
        </div>
      )}
    </Link>
  );
}

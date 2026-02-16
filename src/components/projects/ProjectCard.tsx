// src/components/projects/ProjectCard.tsx

import Link from "next/link";
import type { Project } from "@/content/projects/projects";

type ProjectCardProps = {
  locale: string;
  project: Project;
};

export function ProjectCard({ locale, project }: ProjectCardProps) {
  return (
    <Link
      href={`/${locale}/projects/${project.slug}`}
      className="card-premium block"
    >
      <h3 className="heading-section">{project.title}</h3>
      <p className="mt-2 text-body-sm text-muted">{project.description}</p>
    </Link>
  );
}

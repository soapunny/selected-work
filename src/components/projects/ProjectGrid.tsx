// src/components/projects/ProjectGrid.tsx

import type { Project } from "@/content/projects/projects";
import { ProjectCard } from "./ProjectCard";

type ProjectGridProps = {
  locale: string;
  projects?: Project[];
};

export function ProjectGrid({ locale, projects }: ProjectGridProps) {
  const items = projects ?? [];

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((project) => (
        <ProjectCard key={project.slug} locale={locale} project={project} />
      ))}
    </div>
  );
}

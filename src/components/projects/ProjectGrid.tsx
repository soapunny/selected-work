// src/components/projects/ProjectGrid.tsx

import type { Project } from "@/content/projects/projects";
import { ProjectCard } from "./ProjectCard";

type ProjectGridProps = {
  locale: string;
  projects?: Project[];
};

export function ProjectGrid({ locale, projects }: ProjectGridProps) {
  const items = projects ?? [];
  const bento = items.length >= 2;

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((project, i) => (
        <div
          key={project.slug}
          className={bento && i === 0 ? "sm:col-span-2 lg:col-span-2" : ""}
        >
          <ProjectCard
            locale={locale}
            project={project}
            variant={bento && i === 0 ? "large" : "default"}
          />
        </div>
      ))}
    </div>
  );
}

// src/components/projects/ProjectHero.tsx

import type { Project } from "@/content/projects/projects";

type ProjectHeroProps = {
  project: Project;
};

export function ProjectHero({ project }: ProjectHeroProps) {
  return (
    <section>
      <h1 className="heading-hero">{project.title}</h1>
      <p className="mt-3 text-body-sm text-muted">{project.description}</p>

      {project.tags.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
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
    </section>
  );
}

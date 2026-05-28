// src/components/projects/ProjectMeta.tsx

import type { Project } from "@/content/projects/types";

type ProjectMetaProps = {
  project: Project;
};

export function ProjectMeta({ project }: ProjectMetaProps) {
  return (
    <section className="flex flex-wrap items-center gap-4 text-sm text-muted">
      <span>{project.year}</span>
      {project.tags.length > 0 && (
        <span className="flex gap-2">
          {project.tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </span>
      )}
      <span>—</span>
      {project.liveUrl && (
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-md border px-3 py-1 text-xs hover:text-foreground transition-colors"
          style={{ borderColor: "rgb(var(--border))" }}
        >
          Live ↗
        </a>
      )}
      {project.github && (
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-md border px-3 py-1 text-xs hover:text-foreground transition-colors"
          style={{ borderColor: "rgb(var(--border))" }}
        >
          Repo ↗
        </a>
      )}
    </section>
  );
}

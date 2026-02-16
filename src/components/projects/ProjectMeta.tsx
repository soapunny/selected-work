// src/components/projects/ProjectMeta.tsx

import type { Project } from "@/content/projects/projects"

type ProjectMetaProps = {
  project: Project
}

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
      <a href="#" className="hover:text-foreground">
        Live
      </a>
      <a href="#" className="hover:text-foreground">
        Repo
      </a>
    </section>
  )
}

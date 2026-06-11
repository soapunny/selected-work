import type { Project } from "@/content/projects/projects";
import { TagBadge } from "@/components/ui/TagBadge";

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
            <TagBadge key={tag} label={tag} />
          ))}
        </div>
      )}
    </section>
  );
}

// src/app/[locale]/(site)/projects/[slug]/page.tsx

import { notFound } from "next/navigation";
import { getProjectBySlug } from "@/content/projects/projects";
import { ProjectHero } from "@/components/projects/ProjectHero";
import { ProjectMeta } from "@/components/projects/ProjectMeta";

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { slug } = await params;

  const project = getProjectBySlug(slug);
  if (!project) return notFound();

  return (
    <main className="container-shell pt-12 pb-12 md:pt-14 md:pb-14">
      <ProjectHero project={project} />
      <div className="mt-6">
        <ProjectMeta project={project} />
      </div>

      <section className="mt-12">
        <h2 className="heading-section">Case study</h2>
        <p className="mt-3 max-w-3xl text-body-lg text-muted">
          Coming soon. This page will include problem → solution → architecture
          highlights → results.
        </p>
      </section>
    </main>
  );
}

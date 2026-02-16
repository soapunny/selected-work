// src/app/[locale]/(site)/projects/page.tsx

import Link from "next/link";
import { ProjectGrid } from "@/components/projects/ProjectGrid";
import {
  getAllProjects,
  getFeaturedProjects,
} from "@/content/projects/projects";
import { FeaturedProjectCard } from "@/components/projects/FeaturedProjectCard";

export default async function ProjectsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const featured = getFeaturedProjects();
  const all = getAllProjects();

  const primaryFeatured = featured[0];

  return (
    <main className="container-shell pt-12 pb-12 md:pt-14 md:pb-14">
      <header className="mb-12">
        <p className="page-kicker">Projects</p>

        <h1 className="page-hero">
          Selected work shaped by calm systems and structured interaction.
        </h1>

        <p className="page-description">
          A collection of projects where clarity, architecture, and visual
          restraint meet.
        </p>
      </header>

      {/* Featured */}
      {primaryFeatured && (
        <section className="mt-18">
          <div className="section-header">
            <h2 className="heading-section">Featured work</h2>
            <span />
          </div>

          <FeaturedProjectCard locale={locale} project={primaryFeatured} />

          {/* Secondary featured (if any) */}
          {featured.length > 1 && (
            <div className="mt-6">
              <ProjectGrid locale={locale} projects={featured.slice(1)} />
            </div>
          )}
        </section>
      )}

      {/* All projects */}
      <section className="mt-14">
        <div className="section-header">
          <h2 className="heading-section">More work</h2>
          <Link href={`/${locale}/contact`} className="view-all-link">
            Contact →
          </Link>
        </div>

        <ProjectGrid locale={locale} projects={all} />
      </section>
    </main>
  );
}

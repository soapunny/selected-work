// src/app/[locale]/(site)/projects/page.tsx

import Link from "next/link";
import { ProjectGrid } from "@/components/projects/ProjectGrid";
import {
  getAllProjects,
  getFeaturedProjects,
} from "@/content/projects/projects";
import { getProjectsPageCopy } from "@/content/pages";
import { FeaturedProjectCard } from "@/components/projects/FeaturedProjectCard";

export default async function ProjectsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const copy = getProjectsPageCopy(locale);

  const featured = getFeaturedProjects(locale);
  const all = getAllProjects(locale);

  const primaryFeatured = featured[0];

  const headerTitleParts = copy.header.title.split("\n");

  return (
    <main className="container-shell pt-12 pb-12 md:pt-14 md:pb-14">
      <header className="mb-12">
        {copy.header.kicker && (
          <p className="page-kicker">{copy.header.kicker}</p>
        )}

        <h1 className="page-hero">
          {headerTitleParts.map((part, i) => (
            <span key={i}>
              {part}
              {i < headerTitleParts.length - 1 ? <br /> : null}
            </span>
          ))}
        </h1>

        {copy.header.description && (
          <p className="page-description">{copy.header.description}</p>
        )}
      </header>

      {/* Featured */}
      {primaryFeatured && (
        <section className="mt-18">
          <div className="section-header">
            <h2 className="heading-section">{copy.featuredHeading}</h2>
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
          <h2 className="heading-section">{copy.moreHeading}</h2>
          <Link href={`/${locale}/contact`} className="view-all-link">
            {copy.contactCta}
          </Link>
        </div>

        <ProjectGrid locale={locale} projects={all} />
      </section>
    </main>
  );
}

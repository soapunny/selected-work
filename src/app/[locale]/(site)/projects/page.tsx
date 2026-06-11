import type { Metadata } from "next";
import Link from "next/link";
import { ProjectGrid } from "@/components/projects/ProjectGrid";
import { getAllProjects, getFeaturedProjects } from "@/content/projects/projects";
import { getProjectsPageCopy } from "@/content/pages";
import { FeaturedProjectCard } from "@/components/projects/FeaturedProjectCard";
import { PageHeader } from "@/components/ui/PageHeader";
import { Reveal } from "@/components/ui/Reveal";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const copy = getProjectsPageCopy(locale);
  return {
    title: "Projects",
    description: copy.header.description,
    openGraph: {
      title: "Projects | Ethan So",
      description: copy.header.description,
    },
  };
}

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

  return (
    <main className="container-shell pt-12 pb-12 md:pt-14 md:pb-14">
      <header className="mb-12">
        <PageHeader copy={copy.header} />
      </header>

      {/* Featured */}
      {primaryFeatured && (
        <section className="mt-18 animate-fade-up anim-delay-3">
          <div className="section-header">
            <h2 className="heading-section">{copy.featuredHeading}</h2>
            <span />
          </div>

          <FeaturedProjectCard
            locale={locale}
            project={primaryFeatured}
            ctaText={copy.featuredCardCta}
          />

          {featured.length > 1 && (
            <div className="mt-6">
              <ProjectGrid locale={locale} projects={featured.slice(1)} />
            </div>
          )}
        </section>
      )}

      {/* All projects */}
      <Reveal className="mt-14">
        <section>
          <div className="section-header">
            <h2 className="heading-section">{copy.moreHeading}</h2>
            <Link href={`/${locale}/contact`} className="view-all-link">
              {copy.contactCta}
            </Link>
          </div>

          <ProjectGrid locale={locale} projects={all} />
        </section>
      </Reveal>
    </main>
  );
}

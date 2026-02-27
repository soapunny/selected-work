// src/app/[locale]/(site)/page.tsx

import { getFeaturedProjects } from "@/content/projects/projects";
import { getHomeCopy } from "@/content/pages";
import Image from "next/image";
import Link from "next/link";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const copy = getHomeCopy(locale);
  const featured = getFeaturedProjects(locale);
  const primaryProject = featured[0];

  const heroTitleParts = copy.hero.title.split("\n");

  return (
    <main className="container-shell pt-12 pb-10 md:pt-14 md:pb-12">
      {/* Hero */}
      <section className="hero-layout">
        {/* Left: Portrait */}
        <div className="flex justify-center md:justify-center">
          <div className="relative w-[280px] overflow-hidden rounded-3xl border border-white/10 bg-background/30 grayscale-5% p-2 glow-soft md:w-[280px]">
            <div className="relative aspect-4/5 overflow-hidden rounded-2xl">
              <Image
                src="/portrait_new.jpg"
                alt="E. So portrait"
                width={520}
                height={650}
                priority
                quality={85}
                sizes="(min-width: 768px) 330px, 280px"
                className="h-full w-full object-cover object-center contrast-105 brightness-95 portrait-mood"
              />
            </div>
          </div>
        </div>

        {/* Right: Title + CTAs */}
        <div className="mt-6 min-w-0 flex flex-col items-start justify-center md:mt-0 md:items-start">
          <p className="text-base font-semibold tracking-wide text-foreground md:text-lg">
            {copy.hero.nameLine}
          </p>

          <h1 className="page-hero">
            {heroTitleParts.map((part, i) => (
              <span key={i}>
                {part}
                {i < heroTitleParts.length - 1 ? <br /> : null}
              </span>
            ))}
          </h1>

          <p className="page-description">{copy.hero.description}</p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link href={`/${locale}/projects`} className="btn-primary">
              {copy.hero.ctaPrimary}
            </Link>

            <Link href={`/${locale}/contact`} className="btn-secondary">
              {copy.hero.ctaSecondary}
            </Link>
          </div>
        </div>
      </section>

      {/* Featured */}
      <section className="mt-18">
        <div className="section-header">
          <h2 className="heading-section">{copy.featured.heading}</h2>
          <Link href={`/${locale}/projects`} className="view-all-link">
            {copy.featured.viewAll}
          </Link>
        </div>

        <Link
          href={`/${locale}/projects/pocketquest`}
          className="group card-premium"
        >
          <div className="flex flex-col gap-8">
            <div className="min-w-0">
              <p className="text-xs font-medium tracking-wide text-muted">
                {primaryProject.year}
                {primaryProject.tags.length > 0
                  ? ` • ${primaryProject.tags.slice(0, 2).join(" • ")}`
                  : ""}
              </p>

              <h3 className="mt-2 text-2xl font-semibold tracking-tight text-foreground transition group-hover:text-white">
                PocketQuest
              </h3>

              <p className="mt-3 max-w-2xl text-body-sm text-muted">
                {copy.featured.primaryCardBlurb}
              </p>

              <div className="mt-7 inline-flex">
                <div className="card-cta">
                  {copy.featured.primaryCardCta}
                </div>
              </div>
            </div>
          </div>
        </Link>
      </section>
    </main>
  );
}

// src/app/[locale]/(site)/page.tsx

import { getFeaturedProjects } from "@/content/projects/projects";
import Image from "next/image";
import Link from "next/link";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const featured = getFeaturedProjects();
  const primaryProject = featured[0];

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
            E. So
          </p>

          <h1 className="page-hero">
            Design-Driven
            <br />
            Full-Stack Engineer
          </h1>

          <p className="page-description">
            I build practical digital products with structured architecture and
            a calm, premium UI sensibility.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link href={`/${locale}/projects`} className="btn-primary">
              View Selected Work
            </Link>

            <Link href={`/${locale}/contact`} className="btn-secondary">
              Contact
            </Link>
          </div>
        </div>
      </section>

      {/* Featured */}
      <section className="mt-18">
        <div className="section-header">
          <h2 className="heading-section">Featured work</h2>
          <Link href={`/${locale}/projects`} className="view-all-link">
            View all →
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
                A mobile-first budgeting system focused on clean data modeling,
                predictable period logic, and an experience that stays calm
                under complexity.
              </p>

              <div className="mt-7 inline-flex">
                <div className="card-cta">
                  View case study{" "}
                  <span aria-hidden className="card-cta-arrow">
                    →
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Link>
      </section>
    </main>
  );
}

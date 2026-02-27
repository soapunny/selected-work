// src/app/[locale]/(site)/projects/[slug]/page.tsx

import { notFound } from "next/navigation";
import { getProjectBySlug } from "@/content/projects/projects";
import { getCaseStudy } from "@/content/case-studies";
import type { CaseStudySnippet } from "@/content/case-studies/types";
import { ProjectHero } from "@/components/projects/ProjectHero";
import { ProjectMeta } from "@/components/projects/ProjectMeta";
import { highlightToHtml } from "@/lib/prettier";

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;

  const project = getProjectBySlug(locale, slug);
  if (!project) return notFound();

  const caseStudy =
    getCaseStudy(locale, slug) ?? getCaseStudy(locale, "pocketquest");
  if (!caseStudy) return notFound();

  // Pre-render highlighted HTML for code snippets (can't use `await` inside a non-async map callback in JSX)
  const highlightedSnippets: Array<CaseStudySnippet & { html: string }> =
    await Promise.all(
      caseStudy.snippets.map(async (s) => ({
        ...s,
        html: await highlightToHtml(s.code, { lang: s.lang }),
      })),
    );

  return (
    <main className="container-shell pt-12 pb-12 md:pt-14 md:pb-14">
      <ProjectHero project={project} />
      <div className="mt-6">
        <ProjectMeta project={project} />
      </div>

      {/* Demo video (optional per project) */}
      {caseStudy.demo ? (
        <section className="section-block">
          <div className="section-header">
            <h2 className="heading-section">{caseStudy.labels.demoTitle}</h2>
            <span className="case-kbd">{caseStudy.labels.demoBadge}</span>
          </div>

          <div className="video-embed">
            <iframe
              src={caseStudy.demo.embedUrl}
              title={`${project.title} demo`}
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
          <p className="video-caption">{caseStudy.demo.caption}</p>

          <div className="section-divider" />
        </section>
      ) : null}

      {/* Case study (system-first) */}
      <section className="section-block">
        <div className="section-header">
          <h2 className="heading-section">{caseStudy.labels.architectureTitle}</h2>
          <span className="case-kbd">{caseStudy.labels.architectureBadge}</span>
        </div>

        <p className="mt-4 max-w-3xl text-body-lg text-muted">
          {caseStudy.architectureIntro}
        </p>

        <div className="arch-flow">{caseStudy.architectureFlow}</div>

        <div className="section-divider" />
      </section>

      <section className="section-block">
        <div className="section-header">
          <h2 className="heading-section">{caseStudy.labels.domainTitle}</h2>
          <span className="case-kbd">{caseStudy.labels.domainBadge}</span>
        </div>

        <p className="mt-4 max-w-3xl text-body-lg text-muted">
          {caseStudy.domainIntro}
        </p>

        <p className="mt-4 max-w-3xl text-body-sm text-muted">
          <span className="text-foreground">Impact:</span> {caseStudy.impact}
        </p>

        <p className="mt-4 max-w-3xl text-body-sm text-muted">
          <span className="text-foreground">Trade-offs:</span>{" "}
          {caseStudy.tradeoffs}
        </p>

        <div className="grid mt-6 gap-4 md:grid-cols-2">
          {caseStudy.domainCards.map((c) => (
            <div className="case-card" key={c.title}>
              <h3 className="case-card-title">{c.title}</h3>
              <p className="mt-3 text-body-sm text-muted">{c.body}</p>
            </div>
          ))}
        </div>

        <p className="mt-6 text-body-sm text-muted">
          <span className="text-foreground">Example:</span>{" "}
          {caseStudy.exampleNote}
        </p>

        <div className="section-divider" />
      </section>

      <section className="section-block">
        <div className="section-header">
          <h2 className="heading-section">{caseStudy.labels.selectedTitle}</h2>
          <span className="case-kbd">{caseStudy.labels.selectedBadge}</span>
        </div>

        <p className="mt-4 max-w-3xl text-body-lg text-muted">
          {caseStudy.selectedIntro}
        </p>

        <div className="code-grid">
          {highlightedSnippets.map((s) => (
            <div className="code-card" key={s.title}>
              <h3 className="code-title">{s.title}</h3>
              <p className="code-subtitle">{s.subtitle}</p>
              <div
                className="code-block-sm"
                dangerouslySetInnerHTML={{ __html: s.html }}
              />
            </div>
          ))}
        </div>

        <p className="code-caption">{caseStudy.selectedFooter}</p>

        <p className="mt-4 text-body-sm text-muted">{caseStudy.patternNote}</p>
      </section>
    </main>
  );
}

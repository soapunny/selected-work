// src/app/[locale]/(site)/about/page.tsx

import { getAboutCopy } from "@/content/pages";

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const copy = getAboutCopy(locale);

  const headerTitleParts = copy.header.title.split("\n");

  return (
    <main className="container-shell section-block pb-14 md:pb-16">
      {/* Header */}
      <section>
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
      </section>

      <div className="section-divider" />

      {/* Philosophy */}
      <section className="section-block grid gap-10 md:grid-cols-2">
        <div>
          <h2 className="heading-section">{copy.sections.approachTitle}</h2>
          <p className="mt-4 text-body-sm text-muted">
            {copy.sections.approachBody}
          </p>
        </div>

        <div>
          <h2 className="heading-section">{copy.sections.focusTitle}</h2>
          <p className="mt-4 text-body-sm text-muted">
            {copy.sections.focusBody}
          </p>
        </div>
      </section>

      <div className="section-divider" />

      {/* Core Stack */}
      <section className="section-block">
        <h2 className="heading-section">{copy.sections.coreStackTitle}</h2>
        <div className="mt-6 flex flex-wrap gap-3">
          {[
            "Next.js",
            "React",
            "TypeScript",
            "Tailwind CSS",
            "PostgreSQL",
            "UI System Design",
            "Product Thinking",
          ].map((skill) => (
            <span
              key={skill}
              className="rounded-xl border px-3 py-1.5 text-xs text-muted"
              style={{ borderColor: "rgb(var(--border))" }}
            >
              {skill}
            </span>
          ))}
        </div>
      </section>
    </main>
  );
}

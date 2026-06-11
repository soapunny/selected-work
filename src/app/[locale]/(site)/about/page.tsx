import type { Metadata } from "next";
import { getAboutCopy } from "@/content/pages";
import { PageHeader } from "@/components/ui/PageHeader";
import { TagBadge } from "@/components/ui/TagBadge";
import { Reveal } from "@/components/ui/Reveal";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const copy = getAboutCopy(locale);
  return {
    title: "About",
    description: copy.header.description,
    openGraph: {
      title: "About | Ethan So",
      description: copy.header.description,
    },
  };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const copy = getAboutCopy(locale);

  return (
    <main className="container-shell section-block pb-14 md:pb-16">
      <PageHeader copy={copy.header} />

      <div className="section-divider" />

      {/* Philosophy */}
      <Reveal>
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
      </Reveal>

      <div className="section-divider" />

      {/* Core Stack */}
      <Reveal>
        <section className="section-block">
          <h2 className="heading-section">{copy.sections.coreStackTitle}</h2>
          <div className="mt-6 flex flex-wrap gap-3">
            {copy.sections.coreStackItems.map((skill) => (
              <TagBadge key={skill} label={skill} />
            ))}
          </div>
        </section>
      </Reveal>

      <div className="section-divider" />

      <Reveal>
        <section className="section-block">
          <h2 className="heading-section">{copy.sections.closingTitle}</h2>
          <p className="mt-4 text-body-sm text-muted">
            {copy.sections.closingBody}
          </p>
          <p className="mt-4 text-body-sm">{copy.sections.closingCta}</p>
        </section>
      </Reveal>
    </main>
  );
}

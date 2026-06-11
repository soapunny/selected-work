import type { PageHeaderCopy } from "@/content/pages/types";

type PageHeaderProps = { copy: PageHeaderCopy };

export function PageHeader({ copy }: PageHeaderProps) {
  const titleParts = copy.title.split("\n");
  return (
    <section>
      {copy.kicker && (
        <p className="page-kicker animate-fade-up">{copy.kicker}</p>
      )}
      <h1 className="page-hero animate-fade-up anim-delay-1">
        {titleParts.map((part, i) => (
          <span key={i}>
            {part}
            {i < titleParts.length - 1 ? <br /> : null}
          </span>
        ))}
      </h1>
      {copy.description && (
        <p className="page-description animate-fade-up anim-delay-2">
          {copy.description}
        </p>
      )}
    </section>
  );
}

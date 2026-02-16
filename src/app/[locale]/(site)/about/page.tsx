// src/app/[locale]/(site)/about/page.tsx

export default function AboutPage() {
  return (
    <main className="container-shell section-block pb-14 md:pb-16">
      {/* Header */}
      <section>
        <p className="page-kicker">About</p>

        <h1 className="page-hero">
          Designing thoughtful interfaces.
          <br />
          Building systems with intention.
        </h1>

        <p className="page-description">
          I’m E. So — a front-end focused builder who values clarity, structure,
          and emotional tone in digital products. My work blends technical
          precision with visual restraint, aiming for interfaces that feel
          intentional, calm, and quietly confident.
        </p>
      </section>

      <div className="section-divider" />

      {/* Philosophy */}
      <section className="section-block grid gap-10 md:grid-cols-2">
        <div>
          <h2 className="heading-section">Approach</h2>
          <p className="mt-4 text-body-sm text-muted">
            I treat product development as system design rather than feature
            assembly. Structure comes first — layout rhythm, typography
            hierarchy, and component consistency. Once the system is stable,
            interaction and motion become refinement rather than decoration.
          </p>
        </div>

        <div>
          <h2 className="heading-section">Focus</h2>
          <p className="mt-4 text-body-sm text-muted">
            My focus is modern React ecosystems (Next.js, TypeScript), scalable
            UI systems, and clean design implementation. I’m especially drawn to
            products where thoughtful UX matters more than visual noise.
          </p>
        </div>
      </section>

      <div className="section-divider" />

      {/* Core Stack */}
      <section className="section-block">
        <h2 className="heading-section">Core Stack</h2>
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

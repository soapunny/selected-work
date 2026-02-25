// src/app/[locale]/(site)/contact/page.tsx

import Link from "next/link";

export default function ContactPage() {
  const email = "soapunny@gmail.com";
  const githubUrl = "https://github.com/soapunny";
  const resumeUrl = "/resume.pdf"; // public/resume.pdf 로 두면 됨

  return (
    <main className="container-shell section-block pb-14 md:pb-16">
      {/* Header */}
      <section>
        <p className="page-kicker">Contact</p>

        <h1 className="page-hero">
          Let’s build something calm,
          <br />
          intentional, and useful.
        </h1>

        <p className="page-description">
          For collaboration, opportunities, or thoughtful feedback — feel free
          to reach out. I’m especially interested in product work where UX
          clarity and strong systems go hand in hand.
        </p>
      </section>

      <div className="section-divider" />

      {/* Primary actions */}
      <section className="section-block">
        <div className="section-header">
          <h2 className="heading-section">Ways to reach me</h2>
          <span />
        </div>

        <div className="space-y-4">
          <a className="btn-primary w-full" href={`mailto:${email}`}>
            <span className="inline-flex w-5 justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                className="h-4 w-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16v12H4z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 7l8 6 8-6"
                />
              </svg>
            </span>
            <span>Email</span>
          </a>
          <Link
            className="btn-secondary w-full"
            href={githubUrl}
            target="_blank"
          >
            <span className="inline-flex w-5 justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-4 w-4"
              >
                <path d="M12 2C6.48 2 2 6.58 2 12.26c0 4.52 2.87 8.36 6.84 9.72.5.1.66-.22.66-.48 0-.24-.01-.88-.02-1.72-2.78.62-3.37-1.37-3.37-1.37-.45-1.18-1.1-1.5-1.1-1.5-.9-.63.07-.62.07-.62 1 .07 1.53 1.06 1.53 1.06.88 1.55 2.3 1.1 2.86.84.09-.66.35-1.1.63-1.36-2.22-.26-4.55-1.14-4.55-5.06 0-1.12.39-2.03 1.03-2.74-.1-.26-.45-1.3.1-2.72 0 0 .84-.27 2.75 1.05A9.3 9.3 0 0112 6.8c.83 0 1.67.12 2.45.36 1.9-1.32 2.74-1.05 2.74-1.05.55 1.42.2 2.46.1 2.72.64.71 1.02 1.62 1.02 2.74 0 3.93-2.34 4.8-4.57 5.05.36.32.69.94.69 1.9 0 1.37-.01 2.48-.01 2.82 0 .26.16.59.67.48A10.02 10.02 0 0022 12.26C22 6.58 17.52 2 12 2z" />
              </svg>
            </span>
            <span>GitHub</span>
          </Link>

          <Link
            className="btn-secondary w-full"
            href={resumeUrl}
            target="_blank"
          >
            <span className="inline-flex w-5 justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                className="h-4 w-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 2h9l5 5v15H6z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14 2v5h5"
                />
              </svg>
            </span>
            <span>Resume</span>
          </Link>
        </div>

        <p className="mt-4 text-body-sm text-muted">
          I usually respond within 24–48 hours.
        </p>
      </section>

      <div className="section-divider" />

      {/* Details */}
      <section className="section-block grid gap-10 md:grid-cols-2">
        <div>
          <h2 className="heading-section">Based in</h2>
          <p className="mt-4 text-body-sm text-muted">Atlanta, GA</p>
        </div>

        <div>
          <h2 className="heading-section">Focus</h2>
          <p className="mt-4 text-body-sm text-muted">
            UX/UI design to full-stack development — building clear interfaces
            and reliable systems.
          </p>
        </div>
      </section>
    </main>
  );
}

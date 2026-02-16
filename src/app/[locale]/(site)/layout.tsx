// src/app/[locale]/(site)/layout.tsx

import type { ReactNode } from "react";
import Link from "next/link";

export default async function SiteLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <div className="min-h-screen bg-premium">
      {/* Navbar */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-background/80 backdrop-blur">
        <nav className="container-shell flex h-16 items-center justify-between">
          <Link href={`/${locale}`} className="nav-link">
            E. So
          </Link>

          <div className="flex items-center gap-6 text-sm text-muted">
            <Link href={`/${locale}/projects`} className="nav-link">
              Projects
            </Link>
            <Link href={`/${locale}/about`} className="nav-link">
              About
            </Link>
            <Link href={`/${locale}/contact`} className="nav-link">
              Contact
            </Link>

            <span className="mx-1 h-4 w-px bg-border" aria-hidden />

            <div className="flex items-center gap-2">
              <Link
                href="/en"
                className={`lang-link ${locale === "en" ? "lang-link-active" : ""}`}
              >
                EN
              </Link>
              <span className="text-border" aria-hidden>
                /
              </span>
              <Link
                href="/ko"
                className={`lang-link ${locale === "ko" ? "lang-link-active" : ""}`}
              >
                KO
              </Link>
            </div>
          </div>
        </nav>
      </header>

      {/* Page Content */}
      {children}

      {/* Footer */}
      <footer className="border-t border-white/10">
        <div className="container-shell py-10 text-sm text-muted">
          © {new Date().getFullYear()} E. So
        </div>
      </footer>
    </div>
  );
}

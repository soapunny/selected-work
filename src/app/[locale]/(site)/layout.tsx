// src/app/[locale]/(site)/layout.tsx

import type { ReactNode } from "react";
import Link from "next/link";
import NavLocale from "@/components/locale/NavLocale";
import { getNav } from "@/content/nav";

export default async function SiteLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const nav = getNav(locale);

  return (
    <div className="min-h-screen bg-premium">
      {/* Navbar */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-background/80 backdrop-blur">
        <nav className="container-shell flex h-16 items-center justify-between">
          <Link href={`/${locale}`} className="nav-link">
            {nav.brand}
          </Link>

          <div className="flex items-center gap-6 text-sm text-muted">
            <Link href={`/${locale}/projects`} className="nav-link">
              {nav.items.projects}
            </Link>
            <Link href={`/${locale}/about`} className="nav-link">
              {nav.items.about}
            </Link>
            <Link href={`/${locale}/contact`} className="nav-link">
              {nav.items.contact}
            </Link>

            <span className="mx-1 h-4 w-px bg-border" aria-hidden />

            <NavLocale locale={locale} />
          </div>
        </nav>
      </header>

      {/* Page Content */}
      {children}

      {/* Footer */}
      <footer className="border-t border-white/10">
        <div className="container-shell flex flex-col gap-2 py-4 text-xs text-muted md:h-16 md:flex-row md:items-center md:justify-between md:gap-6 md:py-0">
          © {new Date().getFullYear()} E. So
          <p className="identity-verse m-0">
            &ldquo;Commit to the Lord whatever you do, and he will establish
            your plans.&rdquo;
          </p>
        </div>
      </footer>
    </div>
  );
}

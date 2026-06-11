"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NotFound() {
  const pathname = usePathname();
  const locale = pathname?.split("/")[1] ?? "en";

  return (
    <main className="container-shell flex min-h-[70vh] flex-col items-center justify-center text-center">
      <p className="text-sm font-medium tracking-widest text-muted uppercase animate-fade-up">
        404
      </p>
      <h1 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl animate-fade-up anim-delay-1">
        Page not found
      </h1>
      <p className="mt-4 max-w-sm text-body-sm text-muted animate-fade-up anim-delay-2">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link
        href={`/${locale}`}
        className="btn-secondary mt-8 animate-fade-up anim-delay-3"
      >
        ← Back to home
      </Link>
    </main>
  );
}

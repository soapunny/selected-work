"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type NavLocaleProps = { locale: string };

export function NavLocale({ locale }: NavLocaleProps) {
  const pathname = usePathname();

  const switchLocale = (targetLocale: string) => {
    if (!pathname) return `/${targetLocale}`;
    const segments = pathname.split("/");
    segments[1] = targetLocale;
    return segments.join("/");
  };

  return (
    <div className="flex items-center gap-2">
      <Link
        href={switchLocale("en")}
        className={`lang-link ${locale === "en" ? "lang-link-active" : ""}`}
      >
        EN
      </Link>
      <span className="text-border" aria-hidden>
        /
      </span>
      <Link
        href={switchLocale("ko")}
        className={`lang-link ${locale === "ko" ? "lang-link-active" : ""}`}
      >
        KO
      </Link>
    </div>
  );
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { NavKey, NavCopy } from "@/content/nav/types";

type NavLinksProps = {
  locale: string;
  items: NavCopy["items"];
};

const NAV_KEYS: NavKey[] = ["projects", "about", "contact"];

export function NavLinks({ locale, items }: NavLinksProps) {
  const pathname = usePathname();

  const isActive = (key: NavKey) => {
    const href = `/${locale}/${key}`;
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <>
      {NAV_KEYS.map((key) => (
        <Link
          key={key}
          href={`/${locale}/${key}`}
          className={`nav-link ${isActive(key) ? "nav-link-active" : ""}`}
        >
          {items[key]}
        </Link>
      ))}
    </>
  );
}

// src/app/[locale]/layout.tsx

import type { ReactNode } from "react";
import { normalizeLocale } from "@/lib/locale";

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const lang = normalizeLocale(locale);

  return (
    <html lang={lang}>
      <body>{children}</body>
    </html>
  );
}

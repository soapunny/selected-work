import type { Metadata } from "next";
import type { ReactNode } from "react";
import { SITE } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    template: "%s | Ethan So",
    default: "Ethan So — Full-Stack Engineer",
  },
  description:
    "Full-stack engineer building predictable systems and calm, intentional UIs.",
  openGraph: {
    type: "website",
    siteName: "Ethan So",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

# E. So — Selected Work

Personal portfolio website built with Next.js 16 App Router. Bilingual (EN / KO), dark theme, deployed on Vercel.

---

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 (CSS custom properties) |
| Syntax Highlighting | Shiki |
| Deployment | Vercel (auto-deploy on push) |
| Content | TypeScript files — no external DB |

---

## Features

- **Bilingual** — `/en`, `/ko` routes with per-locale content files
- **Dark theme** — fixed, CSS custom property design tokens
- **SEO** — `generateMetadata` on every page, dynamic OG images via `next/og`, `sitemap.xml`, `robots.txt`
- **`html lang`** — dynamically set per locale (`lang="en"` / `lang="ko"`)
- **Entry animations** — CSS-only `fade-up` with stagger delays
- **Scroll animations** — `<Reveal>` component (IntersectionObserver), applied to sections below the fold
- **Bento grid** — asymmetric project card layout (first card spans 2 columns)
- **Project case studies** — architecture, design principles, syntax-highlighted code snippets
- **Mobile UX** — code block horizontal scroll, live demo embed height optimized per type

---

## Project Structure

```
src/
├── app/
│   ├── layout.tsx                  # Root layout (metadata, globals.css)
│   ├── not-found.tsx               # Root 404 (no locale)
│   ├── opengraph-image.tsx         # Global OG image
│   ├── sitemap.ts                  # Auto-generated sitemap.xml
│   ├── robots.ts                   # Auto-generated robots.txt
│   └── [locale]/
│       ├── layout.tsx              # <html lang={locale}><body>
│       └── (site)/
│           ├── layout.tsx          # Nav + footer
│           ├── page.tsx            # Home
│           ├── not-found.tsx       # Locale 404 (inherits nav/footer)
│           ├── [...notFound]/      # Catch-all → triggers not-found
│           ├── projects/
│           │   ├── page.tsx
│           │   └── [slug]/
│           │       ├── page.tsx
│           │       └── opengraph-image.tsx
│           ├── about/
│           └── contact/
├── components/
│   ├── ui/                         # Domain-agnostic (TagBadge, PageHeader, Reveal)
│   └── [feature]/                  # Domain components (projects/, locale/)
├── content/
│   ├── projects/                   # projects.ko.ts / projects.en.ts + barrel
│   ├── case-studies/               # caseStudies.ko.ts / caseStudies.en.ts
│   ├── pages/                      # Per-page copy (home, about, projects, contact)
│   └── nav/
├── lib/
│   ├── locale.ts                   # ContentLocale type + normalizeLocale
│   ├── site.ts                     # SITE constants (url, email, githubUrl, resumeUrl)
│   └── prettier.ts                 # Shiki highlighting
└── messages/                       # i18n JSON (ko.json / en.json)
```

---

## Layout Hierarchy

```
app/layout.tsx              → metadata + globals.css (passthrough)
└── [locale]/layout.tsx     → <html lang={locale}><body>
    └── (site)/layout.tsx   → nav + footer wrapper
        └── page content
```

- `[locale]/layout.tsx` sets the correct `lang` attribute per locale
- `(site)/layout.tsx` handles shared nav/footer without affecting URL structure
- Root `not-found.tsx` renders its own `<html><body>` (no locale context)

---

## Design System

Tokens defined in `src/app/globals.css` `:root`:

| Token | Description |
|---|---|
| `--bg` | Page background (deep charcoal) |
| `--fg` | Primary text (near-white) |
| `--muted` | Secondary text |
| `--border` | Subtle border |
| `--accent` | Emerald green highlight |

All components use `var(--token)` or Tailwind mapped tokens — no hardcoded colors.

---

## Animation System

- **Entry**: `animate-fade-up` + `anim-delay-1~5` — fires on page load for hero elements
- **Scroll**: `<Reveal>` component — IntersectionObserver triggers `animate-fade-up` when section enters viewport
- **Reduced motion**: globally handled in `globals.css` via `prefers-reduced-motion`

---

## Content Conventions

- All content lives in `src/content/` as TypeScript files
- Locale pairs: always update `.en.ts` and `.ko.ts` together
- Types defined in `types.ts`, exported via barrel file (never import `types.ts` directly)
- Field addition order: `types.ts` → `.en.ts` → `.ko.ts`

---

## Getting Started

```bash
npm install
npm run dev
```

```bash
npm run build
npm start
```

---

## URLs

```
/en                          → Home
/en/projects                 → Projects list
/en/projects/reel            → REEL case study
/en/projects/pocketquest     → PocketQuest case study
/en/projects/facebook-chatbot
/en/about
/en/contact
/ko/...                      → Korean equivalents
```

---

## Author

**Ethan So** — Full-Stack Engineer  
[ethanso.com](https://ethanso.com)

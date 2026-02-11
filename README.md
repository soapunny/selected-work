# E. So — Selected Work

Professional portfolio website built with Next.js (App Router), designed with a structured, scalable architecture and bilingual support (**EN / KO**).

---

## Overview

This project focuses on clean architecture, content separation, and maintainable routing structure rather than quick UI prototyping.

The goal is to reflect real-world scalability, not just a visual portfolio.

---

## Tech Stack

- **Next.js (App Router)**
- **TypeScript**
- **Tailwind CSS**
- **ESLint**
- **Bilingual routing structure (`/en`, `/ko`)**

---

## Architecture Philosophy

This project follows a structured, production-style architecture:

- Route-level responsibility separation
- Content (data) separated from UI
- Reusable UI modules
- Locale-based routing
- Server-first component approach

---

## Project Structure

```bash
src/
  app/
    [locale]/
      layout.tsx
      (site)/
        layout.tsx
        page.tsx
        projects/
          page.tsx
          [slug]/
            page.tsx
        about/
          page.tsx
        contact/
          page.tsx

  components/
  content/
  messages/
  lib/
```

---

## Structure Overview

- **app/** — Routing layer (Next.js controlled)
- **components/** — Reusable UI modules
- **content/** — Single source of truth (project data, profile data)
- **messages/** — Localization files (EN / KO)
- **lib/** — Utilities, shared logic, type definitions

---

## Routing Strategy

- Locale-based routing: `/en`, `/ko`
- Route groups `(site)` used for layout separation without affecting URLs
- Dynamic project pages via `projects/[slug]`

---

## Example URLs:

```bash
/en
/en/projects/pocketquest
/ko/projects/messenger-automation
```

---

## Layout Hierarchy

Two-level layout architecture:

1. `[locale]/layout.tsx`
   Responsible for language context and locale-level configuration.
2. `(site)/layout.tsx`
   Responsible for shared site structure (navigation, footer, layout container).

This separation allows scalability and future layout extensions without restructuring URLs.

---

## Getting Started

### Install dependencies:

```bash
npm install
```

### Run development server:

```bash
npm run dev
```

### Build production:

```bash
npm run build
npm start
```

---

## Author

**E. So** | Design-Driven Full-Stack Engineer
# selected-work

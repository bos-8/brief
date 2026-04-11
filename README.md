<!-- @file: .\README.md -->
---
created: 2026-04-11T00:00:00Z
updated: 2026-04-11T00:00:00Z
---

# Brief

Static bilingual presentation site built with Next.js App Router, `next-intl`, Tailwind CSS v4, and `pnpm`.

The repository currently provides:

- a language entry page at `/`
- localized landing pages at `/pl` and `/en`
- an interactive full-screen slide deck at `/[locale]/presentation/slide/[id]`
- a print-friendly route for PDF export at `/[locale]/presentation/print`

## Scope

This project is designed as a static presentation website, not a runtime web application.

Key constraints:

- locale-prefixed routes only
- no middleware-based locale detection
- static export enabled via `output: "export"`
- translation files limited to:
  - `messages/pl.json`
  - `messages/en.json`

## Stack

- Next.js 16 App Router
- React 19
- TypeScript
- `next-intl`
- Tailwind CSS v4
- `react-bootstrap-icons`
- `pnpm`

## Routes

- `/`
  Language entry page
- `/pl`
  Polish landing page
- `/en`
  English landing page
- `/[locale]/presentation/slide/[id]`
  Interactive slide deck with one route per slide
- `/[locale]/presentation/print`
  Print layout intended for browser print to PDF

## Development

Install dependencies:

```powershell
pnpm install
```

Start the development server:

```powershell
pnpm dev
```

Lint the project:

```powershell
pnpm lint
```

Create the static export:

```powershell
pnpm build
```

The production build generates static output in `out/`.

## Content Ownership

Presentation structure is split across three layers:

- `src/schema/presentation.ts`
  Slide order, route IDs, tone, and layout variant
- `messages/pl.json`
  Polish slide content and UI copy
- `messages/en.json`
  English slide content and UI copy

If you want to add, remove, or reorder slides, start in `src/schema/presentation.ts` and then keep both translation files aligned.

## UI Structure

The repository uses a small separation between reusable UI and larger composed layout blocks:

- `src/components/ui/`
  Small controls and focused interaction helpers
- `src/components/layout/`
  Larger presentation shells, landing sections, print deck, and composed screen-level pieces

## Project Structure

```text
messages/
  en.json
  pl.json
src/
  app/
    [locale]/
      page.tsx
      presentation/
        print/page.tsx
        slide/[id]/page.tsx
    globals.css
    layout.tsx
    page.tsx
  components/
    layout/
    ui/
  i18n/
  lib/
  schema/
  types/
```

## Internationalization

`next-intl` is configured in `src/i18n/` and uses explicit locale-prefixed routing.

This repository intentionally keeps the message layout minimal:

- `messages/pl.json`
- `messages/en.json`

There are no additional locale files, namespaces, or middleware-based redirects.

## Static Export Notes

The project is configured for static export in `next.config.ts`.

That means:

- all routes must be known at build time
- slide pages are generated through `generateStaticParams`
- deployment should serve the generated `out/` directory as static files

## Print / PDF Export

The interactive slide deck and the print layout are separate on purpose.

Use the print route when you need browser-based PDF export:

- `/pl/presentation/print`
- `/en/presentation/print`

This avoids mixing full-screen interaction behavior with print pagination.

<!-- @file: .\AGENTS.md -->
# AGENTS.md

Repository-wide rules for AI coding agents, automation tools, and code generators.

The target is always the same: produce the **smallest correct, maintainable change** that fits this repository and preserves static deployment.

<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## 1. Mission

Build and evolve a bilingual website for scientific presentations, conference materials, and short supporting content.

Prefer changes that improve:

- static export reliability,
- clarity of content,
- accessibility,
- localization quality,
- maintainability,
- professional UX without unnecessary complexity.

This repository is a **static presentation site**, not a full-stack platform.

## 2. Non-negotiable delivery target

The site must remain easy to build and deploy as a fully static website.

Assume the target stack is:

- latest Next.js with App Router,
- `next-intl`,
- Tailwind CSS,
- `react-bootstrap-icons`,
- GitHub Pages,
- `output: 'export'`.

Every change must preserve static export compatibility.

Do **not** optimize for `standalone` server deployment.
Do optimize for a clean static build.

If a feature conflicts with static export, choose a static-friendly alternative.

## 3. Public-ready by default

This repository may become public.

Never commit or generate:

- secrets,
- tokens,
- private URLs,
- internal-only notes,
- confidential screenshots,
- unpublished credentials,
- environment-specific sensitive data.

Treat all code, docs, assets, and comments as potentially public-facing.

## 4. Language

Use **English** for code, comments, documentation, commit messages, pull requests, translation keys, logs, and technical UI copy where practical.

Localized end-user content belongs in translation files.

## 5. Mandatory file header

The **first line of every source file whose format supports comments** must be a repository-root file path comment.

Examples:

```md
<!-- @file: ./README.md -->
```

```tsx
// @file: src/app/[locale]/page.tsx
```

```css
/* @file: src/app/globals.css */
```

Keep it on line 1 and preserve it during refactors.

Do **not** force this rule into formats that do not support comments, such as JSON, lockfiles, or generated manifests.

## 6. Repository shape and boundaries

Expected top-level shape:

```text
docs/
messages/
public/
src/
  app/
  components/
  content/
  i18n/
  lib/
  types/
.github/
README.md
AGENTS.md
```

Use these boundaries consistently:

* `src/app/` — routes, layouts, metadata, route-level composition,
* `src/components/` — reusable UI components,
* `src/content/` — presentation data, static content models, local content sources,
* `src/i18n/` — locale configuration,
* `src/lib/` — small shared utilities,
* `src/types/` — shared TypeScript types,
* `public/` — static assets,
* `messages/` — translation files,
* `docs/` — notes, diagrams, ADRs, deployment documentation.

Do **not** introduce `apps/`, `services/`, `packages/`, backend layers, or infrastructure folders unless explicitly requested.

## 7. Next.js and frontend rules

Use the App Router and follow the nearest existing project pattern.

Prefer:

* Server Components when they keep the code simpler and remain static-export compatible,
* Client Components only for real interactivity,
* small route files,
* reusable components extracted from route files,
* semantic HTML,
* accessible controls and keyboard-friendly UI,
* Tailwind for styling,
* simple icon usage with `react-bootstrap-icons`.

Avoid:

* unnecessary client-side state,
* heavy abstractions,
* ad hoc patterns that differ from surrounding code,
* new UI libraries unless clearly justified,
* styling approaches that fight the existing Tailwind setup.

Use `next/link` for internal navigation.

## 8. Internationalization rules

Use `next-intl` with explicit locale-prefixed routes such as:

* `/pl/...`
* `/en/...`

Do **not** rely on:

* middleware,
* runtime locale negotiation,
* request-time language detection.

Keep translation keys:

* stable,
* descriptive,
* grouped by feature,
* aligned across `messages/pl.json` and `messages/en.json`.

Do not hardcode translatable UI copy in components unless the text is intentionally locale-independent.

## 9. Static export and GitHub Pages rules

Write code so the project can always be built into a static site with minimal friction.

Required mindset:

* all content must resolve at build time,
* all routes must be statically reachable,
* the site may be served from a repository subpath rather than domain root.

Prefer:

* repository-local content,
* deterministic build-time data,
* `generateStaticParams` for dynamic route segments,
* basePath-safe internal links and asset usage,
* static assets from `public/`,
* simple rendering over runtime-dependent features.

Avoid or do not introduce:

* API routes,
* Server Actions that require a runtime,
* middleware or proxy-based routing,
* request-dependent rendering via `cookies()`, `headers()`, or session assumptions,
* ISR, SSR, or other runtime rendering dependencies,
* runtime rewrites, headers, or redirects that require a server,
* external services that must be available at request time,
* image handling that depends on a server runtime.

Do not hardcode domain-root-only asset paths if they can break under `basePath`.

## 10. Engineering standard

Apply these principles pragmatically:

* Clean Code,
* DRY,
* KISS,
* YAGNI,
* composition over inheritance,
* accessible by default,
* maintainable by default.

Prefer:

* small diffs,
* clear naming,
* explicit control flow,
* focused functions,
* low coupling,
* stable ownership of files and folders,
* obvious data flow.

Avoid:

* speculative abstractions,
* premature generalization,
* unrelated rewrites,
* hidden magic,
* unnecessary dependencies,
* architecture copied from large full-stack systems.

## 11. Validation and change discipline

Use `pnpm` as the package manager.

At minimum, changed code should:

* lint clean,
* type-check clean,
* build clean,
* remain compatible with static export,
* remain reviewable as a small, intentional diff.

Before finishing a change, verify:

* routes still work as static routes,
* locale handling still works without runtime middleware,
* asset paths do not break under `basePath`,
* new UI copy is translated where needed,
* docs are updated when behavior or structure changed.

Do not edit generated files unless the task explicitly requires it.

## 12. Agent workflow

When making a change:

1. inspect the nearest existing pattern,
2. read the relevant Next.js guide in `node_modules/next/dist/docs/` when framework behavior matters,
3. verify the approach is compatible with static export,
4. implement the smallest viable change,
5. validate types, imports, translations, and route behavior,
6. update docs only where behavior or structure changed,
7. avoid unrelated cleanup.

## 13. Final rule

Write code that a maintainer can safely read, review, explain, and evolve months later.

The correct outcome is not more code.
The correct outcome is **clear code that ships as a static site**.
# Architecture

This portfolio uses Next.js 15 App Router with TypeScript and a fully static export. Server-only features and runtime API routes are intentionally excluded so every route can be hosted on GitHub Pages.

## Boundaries

- `app/` owns routes, layouts, and route metadata.
- `components/ui/` contains shadcn/ui-compatible primitives.
- `components/layout/` contains application-wide composition and providers.
- `components/sections/` contains page-level, reusable sections.
- `content/` is the source of portfolio copy and structured content.
- `lib/` contains framework-neutral utilities and site configuration.
- `hooks/` contains reusable client hooks.
- `styles/` contains global tokens and Tailwind layers.

Components are server components by default. Add `"use client"` only at interaction boundaries. Use the `@/*` alias for repository-root imports.

## Deployment

`next.config.ts` derives a GitHub project-site base path during Actions builds and leaves user or organization sites at the root. The workflow validates types, lint, formatting, and the static export before deploying `out/`.

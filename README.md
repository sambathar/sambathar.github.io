# Cloud Infrastructure Portfolio

Production foundation for a Senior Cloud Infrastructure Engineer portfolio.

## Documentation

This repository follows a documentation-first workflow. Product, content, design, and engineering decisions should be captured in `docs/` before implementation work changes the application.

- [MASTER_SPEC](./docs/MASTER_SPEC.md): product-level source of truth for scope, requirements, and open questions.
- [IDENTITY](./docs/IDENTITY.md): positioning, audience, and proof-point planning.
- [VISION](./docs/VISION.md): long-term direction, success criteria, and non-goals.
- [BRAND_GUIDELINES](./docs/BRAND_GUIDELINES.md): brand principles, voice, tone, and visual-direction rules.
- [DESIGN_SYSTEM](./docs/DESIGN_SYSTEM.md): design foundations, tokens, and usage rules.
- [ANIMATION_SYSTEM](./docs/ANIMATION_SYSTEM.md): motion principles, interaction patterns, and accessibility constraints.
- [COMPONENT_LIBRARY](./docs/COMPONENT_LIBRARY.md): component inventory, composition rules, and quality criteria.
- [CONTENT_GUIDELINES](./docs/CONTENT_GUIDELINES.md): content strategy, page content planning, and review checklist.
- [TECH_STACK](./docs/TECH_STACK.md): approved stack, technical constraints, and operational notes.
- [CODING_STANDARDS](./docs/CODING_STANDARDS.md): engineering standards, architecture rules, and review checklist.
- [SEO_GUIDELINES](./docs/SEO_GUIDELINES.md): metadata, structured content, and SEO validation requirements.
- [DECISIONS](./docs/DECISIONS.md): decision log for approved and pending project choices.
- [RECRUITER_JOURNEY](./docs/RECRUITER_JOURNEY.md): recruiter and hiring-manager journey mapping.

## Development

```bash
npm install
npm run dev
```

Before committing, run `npm run typecheck`, `npm run lint`, `npm run format:check`, and `npm run build`.

Set `NEXT_PUBLIC_SITE_URL` to the canonical production URL. GitHub Pages deployment runs automatically from `main`; enable **GitHub Actions** as the Pages source in repository settings.

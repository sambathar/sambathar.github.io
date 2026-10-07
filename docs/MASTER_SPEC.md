# Master Spec

Purpose: Define the implemented portfolio experience and the constraints that govern future work.

Status: Draft

## Table of Contents

- [Scope](#scope)
- [Implemented V1 Experience](#implemented-v1-experience)
- [V3 Refinements](#v3-refinements)
- [Constraints](#constraints)
- [Related Documents](#related-documents)

## Scope

The V1 site is a static, GitHub Pages-compatible engineering portfolio for Sambath A R. Content is derived from verified resume material only.

## Implemented V1 Experience

- Hero
- Technology Ecosystem
- Engineering Identity / How I Think
- Case Studies
- Measured Impact
- Career Journey
- AI Automation
- Resume
- Contact / Footer

## V3 Refinements

V3 refines V1.2 while preserving section order, the neutral dark-first identity, typography family, navbar, profile facts, resume PDF, SEO, and static deployment configuration.

- The hero has a smaller desktop headline and a `View Case Studies` CTA.
- Hero and AI diagrams use fixed SVG node boxes and connectors terminating at their borders. Mobile uses a separate vertical topology with side lanes for connections that skip nodes.
- Hover and focus preview node context; click, tap, Enter, and Space retain selection. The diagrams include an interaction hint, visible focus, and readable inactive nodes.
- Context panels reserve space, and case-study/career panels share a grid track sized by their longest entry to prevent selection-driven layout shifts.
- Verified impact metrics retain their order and values; the first three outcomes receive restrained emphasis.
- Continuous path pulses and count-up animation stop under reduced motion.

## Constraints

- GitHub Pages is the current hosting platform.
- Static export is required.
- No backend, database, API routes, or runtime server features.
- No profile photo, certificates, fake testimonials, skill percentage ratings, or fabricated metrics.
- Resume download points to the real PDF asset at `/resume/Sambath-A-R-IT-Cloud-Infrastructure.pdf`.

## Related Documents

- [Identity](./IDENTITY.md)
- [Design System](./DESIGN_SYSTEM.md)
- [Component Library](./COMPONENT_LIBRARY.md)
- [Decisions](./DECISIONS.md)

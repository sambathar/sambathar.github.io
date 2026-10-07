# Component Library

Purpose: Track the reusable component architecture used in the portfolio.

Status: Draft

## Table of Contents

- [Reusable Components](#reusable-components)
- [Implemented Experience Components](#implemented-experience-components)
- [Quality Criteria](#quality-criteria)
- [Related Documents](#related-documents)

## Reusable Components

The V1 implementation reuses Button, Card, GlassPanel, Section, SectionHeading, MetricCard, Badge, Tag, Divider, IconContainer, ThemeSwitch, Container, Navbar, PageWrapper, and AppShell.

## Implemented Experience Components

The landing experience is data-driven within the existing section architecture and includes interactive technology filters, case-study panels, measured impact cards, career timeline, and AI architecture interactions.

V3 keeps the existing files under `components/sections/landing/`:

- `SystemDiagram`: shared SVG topology, fixed rectangular node geometry, edge-aligned connectors, optional directional arrows, hover/focus previews, retained selection, and a reserved context panel. Native buttons inside SVG `foreignObject` elements provide Enter/Space behavior and accessible pressed state.
- `HeroArchitecture` and `AIAutomationArchitecture`: thin wrappers supplying verified nodes and connection graphs from `data.ts`.
- `TechnologyEcosystem`: six category controls, compact descriptions, and related-area emphasis.
- `EngineeringPrinciples`: stable cards with supporting tags revealed on hover, focus, and tap.
- `CaseStudyExplorer` and `CareerTimeline`: stable selectors and overlapping grid panels that reserve the tallest entry's height at the current width. Inactive entries are invisible, inert, and excluded from accessibility with `aria-hidden`.
- `ImpactMetrics`: verified metrics, contextual subtitles, viewport count-up, and reduced-motion handling.

Diagram dimensions are independent of selection. Desktop and mobile SVGs share selection state; CSS exposes only the appropriate layout. Connection endpoints and native button boxes use the same coordinates. `getDiagramGeometry` and `connectorPath` expose the pure geometry calculations for diagnostic checks.

## Quality Criteria

Components should remain keyboard accessible, responsive, static-export compatible, and aligned with the neutral visual system.

## Related Documents

- [Design System](./DESIGN_SYSTEM.md)
- [Coding Standards](./CODING_STANDARDS.md)
- [Decisions](./DECISIONS.md)

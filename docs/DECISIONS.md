# Decisions

Purpose: Record important product, content, design, and technical decisions.

Status: Draft

## Table of Contents

- [Decision Log](#decision-log)
- [V3 Interaction Decisions](#v3-interaction-decisions)
- [V3.1 Corrections](#v31-corrections)
- [V3.2 Desktop Freeze](#v32-desktop-freeze)
- [Open Decisions](#open-decisions)
- [Related Documents](#related-documents)

## Decision Log

- GitHub Pages is the current hosting platform.
- Next.js static export is required.
- No backend, database, API routes, or external runtime APIs.
- No profile photo is required for V1.
- No certificates are required for V1.
- No fake testimonials, fake logos, or skill percentage ratings.
- Resume is downloadable as a real PDF at `/resume/Sambath-A-R-IT-Cloud-Infrastructure.pdf`.
- Portfolio content is derived from verified resume material.
- Interactive engineering visualizations are the main visual language.
- Contact is handled through email, LinkedIn, and GitHub; no contact form.

## V3 Interaction Decisions

- Preserve the existing architecture, section order, navbar, neutral tokens, typography family, SEO, deployment, and resume PDF. Changes remain within existing section components and documentation.
- Use one SVG coordinate system for each diagram's node boxes and connectors. Fixed box dimensions replace content-sized overlays so selection cannot move ports or nodes.
- Draw a continuous base connector from node border to node border. Use restrained optional pulses above it and directional arrowheads for AI flow.
- Use native buttons inside SVG for keyboard and touch behavior. Hover/focus previews are temporary; click/Enter/Space selection persists when the pointer or focus leaves.
- Reserve diagram context height. Use overlapping grid entries for case-study and career details so the longest entry determines panel height; hide and inert inactive entries.
- Improve hero balance locally rather than changing global typography. Use `View Case Studies` consistently.
- Retain metric values/order and emphasize the three outcome metrics through neutral surfaces/borders. Preserve final values if reduced motion is enabled during a count-up.
- Do not add dependencies, runtime data fetching, external APIs, or speculative content.

## V3.1 Corrections

- Framer Motion's reduced-motion hook can return `null` during SSR and `false` on the first browser render. Conditional pulse paths must wait for a post-hydration effect; otherwise the SVG child structure differs and hydration can report mismatched path geometry. The full diagram, fixed coordinates, nodes, and continuous base paths remain server-rendered. Initial context presentation is also independent of the media preference.
- AI agent/workflow boxes are 56 SVG units tall and 128 units wide on desktop. The AI viewBox is 400 units tall; mobile spacing derives from each fixed box height plus a 20-unit gap. Incoming AI arrowheads stop 4 units before node borders.
- AI context entries share an overlapping grid track so the longest approved text determines height, replacing unnecessary fixed empty space without selection-driven jumps.
- The primary impact grid has seven distinct metrics. Four Microsoft 365 tenants replace user-count emphasis; automation and cost reduction have separate contextual subtitles. Desktop rows use four cards followed by three evenly stretched cards; smaller widths preserve two/one-column behavior and the shared container gutters.
- V3.1 uses only approved content corrections and preserves the V3 visual system, navbar, section order, resume, and deployment configuration.

## V3.2 Desktop Freeze

- Desktop design is frozen after the approved content/UX corrections. The diagrams, hydration fix, navigation, section order, typography, colors, motion, resume PDF, and deployment configuration are unchanged.
- The hero starts with the combined role line; the duplicate name and separate role lines are removed. Resume copy uses the approved skills-snapshot sentence. Contact provides equally visible Email and LinkedIn buttons while retaining footer links.
- All four principles retain hover/focus/tap chip reveals. Shared subgrid rows align icons, titles, descriptions, and chips without changing card styling.
- Seven metrics remain. The first desktop row is compliance, manual effort reduction, tenants, and migrated endpoints. The second is cost reduction, Azure resources, and availability; three equal-width cards are centered. The two 40% outcomes are in different rows with their distinct contexts preserved.
- Every case study retains Problem / Context, Approach, Technology, and Outcome. Approved challenge-focused contexts replace solution descriptions; approaches explicitly reference only the documented technologies. No outcomes or numbers are added.

## Open Decisions

- Final brand guidelines remain draft.
- Future case-study depth and resume synchronization workflow still need owner approval.

## Related Documents

- [Master Spec](./MASTER_SPEC.md)
- [Design System](./DESIGN_SYSTEM.md)
- [Content Guidelines](./CONTENT_GUIDELINES.md)

# Design System

Purpose: Document the visual and interaction direction currently implemented.

Status: Draft

## Table of Contents

- [Foundations](#foundations)
- [Visual Language](#visual-language)
- [V3 Interaction States](#v3-interaction-states)
- [Motion](#motion)
- [Related Documents](#related-documents)

## Foundations

The site is dark-first with light mode support. The current visual system uses neutral tokens, strong typography, thin borders, subtle glass surfaces, large spacing, minimal shadows, and architecture-inspired visuals.

## Visual Language

Interactive engineering visualizations are the primary visual language. Avoid neon colors, excessive gradients, generic AI imagery, stock photos, 3D assets, and unnecessary icon walls.

## V3 Interaction States

The hero desktop headline uses a local 38–44px responsive range to balance positioning, role, description, CTAs, and architecture in the first viewport. The existing font family and page-wide typography tokens remain unchanged.

Architecture node dimensions and coordinates stay identical across hover, focus, and selection. Inactive nodes use full-opacity text, graphite/card surfaces, and readable neutral borders. Active nodes use a brighter border, a muted surface, a small monochrome indicator, and a restrained glow. Focus adds a distinct outer outline. Connected paths become brighter without changing their geometry or stroke width.

Technology selection emphasizes the active card and related areas without fading all text. Principle cards reveal tags within reserved space and elevate by only 2px. Case-study and career selectors keep stable positions while their detail content changes. Metrics retain contextual subtitles and tabular numerals.

All states use existing foreground, muted, card, ring, and border tokens in both themes. No new accent palette or visual identity is introduced.

## Motion

Motion supports hierarchy and interaction through fade-up entrances, staggered cards, expandable panels, timeline activation, metric count-up, and subtle path highlighting. Reduced motion must preserve all content and functionality.

V3 connectors always retain a continuous base stroke. Occasional data-flow pulses overlay that stroke rather than replacing it with moving fragments. Reduced motion removes those pulses, metric count-up, principle elevation, and translated entrances; selections and concise context remain available.

## Related Documents

- [Component Library](./COMPONENT_LIBRARY.md)
- [Animation System](./ANIMATION_SYSTEM.md)
- [Content Guidelines](./CONTENT_GUIDELINES.md)

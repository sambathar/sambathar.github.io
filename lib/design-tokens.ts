export const spacingTokens = {
  // TODO(design-system): Replace placeholder spacing values with approved scale.
  pageX: "clamp(1rem, 4vw, 2rem)",
  sectionSm: "clamp(3rem, 6vw, 5rem)",
  section: "clamp(4rem, 8vw, 7rem)",
  sectionLg: "clamp(5rem, 10vw, 9rem)",
} as const;

export const typographyTokens = {
  // TODO(design-system): Confirm type scale, line heights, and weights.
  eyebrow: "text-xs font-medium uppercase tracking-[0.18em]",
  heading: "text-balance text-3xl font-semibold tracking-tight md:text-5xl",
  subheading:
    "text-pretty text-base leading-7 text-muted-foreground md:text-lg",
  body: "text-base leading-7 text-muted-foreground",
  label: "text-sm font-medium",
} as const;

export const colorTokens = {
  // TODO(design-system): Map these semantic tokens to approved brand-neutral values.
  background: "hsl(var(--background))",
  foreground: "hsl(var(--foreground))",
  card: "hsl(var(--card))",
  border: "hsl(var(--border))",
  muted: "hsl(var(--muted))",
  accent: "hsl(var(--accent))",
} as const;

export const radiusTokens = {
  // TODO(design-system): Finalize radius scale.
  xs: "var(--radius-xs)",
  sm: "var(--radius-sm)",
  md: "var(--radius-md)",
  lg: "var(--radius-lg)",
  xl: "var(--radius-xl)",
  "2xl": "var(--radius-2xl)",
} as const;

export const shadowTokens = {
  // TODO(design-system): Finalize elevation model.
  soft: "var(--shadow-soft)",
  panel: "var(--shadow-panel)",
  elevated: "var(--shadow-elevated)",
} as const;

import * as React from "react";

import { cn } from "@/lib/utils";
import { typographyTokens } from "@/lib/design-tokens";

export interface SectionHeadingProps extends React.HTMLAttributes<HTMLDivElement> {
  eyebrow?: string;
  title?: string;
  description?: string;
}

export function SectionHeading({
  className,
  eyebrow,
  title,
  description,
  children,
  ...props
}: SectionHeadingProps) {
  return (
    <div
      className={cn("section-entry-heading max-w-3xl space-y-4", className)}
      {...props}
    >
      {eyebrow ? (
        <p className={cn(typographyTokens.eyebrow, "text-muted-foreground")}>
          {eyebrow}
        </p>
      ) : null}
      {title ? <h2 className={typographyTokens.heading}>{title}</h2> : null}
      {description ? (
        <p className={typographyTokens.subheading}>{description}</p>
      ) : null}
      {children}
    </div>
  );
}

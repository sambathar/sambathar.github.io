import * as React from "react";

import { cn } from "@/lib/utils";

export type GlassPanelProps = React.HTMLAttributes<HTMLDivElement>;

export const GlassPanel = React.forwardRef<HTMLDivElement, GlassPanelProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "rounded-2xl border bg-card/70 shadow-panel backdrop-blur-xl",
        // TODO(design-system): Confirm transparency and blur values.
        className,
      )}
      {...props}
    />
  ),
);
GlassPanel.displayName = "GlassPanel";

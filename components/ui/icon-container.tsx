import * as React from "react";

import { cn } from "@/lib/utils";

export interface IconContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md" | "lg";
}

const sizes = {
  sm: "size-8",
  md: "size-10",
  lg: "size-12",
};

export function IconContainer({
  className,
  size = "md",
  ...props
}: IconContainerProps) {
  return (
    <div
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-lg border bg-muted text-muted-foreground",
        sizes[size],
        className,
      )}
      {...props}
    />
  );
}

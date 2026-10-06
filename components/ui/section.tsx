import * as React from "react";

import { cn } from "@/lib/utils";

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  spacing?: "sm" | "default" | "lg";
}

const spacingMap = {
  sm: "py-section-sm",
  default: "py-section",
  lg: "py-section-lg",
};

export function Section({
  className,
  spacing = "default",
  ...props
}: SectionProps) {
  return <section className={cn(spacingMap[spacing], className)} {...props} />;
}

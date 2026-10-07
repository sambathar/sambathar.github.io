"use client";

import * as React from "react";
import { useInView } from "framer-motion";

import { cn } from "@/lib/utils";

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  spacing?: "sm" | "default" | "lg";
  reveal?: boolean;
}

const spacingMap = {
  sm: "py-section-sm",
  default: "py-section",
  lg: "py-section-lg",
};

export function Section({
  className,
  spacing = "default",
  reveal = false,
  ...props
}: SectionProps) {
  const ref = React.useRef<HTMLElement>(null);
  const entered = useInView(ref, { once: true, margin: "0px 0px 64px 0px" });
  return (
    <section
      ref={reveal ? ref : undefined}
      className={cn(spacingMap[spacing], reveal && "section-entry", className)}
      data-reveal={reveal && entered ? "entered" : undefined}
      {...props}
    />
  );
}

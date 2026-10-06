import * as React from "react";

import { cn } from "@/lib/utils";

export interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  columns?: 1 | 2 | 3 | 4 | 6 | 12;
  gap?: "sm" | "md" | "lg";
}

const columnMap = {
  1: "grid-cols-1",
  2: "grid-cols-1 md:grid-cols-2",
  3: "grid-cols-1 md:grid-cols-3",
  4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
  6: "grid-cols-2 md:grid-cols-3 lg:grid-cols-6",
  12: "grid-cols-4 md:grid-cols-8 lg:grid-cols-12",
};

const gapMap = {
  sm: "gap-3",
  md: "gap-6",
  lg: "gap-8",
};

export function Grid({
  className,
  columns = 12,
  gap = "md",
  ...props
}: GridProps) {
  return (
    <div
      className={cn("grid", columnMap[columns], gapMap[gap], className)}
      {...props}
    />
  );
}

export interface GridItemProps extends React.HTMLAttributes<HTMLDivElement> {
  span?: 1 | 2 | 3 | 4 | 6 | 8 | 12;
}

const spanMap = {
  1: "col-span-1",
  2: "col-span-2",
  3: "col-span-3",
  4: "col-span-4",
  6: "col-span-4 md:col-span-6",
  8: "col-span-4 md:col-span-8",
  12: "col-span-4 md:col-span-8 lg:col-span-12",
};

export function GridItem({ className, span = 12, ...props }: GridItemProps) {
  return <div className={cn(spanMap[span], className)} {...props} />;
}

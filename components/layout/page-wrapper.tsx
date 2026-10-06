import * as React from "react";

import { cn } from "@/lib/utils";

export type PageWrapperProps = React.HTMLAttributes<HTMLDivElement>;

export function PageWrapper({ className, ...props }: PageWrapperProps) {
  return (
    <main
      className={cn("min-h-[calc(100vh-8rem)] flex-1", className)}
      {...props}
    />
  );
}

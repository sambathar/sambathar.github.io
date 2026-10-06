import * as React from "react";

import { cn } from "@/lib/utils";

const iconPaths = {
  system: (
    <>
      <path d="M4 7.5A3.5 3.5 0 0 1 7.5 4h9A3.5 3.5 0 0 1 20 7.5v9a3.5 3.5 0 0 1-3.5 3.5h-9A3.5 3.5 0 0 1 4 16.5z" />
      <path d="m9 9 6 6" />
      <path d="m15 9-6 6" />
    </>
  ),
} as const;

export type SvgIconName = keyof typeof iconPaths;

export interface SvgIconProps extends React.SVGAttributes<SVGElement> {
  name: SvgIconName;
  title?: string;
}

export function SvgIcon({ name, title, className, ...props }: SvgIconProps) {
  const titleId = title ? `${name}-icon-title` : undefined;

  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden={title ? undefined : true}
      aria-labelledby={titleId}
      className={cn("size-5", className)}
      {...props}
    >
      {title ? <title id={titleId}>{title}</title> : null}
      {iconPaths[name]}
    </svg>
  );
}

import * as React from "react";

import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export interface MetricCardProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: string;
  value?: string;
  helperText?: string;
}

export function MetricCard({
  className,
  label = "Placeholder label",
  value = "—",
  helperText = "Placeholder helper text",
  ...props
}: MetricCardProps) {
  return (
    <Card className={cn("overflow-hidden", className)} {...props}>
      <CardContent className="space-y-3 p-5">
        <p className="text-sm font-medium text-muted-foreground">{label}</p>
        <p className="text-3xl font-semibold tracking-tight">{value}</p>
        <p className="text-sm leading-6 text-muted-foreground">{helperText}</p>
      </CardContent>
    </Card>
  );
}

import type { ReactNode } from "react";

import { Navbar } from "@/components/layout/navbar";
import { PageWrapper } from "@/components/layout/page-wrapper";
import { CommandPaletteProvider } from "@/components/ui/command-palette";

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <CommandPaletteProvider>
      <div className="flex min-h-screen flex-col">
        <a
          href="#main-content"
          className="sr-only z-50 rounded-md bg-background px-4 py-2 text-sm font-medium text-foreground focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:outline-none focus:ring-2 focus:ring-ring"
        >
          Skip to content
        </a>
        <Navbar />
        <PageWrapper id="main-content">{children}</PageWrapper>
      </div>
    </CommandPaletteProvider>
  );
}

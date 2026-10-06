import type { ReactNode } from "react";

import { Navbar } from "@/components/layout/navbar";
import { PageWrapper } from "@/components/layout/page-wrapper";
import { CommandPaletteProvider } from "@/components/ui/command-palette";

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <CommandPaletteProvider>
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <PageWrapper>{children}</PageWrapper>
      </div>
    </CommandPaletteProvider>
  );
}

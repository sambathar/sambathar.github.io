"use client";

import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { Search } from "lucide-react";

import { cn } from "@/lib/utils";

interface CommandPaletteContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
  toggle: () => void;
}

const CommandPaletteContext = createContext<CommandPaletteContextValue | null>(
  null,
);

export function CommandPaletteProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const toggle = useCallback(() => setOpen((current) => !current), []);

  const value = useMemo(
    () => ({
      open,
      setOpen,
      toggle,
    }),
    [open, toggle],
  );

  return (
    <CommandPaletteContext.Provider value={value}>
      {children}
      <CommandPalette />
    </CommandPaletteContext.Provider>
  );
}

export function useCommandPalette() {
  const context = useContext(CommandPaletteContext);

  if (!context) {
    throw new Error(
      "useCommandPalette must be used within CommandPaletteProvider",
    );
  }

  return context;
}

export function CommandPalette() {
  const context = useContext(CommandPaletteContext);

  if (!context?.open) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 bg-background/80 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label="Command palette"
      onClick={() => context.setOpen(false)}
    >
      <div
        className={cn(
          "mx-auto mt-24 max-w-xl rounded-2xl border bg-popover shadow-elevated",
          // TODO(component-library): Replace skeleton with approved command model.
        )}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-center gap-3 border-b px-4 py-3">
          <Search className="size-4 text-muted-foreground" aria-hidden />
          <input
            className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            placeholder="Placeholder command search"
            aria-label="Command search"
            disabled
          />
        </div>
        <div className="p-4 text-sm text-muted-foreground">
          TODO: Define command palette actions and keyboard behavior.
        </div>
      </div>
    </div>
  );
}

"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import {
  type KeyboardEvent,
  type MouseEvent,
  useEffect,
  useRef,
  useState,
} from "react";

import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { ThemeSwitch } from "@/components/ui/theme-switch";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Home", href: "#home" },
  { label: "Case Studies", href: "#case-studies" },
  { label: "Journey", href: "#journey" },
  { label: "Resume", href: "#resume" },
  { label: "Contact", href: "#contact" },
] as const;

const NAVBAR_OFFSET = 80;

export function Navbar() {
  const [open, setOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) {
      return;
    }

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const focusableElements = mobileMenuRef.current?.querySelectorAll<
      HTMLAnchorElement | HTMLButtonElement
    >('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])');

    focusableElements?.[0]?.focus();

    function handleKeyDown(event: globalThis.KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        menuButtonRef.current?.focus();
        return;
      }

      if (event.key !== "Tab" || !focusableElements?.length) {
        return;
      }

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      }

      if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  function scrollToSection(href: string) {
    const sectionId = href.replace("#", "");
    const target = document.getElementById(sectionId);

    if (!target) {
      return;
    }

    const top =
      target.getBoundingClientRect().top + window.scrollY - NAVBAR_OFFSET;

    window.scrollTo({
      top: Math.max(top, 0),
      behavior: "smooth",
    });
  }

  function handleNavClick(event: MouseEvent<HTMLAnchorElement>, href: string) {
    event.preventDefault();
    scrollToSection(href);
    setOpen(false);
  }

  function handleMobileMenuKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === "Escape") {
      setOpen(false);
      menuButtonRef.current?.focus();
    }
  }

  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/70 shadow-soft backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
      <Container>
        <div className="flex h-16 items-center justify-between gap-4">
          <Link
            href="#home"
            className="motion-safe-default flex items-center gap-2 rounded-md text-sm font-semibold tracking-tight outline-none hover:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring"
            aria-label="Home"
            onClick={(event) => handleNavClick(event, "#home")}
          >
            <span
              className="size-7 rounded-lg border bg-muted"
              aria-hidden="true"
            >
              <span className="flex size-full items-center justify-center text-[0.65rem] font-semibold tracking-tight">
                SA
              </span>
            </span>
            <span>Sambath A R</span>
          </Link>

          <nav className="hidden items-center gap-1 md:flex" aria-label="Main">
            {navItems.map((item) => (
              <Button key={item.label} asChild variant="ghost" size="sm">
                <a
                  href={item.href}
                  onClick={(event) => handleNavClick(event, item.href)}
                >
                  {item.label}
                </a>
              </Button>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <ThemeSwitch />
            <Button
              ref={menuButtonRef}
              type="button"
              variant="ghost"
              size="icon"
              className="md:hidden"
              aria-label="Toggle navigation"
              aria-expanded={open}
              onClick={() => setOpen((current) => !current)}
            >
              {open ? <X className="size-4" /> : <Menu className="size-4" />}
            </Button>
          </div>
        </div>
      </Container>

      <AnimatePresence>
        {open ? (
          <motion.div
            className="fixed inset-x-0 top-16 z-40 h-[calc(100dvh-4rem)] bg-background/50 backdrop-blur-md md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            onClick={() => setOpen(false)}
          >
            <motion.div
              ref={mobileMenuRef}
              className={cn(
                "border-b border-border/70 bg-background/90 shadow-panel backdrop-blur-xl",
              )}
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation"
              initial={{ y: -12, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -12, opacity: 0 }}
              transition={{ duration: 0.2, ease: [0.2, 0, 0, 1] }}
              onClick={(event) => event.stopPropagation()}
              onKeyDown={handleMobileMenuKeyDown}
            >
              <Container className="py-3">
                <nav className="grid gap-1" aria-label="Mobile main">
                  {navItems.map((item) => (
                    <Button
                      key={item.label}
                      asChild
                      variant="ghost"
                      className="justify-start"
                    >
                      <a
                        href={item.href}
                        onClick={(event) => handleNavClick(event, item.href)}
                      >
                        {item.label}
                      </a>
                    </Button>
                  ))}
                </nav>
              </Container>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}

"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  CheckCircle2,
  CloudCog,
  Minus,
  Plus,
  ShieldCheck,
  Workflow,
} from "lucide-react";
import { IconContainer } from "@/components/ui/icon-container";
import { Tag } from "@/components/ui/tag";
import { fadeUp, stagger } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { identityPrinciples } from "./data";

const icons = {
  workflow: Workflow,
  shield: ShieldCheck,
  cloud: CloudCog,
  check: CheckCircle2,
};

export function EngineeringPrinciples() {
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(
    identityPrinciples[0].title,
  );
  const [active, setActive] = useState<string | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const [focused, setFocused] = useState<string | null>(null);
  const reduced = useReducedMotion();
  return (
    <>
      <div className="grid gap-2 md:hidden" aria-label="Engineering principles">
        {identityPrinciples.map((principle) => {
          const Icon = icons[principle.icon];
          const expanded = mobileExpanded === principle.title;
          const panelId = `principle-mobile-${principle.title.toLowerCase()}`;
          return (
            <div
              key={principle.title}
              className={cn(
                "rounded-xl border bg-card",
                expanded && "border-foreground/50",
              )}
            >
              <h3>
                <button
                  type="button"
                  className="interactive-surface flex min-h-14 w-full items-center gap-3 rounded-xl p-3 text-left font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  aria-expanded={expanded}
                  aria-controls={panelId}
                  onClick={() =>
                    setMobileExpanded(expanded ? null : principle.title)
                  }
                >
                  <IconContainer size="sm">
                    <Icon className="size-4" aria-hidden />
                  </IconContainer>
                  <span className="flex-1">{principle.title}</span>
                  {expanded ? (
                    <Minus className="size-4" aria-hidden />
                  ) : (
                    <Plus className="size-4" aria-hidden />
                  )}
                </button>
              </h3>
              <div
                id={panelId}
                hidden={!expanded}
                className="space-y-3 px-3 pb-3"
              >
                <p className="text-sm leading-6 text-muted-foreground">
                  {principle.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {principle.reveals.map((tag) => (
                    <Tag key={tag}>{tag}</Tag>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <motion.div
        className="hidden gap-4 md:grid md:grid-cols-2 xl:grid-cols-4 motion-reduce:[&>div]:!transform-none motion-reduce:[&>div]:!opacity-100"
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
      >
        {identityPrinciples.map((principle) => {
          const Icon = icons[principle.icon];
          const selected = (hovered ?? focused ?? active) === principle.title;
          return (
            <motion.div
              key={principle.title}
              variants={fadeUp}
              className="row-span-4 grid grid-rows-subgrid gap-y-0"
            >
              <button
                type="button"
                aria-expanded={selected}
                aria-controls={`principle-${principle.title.toLowerCase()}`}
                onMouseEnter={() => setHovered(principle.title)}
                onMouseLeave={() => setHovered(null)}
                onFocus={() => setFocused(principle.title)}
                onBlur={() => setFocused(null)}
                onClick={() => setActive(principle.title)}
                className={cn(
                  "interactive-surface row-span-4 grid h-full w-full grid-rows-subgrid gap-y-0 overflow-hidden rounded-xl border bg-card p-6 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring motion-safe:transition-[border-color,box-shadow,transform]",
                  selected &&
                    "border-foreground/50 shadow-soft motion-safe:-translate-y-0.5",
                )}
              >
                <IconContainer
                  className={cn(
                    "transition-colors",
                    selected && "border-foreground/50 bg-muted text-foreground",
                  )}
                >
                  <Icon className="size-4" aria-hidden />
                </IconContainer>
                <h3 className="mt-4 text-xl font-semibold tracking-tight">
                  {principle.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {principle.description}
                </p>
                <motion.div
                  id={`principle-${principle.title.toLowerCase()}`}
                  className="mt-4 flex min-h-[5.5rem] flex-wrap content-start gap-2"
                  aria-hidden={!selected}
                  initial={{ opacity: 0, y: 0 }}
                  animate={{
                    opacity: selected ? 1 : 0,
                    y: reduced || selected ? 0 : 4,
                  }}
                  transition={{ duration: reduced ? 0 : 0.18 }}
                >
                  {principle.reveals.map((tag) => (
                    <Tag key={tag}>{tag}</Tag>
                  ))}
                </motion.div>
              </button>
            </motion.div>
          );
        })}
      </motion.div>
    </>
  );
}

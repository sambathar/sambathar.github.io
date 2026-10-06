"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { CheckCircle2, CloudCog, ShieldCheck, Workflow } from "lucide-react";
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
  const [active, setActive] = useState<string | null>(null);
  const reduced = useReducedMotion();
  return (
    <motion.div
      className="grid gap-4 md:grid-cols-2 xl:grid-cols-4"
      variants={stagger}
      initial={reduced ? false : "hidden"}
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
    >
      {identityPrinciples.map((principle) => {
        const Icon = icons[principle.icon];
        const selected = active === principle.title;
        return (
          <motion.div key={principle.title} variants={fadeUp}>
            <button
              type="button"
              aria-expanded={selected}
              aria-controls={`principle-${principle.title.toLowerCase()}`}
              onMouseEnter={() => setActive(principle.title)}
              onMouseLeave={() => setActive(null)}
              onFocus={() => setActive(principle.title)}
              onBlur={() => setActive(null)}
              onClick={() => setActive(principle.title)}
              className={cn(
                "h-full w-full overflow-hidden rounded-xl border bg-card p-6 text-left transition-[border-color,box-shadow] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                selected && "border-foreground/40 shadow-panel",
              )}
            >
              <IconContainer
                className={cn(
                  "transition-colors",
                  selected && "border-foreground/40 text-foreground",
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
                initial={false}
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
  );
}

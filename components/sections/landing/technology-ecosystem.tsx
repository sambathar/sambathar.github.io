"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { GlassPanel } from "@/components/ui/glass-panel";
import { cn } from "@/lib/utils";
import { fadeUp, stagger } from "@/lib/motion";
import { technologyCategories, technologyRelationships } from "./data";

export function TechnologyEcosystem() {
  const [categoryIndex, setCategoryIndex] = useState(0);
  const [active, setActive] = useState<string | null>(null);
  const reduced = useReducedMotion();
  const category = technologyCategories[categoryIndex];
  const related = new Set(
    technologyRelationships
      .filter((pair) => pair.includes(active ?? ""))
      .flat(),
  );

  return (
    <div className="grid min-w-0 gap-6 lg:grid-cols-[0.85fr_1.15fr]">
      <div
        className="flex gap-2 overflow-x-auto pb-1 lg:grid lg:grid-cols-1"
        role="group"
        aria-label="Technology categories"
      >
        {technologyCategories.map((item, index) => (
          <button
            key={item.name}
            type="button"
            aria-pressed={index === categoryIndex}
            aria-controls="technology-map"
            onClick={() => {
              setCategoryIndex(index);
              setActive(null);
            }}
            className={cn(
              "motion-safe-default shrink-0 rounded-xl border p-4 text-left text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring",
              categoryIndex === index
                ? "border-foreground bg-card text-foreground shadow-soft"
                : "bg-background text-muted-foreground hover:border-foreground/40 hover:text-foreground",
            )}
          >
            {item.name}
          </button>
        ))}
      </div>
      <GlassPanel className="min-w-0 self-start p-5">
        <motion.div
          id="technology-map"
          key={category.name}
          aria-label={category.name}
          className="grid gap-3 sm:grid-cols-2"
          variants={stagger}
          initial={reduced ? false : "hidden"}
          animate="visible"
        >
          {category.items.map(([name, description]) => (
            <motion.div key={name} variants={fadeUp}>
              <button
                type="button"
                onMouseEnter={() => setActive(name)}
                onFocus={() => setActive(name)}
                onClick={() => setActive(name)}
                aria-pressed={active === name}
                className={cn(
                  "relative h-full w-full rounded-xl border bg-background p-4 text-left transition-[border-color,opacity,box-shadow] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  active === name
                    ? "border-foreground shadow-soft"
                    : related.has(name)
                      ? "border-foreground/40"
                      : active
                        ? "opacity-60"
                        : "hover:border-foreground/40",
                )}
              >
                <span className="mb-2 flex items-center gap-2 text-sm font-medium">
                  <span
                    className={cn(
                      "size-1.5 shrink-0 rounded-full",
                      active === name || related.has(name)
                        ? "bg-foreground"
                        : "bg-muted-foreground",
                    )}
                    aria-hidden
                  />
                  {name}
                </span>
                <span className="block text-sm leading-6 text-muted-foreground">
                  {description}
                </span>
              </button>
            </motion.div>
          ))}
        </motion.div>
      </GlassPanel>
    </div>
  );
}

"use client";

import { useId, useState } from "react";
import { motion } from "framer-motion";
import { GlassPanel } from "@/components/ui/glass-panel";
import { cn } from "@/lib/utils";
import { fadeUp, stagger } from "@/lib/motion";
import { technologyCategories, technologyRelationships } from "./data";

export function TechnologyEcosystem() {
  const [categoryIndex, setCategoryIndex] = useState(0);
  const [active, setActive] = useState<string | null>(null);
  const category = technologyCategories[categoryIndex];
  const mapId = useId();
  const related = new Set(
    technologyRelationships
      .filter((pair) => pair.includes(active ?? ""))
      .flat(),
  );

  return (
    <div className="grid w-full min-w-0 gap-3 sm:gap-6 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
      <div
        className="flex gap-2 self-start overflow-x-auto pb-1 lg:grid lg:grid-cols-1"
        role="group"
        aria-label="Technology categories"
      >
        {technologyCategories.map((item, index) => (
          <button
            key={item.name}
            type="button"
            aria-pressed={index === categoryIndex}
            aria-controls={mapId}
            onClick={() => {
              setCategoryIndex(index);
              setActive(null);
            }}
            className={cn(
              "interactive-surface motion-safe-default shrink-0 rounded-xl border p-4 text-left text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring",
              categoryIndex === index
                ? "border-foreground bg-muted/60 text-foreground shadow-soft ring-1 ring-foreground/10"
                : "bg-background text-muted-foreground hover:border-foreground/40 hover:text-foreground",
            )}
          >
            {item.name}
          </button>
        ))}
      </div>
      <GlassPanel className="surface-grid w-full min-w-0 self-start justify-self-stretch p-3 sm:p-5">
        <motion.div
          id={mapId}
          key={category.name}
          aria-label={category.name}
          role="group"
          className="grid gap-2 sm:grid-cols-2 sm:gap-3 motion-reduce:[&>div]:!transform-none motion-reduce:[&>div]:!opacity-100"
          variants={stagger}
          initial="hidden"
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
                  "interactive-surface relative h-full min-h-14 w-full rounded-xl border bg-background p-3 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring motion-safe:transition-[border-color,background-color,box-shadow] sm:min-h-0 sm:p-4",
                  active === name
                    ? "border-foreground bg-muted/60 shadow-soft ring-1 ring-foreground/10"
                    : related.has(name)
                      ? "border-foreground/50 bg-card"
                      : active
                        ? "border-border text-muted-foreground hover:border-foreground/40"
                        : "hover:border-foreground/40",
                )}
              >
                <span className="mb-1 flex items-center gap-2 text-sm font-medium sm:mb-2">
                  <span
                    className={cn(
                      "size-1.5 shrink-0 rounded-full",
                      active === name && "ambient-float",
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

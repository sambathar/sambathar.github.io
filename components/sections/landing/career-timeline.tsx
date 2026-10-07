"use client";

import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useId, useRef, useState } from "react";
import { Container } from "@/components/layout/container";
import { Badge } from "@/components/ui/badge";
import { Divider } from "@/components/ui/divider";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { Tag } from "@/components/ui/tag";
import { cn } from "@/lib/utils";
import { journey } from "./data";

// Four equal columns on desktop and four equal rows on mobile align native
// controls with fixed SVG endpoints. Both paths are present in server markup.
export const careerPaths = {
  desktop: "M 50 40 H 350",
  mobile: "M 12 50 V 350",
} as const;

export function CareerTimeline() {
  const [scrollRole, setScrollRole] = useState(journey.length - 1);
  const [selectedRole, setSelectedRole] = useState<number | null>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const focusedRole = useRef<number | null>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start 0.7", "end 0.3"],
  });
  const activeRole = selectedRole ?? scrollRole;
  const maskId = useId();
  // Feather only the emphasis layer; the underlying spine is always unbroken.
  const progressStart = useTransform(scrollYProgress, (value) =>
    value >= 1 ? 1 : Math.max(0, value - 0.035),
  );
  const progressEnd = useTransform(scrollYProgress, (value) =>
    value <= 0 ? 0 : Math.min(1, value + 0.035),
  );

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    if (reduced !== false) return;
    // Both continuous paths have three equal milestone intervals.
    const nextRole = Math.min(
      journey.length - 1,
      Math.floor(Math.max(0, progress) * (journey.length - 1) + 0.0001),
    );
    if (nextRole !== scrollRole) {
      setScrollRole(nextRole);
      // Passive scrolling must not override a focused milestone.
      if (focusedRole.current === null) setSelectedRole(null);
    }
  });

  return (
    <Section
      id="journey"
      spacing="sm"
      className="scroll-mt-24 border-t max-sm:py-8"
    >
      <Container>
        <div className="space-y-5 sm:space-y-8">
          <SectionHeading
            eyebrow="Career Journey"
            title="From software development to infrastructure, cloud operations, automation and AI."
            description="A factual timeline of role progression based on verified resume history."
          />
          <div className="grid min-w-0 gap-4">
            <div
              ref={trackRef}
              className="surface-grid relative isolate grid min-w-0 auto-rows-fr self-start rounded-xl lg:grid-cols-4"
              role="group"
              aria-label="Career milestones"
            >
              {(["desktop", "mobile"] as const).map((layout) => (
                <svg
                  key={layout}
                  viewBox={layout === "desktop" ? "0 0 400 80" : "0 0 24 400"}
                  preserveAspectRatio="none"
                  className={cn(
                    "pointer-events-none absolute left-0 top-0 z-10 h-full overflow-visible",
                    layout === "desktop"
                      ? "hidden w-full lg:block lg:h-12"
                      : "w-6 lg:hidden",
                  )}
                  aria-hidden="true"
                  focusable="false"
                >
                  <defs>
                    <linearGradient
                      id={`${maskId}-${layout}-fade`}
                      gradientUnits="userSpaceOnUse"
                      x1={layout === "desktop" ? 50 : 12}
                      y1={layout === "desktop" ? 40 : 50}
                      x2={layout === "desktop" ? 350 : 12}
                      y2={layout === "desktop" ? 40 : 350}
                    >
                      <stop offset="0" stopColor="white" />
                      <motion.stop
                        offset={
                          selectedRole === null
                            ? progressStart
                            : selectedRole === journey.length - 1
                              ? 1
                              : Math.max(
                                  0,
                                  selectedRole / (journey.length - 1) - 0.035,
                                )
                        }
                        stopColor="white"
                      />
                      <motion.stop
                        offset={
                          selectedRole === null
                            ? progressEnd
                            : selectedRole === 0
                              ? 0
                              : Math.min(
                                  1,
                                  selectedRole / (journey.length - 1) + 0.035,
                                )
                        }
                        stopColor="white"
                        stopOpacity="0"
                      />
                      <stop offset="1" stopColor="white" stopOpacity="0" />
                    </linearGradient>
                    <mask
                      id={`${maskId}-${layout}-progress`}
                      maskUnits="userSpaceOnUse"
                      x="0"
                      y="0"
                      width={layout === "desktop" ? 400 : 24}
                      height={layout === "desktop" ? 80 : 400}
                    >
                      <rect
                        width={layout === "desktop" ? 400 : 24}
                        height={layout === "desktop" ? 80 : 400}
                        fill={`url(#${maskId}-${layout}-fade)`}
                      />
                    </mask>
                  </defs>
                  <path
                    d={careerPaths[layout]}
                    fill="none"
                    strokeWidth="1.5"
                    vectorEffect="non-scaling-stroke"
                    strokeLinecap="round"
                    className="stroke-muted-foreground/40"
                  />
                  <motion.path
                    d={careerPaths[layout]}
                    fill="none"
                    strokeWidth="1.5"
                    vectorEffect="non-scaling-stroke"
                    strokeLinecap="round"
                    className="stroke-foreground/75 motion-reduce:[mask:none]"
                    mask={`url(#${maskId}-${layout}-progress)`}
                  />
                </svg>
              ))}
              {journey.map((role, index) => (
                <div
                  key={`${role.company}-${role.years}`}
                  className="relative min-w-0 py-1.5 lg:flex lg:flex-col lg:px-1.5 lg:pb-0 lg:pt-12"
                >
                  <span
                    aria-hidden="true"
                    // Mobile: node center (12px) to card edge (24px).
                    // Desktop: node center (24px high) to card edge (48px).
                    className={cn(
                      "pointer-events-none absolute left-3 top-1/2 z-20 h-px w-3 -translate-y-1/2 lg:left-1/2 lg:top-6 lg:h-6 lg:w-px lg:-translate-x-1/2 lg:translate-y-0",
                      index <= activeRole
                        ? "bg-foreground/60"
                        : "bg-muted-foreground/40",
                    )}
                  />
                  <span
                    aria-hidden="true"
                    className={cn(
                      "pointer-events-none absolute left-3 top-1/2 z-40 size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full border bg-background motion-safe:transition-[border-color,background-color,box-shadow] lg:left-1/2 lg:top-6",
                      index === journey.length - 1 &&
                        "size-3 border-foreground ring-4 ring-foreground/10",
                      index <= activeRole && "border-foreground bg-foreground",
                      index === activeRole &&
                        "size-3 ring-4 ring-foreground/10",
                      index === activeRole &&
                        index === journey.length - 1 &&
                        "ring-foreground/20",
                    )}
                  />
                  <button
                    type="button"
                    className={cn(
                      "motion-safe-default relative z-30 ml-6 block min-h-14 w-[calc(100%-1.5rem)] rounded-xl border p-3 text-left outline-none focus-visible:ring-2 focus-visible:ring-ring lg:ml-0 lg:w-full lg:flex-1 lg:p-4",
                      activeRole === index
                        ? "border-foreground bg-card text-foreground shadow-soft"
                        : "border-border bg-background text-muted-foreground hover:border-foreground/40 hover:text-foreground",
                      index === journey.length - 1 &&
                        activeRole !== index &&
                        "border-foreground/50",
                      activeRole === index &&
                        index === journey.length - 1 &&
                        "bg-muted/30 ring-1 ring-foreground/10",
                    )}
                    aria-pressed={activeRole === index}
                    aria-controls="career-role-detail"
                    onFocus={(event) => {
                      // Keyboard focus stays authoritative; a tap/click may
                      // hand control back to scroll at the next milestone.
                      focusedRole.current = event.currentTarget.matches(
                        ":focus-visible",
                      )
                        ? index
                        : null;
                      setSelectedRole(index);
                    }}
                    onBlur={() => {
                      focusedRole.current = null;
                    }}
                    onClick={() => setSelectedRole(index)}
                  >
                    <span className="mb-1 block text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground lg:mb-2">
                      {role.years}
                      {index === journey.length - 1 && (
                        <span className="ml-2 normal-case tracking-normal text-foreground">
                          Current role
                        </span>
                      )}
                    </span>
                    <span
                      className={cn(
                        "block font-medium",
                        index === journey.length - 1 && "font-semibold",
                      )}
                    >
                      {role.role}
                    </span>
                    <span className="mt-1 block text-sm text-muted-foreground">
                      {role.company}
                    </span>
                  </button>
                </div>
              ))}
            </div>
            <div
              id="career-role-detail"
              className="grid min-w-0 rounded-xl border bg-card p-3 lg:p-5"
              aria-live="polite"
              aria-atomic="true"
            >
              {journey.map((role, index) => (
                <motion.div
                  key={role.role}
                  aria-hidden={activeRole !== index}
                  inert={activeRole !== index}
                  className={cn(
                    "min-w-0 space-y-3 [grid-area:1/1] lg:space-y-5",
                    activeRole !== index && "pointer-events-none invisible",
                  )}
                  // Initial markup is independent of the client media preference.
                  initial={{ opacity: activeRole === index ? 1 : 0, y: 0 }}
                  animate={{
                    opacity: activeRole === index ? 1 : 0,
                    y: activeRole === index || reduced ? 0 : 4,
                  }}
                  transition={{ duration: reduced ? 0 : 0.18 }}
                >
                  <Badge variant="outline">{role.progression}</Badge>
                  <div>
                    <h3 className="text-2xl font-semibold tracking-tight">
                      {role.role}
                    </h3>
                    <p className="mt-2 text-muted-foreground">
                      {role.company} · {role.years}
                    </p>
                  </div>
                  <p className="text-sm leading-6 text-muted-foreground">
                    {role.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {role.technologies.map((technology) => (
                      <Tag key={technology}>{technology}</Tag>
                    ))}
                  </div>
                  <Divider />
                  <p className="text-sm text-muted-foreground">
                    {journey
                      .slice(0, index + 1)
                      .map((entry) => entry.progression)
                      .join(" → ")}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}

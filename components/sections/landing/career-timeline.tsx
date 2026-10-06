"use client";
import { motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/layout/container";
import { GlassPanel } from "@/components/ui/glass-panel";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { fadeUp, stagger } from "@/lib/motion";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Divider } from "@/components/ui/divider";
import { Tag } from "@/components/ui/tag";
import { cn } from "@/lib/utils";
import { journey } from "./data";

export function CareerTimeline() {
  const [activeRole, setActiveRole] = useState(journey.length - 1);
  const reduced = useReducedMotion();

  return (
    <Section id="journey" spacing="sm" className="scroll-mt-24 border-t">
      <Container>
        <div className="space-y-8">
          <SectionHeading
            eyebrow="Career Journey"
            title="From software development to infrastructure, cloud operations, automation and AI."
            description="A factual timeline of role progression based on verified resume history."
          />

          <div className="grid gap-4 lg:grid-cols-[0.8fr_1.2fr]">
            <div className="relative grid gap-3 pl-6">
              <div
                className="absolute bottom-4 left-2 top-4 w-px bg-border"
                aria-hidden
              />
              {journey.map((role, index) => (
                <button
                  key={`${role.company}-${role.years}`}
                  type="button"
                  className={cn(
                    "motion-safe-default relative rounded-xl border p-4 text-left outline-none focus-visible:ring-2 focus-visible:ring-ring",
                    activeRole === index
                      ? "border-foreground bg-card shadow-soft"
                      : "bg-background text-muted-foreground hover:border-foreground/40 hover:text-foreground",
                  )}
                  aria-pressed={activeRole === index}
                  aria-controls="career-role-detail"
                  onClick={() => setActiveRole(index)}
                >
                  {index < journey.length - 1 && (
                    <motion.span
                      aria-hidden
                      className="absolute -left-4 top-[25px] h-[calc(100%+0.75rem)] w-px bg-foreground/60"
                      initial={false}
                      animate={{ opacity: index < activeRole ? 1 : 0 }}
                      transition={{ duration: reduced ? 0 : 0.24 }}
                    />
                  )}
                  <span
                    aria-hidden
                    className={cn(
                      "absolute -left-[1.3rem] top-5 size-2.5 rounded-full border bg-background transition-colors",
                      index <= activeRole && "border-foreground bg-foreground",
                      index === activeRole && "ring-4 ring-foreground/10",
                    )}
                  />
                  <span className="mb-2 block text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
                    {role.years}
                  </span>
                  <span className="block font-medium">{role.role}</span>
                  <span className="mt-1 block text-sm text-muted-foreground">
                    {role.company}
                  </span>
                </button>
              ))}
            </div>

            <GlassPanel className="p-5">
              <motion.div
                id="career-role-detail"
                key={journey[activeRole].role}
                className="space-y-5"
                initial={reduced ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Badge variant="outline">
                  {journey[activeRole].progression}
                </Badge>
                <div>
                  <h3 className="text-2xl font-semibold tracking-tight">
                    {journey[activeRole].role}
                  </h3>
                  <p className="mt-2 text-muted-foreground">
                    {journey[activeRole].company} · {journey[activeRole].years}
                  </p>
                </div>
                <p className="text-sm leading-6 text-muted-foreground">
                  {journey[activeRole].description}
                </p>
                <motion.div
                  className="flex flex-wrap gap-2"
                  variants={stagger}
                  initial={reduced ? false : "hidden"}
                  animate="visible"
                >
                  {journey[activeRole].technologies.map((technology) => (
                    <motion.span key={technology} variants={fadeUp}>
                      <Tag>{technology}</Tag>
                    </motion.span>
                  ))}
                </motion.div>
                <Divider />
                <p className="text-sm text-muted-foreground">
                  Software Development → System Administration → Microsoft 365 /
                  Cloud → Infrastructure + Automation + AI
                </p>
              </motion.div>
            </GlassPanel>
          </div>
        </div>
      </Container>
    </Section>
  );
}

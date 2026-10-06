"use client";
import { motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/layout/container";
import { GlassPanel } from "@/components/ui/glass-panel";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { fadeUp, stagger } from "@/lib/motion";
import { useState, type ReactNode } from "react";
import { ChevronDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tag } from "@/components/ui/tag";
import { cn } from "@/lib/utils";
import { caseStudies } from "./data";

export function CaseStudyExplorer() {
  const [activeCase, setActiveCase] = useState(0);
  const reduced = useReducedMotion();

  return (
    <Section id="case-studies" spacing="sm" className="scroll-mt-24 border-t">
      <Container>
        <div className="space-y-8">
          <SectionHeading
            eyebrow="Case Studies"
            title="Operational engineering stories with verified outcomes."
            description="Concise examples of modernization, automation, cost optimization and AI-enabled IT operations."
          />

          <div className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="grid gap-3" role="group" aria-label="Case studies">
              {caseStudies.map((caseStudy, index) => (
                <button
                  key={caseStudy.title}
                  type="button"
                  className={cn(
                    "motion-safe-default rounded-xl border p-4 text-left outline-none focus-visible:ring-2 focus-visible:ring-ring",
                    activeCase === index
                      ? "border-foreground bg-card shadow-soft"
                      : "bg-background text-muted-foreground hover:border-foreground/40 hover:text-foreground",
                  )}
                  aria-pressed={activeCase === index}
                  aria-controls="case-study-detail"
                  onClick={() => setActiveCase(index)}
                >
                  <span className="mb-2 block text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
                    Case Study {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="flex items-center justify-between gap-3 font-medium">
                    {caseStudy.title}
                    <ChevronDown
                      className={cn(
                        "size-4 transition-transform",
                        activeCase === index && "rotate-180",
                      )}
                      aria-hidden
                    />
                  </span>
                  <span className="mt-3 block text-sm leading-6 md:hidden">
                    {caseStudy.outcome}
                  </span>
                </button>
              ))}
            </div>

            <GlassPanel className="p-5">
              <motion.article
                id="case-study-detail"
                key={caseStudies[activeCase].title}
                className="space-y-6"
                initial={reduced ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
              >
                <div>
                  <Badge variant="outline">Active case study</Badge>
                  <h3 className="mt-4 text-2xl font-semibold tracking-tight">
                    {caseStudies[activeCase].title}
                  </h3>
                </div>
                <CaseStudyDetail label="Problem / Context">
                  {caseStudies[activeCase].context}
                </CaseStudyDetail>
                <CaseStudyDetail label="Approach">
                  {caseStudies[activeCase].approach}
                </CaseStudyDetail>
                <CaseStudyDetail label="Technology">
                  <motion.div
                    className="flex flex-wrap gap-2"
                    variants={stagger}
                    initial={reduced ? false : "hidden"}
                    animate="visible"
                  >
                    {caseStudies[activeCase].technology.map((technology) => (
                      <motion.span key={technology} variants={fadeUp}>
                        <Tag>{technology}</Tag>
                      </motion.span>
                    ))}
                    {"channels" in caseStudies[activeCase]
                      ? caseStudies[activeCase].channels.map((channel) => (
                          <Tag key={channel}>{channel}</Tag>
                        ))
                      : null}
                  </motion.div>
                </CaseStudyDetail>
                <CaseStudyDetail label="Outcome">
                  {caseStudies[activeCase].outcome}
                </CaseStudyDetail>
              </motion.article>
            </GlassPanel>
          </div>
        </div>
      </Container>
    </Section>
  );
}

function CaseStudyDetail({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div
      className={cn(
        "space-y-2",
        label === "Outcome" &&
          "rounded-xl border border-foreground/30 bg-muted/30 p-4",
      )}
    >
      <h4 className="text-sm font-medium text-muted-foreground">{label}</h4>
      <div className="text-sm leading-6">{children}</div>
    </div>
  );
}

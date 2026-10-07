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
    <Section
      id="case-studies"
      reveal
      spacing="sm"
      className="scroll-mt-24 border-t max-sm:py-8"
    >
      <Container>
        <div className="space-y-5 sm:space-y-8">
          <SectionHeading
            eyebrow="Case Studies"
            title="Operational case studies with measurable outcomes."
            description="Concise examples of modernization, automation, cost optimization and AI-enabled IT operations."
          />

          <div className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
            <div
              className="grid gap-3 self-start"
              role="group"
              aria-label="Case studies"
            >
              {caseStudies.map((caseStudy, index) => (
                <div key={caseStudy.title} className="lg:contents">
                  <button
                    type="button"
                    className={cn(
                      "interactive-surface motion-safe-default w-full rounded-xl border p-3 text-left outline-none focus-visible:ring-2 focus-visible:ring-ring lg:p-4",
                      activeCase === index
                        ? "border-foreground bg-card shadow-soft"
                        : "bg-background text-muted-foreground hover:border-foreground/40 hover:text-foreground",
                    )}
                    aria-pressed={activeCase === index}
                    aria-controls={`case-study-detail case-study-mobile-${index}`}
                    aria-expanded={activeCase === index}
                    onClick={() => setActiveCase(index)}
                  >
                    <span className="mb-1 block text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground lg:mb-2">
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
                  </button>
                  <div
                    id={`case-study-mobile-${index}`}
                    hidden={activeCase !== index}
                    className="mt-2 rounded-xl border bg-card p-3 lg:hidden"
                  >
                    {activeCase === index && (
                      <div className="space-y-4">
                        <CaseStudyBody caseStudy={caseStudy} active />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <GlassPanel
              id="case-study-detail"
              className="hidden p-5 lg:grid"
              aria-live="polite"
            >
              {caseStudies.map((caseStudy, index) => (
                <motion.article
                  key={caseStudy.title}
                  aria-hidden={activeCase !== index}
                  inert={activeCase !== index}
                  className={cn(
                    "space-y-6 [grid-area:1/1]",
                    activeCase !== index && "pointer-events-none invisible",
                  )}
                  initial={{ opacity: activeCase === index ? 1 : 0, y: 0 }}
                  animate={{
                    opacity: activeCase === index ? 1 : 0,
                    y: activeCase === index || reduced ? 0 : 4,
                  }}
                  transition={{ duration: reduced ? 0 : 0.18 }}
                >
                  <div>
                    <Badge variant="outline">Active case study</Badge>
                    <h3 className="mt-4 text-2xl font-semibold tracking-tight">
                      {caseStudy.title}
                    </h3>
                  </div>
                  <CaseStudyBody
                    caseStudy={caseStudy}
                    active={activeCase === index}
                  />
                </motion.article>
              ))}
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
          "rounded-xl border border-foreground/30 bg-muted/30 p-3 lg:p-4",
      )}
    >
      <h4 className="text-sm font-medium text-muted-foreground">{label}</h4>
      <div className="text-sm leading-6">{children}</div>
    </div>
  );
}

function CaseStudyBody({
  caseStudy,
  active,
}: {
  caseStudy: (typeof caseStudies)[number];
  active: boolean;
}) {
  return (
    <>
      <CaseStudyDetail label="Problem / Context">
        {caseStudy.context}
      </CaseStudyDetail>
      <CaseStudyDetail label="Approach">{caseStudy.approach}</CaseStudyDetail>
      <CaseStudyDetail label="Technology">
        <motion.div
          className="flex flex-wrap gap-2"
          variants={stagger}
          initial={false}
          animate={active ? "visible" : "hidden"}
        >
          {caseStudy.technology.map((technology) => (
            <motion.span key={technology} variants={fadeUp}>
              <Tag>{technology}</Tag>
            </motion.span>
          ))}
          {"channels" in caseStudy
            ? caseStudy.channels.map((channel) => (
                <Tag key={channel}>{channel}</Tag>
              ))
            : null}
        </motion.div>
      </CaseStudyDetail>
      <CaseStudyDetail label="Outcome">{caseStudy.outcome}</CaseStudyDetail>
    </>
  );
}

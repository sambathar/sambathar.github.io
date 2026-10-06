"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { MetricCard } from "@/components/ui/metric-card";
import { fadeUp, stagger } from "@/lib/motion";
import { measuredImpact } from "./data";

export function ImpactMetrics() {
  return (
    <Section id="impact" spacing="sm" className="scroll-mt-24 border-t">
      <Container>
        <div className="space-y-8">
          <SectionHeading
            eyebrow="Measured Impact"
            title="Verified operational outcomes."
            description="Numbers are limited to resume-verified outcomes and operational scope."
          />
          <motion.div
            className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            {measuredImpact.map((metric) => (
              <motion.div key={metric.label} variants={fadeUp}>
                <MetricCard
                  value={
                    <CountUpMetric
                      numericValue={metric.numericValue}
                      prefix={"prefix" in metric ? metric.prefix : undefined}
                      suffix={"suffix" in metric ? metric.suffix : undefined}
                      value={metric.value}
                    />
                  }
                  label={metric.label}
                  helperText={metric.context}
                  tabIndex={0}
                  role="group"
                  aria-label={`${metric.value} ${metric.label}: ${metric.context}`}
                  className="h-full transition-[border-color,box-shadow] hover:border-foreground/40 hover:shadow-soft focus-visible:border-foreground/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </Container>
    </Section>
  );
}

function CountUpMetric({
  value,
  numericValue,
  prefix = "",
  suffix,
}: {
  value: string;
  numericValue: number;
  prefix?: string;
  suffix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const reduced = useReducedMotion();
  const [display, setDisplay] = useState(value);
  useEffect(() => {
    if (!inView || reduced !== false) return;
    let frame = 0;
    let start: number | undefined;
    const baseline = prefix ? 100 : 0;
    function tick(time: number) {
      start ??= time;
      const progress = Math.min((time - start) / 850, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = baseline + (numericValue - baseline) * eased;
      const number = Number.isInteger(numericValue)
        ? Math.round(current)
        : current.toFixed(1);
      setDisplay(
        progress === 1
          ? value
          : `${prefix}${number}${suffix ?? (value.includes("%") ? "%" : "")}`,
      );
      if (progress < 1) frame = requestAnimationFrame(tick);
    }
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, reduced, numericValue, prefix, suffix, value]);
  return (
    <span ref={ref}>
      <span className="sr-only">{value}</span>
      <span aria-hidden="true">{display}</span>
    </span>
  );
}

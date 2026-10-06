"use client";

import { motion } from "framer-motion";
import { ArrowDownToLine, ArrowRight, Github, Linkedin } from "lucide-react";

import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { GlassPanel } from "@/components/ui/glass-panel";
import { IconContainer } from "@/components/ui/icon-container";
import { MetricCard } from "@/components/ui/metric-card";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { SvgIcon } from "@/components/icons";
import { fadeUp, stagger } from "@/lib/motion";

const identityCards = [
  {
    title: "Placeholder identity card",
    description: "TODO: Define verified engineering identity point.",
  },
  {
    title: "Placeholder identity card",
    description: "TODO: Define verified engineering identity point.",
  },
  {
    title: "Placeholder identity card",
    description: "TODO: Define verified engineering identity point.",
  },
] as const;

// TODO(content): Replace placeholder metric values with verified metrics only.
const metricCards = [
  {
    label: "Placeholder metric",
    value: "TODO",
    helperText: "TODO: Replace with verified metric context.",
  },
  {
    label: "Placeholder metric",
    value: "TODO",
    helperText: "TODO: Replace with verified metric context.",
  },
  {
    label: "Placeholder metric",
    value: "TODO",
    helperText: "TODO: Replace with verified metric context.",
  },
  {
    label: "Placeholder metric",
    value: "TODO",
    helperText: "TODO: Replace with verified metric context.",
  },
] as const;

export function LandingExperience() {
  return (
    <>
      <HeroSection />
      <IdentitySection />
      <MetricsSection />
    </>
  );
}

function HeroSection() {
  return (
    <Section id="home" className="scroll-mt-24 overflow-hidden">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <div className="space-y-8">
            <div className="space-y-5">
              <p className="text-sm font-medium text-muted-foreground">
                Sambath A R
              </p>
              <h1 className="text-balance text-4xl font-semibold tracking-tight md:text-6xl">
                Building secure Microsoft cloud environments through automation,
                identity, and modern workplace engineering.
              </h1>
              <div className="space-y-1 text-lg text-muted-foreground">
                <p>Senior IT Administrator</p>
                <p>Cloud Infrastructure Engineer</p>
              </div>
              <p className="max-w-2xl text-base leading-7 text-muted-foreground">
                I help organizations modernize Microsoft 365 environments
                through identity management, endpoint security, automation, and
                cloud infrastructure engineering.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button size="lg" asChild>
                  <a href="#projects">
                    View Engineering Stories
                    <ArrowRight className="ml-2 size-4" aria-hidden />
                  </a>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <a href="#resume">
                    Download Resume
                    <ArrowDownToLine className="ml-2 size-4" aria-hidden />
                  </a>
                </Button>
              </div>

              <div
                className="flex items-center gap-2"
                aria-label="Social links"
              >
                <Button size="icon" variant="ghost" asChild>
                  <a
                    href="https://github.com/sambathar"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Open GitHub profile"
                  >
                    <Github className="size-4" aria-hidden />
                  </a>
                </Button>
                <Button size="icon" variant="ghost" asChild>
                  <a
                    href="https://www.linkedin.com/in/sambathar"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Open LinkedIn profile"
                  >
                    <Linkedin className="size-4" aria-hidden />
                  </a>
                </Button>
              </div>
            </div>
          </div>

          <GlassPanel className="relative min-h-[22rem] overflow-hidden p-6 md:min-h-[30rem]">
            <AbstractInfrastructureIllustration />
          </GlassPanel>
        </div>
        <TechnologyRibbon />
      </Container>
    </Section>
  );
}

function IdentitySection() {
  return (
    <Section id="journey" spacing="sm" className="scroll-mt-24 border-t">
      <Container>
        <div id="projects" className="scroll-mt-24" aria-hidden="true" />
        <div className="space-y-8">
          <SectionHeading title="Engineering Identity" />
          <div className="grid gap-4 md:grid-cols-3">
            {identityCards.map((card, index) => (
              <Card key={index}>
                <CardHeader>
                  <IconContainer>
                    <SvgIcon name="placeholder" className="size-4" />
                  </IconContainer>
                  <CardTitle>{card.title}</CardTitle>
                  <CardDescription>{card.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}

function MetricsSection() {
  return (
    <Section id="resume" spacing="sm" className="scroll-mt-24 border-t">
      <Container>
        <div id="contact" className="scroll-mt-24" aria-hidden="true" />
        <motion.div
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {metricCards.map((metric, index) => (
            <motion.div key={index} variants={fadeUp}>
              <MetricCard
                label={metric.label}
                value={metric.value}
                helperText={metric.helperText}
              />
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </Section>
  );
}

function TechnologyRibbon() {
  const technologies = [
    "Microsoft 365",
    "Exchange Online",
    "SharePoint Online",
    "Teams",
    "Entra ID",
    "Microsoft Intune",
    "PowerShell",
    "Microsoft Graph",
    "Azure",
    "AWS",
    "Automation",
    "AI Integration",
  ] as const;

  return (
    <div className="mt-10 overflow-x-auto border-y py-4">
      <ul
        className="flex min-w-max items-center gap-3 text-sm text-muted-foreground"
        aria-label="Technology focus areas"
      >
        {technologies.map((technology) => (
          <li
            key={technology}
            className="rounded-full border bg-background px-3 py-1"
          >
            {technology}
          </li>
        ))}
      </ul>
    </div>
  );
}

function AbstractInfrastructureIllustration() {
  const nodes = [
    { x: 244, y: 24, width: 32, height: 32, rx: 16 },
    { x: 224, y: 78, width: 72, height: 40, rx: 14 },
    { x: 226, y: 146, width: 68, height: 36, rx: 12 },
    { x: 226, y: 210, width: 68, height: 36, rx: 12 },
    { x: 226, y: 274, width: 68, height: 36, rx: 12 },
    { x: 226, y: 338, width: 68, height: 36, rx: 12 },
  ] as const;

  return (
    <div
      className="absolute inset-0 flex items-center justify-center p-6"
      aria-label="Abstract Microsoft cloud architecture illustration"
      role="img"
    >
      <div className="surface-grid absolute inset-0 opacity-40" aria-hidden />
      <svg
        viewBox="0 0 520 420"
        className="relative z-10 h-full w-full max-w-[32rem]"
        fill="none"
        aria-hidden="true"
      >
        <rect
          x="86"
          y="52"
          width="348"
          height="316"
          rx="24"
          className="fill-background/70 stroke-border"
          strokeWidth="2"
        />
        <path d="M260 56v308" className="stroke-border" strokeWidth="1" />
        <motion.path
          d="M260 56v308"
          className="stroke-foreground/40"
          strokeLinecap="round"
          strokeWidth="2"
          strokeDasharray="18 18"
          initial={{ strokeDashoffset: 72 }}
          animate={{ strokeDashoffset: 0 }}
          transition={{
            duration: 2.4,
            ease: "linear",
            repeat: Infinity,
          }}
        />
        {nodes.map((node, index) => (
          <g key={index}>
            <rect
              x={node.x}
              y={node.y}
              width={node.width}
              height={node.height}
              rx={node.rx}
              className="fill-card stroke-border"
              strokeWidth="2"
            />
            <path
              d={`M${node.x + 18} ${node.y + node.height / 2}h${
                node.width - 36
              }`}
              className="stroke-muted-foreground"
              strokeLinecap="round"
              strokeWidth="2"
            />
          </g>
        ))}
        <path
          d="M160 96h64M296 96h64M160 164h66M294 164h66M160 228h66M294 228h66M160 292h66M294 292h66"
          className="stroke-border"
          strokeLinecap="round"
          strokeWidth="2"
        />
        <circle cx="160" cy="96" r="8" className="fill-card stroke-border" />
        <circle cx="360" cy="96" r="8" className="fill-card stroke-border" />
        <circle cx="160" cy="164" r="8" className="fill-card stroke-border" />
        <circle cx="360" cy="164" r="8" className="fill-card stroke-border" />
        <circle cx="160" cy="228" r="8" className="fill-card stroke-border" />
        <circle cx="360" cy="228" r="8" className="fill-card stroke-border" />
        <circle cx="160" cy="292" r="8" className="fill-card stroke-border" />
        <circle cx="360" cy="292" r="8" className="fill-card stroke-border" />
      </svg>
    </div>
  );
}

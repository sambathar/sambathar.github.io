"use client";

import { useEffect, useMemo, useState, type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowDownToLine,
  ArrowRight,
  Bot,
  BrainCircuit,
  CheckCircle2,
  ChevronDown,
  CloudCog,
  Github,
  Linkedin,
  Mail,
  Network,
  ShieldCheck,
  Sparkles,
  Workflow,
} from "lucide-react";

import { Container } from "@/components/layout/container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Divider } from "@/components/ui/divider";
import { GlassPanel } from "@/components/ui/glass-panel";
import { IconContainer } from "@/components/ui/icon-container";
import { MetricCard } from "@/components/ui/metric-card";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { Tag } from "@/components/ui/tag";
import { fadeUp, stagger } from "@/lib/motion";
import { cn } from "@/lib/utils";

const resumeHref = "/resume/Sambath-A-R-IT-Cloud-Infrastructure.pdf";

const socialLinks = [
  {
    label: "GitHub",
    href: "https://github.com/sambathar",
    icon: Github,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/sambathar",
    icon: Linkedin,
  },
] as const;

const technologyCategories = [
  {
    name: "Microsoft Cloud",
    items: [
      "Microsoft 365",
      "Azure",
      "Entra ID",
      "Exchange Online",
      "SharePoint",
      "Teams",
    ],
  },
  {
    name: "Modern Workplace",
    items: ["Microsoft Intune", "ManageEngine", "Addigy"],
  },
  {
    name: "Security & Compliance",
    items: [
      "Microsoft Purview",
      "Microsoft Defender",
      "MFA",
      "DLP",
      "GDPR",
      "DSAR",
    ],
  },
  {
    name: "Automation",
    items: [
      "PowerShell",
      "Microsoft Graph API",
      "Power Automate",
      "Power Apps",
      "Power BI",
      "Python",
      "Bash",
    ],
  },
  {
    name: "Cloud Infrastructure",
    items: [
      "Azure VMs",
      "Azure Storage",
      "AWS EC2",
      "AWS S3",
      "IAM",
      "Google Cloud",
    ],
  },
  {
    name: "AI",
    items: ["OpenAI APIs", "Claude APIs", "Gemini APIs", "AI agents"],
  },
] as const;

const identityPrinciples = [
  {
    title: "AUTOMATE",
    description:
      "Use PowerShell, Microsoft Graph and Power Platform to reduce repetitive operational work.",
    icon: Workflow,
  },
  {
    title: "SECURE",
    description:
      "Build identity, MFA, DLP, Purview and endpoint controls into day-to-day operations.",
    icon: ShieldCheck,
  },
  {
    title: "SIMPLIFY",
    description:
      "Reduce operational complexity through standardization, migration, SaaS administration and workflow design.",
    icon: CloudCog,
  },
  {
    title: "MEASURE",
    description:
      "Track operational outcomes through compliance, efficiency, availability, cost and effort reduction.",
    icon: CheckCircle2,
  },
] as const;

const caseStudies = [
  {
    title: "Endpoint & MDM Modernization",
    context: "Global MDM migration across 100-150 macOS/Windows endpoints.",
    approach:
      "Coordinated endpoint migration, compliance validation, and policy alignment across global users.",
    technology: ["ManageEngine", "Microsoft Intune"],
    outcome: "100% endpoint compliance",
  },
  {
    title: "Microsoft 365 Cost Optimization",
    context:
      "Audited E3 license utilization, right-sized licenses based on user activity, and converted inactive accounts to shared mailboxes.",
    approach:
      "Reviewed usage patterns, reduced inactive licensing, and aligned cloud spend with actual operational need.",
    technology: ["Microsoft 365", "License audits", "Shared mailboxes"],
    outcome: "40% reduction in Microsoft 365 licensing and cloud costs",
  },
  {
    title: "Identity & User Lifecycle Automation",
    context: "Automated multi-tenant user lifecycle management.",
    approach:
      "Used scripted workflows to standardize user provisioning, updates, and operational lifecycle tasks.",
    technology: ["PowerShell", "Microsoft Graph API"],
    outcome: "40% reduction in manual effort",
  },
  {
    title: "AI-Driven IT Automation",
    context: "Engineered a modular AI automation platform.",
    approach:
      "Connected task-specific AI agents to support operations and internal workflow channels.",
    technology: ["OpenAI APIs", "Claude APIs", "Gemini APIs"],
    channels: ["WhatsApp", "Microsoft Teams", "Telegram"],
    outcome:
      "Task-specific AI agents automate IT support operations and internal workflows",
  },
] as const;

const measuredImpact = [
  { value: "100%", numericValue: 100, label: "Endpoint compliance" },
  { value: "40%", numericValue: 40, label: "Manual effort reduction" },
  { value: "40%", numericValue: 40, label: "M365 / cloud cost reduction" },
  { value: "4", numericValue: 4, label: "M365 tenants managed" },
  { value: "100+", numericValue: 100, suffix: "+", label: "Users supported" },
  {
    value: "100-150",
    numericValue: 150,
    prefix: "100-",
    label: "Endpoints migrated",
  },
  {
    value: "10+",
    numericValue: 10,
    suffix: "+",
    label: "Azure VMs / Storage Accounts managed",
  },
  { value: "99.9%", numericValue: 99.9, label: "System availability" },
] as const;

const journey = [
  {
    years: "2014-2017",
    role: ".NET Web Developer",
    company: "Lavender Technologies & Solutions",
    description:
      "Developed application features using ASP.NET Web API while working with Scrum, TDD and Pair Programming.",
    progression: "Software Development",
  },
  {
    years: "2018-2022",
    role: "System Administrator",
    company: "SVM Tech Private Ltd",
    description:
      "Led infrastructure upgrades, VMware virtualization, Azure administration, availability operations, and Office 365 migration work.",
    progression: "System Administration",
  },
  {
    years: "2022-2025",
    role: "IT Systems Administrator",
    company: "Onference Training Technologies LLP",
    description:
      "Administered Microsoft 365, Google Workspace and Microsoft Purview while improving compliance, workflows and document management.",
    progression: "Microsoft 365 / Cloud",
  },
  {
    years: "2025-Present",
    role: "Senior Associate - IT Administration",
    company: "Lucey Group",
    description:
      "Manages Microsoft 365 tenants, endpoint modernization, Azure resources, automation, Purview, Copilot governance and AI-enabled IT workflows.",
    progression: "Infrastructure + Automation + AI",
  },
] as const;

const aiNodes = [
  {
    id: "channels",
    title: "WhatsApp / Teams / Telegram",
    description:
      "Supported channels for IT support and internal workflow entry points.",
  },
  {
    id: "router",
    title: "AI Automation Router",
    description:
      "Routes requests toward the right model or task-specific workflow.",
  },
  {
    id: "models",
    title: "OpenAI / Claude / Gemini",
    description: "Model APIs used within the modular AI automation platform.",
  },
  {
    id: "agents",
    title: "Task-Specific Agents",
    description:
      "Focused agents support defined IT support and workflow tasks.",
  },
  {
    id: "workflows",
    title: "IT Support / Internal Workflows",
    description:
      "Operational outputs remain scoped to support and internal workflow automation.",
  },
] as const;

const heroNodes = [
  { id: "m365", label: "Microsoft 365", x: 258, y: 52 },
  { id: "azure", label: "Azure", x: 258, y: 112 },
  { id: "identity", label: "Entra ID", x: 172, y: 184 },
  { id: "intune", label: "Intune", x: 344, y: 184 },
  { id: "security", label: "Security", x: 172, y: 268 },
  { id: "automation", label: "Automation", x: 344, y: 268 },
  { id: "ai", label: "AI", x: 258, y: 348 },
] as const;

export function LandingExperience() {
  return (
    <>
      <HeroSection />
      <TechnologyEcosystemSection />
      <IdentitySection />
      <CaseStudiesSection />
      <MeasuredImpactSection />
      <CareerJourneySection />
      <AiAutomationSection />
      <ResumeSection />
      <ContactSection />
    </>
  );
}

function HeroSection() {
  return (
    <Section id="home" className="scroll-mt-24 overflow-hidden">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <motion.div
            className="space-y-8"
            variants={stagger}
            initial="hidden"
            animate="visible"
          >
            <motion.div className="space-y-5" variants={fadeUp}>
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
                I work across Microsoft 365, Azure, Intune, identity,
                automation, and cloud operations to make enterprise IT
                environments more secure, efficient, and manageable.
              </p>
            </motion.div>

            <motion.div className="space-y-4" variants={fadeUp}>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button size="lg" asChild>
                  <a href="#case-studies">
                    View Engineering Stories
                    <ArrowRight className="ml-2 size-4" aria-hidden />
                  </a>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <a href={resumeHref} download>
                    Download Resume
                    <ArrowDownToLine className="ml-2 size-4" aria-hidden />
                  </a>
                </Button>
              </div>

              <SocialLinks />
            </motion.div>
          </motion.div>

          <GlassPanel className="relative min-h-[22rem] overflow-hidden p-6 md:min-h-[30rem]">
            <HeroArchitectureDiagram />
          </GlassPanel>
        </div>
      </Container>
    </Section>
  );
}

function SocialLinks() {
  return (
    <div className="flex items-center gap-2" aria-label="Social links">
      {socialLinks.map((link) => {
        const Icon = link.icon;

        return (
          <Button key={link.label} size="icon" variant="ghost" asChild>
            <a
              href={link.href}
              target="_blank"
              rel="noreferrer"
              aria-label={`Open ${link.label} profile`}
            >
              <Icon className="size-4" aria-hidden />
            </a>
          </Button>
        );
      })}
    </div>
  );
}

function HeroArchitectureDiagram() {
  const [activeNode, setActiveNode] = useState<
    (typeof heroNodes)[number]["id"]
  >(heroNodes[0].id);
  const prefersReducedMotion = useReducedMotion();

  return (
    <div
      className="absolute inset-0 flex items-center justify-center p-4 sm:p-6"
      aria-label="Interactive Microsoft cloud architecture visualization"
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
          x="72"
          y="38"
          width="376"
          height="344"
          rx="24"
          className="fill-background/70 stroke-border"
          strokeWidth="2"
        />
        <ArchitecturePath
          d="M258 72v60M258 132 172 184M258 132l86 52M172 204v44M344 204v44M172 288l86 40M344 288l-86 40"
          active={Boolean(activeNode)}
          reducedMotion={prefersReducedMotion}
        />
        {heroNodes.map((node) => (
          <g
            key={node.id}
            tabIndex={0}
            role="button"
            aria-label={node.label}
            onMouseEnter={() => setActiveNode(node.id)}
            onFocus={() => setActiveNode(node.id)}
            className="cursor-pointer outline-none"
          >
            <circle
              cx={node.x}
              cy={node.y}
              r={activeNode === node.id ? 26 : 22}
              className={cn(
                "fill-card stroke-border transition-all",
                activeNode === node.id && "stroke-foreground",
              )}
              strokeWidth="2"
            />
            <circle
              cx={node.x}
              cy={node.y}
              r="5"
              className="fill-muted-foreground"
            />
          </g>
        ))}
      </svg>
      <div className="absolute bottom-4 left-4 right-4 z-20 rounded-xl border bg-background/80 p-3 text-sm text-muted-foreground backdrop-blur">
        {heroNodes.find((node) => node.id === activeNode)?.label}
      </div>
    </div>
  );
}

function ArchitecturePath({
  d,
  active,
  reducedMotion,
}: {
  d: string;
  active: boolean;
  reducedMotion: boolean | null;
}) {
  return (
    <>
      <path
        d={d}
        className="stroke-border"
        strokeLinecap="round"
        strokeWidth="2"
      />
      <motion.path
        d={d}
        className={
          active ? "stroke-foreground/50" : "stroke-muted-foreground/40"
        }
        strokeDasharray="10 14"
        strokeLinecap="round"
        strokeWidth="2"
        animate={reducedMotion ? undefined : { strokeDashoffset: [24, 0] }}
        transition={
          reducedMotion
            ? undefined
            : { duration: 1.8, repeat: Infinity, ease: "linear" }
        }
      />
    </>
  );
}

function TechnologyEcosystemSection() {
  const [selectedCategory, setSelectedCategory] = useState<
    (typeof technologyCategories)[number]
  >(technologyCategories[0]);

  return (
    <Section id="technology" spacing="sm" className="scroll-mt-24 border-t">
      <Container>
        <div className="space-y-8">
          <SectionHeading
            eyebrow="Technology Ecosystem"
            title="Operating across Microsoft cloud, workplace, security, automation and AI."
            description="Select a category to inspect the verified technology areas represented in the portfolio."
          />

          <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
            <div
              className="grid gap-2 sm:grid-cols-2 lg:grid-cols-1"
              role="tablist"
              aria-label="Technology categories"
            >
              {technologyCategories.map((category) => (
                <button
                  key={category.name}
                  type="button"
                  role="tab"
                  aria-selected={selectedCategory.name === category.name}
                  className={cn(
                    "motion-safe-default rounded-xl border p-4 text-left text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring",
                    selectedCategory.name === category.name
                      ? "border-foreground bg-card text-foreground shadow-soft"
                      : "bg-background text-muted-foreground hover:border-foreground/40 hover:text-foreground",
                  )}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category.name}
                </button>
              ))}
            </div>

            <GlassPanel className="p-5">
              <motion.div
                key={selectedCategory.name}
                className="flex flex-wrap gap-3"
                variants={stagger}
                initial="hidden"
                animate="visible"
              >
                {selectedCategory.items.map((item) => (
                  <motion.div key={item} variants={fadeUp}>
                    <Tag className="px-3 py-2 text-sm">{item}</Tag>
                  </motion.div>
                ))}
              </motion.div>
            </GlassPanel>
          </div>
        </div>
      </Container>
    </Section>
  );
}

function IdentitySection() {
  return (
    <Section id="identity" spacing="sm" className="scroll-mt-24 border-t">
      <Container>
        <div className="space-y-8">
          <SectionHeading
            eyebrow="Engineering Identity"
            title="How I Think"
            description="Four operating principles behind the portfolio: automate, secure, simplify and measure."
          />
          <motion.div
            className="grid gap-4 md:grid-cols-2 xl:grid-cols-4"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            {identityPrinciples.map((principle) => {
              const Icon = principle.icon;

              return (
                <motion.div key={principle.title} variants={fadeUp}>
                  <Card className="group h-full overflow-hidden transition-colors hover:border-foreground/40 hover:shadow-panel">
                    <CardHeader>
                      <IconContainer className="transition-transform group-hover:-translate-y-1">
                        <Icon className="size-4" aria-hidden />
                      </IconContainer>
                      <CardTitle>{principle.title}</CardTitle>
                      <CardDescription>{principle.description}</CardDescription>
                    </CardHeader>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </Container>
    </Section>
  );
}

function CaseStudiesSection() {
  const [activeCase, setActiveCase] = useState(0);

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
            <div className="grid gap-3" role="list" aria-label="Case studies">
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
                  aria-expanded={activeCase === index}
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
                key={caseStudies[activeCase].title}
                className="space-y-6"
                initial={{ opacity: 0, y: 8 }}
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
                  <div className="flex flex-wrap gap-2">
                    {caseStudies[activeCase].technology.map((technology) => (
                      <Tag key={technology}>{technology}</Tag>
                    ))}
                    {"channels" in caseStudies[activeCase]
                      ? caseStudies[activeCase].channels.map((channel) => (
                          <Tag key={channel}>{channel}</Tag>
                        ))
                      : null}
                  </div>
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
    <div className="space-y-2">
      <h4 className="text-sm font-medium text-muted-foreground">{label}</h4>
      <div className="text-sm leading-6">{children}</div>
    </div>
  );
}

function MeasuredImpactSection() {
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
                  helperText="Verified resume outcome"
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
  const [displayValue, setDisplayValue] = useState(value);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      setDisplayValue(value);
      return;
    }

    let frame = 0;
    const totalFrames = 32;
    let animationFrame = 0;

    function tick() {
      frame += 1;
      const progress = Math.min(frame / totalFrames, 1);
      const current = numericValue * progress;
      const formatted =
        numericValue % 1 === 0 ? Math.round(current) : current.toFixed(1);
      const inferredSuffix = suffix ?? (value.includes("%") ? "%" : "");

      setDisplayValue(`${prefix}${formatted}${inferredSuffix}`);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(tick);
      } else {
        setDisplayValue(value);
      }
    }

    animationFrame = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(animationFrame);
  }, [numericValue, prefix, prefersReducedMotion, suffix, value]);

  return <>{displayValue}</>;
}

function CareerJourneySection() {
  const [activeRole, setActiveRole] = useState(journey.length - 1);

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
            <div className="relative grid gap-3">
              <div
                className="absolute left-4 top-4 hidden h-[calc(100%-2rem)] w-px bg-border md:block"
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
                  aria-expanded={activeRole === index}
                  onClick={() => setActiveRole(index)}
                >
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
                key={journey[activeRole].role}
                className="space-y-5"
                initial={{ opacity: 0, y: 8 }}
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

function AiAutomationSection() {
  const [activeNode, setActiveNode] = useState<(typeof aiNodes)[number]>(
    aiNodes[0],
  );
  const prefersReducedMotion = useReducedMotion();

  return (
    <Section id="ai-automation" spacing="sm" className="scroll-mt-24 border-t">
      <Container>
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <SectionHeading
            eyebrow="AI Automation"
            title="A modular automation architecture for IT support and internal workflows."
            description="The platform connects messaging channels, model APIs, and task-specific agents within defined support workflows."
          />

          <GlassPanel className="p-5">
            <div className="grid gap-5">
              <div
                className="relative grid gap-3"
                aria-label="AI automation architecture components"
              >
                {aiNodes.map((node, index) => (
                  <button
                    key={node.id}
                    type="button"
                    className={cn(
                      "motion-safe-default relative z-10 rounded-xl border p-4 text-left outline-none focus-visible:ring-2 focus-visible:ring-ring",
                      activeNode.id === node.id
                        ? "border-foreground bg-card shadow-soft"
                        : "bg-background hover:border-foreground/40",
                    )}
                    aria-pressed={activeNode.id === node.id}
                    onClick={() => setActiveNode(node)}
                    onFocus={() => setActiveNode(node)}
                    onMouseEnter={() => setActiveNode(node)}
                  >
                    <span className="flex items-center gap-3">
                      <IconContainer size="sm">
                        {index === 0 ? (
                          <Network className="size-4" aria-hidden />
                        ) : index === 1 ? (
                          <Workflow className="size-4" aria-hidden />
                        ) : index === 2 ? (
                          <BrainCircuit className="size-4" aria-hidden />
                        ) : index === 3 ? (
                          <Bot className="size-4" aria-hidden />
                        ) : (
                          <Sparkles className="size-4" aria-hidden />
                        )}
                      </IconContainer>
                      <span className="font-medium">{node.title}</span>
                    </span>
                  </button>
                ))}
                <motion.div
                  className="absolute left-8 top-8 h-[calc(100%-4rem)] w-px bg-foreground/30"
                  aria-hidden
                  animate={
                    prefersReducedMotion
                      ? undefined
                      : { opacity: [0.35, 0.75, 0.35] }
                  }
                  transition={
                    prefersReducedMotion
                      ? undefined
                      : { duration: 2.2, repeat: Infinity, ease: "easeInOut" }
                  }
                />
              </div>
              <div className="rounded-xl border bg-background p-4">
                <p className="text-sm font-medium">{activeNode.title}</p>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {activeNode.description}
                </p>
              </div>
            </div>
          </GlassPanel>
        </div>
      </Container>
    </Section>
  );
}

function ResumeSection() {
  const resumeHighlights = [
    "10+ years experience",
    "Microsoft 365",
    "Azure",
    "Intune",
    "PowerShell",
    "Cloud Infrastructure",
    "Automation",
    "Security & Compliance",
  ] as const;

  return (
    <Section id="resume" spacing="sm" className="scroll-mt-24 border-t">
      <Container>
        <GlassPanel className="p-6">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div className="space-y-5">
              <SectionHeading
                eyebrow="Resume"
                title="Download the current resume."
                description="A compact profile preview is shown here. The full resume is available as a PDF."
              />
              <div className="flex flex-wrap gap-2">
                {resumeHighlights.map((highlight) => (
                  <Tag key={highlight}>{highlight}</Tag>
                ))}
              </div>
              <SocialLinks />
            </div>
            <Button size="lg" asChild>
              <a href={resumeHref} download>
                Download Resume
                <ArrowDownToLine className="ml-2 size-4" aria-hidden />
              </a>
            </Button>
          </div>
        </GlassPanel>
      </Container>
    </Section>
  );
}

function ContactSection() {
  const year = useMemo(() => new Date().getFullYear(), []);

  return (
    <Section id="contact" spacing="sm" className="scroll-mt-24 border-t">
      <Container>
        <div className="space-y-8">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
            <SectionHeading
              eyebrow="Contact"
              title="Let's build better IT environments."
              description="For cloud infrastructure, Microsoft 365, automation, security and modern workplace engineering conversations, email is the best starting point."
            />
            <Button size="lg" asChild>
              <a href="mailto:sambathar@outlook.com">
                sambathar@outlook.com
                <Mail className="ml-2 size-4" aria-hidden />
              </a>
            </Button>
          </div>

          <Divider />

          <footer className="flex flex-col gap-5 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
            <div>
              <p className="font-medium text-foreground">Sambath A R</p>
              <p>Senior IT Administrator / Cloud Infrastructure Engineer</p>
            </div>
            <nav
              className="flex flex-wrap items-center gap-3"
              aria-label="Footer links"
            >
              <a
                className="motion-safe-default hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                href="https://github.com/sambathar"
                target="_blank"
                rel="noreferrer"
              >
                GitHub
              </a>
              <a
                className="motion-safe-default hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                href="https://www.linkedin.com/in/sambathar"
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn
              </a>
              <a
                className="motion-safe-default hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                href="mailto:sambathar@outlook.com"
              >
                Email
              </a>
            </nav>
            <p>© {year} Sambath A R. All rights reserved.</p>
          </footer>
        </div>
      </Container>
    </Section>
  );
}

"use client";
import { useMemo } from "react";
import { motion, MotionConfig } from "framer-motion";
import {
  ArrowDownToLine,
  ArrowRight,
  Github,
  Linkedin,
  Mail,
} from "lucide-react";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { Divider } from "@/components/ui/divider";
import { GlassPanel } from "@/components/ui/glass-panel";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { Tag } from "@/components/ui/tag";
import { fadeUp, stagger } from "@/lib/motion";
import { resumeHref, resumeHighlights, socialLinks } from "./landing/data";
import { HeroArchitecture } from "./landing/hero-architecture";
import { TechnologyEcosystem } from "./landing/technology-ecosystem";
import { EngineeringPrinciples } from "./landing/engineering-principles";
import { CaseStudyExplorer } from "./landing/case-study-explorer";
import { ImpactMetrics } from "./landing/impact-metrics";
import { CareerTimeline } from "./landing/career-timeline";
import { AIAutomationArchitecture } from "./landing/ai-automation-architecture";
export function LandingExperience() {
  return (
    <MotionConfig reducedMotion="user">
      <HeroSection />
      <TechnologyEcosystemSection />
      <IdentitySection />
      <CaseStudyExplorer />
      <ImpactMetrics />
      <CareerTimeline />
      <AiAutomationSection />
      <ResumeSection />
      <ContactSection />
    </MotionConfig>
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

          <GlassPanel className="relative min-w-0 overflow-hidden p-6">
            <HeroArchitecture />
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
        const Icon = link.label === "GitHub" ? Github : Linkedin;

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

function TechnologyEcosystemSection() {
  return (
    <Section id="technology" spacing="sm" className="scroll-mt-24 border-t">
      <Container>
        <div className="space-y-8">
          <SectionHeading
            eyebrow="Technology Ecosystem"
            title="Operating across Microsoft cloud, workplace, security, automation and AI."
            description="Select a category to inspect the verified technology areas represented in the portfolio."
          />

          <TechnologyEcosystem />
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
          <EngineeringPrinciples />
        </div>
      </Container>
    </Section>
  );
}
function AiAutomationSection() {
  return (
    <Section id="ai-automation" spacing="sm" className="scroll-mt-24 border-t">
      <Container>
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <SectionHeading
            eyebrow="AI Automation"
            title="A modular automation architecture for IT support and internal workflows."
            description="The platform connects messaging channels, model APIs, and task-specific agents within defined support workflows."
          />

          <GlassPanel className="min-w-0 p-5">
            <AIAutomationArchitecture />
          </GlassPanel>
        </div>
      </Container>
    </Section>
  );
}
function ResumeSection() {
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
                {resumeHighlights.map((highlight, index) => (
                  <Tag
                    key={highlight}
                    className={
                      index === 0
                        ? "border-foreground/30 text-foreground"
                        : undefined
                    }
                  >
                    {highlight}
                  </Tag>
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

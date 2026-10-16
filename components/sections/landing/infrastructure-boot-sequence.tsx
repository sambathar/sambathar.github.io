"use client";

import { type CSSProperties, useLayoutEffect, useRef } from "react";
import { motionEasing } from "@/lib/motion";
import styles from "./infrastructure-boot-sequence.module.css";

const duration = 2_000;
const layers = [
  ["Identity & Access", "Entra ID"],
  ["Endpoint Management", "Intune"],
  ["Cloud Services", "Azure / Microsoft 365"],
  ["Automation Layer", "PowerShell / AI"],
] as const;

type BootDocument = Document & {
  __portfolioBootSequence?: { startedAt: number; completed: boolean };
};

/** Full-page entrance. The portfolio renders independently underneath it. */
export function InfrastructureBootSequence() {
  const ref = useRef<HTMLDivElement>(null);
  const attached = useRef(false);

  useLayoutEffect(() => {
    if (!ref.current) return;

    const element = ref.current;
    const page = document as BootDocument;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    // CSS starts with the server markup, not hydration. Adopt its elapsed time
    // so delayed JavaScript cannot restart or extend the entrance.
    const animationTime = element.getAnimations()[0]?.currentTime;
    const cssElapsed = typeof animationTime === "number" ? animationTime : 0;
    const existing = page.__portfolioBootSequence;
    const session = (page.__portfolioBootSequence ??= {
      startedAt: performance.now() - cssElapsed,
      completed: false,
    });
    const elapsed = performance.now() - session.startedAt;
    if (preference.matches || session.completed || elapsed >= duration) {
      session.completed = true;
      delete element.dataset.playing;
      return;
    }

    // A genuine remount resumes the document clock before paint. Strict Mode
    // reattachment leaves the same element's CSS animation untouched.
    if (existing && !attached.current) {
      element.style.setProperty("--boot-offset", `${cssElapsed - elapsed}ms`);
    }
    attached.current = true;

    function finish() {
      session.completed = true;
      delete element.dataset.playing;
      detach();
    }
    function onEnd(event: AnimationEvent) {
      if (event.target === element) finish();
    }
    function onPreferenceChange(event: MediaQueryListEvent) {
      if (event.matches) finish();
    }

    function detach() {
      element.removeEventListener("animationend", onEnd);
      document.removeEventListener("pointerdown", finish, true);
      document.removeEventListener("keydown", finish, true);
      preference.removeEventListener("change", onPreferenceChange);
    }

    element.addEventListener("animationend", onEnd);
    document.addEventListener("pointerdown", finish, true);
    document.addEventListener("keydown", finish, true);
    preference.addEventListener("change", onPreferenceChange);

    return () => {
      detach();
      // Strict Mode cleanup must not hide/restart the initial CSS animation.
      // A real unmount removes the element; finish() handles dismissal/end.
    };
  }, []);

  return (
    <div
      ref={ref}
      className={styles.root}
      data-playing="true"
      aria-hidden="true"
      style={
        {
          "--boot-duration": `${duration}ms`,
          "--boot-offset": "0ms",
          "--boot-ease": `cubic-bezier(${motionEasing.productive.join(",")})`,
        } as CSSProperties
      }
    >
      <svg
        className={styles.network}
        viewBox="0 0 1200 800"
        preserveAspectRatio="xMidYMid slice"
        focusable="false"
      >
        <g className={styles.connections}>
          <path d="M0 190H220L370 340H600L830 170H1200" />
          <path d="M0 610H260L440 430H600L790 620H1200" />
          <path d="M170 0V140L370 340L440 430V800" />
          <path d="M1030 0V140L830 170L790 620V800" />
          <path d="M220 190V610M1030 140V620M370 340H830M260 610H790" />
        </g>
        <g className={styles.energy}>
          {[
            "M0 190H220L370 340H600",
            "M1200 170H830L600 340",
            "M0 610H260L440 430H600L600 340",
          ].map((d, index) => (
            <path
              key={d}
              d={d}
              pathLength="1"
              style={{ "--travel-delay": `${index * 90}ms` } as CSSProperties}
            />
          ))}
        </g>
        <g className={styles.junctions}>
          {[
            [220, 190],
            [370, 340],
            [830, 170],
            [1030, 140],
            [260, 610],
            [440, 430],
            [790, 620],
          ].map(([cx, cy], index) => (
            <circle
              key={`${cx}-${cy}`}
              cx={cx}
              cy={cy}
              r="3"
              style={
                { "--junction-delay": `${140 + index * 90}ms` } as CSSProperties
              }
            />
          ))}
        </g>
      </svg>
      <div className={styles.content}>
        <p className={styles.eyebrow}>CLOUD INFRASTRUCTURE · AUTOMATION</p>
        <p className={styles.name} data-name="SAMBATH A R">
          <span className={styles.nameText}>SAMBATH A R</span>
        </p>
        <p className={styles.supporting}>
          Microsoft 365 · Azure · Modern Workplace
        </p>
        <div className={styles.layers}>
          {layers.map(([label, technology], index) => (
            <div
              key={label}
              className={styles.layer}
              style={
                { "--layer-delay": `${750 + index * 180}ms` } as CSSProperties
              }
            >
              <span className={styles.node} />
              <p className={styles.label}>{label}</p>
              <p className={styles.technology}>{technology}</p>
            </div>
          ))}
        </div>
        <div className={styles.progressTrack}>
          <span className={styles.progress} />
        </div>
        <p className={styles.completion}>ENVIRONMENT READY</p>
      </div>
      <span className={styles.convergence} />
      <p className={styles.skipHint}>Click or press any key to skip</p>
    </div>
  );
}

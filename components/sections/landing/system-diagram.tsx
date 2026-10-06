"use client";

import { useId, useState, type CSSProperties } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface SystemNode {
  id: string;
  label: string;
  x: number;
  y: number;
  details: readonly string[];
}

interface SystemDiagramProps {
  label: string;
  nodes: readonly SystemNode[];
  connections: readonly (readonly [string, string])[];
  initialNode: string;
  flow?: boolean;
}

/** Shared keyboard/touch interaction and responsive geometry for system maps. */
export function SystemDiagram({
  label,
  nodes,
  connections,
  initialNode,
  flow = false,
}: SystemDiagramProps) {
  const [selected, setSelected] = useState(initialNode);
  const reduced = useReducedMotion();
  const panelId = useId();
  const active = nodes.find((node) => node.id === selected) ?? nodes[0];
  const highlighted = new Set([selected]);
  if (flow) {
    // Follow downstream edges; model selection also includes its router input.
    function visit(id: string) {
      for (const [from, to] of connections) {
        if (from === id && !highlighted.has(to)) {
          highlighted.add(to);
          visit(to);
        }
      }
    }
    visit(selected);
    if (["openai", "claude", "gemini"].includes(selected))
      highlighted.add("router");
  } else {
    for (const [from, to] of connections) {
      if (from === selected) highlighted.add(to);
      if (to === selected) highlighted.add(from);
    }
  }

  function position(node: SystemNode, mobile: boolean) {
    return mobile
      ? { x: 50, y: 7 + nodes.indexOf(node) * (86 / (nodes.length - 1)) }
      : node;
  }

  return (
    <div className="space-y-4" role="group" aria-label={label}>
      <div className="surface-grid relative h-[38rem] overflow-hidden rounded-xl sm:h-[29rem]">
        {[true, false].map((mobile) => (
          <svg
            key={String(mobile)}
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            className={cn(
              "pointer-events-none absolute inset-0 h-full w-full",
              mobile ? "sm:hidden" : "hidden sm:block",
            )}
            fill="none"
            aria-hidden="true"
          >
            {connections.map(([from, to], index) => {
              const start = nodes.find((node) => node.id === from)!;
              const end = nodes.find((node) => node.id === to)!;
              const a = position(start, mobile);
              const b = position(end, mobile);
              const lit = flow
                ? highlighted.has(from) && highlighted.has(to)
                : from === selected || to === selected;
              const d = mobile
                ? `M${a.x} ${a.y} C${index % 2 ? 15 : 85} ${a.y}, ${index % 2 ? 15 : 85} ${b.y}, ${b.x} ${b.y}`
                : `M${a.x} ${a.y} C${a.x} ${(a.y + b.y) / 2}, ${b.x} ${(a.y + b.y) / 2}, ${b.x} ${b.y}`;
              return (
                <g key={`${from}-${to}`}>
                  <motion.path
                    d={d}
                    vectorEffect="non-scaling-stroke"
                    className={lit ? "stroke-foreground/50" : "stroke-border"}
                    strokeWidth={lit ? 1.5 : 1}
                    initial={reduced ? false : { pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{
                      duration: 0.6,
                      delay: reduced ? 0 : index * 0.035,
                    }}
                  />
                  {lit && !reduced && (
                    <motion.path
                      d={d}
                      vectorEffect="non-scaling-stroke"
                      className="stroke-foreground/50"
                      strokeWidth="2"
                      pathLength="1"
                      strokeDasharray="0.04 0.96"
                      animate={{ strokeDashoffset: [1, 0] }}
                      transition={{
                        duration: 3.5,
                        repeat: Infinity,
                        repeatDelay: 2,
                        ease: "linear",
                      }}
                    />
                  )}
                </g>
              );
            })}
          </svg>
        ))}
        {nodes.map((node) => (
          <button
            key={node.id}
            type="button"
            aria-label={`${node.label}: ${node.details.join(", ")}`}
            aria-pressed={selected === node.id}
            aria-describedby={selected === node.id ? panelId : undefined}
            onMouseEnter={() => setSelected(node.id)}
            onFocus={() => setSelected(node.id)}
            onClick={() => setSelected(node.id)}
            style={
              {
                "--node-x": `${node.x}%`,
                "--node-y": `${node.y}%`,
                "--mobile-y": `${position(node, true).y}%`,
              } as CSSProperties
            }
            className={cn(
              "absolute left-1/2 top-[var(--mobile-y)] z-10 w-max max-w-[10rem] -translate-x-1/2 -translate-y-1/2 rounded-xl border bg-card px-3 py-3 text-center text-sm font-medium transition-[border-color,box-shadow,opacity] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:left-[var(--node-x)] sm:top-[var(--node-y)] sm:max-w-[8.5rem]",
              selected === node.id
                ? "border-foreground shadow-panel ring-1 ring-foreground/20"
                : highlighted.has(node.id)
                  ? "border-foreground/40"
                  : "opacity-60",
            )}
          >
            {node.label}
          </button>
        ))}
      </div>
      <div
        id={panelId}
        className="min-h-[7rem] rounded-xl border bg-background/80 p-4"
        aria-live="polite"
        aria-atomic="true"
      >
        <p className="text-sm font-medium">{active.label}</p>
        <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm leading-6 text-muted-foreground">
          {active.details.map((detail) => (
            <li key={detail}>{detail}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

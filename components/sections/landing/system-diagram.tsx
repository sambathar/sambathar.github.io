"use client";

import { useEffect, useId, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

import { cn } from "@/lib/utils";

export interface SystemNode {
  id: string;
  label: string;
  /** Fixed desktop center coordinates, as percentages of the SVG viewBox. */
  x: number;
  y: number;
  width?: number;
  height?: number;
  details: readonly string[];
}

interface SystemDiagramProps {
  label: string;
  nodes: readonly SystemNode[];
  connections: readonly (readonly [string, string])[];
  initialNode: string;
  flow?: boolean;
}

interface NodeGeometry {
  x: number;
  y: number;
  width: number;
  height: number;
}

export function getDiagramGeometry(
  nodes: readonly SystemNode[],
  mobile: boolean,
  flow: boolean,
) {
  const width = mobile ? 280 : 400;
  let mobileCursor = 5;
  const boxes = new Map<string, NodeGeometry>(
    nodes.map((node) => {
      const nodeHeight = node.height ?? 44;
      const box = mobile
        ? {
            x: width / 2,
            y: mobileCursor + nodeHeight / 2,
            width: 176,
            height: nodeHeight,
          }
        : {
            x: (node.x * width) / 100,
            y: (node.y * (flow ? 400 : 360)) / 100,
            width: node.width ?? (flow ? 104 : 136),
            height: nodeHeight,
          };
      mobileCursor += nodeHeight + 20;
      return [node.id, box] as const;
    }),
  );
  const height = mobile ? mobileCursor - 20 + 5 : flow ? 400 : 360;
  return { width, height, boxes };
}

/** Shared SVG coordinates keep the node boxes and connector ports aligned. */
export function connectorPath(
  from: NodeGeometry,
  to: NodeGeometry,
  arrowClearance = 0,
) {
  const start = { x: from.x, y: from.y + from.height / 2 };
  const end = { x: to.x, y: to.y - to.height / 2 - arrowClearance };
  const middleY = (start.y + end.y) / 2;

  if (start.x === end.x) return `M ${start.x} ${start.y} V ${end.y}`;
  return `M ${start.x} ${start.y} C ${start.x} ${middleY}, ${end.x} ${middleY}, ${end.x} ${end.y}`;
}

/** Hover/focus previews a node; native button activation retains its selection. */
export function SystemDiagram({
  label,
  nodes,
  connections,
  initialNode,
  flow = false,
}: SystemDiagramProps) {
  const [selected, setSelected] = useState(initialNode);
  const [hovered, setHovered] = useState<string | null>(null);
  const [focused, setFocused] = useState<string | null>(null);
  const reduced = useReducedMotion();
  const [hydrated, setHydrated] = useState(false);
  // The media preference is null on the server but boolean in the browser.
  // Only optional motion layers wait; both SVG layouts and all nodes render in SSR.
  useEffect(() => setHydrated(true), []);
  const instanceId = useId();
  const panelId = `${instanceId}-context`;
  const hintId = `${instanceId}-hint`;
  const activeId = hovered ?? focused ?? selected;
  const active = nodes.find((node) => node.id === activeId) ?? nodes[0];
  const highlighted = new Set([activeId]);

  if (flow) {
    function visit(id: string) {
      for (const [from, to] of connections) {
        if (from === id && !highlighted.has(to)) {
          highlighted.add(to);
          visit(to);
        }
      }
    }
    visit(activeId);
    // A model's incoming router edge is part of its request path.
    if (["openai", "claude", "gemini"].includes(activeId))
      highlighted.add("router");
  } else {
    for (const [from, to] of connections) {
      if (from === activeId) highlighted.add(to);
      if (to === activeId) highlighted.add(from);
    }
  }

  return (
    <div className="space-y-3" role="group" aria-label={label}>
      <p id={hintId} className="text-xs text-muted-foreground">
        Select a node to explore
      </p>
      <div className="surface-grid rounded-xl">
        {[false, true].map((mobile) => {
          const {
            width,
            height,
            boxes: geometry,
          } = getDiagramGeometry(nodes, mobile, flow);
          const markerId = `${instanceId}-${mobile ? "mobile" : "desktop"}`;

          return (
            <svg
              key={String(mobile)}
              viewBox={`0 0 ${width} ${height}`}
              className={cn(
                "mx-auto w-full overflow-visible",
                mobile
                  ? "max-w-[20rem] sm:hidden"
                  : "hidden max-w-[26rem] sm:block",
              )}
              role="group"
              aria-label={`${label} nodes and connections`}
              aria-describedby={hintId}
            >
              {flow && (
                <defs>
                  <marker
                    id={`${markerId}-active`}
                    viewBox="0 0 6 6"
                    refX="6"
                    refY="3"
                    markerWidth="6"
                    markerHeight="6"
                    markerUnits="userSpaceOnUse"
                    orient="auto"
                  >
                    <path d="M0 0L6 3L0 6Z" className="fill-foreground/75" />
                  </marker>
                  <marker
                    id={`${markerId}-inactive`}
                    viewBox="0 0 6 6"
                    refX="6"
                    refY="3"
                    markerWidth="6"
                    markerHeight="6"
                    markerUnits="userSpaceOnUse"
                    orient="auto"
                  >
                    <path
                      d="M0 0L6 3L0 6Z"
                      className="fill-muted-foreground/40"
                    />
                  </marker>
                </defs>
              )}
              <g fill="none" aria-hidden="true">
                {connections.map(([fromId, toId], index) => {
                  const from = geometry.get(fromId)!;
                  const to = geometry.get(toId)!;
                  const lit = flow
                    ? highlighted.has(fromId) && highlighted.has(toId)
                    : fromId === activeId || toId === activeId;
                  // Mobile skips use a side lane rather than crossing intermediate nodes.
                  const adjacent =
                    Math.abs(
                      nodes.findIndex((node) => node.id === toId) -
                        nodes.findIndex((node) => node.id === fromId),
                    ) === 1;
                  const lane = index % 2 ? 20 : width - 20;
                  const d =
                    mobile && !adjacent
                      ? `M ${from.x + ((lane < from.x ? -1 : 1) * from.width) / 2} ${from.y} H ${lane} V ${to.y} H ${to.x + (lane < to.x ? -1 : 1) * (to.width / 2 + (flow ? 4 : 0))}`
                      : connectorPath(from, to, flow ? 4 : 0);

                  return (
                    <g key={`${fromId}-${toId}`}>
                      <path
                        d={d}
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className={cn(
                          "motion-safe:transition-colors motion-safe:duration-200",
                          lit
                            ? "stroke-foreground/75"
                            : "stroke-muted-foreground/40",
                        )}
                        markerEnd={
                          flow
                            ? `url(#${markerId}-${lit ? "active" : "inactive"})`
                            : undefined
                        }
                      />
                      {hydrated && lit && reduced === false && (
                        <motion.path
                          d={d}
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          className="stroke-foreground/80"
                          pathLength="1"
                          strokeDasharray="0.05 0.95"
                          animate={{ strokeDashoffset: [1, 0] }}
                          transition={{
                            duration: 3.8,
                            repeat: Infinity,
                            repeatDelay: 2,
                            ease: "linear",
                          }}
                        />
                      )}
                    </g>
                  );
                })}
              </g>
              {nodes.map((node) => {
                const box = geometry.get(node.id)!;
                const x = box.x - box.width / 2;
                const y = box.y - box.height / 2;
                const isActive = activeId === node.id;
                const isRelated = highlighted.has(node.id);

                return (
                  <g key={node.id} className="group">
                    <rect
                      x={x - 3}
                      y={y - 3}
                      width={box.width + 6}
                      height={box.height + 6}
                      rx="13"
                      fill="none"
                      strokeWidth="2"
                      className="stroke-ring opacity-0 group-focus-within:opacity-100"
                      aria-hidden="true"
                    />
                    <rect
                      x={x}
                      y={y}
                      width={box.width}
                      height={box.height}
                      rx="10"
                      strokeWidth={isActive ? 1.75 : 1}
                      className={cn(
                        "group-hover:fill-muted motion-safe:transition-[fill,stroke,filter] motion-safe:duration-200",
                        isActive
                          ? "fill-muted stroke-foreground/90 drop-shadow-[0_0_5px_hsl(var(--foreground)/0.12)]"
                          : isRelated
                            ? "fill-card stroke-foreground/45"
                            : "fill-card stroke-muted-foreground/40",
                      )}
                      aria-hidden="true"
                    />
                    <foreignObject
                      x={x}
                      y={y}
                      width={box.width}
                      height={box.height}
                    >
                      <button
                        type="button"
                        aria-label={node.label}
                        aria-pressed={selected === node.id}
                        aria-controls={panelId}
                        aria-describedby={
                          isActive ? `${hintId} ${panelId}` : hintId
                        }
                        onMouseEnter={() => setHovered(node.id)}
                        onMouseLeave={() => setHovered(null)}
                        onFocus={() => setFocused(node.id)}
                        onBlur={() => setFocused(null)}
                        onClick={() => setSelected(node.id)}
                        className="flex h-full w-full cursor-pointer items-center justify-center rounded-[10px] px-2 text-center text-[14px] font-medium leading-4 text-foreground outline-none"
                      >
                        {node.label}
                      </button>
                    </foreignObject>
                    {isActive && (
                      <circle
                        cx={x + box.width - 8}
                        cy={y + 8}
                        r="2"
                        className="pointer-events-none fill-foreground"
                        aria-hidden="true"
                      />
                    )}
                  </g>
                );
              })}
            </svg>
          );
        })}
      </div>
      <div
        id={panelId}
        className={cn(
          "rounded-xl border border-foreground/20 bg-background/80",
          flow ? "p-3 sm:p-4" : "p-4",
          flow ? "grid" : "h-40 overflow-y-auto sm:h-36",
        )}
        aria-live="polite"
        aria-atomic="true"
      >
        {flow ? (
          nodes.map((node) => (
            <motion.div
              key={node.id}
              className={cn(
                "[grid-area:1/1]",
                node.id !== active.id &&
                  "pointer-events-none hidden sm:invisible sm:block",
              )}
              aria-hidden={node.id !== active.id}
              inert={node.id !== active.id}
              initial={false}
              animate={{ opacity: node.id === active.id ? 1 : 0 }}
              transition={{ duration: hydrated && !reduced ? 0.16 : 0 }}
            >
              <p className="text-sm font-medium">{node.label}</p>
              <ul className="mt-2 list-disc space-y-1 pl-4 text-sm leading-6 text-muted-foreground">
                {node.details.map((detail) => (
                  <li key={detail}>{detail}</li>
                ))}
              </ul>
            </motion.div>
          ))
        ) : (
          <motion.div
            key={active.id}
            initial={!hydrated || reduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: reduced ? 0 : 0.16 }}
          >
            <p className="text-sm font-medium">{active.label}</p>
            <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm leading-6 text-muted-foreground">
              {active.details.map((detail) => (
                <li key={detail}>{detail}</li>
              ))}
            </ul>
          </motion.div>
        )}
      </div>
    </div>
  );
}

"use client";

import { heroArchitectureNodes, heroArchitectureConnections } from "./data";
import { SystemDiagram } from "./system-diagram";

export function HeroArchitecture() {
  return (
    <SystemDiagram
      label="Microsoft cloud operations architecture"
      nodes={heroArchitectureNodes}
      connections={heroArchitectureConnections}
      initialNode="operations"
    />
  );
}

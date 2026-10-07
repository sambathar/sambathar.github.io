"use client";

import { aiArchitectureNodes, aiArchitectureConnections } from "./data";
import { SystemDiagram } from "./system-diagram";

const nodes = aiArchitectureNodes.map((node) => ({
  ...node,
  label: node.title,
  details:
    node.id === "router"
      ? [
          "Routes requests from WhatsApp, Teams and Telegram",
          "Selects the appropriate model or task-specific workflow",
          "Connects AI capabilities to IT support and internal workflows",
        ]
      : [node.description],
}));

export function AIAutomationArchitecture() {
  return (
    <SystemDiagram
      label="Messaging channels to AI router, model APIs, task-specific agents and internal workflows"
      nodes={nodes}
      connections={aiArchitectureConnections}
      initialNode="router"
      flow
    />
  );
}

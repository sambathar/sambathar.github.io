export const resumeHref = "/resume/Sambath-A-R-IT-Cloud-Infrastructure.pdf";

export const socialLinks = [
  {
    label: "GitHub",
    href: "https://github.com/sambathar",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/sambathar",
  },
] as const;

export const heroArchitectureNodes = [
  {
    id: "m365",
    label: "Microsoft 365",
    x: 50,
    y: 11,
    details: [
      "Exchange Online",
      "SharePoint",
      "Teams",
      "Multi-tenant administration",
    ],
    related: ["identity", "security", "operations"],
  },
  {
    id: "identity",
    label: "Entra ID",
    x: 50,
    y: 29,
    details: ["Identity and access", "MFA", "User lifecycle"],
    related: ["m365", "intune", "security", "operations"],
  },
  {
    id: "intune",
    label: "Intune",
    x: 24,
    y: 48,
    details: ["MDM", "macOS / Windows", "100-150 endpoints", "100% compliance"],
    related: ["identity", "operations", "security"],
  },
  {
    id: "security",
    label: "Security / Purview",
    x: 76,
    y: 48,
    details: ["eDiscovery", "Retention", "Sensitivity labeling", "DLP / DSAR"],
    related: ["m365", "identity", "intune", "operations"],
  },
  {
    id: "operations",
    label: "Cloud Operations",
    x: 50,
    y: 64,
    details: [
      "Microsoft 365 tenants",
      "Azure resources",
      "Modern workplace operations",
    ],
    related: ["azure", "automation", "ai", "intune", "security", "identity"],
  },
  {
    id: "azure",
    label: "Azure",
    x: 23,
    y: 82,
    details: ["VMs", "Storage Accounts", "Azure administration"],
    related: ["operations", "automation"],
  },
  {
    id: "automation",
    label: "Automation",
    x: 50,
    y: 88,
    details: [
      "PowerShell",
      "Microsoft Graph API",
      "40% manual effort reduction",
    ],
    related: ["operations", "azure", "ai"],
  },
  {
    id: "ai",
    label: "AI",
    x: 77,
    y: 82,
    details: ["OpenAI", "Claude", "Gemini", "Task-specific agents"],
    related: ["operations", "automation"],
  },
] as const;

export const heroArchitectureConnections = [
  ["m365", "identity"],
  ["identity", "intune"],
  ["identity", "security"],
  ["intune", "operations"],
  ["security", "operations"],
  ["operations", "azure"],
  ["operations", "automation"],
  ["operations", "ai"],
  ["automation", "ai"],
] as const;

export const technologyCategories = [
  {
    name: "Microsoft Cloud",
    items: [
      ["Microsoft 365", "Multi-tenant administration"],
      ["Azure", "VMs and Storage"],
      ["Entra ID", "Identity and access"],
      ["Exchange Online", "Messaging"],
      ["SharePoint", "Collaboration and content"],
      ["Teams", "Communication"],
    ],
  },
  {
    name: "Modern Workplace",
    items: [
      ["Microsoft Intune", "Endpoint management"],
      ["ManageEngine", "MDM migration"],
      ["Addigy", "macOS management"],
    ],
  },
  {
    name: "Security & Compliance",
    items: [
      ["Microsoft Purview", "eDiscovery and retention"],
      ["Microsoft Defender", "Security operations"],
      ["MFA", "Identity protection"],
      ["DLP", "Data protection"],
      ["GDPR", "Compliance alignment"],
      ["DSAR", "Data subject workflows"],
    ],
  },
  {
    name: "Automation",
    items: [
      ["PowerShell", "Operational scripting"],
      ["Microsoft Graph API", "Lifecycle automation"],
      ["Power Automate", "Workflow automation"],
      ["Power Apps", "Business apps"],
      ["Power BI", "Operational reporting"],
      ["Python", "Automation scripting"],
      ["Bash", "Shell automation"],
    ],
  },
  {
    name: "Cloud Infrastructure",
    items: [
      ["Azure VMs", "Compute administration"],
      ["Azure Storage", "Cloud storage"],
      ["AWS EC2", "Cloud compute"],
      ["AWS S3", "Object storage"],
      ["IAM", "Access management"],
      ["Google Cloud", "Cloud administration"],
    ],
  },
  {
    name: "AI",
    items: [
      ["OpenAI APIs", "AI integration"],
      ["Claude APIs", "AI integration"],
      ["Gemini APIs", "AI integration"],
      ["AI agents", "Task-specific support workflows"],
    ],
  },
] as const;

// Relationships describe technology areas, not deployed integrations.
export const technologyRelationships: readonly (readonly string[])[] = [
  ["Microsoft 365", "Exchange Online", "SharePoint", "Teams"],
  ["Entra ID", "Microsoft 365", "Azure"],
  ["Microsoft Intune", "ManageEngine", "Addigy"],
  ["Microsoft Purview", "DLP", "GDPR", "DSAR"],
  ["Microsoft Defender", "MFA"],
  ["PowerShell", "Microsoft Graph API", "Python", "Bash"],
  ["Power Automate", "Power Apps", "Power BI"],
  ["Azure VMs", "Azure Storage"],
  ["AWS EC2", "AWS S3", "IAM"],
  ["OpenAI APIs", "Claude APIs", "Gemini APIs", "AI agents"],
];

export const identityPrinciples = [
  {
    title: "AUTOMATE",
    description:
      "Use PowerShell, Microsoft Graph and Power Platform to reduce repetitive operational work.",
    icon: "workflow",
    reveals: ["PowerShell", "Graph API", "Power Platform", "User lifecycle"],
  },
  {
    title: "SECURE",
    description:
      "Build identity, MFA, DLP, Purview and endpoint controls into day-to-day operations.",
    icon: "shield",
    reveals: ["Entra ID", "MFA", "DLP", "Purview", "Endpoint controls"],
  },
  {
    title: "SIMPLIFY",
    description:
      "Reduce operational complexity through standardization, migration, SaaS administration and workflow design.",
    icon: "cloud",
    reveals: [
      "Migration",
      "SaaS administration",
      "Workflow design",
      "Standardization",
    ],
  },
  {
    title: "MEASURE",
    description:
      "Track operational outcomes through compliance, efficiency, availability, cost and effort reduction.",
    icon: "check",
    reveals: ["Compliance", "Cost", "Efficiency", "Availability", "Effort"],
  },
] as const;

export const caseStudies = [
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

export const measuredImpact = [
  {
    value: "100%",
    numericValue: 100,
    label: "Endpoint compliance",
    context: "Intune + MDM modernization",
  },
  {
    value: "40%",
    numericValue: 40,
    label: "Manual effort reduction",
    context: "PowerShell + Microsoft Graph API",
  },
  {
    value: "40%",
    numericValue: 40,
    label: "M365 / cloud cost reduction",
    context: "Licensing audits + right-sizing",
  },
  {
    value: "4",
    numericValue: 4,
    label: "M365 tenants managed",
    context: "Multi-tenant administration",
  },
  {
    value: "100+",
    numericValue: 100,
    suffix: "+",
    label: "Users supported",
    context: "Global teams",
  },
  {
    value: "100-150",
    numericValue: 150,
    prefix: "100-",
    label: "Endpoints migrated",
    context: "macOS / Windows endpoints",
  },
  {
    value: "10+",
    numericValue: 10,
    suffix: "+",
    label: "Azure VMs / Storage Accounts managed",
    context: "Azure infrastructure",
  },
  {
    value: "99.9%",
    numericValue: 99.9,
    label: "System availability",
    context: "Infrastructure operations",
  },
] as const;

export const journey = [
  {
    years: "2014-2017",
    role: ".NET Web Developer",
    company: "Lavender Technologies & Solutions",
    description:
      "Developed application features using ASP.NET Web API while working with Scrum, TDD and Pair Programming.",
    progression: "Software Development",
    technologies: ["ASP.NET Web API", "Scrum", "TDD", "Pair Programming"],
  },
  {
    years: "2018-2022",
    role: "System Administrator",
    company: "SVM Tech Private Ltd",
    description:
      "Led infrastructure upgrades, VMware virtualization, Azure administration, availability operations, and Office 365 migration work.",
    progression: "System Administration",
    technologies: ["VMware", "Azure", "Office 365 migration", "PowerShell"],
  },
  {
    years: "2022-2025",
    role: "IT Systems Administrator",
    company: "Onference Training Technologies LLP",
    description:
      "Administered Microsoft 365, Google Workspace and Microsoft Purview while improving compliance, workflows and document management.",
    progression: "Microsoft 365 / Cloud",
    technologies: [
      "M365",
      "SharePoint",
      "OneDrive",
      "MFA",
      "DLP",
      "Power Platform",
    ],
  },
  {
    years: "2025-Present",
    role: "Senior Associate - IT Administration",
    company: "Lucey Group",
    description:
      "Manages Microsoft 365 tenants, endpoint modernization, Azure resources, automation, Purview, Copilot governance and AI-enabled IT workflows.",
    progression: "Infrastructure + Automation + AI",
    technologies: [
      "M365 multi-tenant",
      "Intune",
      "Azure",
      "Purview",
      "PowerShell / Graph",
      "AI automation",
    ],
  },
] as const;

export const aiArchitectureNodes = [
  {
    id: "whatsapp",
    title: "WhatsApp",
    x: 18,
    y: 12,
    description: "Messaging channel connected to the AI automation router.",
    path: ["whatsapp", "router", "agents", "workflows"],
  },
  {
    id: "teams",
    title: "Teams",
    x: 50,
    y: 12,
    description:
      "Microsoft Teams channel for IT support and internal workflow entry.",
    path: ["teams", "router", "agents", "workflows"],
  },
  {
    id: "telegram",
    title: "Telegram",
    x: 82,
    y: 12,
    description:
      "Telegram channel connected to task-specific support workflows.",
    path: ["telegram", "router", "agents", "workflows"],
  },
  {
    id: "router",
    title: "AI Router",
    x: 50,
    y: 34,
    description:
      "Routes requests toward the right model or task-specific workflow.",
    path: ["router", "openai", "claude", "gemini", "agents", "workflows"],
  },
  {
    id: "openai",
    title: "OpenAI",
    x: 18,
    y: 55,
    description: "Model API used within the modular AI automation platform.",
    path: ["router", "openai", "agents", "workflows"],
  },
  {
    id: "claude",
    title: "Claude",
    x: 50,
    y: 55,
    description: "Model API used within the modular AI automation platform.",
    path: ["router", "claude", "agents", "workflows"],
  },
  {
    id: "gemini",
    title: "Gemini",
    x: 82,
    y: 55,
    description: "Model API used within the modular AI automation platform.",
    path: ["router", "gemini", "agents", "workflows"],
  },
  {
    id: "agents",
    title: "Task-Specific Agents",
    x: 50,
    y: 76,
    description:
      "Task-specific agents automate IT support operations and internal workflows.",
    path: ["agents", "workflows"],
  },
  {
    id: "workflows",
    title: "IT Support / Workflows",
    x: 50,
    y: 93,
    description:
      "Internal workflows and support outcomes remain scoped to defined tasks.",
    path: ["workflows"],
  },
] as const;

export const aiArchitectureConnections = [
  ["whatsapp", "router"],
  ["teams", "router"],
  ["telegram", "router"],
  ["router", "openai"],
  ["router", "claude"],
  ["router", "gemini"],
  ["openai", "agents"],
  ["claude", "agents"],
  ["gemini", "agents"],
  ["agents", "workflows"],
] as const;

export const resumeHighlights = [
  "10+ years experience",
  "Microsoft 365",
  "Azure",
  "Intune",
  "PowerShell",
  "Cloud Infrastructure",
  "Automation",
  "Security & Compliance",
] as const;

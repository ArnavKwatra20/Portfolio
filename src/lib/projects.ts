export type PortfolioProject = {
  number: string;
  slug: string;
  name: string;
  type: string;
  status: string;
  description: string;
  challenge: string;
  approach: string;
  solution: string;
  highlights: string[];
  stack: string[];
  art: "cafe-blues" | "flowstate" | "process-analyzer" | "clientflow";
  visitUrl: string;
};

export const projects: PortfolioProject[] = [
  {
    number: "01",
    slug: "cafe-blues",
    name: "Cafe Blues",
    type: "Hospitality · Website",
    status: "Concept project",
    description:
      "A warm digital home for a neighborhood cafe, made to feel like an invitation to slow down.",
    challenge:
      "Give a fictional city cafe the same welcoming character online that guests might find when they step inside.",
    approach:
      "Build the experience around atmosphere and everyday rituals: an editorial story, clear menu browsing, useful location details, and easy reservation entry points.",
    solution:
      "A responsive, multi-page cafe site with Home, Menu, About, and Contact routes. The menu is data-driven with category filters, while reservation and contact flows provide clear demo feedback.",
    highlights: [
      "Responsive pages with mobile navigation",
      "Filterable menu with dietary labels",
      "Reservation modal and validated contact form",
      "Reduced-motion-aware reveals and accessible interactions",
    ],
    stack: ["React", "TypeScript", "Vite", "Framer Motion", "Lucide"],
    art: "cafe-blues",
    visitUrl:
      "https://cafe-blues-git-master-arnavkwatra20s-projects.vercel.app",
  },
  {
    number: "02",
    slug: "flowstate-ai",
    name: "Flowstate AI",
    type: "Workflow automation · Product UI",
    status: "Product concept",
    description:
      "A visual workspace for connecting AI-enabled steps, shaping a workflow, and following each run.",
    challenge:
      "Make workflow automation understandable as a sequence people can see and adjust, rather than a hidden chain of configuration.",
    approach:
      "Use a canvas-first editor supported by templates, a node inspector, run history, and an overview that keeps workflow health visible.",
    solution:
      "A React application with a dashboard, reusable workflow templates, an interactive node canvas, execution views, integrations, and settings. The editor supports moving and connecting nodes, zooming and panning, and save/undo/redo controls.",
    highlights: [
      "Visual node-and-edge workflow editor",
      "Dashboard for workflows, runs, success rate, and token usage",
      "Run history, templates, integrations, and settings views",
      "Keyboard-assisted editing and persistent client-side state",
    ],
    stack: ["React", "TypeScript", "Vite", "Zustand", "Lucide"],
    art: "flowstate",
    visitUrl: "https://ai-workflow-theta-flax.vercel.app",
  },
  {
    number: "03",
    slug: "process-strength-analyzer",
    name: "Process Strength Analyzer",
    type: "Developer tools · Desktop web",
    status: "Live project",
    description:
      "A read-only workstation for understanding running processes, system resources, and local network activity.",
    challenge:
      "Bring system signals into one place without hiding how they are collected or overstating what heuristic observations mean.",
    approach:
      "Keep collection read-only, show the evidence behind review levels, and make process, tree, network, event, and settings views available from one interface.",
    solution:
      "A React and TypeScript client paired with an Express API. The application charts recent host metrics, explores processes and connections, and reports transparent NORMAL, REVIEW, or ELEVATED observations—not malware verdicts.",
    highlights: [
      "CPU, memory, disk, and network overview with recent history",
      "Searchable process explorer and parent/child process tree",
      "TCP/UDP connection view and per-process detail",
      "Transparent heuristic thresholds and recommendations",
    ],
    stack: ["React", "TypeScript", "Vite", "Express", "Recharts"],
    art: "process-analyzer",
    visitUrl: "https://client-ruddy-psi.vercel.app",
  },
  {
    number: "04",
    slug: "clientflow",
    name: "ClientFlow",
    type: "Recruitment intelligence · SaaS",
    status: "In development",
    description:
      "An evidence-led recruitment workspace designed to help people make better-informed hiring decisions.",
    challenge:
      "Bring candidate information together without turning an assistive tool into an opaque ranking or automated hiring decision.",
    approach:
      "Keep people in control and make evidence traceable: resume, portfolio, and public GitHub observations are organized by source, with claims grounded in their supporting text.",
    solution:
      "An evolving recruitment intelligence product with candidate and job workspaces, resume analysis, portfolio and public GitHub intelligence, and a unified evidence feed. The product is designed to support—not automate—human hiring decisions.",
    highlights: [
      "Candidate workspace for resumes, portfolios, and public GitHub profiles",
      "Evidence feed with source provenance and verbatim excerpts",
      "Requirement-focused review rather than candidate ranking",
      "AI-assisted analysis with grounding and transparent limitations",
    ],
    stack: ["React", "TypeScript", "FastAPI", "PostgreSQL", "OpenAI-compatible AI"],
    art: "clientflow",
    visitUrl: "https://clientflow-arnavkwatra20s-projects.vercel.app",
  },
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}

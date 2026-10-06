export interface Project {
  id: string;
  title: string;
  category: "Fullstack" | "Webdev" | "UI/UX" | "Graphic Design";
  description: string;
  tags: string[];
  liveUrl?: string;
  githubUrl?: string;
  caseStudyUrl?: string;
  featured: boolean;
  index: number;
  architecture?: string;
  platform?: string;
  role?: string;
  problem?: string;
  solution?: string;
  flowSteps?: string[];
  deliverables?: string[];
  colors?: { hex: string; name: string }[];
}

export interface SkillGroup {
  category: string;
  items: string[];
}

export interface ExperienceItem {
  period: string;
  role: string;
  company: string;
  description: string;
  tags: string[];
}

export const personal = {
  name: "Adham Baskara",
  initials: "AB",
  title: "Fullstack Developer & UI/UX Designer",
  summary:
    "7th-semester Informatics Engineering student at Polinema and Fullstack Developer Intern at PT. Multi Spunindo Jaya Tbk. Building web applications and enterprise systems with engineering precision and visual clarity.",
  availability: "Fullstack Intern @ PT. Multi Spunindo Jaya Tbk (through Dec 2026)",
  location: "Indonesia",
  email: "adhambaskara.dev@gmail.com",
  github: "https://github.com/adhambaskara",
  linkedin: "https://linkedin.com/in/adhambaskara",
  dribbble: "https://dribbble.com/adhambaskara",
  behance: "https://behance.net/adhambaskara",
};

export const disciplines: {
  number: string;
  title: string;
  description: string;
}[] = [
  {
    number: "01",
    title: "Fullstack Engineering",
    description:
      "Modern web architecture and enterprise systems using Next.js, Laravel, TypeScript, PHP, and relational databases. From schema design to deployment.",
  },
  {
    number: "02",
    title: "UI/UX & Product Design",
    description:
      "Wireframes, user flows, and interactive prototypes in Figma. Structured design systems for analytical dashboards and operational platforms.",
  },
  {
    number: "03",
    title: "Graphic & Brand Identity",
    description:
      "Visual identity systems: vector logos, typography guidelines, and coherent asset libraries crafted for lasting impact.",
  },
];

export const projects: Project[] = [
  {
    id: "msj-erp-finance",
    title: "MSJ ERP Finance",
    category: "Fullstack",
    description:
      "Enterprise ERP Finance system for PT. Multi Spunindo Jaya Tbk. Engineered modules for financial analytics, automatic reconciliation, multi-tier approval workflows, and tax invoicing.",
    tags: ["Laravel 11", "PHP 8.2", "MySQL", "Blade", "RESTful API", "Tailwind CSS"],
    caseStudyUrl: "https://example.com/msj-erp-finance",
    liveUrl: "https://example.com/msj-demo",
    featured: true,
    index: 1,
    architecture: "Layered MVC with Repository Pattern, queued jobs for batch reconciliations, and RBAC security gates.",
    role: "Fullstack Developer Intern",
  },
  {
    id: "aura-creative-studio",
    title: "Aura Creative Studio",
    category: "Fullstack",
    description:
      "High-performance agency platform featuring a headless dynamic portfolio showcase, fluid GSAP layout timelines, and responsive media CDN pipelines.",
    tags: ["Next.js 14", "TypeScript", "GSAP ScrollTrigger", "Prisma", "PostgreSQL"],
    liveUrl: "https://example.com/aura",
    githubUrl: "https://github.com/adhambaskara/aura-studio",
    featured: true,
    index: 2,
    architecture: "Next.js App Router with Server Components for static generation and client-side GSAP choreographies.",
    role: "Lead Frontend & Motion Architect",
  },
  {
    id: "devmetrics-api-platform",
    title: "DevMetrics API Platform",
    category: "Fullstack",
    description:
      "Developer portal for monitoring API latency metrics, managing JWT team access tokens, and inspecting live traffic logs with chart analytics.",
    tags: ["Next.js", "Node.js", "PostgreSQL", "Chart.js", "Tailwind CSS"],
    liveUrl: "https://example.com/devmetrics",
    githubUrl: "https://github.com/adhambaskara/devmetrics",
    featured: false,
    index: 3,
    architecture: "REST API telemetry collector with WebSocket log streams and automated token expiry cron handlers.",
    role: "Fullstack Engineer",
  },
  {
    id: "zenith-ecommerce",
    title: "Zenith E-Commerce",
    category: "Webdev",
    description:
      "Minimalist e-commerce interface with instant faceted filtering, persistent basket state, and integrated Stripe checkout webhooks.",
    tags: ["React", "Next.js", "Stripe API", "Zustand", "Tailwind CSS"],
    liveUrl: "https://example.com/zenith",
    githubUrl: "https://github.com/adhambaskara/zenith-store",
    featured: true,
    index: 4,
    architecture: "Optimistic cart mutations with Zustand, serverless edge route handlers for payment capture.",
    role: "Frontend Developer",
  },
  {
    id: "pulse-saas-analytics",
    title: "Pulse SaaS Analytics",
    category: "UI/UX",
    description:
      "Comprehensive design system for analytical dashboards. Authored 45+ atomic components, tokenized dark/light modes, and interactive data widgets.",
    tags: ["Figma", "Design System", "WCAG AA", "User Research", "Prototyping"],
    platform: "Web dashboard",
    caseStudyUrl: "https://example.com/pulse-case-study",
    featured: true,
    index: 5,
    problem: "Financial analysts were slowed down by fragmented tabular reports and lack of contrast in dense dashboards.",
    solution: "Structured a high-contrast Swiss typography hierarchy, data density modes, and one-click export shortcuts.",
    flowSteps: [
      "User Context Mapping",
      "Information Hierarchy Architecture",
      "Tokenized Component Library in Figma",
      "Interactive High-Fidelity Prototype",
    ],
  },
  {
    id: "nova-mobile-banking",
    title: "Nova Mobile Banking",
    category: "UI/UX",
    description:
      "iOS banking interface centered on peer-to-peer transfers, intuitive cashflow breakdowns, and accessible thumb-zone navigation.",
    tags: ["Figma", "iOS HIG", "Micro-Interactions", "User Journey", "Wireframing"],
    platform: "iOS app",
    caseStudyUrl: "https://example.com/nova-banking",
    featured: false,
    index: 6,
    problem: "Young users found traditional mobile banking apps cluttered, intimidating, and slow for rapid daily transfers.",
    solution: "Designed a 2-tap quick transfer flow with contextual haptics, clear fee transparency, and visual budgeting rings.",
    flowSteps: [
      "Competitive Fintech Benchmarking",
      "Thumb-Zone Architecture & Low-Fi Sketches",
      "Design System Tokens & Accessibility Checks",
      "Usability Testing with Target Users",
    ],
  },
  {
    id: "kroma-brand-identity",
    title: "Kroma Brand Identity",
    category: "Graphic Design",
    description:
      "Visual identity system for an indie game studio: custom geometric logomark, expressive display typography, color palettes, and stationery.",
    tags: ["Adobe Illustrator", "Brand Identity", "Typography", "Vector Guidelines"],
    caseStudyUrl: "https://example.com/kroma-brand",
    featured: true,
    index: 7,
    deliverables: [
      "Primary Vector Logomark & Monogram",
      "Swiss Grotesque Typography Standards",
      "Color Spec System (Hex / CMYK / Pantone)",
      "Stationery, Business Collateral & Merch",
    ],
    colors: [
      { hex: "#0f0f0f", name: "Deep Ink" },
      { hex: "#f5f5f5", name: "Canvas Mist" },
      { hex: "#ff3b30", name: "Signal Vermilion" },
      { hex: "#5c5c5c", name: "Graphite" },
    ],
  },
  {
    id: "atelier-editorial-type",
    title: "Atelier Typographic Posters",
    category: "Graphic Design",
    description:
      "Experimental Swiss typographic poster series exploring asymmetric grid systems, micro-typography, and high-contrast editorial hierarchy.",
    tags: ["Adobe Illustrator", "Photoshop", "Swiss Graphic Design", "Print & Poster"],
    caseStudyUrl: "https://example.com/atelier-posters",
    featured: false,
    index: 8,
    deliverables: [
      "Modular 12-Column Grid System Exploration",
      "Experimental Kerning & Negative Space Study",
      "Limited-Edition Silkscreen Print Format (A1)",
      "Digital Editorial Showcase Assets",
    ],
    colors: [
      { hex: "#121212", name: "Matte Black" },
      { hex: "#f4f3ef", name: "Warm Parchment" },
      { hex: "#d9381e", name: "Bauhaus Rust" },
      { hex: "#8c8c8c", name: "Concrete Grey" },
    ],
  },
];

export const skillGroups: SkillGroup[] = [
  {
    category: "Frontend",
    items: [
      "React",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Blade Template",
      "HTML5 / Modern CSS",
      "Responsive Design",
    ],
  },
  {
    category: "Backend & Systems",
    items: [
      "Laravel",
      "PHP",
      "MySQL",
      "PostgreSQL",
      "Node.js",
      "REST API",
      "Prisma",
      "Supabase",
    ],
  },
  {
    category: "Design & Workflow",
    items: [
      "Figma",
      "Adobe Illustrator",
      "Adobe Photoshop",
      "Design Systems",
      "Git & GitHub",
      "ERP Architecture",
      "CI/CD",
    ],
  },
];

export const experiences: ExperienceItem[] = [
  {
    period: "Jul 2026 : Dec 2026",
    role: "Fullstack Developer Intern",
    company: "PT. Multi Spunindo Jaya Tbk",
    description:
      "Six-month compulsory university internship as a Fullstack Developer. Responsible for engineering internal enterprise ERP Finance modules, designing database schemas, integrating REST APIs, and building secure financial analytics dashboards.",
    tags: ["Laravel", "PHP", "MySQL", "Blade", "ERP Systems", "REST API"],
  },
  {
    period: "2023 : Present",
    role: "B.A.Sc. in Informatics Engineering (7th Semester)",
    company: "State Polytechnic of Malang (Polinema)",
    description:
      "Studying software engineering at the Department of Information Technology, Informatics Engineering program. Focused on software development, relational database systems, algorithms, and production-grade web interfaces.",
    tags: ["Informatics Engineering", "Software Engineering", "Fullstack", "UI/UX"],
  },
  {
    period: "2024 : 2026",
    role: "Freelance Web Developer & UI Designer",
    company: "Independent",
    description:
      "Designed and developed web applications for clients, created interactive landing pages with Next.js and GSAP animations, and authored structured design systems in Figma.",
    tags: ["Next.js", "TypeScript", "GSAP", "Figma", "Design Systems"],
  },
];

/* Marquee ticker content : duplicated in Marquee.tsx for seamless loop */
export const marqueeItems = [
  "Laravel",
  "PHP",
  "MySQL",
  "Next.js",
  "React",
  "TypeScript",
  "GSAP & ScrollTrigger",
  "Figma",
  "UI/UX Design",
  "Design Systems",
  "Node.js",
  "PostgreSQL",
  "Tailwind CSS",
  "ERP Systems",
  "Fullstack Development",
];

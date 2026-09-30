export interface Project {
  id: string;
  title: string;
  category: "Fullstack" | "Webdev" | "UI/UX" | "Graphic Design";
  description: string;
  tags: string[];
  image: string;
  liveUrl?: string;
  githubUrl?: string;
  caseStudyUrl?: string;
  featured: boolean;
  index: number;
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
      "Enterprise ERP Finance system for PT. Multi Spunindo Jaya Tbk. Features financial analytics dashboards, transaction reconciliation, role-based access control, and automated reporting.",
    tags: ["Laravel", "PHP", "MySQL", "Blade", "REST API", "Tailwind CSS"],
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
    caseStudyUrl: "https://example.com/msj-erp-finance",
    featured: true,
    index: 1,
  },
  {
    id: "aura-creative-studio",
    title: "Aura Creative Studio",
    category: "Fullstack",
    description:
      "Creative agency web platform featuring an integrated CMS, dynamic portfolio showcase, and page transitions built with GSAP Timelines.",
    tags: ["Next.js", "TypeScript", "GSAP", "Prisma", "PostgreSQL"],
    image:
      "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80",
    liveUrl: "https://example.com/aura",
    githubUrl: "https://github.com/example/aura-studio",
    featured: true,
    index: 2,
  },
  {
    id: "pulse-saas-analytics",
    title: "Pulse SaaS Analytics",
    category: "UI/UX",
    description:
      "Dashboard design system for financial analytics platforms. Includes 40+ custom components, dark mode tokens, and structured micro-interactions.",
    tags: ["Figma", "Design System", "Prototyping", "User Research"],
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
    caseStudyUrl: "https://example.com/pulse-case-study",
    featured: true,
    index: 3,
  },
  {
    id: "zenith-ecommerce",
    title: "Zenith E-Commerce",
    category: "Webdev",
    description:
      "Modern e-commerce storefront with instant catalog filtering, interactive cart state transitions, and high performance.",
    tags: ["React", "Next.js", "Stripe API", "GSAP ScrollTrigger"],
    image:
      "https://images.unsplash.com/photo-1600132806370-bf17e65e942f?auto=format&fit=crop&w=1200&q=80",
    liveUrl: "https://example.com/zenith",
    githubUrl: "https://github.com/example/zenith-store",
    featured: true,
    index: 4,
  },
  {
    id: "kroma-brand-identity",
    title: "Kroma Brand Identity",
    category: "Graphic Design",
    description:
      "Visual identity system for an indie game studio: vector logomark, custom typography, color palette tokens, and brand documentation.",
    tags: ["Adobe Illustrator", "Brand Identity", "Typography", "Vector"],
    image:
      "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80",
    caseStudyUrl: "https://example.com/kroma-brand",
    featured: false,
    index: 5,
  },
  {
    id: "nova-mobile-banking",
    title: "Nova Mobile Banking",
    category: "UI/UX",
    description:
      "Digital banking interface concept focused on peer-to-peer transfers, intuitive spending breakdowns, and accessible interactions.",
    tags: ["Figma", "Mobile UI", "User Research", "Interaction Design"],
    image:
      "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=1200&q=80",
    caseStudyUrl: "https://example.com/nova-banking",
    featured: false,
    index: 6,
  },
  {
    id: "devmetrics-api-platform",
    title: "DevMetrics API Platform",
    category: "Fullstack",
    description:
      "Developer portal for monitoring API performance, real-time latency logs, and team token management with data visualization charts.",
    tags: ["Next.js", "Node.js", "Chart.js", "PostgreSQL"],
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
    liveUrl: "https://example.com/devmetrics",
    githubUrl: "https://github.com/example/devmetrics",
    featured: false,
    index: 7,
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
    category: "Motion & Interaction",
    items: [
      "GSAP",
      "ScrollTrigger",
      "CSS Animations",
      "Micro-interactions",
      "Framer Motion",
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

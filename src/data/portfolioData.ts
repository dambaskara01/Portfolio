export interface DevProject {
  id: string;
  index: string;
  title: string;
  tag: string;
  client: string;
  year: string;
  image: string;
  previewColor: string;
  stack: string[];
  links: {
    live?: string;
    github?: string;
  };
  overview: {
    en: string;
    id: string;
  };
  architecture: {
    en: string;
    id: string;
  };
  metrics: {
    en: string;
    id: string;
  };
}

export const developmentProjects: DevProject[] = [
  {
    id: "msj-erp",
    index: "01",
    title: "MSJ ERP Finance",
    tag: "[CLIENT WORK]",
    client: "PT. Multi Spunindo Jaya Tbk",
    year: "2024",
    image: "/images/engineering/msj-erp.jpg",
    previewColor: "#1c1d20",
    stack: ["Laravel 11", "PHP 8.2", "MySQL", "RESTful API"],
    links: {
      live: "https://multispunindo.com",
      github: "https://github.com/adhambaskara/msj-erp-finance",
    },
    overview: {
      en: "Enterprise financial ledger, automated bank reconciliation, and multi-tier approval system for manufacturing.",
      id: "Sistem buku besar finansial menyeluruh, rekonsiliasi otomatis, dan approval berjenjang untuk manufaktur industri.",
    },
    architecture: {
      en: "Optimized indexing for high-volume transactions, automated reconciliation batching, and granular RBAC security.",
      id: "Optimalisasi indeks database untuk jutaan transaksi, rekonsiliasi batch otomatis, serta hak akses RBAC.",
    },
    metrics: {
      en: "99.82% reconciliation match · 42ms query latency",
      id: "99.82% kecocokan rekonsiliasi · Latensi query 42ms",
    },
  },
  {
    id: "aura-studio",
    index: "02",
    title: "Aura Creative Studio",
    tag: "[CLIENT WORK]",
    client: "Aura Design Network",
    year: "2025",
    image: "/images/engineering/aura-studio.jpg",
    previewColor: "#273b33",
    stack: ["Next.js 14", "TypeScript", "GSAP ScrollTrigger"],
    links: {
      live: "https://aura-studio-demo.vercel.app",
      github: "https://github.com/adhambaskara/aura-studio",
    },
    overview: {
      en: "High-performance agency portfolio with buttery smooth choreographies and spatial layout transitions.",
      id: "Showcase agensi digital dengan koreografi motion fluid dan transisi tata letak spasial.",
    },
    architecture: {
      en: "Headless Next.js App Router with GPU-accelerated motion choreography and zero-CLS image pipeline.",
      id: "Next.js App Router dengan akselerasi GPU, pipeline responsif zero-CLS, dan transisi instan.",
    },
    metrics: {
      en: "100 Lighthouse Performance · 60fps GPU frame rate",
      id: "100 Lighthouse Performance · 60fps frame rate GPU",
    },
  },
  {
    id: "devmetrics",
    index: "03",
    title: "DevMetrics Platform",
    tag: "[OPEN SOURCE]",
    client: "Developer Tooling",
    year: "2024",
    image: "/images/engineering/devmetrics.jpg",
    previewColor: "#c8c8c6",
    stack: ["Next.js", "Node.js", "PostgreSQL", "WebSockets"],
    links: {
      live: "https://devmetrics-telemetry.vercel.app",
      github: "https://github.com/adhambaskara/devmetrics-platform",
    },
    overview: {
      en: "Developer telemetry suite providing real-time endpoint latency observability and error tracing.",
      id: "Platform telemetri pengembang untuk pemantauan latensi API real-time dan pelacakan galat.",
    },
    architecture: {
      en: "Real-time WebSocket streaming with PostgreSQL read-replicas and rate-limiting circuit breakers.",
      id: "Streaming WebSocket real-time dengan replika baca PostgreSQL dan circuit breaker rate-limit.",
    },
    metrics: {
      en: "14M+ events ingested · 18.4ms P95 latency",
      id: "14Jt+ event terproses · Latensi 18.4ms P95",
    },
  },
  {
    id: "zenith-store",
    index: "04",
    title: "Zenith Minimal Apparel",
    tag: "[CLIENT WORK]",
    client: "Independent Brand",
    year: "2024",
    image: "/images/engineering/zenith-store.png",
    previewColor: "#d34b26",
    stack: ["React 19", "Next.js", "Zustand", "Stripe API"],
    links: {
      live: "https://zenith-store-minimal.vercel.app",
      github: "https://github.com/adhambaskara/zenith-commerce",
    },
    overview: {
      en: "Editorial e-commerce platform built around Swiss typographic principles with instant filtering.",
      id: "Platform e-commerce bergaya editorial Swiss dengan prinsip tipografi dan filter produk instan.",
    },
    architecture: {
      en: "Stateless cart state management via Zustand and Stripe webhook event pipelines.",
      id: "Manajemen keranjang via Zustand, integrasi Stripe webhook, dan katalog teroptimasi.",
    },
    metrics: {
      en: "Sub-50ms faceted filter · 100% strict TypeScript",
      id: "Filter produk sub-50ms · 100% strict TypeScript",
    },
  },
  {
    id: "polinema-portal",
    index: "05",
    title: "Polinema Academic Hub",
    tag: "[ACADEMIC]",
    client: "Politeknik Negeri Malang",
    year: "2023",
    image: "/images/engineering/msj-erp.png",
    previewColor: "#e5c2c0",
    stack: ["Laravel", "Vue.js", "MySQL", "Tailwind CSS"],
    links: {
      live: "https://polinema.ac.id",
      github: "https://github.com/adhambaskara/academic-hub",
    },
    overview: {
      en: "Integrated academic scheduling and curriculum tracking system for university departments.",
      id: "Sistem penjadwalan akademik terpadu dan pelacakan kurikulum jurusan teknik informatika.",
    },
    architecture: {
      en: "Role-based academic workflow automation with conflict-detection scheduling algorithms.",
      id: "Otomasi alur kerja akademik berbasis peran dengan algoritma pendeteksi konflik jadwal.",
    },
    metrics: {
      en: "2,400+ active students · Zero scheduling conflicts",
      id: "2.400+ mahasiswa aktif · Nol konflik penjadwalan",
    },
  },
  {
    id: "motion-lab",
    index: "06",
    title: "Kinetic Motion Lab",
    tag: "[EXPERIMENT]",
    client: "Research & Development",
    year: "2025",
    image: "/images/engineering/aura-studio.png",
    previewColor: "#223b82",
    stack: ["WebGL", "Three.js", "GSAP", "TypeScript"],
    links: {
      live: "https://motion-lab.vercel.app",
      github: "https://github.com/adhambaskara/motion-lab",
    },
    overview: {
      en: "Interactive laboratory exploring kinetic physics, SVG warp effects, and GPU spring animations.",
      id: "Laboratorium eksplorasi fisika kinetik, efek distorsi SVG, dan animasi spring GPU.",
    },
    architecture: {
      en: "Custom GLSL fragment shaders combined with variable font axis morphing.",
      id: "Custom GLSL fragment shader yang dipadukan dengan modulasi aksis font variabel.",
    },
    metrics: {
      en: "60fps steady WebGL · Lightweight 24kb bundle",
      id: "60fps WebGL stabil · Bundle ringan 24kb",
    },
  },
  {
    id: "kinetix-audio",
    index: "07",
    title: "Kinetix Sound Engine",
    tag: "[PERSONAL]",
    client: "Audio Tooling",
    year: "2024",
    image: "/images/engineering/devmetrics.png",
    previewColor: "#b87e42",
    stack: ["Web Audio API", "Canvas", "React"],
    links: {
      live: "https://kinetix-audio.vercel.app",
      github: "https://github.com/adhambaskara/kinetix-audio",
    },
    overview: {
      en: "Browser-based parametric synthesizer and visual spectrum analyzer with real-time audio routing.",
      id: "Synthesizer parametrik dan penganalisis spektrum audio berbasis browser secara real-time.",
    },
    architecture: {
      en: "Low-latency Web Audio buffer scheduling and dual-channel oscilloscope canvas rendering.",
      id: "Penjadwalan buffer audio latensi rendah dan rendering visualizer osiloskop canvas.",
    },
    metrics: {
      en: "<12ms audio buffer latency · 128-band FFT",
      id: "Latensi audio <12ms · Analisis FFT 128-band",
    },
  },
];

export interface EngineeringShowcaseData {
  id?: string;
  title: string;
  category: string;
  tagline: string;
  cta: {
    label: string;
    url: string;
  };
  visual: {
    baseColor: string;
    auraColors: string[];
  };
  links: {
    label: string;
    url: string;
  }[];
  meta: {
    year: string;
    status: string;
  };
}

export const engineeringShowcaseProjects: EngineeringShowcaseData[] = [
  {
    id: "project-1",
    title: "Project 1 Name",
    category: "Project Category",
    tagline: "High-impact engineering tagline / core architectural proposition",
    cta: {
      label: "Explore Project",
      url: "https://github.com",
    },
    visual: {
      baseColor: "#f7b733",
      auraColors: [
        "rgba(138, 160, 204, 0.95)",
        "rgba(214, 52, 92, 0.94)",
        "rgba(238, 92, 42, 0.98)",
        "rgba(254, 206, 56, 0.98)",
        "rgba(246, 140, 48, 0.9)",
      ],
    },
    links: [
      { label: "GitHub Repo", url: "https://github.com" },
      { label: "Live Demo", url: "https://example.com" },
      { label: "Architecture Spec", url: "#" },
    ],
    meta: {
      year: "2026",
      status: "Production Ready",
    },
  },
  {
    id: "project-2",
    title: "Project 2 Name",
    category: "Distributed Systems",
    tagline: "High-throughput asynchronous event pipeline & low-latency data streaming",
    cta: {
      label: "Explore Project",
      url: "https://github.com",
    },
    visual: {
      baseColor: "#1d2671",
      auraColors: [
        "rgba(75, 108, 183, 0.95)",
        "rgba(24, 90, 157, 0.94)",
        "rgba(86, 204, 242, 0.98)",
        "rgba(47, 128, 237, 0.98)",
        "rgba(44, 62, 80, 0.9)",
      ],
    },
    links: [
      { label: "GitHub Repo", url: "https://github.com" },
      { label: "Live Demo", url: "https://example.com" },
      { label: "Architecture Spec", url: "#" },
    ],
    meta: {
      year: "2026",
      status: "Production Ready",
    },
  },
  {
    id: "project-3",
    title: "Project 3 Name",
    category: "Machine Learning & Ops",
    tagline: "Autonomous model orchestration, real-time edge inference & telemetry pipeline",
    cta: {
      label: "Explore Project",
      url: "https://github.com",
    },
    visual: {
      baseColor: "#0f2027",
      auraColors: [
        "rgba(32, 58, 67, 0.95)",
        "rgba(44, 83, 100, 0.94)",
        "rgba(0, 176, 155, 0.98)",
        "rgba(150, 201, 61, 0.98)",
        "rgba(17, 30, 37, 0.9)",
      ],
    },
    links: [
      { label: "GitHub Repo", url: "https://github.com" },
      { label: "Live Demo", url: "https://example.com" },
      { label: "Architecture Spec", url: "#" },
    ],
    meta: {
      year: "2026",
      status: "Production Ready",
    },
  },
];

// Backwards compatibility alias for single project consumers
export const engineeringShowcaseProject = engineeringShowcaseProjects[0];

export const portfolioData = {
  bio: {
    name: "Adham Baskara",
    role: "Fullstack Developer & UI/UX Designer",
    location: "Malang, Indonesia",
    status: "Available for Projects",
  },
  skills: [
    "Next.js",
    "React 19",
    "TypeScript",
    "GSAP",
    "Node.js",
    "Laravel",
    "MySQL",
    "PostgreSQL",
    "Figma",
  ],
  projects: developmentProjects,
  experience: [
    {
      company: "PT. Multi Spunindo Jaya Tbk",
      role: "Fullstack Web Developer",
      period: "2024 — Present",
    },
  ],
  contact: {
    email: "adhambaskara@gmail.com",
    github: "https://github.com/adhambaskara",
    linkedin: "https://linkedin.com/in/adhambaskara",
  },
} as const;

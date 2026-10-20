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

export interface EngineeringShowcaseData {
  id?: string;
  title: string;
  category: string;
  tagline: string;
  cta: {
    label: string;
    url: string;
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
    tagline:
      "High-throughput asynchronous event pipeline & low-latency data streaming",
    cta: {
      label: "Explore Project",
      url: "https://github.com",
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
    tagline:
      "Autonomous model orchestration, real-time edge inference & telemetry pipeline",
    cta: {
      label: "Explore Project",
      url: "https://github.com",
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

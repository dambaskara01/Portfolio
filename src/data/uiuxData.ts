export interface UIUXProject {
  id: string;
  title: string;
  category: string;
  year: string;
  color: string;
  href?: string;
  summary: {
    en: string;
    id: string;
  };
}

export const uiuxProjects: UIUXProject[] = [
  {
    id: "aura-design-system",
    title: "Aura Design System",
    category: "Design System & Tokens",
    year: "2025",
    color: "#2a2d34",
    href: "#aura-design-system",
    summary: {
      en: "Multi-brand design system architecture with tokenized spatial hierarchy and accessible components.",
      id: "Arsitektur design system multi-brand dengan hierarki token spasial dan komponen aksesibel.",
    },
  },
  {
    id: "zenith-fintech",
    title: "Zenith Capital Banking",
    category: "Mobile Banking App",
    year: "2024",
    color: "#1f2a44",
    href: "#zenith-fintech",
    summary: {
      en: "Frictionless wealth management and institutional transfer experience for modern fintech users.",
      id: "Pengalaman manajemen portofolio aset dan transfer perbankan tanpa hambatan untuk pengguna fintech.",
    },
  },
  {
    id: "lumina-creator-hub",
    title: "Lumina Studio",
    category: "Web Application",
    year: "2024",
    color: "#283b32",
    href: "#lumina-creator-hub",
    summary: {
      en: "Spatial canvas interface for digital creators with non-destructive node-based audio-visual editing.",
      id: "Antarmuka kanvas spasial untuk kreator digital dengan sistem editing node-based non-destruktif.",
    },
  },
  {
    id: "strata-supply-chain",
    title: "Strata Logistics OS",
    category: "Enterprise Dashboard",
    year: "2024",
    color: "#3a2e2b",
    href: "#strata-supply-chain",
    summary: {
      en: "Real-time freight telemetry monitoring platform reducing decision latency by 68%.",
      id: "Platform pemantauan telemetri logistik real-time yang memangkas latensi keputusan hingga 68%.",
    },
  },
  {
    id: "kura-health-tracker",
    title: "Kura Health Intelligence",
    category: "iOS Health Kit",
    year: "2023",
    color: "#2c3e50",
    href: "#kura-health-tracker",
    summary: {
      en: "Biometric analysis and habit formation companion designed with human-centric micro-interactions.",
      id: "Aplikasi pendamping analisis biometrik dan kebiasaan sehat dengan mikro-interaksi humanis.",
    },
  },
  {
    id: "prism-editorial-reader",
    title: "Prism Longform Reader",
    category: "Digital Publication",
    year: "2023",
    color: "#33313b",
    href: "#prism-editorial-reader",
    summary: {
      en: "High-focus typography engine for longform cultural journalism and archival research.",
      id: "Mesin baca tipografi fokus tinggi untuk jurnalisme mendalam dan riset arsip budaya.",
    },
  },
];

"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects, type Project } from "@/data/portfolioData";
import ProjectCover from "./ProjectCover";
import ProjectModal from "./ProjectModal";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const TONES = [
  { background: "#0f0f0f", foreground: "#fafafa" },
  { background: "#e6e6e6", foreground: "#0f0f0f" },
  { background: "#2b2b2b", foreground: "#fafafa" },
  { background: "#bdbdbd", foreground: "#0f0f0f" },
];

const pad = (n: number) => String(n).padStart(2, "0");

const PROJECT_IMAGES: Record<string, string> = {
  "msj-erp-finance": "/images/engineering/msj-erp.png",
  "aura-creative-studio": "/images/engineering/aura-studio.png",
  "devmetrics-api-platform": "/images/engineering/devmetrics.png",
  "zenith-ecommerce": "/images/engineering/zenith-store.png",
};

interface LandscapeCard {
  id: string;
  projectId: string;
  title: string;
  badge: string;
  image: string;
  bgFallback: string;
  colIndex: number;
  isApex?: boolean;
}

// 7 Landscape System Screenshot Cards forming a curved crescent arc towards "Selected works"
const LANDSCAPE_CARDS: LandscapeCard[] = [
  // Column 1 (Outer Left curve)
  {
    id: "card-msj-ledger",
    projectId: "msj-erp-finance",
    title: "MSJ ERP Finance - Ledger",
    badge: "MSJ ERP // Finance Analytics",
    colIndex: 1,
    image: PROJECT_IMAGES["msj-erp-finance"],
    bgFallback: "linear-gradient(135deg, #18191c 0%, #0d0e10 100%)",
  },
  {
    id: "card-zenith-catalog",
    projectId: "zenith-ecommerce",
    title: "Zenith E-Commerce - Store",
    badge: "Zenith Store // Faceted Catalog",
    colIndex: 1,
    image: PROJECT_IMAGES["zenith-ecommerce"],
    bgFallback: "linear-gradient(135deg, #1c1c20 0%, #0f1012 100%)",
  },

  // Column 2 (Mid-Left curve)
  {
    id: "card-aura-motion",
    projectId: "aura-creative-studio",
    title: "Aura Studio - Timelines",
    badge: "Aura Studio // Motion Timelines",
    colIndex: 2,
    image: PROJECT_IMAGES["aura-creative-studio"],
    bgFallback: "linear-gradient(135deg, #1e1b18 0%, #100f0d 100%)",
  },
  {
    id: "card-devmetrics-auth",
    projectId: "devmetrics-api-platform",
    title: "DevMetrics - Gateway",
    badge: "DevMetrics // JWT Security Gateway",
    colIndex: 2,
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
    bgFallback: "linear-gradient(135deg, #101620 0%, #0a0d14 100%)",
  },

  // Column 3 (Inner curve approaching apex)
  {
    id: "card-devmetrics-telemetry",
    projectId: "devmetrics-api-platform",
    title: "DevMetrics - Telemetry",
    badge: "DevMetrics // Telemetry Stream",
    colIndex: 3,
    image: PROJECT_IMAGES["devmetrics-api-platform"],
    bgFallback: "linear-gradient(135deg, #121822 0%, #0b0f16 100%)",
  },
  {
    id: "card-msj-batch",
    projectId: "msj-erp-finance",
    title: "MSJ ERP Finance - Queue",
    badge: "MSJ ERP // Batch Pipeline",
    colIndex: 3,
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
    bgFallback: "linear-gradient(135deg, #161b17 0%, #0c0f0d 100%)",
  },

  // Column 4 (Apex Hero Card, extending rightmost into the center)
  {
    id: "card-aura-apex",
    projectId: "aura-creative-studio",
    title: "Aura Creative Studio - Hero",
    badge: "Aura Studio // Architecture Platform",
    colIndex: 4,
    isApex: true,
    image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80",
    bgFallback: "linear-gradient(135deg, #242220 0%, #141311 100%)",
  },
];

export default function Engineering() {
  const engProjects = projects.filter(
    (p) => p.category === "Fullstack" || p.category === "Webdev"
  );

  const containerRef = useRef<HTMLElement>(null);
  const clusterRef = useRef<HTMLDivElement>(null);
  const [selectedId, setSelectedId] = useState(engProjects[0]?.id ?? "");
  const [open, setOpen] = useState(false);

  const selectedIndex = Math.max(
    engProjects.findIndex((p) => p.id === selectedId),
    0
  );
  const selected: Project = engProjects[selectedIndex] ?? engProjects[0];

  const openProject = (id: string) => {
    setSelectedId(id);
    setOpen(true);
  };

  useGSAP(
    () => {
      // Smooth entrance animation for the curved arc of columns
      gsap.fromTo(
        ".eng-col",
        { opacity: 0, y: 36 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.08,
          duration: 0.85,
          ease: "power3.out",
          scrollTrigger: { trigger: ".eng-layout", start: "top 80%" },
        }
      );

      // Selected works title arrival
      gsap.fromTo(
        ".eng-title",
        { opacity: 0, x: 24 },
        {
          opacity: 1,
          x: 0,
          duration: 0.85,
          ease: "power3.out",
          scrollTrigger: { trigger: ".eng-layout", start: "top 80%" },
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <section
      id="engineering"
      ref={containerRef}
      className="eng-section"
      aria-label="Engineering selected works"
    >
      <div className="eng-container">
        <div className="eng-layout">
          {/* Left: Curved Overlapping Arc of Landscape Cards */}
          <div className="eng-arc-viewport">
            <div ref={clusterRef} className="eng-arc-cluster" role="list">
              {[1, 2, 3, 4].map((colNum) => {
                const colCards = LANDSCAPE_CARDS.filter((c) => c.colIndex === colNum);
                return (
                  <div key={colNum} className={`eng-col eng-col--${colNum}`}>
                    {colCards.map((c) => (
                      <button
                        key={c.id}
                        type="button"
                        className={`eng-card ${c.isApex ? "eng-card--apex" : ""}`}
                        aria-label={`View ${c.title}`}
                        onClick={() => openProject(c.projectId)}
                      >
                        <div
                          className="eng-card__inner"
                          style={{ background: c.bgFallback }}
                        >
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={c.image}
                            alt={c.title}
                            loading="lazy"
                            className="eng-card__img"
                            onError={(e) => {
                              // If image fails, keep rich dark gradient fallback
                              (e.target as HTMLElement).style.display = "none";
                            }}
                          />
                          <span className="eng-card__badge">{c.badge}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: Selected Works Heading in Swiss Pitch Black */}
          <div className="eng-title-pane">
            <h2 className="eng-title">Selected works</h2>
          </div>
        </div>
      </div>

      {/* Project Detail Drawer Dialog */}
      <ProjectModal
        open={open}
        onClose={() => setOpen(false)}
        variant="drawer"
        labelledBy="eng-modal-title"
      >
        <div className="eng-drawer">
          <div className="eng-drawer__cover">
            {selected && PROJECT_IMAGES[selected.id] ? (
              <div className="eng-drawer__media">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={PROJECT_IMAGES[selected.id]}
                  alt={selected.title}
                  className="eng-drawer__img"
                />
              </div>
            ) : (
              <ProjectCover
                title={selected?.title ?? ""}
                kicker={selected?.category ?? ""}
                {...TONES[selectedIndex % TONES.length]}
              />
            )}
          </div>

          <div className="eng-drawer__body">
            <p className="pj-mono">
              {pad(selectedIndex + 1)} // {selected.category}
            </p>
            <h3 id="eng-modal-title" className="eng-drawer__title">
              {selected.title}
            </h3>
            <p className="eng-drawer__desc">{selected.description}</p>

            <dl className="pj-facts">
              {selected.role && (
                <div className="pj-facts__row">
                  <dt>Role</dt>
                  <dd>{selected.role}</dd>
                </div>
              )}
              {selected.architecture && (
                <div className="pj-facts__row">
                  <dt>Architecture</dt>
                  <dd>{selected.architecture}</dd>
                </div>
              )}
              <div className="pj-facts__row">
                <dt>Stack</dt>
                <dd>
                  <ul className="pj-chips">
                    {selected.tags.map((t) => (
                      <li key={t}>{t}</li>
                    ))}
                  </ul>
                </dd>
              </div>
            </dl>

            <div className="pj-actions">
              {selected.liveUrl && (
                <a
                  href={selected.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pj-btn pj-btn--solid"
                >
                  Open live site
                </a>
              )}
              {selected.githubUrl && (
                <a
                  href={selected.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pj-btn"
                >
                  View source
                </a>
              )}
              {selected.caseStudyUrl && (
                <a
                  href={selected.caseStudyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pj-btn"
                >
                  Read documentation
                </a>
              )}
            </div>
          </div>
        </div>
      </ProjectModal>
    </section>
  );
}

"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects } from "@/data/portfolioData";
import ProjectCover from "./ProjectCover";
import ProjectModal from "./ProjectModal";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const TONES = [
  { background: "#0f0f0f", foreground: "#fafafa" },
  { background: "#d9d9d9", foreground: "#0f0f0f" },
];

const pad = (n: number) => String(n).padStart(2, "0");

export default function UiUx() {
  const items = projects.filter((p) => p.category === "UI/UX");
  const containerRef = useRef<HTMLElement>(null);
  const [selectedId, setSelectedId] = useState(items[0].id);
  const [open, setOpen] = useState(false);

  const selectedIndex = Math.max(
    items.findIndex((p) => p.id === selectedId),
    0
  );
  const selected = items[selectedIndex];

  useGSAP(
    () => {
      gsap.fromTo(
        ".pj-header",
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.75,
          ease: "power3.out",
          scrollTrigger: { trigger: ".pj-header", start: "top 85%" },
        }
      );

      gsap.utils.toArray<HTMLElement>(".ux-frame").forEach((frame, i) => {
        gsap.fromTo(
          frame,
          { opacity: 0, y: 40 + i * 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.85,
            ease: "power3.out",
            scrollTrigger: { trigger: frame, start: "top 88%" },
          }
        );
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      id="uiux"
      ref={containerRef}
      className="pj-section ux"
      aria-label="UI/UX projects"
    >
      <div className="pj-container">
        <header className="pj-header ux-header">
          <div>
            <p className="pj-header__meta">
              <span className="pj-header__num">02 //</span> UI/UX
            </p>
            <h2 className="pj-header__title">Product design</h2>
          </div>
          <p className="pj-header__desc">
            Interfaces designed and prototyped in Figma.
          </p>
        </header>

        <div className="ux-frames">
          {items.map((p, i) => {
            const isMobile = p.platform === "iOS app";
            return (
              <button
                key={p.id}
                type="button"
                className={`ux-frame${isMobile ? " ux-frame--mobile" : ""}`}
                data-cursor="view"
                aria-haspopup="dialog"
                onClick={() => {
                  setSelectedId(p.id);
                  setOpen(true);
                }}
              >
                <span className="ux-frame__media">
                  <ProjectCover
                    title={p.title}
                    kicker={p.platform ?? "Interface"}
                    className="ux-frame__cover"
                    {...TONES[i % TONES.length]}
                  />
                </span>
                <span className="ux-frame__info">
                  <span className="ux-frame__num">{pad(i + 1)}</span>
                  <span className="ux-frame__title">{p.title}</span>
                  <span className="ux-frame__platform">{p.platform}</span>
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <ProjectModal
        open={open}
        onClose={() => setOpen(false)}
        variant="fullscreen"
        labelledBy="ux-modal-title"
      >
        <article className="ux-case">
          <div className="ux-case__cover">
            <ProjectCover
              title={selected.title}
              kicker={selected.platform ?? "Interface"}
              {...TONES[selectedIndex % TONES.length]}
            />
          </div>

          <div className="ux-case__body">
            <p className="pj-mono">
              {pad(selectedIndex + 1)} // {selected.platform}
            </p>
            <h3 id="ux-modal-title" className="ux-case__title">
              {selected.title}
            </h3>
            <p className="ux-case__lead">{selected.description}</p>

            {selected.problem && (
              <section className="ux-case__block">
                <h4>Problem</h4>
                <p>{selected.problem}</p>
              </section>
            )}

            {selected.solution && (
              <section className="ux-case__block">
                <h4>Solution</h4>
                <p>{selected.solution}</p>
              </section>
            )}

            {selected.flowSteps && (
              <section className="ux-case__block">
                <h4>Process</h4>
                <ol className="ux-steps">
                  {selected.flowSteps.map((step, n) => (
                    <li key={step}>
                      <span className="ux-steps__num">{pad(n + 1)}</span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </section>
            )}

            <ul className="pj-chips">
              {selected.tags.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>

            {selected.caseStudyUrl && (
              <div className="pj-actions">
                <a
                  href={selected.caseStudyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pj-btn pj-btn--solid"
                >
                  Open prototype
                </a>
              </div>
            )}
          </div>
        </article>
      </ProjectModal>
    </section>
  );
}

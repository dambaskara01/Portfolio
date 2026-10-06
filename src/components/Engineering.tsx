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
  { background: "#e6e6e6", foreground: "#0f0f0f" },
  { background: "#2b2b2b", foreground: "#fafafa" },
  { background: "#bdbdbd", foreground: "#0f0f0f" },
];

const pad = (n: number) => String(n).padStart(2, "0");

export default function Engineering() {
  const items = projects.filter(
    (p) => p.category === "Fullstack" || p.category === "Webdev"
  );
  const containerRef = useRef<HTMLElement>(null);
  const [previewId, setPreviewId] = useState(items[0].id);
  const [selectedId, setSelectedId] = useState(items[0].id);
  const [open, setOpen] = useState(false);

  const selectedIndex = Math.max(
    items.findIndex((p) => p.id === selectedId),
    0
  );
  const selected = items[selectedIndex];

  const openProject = (id: string) => {
    setSelectedId(id);
    setOpen(true);
  };

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

      gsap.fromTo(
        ".eng-row",
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.09,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: { trigger: ".eng-list", start: "top 85%" },
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <section
      id="engineering"
      ref={containerRef}
      className="pj-section eng"
      aria-label="Engineering projects"
    >
      <div className="pj-container">
        <header className="pj-header">
          <p className="pj-header__meta">
            <span className="pj-header__num">01 //</span> Engineering
          </p>
          <h2 className="pj-header__title">Fullstack systems</h2>
          <p className="pj-header__desc">
            Web platforms and enterprise software, from schema to deploy.
          </p>
        </header>

        <div className="eng-layout">
          <ul className="eng-list">
            {items.map((p, i) => {
              const isPreview = p.id === previewId;
              return (
                <li key={p.id}>
                  <button
                    type="button"
                    className="eng-row"
                    data-active={isPreview}
                    data-cursor="view"
                    aria-haspopup="dialog"
                    onMouseEnter={() => setPreviewId(p.id)}
                    onFocus={() => setPreviewId(p.id)}
                    onClick={() => openProject(p.id)}
                  >
                    <span className="eng-row__num">{pad(i + 1)}</span>
                    <span className="eng-row__title">{p.title}</span>
                    <span className="eng-row__meta">
                      <span className="eng-row__role">{p.role ?? p.category}</span>
                      {p.tags.slice(0, 3).map((t) => (
                        <span key={t} className="eng-row__tag">
                          {t}
                        </span>
                      ))}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>

          <div
            className="eng-stage"
            aria-hidden="true"
            data-cursor="view"
            onClick={() => openProject(previewId)}
          >
            {items.map((p, i) => (
              <div
                key={p.id}
                className="eng-stage__item"
                data-active={p.id === previewId}
              >
                <ProjectCover
                  title={p.title}
                  kicker={p.category}
                  {...TONES[i % TONES.length]}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <ProjectModal
        open={open}
        onClose={() => setOpen(false)}
        variant="drawer"
        labelledBy="eng-modal-title"
      >
        <div className="eng-drawer">
          <div className="eng-drawer__cover">
            <ProjectCover
              title={selected.title}
              kicker={selected.category}
              {...TONES[selectedIndex % TONES.length]}
            />
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

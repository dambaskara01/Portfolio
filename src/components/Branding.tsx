"use client";

import { useRef, useState, type CSSProperties } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects, type Project } from "@/data/portfolioData";
import ProjectModal from "./ProjectModal";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const pad = (n: number) => String(n).padStart(2, "0");

/*
 * Poster built from the project's own palette: base and ink swap between
 * posters, the third color only marks the full stop after the wordmark.
 */
function BrandPoster({ project, index }: { project: Project; index: number }) {
  const colors = project.colors ?? [];
  const dark = index % 2 === 0;
  const base = colors[dark ? 0 : 1]?.hex ?? "#0f0f0f";
  const ink = colors[dark ? 1 : 0]?.hex ?? "#fafafa";
  const accent = colors[2]?.hex ?? ink;
  const [word, ...rest] = project.title.split(" ");
  const kicker =
    project.tags.find((t) => /identity|poster/i.test(t)) ?? project.tags[0];

  const style = {
    "--p-bg": base,
    "--p-fg": ink,
    "--p-accent": accent,
  } as CSSProperties;

  return (
    <span
      className={`br-poster br-poster--${index % 2 === 0 ? "tall" : "square"}`}
      style={style}
      role="img"
      aria-label={`${project.title}, poster placeholder`}
    >
      <span className="br-poster__kicker">{kicker}</span>
      <span className="br-poster__word">
        {word}
        <i>.</i>
      </span>
      <span className="br-poster__rest">{rest.join(" ")}</span>
      <span className="br-poster__bands" aria-hidden="true">
        {colors.map((c) => (
          <span key={c.hex} style={{ backgroundColor: c.hex }} />
        ))}
      </span>
    </span>
  );
}

export default function Branding() {
  const items = projects.filter((p) => p.category === "Graphic Design");
  const containerRef = useRef<HTMLElement>(null);
  const [selectedId, setSelectedId] = useState(items[0].id);
  const [open, setOpen] = useState(false);
  const [copiedHex, setCopiedHex] = useState<string | null>(null);

  const selectedIndex = Math.max(
    items.findIndex((p) => p.id === selectedId),
    0
  );
  const selected = items[selectedIndex];

  const copyColor = async (hex: string) => {
    try {
      await navigator.clipboard.writeText(hex);
      setCopiedHex(hex);
      window.setTimeout(() => setCopiedHex(null), 1800);
    } catch {
      setCopiedHex(null);
    }
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

      gsap.utils.toArray<HTMLElement>(".br-card").forEach((card, i) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 48, rotate: i % 2 === 0 ? -1.2 : 1.2 },
          {
            opacity: 1,
            y: 0,
            rotate: 0,
            duration: 0.95,
            ease: "power3.out",
            scrollTrigger: { trigger: card, start: "top 88%" },
          }
        );
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      id="branding"
      ref={containerRef}
      className="pj-section br"
      aria-label="Graphic and brand identity projects"
    >
      <div className="pj-container">
        <header className="pj-header">
          <p className="pj-header__meta">
            <span className="pj-header__num">03 //</span> Graphic design
          </p>
          <h2 className="pj-header__title">Identity and posters</h2>
          <p className="pj-header__desc">
            Brand systems and typographic print work.
          </p>
        </header>

        <div className="br-posters">
          {items.map((p, i) => (
            <button
              key={p.id}
              type="button"
              className="br-card"
              data-cursor="view"
              aria-haspopup="dialog"
              onClick={() => {
                setSelectedId(p.id);
                setOpen(true);
              }}
            >
              <BrandPoster project={p} index={i} />
              <span className="br-card__caption">
                <span className="br-card__num">{pad(i + 1)}</span>
                <span className="br-card__title">{p.title}</span>
              </span>
            </button>
          ))}
        </div>
      </div>

      <ProjectModal
        open={open}
        onClose={() => setOpen(false)}
        variant="lightbox"
        labelledBy="br-modal-title"
      >
        <div className="br-lightbox">
          <div className="br-lightbox__poster">
            <BrandPoster project={selected} index={selectedIndex} />
          </div>

          <div className="br-lightbox__body">
            <p className="pj-mono">{pad(selectedIndex + 1)} // Graphic design</p>
            <h3 id="br-modal-title" className="br-lightbox__title">
              {selected.title}
            </h3>
            <p className="br-lightbox__desc">{selected.description}</p>

            {selected.deliverables && (
              <section className="br-lightbox__block">
                <h4>Deliverables</h4>
                <ul className="br-list">
                  {selected.deliverables.map((d) => (
                    <li key={d}>{d}</li>
                  ))}
                </ul>
              </section>
            )}

            {selected.colors && (
              <section className="br-lightbox__block">
                <h4>Palette</h4>
                <ul className="br-swatches">
                  {selected.colors.map((c) => (
                    <li key={c.hex}>
                      <button
                        type="button"
                        className="br-swatch"
                        onClick={() => copyColor(c.hex)}
                        aria-label={`Copy ${c.name}, ${c.hex}`}
                      >
                        <span
                          className="br-swatch__chip"
                          style={{ backgroundColor: c.hex }}
                        />
                        <span className="br-swatch__name">{c.name}</span>
                        <span className="br-swatch__hex">{c.hex}</span>
                      </button>
                    </li>
                  ))}
                </ul>
                <p className="br-lightbox__hint" role="status">
                  {copiedHex ? `Copied ${copiedHex}` : "Select a swatch to copy its hex."}
                </p>
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
                  Open full assets
                </a>
              </div>
            )}
          </div>
        </div>
      </ProjectModal>
    </section>
  );
}

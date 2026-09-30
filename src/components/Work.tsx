"use client";

import { useRef, useState, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects, Project } from "@/data/portfolioData";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const CATEGORIES = [
  "All",
  "Fullstack",
  "Webdev",
  "UI/UX",
  "Graphic Design",
] as const;
type Category = (typeof CATEGORIES)[number];

export default function Work() {
  const containerRef = useRef<HTMLElement>(null);
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filtered =
    activeCategory === "All"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedProject(null);
    };
    if (selectedProject) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [selectedProject]);

  useGSAP(
    () => {
      // 1. Header reveal
      gsap.fromTo(
        ".work__hdr > *",
        { y: 28, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.75,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".work__hdr",
            start: "top 88%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // 2. Filter bar reveal
      gsap.fromTo(
        ".work__filter-pill",
        { opacity: 0, y: 14 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.05,
          duration: 0.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".work__filter-bar",
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // 3. Solid Layered Deck Stacked Scroll (100% Opaque, zero ghosting)
      if (window.innerWidth >= 860) {
        const cards = gsap.utils.toArray<HTMLElement>(".work-card-stacked");
        cards.forEach((card, i) => {
          if (i < cards.length - 1) {
            const nextCard = cards[i + 1];
            gsap.to(card, {
              scale: 0.95,
              y: -10,
              transformOrigin: "top center",
              ease: "none",
              scrollTrigger: {
                trigger: nextCard,
                start: "top 85%",
                end: "top 25%",
                scrub: 0.5,
              },
            });
          }
        });
      }

      ScrollTrigger.refresh();
    },
    { scope: containerRef, dependencies: [activeCategory] }
  );

  return (
    <section
      id="work"
      ref={containerRef}
      className="section"
      aria-labelledby="work-heading"
    >
      <div className="container">
        {/* Section Header */}
        <div className="section__header work__hdr">
          <p className="section__index">Selected works</p>
          <h2 className="section__title" id="work-heading">
            Featured projects
          </h2>
        </div>

        {/* Filter Bar */}
        <div
          className="work__filter-bar"
          role="group"
          aria-label="Filter projects by category"
        >
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              aria-pressed={activeCategory === cat}
              className={`work__filter-pill${
                activeCategory === cat ? " active" : ""
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Stacked Cards Showcase List */}
        <div className="work-showcase work-showcase--stacked" role="list">
          {filtered.map((project, idx) => {
            const isEven = idx % 2 === 1;
            return (
              <article
                key={project.id}
                className={`work-card-stacked ${
                  isEven ? "work-card-stacked--alt" : ""
                }`}
                style={{ "--card-index": idx } as React.CSSProperties}
              >
                <div className="work-card-stacked__inner">
                  {/* Visual Viewport with Parallax & Hover Effect */}
                  <div
                    className="work-item__visual"
                    onClick={() => setSelectedProject(project)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setSelectedProject(project);
                      }
                    }}
                    aria-label={`Open details for ${project.title}`}
                  >
                    <span className="work-item__badge">{project.category}</span>
                    <div className="work-item__img-clip">
                      <img
                        src={project.image}
                        alt={`Preview of ${project.title}`}
                        className="work-item__img"
                        loading="lazy"
                        width={800}
                        height={500}
                      />
                    </div>
                  </div>

                  {/* Content Area */}
                  <div className="work-item__content">
                    <span className="work-item__num">
                      PROJECT / {String(project.index).padStart(2, "0")}
                    </span>
                    <h3 className="work-item__title">{project.title}</h3>
                    <p className="work-item__desc">{project.description}</p>

                    <div
                      className="work-item__tags"
                      aria-label="Technologies used"
                    >
                      {project.tags.map((tag) => (
                        <span key={tag} className="tag">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="work-item__actions">
                      <button
                        type="button"
                        className="work-link--modal-btn"
                        onClick={() => setSelectedProject(project)}
                      >
                        Project Specs +
                      </button>

                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          className="work-link"
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Open live demo of ${project.title}`}
                        >
                          Live Demo ↗
                        </a>
                      )}
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          className="work-link"
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Source code of ${project.title} on GitHub`}
                        >
                          GitHub ↗
                        </a>
                      )}
                      {project.caseStudyUrl && (
                        <a
                          href={project.caseStudyUrl}
                          className="work-link"
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Case study for ${project.title}`}
                        >
                          Case Study →
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {/* Accessible Detail Modal */}
      {selectedProject && (
        <div
          className="modal-backdrop"
          onClick={() => setSelectedProject(null)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="modal-close-btn"
              onClick={() => setSelectedProject(null)}
              aria-label="Close details dialog"
            >
              &times;
            </button>

            <span
              className="t-mono t-muted"
              style={{
                display: "block",
                marginBottom: "8px",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                fontSize: "11px",
              }}
            >
              {selectedProject.category} &middot; Case Study
            </span>

            <h2
              id="modal-title"
              style={{
                fontSize: "clamp(22px, 3vw, 32px)",
                fontWeight: 700,
                letterSpacing: "-0.02em",
                marginBottom: "var(--s-16)",
              }}
            >
              {selectedProject.title}
            </h2>

            <img
              src={selectedProject.image}
              alt={selectedProject.title}
              style={{
                width: "100%",
                aspectRatio: "16/9",
                objectFit: "cover",
                borderRadius: "var(--radius-sm)",
                marginBottom: "var(--s-20)",
              }}
            />

            <p
              style={{
                fontSize: "15px",
                lineHeight: 1.7,
                color: "var(--ink)",
                marginBottom: "var(--s-20)",
              }}
            >
              {selectedProject.description}
            </p>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "var(--s-8)",
                marginBottom: "var(--s-24)",
              }}
            >
              {selectedProject.tags.map((t) => (
                <span key={t} className="tag">
                  {t}
                </span>
              ))}
            </div>

            <div
              style={{
                display: "flex",
                gap: "var(--s-16)",
                borderTop: "1px solid var(--rule)",
                paddingTop: "var(--s-16)",
              }}
            >
              {selectedProject.liveUrl && (
                <a
                  href={selectedProject.liveUrl}
                  className="work-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Visit Live Project &rarr;
                </a>
              )}
              {selectedProject.githubUrl && (
                <a
                  href={selectedProject.githubUrl}
                  className="work-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Repository &rarr;
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

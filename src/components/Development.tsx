"use client";

import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

interface ProjectItem {
  id: string;
  num: string;
  title: string;
  tag: string;
  color: string;
}

const PROJECTS: ProjectItem[] = [
  { id: "02", num: "02.", title: "Stella Artois", tag: "[CLIENT WORK]", color: "#769642" },
  { id: "03", num: "03.", title: "Logitech Quake", tag: "[CLIENT WORK]", color: "#c8c8c8" },
  { id: "04", num: "04.", title: "Louis Poulsen", tag: "[CLIENT WORK]", color: "#5e250f" },
  { id: "05", num: "05.", title: "Glossier", tag: "[CLIENT WORK]", color: "#e7b8c6" },
  { id: "06", num: "06.", title: "SONA", tag: "[CLIENT WORK]", color: "#26259c" },
];

export default function Development() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [timeStr, setTimeStr] = useState<string>("23 53");
  const [viewMode, setViewMode] = useState<"carousel" | "list">("carousel");

  // Keep live time updated for London matching reference
  useEffect(() => {
    const updateTime = () => {
      try {
        const now = new Date();
        const formatter = new Intl.DateTimeFormat("en-GB", {
          timeZone: "Europe/London",
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        });
        setTimeStr(formatter.format(now).replace(":", " "));
      } catch {
        setTimeStr("23 53");
      }
    };
    updateTime();
    const interval = setInterval(updateTime, 30000);
    return () => clearInterval(interval);
  }, []);

  // GSAP animation for smooth horizontal expansion and vertical overhang
  useGSAP(
    () => {
      const prefersReducedMotion =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const duration = prefersReducedMotion ? 0 : 0.52;
      const ease = "power3.out";

      PROJECTS.forEach((item) => {
        const isHovered = hoveredId === item.id;
        const isAnyHovered = hoveredId !== null;

        // When idle (none hovered): equal distribution across the 85.2% width = 17.04% each
        // When active: hovered card expands to 28.6%, others contract to 14.15% each
        const targetWidth = !isAnyHovered
          ? "17.04%"
          : isHovered
          ? "28.6%"
          : "14.15%";

        // Animate metadata header column width
        gsap.to(`.ross-meta-col--${item.id}`, {
          width: targetWidth,
          duration,
          ease,
          overwrite: "auto",
        });

        // Animate card container slot width
        gsap.to(`.ross-card-slot--${item.id}`, {
          width: targetWidth,
          duration,
          ease,
          overwrite: "auto",
        });

        // Animate inner solid block vertical stretch (extends down over the masthead)
        const inner = containerRef.current?.querySelector<HTMLElement>(
          `.ross-card-inner--${item.id}`
        );
        if (inner) {
          gsap.to(inner, {
            scaleY: isHovered ? 1.52 : 1.0,
            transformOrigin: "top center",
            duration,
            ease,
            overwrite: "auto",
          });
        }
      });
    },
    { scope: containerRef, dependencies: [hoveredId] }
  );

  return (
    <section id="development" ref={containerRef} className="ross-portfolio-container" aria-label="Selected Projects">
      {/* TOP NAVIGATION BAR */}
      <header className="ross-topbar">
        <div className="ross-topbar__discipline">
          3D, Motion, Art direction
        </div>

        <nav className="ross-topbar__nav" aria-label="Section navigation">
          <a href="#development" className="ross-topbar__link">Index</a>
          <span className="ross-topbar__sep">,</span>
          <a href="#development" className="ross-topbar__link">Patreon</a>
          <span className="ross-topbar__sep">,</span>
          <a href="#development" className="ross-topbar__link">Store</a>
          <span className="ross-topbar__sep">,</span>
          <a href="#about" className="ross-topbar__link">About</a>
          <span className="ross-topbar__sep">,</span>
          <a href="#development" className="ross-topbar__link">Lab</a>
        </nav>

        <a
          href="mailto:contact@rossmason.com"
          className="ross-topbar__contact"
        >
          Send me a message
        </a>
      </header>

      {/* MIDDLE CAROUSEL SECTION */}
      <main
        className="ross-main"
        onMouseLeave={() => setHoveredId(null)}
      >
        {/* Metadata Labels Row (02 - 07) */}
        <div className="ross-meta-row">
          {/* Left Clipped Spacer (Item 01 has no visible text label) */}
          <div className="ross-meta-spacer" />

          {/* Interactive columns (02 - 06) */}
          {PROJECTS.map((item) => (
            <div
              key={item.id}
              className={`ross-meta-col ross-meta-col--interactive ross-meta-col--${item.id} ${
                hoveredId === item.id ? "is-active" : ""
              }`}
              onMouseEnter={() => setHoveredId(item.id)}
              onClick={() =>
                setHoveredId((prev) => (prev === item.id ? null : item.id))
              }
            >
              <div className="ross-meta-num">{item.num}</div>
              <div className="ross-meta-title">{item.title}</div>
              <div className="ross-meta-tag">{item.tag}</div>
            </div>
          ))}

          {/* 07. SESE Botanics (Partially clipped on right viewport edge) */}
          <div className="ross-meta-col ross-meta-col--07">
            <div className="ross-meta-num">07.</div>
            <div className="ross-meta-title">SESE Botanic</div>
            <div className="ross-meta-tag">[CLIENT WO</div>
          </div>
        </div>

        {/* Visual Strip Row + Featured Center Breakout Card */}
        <div className="ross-cards-row">
          {/* 01. Left Cropped Dark Grey Card */}
          <div
            className="ross-card-slot ross-card-slot--01"
            aria-label="01 Archive Preview Placeholder"
          />

          {/* Interactive Card Slots (02 - 06) */}
          {PROJECTS.map((item) => (
            <div
              key={item.id}
              className={`ross-card-slot ross-card-slot--interactive ross-card-slot--${item.id} ${
                hoveredId === item.id ? "is-active" : ""
              }`}
              style={{ zIndex: hoveredId === item.id ? 50 : 10 }}
              onMouseEnter={() => setHoveredId(item.id)}
              onClick={() =>
                setHoveredId((prev) => (prev === item.id ? null : item.id))
              }
              role="button"
              tabIndex={0}
              aria-label={`${item.num} ${item.title}`}
            >
              <div
                className={`ross-card-inner ross-card-inner--${item.id}`}
                style={{ backgroundColor: item.color }}
              />
            </div>
          ))}

          {/* 07. SESE Botanics Solid Tone (Muted Sage / Amber Brown Tone, clipped right) */}
          <div
            className="ross-card-slot ross-card-slot--07"
            aria-label="07 SESE Botanics Placeholder"
          />
        </div>
      </main>

      {/* BOTTOM FOOTER & GIANT DISPLAY TYPOGRAPHY */}
      <footer className="ross-footer">
        {/* Secondary Info Bar (Carousel, List | London, UK 23 53) */}
        <div className="ross-subbar">
          <div className="ross-subbar__views">
            <button
              type="button"
              className={`ross-subbar__btn ${viewMode === "carousel" ? "is-active" : ""}`}
              onClick={() => setViewMode("carousel")}
            >
              Carousel
            </button>
            <span className="ross-subbar__sep">,</span>
            <button
              type="button"
              className={`ross-subbar__btn ${viewMode === "list" ? "is-active" : ""}`}
              onClick={() => setViewMode("list")}
            >
              List
            </button>
          </div>
          <div className="ross-subbar__time">
            London, UK {timeStr}
          </div>
        </div>

        {/* Giant Bottom Typography ("ROSS" Sans + "mason" Italic Serif) */}
        <div className="ross-masthead" aria-hidden="true">
          <span className="ross-masthead__sans">
            ROSS
          </span>
          <span className="ross-masthead__serif">
            mason
          </span>
        </div>
      </footer>
    </section>
  );
}

"use client";

import { useEffect, useState } from "react";
import { usePageTransition } from "./PageTransition";

const SECTIONS = [
  { id: "#hero", label: "00 COVER", short: "00" },
  { id: "#disciplines", label: "01 DISCIPLINES", short: "01" },
  { id: "#work", label: "02 WORK", short: "02" },
  { id: "#skills", label: "03 SKILLS", short: "03" },
  { id: "#experience", label: "04 EXPERIENCE", short: "04" },
  { id: "#contact", label: "05 CONTACT", short: "05" },
];

export default function SectionIndicator() {
  const { navigate, isTransitioning } = usePageTransition();
  const [activeId, setActiveId] = useState("#hero");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setVisible(scrollY > 120);

      // Detect current section in view
      const sectionElements = SECTIONS.map((s) => ({
        id: s.id,
        el: document.querySelector(s.id),
      }));

      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const item = sectionElements[i];
        if (item.el) {
          const rect = item.el.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.45) {
            setActiveId(item.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!visible) return null;

  const currentSection = SECTIONS.find((s) => s.id === activeId) || SECTIONS[0];

  return (
    <nav
      className="section-hud"
      aria-label="Section Navigation"
      role="region"
    >
      <div className="section-hud__inner">
        <span className="section-hud__label">CHAPTER</span>
        <div className="section-hud__current">
          <span className="section-hud__active-dot" aria-hidden="true" />
          <span className="section-hud__active-text">{currentSection.label}</span>
        </div>

        <div className="section-hud__dots" role="list">
          {SECTIONS.map((s) => {
            const isActive = s.id === activeId;
            return (
              <button
                key={s.id}
                type="button"
                className={`section-hud__dot-btn${isActive ? " is-active" : ""}`}
                onClick={() => navigate(s.id)}
                disabled={isTransitioning}
                aria-label={`Jump to section ${s.label}`}
                title={s.label}
              >
                <span className="section-hud__dot-num">{s.short}</span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}

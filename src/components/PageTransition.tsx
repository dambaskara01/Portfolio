"use client";

import { createContext, useContext, useState, useRef, ReactNode } from "react";
import gsap from "gsap";
import { useSmoothScroll } from "./SmoothScroll";

interface PageTransitionContextValue {
  navigate: (targetSelector: string, sectionTitle?: string) => void;
  isTransitioning: boolean;
}

const PageTransitionContext = createContext<PageTransitionContextValue>({
  navigate: () => {},
  isTransitioning: false,
});

export const usePageTransition = () => useContext(PageTransitionContext);

const SECTION_METAS: Record<
  string,
  { title: string; tag: string; type: "top-down" | "split-horizontal" | "bottom-up" | "horizontal-sweep" | "vertical-gauge" }
> = {
  "#hero": { title: "00 // COVER & IDENTITY", tag: "CHAPTER 00 · COVER", type: "top-down" },
  "#disciplines": { title: "01 // CORE DISCIPLINES", tag: "CHAPTER 01 · ARCHITECTURE", type: "split-horizontal" },
  "#work": { title: "02 // SELECTED PROJECTS", tag: "CHAPTER 02 · GALLERY DECK", type: "bottom-up" },
  "#skills": { title: "03 // TECHNICAL STACK", tag: "CHAPTER 03 · SPECIFICATION", type: "horizontal-sweep" },
  "#experience": { title: "04 // WORK HISTORY", tag: "CHAPTER 04 · TRACK RECORD", type: "vertical-gauge" },
  "#contact": { title: "05 // INQUIRIES & CONTACT", tag: "CHAPTER 05 · COLLABORATION", type: "top-down" },
};

export default function PageTransitionProvider({
  children,
}: {
  children: ReactNode;
}) {
  const { scrollTo } = useSmoothScroll();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [activeTitle, setActiveTitle] = useState("");
  const [activeTag, setActiveTag] = useState("");

  const overlayRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const splitLeftRef = useRef<HTMLDivElement>(null);
  const splitRightRef = useRef<HTMLDivElement>(null);
  const hudRef = useRef<HTMLDivElement>(null);
  const progressLineRef = useRef<HTMLDivElement>(null);

  const navigate = (targetSelector: string, customTitle?: string) => {
    if (isTransitioning) return;

    const meta = SECTION_METAS[targetSelector] || {
      title: customTitle || targetSelector.replace("#", "").toUpperCase(),
      tag: "SECTION NAVIGATION",
      type: "bottom-up",
    };

    setActiveTitle(customTitle || meta.title);
    setActiveTag(meta.tag);
    setIsTransitioning(true);

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // Instant jump for users with reduced motion preference
    if (prefersReducedMotion) {
      scrollTo(targetSelector, { immediate: true });
      setIsTransitioning(false);
      return;
    }

    const panel = panelRef.current;
    const splitLeft = splitLeftRef.current;
    const splitRight = splitRightRef.current;
    const hud = hudRef.current;
    const progressLine = progressLineRef.current;

    if (!panel || !hud || !splitLeft || !splitRight) {
      scrollTo(targetSelector, { immediate: false });
      setIsTransitioning(false);
      return;
    }

    const tl = gsap.timeline({
      onComplete: () => {
        setIsTransitioning(false);
        // Reset all panels to clean initial state
        gsap.set(panel, { yPercent: 100, xPercent: 0, pointerEvents: "none" });
        gsap.set([splitLeft, splitRight], { xPercent: 100, pointerEvents: "none" });
        gsap.set(splitLeft, { xPercent: -100 });
      },
    });

    // Reset HUD
    tl.set(hud, { opacity: 0, y: 16 });
    if (progressLine) tl.set(progressLine, { scaleX: 0 });

    // ── MULTI-STYLE SHUTTER CHOREOGRAPHY ──
    if (meta.type === "split-horizontal") {
      // 1. DISCIPLINES: Split Horizontal Shutter (Left & Right panels slide to meet in center)
      tl.set([splitLeft, splitRight], { pointerEvents: "auto" });
      tl.set(splitLeft, { xPercent: -100, yPercent: 0 });
      tl.set(splitRight, { xPercent: 100, yPercent: 0 });

      tl.to([splitLeft, splitRight], {
        xPercent: 0,
        duration: 0.38,
        ease: "power4.inOut",
      });

      // Reveal HUD
      tl.to(hud, { opacity: 1, y: 0, duration: 0.2, ease: "power2.out" }, "-=0.1");
      if (progressLine) tl.to(progressLine, { scaleX: 1, duration: 0.25, ease: "power1.inOut" }, "<");

      // Midpoint jump
      tl.call(() => scrollTo(targetSelector, { immediate: true }));
      tl.to({}, { duration: 0.08 });

      // Fade HUD & split panels apart
      tl.to(hud, { opacity: 0, y: -10, duration: 0.15, ease: "power2.in" });
      tl.to(splitLeft, { xPercent: -100, duration: 0.4, ease: "power4.inOut" });
      tl.to(splitRight, { xPercent: 100, duration: 0.4, ease: "power4.inOut" }, "<");
    } else if (meta.type === "horizontal-sweep") {
      // 2. SKILLS: Horizontal Matrix Sweep (Panel sweeps in from right, exits left)
      tl.set(panel, { xPercent: 100, yPercent: 0, pointerEvents: "auto" });

      tl.to(panel, {
        xPercent: 0,
        duration: 0.4,
        ease: "power4.inOut",
      });

      tl.to(hud, { opacity: 1, y: 0, duration: 0.2, ease: "power2.out" }, "-=0.1");
      if (progressLine) tl.to(progressLine, { scaleX: 1, duration: 0.25, ease: "power1.inOut" }, "<");

      tl.call(() => scrollTo(targetSelector, { immediate: true }));
      tl.to({}, { duration: 0.08 });

      tl.to(hud, { opacity: 0, y: -10, duration: 0.15, ease: "power2.in" });
      tl.to(panel, { xPercent: -100, duration: 0.42, ease: "power4.inOut" });
    } else if (meta.type === "top-down") {
      // 3. HERO & CONTACT: Top-Down Shutter Drop (Descends from top, exits downward)
      tl.set(panel, { yPercent: -100, xPercent: 0, pointerEvents: "auto" });

      tl.to(panel, {
        yPercent: 0,
        duration: 0.4,
        ease: "power4.inOut",
      });

      tl.to(hud, { opacity: 1, y: 0, duration: 0.2, ease: "power2.out" }, "-=0.1");
      if (progressLine) tl.to(progressLine, { scaleX: 1, duration: 0.25, ease: "power1.inOut" }, "<");

      tl.call(() => scrollTo(targetSelector, { immediate: true }));
      tl.to({}, { duration: 0.08 });

      tl.to(hud, { opacity: 0, y: 12, duration: 0.15, ease: "power2.in" });
      tl.to(panel, { yPercent: 100, duration: 0.42, ease: "power4.inOut" });
    } else {
      // 4. WORK & EXPERIENCE: Bottom-Up Gallery Deck (Rises from below, exits upward)
      tl.set(panel, { yPercent: 100, xPercent: 0, pointerEvents: "auto" });

      tl.to(panel, {
        yPercent: 0,
        duration: 0.4,
        ease: "power4.inOut",
      });

      tl.to(hud, { opacity: 1, y: 0, duration: 0.2, ease: "power2.out" }, "-=0.1");
      if (progressLine) tl.to(progressLine, { scaleX: 1, duration: 0.25, ease: "power1.inOut" }, "<");

      tl.call(() => scrollTo(targetSelector, { immediate: true }));
      tl.to({}, { duration: 0.08 });

      tl.to(hud, { opacity: 0, y: -10, duration: 0.15, ease: "power2.in" });
      tl.to(panel, { yPercent: -100, duration: 0.42, ease: "power4.inOut" });
    }
  };

  return (
    <PageTransitionContext.Provider value={{ navigate, isTransitioning }}>
      {children}

      {/* Full-Screen Architectural Transition Shutter */}
      <div
        ref={overlayRef}
        className={`page-curtain${isTransitioning ? " is-active" : ""}`}
        aria-hidden={!isTransitioning}
        role="presentation"
      >
        {/* Split panels for Split Horizontal Shutter */}
        <div ref={splitLeftRef} className="page-curtain__split-panel page-curtain__split-panel--left" />
        <div ref={splitRightRef} className="page-curtain__split-panel page-curtain__split-panel--right" />

        {/* Primary full panel for Vertical & Sweep shutters */}
        <div ref={panelRef} className="page-curtain__panel">
          <div className="page-curtain__grain" />
        </div>

        {/* Centered HUD Overlay */}
        <div ref={hudRef} className="page-curtain__hud">
          <div className="page-curtain__meta">
            <span className="page-curtain__tag">{activeTag}</span>
            <span className="page-curtain__indicator" aria-hidden="true" />
          </div>

          <div className="page-curtain__title">{activeTitle}</div>

          <div className="page-curtain__rule">
            <div ref={progressLineRef} className="page-curtain__rule-fill" />
          </div>
        </div>
      </div>
    </PageTransitionContext.Provider>
  );
}

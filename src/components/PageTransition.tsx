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

const SECTION_TITLES: Record<string, string> = {
  "#hero": "00 // COVER & IDENTITY",
  "#disciplines": "01 // CORE DISCIPLINES",
  "#work": "02 // SELECTED PROJECTS",
  "#skills": "03 // TECHNICAL STACK",
  "#experience": "04 // WORK HISTORY",
  "#contact": "05 // INQUIRIES & CONTACT",
};

export default function PageTransitionProvider({
  children,
}: {
  children: ReactNode;
}) {
  const { scrollTo } = useSmoothScroll();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [activeTitle, setActiveTitle] = useState("");
  
  const overlayRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const hudRef = useRef<HTMLDivElement>(null);
  const progressLineRef = useRef<HTMLDivElement>(null);

  const navigate = (targetSelector: string, customTitle?: string) => {
    if (isTransitioning) return;

    const title =
      customTitle ||
      SECTION_TITLES[targetSelector] ||
      targetSelector.replace("#", "").toUpperCase();

    setActiveTitle(title);
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
    const hud = hudRef.current;
    const progressLine = progressLineRef.current;
    if (!panel || !hud) {
      scrollTo(targetSelector, { immediate: false });
      setIsTransitioning(false);
      return;
    }

    // GSAP Cinematic Shutter Wipe Timeline
    const tl = gsap.timeline({
      onComplete: () => {
        setIsTransitioning(false);
      },
    });

    // 1. Initial setup: panel positioned below viewport
    tl.set(panel, { yPercent: 100, pointerEvents: "auto" });
    tl.set(hud, { opacity: 0, y: 16 });
    if (progressLine) tl.set(progressLine, { scaleX: 0 });

    // 2. Wipe curtain up to cover screen
    tl.to(panel, {
      yPercent: 0,
      duration: 0.42,
      ease: "power4.inOut",
    });

    // 3. Reveal HUD badge & draw progress hairline
    tl.to(
      hud,
      {
        opacity: 1,
        y: 0,
        duration: 0.22,
        ease: "power2.out",
      },
      "-=0.12"
    );

    if (progressLine) {
      tl.to(
        progressLine,
        {
          scaleX: 1,
          duration: 0.28,
          ease: "power1.inOut",
        },
        "<"
      );
    }

    // 4. Midpoint: Scroll target into position while completely occluded
    tl.call(() => {
      scrollTo(targetSelector, { immediate: true });
    });

    // 5. Brief hold for visual registration and eye relaxation
    tl.to({}, { duration: 0.1 });

    // 6. Fade HUD
    tl.to(hud, {
      opacity: 0,
      y: -12,
      duration: 0.18,
      ease: "power2.in",
    });

    // 7. Wipe curtain upward to reveal new section
    tl.to(panel, {
      yPercent: -100,
      duration: 0.44,
      ease: "power4.inOut",
    });

    // Reset panel for next transition
    tl.set(panel, { yPercent: 100, pointerEvents: "none" });
  };

  return (
    <PageTransitionContext.Provider value={{ navigate, isTransitioning }}>
      {children}

      {/* Full-Screen Architectural Transition Shutter */}
      <div
        ref={overlayRef}
        className="page-curtain"
        aria-hidden={!isTransitioning}
        role="presentation"
      >
        <div ref={panelRef} className="page-curtain__panel">
          <div className="page-curtain__grain" />
          
          <div ref={hudRef} className="page-curtain__hud">
            <div className="page-curtain__meta">
              <span className="page-curtain__tag">TRANSITION // FOLIO</span>
              <span className="page-curtain__indicator" aria-hidden="true" />
            </div>

            <div className="page-curtain__title">{activeTitle}</div>

            <div className="page-curtain__rule">
              <div ref={progressLineRef} className="page-curtain__rule-fill" />
            </div>

            <p className="page-curtain__caption">ADHAM BASKARA · PORTFOLIO</p>
          </div>
        </div>
      </div>
    </PageTransitionContext.Provider>
  );
}

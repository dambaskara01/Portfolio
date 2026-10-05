"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function ContextualBadgeCursor() {
  const badgeRef = useRef<HTMLDivElement>(null);
  const [badgeText, setBadgeText] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const isTouchDevice = !window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (isTouchDevice || prefersReducedMotion) return;

    const badgeEl = badgeRef.current;
    if (!badgeEl) return;

    const setX = gsap.quickTo(badgeEl, "x", { duration: 0.15, ease: "power2.out" });
    const setY = gsap.quickTo(badgeEl, "y", { duration: 0.15, ease: "power2.out" });

    const onMouseMove = (e: MouseEvent) => {
      setX(e.clientX + 14);
      setY(e.clientY + 14);
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      // Project card -> "VIEW"
      const projectCard = target.closest(".work-card-stacked, .work-item__visual, [data-cursor='view']");
      if (projectCard) {
        setBadgeText("VIEW");
        setIsVisible(true);
        return;
      }

      // External link / Interactive button -> "EXPLORE" or custom tag
      const customCursor = target.closest("[data-cursor]");
      if (customCursor) {
        const customText = customCursor.getAttribute("data-cursor");
        if (customText) {
          setBadgeText(customText.toUpperCase());
          setIsVisible(true);
          return;
        }
      }

      setIsVisible(false);
    };

    const onMouseLeaveWindow = () => setIsVisible(false);

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("mouseover", onMouseOver, { passive: true });
    document.addEventListener("mouseleave", onMouseLeaveWindow);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseover", onMouseOver);
      document.removeEventListener("mouseleave", onMouseLeaveWindow);
    };
  }, []);

  return (
    <div
      ref={badgeRef}
      className={`badge-cursor${isVisible ? " is-visible" : ""}`}
      aria-hidden="true"
    >
      <span className="badge-cursor__pill">{badgeText}</span>
    </div>
  );
}

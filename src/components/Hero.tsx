"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { usePageTransition } from "./PageTransition";
import { mountScramble, mountMagnetic } from "@/utils/textFx";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Hero() {
  const { navigate } = usePageTransition();
  const rootRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const centerRef = useRef<HTMLDivElement>(null);

  // Outer anchors (for layout position and scroll disperse)
  const card1AnchorRef = useRef<HTMLDivElement>(null);
  const card2AnchorRef = useRef<HTMLDivElement>(null);
  const card3AnchorRef = useRef<HTMLDivElement>(null);

  // Inner cards (for entrance animation)
  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);
  const card3Ref = useRef<HTMLDivElement>(null);

  // Card boxes (for mouse kinetic parallax)
  const card1BoxRef = useRef<HTMLDivElement>(null);
  const card2BoxRef = useRef<HTMLDivElement>(null);
  const card3BoxRef = useRef<HTMLDivElement>(null);

  // GSAP Entrance & Scroll-Driven Parallax Disperse
  useGSAP(
    () => {
      mountScramble(rootRef.current);
      const unbindMagnetic = mountMagnetic(rootRef.current);

      // ── 1. CINEMATIC ENTRANCE SEQUENCE ──
      const entranceTl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // Header drop
      entranceTl.fromTo(
        headerRef.current,
        { opacity: 0, y: -24 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.05 }
      );

      // Title dramatic mask reveal
      entranceTl.fromTo(
        ".hero-studio__title",
        { yPercent: 110, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 1.2, ease: "power4.out" },
        "-=0.5"
      );

      // Tagline blur-clear fade
      entranceTl.fromTo(
        ".hero-studio__tagline",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.85, ease: "power3.out" },
        "-=0.7"
      );

      // Three floating cards glide in from perimeter
      entranceTl.fromTo(
        card1Ref.current,
        { opacity: 0, scale: 0.86, y: 35 },
        { opacity: 1, scale: 1, y: 0, duration: 1.1, ease: "power3.out" },
        "-=0.8"
      );

      entranceTl.fromTo(
        card2Ref.current,
        { opacity: 0, scale: 0.86, y: -35 },
        { opacity: 1, scale: 1, y: 0, duration: 1.1, ease: "power3.out" },
        "-=0.9"
      );

      entranceTl.fromTo(
        card3Ref.current,
        { opacity: 0, scale: 0.86, y: 35 },
        { opacity: 1, scale: 1, y: 0, duration: 1.1, ease: "power3.out" },
        "-=0.9"
      );

      // Idle breathing float after landing — kills the "static decoration" feel
      if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.to(card1Ref.current, { y: "+=10", rotate: 0.8, duration: 3.4, ease: "sine.inOut", repeat: -1, yoyo: true, delay: 1.2 });
        gsap.to(card2Ref.current, { y: "-=9", rotate: -0.9, duration: 3.9, ease: "sine.inOut", repeat: -1, yoyo: true, delay: 1.4 });
        gsap.to(card3Ref.current, { y: "+=8", rotate: 0.6, duration: 4.3, ease: "sine.inOut", repeat: -1, yoyo: true, delay: 1.6 });
      }

      // ── 2. SCROLL-DRIVEN PARALLAX DISPERSE (NO PIN, GUARANTEED VISIBLE AT SCROLL 0) ──
      // Stays 100% solid and fully visible from scroll 0 to 20%, then gracefully
      // disperses into the margins as the user scrolls into the Marquee and Disciplines.
      const exitTl = gsap.timeline({
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.5,
          invalidateOnRefresh: true,
        },
      });

      exitTl
        .fromTo(
          centerRef.current,
          { y: 0, opacity: 1, scale: 1 },
          { y: -90, opacity: 0, scale: 0.95, ease: "power1.in", duration: 0.8 },
          0.2
        )
        .fromTo(
          headerRef.current,
          { y: 0, opacity: 1 },
          { y: -25, opacity: 0, ease: "power1.in", duration: 0.7 },
          0.2
        )
        .fromTo(
          card1AnchorRef.current,
          { x: 0, y: 0, rotate: 0, opacity: 1 },
          { x: -160, y: 80, rotate: -12, opacity: 0, ease: "power1.in", duration: 0.8 },
          0.15
        )
        .fromTo(
          card2AnchorRef.current,
          { x: 0, y: 0, rotate: 0, opacity: 1 },
          { x: 160, y: -80, rotate: 12, opacity: 0, ease: "power1.in", duration: 0.8 },
          0.15
        )
        .fromTo(
          card3AnchorRef.current,
          { x: 0, y: 0, rotate: 0, opacity: 1 },
          { x: 130, y: 110, rotate: -10, opacity: 0, ease: "power1.in", duration: 0.8 },
          0.15
        );

      return () => unbindMagnetic();
    },
    { scope: rootRef }
  );

  // ── 3. KINETIC MOUSE PARALLAX (Active on card boxes, isolated from scroll) ──
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion || window.innerWidth < 768) return;

    let rafId: number;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const onMouseMove = (e: MouseEvent) => {
      const rect = root.getBoundingClientRect();
      targetX = (e.clientX - rect.left) / rect.width - 0.5;
      targetY = (e.clientY - rect.top) / rect.height - 0.5;
    };

    const tick = () => {
      currentX += (targetX - currentX) * 0.08;
      currentY += (targetY - currentY) * 0.08;

      if (card1BoxRef.current) {
        gsap.set(card1BoxRef.current, {
          x: currentX * -20,
          y: currentY * -16,
          rotation: currentX * -1.2,
        });
      }
      if (card2BoxRef.current) {
        gsap.set(card2BoxRef.current, {
          x: currentX * 22,
          y: currentY * 18,
          rotation: currentX * 1.5,
        });
      }
      if (card3BoxRef.current) {
        gsap.set(card3BoxRef.current, {
          x: currentX * -16,
          y: currentY * 20,
          rotation: currentX * -1.0,
        });
      }

      rafId = requestAnimationFrame(tick);
    };

    root.addEventListener("mousemove", onMouseMove);
    rafId = requestAnimationFrame(tick);

    return () => {
      root.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <section
      id="hero"
      ref={rootRef}
      className="hero-studio"
      aria-label="Introduction"
    >
      {/* Top Header Row — Studio Identity & Navigation */}
      <header ref={headerRef} className="hero-studio__header">
        <a
          href="#hero"
          className="hero-studio__brand"
          onClick={(e) => {
            e.preventDefault();
            navigate("#hero", "00 // COVER & IDENTITY");
          }}
          aria-label="Portfolio index: return to top"
        >
          <span className="hero-studio__brand-name">Portfolio</span>
        </a>

        <nav className="hero-studio__nav" aria-label="Main Navigation">
          <a
            href="#disciplines"
            className="hero-studio__nav-link"
            onClick={(e) => {
              e.preventDefault();
              navigate("#disciplines", "01 // CORE DISCIPLINES");
            }}
          >
            Disciplines
          </a>
          <a
            href="#work"
            className="hero-studio__nav-link"
            onClick={(e) => {
              e.preventDefault();
              navigate("#work", "02 // SELECTED PROJECTS");
            }}
          >
            Work
          </a>
          <a
            href="#skills"
            className="hero-studio__nav-link"
            onClick={(e) => {
              e.preventDefault();
              navigate("#skills", "03 // TECHNICAL STACK");
            }}
          >
            Skills
          </a>
          <a
            href="#contact"
            className="hero-studio__nav-link"
            onClick={(e) => {
              e.preventDefault();
              navigate("#contact", "05 // INQUIRIES & CONTACT");
            }}
          >
            Contact
          </a>
        </nav>
      </header>

      {/* Floating Card 1 Anchor: Mid-Left (Portrait 3:4) */}
      <div
        ref={card1AnchorRef}
        className="hero-studio__card-anchor hero-studio__card-anchor--left"
      >
        <div
          ref={card1Ref}
          className="hero-studio__card hero-studio__card--left"
          aria-label="Photo placeholder 1: portrait"
        >
          <div ref={card1BoxRef} className="hero-studio__card-box">
            <div className="hero-studio__corner hero-studio__corner--tl" />
            <div className="hero-studio__corner hero-studio__corner--tr" />
            <div className="hero-studio__corner hero-studio__corner--bl" />
            <div className="hero-studio__corner hero-studio__corner--br" />

            <div className="hero-studio__card-body">
              <span className="hero-studio__card-ratio">3 : 4</span>
              <div className="hero-studio__card-icon" aria-hidden="true">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <polyline points="21 15 16 10 5 21" />
                </svg>
              </div>
              <div className="hero-studio__card-meta">
                <span className="hero-studio__card-label">PHOTO 01</span>
                <span className="hero-studio__card-caption">Portrait / Work</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Centerpiece: Masked Headline + Subline */}
      <div ref={centerRef} className="hero-studio__center">
        <div className="hero-studio__title-mask">
          <h1 className="hero-studio__title">
            Adham Baskara
            <span className="hero-studio__reg">®</span>
          </h1>
        </div>
        <p className="hero-studio__tagline">
          Fullstack Developer &amp; UI/UX Designer
          <br />
          Crafting modern digital experiences
        </p>
      </div>

      {/* Floating Card 2 Anchor: Top-Right (Landscape 4:3) */}
      <div
        ref={card2AnchorRef}
        className="hero-studio__card-anchor hero-studio__card-anchor--top-right"
      >
        <div
          ref={card2Ref}
          className="hero-studio__card hero-studio__card--top-right"
          aria-label="Photo placeholder 2: landscape"
        >
          <div ref={card2BoxRef} className="hero-studio__card-box">
            <div className="hero-studio__corner hero-studio__corner--tl" />
            <div className="hero-studio__corner hero-studio__corner--tr" />
            <div className="hero-studio__corner hero-studio__corner--bl" />
            <div className="hero-studio__corner hero-studio__corner--br" />

            <div className="hero-studio__card-body">
              <span className="hero-studio__card-ratio">4 : 3</span>
              <div className="hero-studio__card-icon" aria-hidden="true">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <polyline points="21 15 16 10 5 21" />
                </svg>
              </div>
              <div className="hero-studio__card-meta">
                <span className="hero-studio__card-label">PHOTO 02</span>
                <span className="hero-studio__card-caption">Landscape / Detail</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Card 3 Anchor: Bottom-Right (Square 1:1) */}
      <div
        ref={card3AnchorRef}
        className="hero-studio__card-anchor hero-studio__card-anchor--bottom-right"
      >
        <div
          ref={card3Ref}
          className="hero-studio__card hero-studio__card--bottom-right"
          aria-label="Photo placeholder 3: square"
        >
          <div ref={card3BoxRef} className="hero-studio__card-box">
            <div className="hero-studio__corner hero-studio__corner--tl" />
            <div className="hero-studio__corner hero-studio__corner--tr" />
            <div className="hero-studio__corner hero-studio__corner--bl" />
            <div className="hero-studio__corner hero-studio__corner--br" />

            <div className="hero-studio__card-body">
              <span className="hero-studio__card-ratio">1 : 1</span>
              <div className="hero-studio__card-icon" aria-hidden="true">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <polyline points="21 15 16 10 5 21" />
                </svg>
              </div>
              <div className="hero-studio__card-meta">
                <span className="hero-studio__card-label">PHOTO 03</span>
                <span className="hero-studio__card-caption">Editorial / Profile</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Optical Balance Spacer (Matches header height to ensure true vertical dead-center) */}
      <div className="hero-studio__spacer" aria-hidden="true" />
    </section>
  );
}

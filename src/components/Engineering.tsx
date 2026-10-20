"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { engineeringShowcaseProjects } from "@/data/portfolioData";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Engineering() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const slidesRef = useRef<(HTMLDivElement | null)[]>([]);

  const projects = engineeringShowcaseProjects;

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      // Coarse pointers get the same choreography with shorter travel and a
      // softer depth push - the shutter still has to close, but the lift and
      // the aperture scale are pulled back so it does not read as jitter.
      const isCoarsePointer = window.matchMedia(
        "(hover: none) and (pointer: coarse)"
      ).matches;

      if (!sectionRef.current || !containerRef.current) return;

      if (prefersReducedMotion) {
        slidesRef.current.forEach((slide, idx) => {
          if (slide) {
            slide.style.visibility = idx === 0 ? "visible" : "hidden";
            slide.style.opacity = idx === 0 ? "1" : "0";
          }
        });
        return;
      }

      // Initial state: slide 0 is visible, subsequent slides are hidden and positioned below
      slidesRef.current.forEach((slide, idx) => {
        if (!slide) return;
        if (idx === 0) {
          gsap.set(slide, { visibility: "visible", opacity: 1, yPercent: 0, pointerEvents: "auto" });
        } else {
          gsap.set(slide, { visibility: "hidden", opacity: 0, yPercent: 100, pointerEvents: "none" });
        }
      });

      // Recalculate triggers after initial DOM layout settle
      ScrollTrigger.refresh();

      // Subtle ambient aura drift for all slides
      const meshGradients = containerRef.current?.querySelectorAll(".silent-mesh-gradient");
      meshGradients?.forEach((mesh, idx) => {
        gsap.to(mesh, {
          scale: 1.05,
          rotation: idx % 2 === 0 ? 1.5 : -1.5,
          duration: 8 + idx * 1.5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      });

      // ==========================================
      // ARCHITECTURAL CINEMA ENTRANCE & EXIT (Project 1 Only)
      // Direct scrub linked to scroll position between Marquee & Engineering pin
      // Distinct, choreographed choreography for every element
      // ==========================================
      const firstSlide = slidesRef.current[0];
      if (firstSlide) {
        const gradientEl = firstSlide.querySelector(".silent-gradient-wrapper");
        const panelEl = firstSlide.querySelector(".silent-panel");
        const badgeEl = firstSlide.querySelector(".silent-project-badge");
        const headlineEl = firstSlide.querySelector(".silent-headline");
        const taglineEl = firstSlide.querySelector(".silent-tagline");
        const ctaEl = firstSlide.querySelector(".silent-action-link");
        const quickLinks = firstSlide.querySelectorAll(".silent-quick-link");
        const creditsEl = firstSlide.querySelector(".silent-credits");

        const entranceTl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 90%",
            end: "top top",
            scrub: 0.6,
          },
        });

        // 1. Mesh Gradient: Split aperture curtain reveal from center horizontal
        if (gradientEl) {
          entranceTl.fromTo(
            gradientEl,
            {
              clipPath: "inset(0% 50% 0% 50%)",
              scale: 1.1,
            },
            {
              clipPath: "inset(0% 0% 0% 0%)",
              scale: 1,
              ease: "none",
            },
            0
          );
        }

        // 2. White Panel: Grounded elevation glide from bottom with gentle opacity ramp
        if (panelEl) {
          entranceTl.fromTo(
            panelEl,
            {
              yPercent: 18,
              opacity: 0,
            },
            {
              yPercent: 0,
              opacity: 1,
              ease: "none",
            },
            0.08
          );
        }

        // 3. Category Badge: Editorial letter-spacing squeeze & soft slide down
        if (badgeEl) {
          entranceTl.fromTo(
            badgeEl,
            {
              opacity: 0,
              y: -14,
              letterSpacing: "0.15em",
            },
            {
              opacity: 1,
              y: 0,
              letterSpacing: "-0.01em",
              ease: "none",
            },
            0.15
          );
        }

        // 4. Headline: Masked kinetic slide up from below with crisp tracking settle
        if (headlineEl) {
          entranceTl.fromTo(
            headlineEl,
            {
              opacity: 0,
              y: 40,
              skewY: 1.5,
            },
            {
              opacity: 1,
              y: 0,
              skewY: 0,
              ease: "none",
            },
            0.22
          );
        }

        // 5. Tagline: Editorial horizontal wipe glide (slides softly in from left)
        if (taglineEl) {
          entranceTl.fromTo(
            taglineEl,
            {
              opacity: 0,
              x: -30,
            },
            {
              opacity: 1,
              x: 0,
              ease: "none",
            },
            0.3
          );
        }

        // 6. Action Button (CTA): Elastic scale-pop with rotation-settle
        if (ctaEl) {
          entranceTl.fromTo(
            ctaEl,
            {
              scale: 0.72,
              opacity: 0,
              rotate: -4,
              y: 20,
            },
            {
              scale: 1,
              opacity: 1,
              rotate: 0,
              y: 0,
              ease: "none",
            },
            0.38
          );
        }

        // 7. Quick Links: Staggered upward ripple cascade from bottom
        if (quickLinks && quickLinks.length > 0) {
          entranceTl.fromTo(
            quickLinks,
            {
              opacity: 0,
              y: 18,
            },
            {
              opacity: 1,
              y: 0,
              stagger: 0.04,
              ease: "none",
            },
            0.46
          );
        }

        // 8. Meta Credits (Year & Status): Soft horizontal push from right
        if (creditsEl) {
          entranceTl.fromTo(
            creditsEl,
            {
              opacity: 0,
              x: 24,
            },
            {
              opacity: 1,
              x: 0,
              ease: "none",
            },
            0.5
          );
        }
      }

      // Recalculate triggers after initial DOM layout settle
      ScrollTrigger.refresh();

      // Kinetic Multi-Slide Deck Scrub (Pinned ScrollTrigger)
      // Standard Card Deck stacking pattern: each slide slides up over the previous one.
      // Slide 3 has its own dwell duration so the user can read the content, then the
      // pin holds for one more segment (EXIT_SCROLL) so the section can close itself
      // out with the aperture choreography instead of simply scrolling away.
      const totalSlides = projects.length;
      const EXIT_SCROLL = 80; // extra pin budget, percent of viewport, for the exit
      if (totalSlides > 1) {
        const scrubTl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: `+=${totalSlides * 100 + EXIT_SCROLL}%`,
            pin: true,
            scrub: true,
            invalidateOnRefresh: true,
          },
        });

        // Transitions between slides (Slide 0 -> 1 -> 2)
        for (let i = 0; i < totalSlides - 1; i++) {
          const currentSlide = slidesRef.current[i];
          const nextSlide = slidesRef.current[i + 1];

          if (!currentSlide || !nextSlide) continue;

          const label = `slide-${i}`;

          // Prepare next slide position
          scrubTl.set(
            nextSlide,
            { visibility: "visible", pointerEvents: "auto", opacity: 1, filter: "blur(0px)", scale: 1, yPercent: 100 },
            label
          );

          // Card Deck physical overlap:
          // Next slide slides smoothly up to cover the viewport
          scrubTl.to(
            nextSlide,
            {
              yPercent: 0,
              duration: 1,
              ease: "none",
            },
            label
          );

          // Previous slide recedes with cinematic depth: smooth blur, deep fade, and scale down
          scrubTl.to(
            currentSlide,
            {
              scale: 0.92,
              opacity: 0,
              filter: "blur(14px)",
              duration: 1,
              ease: "power1.inOut",
            },
            label
          );

          // Deactivate previous slide interactions once fully covered
          scrubTl.set(currentSlide, { visibility: "hidden", pointerEvents: "none" });
        }

        // Dwell so Slide 3 stays readable and interactive before the exit begins
        scrubTl.to({}, { duration: 0.4 });

        // ==========================================
        // APERTURE CLOSE - exit choreography for the final slide
        // Bookends the entrance: the mesh aperture shuts back down to a vertical
        // hairline, the copy lifts away in reading order, and the white panel
        // rises off its own baseline into a full-bleed plane that hands the
        // viewport over to the UI/UX section. The two dwell-free durations are
        // tuned so one timeline unit still maps to ~120% of scroll, keeping the
        // slide-to-slide pacing identical to before the exit segment existed.
        // ==========================================
        const lastSlide = slidesRef.current[totalSlides - 1];
        if (lastSlide) {
          const EXIT_AT = 2.4; // absolute timeline position where the exit starts
          const EXIT_LEN = 0.77; // total exit length, in the same units

          const exitGradient = lastSlide.querySelector<HTMLElement>(
            ".silent-gradient-wrapper"
          );
          const exitPanel = lastSlide.querySelector<HTMLElement>(".silent-panel");
          const exitCopy = lastSlide.querySelectorAll(
            ".silent-project-badge, .silent-headline, .silent-tagline, .silent-action-link, .silent-quick-link, .silent-credits"
          );

          // 1. Copy leaves first, in reading order: badge through credits
          if (exitCopy.length > 0) {
            scrubTl.fromTo(
              exitCopy,
              { y: 0, opacity: 1 },
              {
                y: isCoarsePointer ? -10 : -18,
                opacity: 0,
                duration: EXIT_LEN * 0.45,
                stagger: EXIT_LEN * 0.055,
                ease: "power2.out",
              },
              EXIT_AT
            );
          }

          // 2. Aperture shuts to a vertical hairline while easing forward in Z
          if (exitGradient) {
            scrubTl.fromTo(
              exitGradient,
              { clipPath: "inset(0% 0% 0% 0%)", scale: 1 },
              {
                clipPath: "inset(0% 49.95% 0% 49.95%)",
                scale: isCoarsePointer ? 1.03 : 1.08,
                duration: EXIT_LEN * 0.65,
                ease: "power2.inOut",
              },
              EXIT_AT + EXIT_LEN * 0.1
            );
          }

          // 3. White panel rises from its own baseline into a full-bleed plane.
          //    The scale factor is measured, not guessed: the panel only has to
          //    cover the section, so a short panel on a tall viewport simply
          //    travels further.
          if (exitPanel) {
            gsap.set(exitPanel, { transformOrigin: "bottom center" });
            scrubTl.fromTo(
              exitPanel,
              { scaleY: 1 },
              {
                scaleY: () =>
                  (sectionRef.current?.clientHeight ?? window.innerHeight) /
                    Math.max(exitPanel.offsetHeight, 1) +
                  0.02,
                duration: EXIT_LEN * 0.55,
                ease: "power2.inOut",
              },
              EXIT_AT + EXIT_LEN * 0.45
            );
          }
        }
      }
    },
    { scope: containerRef }
  );

  return (
    <div className="silent-showcase-pin-container" ref={containerRef}>
      <section id="engineering" className="silent-showcase-section" ref={sectionRef}>
        <div className="silent-slides-viewport">
          {projects.map((data, index) => (
            <div
              key={data.id || index}
              className={`silent-slide-item ${index === 0 ? "is-active" : ""}`}
              ref={(el) => {
                slidesRef.current[index] = el;
              }}
              style={{ zIndex: index + 1 }}
            >
              {/* Full-Bleed Mesh Gradient Background */}
              <div className="silent-gradient-wrapper" aria-hidden="true">
                <div
                  className="silent-mesh-gradient"
                  style={{
                    backgroundColor: data.visual.baseColor,
                    background: `
                      radial-gradient(ellipse 48% 48% at 85% 24%, ${data.visual.auraColors[0]} 0%, transparent 60%),
                      radial-gradient(ellipse 50% 50% at 65% 30%, ${data.visual.auraColors[1]} 0%, transparent 60%),
                      radial-gradient(ellipse 52% 52% at 40% 36%, ${data.visual.auraColors[2]} 0%, transparent 65%),
                      radial-gradient(ellipse 48% 48% at 16% 26%, ${data.visual.auraColors[3]} 0%, transparent 60%),
                      radial-gradient(ellipse 52% 52% at 50% 12%, ${data.visual.auraColors[4]} 0%, transparent 65%)
                    `,
                  }}
                />
              </div>

              {/* Bottom White Editorial Panel (Full Width) */}
              <div className="silent-panel">
                <div className="silent-panel-inner">
                  {/* Top Row: Category / Tagline, Title, and Primary Action */}
                  <div className="silent-panel-header">
                    <div className="silent-header-copy">
                      <span className="silent-project-badge">{data.category}</span>
                      <h2 className="silent-headline">{data.title}</h2>
                      <p className="silent-tagline">{data.tagline}</p>
                    </div>

                    <a
                      href={data.cta.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="silent-action-link"
                      data-cursor="explore"
                    >
                      <span className="silent-action-text">{data.cta.label}</span>
                      <span className="silent-action-arrow-track" aria-hidden="true">
                        <span className="silent-action-arrow">↗</span>
                      </span>
                    </a>
                  </div>

                  {/* Bottom Bar: Quick Project Links & Meta Status */}
                  <footer className="silent-bottom-bar">
                    {/* Project Quick Links */}
                    <div className="silent-quick-links" aria-label="Project resources">
                      {data.links.map((link, idx) => (
                        <a
                          key={idx}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="silent-quick-link"
                        >
                          {link.label}
                        </a>
                      ))}
                    </div>

                    {/* Meta Information (Year & Status) */}
                    <div className="silent-credits">
                      <span className="silent-meta-year">{data.meta.year}</span>
                      <span className="silent-meta-status">{data.meta.status}</span>
                    </div>
                  </footer>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

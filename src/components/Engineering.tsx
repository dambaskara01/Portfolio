"use client";

import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects } from "@/data/portfolioData";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const ANGLE_STEP = 20; // Compact angle step for refined typography

export default function Engineering() {
  const engProjects = projects.filter(
    (p) => p.category === "Fullstack" || p.category === "Webdev"
  );
  const total = engProjects.length;

  const sectionRef = useRef<HTMLElement>(null);
  const wheelStageRef = useRef<HTMLDivElement>(null);

  // Rotation physics refs for 60fps momentum
  const targetRotRef = useRef(0);
  const currentRotRef = useRef(0);
  const isDraggingRef = useRef(false);
  const startYRef = useRef(0);
  const startRotRef = useRef(0);

  const [rotState, setRotState] = useState(0);

  // Active project calculation from continuous angular position
  const rawIndex = Math.round(rotState / ANGLE_STEP);
  const activeIndex = ((rawIndex % total) + total) % total;

  // Smooth inertial RAF animation loop
  useEffect(() => {
    let rafId: number;
    const loop = () => {
      const diff = targetRotRef.current - currentRotRef.current;
      if (Math.abs(diff) > 0.004) {
        currentRotRef.current += diff * 0.14;
        setRotState(currentRotRef.current);
      }
      rafId = requestAnimationFrame(loop);
    };
    rafId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafId);
  }, []);

  // Isolated mouse-wheel listener: spins wheel only, prevents web page scroll
  useEffect(() => {
    const el = wheelStageRef.current;
    if (!el) return;

    let wheelTimeout: ReturnType<typeof setTimeout>;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      e.stopPropagation();

      const delta = Math.sign(e.deltaY) * Math.min(Math.abs(e.deltaY), 80);
      targetRotRef.current += delta * 0.16;

      clearTimeout(wheelTimeout);
      wheelTimeout = setTimeout(() => {
        // Gently snap to nearest project slot once scrolling pauses
        targetRotRef.current =
          Math.round(targetRotRef.current / ANGLE_STEP) * ANGLE_STEP;
      }, 150);
    };

    el.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      el.removeEventListener("wheel", handleWheel);
      clearTimeout(wheelTimeout);
    };
  }, []);

  // Keyboard accessibility
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        targetRotRef.current += ANGLE_STEP;
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        targetRotRef.current -= ANGLE_STEP;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Touch and pointer drag handlers for wheel container
  const handlePointerDown = (e: React.PointerEvent) => {
    isDraggingRef.current = true;
    startYRef.current = e.clientY;
    startRotRef.current = targetRotRef.current;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
    const diff = startYRef.current - e.clientY;
    targetRotRef.current = startRotRef.current + diff * 0.32;
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    try {
      (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {}
    targetRotRef.current =
      Math.round(targetRotRef.current / ANGLE_STEP) * ANGLE_STEP;
  };

  // High-End Direction-Aware Architectural Shutter & Kinetic Horology Unfurl
  useGSAP(
    () => {
      const card = ".eng-visual-card";
      const wheel = ".eng-stage__wheel-col";

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 78%",
        end: "bottom 22%",
        onEnter: () => {
          // Entering while scrolling DOWN (from top)
          gsap.killTweensOf([card, wheel]);

          // Architectural Shutter reveal with 3D perspective tilt
          gsap.fromTo(
            card,
            {
              opacity: 0,
              y: 72,
              rotateY: -14,
              rotateX: 10,
              scale: 0.93,
              clipPath: "inset(100% 0% 0% 0% round 20px)",
            },
            {
              opacity: 1,
              y: 0,
              rotateY: 0,
              rotateX: 0,
              scale: 1,
              clipPath: "inset(0% 0% 0% 0% round 20px)",
              duration: 1.15,
              ease: "power4.out",
              overwrite: "auto",
            }
          );

          // Kinetic Horology Unfurl for circular wheel
          gsap.fromTo(
            wheel,
            {
              opacity: 0,
              x: 80,
              rotateY: 20,
              rotateX: -10,
              scale: 0.92,
            },
            {
              opacity: 1,
              x: 0,
              rotateY: 0,
              rotateX: 0,
              scale: 1,
              duration: 1.25,
              ease: "power4.out",
              overwrite: "auto",
            }
          );

          // Precision mechanical spin impulse into active position
          targetRotRef.current += ANGLE_STEP * 1.5;
        },
        onEnterBack: () => {
          // Entering while scrolling UP (from bottom)
          gsap.killTweensOf([card, wheel]);

          // Architectural Shutter reveal with inverted 3D perspective tilt
          gsap.fromTo(
            card,
            {
              opacity: 0,
              y: -72,
              rotateY: -14,
              rotateX: -10,
              scale: 0.93,
              clipPath: "inset(0% 0% 100% 0% round 20px)",
            },
            {
              opacity: 1,
              y: 0,
              rotateY: 0,
              rotateX: 0,
              scale: 1,
              clipPath: "inset(0% 0% 0% 0% round 20px)",
              duration: 1.15,
              ease: "power4.out",
              overwrite: "auto",
            }
          );

          // Kinetic Horology Unfurl from bottom
          gsap.fromTo(
            wheel,
            {
              opacity: 0,
              x: 80,
              rotateY: 20,
              rotateX: 10,
              scale: 0.92,
            },
            {
              opacity: 1,
              x: 0,
              rotateY: 0,
              rotateX: 0,
              scale: 1,
              duration: 1.25,
              ease: "power4.out",
              overwrite: "auto",
            }
          );

          // Precision mechanical spin impulse reverse
          targetRotRef.current -= ANGLE_STEP * 1.5;
        },
        onLeave: () => {
          // Softly recess when leaving downwards
          gsap.to([card, wheel], {
            opacity: 0.2,
            scale: 0.96,
            duration: 0.65,
            ease: "power2.out",
            overwrite: "auto",
          });
        },
        onLeaveBack: () => {
          // Softly recess when leaving upwards
          gsap.to([card, wheel], {
            opacity: 0.2,
            scale: 0.96,
            duration: 0.65,
            ease: "power2.out",
            overwrite: "auto",
          });
        },
      });
    },
    { scope: sectionRef }
  );

  // Visible slots around active index: -3 to +3 for smooth continuous curvature
  const slotOffsets = [-3, -2, -1, 0, 1, 2, 3];

  return (
    <section
      id="engineering"
      ref={sectionRef}
      className="eng-section"
      aria-label="Engineering selected works"
    >
      <div className="eng-container">
        <div className="eng-stage">
          {/* Left: 4:3 Clean Minimal Placeholder Card */}
          <div className="eng-stage__visual-col">
            <div className="eng-visual-card">
              <div className="eng-visual-card__canvas">
                <div className="eng-visual-card__placeholder" />
              </div>
            </div>
          </div>

          {/* Right: Kinetic 3D Circular Arc with Isolated Wheel Scroll & Fade */}
          <div
            ref={wheelStageRef}
            className="eng-stage__wheel-col"
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
          >
            <div
              className="eng-wheel"
              role="listbox"
              aria-label="Project circular arc selector"
            >
              {slotOffsets.map((offset) => {
                const itemRawIndex = rawIndex + offset;
                const projIndex = ((itemRawIndex % total) + total) % total;
                const proj = engProjects[projIndex];

                // Continuous angle offset from the active center
                const phi = itemRawIndex * ANGLE_STEP - rotState;
                const dist = Math.abs(phi) / ANGLE_STEP;

                // Deep circular arc mathematics
                const translateY = phi * 2.3;
                const translateX = Math.pow(dist, 1.8) * 22;
                const rotateZ = phi;
                const scale = Math.max(0.8, 1 - dist * 0.06);
                const opacity = Math.max(0, 1 - dist * 0.36);
                const isCentered = dist < 0.45;

                // Skip items rotated beyond visible range
                if (opacity <= 0.01) return null;

                return (
                  <button
                    key={`${offset}-${proj.id}`}
                    type="button"
                    role="option"
                    aria-selected={isCentered}
                    className={`eng-wheel__item ${
                      isCentered ? "eng-wheel__item--active" : ""
                    }`}
                    style={{
                      transform: `translate3d(${translateX}px, ${translateY}px, 0) rotateZ(${rotateZ}deg) scale(${scale})`,
                      opacity,
                    }}
                    onClick={() => {
                      targetRotRef.current = itemRawIndex * ANGLE_STEP;
                    }}
                    tabIndex={isCentered ? 0 : -1}
                  >
                    {/* Active Cobalt Blue Dot Indicator */}
                    <span
                      className={`eng-wheel__dot ${
                        isCentered ? "eng-wheel__dot--active" : ""
                      }`}
                      style={{
                        transform: `scale(${isCentered ? 1 : Math.max(0, 1 - dist / 0.45)})`,
                        opacity: isCentered ? 1 : Math.max(0, 1 - dist / 0.45),
                      }}
                      aria-hidden="true"
                    />
                    <span className="eng-wheel__text">{proj.title}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

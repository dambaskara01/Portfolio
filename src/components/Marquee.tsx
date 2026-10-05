"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { marqueeItems } from "@/data/portfolioData";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Marquee() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const track = trackRef.current;
      if (!track) return;

      // Base infinite horizontal animation
      const loop = gsap.to(track, {
        xPercent: -50,
        ease: "none",
        duration: 35,
        repeat: -1,
      });

      // Velocity-boost + direction-aware flow: scrolling up runs the ticker
      // backwards, which makes the strip feel physically connected to the page.
      let currentScale = 1;
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top bottom",
        end: "bottom top",
        onUpdate: (self) => {
          const velocity = Math.abs(self.getVelocity());
          const dir = self.direction === -1 ? -1 : 1;
          if (velocity > 100) {
            const timeScaleBoost = Math.min(1 + velocity / 300, 4.5);
            currentScale = dir * timeScaleBoost;
            gsap.to(loop, {
              timeScale: currentScale,
              duration: 0.25,
              overwrite: "auto",
              onComplete: () => {
                currentScale = dir;
                gsap.to(loop, {
                  timeScale: currentScale,
                  duration: 1.2,
                  ease: "power2.out",
                });
              },
            });
          } else if (dir !== (currentScale > 0 ? 1 : -1)) {
            currentScale = dir;
            gsap.to(loop, {
              timeScale: dir,
              duration: 0.5,
              ease: "power2.out",
              overwrite: "auto",
            });
          }
        },
      });
    },
    { scope: containerRef }
  );

  // Duplicate items twice for seamless loop
  const items = [...marqueeItems, ...marqueeItems];

  return (
    <div
      ref={containerRef}
      className="marquee-wrapper"
      aria-hidden="true"
      role="presentation"
    >
      <div ref={trackRef} className="marquee-track">
        {items.map((item, i) => (
          <span key={i} className="marquee-item">
            <b>{item}</b>
            <span className="marquee-sep" aria-hidden="true">·</span>
          </span>
        ))}
      </div>
    </div>
  );
}

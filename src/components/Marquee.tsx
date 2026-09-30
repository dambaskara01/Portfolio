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

      // Boost velocity based on scroll speed in either direction
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top bottom",
        end: "bottom top",
        onUpdate: (self) => {
          const velocity = Math.abs(self.getVelocity());
          if (velocity > 100) {
            // Temporarily accelerate speed smoothly
            const timeScaleBoost = Math.min(1 + velocity / 300, 4.5);
            gsap.to(loop, {
              timeScale: timeScaleBoost,
              duration: 0.3,
              overwrite: "auto",
              onComplete: () => {
                gsap.to(loop, {
                  timeScale: 1,
                  duration: 1.2,
                  ease: "power2.out",
                });
              },
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

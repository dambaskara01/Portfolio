"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { experiences } from "@/data/portfolioData";
import SplitText from "./SplitText";
import { mountScramble, mountWordReveal } from "@/utils/textFx";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Experience() {
  const containerRef = useRef<HTMLElement>(null);
  const progressLineRef = useRef<SVGLineElement>(null);

  useGSAP(
    () => {
      // 1. Header — word rise + scramble-decode label
      mountWordReveal(containerRef.current);
      mountScramble(containerRef.current);

      // 2. Timeline vertical SVG ruler scrub (bidirectional scrub down & up)
      if (progressLineRef.current) {
        gsap.fromTo(
          progressLineRef.current,
          { strokeDashoffset: 1000 },
          {
            strokeDashoffset: 0,
            ease: "none",
            scrollTrigger: {
              trigger: ".timeline-items",
              start: "top 80%",
              end: "bottom 60%",
              scrub: 0.8,
            },
          }
        );
      }

      // 3. Timeline nodes entrance: marker pop + editorial content stagger
      gsap.utils.toArray<HTMLElement>(".timeline-node").forEach((node) => {
        const marker = node.querySelector(".timeline-node__marker");
        const content = node.querySelector(".timeline-node__content");

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: node,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });

        if (marker) {
          tl.fromTo(
            marker,
            { scale: 0, opacity: 0 },
            {
              scale: 1,
              opacity: 1,
              duration: 0.45,
              ease: "back.out(2)",
            }
          );
        }

        if (content) {
          const period = content.querySelector(".timeline-node__period");
          const headings = [
            content.querySelector(".timeline-node__role"),
            content.querySelector(".timeline-node__company"),
          ].filter(Boolean);
          const desc = content.querySelector(".timeline-node__desc");
          const tags = content.querySelectorAll(".tag");

          if (period) {
            tl.fromTo(
              period,
              { opacity: 0, x: -16 },
              { opacity: 1, x: 0, duration: 0.45, ease: "power3.out" },
              "-=0.2"
            );
          }

          if (headings.length > 0) {
            tl.fromTo(
              headings,
              { opacity: 0, y: 16 },
              { opacity: 1, y: 0, stagger: 0.07, duration: 0.5, ease: "power3.out" },
              "-=0.3"
            );
          }

          if (desc) {
            tl.fromTo(
              desc,
              { opacity: 0, y: 12 },
              { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" },
              "-=0.3"
            );
          }

          if (tags.length > 0) {
            tl.fromTo(
              tags,
              { opacity: 0, scale: 0.85 },
              { opacity: 1, scale: 1, stagger: 0.035, duration: 0.35, ease: "back.out(1.5)" },
              "-=0.25"
            );
          }
        }
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      id="experience"
      ref={containerRef}
      className="section section--alt"
      aria-labelledby="experience-heading"
    >
      <div className="container">
        {/* Section Header */}
        <div className="section__header exp__hdr">
          <p className="section__index" data-scramble>Track record</p>
          <h2 className="section__title" id="experience-heading">
            <SplitText text="Experience & education" accentWords={["education"]} />
          </h2>
        </div>

        {/* Kinetic Vertical Timeline */}
        <div className="timeline-wrapper">
          {/* Continuous SVG ruler line that scrubs on scroll */}
          <svg
            className="timeline-ruler-svg"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <line
              x1="1"
              y1="0"
              x2="1"
              y2="100%"
              className="timeline-ruler-track"
            />
            <line
              ref={progressLineRef}
              x1="1"
              y1="0"
              x2="1"
              y2="100%"
              className="timeline-ruler-progress"
            />
          </svg>

          <div className="timeline-items" role="list">
            {experiences.map((exp, i) => (
              <div key={i} className="timeline-node" role="listitem">
                <span className="timeline-node__marker" aria-hidden="true" />
                <div className="timeline-node__content">
                  <time className="timeline-node__period">{exp.period}</time>
                  <h3 className="timeline-node__role">{exp.role}</h3>
                  <p className="timeline-node__company">{exp.company}</p>
                  <p className="timeline-node__desc">{exp.description}</p>

                  <div
                    className="timeline-node__tags"
                    aria-label="Technologies and competencies"
                  >
                    {exp.tags.map((tag) => (
                      <span key={tag} className="tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

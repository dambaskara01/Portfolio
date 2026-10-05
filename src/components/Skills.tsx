"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { skillGroups } from "@/data/portfolioData";
import SplitText from "./SplitText";
import { mountScramble, mountWordReveal } from "@/utils/textFx";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// Add proficiency tiers for technical matrix look (no fabricated percentages)
const tierMap: Record<string, string> = {
  React: "Production",
  "Next.js": "Core",
  TypeScript: "Core",
  Laravel: "Core",
  PHP: "Core",
  MySQL: "Core",
  "Tailwind CSS": "Production",
  "Blade Template": "Production",
  HTML5: "Production",
  "Modern CSS": "Core",
  "Responsive Design": "Production",
  "Node.js": "Production",
  Express: "Production",
  "REST API": "Core",
  GraphQL: "Familiar",
  PostgreSQL: "Production",
  MongoDB: "Familiar",
  Prisma: "Production",
  Supabase: "Production",
  Figma: "Core",
  "Adobe Illustrator": "Production",
  "Adobe Photoshop": "Production",
  "Design Systems": "Core",
  Wireframing: "Core",
  Prototyping: "Production",
  "Git & GitHub": "Core",
  "ERP Architecture": "Core",
  Git: "Core",
  GitHub: "Core",
  Vercel: "Production",
  Docker: "Familiar",
  "CI/CD": "Production",
  "Lighthouse Optimization": "Production",
};

export default function Skills() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      // 1. Header — word rise + scramble-decode label
      mountWordReveal(containerRef.current);
      mountScramble(containerRef.current);

      // 2. Technical Matrix Blueprint reveal: Card box + Staggered rows & tier badge pops
      gsap.utils.toArray<HTMLElement>(".matrix-card").forEach((card, i) => {
        const cardHeader = card.querySelector(".matrix-card__header");
        const items = card.querySelectorAll(".matrix-card__item");
        const tiers = card.querySelectorAll(".matrix-card__skill-tier");

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: "top 88%",
            toggleActions: "play none none reverse",
          },
        });

        tl.fromTo(
          card,
          { y: 36, opacity: 0, scale: 0.97 },
          { y: 0, opacity: 1, scale: 1, duration: 0.75, ease: "power3.out", delay: i * 0.08 }
        );

        if (cardHeader) {
          tl.fromTo(
            cardHeader,
            { opacity: 0, y: -8 },
            { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" },
            "-=0.5"
          );
        }

        if (items.length > 0) {
          tl.fromTo(
            items,
            { x: -14, opacity: 0 },
            { x: 0, opacity: 1, stagger: 0.03, duration: 0.4, ease: "power3.out" },
            "-=0.35"
          );
        }

        if (tiers.length > 0) {
          tl.fromTo(
            tiers,
            { scale: 0.8, opacity: 0 },
            { scale: 1, opacity: 1, stagger: 0.03, duration: 0.35, ease: "back.out(2)" },
            "-=0.3"
          );
        }
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      id="skills"
      ref={containerRef}
      className="section"
      aria-labelledby="skills-heading"
    >
      <div className="container">
        {/* Section Header */}
        <div className="section__header skills__hdr">
          <p className="section__index" data-scramble>Technical matrix</p>
          <h2 className="section__title" id="skills-heading">
            <SplitText text="Tools & technology stack" accentWords={["stack"]} />
          </h2>
        </div>

        {/* Technical Specification Matrix */}
        <div className="skills-matrix" role="list">
          {skillGroups.map((group, groupIdx) => (
            <div key={group.category} className="matrix-card">
              <div className="matrix-card__header">
                <h3 className="matrix-card__cat">{group.category}</h3>
                <span className="matrix-card__count">
                  0{groupIdx + 1} / {group.items.length} skills
                </span>
              </div>

              <div className="matrix-card__list" role="list">
                {group.items.map((skill) => (
                  <div key={skill} className="matrix-card__item">
                    <span className="matrix-card__skill-name">{skill}</span>
                    <span className="matrix-card__skill-tier">
                      {tierMap[skill] || "Production"}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

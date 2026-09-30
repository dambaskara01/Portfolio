"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { skillGroups } from "@/data/portfolioData";

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
  GSAP: "Core",
  ScrollTrigger: "Core",
  "CSS Animations": "Production",
  "Micro-interactions": "Production",
  "Framer Motion": "Production",
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
      // 1. Header bidirectional reveal
      gsap.fromTo(
        ".skills__hdr > *",
        { y: 28, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.75,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".skills__hdr",
            start: "top 88%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // 2. Matrix cards reveal
      gsap.fromTo(
        ".matrix-card",
        { y: 45, opacity: 0, scale: 0.96 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          stagger: 0.1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".skills-matrix",
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
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
          <p className="section__index">Technical matrix</p>
          <h2 className="section__title" id="skills-heading">
            Tools &amp; technology stack
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

"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface DisciplineItem {
  number: string;
  title: string;
  description: string;
  deliverables: string[];
  tools: string[];
}

const DISCIPLINES: DisciplineItem[] = [
  {
    number: "01",
    title: "Fullstack Engineering",
    description:
      "Modern web architecture and enterprise systems using Next.js, Laravel, TypeScript, PHP, and relational databases. From schema design to deployment.",
    deliverables: [
      "High-performance fullstack web applications",
      "RESTful & GraphQL API architecture",
      "Relational database schemas & query optimization",
    ],
    tools: ["Next.js", "TypeScript", "Laravel", "PostgreSQL", "MySQL", "Prisma"],
  },
  {
    number: "02",
    title: "UI/UX & Product Design",
    description:
      "Wireframes, user flows, and interactive prototypes in Figma. Structured design systems for analytical dashboards and operational platforms.",
    deliverables: [
      "Design systems & component token libraries",
      "High-fidelity interactive prototyping",
      "User research, wireframing & usability testing",
    ],
    tools: ["Figma", "Design Systems", "Prototyping", "WCAG Testing"],
  },
  {
    number: "03",
    title: "Graphic & Brand Identity",
    description:
      "Visual identity systems: vector logos, typography guidelines, and coherent asset libraries crafted for lasting impact.",
    deliverables: [
      "Brand identity guidelines & vector logomarks",
      "Editorial typography & visual hierarchy",
      "Vector assets & marketing collateral",
    ],
    tools: ["Adobe Illustrator", "Photoshop", "Typography", "Vector"],
  },
];

export default function Disciplines() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useGSAP(
    () => {
      // Header â€” clip-path + y slide
      gsap.fromTo(
        ".disc__label, .disc__heading",
        { y: 32, opacity: 0, clipPath: "inset(0 0 100% 0)" },
        {
          y: 0,
          opacity: 1,
          clipPath: "inset(0 0 0% 0)",
          stagger: 0.12,
          duration: 0.9,
          ease: "power4.out",
          scrollTrigger: {
            trigger: ".disc__hdr",
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Rows — separator draws in, then num+title slide up
      gsap.utils.toArray<HTMLElement>(".disc-row").forEach((row, i) => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: row,
            start: "top 92%",
            toggleActions: "play none none reverse",
          },
        });

        tl.fromTo(
          row.querySelector(".disc-row__sep"),
          { scaleX: 0 },
          { scaleX: 1, duration: 0.55, ease: "power2.inOut", delay: i * 0.06 }
        ).fromTo(
          [row.querySelector(".disc-row__num"), row.querySelector(".disc-row__title")],
          { y: 28, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.07, duration: 0.55, ease: "power3.out" },
          "-=0.3"
        );
      });
    },
    { scope: sectionRef }
  );

  const handleRowClick = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section
      id="disciplines"
      ref={sectionRef}
      className="disc-section section"
      aria-labelledby="disc-heading"
    >
      <div className="container">
        {/* Header */}
        <div className="disc__hdr section__header">
          <p className="section__index disc__label">Core disciplines</p>
          <h2 className="section__title disc__heading" id="disc-heading">
            What I work on
          </h2>
        </div>

        {/* Rows */}
        <div className="disc-list" role="list">
          {DISCIPLINES.map((item, index) => {
            const isOpen = activeIndex === index;
            return (
              <div
                key={item.number}
                className={`disc-row${isOpen ? " disc-row--open" : ""}`}
                onClick={() => handleRowClick(index)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleRowClick(index);
                  }
                }}
                tabIndex={0}
                role="button"
                aria-expanded={isOpen}
                aria-label={`${item.title}: toggle details`}
              >
                {/* Top separator */}
                <div className="disc-row__sep" aria-hidden="true" />

                {/* Main row */}
                <div className="disc-row__main">
                  <span className="disc-row__num" aria-hidden="true">
                    {item.number}
                  </span>

                  <h3 className="disc-row__title">{item.title}</h3>

                  <span className="disc-row__arrow" aria-hidden="true">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M4 10H16M16 10L11 5M16 10L11 15"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </div>

                {/* Animated drawer */}
                <div className="disc-row__drawer" aria-hidden={!isOpen}>
                  <div className="disc-row__drawer-inner">
                    <p className="disc-row__desc">{item.description}</p>

                    <div className="disc-row__right">
                      <p className="disc-row__right-label">Deliverables</p>
                      <ul className="disc-row__deliverables">
                        {item.deliverables.map((d, i) => (
                          <li key={i} className="disc-row__deliv-item">
                            {d}
                          </li>
                        ))}
                      </ul>

                      <div className="disc-row__tools">
                        {item.tools.map((tool) => (
                          <span key={tool} className="tag">
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom separator on last row */}
                {index === DISCIPLINES.length - 1 && (
                  <div className="disc-row__sep disc-row__sep--bottom" aria-hidden="true" />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { personal } from "@/data/portfolioData";
import { mountScramble, mountMagnetic } from "@/utils/textFx";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Contact() {
  const containerRef = useRef<HTMLElement>(null);
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(personal.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch {
      window.location.href = `mailto:${personal.email}`;
    }
  };

  const socials = [
    { label: "GitHub", href: personal.github },
    { label: "LinkedIn", href: personal.linkedin },
    { label: "Dribbble", href: personal.dribbble },
    { label: "Behance", href: personal.behance },
  ];

  useGSAP(
    () => {
      mountScramble(containerRef.current);
      const unbindMagnetic = mountMagnetic(containerRef.current);

      // 1. Divider line scale
      gsap.fromTo(
        ".contact__line",
        { scaleX: 0 },
        {
          scaleX: 1,
          transformOrigin: "left",
          duration: 0.8,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 88%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // 2. Left side: split line-by-line masked typography reveal
      const textTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".contact__grid",
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });

      textTl
        .fromTo(
          ".contact__left .section__index",
          { opacity: 0, x: -20 },
          { opacity: 1, x: 0, duration: 0.5, ease: "power3.out" }
        )
        .fromTo(
          ".contact__line-inner",
          { yPercent: 110, opacity: 0 },
          { yPercent: 0, opacity: 1, stagger: 0.12, duration: 0.85, ease: "power4.out" },
          "-=0.3"
        )
        .fromTo(
          ".contact__subtext",
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.65, ease: "power3.out" },
          "-=0.4"
        );

      // 3. Right side: Email box & social pills stagger
      gsap.fromTo(
        ".contact__panel > *",
        { y: 35, opacity: 0, scale: 0.98 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          stagger: 0.14,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".contact__grid",
            start: "top 82%",
            toggleActions: "play none none reverse",
          },
        }
      );
      return () => unbindMagnetic();
    },
    { scope: containerRef }
  );

  return (
    <section
      id="contact"
      ref={containerRef}
      className="contact-section"
      aria-labelledby="contact-heading"
    >
      <div className="container">
        <div
          className="section-rule contact__line"
          style={{ marginBottom: "var(--s-64)" }}
        />

        <div className="contact__grid">
          {/* Left Column: Big Editorial Statement with Line Masks */}
          <div className="contact__left">
            <p className="section__index" data-scramble>Get in touch</p>
            <h2 className="contact__big-type" id="contact-heading">
              <span className="contact__line-mask">
                <span className="contact__line-inner">Have a project in mind?</span>
              </span>
              <span className="contact__line-mask">
                <span className="contact__line-inner">Let&apos;s connect.</span>
              </span>
            </h2>
            <p className="contact__subtext">
              Always open to engineering opportunities, freelance collaborations, and
              creative technical ventures. Drop a message and let&apos;s discuss what we can build.
            </p>
          </div>

          {/* Right Column: Interactive Action Box & Socials */}
          <div className="contact__panel">
            <div className="contact__email-box">
              <span className="contact__email-label">Primary Email</span>
              <span className="contact__email-address">{personal.email}</span>

              <div className="contact__email-buttons">
                <button
                  type="button"
                  data-magnetic
                  className="contact__copy-btn"
                  onClick={copyEmail}
                  aria-label="Copy email address to clipboard"
                >
                  {copied ? "Copied to Clipboard!" : "Copy Email"}
                </button>
                <a
                  href={`mailto:${personal.email}`}
                  className="contact__mail-btn"
                  aria-label={`Open email client for ${personal.email}`}
                >
                  Open Mail Client
                </a>
              </div>

              {copied && (
                <div className="contact__toast" role="status">
                  <span aria-hidden="true">&#10003;</span>
                  <span>Email address successfully copied to clipboard!</span>
                </div>
              )}
            </div>

            {/* Social Network Links */}
            <div>
              <p
                className="t-mono t-muted"
                style={{
                  fontSize: "11px",
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                  marginBottom: "16px",
                }}
              >
                Other Channels
              </p>
              <nav aria-label="Social media links">
                <ul className="contact__social-strip" role="list">
                  {socials.map((social) => (
                    <li key={social.label}>
                      <a
                        href={social.href}
                        className="contact__social-link"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Visit ${social.label} profile of ${personal.name}`}
                      >
                        <span>{social.label}</span>
                        <span
                          style={{
                            fontSize: "11px",
                            marginLeft: "4px",
                            opacity: 0.6,
                          }}
                          aria-hidden="true"
                        >
                          &#8599;
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

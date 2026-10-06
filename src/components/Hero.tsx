"use client";

import { Fragment, useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { usePageTransition } from "./PageTransition";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type Lang = "en" | "id";

const LANGS: { code: Lang; label: string; name: string }[] = [
  { code: "en", label: "EN", name: "English" },
  { code: "id", label: "ID", name: "Bahasa Indonesia" },
];

const COPY: Record<
  Lang,
  {
    lead: string;
    bioRaw: string;
    nav: Record<string, string>;
    photoLabel: string;
    langGroup: string;
  }
> = {
  en: {
    lead: "Adham Baskara, fullstack developer and UI/UX designer.",
    bioRaw:
      "I'm a 7th-semester Informatics Engineering student at Polinema and a fullstack developer intern at PT. Multi Spunindo Jaya Tbk. I build web applications with Next.js, Laravel, and React, and design the interfaces they run on.",
    nav: {
      "#engineering": "Engineering",
      "#uiux": "UI/UX Design",
      "#branding": "Graphic Identity",
      "#skills": "Skills",
      "#experience": "Experience",
      "#contact": "Contact",
    },
    photoLabel: "Portrait photo placeholder",
    langGroup: "Language",
  },
  id: {
    lead: "Adham Baskara, fullstack developer dan UI/UX designer.",
    bioRaw:
      "Saya mahasiswa semester 7 Teknik Informatika di Polinema dan magang sebagai fullstack developer di PT. Multi Spunindo Jaya Tbk. Saya membangun aplikasi web dengan Next.js, Laravel, dan React, lalu merancang antarmuka yang dipakainya.",
    nav: {
      "#engineering": "Engineering",
      "#uiux": "Desain UI/UX",
      "#branding": "Identitas Grafis",
      "#skills": "Keahlian",
      "#experience": "Pengalaman",
      "#contact": "Kontak",
    },
    photoLabel: "Tempat foto potret",
    langGroup: "Bahasa",
  },
};

const NAV_TITLES: Record<string, string> = {
  "#engineering": "01 // FULLSTACK ENGINEERING",
  "#uiux": "02 // UI/UX & PRODUCT DESIGN",
  "#branding": "03 // GRAPHIC & BRAND IDENTITY",
  "#skills": "04 // TECHNICAL STACK",
  "#experience": "05 // WORK HISTORY",
  "#contact": "06 // INQUIRIES & CONTACT",
};

const clockFormat = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Asia/Jakarta",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hourCycle: "h23",
});

export default function Hero() {
  const { navigate } = usePageTransition();
  const [lang, setLang] = useState<Lang>("en");
  const [time, setTime] = useState<string | null>(null);

  const rootRef = useRef<HTMLElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);
  const langRef = useRef<HTMLDivElement>(null);
  const clockRef = useRef<HTMLParagraphElement>(null);
  const bioRef = useRef<HTMLDivElement>(null);
  const hasMountedRef = useRef(false);

  const copy = COPY[lang];
  const restWords = useMemo(() => copy.bioRaw.split(" ").filter(Boolean), [copy.bioRaw]);
  const leadWords = useMemo(() => copy.lead.split(" ").filter(Boolean), [copy.lead]);

  // Live Jakarta clock interval
  useEffect(() => {
    const id = setInterval(() => setTime(clockFormat.format(new Date())), 1000);
    const first = setTimeout(() => setTime(clockFormat.format(new Date())), 0);
    return () => {
      clearInterval(id);
      clearTimeout(first);
    };
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  // Master Editorial Entrance Sequence
  useGSAP(
    () => {
      if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        hasMountedRef.current = true;
        return;
      }

      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        onComplete: () => {
          hasMountedRef.current = true;
        },
      });

      // 1. Panel arrival
      tl.fromTo(
        panelRef.current,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.85, ease: "power3.out" }
      );

      // 2. Portrait architectural curtain wipe
      tl.fromTo(
        portraitRef.current,
        { clipPath: "inset(0% 0% 100% 0%)", opacity: 0.6 },
        { clipPath: "inset(0% 0% 0% 0%)", opacity: 1, duration: 0.95, ease: "power4.inOut" },
        "-=0.55"
      );

      // 3. Top meta: language toggle & clock drop-in
      tl.fromTo(
        [langRef.current, clockRef.current],
        { opacity: 0, y: -10 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.08 },
        "-=0.6"
      );

      // 4. Bio words rise from mask
      tl.fromTo(
        ".hero__word",
        { yPercent: 115, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 0.85, ease: "power4.out", stagger: 0.012 },
        "-=0.55"
      );

      // 5. Section nav links cascade up
      tl.fromTo(
        ".hero__nav-link",
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.05 },
        "-=0.5"
      );

      // 6. Scroll-Driven Exit: Editorial Multi-Depth Disperse & Shutter
      const exitTl = gsap.timeline({
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.75,
          invalidateOnRefresh: true,
        },
      });

      exitTl
        // A. Panel spatial depth recede & curved edge contraction
        .to(
          panelRef.current,
          {
            scale: 0.92,
            opacity: 0.25,
            borderRadius: "36px",
            filter: "blur(1.5px)",
            transformOrigin: "center 25%",
            ease: "none",
          },
          0
        )
        // B. Portrait architectural shutter wipe & parallax lift
        .to(
          portraitRef.current,
          {
            clipPath: "inset(0% 0% 50% 0%)",
            y: -45,
            scale: 0.96,
            opacity: 0.35,
            ease: "none",
          },
          0
        )
        // C. Top meta (language toggle & live clock) slide up
        .to(
          [langRef.current, clockRef.current],
          {
            y: -35,
            opacity: 0,
            stagger: 0.04,
            ease: "none",
          },
          0
        )
        // D. Bio words cascading shutter sink into word-masks
        .to(
          ".hero__word",
          {
            yPercent: 110,
            opacity: 0.15,
            stagger: {
              each: 0.007,
              from: "start",
            },
            ease: "none",
          },
          0
        )
        // E. Nav links subtle downward cascade
        .to(
          ".hero__nav-link",
          {
            y: 20,
            opacity: 0,
            stagger: 0.025,
            ease: "none",
          },
          0
        );
    },
    { scope: rootRef }
  );

  // Micro-crossfade on language change (after initial entrance has finished)
  useEffect(() => {
    if (!hasMountedRef.current) return;
    if (bioRef.current) {
      gsap.fromTo(
        bioRef.current,
        { opacity: 0.25, y: 4 },
        { opacity: 1, y: 0, duration: 0.18, ease: "power2.out" }
      );
    }
  }, [lang]);

  return (
    <section id="hero" ref={rootRef} className="hero" aria-label="Introduction">
      <div ref={panelRef} className="hero__panel">
        <div className="hero__top">
          <div ref={portraitRef} className="hero__portrait" role="img" aria-label={copy.photoLabel}>
            <span className="hero__portrait-label">[PHOTO]</span>
          </div>

          <div ref={langRef} className="hero__lang" role="group" aria-label={copy.langGroup}>
            {LANGS.map((l) => (
              <button
                key={l.code}
                type="button"
                className="hero__lang-btn"
                aria-pressed={lang === l.code}
                lang={l.code}
                title={l.name}
                onClick={() => setLang(l.code)}
              >
                {l.label}
              </button>
            ))}
          </div>

          <p ref={clockRef} className="hero__clock" role="timer" aria-label="Current time in Jakarta">
            <span className="hero__clock-time">{time ?? "--:--:--"}</span>
          </p>
        </div>

        <div className="hero__bottom">
          <div className="hero__intro">
            <div ref={bioRef} className="hero__bio">
              <h1 className="hero__lead">
                {leadWords.map((word, i) => (
                  <Fragment key={`lead-${i}`}>
                    <span className="hero__word-mask">
                      <span className="hero__word">{word}</span>
                    </span>
                    {i < leadWords.length - 1 ? " " : null}
                  </Fragment>
                ))}
              </h1>{" "}
              <span className="hero__rest">
                {restWords.map((word, i) => (
                  <Fragment key={`rest-${i}-${word}`}>
                    <span className="hero__word-mask">
                      <span className="hero__word">{word}</span>
                    </span>
                    {i < restWords.length - 1 ? " " : null}
                  </Fragment>
                ))}
              </span>
            </div>
          </div>

          <nav className="hero__nav" aria-label="Sections">
            {Object.entries(copy.nav).map(([href, label]) => (
              <a
                key={href}
                href={href}
                className="hero__nav-link"
                onClick={(e) => {
                  e.preventDefault();
                  navigate(href, NAV_TITLES[href]);
                }}
              >
                {label}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </section>
  );
}

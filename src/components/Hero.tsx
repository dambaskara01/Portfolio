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
  "#engineering": "Engineering",
  "#uiux": "UI/UX Design",
  "#branding": "Graphic Identity",
  "#skills": "Skills & Technologies",
  "#experience": "Experience",
  "#contact": "Contact",
};

const clockFormat = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Asia/Jakarta",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hourCycle: "h23",
});

function JakartaClock() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const update = () => setTime(clockFormat.format(new Date()));
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  return <span className="hero__clock-time">{time ?? "--:--:--"}</span>;
}

export default function Hero() {
  const { navigate } = usePageTransition();
  const [lang, setLang] = useState<Lang>("en");

  const rootRef = useRef<HTMLElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);
  const langRef = useRef<HTMLDivElement>(null);
  const clockRef = useRef<HTMLParagraphElement>(null);
  const bioRef = useRef<HTMLDivElement>(null);
  const hasMountedRef = useRef(false);
  const entranceTlRef = useRef<gsap.core.Timeline | null>(null);

  const copy = COPY[lang];
  const restWords = useMemo(() => copy.bioRaw.split(" ").filter(Boolean), [copy.bioRaw]);
  const leadWords = useMemo(() => copy.lead.split(" ").filter(Boolean), [copy.lead]);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  // 1. Master Editorial Entrance Sequence (runs once on mount)
  useGSAP(
    () => {
      const prefersReducedMotion =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (prefersReducedMotion) {
        gsap.set(panelRef.current, { opacity: 1, y: 0, scale: 1 });
        gsap.set(portraitRef.current, { clipPath: "inset(0% 0% 0%)", opacity: 1, y: 0 });
        gsap.set([langRef.current, clockRef.current], { opacity: 1, y: 0 });
        gsap.set(".hero__word", { y: 0, yPercent: 0, opacity: 1, clearProps: "transform" });
        gsap.set(".hero__nav-link", { opacity: 1, y: 0 });
        hasMountedRef.current = true;
        return;
      }

      const initialScroll = typeof window !== "undefined" ? window.scrollY : 0;

      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        onComplete: () => {
          hasMountedRef.current = true;
          gsap.set(".hero__word", { y: 0, yPercent: 0, opacity: 1, clearProps: "transform" });
        },
      });
      entranceTlRef.current = tl;

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
        { yPercent: 115, y: 0, opacity: 0 },
        { yPercent: 0, y: 0, opacity: 1, duration: 0.85, ease: "power4.out", stagger: 0.012 },
        "-=0.55"
      );

      // 5. Section nav links cascade up
      tl.fromTo(
        ".hero__nav-link",
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.05 },
        "-=0.5"
      );

      // If page was already scrolled on mount (e.g. reload midway), jump straight to finished resting state
      if (initialScroll > 80) {
        tl.progress(1);
        hasMountedRef.current = true;
      }
    },
    { scope: rootRef }
  );

  // 2. Scroll-Driven Exit & Re-Entry Sequence (synced with language switches)
  useGSAP(
    () => {
      const prefersReducedMotion =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (prefersReducedMotion) return;

      const resetHeroToRest = () => {
        if (panelRef.current) {
          gsap.set(panelRef.current, {
            scale: 1,
            opacity: 1,
            borderRadius: "10px",
            filter: "blur(0px)",
            y: 0,
          });
        }
        if (portraitRef.current) {
          gsap.set(portraitRef.current, {
            clipPath: "inset(0% 0% 0% 0%)",
            y: 0,
            scale: 1,
            opacity: 1,
          });
        }
        if (langRef.current && clockRef.current) {
          gsap.set([langRef.current, clockRef.current], { y: 0, opacity: 1 });
        }
        gsap.set(".hero__word", { y: 0, yPercent: 0, opacity: 1, clearProps: "transform" });
        gsap.set(".hero__nav-link", { y: 0, opacity: 1 });
      };

      const exitTl = gsap.timeline({
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.75,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            // If the user scrolls before entrance sequence completes, immediately conclude entrance
            if (self.progress > 0 && entranceTlRef.current && entranceTlRef.current.progress() < 1) {
              entranceTlRef.current.progress(1);
            }
            if (self.progress === 0) {
              resetHeroToRest();
            }
          },
          onLeaveBack: resetHeroToRest,
        },
      });

      exitTl
        // A. Panel spatial depth recede & curved edge contraction
        .fromTo(
          panelRef.current,
          {
            scale: 1,
            opacity: 1,
            borderRadius: "10px",
            filter: "blur(0px)",
            transformOrigin: "center 25%",
          },
          {
            scale: 0.96,
            opacity: 0.25,
            borderRadius: "20px",
            transformOrigin: "center 25%",
            ease: "none",
            immediateRender: false,
          },
          0
        )
        // B. Portrait architectural shutter wipe & parallax lift
        .fromTo(
          portraitRef.current,
          {
            clipPath: "inset(0% 0% 0% 0%)",
            y: 0,
            scale: 1,
            opacity: 1,
          },
          {
            clipPath: "inset(0% 0% 50% 0%)",
            y: -45,
            scale: 0.96,
            opacity: 0.35,
            ease: "none",
            immediateRender: false,
          },
          0.04
        )
        // C. Top meta (language toggle & live clock) slide up
        .fromTo(
          [langRef.current, clockRef.current],
          {
            y: 0,
            opacity: 1,
          },
          {
            y: -35,
            opacity: 0,
            stagger: 0.04,
            ease: "none",
            immediateRender: false,
          },
          0.06
        )
        // D. Bio words cascading shutter sink into word-masks
        .fromTo(
          ".hero__word",
          {
            yPercent: 0,
            y: 0,
            opacity: 1,
          },
          {
            yPercent: 110,
            y: 0,
            opacity: 0.15,
            stagger: {
              each: 0.007,
              from: "start",
            },
            ease: "none",
            immediateRender: false,
          },
          0.1
        )
        // E. Nav links subtle downward cascade
        .fromTo(
          ".hero__nav-link",
          {
            y: 0,
            opacity: 1,
          },
          {
            y: 20,
            opacity: 0,
            stagger: 0.025,
            ease: "none",
            immediateRender: false,
          },
          0.12
        );
    },
    { scope: rootRef, dependencies: [lang] }
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
            <JakartaClock />
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

"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return true;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function isFinePointer(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(hover: hover) and (pointer: fine)").matches;
}

const SCRAMBLE_CHARS = "!<>-_\\/[]{}=+*^?#%$@~";

/**
 * Scramble-decode reveal for short mono labels ([data-scramble]).
 * The final text stays in HTML; on scroll-enter JS scrambles it and decodes
 * letter-by-letter. Reduced motion: element untouched.
 */
export function mountScramble(root: HTMLElement | null): void {
  if (!root || prefersReducedMotion()) return;

  root.querySelectorAll<HTMLElement>("[data-scramble]").forEach((el) => {
    if (el.dataset.scrambleBound === "1") return;
    el.dataset.scrambleBound = "1";

    const finalText = el.textContent ?? "";
    if (!finalText || el.children.length > 0) return;

    const run = () => {
      const durationMs = Math.min(220 + finalText.length * 42, 900);
      const startTime = performance.now();

      const tick = (now: number) => {
        const progress = Math.min((now - startTime) / durationMs, 1);
        const revealed = Math.floor(progress * finalText.length);
        let out = finalText.slice(0, revealed);
        for (let i = revealed; i < finalText.length; i++) {
          const c = finalText[i];
          out += c === " " ? " " : SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
        }
        el.textContent = out;
        if (progress < 1) {
          requestAnimationFrame(tick);
        } else {
          el.textContent = finalText;
        }
      };
      requestAnimationFrame(tick);
    };

    ScrollTrigger.create({ trigger: el, start: "top 94%", once: true, onEnter: run });
  });
}

/**
 * Word rise-from-mask for .split blocks (server-rendered by SplitText.tsx).
 * Each .split-word slides up behind its .word-mask with a slight rotation,
 * staggered; transform cleared on complete so the mask stays crisp.
 */
export function mountWordReveal(root: HTMLElement | null): void {
  if (!root || prefersReducedMotion()) return;

  root.querySelectorAll<HTMLElement>(".split").forEach((block) => {
    const words = block.querySelectorAll<HTMLElement>(".split-word");
    if (words.length === 0) return;

    gsap.fromTo(
      words,
      { yPercent: 112, rotate: 3.5, transformOrigin: "left bottom" },
      {
        yPercent: 0,
        rotate: 0,
        duration: 0.9,
        ease: "power4.out",
        stagger: 0.055,
        scrollTrigger: {
          trigger: block,
          start: "top 88%",
          toggleActions: "play none none reverse",
        },
      }
    );
  });
}

/**
 * Magnetic pull for [data-magnetic] controls. A GSAP tween per element with
 * elastic return; only active on fine pointers (never on touch).
 */
export function mountMagnetic(root: HTMLElement | null): () => void {
  if (!root || !isFinePointer() || prefersReducedMotion()) return () => {};

  const els = Array.from(root.querySelectorAll<HTMLElement>("[data-magnetic]"));
  const cleanups: Array<() => void> = [];

  els.forEach((el) => {
    const setX = gsap.quickTo(el, "x", { duration: 0.32, ease: "power3.out" });
    const setY = gsap.quickTo(el, "y", { duration: 0.32, ease: "power3.out" });

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const relX = e.clientX - (rect.left + rect.width / 2);
      const relY = e.clientY - (rect.top + rect.height / 2);
      setX(Math.max(-7, Math.min(7, relX * 0.28)));
      setY(Math.max(-7, Math.min(7, relY * 0.28)));
    };
    const onLeave = () => {
      gsap.to(el, {
        x: 0,
        y: 0,
        duration: 0.7,
        ease: "elastic.out(1, 0.35)",
        overwrite: "auto",
      });
    };

    el.addEventListener("mousemove", onMove, { passive: true });
    el.addEventListener("mouseleave", onLeave);
    cleanups.push(() => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    });
  });

  return () => cleanups.forEach((fn) => fn());
}

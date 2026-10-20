"use client";

import { useEffect, useRef } from "react";

/**
 * Graphic design — filmstrip index.
 *
 * Geometry is measured from the reference thumbnail (353x235 canvas):
 * card 33x43 (ratio 0.77), pitch 35.5, gap 2.5, a clipping window inset 19px
 * from each page edge, one card at 2.1x with a lens-warped edge, the strip
 * centred on the page midline, and the statement set above the strip at 19.3%
 * of the width. Every value below is that measurement expressed as a ratio so
 * the composition scales with the viewport.
 *
 * Cards are solid plates: no artwork ships with this section yet.
 */

const CARD_COUNT = 12;
const FOCUS = 2;

const CARDS = Array.from({ length: CARD_COUNT }, (_, i) => ({
  id: `gd-${String(i + 1).padStart(2, "0")}`,
}));

export default function GraphicDesign() {
  const railRef = useRef<HTMLDivElement>(null);
  const drag = useRef({ active: false, pointerX: 0, scroll: 0 });

  // Open on the measured composition: the focused plate starts at roughly 30%
  // of the window. At desktop width that is already the natural rest position
  // (scrollLeft 0); on narrow screens it keeps the plate in frame instead of
  // letting it sit off the right edge.
  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;

    const place = () => {
      const focus = rail.querySelector<HTMLElement>(".is-focus");
      if (!focus) return;
      const railLeft = rail.getBoundingClientRect().left;
      const focusLeft = focus.getBoundingClientRect().left;
      rail.scrollLeft += focusLeft - railLeft - rail.clientWidth * 0.3;
      if (rail.scrollLeft < 0) rail.scrollLeft = 0;
    };

    place();
    window.addEventListener("resize", place);
    return () => window.removeEventListener("resize", place);
  }, []);

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;

    // Horizontal intent drives the strip; vertical intent is left untouched so
    // the page (and Lenis) keeps scrolling when the cursor is over the rail.
    const onWheel = (event: WheelEvent) => {
      if (Math.abs(event.deltaX) <= Math.abs(event.deltaY)) return;
      event.preventDefault();
      rail.scrollLeft += event.deltaX;
    };

    rail.addEventListener("wheel", onWheel, { passive: false });
    return () => rail.removeEventListener("wheel", onWheel);
  }, []);

  const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    const rail = railRef.current;
    if (!rail || event.pointerType === "touch") return;
    drag.current = {
      active: true,
      pointerX: event.clientX,
      scroll: rail.scrollLeft,
    };
    rail.setPointerCapture(event.pointerId);
  };

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const rail = railRef.current;
    if (!rail || !drag.current.active) return;
    rail.scrollLeft = drag.current.scroll - (event.clientX - drag.current.pointerX);
  };

  const endDrag = (event: React.PointerEvent<HTMLDivElement>) => {
    const rail = railRef.current;
    if (!rail || !drag.current.active) return;
    drag.current.active = false;
    if (rail.hasPointerCapture(event.pointerId)) {
      rail.releasePointerCapture(event.pointerId);
    }
  };

  return (
    <section id="branding" className="gdesign" aria-labelledby="gdesign-title">
      {/* Lens warp for the focused plate: a barrel shape whose four edges bow
          outward, built in objectBoundingBox units so it scales with the card. */}
      <svg className="gdesign__defs" aria-hidden="true" focusable="false">
        <defs>
          <clipPath id="gd-lens" clipPathUnits="objectBoundingBox">
            <path
              d="M0.02,0.06
                 C0.02,0.022 0.24,0.002 0.5,0.002
                 C0.76,0.002 0.98,0.022 0.98,0.06
                 C0.998,0.28 0.998,0.72 0.98,0.94
                 C0.98,0.978 0.76,0.998 0.5,0.998
                 C0.24,0.998 0.02,0.978 0.02,0.94
                 C0.002,0.72 0.002,0.28 0.02,0.06 Z"
            />
          </clipPath>
        </defs>
      </svg>

      <header className="gdesign__bar">
        <p className="gdesign__brand">Adham Baskara</p>
        <p className="gdesign__label">Graphic design</p>
        <nav className="gdesign__nav" aria-label="Graphic design sections">
          <a href="#engineering">Work</a>
          <a href="#uiux">UI/UX</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <div className="gdesign__statement">
        <p className="gdesign__index">(01)</p>
        <h2 id="gdesign-title" className="gdesign__title">
          Identity,
          <br />
          print and editorial
          <br />
          systems, 2019—25
        </h2>
      </div>

      <div
        className="gdesign__rail"
        ref={railRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
      >
        <ul className="gdesign__track">
          {CARDS.map((card, i) => (
            <li
              key={card.id}
              className={`gdesign__card${i === FOCUS ? " is-focus" : ""}`}
              aria-hidden="true"
            />
          ))}
        </ul>
      </div>

      <footer className="gdesign__foot">
        <p className="gdesign__brand">Adham Baskara</p>
        <p className="gdesign__year">(2025)</p>
        <p className="gdesign__col">
          Selected work
          <br />
          Identity · print
          <br />
          Editorial systems
        </p>
        <a className="gdesign__more" href="#contact">
          All work <span aria-hidden="true">↗</span>
        </a>
      </footer>
    </section>
  );
}

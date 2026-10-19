"use client";

import * as React from "react";

export interface WorksWheelItem {
  id: string;
  title: string;
  category?: string;
  year?: string;
  color: string;
  href?: string;
}

export interface WorksWheelProps extends Omit<React.ComponentPropsWithoutRef<"section">, "children"> {
  items: WorksWheelItem[];
  label?: string;
  action?: string;
}

const CARD_H = 0.42; // front card height, ratio of stage height
const CARD_MAX_W = 0.38; // max card width ratio of stage width
const CARD_RATIO = 1.45; // card width / height
const STEP = 38; // degrees between cards on the drum
const DRUM = 2.22; // drum radius
const LENS = 2.7; // perspective distance
const RING_R = 1.18; // ring radius
const BOW = 1.82; // lateral curve arc
const TITLE = 0.085; // ring label and front-card title size factor
const INDEX = 0.038; // index size factor
const CULL = 1.6;

const WHEEL_UNITS = 850;
const DRAG_UNITS = 400;
const SETTLE = 150;
const EASE = 0.12;

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const rad = (deg: number) => (deg * Math.PI) / 180;

const bowAt = (drumDeg: number, bow: number) => -bow * (1 - Math.cos(rad(drumDeg)));

function place(
  ringDeg: number,
  drumDeg: number,
  ringR: number,
  drumR: number,
  bow: number,
  m: number
) {
  return (
    `translateX(${m * bowAt(drumDeg, bow)}px)` +
    ` rotateZ(${(1 - m) * ringDeg}deg) translateY(${-(1 - m) * ringR}px)` +
    ` rotateX(${m * drumDeg}deg) translateZ(${m * drumR}px)`
  );
}

export function WorksWheel({
  items,
  label = "UI/UX Index",
  action = "Explore",
  className,
  ...props
}: WorksWheelProps) {
  const stageRef = React.useRef<HTMLDivElement>(null);
  const wheelRef = React.useRef<HTMLDivElement>(null);
  const cardRefs = React.useRef<(HTMLElement | null)[]>([]);
  const labelRef = React.useRef<HTMLDivElement>(null);
  const titleRef = React.useRef<HTMLDivElement>(null);

  const turn = React.useRef(0);
  const target = React.useRef(0);
  const [active, setActive] = React.useState(0);
  const [stage, setStage] = React.useState<{ w: number; h: number }>({ w: 0, h: 0 });

  const count = items.length;
  const last = Math.max(count - 1, 0);

  const [reduced, setReduced] = React.useState(false);
  React.useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const read = () => setReduced(query.matches);
    read();
    query.addEventListener("change", read);
    return () => query.removeEventListener("change", read);
  }, []);

  React.useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const read = () => setStage({ w: el.clientWidth, h: el.clientHeight });
    read();
    const ro = new ResizeObserver(read);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const metrics = React.useMemo(() => {
    const { w, h } = stage;
    const cardW = Math.min(h * CARD_H * CARD_RATIO, w * CARD_MAX_W);
    const cardH = cardW / CARD_RATIO;
    const drumR = cardH * DRUM;
    const ringR = cardH * RING_R;
    const ringScale = count
      ? clamp((((2 * Math.PI * ringR) / count) * 0.82) / (cardW || 1), 0.16, 1)
      : 1;
    return {
      cardW,
      cardH,
      ringR,
      ringScale,
      drumR,
      bow: cardH * BOW,
      depth: cardH * LENS,
      title: Math.max(28, cardH * TITLE),
      index: Math.max(12, cardH * INDEX),
    };
  }, [stage, count]);

  React.useEffect(() => {
    if (!stage.h) return;
    let frame = 0;
    const { ringR, ringScale, drumR, bow } = metrics;

    const draw = () => {
      frame = requestAnimationFrame(draw);
      const gap = target.current - turn.current;
      if (Math.abs(gap) < 0.0005) turn.current = target.current;
      else turn.current += gap * (reduced ? 1 : EASE);

      const t = turn.current;
      const m = clamp(t, 0, 1);
      const pos = Math.max(0, t - 1);

      if (wheelRef.current) {
        wheelRef.current.style.transform = `translateZ(${-m * drumR}px)`;
      }

      for (let i = 0; i < count; i++) {
        const d = i - pos;
        const drumDeg = d * STEP;
        const card = cardRefs.current[i];
        if (card) {
          card.style.transform = place(
            d * (360 / count),
            drumDeg,
            ringR,
            drumR,
            bow,
            m
          );
          card.style.opacity = m > 0.5 && Math.abs(d) > CULL ? "0" : "1";
          card.style.zIndex = String(Math.round(100 - Math.abs(d) * 2));
        }
        const face = card?.firstElementChild as HTMLElement | null;
        if (face) face.style.transform = `scale(${lerp(ringScale, 1, m)})`;
      }

      if (labelRef.current) labelRef.current.style.opacity = String(1 - m);
      if (titleRef.current) titleRef.current.style.opacity = String(m);
      const near = clamp(Math.round(pos), 0, last);
      setActive((prev) => (prev === near ? prev : near));
    };

    frame = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(frame);
  }, [metrics, stage.h, count, last, reduced]);

  const to = React.useCallback(
    (next: number) => {
      target.current = clamp(next, 0, last + 1);
    },
    [last]
  );

  const settling = React.useRef(0);

  React.useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const onWheel = (event: WheelEvent) => {
      const next = target.current + event.deltaY / WHEEL_UNITS;
      if (next > 0 && next < last + 1) {
        event.preventDefault();
      }
      to(next);
      window.clearTimeout(settling.current);
      settling.current = window.setTimeout(
        () => to(Math.round(target.current)),
        SETTLE
      );
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      el.removeEventListener("wheel", onWheel);
      window.clearTimeout(settling.current);
    };
  }, [to, last]);

  const drag = React.useRef<number | null>(null);

  const activeItem = items[active];

  return (
    <div
      aria-label={label}
      className={`works-wheel-root ${className || ""}`}
      {...props}
    >
      <div
        ref={stageRef}
        tabIndex={0}
        role="listbox"
        aria-label={label}
        aria-activedescendant={`works-wheel-${active}`}
        className="works-wheel-stage"
        style={{ perspective: `${metrics.depth}px` }}
        onPointerDown={(event) => {
          drag.current = event.clientY;
          event.currentTarget.setPointerCapture(event.pointerId);
        }}
        onPointerMove={(event) => {
          if (drag.current === null) return;
          to(target.current + (drag.current - event.clientY) / DRAG_UNITS);
          drag.current = event.clientY;
        }}
        onPointerUp={() => {
          drag.current = null;
          if (target.current > 1) to(Math.round(target.current));
        }}
        onKeyDown={(event) => {
          if (event.key === "ArrowDown") to(Math.round(target.current) + 1);
          else if (event.key === "ArrowUp") to(Math.round(target.current) - 1);
          else return;
          event.preventDefault();
        }}
      >
        <div
          ref={wheelRef}
          className="works-wheel-drum"
        >
          {items.map((item, i) => {
            const isSelected = i === active;
            return (
              <div
                key={item.id}
                id={`works-wheel-${i}`}
                role="option"
                aria-selected={isSelected}
                ref={(node: HTMLElement | null) => {
                  cardRefs.current[i] = node;
                }}
                className={`works-wheel-card ${isSelected ? "is-active" : ""}`}
                style={{
                  width: metrics.cardW,
                  height: metrics.cardH,
                  marginLeft: -metrics.cardW / 2,
                  marginTop: -metrics.cardH / 2,
                }}
                onClick={() => to(i + 1)}
              >
                <div className="works-wheel-card-inner">
                  {/* Card Visual / Solid Rectangular Canvas */}
                  <div
                    className="works-wheel-card-canvas"
                    style={{ backgroundColor: item.color }}
                  >
                    <div className="works-wheel-card-noise" />
                    
                    <div className="works-wheel-card-badge">
                      <span className="works-wheel-card-index">{String(i + 1).padStart(2, "0")}</span>
                      <span className="works-wheel-card-cat">{item.category}</span>
                    </div>

                    <div className="works-wheel-card-footer">
                      <span className="works-wheel-card-title">{item.title}</span>
                      {item.year && <span className="works-wheel-card-year">{item.year}</span>}
                    </div>

                    {action && (
                      <div className="works-wheel-card-cta">
                        <span>{action}</span>
                        <svg viewBox="0 0 12 12" className="works-wheel-cta-icon" aria-hidden="true">
                          <path
                            d="M3 9 9 3M4 3h5v5"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.4"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Central Ring Label at rest */}
      <div
        ref={labelRef}
        className="works-wheel-center-label"
        style={{ fontSize: metrics.title }}
      >
        <span className="t-mono works-wheel-center-tag">[TURN TO BROWSE]</span>
        <span className="works-wheel-center-heading">{label}</span>
      </div>

      {/* Dynamic Title for Front Card during drum rotation */}
      <div
        ref={titleRef}
        className="works-wheel-side-title"
        style={{ fontSize: metrics.title }}
      >
        <div className="works-wheel-side-meta">
          <span className="t-mono">{activeItem?.category}</span>
          <span className="t-mono">{activeItem?.year}</span>
        </div>
        <div className="works-wheel-side-name">{activeItem?.title}</div>
      </div>

      {/* Minimalist Swiss Index on Right */}
      <nav className="works-wheel-nav" aria-label="Projects Index">
        <div className="works-wheel-nav-header t-mono">[INDEX 01–{String(count).padStart(2, "0")}]</div>
        <ol className="works-wheel-nav-list">
          {items.map((item, i) => (
            <li key={item.id} className="works-wheel-nav-item">
              <button
                type="button"
                onClick={() => to(i + 1)}
                className={`works-wheel-nav-btn ${i === active ? "is-active" : ""}`}
              >
                <span className="works-wheel-nav-num">{String(i + 1).padStart(2, "0")}</span>
                <span className="works-wheel-nav-text">{item.title}</span>
              </button>
            </li>
          ))}
        </ol>
      </nav>
    </div>
  );
}

export default WorksWheel;

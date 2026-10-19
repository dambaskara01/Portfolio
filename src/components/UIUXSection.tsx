"use client";

import { WorksWheel, type WorksWheelItem } from "@/components/ui/works-wheel";

const ART = (name: string) => `https://www.crafterui.com/art/${name}.jpg`;

const WORKS: WorksWheelItem[] = [
  {
    title: "Design 01",
    image: ART("prismatic-rift-anime"),
    href: "#design-01",
  },
  {
    title: "Design 02",
    image: ART("black-hole-ember-clouds"),
    href: "#design-02",
  },
  {
    title: "Design 03",
    image: ART("neon-cave-portal-silhouette"),
    href: "#design-03",
  },
  {
    title: "Design 04",
    image: ART("red-ribbon-typography"),
    href: "#design-04",
  },
  {
    title: "Design 05",
    image: ART("celestial-light-figure"),
    href: "#design-05",
  },
  {
    title: "Design 06",
    image: ART("neon-portrait-uplight"),
    href: "#design-06",
  },
  {
    title: "Design 07",
    image: ART("indigo-liquid-marble"),
    href: "#design-07",
  },
  {
    title: "Design 08",
    image: ART("rocket-launch-gradient"),
    href: "#design-08",
  },
  {
    title: "Design 09",
    image: ART("astronaut-cosmic-wave"),
    href: "#design-09",
  },
];

export default function UIUXSection() {
  return (
    <div
      id="uiux"
      className="works-wheel-demo-container"
    >
      <WorksWheel items={WORKS} label="UI / UX" action="View" />
    </div>
  );
}

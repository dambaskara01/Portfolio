# DESIGN.md — Portfolio Design Direction

## Identity

**Product:** Personal portfolio of Adham Baskara, Fullstack Engineering & UI/UX Designer (7th-semester student at Polinema, Fullstack Developer Intern at PT. Multi Spunindo Jaya Tbk).
**Audience:** Recruiters, engineering leads, tech startup founders, and design-minded collaborators assessing technical craftsmanship and aesthetic precision.
**Character:** Pitch Black & Pure Silver/Chrome. Modern Neo-Grotesque Swiss aesthetic. Crisp, ultra-sleek, disciplined monochrome palette engineered for high contrast and modern digital depth.

## Personality

- **Monochromatic Discipline** — Pure pitch black void (#050505), crisp stark white typography (#FFFFFF), and precision titanium/silver accents (#9E9EA7, #D1D1D6). No distracting neon or warm colors.
- **Inverted Contrast & White Glow** — Key actions, active filters, and interactive focal points utilize solid stark white surfaces with pitch-black typography, surrounded by soft white ambient luminescence.
- **Grayscale Default, Color Reveal** — Project media and screenshots rest in calm, elegant grayscale, smoothly blooming into full vibrancy on hover and inspection.
- **Neo-Grotesque Typographic Hierarchy** — Bold Swiss sans-serif (Inter / Manrope) with tight letter-tracking, paired with DM Mono for architectural metadata and technical telemetry.
- **Tactile Depth** — Subtle ambient silver radial lighting and hairline borders (1px) create structural dimensionality without visual clutter.

## Palette

- **Base:** `#050505` (void — deep pitch black)
- **Surface:** `#0E0E11` (elevated cards, matrix containers) · **Highlight:** `#15151A` (hover fills, tag chips)
- **Ink:** `#FFFFFF` (primary text — crisp pure white)
- **Muted:** `#9E9EA7` (secondary text, technical metadata, labels — refined zinc/silver)
- **Rule:** `#222226` (dividers, hairline borders) · **Border-strong:** `#33333A`
- **Accent:** `#FFFFFF` (inverted high-contrast actions, active states, progress, cursor) · **Silver:** `#D1D1D6` (hover links, metadata highlights) · **Accent-deep:** `#E5E5EA`
- **Card Foil:** `#121216` with `#FFFFFF` ink (frosted titanium wireframe cards, floating HUD)
- **Ambient Glow:** `rgba(255, 255, 255, 0.08)` to `rgba(255, 255, 255, 0.22)`

> Rationale: Pitch black (#050505) provides infinite contrast for pure white text and metallic chrome accents; grayscale-by-default media keeps the portfolio visually cohesive while allowing the original work to shine dynamically upon user engagement.

## Typography

- **Display / Headings / Large Titles:** `Inter` / `Manrope` (bold neo-grotesque, letter-spacing -0.025em to -0.04em).
- **Body / UI / Buttons:** `Manrope` (400–700) — clean humanist grotesque, crisp on all screens.
- **Mono (tech tags, indexes, timestamps, HUD):** `DM Mono` (300–500).
- **Scale:** Hero title (clamp 46px to 104px), section titles (clamp 32px to 54px), row headers (clamp 22px to 42px), body (15px to 17px), metadata (10px to 13px).

## Dials

- **ENERGY 3** — Bold modern confidence, stark high-contrast scale, high-end engineering & design studio feel.
- **RHYTHM 3** — Distinct section identities: Hero kinetic floating deck, Disciplines architectural accordion, Work stacked cards with clip-path curtains, Skills technical specification matrix, Experience vertical ruler timeline, Contact bold typographic statement.
- **MOTION 3** — Fully bidirectional GSAP ScrollTrigger animations, word-rise masks, scramble-decode mono headers, direction-aware marquee, magnetic interaction pills, and dark shutter page navigation.

## Identity Motif

Adham Baskara®, mono chapter indexing (`00 //` through `05 //`), hairline silver rules (`#222226`), and a pure white luminous progress indicator.

## Sections

1. **Nav** — Floating fixed navigation bar with frosted glass blur, scroll progress indicator, active section tracking, and high-contrast CTA.
2. **Hero** — Centered composition: top header navigation, bold 2-line title with trailing ®, subtitle, and 3 kinetic floating titanium cards.
3. **Disciplines** — 3 core disciplines (Fullstack Engineering, UI/UX Design, Graphic Identity) in an architectural expandable drawer list.
4. **Work** — Stacked magazine showcase of selected projects with grayscale-to-color reveal on hover and comprehensive specs modal.
5. **Skills** — Technical specification matrix grouped by discipline with tier markers.
6. **Experience** — Kinetic vertical timeline with continuous drawing SVG ruler.
7. **Contact** — Large masked headline, quick-copy email box with interactive toast, and verified social links.
8. **Footer** — Single-line copyright and smooth back-to-top trigger.

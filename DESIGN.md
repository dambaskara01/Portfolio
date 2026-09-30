# DESIGN.md — Portfolio Design Direction

## Identity

**Product:** Personal portfolio of a CS + Graphic Design student (fresh grad / internship seeker).
**Audience:** Recruiters, internship hiring managers, potential collaborators — people who assess both technical depth and visual taste in one look.
**Character:** Sophisticated editorial. Clean but not sterile. Precise but not cold. This is a designer who codes, not a coder who dabbles in design.

## Personality

- **Sophisticated & editorial** — typography does the heavy lifting; decoration is earned
- **Light base** — white/off-white surface, not a "tech-dark" default
- **Precise** — grid discipline, intentional whitespace, nothing arbitrary
- **Quietly confident** — no buzzwords, no "revolutionary", just work

## Palette

- **Base:** `#FAFAFA` (near-white, warm not blue-white)
- **Surface:** `#FFFFFF` (cards, elevated elements)
- **Ink:** `#111111` (primary text — near-black, not pure black)
- **Muted:** `#6B6B6B` (secondary text, metadata, labels)
- **Rule:** `#E4E4E4` (borders, dividers, hairlines)
- **Accent:** `#1A1A1A` (primary CTA, selected states — ink variant used as brand accent so nothing competes with the work itself; the *work* is the color)
- **Highlight:** `#F0EDE8` (warm tinted surface for callout blocks)

> Rationale: keeping the palette nearly achromatic forces the *project screenshots* to be the color on every page. The portfolio's job is to show work, not to decorate itself.

## Typography

- **Primary Sans / Display / Body:** `Inter` (Variable: 100 to 900) - modern, ultra-clean neutral sans-serif. Used for all headings, body text, buttons, and navigation. Weights calibrated purposefully: 700/800 for high-contrast headlines, 600 for section titles, 500 for pills/badges, 400 for body reading.
- **Mono (code snippets / tech tags):** `DM Mono` - monospace companion for technical tags, indexes, and timestamps.
- **Scale:** hero headline contrast (clamp 44px to 80px), section titles (clamp 32px to 54px), subheadings (18px to 24px), body (16px), compact metadata (11px to 13px).

> Rationale: Inter provides crisp, contemporary Swiss modernist precision, ensuring high legibility and refined elegance that highlights the creative work without ornamental distraction.

## Dials

- **ENERGY 3** - bold editorial confidence, striking typographic scale, high-end studio feel.
- **RHYTHM 3** - sections vary composition meaningfully. Hero features centered typography with an inline accent badge and an interactive fanned deck of project covers rising from the bottom. Disciplines is an architectural split index. Work is an editorial showcase with vertical scrub parallax. Skills is a technical specification matrix.
- **MOTION 3** - fully bidirectional GSAP ScrollTrigger animations (toggleActions: "play reverse play reverse" and continuous scrub). Entrance animations fan cards outward from the bottom edge; cards elevate dynamically on hover; scrub transitions sink cards gracefully as the user scrolls into the portfolio.

## Identity Motif

A clean geometric monogram mark (AP) paired with an inline accent badge, anchored by thin 1px horizontal rules (`#E4E4E4`) between sections.

## Sections (actual content only, no template padding)

1. **Nav** - top center monogram header in hero; fixed floating nav bar with glass blur reveals on scroll past hero.
2. **Hero** - centered composition inspired by reference: top monogram badge, 2-line bold Inter headline with inline accent badge ("Adham Baskara [✦] Fullstack & Design"), single pill CTA ("Lihat Karya"), and an interactive 5-card fanned project deck at the bottom.
3. **Disciplines** - 4 areas (Fullstack, Creative Web, UI/UX, Graphic Design) as a text-list with numbered markers, not card grid.
4. **Work** — projects as a curated list with image+info side by side, varied layout per item. No uniform card grid.
5. **Skills** — compact grouped list, no percentage bars (R-17: no fabricated precision), just skill names grouped by category.
6. **Experience** — timeline as editorial two-column text, no icon-heavy layout.
7. **Contact** — single focused CTA section with email link and social links.
8. **Footer** — single line. Copyright + name. No multi-column template footer.

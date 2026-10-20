# Portfolio — Adham Baskara

Portofolio pribadi satu halaman untuk menampilkan karya **Fullstack Development**, **UI/UX Design**, dan **Graphic Identity**.

> ⚠️ **Status: restruktur besar sedang berjalan.** Sebagian besar section component
> (`UiUx`, `Branding`, `Skills`, `Experience`, `Contact`, `Footer`,
> `Nav`, dan modal detail) sengaja dihapus dari working tree dan
> akan dibangun ulang. Yang aktif sekarang: **Hero** + **Marquee** + **Engineering** + **UI/UX Design**.
> Arsitektur lengkap terakhir ada di commit `HEAD`.

## Tech Stack

| Layer      | Teknologi                                              |
| ---------- | ------------------------------------------------------ |
| Framework  | Next.js 16 (App Router) + React 19 + TypeScript strict |
| Styling    | CSS murni dengan design tokens (`src/app/globals.css`) — **tanpa Tailwind** |
| Animasi    | GSAP 3 (`@gsap/react` + ScrollTrigger), Motion (`motion`), animejs, Lenis (smooth scroll) |
| Ikon       | lucide-react, simple-icons (logo SVG inline di `Marquee`) |
| Font       | SF UI Display (local font, weight 100–900)             |

## Menjalankan Project

```bash
npm install
npm run dev      # http://localhost:3000
```

| Script           | Fungsi                    |
| ---------------- | ------------------------- |
| `npm run dev`    | Development server        |
| `npm run build`  | Production build          |
| `npm run start`  | Jalankan hasil build      |
| `npm run lint`   | ESLint (next core-web-vitals + TS) |

Sebelum push, selalu jalankan:

```bash
npm run lint && npm run build
```

## Struktur Folder

```
src/
├── app/
│   ├── layout.tsx          # Root layout, metadata SEO, loading SF UI Display
│   ├── page.tsx            # Composition section + provider chain
│   └── globals.css         # Design tokens + semua styling (2.000+ baris)
├── components/
│   ├── SmoothScroll.tsx          # Lenis provider + context scrollTo
│   ├── PageTransition.tsx        # Overlay transisi antar section (GSAP)
│   ├── ContextualBadgeCursor.tsx # Kursor custom berbadge (VIEW/LINK/...)
│   ├── Hero.tsx                  # Section utama + bilingual copy (EN/ID)
│   ├── Marquee.tsx               # Marquee logo tech (GSAP ScrollTrigger)
│   ├── Engineering.tsx           # Full-bleed showcase section (mesh aura & project preview template panel)
│   └── UIUX.tsx                  # Section UI/UX: data + spatial 3D revolving drum index (single file)
├── data/
│   └── portfolioData.ts          # Central data source bilingual
├── hooks/
│   └── useCurrentLang.ts         # Hook pendeteksi bahasa reaktif
public/
├── fonts/                  # sf-ui-display (aktif), cabinet-grotesk, nevanta
└── images/
    └── development/        # Visual wireframe assets development projects
```

## Dokumentasi

- [`DESIGN.md`](./DESIGN.md) — design system "Swiss Editorial Light": palette, typography, spacing, motion.
- [`docs/architecture.md`](./docs/architecture.md) — arsitektur, alur component & data flow.
- [`AGENTS.md`](./AGENTS.md) — konvensi coding untuk agent/AI.
- [`CONTRIBUTING.md`](./CONTRIBUTING.md) — kontribusi & gaya commit.

## Deploy

Target deploy **belum ditentukan**. Riwayat commit sempat memakai static export
untuk Cloudflare Pages; konfigurasi sekarang adalah Next.js default.

## Kontak

**Adham Baskara** — [adhambaskara.dev@gmail.com](mailto:adhambaskara.dev@gmail.com) · [GitHub](https://github.com/adhambaskara) · [LinkedIn](https://linkedin.com/in/adhambaskara)

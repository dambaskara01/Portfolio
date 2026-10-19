# Arsitektur Project

> Dokumen ini menjelaskan struktur, alur render, dan tanggung jawab tiap layer
> di portfolio Adham Baskara. Fokusnya adalah **state saat ini** (Hero + Marquee +
> providers global) karena project sedang restruktur besar.

## Prinsip Arsitektur

- **Single-page portfolio.** Semua konten di satu `page.tsx`.
- **App Router Next.js.** Tidak ada `react-router`.
- **CSS-first styling.** Tidak ada Tailwind. Semua tokens dan utility class di `src/app/globals.css`.
- **Motion-first front-end.** Animasi kompleks dikelola GSAP + ScrollTrigger;
  transisi section dikelola `PageTransition`;
  smooth scroll dikelola `SmoothScroll` (Lenis).
- **Progressive enhancement.** Semua motion ops-out saat `prefers-reduced-motion` atau perangkat sentuh.

## Alur Render

File entry: `src/app/page.tsx`

```tsx
<SmoothScrollProvider>
  <PageTransitionProvider>
    <ContextualBadgeCursor />
    <main>
      <Hero />
      <Marquee />
      <Engineering />
      <UIUXSection />
    </main>
  </PageTransitionProvider>
</SmoothScrollProvider>
```

| Urutan | Komponen | Peran |
| ------ | -------- | ----- |
| 1 | `SmoothScrollProvider` | Inisialisasi Lenis, expose `scrollTo(target, options)` via context. |
| 2 | `PageTransitionProvider` | Menerima `navigate(targetSelector, sectionTitle?)`, memutar overlay GSAP saat pindah section, lalu memanggil `scrollTo`. |
| 3 | `ContextualBadgeCursor` | Kursor badge custom (VIEW/LINK/...) mengikuti mouse. Di-disable untuk touch & reduced motion. |
| 4 | `main` | Kontainer semua section. |
| 5 | `Hero` | Section cover + identitas + bilingual copy (EN/ID). |
| 6 | `Marquee` | Infinite marquee logo tech dengan GSAP ScrollTrigger velocity. |
| 7 | `Engineering` | Full-bleed showcase section (Silent House reference): ambient mesh aura & white project panel dengan kinetic deck pinned scroll scrub. |
| 8 | `UIUXSection` | Spatial 3D revolving drum index (`WorksWheel`) showcase section untuk karya UI/UX & Product Design. |

## Struktur Folder

```
src/
├── app/
│   ├── layout.tsx          # Root layout: metadata + SF UI Display font
│   ├── page.tsx            # Composes providers & sections
│   └── globals.css         # Semua CSS: tokens, utilities, section styles
├── components/
│   ├── SmoothScroll.tsx    # Lenis context provider
│   ├── PageTransition.tsx  # Section transition overlay
│   ├── ContextualBadgeCursor.tsx
│   ├── Hero.tsx            # Section: cover + identity
│   ├── Marquee.tsx         # Section: tech marquee
│   ├── Engineering.tsx     # Section: engineering index & floating cursor preview
│   ├── UIUXSection.tsx     # Section: UI/UX kinetic 3D stage
│   └── ui/
│       └── works-wheel.tsx # Spatial revolving drum 3D card deck (1:1 port)
├── data/
│   ├── portfolioData.ts    # Single source of truth untuk project data
│   └── uiuxData.ts         # Dataset kurasi UI/UX projects & specs
├── hooks/
│   └── useCurrentLang.ts   # Client hook observasi perubahan bahasa EN/ID
public/
├── fonts/
│   ├── sf-ui-display/      # Font utama (aktif)
│   ├── cabinet-grotesk/    # Font cadangan (belum dipakai)
│   └── nevanta/            # Font serif display (aktif via --font-nevanta)
└── images/
    └── engineering/        # Tangkapan layar antarmuka asli / real software showcase assets
```

## Inventory Komponen

| File | Baris | Client? | Tanggung Jawab |
| ---- | ----- | ------- | -------------- |
| `SmoothScroll.tsx` | ~102 | Ya | Lenis init, GSAP ScrollTrigger sync, context `useSmoothScroll`. |
| `PageTransition.tsx` | ~216 | Ya | Overlay transisi antar section, meta `SECTION_METAS`, GSAP timeline. |
| `ContextualBadgeCursor.tsx` | ~77 | Ya | Badge kursor custom, event listener hover, guards reduced motion + touch. |
| `Hero.tsx` | ~325 | Ya | Section cover, bilingual state `Lang`, copy EN/ID inline, nav anchor, photo placeholder. |
| `Marquee.tsx` | ~191 | Ya | Marquee logo tech, SVG inline, GSAP ScrollTrigger scrub/velocity. |
| `Engineering.tsx` | ~250 | Ya | Full-bleed showcase section (Silent House reference): ambient mesh aura, edge-to-edge white project preview panel dengan pinned multi-slide kinetic scrub. |
| `UIUXSection.tsx` | ~60 | Ya | Section UI/UX yang mengintegrasikan `works-wheel`. |
| `ui/works-wheel.tsx` | ~400 | Ya | Spatial 3D revolving drum wheel index port 1:1 untuk navigasi karya/portfolio. |

## Data Flow

**Saat ini (restruktur):** copy & data logo/logo tech ditanam inline di masing-masing komponen (`Hero.tsx`, `Marquee.tsx`).

**Target setelah restruktur:** data dipusatkan kembali di `src/data/portfolioData.ts` dengan pattern:

```ts
export const portfolioData = {
  profile: { ... },
  projects: [ ... ],
  skills: [ ... ],
  experience: [ ... ],
  contact: { ... },
} as const;
```

Teks bilingual (`id` / `en`) disimpan terpusat, bukan tersebar di component.

## Komponen yang Sedang Dibangun Ulang

Komponen berikut ada di commit `HEAD` tapi dihapus dari working tree selama
restruktur. Mereka akan kembali bertahap:

- `Nav` — navigasi fixed/top
- `UiUx` — project UI/UX
- `Branding` — project identitas grafis
- `Skills` — technical stack
- `Experience` — riwayat kerja
- `Contact` — formulir / info kontak
- `Footer` — footer global
- `ProjectModal` — detail project

## Penambahan Section Baru

1. Buat file di `src/components/<SectionName>.tsx`.
2. Tambahkan `id` yang cocok dengan `SECTION_METAS` di `PageTransition.tsx`.
3. Import & tempatkan di `src/app/page.tsx`.
4. Jalankan `npm run lint && npm run build` sebelum commit.
5. Update file `.md` yang relevan sesuai panduan sinkronisasi dokumentasi di `AGENTS.md`.

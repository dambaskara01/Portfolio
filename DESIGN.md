# Design System — Swiss Editorial Light

Portofolio Adham Baskara memakai sistem visual **Swiss Editorial Light**: kanvas
putih, panel abu muda, tinta hitam, dengan tekstur noise halus untuk kedalaman
taktil ala media cetak. Semua token didefinisikan sebagai CSS custom properties di
`src/app/globals.css` bagian `:root`.

> **Aturan keras: tidak ada Tailwind.** Seluruh styling mengandalkan CSS variables
> + vanilla CSS. Untuk class utility `clsx` dan `tailwind-merge` dipakai hanya
> untuk penggabungan className, bukan utility framework.

## Palet Warna

| Token              | Nilai     | Penggunaan                              |
| ------------------ | --------- | --------------------------------------- |
| `--base`           | `#fafafa` | Background kanvas utama                 |
| `--surface`        | `#ffffff` | Panel / kartu                           |
| `--highlight`      | `#efefef` | Latar hover / pemisah lembut            |
| `--ink`            | `#0f0f0f` | Teks utama, tint akcent                 |
| `--muted`          | `#5c5c5c` | Teks sekunder / keterangan              |
| `--rule`           | `#dddddd` | Garis tipis                             |
| `--border-strong`  | `#bdbdbd` | Border tegas                            |
| `--accent`         | `#0f0f0f` | Aksen utama ( sama dengan ink )         |
| `--accent-deep`    | `#2b2b2b` | Aksen pada permukaan gelap              |
| `--accent-silver`  | `#b5b5b5` | Aksen perak                             |
| `--paper`          | `#0f0f0f` | Mode kertas gelap ( balik )             |
| `--paper-ink`      | `#fafafa` | Tinta di atas paper                     |

Palet **monokromatik**: tidak ada warna brand sekunder. Hierarki dibangun lewat
kontras nilai abu, bukan hue.

## Typography

**Font tunggal:** SF UI Display (`localFont` Next.js, `--font-sf-ui`), weight 100 (Ultra Light) → 900 (Black).

```ts
// src/app/layout.tsx
const sfUiDisplay = localFont({
  src: [ /* 9 file .otf weight 100-900 */ ],
  variable: "--font-sf-ui",
  display: "swap",
});
```

Tiga alias font di `:root` (saat ini semua menyanding ke SF UI Display):

| Alias          | Peran                         |
| -------------- | ----------------------------- |
| `--font-sans`  | Body text                     |
| `--font-display` | Heading / display           |
| `--font-mono`  | Data / label teknis (`.t-mono`) |

Font alternatif yang tersedia di `public/fonts` namun belum dipakai di layout:
`cabinet-grotesk`, `nevanta`. Saat dibutuhkan, daftarkan via `localFont` dan tukar alias.

Utility:
- `.t-mono` — `font-family: var(--font-mono); font-size: 13px;`
- `.t-muted` — `color: var(--muted);`

## Radius

| Token            | Nilai    | Skala                    |
| ---------------- | -------- | ------------------------ |
| `--radius-xs`    | `2px`    | Detail micro             |
| `--radius-sm`    | `4px`    | Default kecil            |
| `--radius-md`    | `4px`    | Default                  |
| `--radius-lg`    | `6px`    | Kartu / panel            |
| `--radius-xl`    | `10px`   | Kontainer besar          |
| `--radius-full`  | `9999px` | Pill / badge             |

## Spacing

Skala spacing seragam, basis 4px:

```
--s-4 · --s-8 · --s-12 · --s-16 · --s-20 · --s-24 ·
--s-32 · --s-40 · --s-48 · --s-64 · --s-80 · --s-96 · --s-128
```

Layout constraint:
- `--max-w: 1280px` — lebar kontainer maksimum
- `--nav-h: 68px` — tinggi navigasi

## Motion

Semua easing memakai kurva `cubic-bezier(0.16, 1, 0.3, 1)` (kurva "expo out" yang
lembut untuk motion editorial).

| Token       | Durasi   | Penggunaan                        |
| ----------- | -------- | --------------------------------- |
| `--t-fast`  | `160ms`  | Hover, micro-interaction          |
| `--t-base`  | `280ms`  | Transisi standar                  |
| `--t-slow`  | `480ms`  | Transisi section / reveal besar   |

**Implementasi animasi kompleks WAJIB pakai GSAP** (`@gsap/react` `useGSAP`,
`ScrollTrigger`). Motion (`motion`, prev. Framer Motion) dan `animejs` boleh untuk animasi level komponen React / SVG micro-interactions. Hindari
CSS transition untuk hal yang lebih kompleks dari sekadar opacity/transform sederhana.

Lihat `AGENTS.md` untuk convention GSAP.

## Efek Khas

### Tekstur noise
`body::after` overlay fixed, `opacity: 0.03`, SVG `feTurbulence` fractalNoise.
Tujuan: memberi kedalaman taktil ala cetakan, bukan gradasi warna. Jangan dihapus.

### Radial gradient
`body` background: `radial-gradient(ellipse 90% 50% at 50% -20%, rgba(31,29,26,0.05), transparent 75%)`.
Memberi vignette halus dari atas.

## Aksesibilitas Motion

Setiap komponen yang beranimasi WAJIB menghormati preferensi pengguna:

```ts
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
if (prefersReducedMotion) return; // skip init animasi
```

Lihat pola ini di `SmoothScroll.tsx` dan `ContextualBadgeCursor.tsx` sebagai referensi.

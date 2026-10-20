# AGENTS.md

Panduan bagi AI agent / IDE assistant yang membantu ngoding project portfolio ini.

## Konteks Utama

- Project **Next.js 16** dengan **App Router** (`src/app/`), **React 19**, **TypeScript strict**.
- Portfolio **satu halaman** milik pribadi, target audience = recruiter & klien.
- Saat ini sedang **restruktur besar**: sebagian besar section & data layer dihapus dari working tree. Yang tersisa: `Hero`, `Marquee`, provider-provider global.
- **Tidak ada Tailwind.** Semua styling memakai CSS variables dan vanilla CSS di `src/app/globals.css`.
- Motion adalah **first-class citizen** di project ini. Pengguna harus bisa langsung melihat skill front-end & UI design penulis.

## Bahasa & Komentar

- **Chat / commit message / dokumentasi boleh Indonesia**.
- **Kode + komentar kode WAJIB English** agar konsisten dengan base code dan open-source convention.
- Jangan membalut komponen atau variabel dengan istilah lokal yang ambigu.

## Aturan Teknis

### 1. Tidak boleh pakai Tailwind

Jangan memperkenalkan class Tailwind apapun. Gunakan:
- CSS custom properties dari `globals.css` (`--base`, `--ink`, `--radius-lg`, dll.)
- Class utility kecil yang sudah ada di `globals.css` (`.t-mono`, `.t-muted`, `.grid-cols-auto`, dll.)
- `clsx` + `tailwind-merge` hanya untuk menggabungkan className string, bukan untuk utility class.

### 2. Motion kompleks WAJIB GSAP

Karena portfolio ini adalah showcase front-end/ui design, animasi tidak boleh "pasaran". Gunakan **GSAP** untuk motion yang kompleks:

```tsx
"use client";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Section() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo(".item", { y: 40, opacity: 0 }, {
      y: 0, opacity: 1,
      stagger: 0.08,
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
      }
    });
  }, { scope: containerRef });

  return <div ref={containerRef}>...</div>;
}
```

Catatan GSAP:
- Selalu `gsap.registerPlugin(ScrollTrigger, useGSAP)`.
- Pakai `{ scope: containerRef }` supaya selector GSAP scoped.
- Jangan lupa `ScrollTrigger.refresh()` setelah konten async/load.
- Motion (prev. Framer Motion) boleh untuk hal sederhana level React; jangan dipakai untuk scrub/timeline kompleks.

### 3. Path alias

Selalu pakai alias `@/` saat import dari `src/`:

```ts
// Benar
import { useSmoothScroll } from "@/components/SmoothScroll";

// Salah
import { useSmoothScroll } from "../components/SmoothScroll";
```

### 4. "use client" bijaksana

Komponen Next.js App Router default-nya Server Component. Tandai `"use client"` hanya jika:
- Menggunakan hooks React (`useState`, `useRef`, `useEffect`, `useGSAP`)
- Butuh event handler (onClick, onMouseMove)
- Butuh browser API (`window`, `matchMedia`, `localStorage`)

Jangan membuat seluruh section client hanya karena satu tombol. Pisah:
- Bungkus logika interaktif di client wrapper kecil.
- Bagian statis tetap server component.

### 5. Aksesibilitas motion

Setiap komponen beranimasi harus menghormati `prefers-reduced-motion` dan kursor sentuh:

```ts
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const isTouchDevice = !window.matchMedia("(hover: hover) and (pointer: fine)").matches;
```

Lihat referensi implementasi di `src/components/SmoothScroll.tsx` dan `ContextualBadgeCursor.tsx`.

### 6. Layout & metadata

- Root layout di `src/app/layout.tsx` memuat metadata SEO dan font `SF UI Display`.
- Metadata utama: `title`, `description`, Open Graph, Twitter card.
- Jangan duplikat `<title>` atau `<meta>` di component; semua metadata kelola di `layout.tsx` atau `page.tsx`.

### 7. Data layer

Data layer saat ini hanya berisi `engineeringShowcaseProjects`. Pattern target ketika section lain kembali:

```ts
// src/data/portfolioData.ts
export const portfolioData = {
  bio: { ... },
  skills: [ ... ],
  projects: [ ... ],
  experience: [ ... ],
  contact: { ... },
} as const;
```

Teks bilingual (`id` / `en`) simpan di tempat terpusat, bukan hard-coded tersebar.

## Dokumentasi

### Update .md yang relevan saat perubahan signifikan

Setiap perubahan kode/library yang signifikan wajib diikuti update pada file `.md`
yang relevan. Tujuan: agar agent / kolaborator berikutnya tidak bekerja dari
dokumentasi yang sudah bohong.

**Threshold apa yang wajib trigger update?**

- Install / uninstall / upgrade dependency
- Komponen / section baru
- Perubahan design token / color / spacing / motion
- Perubahan struktur folder / path alias
- Perubahan convention coding / workflow baru
- Perubahan script / build config

**Yang TIDAK perlu trigger update:** typo fix, lint fix, refactor murni tanpa
perubahan interface/dependency, perubahan satu angka/constant yang tidak
mempengaruhi konvensi.

**Mapping change type → file .md**

| Change type | File .md yang diupdate | Bagian mana |
| --- | --- | --- |
| Install / uninstall / upgrade dependency | `README.md` | Tech stack table |
| Dependency animation / motion (animejs, Motion, GSAP, Lenis, dsb.) | `README.md` + `DESIGN.md` | Tech stack + Motion section |
| Komponen / section baru | `README.md` + `docs/architecture.md` | Folder structure + inventory / render flow |
| Perubahan design token (color, radius, spacing, font, easing) | `DESIGN.md` | Tokens & utilities table |
| Perubahan struktur folder / path alias | `README.md` + `docs/architecture.md` | Folder structure tree + layer diagram |
| Perubahan convention / workflow | `AGENTS.md` | Aturan teknis / verifikasi |
| Perubahan script / build config | `README.md` + `CONTRIBUTING.md` (jika workflow berubah) | Scripts table |
| Perubahan pendekatan motion / animation | `DESIGN.md` + `AGENTS.md` | Motion section + convention |

**Praktis:** setelah selesai edit kode, tanya diri sendiri: *"Apakah perubahan
ini membuat salah satu .md jadi bohong?"* Kalau ya, update sebelum commit.

## Gaya Commit

Ikuti format pendek yang sudah dipakai di history:

```
feat(scope): description in English
fix(cursor): reduced motion detection
build: update next.config for static export
docs: update DESIGN.md
```

Scope boleh `hero`, `marquee`, `cursor`, `design`, `build`, `deps`, dsb.

## Verifikasi Sebelum Menyerahkan

Sebelum menyebut "selesai", jalankan:

```bash
npm run lint && npm run build
```

Perbaiki semua type error dan lint error. Build harus berhasil di lokal.

## Yang Tidak Boleh Dilakukan

- Jangan memperkenalkan Tailwind, Bootstrap, atau CSS framework lain.
- Jangan menghapus file font di `public/fonts/` tanpa mengganti alias di `layout.tsx` dan `globals.css`.
- Jangan membuat route tambahan tanpa konfirmasi (ini single-page portfolio).
- Jangan menyimpan secret/API key di repo.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

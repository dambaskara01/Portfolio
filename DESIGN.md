# DESIGN SYSTEM & ENGINEERING SPECIFICATION
**Style Archetype:** Swiss Minimalism / International Typographic Style (Editorial & High-Precision Digital Edition)

---

## 1. Core Visual Principles
- **Grid Discipline:** Struktur layout berakar kuat pada grid asimetris yang tegas, modul bento/card ber-radius presisi, atau list-based accordion layout.
- **Negative Space:** Berikan ruang bernapas (whitespace) lapang. Ruang kosong diperlakukan sebagai elemen desain aktif, bukan kekosongan.
- **Typography as Primary UI:** Tipografi memimpin hierarki informasi. Gunakan kontras skala ekstrem (misal headline masif berdampingan dengan subtext micro-typography 11–13px).
- **Clean Aesthetic:** Hindari drop shadow berlebihan, bevel, atau gradien norak. Kedalaman visual hanya didapat dari *layering stack* (tumpukan card) dan garis pemisah tipis (*1px subtle borders*).

---

## 2. Typography Rules
- **Font Family:** Wajib eksklusif menggunakan **SF Pro / SF UI** (`SF Pro Display`, `SF Pro Text`). Dilarang menggunakan font lain seperti Inter, Roboto, atau font generic web. Gunakan mode tabular figures (`font-mono` atau `tnum`) untuk timer, index nomor, dan data statistik.
- **Hierarchy & Tracking:**
  - **Mega/Display Headlines:** `text-5xl` s/d `text-8xl`, tracking rapat khas Swiss (`tracking-tight` atau `-0.03em`), font weight `font-normal` atau `font-medium`.
  - **Section Titles & Subheads:** `text-2xl` s/d `text-4xl`, tracking `-0.02em`.
  - **Body Copy:** `text-base` s/d `text-lg`, font weight `font-normal`, line-height lapang (`leading-relaxed`), warna teks redup agar headline tetap dominan.
  - **Micro Label / Meta:** `text-xs` (10px–12px), uppercase atau structured text, tracking sedikit renggang (`tracking-wider`), dipadukan dengan bullet, bracket `[PHOTO]`, atau format indeks editorial `(01)`.

---

## 3. Color Palette & Theming
Pertahankan palet minimalis high-contrast yang terbukti di Hero Section:
- **Base Canvas:** Pure Light `#FFFFFF` atau off-white super lembut `#F8F9FA` / `#F4F4F6`.
- **Card Background:** `#FFFFFF` murni di atas canvas off-white, atau sebaliknya container putih bergaris subtle.
- **Primary Text:** Pitch Black `#0D0D0D` / `#111111`.
- **Secondary / Muted Text:** Slate / Cool Gray `#6B7280` atau `#8A8A8E`.
- **Divider & Borders:** `1px solid rgba(0, 0, 0, 0.08)` (hairline borders).
- **Dark Mode / Inverted Sections (Optional):** Jika section berlatar gelap, gunakan deep black `#0A0A0A` dengan teks `#EDEDED` dan aksen pill kapsul terang.

---

## 4. Component Layout Patterns (Derived from References)
Setiap kali membangun section baru, prioritaskan salah satu pola editorial berikut:
1. **Interactive Editorial List / Accordion:**
   - Baris item list horizontal dengan garis batas hairline tipis.
   - Angka seri di sisi kiri `(01, 02, 03)`, judul tebal di tengah, tombol panah trigger `→` di kanan.
   - State aktif atau hover membuka preview visual / media secara mulus di tengah list.
2. **Layered Card Stack (Fanned-out / Floating Cards):**
   - Kartu-kartu sudut membulat (`rounded-2xl` atau `rounded-3xl`) yang disusun bertumpuk secara vertikal/perspektif (*cascading stack*).
3. **Pill Navigation & Floating Badges:**
   - Navigasi kapsul ringkas (`rounded-full`) dengan status badge atau icon switcher.
4. **Ticker & Marquee:**
   - Jajaran logo tech stack atau klien monokromatik (`grayscale`, opasitas 60% default, 100% hover).

---

## 5. Motion Engineering & High-End Interactions
Pilih tech stack animasi yang paling optimal per kebutuhan: **Framer Motion**, **GSAP + ScrollTrigger**, atau **Lenis Smooth Scroll**. Animasi dilarang terlihat generik atau monoton (no basic fade-in-up template).

### A. Allowed Animation Libraries
- **Framer Motion:** Untuk layout transitions (`layoutId`), physics springs, hover states, drag/tilt 3D, dan UI morphing.
- **GSAP + ScrollTrigger / Flip:** Untuk multi-stage pinning, complex scrubbed timeline, parallax stacking, dan sequence teks terpisah.
- **Lenis:** Wajib aktif sebagai smooth scroll wrapper agar momentum scroll selaras dengan timing animasi.

### B. High-End Motion Patterns (Non-Boring & Complex)
1. **Interactive Magnetic & Cursor Tilt:**
   - Gunakan physics spring (`stiffness: 150`, `damping: 15`) untuk elemen interaktif (button pill, badge, gambar).
   - Pada card hover, hitung offset koordinat mouse (`e.clientX`, `e.clientY`) untuk memicu rotasi 3D mikro (`rotateX`, `rotateY` maks 4deg–6deg) ditambah refleksi highlight subtle.
2. **Scroll-Driven Deck/Stack Fan-Out (Cascade Physics):**
   - Saat container discroll, elemen tumpukan (seperti kartu foto/proyek) menyebar ke posisi grid asimetris secara scrubbed.
   - Variasikan parameter `z-index`, `rotate`, `scale`, dan `translate` tiap layer kartu secara matematis agar tidak bergerak serempak.
3. **Clip-Path & Mask Morphing:**
   - Transisi buka-tutup gambar menggunakan animasi `clip-path: polygon(...)` atau `clip-path: inset(...)` berbobot tinggi.
   - Text reveal menggunakan split character/line masking (`overflow-hidden` wrapper) dengan stagger rapat (`stagger: 0.03s`, curve `[0.16, 1, 0.3, 1]`).
4. **Layout Morphing via Shared Layout (`layoutId`):**
   - Saat list item atau pill dipilih, highlight background aktif harus bertransisi mengalir (*liquid layout jump*) antar target tanpa re-render patah.
   - Item accordion membesar secara fluid dengan kalkulasi bounding rect otomatis.

### C. Motion Physics Rules
- **No Cartoon Bouncing:** Dilarang menggunakan bounce berlebihan. Karakter motion harus terasa mekanikal, padat, dan cepat bereaksi (*viscous damping*).
- **Curated Bezier Curves:**
  - Fast-out smooth-settle: `cubic-bezier(0.16, 1, 0.3, 1)` (Quart Out)
  - Cinematic precision: `cubic-bezier(0.25, 0.1, 0.25, 1)`
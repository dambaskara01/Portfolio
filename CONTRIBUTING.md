# Kontribusi

Project ini adalah portfolio pribadi, jadi kontribusi eksternal umumnya tidak
diharapkan. File ini ada untuk menjaga konsistensi jika saya sendiri atau
kolaborator sementara mengerjakan di kemudian hari.

## Melaporkan Masalah atau Saran

Jika menemukan bug visual, broken animation, atau typo:

1. Buat issue singkat dengan label `bug`, `visual`, atau `content`.
2. Cantumkan browser/device dan langkah reproduksi.
3. Untuk saran desain, buat issue label `design`.

## Gaya Commit

```
feat(scope): description in English
fix(scope): description in English
docs(scope): description in English
build(scope): description in English
```

Scope: `hero`, `marquee`, `cursor`, `design`, `build`, `deps`, `docs`, dsb.

## Sebelum Push

Wajib jalankan:

```bash
npm run lint && npm run build
```

Build harus sukses tanpa type error.

## Hal-hal yang Tidak Perlu Dikontribusikan

- Penambahan route/halaman baru tanpa diskusi.
- Pengenalan CSS framework (Tailwind, Bootstrap, dsb).
- Perubahan design system radical tanpa menyelaraskan `DESIGN.md`.

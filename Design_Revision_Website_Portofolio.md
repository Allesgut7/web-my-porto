# Design Revision Prompt — Web-My-Portofolio

**Document Type:** Frontend Design Revision Guide  
**Project:** Web-My-Portofolio  
**Position:** After Phase 10 — Before Phase 11 Deployment  
**Purpose:** Revisi UI/UX Frontend Public sebelum deployment  
**Storage Final:** Supabase Storage  
**Target Stack:** Nuxt + TypeScript + Tailwind CSS  
**Base Design Reference:** Visual_Design_Website_Portofolio.md  
**Revision Direction:** More expressive, interactive, portfolio-grade, but still professional and technical.

---

## 1. Context

Project **Web-My-Portofolio** sudah melewati:

- Phase 1 — Project Foundation
- Phase 2 — Database Core
- Phase 3 — Backend Foundation
- Phase 4 — Authentication API
- Phase 5 — Public API
- Phase 6 — Admin Project API
- Phase 7 — Upload API
- Phase 8 — Frontend Public
- Phase 9 — Frontend Admin
- Phase 10 — Integration Testing

Sebelum masuk ke **Phase 11 — Deployment**, frontend public perlu direvisi karena UI saat ini terasa:

- Terlalu clean.
- Terlalu formal.
- Minim animasi.
- Layout terlalu biasa.
- Kurang terasa sebagai website portofolio personal yang kuat.
- Kurang memiliki visual storytelling.
- Kurang menunjukkan karakter developer secara unik.

Revisi ini tidak mengubah backend, API contract, database schema, auth, atau storage. Fokus revisi hanya pada:

- UI polish.
- Layout improvement.
- Visual storytelling.
- Micro-interaction.
- Animation.
- Section composition.
- Portfolio-grade presentation.

---

## 2. Source of Truth

Gunakan file berikut sebagai acuan:

1. `PRD_Website_Portofolio(3).md`
2. `TDD_Website_Portofolio(3).md`
3. `Database_API_Design_Website_Portofolio(3).md`
4. `Execution_Plan_Website_Portofolio(2).md`
5. `Visual_Design_Website_Portofolio(1).md`

## 2.1 Important Storage Rule

Storage final project adalah:

```txt
Supabase Storage
```

Bukan Cloudflare R2.

Jika dokumen lama masih menyebut Cloudflare R2, anggap itu legacy.

Frontend tetap hanya membaca URL file dari API, seperti:

```txt
avatarUrl
thumbnailUrl
cvUrl
fileUrl
```

Frontend tidak boleh menyimpan:

```txt
SUPABASE_SERVICE_ROLE_KEY
SUPABASE_SECRET
R2_SECRET
R2_ACCESS_KEY
```

---

## 3. Design Revision Goal

Tujuan revisi desain:

1. Membuat website terasa lebih premium sebagai portfolio developer.
2. Menambahkan visual hierarchy yang lebih kuat.
3. Membuat layout lebih dinamis, tidak terlalu datar.
4. Menambahkan animasi ringan yang elegan.
5. Membuat homepage lebih memorable.
6. Membuat project card lebih menarik dan informatif.
7. Membuat project detail terasa seperti mini case study.
8. Tetap menjaga kesan clean, technical, dan professional.
9. Tidak berubah menjadi terlalu ramai, neon, atau gimmicky.
10. Tetap nyaman dibaca oleh recruiter, client, dan technical collaborator.

---

## 4. Revised Design Direction

Gunakan arah desain berikut:

```txt
Modern Technical Portfolio
+ expressive layout
+ subtle motion
+ case-study storytelling
+ technical visual motifs
+ stronger personal branding
```

Karakter desain yang diinginkan:

- Clean but not empty.
- Technical but not boring.
- Professional but not stiff.
- Animated but not distracting.
- Personal but still recruiter-friendly.
- Visual but still content-first.

---

## 5. What Must Be Improved

### 5.1 Layout

Layout saat ini dianggap terlalu biasa. Revisi layout agar lebih menarik dengan:

- Hero section lebih editorial dan visual.
- Gunakan asymmetric layout pada hero.
- Tambahkan technical/code preview card.
- Tambahkan floating metric cards.
- Tambahkan background technical grid yang halus.
- Gunakan layered card composition.
- Gunakan section transition yang lebih terasa.
- Jangan semua section berbentuk block putih biasa.
- Project section harus lebih kuat secara visual.
- Project detail harus terasa seperti case study, bukan hanya halaman detail data.

### 5.2 Animation

Tambahkan animasi ringan, seperti:

- Fade in on scroll.
- Slide up on section reveal.
- Staggered project card animation.
- Hover lift pada card.
- Smooth navbar state.
- Animated technical grid/background.
- Subtle floating card pada hero.
- Micro-interaction pada CTA button.
- Image hover scale pada thumbnail.
- Badge hover effect.
- Page transition ringan.

Animasi harus:

- Halus.
- Cepat.
- Tidak mengganggu.
- Tidak membuat website terasa lambat.
- Tidak terlalu playful.

Rekomendasi jika menggunakan library:

```txt
@vueuse/motion
```

Atau gunakan Tailwind transition biasa jika ingin tetap ringan.

### 5.3 Visual Storytelling

Homepage harus lebih terasa seperti narasi:

```txt
Who I am
→ What I build
→ How I think
→ What I have shipped
→ How to contact me
```

Tambahkan elemen storytelling seperti:

- Technical identity statement.
- Capability snapshot.
- System/project metrics.
- Featured project narrative.
- Short project impact.
- Contact CTA yang lebih kuat.

### 5.4 Project Card

Project card jangan hanya card datar.

Perbaiki dengan:

- Thumbnail ratio 16:10.
- Hover image scale.
- Tech stack badges.
- Featured label.
- Project type label.
- Short description maksimal 2–3 baris.
- CTA kecil: “View case study”.
- Optional metric/impact row.
- Visual fallback jika tidak ada thumbnail.
- Hover border/accent.

### 5.5 Project Detail

Project detail harus terasa seperti **mini case study**.

Susunan yang disarankan:

1. Project hero.
2. Project metadata.
3. Problem.
4. Solution.
5. Tech stack.
6. Feature highlights.
7. Screenshot/gallery.
8. Technical notes.
9. Result/impact.
10. Links: demo, repository, documentation.
11. Back to projects.

Jika field backend belum lengkap, tampilkan hanya field yang tersedia dan jangan crash.

### 5.6 Contact Section

Contact section jangan terlalu sederhana.

Perbaiki dengan:

- Dark technical section.
- CTA kuat.
- Link GitHub/LinkedIn/email/CV.
- Technical grid dark background.
- Small “available for collaboration” indicator.
- Button group yang jelas.

---

## 6. Visual Constraints

Tetap gunakan design system utama:

| Token | Hex |
|---|---|
| Primary | `#1D4ED8` |
| Primary Soft | `#EFF6FF` |
| Accent Main | `#F59E0B` |
| Accent Tech | `#06B6D4` |
| Background | `#F8FAFC` |
| Surface | `#FFFFFF` |
| Text Main | `#0F172A` |
| Text Muted | `#64748B` |
| Border | `#E2E8F0` |
| Dark Section | `#020617` |

Boleh menambahkan opacity, gradient ringan, dan layered background selama masih dalam palette.

Contoh yang boleh:

```txt
from-blue-50 via-white to-cyan-50
bg-gradient-to-br
border-blue-100
shadow-card
technical-grid
```

Hindari:

- Warna neon berlebihan.
- Gradient rainbow.
- Animasi terlalu cepat.
- Background terlalu gelap di seluruh halaman.
- Terlalu banyak icon yang tidak relevan.
- Layout terlalu ramai sampai konten sulit dibaca.

---

## 7. Recommended Revised Homepage Structure

Gunakan struktur homepage berikut:

```txt
1. Hero Section
   - Strong headline
   - Technical role statement
   - CTA buttons
   - API/code preview card
   - Floating system metrics

2. About/Profile Section
   - Short profile
   - Capability cards
   - Technical focus area
   - Avatar or visual placeholder

3. Featured Projects Section
   - More expressive project cards
   - Staggered layout or grid
   - Featured project emphasis

4. Technical Capability Strip
   - Backend
   - Frontend
   - Data/AI
   - QA/Testing
   - Deployment/DevOps

5. Contact CTA Section
   - Dark technical background
   - Email, GitHub, LinkedIn, CV
   - Strong CTA
```

Jika backend belum menyediakan skill/capability API, capability strip boleh menggunakan static label ringan selama bukan data utama project/profile. Namun jangan hardcode project utama.

---

## 8. Component Revision Scope

Komponen yang perlu direvisi:

```txt
layouts/default.vue
components/layout/PublicNavbar.vue
components/layout/AppFooter.vue
components/sections/HeroSection.vue
components/sections/AboutSection.vue
components/sections/ProjectSection.vue
components/sections/ContactLinkSection.vue
components/cards/ProjectCard.vue
components/states/LoadingState.vue
components/states/ErrorState.vue
components/states/EmptyState.vue
pages/index.vue
pages/projects/index.vue
pages/projects/[slug].vue
assets/css/main.css
tailwind.config.ts
```

Komponen opsional baru:

```txt
components/ui/SectionHeader.vue
components/ui/AnimatedContainer.vue
components/ui/MetricCard.vue
components/ui/TechBadge.vue
components/ui/CodePreviewCard.vue
components/ui/CapabilityCard.vue
components/ui/PageHeader.vue
components/ui/FallbackThumbnail.vue
```

---

## 9. Animation Rules

Gunakan animasi secara konsisten.

### 9.1 Recommended Motion Pattern

| Element | Animation |
|---|---|
| Hero text | fade + slide up |
| Hero visual card | fade + slight scale |
| Metric cards | floating subtle |
| Section title | fade in |
| Project cards | staggered fade up |
| Project thumbnail | hover scale |
| CTA button | hover lift |
| Navbar | backdrop blur + shadow on scroll |
| Page transition | fade or slide up |

### 9.2 Performance Rule

- Jangan animasikan terlalu banyak elemen sekaligus.
- Jangan gunakan animasi berat pada mobile.
- Hindari infinite animation berlebihan.
- Respect reduced motion jika memungkinkan.
- Animasi harus tetap cepat dan smooth.

---

## 10. Revised Prompt for ChatGPT Project

Gunakan prompt ini untuk meminta revisi frontend setelah Phase 10:

```md
Kita lanjut project **Web-My-Portofolio**.

Context:
- Phase 1–10 sudah selesai.
- Sebelum masuk Phase 11 — Deployment, saya ingin melakukan revisi UI/UX Frontend Public.
- Storage final menggunakan Supabase Storage, bukan Cloudflare R2.
- Backend dan API tidak ingin diubah kecuali ada bug integrasi.
- Frontend saat ini sudah berjalan, tetapi UI masih terasa terlalu clean, terlalu formal, minim animasi, dan layout masih terlalu biasa.

Gunakan file berikut sebagai acuan:
1. PRD_Website_Portofolio(3).md
2. TDD_Website_Portofolio(3).md
3. Database_API_Design_Website_Portofolio(3).md
4. Execution_Plan_Website_Portofolio(2).md
5. Visual_Design_Website_Portofolio(1).md
6. Design_Revision_Website_Portofolio.md

Tolong bantu saya melakukan **Frontend Design Revision**.

Target revisi:
1. UI tetap clean dan professional, tapi lebih ekspresif.
2. Layout lebih portfolio-grade dan tidak terlalu biasa.
3. Tambahkan animasi ringan yang elegan.
4. Hero section lebih kuat secara visual.
5. Project card lebih menarik.
6. Project detail terasa seperti case study.
7. Contact section lebih kuat.
8. Tetap mengikuti Visual Design System.
9. Tetap data-driven dari API.
10. Tidak ada Supabase secret di frontend.
11. Tidak ada penggunaan Cloudflare R2.

Sebelum memberi kode, buatkan:
1. Audit singkat UI saat ini.
2. Rencana revisi layout.
3. Rencana animasi.
4. Komponen yang perlu dibuat/diubah.
5. Mapping revisi ke Visual Design System.
6. Risiko teknis.
7. Checklist Definition of Done untuk revisi frontend.

Setelah itu baru bantu implementasi file per file.
```

---

## 11. Prompt Eksekusi Kode Revisi

Gunakan setelah audit dan rencana revisi disetujui.

```md
Lanjut implementasi **Frontend Design Revision** project Web-My-Portofolio.

Context:
- Phase 1–10 sudah selesai.
- Revisi dilakukan sebelum Phase 11 Deployment.
- Storage final menggunakan Supabase Storage.
- Frontend hanya membaca URL file dari API.
- Backend tidak diubah kecuali perlu.
- UI lama terlalu clean, formal, minim animasi, dan layout terlalu biasa.

Tolong bantu revisi kode frontend public agar lebih portfolio-grade.

Target implementasi:
1. Revisi `HeroSection.vue` agar lebih kuat, visual, dan animated.
2. Revisi `AboutSection.vue` agar lebih storytelling.
3. Revisi `ProjectSection.vue` agar lebih menarik.
4. Revisi `ProjectCard.vue` dengan hover, image treatment, tech badge, dan CTA.
5. Revisi `ContactLinkSection.vue` menjadi dark technical CTA.
6. Revisi `/projects` agar layout lebih menarik dan tidak datar.
7. Revisi `/projects/[slug]` agar terasa seperti mini case study.
8. Tambahkan komponen UI jika perlu:
   - `SectionHeader.vue`
   - `AnimatedContainer.vue`
   - `MetricCard.vue`
   - `CodePreviewCard.vue`
   - `CapabilityCard.vue`
   - `FallbackThumbnail.vue`
9. Tambahkan animasi ringan:
   - fade up
   - staggered card
   - hover lift
   - image hover scale
   - subtle floating metric
10. Update CSS/Tailwind jika diperlukan.

Syarat:
- Tetap mengikuti Visual Design System.
- Tetap responsive.
- Tetap SEO-friendly.
- Tetap data dari API.
- Jangan hardcode project utama.
- Jangan gunakan Cloudflare R2.
- Jangan expose Supabase secret.
- Jangan merusak loading/error/empty state.
- Jangan mengerjakan MVP Extended besar.
- Animasi jangan berlebihan.

Berikan kode lengkap per file dan jelaskan file mana yang diubah.
```

---

## 12. Prompt Debugging Revisi Frontend

```md
Saya sedang melakukan **Frontend Design Revision** project Web-My-Portofolio.

Context:
- Phase 1–10 sudah selesai.
- Revisi dilakukan sebelum Phase 11 Deployment.
- Storage final Supabase Storage.
- UI sedang direvisi agar lebih expressive dan animated.

Error yang muncul:

```txt
[paste error]
```

Detail:
- Page/component: [nama page/component]
- File terkait: [nama file]
- Apakah error muncul saat build/dev/browser: [dev/build/browser]
- Potongan kode:

```vue
[paste kode]
```

Tolong:
1. Jelaskan penyebab error.
2. Cek kemungkinan masalah Nuxt, TypeScript, Tailwind class, animation library, SSR hydration, image URL, atau composable.
3. Berikan solusi step-by-step.
4. Berikan revisi kode lengkap jika perlu.
5. Pastikan solusi tetap mengikuti Visual Design System.
6. Pastikan tidak mengubah backend jika tidak perlu.
7. Pastikan tidak ada Supabase secret di frontend.
```

---

## 13. Prompt Review Revisi Frontend

```md
Review hasil **Frontend Design Revision** project Web-My-Portofolio.

Context:
- Phase 1–10 sudah selesai.
- Revisi dilakukan sebelum Phase 11 Deployment.
- Tujuan revisi: UI tidak terlalu formal, lebih portfolio-grade, lebih expressive, dan punya animasi ringan.
- Storage final Supabase Storage.

Review berdasarkan:
1. PRD_Website_Portofolio(3).md
2. TDD_Website_Portofolio(3).md
3. Database_API_Design_Website_Portofolio(3).md
4. Execution_Plan_Website_Portofolio(2).md
5. Visual_Design_Website_Portofolio(1).md
6. Design_Revision_Website_Portofolio.md

Fokus review:
1. Apakah UI lebih menarik dibanding versi sebelumnya?
2. Apakah layout tidak lagi terlalu biasa?
3. Apakah animasi cukup terasa tapi tidak berlebihan?
4. Apakah hero section lebih kuat?
5. Apakah project card lebih portfolio-grade?
6. Apakah project detail terasa seperti mini case study?
7. Apakah contact section lebih kuat?
8. Apakah tetap clean, professional, dan technical?
9. Apakah tetap responsive?
10. Apakah loading/error/empty state masih aman?
11. Apakah SEO tetap aman?
12. Apakah data tetap dari API?
13. Apakah tidak ada hardcode project utama?
14. Apakah tidak ada Cloudflare R2 legacy?
15. Apakah tidak ada Supabase secret di frontend?

Berikan:
- Skor UI sebelum deployment /10.
- Blocker.
- Minor issue.
- UI/UX issue.
- Technical issue.
- Performance concern.
- Apakah approved lanjut Phase 11 Deployment.
```

---

## 14. Definition of Done

Frontend Design Revision dianggap selesai jika:

- [ ] Homepage terasa lebih kuat sebagai portfolio developer.
- [ ] Hero section lebih visual dan memorable.
- [ ] Layout tidak terlalu datar.
- [ ] Ada animasi ringan yang elegan.
- [ ] Project card lebih menarik dan informatif.
- [ ] Project detail terasa seperti case study.
- [ ] Contact CTA lebih kuat.
- [ ] Visual tetap sesuai palette.
- [ ] Website tetap responsive.
- [ ] Loading state tetap ada.
- [ ] Error state tetap ada.
- [ ] Empty state tetap ada.
- [ ] SEO metadata tetap tersedia.
- [ ] Data project/profile tetap dari API.
- [ ] Tidak ada secret Supabase di frontend.
- [ ] Tidak ada Cloudflare R2 legacy.
- [ ] Tidak ada regression pada flow Phase 10.

---

## 15. Post-Revision Regression Checklist

Setelah revisi UI selesai, ulangi test berikut sebelum Phase 11:

- [ ] Homepage tampil normal.
- [ ] Profile tampil dari API.
- [ ] Featured projects tampil dari API.
- [ ] Project list tampil dari API.
- [ ] Project detail by slug berjalan.
- [ ] Thumbnail dari Supabase Storage tampil.
- [ ] Empty state tetap tampil jika data kosong.
- [ ] Error state tetap tampil jika API gagal.
- [ ] Loading state tetap tampil saat request.
- [ ] Responsive mobile aman.
- [ ] Build production berhasil.
- [ ] Tidak ada hydration error.
- [ ] Tidak ada console error kritikal.
- [ ] Tidak ada hardcoded API URL.
- [ ] Tidak ada Supabase secret di frontend.
- [ ] Tidak ada Cloudflare R2 variable.
- [ ] Admin flow Phase 9 tidak rusak.
- [ ] Flow Phase 10 tetap lolos.

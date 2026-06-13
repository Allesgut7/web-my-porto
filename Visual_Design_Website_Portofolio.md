a# Final Visual Design System — Website Portofolio Developer

**Project:** Website Portofolio Developer  
**Document Type:** Final Visual Design System  
**Status:** Final Design Guide for Phase 8 and Next Phases  
**Target Implementation:** Nuxt + TypeScript + Tailwind CSS  
**Design Style:** Modern Technical Portfolio — clean, analytical, engineer-oriented  
**Primary Goal:** Menjadi acuan visual utama agar implementasi frontend public, admin dashboard, dan fitur lanjutan memiliki arah desain yang konsisten.

---

## 1. Ringkasan Desain

Website portofolio ini diarahkan menjadi **modern technical portfolio**: bersih, profesional, mudah dipindai, dan terasa seperti produk engineering yang rapi.

Desain tidak diarahkan menjadi terlalu artistik, terlalu ramai, atau terlalu playful. Fokus utamanya adalah memperlihatkan:

1. Siapa developer ini.
2. Apa bidang teknis yang dikuasai.
3. Project apa yang pernah dibuat.
4. Bagaimana kualitas berpikir teknisnya.
5. Bagaimana recruiter, client, atau collaborator dapat menghubungi developer.
6. Bagaimana admin dapat mengelola konten portfolio dengan nyaman.

Karakter desain utama:

```txt
Clean       : whitespace lega, section jelas, tidak ramai.
Analytical  : informasi disusun seperti dashboard ringan / case study.
Technical   : ada motif API, system, metrics, code, stack, dan architecture.
Professional: cocok untuk recruiter, client, dan technical collaborator.
Scalable    : bisa dipakai untuk public page, admin dashboard, dan fitur lanjutan.
```

---

## 2. Design Personality

### 2.1 Kata Kunci Visual

- Clean
- Technical
- Structured
- Analytical
- Professional
- Calm
- Precise
- Data-aware
- Engineer-oriented
- Trustworthy

### 2.2 Kesan yang Harus Muncul

Pengunjung harus merasa bahwa pemilik website adalah developer yang:

- Mampu membangun sistem yang rapi.
- Memahami backend, data, QA, frontend, dan deployment secara terstruktur.
- Bisa menjelaskan project secara jelas.
- Tidak hanya menampilkan UI cantik, tetapi juga menunjukkan problem, solution, stack, impact, dan learning.
- Punya personal branding teknis yang profesional.

### 2.3 Kesan yang Harus Dihindari

Hindari desain yang:

- Terlalu neon / cyberpunk berlebihan.
- Terlalu playful seperti startup casual.
- Terlalu banyak gradient mencolok.
- Terlalu banyak animasi.
- Terlalu padat seperti dokumentasi API mentah.
- Terlalu gelap untuk seluruh halaman.
- Terlalu banyak warna di luar palette.

---

## 3. Color Palette

Palette final menggunakan kombinasi **Blue, Amber, Cyan, dan Slate**.

Blue memberi kesan profesional, stabil, dan terpercaya. Amber memberi aksen pencapaian, highlight, dan perhatian. Cyan memberi nuansa teknis, sistem, API, dan engineering. Slate menjaga keterbacaan dan membuat UI tetap clean.

| Token | Warna | Hex | Fungsi |
|---|---:|---|---|
| Primary | Blue 700 | `#1D4ED8` | CTA utama, active link, brand highlight |
| Primary Soft | Blue 50 | `#EFF6FF` | Badge, soft background, icon wrapper |
| Accent Main | Amber 500 | `#F59E0B` | Achievement, highlight, warning/info penting, callout |
| Accent Tech | Cyan 500 | `#06B6D4` | Technical motif, API label, system indicator |
| Background | Slate 50 | `#F8FAFC` | Background utama halaman |
| Surface | White | `#FFFFFF` | Card, navbar, modal, form |
| Text Main | Slate 900 | `#0F172A` | Heading dan teks utama |
| Text Muted | Slate 500 | `#64748B` | Deskripsi, metadata, teks sekunder |
| Border | Slate 200 | `#E2E8F0` | Border card, input, divider |
| Dark Section | Slate 950 | `#020617` | Footer, contact section, technical showcase |

---

## 4. Color Usage Rules

### 4.1 Primary — Blue 700

Gunakan untuk elemen utama:

- Primary CTA.
- Active navigation.
- Link penting.
- Focus ring.
- Highlight brand.
- Tombol submit.
- Action utama pada admin.

Contoh penggunaan:

```txt
View Projects
Download CV
Save Project
Publish Project
Contact Me
```

Jangan gunakan Blue 700 untuk semua elemen. Warna ini harus menjadi penanda tindakan utama, bukan warna dekorasi berlebihan.

---

### 4.2 Primary Soft — Blue 50

Gunakan untuk elemen soft:

- Badge tech stack.
- Icon wrapper.
- Section accent.
- Empty state illustration.
- Card highlight ringan.
- Background label `Featured`.

Contoh:

```txt
bg-brand-soft text-brand-primary
```

---

### 4.3 Accent Main — Amber 500

Gunakan Amber sebagai aksen perhatian dan pencapaian:

- Achievement card.
- Certification highlight.
- Featured project marker.
- Important note.
- Warning ringan.
- Star/highlight icon.
- Admin draft indicator jika perlu.

Amber tidak boleh menjadi warna dominan halaman. Gunakan sebagai aksen kecil yang menarik perhatian.

---

### 4.4 Accent Tech — Cyan 500

Gunakan Cyan untuk elemen teknis:

- API endpoint label.
- System metric.
- Technical note.
- Architecture callout.
- Code preview accent.
- Small line/dot pada technical visual.

Cyan memberi nuansa engineering tanpa membuat tampilan terlalu ramai.

---

### 4.5 Slate Colors

Slate adalah dasar visual:

- Slate 50 untuk background.
- White untuk surface.
- Slate 900 untuk teks utama.
- Slate 500 untuk teks pendukung.
- Slate 200 untuk border.
- Slate 950 untuk section gelap.

---

## 5. Tailwind Theme Configuration

Gunakan mapping warna berikut pada `tailwind.config.ts`.

```ts
// tailwind.config.ts
export default {
  content: [
    './components/**/*.{vue,js,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './app.vue',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#1D4ED8',
          soft: '#EFF6FF',
        },
        accent: {
          main: '#F59E0B',
          tech: '#06B6D4',
        },
        app: {
          background: '#F8FAFC',
          surface: '#FFFFFF',
          text: '#0F172A',
          muted: '#64748B',
          border: '#E2E8F0',
          dark: '#020617',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        soft: '0 10px 30px rgba(15, 23, 42, 0.06)',
        card: '0 16px 40px rgba(15, 23, 42, 0.08)',
        navbar: '0 8px 24px rgba(15, 23, 42, 0.05)',
      },
      borderRadius: {
        card: '1.5rem',
        panel: '1.75rem',
      },
    },
  },
  plugins: [],
}
```

---

## 6. Global CSS Recommendation

Gunakan `assets/css/main.css`.

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  html {
    scroll-behavior: smooth;
  }

  body {
    @apply bg-app-background text-app-text font-sans antialiased;
  }

  ::selection {
    @apply bg-brand-soft text-brand-primary;
  }
}

@layer components {
  .app-container {
    @apply mx-auto w-full max-w-6xl px-6 lg:px-8;
  }

  .app-section {
    @apply py-16 md:py-24 lg:py-28;
  }

  .section-eyebrow {
    @apply font-mono text-xs font-semibold uppercase tracking-[0.2em] text-brand-primary;
  }

  .section-title {
    @apply mt-3 text-3xl font-bold tracking-tight text-app-text md:text-4xl;
  }

  .section-description {
    @apply mt-4 max-w-2xl text-base leading-7 text-app-muted md:text-lg;
  }

  .app-card {
    @apply rounded-card border border-app-border bg-app-surface shadow-soft;
  }

  .app-card-hover {
    @apply transition duration-300 hover:-translate-y-1 hover:shadow-card;
  }

  .btn {
    @apply inline-flex min-h-11 items-center justify-center rounded-xl px-5 py-2.5 text-sm font-semibold transition duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2;
  }

  .btn-primary {
    @apply btn bg-brand-primary text-white hover:bg-blue-800;
  }

  .btn-secondary {
    @apply btn border border-app-border bg-white text-app-text hover:bg-slate-50;
  }

  .btn-ghost {
    @apply btn text-app-muted hover:bg-brand-soft hover:text-brand-primary;
  }

  .badge {
    @apply inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium;
  }

  .badge-primary {
    @apply badge border-blue-100 bg-brand-soft text-brand-primary;
  }

  .badge-tech {
    @apply badge border-cyan-100 bg-cyan-50 text-cyan-700;
  }

  .badge-accent {
    @apply badge border-amber-100 bg-amber-50 text-amber-700;
  }

  .input {
    @apply w-full rounded-xl border border-app-border bg-white px-4 py-3 text-sm text-app-text outline-none transition placeholder:text-slate-400 focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20;
  }

  .technical-grid {
    background-image:
      linear-gradient(rgba(226, 232, 240, 0.65) 1px, transparent 1px),
      linear-gradient(90deg, rgba(226, 232, 240, 0.65) 1px, transparent 1px);
    background-size: 40px 40px;
  }

  .dark-technical-grid {
    background-image:
      linear-gradient(rgba(148, 163, 184, 0.12) 1px, transparent 1px),
      linear-gradient(90deg, rgba(148, 163, 184, 0.12) 1px, transparent 1px);
    background-size: 40px 40px;
  }
}
```

---

## 7. Typography System

### 7.1 Font

Rekomendasi:

```txt
Primary UI Font : Inter
Technical Font  : JetBrains Mono / Fira Code
Fallback        : system-ui, sans-serif
```

Gunakan font mono hanya untuk:

- Section eyebrow.
- API endpoint.
- Project slug.
- Metadata teknis.
- Code preview.
- System metrics.

---

### 7.2 Type Scale

| Element | Desktop | Mobile | Tailwind Pattern |
|---|---:|---:|---|
| Hero Title | 56–64px | 36–42px | `text-4xl md:text-6xl` |
| Page Title | 40–48px | 30–36px | `text-3xl md:text-5xl` |
| Section Title | 30–36px | 26–30px | `text-3xl md:text-4xl` |
| Card Title | 18–22px | 18–20px | `text-lg md:text-xl` |
| Body | 16–18px | 15–16px | `text-base md:text-lg` |
| Small Text | 13–14px | 12–14px | `text-xs md:text-sm` |
| Mono Label | 12–13px | 12px | `font-mono text-xs` |

### 7.3 Typography Rules

- Hero title harus kuat, pendek, dan jelas.
- Paragraph maksimal `max-w-2xl`.
- Gunakan `leading-7` atau `leading-8` untuk paragraph.
- Hindari teks panjang di hero.
- Gunakan heading hierarchy yang rapi untuk SEO.

---

## 8. Layout System

### 8.1 Container

Gunakan container standar:

```txt
max-w-6xl mx-auto px-6 lg:px-8
```

Untuk halaman detail yang lebih lebar:

```txt
max-w-7xl mx-auto px-6 lg:px-8
```

Untuk konten artikel/case study:

```txt
max-w-3xl
```

---

### 8.2 Section Spacing

| Area | Tailwind |
|---|---|
| Section desktop | `py-24 lg:py-28` |
| Section mobile | `py-16` |
| Card padding | `p-6 md:p-8` |
| Gap grid | `gap-6` |
| Header to content | `mt-10 md:mt-14` |
| Navbar height | `h-16` atau `h-20` |

---

### 8.3 Grid Rules

| Area | Mobile | Tablet | Desktop |
|---|---|---|---|
| Hero | 1 column | 1 column | 2 columns |
| Project grid | 1 column | 2 columns | 3 columns |
| Capability grid | 1 column | 2 columns | 4 columns |
| Admin stats | 1 column | 2 columns | 4 columns |
| Admin content | stacked | stacked | sidebar + content |
| Detail page | stacked | stacked | content + sidebar |

---

### 8.4 Spacing Tokens

| Token | Tailwind | Usage |
|---|---|---|
| Section Y | py-16 md:py-24 lg:py-28 | Main section spacing |
| Card Padding | p-6 md:p-8 | Default card content |
| Stack Small | gap-3 | Button group, badge group |
| Stack Medium | gap-6 | Card grid |
| Stack Large | gap-10 md:gap-14 | Section content gap |

---

## 9. Border, Radius, and Shadow

### 9.1 Border

Default border:

```txt
border border-app-border
```

Gunakan border untuk:

- Card.
- Input.
- Navbar.
- Table.
- Modal.
- Upload area.

---

### 9.2 Radius

| Component | Tailwind |
|---|---|
| Button | `rounded-xl` |
| Badge | `rounded-full` |
| Default card | `rounded-card` |
| Small card / compact card | `rounded-2xl` |
| Large panel | `rounded-panel` |
| Thumbnail | `rounded-2xl` |
| Input | `rounded-xl` |
| Modal | `rounded-2xl` |

---

### 9.3 Shadow

Gunakan shadow secara hemat:

| Usage | Tailwind |
|---|---|
| Default card | `shadow-soft` |
| Hover card | `hover:shadow-card` |
| Navbar sticky | `shadow-navbar` |
| Modal | `shadow-card` |

---

## 10. Visual Motif

### 10.1 Image Aspect Ratio Rules

| Image Type | Ratio | Usage |
|---|---|---|
| Project thumbnail | 16:10 | Project card |
| Project hero image | 16:9 | Detail page |
| Avatar/profile | 1:1 | Profile section |
| Certificate image | 4:3 | Achievement card |
| Gallery image | 16:9 or 4:3 | Project detail gallery |

---

### 10.2 Technical Grid

Gunakan untuk:

- Hero background.
- Empty state background.
- Project thumbnail fallback.
- Dark contact section.

Contoh:

```vue
<section class="technical-grid bg-app-background">
```

---

### 10.3 API / Code Card

Gunakan sebagai visual hero atau technical section.

Contoh isi:

```txt
GET /api/projects
status: published
stack: Go · Nuxt · PostgreSQL
storage: Supabase Storage
```

Visual pattern:

```html
<div class="app-card p-6 font-mono text-sm">
  <div class="text-accent-tech">GET /api/projects</div>
  <div class="mt-4 space-y-2 text-app-muted">
    <p><span class="text-app-text">status:</span> published</p>
    <p><span class="text-app-text">stack:</span> Go · Nuxt · PostgreSQL</p>
  </div>
</div>
```

---

### 10.4 System Metrics

Gunakan metrics kecil seperti:

```txt
API-driven content
Go backend
Nuxt frontend
PostgreSQL database
Admin-managed projects
```

Warna:

- Blue untuk primary metric.
- Cyan untuk technical metric.
- Amber untuk achievement / featured metric.

---

### 10.5 Section Numbering

Gunakan label mono:

```txt
01 / Profile
02 / Featured Work
03 / Technical Stack
04 / Experience
05 / Contact
```

Class:

```txt
section-eyebrow
```

---

## 11. Design Coverage by Phase

### 11.1 Phase 8 — Frontend Public

Phase 8 wajib mencakup:

| Kebutuhan | Status Desain |
|---|---|
| Public layout | Covered |
| Navbar | Covered |
| Footer | Covered |
| Hero section | Covered |
| About/profile section | Covered |
| Project section | Covered |
| Project card | Covered |
| Project list page | Covered |
| Project detail page | Covered |
| Contact link section | Covered |
| API client plugin visual integration | Covered indirectly |
| Composable loading/error/empty visual | Covered |
| TypeScript data-driven UI rules | Covered |
| SEO metadata visual/content rules | Covered |
| Responsive design | Covered |

---

### 11.2 Phase Setelah Phase 8

Dokumen ini juga mencakup desain untuk:

| Area | Kebutuhan Desain |
|---|---|
| Admin dashboard | Sidebar, topbar, stat card, table, form |
| CRUD project | Form, validation state, preview, status badge |
| Upload UI | Dropzone, progress, file preview, error |
| Experience | Timeline, experience card |
| Achievement | Certification card, award card |
| Skill | Skill group, tech badge, proficiency |
| Contact form | Input, textarea, submit, validation |
| Preview before publish | Preview panel, draft/published indicator |
| Dark section | Footer, CTA contact, technical showcase |
| Error handling | API error, validation error, not found |
| Empty state | No data, no search result, no upload |

---

## 12. Public Layout

### 12.1 Structure

```txt
<body class="bg-app-background text-app-text">
  <PublicNavbar />
  <main>
    <slot />
  </main>
  <AppFooter />
</body>
```

### 12.2 Visual Rules

- Background utama menggunakan `bg-app-background`.
- Navbar putih dengan border bawah.
- Footer menggunakan `bg-app-dark`.
- Semua section memakai container konsisten.
- Hindari section background yang terlalu banyak variasi.
- Gunakan white card untuk konten utama.

---

### 12.3 Homepage Recommended Order

#### Phase 8 MVP

1. Hero Section
2. About/Profile Section
3. Featured Projects Section
4. Contact Section
5. Footer

#### Future Full Version

1. Hero Section
2. About/Profile Section
3. Capability Section
4. Featured Projects Section
5. Experience Preview
6. Achievement Preview
7. Skill Section
8. Contact CTA
9. Footer

## 13. Navbar

### 13.1 Mobile Behavior Rules

- Hamburger button wajib punya `aria-label`.
- Gunakan `aria-expanded`.
- Menu otomatis tertutup saat link diklik.
- Dropdown/drawer muncul di bawah navbar.
- ESC menutup menu jika memungkinkan.


### 13.2 Desktop Structure

```txt
[Logo]     [Home] [Projects] [About] [Contact]      [GitHub] [Download CV]
```

### 13.3 Mobile Structure

```txt
[Logo]                                      [Menu Button]

Dropdown:
Home
Projects
About
Contact
GitHub
Download CV
```

### 13.4 Tailwind Pattern

```html
<header class="sticky top-0 z-50 border-b border-app-border bg-white/90 backdrop-blur">
  <div class="app-container flex h-20 items-center justify-between">
    <NuxtLink to="/" class="text-lg font-bold text-app-text">
      <span class="text-brand-primary">&lt;</span>Galih.dev<span class="text-brand-primary">/&gt;</span>
    </NuxtLink>

    <nav class="hidden items-center gap-8 md:flex">
      <NuxtLink class="text-sm font-medium text-app-muted hover:text-app-text" to="/">Home</NuxtLink>
      <NuxtLink class="text-sm font-medium text-app-muted hover:text-app-text" to="/projects">Projects</NuxtLink>
      <a class="text-sm font-medium text-app-muted hover:text-app-text" href="#about">About</a>
      <a class="text-sm font-medium text-app-muted hover:text-app-text" href="#contact">Contact</a>
    </nav>

    <div class="hidden items-center gap-3 md:flex">
      <a class="btn-ghost" href="https://github.com/username" target="_blank">GitHub</a>
      <a class="btn-primary" href="/cv.pdf">Download CV</a>
    </div>
  </div>
</header>
```

### 13.5 Active Link

Active state:

```txt
text-brand-primary font-semibold
```

---

## 14. Hero Section

### 14.1 Purpose

Hero harus menjawab:

1. Siapa developer ini?
2. Fokus skill-nya apa?
3. Apa aksi utama pengunjung?

### 14.2 Layout

Desktop:

```txt
Left:
- Eyebrow
- H1
- Description
- CTA group
- Availability / social links

Right:
- Technical profile card
- API card
- Metrics card
```

Mobile:

```txt
Top:
- Eyebrow
- H1
- Description
- CTA group

Bottom:
- Technical profile card
```

### 14.3 Example Copy

```txt
Building reliable backend systems, data-driven dashboards, and practical engineering solutions.
```

Description:

```txt
Developer focused on backend, data, QA, and system-oriented applications. I build clean APIs, structured data flows, and maintainable interfaces for real-world projects.
```

### 14.4 Hero Tailwind Pattern

```html
<section class="technical-grid app-section">
  <div class="app-container grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
    <div>
      <p class="section-eyebrow">Backend · Data · QA · Systems</p>
      <h1 class="mt-5 max-w-4xl text-4xl font-extrabold tracking-tight text-app-text md:text-6xl">
        Building reliable backend systems and data-driven engineering products.
      </h1>
      <p class="mt-6 max-w-2xl text-base leading-8 text-app-muted md:text-lg">
        I design APIs, dashboards, and system-oriented applications with clean architecture, structured data, and maintainable interfaces.
      </p>
      <div class="mt-8 flex flex-wrap gap-3">
        <NuxtLink to="/projects" class="btn-primary">View Projects</NuxtLink>
        <a href="/cv.pdf" class="btn-secondary">Download CV</a>
      </div>
    </div>

    <div class="app-card p-6 md:p-8">
      <p class="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-accent-tech">
        Profile Snapshot
      </p>
      <div class="mt-6 space-y-4 text-sm">
        <div class="flex justify-between gap-4">
          <span class="text-app-muted">Role</span>
          <span class="font-medium text-app-text">Backend · Data · QA</span>
        </div>
        <div class="flex justify-between gap-4">
          <span class="text-app-muted">Stack</span>
          <span class="font-medium text-app-text">Go · Nuxt · PostgreSQL</span>
        </div>
        <div class="flex justify-between gap-4">
          <span class="text-app-muted">Focus</span>
          <span class="font-medium text-app-text">API · Dashboard · IoT</span>
        </div>
        <div class="flex items-center gap-2 pt-2 text-sm font-medium text-app-text">
          <span class="h-2.5 w-2.5 rounded-full bg-accent-main"></span>
          Available for collaboration
        </div>
      </div>
    </div>
  </div>
</section>
```

---

## 15. About / Profile Section

### 15.1 Purpose

Menjelaskan positioning developer secara ringkas.

### 15.2 Layout

```txt
Section Header:
01 / Profile
About the Developer
Short description

Content:
Left: Bio
Right: Capability cards
```

### 15.3 Capability Card Types

- Backend Engineering
- Data & Analytics
- QA & Reliability
- IoT & Systems
- Frontend Interface
- Deployment & DevOps

### 15.4 Visual Pattern

```html
<div class="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
  <article class="app-card app-card-hover p-6">
    <div class="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-brand-soft text-brand-primary">
      API
    </div>
    <h3 class="text-lg font-semibold text-app-text">Backend Engineering</h3>
    <p class="mt-3 text-sm leading-6 text-app-muted">
      REST API, authentication, database design, deployment, and maintainable services.
    </p>
  </article>
</div>
```

---

## 16. Featured Projects Section

### 16.1 Purpose

Menampilkan project utama di homepage.

### 16.2 Rules

- Tampilkan maksimal 3–6 project.
- Prioritaskan `isFeatured`.
- Jangan hardcode data utama.
- Gunakan fallback visual jika thumbnail kosong.
- CTA menuju `/projects`.

### 16.3 Layout

```txt
Section Header + View All Link
Project Grid
Empty State if no published project
```

---

## 17. Project Card

### 17.1 Content Density Rules

- Maksimal 3–5 tech stack badge di project card.
- Jika lebih dari 5, tampilkan `+N more`.
- Project card description maksimal 3 baris.
- Hero metrics maksimal 3–4 item.
- Sidebar metadata maksimal 6–8 item.
- Jangan menampilkan semua informasi sekaligus di card.

---

### 17.2 Structure

```txt
Thumbnail / fallback
Project type badge
Featured badge
Title
Short description
Tech stack badges
Footer actions
```

### 17.3 Tailwind Pattern

```html
<article class="app-card app-card-hover overflow-hidden">
  <div class="aspect-[16/10] bg-brand-soft">
    <img
      v-if="project.thumbnailUrl"
      :src="project.thumbnailUrl"
      :alt="project.title"
      class="h-full w-full object-cover"
    />
    <div v-else class="technical-grid flex h-full items-center justify-center">
      <span class="font-mono text-sm font-semibold text-brand-primary">
        {{ project.projectType || 'Project' }}
      </span>
    </div>
  </div>

  <div class="p-6">
    <div class="flex flex-wrap gap-2">
      <span class="badge-primary">{{ project.projectType }}</span>
      <span v-if="project.isFeatured" class="badge-accent">Featured</span>
    </div>

    <h3 class="mt-5 text-xl font-bold text-app-text">
      {{ project.title }}
    </h3>

    <p class="mt-3 line-clamp-3 text-sm leading-6 text-app-muted">
      {{ project.shortDescription }}
    </p>

    <div class="mt-5 flex flex-wrap gap-2">
      <span
        v-for="tech in project.techStacks.slice(0, 5)"
        :key="tech.id"
        class="badge-tech"
      >
        {{ tech.name }}
      </span>

      <span
        v-if="project.techStacks.length > 5"
        class="badge"
      >
        +{{ project.techStacks.length - 5 }} more
      </span>
    </div>

    <div class="mt-6 flex items-center justify-between border-t border-app-border pt-5">
      <NuxtLink :to="`/projects/${project.slug}`" class="text-sm font-semibold text-brand-primary hover:text-blue-800">
        View Detail
      </NuxtLink>
      <div class="flex gap-3">
        <a v-if="project.demoUrl" :href="project.demoUrl" target="_blank" class="text-sm text-app-muted hover:text-app-text">
          Demo
        </a>
        <a v-if="project.repositoryUrl" :href="project.repositoryUrl" target="_blank" class="text-sm text-app-muted hover:text-app-text">
          GitHub
        </a>
      </div>
    </div>
  </div>
</article>
```

---

## 18. Projects List Page — `/projects`

### 18.1 Purpose

Menjadi halaman eksplorasi semua project published.

### 18.2 Layout

```txt
Navbar
Page Header
Search / Filter / Sort Toolbar
Project Grid
Pagination / Load More
Contact Section
Footer
```

### 18.3 Page Header

```txt
H1: Selected Engineering Projects
Description: A collection of backend, data, QA, IoT, and web engineering projects.
Technical note: Data loaded from public API.
```

### 18.4 Toolbar

Desktop:

```txt
[Search Input] [Category Filter] [Sort Dropdown]
```

Mobile:

```txt
Search Input
Category Filter
Sort Dropdown
```

Tailwind:

```html
<div class="app-card flex flex-col gap-4 p-4 md:flex-row md:items-center">
  <input class="input md:flex-1" placeholder="Search projects..." />
  <select class="input md:w-56">
    <option>All Categories</option>
  </select>
  <select class="input md:w-48">
    <option>Latest</option>
  </select>
</div>
```

---

## 19. Project Detail Page — `/projects/[slug]`

### 19.1 Purpose

Menjelaskan project sebagai mini case study.

### 19.2 Layout

```txt
Back Link
Project Header
Main Visual
Content + Metadata Sidebar
Contact Section
Footer
```

### 19.3 Project Header

Wajib menampilkan:

- Project type.
- Title.
- Short description.
- Tech stack.
- Demo/repository/documentation links if available.

### 19.4 Content Sections

Gunakan section berikut jika datanya tersedia:

```txt
Overview
Problem
Solution
Key Features
Technical Stack
Architecture Notes
Challenges
Learnings
Impact
```

### 19.5 Metadata Sidebar

```txt
Status
Timeline
Role
Project Type
Repository
Demo
Documentation
```

### 19.6 Fallback Rules

- Jika URL kosong, jangan tampilkan button.
- Jika thumbnail kosong, tampilkan fallback technical visual.
- Jika section kosong, jangan tampilkan heading section.
- Jika project tidak ditemukan, tampilkan not found state.

---

## 20. Contact Link Section

### 20.1 Purpose

Menutup halaman dengan CTA yang jelas.

### 20.2 Layout

```txt
Dark Section:
- Heading
- Description
- CTA Email
- GitHub / LinkedIn / Download CV
```

### 20.3 Tailwind Pattern

```html
<section id="contact" class="dark-technical-grid bg-app-dark py-20 text-white">
  <div class="app-container">
    <div class="max-w-3xl">
      <p class="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-accent-tech">
        Contact
      </p>
      <h2 class="mt-4 text-3xl font-bold md:text-4xl">
        Interested in working together?
      </h2>
      <p class="mt-5 text-base leading-7 text-slate-400 md:text-lg">
        Reach out for collaboration, internship, freelance work, or technical discussion.
      </p>
      <div class="mt-8 flex flex-wrap gap-3">
        <a href="mailto:email@example.com" class="btn bg-white text-app-text hover:bg-slate-100">
          Email Me
        </a>
        <a href="https://github.com/username" target="_blank" class="btn border border-slate-700 text-white hover:bg-slate-900">
          GitHub
        </a>
      </div>
    </div>
  </div>
</section>
```

---

## 21. Footer

### 21.1 Structure

```txt
Left:
Logo / name
Short positioning

Center:
Navigation links

Right:
GitHub, LinkedIn, Email

Bottom:
© Year Name. Built with Nuxt, Go, PostgreSQL.
```

### 21.2 Visual Rules

- Background: `bg-app-dark`.
- Text muted: `text-slate-400`.
- Border top: `border-slate-800`.
- Hover: `text-white` or `text-accent-tech`.

---

## 22. Status Color Rules

| Status | Visual |
|---|---|
| Published | Blue soft background + Blue text |
| Draft | Amber soft background + Amber text |
| Archived | Slate background + Slate text |
| Featured | Amber badge |
| API/Technical | Cyan badge |
| Error | Red text or Amber callout depending severity |
| Empty | Blue soft icon wrapper |
| Not Found | Slate/Amber neutral callout |

---

### 22.1 Semantic State Colors
Semantic colors hanya boleh dipakai untuk state seperti success, error, danger, bukan untuk dekorasi visual utama.

| Token | Color | Hex | Usage |
|---|---|---|---|
| Danger | Red 600 | `#DC2626` | Delete, logout danger, validation error |
| Danger Soft | Red 50 | `#FEF2F2` | Error background |
| Success | Emerald 600 | `#059669` | Success state |
| Success Soft | Emerald 50 | `#ECFDF5` | Success background |

---

## 23. Loading State

### 23.1 Rules

Jangan hanya menampilkan teks `Loading...`.

Gunakan:

- Skeleton card.
- Skeleton text.
- Skeleton thumbnail.
- Pulse animation ringan.

### 23.2 Project Card Skeleton

```html
<div class="app-card overflow-hidden animate-pulse">
  <div class="aspect-[16/10] bg-slate-200"></div>
  <div class="space-y-4 p-6">
    <div class="h-4 w-24 rounded bg-slate-200"></div>
    <div class="h-6 w-3/4 rounded bg-slate-200"></div>
    <div class="space-y-2">
      <div class="h-4 rounded bg-slate-200"></div>
      <div class="h-4 w-5/6 rounded bg-slate-200"></div>
    </div>
  </div>
</div>
```

---

## 24. Error State

### 24.1 Usage

Gunakan untuk:

- API gagal.
- Network error.
- Server unavailable.
- Data tidak bisa dimuat.

### 24.2 Pattern

```html
<div class="app-card p-8 text-center">
  <div class="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-amber-50 text-accent-main">
    !
  </div>
  <h3 class="mt-5 text-lg font-semibold text-app-text">
    Unable to load portfolio data.
  </h3>
  <p class="mt-2 text-sm text-app-muted">
    The API might be unavailable. Please try again later.
  </p>
  <button class="btn-primary mt-6">Retry</button>
</div>
```

---

## 25. Empty State

### 25.1 Project Empty

```txt
No published projects yet.
Once a project is published from the admin dashboard, it will appear here.
```

### 25.2 Search Empty

```txt
No matching projects found.
Try using a different keyword or category.
```

### 25.3 Visual Rules

- Gunakan card putih.
- Icon wrapper Blue Soft.
- Optional accent Cyan untuk technical motif.
- Text harus informatif, bukan menyalahkan user.

---

## 26. Not Found State

Gunakan untuk:

- Project slug tidak ditemukan.
- Route tidak valid.
- Data sudah tidak published.

Pattern:

```txt
Project not found.
The project may have been removed, archived, or is not published yet.
Back to Projects
```

CTA:

```txt
Back to Projects
```

---

## 27. Data-Driven UI Rules

Karena data berasal dari API, UI harus aman terhadap data kosong.

### 27.1 Profile

Jika avatar kosong:

- Tampilkan initials.
- Atau tampilkan technical avatar placeholder.

Jika CV kosong:

- Sembunyikan tombol Download CV.

Jika social URL kosong:

- Jangan tampilkan link.

---

### 27.2 Project

Jika thumbnail kosong:

- Tampilkan fallback technical visual.

Jika demo URL kosong:

- Jangan tampilkan button demo.

Jika repository URL kosong:

- Jangan tampilkan button repository.

Jika documentation URL kosong:

- Jangan tampilkan button documentation.

Jika tech stack kosong:

- Sembunyikan tech stack area pada public page.

Jika description kosong:

- Gunakan short description.

---

## 28. Responsive Design Rules

### 28.1 Breakpoints

| Screen | Behavior |
|---|---|
| Mobile | Single column, nav hamburger, CTA wrap |
| Tablet | Two-column cards |
| Desktop | Full grid, hero two-column, sticky navbar |
| Large Desktop | Max-width container, no uncontrolled stretching |

### 28.2 Mobile Rules

- Minimum touch target: `44px`.
- Button tidak terlalu kecil.
- Body text minimal `14px`.
- Card full width.
- Project toolbar stacked.
- Hero visual card berada di bawah teks.
- Sidebar project detail pindah ke bawah content.

### 28.3 Desktop Rules

- Whitespace harus terasa lega.
- Project grid maksimal 3 kolom.
- Detail page boleh menggunakan sidebar.
- Jangan melebar tanpa batas pada layar besar.

---

## 29. SEO Visual and Content Rules

### 29.1 Homepage

- Satu H1.
- H1 menjelaskan positioning.
- Section title menggunakan H2.
- CTA jelas.
- Image penting punya alt text.

### 29.2 Projects Page

- H1: `Selected Engineering Projects`.
- Meta description menjelaskan jenis project.
- Project card title menggunakan H2/H3 sesuai konteks.

### 29.3 Project Detail Page

- H1 adalah title project.
- Meta title: `{Project Title} | Portfolio`.
- Meta description dari short description.
- Slug harus SEO-friendly.
- Screenshot memiliki alt text.

---

## 30. Accessibility Rules

- Kontras teks harus cukup.
- Jangan mengandalkan warna saja untuk status.
- Icon button wajib punya `aria-label`.
- External link harus jelas.
- Gunakan `focus-visible`.
- Button dan link harus bisa diakses keyboard.
- Jangan gunakan animasi cepat berlebihan.

Focus pattern:

```txt
focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2
```

---

## 31. Animation Direction

Gunakan animasi ringan:

| Interaction | Duration |
|---|---|
| Button hover | 150–200ms |
| Card hover | 200–300ms |
| Mobile menu | 200–300ms |
| Section reveal | 400–600ms |
| Skeleton pulse | Default Tailwind pulse |

Hindari:

- Cursor trail.
- 3D heavy animation.
- Parallax berlebihan.
- Text animation yang mengganggu.
- Motion yang berat di mobile.

---

# 32. Admin Dashboard Design

Admin dashboard digunakan untuk mengelola konten portfolio.
Desain admin dashboard dipersiapkan untuk phase selanjutnya yang akan datang, ini tidak wajib di phase 8 dan bukan MVP phase 8

---

## 32.1 Admin Layout

Desktop:

```txt
Sidebar fixed
Topbar
Main content
```

Mobile:

```txt
Topbar
Drawer sidebar
Main content
```

### Visual Rules

- Background: `bg-app-background`.
- Sidebar: white atau dark slate.
- Active nav: Blue soft + Blue text.
- Main content: card putih.
- Table dan form memakai border Slate 200.

---

## 32.2 Admin Sidebar

Menu:

```txt
Dashboard
Projects
Uploads
Profile
Experience
Achievements
Skills
Contact Messages
Settings
Logout
```

Active state:

```txt
bg-brand-soft text-brand-primary
```

Danger/logout:

```txt
text-red-600 hover:bg-red-50
```

---

## 32.3 Admin Topbar

Isi:

- Page title.
- Breadcrumb optional.
- User dropdown.
- Quick action button.

Example:

```txt
Projects                    [+ New Project]
```

---

## 32.4 Admin Stat Card

Gunakan untuk dashboard summary:

```txt
Total Projects
Published
Draft
Uploads
Messages
```

Pattern:

```html
<div class="app-card p-6">
  <p class="text-sm font-medium text-app-muted">Published Projects</p>
  <div class="mt-4 flex items-end justify-between">
    <p class="text-3xl font-bold text-app-text">12</p>
    <span class="badge-primary">Live</span>
  </div>
</div>
```

---

## 32.5 Admin Table

### Visual Rules

- Header background: `bg-slate-50`.
- Border: `border-app-border`.
- Row hover: `hover:bg-slate-50`.
- Status badge jelas.
- Action button tidak terlalu ramai.

Columns project:

```txt
Thumbnail
Title
Type
Status
Featured
Updated At
Actions
```

Status badges:

```txt
Published : bg-blue-50 text-blue-700
Draft     : bg-amber-50 text-amber-700
Archived  : bg-slate-100 text-slate-600
```

---

## 32.6 Admin Form

### Field Rules

- Label selalu tampil.
- Help text optional.
- Error text di bawah input.
- Required field ditandai jelas.
- Submit button sticky di bawah pada mobile jika form panjang.

Input state:

```txt
Default : border Slate 200
Focus   : border Blue 700 + ring Blue
Error   : border red-500 + text red-600
Disabled: bg-slate-100 text-slate-400
```

---

## 32.7 Project Form Sections

Untuk create/edit project:

```txt
Basic Information
- Title
- Slug
- Short Description
- Description

Classification
- Project Type
- Status
- Is Featured
- Display Order

Links
- Demo URL
- Repository URL
- Documentation URL

Media
- Thumbnail
- Gallery

Tech Stack
- Multi-select tech stack

Timeline
- Started At
- Completed At

SEO
- Meta title optional
- Meta description optional
```

Gunakan card per section agar form tidak terasa panjang.

---

## 32.8 Upload UI

### Upload Dropzone

```txt
Drag and drop image here
or browse file
Supported: JPG, PNG, WEBP up to 5MB
```

Visual:

- Border dashed.
- Background white.
- Hover Blue soft.
- Error Amber/Red callout.
- Preview image setelah upload.

Pattern:

```html
<div class="rounded-2xl border-2 border-dashed border-app-border bg-white p-8 text-center transition hover:border-brand-primary hover:bg-brand-soft">
  <p class="font-medium text-app-text">Drop your file here</p>
  <p class="mt-2 text-sm text-app-muted">JPG, PNG, WEBP up to 5MB</p>
</div>
```

---

## 32.9 Preview Before Publish

Gunakan preview panel untuk melihat tampilan public sebelum publish.

Layout:

```txt
Left  : Form
Right : Preview card
```

Mobile:

```txt
Form
Preview below
```

Status indicator:

```txt
Draft Preview
Published Preview
Unsaved Changes
```

Amber cocok untuk `Unsaved Changes`.

---

# 33. Experience Section Design

## 33.1 Purpose

Menampilkan track record developer secara kronologis.

## 33.2 Layout

Desktop:

```txt
Timeline left
Experience cards right
```

Mobile:

```txt
Single column timeline
```

## 33.3 Experience Card

Content:

```txt
Role title
Company / organization
Employment type
Location
Period
Description
Tech stack
```

Visual:

- Card putih.
- Timeline dot Blue/Cyan.
- Current badge Amber atau Blue.
- Tech stack badge Cyan.

---

# 34. Achievement and Certification Design

## 34.1 Purpose

Menampilkan kredibilitas developer.

## 34.2 Card Types

- Certification card.
- Competition card.
- Award card.
- Publication/contribution card.

## 34.3 Visual Rules

- Gunakan Amber untuk achievement highlight.
- Gunakan Blue untuk credential/link.
- Gunakan card putih.
- Certificate image optional.
- Credential link conditional.

Badge:

```txt
National
International
Certification
Competition
Award
```

Amber badge:

```txt
badge-accent
```

---

# 35. Skill Section Design

## 35.1 Purpose

Membantu recruiter cepat memahami kemampuan teknis.

## 35.2 Grouping

Skill dikelompokkan menjadi:

```txt
Programming Language
Backend
Frontend
Database
DevOps
Data
QA
IoT
Tools
```

## 35.3 Visual Rules

- Gunakan group card.
- Skill tampil sebagai badge.
- Technical skill badge boleh menggunakan Cyan.
- Jangan tampilkan terlalu banyak progress bar kecuali datanya valid.
- Jika pakai proficiency, gunakan 1–5 dot indicator.

---

# 36. Contact Form Design

Jika contact form diaktifkan pada fase lanjutan.

## 36.1 Fields

```txt
Name
Email
Subject
Message
```

## 36.2 Visual Rules

- Form card putih.
- Input menggunakan `.input`.
- Error state jelas.
- Submit button Blue.
- Success state bisa menggunakan Cyan/Blue.
- Warning/info bisa menggunakan Amber.

---

# 37. Dark Mode Strategy

Dark mode belum wajib untuk MVP. Namun jika ditambahkan, gunakan strategi ini:

## 37.1 Recommended

Gunakan class-based dark mode:

```ts
darkMode: 'class'
```

## 37.2 Dark Mode Tokens

| Light | Dark |
|---|---|
| Background Slate 50 | Slate 950 |
| Surface White | Slate 900 |
| Text Main Slate 900 | Slate 50 |
| Text Muted Slate 500 | Slate 400 |
| Border Slate 200 | Slate 800 |
| Primary Blue 700 | Blue 500 |
| Primary Soft Blue 50 | Blue 950 |
| Accent Amber 500 | Amber 400 |
| Accent Tech Cyan 500 | Cyan 400 |

## 37.3 Rule

Jangan aktifkan dark mode sebelum light mode stabil.

---

# 38. Nuxt File Mapping

```txt
frontend/
├── assets/
│   └── css/
│       └── main.css
├── components/
│   ├── layout/
│   │   ├── AppNavbar.vue
│   │   ├── AppFooter.vue
│   │   ├── AdminSidebar.vue
│   │   └── AdminTopbar.vue
│   ├── sections/
│   │   ├── HeroSection.vue
│   │   ├── AboutSection.vue
│   │   ├── FeaturedProjectsSection.vue
│   │   ├── ContactSection.vue
│   │   ├── ExperienceSection.vue
│   │   ├── AchievementSection.vue
│   │   └── SkillSection.vue
│   ├── cards/
│   │   ├── ProjectCard.vue
│   │   ├── CapabilityCard.vue
│   │   ├── StatCard.vue
│   │   ├── ExperienceCard.vue
│   │   ├── AchievementCard.vue
│   │   └── SkillGroupCard.vue
│   ├── forms/
│   │   ├── BaseInput.vue
│   │   ├── BaseTextarea.vue
│   │   ├── BaseSelect.vue
│   │   ├── FileUploadDropzone.vue
│   │   └── ProjectForm.vue
│   └── states/
│       ├── LoadingSkeleton.vue
│       ├── ErrorState.vue
│       ├── EmptyState.vue
│       └── NotFoundState.vue
├── composables/
│   ├── useProfile.ts
│   ├── useProjects.ts
│   ├── useExperiences.ts
│   ├── useAchievements.ts
│   ├── useSkills.ts
│   ├── useUploads.ts
│   └── useAuth.ts
├── layouts/
│   ├── public.vue
│   └── admin.vue
├── pages/
│   ├── index.vue
│   ├── projects/
│   │   ├── index.vue
│   │   └── [slug].vue
│   └── admin/
│       ├── login.vue
│       ├── dashboard.vue
│       ├── projects/
│       ├── uploads/
│       ├── profile.vue
│       ├── experiences/
│       ├── achievements/
│       └── skills/
├── plugins/
│   └── api.client.ts
└── types/
    ├── api.ts
    ├── profile.ts
    ├── project.ts
    ├── experience.ts
    ├── achievement.ts
    ├── skill.ts
    └── file.ts
```

---

## 39. Component Naming Rules

- Layout component: `AppNavbar`, `AppFooter`, `AdminSidebar`
- Section component: `HeroSection`, `AboutSection`
- Card component: `ProjectCard`, `ExperienceCard`
- State component: `LoadingSkeleton`, `ErrorState`
- Form component: `BaseInput`, `BaseTextarea`
- Page-specific component boleh diberi prefix sesuai konteks, misalnya `ProjectDetailHeader`

---

# 40. Component Checklist

## 40.1 Phase 8 Public

- [ ] Public layout.
- [ ] Navbar.
- [ ] Footer.
- [ ] Hero section.
- [ ] About/profile section.
- [ ] Featured projects section.
- [ ] Project card.
- [ ] Projects list page.
- [ ] Project detail page.
- [ ] Contact link section.
- [ ] Loading skeleton.
- [ ] Error state.
- [ ] Empty state.
- [ ] Not found state.
- [ ] Responsive layout.
- [ ] SEO title and description.

## 40.2 Next Phases

- [ ] Admin layout.
- [ ] Admin sidebar.
- [ ] Admin topbar.
- [ ] Admin stat card.
- [ ] Admin table.
- [ ] Project form.
- [ ] Upload dropzone.
- [ ] Preview before publish.
- [ ] Experience timeline.
- [ ] Achievement/certification card.
- [ ] Skill group card.
- [ ] Contact form.
- [ ] Validation states.

---

# 41. Design QA Checklist

Sebelum merge frontend:

## 41.1 Visual

- [ ] Warna hanya menggunakan token design.
- [ ] Button utama konsisten Blue.
- [ ] Amber hanya untuk highlight/achievement/warning.
- [ ] Cyan hanya untuk elemen technical.
- [ ] Border dan radius konsisten.
- [ ] Card tidak terlalu padat.
- [ ] Section spacing konsisten.
- [ ] Project card hanya menampilkan maksimal 5 tech stack.
- [ ] Jika tech stack lebih dari 5, tampilkan +N more.
- [ ] Description project card maksimal 3 baris.
- [ ] Project thumbnail menggunakan aspect ratio 16:10.
- [ ] Project detail hero image menggunakan aspect ratio 16:9.
- [ ] Avatar/profile menggunakan aspect ratio 1:1.

## 41.2 Responsive

- [ ] Mobile tidak overflow horizontal.
- [ ] Navbar mobile tersedia.
- [ ] Button mudah diklik.
- [ ] Project grid berubah sesuai breakpoint.
- [ ] Project detail sidebar turun ke bawah di mobile.
- [ ] Admin table punya strategi mobile.

## 41.3 Data-driven

- [ ] Data kosong tidak merusak UI.
- [ ] URL kosong tidak menampilkan button.
- [ ] Thumbnail kosong punya fallback.
- [ ] Tech stack kosong tidak membuat gap aneh.
- [ ] Loading, error, empty state tersedia.

## 41.4 Accessibility

- [ ] Focus visible jelas.
- [ ] Contrast cukup.
- [ ] Image punya alt.
- [ ] Icon button punya aria-label.
- [ ] Link eksternal jelas.
- [ ] Form punya label.

## 41.5 SEO

- [ ] Setiap halaman punya title.
- [ ] Setiap halaman punya description.
- [ ] H1 hanya satu per page.
- [ ] Project detail menggunakan title project sebagai H1.
- [ ] Slug SEO-friendly.

---

# 42. Do and Don’t

## 42.1 Do

- Gunakan Tailwind token dari config.
- Buat reusable component class di `main.css`.
- Gunakan `app-container`, `app-section`, `app-card`, dan button class.
- Tangani loading/error/empty state sejak awal.
- Gunakan API sebagai sumber data utama.
- Buat UI aman terhadap field kosong.
- Gunakan whitespace yang lega.
- Gunakan motif technical secara subtle.

## 42.2 Don’t

- Jangan hardcode data utama project.
- Jangan memakai warna random di luar palette.
- Jangan membuat semua section memakai background berbeda.
- Jangan menampilkan button untuk URL kosong.
- Jangan membuat hover effect berat.
- Jangan membuat UI hanya bagus di desktop.
- Jangan menumpuk terlalu banyak badge.
- Jangan membuat admin form terlalu panjang tanpa grouping.

---

# 43. Definition of Done — Final Visual Design

Dokumen ini dianggap berhasil jika:

- [ ] Developer tahu palette final yang digunakan.
- [ ] Developer tahu mapping warna ke Tailwind.
- [ ] Developer tahu struktur visual homepage.
- [ ] Developer tahu desain project card.
- [ ] Developer tahu desain projects page.
- [ ] Developer tahu desain project detail page.
- [ ] Developer tahu desain contact/footer.
- [ ] Developer tahu cara menangani loading, error, empty, dan not found.
- [ ] Developer tahu desain admin dashboard.
- [ ] Developer tahu desain form CRUD.
- [ ] Developer tahu desain upload UI.
- [ ] Developer tahu desain experience, achievement, dan skill.
- [ ] Developer tahu aturan responsive, SEO, dan accessibility.
- [ ] Implementasi Phase 8 dan fase lanjutan tidak perlu menebak-nebak visual direction.

---

# 44. Final Visual Direction Summary

```txt
A clean technical portfolio with a calm slate background,
white analytical cards, blue primary actions,
amber achievement highlights, cyan technical accents,
structured case-study project pages,
and scalable Tailwind-based components for both public portfolio and admin dashboard.
```

Desain ini harus terlihat seperti portofolio developer yang bukan hanya menampilkan karya, tetapi juga menunjukkan cara berpikir teknis, struktur sistem, kualitas engineering, dan kemampuan membangun produk yang maintainable.

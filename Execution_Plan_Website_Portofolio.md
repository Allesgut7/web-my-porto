# 04 Execution Plan — Website Portofolio Developer

**Versi:** 1.0  
**Sumber:** PRD Website Portofolio Developer, Technical Design Document, Database API Design  
**Status:** Execution Plan  
**Target Stack:** Nuxt, Go, Gin, GORM, PostgreSQL, golang-migrate, Cloudflare R2, Docker, Nginx  
**Target Delivery:** MVP Core terlebih dahulu, lalu MVP Extended

---

## 1. Ringkasan

Dokumen ini adalah rencana eksekusi implementasi Website Portofolio Developer.

Dokumen ini menerjemahkan PRD, TDD, dan Database API Design menjadi urutan kerja yang bisa langsung dijadikan acuan coding.

Fokus utama dokumen ini:

1. Membagi pekerjaan ke dalam fase implementasi.
2. Menentukan urutan coding yang aman.
3. Menentukan prioritas MVP Core.
4. Menentukan task backend, frontend, database, upload, dan deployment.
5. Menyediakan checklist agar development lebih terkontrol.
6. Menentukan Definition of Done setiap fase.

---

## 2. Prinsip Eksekusi

Implementasi project mengikuti prinsip berikut:

1. Kerjakan **MVP Core** terlebih dahulu.
2. Jangan langsung mengerjakan semua fitur PRD sekaligus.
3. Database migration menggunakan `golang-migrate`.
4. GORM digunakan untuk CRUD standar.
5. `AutoMigrate` tidak digunakan pada staging/production.
6. File upload disimpan di Cloudflare R2.
7. Database hanya menyimpan metadata file.
8. Public API hanya menampilkan data yang aman.
9. Project public hanya menampilkan status `published`.
10. Admin API wajib dilindungi autentikasi.
11. Frontend admin dan public portfolio menggunakan Nuxt.
12. Deployment menggunakan Docker dan Nginx.

---

## 3. Scope Eksekusi

### 3.1 MVP Core

Fitur yang masuk MVP Core:

- Public landing page.
- About/profile developer.
- Project list.
- Project detail.
- Login admin.
- Logout admin.
- Admin protected route.
- Admin CRUD project.
- Upload thumbnail project ke Cloudflare R2.
- Public API profile.
- Public API projects.
- Basic SEO.
- Responsive design.
- Docker deployment.

### 3.2 MVP Extended

Fitur yang masuk MVP Extended:

- CRUD profile admin.
- CRUD experience.
- CRUD achievement.
- CRUD skill.
- Upload certificate.
- Download CV.
- Search and filter project.
- Preview before publish.
- Contact form backend.
- Admin contact message management.

### 3.3 Future Scope

Fitur yang tidak dikerjakan pada MVP awal:

- Blog.
- Newsletter.
- Analytics.
- Multi-language.
- GitHub API integration.
- Advanced case study pages.
- Complex RBAC.
- Multi-user admin.

## 3.4 MVP Core Freeze Rule

Selama MVP Core belum selesai, fitur berikut tidak dikerjakan:

- CRUD experience.
- CRUD achievement.
- CRUD skill.
- Contact form backend.
- Blog.
- Newsletter.
- Analytics.
- Multi-language.
- GitHub API integration.

Jika ide baru muncul saat development, catat ke backlog MVP Extended/Future, bukan langsung dikerjakan.

---

## 4. Deliverables

| Dokumen | Status | Fungsi |
|---|---|---|
| `01_PRD_Website_Portofolio.md` | Done | Menjelaskan kebutuhan produk |
| `02_TDD_Website_Portofolio.md` | Done | Menjelaskan desain teknis |
| `03_Database_API_Design.md` | Done | Menjelaskan database dan API |
| `04_Execution_Plan.md` | Current | Menjelaskan rencana implementasi |

---

## 5. Implementation Roadmap

| Phase | Nama | Fokus | Prioritas |
|---|---|---|---|
| Phase 0 | Preparation | Finalisasi dokumen dan setup repo | P0 |
| Phase 1 | Project Foundation | Setup frontend, backend, Docker, env | P0 |
| Phase 2 | Database Core | Migration MVP Core dan seed data | P0 |
| Phase 3 | Backend Foundation | Gin, GORM, config, response helper | P0 |
| Phase 4 | Authentication | Login, logout, auth middleware | P0 |
| Phase 5 | Public API | Profile dan projects public | P0 |
| Phase 6 | Admin Project API | CRUD project admin | P0 |
| Phase 7 | Upload API | Upload image/file ke Cloudflare R2 | P0 |
| Phase 8 | Frontend Public | Landing, projects, detail project | P0 |
| Phase 9 | Frontend Admin | Login, dashboard, CRUD project | P0 |
| Phase 10 | Integration Testing | End-to-end MVP flow | P0 |
| Phase 11 | Deployment | Docker, Nginx, VPS | P0 |
| Phase 12 | MVP Extended | Experience, achievement, skill, contact | P1 |

---

## 5.1 Phase Dependency Rule

- Phase 2 tidak dimulai sebelum Docker PostgreSQL berjalan.
- Phase 4 tidak dimulai sebelum tabel `users` dan seed admin tersedia.
- Phase 5 tidak dimulai sebelum tabel `profiles`, `projects`, dan `tech_stacks` tersedia.
- Phase 6 tidak dimulai sebelum auth middleware berjalan.
- Phase 7 tidak dimulai sebelum tabel `files` tersedia.
- Phase 8 tidak dimulai sebelum Public API minimal berjalan.
- Phase 9 tidak dimulai sebelum Auth API dan Admin Project API berjalan.
- Phase 11 tidak dimulai sebelum Integration Testing MVP Core lolos.

---

## 6. Phase 0 — Preparation

### Tujuan

Menyiapkan project sebelum coding agar implementasi tidak berubah-ubah di tengah jalan.

### Task

- [ ] Finalisasi PRD.
- [ ] Finalisasi TDD.
- [ ] Finalisasi Database API Design.
- [ ] Finalisasi Execution Plan.
- [ ] Tentukan nama repository.
- [ ] Tentukan domain sementara atau final.
- [ ] Tentukan environment: development, staging optional, production.
- [ ] Buat daftar environment variables.
- [ ] Tentukan akun Cloudflare R2.
- [ ] Tentukan VPS target.

### Definition of Done

- [ ] Semua dokumen utama tersedia.
- [ ] Stack final disepakati.
- [ ] MVP Core scope tidak berubah.
- [ ] Repository siap dibuat.

---

## 7. Phase 1 — Project Foundation

### Tujuan

Membuat fondasi project agar frontend, backend, database, dan Docker bisa berjalan.

### Backend Task

- [ ] Buat folder `backend/`.
- [ ] Inisialisasi Go module.
- [ ] Install dependency utama:
  - Gin
  - GORM
  - PostgreSQL driver
  - JWT library
  - bcrypt
  - config/env loader
  - validator
- [ ] Buat struktur backend:

```txt
backend/
├── cmd/api/main.go
├── internal/config/
├── internal/database/
├── internal/middleware/
├── internal/models/
├── internal/repositories/
├── internal/services/
├── internal/handlers/
├── internal/routes/
├── internal/dto/
├── internal/utils/
├── migrations/
├── go.mod
└── Dockerfile
```

- [ ] Buat endpoint health check:

```txt
GET /api/health
```

- [ ] Setup `.env.example` backend.

### Backend `.env.example`

```txt
APP_ENV=development
APP_PORT=8080
DATABASE_URL=postgres://user:password@localhost:5432/portfolio_db?sslmode=disable
JWT_SECRET=change_me
JWT_EXPIRES_IN=24h
R2_ACCOUNT_ID=
R2_ACCESS_KEY_ID=
R2_SECRET_ACCESS_KEY=
R2_BUCKET_NAME=
R2_PUBLIC_URL=
FRONTEND_ORIGIN=http://localhost:3000
```

### Frontend `.env.example`
```txt
NUXT_PUBLIC_API_BASE_URL=http://localhost:8080/api
NUXT_PUBLIC_SITE_URL=http://localhost:3000
```

### Frontend Task

- [ ] Buat folder `frontend/`.
- [ ] Inisialisasi Nuxt project.
- [ ] Setup TypeScript.
- [ ] Setup Tailwind atau UI library jika digunakan.
- [ ] Buat struktur frontend:

```txt
frontend/
├── assets/
├── components/
├── composables/
├── layouts/
├── middleware/
├── pages/
├── plugins/
├── public/
├── types/
├── nuxt.config.ts
└── package.json
```

- [ ] Buat layout public.
- [ ] Buat layout admin.
- [ ] Setup `.env.example` frontend.

### Docker Task

- [ ] Buat `docker-compose.yml`.
- [ ] Tambahkan service frontend, backend, postgres, dan nginx optional.
- [ ] Buat `backend/Dockerfile`.
- [ ] Buat `frontend/Dockerfile`.
- [ ] Setup volume PostgreSQL.
- [ ] Test container PostgreSQL berjalan.

### Development Command Task

- [ ] Buat `Makefile` atau script command helper.
- [ ] Tambahkan command untuk menjalankan backend.
- [ ] Tambahkan command untuk menjalankan frontend.
- [ ] Tambahkan command untuk menjalankan Docker Compose.
- [ ] Tambahkan command migration up.
- [ ] Tambahkan command migration down.
- [ ] Tambahkan command seed database.

### Definition of Done

- [ ] `GET /api/health` mengembalikan response sukses.
- [ ] Nuxt homepage default dapat diakses.
- [ ] PostgreSQL container berjalan.
- [ ] Environment variable terbaca.
- [ ] Docker Compose berjalan tanpa error besar.

---

## 8. Phase 2 — Database Core

### Tujuan

Membuat migration MVP Core sesuai Database API Design.

### MVP Core Migration

```txt
000_enable_pgcrypto_extension
001_create_users_table
002_create_files_table
003_create_profiles_table
004_create_projects_table
005_create_project_images_table
006_create_tech_stacks_table
007_create_project_tech_stacks_table
```

### Task

- [ ] Setup `golang-migrate`.
- [ ] Buat migration `000_enable_pgcrypto_extension`.
- [ ] Buat migration `001_create_users_table`.
- [ ] Buat migration `002_create_files_table`.
- [ ] Buat migration `003_create_profiles_table`.
- [ ] Buat migration `004_create_projects_table`.
- [ ] Buat migration `005_create_project_images_table`.
- [ ] Buat migration `006_create_tech_stacks_table`.
- [ ] Buat migration `007_create_project_tech_stacks_table`.
- [ ] Buat down migration untuk setiap migration.
- [ ] Jalankan migration up.
- [ ] Test migration down di database development.
- [ ] Buat seed admin user.
- [ ] Buat seed profile awal.
- [ ] Buat seed tech stack awal.
- [ ] Buat seed sample project optional.

### Catatan Teknis

Pada table `users`, gunakan satu unique constraint saja untuk email.

Contoh yang direkomendasikan:

```sql
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(150) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password_hash TEXT NOT NULL,
    role VARCHAR(50) NOT NULL DEFAULT 'owner',
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),

    CONSTRAINT uq_users_email UNIQUE (email)
);
```

### Definition of Done

- [ ] Migration up berhasil.
- [ ] Migration down berhasil di development.
- [ ] Tabel MVP Core tersedia.
- [ ] Constraint dan index sesuai Database API Design.
- [ ] Admin user bisa dipakai untuk login.
- [ ] Profile seed bisa ditampilkan melalui query.

---

## 9. Phase 3 — Backend Foundation

### Tujuan

Membuat fondasi backend agar siap membangun endpoint.

### Task

- [ ] Setup config loader.
- [ ] Setup database connection.
- [ ] Setup GORM.
- [ ] Pastikan GORM tidak menjalankan AutoMigrate di production.
- [ ] Buat model database:
  - User
  - File
  - Profile
  - Project
  - ProjectImage
  - TechStack
  - ProjectTechStack
- [ ] Buat response helper.
- [ ] Buat error helper.
- [ ] Buat pagination helper.
- [ ] Buat validation helper.
- [ ] Buat slug validation helper.
- [ ] Buat JWT utility.
- [ ] Buat password hashing utility.
- [ ] Buat middleware CORS, logging, auth, rate limit login.
- [ ] Buat origin/referer validation untuk production.

### Backend Layer Pattern

```txt
Routes → Middleware → Handler → Service → Repository → Database
```

Untuk upload:

```txt
Handler → Service → Cloudflare R2 + Database
```

### Definition of Done

- [ ] Database connection berhasil.
- [ ] Response helper digunakan konsisten.
- [ ] Error response konsisten.
- [ ] Middleware dasar berjalan.
- [ ] GORM model mengikuti migration.
- [ ] Migration SQL menjadi source of truth.

---

## 10. Phase 4 — Authentication API

### Tujuan

Membangun login admin yang aman menggunakan JWT HTTP-only cookie.

### Endpoint

```txt
POST /api/auth/login
POST /api/auth/logout
GET /api/auth/me
```

### Task

- [ ] Buat `AuthHandler`.
- [ ] Buat `AuthService`.
- [ ] Buat `UserRepository`.
- [ ] Implement login:
  - validasi email
  - validasi password
  - cek user by email
  - compare bcrypt password
  - generate JWT
  - set HTTP-only cookie
- [ ] Implement logout dengan clear cookie.
- [ ] Implement `/api/auth/me`.
- [ ] Implement auth middleware.
- [ ] Implement rate limit login.
- [ ] Pastikan response tidak mengembalikan `password_hash`.

### Test Case

- [ ] Login berhasil dengan credential valid.
- [ ] Login gagal dengan password salah.
- [ ] Login gagal dengan email tidak ditemukan.
- [ ] Logout menghapus cookie.
- [ ] `/api/auth/me` berhasil saat cookie valid.
- [ ] `/api/auth/me` gagal saat cookie kosong.
- [ ] Response tidak mengandung `password_hash`.

### Definition of Done

- [ ] Admin dapat login.
- [ ] Admin dapat logout.
- [ ] Session admin dapat dicek via `/api/auth/me`.
- [ ] Protected API bisa menggunakan auth middleware.
- [ ] Rate limit login aktif.

---

## 11. Phase 5 — Public API

### Tujuan

Membangun endpoint public yang digunakan oleh frontend portfolio.

### Endpoint

```txt
GET /api/profile
GET /api/projects
GET /api/projects/:slug
```

### Public Profile Task

- [ ] Buat `ProfileRepository`.
- [ ] Buat `ProfileService`.
- [ ] Buat `ProfileHandler`.
- [ ] Buat DTO `ProfilePublicResponse`.
- [ ] Join profile dengan avatar file dan CV file.
- [ ] Return profile tanpa data sensitif.

### Public Project Task

- [ ] Buat `ProjectRepository`.
- [ ] Buat `ProjectService`.
- [ ] Buat `ProjectHandler`.
- [ ] Buat DTO `ProjectListItemResponse`.
- [ ] Buat DTO `ProjectDetailResponse`.
- [ ] Buat DTO `ProjectImageResponse`.
- [ ] Implement `GET /api/projects`.
- [ ] Implement pagination default page 1, limit 10, max 50.
- [ ] Implement filter `category`.
- [ ] Implement filter `featured`.
- [ ] Implement search by title and short description.
- [ ] Implement sorting latest, oldest, display_order.
- [ ] Default sorting: featured first, display_order asc, created_at desc.
- [ ] Pastikan hanya project `published` yang tampil.
- [ ] Implement `GET /api/projects/:slug`.
- [ ] Return 404 jika project draft atau archived.

### Test Case

- [ ] Profile public berhasil ditampilkan.
- [ ] Projects public hanya menampilkan status `published`.
- [ ] Project `draft` tidak tampil.
- [ ] Project `archived` tidak tampil.
- [ ] Project detail by slug berhasil.
- [ ] Project detail draft return 404.
- [ ] Pagination berjalan.
- [ ] Search berjalan.
- [ ] Sorting berjalan.
- [ ] Empty project list return 200 dengan array kosong.

### Definition of Done

- [ ] Public profile API berjalan.
- [ ] Public project list API berjalan.
- [ ] Public project detail API berjalan.
- [ ] Public API aman dari field sensitif.
- [ ] Public API siap dikonsumsi frontend.

---

## 12. Phase 6 — Admin Project API

### Tujuan

Membangun endpoint admin untuk mengelola project.

### Endpoint

```txt
GET /api/admin/projects
GET /api/admin/projects/:id
POST /api/admin/projects
PUT /api/admin/projects/:id
DELETE /api/admin/projects/:id
```

### Task

- [ ] Tambahkan route admin group.
- [ ] Pasang auth middleware untuk `/api/admin/*`.
- [ ] Buat request DTO `CreateProjectRequest`.
- [ ] Buat request DTO `UpdateProjectRequest`.
- [ ] Buat response DTO `ProjectAdminListResponse`.
- [ ] Buat response DTO `ProjectAdminDetailResponse`.
- [ ] Implement list semua project.
- [ ] Implement filter by status.
- [ ] Implement search by title.
- [ ] Implement sorting.
- [ ] Implement create project.
- [ ] Implement slug validation.
- [ ] Implement duplicate slug error `409 Conflict`.
- [ ] Implement assign tech stack IDs.
- [ ] Implement update project.
- [ ] Implement update tech stack relation.
- [ ] Implement delete project.
- [ ] Pastikan related pivot terhapus karena cascade.
- [ ] Pastikan file R2 tidak otomatis dihapus tanpa service rule.

### Test Case

- [ ] Admin dapat melihat semua project.
- [ ] Admin dapat melihat draft project.
- [ ] Admin dapat membuat project draft.
- [ ] Admin dapat publish project.
- [ ] Admin dapat update project.
- [ ] Admin dapat delete project.
- [ ] Duplicate slug return 409.
- [ ] Request tanpa auth return 401.
- [ ] Public API menampilkan project setelah publish.

### Definition of Done

- [ ] Admin CRUD project berjalan.
- [ ] Auth middleware aktif.
- [ ] Validasi request berjalan.
- [ ] DTO response tidak expose field sensitif.
- [ ] Project published tampil di public API.

---

## 13. Phase 7 — Upload API

### Tujuan

Membangun upload file ke Cloudflare R2 dan menyimpan metadata ke PostgreSQL.

### Endpoint

```txt
POST /api/admin/uploads/images
POST /api/admin/uploads/files
DELETE /api/admin/uploads/:id
```

### Task

- [ ] Setup Cloudflare R2 credentials.
- [ ] Buat R2 client.
- [ ] Buat `UploadHandler`.
- [ ] Buat `UploadService`.
- [ ] Buat `FileRepository`.
- [ ] Implement upload image.
- [ ] Implement upload PDF.
- [ ] Validasi extension.
- [ ] Validasi MIME type.
- [ ] Validasi file size.
- [ ] Validasi fileType.
- [ ] Generate object key aman.
- [ ] Sanitasi folder jika field folder digunakan.
- [ ] Upload object ke R2.
- [ ] Simpan metadata ke table `files`.
- [ ] Return `FileResponse`.
- [ ] Implement delete file.
- [ ] Cek file masih dipakai atau tidak.
- [ ] Return 409 jika file masih dipakai.
- [ ] Delete object dari R2.
- [ ] Delete metadata dari database.

### Upload Rule

Image:

```txt
extension: jpg, jpeg, png, webp
mime_type: image/jpeg, image/png, image/webp
max_size: 5MB
fileType: avatar, thumbnail, gallery
```

PDF:

```txt
extension: pdf
mime_type: application/pdf
max_size: 10MB
fileType: cv, certificate, document
```

### Object Key Rule

Backend menentukan object key.

```txt
profiles/avatar-{timestamp}.{ext}
profiles/cv-{timestamp}.pdf
projects/{projectSlug}/thumbnail-{timestamp}.{ext}
projects/{projectSlug}/gallery-{timestamp}.{ext}
achievements/{achievementSlug}/certificate-{timestamp}.pdf
```

### API Contract Checklist

- [ ] Endpoint sesuai Database API Design.
- [ ] Request body sesuai dokumen.
- [ ] Response success sesuai format standar.
- [ ] Response error sesuai format standar.
- [ ] HTTP status code sesuai dokumen.
- [ ] Pagination format sesuai dokumen.
- [ ] DTO tidak mengembalikan model database langsung.

### Definition of Done

- [ ] Upload image berjalan.
- [ ] Upload PDF berjalan.
- [ ] Metadata file tersimpan.
- [ ] File delete aman.
- [ ] File upload hanya bisa dilakukan admin.

---

## 14. Phase 8 — Frontend Public

### Tujuan

Membangun halaman public portfolio untuk pengunjung, recruiter, dan client.

### Pages

```txt
/
/projects
/projects/[slug]
```

Opsional MVP Core:

```txt
/about
/contact
```

### Task

- [ ] Buat public layout.
- [ ] Buat navbar.
- [ ] Buat footer.
- [ ] Buat hero section.
- [ ] Buat about/profile section.
- [ ] Buat project section.
- [ ] Buat project card.
- [ ] Buat project list page.
- [ ] Buat project detail page.
- [ ] Buat contact link section.
- [ ] Buat loading state.
- [ ] Buat error state.
- [ ] Buat empty state.
- [ ] Buat composable `useProfile`.
- [ ] Buat composable `useProjects`.
- [ ] Integrasi `GET /api/profile`.
- [ ] Integrasi `GET /api/projects`.
- [ ] Integrasi `GET /api/projects/:slug`.
- [ ] Tambahkan basic SEO metadata.
- [ ] Tambahkan alt text gambar.
- [ ] Pastikan responsive mobile.

### Definition of Done

- [ ] Public homepage selesai.
- [ ] Public project list selesai.
- [ ] Public project detail selesai.
- [ ] Basic SEO tersedia.
- [ ] Responsive design valid.
- [ ] Data berasal dari API, bukan hardcode utama.

---

## 15. Phase 9 — Frontend Admin

### Tujuan

Membangun dashboard admin untuk mengelola project.

### Pages

```txt
/admin/login
/admin/dashboard
/admin/projects
/admin/projects/create
/admin/projects/[id]
```

### Task

- [ ] Buat admin layout.
- [ ] Buat login page.
- [ ] Buat admin route middleware.
- [ ] Buat composable `useAuth`.
- [ ] Integrasi `POST /api/auth/login`.
- [ ] Integrasi `POST /api/auth/logout`.
- [ ] Integrasi `GET /api/auth/me`.
- [ ] Buat dashboard page.
- [ ] Buat project admin list page.
- [ ] Buat create project page.
- [ ] Buat edit project page.
- [ ] Buat project form component.
- [ ] Buat upload thumbnail component.
- [ ] Integrasi Admin Project API.
- [ ] Integrasi Upload API.
- [ ] Tampilkan validation error dari backend.
- [ ] Tampilkan loading state.
- [ ] Tampilkan empty state.
- [ ] Tampilkan confirm delete.
- [ ] Redirect ke login jika belum login.
- [ ] Login menyimpan cookie HTTP-only dari backend.
- [ ] Request admin menyertakan cookie dengan `credentials: include`.
- [ ] Logout menghapus cookie.
- [ ] Refresh halaman admin tetap valid jika cookie masih aktif.

### Admin UX Rule

- Form project harus bisa menyimpan project sebagai draft.
- Project baru tidak langsung tampil public jika status masih draft.
- Admin bisa mengubah status menjadi published.
- Slug dapat dibuat otomatis dari title di frontend.
- Backend tetap menjadi validator utama.

### Frontend API Client Rule

- Semua request API menggunakan satu API client/plugin.
- Public request mengambil base URL dari `NUXT_PUBLIC_API_BASE_URL`.
- Admin request menggunakan `credentials: include`.
- Error response backend ditampilkan di UI.
- Jangan hardcode API URL langsung di page/component.

### Definition of Done

- [ ] Admin login selesai.
- [ ] Admin route protected.
- [ ] Admin CRUD project selesai.
- [ ] Upload thumbnail terintegrasi.
- [ ] Admin dapat publish/unpublish project.

---

## 16. Phase 10 — Integration Testing

### Tujuan

Memastikan seluruh MVP Core berjalan sebagai satu sistem.

### End-to-End Flow

```txt
Admin login
→ upload thumbnail
→ create project draft
→ project tidak tampil public
→ update status published
→ project tampil public
→ buka project detail
→ logout admin
```

### Backend Integration Test

- [ ] Auth API.
- [ ] Public Profile API.
- [ ] Public Projects API.
- [ ] Admin Projects API.
- [ ] Upload API.
- [ ] Protected route.
- [ ] Validation error.
- [ ] Duplicate slug.
- [ ] File delete conflict.

### Frontend Integration Test

- [ ] Login flow.
- [ ] Admin route middleware.
- [ ] Project CRUD flow.
- [ ] Upload flow.
- [ ] Public project rendering.
- [ ] Empty state.
- [ ] Error state.

### Definition of Done

- [ ] E2E MVP Core berhasil.
- [ ] Tidak ada endpoint public yang expose data sensitif.
- [ ] Tidak ada halaman utama yang blank.
- [ ] Error state dan empty state berjalan.
- [ ] Alur publish project berjalan.

---

## 17. Phase 11 — Deployment

### Tujuan

Deploy MVP Core ke VPS menggunakan Docker dan Nginx.

### Task

- [ ] Buat production Dockerfile backend.
- [ ] Buat production Dockerfile frontend.
- [ ] Buat production `docker-compose.yml`.
- [ ] Buat Nginx config.
- [ ] Setup domain.
- [ ] Setup SSL.
- [ ] Setup environment production.
- [ ] Setup PostgreSQL volume atau managed database.
- [ ] Setup Cloudflare R2 production bucket.
- [ ] Run migration production.
- [ ] Seed admin production.
- [ ] Deploy backend.
- [ ] Deploy frontend.
- [ ] Test public page.
- [ ] Test admin login.
- [ ] Test upload file.
- [ ] Setup database backup.

### Rollback Plan

- [ ] Simpan image Docker versi sebelumnya.
- [ ] Backup database sebelum migration production.
- [ ] Jika deploy gagal, rollback container ke image sebelumnya.
- [ ] Jika migration gagal, hentikan deploy dan restore database backup jika diperlukan.
- [ ] Simpan `.env.production` dengan aman.

### Nginx Routing

| Path | Target |
|---|---|
| `/` | Nuxt frontend |
| `/admin/*` | Nuxt frontend |
| `/api/*` | Go backend |
| `cdn.domainkamu.com` | Cloudflare R2 public asset |

### Security Checklist

- [ ] `JWT_SECRET` kuat.
- [ ] Cookie `Secure` aktif di production.
- [ ] CORS hanya domain resmi.
- [ ] Origin/Referer validation aktif untuk admin request.
- [ ] R2 secret tidak pernah dikirim ke frontend.
- [ ] `.env` tidak masuk Git.
- [ ] Database backup aktif.
- [ ] Nginx tidak expose service internal.

### Definition of Done

- [ ] Website dapat diakses via domain.
- [ ] API dapat diakses via `/api`.
- [ ] Admin dapat login di production.
- [ ] Upload R2 berjalan di production.
- [ ] Public page menampilkan data dari database production.
- [ ] SSL aktif.
- [ ] Backup database tersedia.

---

## 18. Phase 12 — MVP Extended

### Tujuan

Menambahkan fitur lanjutan setelah MVP Core stabil.

### Extended Database

```txt
008_create_experiences_table
009_create_experience_tech_stacks_table
010_create_achievements_table
011_create_skills_table
012_create_contact_messages_table
```

### Extended Backend

- [ ] Public Experience API.
- [ ] Public Achievement API.
- [ ] Public Skill API.
- [ ] Admin Experience API.
- [ ] Admin Achievement API.
- [ ] Admin Skill API.
- [ ] Contact API.
- [ ] Admin Contact Message API.
- [ ] Upload certificate.
- [ ] Update profile admin.

### Extended Frontend

- [ ] Experience section.
- [ ] Achievement section.
- [ ] Skill section.
- [ ] Contact form.
- [ ] Admin experience CRUD.
- [ ] Admin achievement CRUD.
- [ ] Admin skill CRUD.
- [ ] Admin profile edit page.
- [ ] Certificate upload.
- [ ] CV upload/download.

### Definition of Done

- [ ] Experience tampil public.
- [ ] Achievement tampil public.
- [ ] Skill tampil public.
- [ ] Admin dapat CRUD experience.
- [ ] Admin dapat CRUD achievement.
- [ ] Admin dapat CRUD skill.
- [ ] Contact form berjalan jika diaktifkan.
- [ ] CV dapat diunduh.

---

## 19. Risk Management

| Risk | Impact | Mitigation |
|---|---|---|
| Migration gagal | Development terhambat | Test migration di local sebelum production |
| Duplicate slug | Project gagal dibuat | Validasi slug dan return 409 |
| Upload file tidak valid | Security risk | Validasi MIME, extension, size |
| File orphan di R2 | Storage waste | File delete service dan cleanup |
| Auth cookie bermasalah | Admin tidak bisa login | Test cookie config per environment |
| CORS salah | Frontend gagal call API | Whitelist domain resmi |
| Data kosong membuat UI rusak | UX buruk | Empty state di API dan frontend |
| Query lambat | Performance buruk | Index dan pagination |
| Secret bocor | Security issue | `.env` tidak masuk Git |
| Docker deploy gagal | Downtime | Test docker compose di staging/local |

---

## 20. Quality Gate

### 20.1 Backend Quality Gate

- [ ] Semua endpoint mengembalikan response format konsisten.
- [ ] Semua endpoint admin protected.
- [ ] Tidak ada password hash di response.
- [ ] Pagination berjalan.
- [ ] Error handling jelas.
- [ ] Upload file aman.
- [ ] Migration bisa diulang di database baru.
- [ ] GORM model sesuai migration.

### 20.2 Frontend Quality Gate

- [ ] Responsive mobile dan desktop.
- [ ] Loading state tersedia.
- [ ] Empty state tersedia.
- [ ] Error state tersedia.
- [ ] Admin route protected.
- [ ] Form menampilkan validation error.
- [ ] Public page SEO metadata tersedia.
- [ ] Project detail by slug berjalan.

### 20.3 Security Quality Gate

- [ ] Password hashed.
- [ ] JWT di HTTP-only cookie.
- [ ] Cookie Secure di production.
- [ ] CORS ketat di production.
- [ ] Upload file tervalidasi.
- [ ] R2 secret tidak expose.
- [ ] Origin/Referer admin validation aktif di production.
- [ ] Rate limit login aktif.

### 20.4 Product Quality Gate

- [ ] Pengunjung memahami profil developer dalam kurang dari 30 detik.
- [ ] Recruiter dapat menemukan project dengan mudah.
- [ ] Recruiter dapat menemukan kontak/CV.
- [ ] Developer dapat menambahkan project tanpa mengubah kode.
- [ ] Project published tampil otomatis.
- [ ] Project draft tidak tampil public.

---

## 21. MVP Core Final Checklist

MVP Core dianggap selesai jika:

- [ ] Landing page menampilkan profile developer.
- [ ] Project list menampilkan data dari database.
- [ ] Project detail dapat dibuka berdasarkan slug.
- [ ] Admin dapat login.
- [ ] Admin dapat logout.
- [ ] Admin route terlindungi.
- [ ] Admin dapat membuat project.
- [ ] Admin dapat mengedit project.
- [ ] Admin dapat menghapus project.
- [ ] Admin dapat mengubah status project.
- [ ] Admin dapat upload thumbnail.
- [ ] Project draft tidak tampil public.
- [ ] Project published tampil public.
- [ ] Public API tidak expose data sensitif.
- [ ] Website responsive.
- [ ] Basic SEO metadata tersedia.
- [ ] Docker deployment berjalan.
- [ ] Website dapat diakses via domain.

---

## 22. Suggested Development Order

Urutan coding yang disarankan:

```txt
1. Repository setup
2. Docker Compose + PostgreSQL
3. Backend Go foundation
4. Migration 000–007
5. Seed admin and profile
6. GORM models
7. Response and error helpers
8. Auth API
9. Public Profile API
10. Public Project API
11. Admin Project API
12. Upload API
13. Frontend Nuxt foundation
14. Public homepage
15. Public project list
16. Public project detail
17. Admin login
18. Admin project list
19. Admin create/edit project
20. Upload integration
21. E2E testing
22. Docker production
23. Nginx production
24. VPS deployment
```

---

## 23. Notes

Execution Plan ini menjadi acuan implementasi setelah PRD, TDD, dan Database API Design selesai.

Jika terjadi konflik antar dokumen:

1. PRD menjadi acuan kebutuhan produk.
2. TDD menjadi acuan arsitektur teknis.
3. Database API Design menjadi acuan schema dan API.
4. Execution Plan menjadi acuan urutan pengerjaan.


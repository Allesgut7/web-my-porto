# 03 Database API Design — Website Portofolio Developer

**Versi:** 1.0  
**Sumber:** PRD Website Portofolio Developer + Technical Design Document  
**Status:** Draft Implementation Design  
**Target Stack:** Go, Gin, GORM, PostgreSQL, golang-migrate, JWT HTTP-only Cookie, Cloudflare R2

---

## 1. Ringkasan

Dokumen ini menjelaskan desain database dan API untuk Website Portofolio Developer.

Dokumen ini berfungsi sebagai turunan teknis dari PRD dan TDD, dengan fokus pada:

1. Desain tabel database.
2. Urutan migration.
3. Relasi antar tabel.
4. Constraint dan index.
5. API contract.
6. Request dan response schema.
7. DTO.
8. Validation rule.
9. Access control.
10. Error handling.

Website menggunakan konsep **database-driven content**, sehingga data portfolio seperti profile, project, experience, achievement, skill, tech stack, dan file pendukung dikelola melalui database dan admin dashboard.

---

## 2. Scope Dokumen

### 2.1 Termasuk dalam Dokumen Ini

- Database schema PostgreSQL.
- Migration plan menggunakan `golang-migrate`.
- Entity relationship summary.
- Public API contract.
- Admin API contract.
- Auth API contract.
- Upload API contract.
- DTO response.
- Validation rules.
- Access control.
- Error response standard.

### 2.2 Tidak Termasuk dalam Dokumen Ini

- Detail UI/UX frontend.
- Desain komponen Nuxt.
- Docker deployment detail.
- Nginx configuration detail.
- Cloudflare R2 setup step-by-step.
- Testing implementation code.

---

## 3. MVP Database Scope

### 3.1 MVP Core Tables

Tabel yang wajib dibuat pada MVP Core:

```txt
users
files
profiles
projects
project_images
tech_stacks
project_tech_stacks
```

### 3.2 MVP Extended Tables

Tabel yang dibuat setelah MVP Core stabil:

```txt
experiences
experience_tech_stacks
achievements
skills
contact_messages
```

### 3.3 Urutan Implementasi Database

```txt
1. users
2. files
3. profiles
4. projects
5. project_images
6. tech_stacks
7. project_tech_stacks
8. experiences
9. experience_tech_stacks
10. achievements
11. skills
12. contact_messages
```

---

## 4. Database Design Principles

Database mengikuti prinsip berikut:

1. File binary tidak disimpan di database.
2. File fisik disimpan di Cloudflare R2.
3. Database hanya menyimpan metadata file.
4. Public API tidak boleh mengembalikan data sensitif.
5. Admin API wajib dilindungi autentikasi.
6. Data project public hanya menampilkan status `published`.
7. Project `draft` dan `archived` tidak tampil di halaman public.
8. Migration production menggunakan `golang-migrate`, bukan `AutoMigrate`.
9. GORM digunakan untuk CRUD standar.
10. DTO digunakan untuk response API, bukan langsung model database.

---

## 5. Entity Relationship Summary

### 5.1 Relasi Utama

| Relasi | Jenis | Keterangan |
|---|---|---|
| users → projects | one-to-many | Satu admin dapat membuat banyak project |
| users → experiences | one-to-many | Satu admin dapat membuat banyak pengalaman |
| users → achievements | one-to-many | Satu admin dapat membuat banyak achievement |
| users → skills | one-to-many | Satu admin dapat membuat banyak skill |
| projects → project_images | one-to-many | Satu project dapat memiliki banyak gambar |
| projects ↔ tech_stacks | many-to-many | Project dapat memakai banyak tech stack |
| experiences ↔ tech_stacks | many-to-many | Experience dapat memiliki banyak tech stack |
| profiles → files | many-to-one | Profile dapat memiliki avatar dan CV |
| projects → files | many-to-one | Project dapat memiliki thumbnail |
| project_images → files | many-to-one | Project image mengarah ke metadata file |
| achievements → files | many-to-one | Achievement dapat memiliki file sertifikat |

---

## 6. Migration Plan

### 6.1 Migration File Naming

Gunakan format migration berikut:

```txt
{version}_{description}.up.sql
{version}_{description}.down.sql
```

Contoh:

```txt
001_create_users_table.up.sql
001_create_users_table.down.sql
```

### 6.2 Migration Files

```txt
000_enable_pgcrypto_extension.up.sql
000_enable_pgcrypto_extension.down.sql

001_create_users_table.up.sql
001_create_users_table.down.sql

002_create_files_table.up.sql
002_create_files_table.down.sql

003_create_profiles_table.up.sql
003_create_profiles_table.down.sql

004_create_projects_table.up.sql
004_create_projects_table.down.sql

005_create_project_images_table.up.sql
005_create_project_images_table.down.sql

006_create_tech_stacks_table.up.sql
006_create_tech_stacks_table.down.sql

007_create_project_tech_stacks_table.up.sql
007_create_project_tech_stacks_table.down.sql

008_create_experiences_table.up.sql
008_create_experiences_table.down.sql

009_create_experience_tech_stacks_table.up.sql
009_create_experience_tech_stacks_table.down.sql

010_create_achievements_table.up.sql
010_create_achievements_table.down.sql

011_create_skills_table.up.sql
011_create_skills_table.down.sql

012_create_contact_messages_table.up.sql
012_create_contact_messages_table.down.sql
```

---

### 6.3 Migration 000 — Enable pgcrypto Extension

Migration ini diperlukan karena database menggunakan `gen_random_uuid()` untuk membuat UUID otomatis.

#### `000_enable_pgcrypto_extension.up.sql`

```sql
CREATE EXTENSION IF NOT EXISTS "pgcrypto";
```

#### `000_enable_pgcrypto_extension.down.sql`

```sql
-- Do nothing.
-- pgcrypto tidak di-drop untuk menghindari risiko jika extension digunakan object lain.
```

---

# 7. Database Schema

## 7.1 Table: `users`

### Fungsi

Menyimpan akun admin/developer yang dapat login ke dashboard.

### Columns

| Column | Type | Constraint | Description |
|---|---|---|---|
| id | UUID | PRIMARY KEY | User ID |
| name | VARCHAR(150) | NOT NULL | Nama admin |
| email | VARCHAR(255) | UNIQUE, NOT NULL | Email login |
| password_hash | TEXT | NOT NULL | Password yang sudah di-hash |
| role | VARCHAR(50) | NOT NULL, DEFAULT 'owner' | Role user |
| created_at | TIMESTAMP | NOT NULL | Waktu dibuat |
| updated_at | TIMESTAMP | NOT NULL | Waktu diubah |

### SQL

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


---

## 7.2 Table: `files`

### Fungsi

Menyimpan metadata file yang diupload ke Cloudflare R2.

### Columns

| Column | Type | Constraint | Description |
|---|---|---|---|
| id | UUID | PRIMARY KEY | File ID |
| file_name | VARCHAR(255) | NOT NULL | Nama file |
| file_key | TEXT | UNIQUE, NOT NULL | Object key di R2 |
| file_url | TEXT | NOT NULL | Public URL file |
| bucket_name | VARCHAR(255) | NOT NULL | Nama bucket R2 |
| mime_type | VARCHAR(100) | NOT NULL | MIME type file |
| file_size | BIGINT | NOT NULL | Ukuran file dalam bytes |
| file_type | VARCHAR(100) | NOT NULL | image/cv/certificate/document |
| storage_provider | VARCHAR(100) | NOT NULL | cloudflare_r2 |
| created_at | TIMESTAMP | NOT NULL | Waktu dibuat |
| updated_at | TIMESTAMP | NOT NULL | Waktu diubah |

### SQL

```sql
CREATE TABLE files (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    file_name VARCHAR(255) NOT NULL,
    file_key TEXT NOT NULL,
    file_url TEXT NOT NULL,
    bucket_name VARCHAR(255) NOT NULL,
    mime_type VARCHAR(100) NOT NULL,
    file_size BIGINT NOT NULL,
    file_type VARCHAR(100) NOT NULL,
    storage_provider VARCHAR(100) NOT NULL DEFAULT 'cloudflare_r2',
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
    
    CONSTRAINT uq_files_file_key UNIQUE (file_key),

    CONSTRAINT chk_files_file_type
    CHECK (file_type IN ('image', 'avatar', 'thumbnail', 'gallery', 'cv', 'certificate', 'document')),

    CONSTRAINT chk_files_storage_provider
    CHECK (storage_provider IN ('cloudflare_r2'))
);

```

---

## 7.3 Table: `profiles`

### Fungsi

Menyimpan profil utama developer.

Untuk MVP Core, data profile dapat dibuat melalui seed database. CRUD profile admin masuk MVP Extended.

### Columns

| Column | Type | Constraint | Description |
|---|---|---|---|
| id | UUID | PRIMARY KEY | Profile ID |
| full_name | VARCHAR(150) | NOT NULL | Nama lengkap |
| headline | VARCHAR(255) | NULL | Headline/role |
| bio | TEXT | NULL | Deskripsi singkat |
| location | VARCHAR(150) | NULL | Lokasi umum |
| email | VARCHAR(255) | NULL | Email kontak |
| phone | VARCHAR(50) | NULL | Nomor kontak opsional |
| github_url | TEXT | NULL | Link GitHub |
| linkedin_url | TEXT | NULL | Link LinkedIn |
| website_url | TEXT | NULL | Link website |
| avatar_file_id | UUID | FK files.id | Avatar |
| cv_file_id | UUID | FK files.id | CV |
| created_at | TIMESTAMP | NOT NULL | Waktu dibuat |
| updated_at | TIMESTAMP | NOT NULL | Waktu diubah |

### SQL

```sql
CREATE TABLE profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name VARCHAR(150) NOT NULL,
    headline VARCHAR(255),
    bio TEXT,
    location VARCHAR(150),
    email VARCHAR(255),
    phone VARCHAR(50),
    github_url TEXT,
    linkedin_url TEXT,
    website_url TEXT,
    avatar_file_id UUID REFERENCES files(id) ON DELETE SET NULL,
    cv_file_id UUID REFERENCES files(id) ON DELETE SET NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);
```

---

## 7.4 Table: `projects`

### Fungsi

Menyimpan data project/karya developer.

### Columns

| Column | Type | Constraint | Description |
|---|---|---|---|
| id | UUID | PRIMARY KEY | Project ID |
| user_id | UUID | FK users.id | Creator |
| title | VARCHAR(255) | NOT NULL | Judul project |
| slug | VARCHAR(255) | UNIQUE, NOT NULL | Slug SEO |
| short_description | TEXT | NULL | Deskripsi singkat |
| description | TEXT | NULL | Deskripsi detail |
| project_type | VARCHAR(100) | NULL | Kategori project |
| status | VARCHAR(50) | NOT NULL | draft/published/archived |
| demo_url | TEXT | NULL | Link demo |
| repository_url | TEXT | NULL | Link repository |
| documentation_url | TEXT | NULL | Link dokumentasi |
| thumbnail_file_id | UUID | FK files.id | Thumbnail |
| is_featured | BOOLEAN | DEFAULT false | Featured project |
| display_order | INT | DEFAULT 0 | Urutan tampil |
| started_at | DATE | NULL | Tanggal mulai |
| completed_at | DATE | NULL | Tanggal selesai |
| created_at | TIMESTAMP | NOT NULL | Waktu dibuat |
| updated_at | TIMESTAMP | NOT NULL | Waktu diubah |

### SQL

```sql
CREATE TABLE projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL,
    short_description TEXT,
    description TEXT,
    project_type VARCHAR(100),
    status VARCHAR(50) NOT NULL DEFAULT 'draft',
    demo_url TEXT,
    repository_url TEXT,
    documentation_url TEXT,
    thumbnail_file_id UUID REFERENCES files(id) ON DELETE SET NULL,
    is_featured BOOLEAN NOT NULL DEFAULT false,
    display_order INT NOT NULL DEFAULT 0,
    started_at DATE,
    completed_at DATE,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),

    CONSTRAINT uq_projects_slug UNIQUE (slug),
    CONSTRAINT chk_projects_status
    CHECK (status IN ('draft', 'published', 'archived'))
);

CREATE INDEX idx_projects_status ON projects(status);
CREATE INDEX idx_projects_is_featured ON projects(is_featured);
CREATE INDEX idx_projects_display_order ON projects(display_order);
CREATE INDEX idx_projects_project_type ON projects(project_type);
```

---

## 7.5 Table: `project_images`

### Fungsi

Menyimpan galeri gambar atau screenshot project.

### SQL

```sql
CREATE TABLE project_images (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    file_id UUID REFERENCES files(id) ON DELETE SET NULL,
    image_type VARCHAR(100),
    caption TEXT,
    display_order INT NOT NULL DEFAULT 0,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),

    CONSTRAINT chk_project_images_type
    CHECK (
        image_type IN ('cover', 'gallery', 'screenshot')
        OR image_type IS NULL
    )
);

CREATE INDEX idx_project_images_project_id ON project_images(project_id);
CREATE INDEX idx_project_images_display_order ON project_images(display_order);
```

---

## 7.6 Table: `tech_stacks`

### Fungsi

Menyimpan master teknologi seperti Go, Nuxt, Laravel, PostgreSQL, Docker, dan lain-lain.

### SQL

```sql
CREATE TABLE tech_stacks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    category VARCHAR(100),
    icon_url TEXT,
    display_order INT NOT NULL DEFAULT 0,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
    
    CONSTRAINT uq_tech_stacks_name UNIQUE (name)
);

CREATE INDEX idx_tech_stacks_category ON tech_stacks(category);
CREATE INDEX idx_tech_stacks_display_order ON tech_stacks(display_order);
```

---

## 7.7 Table: `project_tech_stacks`

### Fungsi

Pivot table untuk relasi many-to-many antara project dan tech stack.

### SQL

```sql
CREATE TABLE project_tech_stacks (
    project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    tech_stack_id UUID NOT NULL REFERENCES tech_stacks(id) ON DELETE CASCADE,
    PRIMARY KEY (project_id, tech_stack_id)
);

CREATE INDEX idx_project_tech_stacks_project_id ON project_tech_stacks(project_id);
CREATE INDEX idx_project_tech_stacks_tech_stack_id ON project_tech_stacks(tech_stack_id);
```

---

## 7.8 Table: `experiences`

### Fungsi

Menyimpan pengalaman kerja, magang, organisasi, freelance, bootcamp, atau independent study.

### SQL

```sql
CREATE TABLE experiences (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    title VARCHAR(255) NOT NULL,
    company_name VARCHAR(255),
    employment_type VARCHAR(100),
    location VARCHAR(150),
    description TEXT,
    start_date DATE,
    end_date DATE,
    is_current BOOLEAN NOT NULL DEFAULT false,
    display_order INT NOT NULL DEFAULT 0,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_experiences_start_date ON experiences(start_date);
CREATE INDEX idx_experiences_display_order ON experiences(display_order);
```

---

## 7.9 Table: `experience_tech_stacks`

### Fungsi

Pivot table untuk relasi many-to-many antara experience dan tech stack.

### SQL

```sql
CREATE TABLE experience_tech_stacks (
    experience_id UUID NOT NULL REFERENCES experiences(id) ON DELETE CASCADE,
    tech_stack_id UUID NOT NULL REFERENCES tech_stacks(id) ON DELETE CASCADE,
    PRIMARY KEY (experience_id, tech_stack_id)
);

CREATE INDEX idx_experience_tech_stacks_experience_id ON experience_tech_stacks(experience_id);
CREATE INDEX idx_experience_tech_stacks_tech_stack_id ON experience_tech_stacks(tech_stack_id);
```

---

## 7.10 Table: `achievements`

### Fungsi

Menyimpan prestasi, sertifikasi, award, kompetisi, dan credential.

### SQL

```sql
CREATE TABLE achievements (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    title VARCHAR(255) NOT NULL,
    issuer VARCHAR(255),
    description TEXT,
    issued_date DATE,
    expired_date DATE,
    achievement_type VARCHAR(100),
    level VARCHAR(100),
    credential_id VARCHAR(255),
    external_url TEXT,
    certificate_file_id UUID REFERENCES files(id) ON DELETE SET NULL,
    display_order INT NOT NULL DEFAULT 0,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),

    CONSTRAINT chk_achievements_level
    CHECK (
        level IN ('campus', 'regional', 'national', 'international')
        OR level IS NULL
    ),

    CONSTRAINT chk_achievements_type
    CHECK (
        achievement_type IN ('certification', 'competition', 'award', 'publication', 'contribution')
        OR achievement_type IS NULL
    )
);

CREATE INDEX idx_achievements_issued_date ON achievements(issued_date);
CREATE INDEX idx_achievements_type ON achievements(achievement_type);
CREATE INDEX idx_achievements_level ON achievements(level);
```

---

## 7.11 Table: `skills`

### Fungsi

Menyimpan skill developer yang akan ditampilkan pada portfolio.

### SQL

```sql
CREATE TABLE skills (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    name VARCHAR(100) NOT NULL,
    category VARCHAR(100),
    proficiency_level INT,
    icon_url TEXT,
    display_order INT NOT NULL DEFAULT 0,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),

    CONSTRAINT chk_skills_proficiency
    CHECK (
        proficiency_level BETWEEN 1 AND 5
        OR proficiency_level IS NULL
    )
);

CREATE INDEX idx_skills_category ON skills(category);
CREATE INDEX idx_skills_display_order ON skills(display_order);
```

---

## 7.12 Table: `contact_messages`

### Fungsi

Menyimpan pesan dari form kontak jika fitur contact form diaktifkan.

### SQL

```sql
CREATE TABLE contact_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(150) NOT NULL,
    email VARCHAR(255) NOT NULL,
    subject VARCHAR(255),
    message TEXT NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'new',
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),

    CONSTRAINT chk_contact_messages_status
    CHECK (status IN ('new', 'read', 'replied', 'archived'))
);

CREATE INDEX idx_contact_messages_status ON contact_messages(status);
CREATE INDEX idx_contact_messages_created_at ON contact_messages(created_at);
```

---

# 8. Seed Data

## 8.1 Admin User Seed

Admin user perlu dibuat pada setup awal.

Password tidak boleh disimpan plain text. Password harus di-hash menggunakan `bcrypt`.

Contoh data:

```txt
name: Admin
email: admin@example.com
role: owner
password_hash: generated_by_bcrypt
```

## 8.2 Profile Seed

Untuk MVP Core, profile dapat dibuat melalui seed.

Contoh data:

```txt
full_name: Developer Name
headline: Backend Developer | Data Enthusiast
bio: Developer yang memiliki minat pada Backend Development, Data, QA, dan sistem berbasis teknologi.
location: Indonesia
email: developer@example.com
github_url: https://github.com/username
linkedin_url: https://linkedin.com/in/username
```

---

# 9. API General Standard

## 9.1 Base URL

Development:

```txt
http://localhost:8080/api
```

Production:

```txt
https://domainkamu.com/api
```

## 9.2 Response Format

### Success Response

```json
{
  "success": true,
  "message": "Request successful",
  "data": {}
}
```

### Error Response

```json
{
  "success": false,
  "message": "Validation error",
  "errors": {
    "title": "Title is required"
  }
}
```

### Paginated Response

```json
{
  "success": true,
  "message": "Request successful",
  "data": [],
  "meta": {
    "page": 1,
    "limit": 10,
    "total": 25,
    "totalPages": 3
  }
}
```

## 9.3 HTTP Status Code

| Code | Meaning | Usage |
|---|---|---|
| 200 | OK | Request berhasil |
| 201 | Created | Data berhasil dibuat |
| 400 | Bad Request | Request tidak valid secara umum |
| 401 | Unauthorized | Belum login/token tidak valid |
| 403 | Forbidden | Tidak punya akses |
| 404 | Not Found | Data tidak ditemukan |
| 409 | Conflict | Duplicate data, misalnya slug sudah ada |
| 422 | Validation Error | Input tidak lolos validasi |
| 429 | Too Many Requests | Rate limit |
| 500 | Internal Server Error | Error server |

---

## 9.4 Pagination Rule

Endpoint list yang mendukung pagination wajib mengikuti aturan berikut:

| Rule | Value |
|---|---|
| Default page | 1 |
| Default limit | 10 |
| Maximum limit | 50 |

Behavior:

- Jika `page` tidak dikirim, backend menggunakan `page = 1`.
- Jika `limit` tidak dikirim, backend menggunakan `limit = 10`.
- Jika `limit > 50`, backend menggunakan `limit = 50`.
- Jika `page < 1`, backend menggunakan `page = 1`.

Contoh:

```txt
/api/projects?page=1&limit=10
```

---

## 9.5 Empty List Response Rule

Untuk endpoint list, jika data kosong, API tetap mengembalikan HTTP `200 OK` dengan `data: []`.

Endpoint list tidak boleh mengembalikan `404` hanya karena data kosong.

Contoh response:

```json
{
  "success": true,
  "message": "Projects retrieved",
  "data": [],
  "meta": {
    "page": 1,
    "limit": 10,
    "total": 0,
    "totalPages": 0
  }
}
```

---

## 9.6 Sorting Rule

Endpoint list yang memiliki query param `sort` wajib mengikuti mapping berikut:

| Sort Value | Query Behavior |
|---|---|
| latest | `ORDER BY created_at DESC` |
| oldest | `ORDER BY created_at ASC` |
| display_order | `ORDER BY display_order ASC, created_at DESC` |

Default sorting untuk public project:

```sql
ORDER BY is_featured DESC, display_order ASC, created_at DESC
```

---

# 10. Authentication API

## 10.1 POST `/api/auth/login`

### Access

Public, khusus halaman admin login.

### Request

```json
{
  "email": "admin@example.com",
  "password": "password"
}
```

### Validation

| Field | Rule |
|---|---|
| email | required, valid email |
| password | required, min 8 |

### Success Response `200`

```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": "uuid",
      "name": "Admin",
      "email": "admin@example.com",
      "role": "owner"
    }
  }
}
```

### Cookie

```txt
Set-Cookie: access_token=<jwt>; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=86400
```

### Error Response `401`

```json
{
  "success": false,
  "message": "Invalid email or password"
}
```

---

## 10.2 POST `/api/auth/logout`

### Access

Admin.

### Behavior

- Clear `access_token` cookie.
- Return success response.

### Success Response `200`

```json
{
  "success": true,
  "message": "Logout successful"
}
```

---

## 10.3 GET `/api/auth/me`

### Access

Admin.

### Success Response `200`

```json
{
  "success": true,
  "message": "Current user retrieved",
  "data": {
    "id": "uuid",
    "name": "Admin",
    "email": "admin@example.com",
    "role": "owner"
  }
}
```

---

# 11. Public Portfolio API

Public API dapat diakses tanpa login. Endpoint ini hanya boleh mengembalikan data yang aman untuk ditampilkan ke pengunjung.

---

## 11.1 GET `/api/profile`

### Access

Public.

### Success Response `200`

```json
{
  "success": true,
  "message": "Profile retrieved",
  "data": {
    "fullName": "Developer Name",
    "headline": "Backend Developer | Data Enthusiast",
    "bio": "Short profile bio",
    "location": "Indonesia",
    "email": "developer@example.com",
    "githubUrl": "https://github.com/username",
    "linkedinUrl": "https://linkedin.com/in/username",
    "websiteUrl": "https://domainkamu.com",
    "avatarUrl": "https://cdn.domainkamu.com/profiles/avatar.webp",
    "cvUrl": "https://cdn.domainkamu.com/profiles/cv.pdf"
  }
}
```

---

## 11.2 GET `/api/projects`
Jika data kosong, API tetap mengembalikan array kosong, bukan error 404.

### Access

Public.

### Behavior

- Hanya menampilkan project dengan status `published`.
- Tidak menampilkan project `draft`.
- Tidak menampilkan project `archived`.
- Support search, filter, sorting, dan pagination.

### Query Params

| Param | Type | Required | Description |
|---|---|---|---|
| page | number | no | Default 1 |
| limit | number | no | Default 10, max 50 |
| category | string | no | Filter berdasarkan `project_type` |
| search | string | no | Search title dan short_description |
| sort | string | no | latest, oldest, display_order |
| featured | boolean | no | Filter featured project |

### Success Response `200`

```json
{
  "success": true,
  "message": "Projects retrieved",
  "data": [
    {
      "id": "uuid",
      "title": "Sales Analytics Dashboard",
      "slug": "sales-analytics-dashboard",
      "shortDescription": "Dashboard analitik penjualan",
      "projectType": "Dashboard",
      "thumbnailUrl": "https://cdn.domainkamu.com/projects/sales-dashboard/thumbnail.webp",
      "isFeatured": true,
      "startedAt": "2025-01-01",
      "completedAt": "2025-03-01",
      "techStacks": [
        "Vue 3",
        "Laravel",
        "MySQL"
      ]
    }
  ],
  "meta": {
    "page": 1,
    "limit": 10,
    "total": 1,
    "totalPages": 1
  }
}
```

---

## 11.3 GET `/api/projects/:slug`

### Access

Public.

### Behavior

- Return project detail jika status `published`.
- Return `404` jika project tidak ditemukan.
- Return `404` jika project masih `draft` atau `archived`.

### Success Response `200`

```json
{
  "success": true,
  "message": "Project detail retrieved",
  "data": {
    "id": "uuid",
    "title": "Sales Analytics Dashboard",
    "slug": "sales-analytics-dashboard",
    "shortDescription": "Dashboard analitik penjualan",
    "description": "Long project description",
    "projectType": "Dashboard",
    "demoUrl": "https://example.com",
    "repositoryUrl": "https://github.com/user/repo",
    "documentationUrl": "https://docs.example.com",
    "thumbnailUrl": "https://cdn.domainkamu.com/projects/sales-dashboard/thumbnail.webp",
    "isFeatured": true,
    "startedAt": "2025-01-01",
    "completedAt": "2025-03-01",
    "techStacks": [
      "Vue 3",
      "Laravel",
      "MySQL"
    ],
    "images": [
      {
        "id": "uuid",
        "imageUrl": "https://cdn.domainkamu.com/projects/sales-dashboard/gallery-1.webp",
        "imageType": "screenshot",
        "caption": "Dashboard overview",
        "displayOrder": 1
      }
    ]
  }
}
```

---

## 11.4 GET `/api/experiences`
Jika data kosong, API tetap mengembalikan array kosong, bukan error 404.

### Access

Public.

### Scope

MVP Extended.

### Success Response `200`

```json
{
  "success": true,
  "message": "Experiences retrieved",
  "data": [
    {
      "id": "uuid",
      "title": "Machine Learning Cohort",
      "companyName": "Bangkit Academy",
      "employmentType": "Independent Study",
      "location": "Remote",
      "description": "Mengikuti program studi independen dengan fokus machine learning.",
      "startDate": "2024-09-01",
      "endDate": "2025-01-01",
      "isCurrent": false,
      "techStacks": [
        "Python",
        "TensorFlow"
      ]
    }
  ]
}
```

---

## 11.5 GET `/api/achievements`
Jika data kosong, API tetap mengembalikan array kosong, bukan error 404.

### Access

Public.

### Scope

MVP Extended.

### Success Response `200`

```json
{
  "success": true,
  "message": "Achievements retrieved",
  "data": [
    {
      "id": "uuid",
      "title": "Finalist National Competition",
      "issuer": "Nama Penyelenggara",
      "description": "Menjadi finalis kompetisi nasional.",
      "issuedDate": "2024-10-01",
      "expiredDate": null,
      "achievementType": "competition",
      "level": "national",
      "credentialId": null,
      "externalUrl": "https://example.com",
      "certificateUrl": "https://cdn.domainkamu.com/certificates/example.pdf"
    }
  ]
}
```

---

## 11.6 GET `/api/skills`
Jika data kosong, API tetap mengembalikan array kosong, bukan error 404.

### Access

Public.

### Scope

MVP Extended.

### Success Response `200`

```json
{
  "success": true,
  "message": "Skills retrieved",
  "data": [
    {
      "category": "Backend",
      "items": [
        {
          "id": "uuid",
          "name": "Go",
          "proficiencyLevel": 3,
          "iconUrl": null
        }
      ]
    }
  ]
}
```

---

# 12. Admin API Access Rules

Admin API wajib memenuhi aturan berikut:

1. Semua endpoint `/api/admin/*` wajib menggunakan auth middleware.
2. Token dibaca dari HTTP-only cookie `access_token`.
3. Response tidak boleh mengembalikan `password_hash`.
4. Request admin di production harus memvalidasi Origin/Referer jika memakai cookie auth.
5. Endpoint upload hanya boleh diakses admin.
6. Endpoint delete harus berhati-hati terhadap file dan relasi.

---

# 13. Admin Project API

## 13.1 GET `/api/admin/projects`

### Access

Admin.

### Query Params

| Param | Type | Required | Description |
|---|---|---|---|
| page | number | no | Default 1 |
| limit | number | no | Default 10, max 50 |
| status | string | no | draft/published/archived |
| search | string | no | Search title |
| sort | string | no | latest/oldest/display_order |

### Success Response `200`

```json
{
  "success": true,
  "message": "Admin projects retrieved",
  "data": [
    {
      "id": "uuid",
      "title": "Sales Analytics Dashboard",
      "slug": "sales-analytics-dashboard",
      "status": "published",
      "projectType": "Dashboard",
      "thumbnailUrl": "https://cdn.domainkamu.com/projects/sales-dashboard/thumbnail.webp",
      "isFeatured": true,
      "displayOrder": 1,
      "createdAt": "2025-01-01T10:00:00Z",
      "updatedAt": "2025-01-02T10:00:00Z"
    }
  ],
  "meta": {
    "page": 1,
    "limit": 10,
    "total": 1,
    "totalPages": 1
  }
}
```

---

## 13.2 GET `/api/admin/projects/:id`

### Access

Admin.

### Success Response `200`

```json
{
  "success": true,
  "message": "Admin project detail retrieved",
  "data": {
    "id": "uuid",
    "title": "Sales Analytics Dashboard",
    "slug": "sales-analytics-dashboard",
    "shortDescription": "Dashboard analitik penjualan",
    "description": "Long project description",
    "projectType": "Dashboard",
    "status": "published",
    "demoUrl": "https://example.com",
    "repositoryUrl": "https://github.com/user/repo",
    "documentationUrl": "https://docs.example.com",
    "thumbnailFileId": "uuid",
    "thumbnailUrl": "https://cdn.domainkamu.com/projects/sales-dashboard/thumbnail.webp",
    "isFeatured": true,
    "displayOrder": 1,
    "startedAt": "2025-01-01",
    "completedAt": "2025-03-01",
    "techStackIds": [
      "uuid-1",
      "uuid-2"
    ],
    "images": [
      {
        "id": "uuid",
        "fileId": "uuid",
        "imageUrl": "https://cdn.domainkamu.com/projects/sales-dashboard/gallery-1.webp",
        "imageType": "screenshot",
        "caption": "Dashboard overview",
        "displayOrder": 1
      }
    ]
  }
}
```

---

## 13.3 POST `/api/admin/projects`

### Access

Admin.

### Request

```json
{
  "title": "Sales Analytics Dashboard",
  "slug": "sales-analytics-dashboard",
  "shortDescription": "Dashboard analitik penjualan",
  "description": "Long project description",
  "projectType": "Dashboard",
  "status": "draft",
  "demoUrl": "https://example.com",
  "repositoryUrl": "https://github.com/user/repo",
  "documentationUrl": "https://docs.example.com",
  "thumbnailFileId": "uuid",
  "isFeatured": false,
  "displayOrder": 1,
  "startedAt": "2025-01-01",
  "completedAt": "2025-03-01",
  "techStackIds": [
    "uuid-1",
    "uuid-2"
  ]
}
```

### Validation

| Field | Rule |
|---|---|
| title | required, max 255 |
| slug | required, unique, lowercase kebab-case |
| shortDescription | optional |
| description | optional |
| projectType | optional, max 100 |
| status | required, one of draft/published/archived |
| demoUrl | optional, valid URL |
| repositoryUrl | optional, valid URL |
| documentationUrl | optional, valid URL |
| thumbnailFileId | optional, valid UUID |
| isFeatured | boolean |
| displayOrder | integer |
| startedAt | optional date |
| completedAt | optional date |
| techStackIds | optional array of UUID |

### Success Response `201`

```json
{
  "success": true,
  "message": "Project created successfully",
  "data": {
    "id": "uuid",
    "title": "Sales Analytics Dashboard",
    "slug": "sales-analytics-dashboard",
    "status": "draft"
  }
}
```

---

## 13.4 PUT `/api/admin/projects/:id`

### Access

Admin.

### Request

Same as create project request.

### Success Response `200`

```json
{
  "success": true,
  "message": "Project updated successfully",
  "data": {
    "id": "uuid",
    "title": "Sales Analytics Dashboard",
    "slug": "sales-analytics-dashboard",
    "status": "published"
  }
}
```

---

## 13.5 DELETE `/api/admin/projects/:id`

### Access

Admin.

### Behavior

- Delete project record.
- Delete related `project_images` due to cascade.
- Delete related `project_tech_stacks` due to cascade.
- File object di R2 tidak otomatis dihapus oleh FK.
- Penghapusan file R2 harus ditangani oleh service layer jika file sudah tidak dipakai.

### Success Response `200`

```json
{
  "success": true,
  "message": "Project deleted successfully"
}
```

---

# 14. Admin Profile API

## 14.1 GET `/api/admin/profile`

### Access

Admin.

### Scope

MVP Extended untuk CRUD, tetapi profile public digunakan pada MVP Core.

### Success Response `200`

```json
{
  "success": true,
  "message": "Admin profile retrieved",
  "data": {
    "id": "uuid",
    "fullName": "Developer Name",
    "headline": "Backend Developer | Data Enthusiast",
    "bio": "Short profile bio",
    "location": "Indonesia",
    "email": "developer@example.com",
    "phone": null,
    "githubUrl": "https://github.com/username",
    "linkedinUrl": "https://linkedin.com/in/username",
    "websiteUrl": "https://domainkamu.com",
    "avatarFileId": "uuid",
    "avatarUrl": "https://cdn.domainkamu.com/profile/avatar.webp",
    "cvFileId": "uuid",
    "cvUrl": "https://cdn.domainkamu.com/profile/cv.pdf"
  }
}
```

---

## 14.2 PUT `/api/admin/profile`

### Access

Admin.

### Scope

MVP Extended.

### Request

```json
{
  "fullName": "Developer Name",
  "headline": "Backend Developer | Data Enthusiast",
  "bio": "Short profile bio",
  "location": "Indonesia",
  "email": "developer@example.com",
  "phone": null,
  "githubUrl": "https://github.com/username",
  "linkedinUrl": "https://linkedin.com/in/username",
  "websiteUrl": "https://domainkamu.com",
  "avatarFileId": "uuid",
  "cvFileId": "uuid"
}
```

### Validation

| Field | Rule |
|---|---|
| fullName | required, max 150 |
| headline | optional, max 255 |
| bio | optional |
| location | optional, max 150 |
| email | optional, valid email |
| phone | optional, max 50 |
| githubUrl | optional, valid URL |
| linkedinUrl | optional, valid URL |
| websiteUrl | optional, valid URL |
| avatarFileId | optional, UUID |
| cvFileId | optional, UUID |

---

# 15. Admin Tech Stack API

## 15.1 GET `/api/admin/tech-stacks`

### Access

Admin.

### Success Response `200`

```json
{
  "success": true,
  "message": "Tech stacks retrieved",
  "data": [
    {
      "id": "uuid",
      "name": "Go",
      "category": "Backend",
      "iconUrl": null,
      "displayOrder": 1
    }
  ]
}
```

---

## 15.2 POST `/api/admin/tech-stacks`

### Access

Admin.

### Request

```json
{
  "name": "Go",
  "category": "Backend",
  "iconUrl": null,
  "displayOrder": 1
}
```

### Validation

| Field | Rule |
|---|---|
| name | required, max 100 |
| category | optional, max 100 |
| iconUrl | optional, valid URL |
| displayOrder | integer |

---

## 15.3 PUT `/api/admin/tech-stacks/:id`

Same as create request.

---

## 15.4 DELETE `/api/admin/tech-stacks/:id`

### Behavior

- Delete tech stack.
- Related pivot records are deleted because of `ON DELETE CASCADE`.

---

# 16. Upload API

### Image fileType validation

Allowed image fileType:
- avatar
- thumbnail
- gallery

### Document fileType validation

Allowed document fileType:
- cv
- certificate
- document

## 16.1 Object Key Rule

Backend tidak boleh langsung menggunakan nama file asli sebagai object key di Cloudflare R2.

Object key harus dibuat oleh backend menggunakan pola yang aman.

Contoh format object key:

```txt
profiles/avatar-{timestamp}.{ext}
profiles/cv-{timestamp}.pdf
projects/{projectSlug}/thumbnail-{timestamp}.{ext}
projects/{projectSlug}/gallery-{timestamp}.{ext}
achievements/{achievementSlug}/certificate-{timestamp}.pdf
```

---

## 16.2 Folder Field Rule

Untuk MVP, frontend tidak bebas menentukan folder secara penuh.

Backend menentukan folder berdasarkan:

- `fileType`
- context entity, misalnya project slug atau achievement slug
- upload endpoint yang digunakan

Jika field `folder` tetap digunakan, backend wajib melakukan sanitasi.

Folder hanya boleh berisi:

```txt
huruf kecil
angka
hyphen
underscore
slash terbatas
```
Tidak boleh mengandung:
- ..
- backslash
- double slash
- karakter spesial berbahaya

regex:
```txt
^[a-z0-9/_-]+$
```

---

## 16.3 POST `/api/admin/uploads/images`

### Access

Admin.

### Content-Type

```txt
multipart/form-data
```

### Fields

| Field | Type | Required | Description |
|---|---|---|---|
| file | file | yes | Image file |
| folder | string | no | Target folder |
| fileType | string | yes | avatar/thumbnail/gallery |

### Allowed File

| Extension | MIME Type | Max Size |
|---|---|---|
| jpg/jpeg | image/jpeg | 5 MB |
| png | image/png | 5 MB |
| webp | image/webp | 5 MB |

### Success Response `201`

```json
{
  "success": true,
  "message": "Image uploaded successfully",
  "data": {
    "id": "uuid",
    "fileName": "thumbnail.webp",
    "fileKey": "projects/sales-dashboard/thumbnail.webp",
    "fileUrl": "https://cdn.domainkamu.com/projects/sales-dashboard/thumbnail.webp",
    "bucketName": "portfolio-assets",
    "mimeType": "image/webp",
    "fileSize": 248000,
    "fileType": "thumbnail",
    "storageProvider": "cloudflare_r2"
  }
}
```

---

## 16.4 POST `/api/admin/uploads/files`

### Access

Admin.

### Content-Type

```txt
multipart/form-data
```

### Fields

| Field | Type | Required | Description |
|---|---|---|---|
| file | file | yes | PDF file |
| folder | string | no | Target folder |
| fileType | string | yes | cv/certificate/document |

### Allowed File

| Extension | MIME Type | Max Size |
|---|---|---|
| pdf | application/pdf | 10 MB |

---

## 16.5 DELETE `/api/admin/uploads/:id`

### Access

Admin.

### Behavior

- Find file metadata by ID.
- Check whether file is still used by profile, projects, project_images, or achievements.
- If file is still used, reject delete or require force delete.
- Delete object from R2.
- Delete metadata from database.

### Success Response `200`

```json
{
  "success": true,
  "message": "File deleted successfully"
}
```

---

# 17. Admin Extended APIs

APIs in this section are part of MVP Extended. They do not need to be implemented before MVP Core is complete.

---

## 17.1 Admin Experience API

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/admin/experiences` | List all experiences |
| GET | `/api/admin/experiences/:id` | Get experience detail |
| POST | `/api/admin/experiences` | Create experience |
| PUT | `/api/admin/experiences/:id` | Update experience |
| DELETE | `/api/admin/experiences/:id` | Delete experience |

### Create/Update Request

```json
{
  "title": "Machine Learning Cohort",
  "companyName": "Bangkit Academy",
  "employmentType": "Independent Study",
  "location": "Remote",
  "description": "Mengikuti program studi independen.",
  "startDate": "2024-09-01",
  "endDate": "2025-01-01",
  "isCurrent": false,
  "displayOrder": 1,
  "techStackIds": [
    "uuid-1",
    "uuid-2"
  ]
}
```

---

## 17.2 Admin Achievement API

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/admin/achievements` | List all achievements |
| GET | `/api/admin/achievements/:id` | Get achievement detail |
| POST | `/api/admin/achievements` | Create achievement |
| PUT | `/api/admin/achievements/:id` | Update achievement |
| DELETE | `/api/admin/achievements/:id` | Delete achievement |

### Create/Update Request

```json
{
  "title": "Finalist National Competition",
  "issuer": "Nama Penyelenggara",
  "description": "Menjadi finalis kompetisi nasional.",
  "issuedDate": "2024-10-01",
  "expiredDate": null,
  "achievementType": "competition",
  "level": "national",
  "credentialId": null,
  "externalUrl": "https://example.com",
  "certificateFileId": "uuid",
  "displayOrder": 1
}
```

---

## 17.3 Admin Skill API

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/admin/skills` | List all skills |
| POST | `/api/admin/skills` | Create skill |
| PUT | `/api/admin/skills/:id` | Update skill |
| DELETE | `/api/admin/skills/:id` | Delete skill |

### Create/Update Request

```json
{
  "name": "Go",
  "category": "Backend",
  "proficiencyLevel": 3,
  "iconUrl": null,
  "displayOrder": 1
}
```

---

## 17.4 Admin Contact Message API

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/admin/contact-messages` | List contact messages |
| GET | `/api/admin/contact-messages/:id` | Get contact message detail |
| PUT | `/api/admin/contact-messages/:id/status` | Update message status |
| DELETE | `/api/admin/contact-messages/:id` | Delete contact message |

---

# 18. Contact API

## 18.1 POST `/api/contact`

### Access

Public.

### Scope

MVP Extended.

### Request

```json
{
  "name": "Client Name",
  "email": "client@example.com",
  "subject": "Project Collaboration",
  "message": "Saya ingin diskusi project."
}
```

### Validation

| Field | Rule |
|---|---|
| name | required, max 150 |
| email | required, valid email |
| subject | optional, max 255 |
| message | required, max 5000 |

### Security

- Rate limit required.
- Optional spam protection.
- Do not expose admin email through this endpoint.
- Suggested rate limit:
  - 5 requests per IP per 10 minutes.
  - 20 requests per IP per day.
- Backend should reject suspicious payload such as empty message, repeated spam text, or invalid email format.

---

# 19. DTO Design

## 19.1 Auth DTO

### UserMeResponse

```go
type UserMeResponse struct {
    ID    string `json:"id"`
    Name  string `json:"name"`
    Email string `json:"email"`
    Role  string `json:"role"`
}
```

---

## 19.2 Profile DTO

### ProfilePublicResponse

```go
type ProfilePublicResponse struct {
    FullName    string  `json:"fullName"`
    Headline    *string `json:"headline"`
    Bio         *string `json:"bio"`
    Location    *string `json:"location"`
    Email       *string `json:"email"`
    GithubURL   *string `json:"githubUrl"`
    LinkedinURL *string `json:"linkedinUrl"`
    WebsiteURL  *string `json:"websiteUrl"`
    AvatarURL   *string `json:"avatarUrl"`
    CVURL       *string `json:"cvUrl"`
}
```

---

## 19.3 Project DTO

### ProjectListItemResponse

```go
type ProjectListItemResponse struct {
    ID               string   `json:"id"`
    Title            string   `json:"title"`
    Slug             string   `json:"slug"`
    ShortDescription *string  `json:"shortDescription"`
    ProjectType      *string  `json:"projectType"`
    ThumbnailURL     *string  `json:"thumbnailUrl"`
    IsFeatured       bool     `json:"isFeatured"`
    StartedAt        *string  `json:"startedAt"`
    CompletedAt      *string  `json:"completedAt"`
    TechStacks       []string `json:"techStacks"`
}
```

### ProjectDetailResponse

```go
type ProjectDetailResponse struct {
    ID               string                 `json:"id"`
    Title            string                 `json:"title"`
    Slug             string                 `json:"slug"`
    ShortDescription *string                `json:"shortDescription"`
    Description      *string                `json:"description"`
    ProjectType      *string                `json:"projectType"`
    DemoURL          *string                `json:"demoUrl"`
    RepositoryURL    *string                `json:"repositoryUrl"`
    DocumentationURL *string                `json:"documentationUrl"`
    ThumbnailURL     *string                `json:"thumbnailUrl"`
    IsFeatured       bool                   `json:"isFeatured"`
    StartedAt        *string                `json:"startedAt"`
    CompletedAt      *string                `json:"completedAt"`
    TechStacks       []string               `json:"techStacks"`
    Images           []ProjectImageResponse `json:"images"`
}
```

### ProjectImageResponse

```go
type ProjectImageResponse struct {
    ID           string  `json:"id"`
    ImageURL     *string `json:"imageUrl"`
    ImageType    *string `json:"imageType"`
    Caption      *string `json:"caption"`
    DisplayOrder int     `json:"displayOrder"`
}
```

---

## 19.4 File DTO

### FileResponse

```go
type FileResponse struct {
    ID              string `json:"id"`
    FileName        string `json:"fileName"`
    FileKey         string `json:"fileKey"`
    FileURL         string `json:"fileUrl"`
    BucketName      string `json:"bucketName"`
    MimeType        string `json:"mimeType"`
    FileSize        int64  `json:"fileSize"`
    FileType        string `json:"fileType"`
    StorageProvider string `json:"storageProvider"`
}
```

---

# 20. Validation Rules Summary

## 20.1 Slug Rule

Slug harus:

- lowercase,
- menggunakan huruf, angka, dan hyphen,
- tidak memiliki spasi,
- unik pada tabel `projects`.

Regex:

```txt
^[a-z0-9]+(?:-[a-z0-9]+)*$
```

### Slug Generation Decision

Untuk MVP:

- Slug dikirim dari frontend.
- Frontend boleh auto-generate slug dari `title`.
- Backend tetap wajib melakukan validasi format slug.
- Backend tetap wajib mengecek uniqueness slug.
- Jika slug sudah digunakan, backend mengembalikan `409 Conflict`.

Contoh error duplicate slug:

```json
{
  "success": false,
  "message": "Slug already exists",
  "errors": {
    "slug": "Slug already exists"
  }
}
```

---

## 20.2 URL Rule

Field URL harus valid jika diisi:

```txt
demoUrl
repositoryUrl
documentationUrl
githubUrl
linkedinUrl
websiteUrl
externalUrl
iconUrl
```

## 20.3 Date Rule

Project date rule:

- `completedAt` tidak boleh lebih awal dari `startedAt`.
- `startedAt` boleh null.
- `completedAt` boleh null jika project masih berjalan.

Experience date rule:

- `endDate` tidak boleh lebih awal dari `startDate`.
- Jika `isCurrent = true`, maka `endDate` boleh null.
- Jika `isCurrent = false`, maka `endDate` disarankan diisi jika pengalaman sudah selesai.

Achievement date rule:

- `expiredDate` boleh null.
- Jika `expiredDate` diisi, maka `expiredDate` tidak boleh lebih awal dari `issuedDate`.

---

## 20.4 File Rule

Image:

```txt
extension: jpg, jpeg, png, webp
mime_type: image/jpeg, image/png, image/webp
max_size: 5MB
```

PDF:

```txt
extension: pdf
mime_type: application/pdf
max_size: 10MB
```

---

# 21. Access Control Matrix

| Resource | Public Read | Admin Read | Admin Create | Admin Update | Admin Delete |
|---|---|---|---|---|---|
| Profiles | Yes | Yes | No | Extended | No |
| Projects | Published only | Yes | Yes | Yes | Yes |
| Project Images | Via project | Yes | Yes | Yes | Yes |
| Tech Stacks | Via project | Yes | Yes | Yes | Yes |
| Files | Public URL only | Yes | Via upload | No direct update | Yes |
| Experiences | Extended | Yes | Extended | Extended | Extended |
| Achievements | Extended | Yes | Extended | Extended | Extended |
| Skills | Extended | Yes | Extended | Extended | Extended |
| Contact Messages | No | Extended | Public contact form | Extended | Extended |
| Users | No | Current user only | No | No | No |

---

## 21.1 File Delete Access Note

Admin hanya boleh menghapus file jika file tersebut tidak sedang digunakan oleh entity lain.

File dianggap sedang digunakan jika masih direferensikan oleh:

- `profiles.avatar_file_id`
- `profiles.cv_file_id`
- `projects.thumbnail_file_id`
- `project_images.file_id`
- `achievements.certificate_file_id`

Jika file masih digunakan, backend harus mengembalikan error `409 Conflict`.

Contoh response:

```json
{
  "success": false,
  "message": "File is still used by another resource",
  "errors": {
    "file": "Cannot delete file because it is still referenced"
  }
}
```

---


# 22. Error Handling Standard

## 22.1 Validation Error

```json
{
  "success": false,
  "message": "Validation error",
  "errors": {
    "slug": "Slug must be unique",
    "title": "Title is required"
  }
}
```

## 22.2 Unauthorized Error

```json
{
  "success": false,
  "message": "Unauthorized"
}
```

## 22.3 Not Found Error

```json
{
  "success": false,
  "message": "Resource not found"
}
```

## 22.4 Conflict Error

```json
{
  "success": false,
  "message": "Resource already exists",
  "errors": {
    "slug": "Slug already exists"
  }
}
```

---

# 23. Implementation Checklist

## 23.1 Database

- [ ] Enable UUID extension if needed.
- [ ] Create migration files.
- [ ] Create `users` table.
- [ ] Create `files` table.
- [ ] Create `profiles` table.
- [ ] Create `projects` table.
- [ ] Create `project_images` table.
- [ ] Create `tech_stacks` table.
- [ ] Create `project_tech_stacks` table.
- [ ] Create MVP Extended tables later.
- [ ] Add indexes.
- [ ] Add constraints.
- [ ] Add seed admin user.
- [ ] Add seed profile data.

## 23.2 Backend API

- [ ] Setup Gin router.
- [ ] Setup GORM PostgreSQL connection.
- [ ] Setup response helper.
- [ ] Setup validation helper.
- [ ] Setup auth middleware.
- [ ] Implement Auth API.
- [ ] Implement Public Profile API.
- [ ] Implement Public Project API.
- [ ] Implement Admin Project API.
- [ ] Implement Tech Stack API.
- [ ] Implement Upload API.
- [ ] Implement DTO mapper.
- [ ] Implement error handling.
- [ ] Implement rate limit login.

## 23.3 Security

- [ ] Hash password with bcrypt.
- [ ] Store JWT in HTTP-only cookie.
- [ ] Protect `/api/admin/*`.
- [ ] Validate file MIME type.
- [ ] Validate file extension.
- [ ] Validate file size.
- [ ] Prevent path traversal in upload.
- [ ] Do not expose sensitive fields.
- [ ] Validate Origin/Referer for admin requests in production.

---

# 24. Notes for Implementation

## 24.1 GORM Usage

GORM digunakan untuk mempercepat CRUD.

Aturan:

- Jangan menggunakan AutoMigrate di production.
- Gunakan `golang-migrate` untuk migration.
- Pisahkan model database dan DTO response.
- Query kompleks boleh menggunakan raw SQL.
- Jangan expose model database langsung ke response.

### GORM Model Source of Truth

GORM model harus mengikuti schema yang dibuat melalui migration SQL.

Jika ada perbedaan antara GORM model dan migration SQL, maka **migration SQL menjadi source of truth**.

Aturan:
- Jangan mengubah struktur database hanya dari GORM model.
- Jangan menjalankan AutoMigrate di production.
- Perubahan schema wajib dibuat melalui file migration baru.

---

## 24.2 Public Project Query Rule

Public project query wajib selalu menambahkan filter:

```sql
WHERE status = 'published'
```

---

## 24.3 Admin Project Query Rule

Admin project query boleh membaca semua status:

```sql
draft
published
archived
```

---

## 24.4 File Delete Rule

File tidak otomatis dihapus hanya karena relasi database dilepas.

Penghapusan file harus melalui upload/file service agar:

1. Metadata database terhapus.
2. Object di Cloudflare R2 juga terhapus.
3. File yang masih dipakai entitas lain tidak ikut terhapus.

---

## 24.5 Delete Strategy

Untuk MVP, sistem menggunakan **hard delete**.

Artinya:
- Data benar-benar dihapus dari database.
- Project yang dihapus tidak bisa dipulihkan dari aplikasi.
- Relasi pivot seperti `project_tech_stacks` ikut terhapus karena `ON DELETE CASCADE`.
- File R2 tidak otomatis ikut terhapus oleh foreign key dan tetap harus dikelola oleh service layer.

Soft delete belum digunakan pada MVP.

Jika di fase lanjutan dibutuhkan fitur recovery data, dapat ditambahkan kolom:

```sql
deleted_at TIMESTAMP NULL
```

---

# 25. Definition of Done

Dokumen Database API Design dianggap siap jika:

- [ ] Migration plan sudah jelas.
- [ ] MVP Core tables sudah jelas.
- [ ] MVP Extended tables sudah jelas.
- [ ] Constraint dan index sudah dijelaskan.
- [ ] Public API sudah terdokumentasi.
- [ ] Admin API sudah terdokumentasi.
- [ ] Auth API sudah terdokumentasi.
- [ ] Upload API sudah terdokumentasi.
- [ ] DTO sudah dijelaskan.
- [ ] Validation rule sudah dijelaskan.
- [ ] Access control matrix sudah jelas.
- [ ] Error handling standard sudah jelas.
- [ ] Profile endpoint menggunakan singular `/api/profile` dan `/api/admin/profile`.

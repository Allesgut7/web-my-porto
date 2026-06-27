<script setup lang="ts">
import { safeUrl } from '~/utils/url'

const route = useRoute()
const slug = computed(() => String(route.params.slug || ''))

const { data: project, pending, error, refresh } = useProjectDetail(slug.value, {
  watch: [slug],
})

useSeoMeta({
  title: () => project.value?.title ? `${project.value.title} — Project` : 'Project Detail',
  description: () =>
    project.value?.shortDescription ||
    project.value?.description ||
    'Detail project portfolio developer.',
  ogTitle: () => project.value?.title || 'Project Detail',
  ogDescription: () =>
    project.value?.shortDescription ||
    project.value?.description ||
    'Detail project portfolio developer.',
  ogImage: () => project.value?.thumbnailUrl || undefined,
  ogType: 'article',
  twitterCard: 'summary_large_image',
})

function retry() {
  refresh()
}

function formatDate(date?: string | null) {
  if (!date) return null

  const parsed = new Date(date)
  if (Number.isNaN(parsed.getTime())) return null

  return new Intl.DateTimeFormat('id-ID', {
    year: 'numeric',
    month: 'long',
  }).format(parsed)
}
</script>

<template>
  <div>
    <!-- Hero Section -->
    <section class="relative overflow-hidden border-b border-app-border bg-app-background py-16 md:py-20">
      <div class="bg-grid-pattern bg-grid-animate absolute inset-0 opacity-40" />
      <CircuitPattern :opacity="0.06" class="absolute inset-0" />

      <div class="app-container-wide relative z-10">
        <NuxtLink
          to="/projects"
          class="group inline-flex items-center gap-1.5 text-sm font-semibold text-brand-primary hover:text-blue-800 transition-colors"
        >
          <svg
            class="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-0.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2.5"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M11 17l-5-5m0 0l5-5m-5 5h12" />
          </svg>
          Back to projects
        </NuxtLink>

        <LoadingState
          v-if="pending"
          class="mt-8"
        />

        <ErrorState
          v-else-if="error"
          class="mt-8"
          title="Project tidak dapat dimuat"
          :message="error.message"
          @retry="retry"
        />

        <div
          v-else-if="project"
          class="mt-8"
        >
          <div class="flex flex-wrap gap-2">
            <span
              v-if="project.projectType"
              class="badge-tech"
            >
              {{ project.projectType }}
            </span>

            <span
              v-if="project.isFeatured"
              class="badge-accent"
            >
              Featured
            </span>

            <span class="badge-primary">
              Case Study
            </span>
          </div>

          <h1 class="mt-5 max-w-4xl text-4xl font-extrabold tracking-tight text-app-text md:text-5xl font-display">
            {{ project.title }}
          </h1>

          <p class="mt-5 max-w-3xl text-base leading-8 text-app-muted md:text-lg">
            {{ project.shortDescription || project.description || 'Detail project belum memiliki deskripsi.' }}
          </p>

          <!-- Tech stack badges -->
          <div
            v-if="project.techStacks.length"
            class="mt-6 flex flex-wrap gap-2"
          >
            <TechBadge
              v-for="stack in project.techStacks"
              :key="stack.name"
              :tech="stack"
            />
          </div>

          <div class="mt-8 flex flex-wrap gap-3">
            <a
              v-if="project.demoUrl"
              :href="safeUrl(project.demoUrl) || undefined"
              target="_blank"
              rel="noopener noreferrer"
              class="btn-primary"
            >
              Open Demo
            </a>

            <a
              v-if="project.repositoryUrl"
              :href="safeUrl(project.repositoryUrl) || undefined"
              target="_blank"
              rel="noopener noreferrer"
              class="btn-secondary"
            >
              Repository
            </a>

            <a
              v-if="project.documentationUrl"
              :href="safeUrl(project.documentationUrl) || undefined"
              target="_blank"
              rel="noopener noreferrer"
              class="btn-ghost"
            >
              Documentation
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- Content Section -->
    <section
      v-if="project"
      class="app-section"
    >
      <div class="app-container-wide grid gap-8 lg:grid-cols-[1fr_360px]">
        <article class="space-y-8">
          <!-- Hero Image -->
          <div class="aspect-[16/9] overflow-hidden rounded-panel border border-app-border bg-brand-soft shadow-soft">
            <img
              v-if="project.thumbnailUrl"
              :src="project.thumbnailUrl"
              :alt="`Hero image project ${project.title}`"
              class="h-full w-full object-cover"
              loading="eager"
            >

            <FallbackThumbnail
              v-else
              :project-type="project.projectType"
              :title="project.title"
            />
          </div>

          <!-- Overview -->
          <div class="app-card p-6 md:p-8">
            <p class="section-eyebrow">
              Overview
            </p>

            <div class="prose prose-slate mt-5 max-w-none">
              <p class="text-base leading-8 text-app-muted">
                {{ project.description || project.shortDescription || 'Deskripsi lengkap project belum tersedia.' }}
              </p>
            </div>
          </div>

          <!-- Problem / Solution / Impact -->
          <div
            v-if="project.problem || project.solution || project.impact"
            class="grid gap-6 md:grid-cols-3"
          >
            <div
              v-if="project.problem"
              class="app-card p-6 border-l-4 border-l-blue-500"
            >
              <p class="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-brand-primary">
                Problem
              </p>
              <p class="mt-4 text-sm leading-6 text-app-muted">
                {{ project.problem }}
              </p>
            </div>

            <div
              v-if="project.solution"
              class="app-card p-6 border-l-4 border-l-cyan-500"
            >
              <p class="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-accent-tech">
                Solution
              </p>
              <p class="mt-4 text-sm leading-6 text-app-muted">
                {{ project.solution }}
              </p>
            </div>

            <div
              v-if="project.impact"
              class="app-card p-6 border-l-4 border-l-amber-500"
            >
              <p class="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-accent-main">
                Impact
              </p>
              <p class="mt-4 text-sm leading-6 text-app-muted">
                {{ project.impact }}
              </p>
            </div>
          </div>

          <!-- Gallery -->
          <div
            v-if="project.images.length"
            class="app-card p-6 md:p-8"
          >
            <p class="section-eyebrow">
              Gallery
            </p>

            <div class="mt-6 grid gap-4 md:grid-cols-2">
              <figure
                v-for="image in project.images"
                :key="image.id"
                class="group overflow-hidden rounded-2xl border border-app-border bg-app-background transition-all duration-300 hover:shadow-card"
              >
                <img
                  :src="image.imageUrl"
                  :alt="image.caption || `Screenshot project ${project.title}`"
                  class="aspect-video w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                >

                <figcaption
                  v-if="image.caption"
                  class="p-4 text-sm text-app-muted"
                >
                  {{ image.caption }}
                </figcaption>
              </figure>
            </div>
          </div>
        </article>

        <!-- Sidebar -->
        <aside class="space-y-6">
          <!-- Metadata -->
          <div class="app-card p-6">
            <p class="section-eyebrow">
              Metadata
            </p>

            <dl class="mt-5 space-y-4 text-sm">
              <div
                v-if="project.projectType"
                class="flex justify-between gap-4"
              >
                <dt class="text-app-muted">Category</dt>
                <dd class="font-semibold text-app-text">{{ project.projectType }}</dd>
              </div>

              <div
                v-if="project.role"
                class="flex justify-between gap-4"
              >
                <dt class="text-app-muted">Role</dt>
                <dd class="font-semibold text-app-text">{{ project.role }}</dd>
              </div>

              <div
                v-if="formatDate(project.startedAt)"
                class="flex justify-between gap-4"
              >
                <dt class="text-app-muted">Started</dt>
                <dd class="font-semibold text-app-text">{{ formatDate(project.startedAt) }}</dd>
              </div>

              <div
                v-if="formatDate(project.completedAt)"
                class="flex justify-between gap-4"
              >
                <dt class="text-app-muted">Completed</dt>
                <dd class="font-semibold text-app-text">{{ formatDate(project.completedAt) }}</dd>
              </div>
            </dl>
          </div>

          <!-- Tech Stack -->
          <div
            v-if="project.techStacks.length"
            class="app-card p-6"
          >
            <p class="section-eyebrow">
              Tech Stack
            </p>

            <div class="mt-5 flex flex-wrap gap-2">
              <TechBadge
                v-for="stack in project.techStacks"
                :key="stack.name"
                :tech="stack"
              />
            </div>
          </div>

          <!-- Links -->
          <div class="app-card p-6">
            <p class="section-eyebrow">
              Links
            </p>

            <div class="mt-5 space-y-3">
              <a
                v-if="project.demoUrl"
                :href="safeUrl(project.demoUrl) || undefined"
                target="_blank"
                rel="noopener noreferrer"
                class="btn-primary w-full"
              >
                Open Demo
              </a>

              <a
                v-if="project.repositoryUrl"
                :href="safeUrl(project.repositoryUrl) || undefined"
                target="_blank"
                rel="noopener noreferrer"
                class="btn-secondary w-full"
              >
                Repository
              </a>

              <a
                v-if="project.documentationUrl"
                :href="safeUrl(project.documentationUrl) || undefined"
                target="_blank"
                rel="noopener noreferrer"
                class="btn-ghost w-full"
              >
                Documentation
              </a>

              <p
                v-if="!project.demoUrl && !project.repositoryUrl && !project.documentationUrl"
                class="text-sm leading-6 text-app-muted"
              >
                Link external belum tersedia.
              </p>
            </div>
          </div>

          <!-- Back to projects -->
          <NuxtLink
            to="/projects"
            class="app-card block p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-card group"
          >
            <p class="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-brand-primary">
              &larr; All Projects
            </p>
            <p class="mt-2 text-sm font-medium text-app-muted group-hover:text-app-text transition-colors">
              View more engineering work
            </p>
          </NuxtLink>
        </aside>
      </div>
    </section>
  </div>
</template>

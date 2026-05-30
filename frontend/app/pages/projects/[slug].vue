<script setup lang="ts">
// definePageMeta({
//   layout: 'public',
// })

const route = useRoute()
const slug = computed(() => String(route.params.slug || ''))

const { data: project, pending, error, refresh } = useProjectDetail(slug.value, {
  watch: [slug],
})

useSeoMeta({
  title: () => project.value?.title || 'Project Detail',
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
    <section class="technical-grid border-b border-app-border bg-app-background py-16 md:py-20">
      <div class="app-container-wide">
        <NuxtLink
          to="/projects"
          class="text-sm font-semibold text-brand-primary hover:text-blue-800"
        >
          ← Back to projects
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
              Published
            </span>
          </div>

          <h1 class="mt-5 max-w-4xl text-4xl font-extrabold tracking-tight text-app-text md:text-5xl">
            {{ project.title }}
          </h1>

          <p class="mt-5 max-w-3xl text-base leading-8 text-app-muted md:text-lg">
            {{ project.shortDescription || project.description || 'Detail project belum memiliki deskripsi.' }}
          </p>

          <div class="mt-8 flex flex-wrap gap-3">
            <a
              v-if="project.demoUrl"
              :href="project.demoUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="btn-primary"
            >
              Open Demo
            </a>

            <a
              v-if="project.repositoryUrl"
              :href="project.repositoryUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="btn-secondary"
            >
              Repository
            </a>

            <a
              v-if="project.documentationUrl"
              :href="project.documentationUrl"
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

    <section
      v-if="project"
      class="app-section"
    >
      <div class="app-container-wide grid gap-8 lg:grid-cols-[1fr_360px]">
        <article class="space-y-8">
          <div class="technical-grid aspect-[16/9] overflow-hidden rounded-panel border border-app-border bg-brand-soft shadow-soft">
            <img
              v-if="project.thumbnailUrl"
              :src="project.thumbnailUrl"
              :alt="`Hero image project ${project.title}`"
              class="h-full w-full object-cover"
              loading="eager"
            >

            <div
              v-else
              class="flex h-full w-full items-center justify-center p-8 text-center"
            >
              <div>
                <p class="section-eyebrow">
                  Project Preview
                </p>
                <p class="mt-3 text-2xl font-bold text-app-text">
                  {{ project.title }}
                </p>
              </div>
            </div>
          </div>

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

          <div
            v-if="project.problem || project.solution || project.impact"
            class="grid gap-6 md:grid-cols-3"
          >
            <div
              v-if="project.problem"
              class="app-card p-6"
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
              class="app-card p-6"
            >
              <p class="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-cyan-700">
                Solution
              </p>
              <p class="mt-4 text-sm leading-6 text-app-muted">
                {{ project.solution }}
              </p>
            </div>

            <div
              v-if="project.impact"
              class="app-card p-6"
            >
              <p class="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-amber-700">
                Impact
              </p>
              <p class="mt-4 text-sm leading-6 text-app-muted">
                {{ project.impact }}
              </p>
            </div>
          </div>

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
                class="overflow-hidden rounded-2xl border border-app-border bg-app-background"
              >
                <img
                  :src="image.imageUrl"
                  :alt="image.caption || `Screenshot project ${project.title}`"
                  class="aspect-video w-full object-cover"
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

        <aside class="space-y-6">
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

          <div
            v-if="project.techStacks.length"
            class="app-card p-6"
          >
            <p class="section-eyebrow">
              Tech Stack
            </p>

            <div class="mt-5 flex flex-wrap gap-2">
              <span
                v-for="stack in project.techStacks"
                :key="stack.id || stack.name"
                class="badge-tech"
              >
                {{ stack.name }}
              </span>
            </div>
          </div>

          <div class="app-card p-6">
            <p class="section-eyebrow">
              Links
            </p>

            <div class="mt-5 space-y-3">
              <a
                v-if="project.demoUrl"
                :href="project.demoUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="btn-primary w-full"
              >
                Open Demo
              </a>

              <a
                v-if="project.repositoryUrl"
                :href="project.repositoryUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="btn-secondary w-full"
              >
                Repository
              </a>

              <a
                v-if="project.documentationUrl"
                :href="project.documentationUrl"
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
        </aside>
      </div>
    </section>
  </div>
</template>
<script setup lang="ts">
import ContactLinkSection from '../../components/sections/ContactLinkSection.vue'
import { useProfile } from '../../composables/useProfile'
import { useProjects } from '../../composables/useProjects'
const route = useRoute()
const slug = computed(() => String(route.params.slug))


const { useProfileData } = useProfile()
const { data: profile } = await useProfileData()

const { useProjectDetailData } = useProjects()

const {
  data: project,
  pending,
  error,
} = await useProjectDetailData(slug)

const timeline = computed(() => {
  if (!project.value) return null

  const start = project.value.startedAt
  const end = project.value.completedAt

  if (start && end) return `${start} — ${end}`
  if (start) return `Started ${start}`
  if (end) return `Completed ${end}`

  return null
})

useSeoMeta({
  title: () => project.value
    ? `${project.value.title} — Project`
    : 'Project Detail — Portfolio',
  description: () =>
    project.value?.shortDescription ||
    'Project detail and engineering case study.',
  ogTitle: () => project.value
    ? `${project.value.title} — Project`
    : 'Project Detail — Portfolio',
  ogDescription: () =>
    project.value?.shortDescription ||
    'Project detail and engineering case study.',
  ogImage: () => project.value?.thumbnailUrl || undefined,
})
</script>

<template>
  <div>
    <section class="technical-grid app-section">
      <div class="app-container">
        <NuxtLink
          to="/projects"
          class="inline-flex items-center text-sm font-semibold text-brand-primary hover:text-blue-800"
        >
          ← Back to Projects
        </NuxtLink>

        <div v-if="pending" class="mt-10 grid gap-10 lg:grid-cols-[1fr_320px]">
          <div class="space-y-5">
            <div class="h-5 w-40 animate-pulse rounded bg-slate-200" />
            <div class="h-12 w-4/5 animate-pulse rounded bg-slate-200" />
            <div class="h-24 w-full animate-pulse rounded bg-slate-200" />
            <div class="aspect-[16/9] animate-pulse rounded-panel bg-slate-200" />
          </div>
          <div class="app-card h-80 animate-pulse bg-slate-100" />
        </div>

        <div v-else-if="error || !project" class="app-card mt-10 p-8 text-center">
          <div class="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-amber-50 text-accent-main">
            !
          </div>
          <h1 class="mt-5 text-xl font-bold text-app-text">
            Project not found.
          </h1>
          <p class="mt-2 text-sm text-app-muted">
            The project may have been removed, archived, or is not published yet.
          </p>
          <NuxtLink to="/projects" class="btn-primary mt-6">
            Back to Projects
          </NuxtLink>
        </div>

        <div v-else class="mt-10">
          <div class="max-w-4xl">
            <div class="flex flex-wrap gap-2">
              <span v-if="project.projectType" class="badge-primary">
                {{ project.projectType }}
              </span>
              <span v-if="project.isFeatured" class="badge-accent">
                Featured
              </span>
              <span class="badge-tech">
                Published
              </span>
            </div>

            <h1 class="mt-5 text-4xl font-extrabold tracking-tight text-app-text md:text-5xl">
              {{ project.title }}
            </h1>

            <p class="mt-6 max-w-3xl text-base leading-8 text-app-muted md:text-lg">
              {{ project.shortDescription || project.description || 'No project summary available yet.' }}
            </p>

            <div class="mt-8 flex flex-wrap gap-3">
              <a
                v-if="project.demoUrl"
                :href="project.demoUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="btn-primary"
              >
                View Demo
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

          <div class="mt-12 overflow-hidden rounded-panel border border-app-border bg-brand-soft">
            <img
              v-if="project.thumbnailUrl"
              :src="project.thumbnailUrl"
              :alt="`${project.title} project preview`"
              class="aspect-[16/9] w-full object-cover"
            >

            <div
              v-else
              class="technical-grid flex aspect-[16/9] items-center justify-center"
            >
              <span class="font-mono text-sm font-semibold text-brand-primary">
                {{ project.projectType || 'Project Preview' }}
              </span>
            </div>
          </div>

          <div class="mt-12 grid gap-8 lg:grid-cols-[1fr_320px]">
            <article class="space-y-8">
              <section
                v-if="project.description || project.shortDescription"
                class="app-card p-6 md:p-8"
              >
                <p class="section-eyebrow">
                  Overview
                </p>
                <h2 class="mt-3 text-2xl font-bold text-app-text">
                  Project Overview
                </h2>
                <p class="mt-4 whitespace-pre-line text-base leading-8 text-app-muted">
                  {{ project.description || project.shortDescription }}
                </p>
              </section>

              <section
                v-if="project.techStacks.length"
                class="app-card p-6 md:p-8"
              >
                <p class="section-eyebrow">
                  Technical Stack
                </p>
                <h2 class="mt-3 text-2xl font-bold text-app-text">
                  Technologies Used
                </h2>

                <div class="mt-5 flex flex-wrap gap-2">
                  <span
                    v-for="tech in project.techStacks"
                    :key="tech"
                    class="badge-tech"
                  >
                    {{ tech }}
                  </span>
                </div>
              </section>

              <section
                v-if="project.images && project.images.length"
                class="app-card p-6 md:p-8"
              >
                <p class="section-eyebrow">
                  Gallery
                </p>
                <h2 class="mt-3 text-2xl font-bold text-app-text">
                  Project Screenshots
                </h2>

                <div class="mt-6 grid gap-5">
                  <figure
                    v-for="image in project.images"
                    :key="image.id"
                    class="overflow-hidden rounded-2xl border border-app-border bg-white"
                  >
                    <img
                      v-if="image.imageUrl"
                      :src="image.imageUrl"
                      :alt="image.caption || `${project.title} screenshot`"
                      loading="lazy"
                      class="aspect-[16/9] w-full object-cover"
                    >
                    <figcaption
                      v-if="image.caption"
                      class="border-t border-app-border px-5 py-3 text-sm text-app-muted"
                    >
                      {{ image.caption }}
                    </figcaption>
                  </figure>
                </div>
              </section>
            </article>

            <aside class="space-y-6 lg:sticky lg:top-28 lg:self-start">
              <div class="app-card p-6">
                <p class="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-accent-tech">
                  Metadata
                </p>

                <dl class="mt-6 space-y-4 text-sm">
                  <div v-if="project.projectType" class="flex justify-between gap-4">
                    <dt class="text-app-muted">Type</dt>
                    <dd class="text-right font-medium text-app-text">
                      {{ project.projectType }}
                    </dd>
                  </div>

                  <div v-if="timeline" class="flex justify-between gap-4">
                    <dt class="text-app-muted">Timeline</dt>
                    <dd class="text-right font-medium text-app-text">
                      {{ timeline }}
                    </dd>
                  </div>

                  <div class="flex justify-between gap-4">
                    <dt class="text-app-muted">Status</dt>
                    <dd class="text-right font-medium text-brand-primary">
                      Published
                    </dd>
                  </div>

                  <div class="flex justify-between gap-4">
                    <dt class="text-app-muted">Content</dt>
                    <dd class="text-right font-medium text-app-text">
                      API-driven
                    </dd>
                  </div>

                  <div class="flex justify-between gap-4">
                    <dt class="text-app-muted">Storage</dt>
                    <dd class="text-right font-medium text-app-text">
                      Supabase URL
                    </dd>
                  </div>
                </dl>
              </div>

              <div class="app-card p-6">
                <h2 class="text-lg font-bold text-app-text">
                  Project Links
                </h2>

                <div class="mt-5 grid gap-3">
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
                    Open Repository
                  </a>

                  <a
                    v-if="project.documentationUrl"
                    :href="project.documentationUrl"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="btn-secondary"
                  >
                    Open Documentation
                  </a>

                  <p
                    v-if="!project.demoUrl && !project.repositoryUrl && !project.documentationUrl"
                    class="text-sm leading-6 text-app-muted"
                  >
                    No external project links are available yet.
                  </p>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </section>

    <ContactLinkSection :profile="profile || null" />
  </div>
</template>
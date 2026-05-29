<script setup lang="ts">
import ProjectCard from '../../components/cards/ProjectCard.vue'
import ContactLinkSection from '../../components/sections/ContactLinkSection.vue'
import type { ProjectQuery } from '../../types/project'
import { useProfile } from '../../composables/useProfile'
import { useProjects } from '../../composables/useProjects'

const { useProfileData } = useProfile()

const { data: profile } = await useProfileData()

const search = ref('')
const category = ref('')
const sort = ref<'latest' | 'oldest' | 'display_order'>('display_order')
const page = ref(1)

const query = computed<ProjectQuery>(() => ({
  page: page.value,
  limit: 9,
  search: search.value || undefined,
  category: category.value || undefined,
  sort: sort.value,
}))

const { useProjectsData } = useProjects()

const {
  data: projectsResponse,
  pending,
  error,
  refresh,
} = await useProjectsData(query)

const projects = computed(() => projectsResponse.value?.data || [])
const meta = computed(() => projectsResponse.value?.meta)

const categories = computed(() => {
  const values = projects.value
    .map((project) => project.projectType)
    .filter(Boolean) as string[]

  return [...new Set(values)]
})

watch([search, category, sort], () => {
  page.value = 1
})

useSeoMeta({
  title: () => `Projects — ${profile.value?.fullName || 'Developer Portfolio'}`,
  description:
    'Selected engineering projects covering backend, data, QA, IoT, dashboards, APIs, and modern web development.',
  ogTitle: () => `Projects — ${profile.value?.fullName || 'Developer Portfolio'}`,
  ogDescription:
    'Selected engineering projects covering backend, data, QA, IoT, dashboards, APIs, and modern web development.',
})
</script>

<template>
  <div>
    <section class="technical-grid app-section">
      <div class="app-container">
        <p class="section-eyebrow">
          Projects
        </p>

        <h1 class="mt-4 max-w-4xl text-4xl font-extrabold tracking-tight text-app-text md:text-5xl">
          Selected Engineering Projects
        </h1>

        <p class="mt-5 max-w-2xl text-base leading-8 text-app-muted md:text-lg">
          A collection of published backend, data, QA, IoT, and web engineering projects loaded from the public API.
        </p>
      </div>
    </section>

    <section class="pb-16 md:pb-24">
      <div class="app-container">
        <div class="app-card flex flex-col gap-4 p-4 md:flex-row md:items-center">
          <input
            v-model="search"
            type="search"
            class="input md:flex-1"
            placeholder="Search projects..."
            aria-label="Search projects"
          >

          <select
            v-model="category"
            class="input md:w-56"
            aria-label="Filter project category"
          >
            <option value="">
              All Categories
            </option>
            <option
              v-for="item in categories"
              :key="item"
              :value="item"
            >
              {{ item }}
            </option>
          </select>

          <select
            v-model="sort"
            class="input md:w-48"
            aria-label="Sort projects"
          >
            <option value="display_order">
              Featured First
            </option>
            <option value="latest">
              Latest
            </option>
            <option value="oldest">
              Oldest
            </option>
          </select>
        </div>

        <div v-if="pending" class="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div
            v-for="item in 6"
            :key="item"
            class="app-card animate-pulse overflow-hidden"
          >
            <div class="aspect-[16/10] bg-slate-200" />
            <div class="space-y-4 p-6">
              <div class="h-4 w-24 rounded bg-slate-200" />
              <div class="h-6 w-3/4 rounded bg-slate-200" />
              <div class="space-y-2">
                <div class="h-4 rounded bg-slate-200" />
                <div class="h-4 w-5/6 rounded bg-slate-200" />
              </div>
            </div>
          </div>
        </div>

        <div v-else-if="error" class="app-card mt-10 p-8 text-center">
          <div class="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-amber-50 text-accent-main">
            !
          </div>
          <h2 class="mt-5 text-lg font-semibold text-app-text">
            Unable to load projects.
          </h2>
          <p class="mt-2 text-sm text-app-muted">
            The API might be unavailable. Please try again.
          </p>
          <button class="btn-primary mt-6" type="button" @click="() => refresh()">
            Retry
          </button>
        </div>

        <div v-else-if="projects.length === 0" class="app-card mt-10 p-8 text-center">
          <div class="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-brand-soft font-mono text-brand-primary">
            ∅
          </div>
          <h2 class="mt-5 text-lg font-semibold text-app-text">
            No matching projects found.
          </h2>
          <p class="mt-2 text-sm text-app-muted">
            Try using a different keyword or category. If no project is published yet, it will appear after being published from admin.
          </p>
        </div>

        <div v-else class="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <ProjectCard
            v-for="project in projects"
            :key="project.id"
            :project="project"
          />
        </div>

        <div
          v-if="meta && meta.totalPages > 1"
          class="mt-10 flex items-center justify-center gap-3"
        >
          <button
            type="button"
            class="btn-secondary"
            :disabled="page <= 1"
            :class="page <= 1 ? 'cursor-not-allowed opacity-50' : ''"
            @click="page--"
          >
            Previous
          </button>

          <span class="font-mono text-sm text-app-muted">
            Page {{ meta.page }} of {{ meta.totalPages }}
          </span>

          <button
            type="button"
            class="btn-secondary"
            :disabled="page >= meta.totalPages"
            :class="page >= meta.totalPages ? 'cursor-not-allowed opacity-50' : ''"
            @click="page++"
          >
            Next
          </button>
        </div>
      </div>
    </section>

    <ContactLinkSection :profile="profile || null" />
  </div>
</template>
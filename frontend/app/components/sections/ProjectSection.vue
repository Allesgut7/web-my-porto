<script setup lang="ts">
import ProjectCard from '../cards/ProjectCard.vue'
import type { ProjectListItem } from '../../types/project'

defineProps<{
  projects: ProjectListItem[]
  pending?: boolean
  error?: unknown
}>()
</script>

<template>
  <section class="app-section">
    <div class="app-container">
      <div class="flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div>
          <p class="section-eyebrow">
            02 / Featured Work
          </p>
          <h2 class="section-title">
            Selected Engineering Projects
          </h2>
          <p class="section-description">
            A curated list of published projects loaded from the public API.
          </p>
        </div>

        <NuxtLink to="/projects" class="btn-secondary">
          View All Projects
        </NuxtLink>
      </div>

      <div v-if="pending" class="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div
          v-for="item in 3"
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
        <h3 class="mt-5 text-lg font-semibold text-app-text">
          Unable to load portfolio data.
        </h3>
        <p class="mt-2 text-sm text-app-muted">
          The API might be unavailable. Please try again later.
        </p>
      </div>

      <div v-else-if="projects.length === 0" class="app-card mt-10 p-8 text-center">
        <div class="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-brand-soft font-mono text-brand-primary">
          ∅
        </div>
        <h3 class="mt-5 text-lg font-semibold text-app-text">
          No published projects yet.
        </h3>
        <p class="mt-2 text-sm text-app-muted">
          Once a project is published from the admin dashboard, it will appear here.
        </p>
      </div>

      <div v-else class="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <ProjectCard
          v-for="project in projects"
          :key="project.id"
          :project="project"
        />
      </div>
    </div>
  </section>
</template>
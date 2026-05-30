<script setup lang="ts">
import type { ProjectListItem } from '~/types/project'

defineProps<{
  projects: ProjectListItem[]
}>()
</script>

<template>
  <section
    id="projects"
    class="app-section"
  >
    <div class="app-container">
      <div class="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <p class="section-eyebrow">
            02 / Featured Work
          </p>

          <h2 class="section-title">
            Selected projects
          </h2>

          <p class="section-description">
            Project published yang dikelola dari backend dan ditampilkan otomatis melalui Public API.
          </p>
        </div>

        <NuxtLink
          to="/projects"
          class="btn-secondary w-fit"
        >
          View all projects
        </NuxtLink>
      </div>

      <div
        v-if="projects.length"
        class="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3"
      >
        <ProjectCard
          v-for="project in projects"
          :key="project.id"
          :project="project"
        />
      </div>

      <EmptyState
        v-else
        class="mt-10"
        title="Belum ada featured project"
        message="Project published akan tampil otomatis setelah tersedia dari backend."
      />
    </div>
  </section>
</template>
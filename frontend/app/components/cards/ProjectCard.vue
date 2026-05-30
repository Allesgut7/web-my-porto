<script setup lang="ts">
import type { ProjectListItem } from '~/types/project'

defineProps<{
  project: ProjectListItem
}>()

function formatYear(date?: string | null) {
  if (!date) return null

  const parsed = new Date(date)
  if (Number.isNaN(parsed.getTime())) return null

  return parsed.getFullYear()
}
</script>

<template>
  <article class="app-card app-card-hover overflow-hidden">
    <NuxtLink
      :to="`/projects/${project.slug}`"
      class="block"
      :aria-label="`Lihat detail project ${project.title}`"
    >
      <div class="technical-grid aspect-[16/10] overflow-hidden bg-brand-soft">
        <img
          v-if="project.thumbnailUrl"
          :src="project.thumbnailUrl"
          :alt="`Thumbnail project ${project.title}`"
          class="h-full w-full object-cover transition duration-300 hover:scale-105"
          loading="lazy"
        >

        <div
          v-else
          class="flex h-full w-full items-center justify-center p-6 text-center"
        >
          <div>
            <p class="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-brand-primary">
              Project
            </p>
            <p class="mt-2 text-lg font-bold text-app-text">
              {{ project.title }}
            </p>
          </div>
        </div>
      </div>
    </NuxtLink>

    <div class="p-6">
      <div class="flex flex-wrap items-center gap-2">
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

        <span
          v-if="formatYear(project.completedAt || project.startedAt)"
          class="badge-primary"
        >
          {{ formatYear(project.completedAt || project.startedAt) }}
        </span>
      </div>

      <h3 class="mt-4 text-xl font-bold tracking-tight text-app-text">
        <NuxtLink
          :to="`/projects/${project.slug}`"
          class="hover:text-brand-primary"
        >
          {{ project.title }}
        </NuxtLink>
      </h3>

      <p class="mt-3 line-clamp-3 text-sm leading-6 text-app-muted">
        {{ project.shortDescription || 'Deskripsi singkat project belum tersedia.' }}
      </p>

      <div
        v-if="project.techStacks.length"
        class="mt-5 flex flex-wrap gap-2"
      >
        <span
          v-for="stack in project.techStacks.slice(0, 5)"
          :key="stack.id || stack.name"
          class="rounded-full bg-brand-soft px-3 py-1 text-xs font-medium text-brand-primary"
        >
          {{ stack.name }}
        </span>
      </div>

      <div class="mt-6 flex items-center justify-between gap-4">
        <NuxtLink
          :to="`/projects/${project.slug}`"
          class="text-sm font-semibold text-brand-primary hover:text-blue-800"
        >
          View case study →
        </NuxtLink>

        <div class="flex gap-3">
          <a
            v-if="project.demoUrl"
            :href="project.demoUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="text-sm font-medium text-app-muted hover:text-brand-primary"
            @click.stop
          >
            Demo
          </a>

          <a
            v-if="project.repositoryUrl"
            :href="project.repositoryUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="text-sm font-medium text-app-muted hover:text-brand-primary"
            @click.stop
          >
            Repo
          </a>
        </div>
      </div>
    </div>
  </article>
</template>
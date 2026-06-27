<script setup lang="ts">
import type { ProjectListItem } from '~/types/project'
import { safeUrl } from '~/utils/url'

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
  <article class="app-card overflow-hidden group transition-all duration-500 hover:-translate-y-2 hover:shadow-deep hover:border-blue-200 dark:hover:border-blue-800 gradient-border">
    <!-- Accent bar -->
    <div
      v-if="project.isFeatured"
      class="card-accent-bar-amber"
    />
    <div
      v-else-if="project.projectType"
      class="card-accent-bar-cyan"
    />
    <div
      v-else
      class="card-accent-bar-blue"
    />

    <NuxtLink
      :to="`/projects/${project.slug}`"
      class="block"
      :aria-label="`Lihat detail project ${project.title}`"
    >
      <div class="relative aspect-[16/10] overflow-hidden bg-brand-soft dark:bg-blue-950">
        <img
          v-if="project.thumbnailUrl"
          :src="project.thumbnailUrl"
          :alt="`Thumbnail project ${project.title}`"
          class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        >

        <FallbackThumbnail
          v-else
          :project-type="project.projectType"
          :title="project.title"
        />

        <!-- Hover overlay with gradient -->
        <div class="absolute inset-0 bg-gradient-to-t from-black/30 via-black/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

        <!-- Year badge on image -->
        <div
          v-if="formatYear(project.completedAt || project.startedAt)"
          class="absolute right-3 top-3"
        >
          <span class="inline-flex items-center rounded-lg bg-black/50 px-2.5 py-1 font-mono text-xs font-semibold text-white backdrop-blur-sm">
            {{ formatYear(project.completedAt || project.startedAt) }}
          </span>
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
      </div>

      <h3 class="mt-4 text-xl font-bold tracking-tight text-app-text dark:text-slate-50 font-display">
        <NuxtLink
          :to="`/projects/${project.slug}`"
          class="transition-colors duration-200 hover:text-brand-primary"
        >
          {{ project.title }}
        </NuxtLink>
      </h3>

      <p class="mt-3 line-clamp-3 text-sm leading-6 text-app-muted dark:text-slate-400">
        {{ project.shortDescription || 'Deskripsi singkat project belum tersedia.' }}
      </p>

      <div
        v-if="project.techStacks.length"
        class="mt-5 flex flex-wrap gap-2"
      >
        <TechBadge
          v-for="stack in project.techStacks.slice(0, 5)"
          :key="stack.name"
          :tech="stack"
        />

        <span
          v-if="project.techStacks.length > 5"
          class="badge"
        >
          +{{ project.techStacks.length - 5 }} more
        </span>
      </div>

      <div class="mt-6 flex items-center justify-between gap-4 border-t border-app-border dark:border-slate-800 pt-5">
        <NuxtLink
          :to="`/projects/${project.slug}`"
          class="text-sm font-semibold text-brand-primary hover:text-blue-800 dark:hover:text-blue-300 group/link inline-flex items-center gap-1.5 transition-colors"
        >
          View case study
          <svg
            class="h-3.5 w-3.5 transition-transform duration-200 group-hover/link:translate-x-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2.5"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </NuxtLink>

        <div class="flex gap-3">
          <a
            v-if="project.demoUrl"
            :href="safeUrl(project.demoUrl) || undefined"
            target="_blank"
            rel="noopener noreferrer"
            class="text-sm font-medium text-app-muted dark:text-slate-400 hover:text-brand-primary transition-colors"
            @click.stop
          >
            Demo
          </a>

          <a
            v-if="project.repositoryUrl"
            :href="safeUrl(project.repositoryUrl) || undefined"
            target="_blank"
            rel="noopener noreferrer"
            class="text-sm font-medium text-app-muted dark:text-slate-400 hover:text-brand-primary transition-colors"
            @click.stop
          >
            Repo
          </a>
        </div>
      </div>
    </div>
  </article>
</template>

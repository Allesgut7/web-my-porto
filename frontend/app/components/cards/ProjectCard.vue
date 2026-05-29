<script setup lang="ts">
import { computed } from 'vue'
import type { ProjectListItem } from '../../types/project'

const props = defineProps<{
  project: ProjectListItem
}>()

const visibleTechStacks = computed(() => props.project.techStacks.slice(0, 5))
const hiddenTechStackCount = computed(() => Math.max(props.project.techStacks.length - 5, 0))
</script>

<template>
  <article class="app-card app-card-hover overflow-hidden">
    <div class="aspect-[16/10] bg-brand-soft">
      <img
        v-if="project.thumbnailUrl"
        :src="project.thumbnailUrl"
        :alt="`${project.title} thumbnail`"
        loading="lazy"
        class="h-full w-full object-cover"
      >

      <div
        v-else
        class="technical-grid flex h-full items-center justify-center"
      >
        <span class="font-mono text-sm font-semibold text-brand-primary">
          {{ project.projectType || 'Project' }}
        </span>
      </div>
    </div>

    <div class="p-6">
      <div class="flex flex-wrap gap-2">
        <span v-if="project.projectType" class="badge-primary">
          {{ project.projectType }}
        </span>
        <span v-if="project.isFeatured" class="badge-accent">
          Featured
        </span>
      </div>

      <h3 class="mt-5 text-xl font-bold text-app-text">
        {{ project.title }}
      </h3>

      <p class="mt-3 line-clamp-3 text-sm leading-6 text-app-muted">
        {{ project.shortDescription || 'No short description available yet.' }}
      </p>

      <div
        v-if="project.techStacks.length"
        class="mt-5 flex flex-wrap gap-2"
      >
        <span
          v-for="tech in visibleTechStacks"
          :key="tech"
          class="badge-tech"
        >
          {{ tech }}
        </span>

        <span
          v-if="hiddenTechStackCount > 0"
          class="badge border-slate-200 bg-slate-50 text-app-muted"
        >
          +{{ hiddenTechStackCount }} more
        </span>
      </div>

      <div class="mt-6 flex items-center justify-between border-t border-app-border pt-5">
        <NuxtLink
          :to="`/projects/${project.slug}`"
          class="text-sm font-semibold text-brand-primary hover:text-blue-800"
        >
          View Detail
        </NuxtLink>

        <span class="font-mono text-xs text-app-muted">
          {{ project.completedAt || project.startedAt || 'Case Study' }}
        </span>
      </div>
    </div>
  </article>
</template>
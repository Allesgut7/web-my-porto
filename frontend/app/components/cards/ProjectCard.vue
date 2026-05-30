<script setup lang="ts">
type TechStack = {
  id?: string | null
  name?: string | null
}

type ProjectLike = {
  id?: string | null
  title: string
  slug: string
  shortDescription?: string | null
  short_description?: string | null
  description?: string | null
  projectType?: string | null
  project_type?: string | null
  thumbnailUrl?: string | null
  thumbnail_url?: string | null
  thumbnail?: any
  thumbnailFile?: any
  thumbnail_file?: any
  isFeatured?: boolean | null
  is_featured?: boolean | null
  techStacks?: TechStack[]
  tech_stacks?: TechStack[]
}

const props = withDefaults(
  defineProps<{
    project: ProjectLike
    index?: number
  }>(),
  {
    index: 0,
  },
)

const thumbnailUrl = computed(() => resolveImageUrl(props.project))

const description = computed(() => {
  return (
    props.project.shortDescription ||
    props.project.short_description ||
    props.project.description ||
    'A technical project built with structured implementation and clear delivery focus.'
  )
})

const projectType = computed(() => {
  return props.project.projectType || props.project.project_type || null
})

const isFeatured = computed(() => {
  return props.project.isFeatured ?? props.project.is_featured ?? false
})

const visibleTechStacks = computed(() => {
  return (props.project.techStacks || props.project.tech_stacks || [])
    .filter((item) => item.name)
    .slice(0, 4)
})

console.log('project thumbnail debug:', {
  title: props.project.title,
  thumbnailUrl: thumbnailUrl.value,
  raw: props.project,
})
</script>


<template>
  <AnimatedContainer :delay="index * 90">
    <article class="group h-full overflow-hidden rounded-3xl border border-app-border bg-white shadow-soft transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-card">
      <NuxtLink
        :to="`/projects/${project.slug}`"
        class="block"
      >
        <div class="relative aspect-[16/10] overflow-hidden bg-brand-soft">
          <img
            v-if="thumbnailUrl"
            :src="thumbnailUrl"
            :alt="`${project.title} thumbnail`"
            class="h-full w-full object-cover transition duration-500 group-hover:scale-105"
            loading="lazy"
          >

          <FallbackThumbnail
            v-else
            :title="project.title"
            :label="projectType || 'Project'"
          />

          <div class="absolute left-4 top-4 flex flex-wrap gap-2">
            <span
              v-if="isFeatured"
              class="badge-accent bg-white/90 backdrop-blur"
            >
              Featured
            </span>

            <span
              v-if="projectType"
              class="badge-tech bg-white/90 backdrop-blur"
            >
              {{ projectType }}
            </span>
          </div>
        </div>

        <div class="p-6 md:p-7">
          <div class="flex items-start justify-between gap-4">
            <h3 class="text-xl font-bold tracking-tight text-app-text transition group-hover:text-brand-primary">
              {{ project.title }}
            </h3>

            <span class="mt-1 text-lg text-app-muted transition group-hover:translate-x-1 group-hover:text-brand-primary">
              →
            </span>
          </div>

          <p class="mt-3 line-clamp-3-custom text-sm leading-7 text-app-muted">
            {{ description }}
          </p>

          <div
            v-if="visibleTechStacks.length"
            class="mt-5 flex flex-wrap gap-2"
          >
            <TechBadge
              v-for="stack in visibleTechStacks"
              :key="stack.id || stack.name || ''"
              :label="stack.name || ''"
              tone="neutral"
            />
          </div>

          <div class="mt-6 flex items-center justify-between border-t border-app-border pt-5">
            <span class="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-app-muted">
              Case Study
            </span>

            <span class="text-sm font-semibold text-brand-primary">
              View case study
            </span>
          </div>
        </div>
      </NuxtLink>
    </article>
  </AnimatedContainer>
</template>
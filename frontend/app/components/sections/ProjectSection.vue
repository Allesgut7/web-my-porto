<script setup lang="ts">
type ProjectLike = {
  id?: string | null
  title: string
  slug: string
  shortDescription?: string | null
  description?: string | null
  projectType?: string | null
  thumbnailUrl?: string | null
  isFeatured?: boolean | null
  techStacks?: Array<{ id?: string | null; name?: string | null }>
}

defineProps<{
  projects?: ProjectLike[] | null
}>()
</script>

<template>
  <section class="app-section bg-white">
    <div class="app-container">
      <div class="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <SectionHeader
          eyebrow="Selected Work"
          title="Projects shaped as practical, tested, and maintainable systems."
          description="A collection of shipped works, experiments, and portfolio-grade implementations powered by database-driven content."
        />

        <NuxtLink
          to="/projects"
          class="btn-secondary shrink-0"
        >
          View all projects
          <span class="ml-2">→</span>
        </NuxtLink>
      </div>

      <div
        v-if="projects?.length"
        class="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3"
      >
        <ProjectCard
          v-for="(project, index) in projects"
          :key="project.id || project.slug"
          :project="project"
          :index="index"
        />
      </div>

      <EmptyState
        v-else
        class="mt-12"
        title="No published projects yet"
        message="Published projects from the API will appear here."
      />
    </div>
  </section>
</template>
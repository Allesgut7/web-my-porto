<script setup lang="ts">
const route = useRoute()
const router = useRouter()

const search = ref((route.query.search as string) || '')

const {
  data: projects,
  pending,
  error,
  refresh,
} = await useProjects({
  page: 1,
  limit: 12,
  search: search.value || undefined,
  sort: 'display_order',
})

watch(search, async (value) => {
  await router.replace({
    query: {
      ...route.query,
      search: value || undefined,
    },
  })

  await refresh()
})

const filteredProjects = computed(() => {
  const list = projects.value || []

  if (!search.value) {
    return list
  }

  const keyword = search.value.toLowerCase()

  return list.filter((project) => {
    const title = project.title?.toLowerCase() || ''
    const description = project.shortDescription?.toLowerCase() || ''
      ''
    const projectType = project.projectType?.toLowerCase() || ''
    const techStacks = project.techStacks
      ?.map((stack) => stack.name?.toLowerCase() || '')
      .join(' ') || ''

    return (
      title.includes(keyword) ||
      description.includes(keyword) ||
      projectType.includes(keyword) ||
      techStacks.includes(keyword)
    )
  })
})

useSeoMeta({
  title: 'Projects — Web My Porto',
  description: 'Explore developer projects, case studies, and technical implementations.',
})
</script>

<template>
  <div>
    <PageHeader
      eyebrow="Projects"
      title="A database-driven collection of projects, systems, and technical case studies."
      description="Browse public portfolio works that are published from the admin dashboard and rendered from the public API."
    />

    <section class="app-section bg-app-background">
      <div class="app-container">
        <div class="mb-8 grid gap-4 rounded-3xl border border-app-border bg-white p-5 shadow-soft md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <p class="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-app-muted">
              Project Explorer
            </p>
            <p class="mt-2 text-sm text-app-muted">
              Search published projects by title, stack, or project context.
            </p>
          </div>

          <input
            v-model="search"
            type="search"
            placeholder="Search projects..."
            class="input md:w-80"
          >
        </div>

        <LoadingState
          v-if="pending"
          title="Loading projects"
          message="Fetching published projects from the public API."
        />

        <ErrorState
          v-else-if="error"
          title="Projects failed to load"
          :message="error.message"
          @retry="refresh"
        />

        <div
          v-else-if="filteredProjects.length"
          class="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          <ProjectCard
            v-for="(project, index) in filteredProjects"
            :key="project.id || project.slug"
            :project="project"
            :index="index"
          />
        </div>

        <EmptyState
          v-else
          title="No projects found"
          message="No published project matched your current filter."
        />
      </div>
    </section>
  </div>
</template>
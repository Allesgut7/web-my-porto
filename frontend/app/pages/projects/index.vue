<script setup lang="ts">
const route = useRoute()
const router = useRouter()

const search = ref(typeof route.query.search === 'string' ? route.query.search : '')
const category = ref(typeof route.query.category === 'string' ? route.query.category : '')

const query = computed(() => ({
  page: 1,
  limit: 12,
  sort: 'display_order' as const,
  search: search.value || undefined,
  category: category.value || undefined,
}))

const { data: projects, pending, error, refresh } = useProjects(query.value, {
  watch: [query],
})

const categories = computed(() => {
  const items = projects.value || []
  return Array.from(
    new Set(
      items
        .map((project) => project.projectType)
        .filter(Boolean) as string[],
    ),
  )
})

watch([search, category], () => {
  router.replace({
    query: {
      ...(search.value ? { search: search.value } : {}),
      ...(category.value ? { category: category.value } : {}),
    },
  })
})

useSeoMeta({
  title: 'Projects',
  description: 'Daftar project published — Electrical Engineering, IoT, Data Science, Backend, Machine Learning.',
  ogTitle: 'Projects — Developer Portfolio',
  ogDescription: 'Daftar project published — Electrical Engineering, IoT, Data Science, Backend, Machine Learning.',
  ogType: 'website',
})

function retry() {
  refresh()
}
</script>

<template>
  <div>
    <section class="relative overflow-hidden border-b border-app-border bg-app-background py-16 md:py-20">
      <div class="bg-grid-pattern bg-grid-animate absolute inset-0 opacity-40" />
      <CircuitPattern :opacity="0.06" class="absolute inset-0" />

      <div class="app-container relative z-10">
        <p class="section-eyebrow">
          Projects
        </p>

        <h1 class="mt-4 max-w-3xl text-4xl font-extrabold tracking-tight text-app-text md:text-5xl font-display">
          Published engineering work and portfolio projects.
        </h1>

        <p class="mt-5 max-w-2xl text-base leading-8 text-app-muted md:text-lg">
          Semua project di halaman ini berasal dari Public API dan hanya menampilkan data yang berstatus published.
        </p>

        <div class="mt-6 flex flex-wrap gap-3 text-sm text-app-muted">
          <span class="badge-tech">
            Data from API
          </span>
          <span class="badge-primary">
            {{ projects?.length || 0 }} projects
          </span>
        </div>
      </div>
    </section>

    <section class="app-section">
      <div class="app-container">
        <div class="app-card p-5">
          <div class="grid gap-4 md:grid-cols-[1fr_240px]">
            <input
              v-model="search"
              type="search"
              class="input"
              placeholder="Search project by title..."
            >

            <select
              v-model="category"
              class="input"
            >
              <option value="">
                All categories
              </option>
              <option
                v-for="item in categories"
                :key="item"
                :value="item"
              >
                {{ item }}
              </option>
            </select>
          </div>
        </div>

        <div
          v-if="pending"
          class="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          <LoadingState />
          <LoadingState />
          <LoadingState />
        </div>

        <ErrorState
          v-else-if="error"
          class="mt-10"
          title="Project gagal dimuat"
          :message="error.message"
          @retry="retry"
        />

        <div
          v-else-if="projects?.length"
          class="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatedContainer
            v-for="(project, index) in projects"
            :key="project.id"
            :delay="(index % 6) * 100"
          >
            <ProjectCard :project="project" />
          </AnimatedContainer>
        </div>

        <EmptyState
          v-else
          class="mt-10"
          title="Project tidak ditemukan"
          message="Belum ada project published yang cocok dengan filter saat ini."
        />
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
// definePageMeta({
//   layout: 'public',
// })

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
  description: 'Daftar project published yang dibangun dan dikelola melalui backend portfolio.',
  ogTitle: 'Projects — Developer Portfolio',
  ogDescription: 'Daftar project published yang dibangun dan dikelola melalui backend portfolio.',
  ogType: 'website',
})

function retry() {
  refresh()
}
</script>

<template>
  <div>
    <section class="technical-grid border-b border-app-border bg-app-background py-16 md:py-20">
      <div class="app-container">
        <p class="section-eyebrow">
          Projects
        </p>

        <h1 class="mt-4 max-w-3xl text-4xl font-extrabold tracking-tight text-app-text md:text-5xl">
          Published engineering work and portfolio projects.
        </h1>

        <p class="mt-5 max-w-2xl text-base leading-8 text-app-muted md:text-lg">
          Semua project di halaman ini berasal dari Public API dan hanya menampilkan data yang berstatus published.
        </p>
      </div>
    </section>

    <section class="app-section">
      <div class="app-container">
        <div class="app-card p-5">
          <div class="grid gap-4 md:grid-cols-[1fr_240px]">
            <input
              v-model="search"
              type="search"
              class="rounded-xl border border-app-border bg-white px-4 py-3 text-sm text-app-text outline-none transition placeholder:text-slate-400 focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20"
              placeholder="Search project by title..."
            >

            <select
              v-model="category"
              class="rounded-xl border border-app-border bg-white px-4 py-3 text-sm text-app-text outline-none transition focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20"
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
          <ProjectCard
            v-for="project in projects"
            :key="project.id"
            :project="project"
          />
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
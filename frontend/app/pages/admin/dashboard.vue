<script setup lang="ts">
definePageMeta({
  layout: 'admin',
})

const { getProjects } = useAdminProjects()

const { data, pending, error, refresh } = useAsyncData(
  'admin-dashboard-projects',
  () => getProjects({ page: 1, limit: 50, sort: 'latest' }),
)

const projects = computed(() => data.value?.data || [])

const totalProjects = computed(() => data.value?.meta.total || projects.value.length)
const publishedCount = computed(() => projects.value.filter((item) => item.status === 'published').length)
const draftCount = computed(() => projects.value.filter((item) => item.status === 'draft').length)
const archivedCount = computed(() => projects.value.filter((item) => item.status === 'archived').length)

useSeoMeta({
  title: 'Admin Dashboard',
  description: 'Dashboard admin portfolio.',
})

function retry() {
  refresh()
}
</script>

<template>
  <div>
    <div class="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <div>
        <p class="section-eyebrow">Overview</p>
        <h1 class="section-title">Dashboard</h1>
        <p class="section-description">
          Ringkasan project portfolio dari Admin Project API.
        </p>
      </div>

      <NuxtLink
        to="/admin/projects/create"
        class="btn-primary w-fit"
      >
        Create Project
      </NuxtLink>
    </div>

    <div
      v-if="pending"
      class="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4"
    >
      <LoadingState />
      <LoadingState />
      <LoadingState />
      <LoadingState />
    </div>

    <ErrorState
      v-else-if="error"
      class="mt-10"
      title="Dashboard gagal dimuat"
      :message="error.message"
      @retry="retry"
    />

    <div
      v-else
      class="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4"
    >
      <div class="app-card p-6">
        <p class="font-mono text-xs uppercase tracking-[0.2em] text-brand-primary">Total</p>
        <p class="mt-4 text-3xl font-bold text-app-text">{{ totalProjects }}</p>
        <p class="mt-2 text-sm text-app-muted">All projects</p>
      </div>

      <div class="app-card p-6">
        <p class="font-mono text-xs uppercase tracking-[0.2em] text-green-700 dark:text-green-400">Published</p>
        <p class="mt-4 text-3xl font-bold text-app-text">{{ publishedCount }}</p>
        <p class="mt-2 text-sm text-app-muted">Visible on public site</p>
      </div>

      <div class="app-card p-6">
        <p class="font-mono text-xs uppercase tracking-[0.2em] text-amber-700 dark:text-amber-400">Draft</p>
        <p class="mt-4 text-3xl font-bold text-app-text">{{ draftCount }}</p>
        <p class="mt-2 text-sm text-app-muted">Not public yet</p>
      </div>

      <div class="app-card p-6">
        <p class="font-mono text-xs uppercase tracking-[0.2em] text-slate-500">Archived</p>
        <p class="mt-4 text-3xl font-bold text-app-text">{{ archivedCount }}</p>
        <p class="mt-2 text-sm text-app-muted">Hidden archive</p>
      </div>
    </div>

    <div class="app-card mt-8 p-6 md:p-8">
      <div class="flex items-center justify-between gap-4">
        <div>
          <h2 class="text-xl font-bold text-app-text">
            Recent Projects
          </h2>
          <p class="mt-1 text-sm text-app-muted">
            Latest projects from admin API.
          </p>
        </div>

        <NuxtLink
          to="/admin/projects"
          class="btn-secondary"
        >
          Manage
        </NuxtLink>
      </div>

      <div
        v-if="projects.length"
        class="mt-6 overflow-x-auto"
      >
        <table class="w-full min-w-[720px] text-left text-sm">
          <caption class="sr-only">Recent projects</caption>
          <thead>
            <tr class="border-b border-app-border text-xs uppercase tracking-[0.14em] text-app-muted">
              <th class="py-3 pr-4">Title</th>
              <th class="py-3 pr-4">Type</th>
              <th class="py-3 pr-4">Status</th>
              <th class="py-3 pr-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="project in projects.slice(0, 5)"
              :key="project.id"
              class="border-b border-app-border last:border-0"
            >
              <td class="py-4 pr-4 font-semibold text-app-text">{{ project.title }}</td>
              <td class="py-4 pr-4 text-app-muted">{{ project.projectType || '-' }}</td>
              <td class="py-4 pr-4">
                <ProjectStatusBadge :status="project.status" />
              </td>
              <td class="py-4 pr-4 text-right">
                <NuxtLink
                  :to="`/admin/projects/${project.id}`"
                  class="font-semibold text-brand-primary hover:text-blue-800 dark:hover:text-blue-400"
                >
                  Edit
                </NuxtLink>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <EmptyState
        v-else
        class="mt-6"
        title="Belum ada project"
        message="Buat project pertama dari dashboard admin."
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import type { ProjectStatus } from '~/types/admin-project'

definePageMeta({
  layout: 'admin',
})

const { getProjects, deleteProject } = useAdminProjects()
const successMessage = ref('')
const search = ref('')
const status = ref<ProjectStatus | ''>('')
const page = ref(1)

const query = computed(() => ({
  page: page.value,
  limit: 10,
  search: search.value || undefined,
  status: status.value || undefined,
  sort: 'latest' as const,
}))

const { data, pending, error, refresh } = useAsyncData(
  'admin-projects',
  () => getProjects(query.value),
  {
    watch: [query],
  },
)

const projects = computed(() => data.value?.data || [])
const meta = computed(() => data.value?.meta)

const deleteError = ref('')
const deletingId = ref('')

useSeoMeta({
  title: 'Admin Projects',
  description: 'Kelola project portfolio.',
})

async function handleDelete(id: string, title: string) {
  const confirmed = window.confirm(`Hapus project "${title}"?`)
  if (!confirmed) return

  deleteError.value = ''
  successMessage.value = ''
  deletingId.value = id

  try {
    await deleteProject(id)
    successMessage.value = `Project "${title}" berhasil dihapus.`
    await refresh()
  } catch (error: any) {
    deleteError.value =
      error?.data?.message ||
      error?.message ||
      'Gagal menghapus project.'
  } finally {
    deletingId.value = ''
  }
}

function retry() {
  refresh()
}
</script>

<template>
  <div>
    <div class="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <div>
        <p class="section-eyebrow">Projects</p>
        <h1 class="section-title">Manage Projects</h1>
        <p class="section-description">
          Tambah, edit, publish, archive, dan hapus project portfolio.
        </p>
      </div>

      <NuxtLink
        to="/admin/projects/create"
        class="btn-primary w-fit"
      >
        Create Project
      </NuxtLink>
    </div>

    <FormError
      class="mt-8"
      :message="deleteError"
    />

    <SuccessState
      v-if="successMessage"
      class="mt-4"
      title="Delete berhasil"
      :message="successMessage"
    />

    <div class="app-card mt-8 p-5">
      <div class="grid gap-4 md:grid-cols-[1fr_220px]">
        <input
          v-model="search"
          type="search"
          class="input"
          placeholder="Search project..."
        >

        <select
          v-model="status"
          class="input"
        >
          <option value="">All status</option>
          <option value="draft">Draft</option>
          <option value="published">Published</option>
          <option value="archived">Archived</option>
        </select>
      </div>
    </div>

    <div
      v-if="pending"
      class="mt-8"
    >
      <LoadingState />
    </div>

    <ErrorState
      v-else-if="error"
      class="mt-8"
      title="Project admin gagal dimuat"
      :message="error.message"
      @retry="retry"
    />

    <div
      v-else-if="projects.length"
      class="app-card mt-8 overflow-hidden"
    >
      <div class="overflow-x-auto">
        <table class="w-full min-w-[900px] text-left text-sm">
          <caption class="sr-only">Admin projects list</caption>
          <thead class="bg-slate-50 dark:bg-slate-800">
            <tr class="border-b border-app-border text-xs uppercase tracking-[0.14em] text-app-muted">
              <th class="px-6 py-4">Project</th>
              <th class="px-6 py-4">Type</th>
              <th class="px-6 py-4">Status</th>
              <th class="px-6 py-4">Featured</th>
              <th class="px-6 py-4 text-right">Action</th>
            </tr>
          </thead>

          <tbody>
            <tr
              v-for="project in projects"
              :key="project.id"
              class="border-b border-app-border last:border-0"
            >
              <td class="px-6 py-4">
                <div class="flex items-center gap-4">
                  <div class="technical-grid h-14 w-20 overflow-hidden rounded-xl bg-brand-soft dark:bg-blue-950">
                    <img
                      v-if="project.thumbnailUrl"
                      :src="project.thumbnailUrl"
                      :alt="`Thumbnail ${project.title}`"
                      class="h-full w-full object-cover"
                    >
                  </div>

                  <div>
                    <p class="font-semibold text-app-text">{{ project.title }}</p>
                    <p class="font-mono text-xs text-app-muted">{{ project.slug }}</p>
                  </div>
                </div>
              </td>

              <td class="px-6 py-4 text-app-muted">
                {{ project.projectType || '-' }}
              </td>

              <td class="px-6 py-4">
                <ProjectStatusBadge :status="project.status" />
              </td>

              <td class="px-6 py-4">
                <span
                  v-if="project.isFeatured"
                  class="badge-accent"
                >
                  Featured
                </span>
                <span
                  v-else
                  class="text-app-muted"
                >
                  -
                </span>
              </td>

              <td class="px-6 py-4 text-right">
                <div class="flex justify-end gap-3">
                  <NuxtLink
                    :to="`/admin/projects/${project.id}`"
                    class="font-semibold text-brand-primary hover:text-blue-800 dark:hover:text-blue-400"
                  >
                    Edit
                  </NuxtLink>

                  <button
                    type="button"
                    class="font-semibold text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                    :disabled="deletingId === project.id"
                    @click="handleDelete(project.id, project.title)"
                  >
                    {{ deletingId === project.id ? 'Deleting...' : 'Delete' }}
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div
        v-if="meta"
        class="flex items-center justify-between border-t border-app-border px-6 py-4 text-sm text-app-muted"
      >
        <span>
          Page {{ meta.page }} of {{ meta.totalPages || 1 }} · Total {{ meta.total }}
        </span>
      </div>
    </div>

    <EmptyState
      v-else
      class="mt-8"
      title="Belum ada project"
      message="Klik Create Project untuk menambahkan project pertama."
    />
  </div>
</template>
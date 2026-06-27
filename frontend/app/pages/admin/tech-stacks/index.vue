<script setup lang="ts">
definePageMeta({
  layout: 'admin',
})

const { getTechStacks, deleteTechStack } = useAdminTechStacks()
const successMessage = ref('')
const search = ref('')
const categoryFilter = ref('')

const { data, pending, error, refresh } = useAsyncData(
  'admin-tech-stacks',
  () => getTechStacks(),
)

const techStacks = computed(() => {
  let list = data.value || []
  if (search.value) {
    const q = search.value.toLowerCase()
    list = list.filter((t) => t.name.toLowerCase().includes(q))
  }
  if (categoryFilter.value) {
    list = list.filter((t) => (t.category || '') === categoryFilter.value)
  }
  return list
})

const categories = computed(() => {
  const cats = new Set((data.value || []).map((t) => t.category).filter(Boolean))
  return Array.from(cats) as string[]
})

const deleteError = ref('')
const deletingId = ref('')

useSeoMeta({
  title: 'Admin Tech Stacks',
  description: 'Kelola tech stack dan teknologi.',
})

async function handleDelete(id: string, name: string) {
  const confirmed = window.confirm(`Hapus tech stack "${name}"?`)
  if (!confirmed) return

  deleteError.value = ''
  successMessage.value = ''
  deletingId.value = id

  try {
    await deleteTechStack(id)
    successMessage.value = `Tech stack "${name}" berhasil dihapus.`
    await refresh()
  } catch (error: any) {
    deleteError.value =
      error?.data?.message ||
      error?.message ||
      'Gagal menghapus tech stack.'
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
        <p class="section-eyebrow">Tech Stacks</p>
        <h1 class="section-title">Manage Tech Stacks</h1>
        <p class="section-description">
          Tambah, edit, dan hapus tech stack dan teknologi.
        </p>
      </div>

      <NuxtLink
        to="/admin/tech-stacks/create"
        class="btn-primary w-fit"
      >
        Create Tech Stack
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
          placeholder="Search tech stack..."
        >

        <select
          v-model="categoryFilter"
          class="input"
        >
          <option value="">All categories</option>
          <option
            v-for="cat in categories"
            :key="cat"
            :value="cat"
          >
            {{ cat }}
          </option>
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
      title="Tech Stacks gagal dimuat"
      :message="error.message"
      @retry="retry"
    />

    <div
      v-else-if="techStacks.length"
      class="app-card mt-8 overflow-hidden"
    >
      <div class="overflow-x-auto">
        <table class="w-full min-w-[600px] text-left text-sm">
          <caption class="sr-only">Admin tech stacks list</caption>
          <thead class="bg-slate-50 dark:bg-slate-800">
            <tr class="border-b border-app-border text-xs uppercase tracking-[0.14em] text-app-muted">
              <th class="px-6 py-4">Tech Stack</th>
              <th class="px-6 py-4">Category</th>
              <th class="px-6 py-4">Order</th>
              <th class="px-6 py-4 text-right">Action</th>
            </tr>
          </thead>

          <tbody>
            <tr
              v-for="tech in techStacks"
              :key="tech.id"
              class="border-b border-app-border last:border-0"
            >
              <td class="px-6 py-4">
                <div class="flex items-center gap-3">
                  <img
                    v-if="tech.iconUrl"
                    :src="tech.iconUrl"
                    :alt="tech.name"
                    class="h-8 w-8 rounded-lg object-cover"
                  >
                  <p class="font-semibold text-app-text">{{ tech.name }}</p>
                </div>
              </td>

              <td class="px-6 py-4 text-app-muted">
                {{ tech.category || '-' }}
              </td>

              <td class="px-6 py-4 text-app-muted">
                {{ tech.displayOrder }}
              </td>

              <td class="px-6 py-4 text-right">
                <div class="flex justify-end gap-3">
                  <NuxtLink
                    :to="`/admin/tech-stacks/${tech.id}`"
                    class="font-semibold text-brand-primary hover:text-blue-800 dark:hover:text-blue-400"
                  >
                    Edit
                  </NuxtLink>

                  <button
                    type="button"
                    class="font-semibold text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                    :disabled="deletingId === tech.id"
                    @click="handleDelete(tech.id, tech.name)"
                  >
                    {{ deletingId === tech.id ? 'Deleting...' : 'Delete' }}
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <EmptyState
      v-else
      class="mt-8"
      title="Belum ada tech stack"
      message="Klik Create Tech Stack untuk menambahkan tech stack pertama."
    />
  </div>
</template>

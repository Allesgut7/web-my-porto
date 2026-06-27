<script setup lang="ts">
definePageMeta({
  layout: 'admin',
})

const { getSkills, deleteSkill } = useAdminSkills()
const successMessage = ref('')
const search = ref('')
const categoryFilter = ref('')

const { data, pending, error, refresh } = useAsyncData(
  'admin-skills',
  () => getSkills(),
)

const skills = computed(() => {
  let list = data.value || []
  if (search.value) {
    const q = search.value.toLowerCase()
    list = list.filter((s) => s.name.toLowerCase().includes(q))
  }
  if (categoryFilter.value) {
    list = list.filter((s) => (s.category || '') === categoryFilter.value)
  }
  return list
})

const categories = computed(() => {
  const cats = new Set((data.value || []).map((s) => s.category).filter(Boolean))
  return Array.from(cats) as string[]
})

const deleteError = ref('')
const deletingId = ref('')

useSeoMeta({
  title: 'Admin Skills',
  description: 'Kelola skills dan kemampuan.',
})

async function handleDelete(id: string, name: string) {
  const confirmed = window.confirm(`Hapus skill "${name}"?`)
  if (!confirmed) return

  deleteError.value = ''
  successMessage.value = ''
  deletingId.value = id

  try {
    await deleteSkill(id)
    successMessage.value = `Skill "${name}" berhasil dihapus.`
    await refresh()
  } catch (error: any) {
    deleteError.value =
      error?.data?.message ||
      error?.message ||
      'Gagal menghapus skill.'
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
        <p class="section-eyebrow">Skills</p>
        <h1 class="section-title">Manage Skills</h1>
        <p class="section-description">
          Tambah, edit, dan hapus skill dan kemampuan teknis.
        </p>
      </div>

      <NuxtLink
        to="/admin/skills/create"
        class="btn-primary w-fit"
      >
        Create Skill
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
          placeholder="Search skill..."
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
      title="Skills gagal dimuat"
      :message="error.message"
      @retry="retry"
    />

    <div
      v-else-if="skills.length"
      class="app-card mt-8 overflow-hidden"
    >
      <div class="overflow-x-auto">
        <table class="w-full min-w-[700px] text-left text-sm">
          <caption class="sr-only">Admin skills list</caption>
          <thead class="bg-slate-50 dark:bg-slate-800">
            <tr class="border-b border-app-border text-xs uppercase tracking-[0.14em] text-app-muted">
              <th class="px-6 py-4">Skill</th>
              <th class="px-6 py-4">Category</th>
              <th class="px-6 py-4">Level</th>
              <th class="px-6 py-4">Visible</th>
              <th class="px-6 py-4">Order</th>
              <th class="px-6 py-4 text-right">Action</th>
            </tr>
          </thead>

          <tbody>
            <tr
              v-for="skill in skills"
              :key="skill.id"
              class="border-b border-app-border last:border-0"
            >
              <td class="px-6 py-4">
                <div class="flex items-center gap-3">
                  <img
                    v-if="skill.iconUrl"
                    :src="skill.iconUrl"
                    :alt="skill.name"
                    class="h-8 w-8 rounded-lg object-cover"
                  >
                  <p class="font-semibold text-app-text">{{ skill.name }}</p>
                </div>
              </td>

              <td class="px-6 py-4 text-app-muted">
                {{ skill.category || '-' }}
              </td>

              <td class="px-6 py-4 text-app-muted">
                {{ skill.level || '-' }}
              </td>

              <td class="px-6 py-4">
                <span
                  v-if="skill.isVisible"
                  class="badge-accent"
                >
                  Visible
                </span>
                <span
                  v-else
                  class="text-app-muted"
                >
                  Hidden
                </span>
              </td>

              <td class="px-6 py-4 text-app-muted">
                {{ skill.displayOrder }}
              </td>

              <td class="px-6 py-4 text-right">
                <div class="flex justify-end gap-3">
                  <NuxtLink
                    :to="`/admin/skills/${skill.id}`"
                    class="font-semibold text-brand-primary hover:text-blue-800 dark:hover:text-blue-400"
                  >
                    Edit
                  </NuxtLink>

                  <button
                    type="button"
                    class="font-semibold text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                    :disabled="deletingId === skill.id"
                    @click="handleDelete(skill.id, skill.name)"
                  >
                    {{ deletingId === skill.id ? 'Deleting...' : 'Delete' }}
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
      title="Belum ada skill"
      message="Klik Create Skill untuk menambahkan skill pertama."
    />
  </div>
</template>

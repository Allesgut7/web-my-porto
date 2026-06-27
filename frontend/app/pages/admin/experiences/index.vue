<script setup lang="ts">
definePageMeta({
  layout: 'admin',
})

const { getExperiences, deleteExperience } = useAdminExperiences()
const successMessage = ref('')
const search = ref('')
const typeFilter = ref('')

const { data, pending, error, refresh } = useAsyncData(
  'admin-experiences',
  () => getExperiences(),
)

const experiences = computed(() => {
  let list = data.value || []
  if (search.value) {
    const q = search.value.toLowerCase()
    list = list.filter(
      (exp) =>
        exp.title.toLowerCase().includes(q)
        || exp.organization.toLowerCase().includes(q),
    )
  }
  if (typeFilter.value) {
    list = list.filter((exp) => exp.type === typeFilter.value)
  }
  return list
})

const deleteError = ref('')
const deletingId = ref('')

useSeoMeta({
  title: 'Admin Experiences',
  description: 'Kelola pengalaman kerja, pendidikan, dan sertifikasi.',
})

async function handleDelete(id: string, title: string) {
  const confirmed = window.confirm(`Hapus pengalaman "${title}"?`)
  if (!confirmed) return

  deleteError.value = ''
  successMessage.value = ''
  deletingId.value = id

  try {
    await deleteExperience(id)
    successMessage.value = `Pengalaman "${title}" berhasil dihapus.`
    await refresh()
  } catch (error: any) {
    deleteError.value =
      error?.data?.message ||
      error?.message ||
      'Gagal menghapus pengalaman.'
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
        <p class="section-eyebrow">Experiences</p>
        <h1 class="section-title">Manage Experiences</h1>
        <p class="section-description">
          Tambah, edit, dan hapus pengalaman kerja, pendidikan, dan sertifikasi.
        </p>
      </div>

      <NuxtLink
        to="/admin/experiences/create"
        class="btn-primary w-fit"
      >
        Create Experience
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
          placeholder="Search experience..."
        >

        <select
          v-model="typeFilter"
          class="input"
        >
          <option value="">All types</option>
          <option value="work">Work</option>
          <option value="education">Education</option>
          <option value="certification">Certification</option>
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
      title="Experiences gagal dimuat"
      :message="error.message"
      @retry="retry"
    />

    <div
      v-else-if="experiences.length"
      class="app-card mt-8 overflow-hidden"
    >
      <div class="overflow-x-auto">
        <table class="w-full min-w-[800px] text-left text-sm">
          <caption class="sr-only">Admin experiences list</caption>
          <thead class="bg-slate-50 dark:bg-slate-800">
            <tr class="border-b border-app-border text-xs uppercase tracking-[0.14em] text-app-muted">
              <th class="px-6 py-4">Experience</th>
              <th class="px-6 py-4">Type</th>
              <th class="px-6 py-4">Period</th>
              <th class="px-6 py-4">Order</th>
              <th class="px-6 py-4 text-right">Action</th>
            </tr>
          </thead>

          <tbody>
            <tr
              v-for="exp in experiences"
              :key="exp.id"
              class="border-b border-app-border last:border-0"
            >
              <td class="px-6 py-4">
                <p class="font-semibold text-app-text">{{ exp.title }}</p>
                <p class="text-xs text-app-muted">{{ exp.organization }}</p>
              </td>

              <td class="px-6 py-4">
                <span class="badge-accent capitalize">{{ exp.type }}</span>
              </td>

              <td class="px-6 py-4 text-app-muted">
                {{ exp.startDate }} — {{ exp.isCurrent ? 'Present' : exp.endDate || '-' }}
              </td>

              <td class="px-6 py-4 text-app-muted">
                {{ exp.displayOrder }}
              </td>

              <td class="px-6 py-4 text-right">
                <div class="flex justify-end gap-3">
                  <NuxtLink
                    :to="`/admin/experiences/${exp.id}`"
                    class="font-semibold text-brand-primary hover:text-blue-800 dark:hover:text-blue-400"
                  >
                    Edit
                  </NuxtLink>

                  <button
                    type="button"
                    class="font-semibold text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                    :disabled="deletingId === exp.id"
                    @click="handleDelete(exp.id, exp.title)"
                  >
                    {{ deletingId === exp.id ? 'Deleting...' : 'Delete' }}
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
      title="Belum ada pengalaman"
      message="Klik Create Experience untuk menambahkan pengalaman pertama."
    />
  </div>
</template>

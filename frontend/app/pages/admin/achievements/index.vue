<script setup lang="ts">
definePageMeta({
  layout: 'admin',
})

const { getAchievements, deleteAchievement } = useAdminAchievements()
const successMessage = ref('')
const search = ref('')

const { data, pending, error, refresh } = useAsyncData(
  'admin-achievements',
  () => getAchievements(),
)

const achievements = computed(() => {
  let list = data.value || []
  if (search.value) {
    const q = search.value.toLowerCase()
    list = list.filter(
      (a) =>
        a.title.toLowerCase().includes(q)
        || (a.issuer || '').toLowerCase().includes(q)
        || (a.category || '').toLowerCase().includes(q),
    )
  }
  return list
})

const deleteError = ref('')
const deletingId = ref('')

useSeoMeta({
  title: 'Admin Achievements',
  description: 'Kelola achievements dan sertifikasi.',
})

async function handleDelete(id: string, title: string) {
  const confirmed = window.confirm(`Hapus achievement "${title}"?`)
  if (!confirmed) return

  deleteError.value = ''
  successMessage.value = ''
  deletingId.value = id

  try {
    await deleteAchievement(id)
    successMessage.value = `Achievement "${title}" berhasil dihapus.`
    await refresh()
  } catch (error: any) {
    deleteError.value =
      error?.data?.message ||
      error?.message ||
      'Gagal menghapus achievement.'
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
        <p class="section-eyebrow">Achievements</p>
        <h1 class="section-title">Manage Achievements</h1>
        <p class="section-description">
          Tambah, edit, dan hapus achievements, sertifikasi, dan pencapaian.
        </p>
      </div>

      <NuxtLink
        to="/admin/achievements/create"
        class="btn-primary w-fit"
      >
        Create Achievement
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
      <input
        v-model="search"
        type="search"
        class="input"
        placeholder="Search achievement..."
      >
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
      title="Achievements gagal dimuat"
      :message="error.message"
      @retry="retry"
    />

    <div
      v-else-if="achievements.length"
      class="app-card mt-8 overflow-hidden"
    >
      <div class="overflow-x-auto">
        <table class="w-full min-w-[800px] text-left text-sm">
          <caption class="sr-only">Admin achievements list</caption>
          <thead class="bg-slate-50 dark:bg-slate-800">
            <tr class="border-b border-app-border text-xs uppercase tracking-[0.14em] text-app-muted">
              <th class="px-6 py-4">Achievement</th>
              <th class="px-6 py-4">Category</th>
              <th class="px-6 py-4">Date</th>
              <th class="px-6 py-4">Visible</th>
              <th class="px-6 py-4">Order</th>
              <th class="px-6 py-4 text-right">Action</th>
            </tr>
          </thead>

          <tbody>
            <tr
              v-for="achievement in achievements"
              :key="achievement.id"
              class="border-b border-app-border last:border-0"
            >
              <td class="px-6 py-4">
                <p class="font-semibold text-app-text">{{ achievement.title }}</p>
                <p class="text-xs text-app-muted">{{ achievement.issuer || '-' }}</p>
              </td>

              <td class="px-6 py-4 text-app-muted">
                {{ achievement.category || '-' }}
              </td>

              <td class="px-6 py-4 text-app-muted">
                {{ achievement.achievedAt || '-' }}
              </td>

              <td class="px-6 py-4">
                <span
                  v-if="achievement.isVisible"
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
                {{ achievement.displayOrder }}
              </td>

              <td class="px-6 py-4 text-right">
                <div class="flex justify-end gap-3">
                  <NuxtLink
                    :to="`/admin/achievements/${achievement.id}`"
                    class="font-semibold text-brand-primary hover:text-blue-800 dark:hover:text-blue-400"
                  >
                    Edit
                  </NuxtLink>

                  <button
                    type="button"
                    class="font-semibold text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                    :disabled="deletingId === achievement.id"
                    @click="handleDelete(achievement.id, achievement.title)"
                  >
                    {{ deletingId === achievement.id ? 'Deleting...' : 'Delete' }}
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
      title="Belum ada achievement"
      message="Klik Create Achievement untuk menambahkan achievement pertama."
    />
  </div>
</template>

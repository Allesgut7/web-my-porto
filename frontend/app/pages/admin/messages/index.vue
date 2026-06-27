<script setup lang="ts">
definePageMeta({
  layout: 'admin',
})

const { getMessages, deleteMessage } = useAdminContactMessages()
const successMessage = ref('')
const search = ref('')
const readFilter = ref('')
const page = ref(1)

const query = computed(() => ({
  page: page.value,
  limit: 10,
  search: search.value || undefined,
  isRead: readFilter.value === '' ? undefined : readFilter.value === 'read',
  sort: 'latest' as const,
}))

const { data, pending, error, refresh } = useAsyncData(
  'admin-messages',
  () => getMessages(query.value),
  { watch: [query] },
)

const messages = computed(() => data.value?.data || [])
const meta = computed(() => data.value?.meta)

const deleteError = ref('')
const deletingId = ref('')

useSeoMeta({
  title: 'Admin Messages',
  description: 'Kelola pesan kontak.',
})

async function handleDelete(id: string, name: string) {
  const confirmed = window.confirm(`Hapus pesan dari "${name}"?`)
  if (!confirmed) return

  deleteError.value = ''
  successMessage.value = ''
  deletingId.value = id

  try {
    await deleteMessage(id)
    successMessage.value = `Pesan dari "${name}" berhasil dihapus.`
    await refresh()
  } catch (error: any) {
    deleteError.value =
      error?.data?.message ||
      error?.message ||
      'Gagal menghapus pesan.'
  } finally {
    deletingId.value = ''
  }
}

function formatDate(dateStr: string) {
  if (!dateStr) return '-'
  const date = new Date(dateStr)
  return date.toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

function retry() {
  refresh()
}
</script>

<template>
  <div>
    <div class="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <div>
        <p class="section-eyebrow">Messages</p>
        <h1 class="section-title">Contact Messages</h1>
        <p class="section-description">
          Lihat dan kelola pesan dari formulir kontak.
        </p>
      </div>
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
          placeholder="Search messages..."
        >

        <select
          v-model="readFilter"
          class="input"
        >
          <option value="">All status</option>
          <option value="unread">Unread</option>
          <option value="read">Read</option>
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
      title="Messages gagal dimuat"
      :message="error.message"
      @retry="retry"
    />

    <div
      v-else-if="messages.length"
      class="app-card mt-8 overflow-hidden"
    >
      <div class="overflow-x-auto">
        <table class="w-full min-w-[800px] text-left text-sm">
          <caption class="sr-only">Admin messages list</caption>
          <thead class="bg-slate-50 dark:bg-slate-800">
            <tr class="border-b border-app-border text-xs uppercase tracking-[0.14em] text-app-muted">
              <th class="px-6 py-4">From</th>
              <th class="px-6 py-4">Subject</th>
              <th class="px-6 py-4">Status</th>
              <th class="px-6 py-4">Date</th>
              <th class="px-6 py-4 text-right">Action</th>
            </tr>
          </thead>

          <tbody>
            <tr
              v-for="msg in messages"
              :key="msg.id"
              class="border-b border-app-border last:border-0"
              :class="{ 'bg-blue-50/50 dark:bg-blue-950/30': !msg.isRead }"
            >
              <td class="px-6 py-4">
                <p class="font-semibold text-app-text">{{ msg.name }}</p>
                <p class="text-xs text-app-muted">{{ msg.email }}</p>
              </td>

              <td class="px-6 py-4 text-app-muted">
                {{ msg.subject || '(No subject)' }}
              </td>

              <td class="px-6 py-4">
                <span
                  v-if="!msg.isRead"
                  class="badge-accent"
                >
                  Unread
                </span>
                <span
                  v-else
                  class="text-app-muted"
                >
                  Read
                </span>
              </td>

              <td class="px-6 py-4 text-app-muted">
                {{ formatDate(msg.createdAt) }}
              </td>

              <td class="px-6 py-4 text-right">
                <div class="flex justify-end gap-3">
                  <NuxtLink
                    :to="`/admin/messages/${msg.id}`"
                    class="font-semibold text-brand-primary hover:text-blue-800 dark:hover:text-blue-400"
                  >
                    View
                  </NuxtLink>

                  <button
                    type="button"
                    class="font-semibold text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                    :disabled="deletingId === msg.id"
                    @click="handleDelete(msg.id, msg.name)"
                  >
                    {{ deletingId === msg.id ? 'Deleting...' : 'Delete' }}
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
      title="Belum ada pesan"
      message="Pesan dari formulir kontak akan muncul di sini."
    />
  </div>
</template>

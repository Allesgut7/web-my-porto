<script setup lang="ts">
definePageMeta({
  layout: 'admin',
})

const route = useRoute()
const id = computed(() => String(route.params.id || ''))

const { getMessage, markAsRead, deleteMessage } = useAdminContactMessages()

const { data: message, pending, error, refresh } = useAsyncData(
  `admin-message-${id.value}`,
  () => getMessage(id.value),
  { watch: [id] },
)

const deleteError = ref('')
const isDeleting = ref(false)

useSeoMeta({
  title: () => message.value?.subject ? `Message: ${message.value.subject}` : 'View Message',
  description: 'Detail pesan kontak.',
})

onMounted(async () => {
  if (message.value && !message.value.isRead) {
    try {
      await markAsRead(id.value)
    } catch {
      // silently fail marking as read
    }
  }
})

function formatDate(dateStr: string) {
  if (!dateStr) return '-'
  const date = new Date(dateStr)
  return date.toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

async function handleDelete() {
  const confirmed = window.confirm(`Hapus pesan dari "${message.value?.name}"?`)
  if (!confirmed) return

  deleteError.value = ''
  isDeleting.value = true

  try {
    await deleteMessage(id.value)
    await navigateTo('/admin/messages')
  } catch (error: any) {
    deleteError.value =
      error?.data?.message ||
      error?.message ||
      'Gagal menghapus pesan.'
  } finally {
    isDeleting.value = false
  }
}

function retry() {
  refresh()
}
</script>

<template>
  <div>
    <div class="mb-8">
      <NuxtLink
        to="/admin/messages"
        class="text-sm font-semibold text-brand-primary hover:text-blue-800 dark:hover:text-blue-400"
      >
        ← Back to messages
      </NuxtLink>

      <p class="section-eyebrow mt-6">Message</p>
      <h1 class="section-title">
        {{ message?.subject || 'View Message' }}
      </h1>
    </div>

    <LoadingState v-if="pending" />

    <ErrorState
      v-else-if="error"
      title="Pesan gagal dimuat"
      :message="error.message"
      @retry="retry"
    />

    <template v-else-if="message">
      <FormError
        class="mb-6"
        :message="deleteError"
      />

      <div class="grid gap-6 lg:grid-cols-[1fr_360px]">
        <div class="app-card p-6 md:p-8">
          <p class="section-eyebrow">Message Content</p>

          <div class="mt-6 space-y-6">
            <div>
              <p class="text-sm font-semibold text-app-muted">Subject</p>
              <p class="mt-1 text-lg font-semibold text-app-text">
                {{ message.subject || '(No subject)' }}
              </p>
            </div>

            <div>
              <p class="text-sm font-semibold text-app-muted">Message</p>
              <div class="mt-2 whitespace-pre-wrap rounded-xl border border-app-border dark:border-slate-800 bg-app-background dark:bg-slate-900 p-6 text-app-text dark:text-slate-100">
                {{ message.message }}
              </div>
            </div>
          </div>
        </div>

        <aside class="space-y-6">
          <div class="app-card p-6">
            <p class="section-eyebrow">Sender</p>

            <div class="mt-6 space-y-4">
              <div>
                <p class="text-sm font-semibold text-app-muted">Name</p>
                <p class="mt-1 font-semibold text-app-text">{{ message.name }}</p>
              </div>

              <div>
                <p class="text-sm font-semibold text-app-muted">Email</p>
                <a
                  :href="`mailto:${message.email}`"
                  class="mt-1 block font-semibold text-brand-primary hover:text-blue-800 dark:hover:text-blue-400"
                >
                  {{ message.email }}
                </a>
              </div>
            </div>
          </div>

          <div class="app-card p-6">
            <p class="section-eyebrow">Details</p>

            <div class="mt-6 space-y-4">
              <div>
                <p class="text-sm font-semibold text-app-muted">Received</p>
                <p class="mt-1 text-app-text">{{ formatDate(message.createdAt) }}</p>
              </div>

              <div>
                <p class="text-sm font-semibold text-app-muted">Status</p>
                <p class="mt-1">
                  <span
                    v-if="message.isRead"
                    class="badge-accent"
                  >
                    Read
                  </span>
                  <span
                    v-else
                    class="badge-accent"
                  >
                    Unread
                  </span>
                </p>
              </div>
            </div>
          </div>

          <div class="app-card p-6">
            <button
              type="button"
              class="btn-primary w-full"
              :disabled="isDeleting"
              @click="handleDelete"
            >
              {{ isDeleting ? 'Deleting...' : 'Delete Message' }}
            </button>
          </div>
        </aside>
      </div>
    </template>
  </div>
</template>

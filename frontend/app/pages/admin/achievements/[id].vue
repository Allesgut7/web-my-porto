<script setup lang="ts">
import { emptyAchievementForm, achievementToForm } from '~/composables/useAdminAchievements'

definePageMeta({
  layout: 'admin',
})

const successMessage = ref('')
const route = useRoute()
const id = computed(() => String(route.params.id || ''))

const { getAchievement, updateAchievement } = useAdminAchievements()

const form = ref(emptyAchievementForm())
const isSubmitting = ref(false)
const errorMessage = ref('')
const validationErrors = ref<Record<string, string>>({})

const { data: achievement, pending, error, refresh } = useAsyncData(
  `admin-achievement-${id.value}`,
  () => getAchievement(id.value),
  { watch: [id] },
)

watch(
  achievement,
  (value) => {
    if (value) {
      form.value = achievementToForm(value)
    }
  },
  { immediate: true },
)

useSeoMeta({
  title: () => achievement.value?.title ? `Edit ${achievement.value.title}` : 'Edit Achievement',
  description: 'Edit achievement.',
})

onMounted(() => {
  if (route.query.created === '1') {
    successMessage.value = 'Achievement berhasil dibuat. Kamu sekarang bisa melengkapi atau mengedit detail.'
  }
})

async function handleSubmit() {
  errorMessage.value = ''
  successMessage.value = ''
  validationErrors.value = {}
  isSubmitting.value = true

  try {
    const updated = await updateAchievement(id.value, form.value)
    form.value = achievementToForm(updated)
    successMessage.value = 'Achievement berhasil diperbarui.'
    await refresh()
  } catch (error: any) {
    errorMessage.value =
      error?.data?.message ||
      error?.message ||
      'Gagal update achievement.'
    validationErrors.value = error?.data?.data?.errors || error?.data?.errors || {}
  } finally {
    isSubmitting.value = false
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
        to="/admin/achievements"
        class="text-sm font-semibold text-brand-primary hover:text-blue-800 dark:hover:text-blue-400"
      >
        ← Back to achievements
      </NuxtLink>

      <p class="section-eyebrow mt-6">Edit</p>
      <h1 class="section-title">
        {{ achievement?.title || 'Edit Achievement' }}
      </h1>
      <p class="section-description">
        Update detail achievement.
      </p>
    </div>

    <LoadingState v-if="pending" />

    <ErrorState
      v-else-if="error"
      title="Achievement gagal dimuat"
      :message="error.message"
      @retry="retry"
    />

    <SuccessState
      v-if="successMessage"
      class="mb-6"
      :title="route.query.created === '1' ? 'Create berhasil' : 'Update berhasil'"
      :message="successMessage"
    />

    <form
      v-if="!pending && !error"
      class="space-y-6"
      @submit.prevent="handleSubmit"
    >
      <FormError
        :message="errorMessage"
        :errors="validationErrors"
      />

      <div class="grid gap-6 lg:grid-cols-[1fr_360px]">
        <div class="space-y-6">
          <div class="app-card p-6 md:p-8">
            <p class="section-eyebrow">Achievement Details</p>

            <div class="mt-6 space-y-5">
              <div>
                <label for="ach-title" class="text-sm font-semibold text-app-text">Title</label>
                <input
                  id="ach-title"
                  v-model="form.title"
                  type="text"
                  class="input mt-2"
                  placeholder="AWS Certified Solutions Architect"
                  required
                >
              </div>

              <div>
                <label for="ach-issuer" class="text-sm font-semibold text-app-text">Issuer</label>
                <input
                  id="ach-issuer"
                  v-model="form.issuer"
                  type="text"
                  class="input mt-2"
                  placeholder="Amazon Web Services"
                >
              </div>

              <div>
                <label for="ach-desc" class="text-sm font-semibold text-app-text">Description</label>
                <textarea
                  id="ach-desc"
                  v-model="form.description"
                  class="input mt-2 min-h-32"
                  placeholder="Deskripsi achievement..."
                />
              </div>
            </div>
          </div>

          <div class="app-card p-6 md:p-8">
            <p class="section-eyebrow">Credential</p>

            <div class="mt-6 space-y-5">
              <div>
                <label for="ach-cred" class="text-sm font-semibold text-app-text">Credential ID</label>
                <input
                  id="ach-cred"
                  v-model="form.credentialId"
                  type="text"
                  class="input mt-2"
                  placeholder="ABC123XYZ"
                >
              </div>

              <div>
                <label for="ach-url" class="text-sm font-semibold text-app-text">External URL</label>
                <input
                  id="ach-url"
                  v-model="form.externalUrl"
                  type="url"
                  class="input mt-2"
                  placeholder="https://..."
                >
              </div>

              <div>
                <label for="ach-cert" class="text-sm font-semibold text-app-text">Certificate File URL</label>
                <input
                  id="ach-cert"
                  v-model="form.certificateFile"
                  type="url"
                  class="input mt-2"
                  placeholder="https://..."
                >
              </div>
            </div>
          </div>
        </div>

        <aside class="space-y-6">
          <div class="app-card p-6">
            <p class="section-eyebrow">Settings</p>

            <div class="mt-6 space-y-5">
              <div>
                <label for="ach-cat" class="text-sm font-semibold text-app-text">Category</label>
                <input
                  id="ach-cat"
                  v-model="form.category"
                  type="text"
                  class="input mt-2"
                  placeholder="Certification, Award..."
                >
              </div>

              <div>
                <label for="ach-date" class="text-sm font-semibold text-app-text">Achieved At</label>
                <input
                  id="ach-date"
                  v-model="form.achievedAt"
                  type="date"
                  class="input mt-2"
                >
              </div>

              <div>
                <label for="ach-order" class="text-sm font-semibold text-app-text">Display Order</label>
                <input
                  id="ach-order"
                  v-model.number="form.displayOrder"
                  type="number"
                  class="input mt-2"
                >
              </div>

              <label class="flex items-center gap-3 rounded-xl border border-app-border dark:border-slate-700 bg-app-background dark:bg-slate-800 p-4">
                <input
                  v-model="form.isVisible"
                  type="checkbox"
                  class="h-4 w-4 rounded border-app-border text-brand-primary focus:ring-brand-primary"
                >
                <span class="text-sm font-semibold text-app-text">Visible on portfolio</span>
              </label>
            </div>
          </div>

          <div class="app-card p-6">
            <button
              type="submit"
              class="btn-primary w-full"
              :disabled="isSubmitting"
            >
              {{ isSubmitting ? 'Saving...' : 'Update Achievement' }}
            </button>
          </div>
        </aside>
      </div>
    </form>
  </div>
</template>

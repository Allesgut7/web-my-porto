<script setup lang="ts">
import { emptyExperienceForm } from '~/composables/useAdminExperiences'

definePageMeta({
  layout: 'admin',
})

const { createExperience } = useAdminExperiences()

const form = ref(emptyExperienceForm())
const isSubmitting = ref(false)
const errorMessage = ref('')
const validationErrors = ref<Record<string, string>>({})

useSeoMeta({
  title: 'Create Experience',
  description: 'Tambah pengalaman baru.',
})

function addTag(event: KeyboardEvent) {
  const input = event.target as HTMLInputElement
  const tag = input.value.trim()
  if (tag && !form.value.tags.includes(tag)) {
    form.value.tags = [...form.value.tags, tag]
  }
  input.value = ''
}

function removeTag(index: number) {
  form.value.tags = form.value.tags.filter((_, i) => i !== index)
}

async function handleSubmit() {
  errorMessage.value = ''
  validationErrors.value = {}
  isSubmitting.value = true

  try {
    const experience = await createExperience(form.value)
    await navigateTo({
      path: `/admin/experiences/${experience.id}`,
      query: { created: '1' },
    })
  } catch (error: any) {
    errorMessage.value =
      error?.data?.message ||
      error?.message ||
      'Gagal membuat pengalaman.'
    validationErrors.value = error?.data?.data?.errors || error?.data?.errors || {}
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <div>
    <div class="mb-8">
      <NuxtLink
        to="/admin/experiences"
        class="text-sm font-semibold text-brand-primary hover:text-blue-800 dark:hover:text-blue-400"
      >
        ← Back to experiences
      </NuxtLink>

      <p class="section-eyebrow mt-6">Create</p>
      <h1 class="section-title">Create Experience</h1>
      <p class="section-description">
        Tambah pengalaman kerja, pendidikan, atau sertifikasi baru.
      </p>
    </div>

    <form
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
            <p class="section-eyebrow">Experience Details</p>

            <div class="mt-6 space-y-5">
              <div>
                <label for="exp-title" class="text-sm font-semibold text-app-text">Title</label>
                <input
                  id="exp-title"
                  v-model="form.title"
                  type="text"
                  class="input mt-2"
                  placeholder="Software Engineer"
                  required
                >
              </div>

              <div>
                <label for="exp-org" class="text-sm font-semibold text-app-text">Organization</label>
                <input
                  id="exp-org"
                  v-model="form.organization"
                  type="text"
                  class="input mt-2"
                  placeholder="Acme Corp"
                  required
                >
              </div>

              <div>
                <label for="exp-desc" class="text-sm font-semibold text-app-text">Description</label>
                <textarea
                  id="exp-desc"
                  v-model="form.description"
                  class="input mt-2 min-h-32"
                  placeholder="Deskripsi pengalaman..."
                />
              </div>
            </div>
          </div>

          <div class="app-card p-6 md:p-8">
            <p class="section-eyebrow">Tags</p>

            <div class="mt-6 space-y-4">
              <div class="flex flex-wrap gap-2">
                <span
                  v-for="(tag, index) in form.tags"
                  :key="index"
                  class="inline-flex items-center gap-1 rounded-full bg-brand-soft dark:bg-blue-950 px-3 py-1 text-sm font-medium text-app-text dark:text-slate-100"
                >
                  {{ tag }}
                  <button
                    type="button"
                    class="ml-1 text-app-muted hover:text-red-600"
                    @click="removeTag(index)"
                  >
                    ×
                  </button>
                </span>
              </div>
              <input
                type="text"
                class="input"
                placeholder="Type a tag and press Enter..."
                @keydown.enter.prevent="addTag"
              >
            </div>
          </div>
        </div>

        <aside class="space-y-6">
          <div class="app-card p-6">
            <p class="section-eyebrow">Settings</p>

            <div class="mt-6 space-y-5">
              <div>
                <label for="exp-type" class="text-sm font-semibold text-app-text">Type</label>
                <select
                  id="exp-type"
                  v-model="form.type"
                  class="input mt-2"
                >
                  <option value="work">Work</option>
                  <option value="education">Education</option>
                  <option value="certification">Certification</option>
                </select>
              </div>

              <div>
                <label for="exp-order" class="text-sm font-semibold text-app-text">Display Order</label>
                <input
                  id="exp-order"
                  v-model.number="form.displayOrder"
                  type="number"
                  class="input mt-2"
                >
              </div>
            </div>
          </div>

          <div class="app-card p-6">
            <p class="section-eyebrow">Period</p>

            <div class="mt-6 space-y-5">
              <div>
                <label for="exp-start" class="text-sm font-semibold text-app-text">Start Date</label>
                <input
                  id="exp-start"
                  v-model="form.startDate"
                  type="date"
                  class="input mt-2"
                  required
                >
              </div>

              <div>
                <label for="exp-end" class="text-sm font-semibold text-app-text">End Date</label>
                <input
                  id="exp-end"
                  v-model="form.endDate"
                  type="date"
                  class="input mt-2"
                  :disabled="form.isCurrent"
                >
              </div>

              <label class="flex items-center gap-3 rounded-xl border border-app-border dark:border-slate-700 bg-app-background dark:bg-slate-800 p-4">
                <input
                  v-model="form.isCurrent"
                  type="checkbox"
                  class="h-4 w-4 rounded border-app-border text-brand-primary focus:ring-brand-primary"
                >
                <span class="text-sm font-semibold text-app-text">Currently active</span>
              </label>
            </div>
          </div>

          <div class="app-card p-6">
            <button
              type="submit"
              class="btn-primary w-full"
              :disabled="isSubmitting"
            >
              {{ isSubmitting ? 'Saving...' : 'Create Experience' }}
            </button>
          </div>
        </aside>
      </div>
    </form>
  </div>
</template>

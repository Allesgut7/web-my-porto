<script setup lang="ts">
import { emptyTechStackForm } from '~/composables/useAdminTechStacks'

definePageMeta({
  layout: 'admin',
})

const { createTechStack } = useAdminTechStacks()

const form = ref(emptyTechStackForm())
const isSubmitting = ref(false)
const errorMessage = ref('')
const validationErrors = ref<Record<string, string>>({})

useSeoMeta({
  title: 'Create Tech Stack',
  description: 'Tambah tech stack baru.',
})

async function handleSubmit() {
  errorMessage.value = ''
  validationErrors.value = {}
  isSubmitting.value = true

  try {
    const techStack = await createTechStack(form.value)
    await navigateTo({
      path: `/admin/tech-stacks/${techStack.id}`,
      query: { created: '1' },
    })
  } catch (error: any) {
    errorMessage.value =
      error?.data?.message ||
      error?.message ||
      'Gagal membuat tech stack.'
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
        to="/admin/tech-stacks"
        class="text-sm font-semibold text-brand-primary hover:text-blue-800 dark:hover:text-blue-400"
      >
        ← Back to tech stacks
      </NuxtLink>

      <p class="section-eyebrow mt-6">Create</p>
      <h1 class="section-title">Create Tech Stack</h1>
      <p class="section-description">
        Tambah tech stack atau teknologi baru.
      </p>
    </div>

    <form
      class="max-w-2xl space-y-6"
      @submit.prevent="handleSubmit"
    >
      <FormError
        :message="errorMessage"
        :errors="validationErrors"
      />

      <div class="app-card p-6 md:p-8">
        <p class="section-eyebrow">Tech Stack Details</p>

        <div class="mt-6 space-y-5">
          <div>
            <label for="ts-name" class="text-sm font-semibold text-app-text">Name</label>
            <input
              id="ts-name"
              v-model="form.name"
              type="text"
              class="input mt-2"
              placeholder="Vue.js"
              required
            >
          </div>

          <div>
            <label for="ts-cat" class="text-sm font-semibold text-app-text">Category</label>
            <input
              id="ts-cat"
              v-model="form.category"
              type="text"
              class="input mt-2"
              placeholder="Frontend, Backend, DevOps..."
            >
          </div>

          <div>
            <label for="ts-icon" class="text-sm font-semibold text-app-text">Icon URL</label>
            <input
              id="ts-icon"
              v-model="form.iconUrl"
              type="url"
              class="input mt-2"
              placeholder="https://..."
            >
          </div>

          <div>
            <label for="ts-order" class="text-sm font-semibold text-app-text">Display Order</label>
            <input
              id="ts-order"
              v-model.number="form.displayOrder"
              type="number"
              class="input mt-2"
            >
          </div>
        </div>
      </div>

      <div class="app-card p-6">
        <button
          type="submit"
          class="btn-primary w-full"
          :disabled="isSubmitting"
        >
          {{ isSubmitting ? 'Saving...' : 'Create Tech Stack' }}
        </button>
      </div>
    </form>
  </div>
</template>

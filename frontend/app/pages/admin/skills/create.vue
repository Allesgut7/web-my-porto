<script setup lang="ts">
import { emptySkillForm } from '~/composables/useAdminSkills'

definePageMeta({
  layout: 'admin',
})

const { createSkill } = useAdminSkills()

const form = ref(emptySkillForm())
const isSubmitting = ref(false)
const errorMessage = ref('')
const validationErrors = ref<Record<string, string>>({})

useSeoMeta({
  title: 'Create Skill',
  description: 'Tambah skill baru.',
})

async function handleSubmit() {
  errorMessage.value = ''
  validationErrors.value = {}
  isSubmitting.value = true

  try {
    const skill = await createSkill(form.value)
    await navigateTo({
      path: `/admin/skills/${skill.id}`,
      query: { created: '1' },
    })
  } catch (error: any) {
    errorMessage.value =
      error?.data?.message ||
      error?.message ||
      'Gagal membuat skill.'
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
        to="/admin/skills"
        class="text-sm font-semibold text-brand-primary hover:text-blue-800 dark:hover:text-blue-400"
      >
        ← Back to skills
      </NuxtLink>

      <p class="section-eyebrow mt-6">Create</p>
      <h1 class="section-title">Create Skill</h1>
      <p class="section-description">
        Tambah skill atau kemampuan teknis baru.
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
        <p class="section-eyebrow">Skill Details</p>

        <div class="mt-6 space-y-5">
          <div>
            <label for="sk-name" class="text-sm font-semibold text-app-text">Name</label>
            <input
              id="sk-name"
              v-model="form.name"
              type="text"
              class="input mt-2"
              placeholder="TypeScript"
              required
            >
          </div>

          <div>
            <label for="sk-cat" class="text-sm font-semibold text-app-text">Category</label>
            <input
              id="sk-cat"
              v-model="form.category"
              type="text"
              class="input mt-2"
              placeholder="Frontend, Backend, DevOps..."
            >
          </div>

          <div>
            <label for="sk-level" class="text-sm font-semibold text-app-text">Level</label>
            <select
              id="sk-level"
              v-model="form.level"
              class="input mt-2"
            >
              <option value="">-</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
              <option value="expert">Expert</option>
            </select>
          </div>

          <div>
            <label for="sk-icon" class="text-sm font-semibold text-app-text">Icon URL</label>
            <input
              id="sk-icon"
              v-model="form.iconUrl"
              type="url"
              class="input mt-2"
              placeholder="https://..."
            >
          </div>

          <div>
            <label for="sk-order" class="text-sm font-semibold text-app-text">Display Order</label>
            <input
              id="sk-order"
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
          {{ isSubmitting ? 'Saving...' : 'Create Skill' }}
        </button>
      </div>
    </form>
  </div>
</template>

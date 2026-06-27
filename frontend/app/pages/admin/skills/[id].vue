<script setup lang="ts">
import { emptySkillForm, skillToForm } from '~/composables/useAdminSkills'

definePageMeta({
  layout: 'admin',
})

const successMessage = ref('')
const route = useRoute()
const id = computed(() => String(route.params.id || ''))

const { getSkill, updateSkill } = useAdminSkills()

const form = ref(emptySkillForm())
const isSubmitting = ref(false)
const errorMessage = ref('')
const validationErrors = ref<Record<string, string>>({})

const { data: skill, pending, error, refresh } = useAsyncData(
  `admin-skill-${id.value}`,
  () => getSkill(id.value),
  { watch: [id] },
)

watch(
  skill,
  (value) => {
    if (value) {
      form.value = skillToForm(value)
    }
  },
  { immediate: true },
)

useSeoMeta({
  title: () => skill.value?.name ? `Edit ${skill.value.name}` : 'Edit Skill',
  description: 'Edit skill.',
})

onMounted(() => {
  if (route.query.created === '1') {
    successMessage.value = 'Skill berhasil dibuat. Kamu sekarang bisa melengkapi atau mengedit detail.'
  }
})

async function handleSubmit() {
  errorMessage.value = ''
  successMessage.value = ''
  validationErrors.value = {}
  isSubmitting.value = true

  try {
    const updated = await updateSkill(id.value, form.value)
    form.value = skillToForm(updated)
    successMessage.value = 'Skill berhasil diperbarui.'
    await refresh()
  } catch (error: any) {
    errorMessage.value =
      error?.data?.message ||
      error?.message ||
      'Gagal update skill.'
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
        to="/admin/skills"
        class="text-sm font-semibold text-brand-primary hover:text-blue-800 dark:hover:text-blue-400"
      >
        ← Back to skills
      </NuxtLink>

      <p class="section-eyebrow mt-6">Edit</p>
      <h1 class="section-title">
        {{ skill?.name || 'Edit Skill' }}
      </h1>
      <p class="section-description">
        Update detail skill.
      </p>
    </div>

    <LoadingState v-if="pending" />

    <ErrorState
      v-else-if="error"
      title="Skill gagal dimuat"
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
          {{ isSubmitting ? 'Saving...' : 'Update Skill' }}
        </button>
      </div>
    </form>
  </div>
</template>

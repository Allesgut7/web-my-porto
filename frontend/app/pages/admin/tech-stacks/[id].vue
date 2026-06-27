<script setup lang="ts">
import { emptyTechStackForm, techStackToForm } from '~/composables/useAdminTechStacks'

definePageMeta({
  layout: 'admin',
})

const successMessage = ref('')
const route = useRoute()
const id = computed(() => String(route.params.id || ''))

const { getTechStack, updateTechStack } = useAdminTechStacks()

const form = ref(emptyTechStackForm())
const isSubmitting = ref(false)
const errorMessage = ref('')
const validationErrors = ref<Record<string, string>>({})

const { data: techStack, pending, error, refresh } = useAsyncData(
  `admin-tech-stack-${id.value}`,
  () => getTechStack(id.value),
  { watch: [id] },
)

watch(
  techStack,
  (value) => {
    if (value) {
      form.value = techStackToForm(value)
    }
  },
  { immediate: true },
)

useSeoMeta({
  title: () => techStack.value?.name ? `Edit ${techStack.value.name}` : 'Edit Tech Stack',
  description: 'Edit tech stack.',
})

onMounted(() => {
  if (route.query.created === '1') {
    successMessage.value = 'Tech stack berhasil dibuat. Kamu sekarang bisa melengkapi atau mengedit detail.'
  }
})

async function handleSubmit() {
  errorMessage.value = ''
  successMessage.value = ''
  validationErrors.value = {}
  isSubmitting.value = true

  try {
    const updated = await updateTechStack(id.value, form.value)
    form.value = techStackToForm(updated)
    successMessage.value = 'Tech stack berhasil diperbarui.'
    await refresh()
  } catch (error: any) {
    errorMessage.value =
      error?.data?.message ||
      error?.message ||
      'Gagal update tech stack.'
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
        to="/admin/tech-stacks"
        class="text-sm font-semibold text-brand-primary hover:text-blue-800 dark:hover:text-blue-400"
      >
        ← Back to tech stacks
      </NuxtLink>

      <p class="section-eyebrow mt-6">Edit</p>
      <h1 class="section-title">
        {{ techStack?.name || 'Edit Tech Stack' }}
      </h1>
      <p class="section-description">
        Update detail tech stack.
      </p>
    </div>

    <LoadingState v-if="pending" />

    <ErrorState
      v-else-if="error"
      title="Tech Stack gagal dimuat"
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
          {{ isSubmitting ? 'Saving...' : 'Update Tech Stack' }}
        </button>
      </div>
    </form>
  </div>
</template>

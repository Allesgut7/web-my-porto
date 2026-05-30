<script setup lang="ts">
import { emptyProjectForm } from '~/types/admin-project'

definePageMeta({
  layout: 'admin',
})

const { createProject } = useAdminProjects()

const form = ref(emptyProjectForm())
const isSubmitting = ref(false)
const errorMessage = ref('')
const successMessage = ref('')
const validationErrors = ref<Record<string, string>>({})

useSeoMeta({
  title: 'Create Project',
  description: 'Tambah project portfolio.',
})

async function handleSubmit() {
  errorMessage.value = ''
  successMessage.value = ''
  validationErrors.value = {}
  isSubmitting.value = true

  try {
    const project = await createProject(form.value)

    await navigateTo({
      path: `/admin/projects/${project.id}`,
      query: {
        created: '1',
      },
    })
  } catch (error: any) {
    errorMessage.value =
      error?.data?.message ||
      error?.message ||
      'Gagal membuat project.'

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
        to="/admin/projects"
        class="text-sm font-semibold text-brand-primary hover:text-blue-800"
      >
        ← Back to projects
      </NuxtLink>

      <p class="section-eyebrow mt-6">Create</p>
      <h1 class="section-title">Create Project</h1>
      <p class="section-description">
        Buat project baru. Gunakan status draft jika belum siap tampil di public portfolio.
      </p>
    </div>

    <!-- <SuccessState
      v-if="successMessage"
      class="mb-6"
      title="Create berhasil"
      :message="successMessage"
    /> -->

    <ProjectForm
      v-model="form"
      submit-label="Create Project"
      :is-submitting="isSubmitting"
      :error-message="errorMessage"
      :validation-errors="validationErrors"
      @submit="handleSubmit"
    />
  </div>
</template>
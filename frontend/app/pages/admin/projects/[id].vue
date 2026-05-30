<script setup lang="ts">
import { emptyProjectForm, projectToForm } from '~/types/admin-project'

definePageMeta({
  layout: 'admin',
})

const successMessage = ref('')
const route = useRoute()
const id = computed(() => String(route.params.id || ''))

const { getProject, updateProject } = useAdminProjects()

const form = ref(emptyProjectForm())
const isSubmitting = ref(false)
const errorMessage = ref('')
const validationErrors = ref<Record<string, string>>({})

const { data: project, pending, error, refresh } = useAsyncData(
  `admin-project-${id.value}`,
  () => getProject(id.value),
  {
    watch: [id],
  },
)

watch(
  project,
  (value) => {
    if (value) {
      form.value = projectToForm(value)
    }
  },
  { immediate: true },
)

useSeoMeta({
  title: () => project.value?.title ? `Edit ${project.value.title}` : 'Edit Project',
  description: 'Edit project portfolio.',
})

onMounted(() => {
  if (route.query.created === '1') {
    successMessage.value = 'Project berhasil dibuat. Kamu sekarang bisa melengkapi atau mengedit detail project.'
  }
})

async function handleSubmit() {
  errorMessage.value = ''
  successMessage.value = ''
  validationErrors.value = {}
  isSubmitting.value = true

  try {
    const updated = await updateProject(id.value, form.value)
    form.value = projectToForm(updated)
    successMessage.value = 'Project berhasil diperbarui.'
    await refresh()
  } catch (error: any) {
    errorMessage.value =
      error?.data?.message ||
      error?.message ||
      'Gagal update project.'

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
        to="/admin/projects"
        class="text-sm font-semibold text-brand-primary hover:text-blue-800"
      >
        ← Back to projects
      </NuxtLink>

      <p class="section-eyebrow mt-6">Edit</p>
      <h1 class="section-title">
        {{ project?.title || 'Edit Project' }}
      </h1>
      <p class="section-description">
        Update konten project, status publish, link external, dan thumbnail.
      </p>
    </div>

    <LoadingState v-if="pending" />

    <ErrorState
      v-else-if="error"
      title="Project gagal dimuat"
      :message="error.message"
      @retry="retry"
    />

    <SuccessState
      v-if="successMessage"
      class="mb-6"
      :title="route.query.created === '1' ? 'Create berhasil' : 'Update berhasil'"
      :message="successMessage"
    />

    <ProjectForm
      v-else
      v-model="form"
      submit-label="Update Project"
      :is-submitting="isSubmitting"
      :error-message="errorMessage"
      :validation-errors="validationErrors"
      @submit="handleSubmit"
    />
  </div>
</template>
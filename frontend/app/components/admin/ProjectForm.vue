<script setup lang="ts">
import type { ProjectFormState, ProjectStatus } from '~/types/admin-project'

const props = defineProps<{
  modelValue: ProjectFormState
  isSubmitting?: boolean
  submitLabel?: string
  errorMessage?: string
  validationErrors?: Record<string, string>
}>()

const emit = defineEmits<{
  'update:modelValue': [value: ProjectFormState]
  submit: []
}>()

const form = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
})

const statusOptions: ProjectStatus[] = ['draft', 'published', 'archived']

function updateField<K extends keyof ProjectFormState>(key: K, value: ProjectFormState[K]) {
  emit('update:modelValue', {
    ...props.modelValue,
    [key]: value,
  })
}

function updateSlugFromTitle() {
  if (form.value.slug) return

  const slug = form.value.title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')

  updateField('slug', slug)
}

function handleThumbnailUploaded(payload: { id: string; url: string }) {
  emit('update:modelValue', {
    ...props.modelValue,
    thumbnailFileId: payload.id,
    thumbnailUrl: payload.url,
  })
}

function handleSubmit() {
  emit('submit')
}
</script>

<template>
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
          <p class="section-eyebrow">Project Content</p>

          <div class="mt-6 space-y-5">
            <div>
              <label for="pf-title" class="text-sm font-semibold text-app-text">Title</label>
              <input
                id="pf-title"
                :value="form.title"
                type="text"
                class="input mt-2"
                placeholder="Sales Analytics Dashboard"
                required
                @input="updateField('title', ($event.target as HTMLInputElement).value)"
                @blur="updateSlugFromTitle"
              >
            </div>

            <div>
              <label for="pf-slug" class="text-sm font-semibold text-app-text">Slug</label>
              <input
                id="pf-slug"
                :value="form.slug"
                type="text"
                class="input mt-2 font-mono"
                placeholder="sales-analytics-dashboard"
                required
                @input="updateField('slug', ($event.target as HTMLInputElement).value)"
              >
            </div>

            <div>
              <label for="pf-short-desc" class="text-sm font-semibold text-app-text">Short Description</label>
              <textarea
                id="pf-short-desc"
                :value="form.shortDescription"
                class="input mt-2 min-h-28"
                placeholder="Deskripsi singkat project..."
                @input="updateField('shortDescription', ($event.target as HTMLTextAreaElement).value)"
              />
            </div>

            <div>
              <label for="pf-desc" class="text-sm font-semibold text-app-text">Description</label>
              <textarea
                id="pf-desc"
                :value="form.description"
                class="input mt-2 min-h-44"
                placeholder="Deskripsi detail project..."
                @input="updateField('description', ($event.target as HTMLTextAreaElement).value)"
              />
            </div>
          </div>
        </div>

        <div class="app-card p-6 md:p-8">
          <p class="section-eyebrow">External Links</p>

          <div class="mt-6 grid gap-5 md:grid-cols-3">
            <div>
              <label for="pf-demo" class="text-sm font-semibold text-app-text">Demo URL</label>
              <input
                id="pf-demo"
                :value="form.demoUrl"
                type="url"
                class="input mt-2"
                placeholder="https://..."
                @input="updateField('demoUrl', ($event.target as HTMLInputElement).value)"
              >
            </div>

            <div>
              <label for="pf-repo" class="text-sm font-semibold text-app-text">Repository URL</label>
              <input
                id="pf-repo"
                :value="form.repositoryUrl"
                type="url"
                class="input mt-2"
                placeholder="https://github.com/..."
                @input="updateField('repositoryUrl', ($event.target as HTMLInputElement).value)"
              >
            </div>

            <div>
              <label for="pf-docs" class="text-sm font-semibold text-app-text">Documentation URL</label>
              <input
                id="pf-docs"
                :value="form.documentationUrl"
                type="url"
                class="input mt-2"
                placeholder="https://..."
                @input="updateField('documentationUrl', ($event.target as HTMLInputElement).value)"
              >
            </div>
          </div>
        </div>
      </div>

      <aside class="space-y-6">
        <div class="app-card p-6">
          <p class="section-eyebrow">Publish Settings</p>

          <div class="mt-6 space-y-5">
            <div>
              <label for="pf-status" class="text-sm font-semibold text-app-text">Status</label>
              <select
                id="pf-status"
                :value="form.status"
                class="input mt-2"
                @change="updateField('status', ($event.target as HTMLSelectElement).value as ProjectStatus)"
              >
                <option
                  v-for="status in statusOptions"
                  :key="status"
                  :value="status"
                >
                  {{ status }}
                </option>
              </select>
            </div>

            <div>
              <label for="pf-type" class="text-sm font-semibold text-app-text">Project Type</label>
              <input
                id="pf-type"
                :value="form.projectType"
                type="text"
                class="input mt-2"
                placeholder="Backend, Dashboard, IoT..."
                @input="updateField('projectType', ($event.target as HTMLInputElement).value)"
              >
            </div>

            <div>
              <label for="pf-order" class="text-sm font-semibold text-app-text">Display Order</label>
              <input
                id="pf-order"
                :value="form.displayOrder"
                type="number"
                class="input mt-2"
                @input="updateField('displayOrder', Number(($event.target as HTMLInputElement).value))"
              >
            </div>

            <label class="flex items-center gap-3 rounded-xl border border-app-border bg-app-background p-4">
              <input
                :checked="form.isFeatured"
                type="checkbox"
                class="h-4 w-4 rounded border-app-border text-brand-primary focus:ring-brand-primary"
                @change="updateField('isFeatured', ($event.target as HTMLInputElement).checked)"
              >
              <span class="text-sm font-semibold text-app-text">Featured project</span>
            </label>
          </div>
        </div>

        <div class="app-card p-6">
          <p class="section-eyebrow">Timeline</p>

          <div class="mt-6 space-y-5">
            <div>
              <label for="pf-started" class="text-sm font-semibold text-app-text">Started At</label>
              <input
                id="pf-started"
                :value="form.startedAt"
                type="date"
                class="input mt-2"
                @input="updateField('startedAt', ($event.target as HTMLInputElement).value)"
              >
            </div>

            <div>
              <label for="pf-completed" class="text-sm font-semibold text-app-text">Completed At</label>
              <input
                id="pf-completed"
                :value="form.completedAt"
                type="date"
                class="input mt-2"
                @input="updateField('completedAt', ($event.target as HTMLInputElement).value)"
              >
            </div>
          </div>
        </div>

        <div class="app-card p-6">
          <p class="section-eyebrow">Thumbnail</p>

          <ThumbnailUpload
            v-model="form.thumbnailUrl"
            class="mt-6"

            :preview-url="form.thumbnailUrl"
            @uploaded="handleThumbnailUploaded"
          />
        </div>

        <div class="app-card p-6">
          <button
            type="submit"
            class="btn-primary w-full"
            :disabled="isSubmitting"
          >
            {{ isSubmitting ? 'Saving...' : submitLabel || 'Save Project' }}
          </button>
        </div>
      </aside>
    </div>
  </form>
</template>
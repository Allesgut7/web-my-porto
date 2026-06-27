<script setup lang="ts">
defineProps<{
  modelValue: string
  previewUrl?: string
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
  'update:model-value': [value: string]
  'update:previewUrl': [value: string]
  'update:preview-url': [value: string]
  uploaded: [payload: { id: string; url: string }]
}>()

const { uploadImage } = useUploads()

const isUploading = ref(false)
const errorMessage = ref('')

async function handleFileChange(event: Event) {
  const input = event.target as HTMLInputElement
  const file = input.files?.[0]

  if (!file) return

  errorMessage.value = ''

  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp']

  if (!allowedTypes.includes(file.type)) {
    errorMessage.value = 'Format gambar harus JPG, PNG, atau WebP.'
    return
  }

  const MAX_SIZE = 5 * 1024 * 1024
  if (file.size > MAX_SIZE) {
    errorMessage.value = 'Ukuran file maksimal 5 MB.'
    return
  }

  isUploading.value = true

  try {
    const uploaded = await uploadImage(file, 'thumbnail')

    emit('update:modelValue', uploaded.id)
    emit('update:model-value', uploaded.id)
    emit('update:previewUrl', uploaded.fileUrl)
    emit('update:preview-url', uploaded.fileUrl)
    emit('uploaded', {
      id: uploaded.id,
      url: uploaded.fileUrl,
    })
  } catch (error: any) {
    errorMessage.value =
      error?.data?.message ||
      error?.statusMessage ||
      error?.message ||
      'Gagal upload gambar.'
  } finally {
    isUploading.value = false
    input.value = ''
  }
}
</script>

<template>
  <div class="space-y-4">
    <div class="technical-grid aspect-[16/10] overflow-hidden rounded-2xl border border-app-border bg-brand-soft">
      <img
        v-if="previewUrl"
        :src="previewUrl"
        alt="Preview thumbnail project"
        class="h-full w-full object-cover"
      >

      <div
        v-else
        class="flex h-full items-center justify-center p-6 text-center"
      >
        <div>
          <p class="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-brand-primary">
            Thumbnail
          </p>
          <p class="mt-2 text-sm text-app-muted">
            Upload image from backend Upload API
          </p>
        </div>
      </div>
    </div>

    <label class="block">
      <span class="sr-only">Upload thumbnail</span>
      <input
        type="file"
        accept="image/jpeg,image/png,image/webp"
        class="block w-full cursor-pointer rounded-xl border border-app-border bg-white text-sm text-app-muted file:mr-4 file:border-0 file:bg-brand-primary file:px-5 file:py-3 file:text-sm file:font-semibold file:text-white hover:file:bg-blue-800"
        :disabled="isUploading"
        @change="handleFileChange"
      >
    </label>

    <p
      v-if="isUploading"
      class="text-sm text-app-muted"
    >
      Uploading image...
    </p>

    <p
      v-if="errorMessage"
      class="text-sm font-medium text-red-600"
    >
      {{ errorMessage }}
    </p>

    <p
      v-if="modelValue"
      class="font-mono text-xs text-app-muted"
    >
      thumbnailFileId: {{ modelValue }}
    </p>
  </div>
</template>
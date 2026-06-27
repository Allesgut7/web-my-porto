<script setup lang="ts">
defineProps<{
  title?: string
  message?: string
}>()

const emit = defineEmits<{
  retry: []
}>()

function handleRetry() {
  emit('retry')
}
</script>

<template>
  <div role="alert" aria-live="assertive" class="app-card border-red-100 bg-red-50/50 p-6 md:p-8">
    <p class="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-red-600">
      Request Failed
    </p>

    <h3 class="mt-3 text-xl font-bold text-app-text">
      {{ title || 'Data gagal dimuat' }}
    </h3>

    <p class="mt-3 max-w-2xl text-sm leading-6 text-app-muted">
      {{ message || 'Terjadi kesalahan saat mengambil data dari server.' }}
    </p>

    <button
      type="button"
      class="btn-primary mt-6"
      @click="handleRetry"
    >
      Coba lagi
    </button>
  </div>
</template>
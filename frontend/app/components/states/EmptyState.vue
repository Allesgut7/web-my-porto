<script setup lang="ts">
defineProps<{
  title?: string
  message?: string
}>()
</script>

<template>
  <div class="technical-grid app-card p-8 text-center md:p-10">
    <div class="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-soft text-brand-primary">
      <span class="font-mono text-sm font-bold">[]</span>
    </div>

    <h3 class="mt-5 text-xl font-bold text-app-text">
      {{ title || 'Data belum tersedia' }}
    </h3>

    <p class="mx-auto mt-3 max-w-md text-sm leading-6 text-app-muted">
      {{ message || 'Konten akan tampil otomatis setelah data tersedia dari backend.' }}
    </p>
  </div>
</template>
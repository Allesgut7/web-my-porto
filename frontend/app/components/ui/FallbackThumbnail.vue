<script setup lang="ts">
withDefaults(
  defineProps<{
    title?: string
    label?: string
  }>(),
  {
    title: 'Project',
    label: 'Portfolio Work',
  },
)
</script>

<template>
  <div class="technical-grid flex h-full min-h-[220px] items-center justify-center bg-gradient-to-br from-blue-50 via-white to-cyan-50 p-6">
    <div class="max-w-xs text-center">
      <div class="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-soft ring-1 ring-blue-100">
        <span class="font-mono text-lg font-bold text-brand-primary">
          { }
        </span>
      </div>

      <p class="font-mono text-xs font-semibold uppercase tracking-[0.22em] text-brand-primary">
        {{ label }}
      </p>

      <p class="mt-3 text-lg font-bold text-app-text">
        {{ title }}
      </p>
    </div>
  </div>
</template>
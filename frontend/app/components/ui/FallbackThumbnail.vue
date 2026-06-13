<script setup lang="ts">
defineProps<{
  projectType?: string | null
  title?: string
}>()
</script>

<template>
  <div class="flex h-full w-full items-center justify-center bg-[#0a0f1a] p-6 text-center relative overflow-hidden">
    <!-- Animated dot grid background -->
    <div class="bg-grid-dark bg-grid-animate absolute inset-0 opacity-50" />

    <!-- Circuit pattern overlay -->
    <CircuitPattern :opacity="0.12" color="dark" />

    <div class="relative z-10">
      <!-- Animated LED indicator -->
      <div class="mb-4 mx-auto flex justify-center">
        <span class="relative flex h-3 w-3">
          <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75" />
          <span class="relative inline-flex h-3 w-3 rounded-full bg-cyan-500" />
        </span>
      </div>

      <p class="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-cyan-400">
        {{ projectType || 'Project' }}
      </p>

      <p
        v-if="title"
        class="mt-2 text-lg font-bold text-white font-display"
      >
        {{ title }}
      </p>

      <!-- Decorative trace lines -->
      <svg
        class="mx-auto mt-4 h-8 w-32"
        viewBox="0 0 128 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <line x1="0" y1="16" x2="40" y2="16" stroke="#1D4ED8" stroke-opacity="0.4" stroke-width="1" />
        <line x1="40" y1="16" x2="60" y2="4" stroke="#06B6D4" stroke-opacity="0.4" stroke-width="1" />
        <line x1="60" y1="4" x2="88" y2="4" stroke="#1D4ED8" stroke-opacity="0.4" stroke-width="1" />
        <line x1="40" y1="16" x2="60" y2="28" stroke="#F59E0B" stroke-opacity="0.4" stroke-width="1" />
        <line x1="60" y1="28" x2="88" y2="28" stroke="#06B6D4" stroke-opacity="0.4" stroke-width="1" />
        <line x1="88" y1="4" x2="108" y2="16" stroke="#1D4ED8" stroke-opacity="0.4" stroke-width="1" />
        <line x1="88" y1="28" x2="108" y2="16" stroke="#F59E0B" stroke-opacity="0.4" stroke-width="1" />
        <line x1="108" y1="16" x2="128" y2="16" stroke="#06B6D4" stroke-opacity="0.4" stroke-width="1" />
        <circle cx="60" cy="4" r="2" fill="#06B6D4" fill-opacity="0.6" />
        <circle cx="60" cy="28" r="2" fill="#F59E0B" fill-opacity="0.6" />
        <circle cx="108" cy="16" r="2" fill="#1D4ED8" fill-opacity="0.6" />
        <circle cx="40" cy="16" r="2" fill="#1D4ED8" fill-opacity="0.6" />
      </svg>
    </div>
  </div>
</template>

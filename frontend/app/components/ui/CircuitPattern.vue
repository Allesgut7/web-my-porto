<script setup lang="ts">
defineProps<{
  opacity?: number
  color?: 'light' | 'dark'
}>()
</script>

<template>
  <svg
    class="pointer-events-none absolute inset-0 h-full w-full"
    :style="{ opacity: opacity ?? 0.1 }"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <pattern id="circuit-svg" width="120" height="120" patternUnits="userSpaceOnUse">
        <!-- Nodes -->
        <circle cx="10" cy="10" r="2" :fill="color === 'dark' ? '#60A5FA' : '#1D4ED8'" fill-opacity="0.4" />
        <circle cx="60" cy="30" r="2" :fill="color === 'dark' ? '#22D3EE' : '#06B6D4'" fill-opacity="0.4" />
        <circle cx="110" cy="10" r="2" :fill="color === 'dark' ? '#60A5FA' : '#1D4ED8'" fill-opacity="0.4" />
        <circle cx="30" cy="70" r="2" :fill="color === 'dark' ? '#22D3EE' : '#06B6D4'" fill-opacity="0.4" />
        <circle cx="90" cy="60" r="2" :fill="color === 'dark' ? '#60A5FA' : '#1D4ED8'" fill-opacity="0.4" />
        <circle cx="60" cy="110" r="2" :fill="color === 'dark' ? '#22D3EE' : '#06B6D4'" fill-opacity="0.4" />

        <!-- Traces -->
        <line x1="10" y1="10" x2="60" y2="30" :stroke="color === 'dark' ? '#60A5FA' : '#1D4ED8'" stroke-opacity="0.2" stroke-width="1" />
        <line x1="60" y1="30" x2="110" y2="10" :stroke="color === 'dark' ? '#22D3EE' : '#06B6D4'" stroke-opacity="0.2" stroke-width="1" />
        <line x1="30" y1="70" x2="90" y2="60" :stroke="color === 'dark' ? '#60A5FA' : '#1D4ED8'" stroke-opacity="0.2" stroke-width="1" />
        <line x1="60" y1="30" x2="90" y2="60" :stroke="color === 'dark' ? '#22D3EE' : '#06B6D4'" stroke-opacity="0.15" stroke-width="1" />
        <line x1="90" y1="60" x2="60" y2="110" :stroke="color === 'dark' ? '#60A5FA' : '#1D4ED8'" stroke-opacity="0.2" stroke-width="1" />

        <!-- Right angle traces -->
        <polyline points="10,10 10,40 30,70" fill="none" :stroke="color === 'dark' ? '#60A5FA' : '#1D4ED8'" stroke-opacity="0.12" stroke-width="1" />
        <polyline points="110,10 110,40 90,60" fill="none" :stroke="color === 'dark' ? '#22D3EE' : '#06B6D4'" stroke-opacity="0.12" stroke-width="1" />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#circuit-svg)" />
  </svg>
</template>

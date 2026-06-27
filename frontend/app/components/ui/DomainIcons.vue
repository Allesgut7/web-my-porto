<script setup lang="ts">
type Domain = 'electrical' | 'iot' | 'data' | 'backend' | 'ml' | 'qa'

defineProps<{
  domain: Domain
  iconClass?: string
}>()
</script>

<template>
  <!-- Electrical Engineering -->
  <svg
    v-if="domain === 'electrical'"
    :class="iconClass"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="1.5"
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
  </svg>

  <!-- IoT -->
  <svg
    v-else-if="domain === 'iot'"
    :class="iconClass"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="1.5"
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    <path d="M5 12.55a11 11 0 0 1 14.08 0" />
    <path d="M1.42 9a16 16 0 0 1 21.16 0" />
    <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
    <circle cx="12" cy="20" r="1" fill="currentColor" />
  </svg>

  <!-- Data Science / Data Analysis -->
  <svg
    v-else-if="domain === 'data'"
    :class="iconClass"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="1.5"
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    <rect x="3" y="12" width="4" height="9" rx="1" />
    <rect x="10" y="7" width="4" height="14" rx="1" />
    <rect x="17" y="3" width="4" height="18" rx="1" />
  </svg>

  <!-- Backend -->
  <svg
    v-else-if="domain === 'backend'"
    :class="iconClass"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="1.5"
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    <rect x="2" y="2" width="20" height="8" rx="2" />
    <rect x="2" y="14" width="20" height="8" rx="2" />
    <circle cx="6" cy="6" r="1" fill="currentColor" />
    <circle cx="6" cy="18" r="1" fill="currentColor" />
    <path d="M10 6h8" />
    <path d="M10 18h8" />
  </svg>

  <!-- Machine Learning -->
  <svg
    v-else-if="domain === 'ml'"
    :class="iconClass"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="1.5"
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    <circle cx="6" cy="6" r="2" />
    <circle cx="18" cy="6" r="2" />
    <circle cx="6" cy="18" r="2" />
    <circle cx="18" cy="18" r="2" />
    <circle cx="12" cy="12" r="2" />
    <path d="M8 7l2 3.5" />
    <path d="M16 7l-2 3.5" />
    <path d="M8 17l2-3.5" />
    <path d="M16 17l-2-3.5" />
  </svg>

  <!-- QA Testing -->
  <svg
    v-else-if="domain === 'qa'"
    :class="iconClass"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="1.5"
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    <path d="M9 12l2 2 4-4" />
    <path d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" />
  </svg>
</template>

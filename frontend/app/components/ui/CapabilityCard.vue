<script setup lang="ts">
withDefaults(
  defineProps<{
    title: string
    description: string
    label?: string
    tone?: 'primary' | 'tech' | 'accent'
  }>(),
  {
    label: '',
    tone: 'primary',
  },
)

const toneClass = {
  primary: 'bg-brand-soft text-brand-primary ring-blue-100',
  tech: 'bg-cyan-50 text-cyan-700 ring-cyan-100',
  accent: 'bg-amber-50 text-amber-700 ring-amber-100',
}
</script>

<template>
  <div class="app-card app-card-hover p-6">
    <div
      v-if="label"
      class="mb-5 inline-flex rounded-full px-3 py-1 text-xs font-semibold ring-1"
      :class="toneClass[tone]"
    >
      {{ label }}
    </div>

    <h3 class="text-lg font-bold text-app-text">
      {{ title }}
    </h3>

    <p class="mt-3 text-sm leading-7 text-app-muted">
      {{ description }}
    </p>
  </div>
</template>
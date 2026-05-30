<script setup lang="ts">
withDefaults(
  defineProps<{
    label: string
    value: string
    description?: string
    tone?: 'primary' | 'tech' | 'accent'
  }>(),
  {
    description: '',
    tone: 'primary',
  },
)

const toneClass = {
  primary: 'text-brand-primary bg-brand-soft ring-blue-100',
  tech: 'text-cyan-700 bg-cyan-50 ring-cyan-100',
  accent: 'text-amber-700 bg-amber-50 ring-amber-100',
}
</script>

<template>
  <div class="glass-card rounded-3xl p-5 transition duration-300 hover:-translate-y-1 hover:shadow-card">
    <div
      class="mb-4 inline-flex rounded-2xl px-3 py-1 text-xs font-semibold ring-1"
      :class="toneClass[tone]"
    >
      {{ label }}
    </div>

    <p class="text-3xl font-bold tracking-tight text-app-text">
      {{ value }}
    </p>

    <p
      v-if="description"
      class="mt-2 text-sm leading-6 text-app-muted"
    >
      {{ description }}
    </p>
  </div>
</template>
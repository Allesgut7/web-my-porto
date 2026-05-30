<script setup lang="ts">
withDefaults(
  defineProps<{
    label: string
    tone?: 'primary' | 'tech' | 'accent' | 'neutral'
  }>(),
  {
    tone: 'neutral',
  },
)

const toneClass = {
  primary: 'bg-brand-soft text-brand-primary ring-blue-100',
  tech: 'bg-cyan-50 text-cyan-700 ring-cyan-100',
  accent: 'bg-amber-50 text-amber-700 ring-amber-100',
  neutral: 'bg-slate-50 text-slate-600 ring-slate-200',
}
</script>

<template>
  <span
    class="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ring-1 transition duration-300 hover:-translate-y-0.5"
    :class="toneClass[tone]"
  >
    {{ label }}
  </span>
</template>
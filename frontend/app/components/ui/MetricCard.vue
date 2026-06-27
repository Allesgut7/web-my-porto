<script setup lang="ts">
const props = withDefaults(defineProps<{
  label: string
  value: number
  suffix?: string
  color?: 'blue' | 'cyan' | 'amber'
}>(), {
  suffix: '',
  color: 'blue',
})

const { currentValue, elementRef } = useAnimatedCounter(() => props.value, {
  duration: 1200,
})

const colorClasses = computed(() => {
  switch (props.color) {
    case 'cyan':
      return 'from-cyan-100/80 dark:from-cyan-900/80 to-cyan-50/50 dark:to-cyan-950/50 border-cyan-200/60 dark:border-cyan-800/60 text-cyan-700 dark:text-cyan-400'
    case 'amber':
      return 'from-amber-100/80 dark:from-amber-900/80 to-amber-50/50 dark:to-amber-950/50 border-amber-200/60 dark:border-amber-800/60 text-amber-700 dark:text-amber-400'
    default:
      return 'from-blue-100/80 dark:from-blue-900/80 to-blue-50/50 dark:to-blue-950/50 border-blue-200/60 dark:border-blue-800/60 text-brand-primary dark:text-blue-400'
  }
})

const glowClass = computed(() => {
  switch (props.color) {
    case 'cyan': return 'hover:shadow-glow-cyan'
    case 'amber': return 'hover:shadow-glow-amber'
    default: return 'hover:shadow-glow-blue'
  }
})
</script>

<template>
  <div
    ref="elementRef"
    :class="['glass rounded-2xl border p-4 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 animate-float-subtle bg-gradient-to-br', colorClasses, glowClass]"
  >
    <p class="font-mono text-[10px] font-semibold uppercase tracking-[0.15em] opacity-60">
      {{ label }}
    </p>
    <p class="mt-2 text-2xl font-bold tabular-nums font-display">
      {{ currentValue }}{{ suffix }}
    </p>
  </div>
</template>

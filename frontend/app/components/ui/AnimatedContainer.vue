<script setup lang="ts">
import { useScrollReveal } from '~/composables/useScrollReveal'

const props = withDefaults(defineProps<{
  delay?: number
  direction?: 'up' | 'left' | 'right' | 'scale'
}>(), {
  delay: 0,
  direction: 'up',
})

const { elementRef, isRevealed } = useScrollReveal()

const revealClass = computed(() => {
  if (props.direction === 'left') return 'reveal-left'
  if (props.direction === 'right') return 'reveal-right'
  if (props.direction === 'scale') return 'reveal-scale'
  return 'reveal'
})

const delayStyle = computed(() =>
  props.delay > 0 ? `transition-delay: ${props.delay}ms` : undefined,
)
</script>

<template>
  <div
    ref="elementRef"
    :class="[revealClass, { revealed: isRevealed }]"
    :style="delayStyle"
  >
    <slot />
  </div>
</template>

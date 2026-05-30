<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    as?: string
    delay?: number
    class?: string
  }>(),
  {
    as: 'div',
    delay: 0,
    class: '',
  },
)

const style = computed(() => ({
  animationDelay: `${props.delay}ms`,
}))
</script>

<template>
  <component
    :is="as"
    class="animate-fade-up opacity-0"
    :class="props.class"
    :style="style"
  >
    <slot />
  </component>
</template>
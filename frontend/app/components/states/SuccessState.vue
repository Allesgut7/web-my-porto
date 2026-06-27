<script setup lang="ts">
const props = defineProps<{
  title?: string
  message?: string
}>()

const shouldShow = computed(() => {
  return Boolean(props.message || props.title)
})
</script>

<template>
  <div
    v-if="shouldShow"
    role="status"
    aria-live="polite"
    class="rounded-2xl border border-green-100 dark:border-green-900 bg-green-50 dark:bg-green-950 p-4"
  >
    <p
      v-if="title"
      class="text-sm font-semibold text-green-700 dark:text-green-400"
    >
      {{ title }}
    </p>

    <p
      v-if="message"
      class="mt-1 text-sm leading-6 text-green-700 dark:text-green-400"
    >
      {{ message }}
    </p>
  </div>
</template>
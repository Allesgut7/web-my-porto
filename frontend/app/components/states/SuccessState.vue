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
    class="rounded-2xl border border-green-100 bg-green-50 p-4"
  >
    <p
      v-if="title"
      class="text-sm font-semibold text-green-700"
    >
      {{ title }}
    </p>

    <p
      v-if="message"
      class="mt-1 text-sm leading-6 text-green-700"
    >
      {{ message }}
    </p>
  </div>
</template>
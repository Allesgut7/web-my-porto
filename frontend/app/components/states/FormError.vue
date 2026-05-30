<script setup lang="ts">
const props = defineProps<{
  message?: string
  errors?: Record<string, string>
}>()

const hasErrors = computed(() => {
  return Boolean(props.errors && Object.keys(props.errors).length > 0)
})

const shouldShow = computed(() => {
  return Boolean(props.message) || hasErrors.value
})
</script>

<template>
  <div
    v-if="shouldShow"
    class="rounded-2xl border border-red-100 bg-red-50 p-4"
  >
    <p
      v-if="message"
      class="text-sm font-semibold text-red-700"
    >
      {{ message }}
    </p>

    <ul
      v-if="hasErrors"
      class="mt-2 list-disc space-y-1 pl-5 text-sm text-red-700"
    >
      <li
        v-for="(error, field) in errors"
        :key="field"
      >
        {{ error }}
      </li>
    </ul>
  </div>
</template>
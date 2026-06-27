<script setup lang="ts">
import type { ProjectStatus } from '~/types/admin-project'

defineProps<{
  status: ProjectStatus
}>()
</script>

<template>
  <span
    class="badge"
    :class="{
      'border-green-100 bg-green-50 text-green-700 dark:border-green-900 dark:bg-green-950 dark:text-green-400': status === 'published',
      'border-amber-100 bg-amber-50 text-amber-700 dark:border-amber-900 dark:bg-amber-950 dark:text-amber-400': status === 'draft',
      'border-slate-200 bg-slate-100 text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400': status === 'archived',
    }"
  >
    {{ status }}
  </span>
</template>
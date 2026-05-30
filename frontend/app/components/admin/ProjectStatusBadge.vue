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
      'border-green-100 bg-green-50 text-green-700': status === 'published',
      'border-amber-100 bg-amber-50 text-amber-700': status === 'draft',
      'border-slate-200 bg-slate-100 text-slate-600': status === 'archived',
    }"
  >
    {{ status }}
  </span>
</template>
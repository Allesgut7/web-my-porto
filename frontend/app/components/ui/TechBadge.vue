<script setup lang="ts">
import type { TechStack } from '~/types/project'

defineProps<{
  tech: TechStack
}>()
</script>

<template>
  <span class="badge-tech">
    {{ tech.name }}
  </span>
</template>

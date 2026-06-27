<script setup lang="ts">
import type { TechStack } from '~/types/project'

defineProps<{
  tech: TechStack
}>()
</script>

<template>
  <span class="badge-tech transition-all duration-200 hover:scale-105 hover:-translate-y-0.5 hover:shadow-sm cursor-default">
    {{ tech.name }}
  </span>
</template>

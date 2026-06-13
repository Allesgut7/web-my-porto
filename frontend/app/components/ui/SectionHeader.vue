<script setup lang="ts">
defineProps<{
  eyebrow: string
  title: string
  description?: string
  align?: 'left' | 'center'
}>()
</script>

<template>
  <div :class="align === 'center' ? 'text-center' : ''">
    <p class="section-eyebrow">
      {{ eyebrow }}
    </p>
    <h2 class="mt-3 text-3xl font-bold tracking-tight text-app-text md:text-4xl lg:text-5xl font-display" :class="align === 'center' ? 'mx-auto' : ''">
      {{ title }}
    </h2>
    <p
      v-if="description"
      class="mt-4 max-w-2xl text-base leading-7 text-app-muted md:text-lg"
      :class="align === 'center' ? 'mx-auto' : ''"
    >
      {{ description }}
    </p>
  </div>
</template>

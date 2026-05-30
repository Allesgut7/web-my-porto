<script setup lang="ts">
withDefaults(
  defineProps<{
    eyebrow?: string
    title: string
    description?: string
  }>(),
  {
    eyebrow: '',
    description: '',
  },
)
</script>

<template>
  <section class="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-cyan-50 py-20 md:py-28">
    <div class="absolute inset-0 technical-grid opacity-70" />
    <div class="absolute -right-24 top-16 h-72 w-72 rounded-full bg-cyan-200/40 blur-3xl" />
    <div class="absolute -left-24 bottom-0 h-72 w-72 rounded-full bg-blue-200/40 blur-3xl" />

    <div class="app-container relative">
      <AnimatedContainer>
        <p
          v-if="eyebrow"
          class="section-eyebrow"
        >
          {{ eyebrow }}
        </p>

        <h1 class="mt-4 max-w-4xl text-4xl font-bold tracking-tight text-app-text md:text-6xl">
          {{ title }}
        </h1>

        <p
          v-if="description"
          class="mt-6 max-w-3xl text-lg leading-8 text-app-muted"
        >
          {{ description }}
        </p>
      </AnimatedContainer>
    </div>
  </section>
</template>
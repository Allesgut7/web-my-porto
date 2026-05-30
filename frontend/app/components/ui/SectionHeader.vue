<script setup lang="ts">
withDefaults(
  defineProps<{
    eyebrow?: string
    title: string
    description?: string
    align?: 'left' | 'center'
    dark?: boolean
  }>(),
  {
    eyebrow: '',
    description: '',
    align: 'left',
    dark: false,
  },
)
</script>

<template>
  <div
    :class="[
      align === 'center' ? 'mx-auto text-center' : '',
      'max-w-3xl',
    ]"
  >
    <p
      v-if="eyebrow"
      :class="[
        'section-eyebrow',
        dark ? 'text-cyan-300' : 'text-brand-primary',
      ]"
    >
      {{ eyebrow }}
    </p>

    <h2
      :class="[
        'mt-3 text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl',
        dark ? 'text-white' : 'text-app-text',
      ]"
    >
      {{ title }}
    </h2>

    <p
      v-if="description"
      :class="[
        'mt-4 text-base leading-8 md:text-lg',
        dark ? 'text-slate-300' : 'text-app-muted',
      ]"
    >
      {{ description }}
    </p>
  </div>
</template>
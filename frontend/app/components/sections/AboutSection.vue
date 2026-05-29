<script setup lang="ts">
import type { Profile } from '../../types/profile'

defineProps<{
  profile: Profile | null
}>()

const capabilities = [
  {
    title: 'Backend Engineering',
    label: 'API',
    description: 'REST API, authentication, database design, service layer, and maintainable backend architecture.',
  },
  {
    title: 'Data & Analytics',
    label: 'DATA',
    description: 'Structured data flow, dashboard analytics, reporting, and data-aware decision support.',
  },
  {
    title: 'QA & Reliability',
    label: 'QA',
    description: 'Validation, predictable behavior, edge case handling, and reliable user-facing systems.',
  },
  {
    title: 'Deployment & Systems',
    label: 'OPS',
    description: 'Dockerized services, environment configuration, storage integration, and production readiness.',
  },
]
</script>

<template>
  <section id="about" class="app-section bg-white">
    <div class="app-container">
      <div>
        <p class="section-eyebrow">
          01 / Profile
        </p>
        <h2 class="section-title">
          About the Developer
        </h2>
        <p class="section-description">
          {{ profile?.bio || 'A short professional profile will appear here after the profile data is available from the API.' }}
        </p>
      </div>

      <div class="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <article
          v-for="item in capabilities"
          :key="item.title"
          class="app-card app-card-hover p-6"
        >
          <div class="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-brand-soft font-mono text-xs font-bold text-brand-primary">
            {{ item.label }}
          </div>

          <h3 class="text-lg font-semibold text-app-text">
            {{ item.title }}
          </h3>

          <p class="mt-3 text-sm leading-6 text-app-muted">
            {{ item.description }}
          </p>
        </article>
      </div>
    </div>
  </section>
</template>
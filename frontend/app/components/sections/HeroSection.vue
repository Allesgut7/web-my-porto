<script setup lang="ts">
import type { Profile } from '../../types/profile'

defineProps<{
  profile: Profile | null
}>()

const initials = (name?: string | null) => {
  if (!name) return 'DV'
  return name
    .split(' ')
    .slice(0, 2)
    .map((word) => word.charAt(0))
    .join('')
    .toUpperCase()
}
</script>

<template>
  <section class="technical-grid app-section">
    <div class="app-container grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
      <div>
        <p class="section-eyebrow">
          Backend · Data · QA · Systems
        </p>

        <h1 class="mt-5 max-w-4xl text-4xl font-extrabold tracking-tight text-app-text md:text-6xl">
          {{ profile?.headline || 'Building reliable backend systems and data-driven engineering products.' }}
        </h1>

        <p class="mt-6 max-w-2xl text-base leading-8 text-app-muted md:text-lg">
          {{ profile?.bio || 'Developer focused on building clean APIs, structured data flows, maintainable interfaces, and practical engineering solutions.' }}
        </p>

        <div class="mt-8 flex flex-wrap gap-3">
          <NuxtLink to="/projects" class="btn-primary">
            View Projects
          </NuxtLink>

          <a
            v-if="profile?.cvUrl"
            :href="profile.cvUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="btn-secondary"
          >
            Download CV
          </a>

          <a
            v-if="profile?.email"
            :href="`mailto:${profile.email}`"
            class="btn-ghost"
          >
            Contact Me
          </a>
        </div>

        <div class="mt-8 flex flex-wrap gap-3 text-sm text-app-muted">
          <span v-if="profile?.location" class="badge-primary">
            {{ profile.location }}
          </span>
          <span class="badge-tech">
            API-driven content
          </span>
          <span class="badge-accent">
            Admin-managed projects
          </span>
        </div>
      </div>

      <div class="app-card p-6 md:p-8">
        <div class="flex items-center gap-5">
          <div class="h-20 w-20 overflow-hidden rounded-2xl bg-brand-soft">
            <img
              v-if="profile?.avatarUrl"
              :src="profile.avatarUrl"
              :alt="`${profile.fullName} profile photo`"
              class="h-full w-full object-cover"
            >
            <div
              v-else
              class="technical-grid flex h-full w-full items-center justify-center font-mono text-xl font-bold text-brand-primary"
            >
              {{ initials(profile?.fullName) }}
            </div>
          </div>

          <div>
            <p class="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-accent-tech">
              Profile Snapshot
            </p>
            <h2 class="mt-2 text-xl font-bold text-app-text">
              {{ profile?.fullName || 'Developer Name' }}
            </h2>
            <p class="mt-1 text-sm text-app-muted">
              {{ profile?.location || 'Indonesia' }}
            </p>
          </div>
        </div>

        <div class="mt-8 space-y-4 text-sm">
          <div class="flex justify-between gap-4 border-t border-app-border pt-5">
            <span class="text-app-muted">Focus</span>
            <span class="text-right font-medium text-app-text">Backend · Data · QA</span>
          </div>

          <div class="flex justify-between gap-4">
            <span class="text-app-muted">Frontend</span>
            <span class="text-right font-medium text-app-text">Nuxt · TypeScript · Tailwind</span>
          </div>

          <div class="flex justify-between gap-4">
            <span class="text-app-muted">Backend</span>
            <span class="text-right font-medium text-app-text">Go · PostgreSQL · REST API</span>
          </div>

          <div class="flex items-center gap-2 pt-2 text-sm font-medium text-app-text">
            <span class="h-2.5 w-2.5 rounded-full bg-accent-main" />
            Available for collaboration
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
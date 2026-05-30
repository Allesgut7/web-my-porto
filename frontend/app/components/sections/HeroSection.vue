<script setup lang="ts">
import type { Profile } from '~/types/profile'

defineProps<{
  profile: Profile
}>()
</script>

<template>
  <section class="technical-grid app-section">
    <div class="app-container grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
      <div>
        <p class="section-eyebrow">
          Backend · Data · QA · Systems
        </p>

        <h1 class="mt-5 max-w-4xl text-4xl font-extrabold tracking-tight text-app-text md:text-6xl">
          {{ profile.headline || `Building reliable engineering products with clean architecture.` }}
        </h1>

        <p class="mt-6 max-w-2xl text-base leading-8 text-app-muted md:text-lg">
          {{ profile.bio || 'Developer focused on backend systems, data-driven dashboards, quality assurance, and practical technology solutions.' }}
        </p>

        <div class="mt-8 flex flex-wrap gap-3">
          <NuxtLink
            to="/projects"
            class="btn-primary"
          >
            View Projects
          </NuxtLink>

          <a
            v-if="profile.cvUrl"
            :href="profile.cvUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="btn-secondary"
          >
            Download CV
          </a>

          <a
            v-if="profile.email"
            :href="`mailto:${profile.email}`"
            class="btn-ghost"
          >
            Contact Me
          </a>
        </div>

        <div class="mt-8 flex flex-wrap gap-3 text-sm text-app-muted">
          <span
            v-if="profile.location"
            class="badge-primary"
          >
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
          <div class="h-20 w-20 overflow-hidden rounded-2xl border border-app-border bg-brand-soft">
            <img
              v-if="profile.avatarUrl"
              :src="profile.avatarUrl"
              :alt="`Foto profil ${profile.fullName}`"
              class="h-full w-full object-cover"
              loading="eager"
            >

            <div
              v-else
              class="flex h-full w-full items-center justify-center font-mono text-xl font-bold text-brand-primary"
            >
              {{ profile.fullName.charAt(0) }}
            </div>
          </div>

          <div>
            <p class="text-lg font-bold text-app-text">
              {{ profile.fullName }}
            </p>

            <p class="mt-1 text-sm text-app-muted">
              {{ profile.headline || 'Developer' }}
            </p>
          </div>
        </div>

        <div class="mt-8 rounded-2xl border border-app-border bg-slate-950 p-5 font-mono text-sm text-slate-300">
          <p class="text-accent-tech">
            GET /api/projects
          </p>

          <div class="mt-4 space-y-2">
            <p>
              <span class="text-white">status:</span> published
            </p>
            <p>
              <span class="text-white">stack:</span> Nuxt · Go · PostgreSQL
            </p>
            <p>
              <span class="text-white">storage:</span> Supabase Storage
            </p>
          </div>
        </div>

        <div class="mt-6 grid grid-cols-3 gap-3">
          <div class="rounded-2xl border border-app-border bg-brand-soft p-4">
            <p class="font-mono text-xs text-brand-primary">01</p>
            <p class="mt-2 text-sm font-semibold text-app-text">Profile</p>
          </div>

          <div class="rounded-2xl border border-app-border bg-cyan-50 p-4">
            <p class="font-mono text-xs text-cyan-700">02</p>
            <p class="mt-2 text-sm font-semibold text-app-text">Projects</p>
          </div>

          <div class="rounded-2xl border border-app-border bg-amber-50 p-4">
            <p class="font-mono text-xs text-amber-700">03</p>
            <p class="mt-2 text-sm font-semibold text-app-text">Contact</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
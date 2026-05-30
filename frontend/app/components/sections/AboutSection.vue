<script setup lang="ts">
import type { Profile } from '~/types/profile'

defineProps<{
  profile: Profile
}>()
</script>

<template>
  <section
    id="about"
    class="app-section bg-white"
  >
    <div class="app-container grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
      <div>
        <p class="section-eyebrow">
          01 / Profile
        </p>

        <h2 class="section-title">
          About the developer
        </h2>

        <p class="section-description">
          Ringkasan profil profesional yang diambil dari database melalui Public API.
        </p>
      </div>

      <div class="app-card p-6 md:p-8">
        <p class="text-lg leading-8 text-app-muted">
          {{ profile.bio || 'Profil developer belum tersedia. Silakan tambahkan data profile melalui seed atau dashboard admin pada fase berikutnya.' }}
        </p>

        <div class="mt-8 grid gap-4 sm:grid-cols-2">
          <div class="rounded-2xl border border-app-border bg-app-background p-5">
            <p class="font-mono text-xs uppercase tracking-[0.18em] text-brand-primary">
              Name
            </p>
            <p class="mt-2 font-semibold text-app-text">
              {{ profile.fullName }}
            </p>
          </div>

          <div class="rounded-2xl border border-app-border bg-app-background p-5">
            <p class="font-mono text-xs uppercase tracking-[0.18em] text-brand-primary">
              Location
            </p>
            <p class="mt-2 font-semibold text-app-text">
              {{ profile.location || 'Not specified' }}
            </p>
          </div>

          <div class="rounded-2xl border border-app-border bg-app-background p-5">
            <p class="font-mono text-xs uppercase tracking-[0.18em] text-brand-primary">
              Email
            </p>
            <a
              v-if="profile.email"
              :href="`mailto:${profile.email}`"
              class="mt-2 block font-semibold text-app-text hover:text-brand-primary"
            >
              {{ profile.email }}
            </a>
            <p
              v-else
              class="mt-2 font-semibold text-app-text"
            >
              Not specified
            </p>
          </div>

          <div class="rounded-2xl border border-app-border bg-app-background p-5">
            <p class="font-mono text-xs uppercase tracking-[0.18em] text-brand-primary">
              Website
            </p>
            <a
              v-if="profile.websiteUrl"
              :href="profile.websiteUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="mt-2 block font-semibold text-app-text hover:text-brand-primary"
            >
              Visit website
            </a>
            <p
              v-else
              class="mt-2 font-semibold text-app-text"
            >
              Portfolio website
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
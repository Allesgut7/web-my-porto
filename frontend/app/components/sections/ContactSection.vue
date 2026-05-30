<script setup lang="ts">
import type { Profile } from '~/types/profile'

defineProps<{
  profile: Profile
}>()
</script>

<template>
  <section
    id="contact"
    class="dark-technical-grid bg-app-dark py-16 text-white md:py-24"
  >
    <div class="app-container">
      <div class="grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-center">
        <div>
          <p class="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">
            03 / Contact
          </p>

          <h2 class="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
            Let’s talk about reliable systems and practical engineering.
          </h2>

          <p class="mt-4 max-w-2xl text-base leading-7 text-slate-300 md:text-lg">
            Hubungi saya melalui email, GitHub, atau LinkedIn untuk diskusi project, kolaborasi, atau peluang profesional.
          </p>
        </div>

        <div class="rounded-panel border border-white/10 bg-white/5 p-6 backdrop-blur md:p-8">
          <div class="space-y-4">
            <a
              v-if="profile.email"
              :href="`mailto:${profile.email}`"
              class="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-200 hover:bg-white/10"
            >
              <span>Email</span>
              <span class="font-medium text-white">{{ profile.email }}</span>
            </a>

            <a
              v-if="profile.githubUrl"
              :href="profile.githubUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-200 hover:bg-white/10"
            >
              <span>GitHub</span>
              <span class="font-medium text-white">Open profile →</span>
            </a>

            <a
              v-if="profile.linkedinUrl"
              :href="profile.linkedinUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-200 hover:bg-white/10"
            >
              <span>LinkedIn</span>
              <span class="font-medium text-white">Connect →</span>
            </a>

            <a
              v-if="profile.cvUrl"
              :href="profile.cvUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="btn-primary mt-6 w-full"
            >
              Download CV
            </a>

            <p
              v-if="!profile.email && !profile.githubUrl && !profile.linkedinUrl && !profile.cvUrl"
              class="text-sm leading-6 text-slate-300"
            >
              Link kontak belum tersedia dari API.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
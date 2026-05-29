<script setup lang="ts">
const currentYear = new Date().getFullYear()
import { useProfile } from '../../composables/useProfile'

const { useProfileData } = useProfile()
const { data: profile } = await useProfileData()
</script>

<template>
  <footer class="border-t border-slate-800 bg-app-dark text-white">
    <div class="app-container py-12">
      <div class="grid gap-10 md:grid-cols-[1.3fr_0.7fr_1fr]">
        <div>
          <NuxtLink to="/" class="text-lg font-bold">
            <span class="text-accent-tech">&lt;</span>{{ profile?.fullName || 'Developer' }}<span class="text-accent-tech">/&gt;</span>
          </NuxtLink>

          <p class="mt-4 max-w-md text-sm leading-6 text-slate-400">
            {{ profile?.headline || 'Developer portfolio powered by Nuxt, Go, PostgreSQL, and Supabase Storage.' }}
          </p>
        </div>

        <nav class="space-y-3" aria-label="Footer navigation">
          <p class="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-accent-tech">
            Navigation
          </p>
          <NuxtLink to="/" class="block text-sm text-slate-400 hover:text-white">
            Home
          </NuxtLink>
          <NuxtLink to="/projects" class="block text-sm text-slate-400 hover:text-white">
            Projects
          </NuxtLink>
          <NuxtLink to="/#about" class="block text-sm text-slate-400 hover:text-white">
            About
          </NuxtLink>
          <NuxtLink to="/#contact" class="block text-sm text-slate-400 hover:text-white">
            Contact
          </NuxtLink>
        </nav>

        <div class="space-y-3">
          <p class="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-accent-tech">
            Links
          </p>

          <a
            v-if="profile?.email"
            :href="`mailto:${profile.email}`"
            class="block text-sm text-slate-400 hover:text-white"
          >
            {{ profile.email }}
          </a>

          <a
            v-if="profile?.githubUrl"
            :href="profile.githubUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="block text-sm text-slate-400 hover:text-white"
          >
            GitHub
          </a>

          <a
            v-if="profile?.linkedinUrl"
            :href="profile.linkedinUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="block text-sm text-slate-400 hover:text-white"
          >
            LinkedIn
          </a>
        </div>
      </div>

      <div class="mt-10 border-t border-slate-800 pt-6 text-sm text-slate-500">
        © {{ currentYear }} {{ profile?.fullName || 'Developer' }}. Built with Nuxt, Go, PostgreSQL, and Supabase Storage.
      </div>
    </div>
  </footer>
</template>
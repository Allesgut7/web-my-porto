<script setup lang="ts">
import { safeUrl } from '~/utils/url'

const year = new Date().getFullYear()

const { data: profile } = useProfile({
  lazy: true,
})
</script>

<template>
  <footer class="bg-app-dark text-white relative overflow-hidden">
    <div class="dark-technical-grid dark-circuit-pattern absolute inset-0 opacity-50" />

    <!-- Glow orb -->
    <div class="glow-orb animate-float-glow -right-20 top-1/3 h-64 w-64 bg-blue-500/[0.06]" />

    <div class="app-container relative z-10 py-16">
      <div class="grid gap-10 md:grid-cols-[1.2fr_0.8fr] md:items-center">
        <div>
          <p class="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">
            Cyber-Physical Systems Portfolio
          </p>

          <p class="mt-4 max-w-xl text-base leading-7 text-slate-300">
            Built with Nuxt, Go, PostgreSQL, and Supabase Storage. Designed for the intersection of hardware engineering and software systems.
          </p>

          <div class="mt-6 flex flex-wrap gap-4 text-xs text-slate-400">
            <span class="inline-flex items-center gap-1.5">
              <span class="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              API-driven content
            </span>
            <span class="inline-flex items-center gap-1.5">
              <span class="h-1.5 w-1.5 rounded-full bg-cyan-500" />
              Database-first
            </span>
            <span class="inline-flex items-center gap-1.5">
              <span class="h-1.5 w-1.5 rounded-full bg-amber-500" />
              Open to collaboration
            </span>
          </div>
        </div>

        <div class="flex flex-wrap gap-3 md:justify-end">
          <a
            v-if="profile?.githubUrl"
            :href="safeUrl(profile.githubUrl) || undefined"
            target="_blank"
            rel="noopener noreferrer"
            class="rounded-full border border-white/10 px-5 py-2.5 text-sm text-slate-300 transition-all duration-300 hover:border-white/20 hover:bg-white/10 hover:text-white hover:-translate-y-0.5"
          >
            GitHub
          </a>

          <a
            v-if="profile?.linkedinUrl"
            :href="safeUrl(profile.linkedinUrl) || undefined"
            target="_blank"
            rel="noopener noreferrer"
            class="rounded-full border border-white/10 px-5 py-2.5 text-sm text-slate-300 transition-all duration-300 hover:border-white/20 hover:bg-white/10 hover:text-white hover:-translate-y-0.5"
          >
            LinkedIn
          </a>

          <a
            v-if="profile?.email"
            :href="`mailto:${profile.email}`"
            class="rounded-full border border-white/10 px-5 py-2.5 text-sm text-slate-300 transition-all duration-300 hover:border-white/20 hover:bg-white/10 hover:text-white hover:-translate-y-0.5"
          >
            Email
          </a>
        </div>
      </div>

      <div class="mt-10 border-t border-white/10 pt-8 text-sm text-slate-400">
        <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {{ year }} {{ profile?.fullName || 'Developer' }}. All rights reserved.</p>

          <p class="font-mono text-xs text-slate-500">
            EE &middot; IoT &middot; Data Science &middot; Backend &middot; ML
          </p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const year = new Date().getFullYear()

const { data: profile } = useProfile({
  lazy: true,
})
</script>

<template>
  <footer class="dark-technical-grid bg-app-dark text-white">
    <div class="app-container py-10">
      <div class="grid gap-8 md:grid-cols-[1.2fr_0.8fr] md:items-center">
        <div>
          <p class="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">
            Developer Portfolio
          </p>

          <p class="mt-3 max-w-xl text-sm leading-6 text-slate-300">
            Database-driven portfolio built with Nuxt, Go, PostgreSQL, and Supabase Storage.
          </p>
        </div>

        <div class="flex flex-wrap gap-3 md:justify-end">
          <a
            v-if="profile?.githubUrl"
            :href="profile.githubUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="rounded-full border border-white/10 px-4 py-2 text-sm text-slate-300 hover:bg-white/10 hover:text-white"
          >
            GitHub
          </a>

          <a
            v-if="profile?.linkedinUrl"
            :href="profile.linkedinUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="rounded-full border border-white/10 px-4 py-2 text-sm text-slate-300 hover:bg-white/10 hover:text-white"
          >
            LinkedIn
          </a>

          <a
            v-if="profile?.email"
            :href="`mailto:${profile.email}`"
            class="rounded-full border border-white/10 px-4 py-2 text-sm text-slate-300 hover:bg-white/10 hover:text-white"
          >
            Email
          </a>
        </div>
      </div>

      <div class="mt-8 border-t border-white/10 pt-6 text-sm text-slate-400">
        © {{ year }} {{ profile?.fullName || 'Developer' }}. All rights reserved.
      </div>
    </div>
  </footer>
</template>
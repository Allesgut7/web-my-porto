<script setup lang="ts">
import type { Profile } from '../../types/profile'

defineProps<{
  profile: Profile | null
}>()
</script>

<template>
  <section id="contact" class="dark-technical-grid bg-app-dark py-20 text-white">
    <div class="app-container">
      <div class="max-w-3xl">
        <p class="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-accent-tech">
          Contact
        </p>

        <h2 class="mt-4 text-3xl font-bold md:text-4xl">
          Interested in working together?
        </h2>

        <p class="mt-5 text-base leading-7 text-slate-400 md:text-lg">
          Reach out for collaboration, internship, freelance work, technical discussion, or backend/data-oriented project work.
        </p>

        <div class="mt-8 flex flex-wrap gap-3">
          <a
            v-if="profile?.email"
            :href="`mailto:${profile.email}`"
            class="btn bg-white text-app-text hover:bg-slate-100"
          >
            Email Me
          </a>

          <a
            v-if="profile?.githubUrl"
            :href="profile.githubUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="btn border border-slate-700 text-white hover:bg-slate-900"
          >
            GitHub
          </a>

          <a
            v-if="profile?.linkedinUrl"
            :href="profile.linkedinUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="btn border border-slate-700 text-white hover:bg-slate-900"
          >
            LinkedIn
          </a>

          <a
            v-if="profile?.cvUrl"
            :href="profile.cvUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="btn border border-slate-700 text-white hover:bg-slate-900"
          >
            Download CV
          </a>
        </div>
      </div>
    </div>
  </section>
</template>
<script setup lang="ts">
import type { Profile } from '~/types/profile'
import { safeUrl } from '~/utils/url'

defineProps<{
  profile: Profile
}>()

const { t } = useI18n()
</script>

<template>
  <section
    id="contact"
    class="relative overflow-hidden bg-app-dark py-20 text-white md:py-28"
  >
    <div class="bg-grid-dark bg-grid-animate absolute inset-0" />
    <CircuitPattern :opacity="0.08" color="dark" />

    <div class="glow-orb animate-float-glow -left-20 top-1/4 h-72 w-72 bg-blue-500/[0.1]" />
    <div class="glow-orb animate-float-glow -right-20 bottom-1/4 h-64 w-64 bg-cyan-500/[0.08]" style="animation-delay: 4s;" />
    <div class="glow-orb left-1/3 -bottom-20 h-48 w-48 bg-amber-500/[0.06]" style="animation-delay: 8s;" />

    <div class="app-container relative z-10">
      <AnimatedContainer>
        <div class="mb-5 flex items-center gap-3">
          <span class="status-dot" />
          <span class="font-mono text-sm font-semibold uppercase tracking-[0.2em] text-emerald-400">
            {{ t('contactAvailable') }}
          </span>
        </div>

        <p class="font-mono text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">
          {{ t('contactEyebrow') }}
        </p>

        <h2 class="mt-4 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl font-display">
          {{ t('contactTitle') }}
          <span class="heading-gradient-accent">{{ t('contactTitleAccent') }}</span>
          {{ t('contactTitleEnd') }}
        </h2>

        <p class="mt-6 max-w-2xl text-lg leading-8 text-slate-300 md:text-xl">
          {{ t('contactDescription') }}
        </p>

        <div class="mt-10 flex flex-wrap gap-4">
          <a
            v-if="profile.email"
            :href="`mailto:${profile.email}`"
            class="btn group relative overflow-hidden bg-white px-8 py-4 text-base font-semibold text-app-text hover:bg-slate-100 hover:shadow-elevated"
          >
            <span class="relative z-10 flex items-center gap-2">
              {{ t('contactEmailMe') }}
              <svg class="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
          </a>

          <a
            v-if="profile.githubUrl"
            :href="safeUrl(profile.githubUrl) || undefined"
            target="_blank"
            rel="noopener noreferrer"
            class="btn border border-slate-600 px-8 py-4 text-base text-white hover:bg-slate-800 hover:border-slate-500 hover:shadow-deep"
          >
            GitHub
          </a>

          <a
            v-if="profile.linkedinUrl"
            :href="safeUrl(profile.linkedinUrl) || undefined"
            target="_blank"
            rel="noopener noreferrer"
            class="btn border border-slate-600 px-8 py-4 text-base text-white hover:bg-slate-800 hover:border-slate-500 hover:shadow-deep"
          >
            LinkedIn
          </a>
        </div>

        <div class="mt-10 border-t border-white/10 pt-5">
          <p class="font-mono text-xs text-slate-500">
            {{ t('contactResponseTime') }}
          </p>
        </div>
      </AnimatedContainer>
    </div>
  </section>
</template>

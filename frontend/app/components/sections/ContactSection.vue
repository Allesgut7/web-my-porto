<script setup lang="ts">
import type { Profile } from '~/types/profile'
import { safeUrl } from '~/utils/url'

defineProps<{
  profile: Profile
}>()
</script>

<template>
  <section
    id="contact"
    class="relative overflow-hidden bg-app-dark py-20 text-white md:py-28"
  >
    <!-- Background layers -->
    <div class="bg-grid-dark bg-grid-animate absolute inset-0" />
    <CircuitPattern :opacity="0.08" color="dark" />

    <!-- Glow orbs -->
    <div class="glow-orb animate-float-glow -left-20 top-1/4 h-72 w-72 bg-blue-500/[0.1]" />
    <div class="glow-orb animate-float-glow -right-20 bottom-1/4 h-64 w-64 bg-cyan-500/[0.08]" style="animation-delay: 4s;" />
    <div class="glow-orb left-1/3 -bottom-20 h-48 w-48 bg-amber-500/[0.06]" style="animation-delay: 8s;" />

    <div class="app-container relative z-10">
      <div class="grid gap-12 lg:grid-cols-[1fr_0.9fr] lg:items-center">
        <!-- Left — CTA -->
        <div>
          <AnimatedContainer>
            <div class="mb-5 flex items-center gap-3">
              <span class="status-dot" />
              <span class="font-mono text-sm font-semibold uppercase tracking-[0.2em] text-emerald-400">
                Available for collaboration
              </span>
            </div>

            <p class="font-mono text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">
              03 / Contact
            </p>

            <h2 class="mt-4 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl font-display">
              Let's build
              <span class="heading-gradient-accent">something</span>
              reliable together.
            </h2>

            <p class="mt-6 max-w-2xl text-lg leading-8 text-slate-300 md:text-xl">
              Reach out for collaboration, internship, freelance work, or technical discussion across EE, IoT, Data, Backend, and ML.
            </p>

            <div class="mt-10 flex flex-wrap gap-4">
              <a
                v-if="profile.email"
                :href="`mailto:${profile.email}`"
                class="btn group relative overflow-hidden bg-white px-8 py-4 text-base font-semibold text-app-text hover:bg-slate-100 hover:shadow-elevated"
              >
                <span class="relative z-10 flex items-center gap-2">
                  Email Me
                  <svg class="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </a>

              <a
                v-if="profile.cvUrl"
                :href="safeUrl(profile.cvUrl) || undefined"
                target="_blank"
                rel="noopener noreferrer"
                class="btn border border-slate-600 px-8 py-4 text-base text-white hover:bg-slate-800 hover:border-slate-500 hover:shadow-deep"
              >
                Download CV
              </a>
            </div>
          </AnimatedContainer>
        </div>

        <!-- Right — Contact Cards -->
        <AnimatedContainer :delay="200" direction="right">
          <div class="rounded-panel border border-white/10 bg-white/5 p-6 backdrop-blur-md md:p-8 shadow-elevated">
            <p class="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">
              Connect
            </p>

            <div class="mt-6 space-y-3">
              <a
                v-if="profile.email"
                :href="`mailto:${profile.email}`"
                class="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-200 transition-all duration-300 hover:border-white/20 hover:bg-white/10 hover:shadow-inner-glow hover:-translate-y-0.5"
              >
                <span class="flex items-center gap-3">
                  <span class="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
                    <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </span>
                  Email
                </span>
                <span class="font-medium text-white">{{ profile.email }}</span>
              </a>

              <a
                v-if="profile.githubUrl"
                :href="safeUrl(profile.githubUrl) || undefined"
                target="_blank"
                rel="noopener noreferrer"
                class="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-200 transition-all duration-300 hover:border-white/20 hover:bg-white/10 hover:shadow-inner-glow hover:-translate-y-0.5"
              >
                <span class="flex items-center gap-3">
                  <span class="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-500/10 text-slate-300">
                    <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                      <path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd" />
                    </svg>
                  </span>
                  GitHub
                </span>
                <span class="font-medium text-white">Open profile &rarr;</span>
              </a>

              <a
                v-if="profile.linkedinUrl"
                :href="safeUrl(profile.linkedinUrl) || undefined"
                target="_blank"
                rel="noopener noreferrer"
                class="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-200 transition-all duration-300 hover:border-white/20 hover:bg-white/10 hover:shadow-inner-glow hover:-translate-y-0.5"
              >
                <span class="flex items-center gap-3">
                  <span class="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600/10 text-blue-400">
                    <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </span>
                  LinkedIn
                </span>
                <span class="font-medium text-white">Connect &rarr;</span>
              </a>

              <p
                v-if="!profile.email && !profile.githubUrl && !profile.linkedinUrl && !profile.cvUrl"
                class="text-sm leading-6 text-slate-300"
              >
                Link kontak belum tersedia dari API.
              </p>
            </div>

            <!-- Decorative bottom -->
            <div class="mt-6 border-t border-white/5 pt-5">
              <p class="font-mono text-xs text-slate-500">
                Response time: Usually within 24 hours
              </p>
            </div>
          </div>
        </AnimatedContainer>
      </div>
    </div>
  </section>
</template>

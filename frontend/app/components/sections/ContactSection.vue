<script setup lang="ts">
type ProfileLike = {
  email?: string | null
  githubUrl?: string | null
  linkedinUrl?: string | null
  cvUrl?: string | null
}

defineProps<{
  profile?: ProfileLike | null
}>()
</script>

<template>
  <section
    id="contact"
    class="relative overflow-hidden bg-brand-dark py-20 md:py-28"
  >
    <div class="absolute inset-0 dark-technical-grid opacity-70" />
    <div class="absolute -left-24 top-10 h-72 w-72 rounded-full bg-blue-500/20 blur-3xl" />
    <div class="absolute -right-24 bottom-10 h-72 w-72 rounded-full bg-cyan-400/20 blur-3xl" />

    <div class="app-container relative">
      <div class="grid gap-10 lg:grid-cols-[1fr_0.8fr] lg:items-center">
        <AnimatedContainer>
          <div class="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2">
            <span class="h-2 w-2 rounded-full bg-green-400" />
            <span class="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">
              Available for collaboration
            </span>
          </div>

          <h2 class="mt-6 max-w-4xl text-3xl font-bold tracking-tight text-white md:text-5xl">
            Have an idea, product, or technical challenge to build?
          </h2>

          <p class="mt-5 max-w-2xl text-base leading-8 text-slate-300 md:text-lg">
            Let’s turn requirements into reliable software — from API design, frontend implementation, testing, to deployment-ready delivery.
          </p>

          <div class="mt-8 flex flex-wrap gap-3">
            <a
              v-if="profile?.email"
              :href="`mailto:${profile.email}`"
              class="btn bg-white text-brand-dark hover:-translate-y-0.5 hover:bg-slate-100"
            >
              Email Me
            </a>

            <a
              v-if="profile?.githubUrl"
              :href="profile.githubUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="btn border border-white/10 bg-white/[0.04] text-white hover:-translate-y-0.5 hover:bg-white/10"
            >
              GitHub
            </a>

            <a
              v-if="profile?.linkedinUrl"
              :href="profile.linkedinUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="btn border border-white/10 bg-white/[0.04] text-white hover:-translate-y-0.5 hover:bg-white/10"
            >
              LinkedIn
            </a>

            <a
              v-if="profile?.cvUrl"
              :href="profile.cvUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="btn border border-white/10 bg-white/[0.04] text-white hover:-translate-y-0.5 hover:bg-white/10"
            >
              View CV
            </a>
          </div>
        </AnimatedContainer>

        <AnimatedContainer
          :delay="140"
          class="dark-glass-card rounded-3xl p-6"
        >
          <p class="font-mono text-xs font-semibold uppercase tracking-[0.22em] text-cyan-300">
            Collaboration Pipeline
          </p>

          <div class="mt-6 space-y-4">
            <div class="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
              <p class="text-sm font-semibold text-white">
                01 · Discuss
              </p>
              <p class="mt-1 text-sm text-slate-400">
                Understand goals, scope, constraints, and success metric.
              </p>
            </div>

            <div class="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
              <p class="text-sm font-semibold text-white">
                02 · Design
              </p>
              <p class="mt-1 text-sm text-slate-400">
                Turn ideas into API, data model, UI flow, and delivery plan.
              </p>
            </div>

            <div class="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
              <p class="text-sm font-semibold text-white">
                03 · Build
              </p>
              <p class="mt-1 text-sm text-slate-400">
                Implement, test, polish, and prepare for deployment.
              </p>
            </div>
          </div>
        </AnimatedContainer>
      </div>
    </div>
  </section>
</template>
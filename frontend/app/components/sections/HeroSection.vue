<script setup lang="ts">
import type { Profile } from '~/types/profile'

defineProps<{
  profile: Profile
}>()

const domains = [
  { key: 'electrical' as const, label: 'EE', color: 'text-blue-600' },
  { key: 'iot' as const, label: 'IoT', color: 'text-cyan-600' },
  { key: 'data' as const, label: 'Data', color: 'text-amber-600' },
  { key: 'backend' as const, label: 'Backend', color: 'text-blue-600' },
  { key: 'ml' as const, label: 'ML', color: 'text-cyan-600' },
  { key: 'qa' as const, label: 'QA', color: 'text-amber-600' },
]

const roles = ['Backend Engineer', 'IoT Architect', 'Data Enthusiast', 'ML Practitioner', 'QA Specialist']
const currentRoleIndex = ref(0)
const displayedRole = ref('')
const isDeleting = ref(false)
const typeSpeed = ref(80)

let typeTimeout: ReturnType<typeof setTimeout> | null = null

function typeRole() {
  const fullRole = roles[currentRoleIndex.value]

  if (!isDeleting.value) {
    displayedRole.value = fullRole.slice(0, displayedRole.value.length + 1)
    if (displayedRole.value === fullRole) {
      setTimeout(() => {
        isDeleting.value = true
        typeRole()
      }, 2000)
      return
    }
  } else {
    displayedRole.value = fullRole.slice(0, displayedRole.value.length - 1)
    if (displayedRole.value === '') {
      isDeleting.value = false
      currentRoleIndex.value = (currentRoleIndex.value + 1) % roles.length
    }
  }

  typeTimeout = setTimeout(typeRole, isDeleting.value ? 40 : typeSpeed.value)
}

onMounted(() => {
  setTimeout(typeRole, 1000)
})

onUnmounted(() => {
  if (typeTimeout) clearTimeout(typeTimeout)
})
</script>

<template>
  <section class="relative overflow-hidden min-h-[85vh]">
    <!-- Multi-layer background -->
    <div class="absolute inset-0 hero-atmosphere" />
    <div class="bg-grid-pattern bg-grid-animate absolute inset-0 opacity-30" />
    <CircuitPattern :opacity="0.05" class="absolute inset-0" />

    <!-- Floating gradient orbs — larger, more dramatic -->
    <div class="glow-orb animate-float-glow -right-32 top-1/4 h-[500px] w-[500px] bg-blue-600/[0.07]" />
    <div class="glow-orb animate-float-glow -left-20 bottom-10 h-[400px] w-[400px] bg-cyan-500/[0.06]" style="animation-delay: 4s;" />
    <div class="glow-orb animate-float-glow left-1/3 -top-20 h-[300px] w-[300px] bg-amber-500/[0.04]" style="animation-delay: 8s;" />

    <!-- Floating particles -->
    <div class="floating-particle h-2 w-2 bg-blue-400/20 top-[20%] left-[15%]" style="--duration: 10s; --delay: 0s; --tx1: 15px; --ty1: -20px; --tx2: -10px; --ty2: -35px; --tx3: 20px; --ty3: -15px; --opacity: 0.2;" />
    <div class="floating-particle h-1.5 w-1.5 bg-cyan-400/20 top-[30%] right-[20%]" style="--duration: 12s; --delay: 2s; --tx1: -12px; --ty1: -18px; --tx2: 8px; --ty2: -30px; --tx3: -15px; --ty3: -12px; --opacity: 0.15;" />
    <div class="floating-particle h-1 w-1 bg-amber-400/20 top-[60%] left-[10%]" style="--duration: 14s; --delay: 4s; --tx1: 10px; --ty1: -25px; --tx2: -8px; --ty2: -40px; --tx3: 12px; --ty3: -18px; --opacity: 0.12;" />
    <div class="floating-particle h-2.5 w-2.5 bg-blue-300/15 top-[70%] right-[12%]" style="--duration: 11s; --delay: 1s; --tx1: -18px; --ty1: -12px; --tx2: 14px; --ty2: -28px; --tx3: -10px; --ty3: -20px; --opacity: 0.15;" />

    <div class="relative z-10 w-full pt-20 pb-16 md:pt-20 md:pb-20 lg:pt-24 lg:pb-24">
      <div class="app-container grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
        <!-- Left Column — Editorial Hero -->
        <div class="space-y-8">
          <!-- Availability status with pulse -->
          <div class="animate-fade-in-up flex items-center gap-3">
            <span class="status-dot" />
            <span class="font-mono text-sm font-semibold uppercase tracking-[0.2em] text-emerald-600">
              Available for collaboration
            </span>
          </div>

          <!-- Domain badges — more prominent -->
          <div class="animate-fade-in-up stagger-children flex flex-wrap gap-2.5">
            <span
              v-for="domain in domains"
              :key="domain.key"
              class="inline-flex items-center gap-2 rounded-full border border-slate-200/80 bg-white/80 px-4 py-2 text-sm font-medium text-app-muted backdrop-blur-sm transition-all duration-300 hover:border-brand-primary hover:text-brand-primary hover:shadow-glow-blue hover:-translate-y-0.5"
            >
              <DomainIcons :domain="domain.key" class="h-4 w-4" />
              {{ domain.label }}
            </span>
          </div>

          <!-- Main Headline — Bigger, bolder, more dramatic -->
          <div class="animate-fade-in-up delay-200">
            <h1 class="text-5xl font-extrabold leading-[1.08] tracking-tight text-app-text md:text-7xl lg:text-[5.2rem] font-display">
              Building
              <span class="heading-gradient-accent">reliable</span>
              backend systems &
              <span class="heading-gradient">data-driven</span>
              engineering products.
            </h1>
          </div>

          <!-- Typewriter role -->
          <div class="animate-fade-in-up delay-400 flex items-center gap-3">
            <span class="font-mono text-sm font-semibold uppercase tracking-[0.15em] text-brand-primary">I'm a</span>
            <span class="font-mono text-lg font-bold text-app-text">
              {{ displayedRole }}<span class="typewriter-cursor" />
            </span>
          </div>

          <!-- Description — bigger text -->
          <p class="animate-fade-in-up delay-500 max-w-2xl text-lg leading-8 text-app-muted md:text-xl">
            I design APIs, dashboards, and system-oriented applications with clean architecture, structured data, and maintainable interfaces for real-world projects.
          </p>

          <!-- CTA group — larger, more prominent -->
          <div class="animate-fade-in-up delay-600 flex flex-wrap gap-4">
            <NuxtLink
              to="/projects"
              class="btn-primary group relative overflow-hidden px-8 py-4 text-base"
            >
              <span class="relative z-10 flex items-center gap-2">
                View Projects
                <svg class="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </NuxtLink>

            <a
              v-if="profile.cvUrl"
              :href="profile.cvUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="btn-secondary px-8 py-4 text-base"
            >
              Download CV
            </a>

            <a
              v-if="profile.email"
              :href="`mailto:${profile.email}`"
              class="btn-ghost px-8 py-4 text-base"
            >
              Contact Me
            </a>
          </div>

          <!-- Tech stack badges -->
          <div class="animate-fade-in-up delay-700 flex flex-wrap gap-3 text-sm text-app-muted">
            <span class="badge-primary">
              {{ profile.location }}
            </span>
            <span class="badge-tech">
              API-driven content
            </span>
            <span class="badge-accent">
              Database-first
            </span>
          </div>
        </div>

        <!-- Right Column — Enhanced Visual -->
        <div class="space-y-4 animate-slide-in-right delay-300">
          <!-- Topology / System Card — Enhanced -->
          <div class="app-card overflow-hidden shadow-deep gradient-border">
            <!-- Terminal header -->
            <div class="flex items-center gap-2 border-b border-app-border bg-slate-50/80 px-5 py-3 backdrop-blur-sm">
              <span class="h-3 w-3 rounded-full bg-red-400" />
              <span class="h-3 w-3 rounded-full bg-amber-400" />
              <span class="h-3 w-3 rounded-full bg-emerald-400" />
              <span class="ml-3 font-mono text-xs text-app-muted">SYSTEM_TOPOLOGY v2.0</span>
            </div>

            <div class="relative bg-[#0a0f1a] p-6 overflow-hidden">
              <!-- Background glow -->
              <div class="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-transparent to-cyan-500/5" />

              <!-- Animated topology SVG -->
              <svg
                class="mx-auto h-72 w-full relative z-10"
                viewBox="0 0 400 280"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <radialGradient id="glow-center" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stop-color="#1D4ED8" stop-opacity="0.35" />
                    <stop offset="100%" stop-color="#1D4ED8" stop-opacity="0" />
                  </radialGradient>
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                    <feMerge>
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                </defs>

                <!-- Background glow -->
                <circle cx="200" cy="140" r="90" fill="url(#glow-center)" class="animate-glow-pulse" />

                <!-- Orbital rings — thicker, more visible -->
                <circle
                  cx="200" cy="140" r="75"
                  fill="none" stroke="#1D4ED8" stroke-opacity="0.2" stroke-width="1.5"
                  stroke-dasharray="4 4"
                  class="animate-orbit"
                  style="transform-origin: 200px 140px;"
                />
                <circle
                  cx="200" cy="140" r="110"
                  fill="none" stroke="#06B6D4" stroke-opacity="0.15" stroke-width="1"
                  stroke-dasharray="6 4"
                  class="animate-orbit-reverse"
                  style="transform-origin: 200px 140px;"
                />
                <circle
                  cx="200" cy="140" r="140"
                  fill="none" stroke="#F59E0B" stroke-opacity="0.08" stroke-width="0.5"
                  stroke-dasharray="8 6"
                  class="animate-orbit"
                  style="transform-origin: 200px 140px; animation-duration: 32s;"
                />

                <!-- Traces from center to nodes — thicker, with glow -->
                <line x1="200" y1="140" x2="200" y2="40" stroke="#1D4ED8" stroke-opacity="0.4" stroke-width="1.5" filter="url(#glow)" />
                <line x1="200" y1="140" x2="320" y2="80" stroke="#06B6D4" stroke-opacity="0.4" stroke-width="1.5" filter="url(#glow)" />
                <line x1="200" y1="140" x2="330" y2="190" stroke="#F59E0B" stroke-opacity="0.4" stroke-width="1.5" filter="url(#glow)" />
                <line x1="200" y1="140" x2="200" y2="250" stroke="#1D4ED8" stroke-opacity="0.4" stroke-width="1.5" filter="url(#glow)" />
                <line x1="200" y1="140" x2="80" y2="190" stroke="#06B6D4" stroke-opacity="0.4" stroke-width="1.5" filter="url(#glow)" />
                <line x1="200" y1="140" x2="70" y2="80" stroke="#F59E0B" stroke-opacity="0.4" stroke-width="1.5" filter="url(#glow)" />

                <!-- Center MCU node — larger, glowing -->
                <circle cx="200" cy="140" r="22" fill="#1D4ED8" fill-opacity="0.12" stroke="#1D4ED8" stroke-width="2" />
                <circle cx="200" cy="140" r="8" fill="#1D4ED8" filter="url(#glow)" />
                <text x="200" y="145" text-anchor="middle" fill="white" font-size="9" font-family="JetBrains Mono, monospace" font-weight="700">MCU</text>

                <!-- EE node (top) -->
                <circle cx="200" cy="40" r="16" fill="#1D4ED8" fill-opacity="0.1" stroke="#1D4ED8" stroke-width="1.5" />
                <circle cx="200" cy="40" r="5" fill="#1D4ED8" filter="url(#glow)" />
                <text x="200" y="20" text-anchor="middle" fill="#60A5FA" font-size="10" font-family="JetBrains Mono, monospace" font-weight="600">EE</text>

                <!-- IoT node (top-right) -->
                <circle cx="320" cy="80" r="16" fill="#06B6D4" fill-opacity="0.1" stroke="#06B6D4" stroke-width="1.5" />
                <circle cx="320" cy="80" r="5" fill="#06B6D4" filter="url(#glow)" />
                <text x="320" y="58" text-anchor="middle" fill="#22D3EE" font-size="10" font-family="JetBrains Mono, monospace" font-weight="600">IoT</text>

                <!-- Data node (bottom-right) -->
                <circle cx="330" cy="190" r="16" fill="#F59E0B" fill-opacity="0.1" stroke="#F59E0B" stroke-width="1.5" />
                <circle cx="330" cy="190" r="5" fill="#F59E0B" filter="url(#glow)" />
                <text x="330" y="215" text-anchor="middle" fill="#FBBF24" font-size="10" font-family="JetBrains Mono, monospace" font-weight="600">DATA</text>

                <!-- Backend node (bottom) -->
                <circle cx="200" cy="250" r="16" fill="#1D4ED8" fill-opacity="0.1" stroke="#1D4ED8" stroke-width="1.5" />
                <circle cx="200" cy="250" r="5" fill="#1D4ED8" filter="url(#glow)" />
                <text x="200" y="275" text-anchor="middle" fill="#60A5FA" font-size="10" font-family="JetBrains Mono, monospace" font-weight="600">BACKEND</text>

                <!-- ML node (bottom-left) -->
                <circle cx="80" cy="190" r="16" fill="#06B6D4" fill-opacity="0.1" stroke="#06B6D4" stroke-width="1.5" />
                <circle cx="80" cy="190" r="5" fill="#06B6D4" filter="url(#glow)" />
                <text x="80" y="215" text-anchor="middle" fill="#22D3EE" font-size="10" font-family="JetBrains Mono, monospace" font-weight="600">ML</text>

                <!-- QA node (top-left) -->
                <circle cx="70" cy="80" r="16" fill="#F59E0B" fill-opacity="0.1" stroke="#F59E0B" stroke-width="1.5" />
                <circle cx="70" cy="80" r="5" fill="#F59E0B" filter="url(#glow)" />
                <text x="70" y="58" text-anchor="middle" fill="#FBBF24" font-size="10" font-family="JetBrains Mono, monospace" font-weight="600">QA</text>

                <!-- LED indicators with glow -->
                <circle cx="200" cy="140" r="3" fill="#22D3EE" filter="url(#glow)">
                  <animate attributeName="opacity" values="1;0.3;1" dur="2s" repeatCount="indefinite" />
                </circle>
              </svg>

            </div>

            <!-- API info — below SVG, no overlap -->
            <div class="border-t border-app-border bg-slate-50/80 px-5 py-3.5 font-mono text-xs">
              <div class="flex items-center gap-2">
                <span class="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                <span class="text-cyan-600 font-semibold">GET /api/profile</span>
                <span class="ml-auto text-emerald-600 font-medium">200 OK</span>
              </div>
              <div class="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-slate-400">
                <p><span class="text-slate-500">domains:</span> EE, IoT, Data, Backend, ML, QA</p>
                <p><span class="text-slate-500">stack:</span> Go + Nuxt + PostgreSQL</p>
                <p><span class="text-slate-500">storage:</span> Supabase Storage</p>
              </div>
            </div>
          </div>

          <!-- Metric Cards — Enhanced -->
          <div class="grid grid-cols-3 gap-3">
            <MetricCard
              label="Domains"
              :value="6"
              color="blue"
            />
            <MetricCard
              label="Tech"
              :value="10"
              suffix="+"
              color="cyan"
            />
            <MetricCard
              label="Projects"
              :value="5"
              suffix="+"
              color="amber"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

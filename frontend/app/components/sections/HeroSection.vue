<script setup lang="ts">
import type { Profile } from '~/types/profile'
import { safeUrl } from '~/utils/url'

const props = defineProps<{
  profile: Profile
  projectCount?: number
  techCount?: number
}>()

const { t } = useI18n()

const domains = [
  { key: 'electrical' as const, label: 'EE', color: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800' },
  { key: 'iot' as const, label: 'IoT', color: 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-200 dark:border-cyan-800' },
  { key: 'data' as const, label: 'Data', color: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-800' },
  { key: 'backend' as const, label: 'Backend', color: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800' },
  { key: 'ml' as const, label: 'ML', color: 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-200 dark:border-cyan-800' },
  { key: 'qa' as const, label: 'QA', color: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-800' },
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
  }
  else {
    displayedRole.value = fullRole.slice(0, displayedRole.value.length - 1)
    if (displayedRole.value === '') {
      isDeleting.value = false
      currentRoleIndex.value = (currentRoleIndex.value + 1) % roles.length
    }
  }

  typeTimeout = setTimeout(typeRole, isDeleting.value ? 40 : typeSpeed.value)
}

const terminalData = computed(() => ({
  fullName: props.profile.fullName,
  headline: props.profile.headline || 'Backend Developer',
  location: props.profile.location || 'Indonesia',
  stack: ['Go', 'Nuxt', 'PostgreSQL'],
}))

const projectMetric = computed(() => props.projectCount || 5)
const techMetric = computed(() => props.techCount || 10)

onMounted(() => {
  setTimeout(typeRole, 1000)
})

onUnmounted(() => {
  if (typeTimeout) clearTimeout(typeTimeout)
})
</script>

<template>
  <section class="relative overflow-hidden min-h-screen flex items-center">
    <!-- Multi-layer background -->
    <div class="absolute inset-0 hero-atmosphere" />
    <div class="bg-grid-pattern bg-grid-animate absolute inset-0 opacity-40" />
    <CircuitPattern :opacity="0.06" class="absolute inset-0" />

    <!-- Floating gradient orbs -->
    <div class="glow-orb animate-float-glow -right-32 top-1/4 h-[500px] w-[500px] bg-blue-600/[0.12]" />
    <div class="glow-orb animate-float-glow -left-20 bottom-10 h-[400px] w-[400px] bg-cyan-500/[0.10]" style="animation-delay: 4s;" />
    <div class="glow-orb animate-float-glow left-1/3 -top-20 h-[300px] w-[300px] bg-amber-500/[0.08]" style="animation-delay: 8s;" />

    <!-- Floating particles -->
    <div class="floating-particle h-3 w-3 bg-blue-400/35 top-[20%] left-[15%]" style="--duration: 10s; --delay: 0s; --tx1: 15px; --ty1: -20px; --tx2: -10px; --ty2: -35px; --tx3: 20px; --ty3: -15px; --opacity: 0.35;" />
    <div class="floating-particle h-2.5 w-2.5 bg-cyan-400/30 top-[30%] right-[20%]" style="--duration: 12s; --delay: 2s; --tx1: -12px; --ty1: -18px; --tx2: 8px; --ty2: -30px; --tx3: -15px; --ty3: -12px; --opacity: 0.3;" />
    <div class="floating-particle h-2 w-2 bg-amber-400/30 top-[60%] left-[10%]" style="--duration: 14s; --delay: 4s; --tx1: 10px; --ty1: -25px; --tx2: -8px; --ty2: -40px; --tx3: 12px; --ty3: -18px; --opacity: 0.3;" />

    <div class="relative z-10 w-full py-20 md:py-28 lg:py-32">
      <div class="app-container">
        <div class="mx-auto max-w-4xl text-center space-y-8">
          <!-- Availability status -->
          <div
            v-motion
            :initial="{ opacity: 0, y: 20 }"
            :visible="{ opacity: 1, y: 0, transition: { duration: 600 } }"
            class="flex items-center justify-center gap-3"
          >
            <span class="status-dot" />
            <span class="font-mono text-sm font-semibold uppercase tracking-[0.2em] text-emerald-600 dark:text-emerald-400">
              {{ t('heroAvailable') }}
            </span>
          </div>

          <!-- Main Headline -->
          <div
            v-motion
            :initial="{ opacity: 0, y: 30 }"
            :visible="{ opacity: 1, y: 0, transition: { duration: 700, delay: 100 } }"
          >
            <h1 class="text-4xl font-extrabold leading-[1.1] tracking-tight text-app-text dark:text-slate-50 sm:text-5xl md:text-6xl lg:text-7xl font-display">
              Building reliable<br>
              backend systems &<br>
              <span class="heading-gradient">data-driven</span> products.
            </h1>
          </div>

          <!-- Avatar + Name + Headline -->
          <div
            v-motion
            :initial="{ opacity: 0, y: 20 }"
            :visible="{ opacity: 1, y: 0, transition: { duration: 600, delay: 200 } }"
            class="flex items-center justify-center gap-4"
          >
            <div v-if="profile.avatarUrl" class="relative h-12 w-12 shrink-0">
              <div class="absolute inset-0 rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 animate-spin-slow" style="animation-duration: 8s;" />
              <div class="absolute inset-[2px] rounded-full overflow-hidden bg-white dark:bg-slate-900">
                <img
                  :src="profile.avatarUrl"
                  :alt="profile.fullName"
                  class="h-full w-full object-cover"
                >
              </div>
            </div>
            <div class="text-left">
              <p class="text-base font-bold text-app-text dark:text-slate-50">
                {{ profile.fullName }}
              </p>
              <p class="text-sm text-app-muted dark:text-slate-400">
                {{ profile.headline || 'Backend Developer' }} &bull; {{ profile.location || 'Indonesia' }}
              </p>
            </div>
          </div>

          <!-- Typewriter role -->
          <div
            v-motion
            :initial="{ opacity: 0, y: 20 }"
            :visible="{ opacity: 1, y: 0, transition: { duration: 600, delay: 300 } }"
            class="flex items-center justify-center gap-2"
          >
            <span class="font-mono text-sm font-semibold uppercase tracking-[0.15em] text-brand-primary">I'm a</span>
            <span class="font-mono text-lg font-bold text-app-text dark:text-slate-50">
              {{ displayedRole }}<span class="typewriter-cursor" />
            </span>
          </div>

          <!-- Description -->
          <p
            v-motion
            :initial="{ opacity: 0, y: 20 }"
            :visible="{ opacity: 1, y: 0, transition: { duration: 600, delay: 400 } }"
            class="mx-auto max-w-2xl text-base leading-7 text-app-muted dark:text-slate-400 md:text-lg"
          >
            {{ t('heroDescription') }}
          </p>

          <!-- CTA buttons -->
          <div
            v-motion
            :initial="{ opacity: 0, y: 20 }"
            :visible="{ opacity: 1, y: 0, transition: { duration: 600, delay: 500 } }"
            class="flex flex-wrap items-center justify-center gap-4"
          >
            <NuxtLink
              to="/projects"
              class="btn-primary group relative overflow-hidden px-8 py-4 text-base"
            >
              <span class="relative z-10 flex items-center gap-2">
                {{ t('heroViewProjects') }}
                <svg class="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </NuxtLink>

            <a
              v-if="profile.cvUrl"
              :href="safeUrl(profile.cvUrl) || undefined"
              target="_blank"
              rel="noopener noreferrer"
              class="btn-secondary px-8 py-4 text-base"
            >
              {{ t('heroDownloadCV') }}
            </a>

            <a
              v-if="profile.email"
              :href="`mailto:${profile.email}`"
              class="btn-ghost px-8 py-4 text-base"
            >
              {{ t('heroContactMe') }}
            </a>
          </div>

          <!-- Code Terminal — API Response -->
          <div
            v-motion
            :initial="{ opacity: 0, y: 30, scale: 0.97 }"
            :visible="{ opacity: 1, y: 0, scale: 1, transition: { duration: 700, delay: 600 } }"
            class="mx-auto max-w-xl"
          >
            <CodeTerminal
              :data="terminalData"
              endpoint="/api/profile"
              :status="200"
            />
          </div>

          <!-- Domain badges -->
          <div
            v-motion
            :initial="{ opacity: 0, y: 20 }"
            :visible="{ opacity: 1, y: 0, transition: { duration: 600, delay: 700 } }"
            class="flex flex-wrap items-center justify-center gap-2.5"
          >
            <span
              v-for="domain in domains"
              :key="domain.key"
              :class="[
                'inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-glow-blue',
                domain.color,
              ]"
            >
              <DomainIcons :domain="domain.key" icon-class="h-4 w-4" />
              {{ domain.label }}
            </span>
          </div>

          <!-- Metric cards -->
          <div
            v-motion
            :initial="{ opacity: 0, y: 20 }"
            :visible="{ opacity: 1, y: 0, transition: { duration: 600, delay: 800 } }"
            class="mx-auto grid max-w-md grid-cols-3 gap-3"
          >
            <MetricCard
              :label="t('aboutDomains')"
              :value="6"
              color="blue"
            />
            <MetricCard
              :label="t('aboutTechnologies')"
              :value="techMetric"
              suffix="+"
              color="cyan"
            />
            <MetricCard
              :label="t('aboutProjects')"
              :value="projectMetric"
              suffix="+"
              color="amber"
            />
          </div>

          <!-- Scroll indicator -->
          <div
            v-motion
            :initial="{ opacity: 0 }"
            :visible="{ opacity: 1, transition: { duration: 600, delay: 1000 } }"
            class="pt-8"
          >
            <a href="#about" class="inline-flex flex-col items-center gap-2 text-app-muted dark:text-slate-400 hover:text-brand-primary transition-colors group">
              <span class="text-xs font-mono uppercase tracking-widest">{{ t('heroScrollExplore') }}</span>
              <svg
                class="h-5 w-5 animate-bounce"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path stroke-linecap="round" stroke-linejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { Profile } from '~/types/profile'

defineProps<{
  profile: Profile
}>()

const capabilities = [
  {
    domain: 'electrical' as const,
    title: 'Electrical Engineering',
    description: 'Circuit design, embedded systems, signal processing, and hardware-software integration.',
    color: 'blue',
    icon: 'EE',
  },
  {
    domain: 'iot' as const,
    title: 'IoT Systems',
    description: 'Sensor networks, device-to-cloud pipelines, MQTT, and real-time data acquisition.',
    color: 'cyan',
    icon: 'IoT',
  },
  {
    domain: 'data' as const,
    title: 'Data Science & Analytics',
    description: 'Data pipelines, visualization, statistical analysis, and dashboard development.',
    color: 'amber',
    icon: 'DATA',
  },
  {
    domain: 'backend' as const,
    title: 'Backend Engineering',
    description: 'REST API, authentication, database design, deployment, and maintainable services.',
    color: 'blue',
    icon: 'API',
  },
  {
    domain: 'ml' as const,
    title: 'Machine Learning',
    description: 'Model training, TensorFlow, data pipelines, prediction systems, and ML operations.',
    color: 'cyan',
    icon: 'ML',
  },
  {
    domain: 'qa' as const,
    title: 'QA & Reliability',
    description: 'Testing strategies, quality assurance, automation, and system reliability.',
    color: 'amber',
    icon: 'QA',
  },
]

function getColorClasses(color: string) {
  switch (color) {
    case 'cyan': return 'bg-cyan-50 text-cyan-700 border-cyan-100'
    case 'amber': return 'bg-amber-50 text-amber-700 border-amber-100'
    default: return 'bg-brand-soft text-brand-primary border-blue-100'
  }
}

function getAccentBarClass(color: string) {
  switch (color) {
    case 'cyan': return 'card-accent-bar-cyan'
    case 'amber': return 'card-accent-bar-amber'
    default: return 'card-accent-bar-blue'
  }
}

function getGlowClass(color: string) {
  switch (color) {
    case 'cyan': return 'group-hover:shadow-glow-cyan'
    case 'amber': return 'group-hover:shadow-glow-amber'
    default: return 'group-hover:shadow-glow-blue'
  }
}

const stats = computed(() => [
  { label: 'Domains', value: '6+', color: 'text-brand-primary' },
  { label: 'Technologies', value: '15+', color: 'text-cyan-600' },
  { label: 'Projects', value: '5+', color: 'text-amber-600' },
])
</script>

<template>
  <section
    id="about"
    class="app-section relative overflow-hidden"
    style="background: linear-gradient(180deg, #F8FAFC 0%, #FFFFFF 30%, rgba(239,246,255,0.3) 60%, #F8FAFC 100%);"
  >
    <!-- Glow orbs -->
    <div class="glow-orb animate-float-glow -left-32 top-1/3 h-80 w-80 bg-blue-600/[0.04]" />
    <div class="glow-orb animate-float-glow -right-20 bottom-1/4 h-64 w-64 bg-cyan-500/[0.03]" style="animation-delay: 6s;" />

    <div class="app-container relative z-10">
      <!-- Section Header — Enhanced -->
      <AnimatedContainer>
        <div class="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeader
            eyebrow="01 / Profile"
            title="Technical Identity"
            description="Developer yang bekerja lintas domain teknikal — dari circuit design hingga machine learning, dari sensor IoT hingga production API."
          />

          <!-- Quick stats -->
          <div class="flex gap-6 md:gap-8">
            <div
              v-for="stat in stats"
              :key="stat.label"
              class="text-center"
            >
              <p :class="['text-2xl font-bold font-display md:text-3xl', stat.color]">{{ stat.value }}</p>
              <p class="mt-1 font-mono text-xs uppercase tracking-wider text-app-muted">{{ stat.label }}</p>
            </div>
          </div>
        </div>
      </AnimatedContainer>

      <!-- Bio Card — More prominent -->
      <AnimatedContainer :delay="100">
        <div class="app-card mt-12 overflow-hidden shadow-card gradient-border">
          <div class="relative p-8 md:p-10">
            <!-- Decorative corner accent -->
            <div class="absolute right-0 top-0 h-32 w-32 bg-gradient-to-bl from-blue-500/[0.04] to-transparent" />
            <div class="absolute bottom-0 left-0 h-24 w-24 bg-gradient-to-tr from-cyan-500/[0.03] to-transparent" />

            <p class="relative z-10 text-lg leading-8 text-app-muted md:text-xl">
              {{ profile.bio || 'Profil developer belum tersedia. Silakan tambahkan data profile melalui seed atau dashboard admin pada fase berikutnya.' }}
            </p>
          </div>
        </div>
      </AnimatedContainer>

      <!-- Capability Cards — Enhanced with glow -->
      <div class="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatedContainer
          v-for="(cap, index) in capabilities"
          :key="cap.domain"
          :delay="(index + 1) * 100"
        >
          <article
            :class="['app-card group h-full overflow-hidden transition-all duration-500', getGlowClass(cap.color)]"
          >
            <!-- Accent bar -->
            <div :class="getAccentBarClass(cap.color)" />

            <div class="p-6 md:p-7">
              <div class="flex items-start gap-4">
                <div
                  :class="['flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border font-mono text-xs font-bold transition-all duration-300 group-hover:scale-110 group-hover:shadow-sm', getColorClasses(cap.color)]"
                >
                  {{ cap.icon }}
                </div>
                <div class="min-w-0">
                  <h3 class="text-lg font-bold text-app-text font-display">
                    {{ cap.title }}
                  </h3>
                  <p class="mt-2.5 text-sm leading-6 text-app-muted">
                    {{ cap.description }}
                  </p>
                </div>
              </div>
            </div>
          </article>
        </AnimatedContainer>
      </div>

      <!-- Info Cards — Enhanced -->
      <AnimatedContainer :delay="600">
        <div class="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div class="group rounded-2xl border border-app-border bg-gradient-to-br from-white to-slate-50/80 p-5 transition-all duration-300 hover:border-blue-200 hover:shadow-card hover:-translate-y-1">
            <p class="font-mono text-xs uppercase tracking-[0.18em] text-brand-primary">
              Name
            </p>
            <p class="mt-2.5 font-bold text-app-text font-display text-lg">
              {{ profile.fullName }}
            </p>
          </div>

          <div class="group rounded-2xl border border-app-border bg-gradient-to-br from-white to-cyan-50/30 p-5 transition-all duration-300 hover:border-cyan-200 hover:shadow-card hover:-translate-y-1">
            <p class="font-mono text-xs uppercase tracking-[0.18em] text-accent-tech">
              Location
            </p>
            <p class="mt-2.5 font-bold text-app-text font-display text-lg">
              {{ profile.location || 'Not specified' }}
            </p>
          </div>

          <div class="group rounded-2xl border border-app-border bg-gradient-to-br from-white to-blue-50/30 p-5 transition-all duration-300 hover:border-blue-200 hover:shadow-card hover:-translate-y-1">
            <p class="font-mono text-xs uppercase tracking-[0.18em] text-brand-primary">
              Email
            </p>
            <a
              v-if="profile.email"
              :href="`mailto:${profile.email}`"
              class="mt-2.5 block font-bold text-app-text hover:text-brand-primary font-display text-lg transition-colors"
            >
              {{ profile.email }}
            </a>
            <p
              v-else
              class="mt-2.5 font-bold text-app-text font-display text-lg"
            >
              Not specified
            </p>
          </div>

          <div class="group rounded-2xl border border-app-border bg-gradient-to-br from-white to-amber-50/30 p-5 transition-all duration-300 hover:border-amber-200 hover:shadow-card hover:-translate-y-1">
            <p class="font-mono text-xs uppercase tracking-[0.18em] text-accent-main">
              Website
            </p>
            <a
              v-if="profile.websiteUrl"
              :href="profile.websiteUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="mt-2.5 block font-bold text-app-text hover:text-brand-primary font-display text-lg transition-colors"
            >
              Visit website
            </a>
            <p
              v-else
              class="mt-2.5 font-bold text-app-text font-display text-lg"
            >
              Portfolio website
            </p>
          </div>
        </div>
      </AnimatedContainer>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { Profile } from '~/types/profile'
import { safeUrl } from '~/utils/url'

defineProps<{
  profile: Profile
  projectCount?: number
  techCount?: number
}>()

const { t } = useI18n()

const capabilities = [
  {
    domain: 'electrical' as const,
    titleKey: 'capEETitle' as const,
    descKey: 'capEEDesc' as const,
    color: 'blue',
    icon: 'EE',
  },
  {
    domain: 'iot' as const,
    titleKey: 'capIoTTitle' as const,
    descKey: 'capIoTDesc' as const,
    color: 'cyan',
    icon: 'IoT',
  },
  {
    domain: 'data' as const,
    titleKey: 'capDataTitle' as const,
    descKey: 'capDataDesc' as const,
    color: 'amber',
    icon: 'Data',
  },
  {
    domain: 'backend' as const,
    titleKey: 'capBackendTitle' as const,
    descKey: 'capBackendDesc' as const,
    color: 'blue',
    icon: 'BE',
  },
  {
    domain: 'ml' as const,
    titleKey: 'capMLTitle' as const,
    descKey: 'capMLDesc' as const,
    color: 'cyan',
    icon: 'ML',
  },
  {
    domain: 'qa' as const,
    titleKey: 'capQATitle' as const,
    descKey: 'capQADesc' as const,
    color: 'amber',
    icon: 'QA',
  },
]

function getBadgeClass(color: string) {
  switch (color) {
    case 'cyan': return 'bg-cyan-50 dark:bg-cyan-950 text-cyan-700 dark:text-cyan-400 border-cyan-100 dark:border-cyan-900'
    case 'amber': return 'bg-amber-50 dark:bg-amber-950 text-amber-700 dark:text-amber-400 border-amber-100 dark:border-amber-900'
    default: return 'bg-brand-soft dark:bg-blue-950 text-brand-primary border-blue-100 dark:border-blue-900'
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
  { label: t('aboutDomains'), value: '6+', color: 'text-brand-primary dark:text-blue-400' },
  { label: t('aboutTechnologies'), value: '15+', color: 'text-cyan-600 dark:text-cyan-400' },
  { label: t('aboutProjects'), value: '5+', color: 'text-amber-600 dark:text-amber-400' },
])
</script>

<template>
  <section
    id="about"
    class="app-section relative overflow-hidden bg-about-gradient"
  >
    <div class="glow-orb animate-float-glow -left-32 top-1/3 h-80 w-80 bg-blue-600/[0.12]" />
    <div class="glow-orb animate-float-glow -right-20 bottom-1/4 h-64 w-64 bg-cyan-500/[0.10]" style="animation-delay: 6s;" />
    <div class="glow-orb animate-float-glow left-1/2 -bottom-20 h-48 w-48 bg-blue-400/[0.08]" style="animation-delay: 12s;" />

    <div class="app-container relative z-10">
      <AnimatedContainer>
        <div class="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeader
            :eyebrow="t('aboutEyebrow')"
            :title="t('aboutTitle')"
            :description="t('aboutDescription')"
          />

          <div class="flex gap-6 md:gap-8">
            <div
              v-for="stat in stats"
              :key="stat.label"
              class="text-center"
            >
              <p :class="['text-2xl font-bold font-display md:text-3xl', stat.color]">{{ stat.value }}</p>
              <p class="mt-1 font-mono text-xs uppercase tracking-wider text-app-muted dark:text-slate-400">{{ stat.label }}</p>
            </div>
          </div>
        </div>
      </AnimatedContainer>

      <!-- Bio Card with Avatar -->
      <AnimatedContainer :delay="100">
        <div class="mt-10 app-card p-6 md:p-8">
          <div class="flex flex-col md:flex-row gap-6">
            <div
              v-if="profile.avatarUrl"
              class="shrink-0"
            >
              <div class="relative h-24 w-24 md:h-32 md:w-32">
                <div class="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500" />
                <div class="absolute inset-[3px] rounded-[13px] overflow-hidden bg-white dark:bg-slate-900">
                  <img
                    :src="profile.avatarUrl"
                    :alt="profile.fullName"
                    class="h-full w-full object-cover"
                  >
                </div>
              </div>
            </div>

            <div class="flex-1">
              <p class="section-eyebrow">{{ t('aboutBioTitle') }}</p>
              <h3 class="mt-3 text-2xl font-bold text-app-text dark:text-slate-50 font-display">
                {{ profile.fullName }}
              </h3>
              <p v-if="profile.headline" class="mt-1 text-sm font-medium text-brand-primary">
                {{ profile.headline }}
              </p>
              <p class="mt-4 text-base leading-7 text-app-muted dark:text-slate-400">
                {{ profile.bio || t('aboutBioDefault') }}
              </p>
            </div>
          </div>
        </div>
      </AnimatedContainer>

      <!-- Capability Cards -->
      <div class="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatedContainer
          v-for="(cap, index) in capabilities"
          :key="cap.domain"
          :delay="150 + index * 80"
        >
          <div
            :class="[
              'app-card group relative overflow-hidden p-6 transition-all duration-500 hover:-translate-y-2 hover:shadow-deep',
              getGlowClass(cap.color),
            ]"
          >
            <div :class="getAccentBarClass(cap.color)" />

            <div class="flex items-start gap-4">
              <div
                :class="[
                  'flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border text-sm font-bold font-display',
                  getBadgeClass(cap.color),
                ]"
              >
                {{ cap.icon }}
              </div>

              <div class="min-w-0 flex-1">
                <h3 class="text-lg font-bold text-app-text dark:text-slate-50 font-display">
                  {{ t(cap.titleKey) }}
                </h3>
                <p class="mt-2 text-sm leading-6 text-app-muted dark:text-slate-400">
                  {{ t(cap.descKey) }}
                </p>
              </div>
            </div>
          </div>
        </AnimatedContainer>
      </div>

      <!-- Info Cards -->
      <div class="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <AnimatedContainer
          v-for="(item, index) in [
            { label: t('aboutInfoName'), value: profile.fullName, icon: '👤' },
            { label: t('aboutInfoLocation'), value: profile.location || t('aboutInfoNotSpecified'), icon: '📍' },
            { label: t('aboutInfoEmail'), value: profile.email, icon: '📧', href: profile.email ? `mailto:${profile.email}` : undefined },
            { label: t('aboutInfoWebsite'), value: profile.websiteUrl || t('aboutInfoNotSpecified'), icon: '🌐', href: safeUrl(profile.websiteUrl) || undefined },
          ]"
          :key="item.label"
          :delay="300 + index * 80"
        >
          <component
            :is="item.href ? 'a' : 'div'"
            :href="item.href || undefined"
            :target="item.href?.startsWith('http') ? '_blank' : undefined"
            :rel="item.href?.startsWith('http') ? 'noopener noreferrer' : undefined"
            class="group app-card block p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-card"
          >
            <div class="flex items-center gap-3">
              <span class="text-xl">{{ item.icon }}</span>
              <div class="min-w-0">
                <p class="font-mono text-xs uppercase tracking-[0.18em] text-brand-primary">
                  {{ item.label }}
                </p>
                <p class="mt-1.5 font-bold text-app-text dark:text-slate-50 font-display truncate">
                  {{ item.value }}
                </p>
              </div>
            </div>
          </component>
        </AnimatedContainer>
      </div>
    </div>
  </section>
</template>

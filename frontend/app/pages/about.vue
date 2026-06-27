<script setup lang="ts">
definePageMeta({ layout: 'default' })

const { data: profile, pending, error, refresh } = useProfile()
const { t, initLocale } = useI18n()
const { isDark } = useDarkMode()

const siteUrl = useRuntimeConfig().public.siteUrl

onMounted(() => {
  initLocale()
})

useSeoMeta({
  title: () => profile.value?.fullName ? `About — ${profile.value.fullName}` : 'About',
  description: () =>
    profile.value?.bio ||
    'Learn more about my technical identity, multidisciplinary engineering background, and professional journey.',
  ogTitle: () => profile.value?.fullName ? `About — ${profile.value.fullName}` : 'About',
  ogDescription: () =>
    profile.value?.bio ||
    'Learn more about my technical identity and professional journey.',
  ogUrl: `${siteUrl}/about`,
  ogType: 'profile',
  twitterCard: 'summary_large_image',
})

const capabilities = computed(() => [
  { key: 'EE', title: t('capEETitle'), desc: t('capEEDesc'), icon: 'electrical' },
  { key: 'IoT', title: t('capIoTTitle'), desc: t('capIoTDesc'), icon: 'iot' },
  { key: 'Data', title: t('capDataTitle'), desc: t('capDataDesc'), icon: 'data' },
  { key: 'Backend', title: t('capBackendTitle'), desc: t('capBackendDesc'), icon: 'backend' },
  { key: 'ML', title: t('capMLTitle'), desc: t('capMLDesc'), icon: 'ml' },
  { key: 'QA', title: t('capQATitle'), desc: t('capQADesc'), icon: 'qa' },
])

function retry() {
  refresh()
}
</script>

<template>
  <div>
    <LoadingState
      v-if="pending"
      class="app-container my-16"
    />

    <ErrorState
      v-else-if="error"
      class="app-container my-16"
      :title="t('commonError')"
      :message="error.message"
      @retry="retry"
    />

    <template v-else-if="profile">
      <!-- Hero Section -->
      <section class="relative overflow-hidden bg-white py-20 dark:bg-slate-950 md:py-28">
        <div class="app-container">
          <AnimatedContainer>
            <p class="font-mono text-sm font-semibold uppercase tracking-[0.2em] text-cyan-500">
              {{ t('aboutEyebrow') }}
            </p>

            <div class="mt-8 grid items-center gap-12 lg:grid-cols-[auto_1fr]">
              <!-- Avatar -->
              <div class="flex justify-center lg:justify-start">
                <div class="relative h-40 w-40 overflow-hidden rounded-3xl border-4 border-slate-100 shadow-elevated dark:border-slate-800 md:h-52 md:w-52">
                  <img
                    v-if="profile.avatarUrl"
                    :src="profile.avatarUrl"
                    :alt="profile.fullName"
                    class="h-full w-full object-cover"
                  >
                  <div
                    v-else
                    class="flex h-full w-full items-center justify-center bg-gradient-to-br from-blue-500 to-cyan-500 text-5xl font-bold text-white"
                  >
                    {{ profile.fullName?.charAt(0) || '?' }}
                  </div>
                </div>
              </div>

              <!-- Bio -->
              <div>
                <h1 class="text-4xl font-bold tracking-tight text-app-text dark:text-slate-50 md:text-5xl lg:text-6xl font-display">
                  {{ t('aboutBioTitle') }}
                </h1>
                <p class="mt-6 max-w-2xl text-lg leading-8 text-app-muted dark:text-slate-300 md:text-xl">
                  {{ profile.bio || t('aboutBioDefault') }}
                </p>

                <!-- Quick Info -->
                <div class="mt-8 flex flex-wrap gap-4">
                  <div v-if="profile.location" class="flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-app-muted dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
                    <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path stroke-linecap="round" stroke-linejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {{ profile.location }}
                  </div>

                  <div v-if="profile.email" class="flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-app-muted dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
                    <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    {{ profile.email }}
                  </div>
                </div>
              </div>
            </div>
          </AnimatedContainer>
        </div>
      </section>

      <!-- Capabilities -->
      <section class="relative overflow-hidden bg-app-background py-20 dark:bg-slate-950 md:py-28">
        <div class="app-container">
          <AnimatedContainer>
            <h2 class="text-3xl font-bold tracking-tight text-app-text dark:text-slate-50 md:text-4xl font-display">
              {{ t('aboutDomains') }}
            </h2>
          </AnimatedContainer>

          <div class="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatedContainer
              v-for="(cap, index) in capabilities"
              :key="cap.key"
              :delay="index * 100"
            >
              <div class="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:border-brand-primary hover:shadow-elevated dark:border-slate-800 dark:bg-slate-900 dark:hover:border-brand-primary">
                <div class="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-soft text-brand-primary dark:bg-blue-950">
                  <DomainIcons :domain="cap.icon" class="h-6 w-6" />
                </div>
                <h3 class="mt-4 text-lg font-semibold text-app-text dark:text-slate-50">
                  {{ cap.title }}
                </h3>
                <p class="mt-2 text-sm leading-6 text-app-muted dark:text-slate-400">
                  {{ cap.desc }}
                </p>
              </div>
            </AnimatedContainer>
          </div>
        </div>
      </section>

      <!-- Experience -->
      <ExperienceSection />

      <!-- Achievements -->
      <AchievementSection />

      <!-- Contact CTA -->
      <div class="relative h-20 bg-gradient-to-b from-app-background via-white to-white dark:from-slate-950 dark:via-slate-950 dark:to-slate-950">
        <svg class="absolute bottom-0 left-0 right-0 w-full" viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path d="M0 60V30C240 10 480 0 720 10C960 20 1200 40 1440 30V60H0Z" :fill="isDark ? '#020617' : 'white'" />
        </svg>
      </div>

      <ContactSection :profile="profile" />
    </template>
  </div>
</template>

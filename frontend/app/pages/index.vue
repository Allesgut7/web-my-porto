<script setup lang="ts">
const { data: profile, pending: profilePending, error: profileError, refresh: refreshProfile } = useProfile()
const { data: projects, pending: projectsPending, error: projectsError, refresh: refreshProjects } = useFeaturedProjects(3)
const { t, initLocale } = useI18n()

const siteUrl = useRuntimeConfig().public.siteUrl

onMounted(() => {
  initLocale()
})

useSeoMeta({
  title: () => profile.value?.fullName ? `${profile.value.fullName} — Cyber-Physical Systems Developer` : 'Cyber-Physical Systems Developer',
  description: () =>
    profile.value?.bio ||
    'Portfolio developer — Electrical Engineer, IoT, Data Science, Backend, Machine Learning. Building systems at the intersection of hardware and software.',
  ogTitle: () => profile.value?.fullName ? `${profile.value.fullName} — Developer Portfolio` : 'Developer Portfolio',
  ogDescription: () =>
    profile.value?.bio ||
    'Portfolio developer — Electrical Engineer, IoT, Data Science, Backend, Machine Learning.',
  ogUrl: siteUrl,
  ogType: 'website',
  twitterCard: 'summary_large_image',
})

const { isDark } = useDarkMode()

const projectCount = computed(() => projects.value?.length || 0)
const techCount = computed(() => {
  if (!projects.value) return 0
  const techs = new Set<string>()
  projects.value.forEach(p => p.techStacks.forEach(s => techs.add(s.name)))
  return techs.size || 10
})

function retryProfile() {
  refreshProfile()
}

function retryProjects() {
  refreshProjects()
}
</script>

<template>
  <div>
    <LoadingState
      v-if="profilePending"
      class="app-container my-16"
    />

    <ErrorState
      v-else-if="profileError"
      class="app-container my-16"
      :title="t('commonError')"
      :message="profileError.message"
      @retry="retryProfile"
    />

    <template v-else-if="profile">
      <HeroSection
        :profile="profile"
        :project-count="projectCount"
        :tech-count="techCount"
      />

      <div class="relative h-16 bg-gradient-to-b from-white to-app-background dark:from-slate-950 dark:to-slate-950" />

      <section v-if="projectsPending" class="app-section">
        <div class="app-container grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <LoadingState />
          <LoadingState />
          <LoadingState />
        </div>
      </section>

      <ErrorState
        v-else-if="projectsError"
        class="app-container my-16"
        :title="t('projectsError')"
        :message="projectsError.message"
        @retry="retryProjects"
      />

      <ProjectSection
        v-else
        :projects="projects || []"
      />

      <div class="relative h-20 bg-gradient-to-b from-white via-slate-100 to-app-background dark:from-slate-950 dark:via-slate-900 dark:to-slate-950" />

      <SkillsSection />

      <div class="relative h-20 bg-gradient-to-b from-app-background via-white to-white dark:from-slate-950 dark:via-slate-950 dark:to-slate-950">
        <svg class="absolute bottom-0 left-0 right-0 w-full" viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path d="M0 60V30C240 10 480 0 720 10C960 20 1200 40 1440 30V60H0Z" :fill="isDark ? '#020617' : 'white'" />
        </svg>
      </div>

      <ContactSection :profile="profile" />
    </template>
  </div>
</template>

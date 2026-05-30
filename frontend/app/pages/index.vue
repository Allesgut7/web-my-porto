<script setup lang="ts">
const {
  data: profile,
  pending: profilePending,
  error: profileError,
  refresh: refreshProfile,
} = await useProfile()

const {
  data: projects,
  pending: projectsPending,
  error: projectsError,
  refresh: refreshProjects,
} = await useFeaturedProjects(6)

const isLoading = computed(() => profilePending.value || projectsPending.value)
const hasError = computed(() => profileError.value || projectsError.value)

async function retry() {
  await Promise.all([refreshProfile(), refreshProjects()])
}

useSeoMeta({
  title: 'Web My Porto — Technical Developer Portfolio',
  description: 'A modern technical portfolio showcasing developer profile, selected projects, and database-driven portfolio works.',
})
</script>

<template>
  <div>
    <LoadingState
      v-if="isLoading"
      title="Loading portfolio"
      message="Fetching profile and selected project data from the API."
    />

    <ErrorState
      v-else-if="hasError"
      title="Portfolio failed to load"
      message="The public API is currently unavailable. Please try again."
      @retry="retry"
    />

    <template v-else>
      <HeroSection :profile="profile" />
      <AboutSection :profile="profile" />

      <section class="bg-app-background py-12">
        <div class="app-container">
          <div class="grid gap-4 md:grid-cols-5">
            <CapabilityCard
              title="Backend"
              description="REST API, auth, validation, layered architecture."
              label="Go"
              tone="primary"
            />
            <CapabilityCard
              title="Frontend"
              description="Nuxt, TypeScript, Tailwind, responsive UI."
              label="Vue"
              tone="tech"
            />
            <CapabilityCard
              title="Data"
              description="Database-driven content and structured data flow."
              label="SQL"
              tone="accent"
            />
            <CapabilityCard
              title="Testing"
              description="Manual integration testing and regression flow."
              label="QA"
              tone="primary"
            />
            <CapabilityCard
              title="Deployment"
              description="Docker-ready architecture for production setup."
              label="DevOps"
              tone="tech"
            />
          </div>
        </div>
      </section>

      <ProjectSection :projects="projects || []" />
      <ContactSection :profile="profile" />
    </template>
  </div>
</template>
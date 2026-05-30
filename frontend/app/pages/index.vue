<script setup lang="ts">
// definePageMeta({
//   layout: 'public',
// })

const { data: profile, pending: profilePending, error: profileError, refresh: refreshProfile } = useProfile()
const { data: projects, pending: projectsPending, error: projectsError, refresh: refreshProjects } = useFeaturedProjects(3)

const siteUrl = useRuntimeConfig().public.siteUrl

useSeoMeta({
  title: () => profile.value?.fullName ? `${profile.value.fullName} — Developer Portfolio` : 'Developer Portfolio',
  description: () =>
    profile.value?.bio ||
    'Portfolio developer berbasis database-driven content yang menampilkan profil, project, dan kontak profesional.',
  ogTitle: () => profile.value?.fullName ? `${profile.value.fullName} — Developer Portfolio` : 'Developer Portfolio',
  ogDescription: () =>
    profile.value?.bio ||
    'Portfolio developer berbasis database-driven content yang menampilkan profil, project, dan kontak profesional.',
  ogUrl: siteUrl,
  ogType: 'website',
  twitterCard: 'summary_large_image',
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
      title="Profile gagal dimuat"
      :message="profileError.message"
      @retry="retryProfile"
    />

    <template v-else-if="profile">
      <HeroSection :profile="profile" />
      <AboutSection :profile="profile" />

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
        title="Project gagal dimuat"
        :message="projectsError.message"
        @retry="retryProjects"
      />

      <ProjectSection
        v-else
        :projects="projects || []"
      />

      <ContactSection :profile="profile" />
    </template>
  </div>
</template>
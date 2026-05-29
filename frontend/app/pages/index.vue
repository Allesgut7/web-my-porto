<script setup lang="ts">
import AboutSection from '../components/sections/AboutSection.vue'
import ContactLinkSection from '../components/sections/ContactLinkSection.vue'
import HeroSection from '../components/sections/HeroSection.vue'
import ProjectSection from '../components/sections/ProjectSection.vue'
import { useProjects } from '../composables/useProjects'
import {useProfile} from "../composables/useProfile";
import { useSeoMeta } from '#app'


const { useProfileData } = useProfile()
const { useProjectsData } = useProjects()

const {
  data: profile,
  pending: profilePending,
  error: profileError,
} = await useProfileData()

const projectQuery = ref({
  page: 1,
  limit: 6,
  featured: true,
  sort: 'display_order' as const,
})

const {
  data: projectsResponse,
  pending: projectsPending,
  error: projectsError,
} = await useProjectsData(projectQuery)

const projects = computed(() => projectsResponse.value?.data || [])

useSeoMeta({
  title: () => `${profile.value?.fullName || 'Developer'} — Developer Portfolio`,
  description: () =>
    profile.value?.bio ||
    'Modern technical portfolio showcasing backend, data, QA, and engineering projects.',
  ogTitle: () => `${profile.value?.fullName || 'Developer'} — Developer Portfolio`,
  ogDescription: () =>
    profile.value?.bio ||
    'Modern technical portfolio showcasing backend, data, QA, and engineering projects.',
  ogType: 'website',
})
</script>

<template>
  <div>
    <section v-if="profilePending" class="technical-grid app-section">
      <div class="app-container grid gap-12 lg:grid-cols-2">
        <div class="space-y-5">
          <div class="h-4 w-48 animate-pulse rounded bg-slate-200" />
          <div class="h-12 w-full animate-pulse rounded bg-slate-200" />
          <div class="h-12 w-4/5 animate-pulse rounded bg-slate-200" />
          <div class="h-24 w-full animate-pulse rounded bg-slate-200" />
        </div>
        <div class="app-card h-80 animate-pulse bg-slate-100" />
      </div>
    </section>

    <section v-else-if="profileError" class="app-section">
      <div class="app-container">
        <div class="app-card p-8 text-center">
          <div class="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-amber-50 text-accent-main">
            !
          </div>
          <h1 class="mt-5 text-xl font-bold text-app-text">
            Unable to load profile data.
          </h1>
          <p class="mt-2 text-sm text-app-muted">
            Please make sure the backend API is running and `NUXT_PUBLIC_API_BASE_URL` is correct.
          </p>
        </div>
      </div>
    </section>

    <template v-else>
      <HeroSection :profile="profile || null" />
      <AboutSection :profile="profile || null" />
      <ProjectSection
        :projects="projects"
        :pending="projectsPending"
        :error="projectsError"
      />
      <ContactLinkSection :profile="profile || null" />
    </template>
  </div>
</template>
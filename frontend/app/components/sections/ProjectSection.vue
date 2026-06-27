<script setup lang="ts">
import type { ProjectListItem } from '~/types/project'
import { safeUrl } from '~/utils/url'

const props = defineProps<{
  projects: ProjectListItem[]
}>()

const { t } = useI18n()

const featuredProject = computed(() => props.projects?.[0] ?? null)
const remainingProjects = computed(() => props.projects?.slice(1) ?? [])

function formatYear(date?: string | null) {
  if (!date) return null
  const parsed = new Date(date)
  if (Number.isNaN(parsed.getTime())) return null
  return parsed.getFullYear()
}
</script>

<template>
  <section
    id="projects"
    class="app-section relative overflow-hidden bg-project-gradient"
  >
    <!-- Glow orbs — boosted -->
    <div class="glow-orb animate-float-glow right-0 top-0 h-96 w-96 bg-cyan-500/[0.10]" />
    <div class="glow-orb animate-float-glow -left-20 bottom-1/3 h-72 w-72 bg-blue-500/[0.08]" style="animation-delay: 5s;" />

    <div class="app-container relative z-10">
      <!-- Section Header -->
      <div
        v-motion
        :initial="{ opacity: 0, y: 30 }"
        :visible="{ opacity: 1, y: 0, transition: { duration: 600 } }"
        class="flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
      >
        <SectionHeader
          :eyebrow="t('projectsEyebrow')"
          :title="t('projectsTitle')"
          :description="t('projectsDescription')"
        />

        <NuxtLink
          to="/projects"
          class="btn-secondary w-fit group"
        >
          <span>{{ t('projectsViewAll') }}</span>
          <svg
            class="ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </NuxtLink>
      </div>

      <!-- Featured Project — Full width hero card -->
      <div v-if="featuredProject" class="mt-10">
        <article
          v-motion
          :initial="{ opacity: 0, y: 40 }"
          :visible="{ opacity: 1, y: 0, transition: { duration: 700, delay: 100 } }"
          class="app-card overflow-hidden group transition-all duration-500 hover:shadow-deep hover:border-blue-200 dark:hover:border-blue-800 hover:-translate-y-1 gradient-border"
        >
          <!-- Accent bar -->
          <div class="card-accent-bar-amber" />

          <div class="grid gap-0 md:grid-cols-[1.2fr_1fr]">
            <!-- Thumbnail -->
            <NuxtLink
              :to="`/projects/${featuredProject.slug}`"
              class="block relative aspect-[16/10] overflow-hidden bg-brand-soft md:aspect-auto"
            >
              <img
                v-if="featuredProject.thumbnailUrl"
                :src="featuredProject.thumbnailUrl"
                :alt="`Thumbnail project ${featuredProject.title}`"
                class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              >
              <FallbackThumbnail
                v-else
                :project-type="featuredProject.projectType"
                :title="featuredProject.title"
              />
              <!-- Gradient overlay -->
              <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <!-- Featured badge -->
              <div class="absolute left-4 top-4">
                <span class="inline-flex items-center gap-1.5 rounded-full bg-amber-500/90 px-3 py-1.5 text-xs font-bold text-white backdrop-blur-sm">
                  <svg class="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  Featured
                </span>
              </div>
              <!-- Year badge -->
              <div
                v-if="formatYear(featuredProject.completedAt || featuredProject.startedAt)"
                class="absolute right-3 top-3"
              >
                <span class="inline-flex items-center rounded-lg bg-black/50 px-2.5 py-1 font-mono text-xs font-semibold text-white backdrop-blur-sm">
                  {{ formatYear(featuredProject.completedAt || featuredProject.startedAt) }}
                </span>
              </div>
            </NuxtLink>

            <!-- Content -->
            <div class="flex flex-col justify-center p-6 md:p-8 lg:p-10">
              <div class="flex flex-wrap gap-2">
                <span
                  v-if="featuredProject.projectType"
                  class="badge-tech"
                >
                  {{ featuredProject.projectType }}
                </span>
                <span class="badge-primary">{{ t('projectsViewCaseStudy') }}</span>
              </div>

              <h3 class="mt-5 text-2xl font-bold tracking-tight text-app-text dark:text-slate-50 md:text-3xl font-display">
                <NuxtLink
                  :to="`/projects/${featuredProject.slug}`"
                  class="transition-colors duration-200 hover:text-brand-primary"
                >
                  {{ featuredProject.title }}
                </NuxtLink>
              </h3>

              <p class="mt-4 line-clamp-3 text-base leading-7 text-app-muted dark:text-slate-400">
                {{ featuredProject.shortDescription || 'Deskripsi singkat project belum tersedia.' }}
              </p>

              <div
                v-if="featuredProject.techStacks.length"
                class="mt-6 flex flex-wrap gap-2"
              >
                <TechBadge
                  v-for="stack in featuredProject.techStacks.slice(0, 5)"
                  :key="stack.name"
                  :tech="stack"
                />
                <span
                  v-if="featuredProject.techStacks.length > 5"
                  class="badge"
                >
                  +{{ featuredProject.techStacks.length - 5 }} {{ t('projectsMore') }}
                </span>
              </div>

              <div class="mt-8 flex items-center gap-4">
                <NuxtLink
                  :to="`/projects/${featuredProject.slug}`"
                  class="text-sm font-semibold text-brand-primary hover:text-blue-800 dark:hover:text-blue-300 group/link inline-flex items-center gap-1.5 transition-colors"
                >
                  {{ t('projectsViewCaseStudy') }}
                  <svg
                    class="h-4 w-4 transition-transform duration-200 group-hover/link:translate-x-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2.5"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </NuxtLink>

                <div class="flex gap-3">
                  <a
                    v-if="featuredProject.demoUrl"
                    :href="safeUrl(featuredProject.demoUrl) || undefined"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="btn-ghost"
                    @click.stop
                  >
                    Demo
                  </a>
                  <a
                    v-if="featuredProject.repositoryUrl"
                    :href="safeUrl(featuredProject.repositoryUrl) || undefined"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="btn-ghost"
                    @click.stop
                  >
                    Repo
                  </a>
                </div>
              </div>
            </div>
          </div>
        </article>
      </div>

      <!-- Remaining Projects — 3-column grid with stagger -->
      <div
        v-if="remainingProjects.length"
        class="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3"
      >
        <div
          v-for="(project, index) in remainingProjects"
          :key="project.id"
          v-motion
          :initial="{ opacity: 0, y: 40 }"
          :visible="{ opacity: 1, y: 0, transition: { duration: 600, delay: (index + 1) * 150 } }"
        >
          <ProjectCard :project="project" />
        </div>
      </div>

      <!-- Empty state -->
      <div
        v-if="!projects || projects.length === 0"
        v-motion
        :initial="{ opacity: 0, scale: 0.95 }"
        :visible="{ opacity: 1, scale: 1, transition: { duration: 500 } }"
        class="mt-10"
      >
        <EmptyState :title="t('projectsEmpty')" />
      </div>

      <!-- View all link (bottom) -->
      <div
        v-if="projects && projects.length > 0"
        v-motion
        :initial="{ opacity: 0, y: 20 }"
        :visible="{ opacity: 1, y: 0, transition: { duration: 500, delay: 400 } }"
        class="mt-12 text-center"
      >
        <NuxtLink
          to="/projects"
          class="inline-flex items-center gap-2 text-sm font-semibold text-brand-primary hover:text-blue-800 dark:hover:text-blue-300 transition-colors group"
        >
          {{ t('projectsViewAll') }}
          <svg
            class="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2.5"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { ProjectListItem } from '~/types/project'
import { safeUrl } from '~/utils/url'

defineProps<{
  projects: ProjectListItem[]
}>()
</script>

<template>
  <section
    id="projects"
    class="app-section relative overflow-hidden"
    style="background: linear-gradient(180deg, #FFFFFF 0%, rgba(248,250,252,0.6) 50%, #FFFFFF 100%);"
  >
    <!-- Glow orbs -->
    <div class="glow-orb animate-float-glow right-0 top-0 h-96 w-96 bg-cyan-500/[0.03]" />
    <div class="glow-orb animate-float-glow -left-20 bottom-1/3 h-72 w-72 bg-blue-500/[0.03]" style="animation-delay: 5s;" />

    <div class="app-container relative z-10">
      <AnimatedContainer>
        <div class="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeader
            eyebrow="02 / Featured Work"
            title="Selected projects"
            description="Project published yang dikelola dari backend dan ditampilkan otomatis melalui Public API."
          />

          <NuxtLink
            to="/projects"
            class="btn-secondary w-fit group"
          >
            <span>View all projects</span>
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
      </AnimatedContainer>

      <!-- Featured Project — Large hero card -->
      <div v-if="projects?.length" class="mt-10">
        <AnimatedContainer :delay="100">
          <article class="app-card overflow-hidden group transition-all duration-500 hover:shadow-deep hover:border-blue-200 hover:-translate-y-1 gradient-border">
            <!-- Accent bar -->
            <div class="card-accent-bar-amber" />

            <div class="grid gap-0 md:grid-cols-[1.2fr_1fr]">
              <!-- Thumbnail -->
              <NuxtLink
                :to="`/projects/${projects[0].slug}`"
                class="block relative aspect-[16/10] overflow-hidden bg-brand-soft md:aspect-auto"
              >
                <img
                  v-if="projects[0].thumbnailUrl"
                  :src="projects[0].thumbnailUrl"
                  :alt="`Thumbnail project ${projects[0].title}`"
                  class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                >
                <FallbackThumbnail
                  v-else
                  :project-type="projects[0].projectType"
                  :title="projects[0].title"
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
              </NuxtLink>

              <!-- Content -->
              <div class="flex flex-col justify-center p-6 md:p-8 lg:p-10">
                <div class="flex flex-wrap gap-2">
                  <span
                    v-if="projects[0].projectType"
                    class="badge-tech"
                  >
                    {{ projects[0].projectType }}
                  </span>
                  <span class="badge-primary">Case Study</span>
                </div>

                <h3 class="mt-5 text-2xl font-bold tracking-tight text-app-text md:text-3xl font-display">
                  <NuxtLink
                    :to="`/projects/${projects[0].slug}`"
                    class="transition-colors duration-200 hover:text-brand-primary"
                  >
                    {{ projects[0].title }}
                  </NuxtLink>
                </h3>

                <p class="mt-4 line-clamp-3 text-base leading-7 text-app-muted">
                  {{ projects[0].shortDescription || 'Deskripsi singkat project belum tersedia.' }}
                </p>

                <div
                  v-if="projects[0].techStacks.length"
                  class="mt-6 flex flex-wrap gap-2"
                >
                  <TechBadge
                    v-for="stack in projects[0].techStacks.slice(0, 5)"
                    :key="stack.name"
                    :tech="stack"
                  />
                  <span
                    v-if="projects[0].techStacks.length > 5"
                    class="badge"
                  >
                    +{{ projects[0].techStacks.length - 5 }} more
                  </span>
                </div>

                <div class="mt-8 flex items-center gap-4">
                  <NuxtLink
                    :to="`/projects/${projects[0].slug}`"
                    class="btn-primary group/link inline-flex items-center gap-2"
                  >
                    View case study
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
                      v-if="projects[0].demoUrl"
                      :href="safeUrl(projects[0].demoUrl) || undefined"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="btn-ghost"
                      @click.stop
                    >
                      Demo
                    </a>
                    <a
                      v-if="projects[0].repositoryUrl"
                      :href="safeUrl(projects[0].repositoryUrl) || undefined"
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
        </AnimatedContainer>
      </div>

      <!-- Remaining Projects — Grid -->
      <div
        v-if="projects && projects.length > 1"
        class="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3"
      >
        <AnimatedContainer
          v-for="(project, index) in projects.slice(1)"
          :key="project.id"
          :delay="(index + 1) * 150"
        >
          <ProjectCard :project="project" />
        </AnimatedContainer>
      </div>

      <EmptyState
        v-if="!projects || projects.length === 0"
        class="mt-10"
        title="Belum ada featured project"
        message="Project published akan tampil otomatis setelah tersedia dari backend."
      />
    </div>
  </section>
</template>

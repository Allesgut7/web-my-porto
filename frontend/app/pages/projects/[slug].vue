<script setup lang="ts">
const route = useRoute()
const slug = String(route.params.slug || '')

const {
  data: project,
  pending,
  error,
  refresh,
} = await useProjectDetail(slug)

const title = computed(() => project.value?.title || 'Project Detail')
const description = computed(() => {
  return (
    project.value?.shortDescription ||
    project.value?.description ||
    'Project case study and technical implementation detail.'
  )
})

const techStacks = computed(() => project.value?.techStacks || [])
const thumbnailUrl = computed(() => resolveImageUrl(project.value))

useSeoMeta({
  title: () => `${title.value} — Project Case Study`,
  description: () => description.value,
  ogTitle: () => `${title.value} — Project Case Study`,
  ogDescription: () => description.value,
  ogImage: () => project.value?.thumbnailUrl || undefined,
})
</script>

<template>
  <div>
    <LoadingState
      v-if="pending"
      title="Loading case study"
      message="Fetching project detail from the public API."
    />

    <ErrorState
      v-else-if="error"
      title="Project not found"
      :message="error.message"
      @retry="refresh"
    />

    <template v-else-if="project">
      <section class="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-cyan-50 py-20 md:py-28">
        <div class="absolute inset-0 technical-grid opacity-70" />
        <div class="absolute -right-24 top-16 h-72 w-72 rounded-full bg-cyan-200/40 blur-3xl" />

        <div class="app-container relative">
          <NuxtLink
            to="/projects"
            class="inline-flex items-center text-sm font-semibold text-brand-primary hover:text-blue-800"
          >
            ← Back to projects
          </NuxtLink>

          <div class="mt-8 grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <AnimatedContainer>
              <p class="section-eyebrow">
                Project Case Study
              </p>

              <h1 class="mt-4 text-4xl font-bold tracking-tight text-app-text md:text-6xl">
                {{ project.title }}
              </h1>

              <p class="mt-6 max-w-3xl text-lg leading-8 text-app-muted">
                {{ description }}
              </p>

              <div class="mt-6 flex flex-wrap gap-3">
                <TechBadge
                  v-if="project.projectType"
                  :label="project.projectType"
                  tone="tech"
                />

                <TechBadge
                  v-if="project.isFeatured"
                  label="Featured"
                  tone="accent"
                />

                <TechBadge
                  label="Published"
                  tone="primary"
                />
              </div>
            </AnimatedContainer>

            <AnimatedContainer :delay="140">
              <div class="overflow-hidden rounded-3xl border border-app-border bg-white shadow-card">
                <div class="aspect-[16/9] overflow-hidden">
                  <img
                    v-if="thumbnailUrl"
                    :src="thumbnailUrl"
                    :alt="`${project.title} hero image`"
                    class="h-full w-full object-cover"
                  >

                  <FallbackThumbnail
                    v-else
                    :title="project.title"
                    :label="project.projectType || 'Case Study'"
                  />
                </div>
              </div>
            </AnimatedContainer>
          </div>
        </div>
      </section>

      <section class="app-section bg-app-background">
        <div class="app-container">
          <div class="grid gap-8 lg:grid-cols-[1fr_360px]">
            <main class="space-y-8">
              <AnimatedContainer>
                <article class="app-card p-6 md:p-8">
                  <p class="section-eyebrow">
                    Overview
                  </p>
                  <h2 class="mt-3 text-2xl font-bold text-app-text">
                    What this project is about
                  </h2>
                  <p class="mt-4 whitespace-pre-line text-base leading-8 text-app-muted">
                    {{ project.description || project.shortDescription || 'No detailed description available yet.' }}
                  </p>
                </article>
              </AnimatedContainer>

              <AnimatedContainer :delay="100">
                <div class="grid gap-6 md:grid-cols-2">
                  <article class="app-card p-6 md:p-8">
                    <p class="section-eyebrow">
                      Problem
                    </p>
                    <h3 class="mt-3 text-xl font-bold text-app-text">
                      Requirement-driven implementation
                    </h3>
                    <p class="mt-4 text-sm leading-7 text-app-muted">
                      This project is presented as a technical portfolio case study. The implementation focuses on solving a real user flow with clear structure, maintainable code, and reliable data handling.
                    </p>
                  </article>

                  <article class="app-card p-6 md:p-8">
                    <p class="section-eyebrow">
                      Solution
                    </p>
                    <h3 class="mt-3 text-xl font-bold text-app-text">
                      Structured system delivery
                    </h3>
                    <p class="mt-4 text-sm leading-7 text-app-muted">
                      The solution is built around reusable components, API-driven content, responsive layout, and integration-tested behavior from admin input to public display.
                    </p>
                  </article>
                </div>
              </AnimatedContainer>

              <AnimatedContainer :delay="160">
                <article class="app-card p-6 md:p-8">
                  <p class="section-eyebrow">
                    Technical Notes
                  </p>
                  <h2 class="mt-3 text-2xl font-bold text-app-text">
                    Built with a content-first architecture
                  </h2>

                  <div class="mt-6 grid gap-4 md:grid-cols-3">
                    <div class="rounded-2xl bg-slate-50 p-5 ring-1 ring-app-border">
                      <p class="text-sm font-bold text-app-text">
                        API-driven
                      </p>
                      <p class="mt-2 text-sm leading-6 text-app-muted">
                        Public content is rendered from API response.
                      </p>
                    </div>

                    <div class="rounded-2xl bg-slate-50 p-5 ring-1 ring-app-border">
                      <p class="text-sm font-bold text-app-text">
                        Responsive
                      </p>
                      <p class="mt-2 text-sm leading-6 text-app-muted">
                        Layout adapts across mobile, tablet, and desktop.
                      </p>
                    </div>

                    <div class="rounded-2xl bg-slate-50 p-5 ring-1 ring-app-border">
                      <p class="text-sm font-bold text-app-text">
                        Validated
                      </p>
                      <p class="mt-2 text-sm leading-6 text-app-muted">
                        Flow is checked through integration testing.
                      </p>
                    </div>
                  </div>
                </article>
              </AnimatedContainer>
            </main>

            <aside class="space-y-6 lg:sticky lg:top-24 lg:self-start">
              <AnimatedContainer :delay="120">
                <div class="app-card p-6">
                  <p class="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-app-muted">
                    Metadata
                  </p>

                  <dl class="mt-5 space-y-4">
                    <div>
                      <dt class="text-xs font-semibold uppercase tracking-[0.16em] text-app-muted">
                        Type
                      </dt>
                      <dd class="mt-1 text-sm font-semibold text-app-text">
                        {{ project.projectType || 'Project' }}
                      </dd>
                    </div>

                    <div v-if="project.startedAt">
                      <dt class="text-xs font-semibold uppercase tracking-[0.16em] text-app-muted">
                        Started
                      </dt>
                      <dd class="mt-1 text-sm font-semibold text-app-text">
                        {{ project.startedAt }}
                      </dd>
                    </div>

                    <div v-if="project.completedAt">
                      <dt class="text-xs font-semibold uppercase tracking-[0.16em] text-app-muted">
                        Completed
                      </dt>
                      <dd class="mt-1 text-sm font-semibold text-app-text">
                        {{ project.completedAt }}
                      </dd>
                    </div>
                  </dl>
                </div>
              </AnimatedContainer>

              <AnimatedContainer
                v-if="techStacks.length"
                :delay="180"
              >
                <div class="app-card p-6">
                  <p class="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-app-muted">
                    Tech Stack
                  </p>

                  <div class="mt-5 flex flex-wrap gap-2">
                    <TechBadge
                      v-for="stack in techStacks"
                      :key="stack.id || stack.name"
                      :label="stack.name"
                      tone="neutral"
                    />
                  </div>
                </div>
              </AnimatedContainer>

              <AnimatedContainer :delay="220">
                <div class="app-card p-6">
                  <p class="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-app-muted">
                    Links
                  </p>

                  <div class="mt-5 grid gap-3">
                    <a
                      v-if="project.demoUrl"
                      :href="project.demoUrl"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="btn-primary w-full"
                    >
                      Open Demo
                    </a>

                    <a
                      v-if="project.repositoryUrl"
                      :href="project.repositoryUrl"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="btn-secondary w-full"
                    >
                      Repository
                    </a>

                    <a
                      v-if="project.documentationUrl"
                      :href="project.documentationUrl"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="btn-secondary w-full"
                    >
                      Documentation
                    </a>

                    <NuxtLink
                      to="/projects"
                      class="btn-ghost w-full"
                    >
                      Back to projects
                    </NuxtLink>
                  </div>
                </div>
              </AnimatedContainer>
            </aside>
          </div>
        </div>
      </section>
    </template>
  </div>
</template>
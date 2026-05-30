<script setup lang="ts">
type ProfileLike = {
  name?: string | null
  fullName?: string | null
  role?: string | null
  headline?: string | null
  bio?: string | null
  summary?: string | null
  location?: string | null
  email?: string | null
  githubUrl?: string | null
  linkedinUrl?: string | null
  cvUrl?: string | null
  avatarUrl?: string | null
}

const props = defineProps<{
  profile?: ProfileLike | null
}>()

const displayName = computed(() => props.profile?.name || props.profile?.fullName || 'Developer')
const role = computed(() => props.profile?.role || props.profile?.headline || 'Fullstack Developer')
const description = computed(() => {
  return (
    props.profile?.summary ||
    props.profile?.bio ||
    'I build data-driven applications, backend systems, IoT prototypes, and technical products that connect software, data, and hardware.'
  )
})

const focus = ['Go API', 'Nuxt UI', 'PostgreSQL', 'Testing']
</script>

<template>
  <section class="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-cyan-50">
    <div class="absolute inset-0 technical-grid opacity-70" />
    <div class="absolute -left-28 top-28 h-72 w-72 rounded-full bg-blue-300/30 blur-3xl" />
    <div class="absolute -right-20 bottom-20 h-80 w-80 rounded-full bg-cyan-300/30 blur-3xl" />

    <div class="app-container relative grid min-h-[calc(100vh-4rem)] items-center gap-12 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:py-24">
      <AnimatedContainer>
        <div class="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white/80 px-4 py-2 shadow-soft backdrop-blur">
          <span class="h-2 w-2 rounded-full bg-green-500" />
          <span class="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-brand-primary">
            Available for collaboration
          </span>
        </div>

        <h1 class="mt-7 max-w-4xl text-4xl font-bold tracking-tight text-app-text md:text-6xl lg:text-7xl">
          Building data-driven, connected, and reliable
          <span class="text-brand-primary"> technical precision.</span>
        </h1>

        <p class="mt-6 max-w-2xl text-lg leading-8 text-app-muted">
          {{ displayName }} — {{ role }}. {{ description }}
        </p>

        <div class="mt-8 flex flex-col gap-3 sm:flex-row">
          <NuxtLink
            to="/projects"
            class="btn-primary"
          >
            View Projects
            <span class="ml-2">→</span>
          </NuxtLink>

          <NuxtLink
            to="#contact"
            class="btn-secondary"
          >
            Let’s Collaborate
          </NuxtLink>
        </div>

        <div class="mt-8 flex flex-wrap gap-3">
          <TechBadge
            v-for="item in focus"
            :key="item"
            :label="item"
            tone="primary"
          />
        </div>
      </AnimatedContainer>

      <AnimatedContainer
        :delay="160"
        class="relative"
      >
        <div class="relative mx-auto w-full max-w-2xl">
          <!-- Background glow -->
          <div class="absolute -inset-5 -z-10 rounded-[2rem] bg-gradient-to-br from-brand-soft via-white to-cyan-50/80" />
          <div class="absolute -right-8 -top-8 -z-10 h-36 w-36 rounded-full bg-accent-tech/10 blur-3xl" />
          <div class="absolute -bottom-8 -left-8 -z-10 h-36 w-36 rounded-full bg-brand-primary/10 blur-3xl" />

          <!-- Compact multidisciplinary panel -->
          <div class="app-card overflow-hidden rounded-panel border-blue-100/80 bg-white/90 shadow-card backdrop-blur">
            <!-- Top bar -->
            <div class="flex items-center justify-between border-b border-app-border bg-slate-50/80 px-5 py-3">
              <div class="flex items-center gap-2">
                <span class="h-2.5 w-2.5 rounded-full bg-red-400" />
                <span class="h-2.5 w-2.5 rounded-full bg-amber-400" />
                <span class="h-2.5 w-2.5 rounded-full bg-green-400" />
              </div>

              <span class="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-app-muted">
                multidisciplinary.profile
              </span>
            </div>

            <div class="p-5">
              <!-- Compact header -->
              <div class="rounded-2xl border border-blue-100 bg-gradient-to-br from-white to-blue-50/60 p-4">
                <p class="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-primary">
                  Software × Data × Hardware
                </p>

                <h2 class="mt-2 text-xl font-bold tracking-tight text-app-text">
                  Building practical engineering products.
                </h2>

                <p class="mt-2 text-sm leading-6 text-app-muted">
                  Focused on data-driven apps, backend systems, IoT prototypes, and electrical-aware solutions.
                </p>
              </div>

              <!-- Compact expertise matrix -->
              <div class="mt-4 grid gap-3 sm:grid-cols-2">
                <div class="group rounded-2xl border border-app-border bg-white p-3.5 transition duration-300 hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-soft">
                  <div class="flex items-start gap-3">
                    <div class="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-soft text-brand-primary">
                      <span class="font-mono text-xs font-bold">DS</span>
                    </div>

                    <div class="min-w-0">
                      <div class="flex items-center justify-between gap-2">
                        <h3 class="text-sm font-bold text-app-text">
                          Data Science
                        </h3>
                        <span class="hidden rounded-full bg-brand-soft px-2 py-0.5 text-[10px] font-semibold text-brand-primary sm:inline">
                          ML
                        </span>
                      </div>

                      <p class="mt-1 text-xs leading-5 text-app-muted">
                        Forecasting, modeling, ML pipeline.
                      </p>
                    </div>
                  </div>
                </div>

                <div class="group rounded-2xl border border-app-border bg-white p-3.5 transition duration-300 hover:-translate-y-0.5 hover:border-amber-200 hover:shadow-soft">
                  <div class="flex items-start gap-3">
                    <div class="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-700">
                      <span class="font-mono text-xs font-bold">DA</span>
                    </div>

                    <div class="min-w-0">
                      <div class="flex items-center justify-between gap-2">
                        <h3 class="text-sm font-bold text-app-text">
                          Data Analyst
                        </h3>
                        <span class="hidden rounded-full bg-amber-50 px-2 py-0.5 text-[10px] font-semibold text-amber-700 sm:inline">
                          Insight
                        </span>
                      </div>

                      <p class="mt-1 text-xs leading-5 text-app-muted">
                        Dashboard, reporting, decision support.
                      </p>
                    </div>
                  </div>
                </div>

                <div class="group rounded-2xl border border-app-border bg-white p-3.5 transition duration-300 hover:-translate-y-0.5 hover:border-cyan-200 hover:shadow-soft">
                  <div class="flex items-start gap-3">
                    <div class="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-cyan-50 text-cyan-700">
                      <span class="font-mono text-xs font-bold">BE</span>
                    </div>

                    <div class="min-w-0">
                      <div class="flex items-center justify-between gap-2">
                        <h3 class="text-sm font-bold text-app-text">
                          Backend
                        </h3>
                        <span class="hidden rounded-full bg-cyan-50 px-2 py-0.5 text-[10px] font-semibold text-cyan-700 sm:inline">
                          API
                        </span>
                      </div>

                      <p class="mt-1 text-xs leading-5 text-app-muted">
                        REST API, auth, database, service layer.
                      </p>
                    </div>
                  </div>
                </div>

                <div class="group rounded-2xl border border-app-border bg-white p-3.5 transition duration-300 hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-soft">
                  <div class="flex items-start gap-3">
                    <div class="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-soft text-brand-primary">
                      <span class="font-mono text-xs font-bold">IoT</span>
                    </div>

                    <div class="min-w-0">
                      <div class="flex items-center justify-between gap-2">
                        <h3 class="text-sm font-bold text-app-text">
                          IoT Systems
                        </h3>
                        <span class="hidden rounded-full bg-brand-soft px-2 py-0.5 text-[10px] font-semibold text-brand-primary sm:inline">
                          Sensor
                        </span>
                      </div>

                      <p class="mt-1 text-xs leading-5 text-app-muted">
                        ESP32, sensors, monitoring, automation.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Softer electrical strip -->
              <div class="mt-4 rounded-2xl border border-cyan-100 bg-cyan-50/60 p-4">
                <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p class="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-cyan-700">
                      Electrical Foundation
                    </p>

                    <h3 class="mt-1 text-sm font-bold text-app-text">
                      Circuit, power, and embedded-system awareness.
                    </h3>
                  </div>

                  <div class="flex flex-wrap gap-2">
                    <span class="rounded-full border border-cyan-100 bg-white px-3 py-1 text-[11px] font-semibold text-cyan-700">
                      Power Logic
                    </span>

                    <span class="rounded-full border border-cyan-100 bg-white px-3 py-1 text-[11px] font-semibold text-cyan-700">
                      Circuit Design
                    </span>

                    <span class="rounded-full border border-cyan-100 bg-white px-3 py-1 text-[11px] font-semibold text-cyan-700">
                      ESP32
                    </span>
                  </div>
                </div>
              </div>

              <!-- Stack tags -->
              <div class="mt-4 flex flex-wrap gap-2">
                <span class="badge-primary">Python</span>
                <span class="badge-primary">Go</span>
                <span class="badge-tech">Nuxt</span>
                <span class="badge-tech">PostgreSQL</span>
                <span class="badge-accent">ESP32</span>
                <span class="badge-accent">Electrical</span>
              </div>
            </div>
          </div>
        </div>
      </AnimatedContainer>
    </div>
  </section>
</template>
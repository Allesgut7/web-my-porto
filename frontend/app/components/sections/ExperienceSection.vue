<script setup lang="ts">
const { t } = useI18n()
const { data: experiences, pending, error, refresh } = useExperiences()

function formatDateRange(start: string, end?: string | null, isCurrent?: boolean): string {
  const format = (d: string) => {
    const date = new Date(d)
    if (isNaN(date.getTime())) return d
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' })
  }
  const startStr = format(start)
  const endStr = isCurrent ? t('experiencePresent') : (end ? format(end) : t('experiencePresent'))
  return `${startStr} — ${endStr}`
}

function typeLabel(type: string): string {
  if (type === 'work') return 'Work'
  if (type === 'education') return 'Education'
  if (type === 'certification') return 'Certification'
  return type
}

function typeIcon(type: string): string {
  if (type === 'work') return '💼'
  if (type === 'education') return '🎓'
  if (type === 'certification') return '📜'
  return '📌'
}

function typeBadgeClass(type: string): string {
  if (type === 'work') return 'bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-400'
  if (type === 'education') return 'bg-amber-50 dark:bg-amber-950 text-amber-700 dark:text-amber-400'
  return 'bg-purple-50 dark:bg-purple-950 text-purple-700 dark:text-purple-400'
}
</script>

<template>
  <section
    id="experience"
    class="app-section relative overflow-hidden"
  >
    <div class="absolute inset-0 bg-gradient-to-b from-white dark:from-slate-950 via-slate-50/50 dark:via-slate-800/50 to-white dark:to-slate-950" />

    <div class="app-container relative z-10">
      <AnimatedContainer>
        <SectionHeader
          :eyebrow="t('experienceEyebrow')"
          :title="t('experienceTitle')"
          :description="t('experienceDescription')"
          alignment="left"
        />
      </AnimatedContainer>

      <!-- Loading -->
      <div v-if="pending" class="mt-12 grid gap-6 md:grid-cols-2">
        <LoadingState />
        <LoadingState />
      </div>

      <!-- Error -->
      <ErrorState
        v-else-if="error"
        class="mt-12"
        :title="t('commonError')"
        :message="error.message"
        @retry="refresh"
      />

      <!-- Empty -->
      <EmptyState
        v-else-if="!experiences || experiences.length === 0"
        class="mt-12"
        :title="t('experienceEmpty')"
      />

      <!-- Data -->
      <div v-else class="mt-12 relative">
        <div class="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-brand-primary/20 via-brand-primary/10 to-transparent md:left-1/2 md:-translate-x-px" />

        <div class="space-y-8">
          <AnimatedContainer
            v-for="(exp, index) in experiences"
            :key="exp.id"
            :delay="index * 100"
          >
            <div
              class="relative flex flex-col md:flex-row md:items-start gap-6"
              :class="index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'"
            >
              <div class="absolute left-6 top-2 w-3 h-3 rounded-full border-2 border-brand-primary bg-white dark:bg-slate-900 shadow-sm md:left-1/2 md:-translate-x-1/2 z-10">
                <div
                  v-if="exp.type === 'work'"
                  class="absolute inset-0.5 rounded-full bg-brand-primary"
                />
              </div>

              <div class="hidden md:block md:w-1/2" />

              <div class="ml-12 md:ml-0 md:w-1/2">
                <div class="app-card p-6 transition-all duration-300 hover:shadow-card hover:-translate-y-1">
                  <div class="flex items-center gap-2 mb-3">
                    <span
                      class="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold"
                      :class="typeBadgeClass(exp.type)"
                    >
                      {{ typeIcon(exp.type) }}
                      {{ typeLabel(exp.type) }}
                    </span>
                    <span class="text-xs text-app-muted dark:text-slate-400 font-mono">
                      {{ formatDateRange(exp.startDate, exp.endDate, exp.isCurrent) }}
                    </span>
                  </div>

                  <h3 class="text-lg font-bold text-app-text dark:text-slate-50 font-display">
                    {{ exp.title }}
                  </h3>
                  <p class="text-sm font-medium text-brand-primary mt-0.5">
                    {{ exp.organization }}
                  </p>
                  <p
                    v-if="exp.description"
                    class="mt-3 text-sm leading-6 text-app-muted dark:text-slate-400"
                  >
                    {{ exp.description }}
                  </p>

                  <div
                    v-if="exp.tags.length"
                    class="mt-4 flex flex-wrap gap-1.5"
                  >
                    <span
                      v-for="tag in exp.tags"
                      :key="tag"
                      class="inline-flex items-center rounded-md bg-slate-100 dark:bg-slate-800 px-2 py-0.5 text-xs font-medium text-slate-600 dark:text-slate-400"
                    >
                      {{ tag }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedContainer>
        </div>
      </div>
    </div>
  </section>
</template>

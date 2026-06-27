<script setup lang="ts">
const { t } = useI18n()
const { data: achievements, pending, error, refresh } = useAchievements()

function formatDate(date: string): string {
  const d = new Date(date)
  if (isNaN(d.getTime())) return date
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short' })
}

function categoryBadgeClass(category: string | null | undefined): string {
  switch (category?.toLowerCase()) {
    case 'certification': return 'bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-900'
    case 'award': return 'bg-amber-50 dark:bg-amber-950 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-900'
    case 'competition': return 'bg-purple-50 dark:bg-purple-950 text-purple-700 dark:text-purple-400 border-purple-200 dark:border-purple-900'
    case 'publication': return 'bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-900'
    default: return 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700'
  }
}
</script>

<template>
  <section
    id="achievements"
    class="app-section relative overflow-hidden"
  >
    <div class="absolute inset-0 bg-gradient-to-b from-white dark:from-slate-950 via-slate-50/50 dark:via-slate-800/50 to-white dark:to-slate-950" />

    <div class="app-container relative z-10">
      <AnimatedContainer>
        <SectionHeader
          :eyebrow="t('achievementsEyebrow')"
          :title="t('achievementsTitle')"
          :description="t('achievementsDescription')"
          alignment="center"
        />
      </AnimatedContainer>

      <!-- Loading -->
      <div v-if="pending" class="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <LoadingState />
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
        v-else-if="!achievements || achievements.length === 0"
        class="mt-12"
        :title="t('achievementsEmpty')"
      />

      <!-- Data -->
      <div v-else class="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <AnimatedContainer
          v-for="(item, index) in achievements"
          :key="item.id"
          :delay="index * 80"
        >
          <div class="app-card p-6 h-full transition-all duration-300 hover:shadow-card hover:-translate-y-1 flex flex-col">
            <div class="flex items-start justify-between gap-3 mb-3">
              <span
                v-if="item.category"
                class="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold shrink-0"
                :class="categoryBadgeClass(item.category)"
              >
                {{ item.category }}
              </span>
              <span
                v-if="item.achievedAt"
                class="text-xs text-app-muted dark:text-slate-400 font-mono shrink-0"
              >
                {{ formatDate(item.achievedAt) }}
              </span>
            </div>

            <h3 class="text-lg font-bold text-app-text dark:text-slate-50 font-display">
              {{ item.title }}
            </h3>

            <p
              v-if="item.issuer"
              class="text-sm font-medium text-brand-primary mt-0.5"
            >
              {{ item.issuer }}
            </p>

            <p
              v-if="item.description"
              class="mt-3 text-sm leading-6 text-app-muted dark:text-slate-400 flex-1"
            >
              {{ item.description }}
            </p>

            <div
              v-if="item.externalUrl"
              class="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800"
            >
              <a
                :href="item.externalUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-primary hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
              >
                {{ t('achievementsViewCredential') }}
                <svg class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                </svg>
              </a>
            </div>
          </div>
        </AnimatedContainer>
      </div>
    </div>
  </section>
</template>

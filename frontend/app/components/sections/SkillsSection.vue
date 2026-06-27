<script setup lang="ts">
const { t } = useI18n()
const { data: skills, pending, error, refresh } = useSkills()

const categories = [
  { key: 'backend', label: 'skillsBackend', icon: '⚙️', color: 'blue' },
  { key: 'frontend', label: 'skillsFrontend', icon: '🎨', color: 'cyan' },
  { key: 'database', label: 'skillsDatabase', icon: '🗄️', color: 'amber' },
  { key: 'devops', label: 'skillsDevOps', icon: '🚀', color: 'emerald' },
  { key: 'data', label: 'skillsData', icon: '📊', color: 'purple' },
] as const

const levelColors: Record<string, string> = {
  advanced: 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-900',
  intermediate: 'bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-900',
  familiar: 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700',
}

function levelLabel(level: string): string {
  if (level === 'advanced') return t('skillsLevelAdvanced')
  if (level === 'intermediate') return t('skillsLevelIntermediate')
  if (level === 'familiar') return t('skillsLevelFamiliar')
  return level
}

function getSkillsByCategory(category: string) {
  return (skills.value || []).filter(s => s.category === category)
}
</script>

<template>
  <section
    id="skills"
    class="app-section relative overflow-hidden"
  >
    <div class="absolute inset-0 bg-gradient-to-b from-slate-50/50 dark:from-slate-800/50 via-white dark:via-slate-900 to-slate-50/30 dark:to-slate-800/30" />

    <div class="app-container relative z-10">
      <AnimatedContainer>
        <SectionHeader
          :eyebrow="t('skillsEyebrow')"
          :title="t('skillsTitle')"
          :description="t('skillsDescription')"
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
        v-else-if="!skills || skills.length === 0"
        class="mt-12"
        :title="t('skillsEmpty')"
      />

      <!-- Data -->
      <template v-else>
        <div class="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <AnimatedContainer
            v-for="(cat, index) in categories"
            :key="cat.key"
            :delay="index * 80"
          >
            <div class="app-card p-6 h-full transition-all duration-300 hover:shadow-card hover:-translate-y-1">
              <div class="flex items-center gap-3 mb-5">
                <span class="text-2xl">{{ cat.icon }}</span>
                <h3 class="text-lg font-bold text-app-text dark:text-slate-50 font-display">
                  {{ t(cat.label) }}
                </h3>
              </div>

              <div class="flex flex-wrap gap-2">
                <span
                  v-for="skill in getSkillsByCategory(cat.key)"
                  :key="skill.id"
                  class="inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-sm font-medium transition-all duration-200 hover:scale-105 hover:-translate-y-0.5 hover:shadow-sm cursor-default"
                  :class="skill.level ? levelColors[skill.level] || levelColors.familiar : levelColors.familiar"
                >
                  {{ skill.name }}
                  <span
                    v-if="skill.level"
                    class="text-[10px] opacity-60"
                  >
                    {{ levelLabel(skill.level) }}
                  </span>
                </span>
              </div>
            </div>
          </AnimatedContainer>
        </div>

        <div class="mt-8 flex justify-center gap-4 flex-wrap">
          <div
            v-for="(cls, level) in levelColors"
            :key="level"
            class="flex items-center gap-2 text-xs text-app-muted dark:text-slate-400"
          >
            <span class="w-3 h-3 rounded-full border" :class="cls" />
            {{ levelLabel(level) }}
          </div>
        </div>
      </template>
    </div>
  </section>
</template>

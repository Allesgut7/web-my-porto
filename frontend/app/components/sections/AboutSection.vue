<script setup lang="ts">
type ProfileLike = {
  name?: string | null
  fullName?: string | null
  role?: string | null
  headline?: string | null
  bio?: string | null
  summary?: string | null
  location?: string | null
  avatarUrl?: string | null
}

const props = defineProps<{
  profile?: ProfileLike | null
}>()

const displayName = computed(() => props.profile?.name || props.profile?.fullName || 'Developer')
const role = computed(() => props.profile?.role || props.profile?.headline || 'Developer')
const bio = computed(() => {
  return (
    props.profile?.bio ||
    props.profile?.summary ||
    'I focus on building practical software systems with clean architecture, reliable APIs, and thoughtful user interfaces.'
  )
})

const capabilities = [
  {
    title: 'Backend Engineering',
    description: 'Designing REST APIs, database models, layered architecture, and authentication flows.',
    label: 'API',
    tone: 'primary' as const,
  },
  {
    title: 'Frontend Development',
    description: 'Building responsive Nuxt interfaces with reusable components and clear user flows.',
    label: 'UI',
    tone: 'tech' as const,
  },
  {
    title: 'Data & Testing Mindset',
    description: 'Thinking in states, edge cases, validation, integration testing, and measurable outcomes.',
    label: 'QA',
    tone: 'accent' as const,
  },
]
</script>

<template>
  <section class="app-section bg-app-background">
    <div class="app-container">
      <div class="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <AnimatedContainer>
          <SectionHeader
            eyebrow="About"
            title="A technical builder who turns ideas into structured systems."
            :description="bio"
          />

          <div class="mt-8 grid gap-4 sm:grid-cols-2">
            <div class="app-card p-6">
              <p class="font-mono text-xs uppercase tracking-[0.2em] text-app-muted">
                Identity
              </p>
              <p class="mt-3 text-xl font-bold text-app-text">
                {{ displayName }}
              </p>
              <p class="mt-2 text-sm text-app-muted">
                {{ role }}
              </p>
            </div>

            <div class="app-card p-6">
              <p class="font-mono text-xs uppercase tracking-[0.2em] text-app-muted">
                Location
              </p>
              <p class="mt-3 text-xl font-bold text-app-text">
                {{ profile?.location || 'Indonesia' }}
              </p>
              <p class="mt-2 text-sm text-app-muted">
                Open to remote collaboration.
              </p>
            </div>
          </div>
        </AnimatedContainer>

        <div class="grid gap-4">
          <AnimatedContainer
            v-for="(capability, index) in capabilities"
            :key="capability.title"
            :delay="index * 120"
          >
            <CapabilityCard
              :title="capability.title"
              :description="capability.description"
              :label="capability.label"
              :tone="capability.tone"
            />
          </AnimatedContainer>
        </div>
      </div>
    </div>
  </section>
</template>
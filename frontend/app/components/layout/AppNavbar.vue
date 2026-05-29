<script setup lang="ts">
import type { Profile } from '../../types/profile'

const route = useRoute()
const isOpen = ref(false)

const { useProfileData } = useProfile()
const { data: profile } = await useProfileData()

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Projects', to: '/projects' },
]

const closeMenu = () => {
  isOpen.value = false
}

const isActive = (path: string) => {
  if (path === '/') return route.path === '/'
  return route.path.startsWith(path)
}

const displayName = computed(() => {
  const value = (profile.value as Profile | null)?.fullName
  return value ? value.split(' ')[0] : 'Portfolio'
})
</script>

<template>
  <header class="sticky top-0 z-50 border-b border-app-border bg-white/90 backdrop-blur shadow-navbar">
    <div class="app-container flex h-20 items-center justify-between">
      <NuxtLink
        to="/"
        class="text-lg font-bold text-app-text focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2"
        @click="closeMenu"
      >
        <span class="text-brand-primary">&lt;</span>{{ displayName }}.dev<span class="text-brand-primary">/&gt;</span>
      </NuxtLink>

      <nav class="hidden items-center gap-8 md:flex" aria-label="Main navigation">
        <NuxtLink
          v-for="link in navLinks"
          :key="link.to"
          :to="link.to"
          class="text-sm font-medium transition hover:text-app-text"
          :class="isActive(link.to) ? 'text-brand-primary font-semibold' : 'text-app-muted'"
        >
          {{ link.label }}
        </NuxtLink>

        <NuxtLink
          to="/#about"
          class="text-sm font-medium text-app-muted transition hover:text-app-text"
        >
          About
        </NuxtLink>

        <NuxtLink
          to="/#contact"
          class="text-sm font-medium text-app-muted transition hover:text-app-text"
        >
          Contact
        </NuxtLink>
      </nav>

      <div class="hidden items-center gap-3 md:flex">
        <a
          v-if="profile?.githubUrl"
          :href="profile.githubUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="btn-ghost"
        >
          GitHub
        </a>

        <a
          v-if="profile?.cvUrl"
          :href="profile.cvUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="btn-primary"
        >
          Download CV
        </a>
      </div>

      <button
        type="button"
        class="inline-flex min-h-11 min-w-11 items-center justify-center rounded-xl border border-app-border bg-white text-app-text md:hidden"
        aria-label="Toggle navigation menu"
        :aria-expanded="isOpen"
        @click="isOpen = !isOpen"
      >
        <span class="font-mono text-sm">{{ isOpen ? 'ESC' : 'MENU' }}</span>
      </button>
    </div>

    <div
      v-if="isOpen"
      class="border-t border-app-border bg-white md:hidden"
    >
      <div class="app-container space-y-2 py-5">
        <NuxtLink
          v-for="link in navLinks"
          :key="link.to"
          :to="link.to"
          class="block rounded-xl px-4 py-3 text-sm font-medium"
          :class="isActive(link.to) ? 'bg-brand-soft text-brand-primary' : 'text-app-muted hover:bg-slate-50 hover:text-app-text'"
          @click="closeMenu"
        >
          {{ link.label }}
        </NuxtLink>

        <NuxtLink
          to="/#about"
          class="block rounded-xl px-4 py-3 text-sm font-medium text-app-muted hover:bg-slate-50 hover:text-app-text"
          @click="closeMenu"
        >
          About
        </NuxtLink>

        <NuxtLink
          to="/#contact"
          class="block rounded-xl px-4 py-3 text-sm font-medium text-app-muted hover:bg-slate-50 hover:text-app-text"
          @click="closeMenu"
        >
          Contact
        </NuxtLink>

        <div class="grid gap-3 pt-3">
          <a
            v-if="profile?.githubUrl"
            :href="profile.githubUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="btn-secondary"
          >
            GitHub
          </a>

          <a
            v-if="profile?.cvUrl"
            :href="profile.cvUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="btn-primary"
          >
            Download CV
          </a>
        </div>
      </div>
    </div>
  </header>
</template>
<script setup lang="ts">
const isOpen = ref(false)

const { data: profile } = useProfile({
  lazy: true,
})

const route = useRoute()

const logoName = computed(() => {
  const name = profile.value?.fullName || 'Developer'
  return name.split(' ')[0] || 'Developer'
})

const navItems = [
  { label: 'Home', to: '/' },
  { label: 'Projects', to: '/projects' },
  { label: 'About', to: '/#about' },
  { label: 'Contact', to: '/#contact' },
]

function closeMenu() {
  isOpen.value = false
}

function isActive(path: string) {
  if (path === '/') return route.path === '/'
  if (path.startsWith('/projects')) return route.path.startsWith('/projects')
  return false
}
</script>

<template>
  <header class="sticky top-0 z-50 border-b border-app-border bg-white/90 backdrop-blur shadow-navbar">
    <div class="app-container flex h-20 items-center justify-between">
      <NuxtLink
        to="/"
        class="text-lg font-bold tracking-tight text-app-text"
        @click="closeMenu"
      >
        <span class="text-brand-primary">&lt;</span>{{ logoName }}.dev<span class="text-brand-primary">/&gt;</span>
      </NuxtLink>

      <nav class="hidden items-center gap-8 md:flex">
        <NuxtLink
          v-for="item in navItems"
          :key="item.label"
          :to="item.to"
          class="text-sm font-medium transition hover:text-app-text"
          :class="isActive(item.to) ? 'text-brand-primary font-semibold' : 'text-app-muted'"
        >
          {{ item.label }}
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
        class="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-app-border bg-white text-app-text md:hidden"
        aria-label="Toggle navigation menu"
        :aria-expanded="isOpen"
        @click="isOpen = !isOpen"
      >
        <span class="font-mono text-lg">
          {{ isOpen ? '×' : '☰' }}
        </span>
      </button>
    </div>

    <div
      v-if="isOpen"
      class="border-t border-app-border bg-white md:hidden"
    >
      <div class="app-container space-y-2 py-4">
        <NuxtLink
          v-for="item in navItems"
          :key="item.label"
          :to="item.to"
          class="block rounded-xl px-4 py-3 text-sm font-medium text-app-muted hover:bg-brand-soft hover:text-brand-primary"
          @click="closeMenu"
        >
          {{ item.label }}
        </NuxtLink>

        <a
          v-if="profile?.githubUrl"
          :href="profile.githubUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="block rounded-xl px-4 py-3 text-sm font-medium text-app-muted hover:bg-brand-soft hover:text-brand-primary"
          @click="closeMenu"
        >
          GitHub
        </a>

        <a
          v-if="profile?.cvUrl"
          :href="profile.cvUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="mt-2 block rounded-xl bg-brand-primary px-4 py-3 text-center text-sm font-semibold text-white"
          @click="closeMenu"
        >
          Download CV
        </a>
      </div>
    </div>
  </header>
</template>
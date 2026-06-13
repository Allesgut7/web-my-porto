<script setup lang="ts">
const isOpen = ref(false)
const isScrolled = ref(false)
const scrollProgress = ref(0)

const { data: profile } = useProfile({
  lazy: true,
})

const route = useRoute()

const firstName = computed(() => {
  const name = profile.value?.fullName || 'Developer'
  return name.split(' ')[0] || 'Developer'
})

const firstLetter = computed(() => {
  return firstName.value.charAt(0).toUpperCase()
})

const navItems = [
  { label: 'Home', to: '/' },
  { label: 'Projects', to: '/projects' },
  { label: 'About', to: '/#about' },
  { label: 'Contact', to: '/#contact' },
]

const mobileMenuItems = [
  { label: 'Home', to: '/', icon: 'home' },
  { label: 'Projects', to: '/projects', icon: 'projects' },
  { label: 'About', to: '/#about', icon: 'about' },
  { label: 'Contact', to: '/#contact', icon: 'contact' },
]

function closeMenu() {
  isOpen.value = false
}

function isActive(path: string) {
  if (path === '/') return route.path === '/'
  if (path.startsWith('/projects')) return route.path.startsWith('/projects')
  return false
}

function handleScroll() {
  const scrollY = window.scrollY
  isScrolled.value = scrollY > 10
  scrollProgress.value = Math.min(scrollY / 100, 1)
}

function handleKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape' && isOpen.value) {
    closeMenu()
  }
}

watch(isOpen, (val) => {
  if (val) {
    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', handleKeydown)
  } else {
    document.body.style.overflow = ''
    document.removeEventListener('keydown', handleKeydown)
  }
})

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
  handleScroll()
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  document.removeEventListener('keydown', handleKeydown)
  document.body.style.overflow = ''
})
</script>

<template>
  <header
    class="sticky top-0 z-50 transition-all duration-500 ease-out relative"
    :style="{
      boxShadow: isScrolled
        ? `0 ${8 + scrollProgress * 16}px ${32 + scrollProgress * 28}px rgba(15,23,42,${0.08 + scrollProgress * 0.06}), 0 ${2 + scrollProgress * 4}px ${8 + scrollProgress * 8}px rgba(15,23,42,${0.04 + scrollProgress * 0.03})`
        : 'none'
    }"
  >
    <!-- Noise texture overlay -->
    <div
      class="absolute inset-0 pointer-events-none mix-blend-multiply transition-opacity duration-500"
      :class="isScrolled ? 'opacity-[0.02]' : 'opacity-[0.01]'"
      style="background-image: url('data:image/svg+xml,%3Csvg viewBox=%270 0 200 200%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter id=%27n%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%270.65%27 numOctaves=%273%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23n)%27/%3E%3C/svg%3E');"
    />
    <!-- Inner glass highlight — top edge -->
    <div
      class="absolute top-0 left-0 right-0 h-px pointer-events-none transition-opacity duration-500"
      :class="isScrolled ? 'opacity-100' : 'opacity-0'"
      style="background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.8) 20%, rgba(255,255,255,0.9) 50%, rgba(255,255,255,0.8) 80%, transparent 100%);"
    />
    <!-- Bottom accent line — animated gradient -->
    <div
      class="absolute bottom-0 left-0 right-0 h-[1.5px] pointer-events-none transition-all duration-500"
      :style="{
        background: `linear-gradient(90deg, transparent 0%, rgba(29,78,216,${0.15 + scrollProgress * 0.15}) ${30 + scrollProgress * 20}%, rgba(6,182,212,${0.1 + scrollProgress * 0.1}) ${70 - scrollProgress * 10}%, transparent 100%)`
      }"
    />
    <div
      class="navbar-container relative grid grid-cols-[auto_1fr_auto] items-center gap-4 transition-all duration-500 ease-out"
      :class="isScrolled ? 'bg-white/60 backdrop-blur-xl' : 'bg-gradient-to-r from-white/90 via-white/80 to-white/90 backdrop-blur-md'"
      :style="{ height: `${80 - scrollProgress * 16}px` }"
    >
      <!-- Logo — Monogram + Name -->
      <NuxtLink
        to="/"
        class="group flex items-center gap-3"
        @click="closeMenu"
      >
        <!-- Monogram -->
        <div class="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 text-white font-bold font-display text-lg shadow-glow-blue transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:scale-110 group-hover:rotate-3 group-hover:shadow-glow-blue-lg group-hover:from-blue-500 group-hover:to-cyan-400">
          {{ firstLetter }}
          <!-- Subtle shimmer on hover -->
          <div class="absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100 overflow-hidden">
            <div class="animate-shimmer h-full w-full" />
          </div>
        </div>
        <!-- Name -->
        <span class="text-xl font-bold tracking-tight text-app-text font-display transition-colors duration-300 group-hover:text-brand-primary">
          {{ firstName }}<span class="text-app-muted font-normal transition-colors duration-300 group-hover:text-brand-primary/60">.dev</span>
        </span>
      </NuxtLink>

      <!-- Desktop Nav -->
      <nav class="hidden items-center justify-center gap-1 md:flex">
        <NuxtLink
          v-for="item in navItems"
          :key="item.label"
          :to="item.to"
          class="relative rounded-full px-5 py-2.5 text-[15px] font-medium transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:text-app-text hover:scale-105 hover:-translate-y-0.5 active:scale-95"
          :class="isActive(item.to)
            ? 'text-brand-primary bg-brand-soft shadow-sm'
            : 'text-app-muted hover:bg-slate-50/80'"
        >
          {{ item.label }}
          <!-- Active pill indicator -->
          <span
            v-if="isActive(item.to)"
            class="absolute inset-x-2 -bottom-px h-0.5 rounded-full bg-brand-primary"
          />
        </NuxtLink>
      </nav>

      <!-- Desktop Actions -->
      <div class="hidden items-center justify-end gap-3 md:flex">
        <a
          v-if="profile?.githubUrl"
          :href="profile.githubUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="flex items-center gap-2 rounded-full px-4 py-3 text-[15px] font-medium text-app-muted transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:bg-slate-100 hover:text-app-text hover:scale-105 hover:-translate-y-0.5 active:scale-95"
        >
          <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
            <path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd" />
          </svg>
          GitHub
        </a>

        <a
          v-if="profile?.cvUrl"
          :href="profile.cvUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="relative group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-3.5 text-[15px] font-semibold text-white shadow-glow-blue transition-all duration-400 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:shadow-glow-blue-lg hover:-translate-y-1 hover:scale-105 active:scale-95"
        >
          <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Download CV
          <!-- PDF Badge -->
          <span class="absolute -top-1.5 -right-1.5 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-amber-500 px-1 text-[10px] font-bold text-white shadow-sm transition-all duration-300 group-hover:scale-110 group-hover:bg-amber-400">
            PDF
          </span>
        </a>
      </div>

      <!-- Mobile Hamburger -->
      <button
        type="button"
        class="relative inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-app-border bg-white text-app-text transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:border-brand-primary hover:shadow-glow-blue hover:scale-105 active:scale-95 md:hidden"
        :class="isOpen ? 'border-brand-primary shadow-glow-blue' : ''"
        aria-label="Toggle navigation menu"
        :aria-expanded="isOpen"
        @click="isOpen = !isOpen"
      >
        <!-- Animated hamburger lines -->
        <div class="flex flex-col items-center justify-center gap-1.5 transition-all duration-500" :class="isOpen ? 'rotate-90' : ''">
          <span
            class="block h-[3px] w-6 rounded-full bg-app-text transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
            :class="isOpen ? 'translate-y-[4px] rotate-45 bg-brand-primary' : ''"
          />
          <span
            class="block h-[3px] w-6 rounded-full bg-app-text transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
            :class="isOpen ? 'scale-x-0 opacity-0' : ''"
          />
          <span
            class="block h-[3px] w-6 rounded-full bg-app-text transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
            :class="isOpen ? '-translate-y-[4px] -rotate-45 bg-brand-primary' : ''"
          />
        </div>
      </button>
    </div>
  </header>

  <!-- Mobile Drawer -->
  <Teleport to="body">
    <!-- Backdrop -->
    <Transition name="navbar-fade">
      <div
        v-if="isOpen"
        class="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm md:hidden"
        @click="closeMenu"
      />
    </Transition>

    <!-- Drawer Panel -->
    <Transition name="navbar-slide-right">
      <div
        v-if="isOpen"
        class="fixed inset-y-0 right-0 z-[70] flex w-80 flex-col bg-gradient-to-b from-white to-slate-50 shadow-deep md:hidden rounded-l-3xl"
      >
        <!-- Drawer Header -->
        <div class="flex items-center justify-between border-b border-app-border/50 px-6 py-5">
          <div class="flex items-center gap-3">
            <div class="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 text-white font-bold font-display text-sm">
              {{ firstLetter }}
            </div>
            <span class="text-lg font-bold text-app-text font-display">
              {{ firstName }}<span class="text-app-muted font-normal">.dev</span>
            </span>
          </div>
          <button
            type="button"
            class="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-app-border text-app-muted transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:bg-red-50 hover:border-red-200 hover:text-red-500 hover:rotate-90 hover:scale-110 active:scale-95"
            aria-label="Close menu"
            @click="closeMenu"
          >
            <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- Menu Items — Staggered -->
        <nav class="flex-1 overflow-y-auto px-4 py-6">
          <div class="space-y-1">
            <NuxtLink
              v-for="(item, index) in mobileMenuItems"
              :key="item.label"
              :to="item.to"
              class="flex items-center gap-3.5 rounded-2xl px-4 py-4 text-[15px] font-medium transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] navbar-stagger-item hover:translate-x-1 hover:bg-slate-100 active:scale-[0.98]"
              :class="isActive(item.to)
                ? 'bg-brand-soft text-brand-primary'
                : 'text-app-muted hover:bg-slate-50 hover:text-app-text'"
              :style="{ animationDelay: `${index * 60 + 100}ms` }"
              @click="closeMenu"
            >
              <!-- Icons -->
              <span
                class="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition-colors duration-300"
                :class="isActive(item.to)
                  ? 'bg-brand-primary/10 text-brand-primary'
                  : 'bg-slate-100 text-app-muted'"
              >
                <!-- Home -->
                <svg v-if="item.icon === 'home'" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                <!-- Projects -->
                <svg v-else-if="item.icon === 'projects'" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <!-- About -->
                <svg v-else-if="item.icon === 'about'" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <!-- Contact -->
                <svg v-else-if="item.icon === 'contact'" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </span>
              {{ item.label }}
              <!-- Active arrow -->
              <svg
                v-if="isActive(item.to)"
                class="ml-auto h-4 w-4 text-brand-primary"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2.5"
              >
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </NuxtLink>
          </div>

          <!-- Divider -->
          <div class="my-6 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

          <!-- GitHub Link -->
          <a
            v-if="profile?.githubUrl"
            :href="profile.githubUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="flex items-center gap-3.5 rounded-2xl px-4 py-4 text-[15px] font-medium text-app-muted transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:bg-slate-100 hover:text-app-text hover:translate-x-1 active:scale-[0.98] navbar-stagger-item"
            style="animation-delay: 440ms;"
            @click="closeMenu"
          >
            <span class="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-app-muted">
              <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd" />
              </svg>
            </span>
            GitHub Profile
            <svg class="ml-auto h-3.5 w-3.5 text-app-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </nav>

        <!-- Drawer Footer — CV Button -->
        <div class="border-t border-app-border px-4 py-5">
          <a
            v-if="profile?.cvUrl"
            :href="profile.cvUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="relative flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4 text-[15px] font-semibold text-white shadow-glow-blue transition-all duration-400 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:shadow-glow-blue-lg hover:-translate-y-1 hover:scale-105 active:scale-95 navbar-stagger-item"
            style="animation-delay: 500ms;"
            @click="closeMenu"
          >
            <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Download CV
            <span class="flex h-5 min-w-[20px] items-center justify-center rounded-full bg-amber-500 px-1.5 text-[10px] font-bold text-white">
              PDF
            </span>
          </a>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

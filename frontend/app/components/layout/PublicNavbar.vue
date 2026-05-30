<script setup lang="ts">
const isOpen = ref(false)
const isScrolled = ref(false)

const links = [
  { label: 'Home', to: '/' },
  { label: 'Projects', to: '/projects' },
  { label: 'Contact', to: '/#contact' },
]

onMounted(() => {
  const handleScroll = () => {
    isScrolled.value = window.scrollY > 16
  }

  handleScroll()
  window.addEventListener('scroll', handleScroll, { passive: true })

  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
  })
})
</script>

<template>
  <header
    :class="[
      'sticky top-0 z-50 border-b transition duration-300',
      isScrolled
        ? 'border-app-border bg-white/85 shadow-soft backdrop-blur-xl'
        : 'border-transparent bg-white/60 backdrop-blur-md',
    ]"
  >
    <nav class="app-container flex h-16 items-center justify-between">
      <NuxtLink
        to="/"
        class="group inline-flex items-center gap-3"
        @click="isOpen = false"
      >
        <span class="flex h-10 w-10 items-center justify-center rounded-2xl bg-brand-primary text-sm font-bold text-white shadow-glow transition duration-300 group-hover:-translate-y-0.5">
          GP
        </span>

        <span>
          <span class="block text-sm font-bold leading-none text-app-text">
            Web My Porto
          </span>
          <span class="mt-1 block font-mono text-[10px] uppercase tracking-[0.2em] text-app-muted">
            Technical Portfolio
          </span>
        </span>
      </NuxtLink>

      <div class="hidden items-center gap-1 md:flex">
        <NuxtLink
          v-for="link in links"
          :key="link.to"
          :to="link.to"
          class="rounded-full px-4 py-2 text-sm font-semibold text-app-muted transition hover:bg-brand-soft hover:text-brand-primary"
        >
          {{ link.label }}
        </NuxtLink>

        <NuxtLink
          to="/admin/login"
          class="ml-2 rounded-full border border-app-border bg-white px-4 py-2 text-sm font-semibold text-app-text transition hover:-translate-y-0.5 hover:border-blue-200 hover:bg-brand-soft"
        >
          Admin
        </NuxtLink>
      </div>

      <button
        type="button"
        class="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-app-border bg-white text-app-text md:hidden"
        aria-label="Toggle navigation"
        @click="isOpen = !isOpen"
      >
        <span class="font-mono text-lg">
          {{ isOpen ? '×' : '≡' }}
        </span>
      </button>
    </nav>

    <div
      v-if="isOpen"
      class="border-t border-app-border bg-white/95 p-4 backdrop-blur-xl md:hidden"
    >
      <div class="app-container grid gap-2">
        <NuxtLink
          v-for="link in links"
          :key="link.to"
          :to="link.to"
          class="rounded-2xl px-4 py-3 text-sm font-semibold text-app-muted hover:bg-brand-soft hover:text-brand-primary"
          @click="isOpen = false"
        >
          {{ link.label }}
        </NuxtLink>

        <NuxtLink
          to="/admin/login"
          class="rounded-2xl px-4 py-3 text-sm font-semibold text-app-text hover:bg-brand-soft"
          @click="isOpen = false"
        >
          Admin
        </NuxtLink>
      </div>
    </div>
  </header>
</template>
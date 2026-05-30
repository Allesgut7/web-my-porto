<script setup lang="ts">
const { user, logout } = useAuth()

const isOpen = ref(false)

async function handleLogout() {
  await logout()
}
</script>

<template>
  <header class="sticky top-0 z-30 border-b border-app-border bg-white/90 backdrop-blur">
    <div class="flex h-20 items-center justify-between px-6 lg:px-8">
      <div>
        <p class="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-brand-primary">
          Admin Dashboard
        </p>
        <p class="mt-1 text-sm text-app-muted">
          Manage portfolio content
        </p>
      </div>

      <div class="hidden items-center gap-4 md:flex">
        <div class="text-right">
          <p class="text-sm font-semibold text-app-text">
            {{ user?.name || 'Admin' }}
          </p>
          <p class="text-xs text-app-muted">
            {{ user?.email }}
          </p>
        </div>

        <button
          type="button"
          class="btn-secondary"
          @click="handleLogout"
        >
          Logout
        </button>
      </div>

      <button
        type="button"
        class="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-app-border bg-white text-app-text md:hidden"
        aria-label="Toggle admin menu"
        :aria-expanded="isOpen"
        @click="isOpen = !isOpen"
      >
        <span class="font-mono">{{ isOpen ? '×' : '☰' }}</span>
      </button>
    </div>

    <div
      v-if="isOpen"
      class="border-t border-app-border bg-white p-4 md:hidden"
    >
      <div class="space-y-2">
        <NuxtLink
          to="/admin/dashboard"
          class="block rounded-xl px-4 py-3 text-sm font-semibold text-app-muted hover:bg-brand-soft hover:text-brand-primary"
          @click="isOpen = false"
        >
          Dashboard
        </NuxtLink>

        <NuxtLink
          to="/admin/projects"
          class="block rounded-xl px-4 py-3 text-sm font-semibold text-app-muted hover:bg-brand-soft hover:text-brand-primary"
          @click="isOpen = false"
        >
          Projects
        </NuxtLink>

        <button
          type="button"
          class="block w-full rounded-xl px-4 py-3 text-left text-sm font-semibold text-red-600 hover:bg-red-50"
          @click="handleLogout"
        >
          Logout
        </button>
      </div>
    </div>
  </header>
</template>
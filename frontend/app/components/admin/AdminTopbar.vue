<script setup lang="ts">
const { user, logout } = useAuth()

const isOpen = ref(false)

async function handleLogout() {
  await logout()
}
</script>

<template>
  <header class="sticky top-0 z-30 border-b border-app-border bg-white/90 backdrop-blur dark:bg-slate-900/90 dark:border-slate-800">
    <div class="flex h-20 items-center justify-between px-6 lg:px-8">
      <div>
        <p class="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-brand-primary">
          Admin Dashboard
        </p>
        <p class="mt-1 text-sm text-app-muted dark:text-slate-400">
          Manage portfolio content
        </p>
      </div>

      <div class="hidden items-center gap-4 md:flex">
        <div class="text-right">
          <p class="text-sm font-semibold text-app-text dark:text-slate-100">
            {{ user?.name || 'Admin' }}
          </p>
          <p class="text-xs text-app-muted dark:text-slate-400">
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
        class="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-app-border bg-white text-app-text dark:bg-slate-800 dark:border-slate-700 dark:text-slate-100 md:hidden"
        aria-label="Toggle admin menu"
        :aria-expanded="isOpen"
        @click="isOpen = !isOpen"
      >
        <span class="font-mono">{{ isOpen ? '×' : '☰' }}</span>
      </button>
    </div>

    <div
      v-if="isOpen"
      class="border-t border-app-border bg-white p-4 dark:bg-slate-900 dark:border-slate-800 md:hidden"
    >
      <div class="space-y-2">
        <NuxtLink
          to="/admin/dashboard"
          class="block rounded-xl px-4 py-3 text-sm font-semibold text-app-muted hover:bg-brand-soft hover:text-brand-primary dark:text-slate-400 dark:hover:bg-blue-950 dark:hover:text-blue-400"
          @click="isOpen = false"
        >
          Dashboard
        </NuxtLink>

        <NuxtLink
          to="/admin/projects"
          class="block rounded-xl px-4 py-3 text-sm font-semibold text-app-muted hover:bg-brand-soft hover:text-brand-primary dark:text-slate-400 dark:hover:bg-blue-950 dark:hover:text-blue-400"
          @click="isOpen = false"
        >
          Projects
        </NuxtLink>

        <button
          type="button"
          class="block w-full rounded-xl px-4 py-3 text-left text-sm font-semibold text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950"
          @click="handleLogout"
        >
          Logout
        </button>
      </div>
    </div>
  </header>
</template>

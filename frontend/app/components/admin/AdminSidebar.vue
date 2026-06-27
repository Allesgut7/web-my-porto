<script setup lang="ts">
const route = useRoute()

const items = [
  { label: 'Dashboard', to: '/admin/dashboard', icon: '📊' },
  { label: 'Profile', to: '/admin/profile', icon: '👤' },
  { label: 'Projects', to: '/admin/projects', icon: '📁' },
  { label: 'Experiences', to: '/admin/experiences', icon: '💼' },
  { label: 'Achievements', to: '/admin/achievements', icon: '🏆' },
  { label: 'Skills', to: '/admin/skills', icon: '⚙️' },
  { label: 'Tech Stacks', to: '/admin/tech-stacks', icon: '🔧' },
  { label: 'Messages', to: '/admin/messages', icon: '✉️' },
]

function isActive(path: string) {
  return route.path === path || route.path.startsWith(`${path}/`)
}
</script>

<template>
  <aside class="fixed inset-y-0 left-0 z-40 hidden w-72 border-r border-app-border bg-white dark:bg-slate-900 dark:border-slate-800 lg:block">
    <div class="flex h-20 items-center border-b border-app-border dark:border-slate-800 px-6">
      <NuxtLink to="/admin/dashboard" class="text-lg font-bold text-app-text dark:text-slate-100">
        <span class="text-brand-primary">&lt;</span>Admin<span class="text-brand-primary">/&gt;</span>
      </NuxtLink>
    </div>

    <nav class="space-y-1 px-4 py-6">
      <NuxtLink
        v-for="item in items"
        :key="item.to"
        :to="item.to"
        class="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition"
        :class="isActive(item.to)
          ? 'bg-brand-soft text-brand-primary dark:bg-blue-950 dark:text-blue-400'
          : 'text-app-muted hover:bg-slate-50 hover:text-app-text dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100'"
      >
        <span class="text-base">{{ item.icon }}</span>
        {{ item.label }}
      </NuxtLink>
    </nav>

    <div class="absolute bottom-0 left-0 right-0 border-t border-app-border dark:border-slate-800 p-4">
      <NuxtLink
        to="/"
        target="_blank"
        rel="noopener noreferrer"
        class="block rounded-xl px-4 py-3 text-sm font-semibold text-app-muted hover:bg-slate-50 hover:text-app-text dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100"
      >
        View Public Site
      </NuxtLink>
    </div>
  </aside>
</template>

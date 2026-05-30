<script setup lang="ts">
const route = useRoute()

const items = [
  { label: 'Dashboard', to: '/admin/dashboard' },
  { label: 'Projects', to: '/admin/projects' },
]

function isActive(path: string) {
  return route.path === path || route.path.startsWith(`${path}/`)
}
</script>

<template>
  <aside class="fixed inset-y-0 left-0 z-40 hidden w-72 border-r border-app-border bg-white lg:block">
    <div class="flex h-20 items-center border-b border-app-border px-6">
      <NuxtLink to="/admin/dashboard" class="text-lg font-bold text-app-text">
        <span class="text-brand-primary">&lt;</span>Admin<span class="text-brand-primary">/&gt;</span>
      </NuxtLink>
    </div>

    <nav class="space-y-2 px-4 py-6">
      <NuxtLink
        v-for="item in items"
        :key="item.to"
        :to="item.to"
        class="flex items-center rounded-xl px-4 py-3 text-sm font-semibold transition"
        :class="isActive(item.to)
          ? 'bg-brand-soft text-brand-primary'
          : 'text-app-muted hover:bg-slate-50 hover:text-app-text'"
      >
        {{ item.label }}
      </NuxtLink>
    </nav>

    <div class="absolute bottom-0 left-0 right-0 border-t border-app-border p-4">
      <NuxtLink
        to="/"
        target="_blank"
        class="block rounded-xl px-4 py-3 text-sm font-semibold text-app-muted hover:bg-slate-50 hover:text-app-text"
      >
        View Public Site
      </NuxtLink>
    </div>
  </aside>
</template>
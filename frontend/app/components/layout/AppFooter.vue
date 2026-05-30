<template>
  <footer class="border-t border-app-border bg-white">
    <div class="app-container py-10">
      <div class="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p class="text-sm font-bold text-app-text">
            Web My Porto
          </p>
          <p class="mt-2 max-w-md text-sm leading-6 text-app-muted">
            Database-driven developer portfolio built with Nuxt, Go, PostgreSQL, and Supabase Storage.
          </p>
        </div>

        <div class="flex flex-wrap items-center gap-3">
          <NuxtLink
            to="/"
            class="text-sm font-semibold text-app-muted transition hover:text-brand-primary"
          >
            Home
          </NuxtLink>

          <NuxtLink
            to="/projects"
            class="text-sm font-semibold text-app-muted transition hover:text-brand-primary"
          >
            Projects
          </NuxtLink>

          <NuxtLink
            to="/admin/login"
            class="text-sm font-semibold text-app-muted transition hover:text-brand-primary"
          >
            Admin
          </NuxtLink>
        </div>
      </div>

      <div class="mt-8 flex flex-col gap-3 border-t border-app-border pt-6 md:flex-row md:items-center md:justify-between">
        <p class="text-xs text-app-muted">
          © {{ new Date().getFullYear() }} Web My Porto. All rights reserved.
        </p>

        <p class="font-mono text-xs uppercase tracking-[0.2em] text-app-muted">
          Clean · Technical · Data-driven
        </p>
      </div>
    </div>
  </footer>
</template>
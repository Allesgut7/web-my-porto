<template>
  <div class="flex min-h-screen flex-col bg-app-background text-app-text">
    <PublicNavbar />

    <main class="flex-1">
      <slot />
    </main>

    <AppFooter />
  </div>
</template>
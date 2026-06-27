<script setup lang="ts">
const { initLocale } = useI18n()
const { initDarkMode } = useDarkMode()

onMounted(() => {
  initLocale()
  initDarkMode()
})
</script>

<template>
  <div class="flex min-h-screen flex-col bg-app-background text-app-text">
    <PublicNavbar />

    <main class="flex-1">
      <slot />
    </main>

    <AppFooter />
    <BackToTop />
  </div>
</template>

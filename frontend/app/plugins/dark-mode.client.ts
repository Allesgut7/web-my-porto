export default defineNuxtPlugin(() => {
  if (import.meta.client) {
    const isDark = localStorage.theme === 'dark' ||
      (!localStorage.theme && window.matchMedia('(prefers-color-scheme: dark)').matches)

    if (isDark) {
      document.documentElement.classList.add('dark')
    }
  }
})

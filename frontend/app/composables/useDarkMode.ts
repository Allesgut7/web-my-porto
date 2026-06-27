const isDark = ref(false)

export function useDarkMode() {
  function initDarkMode() {
    if (import.meta.client) {
      isDark.value = document.documentElement.classList.contains('dark')
    }
  }

  function toggleDark() {
    isDark.value = !isDark.value
    if (import.meta.client) {
      localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
      document.documentElement.classList.toggle('dark', isDark.value)
    }
  }

  return { isDark, initDarkMode, toggleDark }
}

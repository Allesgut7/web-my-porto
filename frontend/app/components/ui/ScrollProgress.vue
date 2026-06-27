<script setup lang="ts">
const scrollPercent = ref(0)

function handleScroll() {
  const winHeight = document.documentElement.scrollHeight - window.innerHeight
  scrollPercent.value = winHeight > 0 ? (window.scrollY / winHeight) * 100 : 0
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
  handleScroll()
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <div
    class="fixed top-0 left-0 z-[100] h-[3px] w-full bg-transparent"
    role="progressbar"
    :aria-valuenow="Math.round(scrollPercent)"
    aria-valuemin="0"
    aria-valuemax="100"
    aria-label="Scroll progress"
  >
    <div
      class="h-full bg-gradient-to-r from-blue-600 to-cyan-500 transition-[width] duration-150 ease-out"
      :style="{ width: `${scrollPercent}%` }"
    />
  </div>
</template>

import { ref, onMounted, onUnmounted } from 'vue'

export function useScrollReveal(options: {
  threshold?: number
  rootMargin?: string
} = {}) {
  const elementRef = ref<HTMLElement | null>(null)
  const isRevealed = ref(false)
  let observer: IntersectionObserver | null = null

  const { threshold = 0.15, rootMargin = '0px 0px -40px 0px' } = options

  onMounted(() => {
    if (typeof window === 'undefined') return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      isRevealed.value = true
      return
    }

    observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (entry?.isIntersecting) {
          isRevealed.value = true
          observer?.disconnect()
        }
      },
      { threshold, rootMargin },
    )

    if (elementRef.value) {
      observer.observe(elementRef.value)
    }
  })

  onUnmounted(() => {
    observer?.disconnect()
  })

  return { elementRef, isRevealed }
}

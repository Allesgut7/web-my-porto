import { ref, onMounted, onUnmounted, watch } from 'vue'

export function useAnimatedCounter(
  target: number | (() => number),
  options: {
    duration?: number
    delay?: number
  } = {},
) {
  const { duration = 1500, delay = 0 } = options
  const currentValue = ref(0)
  const elementRef = ref<HTMLElement | null>(null)
  let animationFrame: number | null = null
  let observer: IntersectionObserver | null = null
  let hasAnimated = false

  function getTargetValue(): number {
    return typeof target === 'function' ? target() : target
  }

  function animate() {
    if (hasAnimated) return
    hasAnimated = true

    const targetValue = getTargetValue()
    if (targetValue === 0) {
      currentValue.value = 0
      return
    }

    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      currentValue.value = targetValue
      return
    }

    const startTime = performance.now()
    const startValue = 0

    function step(currentTime: number) {
      const elapsed = currentTime - startTime - delay
      if (elapsed < 0) {
        animationFrame = requestAnimationFrame(step)
        return
      }

      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - (1 - progress) ** 3
      currentValue.value = Math.round(startValue + (targetValue - startValue) * eased)

      if (progress < 1) {
        animationFrame = requestAnimationFrame(step)
      }
    }

    animationFrame = requestAnimationFrame(step)
  }

  onMounted(() => {
    if (typeof window === 'undefined') return

    observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (entry?.isIntersecting) {
          animate()
          observer?.disconnect()
        }
      },
      { threshold: 0.3 },
    )

    if (elementRef.value) {
      observer.observe(elementRef.value)
    }
  })

  onUnmounted(() => {
    observer?.disconnect()
    if (animationFrame !== null) {
      cancelAnimationFrame(animationFrame)
    }
  })

  watch(() => getTargetValue(), () => {
    hasAnimated = false
    currentValue.value = 0
  })

  return { currentValue, elementRef }
}

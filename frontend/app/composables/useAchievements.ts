import type { Achievement, RawAchievement } from '~/types/achievement'
import { normalizeAchievement } from '~/types/achievement'

export function useAchievements() {
  const { $api } = useNuxtApp()

  return useAsyncData<Achievement[]>(
    'public-achievements',
    async () => {
      const response = await $api.get<RawAchievement[]>('/achievements')
      return response.map(normalizeAchievement)
    },
    {
      server: true,
      lazy: false,
    },
  )
}

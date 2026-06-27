import type { Experience, RawExperience } from '~/types/experience'
import { normalizeExperience } from '~/types/experience'

export function useExperiences() {
  const { $api } = useNuxtApp()

  return useAsyncData<Experience[]>(
    'public-experiences',
    async () => {
      const response = await $api.get<RawExperience[]>('/experiences')
      return response.map(normalizeExperience)
    },
    {
      server: true,
      lazy: false,
    },
  )
}

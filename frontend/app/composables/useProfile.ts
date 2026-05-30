import type { AsyncDataOptions } from '#app'
import type { Profile, RawProfile } from '~/types/profile'
import { normalizeProfile } from '~/types/profile'

export function useProfile(options: AsyncDataOptions<Profile> = {}) {
  const { $api } = useNuxtApp()

  return useAsyncData<Profile>(
    'public-profile',
    async () => {
      const rawProfile = await $api.get<RawProfile>('/profile')
      return normalizeProfile(rawProfile)
    },
    {
      server: true,
      lazy: false,
      ...options,
    },
  )
}
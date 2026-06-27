import type { RawSkill, Skill } from '~/types/skill'
import { normalizeSkill } from '~/types/skill'

export function useSkills() {
  const { $api } = useNuxtApp()

  return useAsyncData<Skill[]>(
    'public-skills',
    async () => {
      const response = await $api.get<RawSkill[]>('/skills')
      return response.map(normalizeSkill)
    },
    {
      server: true,
      lazy: false,
    },
  )
}

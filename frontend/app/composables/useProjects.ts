import type { AsyncDataOptions } from '#app'
import type { QueryParams } from '~/types/api'
import type { ProjectDetail, ProjectListItem, RawProject } from '~/types/project'
import { normalizeProjectDetail, normalizeProjectListItem } from '~/types/project'

export function useProjects(
  query: QueryParams = {},
  options: AsyncDataOptions<ProjectListItem[]> = {},
) {
  const { $api } = useNuxtApp()

  return useAsyncData<ProjectListItem[]>(
    `public-projects-${JSON.stringify(query)}`,
    async () => {
      const response = await $api.getPaginated<RawProject>('/projects', query)
      return response.data.map(normalizeProjectListItem)
    },
    {
      server: true,
      lazy: false,
      ...options,
    },
  )
}

export function useFeaturedProjects(limit = 3) {
  return useProjects({
    page: 1,
    limit,
    featured: true,
    sort: 'display_order',
  })
}

export function useProjectDetail(
  slug: string,
  options: AsyncDataOptions<ProjectDetail> = {},
) {
  const { $api } = useNuxtApp()

  return useAsyncData<ProjectDetail>(
    `public-project-${slug}`,
    async () => {
      const rawProject = await $api.get<RawProject>(`/projects/${slug}`)
      return normalizeProjectDetail(rawProject)
    },
    {
      server: true,
      lazy: false,
      ...options,
    },
  )
}
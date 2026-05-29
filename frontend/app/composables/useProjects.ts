import { isRef, unref, type Ref } from 'vue'
import { useAsyncData, useNuxtApp } from '#app'
import type { ApiPaginatedResponse, ApiResponse } from '../types/api'
import type { ProjectDetail, ProjectListItem, ProjectQuery } from '../types/project'

export const useProjects = () => {
  const { $api } = useNuxtApp()

  const fetchProjects = async (query: ProjectQuery = {}) => {
    return await $api<ApiPaginatedResponse<ProjectListItem[]>>('/projects', {
      query,
    })
  }

  const fetchProjectBySlug = async (slug: string) => {
    const response = await $api<ApiResponse<ProjectDetail>>(`/projects/${slug}`)
    return response.data
  }

  const useProjectsData = (query: Ref<ProjectQuery> | ProjectQuery = {}) => {
    return useAsyncData(
      'public-projects',
      () => fetchProjects(unref(query)),
      {
        watch: isRef(query) ? [query] : false,
      },
    )
  }

  const useProjectDetailData = (slug: string | Ref<string>) => {
    return useAsyncData(
      `public-project-${unref(slug)}`,
      () => fetchProjectBySlug(unref(slug)),
      {
        watch: isRef(slug) ? [slug] : false,
      },
    )
  }

  return {
    fetchProjects,
    fetchProjectBySlug,
    useProjectsData,
    useProjectDetailData,
  }
}
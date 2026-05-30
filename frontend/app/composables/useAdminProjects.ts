import type {
  AdminProjectDetail,
  AdminProjectListItem,
  AdminProjectQuery,
  ProjectFormState,
  RawAdminProject,
} from '~/types/admin-project'
import {
  normalizeAdminProjectDetail,
  normalizeAdminProjectListItem,
  toProjectPayload,
} from '~/types/admin-project'

export function useAdminProjects() {
  const { $api } = useNuxtApp()

  async function getProjects(query: AdminProjectQuery = {}) {
    const response = await $api.getPaginated<RawAdminProject>('/admin/projects', query)

    return {
      data: response.data.map(normalizeAdminProjectListItem),
      meta: response.meta,
    }
  }

  async function getProject(id: string): Promise<AdminProjectDetail> {
    const response = await $api.get<RawAdminProject>(`/admin/projects/${id}`)
    return normalizeAdminProjectDetail(response)
  }

  async function createProject(form: ProjectFormState): Promise<AdminProjectDetail> {
    const response = await $api.post<RawAdminProject>(
      '/admin/projects',
      toProjectPayload(form),
    )

    return normalizeAdminProjectDetail(response)
  }

  async function updateProject(id: string, form: ProjectFormState): Promise<AdminProjectDetail> {
    const response = await $api.put<RawAdminProject>(
      `/admin/projects/${id}`,
      toProjectPayload(form),
    )

    return normalizeAdminProjectDetail(response)
  }

  async function deleteProject(id: string) {
    return await $api.delete<null>(`/admin/projects/${id}`)
  }

  return {
    getProjects,
    getProject,
    createProject,
    updateProject,
    deleteProject,
  }
}
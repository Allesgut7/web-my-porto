import type { Experience, RawExperience } from '~/types/experience'
import { normalizeExperience } from '~/types/experience'

export interface ExperienceFormState {
  type: 'work' | 'education' | 'certification'
  title: string
  organization: string
  description: string
  startDate: string
  endDate: string
  isCurrent: boolean
  tags: string[]
  displayOrder: number
}

export interface ExperiencePayload {
  type: string
  title: string
  organization: string
  description?: string | null
  startDate: string
  endDate?: string | null
  isCurrent: boolean
  tags: string[]
  displayOrder: number
}

export function useAdminExperiences() {
  const { $api } = useNuxtApp()

  async function getExperiences(): Promise<Experience[]> {
    const response = await $api.get<RawExperience[]>('/admin/experiences')
    return response.map(normalizeExperience)
  }

  async function getExperience(id: string): Promise<Experience> {
    const response = await $api.get<RawExperience>(`/admin/experiences/${id}`)
    return normalizeExperience(response)
  }

  async function createExperience(form: ExperienceFormState): Promise<Experience> {
    const response = await $api.post<RawExperience>(
      '/admin/experiences',
      toExperiencePayload(form),
    )
    return normalizeExperience(response)
  }

  async function updateExperience(id: string, form: ExperienceFormState): Promise<Experience> {
    const response = await $api.put<RawExperience>(
      `/admin/experiences/${id}`,
      toExperiencePayload(form),
    )
    return normalizeExperience(response)
  }

  async function deleteExperience(id: string) {
    return await $api.delete<null>(`/admin/experiences/${id}`)
  }

  return {
    getExperiences,
    getExperience,
    createExperience,
    updateExperience,
    deleteExperience,
  }
}

function toExperiencePayload(form: ExperienceFormState): ExperiencePayload {
  return {
    type: form.type,
    title: form.title.trim(),
    organization: form.organization.trim(),
    description: form.description.trim() || null,
    startDate: form.startDate,
    endDate: form.isCurrent ? null : form.endDate || null,
    isCurrent: form.isCurrent,
    tags: form.tags,
    displayOrder: Number(form.displayOrder || 0),
  }
}

export function emptyExperienceForm(): ExperienceFormState {
  return {
    type: 'work',
    title: '',
    organization: '',
    description: '',
    startDate: '',
    endDate: '',
    isCurrent: false,
    tags: [],
    displayOrder: 0,
  }
}

export function experienceToForm(experience: Experience): ExperienceFormState {
  return {
    type: experience.type,
    title: experience.title,
    organization: experience.organization,
    description: experience.description || '',
    startDate: experience.startDate ? experience.startDate.slice(0, 10) : '',
    endDate: experience.endDate ? experience.endDate.slice(0, 10) : '',
    isCurrent: experience.isCurrent,
    tags: experience.tags,
    displayOrder: experience.displayOrder || 0,
  }
}

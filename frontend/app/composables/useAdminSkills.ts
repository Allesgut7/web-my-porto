import type { RawSkill, Skill } from '~/types/skill'
import { normalizeSkill } from '~/types/skill'

export interface SkillFormState {
  name: string
  category: string
  level: string
  iconUrl: string
  displayOrder: number
  isVisible: boolean
}

export interface SkillPayload {
  name: string
  category?: string | null
  level?: string | null
  iconUrl?: string | null
  displayOrder: number
  isVisible: boolean
}

export function useAdminSkills() {
  const { $api } = useNuxtApp()

  async function getSkills(): Promise<Skill[]> {
    const response = await $api.get<RawSkill[]>('/admin/skills')
    return response.map(normalizeSkill)
  }

  async function getSkill(id: string): Promise<Skill> {
    const response = await $api.get<RawSkill>(`/admin/skills/${id}`)
    return normalizeSkill(response)
  }

  async function createSkill(form: SkillFormState): Promise<Skill> {
    const response = await $api.post<RawSkill>(
      '/admin/skills',
      toSkillPayload(form),
    )
    return normalizeSkill(response)
  }

  async function updateSkill(id: string, form: SkillFormState): Promise<Skill> {
    const response = await $api.put<RawSkill>(
      `/admin/skills/${id}`,
      toSkillPayload(form),
    )
    return normalizeSkill(response)
  }

  async function deleteSkill(id: string) {
    return await $api.delete<null>(`/admin/skills/${id}`)
  }

  return {
    getSkills,
    getSkill,
    createSkill,
    updateSkill,
    deleteSkill,
  }
}

function toSkillPayload(form: SkillFormState): SkillPayload {
  return {
    name: form.name.trim(),
    category: form.category.trim() || null,
    level: form.level.trim() || null,
    iconUrl: form.iconUrl.trim() || null,
    displayOrder: Number(form.displayOrder || 0),
    isVisible: form.isVisible,
  }
}

export function emptySkillForm(): SkillFormState {
  return {
    name: '',
    category: '',
    level: '',
    iconUrl: '',
    displayOrder: 0,
    isVisible: true,
  }
}

export function skillToForm(skill: Skill): SkillFormState {
  return {
    name: skill.name,
    category: skill.category || '',
    level: skill.level || '',
    iconUrl: skill.iconUrl || '',
    displayOrder: skill.displayOrder || 0,
    isVisible: skill.isVisible,
  }
}

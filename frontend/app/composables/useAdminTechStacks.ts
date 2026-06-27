import type { RawTechStack, TechStack } from '~/types/tech-stack'
import { normalizeTechStack } from '~/types/tech-stack'

export interface TechStackFormState {
  name: string
  category: string
  iconUrl: string
  displayOrder: number
}

export interface TechStackPayload {
  name: string
  category?: string | null
  iconUrl?: string | null
  displayOrder: number
}

export function useAdminTechStacks() {
  const { $api } = useNuxtApp()

  async function getTechStacks(): Promise<TechStack[]> {
    const response = await $api.get<RawTechStack[]>('/admin/tech-stacks')
    return response.map(normalizeTechStack)
  }

  async function getTechStack(id: string): Promise<TechStack> {
    const response = await $api.get<RawTechStack>(`/admin/tech-stacks/${id}`)
    return normalizeTechStack(response)
  }

  async function createTechStack(form: TechStackFormState): Promise<TechStack> {
    const response = await $api.post<RawTechStack>(
      '/admin/tech-stacks',
      toTechStackPayload(form),
    )
    return normalizeTechStack(response)
  }

  async function updateTechStack(id: string, form: TechStackFormState): Promise<TechStack> {
    const response = await $api.put<RawTechStack>(
      `/admin/tech-stacks/${id}`,
      toTechStackPayload(form),
    )
    return normalizeTechStack(response)
  }

  async function deleteTechStack(id: string) {
    return await $api.delete<null>(`/admin/tech-stacks/${id}`)
  }

  return {
    getTechStacks,
    getTechStack,
    createTechStack,
    updateTechStack,
    deleteTechStack,
  }
}

function toTechStackPayload(form: TechStackFormState): TechStackPayload {
  return {
    name: form.name.trim(),
    category: form.category.trim() || null,
    iconUrl: form.iconUrl.trim() || null,
    displayOrder: Number(form.displayOrder || 0),
  }
}

export function emptyTechStackForm(): TechStackFormState {
  return {
    name: '',
    category: '',
    iconUrl: '',
    displayOrder: 0,
  }
}

export function techStackToForm(techStack: TechStack): TechStackFormState {
  return {
    name: techStack.name,
    category: techStack.category || '',
    iconUrl: techStack.iconUrl || '',
    displayOrder: techStack.displayOrder || 0,
  }
}

import type { Achievement, RawAchievement } from '~/types/achievement'
import { normalizeAchievement } from '~/types/achievement'

export interface AchievementFormState {
  title: string
  issuer: string
  description: string
  category: string
  achievedAt: string
  credentialId: string
  externalUrl: string
  certificateFile: string
  displayOrder: number
  isVisible: boolean
}

export interface AchievementPayload {
  title: string
  issuer?: string | null
  description?: string | null
  category?: string | null
  achievedAt?: string | null
  credentialId?: string | null
  externalUrl?: string | null
  certificateFile?: string | null
  displayOrder: number
  isVisible: boolean
}

export function useAdminAchievements() {
  const { $api } = useNuxtApp()

  async function getAchievements(): Promise<Achievement[]> {
    const response = await $api.get<RawAchievement[]>('/admin/achievements')
    return response.map(normalizeAchievement)
  }

  async function getAchievement(id: string): Promise<Achievement> {
    const response = await $api.get<RawAchievement>(`/admin/achievements/${id}`)
    return normalizeAchievement(response)
  }

  async function createAchievement(form: AchievementFormState): Promise<Achievement> {
    const response = await $api.post<RawAchievement>(
      '/admin/achievements',
      toAchievementPayload(form),
    )
    return normalizeAchievement(response)
  }

  async function updateAchievement(id: string, form: AchievementFormState): Promise<Achievement> {
    const response = await $api.put<RawAchievement>(
      `/admin/achievements/${id}`,
      toAchievementPayload(form),
    )
    return normalizeAchievement(response)
  }

  async function deleteAchievement(id: string) {
    return await $api.delete<null>(`/admin/achievements/${id}`)
  }

  return {
    getAchievements,
    getAchievement,
    createAchievement,
    updateAchievement,
    deleteAchievement,
  }
}

function toAchievementPayload(form: AchievementFormState): AchievementPayload {
  return {
    title: form.title.trim(),
    issuer: form.issuer.trim() || null,
    description: form.description.trim() || null,
    category: form.category.trim() || null,
    achievedAt: form.achievedAt || null,
    credentialId: form.credentialId.trim() || null,
    externalUrl: form.externalUrl.trim() || null,
    certificateFile: form.certificateFile || null,
    displayOrder: Number(form.displayOrder || 0),
    isVisible: form.isVisible,
  }
}

export function emptyAchievementForm(): AchievementFormState {
  return {
    title: '',
    issuer: '',
    description: '',
    category: '',
    achievedAt: '',
    credentialId: '',
    externalUrl: '',
    certificateFile: '',
    displayOrder: 0,
    isVisible: true,
  }
}

export function achievementToForm(achievement: Achievement): AchievementFormState {
  return {
    title: achievement.title,
    issuer: achievement.issuer || '',
    description: achievement.description || '',
    category: achievement.category || '',
    achievedAt: achievement.achievedAt ? achievement.achievedAt.slice(0, 10) : '',
    credentialId: achievement.credentialId || '',
    externalUrl: achievement.externalUrl || '',
    certificateFile: achievement.certificateFile || '',
    displayOrder: achievement.displayOrder || 0,
    isVisible: achievement.isVisible,
  }
}

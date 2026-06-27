import type { Profile, RawProfile } from '~/types/profile'
import { normalizeProfile } from '~/types/profile'

export interface ProfileFormState {
  fullName: string
  headline: string
  bio: string
  location: string
  email: string
  phone: string
  githubUrl: string
  linkedinUrl: string
  websiteUrl: string
  avatarUrl: string
  cvUrl: string
}

export interface ProfilePayload {
  fullName: string
  headline?: string | null
  bio?: string | null
  location?: string | null
  email?: string | null
  phone?: string | null
  githubUrl?: string | null
  linkedinUrl?: string | null
  websiteUrl?: string | null
  avatarUrl?: string | null
  cvUrl?: string | null
}

export function useAdminProfile() {
  const { $api } = useNuxtApp()

  async function getProfile(): Promise<Profile> {
    const response = await $api.get<RawProfile>('/admin/profile')
    return normalizeProfile(response)
  }

  async function updateProfile(form: ProfileFormState): Promise<Profile> {
    const response = await $api.put<RawProfile>(
      '/admin/profile',
      toProfilePayload(form),
    )
    return normalizeProfile(response)
  }

  return {
    getProfile,
    updateProfile,
  }
}

function toProfilePayload(form: ProfileFormState): ProfilePayload {
  return {
    fullName: form.fullName.trim(),
    headline: form.headline.trim() || null,
    bio: form.bio.trim() || null,
    location: form.location.trim() || null,
    email: form.email.trim() || null,
    phone: form.phone.trim() || null,
    githubUrl: form.githubUrl.trim() || null,
    linkedinUrl: form.linkedinUrl.trim() || null,
    websiteUrl: form.websiteUrl.trim() || null,
    avatarUrl: form.avatarUrl || null,
    cvUrl: form.cvUrl || null,
  }
}

export function emptyProfileForm(): ProfileFormState {
  return {
    fullName: '',
    headline: '',
    bio: '',
    location: '',
    email: '',
    phone: '',
    githubUrl: '',
    linkedinUrl: '',
    websiteUrl: '',
    avatarUrl: '',
    cvUrl: '',
  }
}

export function profileToForm(profile: Profile): ProfileFormState {
  return {
    fullName: profile.fullName || '',
    headline: profile.headline || '',
    bio: profile.bio || '',
    location: profile.location || '',
    email: profile.email || '',
    phone: profile.phone || '',
    githubUrl: profile.githubUrl || '',
    linkedinUrl: profile.linkedinUrl || '',
    websiteUrl: profile.websiteUrl || '',
    avatarUrl: profile.avatarUrl || '',
    cvUrl: profile.cvUrl || '',
  }
}

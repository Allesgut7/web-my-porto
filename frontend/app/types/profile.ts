export interface Profile {
  id: string
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
  createdAt?: string
  updatedAt?: string
}

export interface RawProfile {
  id: string
  full_name?: string
  fullName?: string
  headline?: string | null
  bio?: string | null
  location?: string | null
  email?: string | null
  phone?: string | null
  github_url?: string | null
  githubUrl?: string | null
  linkedin_url?: string | null
  linkedinUrl?: string | null
  website_url?: string | null
  websiteUrl?: string | null
  avatar_url?: string | null
  avatarUrl?: string | null
  cv_url?: string | null
  cvUrl?: string | null
  created_at?: string
  createdAt?: string
  updated_at?: string
  updatedAt?: string
}

export function normalizeProfile(profile: RawProfile): Profile {
  return {
    id: profile.id,
    fullName: profile.fullName ?? profile.full_name ?? 'Developer',
    headline: profile.headline ?? null,
    bio: profile.bio ?? null,
    location: profile.location ?? null,
    email: profile.email ?? null,
    phone: profile.phone ?? null,
    githubUrl: profile.githubUrl ?? profile.github_url ?? null,
    linkedinUrl: profile.linkedinUrl ?? profile.linkedin_url ?? null,
    websiteUrl: profile.websiteUrl ?? profile.website_url ?? null,
    avatarUrl: profile.avatarUrl ?? profile.avatar_url ?? null,
    cvUrl: profile.cvUrl ?? profile.cv_url ?? null,
    createdAt: profile.createdAt ?? profile.created_at,
    updatedAt: profile.updatedAt ?? profile.updated_at,
  }
}
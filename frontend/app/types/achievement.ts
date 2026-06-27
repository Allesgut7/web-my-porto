export interface Achievement {
  id: string
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

export interface RawAchievement {
  id: string
  title: string
  issuer?: string | null
  description?: string | null
  category?: string | null
  achieved_at?: string | null
  achievedAt?: string | null
  credential_id?: string | null
  credentialId?: string | null
  external_url?: string | null
  externalUrl?: string | null
  certificate_file?: string | null
  certificateFile?: string | null
  display_order?: number
  displayOrder?: number
  is_visible?: boolean
  isVisible?: boolean
}

export function normalizeAchievement(raw: RawAchievement): Achievement {
  return {
    id: raw.id,
    title: raw.title,
    issuer: raw.issuer ?? null,
    description: raw.description ?? null,
    category: raw.category ?? null,
    achievedAt: raw.achievedAt ?? raw.achieved_at ?? null,
    credentialId: raw.credentialId ?? raw.credential_id ?? null,
    externalUrl: raw.externalUrl ?? raw.external_url ?? null,
    certificateFile: raw.certificateFile ?? raw.certificate_file ?? null,
    displayOrder: raw.displayOrder ?? raw.display_order ?? 0,
    isVisible: raw.isVisible ?? raw.is_visible ?? true,
  }
}

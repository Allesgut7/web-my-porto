export interface Experience {
  id: string
  type: 'work' | 'education' | 'certification'
  title: string
  organization: string
  description?: string | null
  startDate: string
  endDate?: string | null
  isCurrent: boolean
  tags: string[]
  displayOrder: number
}

export interface RawExperience {
  id: string
  type: string
  title: string
  organization: string
  description?: string | null
  start_date?: string
  startDate?: string
  end_date?: string | null
  endDate?: string | null
  is_current?: boolean
  isCurrent?: boolean
  tags?: string[]
  display_order?: number
  displayOrder?: number
}

export function normalizeExperience(raw: RawExperience): Experience {
  return {
    id: raw.id,
    type: raw.type as Experience['type'],
    title: raw.title,
    organization: raw.organization,
    description: raw.description ?? null,
    startDate: raw.startDate ?? raw.start_date ?? '',
    endDate: raw.endDate ?? raw.end_date ?? null,
    isCurrent: raw.isCurrent ?? raw.is_current ?? false,
    tags: raw.tags ?? [],
    displayOrder: raw.displayOrder ?? raw.display_order ?? 0,
  }
}

export interface Skill {
  id: string
  name: string
  category?: string | null
  level?: string | null
  iconUrl?: string | null
  displayOrder: number
  isVisible: boolean
}

export interface RawSkill {
  id: string
  name: string
  category?: string | null
  level?: string | null
  icon_url?: string | null
  iconUrl?: string | null
  display_order?: number
  displayOrder?: number
  is_visible?: boolean
  isVisible?: boolean
}

export function normalizeSkill(raw: RawSkill): Skill {
  return {
    id: raw.id,
    name: raw.name,
    category: raw.category ?? null,
    level: raw.level ?? null,
    iconUrl: raw.iconUrl ?? raw.icon_url ?? null,
    displayOrder: raw.displayOrder ?? raw.display_order ?? 0,
    isVisible: raw.isVisible ?? raw.is_visible ?? true,
  }
}

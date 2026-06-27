export interface TechStack {
  id: string
  name: string
  category?: string | null
  iconUrl?: string | null
  displayOrder: number
}

export interface RawTechStack {
  id: string
  name: string
  category?: string | null
  icon_url?: string | null
  iconUrl?: string | null
  display_order?: number
  displayOrder?: number
}

export function normalizeTechStack(raw: RawTechStack): TechStack {
  return {
    id: raw.id,
    name: raw.name,
    category: raw.category ?? null,
    iconUrl: raw.iconUrl ?? raw.icon_url ?? null,
    displayOrder: raw.displayOrder ?? raw.display_order ?? 0,
  }
}

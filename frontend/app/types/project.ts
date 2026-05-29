export interface ProjectListItem {
  id: string
  title: string
  slug: string
  shortDescription: string | null
  projectType: string | null
  thumbnailUrl: string | null
  isFeatured: boolean
  startedAt: string | null
  completedAt: string | null
  techStacks: string[]
}

export interface ProjectImage {
  id: string
  imageUrl: string | null
  imageType: string | null
  caption: string | null
  displayOrder: number
}

export interface ProjectDetail {
  id: string
  title: string
  slug: string
  shortDescription: string | null
  description: string | null
  projectType: string | null
  demoUrl: string | null
  repositoryUrl: string | null
  documentationUrl: string | null
  thumbnailUrl: string | null
  isFeatured: boolean
  startedAt: string | null
  completedAt: string | null
  techStacks: string[]
  images: ProjectImage[]
}

export interface ProjectQuery {
  page?: number
  limit?: number
  category?: string
  search?: string
  sort?: 'latest' | 'oldest' | 'display_order'
  featured?: boolean
}
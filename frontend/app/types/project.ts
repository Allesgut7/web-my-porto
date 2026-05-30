export interface TechStack {
  id?: string
  name: string
  category?: string | null
  iconUrl?: string | null
}

export interface ProjectImage {
  id: string
  imageUrl: string
  imageType?: string | null
  caption?: string | null
  displayOrder?: number
}

export interface ProjectListItem {
  id: string
  title: string
  slug: string
  shortDescription?: string | null
  projectType?: string | null
  status?: string | null
  demoUrl?: string | null
  repositoryUrl?: string | null
  documentationUrl?: string | null
  thumbnailUrl?: string | null
  isFeatured: boolean
  displayOrder?: number
  startedAt?: string | null
  completedAt?: string | null
  createdAt?: string
  updatedAt?: string
  techStacks: TechStack[]
}

export interface ProjectDetail extends ProjectListItem {
  description?: string | null
  problem?: string | null
  solution?: string | null
  impact?: string | null
  role?: string | null
  images: ProjectImage[]
}

export interface RawTechStack {
  id?: string
  name: string
  category?: string | null
  icon_url?: string | null
  iconUrl?: string | null
}

export interface RawProjectImage {
  id: string
  image_url?: string
  imageUrl?: string
  file_url?: string
  fileUrl?: string
  image_type?: string | null
  imageType?: string | null
  caption?: string | null
  display_order?: number
  displayOrder?: number
}

export interface RawProject {
  id: string
  title: string
  slug: string
  short_description?: string | null
  shortDescription?: string | null
  description?: string | null
  project_type?: string | null
  projectType?: string | null
  status?: string | null
  demo_url?: string | null
  demoUrl?: string | null
  repository_url?: string | null
  repositoryUrl?: string | null
  documentation_url?: string | null
  documentationUrl?: string | null
  thumbnail_url?: string | null
  thumbnailUrl?: string | null
  is_featured?: boolean
  isFeatured?: boolean
  display_order?: number
  displayOrder?: number
  started_at?: string | null
  startedAt?: string | null
  completed_at?: string | null
  completedAt?: string | null
  created_at?: string
  createdAt?: string
  updated_at?: string
  updatedAt?: string
  tech_stacks?: RawTechStack[]
  techStacks?: RawTechStack[]
  images?: RawProjectImage[]
  problem?: string | null
  solution?: string | null
  impact?: string | null
  role?: string | null
}

export function normalizeTechStack(stack: RawTechStack): TechStack {
  return {
    id: stack.id,
    name: stack.name,
    category: stack.category ?? null,
    iconUrl: stack.iconUrl ?? stack.icon_url ?? null,
  }
}

export function normalizeProjectImage(image: RawProjectImage): ProjectImage {
  return {
    id: image.id,
    imageUrl: image.imageUrl ?? image.image_url ?? image.fileUrl ?? image.file_url ?? '',
    imageType: image.imageType ?? image.image_type ?? null,
    caption: image.caption ?? null,
    displayOrder: image.displayOrder ?? image.display_order,
  }
}

export function normalizeProjectListItem(project: RawProject): ProjectListItem {
  return {
    id: project.id,
    title: project.title,
    slug: project.slug,
    shortDescription: project.shortDescription ?? project.short_description ?? null,
    projectType: project.projectType ?? project.project_type ?? null,
    status: project.status ?? null,
    demoUrl: project.demoUrl ?? project.demo_url ?? null,
    repositoryUrl: project.repositoryUrl ?? project.repository_url ?? null,
    documentationUrl: project.documentationUrl ?? project.documentation_url ?? null,
    thumbnailUrl: extractThumbnailUrl(project),
    isFeatured: project.isFeatured ?? project.is_featured ?? false,
    displayOrder: project.displayOrder ?? project.display_order,
    startedAt: project.startedAt ?? project.started_at ?? null,
    completedAt: project.completedAt ?? project.completed_at ?? null,
    createdAt: project.createdAt ?? project.created_at,
    updatedAt: project.updatedAt ?? project.updated_at,
    techStacks: (project.techStacks ?? project.tech_stacks ?? []).map(normalizeTechStack),
  }
}

export function normalizeProjectDetail(project: RawProject): ProjectDetail {
  return {
    ...normalizeProjectListItem(project),
    description: project.description ?? null,
    problem: project.problem ?? null,
    solution: project.solution ?? null,
    impact: project.impact ?? null,
    role: project.role ?? null,
    images: (project.images ?? []).map(normalizeProjectImage).filter((image) => image.imageUrl),
  }
}

type MaybeFileObject = {
  id?: string | null
  fileUrl?: string | null
  file_url?: string | null
  url?: string | null
}

function extractThumbnailUrl(project: RawProject): string | null {
  const record = project as RawProject & {
    thumbnail?: MaybeFileObject | null
    thumbnail_file?: MaybeFileObject | null
    thumbnailFile?: MaybeFileObject | null
    file?: MaybeFileObject | null
  }

  return (
    project.thumbnailUrl ??
    project.thumbnail_url ??
    record.thumbnail?.fileUrl ??
    record.thumbnail?.file_url ??
    record.thumbnail?.url ??
    record.thumbnailFile?.fileUrl ??
    record.thumbnailFile?.file_url ??
    record.thumbnailFile?.url ??
    record.thumbnail_file?.fileUrl ??
    record.thumbnail_file?.file_url ??
    record.thumbnail_file?.url ??
    null
  )
}
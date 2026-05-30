import type { ProjectDetail, ProjectListItem, RawProject } from '~/types/project'
import { normalizeProjectDetail, normalizeProjectListItem } from '~/types/project'

export type ProjectStatus = 'draft' | 'published' | 'archived'

export interface AdminProjectListItem extends ProjectListItem {
  status: ProjectStatus
}

export interface AdminProjectDetail extends ProjectDetail {
  status: ProjectStatus
  thumbnailFileId?: string | null
}

export interface ProjectFormState {
  title: string
  slug: string
  shortDescription: string
  description: string
  projectType: string
  status: ProjectStatus
  demoUrl: string
  repositoryUrl: string
  documentationUrl: string
  thumbnailFileId: string
  thumbnailUrl: string
  isFeatured: boolean
  displayOrder: number
  startedAt: string
  completedAt: string
  techStackIds: string[]
}

// export interface ProjectPayload {
//   title: string
//   slug: string
//   short_description?: string | null
//   description?: string | null
//   project_type?: string | null
//   status: ProjectStatus
//   demo_url?: string | null
//   repository_url?: string | null
//   documentation_url?: string | null
//   thumbnail_file_id?: string | null
//   is_featured: boolean
//   display_order: number
//   started_at?: string | null
//   completed_at?: string | null
//   tech_stack_ids?: string[]
// }

export interface ProjectPayload {
  title: string
  slug: string
  shortDescription?: string | null
  description?: string | null
  projectType?: string | null
  status: ProjectStatus
  demoUrl?: string | null
  repositoryUrl?: string | null
  documentationUrl?: string | null
  thumbnailFileId?: string | null
  isFeatured: boolean
  displayOrder: number
  startedAt?: string | null
  completedAt?: string | null
  techStackIds?: string[]

  // fallback jika backend kamu masih membaca snake_case
  short_description?: string | null
  project_type?: string | null
  demo_url?: string | null
  repository_url?: string | null
  documentation_url?: string | null
  thumbnail_file_id?: string | null
  is_featured?: boolean
  display_order?: number
  started_at?: string | null
  completed_at?: string | null
  tech_stack_ids?: string[]
}

export interface AdminProjectQuery {
  page?: number
  limit?: number
  search?: string
  status?: ProjectStatus | ''
  sort?: 'latest' | 'oldest' | 'display_order'
}

export interface RawAdminProject extends RawProject {
  thumbnail_file_id?: string | null
  thumbnailFileId?: string | null
}

export function emptyProjectForm(): ProjectFormState {
  return {
    title: '',
    slug: '',
    shortDescription: '',
    description: '',
    projectType: '',
    status: 'draft',
    demoUrl: '',
    repositoryUrl: '',
    documentationUrl: '',
    thumbnailFileId: '',
    thumbnailUrl: '',
    isFeatured: false,
    displayOrder: 0,
    startedAt: '',
    completedAt: '',
    techStackIds: [],
  }
}

// export function toProjectPayload(form: ProjectFormState): ProjectPayload {
//   return {
//     title: form.title,
//     slug: form.slug,
//     short_description: form.shortDescription || null,
//     description: form.description || null,
//     project_type: form.projectType || null,
//     status: form.status,
//     demo_url: form.demoUrl || null,
//     repository_url: form.repositoryUrl || null,
//     documentation_url: form.documentationUrl || null,
//     thumbnail_file_id: form.thumbnailFileId || null,
//     is_featured: form.isFeatured,
//     display_order: Number(form.displayOrder || 0),
//     started_at: form.startedAt || null,
//     completed_at: form.completedAt || null,
//     tech_stack_ids: form.techStackIds,
//   }
// }


export function toProjectPayload(form: ProjectFormState): ProjectPayload {
  const shortDescription = form.shortDescription.trim() || null
  const description = form.description.trim() || null
  const projectType = form.projectType.trim() || null
  const demoUrl = form.demoUrl.trim() || null
  const repositoryUrl = form.repositoryUrl.trim() || null
  const documentationUrl = form.documentationUrl.trim() || null
  const thumbnailFileId = form.thumbnailFileId || null
  const displayOrder = Number(form.displayOrder || 0)
  const startedAt = form.startedAt || null
  const completedAt = form.completedAt || null

  return {
    title: form.title.trim(),
    slug: form.slug.trim(),
    shortDescription,
    description,
    projectType,
    status: form.status,
    demoUrl,
    repositoryUrl,
    documentationUrl,
    thumbnailFileId,
    isFeatured: form.isFeatured,
    displayOrder,
    startedAt,
    completedAt,
    techStackIds: form.techStackIds,

    short_description: shortDescription,
    project_type: projectType,
    demo_url: demoUrl,
    repository_url: repositoryUrl,
    documentation_url: documentationUrl,
    thumbnail_file_id: thumbnailFileId,
    is_featured: form.isFeatured,
    display_order: displayOrder,
    started_at: startedAt,
    completed_at: completedAt,
    tech_stack_ids: form.techStackIds,
  }
}

export function normalizeAdminProjectListItem(project: RawAdminProject): AdminProjectListItem {
  return {
    ...normalizeProjectListItem(project),
    status: (project.status || 'draft') as ProjectStatus,
  }
}

export function normalizeAdminProjectDetail(project: RawAdminProject): AdminProjectDetail {
  return {
    ...normalizeProjectDetail(project),
    status: (project.status || 'draft') as ProjectStatus,
    thumbnailFileId: extractThumbnailFileId(project),
  }
}

export function projectToForm(project: AdminProjectDetail): ProjectFormState {
  return {
    title: project.title,
    slug: project.slug,
    shortDescription: project.shortDescription || '',
    description: project.description || '',
    projectType: project.projectType || '',
    status: project.status,
    demoUrl: project.demoUrl || '',
    repositoryUrl: project.repositoryUrl || '',
    documentationUrl: project.documentationUrl || '',
    thumbnailFileId: project.thumbnailFileId || '',
    thumbnailUrl: project.thumbnailUrl || '',
    isFeatured: project.isFeatured,
    displayOrder: project.displayOrder || 0,
    startedAt: project.startedAt ? project.startedAt.slice(0, 10) : '',
    completedAt: project.completedAt ? project.completedAt.slice(0, 10) : '',
    techStackIds: project.techStacks.map((stack) => stack.id).filter(Boolean) as string[],
  }
}

function extractThumbnailFileId(project: RawAdminProject): string | null {
  const record = project as RawAdminProject & {
    thumbnail?: { id?: string | null } | null
    thumbnailFile?: { id?: string | null } | null
    thumbnail_file?: { id?: string | null } | null
  }

  return (
    project.thumbnailFileId ??
    project.thumbnail_file_id ??
    record.thumbnail?.id ??
    record.thumbnailFile?.id ??
    record.thumbnail_file?.id ??
    null
  )
}
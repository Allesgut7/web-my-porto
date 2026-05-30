export type ApiQueryValue =
  | string
  | number
  | boolean
  | null
  | undefined

export interface ApiQuery {
  [key: string]: ApiQueryValue
}

export interface ApiResponse<T> {
  success: boolean
  message: string
  data: T
}

export interface ApiErrorResponse {
  success: false
  message: string
  errors?: Record<string, string>
}

export interface PaginationMeta {
  page: number
  limit: number
  total: number
  totalPages: number
}

export interface PaginatedApiResponse<T> {
  success: boolean
  message: string
  data: T[]
  meta: PaginationMeta
}

export interface QueryParams extends ApiQuery {
  page?: number
  limit?: number
  sort?: 'latest' | 'oldest' | 'display_order'
  search?: string
  category?: string
  featured?: boolean
}
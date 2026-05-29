export interface ApiResponse<T> {
  success: boolean
  message: string
  data: T
}

export interface ApiMeta {
  page: number
  limit: number
  total: number
  totalPages: number
}

export interface ApiPaginatedResponse<T> {
  success: boolean
  message: string
  data: T
  meta: ApiMeta
}

export interface ApiErrorResponse {
  success: false
  message: string
  errors?: Record<string, string>
}


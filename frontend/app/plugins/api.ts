import type { ApiResponse, PaginatedApiResponse } from '~/types/api'

type ApiQuery = Record<string, any>
type ApiBody = Record<string, any> | BodyInit | null | undefined

type ApiFetch = {
  get<T>(url: string, query?: ApiQuery): Promise<T>
  getResponse<T>(url: string, query?: ApiQuery): Promise<ApiResponse<T>>
  getPaginated<T>(url: string, query?: ApiQuery): Promise<PaginatedApiResponse<T>>
  post<T>(url: string, body?: ApiBody): Promise<T>
  put<T>(url: string, body?: ApiBody): Promise<T>
  delete<T>(url: string): Promise<T>
  upload<T>(url: string, formData: FormData): Promise<T>
}

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()

  const baseURL = import.meta.server
    ? config.apiBaseUrl
    : config.public.apiBaseUrl

  const ssrHeaders = import.meta.server
    ? useRequestHeaders(['cookie'])
    : {}

  const api = $fetch.create({
    baseURL,
    credentials: 'include',
    headers: {
      Accept: 'application/json',
      ...ssrHeaders,
    },
    onResponseError({ response }) {
      const message =
        response._data?.message ||
        response.statusText ||
        'Terjadi kesalahan saat menghubungi server.'

      throw createError({
        statusCode: response.status,
        statusMessage: message,
        data: response._data,
      })
    },
  })

  const client: ApiFetch = {
    async get<T>(url: string, query?: ApiQuery): Promise<T> {
      const response = await api<ApiResponse<T>>(url, {
        method: 'GET',
        query,
      })

      return response.data
    },

    async getResponse<T>(
      url: string,
      query?: ApiQuery,
    ): Promise<ApiResponse<T>> {
      return await api<ApiResponse<T>>(url, {
        method: 'GET',
        query,
      })
    },

    async getPaginated<T>(
      url: string,
      query?: ApiQuery,
    ): Promise<PaginatedApiResponse<T>> {
      return await api<PaginatedApiResponse<T>>(url, {
        method: 'GET',
        query,
      })
    },

    async post<T>(url: string, body?: ApiBody): Promise<T> {
      const response = await api<ApiResponse<T>>(url, {
        method: 'POST',
        body,
      })

      return response.data
    },

    async put<T>(url: string, body?: ApiBody): Promise<T> {
      const response = await api<ApiResponse<T>>(url, {
        method: 'PUT',
        body,
      })

      return response.data
    },

    async delete<T>(url: string): Promise<T> {
      const response = await api<ApiResponse<T>>(url, {
        method: 'DELETE',
      })

      return response.data
    },

    async upload<T>(url: string, formData: FormData): Promise<T> {
      const response = await api<ApiResponse<T>>(url, {
        method: 'POST',
        body: formData,
      })

      return response.data
    },
  }

  return {
    provide: {
      api: client,
    },
  }
})

declare module '#app' {
  interface NuxtApp {
    $api: ApiFetch
  }
}

declare module 'vue' {
  interface ComponentCustomProperties {
    $api: ApiFetch
  }
}
export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()

  const api = $fetch.create({
    baseURL: config.public.apiBaseUrl,
    credentials: 'include',
    headers: {
      Accept: 'application/json',
    },
    onResponseError({ response }) {
      const message =
        response._data?.message ||
        response.statusText ||
        'Request failed'

      throw createError({
        statusCode: response.status,
        statusMessage: message,
        data: response._data,
      })
    },
  })

  return {
    provide: {
      api,
    },
  }
})
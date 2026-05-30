export default defineNuxtRouteMiddleware(async () => {
  const { checkAuth } = useAuth()
  const user = await checkAuth()

  if (user) {
    return navigateTo('/admin/dashboard')
  }
})
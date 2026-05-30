export default defineNuxtRouteMiddleware(async (to) => {
  if (!to.path.startsWith('/admin')) return
  if (to.path === '/admin/login') return

  const { checkAuth } = useAuth()
  const user = await checkAuth()

  if (!user) {
    return navigateTo({
      path: '/admin/login',
      query: {
        redirect: to.fullPath,
      },
    })
  }
})
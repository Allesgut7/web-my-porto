import type { AdminUser, LoginRequest, LoginResponse } from '~/types/auth'
import { normalizeLoginResponse } from '~/types/auth'

export function useAuth() {
  const { $api } = useNuxtApp()

  const user = useState<AdminUser | null>('admin-user', () => null)
  const isCheckingAuth = useState<boolean>('admin-auth-checking', () => false)

  const isAuthenticated = computed(() => Boolean(user.value))

  async function login(payload: LoginRequest) {
    const response = await $api.post<LoginResponse>('/auth/login', payload)
    const admin = normalizeLoginResponse(response)

    user.value = admin
    return admin
  }

  async function logout() {
    try {
      await $api.post<null>('/auth/logout')
    } catch {
      // Tetap bersihkan state frontend walaupun request logout gagal.
    } finally {
      user.value = null
      clearNuxtData()
      await navigateTo('/admin/login')
    }
  }

  async function fetchMe() {
    const admin = await $api.get<AdminUser>('/auth/me')
    user.value = admin
    return admin
  }

  async function checkAuth() {
    isCheckingAuth.value = true

    try {
      const admin = await fetchMe()
      return admin
    } catch {
      user.value = null
      return null
    } finally {
      isCheckingAuth.value = false
    }
  }

  return {
    user,
    isAuthenticated,
    isCheckingAuth,
    login,
    logout,
    fetchMe,
    checkAuth,
  }
}
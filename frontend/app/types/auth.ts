export interface AdminUser {
  id: string
  name: string
  email: string
  role: string
}

export interface LoginRequest {
  email: string
  password: string
}

export interface LoginResponse {
  user?: AdminUser
  id?: string
  name?: string
  email?: string
  role?: string
}

export function normalizeLoginResponse(response: LoginResponse): AdminUser {
  if (response.user) return response.user

  return {
    id: response.id || '',
    name: response.name || 'Admin',
    email: response.email || '',
    role: response.role || 'owner',
  }
}
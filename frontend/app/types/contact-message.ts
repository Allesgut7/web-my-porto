export interface ContactMessage {
  id: string
  name: string
  email: string
  subject?: string | null
  message: string
  isRead: boolean
  createdAt: string
}

export interface RawContactMessage {
  id: string
  name: string
  email: string
  subject?: string | null
  message: string
  is_read?: boolean
  isRead?: boolean
  created_at?: string
  createdAt?: string
}

export function normalizeContactMessage(raw: RawContactMessage): ContactMessage {
  return {
    id: raw.id,
    name: raw.name,
    email: raw.email,
    subject: raw.subject ?? null,
    message: raw.message,
    isRead: raw.isRead ?? raw.is_read ?? false,
    createdAt: raw.createdAt ?? raw.created_at ?? '',
  }
}

export interface ContactFormState {
  name: string
  email: string
  subject: string
  message: string
  isSubmitting: boolean
  isSuccess: boolean
  error: string | null
}

import type { ContactMessage, RawContactMessage } from '~/types/contact-message'
import { normalizeContactMessage } from '~/types/contact-message'

export interface AdminContactMessageQuery {
  page?: number
  limit?: number
  search?: string
  isRead?: boolean
  sort?: 'latest' | 'oldest'
}

export function useAdminContactMessages() {
  const { $api } = useNuxtApp()

  async function getMessages(query: AdminContactMessageQuery = {}) {
    const response = await $api.getPaginated<RawContactMessage>('/admin/contact-messages', query)

    return {
      data: response.data.map(normalizeContactMessage),
      meta: response.meta,
    }
  }

  async function getMessage(id: string): Promise<ContactMessage> {
    const response = await $api.get<RawContactMessage>(`/admin/contact-messages/${id}`)
    return normalizeContactMessage(response)
  }

  async function markAsRead(id: string): Promise<ContactMessage> {
    const response = await $api.put<RawContactMessage>(
      `/admin/contact-messages/${id}/read`,
    )
    return normalizeContactMessage(response)
  }

  async function deleteMessage(id: string) {
    return await $api.delete<null>(`/admin/contact-messages/${id}`)
  }

  async function getUnreadCount(): Promise<number> {
    const response = await $api.get<{ count: number }>('/admin/contact-messages/unread-count')
    return response.count
  }

  return {
    getMessages,
    getMessage,
    markAsRead,
    deleteMessage,
    getUnreadCount,
  }
}

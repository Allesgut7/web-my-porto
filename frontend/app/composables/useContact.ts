import type { ContactFormState } from '~/types/contact-message'

export function useContact() {
  const { $api } = useNuxtApp()

  const isSubmitting = useState<boolean>('contact-submitting', () => false)
  const error = useState<string | null>('contact-error', () => null)

  async function submitMessage(payload: Omit<ContactFormState, 'isSubmitting' | 'isSuccess' | 'error'>) {
    isSubmitting.value = true
    error.value = null

    try {
      const response = await $api.post<{ success: boolean; message: string }>(
        '/contact',
        payload,
      )
      return response
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Gagal mengirim pesan.'
      error.value = message
      throw err
    } finally {
      isSubmitting.value = false
    }
  }

  return {
    submitMessage,
    isSubmitting,
    error,
  }
}

export function safeUrl(url: string | null | undefined): string | null {
  if (!url) return null
  try {
    const parsed = new URL(url)
    return ['http:', 'https:'].includes(parsed.protocol) ? url : null
  } catch {
    return null
  }
}

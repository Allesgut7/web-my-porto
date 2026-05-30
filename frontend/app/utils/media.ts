export function resolveImageUrl(source: any): string | null {
  if (!source) return null

  return (
    source.thumbnailUrl ||
    source.thumbnail_url ||
    source.imageUrl ||
    source.image_url ||
    source.fileUrl ||
    source.file_url ||
    source.url ||
    source.thumbnail?.fileUrl ||
    source.thumbnail?.file_url ||
    source.thumbnail?.url ||
    source.thumbnailFile?.fileUrl ||
    source.thumbnailFile?.file_url ||
    source.thumbnailFile?.url ||
    source.thumbnail_file?.fileUrl ||
    source.thumbnail_file?.file_url ||
    source.thumbnail_file?.url ||
    null
  )
}
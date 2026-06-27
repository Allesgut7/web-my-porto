import type { RawUploadedFile, UploadedFile } from '~/types/file'
import { normalizeUploadedFile } from '~/types/file'

export type ImageFileType = 'avatar' | 'thumbnail' | 'gallery'
export type DocumentFileType = 'cv' | 'certificate' | 'document'

export function useUploads() {
  const { $api } = useNuxtApp()

  async function uploadImage(
    file: File,
    fileType: ImageFileType = 'thumbnail',
    folder?: string,
  ): Promise<UploadedFile> {
    const MAX_IMAGE_SIZE = 5 * 1024 * 1024
    if (file.size > MAX_IMAGE_SIZE) {
      throw createError({
        statusCode: 413,
        statusMessage: 'Ukuran file gambar maksimal 5 MB.',
      })
    }

    const formData = new FormData()
    formData.append('file', file)
    formData.append('fileType', fileType)

    if (folder) {
      formData.append('folder', folder)
    }

    const response = await $api.upload<RawUploadedFile>(
      '/admin/uploads/images',
      formData,
    )

    const uploaded = normalizeUploadedFile(response)

    if (!uploaded.id || !uploaded.fileUrl) {
      throw createError({
        statusCode: 500,
        statusMessage: 'Upload berhasil, tetapi response file dari backend tidak lengkap.',
      })
    }

    return uploaded
  }

  async function uploadFile(
    file: File,
    fileType: DocumentFileType = 'document',
    folder?: string,
  ): Promise<UploadedFile> {
    const MAX_DOC_SIZE = 10 * 1024 * 1024
    if (file.size > MAX_DOC_SIZE) {
      throw createError({
        statusCode: 413,
        statusMessage: 'Ukuran file dokumen maksimal 10 MB.',
      })
    }

    const formData = new FormData()
    formData.append('file', file)
    formData.append('fileType', fileType)

    if (folder) {
      formData.append('folder', folder)
    }

    const response = await $api.upload<RawUploadedFile>(
      '/admin/uploads/files',
      formData,
    )

    const uploaded = normalizeUploadedFile(response)

    if (!uploaded.id || !uploaded.fileUrl) {
      throw createError({
        statusCode: 500,
        statusMessage: 'Upload berhasil, tetapi response file dari backend tidak lengkap.',
      })
    }

    return uploaded
  }

  async function deleteUpload(id: string) {
    return await $api.delete<null>(`/admin/uploads/${id}`)
  }

  return {
    uploadImage,
    uploadFile,
    deleteUpload,
  }
}
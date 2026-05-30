export interface UploadedFile {
  id: string
  fileName: string
  fileKey: string
  fileUrl: string
  bucketName?: string
  mimeType: string
  fileSize: number
  fileType: string
  storageProvider: string
  createdAt?: string
  updatedAt?: string
}

export interface RawUploadedFile {
  id?: string
  file_name?: string
  fileName?: string
  file_key?: string
  fileKey?: string
  file_url?: string
  fileUrl?: string
  bucket_name?: string
  bucketName?: string
  mime_type?: string
  mimeType?: string
  file_size?: number
  fileSize?: number
  file_type?: string
  fileType?: string
  storage_provider?: string
  storageProvider?: string
  created_at?: string
  createdAt?: string
  updated_at?: string
  updatedAt?: string
}

export function normalizeUploadedFile(file: RawUploadedFile): UploadedFile {
  return {
    id: file.id ?? '',
    fileName: file.fileName ?? file.file_name ?? '',
    fileKey: file.fileKey ?? file.file_key ?? '',
    fileUrl: file.fileUrl ?? file.file_url ?? '',
    bucketName: file.bucketName ?? file.bucket_name,
    mimeType: file.mimeType ?? file.mime_type ?? '',
    fileSize: file.fileSize ?? file.file_size ?? 0,
    fileType: file.fileType ?? file.file_type ?? '',
    storageProvider:
      file.storageProvider ??
      file.storage_provider ??
      'supabase_storage',
    createdAt: file.createdAt ?? file.created_at,
    updatedAt: file.updatedAt ?? file.updated_at,
  }
}
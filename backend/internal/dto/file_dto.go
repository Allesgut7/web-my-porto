package dto

type FileResponse struct {
	ID              string `json:"id"`
	FileName        string `json:"fileName"`
	FileKey         string `json:"fileKey"`
	FileURL         string `json:"fileUrl"`
	BucketName      string `json:"bucketName"`
	MimeType        string `json:"mimeType"`
	FileSize        int64  `json:"fileSize"`
	FileType        string `json:"fileType"`
	StorageProvider string `json:"storageProvider"`
}

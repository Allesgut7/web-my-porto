package models

import (
	"time"

	"github.com/google/uuid"
)

type File struct {
	ID              uuid.UUID `gorm:"type:uuid;default:gen_random_uuid();primaryKey;column:id"`
	FileName        string    `gorm:"type:varchar(255);not null;column:file_name"`
	FileKey         string    `gorm:"type:text;not null;uniqueIndex:uq_files_file_key;column:file_key"`
	FileURL         string    `gorm:"type:text;not null;column:file_url"`
	BucketName      string    `gorm:"type:varchar(255);not null;column:bucket_name"`
	MimeType        string    `gorm:"type:varchar(100);not null;column:mime_type"`
	FileSize        int64     `gorm:"type:bigint;not null;column:file_size"`
	FileType        string    `gorm:"type:varchar(100);not null;column:file_type"`
	StorageProvider string    `gorm:"type:varchar(100);not null;default:supabase_storage;column:storage_provider"`
	CreatedAt       time.Time `gorm:"type:timestamp;not null;default:now();column:created_at"`
	UpdatedAt       time.Time `gorm:"type:timestamp;not null;default:now();column:updated_at"`
}

func (File) TableName() string {
	return "files"
}

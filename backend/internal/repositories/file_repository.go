package repositories

import (
	"errors"

	"github.com/google/uuid"
	"gorm.io/gorm"

	"github.com/allesgut7/web-my-porto/backend/internal/models"
)

type FileUsageInfo struct {
	IsUsed bool
	Reason string
}

type FileRepository interface {
	Create(file *models.File) error
	FindByID(id uuid.UUID) (*models.File, error)
	DeleteByID(id uuid.UUID) error
	CheckUsage(id uuid.UUID) (*FileUsageInfo, error)
}

type fileRepository struct {
	db *gorm.DB
}

func NewFileRepository(db *gorm.DB) FileRepository {
	return &fileRepository{
		db: db,
	}
}

func (r *fileRepository) Create(file *models.File) error {
	return r.db.Create(file).Error
}

func (r *fileRepository) FindByID(id uuid.UUID) (*models.File, error) {
	var file models.File

	err := r.db.
		Where("id = ?", id).
		First(&file).
		Error

	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, nil
		}

		return nil, err
	}

	return &file, nil
}

func (r *fileRepository) DeleteByID(id uuid.UUID) error {
	return r.db.Delete(&models.File{}, "id = ?", id).Error
}

func (r *fileRepository) CheckUsage(id uuid.UUID) (*FileUsageInfo, error) {
	checks := []struct {
		table  string
		column string
		reason string
	}{
		{
			table:  "profiles",
			column: "avatar_file_id",
			reason: "File is used as profile avatar",
		},
		{
			table:  "profiles",
			column: "cv_file_id",
			reason: "File is used as profile CV",
		},
		{
			table:  "projects",
			column: "thumbnail_file_id",
			reason: "File is used as project thumbnail",
		},
		{
			table:  "project_images",
			column: "file_id",
			reason: "File is used as project image",
		},
	}

	for _, check := range checks {
		var count int64

		query := "SELECT COUNT(*) FROM " + check.table + " WHERE " + check.column + " = ?"
		if err := r.db.Raw(query, id).Scan(&count).Error; err != nil {
			return nil, err
		}

		if count > 0 {
			return &FileUsageInfo{
				IsUsed: true,
				Reason: check.reason,
			}, nil
		}
	}

	return &FileUsageInfo{
		IsUsed: false,
		Reason: "",
	}, nil
}

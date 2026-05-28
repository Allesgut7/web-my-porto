package models

import (
	"time"

	"github.com/google/uuid"
)

type ProjectImage struct {
	ID           uuid.UUID  `gorm:"type:uuid;default:gen_random_uuid();primaryKey;column:id"`
	ProjectID    uuid.UUID  `gorm:"type:uuid;not null;column:project_id"`
	FileID       *uuid.UUID `gorm:"type:uuid;column:file_id"`
	ImageType    *string    `gorm:"type:varchar(100);column:image_type"`
	Caption      *string    `gorm:"type:text;column:caption"`
	DisplayOrder int        `gorm:"type:int;not null;default:0;column:display_order"`
	CreatedAt    time.Time  `gorm:"type:timestamp;not null;default:now();column:created_at"`
	UpdatedAt    time.Time  `gorm:"type:timestamp;not null;default:now();column:updated_at"`

	Project *Project `gorm:"foreignKey:ProjectID"`
	File    *File    `gorm:"foreignKey:FileID"`
}

func (ProjectImage) TableName() string {
	return "project_images"
}

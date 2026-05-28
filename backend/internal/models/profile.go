package models

import (
	"time"

	"github.com/google/uuid"
)

type Profile struct {
	ID           uuid.UUID  `gorm:"type:uuid;default:gen_random_uuid();primaryKey;column:id"`
	FullName     string     `gorm:"type:varchar(150);not null;column:full_name"`
	Headline     *string    `gorm:"type:varchar(255);column:headline"`
	Bio          *string    `gorm:"type:text;column:bio"`
	Location     *string    `gorm:"type:varchar(150);column:location"`
	Email        *string    `gorm:"type:varchar(255);column:email"`
	Phone        *string    `gorm:"type:varchar(50);column:phone"`
	GithubURL    *string    `gorm:"type:text;column:github_url"`
	LinkedinURL  *string    `gorm:"type:text;column:linkedin_url"`
	WebsiteURL   *string    `gorm:"type:text;column:website_url"`
	AvatarFileID *uuid.UUID `gorm:"type:uuid;column:avatar_file_id"`
	CVFileID     *uuid.UUID `gorm:"type:uuid;column:cv_file_id"`
	CreatedAt    time.Time  `gorm:"type:timestamp;not null;default:now();column:created_at"`
	UpdatedAt    time.Time  `gorm:"type:timestamp;not null;default:now();column:updated_at"`

	AvatarFile *File `gorm:"foreignKey:AvatarFileID"`
	CVFile     *File `gorm:"foreignKey:CVFileID"`
}

func (Profile) TableName() string {
	return "profiles"
}

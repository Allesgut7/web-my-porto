package models

import (
	"time"

	"github.com/google/uuid"
)

type Achievement struct {
	ID                uuid.UUID  `gorm:"type:uuid;primaryKey;default:gen_random_uuid()" json:"id"`
	UserID            uuid.UUID  `gorm:"type:uuid;not null" json:"userId"`
	Title             string     `gorm:"type:varchar(255);not null" json:"title"`
	Issuer            *string    `gorm:"type:varchar(255)" json:"issuer"`
	Description       *string    `gorm:"type:text" json:"description"`
	Category          string     `gorm:"type:varchar(30);not null" json:"category"`
	Level             *string    `gorm:"type:varchar(50)" json:"level"`
	AchievedAt        *time.Time `gorm:"type:date" json:"achievedAt"`
	CredentialID      *string    `gorm:"type:varchar(255)" json:"credentialId"`
	ExternalURL       *string    `gorm:"type:text" json:"externalUrl"`
	CertificateFileID *uuid.UUID `gorm:"type:uuid" json:"certificateFileId"`
	DisplayOrder      int        `gorm:"default:0" json:"displayOrder"`
	IsVisible         bool       `gorm:"default:true" json:"isVisible"`
	CreatedAt         time.Time  `gorm:"not null;default:now()" json:"createdAt"`
	UpdatedAt         time.Time  `gorm:"not null;default:now()" json:"updatedAt"`

	User            User  `gorm:"foreignKey:UserID" json:"-"`
	CertificateFile *File `gorm:"foreignKey:CertificateFileID" json:"certificateFile,omitempty"`
}

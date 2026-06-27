package models

import (
	"time"

	"github.com/google/uuid"
)

type Skill struct {
	ID           uuid.UUID `gorm:"type:uuid;primaryKey;default:gen_random_uuid()" json:"id"`
	UserID       uuid.UUID `gorm:"type:uuid;not null" json:"userId"`
	Name         string    `gorm:"type:varchar(100);not null" json:"name"`
	Category     string    `gorm:"type:varchar(30);not null" json:"category"`
	Level        *string   `gorm:"type:varchar(20)" json:"level"`
	IconURL      *string   `gorm:"type:text" json:"iconUrl"`
	DisplayOrder int       `gorm:"default:0" json:"displayOrder"`
	IsVisible    bool      `gorm:"default:true" json:"isVisible"`
	CreatedAt    time.Time `gorm:"not null;default:now()" json:"createdAt"`
	UpdatedAt    time.Time `gorm:"not null;default:now()" json:"updatedAt"`

	User User `gorm:"foreignKey:UserID" json:"-"`
}

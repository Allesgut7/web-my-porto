package models

import (
	"time"

	"github.com/google/uuid"
	"github.com/lib/pq"
)

type Experience struct {
	ID           uuid.UUID      `gorm:"type:uuid;primaryKey;default:gen_random_uuid()" json:"id"`
	UserID       uuid.UUID      `gorm:"type:uuid;not null" json:"userId"`
	Type         string         `gorm:"type:varchar(20);not null" json:"type"`
	Title        string         `gorm:"type:varchar(255);not null" json:"title"`
	Organization string         `gorm:"type:varchar(255);not null" json:"organization"`
	Description  *string        `gorm:"type:text" json:"description"`
	StartDate    time.Time      `gorm:"type:date;not null" json:"startDate"`
	EndDate      *time.Time     `gorm:"type:date" json:"endDate"`
	IsCurrent    bool           `gorm:"default:false" json:"isCurrent"`
	IsVisible    bool           `gorm:"default:true" json:"isVisible"`
	Location     *string        `gorm:"type:varchar(255)" json:"location"`
	Tags         pq.StringArray `gorm:"type:text[];default:'{}'" json:"tags"`
	DisplayOrder int            `gorm:"default:0" json:"displayOrder"`
	CreatedAt    time.Time      `gorm:"not null;default:now()" json:"createdAt"`
	UpdatedAt    time.Time      `gorm:"not null;default:now()" json:"updatedAt"`

	User       User        `gorm:"foreignKey:UserID" json:"-"`
	TechStacks []TechStack `gorm:"many2many:experience_tech_stacks;foreignKey:ID;joinForeignKey:ExperienceID;References:ID;joinReferences:TechStackID"`
}

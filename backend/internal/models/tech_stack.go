package models

import (
	"time"

	"github.com/google/uuid"
)

type TechStack struct {
	ID           uuid.UUID `gorm:"type:uuid;default:gen_random_uuid();primaryKey;column:id"`
	Name         string    `gorm:"type:varchar(100);not null;uniqueIndex:uq_tech_stacks_name;column:name"`
	Category     *string   `gorm:"type:varchar(100);column:category"`
	IconURL      *string   `gorm:"type:text;column:icon_url"`
	DisplayOrder int       `gorm:"type:int;not null;default:0;column:display_order"`
	CreatedAt    time.Time `gorm:"type:timestamp;not null;default:now();column:created_at"`
	UpdatedAt    time.Time `gorm:"type:timestamp;not null;default:now();column:updated_at"`

	Projects []Project `gorm:"many2many:project_tech_stacks;foreignKey:ID;joinForeignKey:TechStackID;References:ID;joinReferences:ProjectID"`
}

func (TechStack) TableName() string {
	return "tech_stacks"
}

package models

import (
	"time"

	"github.com/google/uuid"
)

type Project struct {
	ID               uuid.UUID  `gorm:"type:uuid;default:gen_random_uuid();primaryKey;column:id"`
	UserID           *uuid.UUID `gorm:"type:uuid;column:user_id"`
	Title            string     `gorm:"type:varchar(255);not null;column:title"`
	Slug             string     `gorm:"type:varchar(255);not null;uniqueIndex:uq_projects_slug;column:slug"`
	ShortDescription *string    `gorm:"type:text;column:short_description"`
	Description      *string    `gorm:"type:text;column:description"`
	ProjectType      *string    `gorm:"type:varchar(100);column:project_type"`
	Status           string     `gorm:"type:varchar(50);not null;default:draft;column:status"`
	DemoURL          *string    `gorm:"type:text;column:demo_url"`
	RepositoryURL    *string    `gorm:"type:text;column:repository_url"`
	DocumentationURL *string    `gorm:"type:text;column:documentation_url"`
	ThumbnailFileID  *uuid.UUID `gorm:"type:uuid;column:thumbnail_file_id"`
	IsFeatured       bool       `gorm:"type:boolean;not null;default:false;column:is_featured"`
	DisplayOrder     int        `gorm:"type:int;not null;default:0;column:display_order"`
	StartedAt        *time.Time `gorm:"type:date;column:started_at"`
	CompletedAt      *time.Time `gorm:"type:date;column:completed_at"`
	CreatedAt        time.Time  `gorm:"type:timestamp;not null;default:now();column:created_at"`
	UpdatedAt        time.Time  `gorm:"type:timestamp;not null;default:now();column:updated_at"`

	User          *User          `gorm:"foreignKey:UserID"`
	ThumbnailFile *File          `gorm:"foreignKey:ThumbnailFileID"`
	Images        []ProjectImage `gorm:"foreignKey:ProjectID"`
	TechStacks    []TechStack    `gorm:"many2many:project_tech_stacks;foreignKey:ID;joinForeignKey:ProjectID;References:ID;joinReferences:TechStackID"`
}

func (Project) TableName() string {
	return "projects"
}

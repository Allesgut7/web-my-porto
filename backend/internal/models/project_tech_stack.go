package models

import "github.com/google/uuid"

type ProjectTechStack struct {
	ProjectID   uuid.UUID `gorm:"type:uuid;primaryKey;column:project_id"`
	TechStackID uuid.UUID `gorm:"type:uuid;primaryKey;column:tech_stack_id"`
}

func (ProjectTechStack) TableName() string {
	return "project_tech_stacks"
}

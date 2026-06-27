package models

import "github.com/google/uuid"

type ExperienceTechStack struct {
	ExperienceID uuid.UUID `gorm:"type:uuid;primaryKey;column:experience_id"`
	TechStackID  uuid.UUID `gorm:"type:uuid;primaryKey;column:tech_stack_id"`
}

func (ExperienceTechStack) TableName() string {
	return "experience_tech_stacks"
}

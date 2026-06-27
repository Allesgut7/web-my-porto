package dto

type SkillPublicResponse struct {
	ID           string  `json:"id"`
	Name         string  `json:"name"`
	Category     string  `json:"category"`
	Level        *string `json:"level"`
	IconURL      *string `json:"iconUrl"`
}

type SkillAdminListResponse struct {
	ID           string  `json:"id"`
	Name         string  `json:"name"`
	Category     string  `json:"category"`
	Level        *string `json:"level"`
	IsVisible    bool    `json:"isVisible"`
	DisplayOrder int     `json:"displayOrder"`
	CreatedAt    string  `json:"createdAt"`
	UpdatedAt    string  `json:"updatedAt"`
}

type SkillAdminDetailResponse struct {
	ID           string  `json:"id"`
	Name         string  `json:"name"`
	Category     string  `json:"category"`
	Level        *string `json:"level"`
	IconURL      *string `json:"iconUrl"`
	IsVisible    bool    `json:"isVisible"`
	DisplayOrder int     `json:"displayOrder"`
	CreatedAt    string  `json:"createdAt"`
	UpdatedAt    string  `json:"updatedAt"`
}

type CreateSkillRequest struct {
	Name         string  `json:"name" validate:"required,max=100"`
	Category     string  `json:"category" validate:"required,oneof=frontend backend devops tools soft_skills"`
	Level        *string `json:"level" validate:"omitempty,oneof=beginner intermediate advanced expert"`
	IconURL      *string `json:"iconUrl" validate:"omitempty,url"`
	IsVisible    bool    `json:"isVisible"`
	DisplayOrder int     `json:"displayOrder"`
}

type UpdateSkillRequest struct {
	Name         string  `json:"name" validate:"required,max=100"`
	Category     string  `json:"category" validate:"required,oneof=frontend backend devops tools soft_skills"`
	Level        *string `json:"level" validate:"omitempty,oneof=beginner intermediate advanced expert"`
	IconURL      *string `json:"iconUrl" validate:"omitempty,url"`
	IsVisible    bool    `json:"isVisible"`
	DisplayOrder int     `json:"displayOrder"`
}

type SkillMutationResponse struct {
	ID       string `json:"id"`
	Name     string `json:"name"`
	Category string `json:"category"`
}

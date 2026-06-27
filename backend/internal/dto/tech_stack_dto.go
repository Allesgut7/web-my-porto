package dto

type TechStackResponse struct {
	ID           string  `json:"id"`
	Name         string  `json:"name"`
	Category     *string `json:"category"`
	IconURL      *string `json:"iconUrl"`
	DisplayOrder int     `json:"displayOrder"`
}

type CreateTechStackRequest struct {
	Name         string  `json:"name" validate:"required,max=100"`
	Category     *string `json:"category" validate:"omitempty,max=100"`
	IconURL      *string `json:"iconUrl" validate:"omitempty,url"`
	DisplayOrder int     `json:"displayOrder"`
}

type UpdateTechStackRequest struct {
	Name         *string `json:"name" validate:"omitempty,max=100"`
	Category     *string `json:"category" validate:"omitempty,max=100"`
	IconURL      *string `json:"iconUrl" validate:"omitempty,url"`
	DisplayOrder *int    `json:"displayOrder"`
}

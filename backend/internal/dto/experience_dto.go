package dto

type ExperiencePublicResponse struct {
	ID           string             `json:"id"`
	Type         string             `json:"type"`
	Title        string             `json:"title"`
	Organization string             `json:"organization"`
	Description  *string            `json:"description"`
	Location     *string            `json:"location"`
	StartDate    string             `json:"startDate"`
	EndDate      *string            `json:"endDate"`
	IsCurrent    bool               `json:"isCurrent"`
	Tags         []string           `json:"tags"`
	TechStacks   []TechStackResponse `json:"techStacks"`
}

type ExperienceAdminListResponse struct {
	ID           string             `json:"id"`
	Type         string             `json:"type"`
	Title        string             `json:"title"`
	Organization string             `json:"organization"`
	IsCurrent    bool               `json:"isCurrent"`
	IsVisible    bool               `json:"isVisible"`
	StartDate    string             `json:"startDate"`
	EndDate      *string            `json:"endDate"`
	DisplayOrder int                `json:"displayOrder"`
	CreatedAt    string             `json:"createdAt"`
	UpdatedAt    string             `json:"updatedAt"`
}

type ExperienceAdminDetailResponse struct {
	ID           string             `json:"id"`
	Type         string             `json:"type"`
	Title        string             `json:"title"`
	Organization string             `json:"organization"`
	Description  *string            `json:"description"`
	StartDate    string             `json:"startDate"`
	EndDate      *string            `json:"endDate"`
	IsCurrent    bool               `json:"isCurrent"`
	IsVisible    bool               `json:"isVisible"`
	Location     *string            `json:"location"`
	Tags         []string           `json:"tags"`
	TechStacks   []TechStackResponse `json:"techStacks"`
	TechStackIDs []string           `json:"techStackIds"`
	DisplayOrder int                `json:"displayOrder"`
	CreatedAt    string             `json:"createdAt"`
	UpdatedAt    string             `json:"updatedAt"`
}

type CreateExperienceRequest struct {
	Type         string   `json:"type" validate:"required,oneof=work education internship freelance organization volunteer bootcamp competition certification"`
	Title        string   `json:"title" validate:"required,max=255"`
	Organization string   `json:"organization" validate:"required,max=255"`
	Description  *string  `json:"description" validate:"omitempty,max=50000"`
	StartDate    string   `json:"startDate" validate:"required"`
	EndDate      *string  `json:"endDate"`
	IsCurrent    bool     `json:"isCurrent"`
	IsVisible    bool     `json:"isVisible"`
	Location     *string  `json:"location" validate:"omitempty,max=255"`
	Tags         []string `json:"tags" validate:"omitempty,dive,max=100"`
	TechStackIDs []string `json:"techStackIds" validate:"omitempty,dive,uuid"`
	DisplayOrder int      `json:"displayOrder"`
}

type UpdateExperienceRequest struct {
	Type         string   `json:"type" validate:"required,oneof=work education internship freelance organization volunteer bootcamp competition certification"`
	Title        string   `json:"title" validate:"required,max=255"`
	Organization string   `json:"organization" validate:"required,max=255"`
	Description  *string  `json:"description" validate:"omitempty,max=50000"`
	StartDate    string   `json:"startDate" validate:"required"`
	EndDate      *string  `json:"endDate"`
	IsCurrent    bool     `json:"isCurrent"`
	IsVisible    bool     `json:"isVisible"`
	Location     *string  `json:"location" validate:"omitempty,max=255"`
	Tags         []string `json:"tags" validate:"omitempty,dive,max=100"`
	TechStackIDs []string `json:"techStackIds" validate:"omitempty,dive,uuid"`
	DisplayOrder int      `json:"displayOrder"`
}

type ExperienceMutationResponse struct {
	ID           string `json:"id"`
	Title        string `json:"title"`
	Organization string `json:"organization"`
	Type         string `json:"type"`
}

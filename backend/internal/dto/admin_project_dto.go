package dto

type CreateProjectRequest struct {
	Title            string   `json:"title" validate:"required,max=255"`
	Slug             string   `json:"slug" validate:"required,max=255"`
	ShortDescription *string  `json:"shortDescription" validate:"omitempty,max=1000"`
	Description      *string  `json:"description" validate:"omitempty,max=50000"`
	ProjectType      *string  `json:"projectType" validate:"omitempty,max=100"`
	Status           string   `json:"status" validate:"required,oneof=draft published archived"`
	DemoURL          *string  `json:"demoUrl" validate:"omitempty,url"`
	RepositoryURL    *string  `json:"repositoryUrl" validate:"omitempty,url"`
	DocumentationURL *string  `json:"documentationUrl" validate:"omitempty,url"`
	ThumbnailFileID  *string  `json:"thumbnailFileId" validate:"omitempty,uuid"`
	IsFeatured       bool     `json:"isFeatured"`
	DisplayOrder     int      `json:"displayOrder"`
	StartedAt        *string  `json:"startedAt"`
	CompletedAt      *string  `json:"completedAt"`
	TechStackIDs     []string `json:"techStackIds" validate:"omitempty,dive,uuid"`
}

type UpdateProjectRequest struct {
	Title            string   `json:"title" validate:"required,max=255"`
	Slug             string   `json:"slug" validate:"required,max=255"`
	ShortDescription *string  `json:"shortDescription" validate:"omitempty,max=1000"`
	Description      *string  `json:"description" validate:"omitempty,max=50000"`
	ProjectType      *string  `json:"projectType" validate:"omitempty,max=100"`
	Status           string   `json:"status" validate:"required,oneof=draft published archived"`
	DemoURL          *string  `json:"demoUrl" validate:"omitempty,url"`
	RepositoryURL    *string  `json:"repositoryUrl" validate:"omitempty,url"`
	DocumentationURL *string  `json:"documentationUrl" validate:"omitempty,url"`
	ThumbnailFileID  *string  `json:"thumbnailFileId" validate:"omitempty,uuid"`
	IsFeatured       bool     `json:"isFeatured"`
	DisplayOrder     int      `json:"displayOrder"`
	StartedAt        *string  `json:"startedAt"`
	CompletedAt      *string  `json:"completedAt"`
	TechStackIDs     []string `json:"techStackIds" validate:"omitempty,dive,uuid"`
}

type ProjectAdminListResponse struct {
	ID           string  `json:"id"`
	Title        string  `json:"title"`
	Slug         string  `json:"slug"`
	Status       string  `json:"status"`
	ProjectType  *string `json:"projectType"`
	ThumbnailURL *string `json:"thumbnailUrl"`
	IsFeatured   bool    `json:"isFeatured"`
	DisplayOrder int     `json:"displayOrder"`
	CreatedAt    string  `json:"createdAt"`
	UpdatedAt    string  `json:"updatedAt"`
}

type ProjectAdminDetailResponse struct {
	ID               string                 `json:"id"`
	Title            string                 `json:"title"`
	Slug             string                 `json:"slug"`
	ShortDescription *string                `json:"shortDescription"`
	Description      *string                `json:"description"`
	ProjectType      *string                `json:"projectType"`
	Status           string                 `json:"status"`
	DemoURL          *string                `json:"demoUrl"`
	RepositoryURL    *string                `json:"repositoryUrl"`
	DocumentationURL *string                `json:"documentationUrl"`
	ThumbnailFileID  *string                `json:"thumbnailFileId"`
	ThumbnailURL     *string                `json:"thumbnailUrl"`
	IsFeatured       bool                   `json:"isFeatured"`
	DisplayOrder     int                    `json:"displayOrder"`
	StartedAt        *string                `json:"startedAt"`
	CompletedAt      *string                `json:"completedAt"`
	TechStackIDs     []string               `json:"techStackIds"`
	Images           []ProjectImageResponse `json:"images"`
	CreatedAt        string                 `json:"createdAt"`
	UpdatedAt        string                 `json:"updatedAt"`
}

type ProjectMutationResponse struct {
	ID     string `json:"id"`
	Title  string `json:"title"`
	Slug   string `json:"slug"`
	Status string `json:"status"`
}

package dto

type ProfilePublicResponse struct {
	FullName    string  `json:"fullName"`
	Headline    *string `json:"headline"`
	Bio         *string `json:"bio"`
	Location    *string `json:"location"`
	Email       *string `json:"email"`
	GithubURL   *string `json:"githubUrl"`
	LinkedinURL *string `json:"linkedinUrl"`
	WebsiteURL  *string `json:"websiteUrl"`
	AvatarURL   *string `json:"avatarUrl"`
	CVURL       *string `json:"cvUrl"`
}

type ProjectListItemResponse struct {
	ID               string   `json:"id"`
	Title            string   `json:"title"`
	Slug             string   `json:"slug"`
	ShortDescription *string  `json:"shortDescription"`
	ProjectType      *string  `json:"projectType"`
	ThumbnailURL     *string  `json:"thumbnailUrl"`
	IsFeatured       bool     `json:"isFeatured"`
	StartedAt        *string  `json:"startedAt"`
	CompletedAt      *string  `json:"completedAt"`
	TechStacks       []string `json:"techStacks"`
}

type ProjectDetailResponse struct {
	ID               string                 `json:"id"`
	Title            string                 `json:"title"`
	Slug             string                 `json:"slug"`
	ShortDescription *string                `json:"shortDescription"`
	Description      *string                `json:"description"`
	ProjectType      *string                `json:"projectType"`
	DemoURL          *string                `json:"demoUrl"`
	RepositoryURL    *string                `json:"repositoryUrl"`
	DocumentationURL *string                `json:"documentationUrl"`
	ThumbnailURL     *string                `json:"thumbnailUrl"`
	IsFeatured       bool                   `json:"isFeatured"`
	StartedAt        *string                `json:"startedAt"`
	CompletedAt      *string                `json:"completedAt"`
	TechStacks       []string               `json:"techStacks"`
	Images           []ProjectImageResponse `json:"images"`
}

type ProjectImageResponse struct {
	ID           string  `json:"id"`
	ImageURL     *string `json:"imageUrl"`
	ImageType    *string `json:"imageType"`
	Caption      *string `json:"caption"`
	DisplayOrder int     `json:"displayOrder"`
}

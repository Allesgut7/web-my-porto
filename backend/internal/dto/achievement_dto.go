package dto

type AchievementPublicResponse struct {
	ID               string  `json:"id"`
	Title            string  `json:"title"`
	Issuer           *string `json:"issuer"`
	Description      *string `json:"description"`
	Category         string  `json:"category"`
	Level            *string `json:"level"`
	AchievedAt       *string `json:"achievedAt"`
	CredentialID     *string `json:"credentialId"`
	ExternalURL      *string `json:"externalUrl"`
	CertificateURL   *string `json:"certificateUrl"`
}

type AchievementAdminListResponse struct {
	ID               string  `json:"id"`
	Title            string  `json:"title"`
	Issuer           *string `json:"issuer"`
	Category         string  `json:"category"`
	Level            *string `json:"level"`
	AchievedAt       *string `json:"achievedAt"`
	IsVisible        bool    `json:"isVisible"`
	DisplayOrder     int     `json:"displayOrder"`
	CreatedAt        string  `json:"createdAt"`
	UpdatedAt        string  `json:"updatedAt"`
}

type AchievementAdminDetailResponse struct {
	ID                string  `json:"id"`
	Title             string  `json:"title"`
	Issuer            *string `json:"issuer"`
	Description       *string `json:"description"`
	Category          string  `json:"category"`
	Level             *string `json:"level"`
	AchievedAt        *string `json:"achievedAt"`
	CredentialID      *string `json:"credentialId"`
	ExternalURL       *string `json:"externalUrl"`
	CertificateFileID *string `json:"certificateFileId"`
	CertificateURL    *string `json:"certificateUrl"`
	IsVisible         bool    `json:"isVisible"`
	DisplayOrder      int     `json:"displayOrder"`
	CreatedAt         string  `json:"createdAt"`
	UpdatedAt         string  `json:"updatedAt"`
}

type CreateAchievementRequest struct {
	Title             string  `json:"title" validate:"required,max=255"`
	Issuer            *string `json:"issuer" validate:"omitempty,max=255"`
	Description       *string `json:"description" validate:"omitempty,max=50000"`
	Category          string  `json:"category" validate:"required,oneof=certification competition award publication contribution"`
	Level             *string `json:"level" validate:"omitempty,oneof=campus regional national international"`
	AchievedAt        *string `json:"achievedAt"`
	CredentialID      *string `json:"credentialId" validate:"omitempty,max=255"`
	ExternalURL       *string `json:"externalUrl" validate:"omitempty,url"`
	CertificateFileID *string `json:"certificateFileId" validate:"omitempty,uuid"`
	IsVisible         bool    `json:"isVisible"`
	DisplayOrder      int     `json:"displayOrder"`
}

type UpdateAchievementRequest struct {
	Title             string  `json:"title" validate:"required,max=255"`
	Issuer            *string `json:"issuer" validate:"omitempty,max=255"`
	Description       *string `json:"description" validate:"omitempty,max=50000"`
	Category          string  `json:"category" validate:"required,oneof=certification competition award publication contribution"`
	Level             *string `json:"level" validate:"omitempty,oneof=campus regional national international"`
	AchievedAt        *string `json:"achievedAt"`
	CredentialID      *string `json:"credentialId" validate:"omitempty,max=255"`
	ExternalURL       *string `json:"externalUrl" validate:"omitempty,url"`
	CertificateFileID *string `json:"certificateFileId" validate:"omitempty,uuid"`
	IsVisible         bool    `json:"isVisible"`
	DisplayOrder      int     `json:"displayOrder"`
}

type AchievementMutationResponse struct {
	ID       string `json:"id"`
	Title    string `json:"title"`
	Category string `json:"category"`
}

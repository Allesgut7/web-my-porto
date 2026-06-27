package dto

import "time"

type ProfileAdminResponse struct {
	ID           string     `json:"id"`
	FullName     string     `json:"fullName"`
	Headline     *string    `json:"headline"`
	Bio          *string    `json:"bio"`
	Location     *string    `json:"location"`
	Email        *string    `json:"email"`
	Phone        *string    `json:"phone"`
	GithubURL    *string    `json:"githubUrl"`
	LinkedinURL  *string    `json:"linkedinUrl"`
	WebsiteURL   *string    `json:"websiteUrl"`
	AvatarFileID *string    `json:"avatarFileId"`
	AvatarURL    *string    `json:"avatarUrl"`
	CVFileID     *string    `json:"cvFileId"`
	CVURL        *string    `json:"cvUrl"`
	CreatedAt    time.Time  `json:"createdAt"`
	UpdatedAt    time.Time  `json:"updatedAt"`
}

type UpdateProfileRequest struct {
	FullName     string  `json:"fullName" validate:"required,max=150"`
	Headline     *string `json:"headline" validate:"omitempty,max=255"`
	Bio          *string `json:"bio"`
	Location     *string `json:"location" validate:"omitempty,max=150"`
	Email        *string `json:"email" validate:"omitempty,email"`
	Phone        *string `json:"phone" validate:"omitempty,max=50"`
	GithubURL    *string `json:"githubUrl" validate:"omitempty,url"`
	LinkedinURL  *string `json:"linkedinUrl" validate:"omitempty,url"`
	WebsiteURL   *string `json:"websiteUrl" validate:"omitempty,url"`
	AvatarFileID *string `json:"avatarFileId" validate:"omitempty,uuid"`
	CVFileID     *string `json:"cvFileId" validate:"omitempty,uuid"`
}

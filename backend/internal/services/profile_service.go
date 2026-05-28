package services

import (
	"net/http"

	"github.com/allesgut7/web-my-porto/backend/internal/dto"
	"github.com/allesgut7/web-my-porto/backend/internal/models"
	"github.com/allesgut7/web-my-porto/backend/internal/repositories"
	"github.com/allesgut7/web-my-porto/backend/internal/utils"
)

type ProfileService interface {
	GetPublicProfile() (*dto.ProfilePublicResponse, error)
}

type profileService struct {
	profileRepo repositories.ProfileRepository
}

func NewProfileService(profileRepo repositories.ProfileRepository) ProfileService {
	return &profileService{
		profileRepo: profileRepo,
	}
}

func (s *profileService) GetPublicProfile() (*dto.ProfilePublicResponse, error) {
	profile, err := s.profileRepo.FindPublicProfile()
	if err != nil {
		return nil, err
	}

	if profile == nil {
		return nil, utils.NewAppError(http.StatusNotFound, "Profile not found", nil)
	}

	response := mapProfileToPublicResponse(profile)

	return &response, nil
}

func mapProfileToPublicResponse(profile *models.Profile) dto.ProfilePublicResponse {
	var avatarURL *string
	var cvURL *string

	if profile.AvatarFile != nil {
		avatarURL = &profile.AvatarFile.FileURL
	}

	if profile.CVFile != nil {
		cvURL = &profile.CVFile.FileURL
	}

	return dto.ProfilePublicResponse{
		FullName:    profile.FullName,
		Headline:    profile.Headline,
		Bio:         profile.Bio,
		Location:    profile.Location,
		Email:       profile.Email,
		GithubURL:   profile.GithubURL,
		LinkedinURL: profile.LinkedinURL,
		WebsiteURL:  profile.WebsiteURL,
		AvatarURL:   avatarURL,
		CVURL:       cvURL,
	}
}

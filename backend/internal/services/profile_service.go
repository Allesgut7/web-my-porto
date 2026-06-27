package services

import (
	"net/http"
	"time"

	"github.com/allesgut7/web-my-porto/backend/internal/dto"
	"github.com/allesgut7/web-my-porto/backend/internal/models"
	"github.com/allesgut7/web-my-porto/backend/internal/repositories"
	"github.com/allesgut7/web-my-porto/backend/internal/utils"
	"github.com/google/uuid"
)

type ProfileService interface {
	GetPublicProfile() (*dto.ProfilePublicResponse, error)
	GetAdminProfile() (*dto.ProfileAdminResponse, error)
	UpdateProfile(req dto.UpdateProfileRequest) (*dto.ProfileAdminResponse, error)
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

func (s *profileService) GetAdminProfile() (*dto.ProfileAdminResponse, error) {
	profile, err := s.profileRepo.FindAdminProfile()
	if err != nil {
		return nil, err
	}

	if profile == nil {
		return nil, utils.NewAppError(http.StatusNotFound, "Profile not found", nil)
	}

	response := mapProfileToAdminResponse(profile)

	return &response, nil
}

func (s *profileService) UpdateProfile(req dto.UpdateProfileRequest) (*dto.ProfileAdminResponse, error) {
	profile, err := s.profileRepo.FindAdminProfile()
	if err != nil {
		return nil, err
	}

	if profile == nil {
		return nil, utils.NewAppError(http.StatusNotFound, "Profile not found", nil)
	}

	avatarFileID, err := parseOptionalUUIDPtr(req.AvatarFileID)
	if err != nil {
		return nil, utils.NewValidationError(map[string]string{
			"avatarFileId": "avatarFileId must be a valid UUID",
		})
	}

	cvFileID, err := parseOptionalUUIDPtr(req.CVFileID)
	if err != nil {
		return nil, utils.NewValidationError(map[string]string{
			"cvFileId": "cvFileId must be a valid UUID",
		})
	}

	profile.FullName = req.FullName
	profile.Headline = req.Headline
	profile.Bio = req.Bio
	profile.Location = req.Location
	profile.Email = req.Email
	profile.Phone = req.Phone
	profile.GithubURL = req.GithubURL
	profile.LinkedinURL = req.LinkedinURL
	profile.WebsiteURL = req.WebsiteURL
	profile.AvatarFileID = avatarFileID
	profile.CVFileID = cvFileID
	profile.UpdatedAt = time.Now()

	if err := s.profileRepo.UpdateProfile(profile); err != nil {
		return nil, err
	}

	updatedProfile, err := s.profileRepo.FindAdminProfile()
	if err != nil {
		return nil, err
	}

	response := mapProfileToAdminResponse(updatedProfile)

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

func mapProfileToAdminResponse(profile *models.Profile) dto.ProfileAdminResponse {
	var avatarFileID *string
	var avatarURL *string
	var cvFileID *string
	var cvURL *string

	if profile.AvatarFileID != nil {
		value := profile.AvatarFileID.String()
		avatarFileID = &value
	}

	if profile.AvatarFile != nil {
		avatarURL = &profile.AvatarFile.FileURL
	}

	if profile.CVFileID != nil {
		value := profile.CVFileID.String()
		cvFileID = &value
	}

	if profile.CVFile != nil {
		cvURL = &profile.CVFile.FileURL
	}

	return dto.ProfileAdminResponse{
		ID:           profile.ID.String(),
		FullName:     profile.FullName,
		Headline:     profile.Headline,
		Bio:          profile.Bio,
		Location:     profile.Location,
		Email:        profile.Email,
		Phone:        profile.Phone,
		GithubURL:    profile.GithubURL,
		LinkedinURL:  profile.LinkedinURL,
		WebsiteURL:   profile.WebsiteURL,
		AvatarFileID: avatarFileID,
		AvatarURL:    avatarURL,
		CVFileID:     cvFileID,
		CVURL:        cvURL,
		CreatedAt:    profile.CreatedAt,
		UpdatedAt:    profile.UpdatedAt,
	}
}

func parseOptionalUUIDPtr(value *string) (*uuid.UUID, error) {
	if value == nil || *value == "" {
		return nil, nil
	}

	parsed, err := uuid.Parse(*value)
	if err != nil {
		return nil, err
	}

	return &parsed, nil
}

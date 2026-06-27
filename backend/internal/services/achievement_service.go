package services

import (
	"time"

	"github.com/google/uuid"

	"github.com/allesgut7/web-my-porto/backend/internal/dto"
	"github.com/allesgut7/web-my-porto/backend/internal/models"
	"github.com/allesgut7/web-my-porto/backend/internal/repositories"
	"github.com/allesgut7/web-my-porto/backend/internal/utils"
)

type AchievementService interface {
	GetPublicAchievements() ([]dto.AchievementPublicResponse, error)
	GetAdminAchievements() ([]dto.AchievementAdminListResponse, error)
	GetAdminAchievementByID(id string) (*dto.AchievementAdminDetailResponse, error)
	CreateAdminAchievement(userID string, payload dto.CreateAchievementRequest) (*dto.AchievementMutationResponse, error)
	UpdateAdminAchievement(id string, payload dto.UpdateAchievementRequest) (*dto.AchievementMutationResponse, error)
	DeleteAdminAchievement(id string) error
}

type achievementService struct {
	achievementRepo repositories.AchievementRepository
}

func NewAchievementService(achievementRepo repositories.AchievementRepository) AchievementService {
	return &achievementService{
		achievementRepo: achievementRepo,
	}
}

func (s *achievementService) GetPublicAchievements() ([]dto.AchievementPublicResponse, error) {
	achievements, err := s.achievementRepo.FindAllVisible()
	if err != nil {
		return nil, err
	}

	items := make([]dto.AchievementPublicResponse, 0, len(achievements))
	for _, a := range achievements {
		items = append(items, mapAchievementToPublicResponse(&a))
	}

	return items, nil
}

func (s *achievementService) GetAdminAchievements() ([]dto.AchievementAdminListResponse, error) {
	achievements, err := s.achievementRepo.FindAll()
	if err != nil {
		return nil, err
	}

	items := make([]dto.AchievementAdminListResponse, 0, len(achievements))
	for _, a := range achievements {
		items = append(items, mapAchievementToAdminListResponse(&a))
	}

	return items, nil
}

func (s *achievementService) GetAdminAchievementByID(id string) (*dto.AchievementAdminDetailResponse, error) {
	achID, err := uuid.Parse(id)
	if err != nil {
		return nil, utils.NewNotFoundError("Achievement not found")
	}

	achievement, err := s.achievementRepo.FindByID(achID)
	if err != nil {
		return nil, err
	}

	if achievement == nil {
		return nil, utils.NewNotFoundError("Achievement not found")
	}

	response := mapAchievementToAdminDetailResponse(achievement)
	return &response, nil
}

func (s *achievementService) CreateAdminAchievement(userID string, payload dto.CreateAchievementRequest) (*dto.AchievementMutationResponse, error) {
	creatorID, err := uuid.Parse(userID)
	if err != nil {
		return nil, utils.NewUnauthorizedError("Unauthorized")
	}

	var achievedAt *time.Time
	if payload.AchievedAt != nil && *payload.AchievedAt != "" {
		parsed, err := time.Parse("2006-01-02", *payload.AchievedAt)
		if err != nil {
			return nil, utils.NewValidationError(map[string]string{
				"achievedAt": "achievedAt must use YYYY-MM-DD format",
			})
		}
		achievedAt = &parsed
	}

	var certificateFileID *uuid.UUID
	if payload.CertificateFileID != nil && *payload.CertificateFileID != "" {
		parsed, err := uuid.Parse(*payload.CertificateFileID)
		if err != nil {
			return nil, utils.NewValidationError(map[string]string{
				"certificateFileId": "certificateFileId must be a valid UUID",
			})
		}
		certificateFileID = &parsed
	}

	achievement := &models.Achievement{
		UserID:            creatorID,
		Title:             payload.Title,
		Issuer:            payload.Issuer,
		Description:       payload.Description,
		Category:          payload.Category,
		Level:             payload.Level,
		AchievedAt:        achievedAt,
		CredentialID:      payload.CredentialID,
		ExternalURL:       payload.ExternalURL,
		CertificateFileID: certificateFileID,
		IsVisible:         payload.IsVisible,
		DisplayOrder:      payload.DisplayOrder,
	}

	if err := s.achievementRepo.Create(achievement); err != nil {
		return nil, err
	}

	return &dto.AchievementMutationResponse{
		ID:       achievement.ID.String(),
		Title:    achievement.Title,
		Category: achievement.Category,
	}, nil
}

func (s *achievementService) UpdateAdminAchievement(id string, payload dto.UpdateAchievementRequest) (*dto.AchievementMutationResponse, error) {
	achID, err := uuid.Parse(id)
	if err != nil {
		return nil, utils.NewNotFoundError("Achievement not found")
	}

	existing, err := s.achievementRepo.FindByID(achID)
	if err != nil {
		return nil, err
	}

	if existing == nil {
		return nil, utils.NewNotFoundError("Achievement not found")
	}

	var achievedAt *time.Time
	if payload.AchievedAt != nil && *payload.AchievedAt != "" {
		parsed, err := time.Parse("2006-01-02", *payload.AchievedAt)
		if err != nil {
			return nil, utils.NewValidationError(map[string]string{
				"achievedAt": "achievedAt must use YYYY-MM-DD format",
			})
		}
		achievedAt = &parsed
	}

	var certificateFileID *uuid.UUID
	if payload.CertificateFileID != nil && *payload.CertificateFileID != "" {
		parsed, err := uuid.Parse(*payload.CertificateFileID)
		if err != nil {
			return nil, utils.NewValidationError(map[string]string{
				"certificateFileId": "certificateFileId must be a valid UUID",
			})
		}
		certificateFileID = &parsed
	}

	existing.Title = payload.Title
	existing.Issuer = payload.Issuer
	existing.Description = payload.Description
	existing.Category = payload.Category
	existing.Level = payload.Level
	existing.AchievedAt = achievedAt
	existing.CredentialID = payload.CredentialID
	existing.ExternalURL = payload.ExternalURL
	existing.CertificateFileID = certificateFileID
	existing.IsVisible = payload.IsVisible
	existing.DisplayOrder = payload.DisplayOrder
	existing.UpdatedAt = time.Now()

	if err := s.achievementRepo.Update(existing); err != nil {
		return nil, err
	}

	return &dto.AchievementMutationResponse{
		ID:       existing.ID.String(),
		Title:    existing.Title,
		Category: existing.Category,
	}, nil
}

func (s *achievementService) DeleteAdminAchievement(id string) error {
	achID, err := uuid.Parse(id)
	if err != nil {
		return utils.NewNotFoundError("Achievement not found")
	}

	existing, err := s.achievementRepo.FindByID(achID)
	if err != nil {
		return err
	}

	if existing == nil {
		return utils.NewNotFoundError("Achievement not found")
	}

	return s.achievementRepo.DeleteByID(achID)
}

func mapAchievementToPublicResponse(a *models.Achievement) dto.AchievementPublicResponse {
	var certificateURL *string
	if a.CertificateFile != nil {
		certificateURL = &a.CertificateFile.FileURL
	}

	return dto.AchievementPublicResponse{
		ID:             a.ID.String(),
		Title:          a.Title,
		Issuer:         a.Issuer,
		Description:    a.Description,
		Category:       a.Category,
		Level:          a.Level,
		AchievedAt:     formatOptionalTime(a.AchievedAt),
		CredentialID:   a.CredentialID,
		ExternalURL:    a.ExternalURL,
		CertificateURL: certificateURL,
	}
}

func mapAchievementToAdminListResponse(a *models.Achievement) dto.AchievementAdminListResponse {
	return dto.AchievementAdminListResponse{
		ID:           a.ID.String(),
		Title:        a.Title,
		Issuer:       a.Issuer,
		Category:     a.Category,
		Level:        a.Level,
		AchievedAt:   formatOptionalTime(a.AchievedAt),
		IsVisible:    a.IsVisible,
		DisplayOrder: a.DisplayOrder,
		CreatedAt:    a.CreatedAt.Format(time.RFC3339),
		UpdatedAt:    a.UpdatedAt.Format(time.RFC3339),
	}
}

func mapAchievementToAdminDetailResponse(a *models.Achievement) dto.AchievementAdminDetailResponse {
	var certificateFileID *string
	if a.CertificateFileID != nil {
		s := a.CertificateFileID.String()
		certificateFileID = &s
	}

	var certificateURL *string
	if a.CertificateFile != nil {
		certificateURL = &a.CertificateFile.FileURL
	}

	return dto.AchievementAdminDetailResponse{
		ID:                a.ID.String(),
		Title:             a.Title,
		Issuer:            a.Issuer,
		Description:       a.Description,
		Category:          a.Category,
		Level:             a.Level,
		AchievedAt:        formatOptionalTime(a.AchievedAt),
		CredentialID:      a.CredentialID,
		ExternalURL:       a.ExternalURL,
		CertificateFileID: certificateFileID,
		CertificateURL:    certificateURL,
		IsVisible:         a.IsVisible,
		DisplayOrder:      a.DisplayOrder,
		CreatedAt:         a.CreatedAt.Format(time.RFC3339),
		UpdatedAt:         a.UpdatedAt.Format(time.RFC3339),
	}
}

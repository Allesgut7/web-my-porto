package services

import (
	"time"

	"github.com/google/uuid"
	"github.com/lib/pq"

	"github.com/allesgut7/web-my-porto/backend/internal/dto"
	"github.com/allesgut7/web-my-porto/backend/internal/models"
	"github.com/allesgut7/web-my-porto/backend/internal/repositories"
	"github.com/allesgut7/web-my-porto/backend/internal/utils"
)

type ExperienceService interface {
	GetPublicExperiences() ([]dto.ExperiencePublicResponse, error)
	GetAdminExperiences() ([]dto.ExperienceAdminListResponse, error)
	GetAdminExperienceByID(id string) (*dto.ExperienceAdminDetailResponse, error)
	CreateAdminExperience(userID string, payload dto.CreateExperienceRequest) (*dto.ExperienceMutationResponse, error)
	UpdateAdminExperience(id string, payload dto.UpdateExperienceRequest) (*dto.ExperienceMutationResponse, error)
	DeleteAdminExperience(id string) error
}

type experienceService struct {
	experienceRepo repositories.ExperienceRepository
}

func NewExperienceService(experienceRepo repositories.ExperienceRepository) ExperienceService {
	return &experienceService{
		experienceRepo: experienceRepo,
	}
}

func (s *experienceService) GetPublicExperiences() ([]dto.ExperiencePublicResponse, error) {
	experiences, err := s.experienceRepo.FindAllPublic()
	if err != nil {
		return nil, err
	}

	items := make([]dto.ExperiencePublicResponse, 0, len(experiences))
	for _, exp := range experiences {
		items = append(items, mapExperienceToPublicResponse(&exp))
	}

	return items, nil
}

func (s *experienceService) GetAdminExperiences() ([]dto.ExperienceAdminListResponse, error) {
	experiences, err := s.experienceRepo.FindAll()
	if err != nil {
		return nil, err
	}

	items := make([]dto.ExperienceAdminListResponse, 0, len(experiences))
	for _, exp := range experiences {
		items = append(items, mapExperienceToAdminListResponse(&exp))
	}

	return items, nil
}

func (s *experienceService) GetAdminExperienceByID(id string) (*dto.ExperienceAdminDetailResponse, error) {
	expID, err := uuid.Parse(id)
	if err != nil {
		return nil, utils.NewNotFoundError("Experience not found")
	}

	experience, err := s.experienceRepo.FindByID(expID)
	if err != nil {
		return nil, err
	}

	if experience == nil {
		return nil, utils.NewNotFoundError("Experience not found")
	}

	response := mapExperienceToAdminDetailResponse(experience)
	return &response, nil
}

func (s *experienceService) CreateAdminExperience(userID string, payload dto.CreateExperienceRequest) (*dto.ExperienceMutationResponse, error) {
	creatorID, err := uuid.Parse(userID)
	if err != nil {
		return nil, utils.NewUnauthorizedError("Unauthorized")
	}

	startDate, err := time.Parse("2006-01-02", payload.StartDate)
	if err != nil {
		return nil, utils.NewValidationError(map[string]string{
			"startDate": "startDate must use YYYY-MM-DD format",
		})
	}

	var endDate *time.Time
	if payload.EndDate != nil && *payload.EndDate != "" {
		parsed, err := time.Parse("2006-01-02", *payload.EndDate)
		if err != nil {
			return nil, utils.NewValidationError(map[string]string{
				"endDate": "endDate must use YYYY-MM-DD format",
			})
		}
		endDate = &parsed
	}

	techStackIDs, err := parseExperienceTechStackIDs(payload.TechStackIDs)
	if err != nil {
		return nil, err
	}

	experience := &models.Experience{
		UserID:       creatorID,
		Type:         payload.Type,
		Title:        payload.Title,
		Organization: payload.Organization,
		Description:  payload.Description,
		StartDate:    startDate,
		EndDate:      endDate,
		IsCurrent:    payload.IsCurrent,
		IsVisible:    payload.IsVisible,
		Location:     payload.Location,
		Tags:         pq.StringArray(payload.Tags),
		DisplayOrder: payload.DisplayOrder,
	}

	if err := s.experienceRepo.Create(experience, techStackIDs); err != nil {
		return nil, err
	}

	return &dto.ExperienceMutationResponse{
		ID:           experience.ID.String(),
		Title:        experience.Title,
		Organization: experience.Organization,
		Type:         experience.Type,
	}, nil
}

func (s *experienceService) UpdateAdminExperience(id string, payload dto.UpdateExperienceRequest) (*dto.ExperienceMutationResponse, error) {
	expID, err := uuid.Parse(id)
	if err != nil {
		return nil, utils.NewNotFoundError("Experience not found")
	}

	existing, err := s.experienceRepo.FindByID(expID)
	if err != nil {
		return nil, err
	}

	if existing == nil {
		return nil, utils.NewNotFoundError("Experience not found")
	}

	startDate, err := time.Parse("2006-01-02", payload.StartDate)
	if err != nil {
		return nil, utils.NewValidationError(map[string]string{
			"startDate": "startDate must use YYYY-MM-DD format",
		})
	}

	var endDate *time.Time
	if payload.EndDate != nil && *payload.EndDate != "" {
		parsed, err := time.Parse("2006-01-02", *payload.EndDate)
		if err != nil {
			return nil, utils.NewValidationError(map[string]string{
				"endDate": "endDate must use YYYY-MM-DD format",
			})
		}
		endDate = &parsed
	}

	techStackIDs, err := parseExperienceTechStackIDs(payload.TechStackIDs)
	if err != nil {
		return nil, err
	}

	existing.Type = payload.Type
	existing.Title = payload.Title
	existing.Organization = payload.Organization
	existing.Description = payload.Description
	existing.StartDate = startDate
	existing.EndDate = endDate
	existing.IsCurrent = payload.IsCurrent
	existing.IsVisible = payload.IsVisible
	existing.Location = payload.Location
	existing.Tags = pq.StringArray(payload.Tags)
	existing.DisplayOrder = payload.DisplayOrder
	existing.UpdatedAt = time.Now()

	if err := s.experienceRepo.Update(existing, techStackIDs); err != nil {
		return nil, err
	}

	return &dto.ExperienceMutationResponse{
		ID:           existing.ID.String(),
		Title:        existing.Title,
		Organization: existing.Organization,
		Type:         existing.Type,
	}, nil
}

func (s *experienceService) DeleteAdminExperience(id string) error {
	expID, err := uuid.Parse(id)
	if err != nil {
		return utils.NewNotFoundError("Experience not found")
	}

	existing, err := s.experienceRepo.FindByID(expID)
	if err != nil {
		return err
	}

	if existing == nil {
		return utils.NewNotFoundError("Experience not found")
	}

	return s.experienceRepo.DeleteByID(expID)
}

func mapExperienceToPublicResponse(exp *models.Experience) dto.ExperiencePublicResponse {
	return dto.ExperiencePublicResponse{
		ID:           exp.ID.String(),
		Type:         exp.Type,
		Title:        exp.Title,
		Organization: exp.Organization,
		Description:  exp.Description,
		StartDate:    exp.StartDate.Format("2006-01-02"),
		EndDate:      formatOptionalTime(exp.EndDate),
		IsCurrent:    exp.IsCurrent,
		Tags:         []string(exp.Tags),
		TechStacks:   mapTechStacksToResponse(exp.TechStacks),
	}
}

func mapExperienceToAdminListResponse(exp *models.Experience) dto.ExperienceAdminListResponse {
	return dto.ExperienceAdminListResponse{
		ID:           exp.ID.String(),
		Type:         exp.Type,
		Title:        exp.Title,
		Organization: exp.Organization,
		IsCurrent:    exp.IsCurrent,
		IsVisible:    exp.IsVisible,
		StartDate:    exp.StartDate.Format("2006-01-02"),
		EndDate:      formatOptionalTime(exp.EndDate),
		DisplayOrder: exp.DisplayOrder,
		CreatedAt:    exp.CreatedAt.Format(time.RFC3339),
		UpdatedAt:    exp.UpdatedAt.Format(time.RFC3339),
	}
}

func mapExperienceToAdminDetailResponse(exp *models.Experience) dto.ExperienceAdminDetailResponse {
	return dto.ExperienceAdminDetailResponse{
		ID:           exp.ID.String(),
		Type:         exp.Type,
		Title:        exp.Title,
		Organization: exp.Organization,
		Description:  exp.Description,
		StartDate:    exp.StartDate.Format("2006-01-02"),
		EndDate:      formatOptionalTime(exp.EndDate),
		IsCurrent:    exp.IsCurrent,
		IsVisible:    exp.IsVisible,
		Location:     exp.Location,
		Tags:         []string(exp.Tags),
		TechStacks:   mapTechStacksToResponse(exp.TechStacks),
		TechStackIDs: mapExperienceTechStackIDs(exp.TechStacks),
		DisplayOrder: exp.DisplayOrder,
		CreatedAt:    exp.CreatedAt.Format(time.RFC3339),
		UpdatedAt:    exp.UpdatedAt.Format(time.RFC3339),
	}
}

func mapTechStacksToResponse(techStacks []models.TechStack) []dto.TechStackResponse {
	items := make([]dto.TechStackResponse, 0, len(techStacks))
	for _, ts := range techStacks {
		items = append(items, dto.TechStackResponse{
			ID:           ts.ID.String(),
			Name:         ts.Name,
			Category:     ts.Category,
			IconURL:      ts.IconURL,
			DisplayOrder: ts.DisplayOrder,
		})
	}
	return items
}

func mapExperienceTechStackIDs(techStacks []models.TechStack) []string {
	items := make([]string, 0, len(techStacks))
	for _, ts := range techStacks {
		items = append(items, ts.ID.String())
	}
	return items
}

func formatOptionalTime(t *time.Time) *string {
	if t == nil {
		return nil
	}
	s := t.Format("2006-01-02")
	return &s
}

func parseExperienceTechStackIDs(values []string) ([]uuid.UUID, error) {
	ids := make([]uuid.UUID, 0, len(values))
	seen := make(map[string]bool)

	for _, value := range values {
		parsed, err := uuid.Parse(value)
		if err != nil {
			return nil, utils.NewValidationError(map[string]string{
				"techStackIds": "techStackIds must contain valid UUID values",
			})
		}

		if seen[parsed.String()] {
			continue
		}

		seen[parsed.String()] = true
		ids = append(ids, parsed)
	}

	return ids, nil
}

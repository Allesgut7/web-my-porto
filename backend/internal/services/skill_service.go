package services

import (
	"time"

	"github.com/google/uuid"

	"github.com/allesgut7/web-my-porto/backend/internal/dto"
	"github.com/allesgut7/web-my-porto/backend/internal/models"
	"github.com/allesgut7/web-my-porto/backend/internal/repositories"
	"github.com/allesgut7/web-my-porto/backend/internal/utils"
)

type SkillService interface {
	GetPublicSkills() ([]dto.SkillPublicResponse, error)
	GetAdminSkills() ([]dto.SkillAdminListResponse, error)
	GetAdminSkillByID(id string) (*dto.SkillAdminDetailResponse, error)
	CreateAdminSkill(userID string, payload dto.CreateSkillRequest) (*dto.SkillMutationResponse, error)
	UpdateAdminSkill(id string, payload dto.UpdateSkillRequest) (*dto.SkillMutationResponse, error)
	DeleteAdminSkill(id string) error
}

type skillService struct {
	skillRepo repositories.SkillRepository
}

func NewSkillService(skillRepo repositories.SkillRepository) SkillService {
	return &skillService{
		skillRepo: skillRepo,
	}
}

func (s *skillService) GetPublicSkills() ([]dto.SkillPublicResponse, error) {
	skills, err := s.skillRepo.FindAllVisible()
	if err != nil {
		return nil, err
	}

	items := make([]dto.SkillPublicResponse, 0, len(skills))
	for _, sk := range skills {
		items = append(items, mapSkillToPublicResponse(&sk))
	}

	return items, nil
}

func (s *skillService) GetAdminSkills() ([]dto.SkillAdminListResponse, error) {
	skills, err := s.skillRepo.FindAll()
	if err != nil {
		return nil, err
	}

	items := make([]dto.SkillAdminListResponse, 0, len(skills))
	for _, sk := range skills {
		items = append(items, mapSkillToAdminListResponse(&sk))
	}

	return items, nil
}

func (s *skillService) GetAdminSkillByID(id string) (*dto.SkillAdminDetailResponse, error) {
	skillID, err := uuid.Parse(id)
	if err != nil {
		return nil, utils.NewNotFoundError("Skill not found")
	}

	skill, err := s.skillRepo.FindByID(skillID)
	if err != nil {
		return nil, err
	}

	if skill == nil {
		return nil, utils.NewNotFoundError("Skill not found")
	}

	response := mapSkillToAdminDetailResponse(skill)
	return &response, nil
}

func (s *skillService) CreateAdminSkill(userID string, payload dto.CreateSkillRequest) (*dto.SkillMutationResponse, error) {
	creatorID, err := uuid.Parse(userID)
	if err != nil {
		return nil, utils.NewUnauthorizedError("Unauthorized")
	}

	skill := &models.Skill{
		UserID:       creatorID,
		Name:         payload.Name,
		Category:     payload.Category,
		Level:        payload.Level,
		IconURL:      payload.IconURL,
		IsVisible:    payload.IsVisible,
		DisplayOrder: payload.DisplayOrder,
	}

	if err := s.skillRepo.Create(skill); err != nil {
		return nil, err
	}

	return &dto.SkillMutationResponse{
		ID:       skill.ID.String(),
		Name:     skill.Name,
		Category: skill.Category,
	}, nil
}

func (s *skillService) UpdateAdminSkill(id string, payload dto.UpdateSkillRequest) (*dto.SkillMutationResponse, error) {
	skillID, err := uuid.Parse(id)
	if err != nil {
		return nil, utils.NewNotFoundError("Skill not found")
	}

	existing, err := s.skillRepo.FindByID(skillID)
	if err != nil {
		return nil, err
	}

	if existing == nil {
		return nil, utils.NewNotFoundError("Skill not found")
	}

	existing.Name = payload.Name
	existing.Category = payload.Category
	existing.Level = payload.Level
	existing.IconURL = payload.IconURL
	existing.IsVisible = payload.IsVisible
	existing.DisplayOrder = payload.DisplayOrder
	existing.UpdatedAt = time.Now()

	if err := s.skillRepo.Update(existing); err != nil {
		return nil, err
	}

	return &dto.SkillMutationResponse{
		ID:       existing.ID.String(),
		Name:     existing.Name,
		Category: existing.Category,
	}, nil
}

func (s *skillService) DeleteAdminSkill(id string) error {
	skillID, err := uuid.Parse(id)
	if err != nil {
		return utils.NewNotFoundError("Skill not found")
	}

	existing, err := s.skillRepo.FindByID(skillID)
	if err != nil {
		return err
	}

	if existing == nil {
		return utils.NewNotFoundError("Skill not found")
	}

	return s.skillRepo.DeleteByID(skillID)
}

func mapSkillToPublicResponse(sk *models.Skill) dto.SkillPublicResponse {
	return dto.SkillPublicResponse{
		ID:       sk.ID.String(),
		Name:     sk.Name,
		Category: sk.Category,
		Level:    sk.Level,
		IconURL:  sk.IconURL,
	}
}

func mapSkillToAdminListResponse(sk *models.Skill) dto.SkillAdminListResponse {
	return dto.SkillAdminListResponse{
		ID:           sk.ID.String(),
		Name:         sk.Name,
		Category:     sk.Category,
		Level:        sk.Level,
		IsVisible:    sk.IsVisible,
		DisplayOrder: sk.DisplayOrder,
		CreatedAt:    sk.CreatedAt.Format(time.RFC3339),
		UpdatedAt:    sk.UpdatedAt.Format(time.RFC3339),
	}
}

func mapSkillToAdminDetailResponse(sk *models.Skill) dto.SkillAdminDetailResponse {
	return dto.SkillAdminDetailResponse{
		ID:           sk.ID.String(),
		Name:         sk.Name,
		Category:     sk.Category,
		Level:        sk.Level,
		IconURL:      sk.IconURL,
		IsVisible:    sk.IsVisible,
		DisplayOrder: sk.DisplayOrder,
		CreatedAt:    sk.CreatedAt.Format(time.RFC3339),
		UpdatedAt:    sk.UpdatedAt.Format(time.RFC3339),
	}
}

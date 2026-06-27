package services

import (
	"time"

	"github.com/google/uuid"

	"github.com/allesgut7/web-my-porto/backend/internal/dto"
	"github.com/allesgut7/web-my-porto/backend/internal/models"
	"github.com/allesgut7/web-my-porto/backend/internal/repositories"
	"github.com/allesgut7/web-my-porto/backend/internal/utils"
)

type TechStackService interface {
	GetAll() ([]dto.TechStackResponse, error)
	GetByID(id string) (*dto.TechStackResponse, error)
	Create(payload dto.CreateTechStackRequest) (*dto.TechStackResponse, error)
	Update(id string, payload dto.UpdateTechStackRequest) (*dto.TechStackResponse, error)
	Delete(id string) error
}

type techStackService struct {
	techStackRepo repositories.TechStackRepository
}

func NewTechStackService(techStackRepo repositories.TechStackRepository) TechStackService {
	return &techStackService{
		techStackRepo: techStackRepo,
	}
}

func (s *techStackService) GetAll() ([]dto.TechStackResponse, error) {
	techStacks, err := s.techStackRepo.FindAll()
	if err != nil {
		return nil, err
	}

	items := make([]dto.TechStackResponse, 0, len(techStacks))
	for _, ts := range techStacks {
		items = append(items, mapTechStackToResponse(&ts))
	}

	return items, nil
}

func (s *techStackService) GetByID(id string) (*dto.TechStackResponse, error) {
	stackID, err := uuid.Parse(id)
	if err != nil {
		return nil, utils.NewNotFoundError("Tech stack not found")
	}

	techStack, err := s.techStackRepo.FindByID(stackID)
	if err != nil {
		return nil, err
	}

	if techStack == nil {
		return nil, utils.NewNotFoundError("Tech stack not found")
	}

	response := mapTechStackToResponse(techStack)

	return &response, nil
}

func (s *techStackService) Create(payload dto.CreateTechStackRequest) (*dto.TechStackResponse, error) {
	techStack := &models.TechStack{
		Name:         payload.Name,
		Category:     payload.Category,
		IconURL:      payload.IconURL,
		DisplayOrder: payload.DisplayOrder,
	}

	if err := s.techStackRepo.Create(techStack); err != nil {
		return nil, err
	}

	response := mapTechStackToResponse(techStack)

	return &response, nil
}

func (s *techStackService) Update(id string, payload dto.UpdateTechStackRequest) (*dto.TechStackResponse, error) {
	stackID, err := uuid.Parse(id)
	if err != nil {
		return nil, utils.NewNotFoundError("Tech stack not found")
	}

	existing, err := s.techStackRepo.FindByID(stackID)
	if err != nil {
		return nil, err
	}

	if existing == nil {
		return nil, utils.NewNotFoundError("Tech stack not found")
	}

	if payload.Name != nil {
		existing.Name = *payload.Name
	}
	if payload.Category != nil {
		existing.Category = payload.Category
	}
	if payload.IconURL != nil {
		existing.IconURL = payload.IconURL
	}
	if payload.DisplayOrder != nil {
		existing.DisplayOrder = *payload.DisplayOrder
	}
	existing.UpdatedAt = time.Now()

	if err := s.techStackRepo.Update(existing); err != nil {
		return nil, err
	}

	response := mapTechStackToResponse(existing)

	return &response, nil
}

func (s *techStackService) Delete(id string) error {
	stackID, err := uuid.Parse(id)
	if err != nil {
		return utils.NewNotFoundError("Tech stack not found")
	}

	existing, err := s.techStackRepo.FindByID(stackID)
	if err != nil {
		return err
	}

	if existing == nil {
		return utils.NewNotFoundError("Tech stack not found")
	}

	return s.techStackRepo.DeleteByID(stackID)
}

func mapTechStackToResponse(ts *models.TechStack) dto.TechStackResponse {
	return dto.TechStackResponse{
		ID:           ts.ID.String(),
		Name:         ts.Name,
		Category:     ts.Category,
		IconURL:      ts.IconURL,
		DisplayOrder: ts.DisplayOrder,
	}
}

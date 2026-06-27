package repositories

import (
	"errors"

	"github.com/google/uuid"
	"gorm.io/gorm"

	"github.com/allesgut7/web-my-porto/backend/internal/models"
)

type TechStackRepository interface {
	FindAll() ([]models.TechStack, error)
	FindByID(id uuid.UUID) (*models.TechStack, error)
	Create(techStack *models.TechStack) error
	Update(techStack *models.TechStack) error
	DeleteByID(id uuid.UUID) error
}

type techStackRepository struct {
	db *gorm.DB
}

func NewTechStackRepository(db *gorm.DB) TechStackRepository {
	return &techStackRepository{
		db: db,
	}
}

func (r *techStackRepository) FindAll() ([]models.TechStack, error) {
	var techStacks []models.TechStack

	err := r.db.
		Order("display_order ASC, name ASC").
		Find(&techStacks).
		Error

	if err != nil {
		return nil, err
	}

	return techStacks, nil
}

func (r *techStackRepository) FindByID(id uuid.UUID) (*models.TechStack, error) {
	var techStack models.TechStack

	err := r.db.
		Where("id = ?", id).
		First(&techStack).
		Error

	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, nil
		}

		return nil, err
	}

	return &techStack, nil
}

func (r *techStackRepository) Create(techStack *models.TechStack) error {
	return r.db.Create(techStack).Error
}

func (r *techStackRepository) Update(techStack *models.TechStack) error {
	return r.db.Save(techStack).Error
}

func (r *techStackRepository) DeleteByID(id uuid.UUID) error {
	return r.db.Delete(&models.TechStack{}, "id = ?", id).Error
}

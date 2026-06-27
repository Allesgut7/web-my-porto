package repositories

import (
	"errors"

	"github.com/google/uuid"
	"gorm.io/gorm"

	"github.com/allesgut7/web-my-porto/backend/internal/models"
)

type ExperienceRepository interface {
	FindAll() ([]models.Experience, error)
	FindAllPublic() ([]models.Experience, error)
	FindByID(id uuid.UUID) (*models.Experience, error)
	Create(exp *models.Experience, techStackIDs []uuid.UUID) error
	Update(exp *models.Experience, techStackIDs []uuid.UUID) error
	DeleteByID(id uuid.UUID) error
}

type experienceRepository struct {
	db *gorm.DB
}

func NewExperienceRepository(db *gorm.DB) ExperienceRepository {
	return &experienceRepository{
		db: db,
	}
}

func (r *experienceRepository) FindAll() ([]models.Experience, error) {
	var experiences []models.Experience

	err := r.db.
		Preload("TechStacks", func(db *gorm.DB) *gorm.DB {
			return db.Order("tech_stacks.display_order ASC, tech_stacks.name ASC")
		}).
		Order("display_order ASC, start_date DESC").
		Find(&experiences).
		Error

	if err != nil {
		return nil, err
	}

	return experiences, nil
}

func (r *experienceRepository) FindAllPublic() ([]models.Experience, error) {
	var experiences []models.Experience

	err := r.db.
		Where("is_visible = ?", true).
		Preload("TechStacks", func(db *gorm.DB) *gorm.DB {
			return db.Order("tech_stacks.display_order ASC, tech_stacks.name ASC")
		}).
		Order("display_order ASC, start_date DESC").
		Find(&experiences).
		Error

	if err != nil {
		return nil, err
	}

	return experiences, nil
}

func (r *experienceRepository) FindByID(id uuid.UUID) (*models.Experience, error) {
	var experience models.Experience

	err := r.db.
		Where("id = ?", id).
		Preload("TechStacks", func(db *gorm.DB) *gorm.DB {
			return db.Order("tech_stacks.display_order ASC, tech_stacks.name ASC")
		}).
		First(&experience).
		Error

	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, nil
		}

		return nil, err
	}

	return &experience, nil
}

func (r *experienceRepository) Create(exp *models.Experience, techStackIDs []uuid.UUID) error {
	return r.db.Transaction(func(tx *gorm.DB) error {
		if err := tx.Create(exp).Error; err != nil {
			return err
		}

		if len(techStackIDs) == 0 {
			return nil
		}

		var techStacks []models.TechStack
		if err := tx.Where("id IN ?", techStackIDs).Find(&techStacks).Error; err != nil {
			return err
		}

		if err := tx.Model(exp).Association("TechStacks").Replace(techStacks); err != nil {
			return err
		}

		return nil
	})
}

func (r *experienceRepository) Update(exp *models.Experience, techStackIDs []uuid.UUID) error {
	return r.db.Transaction(func(tx *gorm.DB) error {
		if err := tx.Save(exp).Error; err != nil {
			return err
		}

		if techStackIDs == nil {
			return nil
		}

		var techStacks []models.TechStack
		if len(techStackIDs) > 0 {
			if err := tx.Where("id IN ?", techStackIDs).Find(&techStacks).Error; err != nil {
				return err
			}
		}

		if err := tx.Model(exp).Association("TechStacks").Replace(techStacks); err != nil {
			return err
		}

		return nil
	})
}

func (r *experienceRepository) DeleteByID(id uuid.UUID) error {
	return r.db.Delete(&models.Experience{}, "id = ?", id).Error
}

package repositories

import (
	"errors"

	"github.com/google/uuid"
	"gorm.io/gorm"

	"github.com/allesgut7/web-my-porto/backend/internal/models"
)

type SkillRepository interface {
	FindAllVisible() ([]models.Skill, error)
	FindAll() ([]models.Skill, error)
	FindByID(id uuid.UUID) (*models.Skill, error)
	Create(skill *models.Skill) error
	Update(skill *models.Skill) error
	DeleteByID(id uuid.UUID) error
}

type skillRepository struct {
	db *gorm.DB
}

func NewSkillRepository(db *gorm.DB) SkillRepository {
	return &skillRepository{
		db: db,
	}
}

func (r *skillRepository) FindAllVisible() ([]models.Skill, error) {
	var skills []models.Skill

	err := r.db.
		Where("is_visible = ?", true).
		Order("display_order ASC, name ASC").
		Find(&skills).
		Error

	if err != nil {
		return nil, err
	}

	return skills, nil
}

func (r *skillRepository) FindAll() ([]models.Skill, error) {
	var skills []models.Skill

	err := r.db.
		Order("display_order ASC, name ASC").
		Find(&skills).
		Error

	if err != nil {
		return nil, err
	}

	return skills, nil
}

func (r *skillRepository) FindByID(id uuid.UUID) (*models.Skill, error) {
	var skill models.Skill

	err := r.db.
		Where("id = ?", id).
		First(&skill).
		Error

	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, nil
		}

		return nil, err
	}

	return &skill, nil
}

func (r *skillRepository) Create(skill *models.Skill) error {
	return r.db.Create(skill).Error
}

func (r *skillRepository) Update(skill *models.Skill) error {
	return r.db.Save(skill).Error
}

func (r *skillRepository) DeleteByID(id uuid.UUID) error {
	return r.db.Delete(&models.Skill{}, "id = ?", id).Error
}

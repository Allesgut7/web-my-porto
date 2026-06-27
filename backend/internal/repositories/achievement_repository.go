package repositories

import (
	"errors"

	"github.com/google/uuid"
	"gorm.io/gorm"

	"github.com/allesgut7/web-my-porto/backend/internal/models"
)

type AchievementRepository interface {
	FindAllVisible() ([]models.Achievement, error)
	FindAll() ([]models.Achievement, error)
	FindByID(id uuid.UUID) (*models.Achievement, error)
	Create(achievement *models.Achievement) error
	Update(achievement *models.Achievement) error
	DeleteByID(id uuid.UUID) error
}

type achievementRepository struct {
	db *gorm.DB
}

func NewAchievementRepository(db *gorm.DB) AchievementRepository {
	return &achievementRepository{
		db: db,
	}
}

func (r *achievementRepository) FindAllVisible() ([]models.Achievement, error) {
	var achievements []models.Achievement

	err := r.db.
		Where("is_visible = ?", true).
		Preload("CertificateFile").
		Order("display_order ASC, achieved_at DESC").
		Find(&achievements).
		Error

	if err != nil {
		return nil, err
	}

	return achievements, nil
}

func (r *achievementRepository) FindAll() ([]models.Achievement, error) {
	var achievements []models.Achievement

	err := r.db.
		Preload("CertificateFile").
		Order("display_order ASC, achieved_at DESC").
		Find(&achievements).
		Error

	if err != nil {
		return nil, err
	}

	return achievements, nil
}

func (r *achievementRepository) FindByID(id uuid.UUID) (*models.Achievement, error) {
	var achievement models.Achievement

	err := r.db.
		Where("id = ?", id).
		Preload("CertificateFile").
		First(&achievement).
		Error

	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, nil
		}

		return nil, err
	}

	return &achievement, nil
}

func (r *achievementRepository) Create(achievement *models.Achievement) error {
	return r.db.Create(achievement).Error
}

func (r *achievementRepository) Update(achievement *models.Achievement) error {
	return r.db.Save(achievement).Error
}

func (r *achievementRepository) DeleteByID(id uuid.UUID) error {
	return r.db.Delete(&models.Achievement{}, "id = ?", id).Error
}

package repositories

import (
	"errors"

	"gorm.io/gorm"

	"github.com/allesgut7/web-my-porto/backend/internal/models"
)

type ProfileRepository interface {
	FindPublicProfile() (*models.Profile, error)
}

type profileRepository struct {
	db *gorm.DB
}

func NewProfileRepository(db *gorm.DB) ProfileRepository {
	return &profileRepository{
		db: db,
	}
}

func (r *profileRepository) FindPublicProfile() (*models.Profile, error) {
	var profile models.Profile

	err := r.db.
		Preload("AvatarFile").
		Preload("CVFile").
		Order("created_at ASC").
		First(&profile).
		Error

	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, nil
		}

		return nil, err
	}

	return &profile, nil
}

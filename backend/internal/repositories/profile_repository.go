package repositories

import (
	"errors"

	"gorm.io/gorm"

	"github.com/allesgut7/web-my-porto/backend/internal/models"
)

type ProfileRepository interface {
	FindPublicProfile() (*models.Profile, error)
	FindAdminProfile() (*models.Profile, error)
	UpdateProfile(profile *models.Profile) error
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

func (r *profileRepository) FindAdminProfile() (*models.Profile, error) {
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

func (r *profileRepository) UpdateProfile(profile *models.Profile) error {
	updateData := map[string]interface{}{
		"full_name":      profile.FullName,
		"headline":       profile.Headline,
		"bio":            profile.Bio,
		"location":       profile.Location,
		"email":          profile.Email,
		"phone":          profile.Phone,
		"github_url":     profile.GithubURL,
		"linkedin_url":   profile.LinkedinURL,
		"website_url":    profile.WebsiteURL,
		"avatar_file_id": profile.AvatarFileID,
		"cv_file_id":     profile.CVFileID,
		"updated_at":     profile.UpdatedAt,
	}

	return r.db.Model(&models.Profile{}).
		Where("id = ?", profile.ID).
		Updates(updateData).
		Error
}

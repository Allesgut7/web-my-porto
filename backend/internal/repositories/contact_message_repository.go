package repositories

import (
	"errors"

	"github.com/google/uuid"
	"gorm.io/gorm"

	"github.com/allesgut7/web-my-porto/backend/internal/models"
)

type ContactMessageRepository interface {
	FindAll() ([]models.ContactMessage, error)
	FindByID(id uuid.UUID) (*models.ContactMessage, error)
	Create(msg *models.ContactMessage) error
	MarkAsRead(id uuid.UUID) error
	DeleteByID(id uuid.UUID) error
	CountUnread() (int64, error)
}

type contactMessageRepository struct {
	db *gorm.DB
}

func NewContactMessageRepository(db *gorm.DB) ContactMessageRepository {
	return &contactMessageRepository{
		db: db,
	}
}

func (r *contactMessageRepository) FindAll() ([]models.ContactMessage, error) {
	var messages []models.ContactMessage

	err := r.db.
		Order("created_at DESC").
		Find(&messages).
		Error

	if err != nil {
		return nil, err
	}

	return messages, nil
}

func (r *contactMessageRepository) FindByID(id uuid.UUID) (*models.ContactMessage, error) {
	var message models.ContactMessage

	err := r.db.
		Where("id = ?", id).
		First(&message).
		Error

	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, nil
		}

		return nil, err
	}

	return &message, nil
}

func (r *contactMessageRepository) Create(msg *models.ContactMessage) error {
	return r.db.Create(msg).Error
}

func (r *contactMessageRepository) MarkAsRead(id uuid.UUID) error {
	return r.db.
		Model(&models.ContactMessage{}).
		Where("id = ?", id).
		Update("is_read", true).
		Error
}

func (r *contactMessageRepository) DeleteByID(id uuid.UUID) error {
	return r.db.Delete(&models.ContactMessage{}, "id = ?", id).Error
}

func (r *contactMessageRepository) CountUnread() (int64, error) {
	var count int64

	err := r.db.
		Model(&models.ContactMessage{}).
		Where("is_read = ?", false).
		Count(&count).
		Error

	if err != nil {
		return 0, err
	}

	return count, nil
}

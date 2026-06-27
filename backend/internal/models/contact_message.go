package models

import (
	"time"

	"github.com/google/uuid"
)

type ContactMessage struct {
	ID        uuid.UUID `gorm:"type:uuid;primaryKey;default:gen_random_uuid()" json:"id"`
	Name      string    `gorm:"type:varchar(255);not null" json:"name"`
	Email     string    `gorm:"type:varchar(255);not null" json:"email"`
	Subject   *string   `gorm:"type:varchar(255)" json:"subject"`
	Message   string    `gorm:"type:text;not null" json:"message"`
	IsRead    bool      `gorm:"default:false" json:"isRead"`
	IPAddress *string   `gorm:"type:varchar(45)" json:"-"`
	CreatedAt time.Time `gorm:"not null;default:now()" json:"createdAt"`
}

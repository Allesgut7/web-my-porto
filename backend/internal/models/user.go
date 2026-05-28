package models

import (
	"time"

	"github.com/google/uuid"
)

type User struct {
	ID           uuid.UUID `gorm:"type:uuid;default:gen_random_uuid();primaryKey;column:id"`
	Name         string    `gorm:"type:varchar(150);not null;column:name"`
	Email        string    `gorm:"type:varchar(255);not null;uniqueIndex:uq_users_email;column:email"`
	PasswordHash string    `gorm:"type:text;not null;column:password_hash"`
	Role         string    `gorm:"type:varchar(50);not null;default:owner;column:role"`
	CreatedAt    time.Time `gorm:"type:timestamp;not null;default:now();column:created_at"`
	UpdatedAt    time.Time `gorm:"type:timestamp;not null;default:now();column:updated_at"`

	Projects []Project `gorm:"foreignKey:UserID"`
}

func (User) TableName() string {
	return "users"
}

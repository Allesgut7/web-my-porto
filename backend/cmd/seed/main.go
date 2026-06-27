package main

import (
	"crypto/rand"
	"errors"
	"fmt"
	"log"
	"math/big"

	"gorm.io/gorm"

	"github.com/allesgut7/web-my-porto/backend/internal/config"
	"github.com/allesgut7/web-my-porto/backend/internal/database"
	"github.com/allesgut7/web-my-porto/backend/internal/models"
	"github.com/allesgut7/web-my-porto/backend/internal/utils"
)

func main() {
	cfg := config.Load()

	db, err := database.NewPostgresConnection(cfg)
	if err != nil {
		log.Fatalf("failed to connect database: %v", err)
	}

	if err := seedAdminUser(db); err != nil {
		log.Fatalf("failed to seed admin user: %v", err)
	}

	if err := seedProfile(db); err != nil {
		log.Fatalf("failed to seed profile: %v", err)
	}

	if err := seedTechStacks(db); err != nil {
		log.Fatalf("failed to seed tech stacks: %v", err)
	}

	log.Println("seed completed successfully")
}

func seedAdminUser(db *gorm.DB) error {
	email := "admin@example.com"

	var existingUser models.User
	err := db.Where("email = ?", email).First(&existingUser).Error

	if err == nil {
		log.Println("admin user already exists, skipping")
		return nil
	}

	if !errors.Is(err, gorm.ErrRecordNotFound) {
		return err
	}

	password, err := generateRandomPassword(16)
	if err != nil {
		return fmt.Errorf("failed to generate random password: %w", err)
	}

	passwordHash, err := utils.HashPassword(password)
	if err != nil {
		return err
	}

	admin := models.User{
		Name:         "Admin",
		Email:        email,
		PasswordHash: passwordHash,
		Role:         "owner",
	}

	if err := db.Create(&admin).Error; err != nil {
		return err
	}

	log.Printf("admin user seeded — email: %s", email)
	fmt.Printf("\n========================================\n")
	fmt.Printf("ADMIN CREDENTIALS (save these now!)\n")
	fmt.Printf("Email:    %s\n", email)
	fmt.Printf("Password: %s\n", password)
	fmt.Printf("========================================\n\n")
	return nil
}

func generateRandomPassword(length int) (string, error) {
	const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&*"
	password := make([]byte, length)

	for i := range password {
		n, err := rand.Int(rand.Reader, big.NewInt(int64(len(charset))))
		if err != nil {
			return "", err
		}
		password[i] = charset[n.Int64()]
	}

	return string(password), nil
}

func seedProfile(db *gorm.DB) error {
	var count int64

	if err := db.Model(&models.Profile{}).Count(&count).Error; err != nil {
		return err
	}

	if count > 0 {
		log.Println("profile already exists, skipping")
		return nil
	}

	headline := "Backend Developer | Data Enthusiast | QA Engineer"
	bio := "Developer yang memiliki minat pada Backend Development, Data, QA, dan pengembangan sistem berbasis teknologi."
	location := "Indonesia"
	email := "developer@example.com"
	githubURL := "https://github.com/username"
	linkedinURL := "https://linkedin.com/in/username"
	websiteURL := "http://localhost:3000"

	profile := models.Profile{
		FullName:    "Developer Name",
		Headline:    &headline,
		Bio:         &bio,
		Location:    &location,
		Email:       &email,
		GithubURL:   &githubURL,
		LinkedinURL: &linkedinURL,
		WebsiteURL:  &websiteURL,
	}

	if err := db.Create(&profile).Error; err != nil {
		return err
	}

	log.Println("profile seeded")
	return nil
}

func seedTechStacks(db *gorm.DB) error {
	techStacks := []models.TechStack{
		newTechStack("Go", "Backend", 1),
		newTechStack("Gin", "Backend", 2),
		newTechStack("GORM", "Backend", 3),
		newTechStack("PostgreSQL", "Database", 4),
		newTechStack("Nuxt", "Frontend", 5),
		newTechStack("TypeScript", "Frontend", 6),
		newTechStack("Docker", "DevOps", 7),
	}

	for _, techStack := range techStacks {
		var existing models.TechStack

		err := db.Where("name = ?", techStack.Name).First(&existing).Error

		if err == nil {
			log.Printf("tech stack %s already exists, skipping\n", techStack.Name)
			continue
		}

		if !errors.Is(err, gorm.ErrRecordNotFound) {
			return err
		}

		if err := db.Create(&techStack).Error; err != nil {
			return err
		}

		log.Printf("tech stack %s seeded\n", techStack.Name)
	}

	return nil
}

func newTechStack(name string, category string, displayOrder int) models.TechStack {
	return models.TechStack{
		Name:         name,
		Category:     &category,
		DisplayOrder: displayOrder,
	}
}

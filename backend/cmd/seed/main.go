package main

import (
	"crypto/rand"
	"errors"
	"fmt"
	"log"
	"math/big"

	"time"

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

	if err := seedSkills(db); err != nil {
		log.Fatalf("failed to seed skills: %v", err)
	}

	if err := seedExperiences(db); err != nil {
		log.Fatalf("failed to seed experiences: %v", err)
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

func seedSkills(db *gorm.DB) error {
	var user models.User
	if err := db.Where("email = ?", "admin@example.com").First(&user).Error; err != nil {
		return err
	}

	skills := []models.Skill{
		{UserID: user.ID, Name: "Go", Category: "backend", Level: strPtr("advanced"), DisplayOrder: 1},
		{UserID: user.ID, Name: "Gin", Category: "backend", Level: strPtr("advanced"), DisplayOrder: 2},
		{UserID: user.ID, Name: "GORM", Category: "backend", Level: strPtr("advanced"), DisplayOrder: 3},
		{UserID: user.ID, Name: "Node.js", Category: "backend", Level: strPtr("intermediate"), DisplayOrder: 4},
		{UserID: user.ID, Name: "Python", Category: "backend", Level: strPtr("intermediate"), DisplayOrder: 5},
		{UserID: user.ID, Name: "REST API", Category: "backend", Level: strPtr("advanced"), DisplayOrder: 6},
		{UserID: user.ID, Name: "Vue.js", Category: "frontend", Level: strPtr("intermediate"), DisplayOrder: 7},
		{UserID: user.ID, Name: "Nuxt", Category: "frontend", Level: strPtr("intermediate"), DisplayOrder: 8},
		{UserID: user.ID, Name: "TypeScript", Category: "frontend", Level: strPtr("intermediate"), DisplayOrder: 9},
		{UserID: user.ID, Name: "Tailwind CSS", Category: "frontend", Level: strPtr("intermediate"), DisplayOrder: 10},
		{UserID: user.ID, Name: "PostgreSQL", Category: "database", Level: strPtr("advanced"), DisplayOrder: 11},
		{UserID: user.ID, Name: "Redis", Category: "database", Level: strPtr("intermediate"), DisplayOrder: 12},
		{UserID: user.ID, Name: "Supabase", Category: "database", Level: strPtr("intermediate"), DisplayOrder: 13},
		{UserID: user.ID, Name: "Docker", Category: "devops", Level: strPtr("advanced"), DisplayOrder: 14},
		{UserID: user.ID, Name: "GitHub Actions", Category: "devops", Level: strPtr("intermediate"), DisplayOrder: 15},
		{UserID: user.ID, Name: "Nginx", Category: "devops", Level: strPtr("intermediate"), DisplayOrder: 16},
		{UserID: user.ID, Name: "Linux", Category: "devops", Level: strPtr("advanced"), DisplayOrder: 17},
		{UserID: user.ID, Name: "Pandas", Category: "data", Level: strPtr("intermediate"), DisplayOrder: 18},
		{UserID: user.ID, Name: "Grafana", Category: "data", Level: strPtr("intermediate"), DisplayOrder: 19},
		{UserID: user.ID, Name: "MQTT", Category: "data", Level: strPtr("intermediate"), DisplayOrder: 20},
	}

	for _, skill := range skills {
		var existing models.Skill
		err := db.Where("user_id = ? AND name = ?", user.ID, skill.Name).First(&existing).Error
		if err == nil {
			continue
		}
		if !errors.Is(err, gorm.ErrRecordNotFound) {
			return err
		}
		if err := db.Create(&skill).Error; err != nil {
			return err
		}
		log.Printf("skill %s seeded\n", skill.Name)
	}

	return nil
}

func seedExperiences(db *gorm.DB) error {
	var user models.User
	if err := db.Where("email = ?", "admin@example.com").First(&user).Error; err != nil {
		return err
	}

	desc1 := "Building RESTful APIs, microservices, and data pipelines using Go, Node.js, and PostgreSQL. Focused on system reliability and clean architecture."
	desc2 := "Designed end-to-end IoT solutions including sensor integration, MQTT communication, and real-time monitoring dashboards."
	desc3 := "Focused on embedded systems, control systems, and computer engineering. Final project on IoT-based monitoring systems."
	desc4 := "Implementing test automation frameworks, CI/CD pipelines, and quality assurance processes for web applications."

	experiences := []models.Experience{
		{UserID: user.ID, Type: "work", Title: "Backend Developer", Organization: "Freelance / Open Source", Description: &desc1, StartDate: time.Date(2023, 1, 1, 0, 0, 0, 0, time.UTC), IsCurrent: true, DisplayOrder: 1},
		{UserID: user.ID, Type: "work", Title: "IoT System Developer", Organization: "Academic Projects", Description: &desc2, StartDate: time.Date(2022, 1, 1, 0, 0, 0, 0, time.UTC), DisplayOrder: 2},
		{UserID: user.ID, Type: "education", Title: "Bachelor of Electrical Engineering", Organization: "University", Description: &desc3, StartDate: time.Date(2019, 1, 1, 0, 0, 0, 0, time.UTC), DisplayOrder: 3},
		{UserID: user.ID, Type: "work", Title: "QA Engineer", Organization: "Contract Work", Description: &desc4, StartDate: time.Date(2022, 6, 1, 0, 0, 0, 0, time.UTC), IsCurrent: true, DisplayOrder: 4},
	}

	for _, exp := range experiences {
		var existing models.Experience
		err := db.Where("user_id = ? AND title = ? AND organization = ?", user.ID, exp.Title, exp.Organization).First(&existing).Error
		if err == nil {
			continue
		}
		if !errors.Is(err, gorm.ErrRecordNotFound) {
			return err
		}
		if err := db.Create(&exp).Error; err != nil {
			return err
		}
		log.Printf("experience %s seeded\n", exp.Title)
	}

	return nil
}

func strPtr(s string) *string {
	return &s
}

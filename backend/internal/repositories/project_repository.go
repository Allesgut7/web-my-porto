package repositories

import (
	"errors"
	"strings"

	"github.com/google/uuid"
	"gorm.io/gorm"

	"github.com/allesgut7/web-my-porto/backend/internal/models"
	"github.com/allesgut7/web-my-porto/backend/internal/utils"
)

const ProjectStatusPublished = "published"

type PublicProjectFilter struct {
	Pagination utils.PaginationQuery
	Category   string
	Search     string
	Sort       string
	Featured   *bool
}

type AdminProjectFilter struct {
	Pagination utils.PaginationQuery
	Status     string
	Search     string
	Sort       string
}

type ProjectRepository interface {
	// Public
	FindPublishedProjects(filter PublicProjectFilter) ([]models.Project, int64, error)
	FindPublishedProjectBySlug(slug string) (*models.Project, error)

	// Admin
	FindAdminProjects(filter AdminProjectFilter) ([]models.Project, int64, error)
	FindAdminProjectByID(id uuid.UUID) (*models.Project, error)
	CreateAdminProject(project *models.Project, techStackIDs []uuid.UUID) error
	UpdateAdminProject(project *models.Project, techStackIDs []uuid.UUID) error
	DeleteAdminProject(id uuid.UUID) error
	ExistsSlug(slug string, excludeID *uuid.UUID) (bool, error)
	CountTechStacksByIDs(ids []uuid.UUID) (int64, error)
}

type projectRepository struct {
	db *gorm.DB
}

func NewProjectRepository(db *gorm.DB) ProjectRepository {
	return &projectRepository{
		db: db,
	}
}

// ========================
// Public Query
// ========================

func (r *projectRepository) FindPublishedProjects(filter PublicProjectFilter) ([]models.Project, int64, error) {
	var projects []models.Project
	var total int64

	query := r.db.
		Model(&models.Project{}).
		Where("status = ?", ProjectStatusPublished)

	query = applyPublicProjectFilters(query, filter)

	if err := query.Count(&total).Error; err != nil {
		return nil, 0, err
	}

	query = applyPublicProjectSorting(query, filter.Sort)

	err := query.
		Preload("ThumbnailFile").
		Preload("TechStacks", func(db *gorm.DB) *gorm.DB {
			return db.Order("tech_stacks.display_order ASC, tech_stacks.name ASC")
		}).
		Limit(filter.Pagination.Limit).
		Offset(filter.Pagination.Offset).
		Find(&projects).
		Error

	if err != nil {
		return nil, 0, err
	}

	return projects, total, nil
}

func (r *projectRepository) FindPublishedProjectBySlug(slug string) (*models.Project, error) {
	var project models.Project

	err := r.db.
		Where("slug = ? AND status = ?", slug, ProjectStatusPublished).
		Preload("ThumbnailFile").
		Preload("TechStacks", func(db *gorm.DB) *gorm.DB {
			return db.Order("tech_stacks.display_order ASC, tech_stacks.name ASC")
		}).
		Preload("Images", func(db *gorm.DB) *gorm.DB {
			return db.Order("project_images.display_order ASC, project_images.created_at ASC")
		}).
		Preload("Images.File").
		First(&project).
		Error

	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, nil
		}

		return nil, err
	}

	return &project, nil
}

// ========================
// Admin Query
// ========================

func (r *projectRepository) FindAdminProjects(filter AdminProjectFilter) ([]models.Project, int64, error) {
	var projects []models.Project
	var total int64

	query := r.db.Model(&models.Project{})

	query = applyAdminProjectFilters(query, filter)

	if err := query.Count(&total).Error; err != nil {
		return nil, 0, err
	}

	query = applyAdminProjectSorting(query, filter.Sort)

	err := query.
		Preload("ThumbnailFile").
		Limit(filter.Pagination.Limit).
		Offset(filter.Pagination.Offset).
		Find(&projects).
		Error

	if err != nil {
		return nil, 0, err
	}

	return projects, total, nil
}

func (r *projectRepository) FindAdminProjectByID(id uuid.UUID) (*models.Project, error) {
	var project models.Project

	err := r.db.
		Where("id = ?", id).
		Preload("ThumbnailFile").
		Preload("TechStacks", func(db *gorm.DB) *gorm.DB {
			return db.Order("tech_stacks.display_order ASC, tech_stacks.name ASC")
		}).
		Preload("Images", func(db *gorm.DB) *gorm.DB {
			return db.Order("project_images.display_order ASC, project_images.created_at ASC")
		}).
		Preload("Images.File").
		First(&project).
		Error

	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, nil
		}

		return nil, err
	}

	return &project, nil
}

func (r *projectRepository) CreateAdminProject(project *models.Project, techStackIDs []uuid.UUID) error {
	return r.db.Transaction(func(tx *gorm.DB) error {
		if err := tx.Create(project).Error; err != nil {
			return err
		}

		if len(techStackIDs) == 0 {
			return nil
		}

		var techStacks []models.TechStack
		if err := tx.Where("id IN ?", techStackIDs).Find(&techStacks).Error; err != nil {
			return err
		}

		if err := tx.Model(project).Association("TechStacks").Replace(techStacks); err != nil {
			return err
		}

		return nil
	})
}

func (r *projectRepository) UpdateAdminProject(project *models.Project, techStackIDs []uuid.UUID) error {
	return r.db.Transaction(func(tx *gorm.DB) error {
		updateData := map[string]interface{}{
			"title":             project.Title,
			"slug":              project.Slug,
			"short_description": project.ShortDescription,
			"description":       project.Description,
			"project_type":      project.ProjectType,
			"status":            project.Status,
			"demo_url":          project.DemoURL,
			"repository_url":    project.RepositoryURL,
			"documentation_url": project.DocumentationURL,
			"thumbnail_file_id": project.ThumbnailFileID,
			"is_featured":       project.IsFeatured,
			"display_order":     project.DisplayOrder,
			"started_at":        project.StartedAt,
			"completed_at":      project.CompletedAt,
			"updated_at":        project.UpdatedAt,
		}

		if err := tx.Model(&models.Project{}).
			Where("id = ?", project.ID).
			Updates(updateData).
			Error; err != nil {
			return err
		}

		var currentProject models.Project
		if err := tx.Where("id = ?", project.ID).First(&currentProject).Error; err != nil {
			return err
		}

		var techStacks []models.TechStack
		if len(techStackIDs) > 0 {
			if err := tx.Where("id IN ?", techStackIDs).Find(&techStacks).Error; err != nil {
				return err
			}
		}

		if err := tx.Model(&currentProject).Association("TechStacks").Replace(techStacks); err != nil {
			return err
		}

		return nil
	})
}

func (r *projectRepository) DeleteAdminProject(id uuid.UUID) error {
	return r.db.Delete(&models.Project{}, "id = ?", id).Error
}

func (r *projectRepository) ExistsSlug(slug string, excludeID *uuid.UUID) (bool, error) {
	var count int64

	query := r.db.Model(&models.Project{}).Where("slug = ?", slug)

	if excludeID != nil {
		query = query.Where("id <> ?", *excludeID)
	}

	if err := query.Count(&count).Error; err != nil {
		return false, err
	}

	return count > 0, nil
}

func (r *projectRepository) CountTechStacksByIDs(ids []uuid.UUID) (int64, error) {
	if len(ids) == 0 {
		return 0, nil
	}

	var count int64

	err := r.db.
		Model(&models.TechStack{}).
		Where("id IN ?", ids).
		Count(&count).
		Error

	if err != nil {
		return 0, err
	}

	return count, nil
}

// ========================
// Filters & Sorting
// ========================

func applyPublicProjectFilters(query *gorm.DB, filter PublicProjectFilter) *gorm.DB {
	if filter.Category != "" {
		query = query.Where("LOWER(project_type) = LOWER(?)", filter.Category)
	}

	if filter.Search != "" {
		search := "%" + escapeLikePattern(strings.ToLower(filter.Search)) + "%"

		query = query.Where(
			"(LOWER(title) LIKE ? OR LOWER(COALESCE(short_description, '')) LIKE ?)",
			search,
			search,
		)
	}

	if filter.Featured != nil {
		query = query.Where("is_featured = ?", *filter.Featured)
	}

	return query
}

func applyPublicProjectSorting(query *gorm.DB, sort string) *gorm.DB {
	switch sort {
	case "latest":
		return query.Order("created_at DESC")
	case "oldest":
		return query.Order("created_at ASC")
	case "display_order":
		return query.Order("display_order ASC, created_at DESC")
	default:
		return query.Order("is_featured DESC, display_order ASC, created_at DESC")
	}
}

func applyAdminProjectFilters(query *gorm.DB, filter AdminProjectFilter) *gorm.DB {
	if filter.Status != "" {
		query = query.Where("status = ?", filter.Status)
	}

	if filter.Search != "" {
		search := "%" + escapeLikePattern(strings.ToLower(filter.Search)) + "%"

		query = query.Where(
			"LOWER(title) LIKE ?",
			search,
		)
	}

	return query
}

func applyAdminProjectSorting(query *gorm.DB, sort string) *gorm.DB {
	switch sort {
	case "latest":
		return query.Order("created_at DESC")
	case "oldest":
		return query.Order("created_at ASC")
	case "display_order":
		return query.Order("display_order ASC, created_at DESC")
	default:
		return query.Order("created_at DESC")
	}
}

func escapeLikePattern(s string) string {
	s = strings.ReplaceAll(s, `\`, `\\`)
	s = strings.ReplaceAll(s, `%`, `\%`)
	s = strings.ReplaceAll(s, `_`, `\_`)
	return s
}

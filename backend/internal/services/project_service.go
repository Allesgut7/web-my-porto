package services

import (
	"net/http"
	"time"

	"github.com/google/uuid"

	"github.com/allesgut7/web-my-porto/backend/internal/dto"
	"github.com/allesgut7/web-my-porto/backend/internal/models"
	"github.com/allesgut7/web-my-porto/backend/internal/repositories"
	"github.com/allesgut7/web-my-porto/backend/internal/utils"
)

type PublicProjectQuery struct {
	Pagination utils.PaginationQuery
	Category   string
	Search     string
	Sort       string
	Featured   *bool
}

type AdminProjectQuery struct {
	Pagination utils.PaginationQuery
	Status     string
	Search     string
	Sort       string
}

type ProjectListResult struct {
	Items []dto.ProjectListItemResponse
	Meta  utils.PaginationMeta
}

type AdminProjectListResult struct {
	Items []dto.ProjectAdminListResponse
	Meta  utils.PaginationMeta
}

type ProjectService interface {
	// Public
	GetPublishedProjects(query PublicProjectQuery) (*ProjectListResult, error)
	GetPublishedProjectBySlug(slug string) (*dto.ProjectDetailResponse, error)

	// Admin
	GetAdminProjects(query AdminProjectQuery) (*AdminProjectListResult, error)
	GetAdminProjectByID(id string) (*dto.ProjectAdminDetailResponse, error)
	CreateAdminProject(userID string, payload dto.CreateProjectRequest) (*dto.ProjectMutationResponse, error)
	UpdateAdminProject(id string, payload dto.UpdateProjectRequest) (*dto.ProjectMutationResponse, error)
	DeleteAdminProject(id string) error
}

type projectService struct {
	projectRepo repositories.ProjectRepository
}

func NewProjectService(projectRepo repositories.ProjectRepository) ProjectService {
	return &projectService{
		projectRepo: projectRepo,
	}
}

// ========================
// Public Service
// ========================

func (s *projectService) GetPublishedProjects(query PublicProjectQuery) (*ProjectListResult, error) {
	projects, total, err := s.projectRepo.FindPublishedProjects(repositories.PublicProjectFilter{
		Pagination: query.Pagination,
		Category:   query.Category,
		Search:     query.Search,
		Sort:       query.Sort,
		Featured:   query.Featured,
	})
	if err != nil {
		return nil, err
	}

	items := make([]dto.ProjectListItemResponse, 0, len(projects))

	for _, project := range projects {
		items = append(items, mapProjectToListItemResponse(&project))
	}

	meta := utils.NewPaginationMeta(query.Pagination.Page, query.Pagination.Limit, total)

	return &ProjectListResult{
		Items: items,
		Meta:  meta,
	}, nil
}

func (s *projectService) GetPublishedProjectBySlug(slug string) (*dto.ProjectDetailResponse, error) {
	project, err := s.projectRepo.FindPublishedProjectBySlug(slug)
	if err != nil {
		return nil, err
	}

	if project == nil {
		return nil, utils.NewAppError(http.StatusNotFound, "Project not found", nil)
	}

	response := mapProjectToDetailResponse(project)

	return &response, nil
}

// ========================
// Admin Service
// ========================

func (s *projectService) GetAdminProjects(query AdminProjectQuery) (*AdminProjectListResult, error) {
	projects, total, err := s.projectRepo.FindAdminProjects(repositories.AdminProjectFilter{
		Pagination: query.Pagination,
		Status:     query.Status,
		Search:     query.Search,
		Sort:       query.Sort,
	})
	if err != nil {
		return nil, err
	}

	items := make([]dto.ProjectAdminListResponse, 0, len(projects))

	for _, project := range projects {
		items = append(items, mapProjectToAdminListResponse(&project))
	}

	meta := utils.NewPaginationMeta(query.Pagination.Page, query.Pagination.Limit, total)

	return &AdminProjectListResult{
		Items: items,
		Meta:  meta,
	}, nil
}

func (s *projectService) GetAdminProjectByID(id string) (*dto.ProjectAdminDetailResponse, error) {
	projectID, err := uuid.Parse(id)
	if err != nil {
		return nil, utils.NewAppError(http.StatusNotFound, "Project not found", nil)
	}

	project, err := s.projectRepo.FindAdminProjectByID(projectID)
	if err != nil {
		return nil, err
	}

	if project == nil {
		return nil, utils.NewAppError(http.StatusNotFound, "Project not found", nil)
	}

	response := mapProjectToAdminDetailResponse(project)

	return &response, nil
}

func (s *projectService) CreateAdminProject(userID string, payload dto.CreateProjectRequest) (*dto.ProjectMutationResponse, error) {
	creatorID, err := uuid.Parse(userID)
	if err != nil {
		return nil, utils.NewAppError(http.StatusUnauthorized, "Unauthorized", nil)
	}

	if err := validateProjectSlug(payload.Slug); err != nil {
		return nil, err
	}

	startedAt, completedAt, err := parseProjectDates(payload.StartedAt, payload.CompletedAt)
	if err != nil {
		return nil, err
	}

	thumbnailFileID, err := parseOptionalUUID(payload.ThumbnailFileID, "thumbnailFileId")
	if err != nil {
		return nil, err
	}

	techStackIDs, err := parseUUIDList(payload.TechStackIDs, "techStackIds")
	if err != nil {
		return nil, err
	}

	if err := s.ensureTechStacksExist(techStackIDs); err != nil {
		return nil, err
	}

	slugExists, err := s.projectRepo.ExistsSlug(payload.Slug, nil)
	if err != nil {
		return nil, err
	}

	if slugExists {
		return nil, utils.NewConflictError("Slug already exists", map[string]string{
			"slug": "Slug already exists",
		})
	}

	project := &models.Project{
		UserID:           &creatorID,
		Title:            payload.Title,
		Slug:             payload.Slug,
		ShortDescription: payload.ShortDescription,
		Description:      payload.Description,
		ProjectType:      payload.ProjectType,
		Status:           payload.Status,
		DemoURL:          payload.DemoURL,
		RepositoryURL:    payload.RepositoryURL,
		DocumentationURL: payload.DocumentationURL,
		ThumbnailFileID:  thumbnailFileID,
		IsFeatured:       payload.IsFeatured,
		DisplayOrder:     payload.DisplayOrder,
		StartedAt:        startedAt,
		CompletedAt:      completedAt,
	}

	if err := s.projectRepo.CreateAdminProject(project, techStackIDs); err != nil {
		return nil, err
	}

	response := mapProjectToMutationResponse(project)

	return &response, nil
}

func (s *projectService) UpdateAdminProject(id string, payload dto.UpdateProjectRequest) (*dto.ProjectMutationResponse, error) {
	projectID, err := uuid.Parse(id)
	if err != nil {
		return nil, utils.NewAppError(http.StatusNotFound, "Project not found", nil)
	}

	existingProject, err := s.projectRepo.FindAdminProjectByID(projectID)
	if err != nil {
		return nil, err
	}

	if existingProject == nil {
		return nil, utils.NewAppError(http.StatusNotFound, "Project not found", nil)
	}

	if err := validateProjectSlug(payload.Slug); err != nil {
		return nil, err
	}

	startedAt, completedAt, err := parseProjectDates(payload.StartedAt, payload.CompletedAt)
	if err != nil {
		return nil, err
	}

	thumbnailFileID, err := parseOptionalUUID(payload.ThumbnailFileID, "thumbnailFileId")
	if err != nil {
		return nil, err
	}

	techStackIDs, err := parseUUIDList(payload.TechStackIDs, "techStackIds")
	if err != nil {
		return nil, err
	}

	if err := s.ensureTechStacksExist(techStackIDs); err != nil {
		return nil, err
	}

	slugExists, err := s.projectRepo.ExistsSlug(payload.Slug, &projectID)
	if err != nil {
		return nil, err
	}

	if slugExists {
		return nil, utils.NewConflictError("Slug already exists", map[string]string{
			"slug": "Slug already exists",
		})
	}

	project := &models.Project{
		ID:               projectID,
		Title:            payload.Title,
		Slug:             payload.Slug,
		ShortDescription: payload.ShortDescription,
		Description:      payload.Description,
		ProjectType:      payload.ProjectType,
		Status:           payload.Status,
		DemoURL:          payload.DemoURL,
		RepositoryURL:    payload.RepositoryURL,
		DocumentationURL: payload.DocumentationURL,
		ThumbnailFileID:  thumbnailFileID,
		IsFeatured:       payload.IsFeatured,
		DisplayOrder:     payload.DisplayOrder,
		StartedAt:        startedAt,
		CompletedAt:      completedAt,
		UpdatedAt:        time.Now(),
	}

	if err := s.projectRepo.UpdateAdminProject(project, techStackIDs); err != nil {
		return nil, err
	}

	response := mapProjectToMutationResponse(project)

	return &response, nil
}

func (s *projectService) DeleteAdminProject(id string) error {
	projectID, err := uuid.Parse(id)
	if err != nil {
		return utils.NewAppError(http.StatusNotFound, "Project not found", nil)
	}

	existingProject, err := s.projectRepo.FindAdminProjectByID(projectID)
	if err != nil {
		return err
	}

	if existingProject == nil {
		return utils.NewAppError(http.StatusNotFound, "Project not found", nil)
	}

	return s.projectRepo.DeleteAdminProject(projectID)
}

func (s *projectService) ensureTechStacksExist(ids []uuid.UUID) error {
	if len(ids) == 0 {
		return nil
	}

	count, err := s.projectRepo.CountTechStacksByIDs(ids)
	if err != nil {
		return err
	}

	if count != int64(len(ids)) {
		return utils.NewValidationError(map[string]string{
			"techStackIds": "One or more tech stack IDs are invalid",
		})
	}

	return nil
}

// ========================
// Mapper Public
// ========================

func mapProjectToListItemResponse(project *models.Project) dto.ProjectListItemResponse {
	var thumbnailURL *string

	if project.ThumbnailFile != nil {
		thumbnailURL = &project.ThumbnailFile.FileURL
	}

	return dto.ProjectListItemResponse{
		ID:               project.ID.String(),
		Title:            project.Title,
		Slug:             project.Slug,
		ShortDescription: project.ShortDescription,
		ProjectType:      project.ProjectType,
		ThumbnailURL:     thumbnailURL,
		IsFeatured:       project.IsFeatured,
		StartedAt:        formatDate(project.StartedAt),
		CompletedAt:      formatDate(project.CompletedAt),
		TechStacks:       mapTechStackNames(project.TechStacks),
	}
}

func mapProjectToDetailResponse(project *models.Project) dto.ProjectDetailResponse {
	var thumbnailURL *string

	if project.ThumbnailFile != nil {
		thumbnailURL = &project.ThumbnailFile.FileURL
	}

	images := make([]dto.ProjectImageResponse, 0, len(project.Images))

	for _, image := range project.Images {
		images = append(images, mapProjectImageToResponse(&image))
	}

	return dto.ProjectDetailResponse{
		ID:               project.ID.String(),
		Title:            project.Title,
		Slug:             project.Slug,
		ShortDescription: project.ShortDescription,
		Description:      project.Description,
		ProjectType:      project.ProjectType,
		DemoURL:          project.DemoURL,
		RepositoryURL:    project.RepositoryURL,
		DocumentationURL: project.DocumentationURL,
		ThumbnailURL:     thumbnailURL,
		IsFeatured:       project.IsFeatured,
		StartedAt:        formatDate(project.StartedAt),
		CompletedAt:      formatDate(project.CompletedAt),
		TechStacks:       mapTechStackNames(project.TechStacks),
		Images:           images,
	}
}

// ========================
// Mapper Admin
// ========================

func mapProjectToAdminListResponse(project *models.Project) dto.ProjectAdminListResponse {
	var thumbnailURL *string

	if project.ThumbnailFile != nil {
		thumbnailURL = &project.ThumbnailFile.FileURL
	}

	return dto.ProjectAdminListResponse{
		ID:           project.ID.String(),
		Title:        project.Title,
		Slug:         project.Slug,
		Status:       project.Status,
		ProjectType:  project.ProjectType,
		ThumbnailURL: thumbnailURL,
		IsFeatured:   project.IsFeatured,
		DisplayOrder: project.DisplayOrder,
		CreatedAt:    formatDateTime(project.CreatedAt),
		UpdatedAt:    formatDateTime(project.UpdatedAt),
	}
}

func mapProjectToAdminDetailResponse(project *models.Project) dto.ProjectAdminDetailResponse {
	var thumbnailFileID *string
	var thumbnailURL *string

	if project.ThumbnailFileID != nil {
		value := project.ThumbnailFileID.String()
		thumbnailFileID = &value
	}

	if project.ThumbnailFile != nil {
		thumbnailURL = &project.ThumbnailFile.FileURL
	}

	images := make([]dto.ProjectImageResponse, 0, len(project.Images))

	for _, image := range project.Images {
		images = append(images, mapProjectImageToResponse(&image))
	}

	return dto.ProjectAdminDetailResponse{
		ID:               project.ID.String(),
		Title:            project.Title,
		Slug:             project.Slug,
		ShortDescription: project.ShortDescription,
		Description:      project.Description,
		ProjectType:      project.ProjectType,
		Status:           project.Status,
		DemoURL:          project.DemoURL,
		RepositoryURL:    project.RepositoryURL,
		DocumentationURL: project.DocumentationURL,
		ThumbnailFileID:  thumbnailFileID,
		ThumbnailURL:     thumbnailURL,
		IsFeatured:       project.IsFeatured,
		DisplayOrder:     project.DisplayOrder,
		StartedAt:        formatDate(project.StartedAt),
		CompletedAt:      formatDate(project.CompletedAt),
		TechStackIDs:     mapTechStackIDs(project.TechStacks),
		Images:           images,
		CreatedAt:        formatDateTime(project.CreatedAt),
		UpdatedAt:        formatDateTime(project.UpdatedAt),
	}
}

func mapProjectToMutationResponse(project *models.Project) dto.ProjectMutationResponse {
	return dto.ProjectMutationResponse{
		ID:     project.ID.String(),
		Title:  project.Title,
		Slug:   project.Slug,
		Status: project.Status,
	}
}

func mapProjectImageToResponse(image *models.ProjectImage) dto.ProjectImageResponse {
	var imageURL *string

	if image.File != nil {
		imageURL = &image.File.FileURL
	}

	return dto.ProjectImageResponse{
		ID:           image.ID.String(),
		ImageURL:     imageURL,
		ImageType:    image.ImageType,
		Caption:      image.Caption,
		DisplayOrder: image.DisplayOrder,
	}
}

func mapTechStackNames(techStacks []models.TechStack) []string {
	items := make([]string, 0, len(techStacks))

	for _, techStack := range techStacks {
		items = append(items, techStack.Name)
	}

	return items
}

func mapTechStackIDs(techStacks []models.TechStack) []string {
	items := make([]string, 0, len(techStacks))

	for _, techStack := range techStacks {
		items = append(items, techStack.ID.String())
	}

	return items
}

// ========================
// Validation Helpers
// ========================

func validateProjectSlug(slug string) error {
	if !utils.IsValidSlug(slug) {
		return utils.NewValidationError(map[string]string{
			"slug": "Slug must be lowercase kebab-case",
		})
	}

	return nil
}

func parseProjectDates(startedAtValue *string, completedAtValue *string) (*time.Time, *time.Time, error) {
	startedAt, err := parseOptionalDate(startedAtValue, "startedAt")
	if err != nil {
		return nil, nil, err
	}

	completedAt, err := parseOptionalDate(completedAtValue, "completedAt")
	if err != nil {
		return nil, nil, err
	}

	if startedAt != nil && completedAt != nil && completedAt.Before(*startedAt) {
		return nil, nil, utils.NewValidationError(map[string]string{
			"completedAt": "completedAt cannot be earlier than startedAt",
		})
	}

	return startedAt, completedAt, nil
}

func parseOptionalDate(value *string, field string) (*time.Time, error) {
	if value == nil || *value == "" {
		return nil, nil
	}

	parsed, err := time.Parse("2006-01-02", *value)
	if err != nil {
		return nil, utils.NewValidationError(map[string]string{
			field: field + " must use YYYY-MM-DD format",
		})
	}

	return &parsed, nil
}

func parseOptionalUUID(value *string, field string) (*uuid.UUID, error) {
	if value == nil || *value == "" {
		return nil, nil
	}

	parsed, err := uuid.Parse(*value)
	if err != nil {
		return nil, utils.NewValidationError(map[string]string{
			field: field + " must be a valid UUID",
		})
	}

	return &parsed, nil
}

func parseUUIDList(values []string, field string) ([]uuid.UUID, error) {
	ids := make([]uuid.UUID, 0, len(values))
	seen := make(map[string]bool)

	for _, value := range values {
		parsed, err := uuid.Parse(value)
		if err != nil {
			return nil, utils.NewValidationError(map[string]string{
				field: field + " must contain valid UUID values",
			})
		}

		if seen[parsed.String()] {
			continue
		}

		seen[parsed.String()] = true
		ids = append(ids, parsed)
	}

	return ids, nil
}

func formatDate(value *time.Time) *string {
	if value == nil {
		return nil
	}

	formatted := value.Format("2006-01-02")
	return &formatted
}

func formatDateTime(value time.Time) string {
	return value.Format(time.RFC3339)
}

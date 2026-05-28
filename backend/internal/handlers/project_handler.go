package handlers

import (
	"net/http"
	"strconv"
	"strings"

	"github.com/gin-gonic/gin"

	"github.com/allesgut7/web-my-porto/backend/internal/dto"
	"github.com/allesgut7/web-my-porto/backend/internal/services"
	"github.com/allesgut7/web-my-porto/backend/internal/utils"
)

type ProjectHandler struct {
	projectService services.ProjectService
}

func NewProjectHandler(projectService services.ProjectService) *ProjectHandler {
	return &ProjectHandler{
		projectService: projectService,
	}
}

// ========================
// Public Handlers
// ========================

func (h *ProjectHandler) GetPublishedProjects(ctx *gin.Context) {
	pagination := utils.GetPaginationQuery(ctx)

	featured, err := parseOptionalBool(ctx.Query("featured"))
	if err != nil {
		utils.BadRequestResponse(ctx, "Invalid featured query parameter", map[string]string{
			"featured": "featured must be true or false",
		})
		return
	}

	sort := strings.TrimSpace(ctx.Query("sort"))
	if sort != "" && !isAllowedProjectSort(sort) {
		utils.BadRequestResponse(ctx, "Invalid sort query parameter", map[string]string{
			"sort": "sort must be one of: latest, oldest, display_order",
		})
		return
	}

	result, err := h.projectService.GetPublishedProjects(services.PublicProjectQuery{
		Pagination: pagination,
		Category:   strings.TrimSpace(ctx.Query("category")),
		Search:     strings.TrimSpace(ctx.Query("search")),
		Sort:       sort,
		Featured:   featured,
	})
	if err != nil {
		utils.HandleAppError(ctx, err)
		return
	}

	utils.SuccessResponseWithMeta(ctx, http.StatusOK, "Projects retrieved", result.Items, result.Meta)
}

func (h *ProjectHandler) GetPublishedProjectBySlug(ctx *gin.Context) {
	slug := strings.TrimSpace(ctx.Param("slug"))

	if slug == "" {
		utils.NotFoundResponse(ctx, "Project not found")
		return
	}

	response, err := h.projectService.GetPublishedProjectBySlug(slug)
	if err != nil {
		utils.HandleAppError(ctx, err)
		return
	}

	utils.SuccessResponse(ctx, http.StatusOK, "Project detail retrieved", response)
}

// ========================
// Admin Handlers
// ========================

func (h *ProjectHandler) GetAdminProjects(ctx *gin.Context) {
	pagination := utils.GetPaginationQuery(ctx)

	status := strings.TrimSpace(ctx.Query("status"))
	if status != "" && !isAllowedProjectStatus(status) {
		utils.BadRequestResponse(ctx, "Invalid status query parameter", map[string]string{
			"status": "status must be one of: draft, published, archived",
		})
		return
	}

	sort := strings.TrimSpace(ctx.Query("sort"))
	if sort != "" && !isAllowedProjectSort(sort) {
		utils.BadRequestResponse(ctx, "Invalid sort query parameter", map[string]string{
			"sort": "sort must be one of: latest, oldest, display_order",
		})
		return
	}

	result, err := h.projectService.GetAdminProjects(services.AdminProjectQuery{
		Pagination: pagination,
		Status:     status,
		Search:     strings.TrimSpace(ctx.Query("search")),
		Sort:       sort,
	})
	if err != nil {
		utils.HandleAppError(ctx, err)
		return
	}

	utils.SuccessResponseWithMeta(ctx, http.StatusOK, "Admin projects retrieved", result.Items, result.Meta)
}

func (h *ProjectHandler) GetAdminProjectByID(ctx *gin.Context) {
	id := strings.TrimSpace(ctx.Param("id"))

	response, err := h.projectService.GetAdminProjectByID(id)
	if err != nil {
		utils.HandleAppError(ctx, err)
		return
	}

	utils.SuccessResponse(ctx, http.StatusOK, "Admin project detail retrieved", response)
}

func (h *ProjectHandler) CreateAdminProject(ctx *gin.Context) {
	var payload dto.CreateProjectRequest

	if err := ctx.ShouldBindJSON(&payload); err != nil {
		utils.BadRequestResponse(ctx, "Invalid request body", nil)
		return
	}

	if validationErrors := utils.ValidateStruct(payload); validationErrors != nil {
		utils.ValidationErrorResponse(ctx, validationErrors)
		return
	}

	userID := ctx.GetString("user_id")
	if userID == "" {
		utils.UnauthorizedResponse(ctx, "Unauthorized")
		return
	}

	response, err := h.projectService.CreateAdminProject(userID, payload)
	if err != nil {
		utils.HandleAppError(ctx, err)
		return
	}

	utils.CreatedResponse(ctx, "Project created successfully", response)
}

func (h *ProjectHandler) UpdateAdminProject(ctx *gin.Context) {
	id := strings.TrimSpace(ctx.Param("id"))

	var payload dto.UpdateProjectRequest

	if err := ctx.ShouldBindJSON(&payload); err != nil {
		utils.BadRequestResponse(ctx, "Invalid request body", nil)
		return
	}

	if validationErrors := utils.ValidateStruct(payload); validationErrors != nil {
		utils.ValidationErrorResponse(ctx, validationErrors)
		return
	}

	response, err := h.projectService.UpdateAdminProject(id, payload)
	if err != nil {
		utils.HandleAppError(ctx, err)
		return
	}

	utils.SuccessResponse(ctx, http.StatusOK, "Project updated successfully", response)
}

func (h *ProjectHandler) DeleteAdminProject(ctx *gin.Context) {
	id := strings.TrimSpace(ctx.Param("id"))

	if err := h.projectService.DeleteAdminProject(id); err != nil {
		utils.HandleAppError(ctx, err)
		return
	}

	utils.SuccessResponse(ctx, http.StatusOK, "Project deleted successfully", nil)
}

// ========================
// Query Helpers
// ========================

func parseOptionalBool(value string) (*bool, error) {
	if value == "" {
		return nil, nil
	}

	parsed, err := strconv.ParseBool(value)
	if err != nil {
		return nil, err
	}

	return &parsed, nil
}

func isAllowedProjectSort(sort string) bool {
	switch sort {
	case "latest", "oldest", "display_order":
		return true
	default:
		return false
	}
}

func isAllowedProjectStatus(status string) bool {
	switch status {
	case "draft", "published", "archived":
		return true
	default:
		return false
	}
}

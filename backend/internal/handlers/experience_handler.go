package handlers

import (
	"net/http"
	"strings"

	"github.com/gin-gonic/gin"

	"github.com/allesgut7/web-my-porto/backend/internal/dto"
	"github.com/allesgut7/web-my-porto/backend/internal/services"
	"github.com/allesgut7/web-my-porto/backend/internal/utils"
)

type ExperienceHandler struct {
	experienceService services.ExperienceService
}

func NewExperienceHandler(experienceService services.ExperienceService) *ExperienceHandler {
	return &ExperienceHandler{
		experienceService: experienceService,
	}
}

func (h *ExperienceHandler) GetPublicExperiences(ctx *gin.Context) {
	result, err := h.experienceService.GetPublicExperiences()
	if err != nil {
		utils.HandleAppError(ctx, err)
		return
	}

	utils.SuccessResponse(ctx, http.StatusOK, "Experiences retrieved", result)
}

func (h *ExperienceHandler) GetAdminExperiences(ctx *gin.Context) {
	result, err := h.experienceService.GetAdminExperiences()
	if err != nil {
		utils.HandleAppError(ctx, err)
		return
	}

	utils.SuccessResponse(ctx, http.StatusOK, "Admin experiences retrieved", result)
}

func (h *ExperienceHandler) GetAdminExperienceByID(ctx *gin.Context) {
	id := strings.TrimSpace(ctx.Param("id"))

	response, err := h.experienceService.GetAdminExperienceByID(id)
	if err != nil {
		utils.HandleAppError(ctx, err)
		return
	}

	utils.SuccessResponse(ctx, http.StatusOK, "Admin experience detail retrieved", response)
}

func (h *ExperienceHandler) CreateAdminExperience(ctx *gin.Context) {
	var payload dto.CreateExperienceRequest

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

	response, err := h.experienceService.CreateAdminExperience(userID, payload)
	if err != nil {
		utils.HandleAppError(ctx, err)
		return
	}

	utils.CreatedResponse(ctx, "Experience created successfully", response)
}

func (h *ExperienceHandler) UpdateAdminExperience(ctx *gin.Context) {
	id := strings.TrimSpace(ctx.Param("id"))

	var payload dto.UpdateExperienceRequest

	if err := ctx.ShouldBindJSON(&payload); err != nil {
		utils.BadRequestResponse(ctx, "Invalid request body", nil)
		return
	}

	if validationErrors := utils.ValidateStruct(payload); validationErrors != nil {
		utils.ValidationErrorResponse(ctx, validationErrors)
		return
	}

	response, err := h.experienceService.UpdateAdminExperience(id, payload)
	if err != nil {
		utils.HandleAppError(ctx, err)
		return
	}

	utils.SuccessResponse(ctx, http.StatusOK, "Experience updated successfully", response)
}

func (h *ExperienceHandler) DeleteAdminExperience(ctx *gin.Context) {
	id := strings.TrimSpace(ctx.Param("id"))

	if err := h.experienceService.DeleteAdminExperience(id); err != nil {
		utils.HandleAppError(ctx, err)
		return
	}

	utils.SuccessResponse(ctx, http.StatusOK, "Experience deleted successfully", nil)
}

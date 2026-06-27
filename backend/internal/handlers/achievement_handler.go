package handlers

import (
	"net/http"
	"strings"

	"github.com/gin-gonic/gin"

	"github.com/allesgut7/web-my-porto/backend/internal/dto"
	"github.com/allesgut7/web-my-porto/backend/internal/services"
	"github.com/allesgut7/web-my-porto/backend/internal/utils"
)

type AchievementHandler struct {
	achievementService services.AchievementService
}

func NewAchievementHandler(achievementService services.AchievementService) *AchievementHandler {
	return &AchievementHandler{
		achievementService: achievementService,
	}
}

func (h *AchievementHandler) GetPublicAchievements(ctx *gin.Context) {
	result, err := h.achievementService.GetPublicAchievements()
	if err != nil {
		utils.HandleAppError(ctx, err)
		return
	}

	utils.SuccessResponse(ctx, http.StatusOK, "Achievements retrieved", result)
}

func (h *AchievementHandler) GetAdminAchievements(ctx *gin.Context) {
	result, err := h.achievementService.GetAdminAchievements()
	if err != nil {
		utils.HandleAppError(ctx, err)
		return
	}

	utils.SuccessResponse(ctx, http.StatusOK, "Admin achievements retrieved", result)
}

func (h *AchievementHandler) GetAdminAchievementByID(ctx *gin.Context) {
	id := strings.TrimSpace(ctx.Param("id"))

	response, err := h.achievementService.GetAdminAchievementByID(id)
	if err != nil {
		utils.HandleAppError(ctx, err)
		return
	}

	utils.SuccessResponse(ctx, http.StatusOK, "Admin achievement detail retrieved", response)
}

func (h *AchievementHandler) CreateAdminAchievement(ctx *gin.Context) {
	var payload dto.CreateAchievementRequest

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

	response, err := h.achievementService.CreateAdminAchievement(userID, payload)
	if err != nil {
		utils.HandleAppError(ctx, err)
		return
	}

	utils.CreatedResponse(ctx, "Achievement created successfully", response)
}

func (h *AchievementHandler) UpdateAdminAchievement(ctx *gin.Context) {
	id := strings.TrimSpace(ctx.Param("id"))

	var payload dto.UpdateAchievementRequest

	if err := ctx.ShouldBindJSON(&payload); err != nil {
		utils.BadRequestResponse(ctx, "Invalid request body", nil)
		return
	}

	if validationErrors := utils.ValidateStruct(payload); validationErrors != nil {
		utils.ValidationErrorResponse(ctx, validationErrors)
		return
	}

	response, err := h.achievementService.UpdateAdminAchievement(id, payload)
	if err != nil {
		utils.HandleAppError(ctx, err)
		return
	}

	utils.SuccessResponse(ctx, http.StatusOK, "Achievement updated successfully", response)
}

func (h *AchievementHandler) DeleteAdminAchievement(ctx *gin.Context) {
	id := strings.TrimSpace(ctx.Param("id"))

	if err := h.achievementService.DeleteAdminAchievement(id); err != nil {
		utils.HandleAppError(ctx, err)
		return
	}

	utils.SuccessResponse(ctx, http.StatusOK, "Achievement deleted successfully", nil)
}

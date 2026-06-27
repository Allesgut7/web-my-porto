package handlers

import (
	"net/http"
	"strings"

	"github.com/gin-gonic/gin"

	"github.com/allesgut7/web-my-porto/backend/internal/dto"
	"github.com/allesgut7/web-my-porto/backend/internal/services"
	"github.com/allesgut7/web-my-porto/backend/internal/utils"
)

type SkillHandler struct {
	skillService services.SkillService
}

func NewSkillHandler(skillService services.SkillService) *SkillHandler {
	return &SkillHandler{
		skillService: skillService,
	}
}

func (h *SkillHandler) GetPublicSkills(ctx *gin.Context) {
	result, err := h.skillService.GetPublicSkills()
	if err != nil {
		utils.HandleAppError(ctx, err)
		return
	}

	utils.SuccessResponse(ctx, http.StatusOK, "Skills retrieved", result)
}

func (h *SkillHandler) GetAdminSkills(ctx *gin.Context) {
	result, err := h.skillService.GetAdminSkills()
	if err != nil {
		utils.HandleAppError(ctx, err)
		return
	}

	utils.SuccessResponse(ctx, http.StatusOK, "Admin skills retrieved", result)
}

func (h *SkillHandler) GetAdminSkillByID(ctx *gin.Context) {
	id := strings.TrimSpace(ctx.Param("id"))

	response, err := h.skillService.GetAdminSkillByID(id)
	if err != nil {
		utils.HandleAppError(ctx, err)
		return
	}

	utils.SuccessResponse(ctx, http.StatusOK, "Admin skill detail retrieved", response)
}

func (h *SkillHandler) CreateAdminSkill(ctx *gin.Context) {
	var payload dto.CreateSkillRequest

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

	response, err := h.skillService.CreateAdminSkill(userID, payload)
	if err != nil {
		utils.HandleAppError(ctx, err)
		return
	}

	utils.CreatedResponse(ctx, "Skill created successfully", response)
}

func (h *SkillHandler) UpdateAdminSkill(ctx *gin.Context) {
	id := strings.TrimSpace(ctx.Param("id"))

	var payload dto.UpdateSkillRequest

	if err := ctx.ShouldBindJSON(&payload); err != nil {
		utils.BadRequestResponse(ctx, "Invalid request body", nil)
		return
	}

	if validationErrors := utils.ValidateStruct(payload); validationErrors != nil {
		utils.ValidationErrorResponse(ctx, validationErrors)
		return
	}

	response, err := h.skillService.UpdateAdminSkill(id, payload)
	if err != nil {
		utils.HandleAppError(ctx, err)
		return
	}

	utils.SuccessResponse(ctx, http.StatusOK, "Skill updated successfully", response)
}

func (h *SkillHandler) DeleteAdminSkill(ctx *gin.Context) {
	id := strings.TrimSpace(ctx.Param("id"))

	if err := h.skillService.DeleteAdminSkill(id); err != nil {
		utils.HandleAppError(ctx, err)
		return
	}

	utils.SuccessResponse(ctx, http.StatusOK, "Skill deleted successfully", nil)
}

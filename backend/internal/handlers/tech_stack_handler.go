package handlers

import (
	"net/http"
	"strings"

	"github.com/gin-gonic/gin"

	"github.com/allesgut7/web-my-porto/backend/internal/dto"
	"github.com/allesgut7/web-my-porto/backend/internal/services"
	"github.com/allesgut7/web-my-porto/backend/internal/utils"
)

type TechStackHandler struct {
	techStackService services.TechStackService
}

func NewTechStackHandler(techStackService services.TechStackService) *TechStackHandler {
	return &TechStackHandler{
		techStackService: techStackService,
	}
}

func (h *TechStackHandler) GetTechStacks(ctx *gin.Context) {
	result, err := h.techStackService.GetAll()
	if err != nil {
		utils.HandleAppError(ctx, err)
		return
	}

	utils.SuccessResponse(ctx, http.StatusOK, "Tech stacks retrieved", result)
}

func (h *TechStackHandler) GetTechStackByID(ctx *gin.Context) {
	id := strings.TrimSpace(ctx.Param("id"))

	response, err := h.techStackService.GetByID(id)
	if err != nil {
		utils.HandleAppError(ctx, err)
		return
	}

	utils.SuccessResponse(ctx, http.StatusOK, "Tech stack retrieved", response)
}

func (h *TechStackHandler) CreateTechStack(ctx *gin.Context) {
	var payload dto.CreateTechStackRequest

	if err := ctx.ShouldBindJSON(&payload); err != nil {
		utils.BadRequestResponse(ctx, "Invalid request body", nil)
		return
	}

	if validationErrors := utils.ValidateStruct(payload); validationErrors != nil {
		utils.ValidationErrorResponse(ctx, validationErrors)
		return
	}

	response, err := h.techStackService.Create(payload)
	if err != nil {
		utils.HandleAppError(ctx, err)
		return
	}

	utils.CreatedResponse(ctx, "Tech stack created successfully", response)
}

func (h *TechStackHandler) UpdateTechStack(ctx *gin.Context) {
	id := strings.TrimSpace(ctx.Param("id"))

	var payload dto.UpdateTechStackRequest

	if err := ctx.ShouldBindJSON(&payload); err != nil {
		utils.BadRequestResponse(ctx, "Invalid request body", nil)
		return
	}

	if validationErrors := utils.ValidateStruct(payload); validationErrors != nil {
		utils.ValidationErrorResponse(ctx, validationErrors)
		return
	}

	response, err := h.techStackService.Update(id, payload)
	if err != nil {
		utils.HandleAppError(ctx, err)
		return
	}

	utils.SuccessResponse(ctx, http.StatusOK, "Tech stack updated successfully", response)
}

func (h *TechStackHandler) DeleteTechStack(ctx *gin.Context) {
	id := strings.TrimSpace(ctx.Param("id"))

	if err := h.techStackService.Delete(id); err != nil {
		utils.HandleAppError(ctx, err)
		return
	}

	utils.SuccessResponse(ctx, http.StatusOK, "Tech stack deleted successfully", nil)
}

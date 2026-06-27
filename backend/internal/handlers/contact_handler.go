package handlers

import (
	"net/http"
	"strings"

	"github.com/gin-gonic/gin"

	"github.com/allesgut7/web-my-porto/backend/internal/dto"
	"github.com/allesgut7/web-my-porto/backend/internal/services"
	"github.com/allesgut7/web-my-porto/backend/internal/utils"
)

type ContactHandler struct {
	contactService services.ContactService
}

func NewContactHandler(contactService services.ContactService) *ContactHandler {
	return &ContactHandler{
		contactService: contactService,
	}
}

func (h *ContactHandler) SubmitMessage(ctx *gin.Context) {
	var payload dto.SubmitMessageRequest

	if err := ctx.ShouldBindJSON(&payload); err != nil {
		utils.BadRequestResponse(ctx, "Invalid request body", nil)
		return
	}

	if validationErrors := utils.ValidateStruct(payload); validationErrors != nil {
		utils.ValidationErrorResponse(ctx, validationErrors)
		return
	}

	ipAddress := ctx.ClientIP()

	response, err := h.contactService.SubmitMessage(payload, ipAddress)
	if err != nil {
		utils.HandleAppError(ctx, err)
		return
	}

	utils.CreatedResponse(ctx, "Message submitted successfully", response)
}

func (h *ContactHandler) GetAdminMessages(ctx *gin.Context) {
	result, err := h.contactService.GetAdminMessages()
	if err != nil {
		utils.HandleAppError(ctx, err)
		return
	}

	utils.SuccessResponse(ctx, http.StatusOK, "Messages retrieved", result)
}

func (h *ContactHandler) GetAdminMessageByID(ctx *gin.Context) {
	id := strings.TrimSpace(ctx.Param("id"))

	response, err := h.contactService.GetAdminMessageByID(id)
	if err != nil {
		utils.HandleAppError(ctx, err)
		return
	}

	utils.SuccessResponse(ctx, http.StatusOK, "Message detail retrieved", response)
}

func (h *ContactHandler) MarkMessageAsRead(ctx *gin.Context) {
	id := strings.TrimSpace(ctx.Param("id"))

	if err := h.contactService.MarkMessageAsRead(id); err != nil {
		utils.HandleAppError(ctx, err)
		return
	}

	utils.SuccessResponse(ctx, http.StatusOK, "Message marked as read", nil)
}

func (h *ContactHandler) DeleteAdminMessage(ctx *gin.Context) {
	id := strings.TrimSpace(ctx.Param("id"))

	if err := h.contactService.DeleteAdminMessage(id); err != nil {
		utils.HandleAppError(ctx, err)
		return
	}

	utils.SuccessResponse(ctx, http.StatusOK, "Message deleted successfully", nil)
}

func (h *ContactHandler) GetUnreadCount(ctx *gin.Context) {
	count, err := h.contactService.GetUnreadCount()
	if err != nil {
		utils.HandleAppError(ctx, err)
		return
	}

	utils.SuccessResponse(ctx, http.StatusOK, "Unread count retrieved", count)
}

package handlers

import (
	"net/http"
	"strings"

	"github.com/gin-gonic/gin"

	"github.com/allesgut7/web-my-porto/backend/internal/services"
	"github.com/allesgut7/web-my-porto/backend/internal/utils"
)

type UploadHandler struct {
	uploadService services.UploadService
}

func NewUploadHandler(uploadService services.UploadService) *UploadHandler {
	return &UploadHandler{
		uploadService: uploadService,
	}
}

func (h *UploadHandler) UploadImage(ctx *gin.Context) {
	fileHeader, err := ctx.FormFile("file")
	if err != nil {
		utils.ValidationErrorResponse(ctx, map[string]string{
			"file": "File is required",
		})
		return
	}

	fileType := strings.TrimSpace(ctx.PostForm("fileType"))
	folder := strings.TrimSpace(ctx.PostForm("folder"))

	response, err := h.uploadService.UploadImage(ctx.Request.Context(), fileHeader, folder, fileType)
	if err != nil {
		utils.HandleAppError(ctx, err)
		return
	}

	utils.CreatedResponse(ctx, "Image uploaded successfully", response)
}

func (h *UploadHandler) UploadFile(ctx *gin.Context) {
	fileHeader, err := ctx.FormFile("file")
	if err != nil {
		utils.ValidationErrorResponse(ctx, map[string]string{
			"file": "File is required",
		})
		return
	}

	fileType := strings.TrimSpace(ctx.PostForm("fileType"))
	folder := strings.TrimSpace(ctx.PostForm("folder"))

	response, err := h.uploadService.UploadDocument(ctx.Request.Context(), fileHeader, folder, fileType)
	if err != nil {
		utils.HandleAppError(ctx, err)
		return
	}

	utils.CreatedResponse(ctx, "File uploaded successfully", response)
}

func (h *UploadHandler) DeleteFile(ctx *gin.Context) {
	id := strings.TrimSpace(ctx.Param("id"))

	if err := h.uploadService.DeleteFile(ctx.Request.Context(), id); err != nil {
		utils.HandleAppError(ctx, err)
		return
	}

	utils.SuccessResponse(ctx, http.StatusOK, "File deleted successfully", nil)
}

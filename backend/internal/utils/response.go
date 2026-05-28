package utils

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

type APIResponse struct {
	Success bool        `json:"success"`
	Message string      `json:"message"`
	Data    interface{} `json:"data,omitempty"`
	Meta    interface{} `json:"meta,omitempty"`
	Errors  interface{} `json:"errors,omitempty"`
}

func SuccessResponse(ctx *gin.Context, statusCode int, message string, data interface{}) {
	ctx.JSON(statusCode, APIResponse{
		Success: true,
		Message: message,
		Data:    data,
	})
}

func SuccessResponseWithMeta(ctx *gin.Context, statusCode int, message string, data interface{}, meta interface{}) {
	ctx.JSON(statusCode, APIResponse{
		Success: true,
		Message: message,
		Data:    data,
		Meta:    meta,
	})
}

func CreatedResponse(ctx *gin.Context, message string, data interface{}) {
	SuccessResponse(ctx, http.StatusCreated, message, data)
}

func ErrorResponse(ctx *gin.Context, statusCode int, message string, errors interface{}) {
	response := APIResponse{
		Success: false,
		Message: message,
	}

	if errors != nil {
		response.Errors = errors
	}

	ctx.JSON(statusCode, response)
}

func BadRequestResponse(ctx *gin.Context, message string, errors interface{}) {
	ErrorResponse(ctx, http.StatusBadRequest, message, errors)
}

func UnauthorizedResponse(ctx *gin.Context, message string) {
	if message == "" {
		message = "Unauthorized"
	}

	ErrorResponse(ctx, http.StatusUnauthorized, message, nil)
}

func ForbiddenResponse(ctx *gin.Context, message string) {
	if message == "" {
		message = "Forbidden"
	}

	ErrorResponse(ctx, http.StatusForbidden, message, nil)
}

func NotFoundResponse(ctx *gin.Context, message string) {
	if message == "" {
		message = "Resource not found"
	}

	ErrorResponse(ctx, http.StatusNotFound, message, nil)
}

func ConflictResponse(ctx *gin.Context, message string, errors interface{}) {
	if message == "" {
		message = "Resource already exists"
	}

	ErrorResponse(ctx, http.StatusConflict, message, errors)
}

func ValidationErrorResponse(ctx *gin.Context, errors interface{}) {
	ErrorResponse(ctx, http.StatusUnprocessableEntity, "Validation error", errors)
}

func InternalServerErrorResponse(ctx *gin.Context) {
	ErrorResponse(ctx, http.StatusInternalServerError, "Internal server error", nil)
}

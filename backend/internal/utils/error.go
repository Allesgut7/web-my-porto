package utils

import "net/http"

type AppError struct {
	StatusCode int
	Message    string
	Errors     map[string]string
}

func (e *AppError) Error() string {
	return e.Message
}

func NewAppError(statusCode int, message string, errors map[string]string) *AppError {
	return &AppError{
		StatusCode: statusCode,
		Message:    message,
		Errors:     errors,
	}
}

func NewBadRequestError(message string) *AppError {
	return NewAppError(http.StatusBadRequest, message, nil)
}

func NewUnauthorizedError(message string) *AppError {
	if message == "" {
		message = "Unauthorized"
	}

	return NewAppError(http.StatusUnauthorized, message, nil)
}

func NewForbiddenError(message string) *AppError {
	if message == "" {
		message = "Forbidden"
	}

	return NewAppError(http.StatusForbidden, message, nil)
}

func NewNotFoundError(message string) *AppError {
	if message == "" {
		message = "Resource not found"
	}

	return NewAppError(http.StatusNotFound, message, nil)
}

func NewConflictError(message string, errors map[string]string) *AppError {
	if message == "" {
		message = "Resource already exists"
	}

	return NewAppError(http.StatusConflict, message, errors)
}

func NewValidationError(errors map[string]string) *AppError {
	return NewAppError(http.StatusUnprocessableEntity, "Validation error", errors)
}

func HandleAppError(ctx interface {
	JSON(code int, obj interface{})
}, err error) {
	appErr, ok := err.(*AppError)
	if !ok {
		ctx.JSON(http.StatusInternalServerError, APIResponse{
			Success: false,
			Message: "Internal server error",
		})
		return
	}

	response := APIResponse{
		Success: false,
		Message: appErr.Message,
	}

	if appErr.Errors != nil {
		response.Errors = appErr.Errors
	}

	ctx.JSON(appErr.StatusCode, response)
}

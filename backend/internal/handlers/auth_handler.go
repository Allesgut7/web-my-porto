package handlers

import (
	"net/http"

	"github.com/gin-gonic/gin"

	"github.com/allesgut7/web-my-porto/backend/internal/config"
	"github.com/allesgut7/web-my-porto/backend/internal/dto"
	"github.com/allesgut7/web-my-porto/backend/internal/middleware"
	"github.com/allesgut7/web-my-porto/backend/internal/services"
	"github.com/allesgut7/web-my-porto/backend/internal/utils"
)

type AuthHandler struct {
	cfg         *config.Config
	authService services.AuthService
}

func NewAuthHandler(cfg *config.Config, authService services.AuthService) *AuthHandler {
	return &AuthHandler{
		cfg:         cfg,
		authService: authService,
	}
}

func (h *AuthHandler) Login(ctx *gin.Context) {
	var payload dto.LoginRequest

	if err := ctx.ShouldBindJSON(&payload); err != nil {
		utils.BadRequestResponse(ctx, "Invalid request body", nil)
		return
	}

	if validationErrors := utils.ValidateStruct(payload); validationErrors != nil {
		utils.ValidationErrorResponse(ctx, validationErrors)
		return
	}

	response, token, err := h.authService.Login(payload)
	if err != nil {
		utils.HandleAppError(ctx, err)
		return
	}

	h.setAuthCookie(ctx, token)

	utils.SuccessResponse(ctx, http.StatusOK, "Login successful", response)
}

func (h *AuthHandler) Logout(ctx *gin.Context) {
	h.clearAuthCookie(ctx)

	utils.SuccessResponse(ctx, http.StatusOK, "Logout successful", nil)
}

func (h *AuthHandler) Me(ctx *gin.Context) {
	userID := ctx.GetString("user_id")
	if userID == "" {
		utils.UnauthorizedResponse(ctx, "Unauthorized")
		return
	}

	response, err := h.authService.GetCurrentUser(userID)
	if err != nil {
		utils.HandleAppError(ctx, err)
		return
	}

	utils.SuccessResponse(ctx, http.StatusOK, "Current user retrieved", response)
}

func (h *AuthHandler) setAuthCookie(ctx *gin.Context, token string) {
	maxAge := int(h.cfg.JWTExpiresIn.Seconds())

	ctx.SetSameSite(http.SameSiteLaxMode)
	ctx.SetCookie(
		middleware.AccessTokenCookieName,
		token,
		maxAge,
		"/",
		"",
		h.cfg.IsProduction(),
		true,
	)
}

func (h *AuthHandler) clearAuthCookie(ctx *gin.Context) {
	ctx.SetSameSite(http.SameSiteLaxMode)
	ctx.SetCookie(
		middleware.AccessTokenCookieName,
		"",
		-1,
		"/",
		"",
		h.cfg.IsProduction(),
		true,
	)
}

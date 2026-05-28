package handlers

import (
	"net/http"

	"github.com/gin-gonic/gin"

	"github.com/allesgut7/web-my-porto/backend/internal/services"
	"github.com/allesgut7/web-my-porto/backend/internal/utils"
)

type ProfileHandler struct {
	profileService services.ProfileService
}

func NewProfileHandler(profileService services.ProfileService) *ProfileHandler {
	return &ProfileHandler{
		profileService: profileService,
	}
}

func (h *ProfileHandler) GetPublicProfile(ctx *gin.Context) {
	response, err := h.profileService.GetPublicProfile()
	if err != nil {
		utils.HandleAppError(ctx, err)
		return
	}

	utils.SuccessResponse(ctx, http.StatusOK, "Profile retrieved", response)
}

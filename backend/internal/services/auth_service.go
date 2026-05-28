package services

import (
	"net/http"

	"github.com/google/uuid"

	"github.com/allesgut7/web-my-porto/backend/internal/config"
	"github.com/allesgut7/web-my-porto/backend/internal/dto"
	"github.com/allesgut7/web-my-porto/backend/internal/models"
	"github.com/allesgut7/web-my-porto/backend/internal/repositories"
	"github.com/allesgut7/web-my-porto/backend/internal/utils"
)

type AuthService interface {
	Login(payload dto.LoginRequest) (*dto.LoginResponse, string, error)
	GetCurrentUser(userID string) (*dto.UserMeResponse, error)
}

type authService struct {
	cfg      *config.Config
	userRepo repositories.UserRepository
}

func NewAuthService(cfg *config.Config, userRepo repositories.UserRepository) AuthService {
	return &authService{
		cfg:      cfg,
		userRepo: userRepo,
	}
}

func (s *authService) Login(payload dto.LoginRequest) (*dto.LoginResponse, string, error) {
	user, err := s.userRepo.FindByEmail(payload.Email)
	if err != nil {
		return nil, "", err
	}

	if user == nil {
		return nil, "", utils.NewAppError(http.StatusUnauthorized, "Invalid email or password", nil)
	}

	if !utils.CheckPasswordHash(payload.Password, user.PasswordHash) {
		return nil, "", utils.NewAppError(http.StatusUnauthorized, "Invalid email or password", nil)
	}

	token, err := utils.GenerateJWT(
		user.ID.String(),
		user.Email,
		user.Role,
		s.cfg.JWTSecret,
		s.cfg.JWTExpiresIn,
	)
	if err != nil {
		return nil, "", err
	}

	response := &dto.LoginResponse{
		User: mapUserToMeResponse(user),
	}

	return response, token, nil
}

func (s *authService) GetCurrentUser(userID string) (*dto.UserMeResponse, error) {
	parsedUserID, err := uuid.Parse(userID)
	if err != nil {
		return nil, utils.NewAppError(http.StatusUnauthorized, "Unauthorized", nil)
	}

	user, err := s.userRepo.FindByID(parsedUserID)
	if err != nil {
		return nil, err
	}

	if user == nil {
		return nil, utils.NewAppError(http.StatusUnauthorized, "Unauthorized", nil)
	}

	response := mapUserToMeResponse(user)

	return &response, nil
}

func mapUserToMeResponse(user *models.User) dto.UserMeResponse {
	return dto.UserMeResponse{
		ID:    user.ID.String(),
		Name:  user.Name,
		Email: user.Email,
		Role:  user.Role,
	}
}

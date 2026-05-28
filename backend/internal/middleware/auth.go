package middleware

import (
	"github.com/gin-gonic/gin"

	"github.com/allesgut7/web-my-porto/backend/internal/config"
	"github.com/allesgut7/web-my-porto/backend/internal/utils"
)

const AccessTokenCookieName = "access_token"

func AuthMiddleware(cfg *config.Config) gin.HandlerFunc {
	return func(ctx *gin.Context) {
		tokenString, err := ctx.Cookie(AccessTokenCookieName)
		if err != nil || tokenString == "" {
			utils.UnauthorizedResponse(ctx, "Unauthorized")
			ctx.Abort()
			return
		}

		claims, err := utils.ValidateJWT(tokenString, cfg.JWTSecret)
		if err != nil {
			utils.UnauthorizedResponse(ctx, "Unauthorized")
			ctx.Abort()
			return
		}

		ctx.Set("user_id", claims.UserID)
		ctx.Set("user_email", claims.Email)
		ctx.Set("user_role", claims.Role)

		ctx.Next()
	}
}

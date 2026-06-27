package middleware

import (
	"github.com/gin-gonic/gin"

	"github.com/allesgut7/web-my-porto/backend/internal/utils"
)

func RequireRole(roles ...string) gin.HandlerFunc {
	roleSet := make(map[string]bool, len(roles))
	for _, r := range roles {
		roleSet[r] = true
	}

	return func(ctx *gin.Context) {
		userRole := ctx.GetString("user_role")
		if !roleSet[userRole] {
			utils.ForbiddenResponse(ctx, "Insufficient permissions")
			ctx.Abort()
			return
		}

		ctx.Next()
	}
}

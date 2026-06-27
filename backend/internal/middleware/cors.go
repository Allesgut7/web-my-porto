package middleware

import (
	"net/http"

	"github.com/gin-gonic/gin"

	"github.com/allesgut7/web-my-porto/backend/internal/config"
)

func CORS(cfg *config.Config) gin.HandlerFunc {
	return func(ctx *gin.Context) {
		origin := ctx.GetHeader("Origin")

		ctx.Header("Vary", "Origin")

		if origin == cfg.FrontendOrigin {
			ctx.Header("Access-Control-Allow-Origin", origin)
			ctx.Header("Access-Control-Allow-Credentials", "true")
		}

		ctx.Header("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With")
		ctx.Header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, OPTIONS")

		if ctx.Request.Method == http.MethodOptions {
			ctx.Header("Access-Control-Max-Age", "86400")
			ctx.AbortWithStatus(http.StatusNoContent)
			return
		}

		ctx.Next()
	}
}

package middleware

import (
	"github.com/gin-gonic/gin"
)

func SecurityHeaders() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		ctx.Header("X-Content-Type-Options", "nosniff")
		ctx.Header("X-Frame-Options", "DENY")
		ctx.Header("Referrer-Policy", "strict-origin-when-cross-origin")
		ctx.Header("X-XSS-Protection", "0")
		ctx.Header("Content-Security-Policy", "default-src 'none'; frame-ancestors 'none'")
		ctx.Header("Strict-Transport-Security", "max-age=31536000; includeSubDomains")

		ctx.Next()
	}
}

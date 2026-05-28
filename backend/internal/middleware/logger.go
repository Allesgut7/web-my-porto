package middleware

import (
	"log"
	"time"

	"github.com/gin-gonic/gin"
)

func RequestLogger() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		start := time.Now()

		ctx.Next()

		duration := time.Since(start)
		statusCode := ctx.Writer.Status()
		method := ctx.Request.Method
		path := ctx.Request.URL.Path
		clientIP := ctx.ClientIP()

		userID := "-"
		if value, exists := ctx.Get("user_id"); exists {
			if parsed, ok := value.(string); ok && parsed != "" {
				userID = parsed
			}
		}

		log.Printf(
			"method=%s path=%s status=%d duration=%s ip=%s user_id=%s",
			method,
			path,
			statusCode,
			duration,
			clientIP,
			userID,
		)
	}
}

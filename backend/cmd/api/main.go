package main

import (
	"net/http"
	"os"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func main() {
	_ = godotenv.Load()

	appEnv := getEnv("APP_ENV", "development")
	appPort := getEnv("APP_PORT", "8080")

	if appEnv == "production" {
		gin.SetMode(gin.ReleaseMode)
	}

	router := gin.Default()

	api := router.Group("/api")
	{
		api.GET("/health", func(ctx *gin.Context) {
			ctx.JSON(http.StatusOK, gin.H{
				"success": true,
				"message": "Backend service is healthy",
				"data": gin.H{
					"service": "web-my-porto-api",
					"env":     appEnv,
				},
			})
		})
	}

	if err := router.Run(":" + appPort); err != nil {
		panic(err)
	}
}

func getEnv(key string, fallback string) string {
	value := os.Getenv(key)
	if value == "" {
		return fallback
	}
	return value
}
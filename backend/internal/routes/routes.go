package routes

import (
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"

	"github.com/allesgut7/web-my-porto/backend/internal/config"
	"github.com/allesgut7/web-my-porto/backend/internal/handlers"
	"github.com/allesgut7/web-my-porto/backend/internal/middleware"
	"github.com/allesgut7/web-my-porto/backend/internal/repositories"
	"github.com/allesgut7/web-my-porto/backend/internal/services"
	"github.com/allesgut7/web-my-porto/backend/internal/utils"
)

func SetupRouter(cfg *config.Config, db *gorm.DB) *gin.Engine {
	if cfg.IsProduction() {
		gin.SetMode(gin.ReleaseMode)
	}

	router := gin.New()

	router.Use(gin.Recovery())
	router.Use(middleware.RequestLogger())
	router.Use(middleware.CORS(cfg))

	userRepository := repositories.NewUserRepository(db)
	authService := services.NewAuthService(cfg, userRepository)
	authHandler := handlers.NewAuthHandler(cfg, authService)

	loginRateLimiter := middleware.NewInMemoryRateLimiter(5, 10*time.Minute)

	api := router.Group("/api")
	{
		api.GET("/health", HealthCheckHandler(cfg, db))

		auth := api.Group("/auth")
		{
			auth.POST("/login", loginRateLimiter.Middleware(), authHandler.Login)
			auth.POST("/logout", middleware.AuthMiddleware(cfg), authHandler.Logout)
			auth.GET("/me", middleware.AuthMiddleware(cfg), authHandler.Me)
		}

		// Public routes will be implemented in Phase 5.
		api.GET("/profile/placeholder", func(ctx *gin.Context) {
			utils.SuccessResponse(ctx, http.StatusOK, "Profile route placeholder", gin.H{
				"next": "Phase 5 Public Profile API",
			})
		})

		api.GET("/projects/placeholder", func(ctx *gin.Context) {
			utils.SuccessResponse(ctx, http.StatusOK, "Projects route placeholder", gin.H{
				"next": "Phase 5 Public Project API",
			})
		})

		// Admin routes will be extended in Phase 6.
		admin := api.Group("/admin")
		admin.Use(middleware.AuthMiddleware(cfg))
		{
			admin.GET("/ping", func(ctx *gin.Context) {
				utils.SuccessResponse(ctx, http.StatusOK, "Admin route authenticated", gin.H{
					"userId": ctx.GetString("user_id"),
					"email":  ctx.GetString("user_email"),
					"role":   ctx.GetString("user_role"),
				})
			})
		}
	}

	return router
}

func HealthCheckHandler(cfg *config.Config, db *gorm.DB) gin.HandlerFunc {
	return func(ctx *gin.Context) {
		sqlDB, err := db.DB()
		if err != nil {
			utils.ErrorResponse(ctx, http.StatusServiceUnavailable, "Database unavailable", nil)
			return
		}

		if err := sqlDB.Ping(); err != nil {
			utils.ErrorResponse(ctx, http.StatusServiceUnavailable, "Database ping failed", nil)
			return
		}

		utils.SuccessResponse(ctx, http.StatusOK, "Backend service is healthy", gin.H{
			"service":  "web-my-porto-api",
			"env":      cfg.AppEnv,
			"database": "connected",
		})
	}
}

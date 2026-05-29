package routes

import (
	"context"
	"log"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"

	"github.com/allesgut7/web-my-porto/backend/internal/config"
	"github.com/allesgut7/web-my-porto/backend/internal/handlers"
	"github.com/allesgut7/web-my-porto/backend/internal/middleware"
	"github.com/allesgut7/web-my-porto/backend/internal/repositories"
	"github.com/allesgut7/web-my-porto/backend/internal/services"
	"github.com/allesgut7/web-my-porto/backend/internal/storage"
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

	profileRepository := repositories.NewProfileRepository(db)
	profileService := services.NewProfileService(profileRepository)
	profileHandler := handlers.NewProfileHandler(profileService)

	projectRepository := repositories.NewProjectRepository(db)
	projectService := services.NewProjectService(projectRepository)
	projectHandler := handlers.NewProjectHandler(projectService)

	fileRepository := repositories.NewFileRepository(db)

	var uploadHandler *handlers.UploadHandler

	storageClient, err := storage.NewSupabaseStorageClient(context.Background(), cfg)
	if err != nil {
		log.Printf("[WARN] Supabase Storage client is not configured: %v", err)
	} else {
		uploadService := services.NewUploadService(fileRepository, storageClient)
		uploadHandler = handlers.NewUploadHandler(uploadService)
	}

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

		api.GET("/profile", profileHandler.GetPublicProfile)
		api.GET("/projects", projectHandler.GetPublishedProjects)
		api.GET("/projects/:slug", projectHandler.GetPublishedProjectBySlug)

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

			admin.GET("/projects", projectHandler.GetAdminProjects)
			admin.GET("/projects/:id", projectHandler.GetAdminProjectByID)
			admin.POST("/projects", projectHandler.CreateAdminProject)
			admin.PUT("/projects/:id", projectHandler.UpdateAdminProject)
			admin.DELETE("/projects/:id", projectHandler.DeleteAdminProject)

			if uploadHandler != nil {
				admin.POST("/uploads/images", uploadHandler.UploadImage)
				admin.POST("/uploads/files", uploadHandler.UploadFile)
				admin.DELETE("/uploads/:id", uploadHandler.DeleteFile)
			} else {
				admin.POST("/uploads/images", storageNotConfiguredHandler)
				admin.POST("/uploads/files", storageNotConfiguredHandler)
				admin.DELETE("/uploads/:id", storageNotConfiguredHandler)
			}
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

func storageNotConfiguredHandler(ctx *gin.Context) {
	utils.ErrorResponse(ctx, http.StatusServiceUnavailable, "Storage is not configured", nil)
}

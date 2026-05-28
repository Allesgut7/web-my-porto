package main

import (
	"log"

	"github.com/allesgut7/web-my-porto/backend/internal/config"
	"github.com/allesgut7/web-my-porto/backend/internal/database"
	"github.com/allesgut7/web-my-porto/backend/internal/routes"
)

func main() {
	cfg := config.Load()

	db, err := database.NewPostgresConnection(cfg)
	if err != nil {
		log.Fatalf("failed to initialize database: %v", err)
	}

	router := routes.SetupRouter(cfg, db)

	log.Printf("server running on port %s in %s mode", cfg.AppPort, cfg.AppEnv)

	if err := router.Run(":" + cfg.AppPort); err != nil {
		log.Fatalf("failed to run server: %v", err)
	}
}

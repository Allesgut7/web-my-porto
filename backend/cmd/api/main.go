package main

import (
	"context"
	"log"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"

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

	srv := &http.Server{
		Addr:              ":" + cfg.AppPort,
		Handler:           router,
		ReadHeaderTimeout: 10 * time.Second,
		ReadTimeout:       30 * time.Second,
		WriteTimeout:      60 * time.Second,
		IdleTimeout:       120 * time.Second,
	}

	go func() {
		log.Printf("server running on port %s in %s mode", cfg.AppPort, cfg.AppEnv)
		if err := srv.ListenAndServe(); err != nil && err != http.ErrServerClosed {
			log.Fatalf("failed to run server: %v", err)
		}
	}()

	quit := make(chan os.Signal, 1)
	signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)
	<-quit

	log.Println("shutting down server...")

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	if err := srv.Shutdown(ctx); err != nil {
		log.Fatalf("server forced to shutdown: %v", err)
	}

	if sqlDB, err := db.DB(); err == nil {
		sqlDB.Close()
	}

	log.Println("server exited")
}

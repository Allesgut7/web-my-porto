package config

import (
	"log"
	"os"
	"strconv"
	"time"

	"github.com/joho/godotenv"
)

type Config struct {
	AppEnv  string
	AppPort string

	DatabaseURL string

	JWTSecret    string
	JWTExpiresIn time.Duration

	// R2AccountID       string
	// R2AccessKeyID     string
	// R2SecretAccessKey string
	// R2BucketName      string
	// R2PublicURL       string

	SupabaseStorageEndpoint        string
	SupabaseStorageRegion          string
	SupabaseStorageAccessKeyID     string
	SupabaseStorageSecretAccessKey string
	SupabaseStorageBucket          string
	SupabaseStoragePublicURL       string

	FrontendOrigin string
}

func Load() *Config {
	_ = godotenv.Load()

	jwtExpiresIn := getDurationEnv("JWT_EXPIRES_IN", 24*time.Hour)

	cfg := &Config{
		AppEnv:  getEnv("APP_ENV", "development"),
		AppPort: getEnv("APP_PORT", "8080"),

		DatabaseURL: getEnv("DATABASE_URL", ""),

		JWTSecret:    getEnv("JWT_SECRET", "change_me"),
		JWTExpiresIn: jwtExpiresIn,

		// R2AccountID:       getEnv("R2_ACCOUNT_ID", ""),
		// R2AccessKeyID:     getEnv("R2_ACCESS_KEY_ID", ""),
		// R2SecretAccessKey: getEnv("R2_SECRET_ACCESS_KEY", ""),
		// R2BucketName:      getEnv("R2_BUCKET_NAME", ""),
		// R2PublicURL:       getEnv("R2_PUBLIC_URL", ""),

		SupabaseStorageEndpoint:        getEnv("SUPABASE_STORAGE_ENDPOINT", ""),
		SupabaseStorageRegion:          getEnv("SUPABASE_STORAGE_REGION", "ap-southeast-1"),
		SupabaseStorageAccessKeyID:     getEnv("SUPABASE_STORAGE_ACCESS_KEY_ID", ""),
		SupabaseStorageSecretAccessKey: getEnv("SUPABASE_STORAGE_SECRET_ACCESS_KEY", ""),
		SupabaseStorageBucket:          getEnv("SUPABASE_STORAGE_BUCKET", ""),
		SupabaseStoragePublicURL:       getEnv("SUPABASE_STORAGE_PUBLIC_URL", ""),

		FrontendOrigin: getEnv("FRONTEND_ORIGIN", "http://localhost:3000"),
	}

	if cfg.DatabaseURL == "" {
		log.Println("[WARN] DATABASE_URL is empty")
	}

	if cfg.JWTSecret == "change_me" || cfg.JWTSecret == "" {
		if cfg.IsProduction() {
			log.Fatalf("[FATAL] JWT_SECRET must be set to a secure value in production")
		}
		if cfg.AppEnv != "development" {
			log.Fatalf("[FATAL] JWT_SECRET must be set to a secure value (APP_ENV=%s)", cfg.AppEnv)
		}
		log.Println("[WARN] JWT_SECRET is still using default value")
	}

	return cfg
}

func (c *Config) IsProduction() bool {
	return c.AppEnv == "production"
}

func getEnv(key string, fallback string) string {
	value := os.Getenv(key)
	if value == "" {
		return fallback
	}

	return value
}

func getDurationEnv(key string, fallback time.Duration) time.Duration {
	value := os.Getenv(key)
	if value == "" {
		return fallback
	}

	duration, err := time.ParseDuration(value)
	if err == nil {
		return duration
	}

	seconds, err := strconv.Atoi(value)
	if err != nil {
		log.Printf("[WARN] invalid duration for %s, using fallback\n", key)
		return fallback
	}

	return time.Duration(seconds) * time.Second
}

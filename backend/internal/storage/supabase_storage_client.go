package storage

import (
	"context"
	"fmt"
	"io"
	"strings"

	"github.com/aws/aws-sdk-go-v2/aws"
	awsConfig "github.com/aws/aws-sdk-go-v2/config"
	"github.com/aws/aws-sdk-go-v2/credentials"
	"github.com/aws/aws-sdk-go-v2/service/s3"

	"github.com/allesgut7/web-my-porto/backend/internal/config"
)

type supabaseStorageClient struct {
	client    *s3.Client
	bucket    string
	publicURL string
}

func NewSupabaseStorageClient(ctx context.Context, cfg *config.Config) (ObjectStorageClient, error) {
	if cfg.SupabaseStorageEndpoint == "" {
		return nil, fmt.Errorf("SUPABASE_STORAGE_ENDPOINT is required")
	}

	if cfg.SupabaseStorageAccessKeyID == "" {
		return nil, fmt.Errorf("SUPABASE_STORAGE_ACCESS_KEY_ID is required")
	}

	if cfg.SupabaseStorageSecretAccessKey == "" {
		return nil, fmt.Errorf("SUPABASE_STORAGE_SECRET_ACCESS_KEY is required")
	}

	if cfg.SupabaseStorageBucket == "" {
		return nil, fmt.Errorf("SUPABASE_STORAGE_BUCKET is required")
	}

	if cfg.SupabaseStoragePublicURL == "" {
		return nil, fmt.Errorf("SUPABASE_STORAGE_PUBLIC_URL is required")
	}

	awsCfg, err := awsConfig.LoadDefaultConfig(
		ctx,
		awsConfig.WithRegion(cfg.SupabaseStorageRegion),
		awsConfig.WithCredentialsProvider(
			credentials.NewStaticCredentialsProvider(
				cfg.SupabaseStorageAccessKeyID,
				cfg.SupabaseStorageSecretAccessKey,
				"",
			),
		),
	)
	if err != nil {
		return nil, fmt.Errorf("failed to load Supabase Storage config: %w", err)
	}

	client := s3.NewFromConfig(awsCfg, func(options *s3.Options) {
		options.BaseEndpoint = aws.String(strings.TrimRight(cfg.SupabaseStorageEndpoint, "/"))
		options.UsePathStyle = true
	})

	return &supabaseStorageClient{
		client:    client,
		bucket:    cfg.SupabaseStorageBucket,
		publicURL: strings.TrimRight(cfg.SupabaseStoragePublicURL, "/"),
	}, nil
}

func (s *supabaseStorageClient) Upload(ctx context.Context, key string, body io.Reader, contentType string) error {
	_, err := s.client.PutObject(ctx, &s3.PutObjectInput{
		Bucket:      aws.String(s.bucket),
		Key:         aws.String(key),
		Body:        body,
		ContentType: aws.String(contentType),
	})

	if err != nil {
		return fmt.Errorf("failed to upload file to Supabase Storage: %w", err)
	}

	return nil
}

func (s *supabaseStorageClient) Delete(ctx context.Context, key string) error {
	_, err := s.client.DeleteObject(ctx, &s3.DeleteObjectInput{
		Bucket: aws.String(s.bucket),
		Key:    aws.String(key),
	})

	if err != nil {
		return fmt.Errorf("failed to delete file from Supabase Storage: %w", err)
	}

	return nil
}

func (s *supabaseStorageClient) GetPublicURL(key string) string {
	return s.publicURL + "/" + strings.TrimLeft(key, "/")
}

func (s *supabaseStorageClient) GetBucketName() string {
	return s.bucket
}

func (s *supabaseStorageClient) GetStorageProvider() string {
	return "supabase_storage"
}

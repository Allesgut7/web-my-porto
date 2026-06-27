package services

import (
	"context"
	"fmt"
	"io"
	"log"
	"mime/multipart"
	"net/http"
	"path/filepath"
	"regexp"
	"strings"
	"time"

	"github.com/google/uuid"

	"github.com/allesgut7/web-my-porto/backend/internal/dto"
	"github.com/allesgut7/web-my-porto/backend/internal/models"
	"github.com/allesgut7/web-my-porto/backend/internal/repositories"
	"github.com/allesgut7/web-my-porto/backend/internal/storage"
	"github.com/allesgut7/web-my-porto/backend/internal/utils"
)

const (
	MaxImageSize = 5 * 1024 * 1024
	MaxPDFSize   = 10 * 1024 * 1024
)

var allowedFolderRegex = regexp.MustCompile(`^[a-z0-9/_-]+$`)

type UploadService interface {
	UploadImage(ctx context.Context, fileHeader *multipart.FileHeader, folder string, fileType string) (*dto.FileResponse, error)
	UploadDocument(ctx context.Context, fileHeader *multipart.FileHeader, folder string, fileType string) (*dto.FileResponse, error)
	DeleteFile(ctx context.Context, id string) error
}

type uploadService struct {
	fileRepo      repositories.FileRepository
	storageClient storage.ObjectStorageClient
}

func NewUploadService(fileRepo repositories.FileRepository, storageClient storage.ObjectStorageClient) UploadService {
	return &uploadService{
		fileRepo:      fileRepo,
		storageClient: storageClient,
	}
}

func (s *uploadService) UploadImage(ctx context.Context, fileHeader *multipart.FileHeader, folder string, fileType string) (*dto.FileResponse, error) {
	if err := validateImageFileHeader(fileHeader, fileType); err != nil {
		return nil, err
	}

	return s.upload(ctx, fileHeader, folder, fileType, MaxImageSize, allowedImageExtensions(), allowedImageMimeTypes())
}

func (s *uploadService) UploadDocument(ctx context.Context, fileHeader *multipart.FileHeader, folder string, fileType string) (*dto.FileResponse, error) {
	if err := validateDocumentFileHeader(fileHeader, fileType); err != nil {
		return nil, err
	}

	return s.upload(ctx, fileHeader, folder, fileType, MaxPDFSize, allowedDocumentExtensions(), allowedDocumentMimeTypes())
}

func (s *uploadService) DeleteFile(ctx context.Context, id string) error {
	fileID, err := uuid.Parse(id)
	if err != nil {
		return utils.NewAppError(http.StatusNotFound, "File not found", nil)
	}

	file, err := s.fileRepo.FindByID(fileID)
	if err != nil {
		return err
	}

	if file == nil {
		return utils.NewAppError(http.StatusNotFound, "File not found", nil)
	}

	usageInfo, err := s.fileRepo.CheckUsage(fileID)
	if err != nil {
		return err
	}

	if usageInfo.IsUsed {
		return utils.NewConflictError("File is still used by another resource", map[string]string{
			"file": usageInfo.Reason,
		})
	}

	if err := s.fileRepo.DeleteByID(fileID); err != nil {
		return err
	}

	if err := s.storageClient.Delete(ctx, file.FileKey); err != nil {
		log.Printf("[WARN] failed to delete storage object %s after DB record removed: %v", file.FileKey, err)
	}

	return nil
}

func (s *uploadService) upload(
	ctx context.Context,
	fileHeader *multipart.FileHeader,
	folder string,
	fileType string,
	maxSize int64,
	allowedExtensions map[string]bool,
	allowedMimeTypes map[string]bool,
) (*dto.FileResponse, error) {
	if fileHeader == nil {
		return nil, utils.NewValidationError(map[string]string{
			"file": "File is required",
		})
	}

	if fileHeader.Size > maxSize {
		return nil, utils.NewValidationError(map[string]string{
			"file": fmt.Sprintf("File size exceeds limit of %d MB", maxSize/(1024*1024)),
		})
	}

	extension := getFileExtension(fileHeader.Filename)
	if !allowedExtensions[extension] {
		return nil, utils.NewValidationError(map[string]string{
			"file": "File extension is not allowed",
		})
	}

	openedFile, err := fileHeader.Open()
	if err != nil {
		return nil, err
	}
	defer openedFile.Close()

	mimeType, err := detectMimeType(openedFile, extension)
	if err != nil {
		return nil, err
	}

	if !allowedMimeTypes[mimeType] {
		return nil, utils.NewValidationError(map[string]string{
			"file": "File MIME type is not allowed",
		})
	}

	safeFolder, err := sanitizeFolder(folder, fileType)
	if err != nil {
		return nil, err
	}

	objectKey := generateObjectKey(safeFolder, fileType, extension)

	if _, err := openedFile.Seek(0, io.SeekStart); err != nil {
		return nil, err
	}

	if err := s.storageClient.Upload(ctx, objectKey, openedFile, mimeType); err != nil {
		return nil, err
	}

	fileRecord := &models.File{
		FileName:        sanitizeFileName(fileHeader.Filename),
		FileKey:         objectKey,
		FileURL:         s.storageClient.GetPublicURL(objectKey),
		BucketName:      s.storageClient.GetBucketName(),
		MimeType:        mimeType,
		FileSize:        fileHeader.Size,
		FileType:        fileType,
		StorageProvider: s.storageClient.GetStorageProvider(),
	}

	if err := s.fileRepo.Create(fileRecord); err != nil {
		_ = s.storageClient.Delete(ctx, objectKey)
		return nil, err
	}

	response := mapFileToResponse(fileRecord)

	return &response, nil
}

func validateImageFileHeader(fileHeader *multipart.FileHeader, fileType string) error {
	if fileHeader == nil {
		return utils.NewValidationError(map[string]string{
			"file": "File is required",
		})
	}

	if !isAllowedImageFileType(fileType) {
		return utils.NewValidationError(map[string]string{
			"fileType": "fileType must be one of: avatar, thumbnail, gallery",
		})
	}

	return nil
}

func validateDocumentFileHeader(fileHeader *multipart.FileHeader, fileType string) error {
	if fileHeader == nil {
		return utils.NewValidationError(map[string]string{
			"file": "File is required",
		})
	}

	if !isAllowedDocumentFileType(fileType) {
		return utils.NewValidationError(map[string]string{
			"fileType": "fileType must be one of: cv, certificate, document",
		})
	}

	return nil
}

func isAllowedImageFileType(fileType string) bool {
	switch fileType {
	case "avatar", "thumbnail", "gallery":
		return true
	default:
		return false
	}
}

func isAllowedDocumentFileType(fileType string) bool {
	switch fileType {
	case "cv", "certificate", "document":
		return true
	default:
		return false
	}
}

func allowedImageExtensions() map[string]bool {
	return map[string]bool{
		".jpg":  true,
		".jpeg": true,
		".png":  true,
		".webp": true,
	}
}

func allowedImageMimeTypes() map[string]bool {
	return map[string]bool{
		"image/jpeg": true,
		"image/png":  true,
		"image/webp": true,
	}
}

func allowedDocumentExtensions() map[string]bool {
	return map[string]bool{
		".pdf": true,
	}
}

func allowedDocumentMimeTypes() map[string]bool {
	return map[string]bool{
		"application/pdf": true,
	}
}

func getFileExtension(fileName string) string {
	return strings.ToLower(filepath.Ext(fileName))
}

func detectMimeType(file multipart.File, extension string) (string, error) {
	buffer := make([]byte, 512)

	n, err := file.Read(buffer)
	if err != nil && err != io.EOF {
		return "", err
	}

	if _, err := file.Seek(0, io.SeekStart); err != nil {
		return "", err
	}

	content := buffer[:n]

	if extension == ".webp" && isWebP(content) {
		return "image/webp", nil
	}

	return http.DetectContentType(content), nil
}

func isWebP(content []byte) bool {
	return len(content) >= 12 &&
		string(content[0:4]) == "RIFF" &&
		string(content[8:12]) == "WEBP"
}

func sanitizeFolder(folder string, fileType string) (string, error) {
	folder = strings.TrimSpace(folder)
	folder = strings.Trim(folder, "/")

	if folder == "" {
		return defaultFolderByFileType(fileType), nil
	}

	if strings.Contains(folder, "..") ||
		strings.Contains(folder, "\\") ||
		strings.Contains(folder, "//") ||
		!allowedFolderRegex.MatchString(folder) {
		return "", utils.NewValidationError(map[string]string{
			"folder": "Folder contains invalid characters",
		})
	}

	return folder, nil
}

func defaultFolderByFileType(fileType string) string {
	switch fileType {
	case "avatar", "cv":
		return "profiles"
	case "thumbnail", "gallery":
		return "projects"
	case "certificate":
		return "achievements"
	default:
		return "documents"
	}
}

func generateObjectKey(folder string, fileType string, extension string) string {
	timestamp := time.Now().UTC().Format("20060102150405")
	randomID := uuid.NewString()

	return fmt.Sprintf(
		"%s/%s-%s-%s%s",
		strings.Trim(folder, "/"),
		fileType,
		timestamp,
		randomID,
		extension,
	)
}

func sanitizeFileName(fileName string) string {
	base := filepath.Base(fileName)
	base = strings.ReplaceAll(base, "\\", "")
	base = strings.ReplaceAll(base, "/", "")

	if base == "." || base == "" {
		return "uploaded-file"
	}

	return base
}

func mapFileToResponse(file *models.File) dto.FileResponse {
	return dto.FileResponse{
		ID:              file.ID.String(),
		FileName:        file.FileName,
		FileKey:         file.FileKey,
		FileURL:         file.FileURL,
		BucketName:      file.BucketName,
		MimeType:        file.MimeType,
		FileSize:        file.FileSize,
		FileType:        file.FileType,
		StorageProvider: file.StorageProvider,
	}
}

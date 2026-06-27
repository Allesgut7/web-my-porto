package services

import (
	"fmt"
	"net/smtp"
	"os"
	"time"

	"github.com/google/uuid"

	"github.com/allesgut7/web-my-porto/backend/internal/dto"
	"github.com/allesgut7/web-my-porto/backend/internal/models"
	"github.com/allesgut7/web-my-porto/backend/internal/repositories"
	"github.com/allesgut7/web-my-porto/backend/internal/utils"
)

type ContactService interface {
	SubmitMessage(payload dto.SubmitMessageRequest, ipAddress string) (*dto.MessageMutationResponse, error)
	GetAdminMessages() ([]dto.ContactMessageResponse, error)
	GetAdminMessageByID(id string) (*dto.ContactMessageResponse, error)
	MarkMessageAsRead(id string) error
	DeleteAdminMessage(id string) error
	GetUnreadCount() (*dto.UnreadCountResponse, error)
}

type contactService struct {
	contactRepo repositories.ContactMessageRepository
}

func NewContactService(contactRepo repositories.ContactMessageRepository) ContactService {
	return &contactService{
		contactRepo: contactRepo,
	}
}

func (s *contactService) SubmitMessage(payload dto.SubmitMessageRequest, ipAddress string) (*dto.MessageMutationResponse, error) {
	msg := &models.ContactMessage{
		Name:      payload.Name,
		Email:     payload.Email,
		Subject:   payload.Subject,
		Message:   payload.Message,
		IPAddress: &ipAddress,
	}

	if err := s.contactRepo.Create(msg); err != nil {
		return nil, err
	}

	go s.sendEmailNotification(msg)

	return &dto.MessageMutationResponse{
		ID:     msg.ID.String(),
		Name:   msg.Name,
		Email:  msg.Email,
		IsRead: msg.IsRead,
	}, nil
}

func (s *contactService) GetAdminMessages() ([]dto.ContactMessageResponse, error) {
	messages, err := s.contactRepo.FindAll()
	if err != nil {
		return nil, err
	}

	items := make([]dto.ContactMessageResponse, 0, len(messages))
	for _, msg := range messages {
		items = append(items, mapContactMessageToResponse(&msg))
	}

	return items, nil
}

func (s *contactService) GetAdminMessageByID(id string) (*dto.ContactMessageResponse, error) {
	msgID, err := uuid.Parse(id)
	if err != nil {
		return nil, utils.NewNotFoundError("Message not found")
	}

	message, err := s.contactRepo.FindByID(msgID)
	if err != nil {
		return nil, err
	}

	if message == nil {
		return nil, utils.NewNotFoundError("Message not found")
	}

	response := mapContactMessageToResponse(message)
	return &response, nil
}

func (s *contactService) MarkMessageAsRead(id string) error {
	msgID, err := uuid.Parse(id)
	if err != nil {
		return utils.NewNotFoundError("Message not found")
	}

	existing, err := s.contactRepo.FindByID(msgID)
	if err != nil {
		return err
	}

	if existing == nil {
		return utils.NewNotFoundError("Message not found")
	}

	return s.contactRepo.MarkAsRead(msgID)
}

func (s *contactService) DeleteAdminMessage(id string) error {
	msgID, err := uuid.Parse(id)
	if err != nil {
		return utils.NewNotFoundError("Message not found")
	}

	existing, err := s.contactRepo.FindByID(msgID)
	if err != nil {
		return err
	}

	if existing == nil {
		return utils.NewNotFoundError("Message not found")
	}

	return s.contactRepo.DeleteByID(msgID)
}

func (s *contactService) GetUnreadCount() (*dto.UnreadCountResponse, error) {
	count, err := s.contactRepo.CountUnread()
	if err != nil {
		return nil, err
	}

	return &dto.UnreadCountResponse{
		Count: count,
	}, nil
}

func (s *contactService) sendEmailNotification(msg *models.ContactMessage) {
	smtpHost := getEnvOrDefault("SMTP_HOST", "smtp.gmail.com")
	smtpPort := getEnvOrDefault("SMTP_PORT", "587")
	smtpUser := getEnvOrDefault("SMTP_USER", "")
	smtpPass := getEnvOrDefault("SMTP_PASS", "")
	notifyEmail := getEnvOrDefault("NOTIFY_EMAIL", "")

	if smtpUser == "" || smtpPass == "" || notifyEmail == "" {
		return
	}

	subject := "New Contact Message from Portfolio"
	if msg.Subject != nil && *msg.Subject != "" {
		subject = fmt.Sprintf("New Contact Message: %s", *msg.Subject)
	}

	body := fmt.Sprintf(
		"From: %s <%s>\nSubject: %s\n\nName: %s\nEmail: %s\n\nMessage:\n%s",
		msg.Name, msg.Email, subject, msg.Name, msg.Email, msg.Message,
	)

	auth := smtp.PlainAuth("", smtpUser, smtpPass, smtpHost)
	addr := fmt.Sprintf("%s:%s", smtpHost, smtpPort)

	err := smtp.SendMail(addr, auth, smtpUser, []string{notifyEmail}, []byte(body))
	if err != nil {
		fmt.Printf("[WARN] Failed to send email notification: %v\n", err)
	}
}

func mapContactMessageToResponse(msg *models.ContactMessage) dto.ContactMessageResponse {
	return dto.ContactMessageResponse{
		ID:        msg.ID.String(),
		Name:      msg.Name,
		Email:     msg.Email,
		Subject:   msg.Subject,
		Message:   msg.Message,
		IsRead:    msg.IsRead,
		CreatedAt: msg.CreatedAt.Format(time.RFC3339),
	}
}

func getEnvOrDefault(key, fallback string) string {
	value := os.Getenv(key)
	if value == "" {
		return fallback
	}
	return value
}

package dto

type SubmitMessageRequest struct {
	Name    string  `json:"name" validate:"required,max=255"`
	Email   string  `json:"email" validate:"required,email,max=255"`
	Subject *string `json:"subject" validate:"omitempty,max=255"`
	Message string  `json:"message" validate:"required,max=10000"`
}

type ContactMessageResponse struct {
	ID        string  `json:"id"`
	Name      string  `json:"name"`
	Email     string  `json:"email"`
	Subject   *string `json:"subject"`
	Message   string  `json:"message"`
	IsRead    bool    `json:"isRead"`
	CreatedAt string  `json:"createdAt"`
}

type UnreadCountResponse struct {
	Count int64 `json:"count"`
}

type MessageMutationResponse struct {
	ID      string `json:"id"`
	Name    string `json:"name"`
	Email   string `json:"email"`
	IsRead  bool   `json:"isRead"`
}

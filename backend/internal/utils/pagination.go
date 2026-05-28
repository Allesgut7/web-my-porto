package utils

import (
	"math"
	"strconv"

	"github.com/gin-gonic/gin"
)

const (
	DefaultPage  = 1
	DefaultLimit = 10
	MaxLimit     = 50
)

type PaginationQuery struct {
	Page   int `json:"page"`
	Limit  int `json:"limit"`
	Offset int `json:"offset"`
}

type PaginationMeta struct {
	Page       int   `json:"page"`
	Limit      int   `json:"limit"`
	Total      int64 `json:"total"`
	TotalPages int   `json:"totalPages"`
}

func GetPaginationQuery(ctx *gin.Context) PaginationQuery {
	page := parsePositiveInt(ctx.Query("page"), DefaultPage)
	limit := parsePositiveInt(ctx.Query("limit"), DefaultLimit)

	if limit > MaxLimit {
		limit = MaxLimit
	}

	offset := (page - 1) * limit

	return PaginationQuery{
		Page:   page,
		Limit:  limit,
		Offset: offset,
	}
}

func NewPaginationMeta(page int, limit int, total int64) PaginationMeta {
	totalPages := 0

	if total > 0 && limit > 0 {
		totalPages = int(math.Ceil(float64(total) / float64(limit)))
	}

	return PaginationMeta{
		Page:       page,
		Limit:      limit,
		Total:      total,
		TotalPages: totalPages,
	}
}

func parsePositiveInt(value string, fallback int) int {
	if value == "" {
		return fallback
	}

	parsed, err := strconv.Atoi(value)
	if err != nil || parsed < 1 {
		return fallback
	}

	return parsed
}

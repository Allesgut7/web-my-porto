package middleware

import (
	"net/http"
	"sync"
	"time"

	"github.com/gin-gonic/gin"

	"github.com/allesgut7/web-my-porto/backend/internal/utils"
)

type clientRateLimitInfo struct {
	Count     int
	ResetTime time.Time
}

type InMemoryRateLimiter struct {
	mu      sync.Mutex
	clients map[string]*clientRateLimitInfo
	limit   int
	window  time.Duration
}

func NewInMemoryRateLimiter(limit int, window time.Duration) *InMemoryRateLimiter {
	limiter := &InMemoryRateLimiter{
		clients: make(map[string]*clientRateLimitInfo),
		limit:   limit,
		window:  window,
	}

	go limiter.cleanupExpiredClients()

	return limiter
}

func (l *InMemoryRateLimiter) Middleware() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		clientIP := ctx.ClientIP()
		now := time.Now()

		l.mu.Lock()

		info, exists := l.clients[clientIP]
		if !exists || now.After(info.ResetTime) {
			l.clients[clientIP] = &clientRateLimitInfo{
				Count:     1,
				ResetTime: now.Add(l.window),
			}

			l.mu.Unlock()
			ctx.Next()
			return
		}

		if info.Count >= l.limit {
			retryAfter := int(time.Until(info.ResetTime).Seconds())
			if retryAfter < 0 {
				retryAfter = 0
			}

			l.mu.Unlock()

			ctx.Header("Retry-After", time.Duration(retryAfter).String())
			utils.ErrorResponse(ctx, http.StatusTooManyRequests, "Too many login attempts, please try again later", nil)
			ctx.Abort()
			return
		}

		info.Count++

		l.mu.Unlock()

		ctx.Next()
	}
}

func (l *InMemoryRateLimiter) cleanupExpiredClients() {
	ticker := time.NewTicker(time.Minute)
	defer ticker.Stop()

	for range ticker.C {
		now := time.Now()

		l.mu.Lock()

		for clientIP, info := range l.clients {
			if now.After(info.ResetTime) {
				delete(l.clients, clientIP)
			}
		}

		l.mu.Unlock()
	}
}

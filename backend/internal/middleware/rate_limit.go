package middleware

import (
	"fmt"
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
	mu         sync.Mutex
	clients    map[string]*clientRateLimitInfo
	limit      int
	window     time.Duration
	maxClients int
	message    string
}

func NewInMemoryRateLimiter(limit int, window time.Duration) *InMemoryRateLimiter {
	return NewInMemoryRateLimiterWithCap(limit, window, 10000)
}

func NewInMemoryRateLimiterWithCap(limit int, window time.Duration, maxClients int) *InMemoryRateLimiter {
	if maxClients <= 0 {
		maxClients = 10000
	}

	limiter := &InMemoryRateLimiter{
		clients:    make(map[string]*clientRateLimitInfo),
		limit:      limit,
		window:     window,
		maxClients: maxClients,
		message:    "Too many requests, please try again later",
	}

	go limiter.cleanupExpiredClients()

	return limiter
}

func (l *InMemoryRateLimiter) WithMessage(msg string) *InMemoryRateLimiter {
	l.message = msg
	return l
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

			ctx.Header("Retry-After", fmt.Sprintf("%d", retryAfter))
			utils.ErrorResponse(ctx, http.StatusTooManyRequests, l.message, nil)
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

		if len(l.clients) > l.maxClients {
			toEvict := len(l.clients) - l.maxClients
			for i := 0; i < toEvict; i++ {
				oldest := now
				var oldestKey string
				for k, v := range l.clients {
					if v.ResetTime.Before(oldest) {
						oldest = v.ResetTime
						oldestKey = k
					}
				}
				if oldestKey != "" {
					delete(l.clients, oldestKey)
				} else {
					break
				}
			}
		}

		l.mu.Unlock()
	}
}

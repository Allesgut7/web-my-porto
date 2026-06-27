package middleware

import (
	"bytes"
	"io"
	"net/http"

	"github.com/gin-gonic/gin"

	"github.com/allesgut7/web-my-porto/backend/internal/utils"
)

const DefaultMaxBodySize = 1 << 20 // 1 MB

func BodySizeLimit(maxBytes int64) gin.HandlerFunc {
	if maxBytes <= 0 {
		maxBytes = DefaultMaxBodySize
	}

	return func(ctx *gin.Context) {
		if ctx.Request.Body == nil {
			ctx.Next()
			return
		}

		if ctx.Request.ContentLength > maxBytes {
			utils.ErrorResponse(ctx, http.StatusRequestEntityTooLarge, "Request body too large", nil)
			ctx.Abort()
			return
		}

		ctx.Request.Body = http.MaxBytesReader(ctx.Writer, ctx.Request.Body, maxBytes)
		ctx.Next()
	}
}

func ReadBodyWithLimit(ctx *gin.Context, maxBytes int64) ([]byte, error) {
	if maxBytes <= 0 {
		maxBytes = DefaultMaxBodySize
	}

	limited := io.LimitReader(ctx.Request.Body, maxBytes+1)
	buf, err := io.ReadAll(limited)
	if err != nil {
		return nil, err
	}

	if int64(len(buf)) > maxBytes {
		return nil, io.ErrUnexpectedEOF
	}

	ctx.Request.Body = io.NopCloser(bytes.NewReader(buf))
	return buf, nil
}

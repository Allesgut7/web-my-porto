FROM golang:1.25.0 AS builder

WORKDIR /app

COPY go.mod go.sum ./
RUN go mod download

COPY . .

RUN CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -o main ./cmd/api

FROM alpine:3.20

RUN apk --no-cache add ca-certificates && \
    adduser -D -u 1001 appuser

WORKDIR /app

COPY --from=builder /app/main .

USER appuser

EXPOSE 8080

CMD ["./main"]

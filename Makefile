.PHONY: backend-dev frontend-dev docker-up docker-down docker-logs docker-build db-shell health

backend-dev:
	cd backend && go run ./cmd/api

frontend-dev:
	cd frontend && npm run dev

docker-up:
	docker compose up -d

docker-down:
	docker compose down

docker-build:
	docker compose up -d --build

docker-logs:
	docker compose logs -f

db-shell:
	docker exec -it web_my_porto_postgres psql -U portfolio_user -d portfolio_db

health:
	curl http://localhost:8080/api/health
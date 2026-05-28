
MIGRATIONS_PATH=backend/migrations
DATABASE_URL=postgres://postgres:postgres@localhost:5433/web-my-porto?sslmode=disable

.PHONY: backend-dev frontend-dev docker-up docker-down docker-logs docker-build db-shell health 
migrate-up migrate-down migrate-down-one migrate-version migrate-force seed

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


migrate-up:
	migrate -path $(MIGRATIONS_PATH) -database "$(DATABASE_URL)" up

migrate-down:
	migrate -path $(MIGRATIONS_PATH) -database "$(DATABASE_URL)" down

migrate-down-one:
	migrate -path $(MIGRATIONS_PATH) -database "$(DATABASE_URL)" down 1

migrate-version:
	migrate -path $(MIGRATIONS_PATH) -database "$(DATABASE_URL)" version

migrate-force:
	migrate -path $(MIGRATIONS_PATH) -database "$(DATABASE_URL)" force $(version)

seed:
	cd backend && go run ./cmd/seed
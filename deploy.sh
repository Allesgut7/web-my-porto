#!/bin/bash
set -e

echo "=== Portfolio Website Deployment ==="

# Check if running as root
if [ "$EUID" -eq 0 ]; then
    echo "Warning: Running as root. Consider running as a non-root user."
fi

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "Error: Docker is not installed"
    exit 1
fi

if ! command -v docker-compose &> /dev/null && ! docker compose version &> /dev/null; then
    echo "Error: Docker Compose is not installed"
    exit 1
fi

# Check if .env files exist
if [ ! -f "backend/.env.production" ]; then
    echo "Error: backend/.env.production not found"
    exit 1
fi

if [ ! -f "frontend/.env.production" ]; then
    echo "Error: frontend/.env.production not found"
    exit 1
fi

# Check SSL certificates
if [ ! -f "nginx/ssl/cert.pem" ] || [ ! -f "nginx/ssl/key.pem" ]; then
    echo "Warning: SSL certificates not found in nginx/ssl/"
    echo "Generating self-signed certificates for testing..."
    mkdir -p nginx/ssl
    openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
        -keyout nginx/ssl/key.pem \
        -out nginx/ssl/cert.pem \
        -subj "/C=ID/ST=Jakarta/L=Jakarta/O=Portfolio/CN=localhost"
    echo "Self-signed certificates generated. Replace with real certificates for production."
fi

# Copy production nginx config
echo "Setting up nginx configuration..."
cp nginx/default.production.conf nginx/default.conf

# Build and start services
echo "Building and starting services..."
docker compose -f docker-compose.yml -f docker-compose.production.yml up -d --build

# Wait for services to be healthy
echo "Waiting for services to start..."
sleep 10

# Run database migrations
echo "Running database migrations..."
docker compose exec -T backend ./main migrate up 2>/dev/null || echo "Migration skipped (manual migration may be required)"

# Seed admin user
echo "Seeding admin user..."
docker compose exec -T backend ./main seed 2>/dev/null || echo "Seed skipped (user may already exist)"

echo ""
echo "=== Deployment Complete ==="
echo ""
echo "Services:"
echo "  - Frontend: http://localhost (redirects to HTTPS)"
echo "  - Backend API: http://localhost/api/health"
echo "  - Database: Internal only (not exposed)"
echo ""
echo "Admin Login:"
echo "  - URL: https://localhost/admin/login"
echo "  - Check container logs for generated password: docker compose logs backend"
echo ""
echo "Useful commands:"
echo "  - View logs: docker compose logs -f"
echo "  - Stop services: docker compose down"
echo "  - Restart: docker compose restart"
echo "  - Database shell: docker compose exec postgres psql -U webporto -d web-my-porto"
echo ""

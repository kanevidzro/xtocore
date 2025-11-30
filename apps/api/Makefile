# Makefile for Xtocore API
# Place this in apps/api/Makefile

# ===============================
# Variables
# ===============================
BUN := bun
PRISMA := npx prisma
ENV_FILE := .env

# ===============================
# Development
# ===============================
.PHONY: dev
dev:
	@echo "Starting API server in development mode..."
	$(BUN) run dev

.PHONY: build
build:
	@echo "Building API server..."
	$(BUN) run build

.PHONY: start
start:
	@echo "Starting API server..."
	$(BUN) run dist/server.js

# ===============================
# Prisma
# ===============================
.PHONY: prisma-generate
prisma-generate:
	@echo "Generating Prisma client..."
	$(PRISMA) generate

.PHONY: prisma-migrate
prisma-migrate:
	@echo "Applying database migrations..."
	$(BUN) prisma migrate deploy

.PHONY: prisma-studio
prisma-studio:
	@echo "Opening Prisma Studio..."
	$(PRISMA) studio

# ===============================
# Jobs
# ===============================
.PHONY: run-job
run-job:
	@echo "Running a job..."
	$(BUN) run jobs/$(JOB).ts

# ===============================
# Lint / Format
# ===============================
.PHONY: lint
lint:
	@echo "Linting code..."
	eslint .

.PHONY: format
format:
	@echo "Formatting code..."
	prettier --write .

# ===============================
# Utilities
# ===============================
.PHONY: env-example
env-example:
	@echo "Copying .env.example to .env..."
	cp -n $(ENV_FILE).example $(ENV_FILE)

.PHONY: clean
clean:
	@echo "Cleaning build artifacts..."
	rm -rf dist

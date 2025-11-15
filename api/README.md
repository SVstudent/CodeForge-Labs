# Elysia with Bun runtime

## Getting Started
To get started with this template, simply paste this command into your terminal:
```bash
bun create elysia ./elysia-example
```

## Development
To start the development server run:
```bash
bun run dev
```

Open http://localhost:3000/ with your browser to see the result.

## Database Setup
This service uses PostgreSQL via Drizzle ORM. Follow these steps the first time you work on the API:

1. Copy the sample environment file and update it with your own credentials if needed:
	```bash
	cp .env.example .env
	```
2. (Optional) Start a local Postgres instance with Docker:
	```bash
	docker compose up -d
	```
	The default credentials match the values in `.env.example` (`postgres` / `postgres`).
3. Apply the schema to the database:
	```bash
	bun run db:push
	```

If you prefer a hosted database (e.g. Neon, Supabase, Railway), replace `DATABASE_URL` in `.env` with the connection string provided by your provider before running `bun run db:push`.
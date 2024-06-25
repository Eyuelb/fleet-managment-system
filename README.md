This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.


This project uses Drizzle for database management. Below are the scripts and their purposes related to Drizzle.

## Drizzle Scripts

### 1. drizzle-schema

Generates a schema representation of the current database state and drops the existing schema.

```bash
pnpm run drizzle-schema
```
drizzle-schema: Generates a schema representation and drops the current schema.

```bash
pnpm run drizzle-generate
```
drizzle-generate: Generates PostgreSQL-specific code or migrations.

```bash
pnpm run drizzle-push
```
drizzle-push: Applies the generated migrations to the PostgreSQL database.

```bash
pnpm run drizzle-studio
```
drizzle-studio: Opens a GUI tool for managing the database.


